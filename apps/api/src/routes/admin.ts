import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication + ADMIN role
router.use(authenticate, requireRole('ADMIN'));

// GET /api/admin/users
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                tutorProfile: {
                    select: { verificationStatus: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json({ users });
    } catch (err) {
        console.error('Admin users error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/admin/tutors/:id/verify
router.post('/tutors/:id/verify', async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await prisma.tutorProfile.findUnique({ where: { id } });
        if (!profile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        await prisma.tutorProfile.update({
            where: { id },
            data: { verificationStatus: 'VERIFIED' },
        });

        res.json({ message: 'Tutor verified' });
    } catch (err) {
        console.error('Verify tutor error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
