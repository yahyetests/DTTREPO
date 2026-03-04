
import React from 'react';
import { Shield, Lock, FileText, Cookie } from 'lucide-react';
import { useDocumentHead } from '@/lib/useDocumentHead';

const LegalLayout = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
 <div className="min-h-screen bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-card p-8 sm:p-12 border border-slate-200 ">
 <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 ">
 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary ">
 <Icon className="w-6 h-6" />
 </div>
 <h1 className="text-3xl font-bold text-primary ">{title}</h1>
 </div>
 <div className="prose prose-slate max-w-none [&_h3]:text-primary [&_h3]:font-bold [&_p]:text-slate-600 [&_li]:text-slate-600 [&_a]:text-primary [&_a]:font-bold">
 {children}
 </div>
 <div className="mt-8 pt-8 border-t border-slate-100 text-sm text-slate-400 flex items-center gap-2">
 Last updated: February 2026
 </div>
 </div>
 </div>
);

export function PrivacyPolicyPage() {
 useDocumentHead({
 title: "Privacy Policy",
 description: "Takween Tutors privacy policy. Learn how we collect, use, and protect your personal information."
 });

 return (
 <LegalLayout title="Privacy Policy" icon={Lock}>
 <p>At Takween Tutors, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
 <h3>1. Information We Collect</h3>
 <p>We collect information you provide directly to us, such as when you create an account, book a session, or contact us. This includes:</p>
 <ul>
 <li>Name and contact details</li>
 <li>Student details (age, grade level, subjects)</li>
 <li>Payment information (processed securely by Stripe)</li>
 </ul>
 <h3>2. How We Use Your Information</h3>
 <p>We use your information to provide and improve our services, process payments, and communicate with you about your bookings.</p>
 <h3>3. Data Security</h3>
 <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.</p>
 </LegalLayout>
 );
}

export function TermsPage() {
 useDocumentHead({
 title: "Terms & Conditions",
 description: "Takween Tutors terms and conditions. Read our booking, cancellation, and code of conduct policies."
 });

 return (
 <LegalLayout title="Terms & Conditions" icon={FileText}>
 <h3>1. Introduction</h3>
 <p>Welcome to Takween Tutors. By using our website and services, you agree to these terms and conditions.</p>
 <h3>2. Booking & Cancellations</h3>
 <p>Sessions can be cancelled or rescheduled up to 24 hours in advance without penalty. Cancellations within 24 hours may be charged in full.</p>
 <h3>3. Code of Conduct</h3>
 <p>We expect all students and tutors to treat each other with respect. Any form of harassment or inappropriate behavior will result in immediate termination of services.</p>
 </LegalLayout>
 );
}

export function CookiePolicyPage() {
 useDocumentHead({
 title: "Cookie Policy",
 description: "Takween Tutors cookie policy. Understand how we use cookies to enhance your browsing experience."
 });

 return (
 <LegalLayout title="Cookie Policy" icon={Cookie}>
 <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>
 <h3>Types of Cookies We Use</h3>
 <ul>
 <li><strong>Essential Cookies:</strong> Required for the website to function (e.g., login sessions).</li>
 <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site.</li>
 </ul>
 </LegalLayout>
 );
}

export function SafeguardingPage() {
 useDocumentHead({
 title: "Safeguarding Policy",
 description: "Takween Tutors safeguarding policy. The safety and welfare of our students is our highest priority."
 });

 return (
 <LegalLayout title="Safeguarding Policy" icon={Shield}>
 <p className="lead">The safety and welfare of our students is our highest priority.</p>
 <h3>Our Commitment</h3>
 <p>Takween Tutors is committed to creating a safe online environment for all students. We have strict recruitment processes and code of conduct for all tutors.</p>
 <h3>Tutor Vetting</h3>
 <p>All our tutors undergo:</p>
 <ul>
 <li>Identity checks</li>
 <li>Enhanced DBS checks (or equivalent)</li>
 <li>Reference verification</li>
 <li>Safeguarding training</li>
 </ul>
 <h3>Reporting Concerns</h3>
 <p>If you have any concerns about a student's safety, please contact our designated safeguarding lead immediately at <a href="mailto:safeguarding@takweentutors.com">safeguarding@takweentutors.com</a>.</p>
 </LegalLayout>
 );
}
