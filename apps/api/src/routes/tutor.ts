import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { addSubjectSchema } from '../lib/validators.js';

const router = Router();

// All tutor routes require authentication + TUTOR role
router.use(authenticate, requireRole('TUTOR'));

// GET /api/tutor/dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
            include: {
                subjects: { include: { subject: true } },
            },
        });

        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        // Upcoming sessions
        const sessions = await prisma.session.findMany({
            where: {
                tutorId: tutorProfile.id,
                status: 'UPCOMING',
                startTime: { gte: new Date() },
            },
            include: {
                student: { include: { user: { select: { name: true } } } },
                subject: true,
            },
            orderBy: { startTime: 'asc' },
            take: 10,
        });

        // Completed sessions for earnings
        const completedSessions = await prisma.session.findMany({
            where: { tutorId: tutorProfile.id, status: 'COMPLETED' },
        });

        const totalEarnings = completedSessions.length * (tutorProfile.hourlyRate || 0);

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

        // Students count
        const uniqueStudents = new Set(
            (await prisma.session.findMany({
                where: { tutorId: tutorProfile.id },
                select: { studentId: true },
            })).map((s) => s.studentId)
        );

        res.json({
            profile: {
                bio: tutorProfile.bio,
                hourlyRate: tutorProfile.hourlyRate,
                verificationStatus: tutorProfile.verificationStatus,
                subjects: tutorProfile.subjects.map((ts) => ts.subject.name),
            },
            sessions: sessions.map((s) => ({
                id: s.id,
                subject: s.subject.name,
                studentName: s.student.user.name,
                startTime: s.startTime,
                endTime: s.endTime,
                status: s.status,
                meetingLink: s.meetingLink,
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
                completedSessions: completedSessions.length,
                totalEarnings,
                totalStudents: uniqueStudents.size,
            },
        });
    } catch (err) {
        console.error('Tutor dashboard error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/tutor/subjects
router.post('/subjects', async (req, res) => {
    try {
        const parsed = addSubjectSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        const { subjectId } = parsed.data;

        // Check if already linked
        const existing = await prisma.tutorSubject.findUnique({
            where: {
                tutorProfileId_subjectId: {
                    tutorProfileId: tutorProfile.id,
                    subjectId,
                },
            },
        });

        if (existing) {
            res.status(409).json({ error: 'Subject already added' });
            return;
        }

        await prisma.tutorSubject.create({
            data: { tutorProfileId: tutorProfile.id, subjectId },
        });

        res.status(201).json({ message: 'Subject added' });
    } catch (err) {
        console.error('Add subject error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
