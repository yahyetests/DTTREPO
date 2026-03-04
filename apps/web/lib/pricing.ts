import {
 pricingMatrix,
 getPricingKey,
 TIER_WEEKLY_PRICES,
 LEGACY_TYPE_TO_TIER,
 type TierKey,
 type LevelKey,
} from "@/content/pricingMatrix";

export type Level = LevelKey;

export const BASE_RATES: Record<LevelKey, number> = {
 "11-plus": 15, // Foundational Focus baseline
 "gcse": 50,
 "a-level": 65,
 "btec": 50,
};

export interface PricingParams {
 tuitionType: string; // tier key e.g. 'platinum-path' or legacy '1-1-tuition'
 level: string; // '11-plus' | 'gcse' | 'a-level' | 'btec'
 sessionMinutes: number;
 sessionsPerWeek: number;
}

export interface PricingResult {
 perSession: number;
 weekly: number;
 monthly: number;
}

/**
 * Resolve a tuition type string to a valid TierKey.
 * Supports both new tier keys and legacy tuition type IDs.
 */
function resolveTierKey(tuitionType: string): TierKey {
 // Check if it's already a valid tier key
 if (tuitionType in TIER_WEEKLY_PRICES) {
 return tuitionType as TierKey;
 }
 // Try legacy mapping
 if (tuitionType in LEGACY_TYPE_TO_TIER) {
 return LEGACY_TYPE_TO_TIER[tuitionType];
 }
 // Default to platinum
 return 'platinum-path';
}

export function getPrice({
 tuitionType,
 level,
 sessionMinutes,
 sessionsPerWeek,
}: PricingParams): PricingResult {

 const tierKey = resolveTierKey(tuitionType);
 const levelKey = level as LevelKey;

 // 1. Try exact match with duration & frequency
 const extendedKey = getPricingKey(tierKey, levelKey, sessionMinutes, sessionsPerWeek);
 const extendedRule = pricingMatrix[extendedKey];

 if (extendedRule) {
 const weekly = extendedRule.perSession * sessionsPerWeek;
 return {
 perSession: extendedRule.perSession,
 weekly: Math.round(weekly),
 monthly: Math.round(weekly * 4),
 };
 }

 // 2. Try simple key (standard 4×60min)
 const simpleKey = getPricingKey(tierKey, levelKey);
 const simpleRule = pricingMatrix[simpleKey];

 if (simpleRule) {
 // Adjust for non-standard duration
 const durationMult = sessionMinutes / 60;
 const perSession = Math.round(simpleRule.perSession * durationMult);
 const weekly = perSession * sessionsPerWeek;

 return {
 perSession,
 weekly: Math.round(weekly),
 monthly: Math.round(weekly * 4),
 };
 }

 // 3. Fallback
 console.warn(`Pricing key not found: tier=${tierKey}, level=${levelKey}, using fallback.`);
 const hourlyRate = BASE_RATES[levelKey] || 30;
 const perSession = Math.round((hourlyRate / 60) * sessionMinutes);
 const weekly = perSession * sessionsPerWeek;

 return {
 perSession,
 weekly: Math.round(weekly),
 monthly: Math.round(weekly * 4),
 };
}
