import React from 'react';
import { GraduationCap, Users, TrendingUp, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import TallyEmbed from '@/components/TallyEmbed';

const benefits = [
    {
        icon: <GraduationCap className="w-6 h-6" />,
        title: "Teach with Purpose",
        desc: "Be part of a tutoring platform designed by educators, not corporations. Your expertise matters here.",
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Grow Your Career",
        desc: "Access professional development, flexible scheduling, and competitive pay. We invest in our tutors.",
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Tools that Work",
        desc: "Our LMS handles admin, progress tracking, and resources — so you can focus on what you do best: teaching.",
    },
];

const steps = [
    { num: 1, title: "Submit Your Application", desc: "Fill out the form below. It takes about 5 minutes." },
    { num: 2, title: "We Review & Interview", desc: "Our team reviews your qualifications, experience, and DBS status. If shortlisted, we arrange a short interview." },
    { num: 3, title: "Start Teaching", desc: "Once approved, you'll be onboarded onto our LMS and matched with students in your subject areas." },
];

export default function BecomeATutorPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                        Now accepting applications
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                        Become a <span className="text-orange-600">Takween Tutor</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Join a mission-driven tutoring agency that values its educators. Flexible hours, fair pay, and a platform that actually helps you teach.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-3 gap-6">
                        {benefits.map((b) => (
                            <div key={b.title} className="group p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                    {b.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 bg-slate-50" id="apply">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Apply Now</h2>
                        <p className="text-slate-500">Fill out the form below and we'll be in touch within 48 hours.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                        <TallyEmbed />
                    </div>
                </div>
            </section>

            {/* What Happens Next */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What Happens Next?</h2>
                    <div className="space-y-0">
                        {steps.map((s, i) => (
                            <div key={s.num} className="flex gap-5 items-start pb-10 relative">
                                {/* Connector line */}
                                {i < steps.length - 1 && (
                                    <div className="absolute left-5 top-12 w-0.5 h-full bg-gradient-to-b from-orange-300 to-slate-200" />
                                )}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0 z-10">
                                    {s.num}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{s.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
