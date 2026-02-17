
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-50/50 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                Accepting New Students for 2025
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              {hero.headline.split("Takween")[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-600">
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
                className="h-12 px-8 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center shadow-sm"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>

            <div className="pt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-5 h-5" /> Trusted by 500+ Parents
              </div>
              <div className="hidden sm:flex items-center gap-2 font-bold">
                <Star className="w-5 h-5" /> 5-Star Rated Tutors
              </div>
              <div className="hidden sm:flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5" /> DBS Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Trust ── */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Tutors", value: "500+" },
            { label: "Sessions Taught", value: "10k+" },
            { label: "Exam Pass Rate", value: "98%" },
            { label: "Student Satisfaction", value: "4.9/5" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {differentiators.headline}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {differentiators.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-up delay-100">
            {[
              {
                data: differentiators.vision,
                icon: <Eye className="w-6 h-6" />,
                color: "from-blue-500 to-indigo-600",
              },
              {
                data: differentiators.mission,
                icon: <Target className="w-6 h-6" />,
                color: "from-amber-500 to-orange-600",
              },
              {
                data: differentiators.process,
                icon: <Compass className="w-6 h-6" />,
                color: "from-emerald-500 to-teal-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
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
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our 3-Step Teaching Process
            </h2>
            <p className="text-slate-600">
              A proven methodology that delivers measurable results every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-up delay-100">
            {teachingProcess.map((step) => {
              const icons = [
                <Search key="s" className="w-8 h-8" />,
                <BookOpen key="b" className="w-8 h-8" />,
                <BarChart3 key="c" className="w-8 h-8" />,
              ];
              const gradients = [
                "from-blue-500 to-indigo-600",
                "from-secondary to-amber-600",
                "from-emerald-500 to-teal-600",
              ];
              return (
                <div
                  key={step.step}
                  className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[step.step - 1]} text-white flex items-center justify-center shadow-lg`}
                    >
                      {icons[step.step - 1]}
                    </div>
                    <span className="text-5xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <a
                    href={step.cta.href}
                    className="text-sm font-semibold text-secondary hover:underline inline-flex items-center gap-1"
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
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Choose Your Subject
            </h2>
            <p className="text-slate-600">
              Expert tuition available across all major exam boards and subjects.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 fade-in-up delay-100">
            {subjects.map((subject) => (
              <a key={subject.slug} href={subject.slug} className="group block">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-secondary/30 h-full flex flex-col items-center text-center hover:-translate-y-1">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center">
                    {subject.icon}
                  </div>
                  <span className="font-semibold text-slate-800 group-hover:text-secondary transition-colors">
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
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Pricing System
            </h2>
            <p className="text-slate-600">
              No hidden fees. Choose the plan that fits your learning style.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up delay-200">
            {pricingTiers['GCSE'].map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative p-8 rounded-3xl border transition-all duration-300 flex flex-col",
                  tier.highlight
                    ? "bg-white border-secondary shadow-xl scale-[1.02] z-10"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{tier.emoji}</div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
                    {tier.ratio} Tuition — {tier.subtitle}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-600 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/register"
                  className={cn(
                    "w-full py-3.5 rounded-xl font-bold text-center transition-all block",
                    tier.highlight
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl relative hover:shadow-xl transition-all border border-slate-100 hover:border-slate-200"
              >
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, starI) => (
                    <Star
                      key={starI}
                      className={cn(
                        "w-4 h-4",
                        starI < t.rating ? "fill-current" : "text-slate-200"
                      )}
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-md text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Pick a Subject?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join the Takween Tutors family today. Your first consultation is on
            us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/subjects"
              className="inline-block bg-secondary text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-secondary/30 hover:bg-secondary/90 hover:-translate-y-1 transition-all"
            >
              Book First Session
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
