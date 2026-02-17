import { pricingMatrix, getPricingKey } from "@/content/pricingMatrix";

export const BASE_RATES = {
    "11-plus": 30,
    "gcse": 30, // Standard base
    "a-level": 40,
};

export type Level = keyof typeof BASE_RATES;

export interface PricingParams {
    tuitionType: string;
    level: string; // '11-plus' | 'gcse' | 'a-level'
    sessionMinutes: number;
    sessionsPerWeek: number;
}

export interface PricingResult {
    perSession: number;
    weekly: number;
    monthly: number;
}

export function getPrice({
    tuitionType,
    level,
    sessionMinutes,
    sessionsPerWeek,
}: PricingParams): PricingResult {

    // 1. Try exact match from matrix
    const key = getPricingKey(tuitionType, level, sessionMinutes, sessionsPerWeek);
    const rule = pricingMatrix[key];

    let perSession = 0;

    if (rule) {
        // Matrix stores price per 4-session block
        // We need per-session price for display
        perSession = rule.price / 4;
    } else {
        // Fallback calculation (shouldn't happen with full matrix but good for safety)
        // Default to GCSE base rate if not found
        console.warn(`Pricing key not found: ${key}, using fallback.`);
        const hourlyRate = BASE_RATES[level as Level] || 30;
        perSession = (hourlyRate / 60) * sessionMinutes;
    }

    // Weekly price
    const weekly = perSession * sessionsPerWeek;

    // Monthly price (based on 4 weeks per month as per user request)
    const monthly = weekly * 4;

    return {
        perSession: Math.round(perSession), // Round to nearest integer for clean display
        weekly: Math.round(weekly),
        monthly: Math.round(monthly),
    };
}
