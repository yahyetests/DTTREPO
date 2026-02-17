// ──────────────────────────────────────────────────────────
// Stripe checkout link mappings per subject + pricing tier
// Generated from the Takween pricing structure
// ──────────────────────────────────────────────────────────

export interface StripeTierLink {
    tierName: string;
    ratio: string;
    priceLabel: string;
    stripeUrl: string;
}

export interface SubjectStripeLinks {
    subjectSlug: string;
    tiers: StripeTierLink[];
}

// Default pricing tiers (applies to all subjects)
// Default pricing tiers (mapped to Tuition Types)
const defaultTiers: StripeTierLink[] = [
    {
        tierName: "1:1 Tuition",
        ratio: "1:1",
        priceLabel: "£45 / 4 sessions",
        stripeUrl: "/mock-payment?plan=1-1-tuition",
    },
    {
        tierName: "Group Tuition",
        ratio: "SMALL GROUP",
        priceLabel: "£35 / 4 sessions",
        stripeUrl: "/mock-payment?plan=group-tuition",
    },
    {
        tierName: "Intensive Revision",
        ratio: "INTENSIVE",
        priceLabel: "£55 / 4 sessions",
        stripeUrl: "/mock-payment?plan=intensive-revision",
    },
    {
        tierName: "Homework Support",
        ratio: "SUPPORT",
        priceLabel: "£25 / 4 sessions",
        stripeUrl: "/mock-payment?plan=homework-support",
    },
];

// Subject-specific overrides (if a subject has unique Stripe links)
const subjectOverrides: Record<string, StripeTierLink[]> = {
    // Add per-subject Stripe link overrides here when available
    // e.g.:
    // "gcse-maths": [
    //   { tierName: "Platinum Path", ratio: "1:1", priceLabel: "£45/hr", stripeUrl: "https://buy.stripe.com/takween_gcse_maths_platinum" },
    // ],
};

export function getStripeLinksForSubject(slug: string): StripeTierLink[] {
    return subjectOverrides[slug] || defaultTiers;
}

// Tier icons for UI display
export const tierEmojis: Record<string, string> = {
    "Platinum Path": "🏆",
    "Gold Edge": "🥇",
    "Silver Advantage": "🥈",
    "Bronze Boost": "🥉",
    "Foundational Fixes": "✏️",
    "Foundational Focus": "📘",
};
