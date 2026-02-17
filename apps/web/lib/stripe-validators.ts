export const ALLOWED_STRIPE_DOMAINS = [
    "buy.stripe.com",
    "checkout.stripe.com"
];

/**
 * Validates if the provided URL is a safe Stripe checkout URL.
 * Prevents redirection to non-public endpoints like S3 XML files.
 */
export function isValidStripeUrl(url: string): boolean {
    try {
        const parsed = new URL(url, window.location.origin); // Handle relative paths
        if (parsed.hostname === window.location.hostname || parsed.hostname === 'localhost') return true;
        return ALLOWED_STRIPE_DOMAINS.includes(parsed.hostname);
    } catch (error) {
        // Allow relative paths (e.g. /mock-payment)
        return url.startsWith('/');
    }
}

/**
 * Validates Stripe URL and throws specific error if invalid.
 * Use this before window.location.href assignment.
 */
export function validateStripeUrlOrThrow(url: string): void {
    if (!isValidStripeUrl(url)) {
        console.error(`Blocked navigation to invalid Stripe URL: ${url}`);
        throw new Error("Invalid checkout URL configuration. Please contact support.");
    }
}
