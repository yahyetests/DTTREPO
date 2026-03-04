import { Router } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { rateLimit } from '../middleware/rateLimit.js';
import { authenticate } from '../middleware/auth.js';
import { computeCheckoutPrice } from '../lib/pricing.js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const FRONTEND_URL = process.env.CORS_ORIGIN || 'http://localhost:5173';

// ── SECURITY: Rate-limit checkout to prevent Stripe session abuse ──
router.use(rateLimit(20, 60_000));

const checkoutSchema = z.object({
    tier: z.enum(['platinum-path', 'gold-edge', 'silver-advantage', 'bronze-boost', 'elite-scholar', 'study-circle']),
    level: z.enum(['gcse', 'a-level', '11-plus', 'btec']),
    sessionMinutes: z.coerce.number().int().refine(v => [60, 90, 120].includes(v), { message: 'Session must be 60, 90, or 120 minutes' }),
    sessionsPerWeek: z.coerce.number().int().min(1).max(7),
    subject: z.string().optional(),
    studentId: z.string().uuid().optional(),
});

/**
 * POST /api/checkout/create-session
 * Creates a Stripe Checkout Session using dynamic price_data.
 */
router.post('/create-session', authenticate, async (req, res) => {
    try {
        const parsed = checkoutSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.errors[0].message });
            return;
        }

        const { tier, level, sessionMinutes, sessionsPerWeek, subject, studentId } = parsed.data;
        const userId = req.user!.userId;

        // ── Server-side price computation (tamper-proof) ──
        const pricing = computeCheckoutPrice({
            tier,
            level,
            sessionMinutes: Number(sessionMinutes),
            sessionsPerWeek: Number(sessionsPerWeek),
        });

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'custom' as any,
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: pricing.productName,
                            description: pricing.productDescription,
                        },
                        unit_amount: pricing.unitAmountPence,
                    },
                    quantity: pricing.quantity,
                },
            ],
            mode: 'payment',
            return_url: `${FRONTEND_URL}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
            metadata: {
                tier: tier || '',
                level: level || '',
                sessionMinutes: String(sessionMinutes),
                sessionsPerWeek: String(sessionsPerWeek),
                subject: subject || '',
                userId,
                studentId: studentId || userId,
            },
        });

        res.json({ clientSecret: (session as any).client_secret });
    } catch (error: any) {
        // SECURITY: Never leak Stripe internal errors to the client
        console.error('Stripe create-session error:', error.message);
        res.status(500).json({ error: 'Payment processing failed. Please try again or contact support.' });
    }
});

/**
 * GET /api/checkout/session-status?session_id=cs_xxx
 * Returns session status and payment details.
 */
router.get('/session-status', authenticate, async (req, res) => {
    try {
        const sessionId = req.query.session_id as string;
        if (!sessionId || !/^cs_/.test(sessionId)) {
            return res.status(400).json({ error: 'Valid session_id is required' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent'],
        });

        const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;

        res.json({
            status: session.status,
            payment_status: session.payment_status,
            payment_intent_id: paymentIntent?.id || null,
            payment_intent_status: paymentIntent?.status || null,
        });
    } catch (error: any) {
        // SECURITY: Never leak Stripe internal errors to the client
        console.error('Stripe session-status error:', error.message);
        res.status(500).json({ error: 'Unable to retrieve payment status. Please try again.' });
    }
});

export default router;
