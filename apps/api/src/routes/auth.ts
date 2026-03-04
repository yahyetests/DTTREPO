import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { Role } from '@prisma/client';
import { z } from 'zod';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

// Rate limit auth endpoints — 10 req/min with per-email keying for brute-force protection
router.use(rateLimit(10, 60_000, (req) => {
    const email = req.body?.email;
    return email ? `auth:${email}` : (req.ip || req.socket.remoteAddress || 'unknown');
}));

const syncSchema = z.object({
    name: z.string().min(2),
    role: z.enum(['STUDENT', 'TUTOR', 'PARENT']),
});

/**
 * POST /api/auth/sync
 * 
 * Called by the frontend immediately after a successful Supabase signup.
 * Creates the matching User and Profile rows in Prisma so that foreign key
 * relations (bookings, sessions) work correctly.
 */
router.post('/sync', authenticate, async (req, res) => {
    try {
        const parsed = syncSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const { name, role } = parsed.data;
        const userId = req.user!.userId; // Extracted from Supabase JWT in auth middleware
        const email = req.user!.email || '';

        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { id: userId } });
        if (existing) {
            res.json({ message: 'User already synced', user: existing });
            return;
        }

        // Create user + profile in transaction
        const user = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    id: userId, // CRITICAL: Use Supabase Auth ID as the primary key
                    email,
                    passwordHash: 'SUPABASE_AUTH_DELEGATED', // No longer storing local passwords
                    name,
                    role: role as Role,
                },
            });

            if (role === 'STUDENT') {
                await tx.studentProfile.create({
                    data: { userId: newUser.id, timezone: 'Europe/London' },
                });
            } else if (role === 'TUTOR') {
                await tx.tutorProfile.create({
                    data: { userId: newUser.id },
                });
            }
            // Parents do not currently have a separate profile table

            return newUser;
        });

        res.status(201).json({
            message: 'User synced successfully',
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (err) {
        console.error('Auth sync error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/auth/me
 * 
 * Returns the Prisma user data for the currently authenticated Supabase user.
 */
router.get('/me', authenticate, async (req, res) => {
    try {
        let user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            // Auto-sync: create the Prisma user from Supabase JWT data
            // This handles cases where /sync failed or was never called
            const role = (req.user!.role as Role) || 'STUDENT';
            user = await prisma.user.create({
                data: {
                    id: req.user!.userId,
                    email: req.user!.email || '',
                    name: req.user!.email?.split('@')[0] || 'User',
                    role,
                    passwordHash: 'SUPABASE_AUTH_DELEGATED',
                },
                select: { id: true, email: true, name: true, role: true },
            });

            // Also create the role-specific profile
            if (role === 'STUDENT') {
                await prisma.studentProfile.create({
                    data: { userId: user.id, timezone: 'Europe/London' },
                }).catch(() => { }); // Ignore if already exists
            } else if (role === 'TUTOR') {
                await prisma.tutorProfile.create({
                    data: { userId: user.id },
                }).catch(() => { });
            }
        }

        res.json({ user });
    } catch (err) {
        console.error('Me error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
