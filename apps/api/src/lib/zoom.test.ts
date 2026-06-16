import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { createZoomMeeting, __resetZoomCache } from './zoom.ts';

// Mock environment
process.env.ZOOM_ACCOUNT_ID = 'test_account';
process.env.ZOOM_CLIENT_ID = 'test_client';
process.env.ZOOM_CLIENT_SECRET = 'test_secret';

describe('Zoom Library', () => {
    beforeEach(() => {
        __resetZoomCache();
    });

    test('createZoomMeeting handles concurrent requests efficiently', async () => {
        let oauthCalls = 0;

        const originalFetch = global.fetch;
        global.fetch = (async (url: string | URL) => {
            const urlStr = url.toString();
            if (urlStr.includes('zoom.us/oauth/token')) {
                oauthCalls++;
                await new Promise(resolve => setTimeout(resolve, 50));
                return {
                    ok: true,
                    json: async () => ({
                        access_token: 'mock_token',
                        expires_in: 3600
                    })
                };
            }
            if (urlStr.includes('api.zoom.us/v2/users/me/meetings')) {
                return {
                    ok: true,
                    json: async () => ({
                        id: 12345678,
                        join_url: 'https://zoom.us/j/12345678',
                        password: 'mock_password'
                    })
                };
            }
            return { ok: false, text: async () => 'Not Found' };
        }) as any;

        try {
            await Promise.all([
                createZoomMeeting('T1', '2026-03-01T16:00:00Z', 60),
                createZoomMeeting('T2', '2026-03-01T16:00:00Z', 60),
                createZoomMeeting('T3', '2026-03-01T16:00:00Z', 60)
            ]);

            assert.strictEqual(oauthCalls, 1, 'Should only have 1 OAuth call for concurrent requests');
        } finally {
            global.fetch = originalFetch;
        }
    });

    test('createZoomMeeting uses cached token for sequential requests', async () => {
        let oauthCalls = 0;

        const originalFetch = global.fetch;
        global.fetch = (async (url: string | URL) => {
            const urlStr = url.toString();
            if (urlStr.includes('zoom.us/oauth/token')) {
                oauthCalls++;
                return {
                    ok: true,
                    json: async () => ({
                        access_token: 'mock_token',
                        expires_in: 3600
                    })
                };
            }
            if (urlStr.includes('api.zoom.us/v2/users/me/meetings')) {
                return {
                    ok: true,
                    json: async () => ({
                        id: 12345678,
                        join_url: 'https://zoom.us/j/12345678',
                        password: 'mock_password'
                    })
                };
            }
            return { ok: false, text: async () => 'Not Found' };
        }) as any;

        try {
            // Sequential calls
            await createZoomMeeting('T1', '2026-03-01T16:00:00Z', 60);
            await createZoomMeeting('T2', '2026-03-01T16:00:00Z', 60);

            assert.strictEqual(oauthCalls, 1, 'Should use cached token for sequential requests');
        } finally {
            global.fetch = originalFetch;
        }
    });
});
