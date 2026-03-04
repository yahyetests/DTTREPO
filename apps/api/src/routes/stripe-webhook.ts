/**
 * Stripe Webhook Handler
 *
 * Handles the following Stripe events:
 *   - checkout.session.completed  → Create booking after successful one-time payment
 *   - invoice.paid               → Confirm recurring subscription payment
 *   - invoice.payment_failed     → Flag failed subscription payment
 *   - customer.subscription.deleted → Handle subscription cancellation
 *   - checkout.session.expired   → Log expired checkout sessions
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY          – Stripe API secret key
 *   STRIPE_WEBHOOK_SECRET      – Signing secret from Stripe dashboard (whsec_...)
 */

import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import express from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const isDev = process.env.NODE_ENV !== 'production';

// Only log payment details in development — never in production
function webhookLog(...args: unknown[]) {
    if (isDev) console.log(...args);
}

// Helper: safely get customer ID from various Stripe object shapes
function extractCustomerId(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
    if (!customer) return null;
    if (typeof customer === 'string') return customer;
    return customer.id || null;
}

/**
 * POST /api/checkout/webhook
 *
 * Stripe sends events here. We verify the signature, then handle
 * each event type to update the database accordingly.
 *
 * IMPORTANT: This route needs the raw body (not JSON-parsed) for
 * signature verification. It is mounted BEFORE express.json() in index.ts.
 */
router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (req: Request, res: Response) => {
        if (!webhookSecret) {
            console.error('STRIPE_WEBHOOK_SECRET is not configured');
            res.status(500).json({ error: 'Webhook not configured' });
            return;
        }

        const sig = req.headers['stripe-signature'] as string;

        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } catch (err: any) {
            console.error('Stripe webhook signature verification failed:', err.message);
            res.status(400).json({ error: 'Invalid signature' });
            return;
        }

        // ── Handle specific events ──
        try {
            switch (event.type) {
                // ─────────────────────────────────────────────────
                // 1. CHECKOUT SESSION COMPLETED
                //    Fired when a one-time payment succeeds via Checkout.
                //    Creates the booking in the database.
                // ─────────────────────────────────────────────────
                case 'checkout.session.completed': {
                    const session = event.data.object as Stripe.Checkout.Session;

                    webhookLog(`[Stripe] ✅ checkout.session.completed — ${session.id}`);

                    const tier = session.metadata?.tier || 'unknown';
                    const subject = session.metadata?.subject || 'unknown';
                    const userId = session.metadata?.userId;
                    const customerId = extractCustomerId(session.customer);
                    const studentId = session.metadata?.studentId;

                    if (!userId || !studentId) {
                        console.warn('[Stripe] checkout.session.completed missing userId or studentId in metadata');
                        break;
                    }

                    webhookLog(`  → Parent: ${userId}, Student: ${studentId}, Tier: ${tier}, Subject: ${subject}`);
                    webhookLog(`  → Amount: ${(session.amount_total || 0) / 100} ${session.currency?.toUpperCase()}`);
                    webhookLog(`  → Customer: ${customerId}`);

                    // Create the booking record
                    try {
                        let paymentIntentId: string | null = null;
                        if (typeof session.payment_intent === 'string') {
                            paymentIntentId = session.payment_intent;
                        } else if (session.payment_intent && typeof session.payment_intent === 'object') {
                            paymentIntentId = session.payment_intent.id || null;
                        }

                        await prisma.booking.create({
                            data: {
                                userId,
                                stripeSessionId: session.id,
                                stripeCustomerId: customerId,
                                stripePaymentIntentId: paymentIntentId,
                                tier,
                                subject,
                                status: 'ACTIVE',
                                amountPaid: session.amount_total || 0,
                                currency: session.currency || 'gbp',
                                paidAt: new Date(),
                            },
                        });
                        webhookLog(`[Stripe] ✅ Booking created for session ${session.id}`);
                    } catch (dbErr) {
                        console.error('[Stripe] Failed to create booking in DB:', dbErr);
                    }

                    break;
                }

                // ─────────────────────────────────────────────────
                // 2. INVOICE PAID
                //    Fired when a subscription invoice is successfully paid.
                //    Confirms/extends the user's subscription access.
                // ─────────────────────────────────────────────────
                case 'invoice.paid': {
                    const invoice = event.data.object as Stripe.Invoice;
                    const customerId = extractCustomerId(invoice.customer);
                    const subscriptionId = (invoice as any).subscription as string | null;

                    webhookLog(`[Stripe] ✅ invoice.paid — ${invoice.id}`);
                    webhookLog(`  → Customer: ${customerId}`);
                    webhookLog(`  → Subscription: ${subscriptionId}`);
                    webhookLog(`  → Amount: ${(invoice.amount_paid || 0) / 100} ${invoice.currency?.toUpperCase()}`);
                    webhookLog(`  → Billing reason: ${invoice.billing_reason}`);

                    if (!customerId) break;

                    try {
                        await prisma.booking.updateMany({
                            where: { stripeCustomerId: customerId, status: { in: ['ACTIVE', 'PAST_DUE'] } },
                            data: { status: 'ACTIVE', lastPaymentAt: new Date() },
                        });
                    } catch (dbErr) {
                        console.error('[Stripe] Failed to update invoice.paid booking status:', dbErr);
                    }

                    break;
                }

                // ─────────────────────────────────────────────────
                // 3. INVOICE PAYMENT FAILED
                //    Fired when a subscription payment fails.
                //    Marks the user's subscription as past due.
                // ─────────────────────────────────────────────────
                case 'invoice.payment_failed': {
                    const invoice = event.data.object as Stripe.Invoice;
                    const customerId = extractCustomerId(invoice.customer);

                    webhookLog(`[Stripe] ❌ invoice.payment_failed — ${invoice.id}`);
                    webhookLog(`  → Customer: ${customerId}`);
                    webhookLog(`  → Attempt: ${invoice.attempt_count}`);
                    webhookLog(`  → Next attempt: ${invoice.next_payment_attempt ? new Date(invoice.next_payment_attempt * 1000).toISOString() : 'none'}`);

                    if (!customerId) break;

                    try {
                        await prisma.booking.updateMany({
                            where: { stripeCustomerId: customerId, status: 'ACTIVE' },
                            data: { status: 'PAST_DUE' },
                        });
                    } catch (dbErr) {
                        console.error('[Stripe] Failed to update payment_failed booking status:', dbErr);
                    }

                    // TODO: Send notification email to user about failed payment

                    break;
                }

                // ─────────────────────────────────────────────────
                // 4. CUSTOMER SUBSCRIPTION DELETED
                //    Fired when a subscription is cancelled (by user or Stripe).
                //    Revokes the user's subscription access.
                // ─────────────────────────────────────────────────
                case 'customer.subscription.deleted': {
                    const subscription = event.data.object as Stripe.Subscription;
                    const customerId = extractCustomerId(subscription.customer);

                    webhookLog(`[Stripe] 🚫 customer.subscription.deleted — ${subscription.id}`);
                    webhookLog(`  → Customer: ${customerId}`);
                    webhookLog(`  → Cancel reason: ${subscription.cancellation_details?.reason || 'not specified'}`);
                    webhookLog(`  → Cancelled at: ${subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : 'unknown'}`);

                    if (!customerId) break;

                    try {
                        await prisma.booking.updateMany({
                            where: { stripeCustomerId: customerId, status: { in: ['ACTIVE', 'PAST_DUE'] } },
                            data: { status: 'CANCELLED', cancelledAt: new Date() },
                        });
                    } catch (dbErr) {
                        console.error('[Stripe] Failed to update subscription.deleted booking status:', dbErr);
                    }

                    break;
                }

                // ─────────────────────────────────────────────────
                // 5. CHECKOUT SESSION EXPIRED
                //    Informational — the user abandoned checkout.
                // ─────────────────────────────────────────────────
                case 'checkout.session.expired': {
                    const session = event.data.object as Stripe.Checkout.Session;
                    webhookLog(`[Stripe] ⏰ checkout.session.expired — ${session.id}`);
                    break;
                }

                default:
                    // Acknowledge unhandled events silently
                    break;
            }
        } catch (handlerErr) {
            console.error(`[Stripe] Error handling event ${event.type}:`, handlerErr);
            // Still return 200 so Stripe doesn't retry indefinitely
        }

        res.json({ received: true });
    },
);

export default router;
