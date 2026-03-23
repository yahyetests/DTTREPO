/**
 * Zoom Server-to-Server OAuth utility.
 *
 * Required env vars:
 *   ZOOM_ACCOUNT_ID
 *   ZOOM_CLIENT_ID
 *   ZOOM_CLIENT_SECRET
 */

// ---------- token cache ----------
let cachedToken = '';
let tokenExpiresAt = 0;
let pendingTokenRequest: Promise<string> | null = null;
let cachedAuthHeader = '';

/**
 * Returns the base64-encoded auth header.
 * Cached to avoid redundant Buffer operations.
 */
function getAuthHeader(): string {
    if (cachedAuthHeader) return cachedAuthHeader;

    const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
    if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
        throw new Error('Missing Zoom credentials in environment variables');
    }

    cachedAuthHeader = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
    return cachedAuthHeader;
}

async function fetchNewAccessToken(): Promise<string> {
    const { ZOOM_ACCOUNT_ID } = process.env;
    if (!ZOOM_ACCOUNT_ID) {
        throw new Error('Missing ZOOM_ACCOUNT_ID in environment variables');
    }

    const auth = getAuthHeader();

    try {
        const res = await fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
            {
                method: 'POST',
                headers: { Authorization: `Basic ${auth}` },
                signal: AbortSignal.timeout(10000), // 10s timeout
            },
        );

        if (!res.ok) {
            const body = await res.text();
            throw new Error(`Zoom OAuth failed (${res.status}): ${body}`);
        }

        const data = (await res.json()) as { access_token: string; expires_in: number };
        cachedToken = data.access_token;
        // refresh 60 s before actual expiry
        tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
        return cachedToken;
    } finally {
        pendingTokenRequest = null;
    }
}

async function getAccessToken(): Promise<string> {
    // 1. Return cached token if valid
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    // 2. Return pending request if one is already in flight
    if (pendingTokenRequest) {
        return pendingTokenRequest;
    }

    // 3. Initiate new request and cache the promise
    pendingTokenRequest = fetchNewAccessToken();
    return pendingTokenRequest;
}

/**
 * Internal test helper to reset the cache.
 */
export function __resetZoomCache() {
    cachedToken = '';
    tokenExpiresAt = 0;
    pendingTokenRequest = null;
    cachedAuthHeader = '';
}

// ---------- public API ----------

export interface ZoomMeetingResult {
    id: string;       // Zoom numeric meeting ID (as string)
    join_url: string;  // URL participants click to join
    password?: string; // Meeting passcode (if any)
}

/**
 * Create a scheduled Zoom meeting.
 *
 * @param topic        Human-readable title, e.g. "Dr Rasha – Alex Rivera – GCSE Maths"
 * @param startTimeIso ISO-8601 datetime, e.g. "2026-03-01T16:00:00Z"
 * @param durationMin  Duration in minutes
 */
export async function createZoomMeeting(
    topic: string,
    startTimeIso: string,
    durationMin: number,
): Promise<ZoomMeetingResult> {
    const token = await getAccessToken();

    const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000), // 15s timeout
        body: JSON.stringify({
            topic,
            type: 2, // Scheduled
            start_time: startTimeIso,
            duration: durationMin,
            timezone: 'Europe/London',
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,      // let tutee join even if tutor is late
                waiting_room: false,
                auto_recording: 'cloud',     // automatically record to Zoom Cloud
                mute_upon_entry: false,
            },
        }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Zoom create-meeting failed (${res.status}): ${body}`);
    }

    const data = (await res.json()) as { id: number; join_url: string; password?: string };

    return {
        id: String(data.id),
        join_url: data.join_url,
        password: data.password,
    };
}
