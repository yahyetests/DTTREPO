
"use client";

import React from "react";
import { CreditCard, Download, ArrowUpRight, ArrowDownLeft, Clock, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transactions, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const packages = [
    { name: "Starter", hours: 5, price: 135, perHour: 27, popular: false },
    { name: "Gold", hours: 10, price: 250, perHour: 25, popular: true },
    { name: "Platinum", hours: 20, price: 460, perHour: 23, popular: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Wallet & Billing</h1>
        <p className="text-slate-500">Manage your credits, top up your account, and view history.</p>
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
          <h2 className="text-3xl font-bold text-slate-900">£{(currentUser.balanceHours || 0) * 25}.00</h2>
          <p className="text-xs text-slate-400 mt-2">Based on average tutor rate (£25/hr)</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
           <p className="text-slate-500 font-medium mb-1">Last Transaction</p>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
               <ArrowUpRight className="w-5 h-5" />
             </div>
             <div>
               <p className="font-bold text-slate-900">-1.0 hr</p>
               <p className="text-xs text-slate-500">Yesterday, Session Payment</p>
             </div>
           </div>
        </div>
      </div>

      {/* Top Up Packages */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Top Up Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className={cn(
              "rounded-xl border p-6 relative transition-all hover:shadow-md",
              pkg.popular ? "border-secondary ring-1 ring-secondary/20 bg-amber-50/10" : "border-slate-200 bg-white"
            )}>
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  BEST VALUE
                </div>
              )}
              <h3 className="font-bold text-xl text-slate-900 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-slate-900">£{pkg.price}</span>
                <span className="text-slate-500">/ {pkg.hours} hrs</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">Equates to £{pkg.perHour}/hr</p>
              <Button className={cn("w-full", pkg.popular ? "btn-secondary" : "variant-outline border-slate-300")}>
                Select Package
              </Button>
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
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                      tx.type === 'deposit' ? "bg-green-100 text-green-700" :
                      tx.type === 'payment' ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-700"
                    )}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={cn("px-6 py-4 text-right font-bold", tx.type === 'deposit' ? "text-green-600" : "text-slate-900")}>
                    {tx.type === 'deposit' ? '+' : '-'}£{tx.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {tx.invoiceUrl ? (
                      <button className="text-slate-400 hover:text-secondary transition-colors">
                        <Download className="w-4 h-4 mx-auto" />
                      </button>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
