import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, ExternalLink, RotateCcw } from 'lucide-react';

interface SessionDetails {
 status: string;
 payment_status: string;
 payment_intent_id: string | null;
 payment_intent_status: string | null;
}

export default function CheckoutCompletePage() {
 const [session, setSession] = useState<SessionDetails | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 fetchStatus();
 }, []);

 async function fetchStatus() {
 const params = new URLSearchParams(window.location.search);
 const sessionId = params.get('session_id');
 if (!sessionId) {
 setError('No session ID found in URL.');
 setLoading(false);
 return;
 }

 try {
 const resp = await fetch(`/api/checkout/session-status?session_id=${sessionId}`);
 const data = await resp.json();
 if (!resp.ok || data.error) {
 setError(data.error || 'Failed to retrieve payment status');
 } else {
 setSession(data);
 }
 } catch (err: any) {
 setError(err.message || 'Something went wrong');
 }
 setLoading(false);
 }

 const navigate = (href: string) => {
 window.history.pushState({}, '', href);
 window.dispatchEvent(new PopStateEvent('popstate'));
 };

 let icon = <AlertCircle className="w-10 h-10 text-slate-400" />;
 let iconBg = 'bg-slate-100 ';
 let heading = 'Checking payment…';
 let subheading = '';

 if (session) {
 switch (session.status) {
 case 'complete':
 icon = <CheckCircle className="w-10 h-10 text-white" />;
 iconBg = 'bg-accent';
 heading = 'Payment Successful! 🎉';
 subheading = 'Your booking has been confirmed. You\'ll receive a confirmation email shortly.';
 break;
 case 'open':
 icon = <XCircle className="w-10 h-10 text-white" />;
 iconBg = 'bg-secondary';
 heading = 'Payment Failed';
 subheading = 'Something went wrong with your payment. Please try again.';
 break;
 default:
 icon = <AlertCircle className="w-10 h-10 text-white" />;
 iconBg = 'bg-primary';
 heading = 'Payment Processing';
 subheading = 'Your payment is being processed. We\'ll update you shortly.';
 }
 }

 if (error) {
 icon = <XCircle className="w-10 h-10 text-white" />;
 iconBg = 'bg-secondary';
 heading = 'Something went wrong';
 subheading = error;
 }

 return (
 <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-8 sm:py-12 px-4">
 <div className="max-w-md w-full">
 <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-8 text-center animate-[fadeIn_0.6s_ease_forwards]">
 {loading ? (
 <div className="py-10">
 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
 <p className="text-sm text-slate-400">Checking payment status…</p>
 </div>
 ) : (
 <>
 <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-5 shadow-card`}>
 {icon}
 </div>
 <h2 className="text-xl font-bold text-primary mb-2">{heading}</h2>
 <p className="text-sm text-slate-500 mb-6 leading-relaxed">{subheading}</p>

 {session && (
 <div className="text-left bg-slate-100 rounded-2xl p-4 mb-6 text-sm space-y-2.5">
 <div className="flex justify-between">
 <span className="font-bold text-slate-600 ">Status</span>
 <span className={`font-bold capitalize ${session.status === 'complete' ? 'text-accent' : 'text-secondary'}`}>
 {session.status}
 </span>
 </div>
 {session.payment_intent_id && (
 <div className="flex justify-between">
 <span className="font-bold text-slate-600 ">Payment ID</span>
 <span className="text-slate-400 font-mono text-xs truncate max-w-[180px]">{session.payment_intent_id}</span>
 </div>
 )}
 <div className="flex justify-between">
 <span className="font-bold text-slate-600 ">Payment Status</span>
 <span className="text-slate-500 capitalize">{session.payment_status}</span>
 </div>
 {session.payment_intent_status && (
 <div className="flex justify-between">
 <span className="font-bold text-slate-600 ">Intent Status</span>
 <span className="text-slate-500 capitalize">{session.payment_intent_status}</span>
 </div>
 )}
 </div>
 )}

 <div className="space-y-3">
 {session?.payment_intent_id && (
 <a
 href={`https://dashboard.stripe.com/payments/${session.payment_intent_id}`}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary transition-colors"
 >
 View in Stripe Dashboard
 <ExternalLink className="w-3.5 h-3.5" />
 </a>
 )}

 <div className="flex gap-3 pt-2">
 <button
 onClick={() => navigate('/subjects')}
 className="flex-1 py-3 rounded-2xl bg-slate-100 text-primary font-bold text-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
 >
 <ArrowLeft className="w-4 h-4" />
 Browse Subjects
 </button>
 {session?.status !== 'complete' && (
 <button
 onClick={() => navigate('/checkout')}
 className="flex-1 py-3 rounded-2xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-card"
 style={{ background: 'linear-gradient(135deg, #0F172A, #334155)' }}
 >
 <RotateCcw className="w-4 h-4" />
 Try Again
 </button>
 )}
 </div>
 </div>
 </>
 )}
 </div>
 </div>
 </section>
 );
}
