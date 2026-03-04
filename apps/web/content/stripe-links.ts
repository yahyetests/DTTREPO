// ──────────────────────────────────────────────────────────
// Stripe checkout link mappings per subject + pricing tier
// Updated for the 6-tier pricing system
// ──────────────────────────────────────────────────────────

export interface StripeTierLink {
 tierName: string;
 tierKey: string; // matches TierKey from pricingMatrix
 ratio: string;
 priceLabel: string;
 stripeUrl: string;
}

export interface SubjectStripeLinks {
 subjectSlug: string;
 tiers: StripeTierLink[];
}

// Default pricing tiers mapped to the 6-tier system
const defaultTiers: StripeTierLink[] = [
 {
 tierName: "Platinum Path",
 tierKey: "platinum-path",
 ratio: "1:1",
 priceLabel: "From £125/week",
 stripeUrl: "/mock-payment?plan=platinum-path",
 },
 {
 tierName: "Gold Edge",
 tierKey: "gold-edge",
 ratio: "2:1",
 priceLabel: "From £75/week",
 stripeUrl: "/mock-payment?plan=gold-edge",
 },
 {
 tierName: "Silver Advantage",
 tierKey: "silver-advantage",
 ratio: "3:1",
 priceLabel: "From £50/week",
 stripeUrl: "/mock-payment?plan=silver-advantage",
 },
 {
 tierName: "Bronze Boost",
 tierKey: "bronze-boost",
 ratio: "5:1",
 priceLabel: "From £30/week",
 stripeUrl: "/mock-payment?plan=bronze-boost",
 },
 {
 tierName: "Foundational Fixes",
 tierKey: "foundational-fixes",
 ratio: "6:1",
 priceLabel: "From £25/week",
 stripeUrl: "/mock-payment?plan=foundational-fixes",
 },
 {
 tierName: "Foundational Focus",
 tierKey: "foundational-focus",
 ratio: "10:1",
 priceLabel: "From £15/week",
 stripeUrl: "/mock-payment?plan=foundational-focus",
 },
];

// Subject-specific overrides (if a subject has unique Stripe links)
const subjectOverrides: Record<string, StripeTierLink[]> = {
 // Add per-subject Stripe link overrides here when real Stripe links are configured
 // e.g.:
 // "gcse-maths": [
 // { tierName: "Platinum Path", tierKey: "platinum-path", ratio: "1:1", priceLabel: "£175/wk", stripeUrl: "https://buy.stripe.com/..." },
 // ],
};

export function getStripeLinksForSubject(slug: string): StripeTierLink[] {
 return subjectOverrides[slug] || defaultTiers;
}

/**
 * Find a Stripe link for a specific tier.
 */
export function getStripeLinkForTier(slug: string, tierKey: string): StripeTierLink | undefined {
 const links = getStripeLinksForSubject(slug);
 return links.find(l => l.tierKey === tierKey);
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
