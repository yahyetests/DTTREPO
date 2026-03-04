export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
 // In a real implementation, this would send data to Google Analytics, Plausible, Mixpanel, etc.
 // We check if the user has consented to cookies/analytics before tracking.
 const hasConsented = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') === 'accepted' : false;

 if (hasConsented) {
 // Stub for generic analytics tracking
 console.log(`[Analytics] Tracked Event: ${eventName}`, eventProperties);

 // Example: window.gtag('event', eventName, eventProperties);
 }
};

export const useAnalytics = () => {
 return { trackEvent };
};
