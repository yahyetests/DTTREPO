import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// All parent routes require authentication + PARENT role
router.use(authenticate, requireRole('PARENT'));

/**
 * GET /api/parent/dashboard
 * Returns linked students, their upcoming sessions/progress, and the parent's billing history.
 */
router.get('/dashboard', async (req, res) => {
    try {
        const parentId = req.user!.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // 1. Get linked students and their data in one query
        const parentLinks = await prisma.parentStudentLink.findMany({
            where: { parentId },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        studentProfile: {
                            include: {
                                sessions: {
                                    where: { status: { in: ['UPCOMING', 'COMPLETED'] } },
                                    orderBy: { startTime: 'asc' },
                                    take: 5,
                                    include: {
                                        subject: true,
                                        tutor: { include: { user: { select: { name: true } } } },
                                    }
                                },
                                progress: {
                                    orderBy: { recordedAt: 'desc' },
                                    take: 5,
                                    include: { subject: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        // 2. Get billing history (all bookings made by this parent)
        const billingHistory = await prisma.booking.findMany({
            where: { userId: parentId },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip,
        });

        // 3. Format the response
        const students = parentLinks.map(link => {
            const profile = link.student.studentProfile;
            return {
                id: link.student.id,
                name: link.student.name,
                email: link.student.email,
                yearGroup: profile?.yearGroup,
                targetExams: profile?.targetExams,
                upcomingSessions: profile?.sessions.filter(s => s.status === 'UPCOMING').map(s => ({
                    id: s.id,
                    subject: s.subject.name,
                    tutorName: s.tutor.user.name,
                    startTime: s.startTime,
                    meetingLink: s.zoomJoinUrl || s.meetingLink,
                })) || [],
                recentProgress: profile?.progress.map(p => ({
                    id: p.id,
                    subject: p.subject.name,
                    metricType: p.metricType,
                    value: p.value,
                    date: p.recordedAt,
                })) || [],
            };
        });

        const billing = billingHistory.map(b => ({
            id: b.id,
            tier: b.tier,
            subject: b.subject,
            amount: b.amountPaid / 100, // convert pence to pounds
            currency: b.currency,
            status: b.status,
            date: b.paidAt,
            // To get the actual receipt URL, we would need to fetch the detailed PaymentIntent from Stripe,
            // but we can pass the paymentIntentId to let the frontend know a receipt exists.
            paymentIntentId: b.stripePaymentIntentId,
        }));

        res.json({
            students,
            billing,
        });

    } catch (err: any) {
        console.error('Parent dashboard error:', err.message);
        res.status(500).json({ error: 'Failed to load parent dashboard' });
    }
});

export default router;
