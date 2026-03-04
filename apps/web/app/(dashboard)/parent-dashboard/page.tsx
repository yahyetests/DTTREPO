"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Download, GraduationCap, Clock, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface StudentProps {
    id: string;
    name: string;
    email: string;
    yearGroup?: string;
    upcomingSessions: any[];
    recentProgress: any[];
}

interface BillingProps {
    id: string;
    tier: string;
    subject: string;
    amount: number;
    currency: string;
    status: string;
    date: string;
    paymentIntentId?: string;
}

export default function ParentDashboard() {
    const [students, setStudents] = useState<StudentProps[]>([]);
    const [billing, setBilling] = useState<BillingProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await api('/parent/dashboard') as { students: StudentProps[], billing: BillingProps[] };
                setStudents(data.students);
                setBilling(data.billing);
                if (data.students.length > 0) {
                    setSelectedStudentId(data.students[0].id);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                {error}
            </div>
        );
    }

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Family Dashboard</h1>
                    <p className="text-slate-500">Manage your children's learning and family billing.</p>
                </div>

                {students.length > 1 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-500">Viewing:</span>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm"
                                value={selectedStudentId || ''}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                            >
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                )}
            </div>

            {/* Child Overview Section */}
            {selectedStudent ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upcoming Sessions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-secondary" /> Upcoming Sessions
                            </h2>
                        </div>

                        {selectedStudent.upcomingSessions.length > 0 ? (
                            <div className="space-y-4">
                                {selectedStudent.upcomingSessions.map((session, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900">{session.subject}</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(session.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">with {session.tutorName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p>No upcoming sessions.</p>
                                <Button variant="link" className="text-secondary mt-2" onClick={() => window.location.href = '/subjects'}>Book a session</Button>
                            </div>
                        )}
                    </div>

                    {/* Recent Progress */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Recent Progress
                            </h2>
                        </div>

                        {selectedStudent.recentProgress.length > 0 ? (
                            <div className="space-y-4">
                                {selectedStudent.recentProgress.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="font-medium text-slate-900">{p.subject}</p>
                                            <p className="text-xs text-slate-500 capitalize">{p.metricType.replace('_', ' ')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-emerald-600">{p.value}</p>
                                            <p className="text-xs text-slate-400">{new Date(p.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p>No progress records yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Students Linked</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                        It looks like there are no students linked to your parent account yet.
                        Please contact support to link your child's account.
                    </p>
                </div>
            )}

            {/* Unified Billing Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-slate-400" /> Family Billing History
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">All payments across all linked students.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Plan / Subject</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {billing.length > 0 ? billing.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                                        {new Date(tx.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-900">{tx.tier}</p>
                                        <p className="text-xs text-slate-500">{tx.subject}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tx.status === 'ACTIVE' || tx.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                            tx.status === 'PAST_DUE' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                                        £{tx.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {tx.paymentIntentId ? (
                                            <a
                                                href={`https://dashboard.stripe.com/payments/${tx.paymentIntentId}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                                                title="View Receipt"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No billing history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
