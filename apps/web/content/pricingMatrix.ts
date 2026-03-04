// ──────────────────────────────────────────────────────────
// Pricing Matrix — Source of truth for tier-based pricing
// Maps: tierKey + level → weekly price (4 sessions × 1hr)
// ──────────────────────────────────────────────────────────

export interface PricingRule {
 weeklyPrice: number; // Price for 4 sessions (1hr each)
 perSession: number; // Price per individual session
 description?: string;
}

export type TierKey = 'platinum-path' | 'gold-edge' | 'silver-advantage' | 'bronze-boost' | 'foundational-fixes' | 'foundational-focus';
export type LevelKey = '11-plus' | 'gcse' | 'a-level' | 'btec';

// Helper to generate a lookup key
export const getPricingKey = (
 tier: string,
 level: string,
 duration?: number,
 frequency?: number
): string => {
 if (duration && frequency) {
 return `${tier}|${level}|${duration}|${frequency}`;
 }
 return `${tier}|${level}`;
};

// ──────────────────────────────────────────────────────────
// WEEKLY PRICES (4 × 1-hour sessions) — from PRD
// ──────────────────────────────────────────────────────────
export const TIER_WEEKLY_PRICES: Record<TierKey, Record<LevelKey, number>> = {
 'platinum-path': {
 '11-plus': 125,
 'gcse': 175,
 'a-level': 225,
 'btec': 200,
 },
 'gold-edge': {
 '11-plus': 75,
 'gcse': 125,
 'a-level': 175,
 'btec': 150,
 },
 'silver-advantage': {
 '11-plus': 50,
 'gcse': 100,
 'a-level': 150,
 'btec': 120,
 },
 'bronze-boost': {
 '11-plus': 30,
 'gcse': 80,
 'a-level': 130,
 'btec': 100,
 },
 'foundational-fixes': {
 '11-plus': 25,
 'gcse': 75,
 'a-level': 75,
 'btec': 70,
 },
 'foundational-focus': {
 '11-plus': 15,
 'gcse': 50,
 'a-level': 65,
 'btec': 50,
 },
};

// Tier metadata for display & matching
export const TIER_META: Record<TierKey, { name: string; ratio: string; ratioNum: number }> = {
 'platinum-path': { name: 'Platinum Path', ratio: '1:1', ratioNum: 1 },
 'gold-edge': { name: 'Gold Edge', ratio: '2:1', ratioNum: 2 },
 'silver-advantage': { name: 'Silver Advantage', ratio: '3:1', ratioNum: 3 },
 'bronze-boost': { name: 'Bronze Boost', ratio: '5:1', ratioNum: 5 },
 'foundational-fixes': { name: 'Foundational Fixes', ratio: '6:1', ratioNum: 6 },
 'foundational-focus': { name: 'Foundational Focus', ratio: '10:1', ratioNum: 10 },
};

export const ALL_TIERS: TierKey[] = [
 'platinum-path',
 'gold-edge',
 'silver-advantage',
 'bronze-boost',
 'foundational-fixes',
 'foundational-focus',
];

export const ALL_LEVELS: LevelKey[] = ['11-plus', 'gcse', 'a-level', 'btec'];

// ──────────────────────────────────────────────────────────
// Build the pricing matrix for all combinations
// Supports custom durations and frequencies for future use
// ──────────────────────────────────────────────────────────
export const pricingMatrix: Record<string, PricingRule> = {};

const frequencies = [1, 2, 3, 4, 5];
const durations = [60, 90, 120];

// Populate matrix
ALL_TIERS.forEach(tier => {
 ALL_LEVELS.forEach(level => {
 const baseWeekly = TIER_WEEKLY_PRICES[tier][level];
 const basePerSession = baseWeekly / 4; // 4 sessions standard

 // Simple key (tier|level) — for standard 4×60min lookup
 const simpleKey = getPricingKey(tier, level);
 pricingMatrix[simpleKey] = {
 weeklyPrice: baseWeekly,
 perSession: basePerSession,
 };

 // Extended keys (tier|level|duration|frequency) — for custom booking
 durations.forEach(duration => {
 frequencies.forEach(freq => {
 const durationMult = duration / 60; // 60m=1, 90m=1.5, 120m=2
 const perSession = basePerSession * durationMult;
 const blockPrice = Math.round(perSession * 4); // 4-session block

 const key = getPricingKey(tier, level, duration, freq);
 pricingMatrix[key] = {
 weeklyPrice: Math.round(perSession * freq),
 perSession: Math.round(perSession),
 };
 });
 });
 });
});

// ──────────────────────────────────────────────────────────
// Helper: Get per-session price for a tier & level
// ──────────────────────────────────────────────────────────
export function getTierPrice(tier: TierKey, level: LevelKey): PricingRule {
 const key = getPricingKey(tier, level);
 return pricingMatrix[key] || { weeklyPrice: 0, perSession: 0 };
}

// ──────────────────────────────────────────────────────────
// Legacy compatibility: map old tuition types to tiers
// ──────────────────────────────────────────────────────────
export const LEGACY_TYPE_TO_TIER: Record<string, TierKey> = {
 '1-1-tuition': 'platinum-path',
 'group-tuition': 'silver-advantage',
 'intensive-revision': 'gold-edge',
 'homework-support': 'foundational-fixes',
};
