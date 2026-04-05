
import React from "react";
import {
    ArrowRight,
    CheckCircle2,
    Star,
    ShieldCheck,
    Zap,
    Target,
    Eye,
    Compass,
    BookOpen,
    Search,
    GraduationCap,
    BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    hero,
    subjects,
    pricingTiers,
    testimonials,
    teachingProcess,
    differentiators,
} from "@/content/site-content";
import { useDocumentHead } from "@/lib/useDocumentHead";

const LazyTestimonialsCarousel = React.lazy(() => import("@/components/TestimonialsCarousel").then(module => ({ default: module.TestimonialsCarousel })));

export default function Home() {
    useDocumentHead({
        title: "Home",
        description: "Takween Tutors - Personalised tuition platform for GCSE and A-Level success.",
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* ── Hero Section ── */}
            <main className="hero-bg min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center relative">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-100 rounded-full text-xs font-bold text-green-700 uppercase tracking-wider mb-8 animate-bounce">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Accepting New Students for 2026
                </div>

                {/* Content Wrapper */}
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    {/* Hero Text */}
                    <h1 className="main-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 text-balance">
                        Learn Smarter and <br className="hidden md:block" />
                        Achieve Faster with <br />
                        <span className="text-secondary">Takween</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
                        With our cutting-edge LMS it’s no wonder we are trusted by thousands of students to achieve their academic goals.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a href={hero.cta.href} className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-green-500 text-white rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-secondary/30">
                            Get Started
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                        <a href={hero.ctaSecondary.href} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 hover:border-secondary hover:text-secondary text-slate-700 rounded-full text-lg font-bold transition-all flex items-center justify-center">
                            Choose Plan
                        </a>
                    </div>

                    {/* Social Proof Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12" data-purpose="social-proof">
                        {/* Badge 1 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <span className="font-semibold text-slate-700">Trusted by 500+ Parents</span>
                        </div>
                        {/* Badge 2 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                            </div>
                            <span className="font-semibold text-slate-700">5-Star Rated Tutors</span>
                        </div>
                        {/* Badge 3 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <span className="font-semibold text-slate-700">DBS Verified</span>
                        </div>
                    </div>
                </div>

                {/* Floating Background Shapes */}
                <div className="absolute top-1/4 left-10 w-12 h-12 border-4 border-secondary/20 rounded-lg rotate-12 hidden lg:block"></div>
                <div className="absolute top-1/2 right-10 w-8 h-8 bg-blue-400/10 rounded-full hidden lg:block"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 border-4 border-yellow-400/20 rounded-full hidden lg:block"></div>

                {/* Classroom Doodles */}
                <div className="absolute top-20 left-[15%] text-blue-400 opacity-20 rotate-12 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-6xl">menu_book</span>
                </div>
                <div className="absolute top-40 right-[10%] text-yellow-400 opacity-20 -rotate-12 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-5xl">lightbulb</span>
                </div>
                <div className="absolute bottom-[20%] left-[5%] text-pink-400 opacity-20 rotate-45 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-4xl">edit</span>
                </div>
                <div className="absolute top-[60%] right-[5%] text-purple-400 opacity-20 -rotate-45 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-7xl">send</span>
                </div>
                <div className="absolute top-[15%] left-[45%] text-green-400 opacity-20 rotate-12 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-4xl">functions</span>
                </div>
                <div className="absolute bottom-[30%] right-[20%] text-orange-400 opacity-20 12 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-6xl">school</span>
                </div>
                <div className="absolute bottom-[10%] left-[40%] text-cyan-400 opacity-20 -rotate-12 select-none pointer-events-none">
                    <span className="material-symbols-outlined text-5xl">calculate</span>
                </div>
                <div className="absolute top-[40%] left-[8%] text-indigo-400 opacity-20 rotate-[30deg] select-none pointer-events-none">
                    <span className="material-symbols-outlined text-4xl">auto_stories</span>
                </div>
            </main>

            {/* ── What Makes Us Different ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 fade-in-up">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
                            {differentiators.headline}
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            {differentiators.description}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 fade-in-up delay-100">
                        {[
                            {
                                data: differentiators.vision,
                                icon: <Eye className="w-6 h-6" />,
                                color: "bg-primary",
                            },
                            {
                                data: differentiators.mission,
                                icon: <Target className="w-6 h-6" />,
                                color: "bg-secondary",
                            },
                            {
                                data: differentiators.process,
                                icon: <Compass className="w-6 h-6" />,
                                color: "bg-accent",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`card-default p-8 hover-lift fade-in-up delay-${(i % 3) * 100}`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center mb-5 shadow-soft`}
                                >
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">
                                    {item.data.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.data.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3-Step Teaching Process ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 fade-in-up">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                            Our 3-Step Teaching Process
                        </h2>
                        <p className="text-slate-600 ">
                            A proven methodology that delivers measurable results every time.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 fade-in-up delay-100">
                        {teachingProcess.map((step) => {
                            const icons = [
                                <Search key="s" className="w-8 h-8" />,
                                <BookOpen key="b" className="w-8 h-8" />,
                                <BarChart3 key="c" className="w-8 h-8" />,
                            ];
                            const colors = ["bg-primary", "bg-secondary", "bg-accent"];
                            return (
                                <div
                                    key={step.step}
                                    className="card-default p-8 hover-lift group"
                                >
                                    <div className="flex items-center gap-4 mb-5">
                                        <div
                                            className={`w-14 h-14 rounded-xl ${colors[step.step - 1]} text-white flex items-center justify-center shadow-soft`}
                                        >
                                            {icons[step.step - 1]}
                                        </div>
                                        <span className="text-5xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {step.description}
                                    </p>
                                    <a
                                        href={step.cta.href}
                                        className="text-sm font-bold text-secondary hover:underline inline-flex items-center gap-1"
                                    >
                                        {step.cta.label} <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Subjects Grid ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 fade-in-up">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                            Choose Your Subject 📖
                        </h2>
                        <p className="text-slate-600 ">
                            Expert tuition available across all major exam boards and subjects.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 fade-in-up delay-100">
                        {subjects.map((subject, idx) => (
                            <a key={subject.slug} href={subject.slug} className={`group block fade-in-up delay-${(idx % 4) * 100}`}>
                                <div className="card-default p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center text-center hover-lift">
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center">
                                        {subject.icon}
                                    </div>
                                    <span className="font-bold text-primary group-hover:text-secondary transition-colors">
                                        {subject.name}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <a
                            href="/subjects"
                            className="text-secondary font-bold hover:underline inline-flex items-center gap-2"
                        >
                            View All 40+ Subjects <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Pricing ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-8 sm:mb-16 fade-in-up">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                            Our Pricing System 💰
                        </h2>
                        <p className="text-slate-600 ">
                            No hidden fees. Choose the plan that fits your learning style.
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                            All prices based on 4 × 1 hour sessions per month
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 fade-in-up delay-200">
                        {pricingTiers['GCSE'].map((tier, idx) => (
                            <div
                                key={tier.name}
                                className={cn(
                                    "relative p-8 rounded-2xl border transition-all duration-300 flex flex-col hover-lift fade-in-up",
                                    `delay-${(idx % 3) * 100}`,
                                    tier.highlight
                                        ? "bg-white border-secondary/40 shadow-glow z-10"
                                        : "bg-white border-slate-200 shadow-card hover:shadow-card-hover"
                                )}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                                        ⭐ MOST POPULAR
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-2">{tier.emoji}</div>
                                    <h3 className="text-xl font-bold text-primary ">
                                        {tier.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">
                                        {tier.ratio} Tuition — {tier.subtitle}
                                    </p>
                                </div>

                                <div className="text-center mb-8">
                                    <span className="text-4xl font-bold text-primary ">
                                        {tier.price}
                                    </span>
                                    <span className="text-slate-400 font-medium">
                                        {tier.period}
                                    </span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.slice(0, 4).map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-slate-600 text-sm"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/pricing"
                                    className={cn(
                                        "w-full py-3.5 rounded-xl font-bold text-center transition-all block",
                                        tier.highlight
                                            ? "bg-secondary text-white shadow-glow hover:shadow-lg"
                                            : "bg-slate-100 text-primary hover:bg-slate-200 "
                                    )}
                                >
                                    See Pricing
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="/pricing"
                            className="text-secondary font-bold hover:underline inline-flex items-center gap-2"
                        >
                            View All Levels & Pricing <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white border-t border-slate-200">
                <div className="container-custom">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8 sm:mb-16">
                        What Our Community Says 💬
                    </h2>
                    <React.Suspense fallback={
                        <div className="flex gap-6 overflow-hidden">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-card animate-pulse min-h-[250px]" />
                            ))}
                        </div>
                    }>
                        <LazyTestimonialsCarousel />
                    </React.Suspense>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-12 sm:py-16 lg:py-24 bg-primary">
                <div className="container-custom text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Pick a Subject? 🎉
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                        Join the Takween Tutors family today. Your first consultation is on
                        us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
                        <a
                            href="/subjects"
                            className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-bold py-4 px-10 rounded-full shadow-glow hover-lift"
                        >
                            Book First Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/contact"
                            className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 hover-lift transition-all"
                        >
                            Talk to an Advisor
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
