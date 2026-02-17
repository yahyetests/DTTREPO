import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { pricingTiers, subjects } from '../content/site-content';
import { cn } from '../lib/utils';
import { Link } from '@/components/Link';

type Level = '11+' | 'GCSE' | 'A-Level' | 'BTEC';

const PricingPage = () => {
    const [selectedLevel, setSelectedLevel] = useState<Level>('GCSE');

    // Filter or adjust pricing based on level if needed in the future.
    // For now, we use the static tiers but ostensibly they apply to the selected level.
    // In a real app, you might have different tiers per level.

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                        Choose the tuition style that’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">right for you.</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                        Flexible, affordable, and effective. Whether you need 1:1 mentorship or small group support, we have a plan to help you excel.
                    </p>

                    {/* Level Selector */}
                    <div className="inline-flex items-center p-1 bg-white rounded-full border border-slate-200 shadow-sm mb-16 overflow-x-auto max-w-full">
                        {(['11+', 'GCSE', 'A-Level', 'BTEC'] as Level[]).map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                                    selectedLevel === level
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                {level} Pricing
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(pricingTiers[selectedLevel] || pricingTiers['GCSE']).map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col",
                                tier.highlight
                                    ? "border-indigo-200 shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-100"
                                    : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="text-4xl mb-4">{tier.emoji}</div>
                                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                                <p className="text-slate-500 text-sm mt-1">{tier.subtitle}</p>
                            </div>

                            <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                                    <span className="text-3xl font-bold">{tier.price}</span>
                                    <span className="text-sm font-medium text-slate-500">{tier.period}</span>
                                </div>
                                <div className="text-center mt-2 text-xs font-bold text-indigo-600 bg-indigo-50 py-1 rounded uppercase tracking-wide">
                                    Ratio: {tier.ratio}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <Check className={cn("w-5 h-5 shrink-0", tier.highlight ? "text-indigo-600" : "text-green-500")} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/subjects/gcse-maths/book`} // Default to booking flow
                                className={cn(
                                    "w-full py-3 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2",
                                    tier.highlight
                                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-indigo-200"
                                        : "bg-white border-2 border-slate-200 text-slate-900 hover:border-slate-900"
                                )}
                            >
                                Choose Plan
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Simple Text CTA / Bottom Section */}
            <section className="bg-white py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Not sure which path to take?</h2>
                    <p className="text-lg text-slate-600 mb-8">
                        Our academic advisors are here to help you match the right tuition style to your goals.
                        Book a free consultation today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3 bg-slate-100 text-slate-900 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/register" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
