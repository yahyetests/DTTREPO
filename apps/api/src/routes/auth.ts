import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    setAuthCookies,
    clearAuthCookies,
} from '../lib/auth.js';
import { registerSchema, loginSchema } from '../lib/validators.js';
import { authenticate } from '../middleware/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { Role } from '@prisma/client';

const router = Router();

// Rate limit auth endpoints
router.use(rateLimit(100, 60_000));

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const { name, email, password, role } = parsed.data;

        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(409).json({ error: 'Email already registered' });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Create user + profile in transaction
        const user = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email,
                    passwordHash,
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

            return newUser;
        });

        const payload = { userId: user.id, role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        // Store refresh token hash
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
        });

        setAuthCookies(res, accessToken, refreshToken);

        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const payload = { userId: user.id, role: user.role };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
        });

        setAuthCookies(res, accessToken, refreshToken);

        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
    try {
        await prisma.user.update({
            where: { id: req.user!.userId },
            data: { refreshToken: null },
        });

        clearAuthCookies(res);
        res.json({ message: 'Logged out' });
    } catch (err) {
        console.error('Logout error:', err);
        clearAuthCookies(res);
        res.json({ message: 'Logged out' });
    }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ user });
    } catch (err) {
        console.error('Me error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
    try {
        const token = req.cookies?.refresh_token;
        if (!token) {
            res.status(401).json({ error: 'No refresh token' });
            return;
        }

        const payload = verifyRefreshToken(token);
        const user = await prisma.user.findUnique({ where: { id: payload.userId } });

        if (!user || !user.refreshToken) {
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }

        const valid = await bcrypt.compare(token, user.refreshToken);
        if (!valid) {
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }

        // Rotate tokens
        const newPayload = { userId: user.id, role: user.role };
        const newAccess = signAccessToken(newPayload);
        const newRefresh = signRefreshToken(newPayload);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: await bcrypt.hash(newRefresh, 10) },
        });

        setAuthCookies(res, newAccess, newRefresh);

        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });
    } catch {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

export default router;
