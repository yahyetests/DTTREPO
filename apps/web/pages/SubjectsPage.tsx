import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, GraduationCap } from 'lucide-react';
import { allSubjects, type Subject } from '@/content/subjects';

const levels = ["All", "GCSE", "A-Level", "11+", "BTEC"] as const;

export default function SubjectsPage() {
    const [search, setSearch] = useState('');
    const [level, setLevel] = useState<string>("All");

    const filtered = useMemo(() => {
        return allSubjects.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.description.toLowerCase().includes(search.toLowerCase());
            const matchesLevel = level === "All" || s.level === level;
            return matchesSearch && matchesLevel;
        });
    }, [search, level]);

    const navigate = (slug: string) => {
        window.history.pushState({}, '', `/subjects/${slug}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                        <BookOpen className="w-4 h-4" />
                        40 subjects available
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                        Choose Your <span className="text-orange-600">Subject</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
                        Browse our full range of GCSE, A-Level, 11+, and BTEC subjects. Every subject comes with expert tutors, starter quizzes, and flexible pricing.
                    </p>

                    {/* Search + Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search subjects…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Level filter pills */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex gap-2 py-4 overflow-x-auto">
                        {levels.map(lv => (
                            <button
                                key={lv}
                                onClick={() => setLevel(lv)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${level === lv
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {lv === "All" ? "All Levels" : lv}
                            </button>
                        ))}
                        <span className="flex items-center text-sm text-slate-400 ml-auto">
                            {filtered.length} subject{filtered.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </section>

            {/* Subject Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No subjects match your search. Try different keywords or filter.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filtered.map(subject => (
                                <button
                                    key={subject.slug}
                                    onClick={() => navigate(subject.slug)}
                                    className="group text-left p-5 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 bg-white"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`text-2xl w-11 h-11 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shrink-0`}>
                                            <span className="text-lg">{subject.icon}</span>
                                        </span>
                                        <div className="min-w-0">
                                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-1.5">
                                                {subject.level}
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                                                {subject.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                                {subject.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Can't find your subject?</h2>
                    <p className="text-slate-300 mb-8">
                        We're always adding new subjects. Get in touch and we'll do our best to match you with the right tutor.
                    </p>
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
                    >
                        Get Started
                    </a>
                </div>
            </section>
        </>
    );
}
