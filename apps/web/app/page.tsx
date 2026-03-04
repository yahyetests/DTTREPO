
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
            <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-36 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Subtle background shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-soft backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                                Accepting New Students for 2026
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
                            {hero.headline.split("Takween")[0]}
                            <span className="text-secondary">
                                Takween
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {hero.subheadline}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <a
                                href={hero.cta.href}
                                className="btn-secondary h-12 px-8 text-lg hover:scale-105 transition-transform"
                            >
                                {hero.cta.label} <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href={hero.ctaSecondary.href}
                                className="h-12 px-8 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center shadow-soft"
                            >
                                {hero.ctaSecondary.label}
                            </a>
                        </div>

                        <div className="pt-8 sm:pt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-400 text-sm">
                            <div className="flex items-center gap-2 font-semibold">
                                <ShieldCheck className="w-5 h-5 text-accent" /> Trusted by 500+ Parents
                            </div>
                            <div className="hidden sm:flex items-center gap-2 font-semibold">
                                <Star className="w-5 h-5 text-secondary" /> 5-Star Rated Tutors
                            </div>
                            <div className="hidden sm:flex items-center gap-2 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> DBS Verified
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats / Trust ── */}
            <section className="py-6 sm:py-10 bg-white border-y border-slate-200">
                <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {[
                        { label: "Active Tutors", value: "500+", emoji: "👩‍🏫" },
                        { label: "Sessions Taught", value: "10k+", emoji: "📚" },
                        { label: "Exam Pass Rate", value: "98%", emoji: "🎯" },
                        { label: "Student Satisfaction", value: "4.9/5", emoji: "⭐" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-2xl mb-2">{stat.emoji}</div>
                            <p className="text-3xl font-bold text-primary mb-1">
                                {stat.value}
                            </p>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

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
                                className="card-default p-8"
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
                                    className="card-default p-8 group"
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
                        {subjects.map((subject) => (
                            <a key={subject.slug} href={subject.slug} className="group block">
                                <div className="card-default p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center text-center">
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
                        {pricingTiers['GCSE'].map((tier) => (
                            <div
                                key={tier.name}
                                className={cn(
                                    "relative p-8 rounded-2xl border transition-all duration-300 flex flex-col",
                                    tier.highlight
                                        ? "bg-white border-secondary/40 shadow-glow scale-[1.02] z-10"
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
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/subjects"
                            className="inline-block bg-secondary text-white font-bold py-4 px-10 rounded-full shadow-glow hover:-translate-y-1 transition-all"
                        >
                            Book First Session 🚀
                        </a>
                        <a
                            href="/contact"
                            className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all"
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
