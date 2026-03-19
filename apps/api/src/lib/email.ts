/**
 * Email Service (Mock)
 *
 * This service handles sending various notification emails.
 * Currently it logs to the console, but can be swapped for a real
 * provider (Resend, SendGrid, etc.) in the future.
 */

export interface PaymentFailedPayload {
    userName: string;
    userEmail: string;
    amount: number;      // in minor units (pence)
    currency: string;
    invoiceUrl?: string | null;
    attemptCount: number;
}

/**
 * Send a notification to the user when their subscription payment fails.
 */
export async function sendPaymentFailedEmail(payload: PaymentFailedPayload): Promise<{ success: boolean; messageId: string }> {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const formattedAmount = (payload.amount / 100).toFixed(2);
    const currencySymbol = payload.currency.toUpperCase() === 'GBP' ? '£' : payload.currency.toUpperCase();

    console.log('📧 [Email Service] Payment Failed notification queued:');
    console.log(`  To: ${payload.userEmail} (${payload.userName})`);
    console.log(`  Subject: Action Required: Your payment of ${currencySymbol}${formattedAmount} failed`);
    console.log(`  Attempt: ${payload.attemptCount}`);
    if (payload.invoiceUrl) {
        console.log(`  Invoice: ${payload.invoiceUrl}`);
    }
    console.log('  Payload:', payload);

    // In a real implementation, we would call an external API here.
    return { success: true, messageId };
}
