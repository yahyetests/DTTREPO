import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

// GET /api/jobs (public endpoint for careers page)
router.get('/', async (req, res) => {
    try {
        const jobs = await prisma.jobOpening.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                type: true,
                department: true,
                description: true,
                createdAt: true,
            }
        });
        res.json({ jobs });
    } catch (err) {
        console.error('GET public jobs error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
