
import React from "react";
import { ArrowRight, CheckCircle2, Star, Users, GraduationCap, Target, Heart, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const subjects = [
    { name: "GCSE Maths", slug: "/gcse-maths", icon: "📐" },
    { name: "GCSE Biology", slug: "/gcse-biology", icon: "🧬" },
    { name: "GCSE Chemistry", slug: "/gcse-chemistry", icon: "🧪" },
    { name: "GCSE Physics", slug: "/gcse-physics", icon: "⚡" },
    { name: "English Lit", slug: "/gcse-english-literature", icon: "📚" },
    { name: "English Lang", slug: "/gcse-english-language", icon: "📝" },
    { name: "Spanish", slug: "/gcse-spanish", icon: "🇪🇸" },
    { name: "History", slug: "/gcse-history", icon: "🏰" },
  ];

  const pricingTiers = [
    {
      name: "Platinum Path",
      emoji: "🏆",
      subtitle: "1:1 Tuition",
      price: "£45",
      period: "/hr",
      features: ["Dedicated 1:1 attention", "Custom learning plan", "24/7 Resource access", "Priority booking"],
      highlight: true
    },
    {
      name: "Gold Edge",
      emoji: "🥇",
      subtitle: "2:1 Tuition",
      price: "£35",
      period: "/hr",
      features: ["Small group dynamic", "Peer collaboration", "Standard resource access", "Flexible booking"],
      highlight: false
    },
    {
      name: "Silver Advantage",
      emoji: "🥈",
      subtitle: "3:1 Tuition",
      price: "£25",
      period: "/hr",
      features: ["Interactive sessions", "Group problem solving", "Weekly assignments", "Monthly reports"],
      highlight: false
    },
  ];

  const testimonials = [
    {
      name: "Amina Rafiq",
      role: "Parent",
      text: "Takween Tutors matched my daughter with an outstanding maths tutor. Her confidence soared and she went from a Grade 5 to a Grade 8!",
      rating: 5
    },
    {
      name: "Isabella Russo",
      role: "Student",
      text: "The 1:1 Platinum sessions helped me grasp complex A-Level Physics concepts. My tutor was patient and explained things clearly.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Student",
      text: "I joined the Silver group for English. It was fun to learn with others, and the discussions really improved my essay skills.",
      rating: 4
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-50/50 blur-3xl"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Accepting New Students for 2024</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Master Your Subjects with <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-600">Takween</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Experience personalised tuition that adapts to your learning style. From GCSEs to A-Levels, we bridge the gap between potential and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/register" className="btn-secondary h-12 px-8 text-lg hover:scale-105 transition-transform">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/subjects" className="h-12 px-8 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center shadow-sm">
                Explore Subjects
              </a>
            </div>

            <div className="pt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
               {/* Trust Indicators / Mock Logos */}
               <div className="flex items-center gap-2 font-bold"><ShieldCheck className="w-5 h-5" /> Trusted by 500+ Parents</div>
               <div className="hidden sm:flex items-center gap-2 font-bold"><Star className="w-5 h-5" /> 5-Star Rated Tutors</div>
               <div className="hidden sm:flex items-center gap-2 font-bold"><CheckCircle2 className="w-5 h-5" /> DBS Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: "Active Tutors", value: "500+" },
             { label: "Sessions Taught", value: "10k+" },
             { label: "Exam Pass Rate", value: "98%" },
             { label: "Student Satisfaction", value: "4.9/5" },
           ].map((stat, i) => (
             <div key={i} className="text-center">
               <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Features / Story */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container-custom">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 fade-in-up delay-100">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Education Reimagined for the Digital Age</h2>
                 <p className="text-slate-600 text-lg leading-relaxed">
                   We moved beyond the traditional classroom. Our platform connects you with expert tutors using cutting-edge tools to make learning interactive, engaging, and effective.
                 </p>
                 <div className="space-y-4">
                    {[
                      { title: "Interactive Whiteboard", desc: "Collaborate in real-time on complex problems." },
                      { title: "Progress Tracking", desc: "Visualise your improvement with detailed analytics." },
                      { title: "Resource Library", desc: "Access recorded sessions and revision notes 24/7." },
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                           <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <div>
                           <h3 className="font-bold text-slate-900">{feature.title}</h3>
                           <p className="text-sm text-slate-500">{feature.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative fade-in-up delay-200">
                 <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-blue-500/20 rounded-3xl blur-2xl transform rotate-3 scale-105"></div>
                 <div className="bg-white rounded-3xl p-2 shadow-2xl relative border border-slate-100">
                    <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-[4/3] relative">
                       {/* Abstract Interface Representation */}
                       <div className="absolute top-4 left-4 right-4 h-8 bg-white rounded-lg shadow-sm flex items-center px-3 gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                       </div>
                       <div className="absolute top-16 left-4 w-1/4 bottom-4 bg-white rounded-xl shadow-sm p-3 space-y-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                          <div className="h-2 w-full bg-slate-100 rounded"></div>
                          <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                       </div>
                       <div className="absolute top-16 right-4 w-2/3 bottom-4 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
                               <Zap className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-bold text-slate-400">Live Session Active</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Find Your Subject</h2>
            <p className="text-slate-600">Expert tuition available across all major exam boards and subjects.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-up delay-100">
            {subjects.map((subject) => (
              <a key={subject.slug} href={subject.slug} className="group block">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-secondary/30 h-full flex flex-col items-center text-center hover:-translate-y-1">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center">{subject.icon}</div>
                  <span className="font-semibold text-slate-800 group-hover:text-secondary transition-colors">{subject.name}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/subjects" className="text-secondary font-bold hover:underline inline-flex items-center gap-2">
              View All 40+ Subjects <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">No hidden fees. Pay as you go or save with packages.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-stretch fade-in-up delay-200">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className={`w-full max-w-sm relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${tier.highlight ? 'bg-white border-secondary shadow-xl scale-105 z-10' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                   <div className="text-4xl mb-2">{tier.emoji}</div>
                   <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{tier.subtitle}</p>
                </div>
                
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500 font-medium">{tier.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="/register" className={`w-full py-3.5 rounded-xl font-bold text-center transition-all ${tier.highlight ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-custom">
           <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What Our Community Says</h2>
           <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl relative hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                 <div className="flex gap-1 text-amber-400 mb-4">
                   {[...Array(5)].map((_, starI) => (
                     <Star key={starI} className={cn("w-4 h-4", starI < t.rating ? "fill-current" : "text-slate-200")} />
                   ))}
                 </div>
                 <p className="text-slate-700 mb-6 italic leading-relaxed">"{t.text}"</p>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
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

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to Excel?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join the Takween Tutors family today. Your first consultation is on us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="inline-block bg-secondary text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-secondary/30 hover:bg-secondary/90 hover:-translate-y-1 transition-all">
              Book First Session
            </a>
            <a href="/contact" className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all">
              Talk to an Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
