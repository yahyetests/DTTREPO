
import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function BillingCancelPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-8 h-8 text-red-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Cancelled</h1>
                <p className="text-slate-500 mb-8">
                    Your payment was not processed. No charges have been made to your account.
                </p>

                <div className="space-y-3">
                    <a
                        href="/subjects"
                        className="block w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Browse Subjects
                    </a>
                    <a
                        href="/student/dashboard"
                        className="block w-full py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                    >
                        Return to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
