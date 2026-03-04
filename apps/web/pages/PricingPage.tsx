import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, ArrowRight, ChevronLeft, ChevronRight, Quote, Sparkles, Users, Shield, BookOpen } from 'lucide-react';
import { pricingTiers, levelConfigs, type PricingTier } from '../content/site-content';
import { cn } from '../lib/utils';
import { Link } from '@/components/Link';
import { useDocumentHead } from '@/lib/useDocumentHead';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';

type Level = '11+' | 'GCSE' | 'A-Level' | 'BTEC';
const LEVELS: Level[] = ['11+', 'GCSE', 'A-Level', 'BTEC'];

// ── Pastel color system for each level ──
const LEVEL_COLORS: Record<Level, {
 primary: string;
 primaryLight: string;
 primaryDark: string;
 gradient: string;
 gradientSubtle: string;
 cardHighlightBorder: string;
 cardHighlightShadow: string;
 accentBg: string;
 accentText: string;
 checkColor: string;
 badgeBg: string;
 buttonBg: string;
 buttonHover: string;
 heroBg: string;
 pillActive: string;
 pillActiveText: string;
 ribbonGradient: string;
}> = {
 '11+': {
 primary: '#0EA5E9',
 primaryLight: '#7DD3FC',
 primaryDark: '#0284C7',
 gradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
 gradientSubtle: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)',
 cardHighlightBorder: '#7DD3FC',
 cardHighlightShadow: '0 20px 60px -10px rgba(14,165,233,0.15)',
 accentBg: '#F0F9FF',
 accentText: '#0284C7',
 checkColor: '#0EA5E9',
 badgeBg: '#0EA5E9',
 buttonBg: '#0EA5E9',
 buttonHover: '#0284C7',
 heroBg: 'linear-gradient(160deg, #F0F9FF 0%, #F8FAFC 100%)',
 pillActive: '#0EA5E9',
 pillActiveText: '#ffffff',
 ribbonGradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
 },
 'GCSE': {
 primary: '#0F172A',
 primaryLight: '#334155',
 primaryDark: '#020617',
 gradient: 'linear-gradient(135deg, #0F172A, #334155)',
 gradientSubtle: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
 cardHighlightBorder: '#D97706',
 cardHighlightShadow: '0 20px 60px -10px rgba(217,119,6,0.15)',
 accentBg: '#FFFBEB',
 accentText: '#B45309',
 checkColor: '#D97706',
 badgeBg: '#D97706',
 buttonBg: '#0F172A',
 buttonHover: '#1E293B',
 heroBg: 'linear-gradient(160deg, #F1F5F9 0%, #F8FAFC 100%)',
 pillActive: '#0F172A',
 pillActiveText: '#ffffff',
 ribbonGradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
 },
 'A-Level': {
 primary: '#D97706',
 primaryLight: '#FBBF24',
 primaryDark: '#B45309',
 gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
 gradientSubtle: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
 cardHighlightBorder: '#FBBF24',
 cardHighlightShadow: '0 20px 60px -10px rgba(217,119,6,0.15)',
 accentBg: '#FFFBEB',
 accentText: '#B45309',
 checkColor: '#D97706',
 badgeBg: '#D97706',
 buttonBg: '#D97706',
 buttonHover: '#B45309',
 heroBg: 'linear-gradient(160deg, #FFFBEB 0%, #F8FAFC 100%)',
 pillActive: '#D97706',
 pillActiveText: '#ffffff',
 ribbonGradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
 },
 'BTEC': {
 primary: '#059669',
 primaryLight: '#34D399',
 primaryDark: '#047857',
 gradient: 'linear-gradient(135deg, #059669, #34D399)',
 gradientSubtle: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
 cardHighlightBorder: '#34D399',
 cardHighlightShadow: '0 20px 60px -10px rgba(5,150,105,0.15)',
 accentBg: '#ECFDF5',
 accentText: '#047857',
 checkColor: '#059669',
 badgeBg: '#059669',
 buttonBg: '#059669',
 buttonHover: '#047857',
 heroBg: 'linear-gradient(160deg, #ECFDF5 0%, #F8FAFC 100%)',
 pillActive: '#059669',
 pillActiveText: '#ffffff',
 ribbonGradient: 'linear-gradient(135deg, #059669, #34D399)',
 },
};

// ── Pricing Card ──
interface PricingCardProps {
 tier: PricingTier;
 index: number;
 colors: typeof LEVEL_COLORS['GCSE'];
 level: Level;
}



const PricingCard: React.FC<PricingCardProps> = ({ tier, index, colors, level }) => {
 const isHighlight = tier.highlight;

 return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
 className={cn(
 "relative rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-300 group",
 isHighlight
 ? "bg-white border-2 scale-[1.02] lg:scale-105 z-10"
 : "bg-white border border-slate-200 hover:shadow-card"
 )}
 style={isHighlight ? {
 borderColor: colors.cardHighlightBorder,
 boxShadow: colors.cardHighlightShadow,
 } : undefined}
 >
 {/* Popular badge */}
 {isHighlight && (
 <div
 className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
 style={{ background: colors.ribbonGradient }}
 >
 <span className="flex items-center gap-1">
 <Sparkles className="w-3 h-3" />
 Most Popular
 </span>
 </div>
 )}

 {/* Header */}
 <div className="mb-5">
 <div className="text-3xl mb-3">{tier.emoji}</div>
 <h3 className="text-lg font-bold text-primary ">{tier.name}</h3>
 <p className="text-sm mt-1" style={{ color: colors.accentText }}>
 {tier.ratio} Tuition — {tier.subtitle}
 </p>
 </div>

 {/* Price Section */}
 <div
 className="mb-6 p-4 rounded-2xl border"
 style={{
 background: colors.accentBg,
 borderColor: `${colors.primary}20`,
 }}
 >
 <div className="flex items-baseline justify-center gap-1 text-primary ">
 <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
 <span className="text-sm font-medium text-slate-400">{tier.period}</span>
 </div>
 <div
 className="text-center mt-2 text-[11px] font-bold py-1 px-3 rounded-full uppercase tracking-wide inline-block"
 style={{
 background: `${colors.primary}15`,
 color: colors.accentText,
 }}
 >
 {tier.ratio} Student-to-Tutor Ratio
 </div>
 </div>

 {/* Features */}
 <ul className="space-y-3 mb-6 flex-1">
 {tier.features.map((feature, i) => (
 <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 ">
 <Check
 className="w-4 h-4 shrink-0 mt-0.5"
 style={{ color: colors.checkColor }}
 />
 <span>{feature}</span>
 </li>
 ))}
 </ul>

 {/* CTA Button */}
 <Link
 href={`/register`}
 className={cn(
 "w-full py-3.5 rounded-2xl font-bold text-center transition-all duration-200 flex items-center justify-center gap-2 text-sm",
 isHighlight
 ? "text-white shadow-card hover:shadow-lg transform hover:-translate-y-1"
 : "bg-slate-100 text-primary hover:bg-primary/10"
 )}
 style={isHighlight ? {
 background: colors.gradient,
 } : undefined}
 >
 Join Now
 <ArrowRight className="w-4 h-4" />
 </Link>
 </motion.div>
 );
};

// ── Main Pricing Page ──
const PricingPage = () => {
 useDocumentHead({
 title: "Pricing",
 description: "Flexible and affordable pricing plans for GCSE, A-Level, 11+, and BTEC tuition at Takween Tutors."
 });

 const [selectedLevel, setSelectedLevel] = useState<Level>('GCSE');
 const colors = LEVEL_COLORS[selectedLevel];
 const config = levelConfigs[selectedLevel];
 const tiers = pricingTiers[selectedLevel] || pricingTiers['GCSE'];

 return (
 <div className="min-h-screen bg-white ">
 {/* ── Hero Section ── */}
 <section
 className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
 style={{ background: colors.heroBg }}
 >


 {/* Decorative blobs */}
 <div
 className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
 style={{ background: colors.primary }}
 />
 <div
 className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
 style={{ background: colors.primary }}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
 {/* Level title badge */}
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-bold"
 style={{
 background: `${colors.primary}15`,
 color: colors.accentText,
 border: `1px solid ${colors.primary}25`,
 }}
 >
 <BookOpen className="w-4 h-4" />
 {selectedLevel} Tuition
 </motion.div>

 <AnimatePresence mode="wait">
 <motion.h1
 key={selectedLevel}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.4 }}
 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-5"
 >
 {config?.heading || `Please see our ${selectedLevel} pricing`}
 </motion.h1>
 </AnimatePresence>

 <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10">
 {config?.subheading || 'Choose the right support for your child\'s success.'}
 </p>

 {/* Level Selector Pills */}
 <div className="inline-flex items-center p-1.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-soft mb-4 overflow-x-auto max-w-full">
 {LEVELS.map((level) => (
 <button
 key={level}
 onClick={() => setSelectedLevel(level)}
 className={cn(
 "relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap"
 )}
 style={selectedLevel === level ? {
 background: colors.pillActive,
 color: colors.pillActiveText,
 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
 } : {
 color: '#8B7FA8',
 }}
 >
 {level} Pricing
 </button>
 ))}
 </div>

 <p className="text-xs text-slate-400 mt-3">
 All prices based on 4 × 1 hour sessions per month
 </p>
 </div>
 </section>

 {/* ── Pricing Cards Grid ── */}
 <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-4">
 <AnimatePresence mode="wait">
 <motion.div
 key={selectedLevel}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
 >
 {tiers.map((tier, index) => (
 <PricingCard
 key={`${selectedLevel}-${tier.name}`}
 tier={tier}
 index={index}
 colors={colors}
 level={selectedLevel}
 />
 ))}
 </motion.div>
 </AnimatePresence>

 {/* Trust indicators */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6 }}
 className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400"
 >
 <div className="flex items-center gap-2">
 <Shield className="w-5 h-5" style={{ color: colors.primary }} />
 <span>Secure Stripe payments</span>
 </div>
 <div className="flex items-center gap-2">
 <Users className="w-5 h-5" style={{ color: colors.primary }} />
 <span>DBS-checked tutors</span>
 </div>
 <div className="flex items-center gap-2">
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 <span>4.9/5 average rating</span>
 </div>
 </motion.div>
 </section>

 {/* ── Testimonials Section ── */}
 <section className="py-20 lg:py-28 bg-white border-t border-slate-100 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
 What our families say 💬
 </h2>
 <p className="text-lg text-slate-500 max-w-xl mx-auto">
 Trusted by hundreds of parents and students across the UK.
 </p>
 </div>
 <TestimonialsCarousel />
 </div>
 </section>

 {/* ── CTA Section ── */}
 <section className="py-20 lg:py-28 relative overflow-hidden">
 <div
 className="absolute inset-0 pointer-events-none"
 style={{ background: colors.gradientSubtle }}
 />
 <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
 Not sure which path to take? 🤔
 </h2>
 <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
 Our academic advisors are here to help you match the right tuition style to your child's goals.
 Book a free consultation today.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href="/pricing"
 className="px-8 py-4 text-white font-bold rounded-2xl transition-all duration-200 shadow-card hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
 style={{ background: colors.gradient }}
 >
 See our pricing
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/register"
 className="px-8 py-4 bg-gradient-to-r from-primary to-slate-700 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-200 shadow-card transform hover:-translate-y-1 flex items-center gap-2"
 >
 Join Now 🚀
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/contact"
 className="px-8 py-4 bg-white text-primary font-bold rounded-2xl border border-primary/15 hover:bg-slate-100 transition-colors flex items-center gap-2"
 >
 Contact Us
 </Link>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Testimonials */}
 <section className="py-10 sm:py-16 bg-white border-t border-slate-100 overflow-hidden">
 <div className="max-w-6xl mx-auto px-4 sm:px-6">
 <div className="text-center mb-10">
 <h2 className="text-3xl font-bold text-primary mb-3">Loved by Students & Parents</h2>
 <p className="text-slate-500 ">See why Takween is the #1 choice for academic excellence.</p>
 </div>
 <TestimonialsCarousel />
 </div>
 </section>
 </div>
 );
};

export default PricingPage;
