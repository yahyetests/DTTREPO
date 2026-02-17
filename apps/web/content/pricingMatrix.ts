// Pricing Matrix source of truth
// Keys: tuitionType + level + duration + frequency
// Returns: price (per 4-session block)

export interface PricingRule {
    price: number; // Price per 4-session block
    description?: string;
}

// Helper to generate a key
export const getPricingKey = (
    tuitionType: string,
    level: string, // '11-plus' | 'gcse' | 'a-level' | 'btec'
    duration: number, // 60 | 90 | 120
    frequency: number // 1 | 2 | 3...
): string => {
    return `${tuitionType}|${level}|${duration}|${frequency}`;
};

// Base rates (per hour) for calculation fallback
const BASE_RATES: Record<string, number> = {
    '1-1-tuition': 45,       // £45/hr base
    'group-tuition': 35,     // £35/hr base
    'intensive-revision': 55,// £55/hr base
    'homework-support': 25   // £25/hr base
};

// Level multipliers
const LEVEL_MULTIPLIERS: Record<string, number> = {
    '11-plus': 0.9,
    'gcse': 1.0,
    'a-level': 1.2
};

// Frequency discounts (optional, kept 1.0 for now as per previous logic)
const FREQUENCY_MULTIPLIERS: Record<number, number> = {
    1: 1.0,
    2: 1.0,
    3: 1.0,
};

export const pricingMatrix: Record<string, PricingRule> = {};

// Generator function to populate matrix with calculated defaults
// This ensures we have coverage even if specific override files are missing
// Explicit rates per tuition type and level (to match site-content.ts)
const HOURLY_RATES: Record<string, Record<string, number>> = {
    '1-1-tuition': { // Platinum
        '11-plus': 40,
        'gcse': 45,
        'a-level': 50,
        'btec': 45
    },
    'group-tuition': { // Silver (Standard Group - 3:1)
        '11-plus': 22,
        'gcse': 25,
        'a-level': 30,
        'btec': 25
    },
    // Adding hypothetical mappings for other types if they map to Gold/Bronze
    // For now assuming 'Intensive' is premium 1:1 + surcharge, 'Homework' is group - discount
    'intensive-revision': {
        '11-plus': 50,
        'gcse': 55,
        'a-level': 65,
        'btec': 55
    },
    'homework-support': {
        '11-plus': 15, // Bronze-ish
        'gcse': 18,
        'a-level': 22,
        'btec': 18
    }
};

const frequencies = [1, 2, 3, 4, 5];
const durations = [60, 90, 120];

Object.entries(HOURLY_RATES).forEach(([type, levelRates]) => {
    Object.entries(levelRates).forEach(([level, baseRate]) => {
        durations.forEach(duration => {
            frequencies.forEach(freq => {
                // Duration mult: 60m=1, 90m=1.5, 120m=2
                const durationMult = duration / 60;

                // Frequency discount (optional, kept flat for now)
                const freqMult = 1.0;

                const perSession = baseRate * durationMult * freqMult;

                // Cost per 4-session block
                const blockPrice = Math.round(perSession * 4);

                const key = getPricingKey(type, level, duration, freq);
                pricingMatrix[key] = {
                    price: blockPrice
                };
            });
        });
    });
});

// Manual Overrides (illustrative - replacing "Takween files" specific data)
// If we had the specific file, we would hardcore specific keys here.
// Example: Group GCSE 60m 1x is special offer £120 / 4 sessions
// pricingMatrix[getPricingKey('group-tuition', 'gcse', 60, 1)] = { price: 120 };
