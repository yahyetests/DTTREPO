import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { addSubjectSchema, updateProfileSchema, createProgressSchema, sendMessageSchema } from '../lib/validators.js';

const router = Router();

// All tutor routes require authentication + TUTOR role
router.use(authenticate, requireRole('TUTOR'));

// GET /api/tutor/dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

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
            take: limit,
            skip,
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
            take: limit,
            skip,
        });

        // Students count
        const totalStudents = await prisma.session.count({
            where: { tutorId: tutorProfile.id },
            distinct: ['studentId'],
        });

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
                zoomMeetingId: s.zoomMeetingId,
                zoomJoinUrl: s.zoomJoinUrl,
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
                totalStudents,
            },
        });
    } catch (err) {
        console.error('Tutor dashboard error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/tutor/earnings
router.get('/earnings', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 100; // default larger limit for earnings calculation
        const skip = (page - 1) * limit;

        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        const completedSessions = await prisma.session.findMany({
            where: { tutorId: tutorProfile.id, status: 'COMPLETED' },
            orderBy: { startTime: 'asc' },
            take: limit,
            skip,
        });

        const hourlyRate = tutorProfile.hourlyRate || 0;
        let totalEarnings = 0;

        // Group by month (YYYY-MM)
        const monthlyData: Record<string, { sessions: number; earnings: number; date: Date }> = {};

        for (const session of completedSessions) {
            const date = new Date(session.startTime);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { sessions: 0, earnings: 0, date: new Date(date.getFullYear(), date.getMonth(), 1) };
            }
            monthlyData[monthKey].sessions += 1;
            monthlyData[monthKey].earnings += hourlyRate;
            totalEarnings += hourlyRate;
        }

        const history = Object.entries(monthlyData)
            .sort((a, b) => b[1].date.getTime() - a[1].date.getTime())
            .map(([month, data]) => ({
                month,
                sessions: data.sessions,
                earnings: data.earnings,
            }));

        res.json({
            totalEarnings,
            history,
        });
    } catch (err) {
        console.error('Tutor earnings error:', err);
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

// PATCH /api/tutor/profile
router.patch('/profile', async (req, res) => {
    try {
        const parsed = updateProfileSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }
        const data: Record<string, unknown> = {};
        if (parsed.data.name) data.name = parsed.data.name;

        const user = await prisma.user.update({
            where: { id: req.user!.userId },
            data,
            select: { id: true, email: true, name: true, role: true },
        });
        res.json({ user });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/tutor/students — List students linked through sessions
router.get('/students', async (req, res) => {
    try {
        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
        });
        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        const sessions = await prisma.session.findMany({
            where: { tutorId: tutorProfile.id },
            include: {
                student: {
                    include: {
                        user: { select: { name: true, email: true } },
                    },
                },
                subject: true,
            },
            distinct: ['studentId'],
        });

        const students = sessions.map(s => ({
            id: s.student.id,
            name: s.student.user.name,
            email: s.student.user.email,
            yearGroup: s.student.yearGroup,
            subject: s.subject.name,
            subjectId: s.subject.id,
        }));

        res.json({ students });
    } catch (err) {
        console.error('Tutor students error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/tutor/progress — Record progress for a student
router.post('/progress', async (req, res) => {
    try {
        const parsed = createProgressSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const progress = await prisma.progress.create({
            data: {
                studentId: parsed.data.studentProfileId,
                subjectId: parsed.data.subjectId,
                metricType: parsed.data.metricType,
                value: parsed.data.value,
            },
        });
        res.status(201).json({ progress });
    } catch (err) {
        console.error('Create progress error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/tutor/messages — Conversations grouped by other user
router.get('/messages', async (req, res) => {
    try {
        const userId = req.user!.userId;
        const messages = await prisma.message.findMany({
            where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
            include: {
                fromUser: { select: { id: true, name: true, role: true } },
                toUser: { select: { id: true, name: true, role: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        const convos = new Map<string, { contact: { id: string; name: string; role: string }; messages: typeof messages; lastMessage: Date }>();
        for (const m of messages) {
            const other = m.fromUserId === userId ? m.toUser : m.fromUser;
            if (!convos.has(other.id)) {
                convos.set(other.id, { contact: other, messages: [], lastMessage: m.createdAt });
            }
            convos.get(other.id)!.messages.push(m);
        }

        res.json({
            conversations: Array.from(convos.values())
                .sort((a, b) => b.lastMessage.getTime() - a.lastMessage.getTime())
                .map(c => ({
                    contact: c.contact,
                    lastMessage: c.messages[0]?.body || '',
                    lastMessageAt: c.messages[0]?.createdAt,
                    unreadCount: c.messages.filter(m => m.toUserId === userId && !m.readAt).length,
                })),
        });
    } catch (err) {
        console.error('Messages list error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/tutor/messages — Send a message
router.post('/messages', async (req, res) => {
    try {
        const parsed = sendMessageSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }
        const message = await prisma.message.create({
            data: {
                fromUserId: req.user!.userId,
                toUserId: parsed.data.toUserId,
                body: parsed.data.body,
            },
        });
        res.status(201).json({ message: { id: message.id, body: message.body, createdAt: message.createdAt } });
    } catch (err) {
        console.error('Send message error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/tutor/availability
router.get('/availability', async (req, res) => {
    try {
        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
        });
        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        const slots = await prisma.tutorAvailability.findMany({
            where: { tutorProfileId: tutorProfile.id },
            orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
        });

        res.json({
            availability: slots.map(s => ({
                id: s.id,
                dayOfWeek: s.dayOfWeek,
                startTime: s.startTime,
                endTime: s.endTime,
            })),
        });
    } catch (err) {
        console.error('Get availability error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/tutor/availability — Replace entire schedule
router.put('/availability', async (req, res) => {
    try {
        const slotsSchema = require('zod').z.array(require('zod').z.object({
            dayOfWeek: require('zod').z.number().int().min(0).max(6),
            startTime: require('zod').z.string().regex(/^\d{2}:\d{2}$/),
            endTime: require('zod').z.string().regex(/^\d{2}:\d{2}$/),
        }));
        const parsed = slotsSchema.safeParse(req.body.slots);
        if (!parsed.success) {
            res.status(400).json({ error: 'Invalid availability data' });
            return;
        }

        const tutorProfile = await prisma.tutorProfile.findUnique({
            where: { userId: req.user!.userId },
        });
        if (!tutorProfile) {
            res.status(404).json({ error: 'Tutor profile not found' });
            return;
        }

        // Replace all in a transaction
        await prisma.$transaction([
            prisma.tutorAvailability.deleteMany({ where: { tutorProfileId: tutorProfile.id } }),
            prisma.tutorAvailability.createMany({
                data: parsed.data.map((slot: { dayOfWeek: number; startTime: string; endTime: string }) => ({
                    tutorProfileId: tutorProfile.id,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                })),
            }),
        ]);

        res.json({ message: 'Availability updated' });
    } catch (err) {
        console.error('Update availability error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
