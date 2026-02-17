import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Star, Clock, Award, ShieldCheck, ChevronRight, X, ExternalLink } from 'lucide-react';
import { getSubjectBySlug, type Subject } from '@/content/subjects';
import { getQuizForSubject } from '@/content/quizzes';
import { getStripeLinksForSubject, tierEmojis, type StripeTierLink } from '@/content/stripe-links';
import { availableTutors } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import StarterQuiz from '@/components/StarterQuiz';

interface SubjectDetailPageProps {
    slug: string;
}

// Pricing modal
function PricingModal({ subject, tiers, onClose }: { subject: Subject; tiers: StripeTierLink[]; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Book {subject.name}</h3>
                        <p className="text-sm text-slate-500">Choose your pricing tier</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="p-6 space-y-3">
                    {tiers.map(tier => (
                        <button
                            key={tier.tierName}
                            onClick={() => {
                                onClose();
                                const url = `/checkout?tier=${encodeURIComponent(tier.tierName)}&subject=${subject.slug}`;
                                window.history.pushState({}, '', url);
                                window.dispatchEvent(new PopStateEvent('popstate'));
                            }}
                            className="flex items-center justify-between w-full p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all group text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{tierEmojis[tier.tierName] || '📦'}</span>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{tier.tierName}</p>
                                    <p className="text-xs text-slate-500">{tier.ratio} tutor-to-student</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-orange-600">{tier.priceLabel}</span>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SubjectDetailPage({ slug }: SubjectDetailPageProps) {
    const subject = getSubjectBySlug(slug);
    const { user } = useAuth();
    const [showPricing, setShowPricing] = useState(false);

    if (!subject) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Subject Not Found</h1>
                <p className="text-slate-500 mb-6">We couldn't find that subject. Browse our full catalogue below.</p>
                <a href="/subjects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> View All Subjects
                </a>
            </div>
        );
    }

    const quiz = getQuizForSubject(slug);
    const tiers = getStripeLinksForSubject(slug);

    // Match tutors whose subjects overlap with this subject's name/level
    const subjectTerms = [subject.name.toLowerCase(), subject.level.toLowerCase()];
    const matchedTutors = availableTutors.filter(t =>
        t.subjects.some(ts => {
            const lower = ts.toLowerCase();
            return subjectTerms.some(term => lower.includes(term.replace('gcse ', '').replace('a-level ', '').replace('11+ ', '').replace('btec ', '')));
        })
    );

    function handleBook() {
        window.history.pushState({}, '', `/subjects/${slug}/book`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    const navigate = (href: string) => {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <>
            {/* Subject Hero */}
            <section className="relative bg-gradient-to-b from-slate-50 to-white pt-16 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <button onClick={() => navigate('/subjects')} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Subjects
                    </button>
                    <div className="flex items-start gap-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center shrink-0`}>
                            <span className="text-3xl">{subject.icon}</span>
                        </div>
                        <div className="flex-1">
                            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-2">
                                {subject.level}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">{subject.name}</h1>
                            <p className="text-slate-500 leading-relaxed max-w-2xl">{subject.longDescription}</p>
                        </div>
                    </div>

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        {subject.examBoards.map(eb => (
                            <span key={eb} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5" /> {eb}
                            </span>
                        ))}
                    </div>

                    {/* Key topics */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {subject.keyTopics.map(topic => (
                            <span key={topic} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                                {topic}
                            </span>
                        ))}
                    </div>

                    {/* Book CTA (sticky-ish) */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleBook}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all text-sm"
                        >
                            <BookOpen className="w-4 h-4" />
                            Book this Subject
                        </button>
                        <a
                            href="#quiz"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
                        >
                            Try Starter Quiz
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Starter Quiz */}
            <section id="quiz" className="py-16 bg-slate-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">📝 Starter Quiz</h2>
                        <p className="text-slate-500 text-sm">
                            Test your current knowledge with a quick 5-question quiz. No account needed.
                        </p>
                    </div>
                    <StarterQuiz quiz={quiz} />
                </div>
            </section>

            {/* Tutors for this subject */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Tutors for {subject.name}</h2>
                    <p className="text-slate-500 text-sm mb-8">
                        {matchedTutors.length > 0
                            ? `We have ${matchedTutors.length} experienced tutor${matchedTutors.length > 1 ? 's' : ''} for this subject.`
                            : "We're currently recruiting tutors for this subject. Register your interest and we'll match you soon."}
                    </p>

                    {matchedTutors.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {matchedTutors.map(tutor => (
                                <div key={tutor.id} className="p-5 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={tutor.imageUrl}
                                            alt={tutor.name}
                                            className="w-12 h-12 rounded-full object-cover bg-slate-100"
                                        />
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">{tutor.name}</h3>
                                            <div className="flex items-center gap-1 text-xs text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span>{tutor.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{tutor.bio}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {tutor.subjects.slice(0, 3).map(s => (
                                            <span key={s} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium">{s}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <span className="text-sm font-bold text-slate-900">£{tutor.hourlyRate}/hr</span>
                                        <button
                                            onClick={handleBook}
                                            className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                        >
                                            Book →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 rounded-2xl border border-dashed border-slate-200">
                            <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500">Tutors coming soon for this subject.</p>
                            <button
                                onClick={() => navigate('/register')}
                                className="inline-flex items-center gap-1.5 text-sm text-orange-600 font-medium mt-3 hover:text-orange-700"
                            >
                                Register interest <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-3">Ready to start {subject.name}?</h2>
                    <p className="text-slate-300 mb-8">
                        Book your first session today. Your first consultation is on us.
                    </p>
                    <button
                        onClick={handleBook}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
                    >
                        <BookOpen className="w-4 h-4" />
                        Book this Subject
                    </button>
                </div>
            </section>

            {/* Pricing Modal */}
            {showPricing && (
                <PricingModal subject={subject} tiers={tiers} onClose={() => setShowPricing(false)} />
            )}
        </>
    );
}
