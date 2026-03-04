import React, { useEffect } from 'react';

export function MockPaymentPage() {
 useEffect(() => {
 const timer = setTimeout(() => {
 window.location.href = '/billing/success';
 }, 2000);

 return () => clearTimeout(timer);
 }, []);

 return (
 <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
 <div className="bg-white p-8 rounded-3xl shadow-card max-w-md w-full text-center border border-slate-200 ">
 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
 </svg>
 </div>
 <h1 className="text-2xl font-bold text-primary mb-2">Simulating Payment 💳</h1>
 <p className="text-slate-500 mb-6">Redirecting to Stripe Sandbox...</p>
 <div className="text-sm text-slate-400">
 Takes a few seconds for development flow 🐻
 </div>
 </div>
 </div>
 );
}
