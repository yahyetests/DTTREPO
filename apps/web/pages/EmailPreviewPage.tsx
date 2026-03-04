
import React, { useState, useEffect } from 'react';
import { Mail, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredEmails, clearStoredEmails, renderBookingEmailHtml } from '@/lib/email';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function EmailPreviewPage() {
 const [emails, setEmails] = useState(getStoredEmails());
 const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

 const refresh = () => setEmails(getStoredEmails());

 const handleClear = () => {
 if (confirm('Clear all sent emails?')) {
 clearStoredEmails();
 refresh();
 setSelectedEmail(null);
 }
 };

 const activeEmail = emails.find(e => e.id === selectedEmail);

 return (
 <div className="min-h-screen bg-white flex flex-col">
 <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
 <Mail className="w-5 h-5" />
 </div>
 <div>
 <h1 className="font-bold text-slate-900 ">Email Debugger</h1>
 <p className="text-xs text-slate-500 ">View emails sent by the system (saved in localStorage)</p>
 </div>
 </div>
 <div className="flex gap-2">
 <Button onClick={refresh} variant="outline" size="sm" className="gap-2">
 <RefreshCw className="w-4 h-4" /> Refresh
 </Button>
 <Button onClick={handleClear} variant="destructive" size="sm" className="gap-2">
 <Trash2 className="w-4 h-4" /> Clear All
 </Button>
 </div>
 </header>

 <main className="flex-1 flex overflow-hidden">
 {/* Email List */}
 <aside className="w-1/3 min-w-[300px] border-r bg-white overflow-y-auto">
 {emails.length === 0 ? (
 <div className="p-8 text-center text-slate-400">
 <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
 <p>No emails sent yet.</p>
 </div>
 ) : (
 <div className="divide-y">
 {emails.map(email => (
 <button
 key={email.id}
 onClick={() => setSelectedEmail(email.id)}
 className={cn(
 "w-full text-left p-4 hover:bg-white transition-colors focus:outline-none",
 selectedEmail === email.id && "bg-indigo-50 hover:bg-indigo-50 border-l-4 border-indigo-500"
 )}
 >
 <div className="flex justify-between items-start mb-1">
 <span className={cn(
 "text-xs font-bold px-2 py-0.5 rounded",
 email.type === 'booking_confirmation' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 "
 )}>
 {email.type}
 </span>
 <span className="text-xs text-slate-400">
 {new Date(email.sentAt).toLocaleTimeString()}
 </span>
 </div>
 <h3 className="font-bold text-slate-900 truncate mb-1">
 Booking Confirmed — {email.payload.subjectName}
 </h3>
 <p className="text-sm text-slate-500 truncate">
 To: {email.payload.studentEmail}
 </p>
 </button>
 ))}
 </div>
 )}
 </aside>

 {/* Email Content Preview */}
 <section className="flex-1 bg-slate-100 p-8 overflow-y-auto">
 {activeEmail ? (
 <div className="max-w-2xl mx-auto space-y-4">
 <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
 <div className="flex justify-between">
 <span className="text-slate-500 text-sm">To:</span>
 <span className="font-medium text-slate-900 ">{activeEmail.payload.studentEmail}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500 text-sm">Subject:</span>
 <span className="font-medium text-slate-900 ">Booking Confirmed — {activeEmail.payload.subjectName}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500 text-sm">Sent At:</span>
 <span className="text-slate-600 ">{new Date(activeEmail.sentAt).toLocaleString()}</span>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-sm border overflow-hidden min-h-[600px]">
 <iframe
 srcDoc={renderBookingEmailHtml(activeEmail.payload)}
 title="Email Preview"
 className="w-full h-[800px] border-none"
 />
 </div>
 </div>
 ) : (
 <div className="h-full flex items-center justify-center text-slate-400">
 <p>Select an email to view preview</p>
 </div>
 )}
 </section>
 </main>
 </div>
 );
}
