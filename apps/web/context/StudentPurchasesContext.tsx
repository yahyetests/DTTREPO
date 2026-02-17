// ──────────────────────────────────────────────────────────
// Student Purchases — client-side store
// Persists to localStorage, accessible via React Context
// ──────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface ActiveSubject {
    subjectSlug: string;
    subjectName: string;
    tutorId: string;
    tutorName: string;
    planTier: string;
    frequency: string;
    sessionLength: number;
    bookedAt: string;   // ISO
}

export interface NextLesson {
    subjectSlug: string;
    subjectName: string;
    tutorName: string;
    dateISO: string;    // ISO date-time
    displayTime: string;
    sessionLength: number;
}

export interface BookingSummaryToken {
    subjectSlug: string;
    subjectName: string;
    tutorId: string;
    tutorName: string;
    nextLessonISO: string;
    frequency: string;
    sessionLength: number;
    planTier: string;
    preferredTime: string;
}

interface StudentPurchasesState {
    activeSubjects: ActiveSubject[];
    nextLessons: NextLesson[];
}

interface StudentPurchasesContextType extends StudentPurchasesState {
    addPurchase: (token: BookingSummaryToken) => void;
    removePurchase: (subjectSlug: string) => void;
    clearAll: () => void;
    storeBookingToken: (token: BookingSummaryToken) => void;
    retrieveBookingToken: () => BookingSummaryToken | null;
    clearBookingToken: () => void;
}

const PURCHASES_KEY = 'takween_student_purchases';
const BOOKING_TOKEN_KEY = 'takween_booking_token';

function loadPurchases(): StudentPurchasesState {
    try {
        const raw = localStorage.getItem(PURCHASES_KEY);
        return raw ? JSON.parse(raw) : { activeSubjects: [], nextLessons: [] };
    } catch { return { activeSubjects: [], nextLessons: [] }; }
}

function savePurchases(state: StudentPurchasesState) {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(state));
}

const StudentPurchasesContext = createContext<StudentPurchasesContextType | null>(null);

export function StudentPurchasesProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<StudentPurchasesState>(loadPurchases);

    // Persist on every change
    useEffect(() => { savePurchases(state); }, [state]);

    const addPurchase = useCallback((token: BookingSummaryToken) => {
        setState(prev => {
            // Avoid duplicates
            if (prev.activeSubjects.some(s => s.subjectSlug === token.subjectSlug)) return prev;

            const endTime = new Date(new Date(token.nextLessonISO).getTime() + token.sessionLength * 60000);
            const displayTime = `${new Date(token.nextLessonISO).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} – ${endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

            return {
                activeSubjects: [
                    ...prev.activeSubjects,
                    {
                        subjectSlug: token.subjectSlug,
                        subjectName: token.subjectName,
                        tutorId: token.tutorId,
                        tutorName: token.tutorName,
                        planTier: token.planTier,
                        frequency: token.frequency,
                        sessionLength: token.sessionLength,
                        bookedAt: new Date().toISOString(),
                    },
                ],
                nextLessons: [
                    ...prev.nextLessons,
                    {
                        subjectSlug: token.subjectSlug,
                        subjectName: token.subjectName,
                        tutorName: token.tutorName,
                        dateISO: token.nextLessonISO,
                        displayTime,
                        sessionLength: token.sessionLength,
                    },
                ],
            };
        });
    }, []);

    const removePurchase = useCallback((subjectSlug: string) => {
        setState(prev => ({
            activeSubjects: prev.activeSubjects.filter(s => s.subjectSlug !== subjectSlug),
            nextLessons: prev.nextLessons.filter(l => l.subjectSlug !== subjectSlug),
        }));
    }, []);

    const clearAll = useCallback(() => {
        setState({ activeSubjects: [], nextLessons: [] });
    }, []);

    const storeBookingToken = useCallback((token: BookingSummaryToken) => {
        sessionStorage.setItem(BOOKING_TOKEN_KEY, JSON.stringify(token));
    }, []);

    const retrieveBookingToken = useCallback((): BookingSummaryToken | null => {
        try {
            const raw = sessionStorage.getItem(BOOKING_TOKEN_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    }, []);

    const clearBookingToken = useCallback(() => {
        sessionStorage.removeItem(BOOKING_TOKEN_KEY);
    }, []);

    return (
        <StudentPurchasesContext.Provider value={{
            ...state,
            addPurchase, removePurchase, clearAll,
            storeBookingToken, retrieveBookingToken, clearBookingToken,
        }}>
            {children}
        </StudentPurchasesContext.Provider>
    );
}

export function useStudentPurchases() {
    const ctx = useContext(StudentPurchasesContext);
    if (!ctx) throw new Error('useStudentPurchases must be used inside StudentPurchasesProvider');
    return ctx;
}
