import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication + ADMIN role
router.use(authenticate, requireRole('ADMIN'));

const verifyTutorSchema = z.object({
    id: z.string().uuid('Invalid tutor profile ID'),
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50; // allow larger page size for admins
        const skip = (page - 1) * limit;

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
            take: limit,
            skip,
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
        const parsed = verifyTutorSchema.safeParse(req.params);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const { id } = parsed.data;

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

// GET /api/admin/jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await prisma.jobOpening.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ jobs });
    } catch (err) {
        console.error('Admin GET jobs error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const createJobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    type: z.string().min(1, 'Type is required'),
    department: z.string().min(1, 'Department is required'),
    description: z.string().optional(),
    isActive: z.boolean().optional().default(true),
});

// POST /api/admin/jobs
router.post('/jobs', async (req, res) => {
    try {
        const parsed = createJobSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const job = await prisma.jobOpening.create({
            data: {
                ...parsed.data,
                authorId: req.user!.userId,
            },
        });

        res.status(201).json({ job });
    } catch (err) {
        console.error('Admin POST job error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.jobOpening.delete({
            where: { id },
        });
        res.json({ message: 'Job opening deleted' });
    } catch (err) {
        console.error('Admin DELETE job error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
