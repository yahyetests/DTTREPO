// ──────────────────────────────────────────────────────────
// Backend Pricing Engine
// Mirrors the frontend pricing matrix so checkout amounts
// are always calculated server-side (tamper-proof).
// ──────────────────────────────────────────────────────────

export type TierKey =
    | 'platinum-path'
    | 'gold-edge'
    | 'silver-advantage'
    | 'bronze-boost'
    | 'foundational-fixes'
    | 'foundational-focus';

export type LevelKey = '11-plus' | 'gcse' | 'a-level' | 'btec';

// Weekly prices (4 × 1-hour sessions) — from PRD
const TIER_WEEKLY_PRICES: Record<TierKey, Record<LevelKey, number>> = {
    'platinum-path': { '11-plus': 125, gcse: 175, 'a-level': 225, btec: 200 },
    'gold-edge': { '11-plus': 75, gcse: 125, 'a-level': 175, btec: 150 },
    'silver-advantage': { '11-plus': 50, gcse: 100, 'a-level': 150, btec: 120 },
    'bronze-boost': { '11-plus': 30, gcse: 80, 'a-level': 130, btec: 100 },
    'foundational-fixes': { '11-plus': 25, gcse: 75, 'a-level': 75, btec: 70 },
    'foundational-focus': { '11-plus': 15, gcse: 50, 'a-level': 65, btec: 50 },
};

const TIER_LABELS: Record<TierKey, string> = {
    'platinum-path': 'Platinum Path (1:1)',
    'gold-edge': 'Gold Edge (2:1)',
    'silver-advantage': 'Silver Advantage (3:1)',
    'bronze-boost': 'Bronze Boost (5:1)',
    'foundational-fixes': 'Foundational Fixes (6:1)',
    'foundational-focus': 'Foundational Focus (10:1)',
};

const LEVEL_LABELS: Record<LevelKey, string> = {
    '11-plus': '11+',
    gcse: 'GCSE',
    'a-level': 'A-Level',
    btec: 'BTEC',
};

const ALL_TIERS: TierKey[] = [
    'platinum-path',
    'gold-edge',
    'silver-advantage',
    'bronze-boost',
    'foundational-fixes',
    'foundational-focus',
];

const ALL_LEVELS: LevelKey[] = ['11-plus', 'gcse', 'a-level', 'btec'];

export interface PricingInput {
    tier: string;
    level: string;
    sessionMinutes: number; // 60 | 90 | 120
    sessionsPerWeek: number; // 1-7
}

export interface PricingOutput {
    /** Price per session in pence (minor unit for Stripe) */
    unitAmountPence: number;
    /** Stripe line‐item product name */
    productName: string;
    /** Stripe line‐item description */
    productDescription: string;
    /** Human-readable per-session price (£) */
    perSession: number;
    /** Quantity to charge */
    quantity: number;
}

/**
 * Compute the Stripe-ready price for a booking.
 * Throws if the tier or level is unrecognised.
 */
export function computeCheckoutPrice(input: PricingInput): PricingOutput {
    const tier = input.tier as TierKey;
    const level = input.level as LevelKey;

    if (!ALL_TIERS.includes(tier)) {
        throw new Error(`Unknown tier: ${input.tier}`);
    }
    if (!ALL_LEVELS.includes(level)) {
        throw new Error(`Unknown level: ${input.level}`);
    }

    const baseWeekly = TIER_WEEKLY_PRICES[tier][level];
    const basePerSession = baseWeekly / 4; // 4 sessions standard
    const durationMultiplier = input.sessionMinutes / 60;
    const perSession = Math.round(basePerSession * durationMultiplier);
    const quantity = input.sessionsPerWeek;

    const tierLabel = TIER_LABELS[tier];
    const levelLabel = LEVEL_LABELS[level];

    return {
        unitAmountPence: perSession * 100, // £ → pence
        perSession,
        quantity,
        productName: `${levelLabel} ${tierLabel} Tuition`,
        productDescription: `${input.sessionMinutes}-minute session · ${levelLabel} · ${tierLabel}`,
    };
}
