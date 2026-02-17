import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { createSessionSchema } from '../lib/validators.js';

const router = Router();

// All student routes require authentication + STUDENT role
router.use(authenticate, requireRole('STUDENT'));

// GET /api/student/dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found' });
            return;
        }

        // Upcoming sessions with tutor and subject info
        const sessions = await prisma.session.findMany({
            where: {
                studentId: studentProfile.id,
                status: 'UPCOMING',
                startTime: { gte: new Date() },
            },
            include: {
                tutor: { include: { user: { select: { name: true } } } },
                subject: true,
            },
            orderBy: { startTime: 'asc' },
            take: 5,
        });

        // Progress summary
        const progress = await prisma.progress.findMany({
            where: { studentId: studentProfile.id },
            include: { subject: true },
            orderBy: { recordedAt: 'desc' },
            take: 10,
        });

        // Latest messages
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { toUserId: req.user!.userId },
                    { fromUserId: req.user!.userId },
                ],
            },
            include: {
                fromUser: { select: { id: true, name: true, role: true } },
                toUser: { select: { id: true, name: true, role: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });

        // Completed sessions count
        const completedCount = await prisma.session.count({
            where: { studentId: studentProfile.id, status: 'COMPLETED' },
        });

        res.json({
            sessions: sessions.map((s) => ({
                id: s.id,
                subject: s.subject.name,
                tutorName: s.tutor.user.name,
                startTime: s.startTime,
                endTime: s.endTime,
                status: s.status,
                meetingLink: s.meetingLink,
            })),
            progress: progress.map((p) => ({
                id: p.id,
                subject: p.subject.name,
                metricType: p.metricType,
                value: p.value,
                recordedAt: p.recordedAt,
            })),
            messages: messages.map((m) => ({
                id: m.id,
                fromUser: m.fromUser,
                toUser: m.toUser,
                body: m.body,
                createdAt: m.createdAt,
                isMe: m.fromUserId === req.user!.userId,
            })),
            stats: {
                upcomingSessions: sessions.length,
                completedSessions: completedCount,
                activeSubjects: new Set(sessions.map((s) => s.subjectId)).size,
            },
        });
    } catch (err) {
        console.error('Student dashboard error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/student/sessions
router.post('/sessions', async (req, res) => {
    try {
        const parsed = createSessionSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found' });
            return;
        }

        const { tutorId, subjectId, startTime, endTime } = parsed.data;

        // Verify tutor exists
        const tutor = await prisma.tutorProfile.findUnique({ where: { id: tutorId } });
        if (!tutor) {
            res.status(404).json({ error: 'Tutor not found' });
            return;
        }

        const session = await prisma.session.create({
            data: {
                studentId: studentProfile.id,
                tutorId,
                subjectId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: 'UPCOMING',
            },
            include: {
                tutor: { include: { user: { select: { name: true } } } },
                subject: true,
            },
        });

        res.status(201).json({
            session: {
                id: session.id,
                subject: session.subject.name,
                tutorName: session.tutor.user.name,
                startTime: session.startTime,
                endTime: session.endTime,
                status: session.status,
            },
        });
    } catch (err) {
        console.error('Create session error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
