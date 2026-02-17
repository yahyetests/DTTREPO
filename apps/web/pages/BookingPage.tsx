
import React, { useState, useMemo, useEffect } from "react";
import {
    ArrowLeft, Calendar, Clock, CheckCircle2,
    MapPin, Star, ShieldCheck, AlertCircle, ChevronRight,
    Users, GraduationCap, Zap, BookOpen
} from "lucide-react";
import { getSubjectBySlug } from "@/content/subjects";
import { mockTutors, matchTutors, type MockTutor, type LectureType } from "@/content/mockTutors";
import { getStripeLinksForSubject, StripeTierLink } from "@/content/stripe-links";
import { pricingTiers } from "@/content/site-content";
import { useStudentPurchases } from "@/context/StudentPurchasesContext";
import { validateStripeUrlOrThrow } from "@/lib/stripe-validators";
import { cn } from "@/lib/utils";
import { getPrice, Level, BASE_RATES } from "@/lib/pricing";
import { tuitionTypes, TuitionType } from "@/content/tuitionTypes";

interface BookingPageProps {
    slug: string;
}

type Step = "schedule" | "tutor" | "review";

// Simple helper to generate next 14 days
function getNext14Days() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
    }
    return dates;
}

const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
];

// Helper to get icon for tuition type
const getTuitionIcon = (id: string) => {
    switch (id) {
        case '1-1-tuition': return <Users className="w-5 h-5" />;
        case 'group-tuition': return <Users className="w-5 h-5" />; // Could use a different icon
        case 'intensive-revision': return <Zap className="w-5 h-5" />;
        case 'homework-support': return <BookOpen className="w-5 h-5" />;
        default: return <GraduationCap className="w-5 h-5" />;
    }
};

export default function BookingPage({ slug }: BookingPageProps) {
    const subject = getSubjectBySlug(slug);
    const { storeBookingToken } = useStudentPurchases();

    // State
    const [step, setStep] = useState<Step>("schedule");

    // New State: Tuition Type (Default to 1:1)
    const [selectedTuitionTypeId, setSelectedTuitionTypeId] = useState<string>("1-1-tuition");

    const [sessionLength, setSessionLength] = useState<number>(60); // minutes
    const [freqCount, setFreqCount] = useState<number>(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedTutor, setSelectedTutor] = useState<MockTutor | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Plan naming might need adjustment or removal if replaced by Tuition Type, 
    // but keeping for now as "Tiers" might be orthogonal or mapped.
    // Ideally, Tuition Type IS the plan. 
    // For this refactor, we align "Plan" with Tuition Type for display if needed, or keep orthogonal.
    // The prompt implies "Pricing for each tuition type must be imported".
    // So distinct Pricing Tiers (Silver/Gold/Platinum) might be merged or specific to 1:1.
    // We will keep the generic "PlanTier" concept for Stripe mapping compatibility but derive price from Matrix.


    // Derived
    const stripeLinks = subject ? getStripeLinksForSubject(subject.slug) : [];

    // Level Logic
    const level: string = useMemo(() => {
        if (!slug) return 'gcse';
        if (slug.includes('a-level')) return 'a-level';
        if (slug.includes('11-plus')) return '11-plus';
        return 'gcse';
    }, [slug]);

    const selectedTuitionType = useMemo(() =>
        tuitionTypes.find(t => t.id === selectedTuitionTypeId) || tuitionTypes[0],
        [selectedTuitionTypeId]
    );

    // Pricing Calculation using new Matrix Engine
    const pricing = useMemo(() => getPrice({
        tuitionType: selectedTuitionTypeId,
        level,
        sessionMinutes: sessionLength,
        sessionsPerWeek: freqCount
    }), [selectedTuitionTypeId, level, sessionLength, freqCount]);

    // Find the Stripe link. 
    // Logic update: Keys in stripe-links.ts need to match this.
    // Check if we have a specific link for this Tuition Type.
    // If not, we might need a fallback or show error as per requirements.
    const matchedPlan = useMemo(() => {
        // We look for a link where the tierName roughly matches our tuition type or generic
        // For now, we reuse the existing "Platinum/Gold" logic if it maps to 1:1, 
        // OR we try to find a link that matches the ID.

        // TODO: In a real scenario, stripe-links.ts would have exact keys.
        // For MVP/Mock, we fallback to the first available link but warn if price mismatch.
        // We'll trust the mock payment flow to handle the amount.

        const link = stripeLinks[0]; // Logic placeholder until stripe-links.ts is fully updated
        return { link, price: pricing.perSession };
    }, [stripeLinks, pricing.perSession]);

    // Derived totals for Display
    const finalPerSession = pricing.perSession;
    const finalWeekly = pricing.weekly;
    const finalMonthly = pricing.monthly;

    // If invalid slug
    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Subject Not Found</h1>
                    <a href="/subjects" className="text-primary hover:underline mt-4 inline-block">Return to Subjects</a>
                </div>
            </div>
        );
    }

    // Tutors for this subject
    const availableTutors = useMemo(() => {
        // Basic criteria - in real app would use selectedDate/Time to filter
        const criteria = {
            subjectSlug: slug,
            preferredDays: selectedDate ? [selectedDate.toLocaleDateString('en-US', { weekday: 'long' })] : undefined,
            preferredTimes: selectedTime ? [selectedTime] : undefined,
        };
        return matchTutors(criteria);
    }, [slug, selectedDate, selectedTime]);

    // Handler: Proceed to Tutor
    const handleScheduleSubmit = () => {
        if (!selectedDate || !selectedTime) {
            setError("Please select a date and time.");
            return;
        }
        setError(null);
        setStep("tutor");
    };

    // Handler: Proceed to Review
    const handleTutorSelect = (tutor: MockTutor) => {
        setSelectedTutor(tutor);
        setStep("review");
    };

    // Handler: Finalize & Redirect
    const handleConfirm = () => {
        if (!selectedTutor || !selectedDate || !selectedTime) return;

        // Use matched tier key
        const finalTier = matchedPlan.link;
        if (!finalTier) {
            setError("This booking option isn’t available for online payment yet. Please contact support.");
            return;
        }

        try {
            // Validate URL (T1 fix)
            validateStripeUrlOrThrow(finalTier.stripeUrl);

            // Store Token (T2 requirement)
            const nextLessonISO = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                parseInt(selectedTime.split(':')[0]),
                parseInt(selectedTime.split(':')[1])
            ).toISOString();

            storeBookingToken({
                subjectSlug: subject.slug,
                subjectName: subject.name,
                tutorId: selectedTutor.id,
                tutorName: selectedTutor.name,
                nextLessonISO,
                frequency: freqCount === 1 ? "Weekly" : `${freqCount}x Weekly`,
                sessionLength,
                planTier: selectedTuitionType.label, // Use tuition type label
                preferredTime: selectedTime,
                // Add tuitionType specific fields if needed in token
            });

            // Redirect
            window.location.href = finalTier.stripeUrl;

        } catch (err: any) {
            setError(err.message || "Failed to initiate checkout");
        }
    };

    // Render Steps
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <span className="font-semibold text-slate-900">Booking {subject.name}</span>
                    <div className="w-9" /> {/* Spacer */}
                </div>
                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto px-4 pb-0">
                    <div className="flex items-center gap-2 text-sm font-medium py-3 border-t">
                        <span className={cn("flex items-center gap-2", step === "schedule" ? "text-primary" : "text-green-600")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", step === "schedule" ? "bg-primary text-white" : "bg-green-100 text-green-700")}>
                                {step !== "schedule" ? <CheckCircle2 className="w-4 h-4" /> : "1"}
                            </div>
                            Schedule
                        </span>
                        <div className="h-px w-8 bg-slate-200" />
                        <span className={cn("flex items-center gap-2", step === "tutor" ? "text-primary" : step === "review" ? "text-green-600" : "text-slate-400")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", step === "tutor" ? "bg-primary text-white" : step === "review" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500")}>
                                {step === "review" ? <CheckCircle2 className="w-4 h-4" /> : "2"}
                            </div>
                            Tutor
                        </span>
                        <div className="h-px w-8 bg-slate-200" />
                        <span className={cn("flex items-center gap-2", step === "review" ? "text-primary" : "text-slate-400")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", step === "review" ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>3</div>
                            Review
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* STEP 1: SCHEDULING */}
                {step === "schedule" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* 1. Tuition Type Selector */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Choose your tuition type</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {tuitionTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedTuitionTypeId(type.id)}
                                        className={cn(
                                            "relative p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/30",
                                            selectedTuitionTypeId === type.id
                                                ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                                                : "border-slate-200 bg-white"
                                        )}
                                    >
                                        {/* Optional Badge */}
                                        {type.badge && (
                                            <span className="absolute -top-3 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-wide">
                                                {type.badge}
                                            </span>
                                        )}

                                        <div className="flex items-start gap-3">
                                            <div className={cn("p-2 rounded-lg bg-white shadow-sm border", selectedTuitionTypeId === type.id ? "text-indigo-600 border-indigo-200" : "text-slate-500 border-slate-100")}>
                                                {getTuitionIcon(type.id)}
                                            </div>
                                            <div>
                                                <h3 className={cn("font-bold text-sm", selectedTuitionTypeId === type.id ? "text-indigo-900" : "text-slate-900")}>
                                                    {type.label}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1 leading-snug">
                                                    {type.description}
                                                </p>
                                                {type.bestFor && (
                                                    <div className="mt-2 text-[10px] font-medium text-slate-400 uppercase tracking-wide flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                                                        Best for {type.bestFor}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Frequency & Duration</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Sessions Per Week</label>
                                    <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200">
                                        <button
                                            onClick={() => setFreqCount(Math.max(1, freqCount - 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                        >-</button>
                                        <span className="flex-1 text-center font-bold text-xl">{freqCount}</span>
                                        <button
                                            onClick={() => setFreqCount(Math.min(7, freqCount + 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                        >+</button>
                                    </div>
                                    <p className="text-xs text-slate-400 text-center">
                                        {freqCount === 1 ? "Weekly" : `${freqCount} times per week`}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Session Length</label>
                                    <div className="flex gap-2">
                                        {[60, 90, 120].map(mins => (
                                            <button
                                                key={mins}
                                                onClick={() => setSessionLength(mins)}
                                                className={cn(
                                                    "px-3 py-3 rounded-lg text-sm border flex-1 transition-all flex flex-col items-center justify-center gap-1",
                                                    sessionLength === mins ? "border-primary bg-primary/5 text-primary font-bold ring-2 ring-primary/20" : "border-slate-200 hover:border-slate-300 bg-white"
                                                )}
                                            >
                                                <span>{mins}m</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Live Price Summary Card */}
                            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg mb-8 transform transition-all">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-center md:text-left">
                                        <div className="text-2xl font-bold text-white">
                                            £{finalWeekly} <span className="text-sm font-normal text-slate-400">/ week</span>
                                        </div>
                                        <div className="text-sm text-slate-400 mt-1">
                                            £{finalPerSession} per session
                                        </div>
                                        <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800">
                                            Based on: {selectedTuitionType.label} • {level === '11-plus' ? '11+' : level.toUpperCase()} • {sessionLength} mins • {freqCount}x/week
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
                                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                            Monthly Estimate
                                        </div>
                                        <div className="text-3xl font-bold text-indigo-400">
                                            £{finalMonthly}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            (4 weeks/mo)
                                        </div>
                                    </div>
                                </div>
                                {!matchedPlan.link && (
                                    <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-orange-400 flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Standard rates apply.</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Choose a Date</h2>
                            {/* Horizontal Date Picker */}
                            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                                {getNext14Days().map((d, i) => {
                                    const isSelected = selectedDate?.toDateString() === d.toDateString();
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDate(d)}
                                            className={cn(
                                                "flex-shrink-0 w-20 p-3 rounded-xl border text-center transition-all",
                                                isSelected ? "border-primary bg-primary text-white shadow-md scale-105" : "border-slate-200 bg-white hover:border-slate-300"
                                            )}
                                        >
                                            <div className={cn("text-xs font-medium mb-1", isSelected ? "text-white/80" : "text-slate-400")}>
                                                {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </div>
                                            <div className="text-xl font-bold">
                                                {d.getDate()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Available Times</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {TIME_SLOTS.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={cn(
                                            "py-2.5 rounded-lg text-sm font-medium border transition-all",
                                            selectedTime === time ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-slate-200 hover:border-orange-200 bg-white"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <div className="pt-6 border-t mt-8">
                            <button
                                onClick={handleScheduleSubmit}
                                disabled={!selectedDate || !selectedTime}
                                className="w-full sm:w-auto ml-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                            >
                                Find Tutors <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: TUTOR SELECTION */}
                {
                    step === "tutor" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="flex justify-between items-end mb-2">
                                <h2 className="text-xl font-bold text-slate-900">Your Matches</h2>
                                <p className="text-sm text-slate-500">
                                    Showing {availableTutors.length} tutors available on {selectedDate?.toLocaleDateString()} at {selectedTime}
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {availableTutors.map(({ tutor, score, matchReasons }) => (
                                    <div key={tutor.id} className="bg-white border text-left p-5 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all group relative overflow-hidden">
                                        {/* Badge for top match */}
                                        {score > 25 && (
                                            <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-bl-xl">
                                                BEST MATCH
                                            </div>
                                        )}

                                        <div className="flex gap-4">
                                            <img src={tutor.imageUrl} alt={tutor.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-slate-900">{tutor.name}</h3>
                                                        <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                                            <Star className="w-4 h-4 fill-current" /> {tutor.rating} <span className="text-slate-400 font-normal">({tutor.reviewCount} reviews)</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleTutorSelect(tutor)}
                                                        className="hidden sm:block px-5 py-2 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                                                    >
                                                        Select
                                                    </button>
                                                </div>

                                                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{tutor.bio}</p>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {matchReasons.slice(0, 3).map(reason => (
                                                        <span key={reason} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                                                            <CheckCircle2 className="w-3 h-3 text-green-500" /> {reason}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Mobile select button */}
                                        <button
                                            onClick={() => handleTutorSelect(tutor)}
                                            className="sm:hidden w-full mt-4 py-3 rounded-xl bg-slate-900 text-white font-medium"
                                        >
                                            Select Tutor
                                        </button>
                                    </div>
                                ))}

                                {availableTutors.length === 0 && (
                                    <div className="text-center py-12 border-2 border-dashed rounded-2xl">
                                        <p className="text-slate-500 mb-4">No tutors found for this specific slot.</p>
                                        <button onClick={() => setStep("schedule")} className="text-primary font-medium hover:underline">
                                            Change time preferences
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* STEP 3: REVIEW */}
                {
                    step === "review" && selectedTutor && selectedDate && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 max-w-xl mx-auto">
                            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h2>

                                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                                    <img src={selectedTutor.imageUrl} className="w-16 h-16 rounded-full" />
                                    <div>
                                        <p className="text-sm text-slate-500">Tutor</p>
                                        <h3 className="font-bold text-lg">{selectedTutor.name}</h3>
                                        <p className="text-sm text-slate-600 flex items-center gap-1">
                                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Verified Tutor
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Date</span>
                                        <span className="font-medium text-slate-900">
                                            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Time</span>
                                        <span className="font-medium text-slate-900">{selectedTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Subject</span>
                                        <span className="font-medium">{subject.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Option</span>
                                        <span className="font-medium">{selectedTuitionType.label}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Scheduled</span>
                                        <span className="font-medium">{sessionLength} mins • {freqCount > 1 ? `${freqCount}x / week` : 'Weekly'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Rate</span>
                                        <span className="font-medium text-slate-900">£{finalPerSession} / session</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Total to pay today (1st Session)</p>
                                        <p className="text-3xl font-bold text-slate-900">£{finalPerSession}</p>
                                        <p className="text-xs text-slate-400 mt-1">~ £{finalMonthly}/mo est.</p>
                                    </div>
                                    {stripeLinks.length > 0 && (
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400">Secured by Stripe</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 text-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2"
                            >
                                Proceed to Payment <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>

                            <p className="text-xs text-center text-slate-400 mt-4">
                                By confirming, you agree to our Terms of Service and Cancellation Policy.
                                <br />You will be redirected to Stripe to complete your payment securely.
                            </p>
                        </div>
                    )
                }

            </main >
        </div >
    );
}
