export interface TuitionType {
 id: string; // matches TierKey from pricingMatrix
 label: string;
 description: string;
 bestFor: string;
 ratio: string;
 badge?: string;
}

export const tuitionTypes: TuitionType[] = [
 {
 id: "platinum-path",
 label: "Platinum Path (1:1)",
 description: "Premium personalised excellence with dedicated 1:1 tutor attention every session.",
 bestFor: "Maximum progress & confidence building",
 ratio: "1:1",
 badge: "Premium"
 },
 {
 id: "gold-edge",
 label: "Gold Edge (2:1)",
 description: "Focused partnership in a small pair for collaborative yet personal learning.",
 bestFor: "Balanced personal attention & peer learning",
 ratio: "2:1",
 },
 {
 id: "silver-advantage",
 label: "Silver Advantage (3:1)",
 description: "Collaborative learning in an intimate group of three for interactive sessions.",
 bestFor: "Structured group learning & discussion",
 ratio: "3:1",
 },
 {
 id: "bronze-boost",
 label: "Bronze Boost (5:1)",
 description: "Small group support with exam-focused practice and shared resources.",
 bestFor: "Affordable excellence & group practice",
 ratio: "5:1",
 badge: "Great Value"
 },
 {
 id: "foundational-fixes",
 label: "Foundational Fixes (6:1)",
 description: "Targeted exam preparation with key topic revision and practice papers.",
 bestFor: "Exam prep on a budget",
 ratio: "6:1",
 },
 {
 id: "foundational-focus",
 label: "Foundational Focus (10:1)",
 description: "Maximum affordability with structured group revision and core concepts.",
 bestFor: "Budget-friendly access to expert tuition",
 ratio: "10:1",
 },
];
