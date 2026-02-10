
import React from "react";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center text-sm text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </a>
          <a href="/" className="font-heading font-bold text-xl text-primary tracking-tight">
            Takween Tutors
          </a>
        </div>
        
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100">
          {children}
        </div>

        <div className="text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Takween Tutors. All rights reserved.
        </div>
      </div>
    </div>
  );
}
