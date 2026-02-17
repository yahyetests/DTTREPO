import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CreditCard, Loader2, ShieldCheck, Lock } from 'lucide-react';

declare const Stripe: any;

interface CheckoutProps {
    tier?: string;
    subject?: string;
}

export default function StripeCheckoutPage({ tier, subject }: CheckoutProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [payAmount, setPayAmount] = useState<string>('');
    const paymentRef = useRef<HTMLDivElement>(null);
    const addressRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const checkoutRef = useRef<any>(null);
    const actionsRef = useRef<any>(null);

    // Parse tier/subject from URL search params if not passed as props
    const params = new URLSearchParams(window.location.search);
    const tierName = tier || params.get('tier') || 'Explorer';
    const subjectSlug = subject || params.get('subject') || '';

    useEffect(() => {
        initCheckout();
    }, []);

    async function initCheckout() {
        try {
            // 1. Create checkout session on backend
            const resp = await fetch('/api/checkout/create-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: tierName, subject: subjectSlug }),
            });
            const data = await resp.json();

            if (!resp.ok || data.error) {
                setError(data.error || 'Failed to create checkout session');
                setLoading(false);
                return;
            }

            // 2. Initialize Stripe embedded checkout
            const stripe = Stripe('pk_test_51SbDhTH8JpK5JEfwo09F2rJ0yhuume1cxVMQQ9YVbm3LB3Wgg5N2Ws0njPhxw20JQiI0XYxAfnG58W3ZmILP8Zuj00vlWmb4NU');
            const checkout = stripe.initCheckout({
                clientSecret: data.clientSecret,
                elementsOptions: {
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#E97F0F',
                            fontFamily: "'Poppins', sans-serif",
                            borderRadius: '10px',
                        },
                    },
                },
            });

            checkoutRef.current = checkout;

            checkout.on('change', () => { });

            const loadResult = await checkout.loadActions();
            if (loadResult.type === 'success') {
                actionsRef.current = loadResult.actions;
                const session = loadResult.actions.getSession();
                setPayAmount(session.total.total.amount);
            }

            // 3. Mount elements
            const paymentElement = checkout.createPaymentElement();
            if (paymentRef.current) paymentElement.mount(paymentRef.current);

            const billingAddressElement = checkout.createBillingAddressElement();
            if (addressRef.current) billingAddressElement.mount(addressRef.current);

            setLoading(false);
        } catch (err: any) {
            console.error('Checkout init error:', err);
            setError(err.message || 'Something went wrong initializing payment');
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!actionsRef.current) return;
        setSubmitting(true);
        setError(null);

        // Validate email
        const email = emailRef.current?.value || '';
        if (email) {
            const result = await actionsRef.current.updateEmail(email);
            if (result.type === 'error') {
                setEmailError(result.error.message);
                setSubmitting(false);
                return;
            }
        }

        const { error: confirmError } = await actionsRef.current.confirm();
        if (confirmError) {
            setError(confirmError.message);
            setSubmitting(false);
        }
        // If successful, Stripe redirects to the return_url automatically
    }

    const navigate = (href: string) => {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
            <div className="max-w-xl mx-auto px-4 sm:px-6">
                {/* Back link */}
                <button
                    onClick={() => navigate(subjectSlug ? `/subjects/${subjectSlug}` : '/subjects')}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to subject
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                        <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-1">
                        Complete Your Booking
                    </h1>
                    <p className="text-sm text-slate-500">
                        {tierName} plan{subjectSlug ? ` · ${subjectSlug.replace(/-/g, ' ')}` : ''}
                    </p>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-3" />
                        <p className="text-sm text-slate-500">Setting up secure payment…</p>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Checkout Form */}
                <form
                    onSubmit={handleSubmit}
                    className={`bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden ${loading ? 'hidden' : ''}`}
                >
                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none
                                    ${emailError
                                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                                        : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                    }`}
                                onChange={() => setEmailError(null)}
                                onBlur={async () => {
                                    const val = emailRef.current?.value;
                                    if (!val || !actionsRef.current) return;
                                    const result = await actionsRef.current.updateEmail(val);
                                    if (result.type === 'error') setEmailError(result.error.message);
                                }}
                            />
                            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                        </div>

                        {/* Billing Address Element */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Billing Address</h4>
                            <div ref={addressRef} className="min-h-[60px]" />
                        </div>

                        {/* Payment Element */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Payment</h4>
                            <div ref={paymentRef} className="min-h-[120px]" />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing…
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    {payAmount ? `Pay ${payAmount} now` : 'Pay now'}
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Powered by Stripe
                    </span>
                </div>
            </div>
        </section>
    );
}
