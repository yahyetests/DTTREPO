
import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Calendar, User } from 'lucide-react';
import { useStudentPurchases } from '@/context/StudentPurchasesContext';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { useAuth } from '@/context/AuthContext';

export default function BillingSuccessPage() {
    const { retrieveBookingToken, addPurchase, clearBookingToken } = useStudentPurchases();
    const { user } = useAuth();
    const [processed, setProcessed] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    useEffect(() => {
        const token = retrieveBookingToken();
        if (token && !processed) {
            setProcessed(true);
            setBookingDetails(token);

            // 1. Add to local store
            addPurchase(token);

            // 2. Send mock email
            const date = new Date(token.nextLessonISO);
            const displayTime = `${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} – ${new Date(date.getTime() + token.sessionLength * 60000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

            const [firstName, ...lastNameParts] = user?.name?.split(' ') || ["Student", ""];
            const lastName = lastNameParts.join(' ');

            sendBookingConfirmationEmail({
                studentName: user?.name || "Student",
                studentEmail: user?.email || "student@takween.com",
                subjectName: token.subjectName,
                subjectSlug: token.subjectSlug,
                tutorName: token.tutorName,
                nextLessonDate: token.nextLessonISO,
                nextLessonTime: displayTime,
                frequency: token.frequency,
                sessionLength: token.sessionLength,
                planTier: token.planTier,
                amountPaid: "£45.00", // In real app would come from Stripe session
            });

            // 3. Clear token
            clearBookingToken();
        }
    }, [retrieveBookingToken, addPurchase, clearBookingToken, processed, user]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="bg-green-500 p-8 text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-green-50">Your booking has been confirmed.</p>
                </div>

                <div className="p-8">
                    {bookingDetails ? (
                        <div className="space-y-6">
                            <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Tutor</p>
                                        <p className="font-semibold text-slate-900">{bookingDetails.tutorName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">First Session</p>
                                        <p className="font-semibold text-slate-900">
                                            {new Date(bookingDetails.nextLessonISO).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-sm text-slate-500">
                                A confirmation email has been sent to your inbox.
                            </p>

                            <a
                                href="/student/dashboard"
                                className="block w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl text-center hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Go to Dashboard <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-slate-500 mb-6">Redirecting you to your dashboard...</p>
                            <a href="/student/dashboard" className="text-primary font-medium hover:underline">Click here if not redirected</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
