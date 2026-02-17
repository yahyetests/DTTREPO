import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const FRONTEND_URL = process.env.CORS_ORIGIN || 'http://localhost:5173';

/**
 * POST /api/checkout/create-session
 * Creates a Stripe Checkout Session in custom (embedded) UI mode.
 * Body: { tier?: string, subject?: string }
 */
router.post('/create-session', async (req, res) => {
    try {
        const { tier, subject } = req.body || {};

        // Map tier names to Stripe Price IDs from environment
        const priceMap: Record<string, string> = {
            'Platinum Path': process.env.STRIPE_PRICE_PLATINUM_PATH || '',
            'Gold Edge': process.env.STRIPE_PRICE_GOLD_EDGE || '',
            'Silver Advantage': process.env.STRIPE_PRICE_SILVER_ADVANTAGE || '',
            'Bronze Boost': process.env.STRIPE_PRICE_BRONZE_BOOST || '',
            'Foundational Fixes': process.env.STRIPE_PRICE_FOUNDATIONAL_FIXES || '',
            'Foundational Focus': process.env.STRIPE_PRICE_FOUNDATIONAL_FOCUS || '',
        };

        const priceId = priceMap[tier || ''] || priceMap['Platinum Path'] || '';

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'custom' as any,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            return_url: `${FRONTEND_URL}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
            metadata: {
                tier: tier || '',
                subject: subject || '',
            },
        });

        res.json({ clientSecret: (session as any).client_secret });
    } catch (error: any) {
        console.error('Stripe create-session error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/checkout/session-status?session_id=cs_xxx
 * Returns session status and payment details.
 */
router.get('/session-status', async (req, res) => {
    try {
        const sessionId = req.query.session_id as string;
        if (!sessionId) {
            return res.status(400).json({ error: 'session_id is required' });
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
        console.error('Stripe session-status error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
