/**
 * Zoom Recording Webhook
 *
 * This Express route receives Zoom's `recording.completed` webhook event.
 * It downloads the recording MP4 from Zoom and uploads it to Google Drive
 * with a nicely‑formatted filename: TutorName_TuteeName_YYYYMMDD.mp4
 *
 * Required env vars:
 *   ZOOM_WEBHOOK_SECRET_TOKEN   – used to validate the webhook signature
 *   ZOOM_CLIENT_ID              – same as the Server-to-Server OAuth app
 *   ZOOM_CLIENT_SECRET          – same as above
 *   ZOOM_ACCOUNT_ID             – same as above
 *   GOOGLE_APPLICATION_CREDENTIALS_JSON – stringified service account JSON
 *   GOOGLE_DRIVE_FOLDER_ID      – target folder ID in Google Drive
 */

import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

// ── Validate Zoom webhook signature ──
function isValidZoomWebhook(req: Request): boolean {
    const secretToken = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
    if (!secretToken) return false;

    const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`;
    const hashForVerify = crypto
        .createHmac('sha256', secretToken)
        .update(message)
        .digest('hex');

    const signature = `v0=${hashForVerify}`;
    return signature === req.headers['x-zm-signature'];
}

// POST /api/zoom/webhook
router.post('/webhook', async (req: Request, res: Response) => {
    try {
        // ── Zoom URL validation challenge ──
        if (req.body.event === 'endpoint.url_validation') {
            const plainToken = req.body.payload?.plainToken;
            const secretToken = process.env.ZOOM_WEBHOOK_SECRET_TOKEN || '';
            const hashForValidation = crypto
                .createHmac('sha256', secretToken)
                .update(plainToken)
                .digest('hex');

            res.status(200).json({
                plainToken,
                encryptedToken: hashForValidation,
            });
            return;
        }

        // ── Validate signature ──
        if (!isValidZoomWebhook(req)) {
            console.warn('Zoom webhook: invalid signature');
            res.status(401).json({ error: 'Invalid signature' });
            return;
        }

        // ── Only handle recording.completed ──
        if (req.body.event !== 'recording.completed') {
            res.status(200).json({ message: 'Event ignored' });
            return;
        }

        const payload = req.body.payload?.object;
        if (!payload) {
            res.status(400).json({ error: 'Missing payload' });
            return;
        }

        const { topic, start_time, recording_files } = payload;

        // Find the MP4 file
        const mp4File = recording_files?.find(
            (f: any) => f.file_type === 'MP4' && f.status === 'completed',
        );

        if (!mp4File) {
            console.log('Zoom webhook: no completed MP4 found in recording_files');
            res.status(200).json({ message: 'No MP4 found' });
            return;
        }

        // Build a clean filename
        const dateStr = new Date(start_time).toISOString().slice(0, 10).replace(/-/g, '');
        const safeTopic = (topic || 'Session').replace(/[^a-zA-Z0-9_\- –]/g, '').replace(/\s+/g, '_');
        const fileName = `${safeTopic}_${dateStr}.mp4`;

        // ── Download + Upload to Google Drive ──
        // This is a skeleton. Fill in the Google Drive upload once credentials are ready.
        const downloadUrl = `${mp4File.download_url}?access_token=${mp4File.download_token || ''}`;

        console.log(`[Zoom Webhook] Recording ready: ${fileName}`);
        console.log(`[Zoom Webhook] Download URL: ${downloadUrl}`);

        // TODO: Uncomment and configure when Google Drive credentials are provided
        /*
        const { google } = await import('googleapis');
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });
        const drive = google.drive({ version: 'v3', auth });

        // Download the MP4
        const fileResponse = await fetch(downloadUrl);
        const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());

        // Upload to Drive
        await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: 'video/mp4',
                body: Readable.from(fileBuffer),
            },
        });

        console.log(`[Zoom Webhook] Uploaded ${fileName} to Google Drive`);
        */

        res.status(200).json({ message: 'Recording processed', fileName });
    } catch (err) {
        console.error('Zoom webhook error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

export default router;
