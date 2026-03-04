
"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Download, ArrowUpRight, ArrowDownLeft, Clock, History, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { pricingTiers } from "@/content/site-content";

export default function BillingPage() {
    // Use all 6 GCSE tiers as default display for the billing page
    const tiers = pricingTiers['GCSE'];

    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const data = await api('/student/billing') as { history: any[] };
                setTransactions(data.history || []);
            } catch (error) {
                console.error('Failed to load billing history', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBilling();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 ">Wallet & Billing</h1>
                <p className="text-slate-500 ">Manage your subscription, view plans, and track transactions.</p>
            </div>

            {/* Wallet Summary */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-primary text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-blue-200 font-medium mb-1">Available Hours</p>
                        <h2 className="text-4xl font-bold mb-4">{currentUser.balanceHours} <span className="text-lg font-normal text-blue-200">hrs</span></h2>
                        <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-blue-50">Top Up</Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-slate-500 font-medium mb-1">Estimated Value</p>
                    <h2 className="text-3xl font-bold text-slate-900 ">£{(currentUser.balanceHours || 0) * 25}.00</h2>
                    <p className="text-xs text-slate-400 mt-2">Based on average tutor rate (£25/hr)</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-slate-500 font-medium mb-1">Last Transaction</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 ">-1.0 hr</p>
                            <p className="text-xs text-slate-500 ">Yesterday, Session Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tuition Plans — 6-Tier System */}
            <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Tuition Plans</h2>
                <p className="text-sm text-slate-500 mb-4">All prices are weekly (4 sessions × 1 hour each). Showing GCSE rates.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={cn(
                            "rounded-xl border p-6 relative transition-all hover:shadow-md flex flex-col",
                            tier.highlight ? "border-secondary ring-1 ring-secondary/20 bg-amber-50/10" : "border-slate-200 bg-white "
                        )}>
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="text-2xl mb-2">{tier.emoji}</div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{tier.name}</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-3">{tier.ratio} Tuition</p>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-3xl font-bold text-slate-900 ">{tier.price}</span>
                                <span className="text-slate-500 text-sm">{tier.period}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">£{Math.round(tier.monthlyPriceNum / 4)} per session</p>
                            <ul className="space-y-2 mb-6 flex-1">
                                {tier.features.slice(0, 3).map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 ">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="/pricing" className={cn(
                                "w-full py-2.5 rounded-lg font-medium text-sm text-center transition-all block",
                                tier.highlight ? "bg-secondary text-white hover:bg-secondary/90" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            )}>
                                View Plan Details
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-slate-400" /> Transaction History
                    </h2>
                    <Button variant="ghost" size="sm">Export CSV</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary mx-auto"></div>
                                    </td>
                                </tr>
                            ) : transactions.length > 0 ? transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white transition-colors">
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
