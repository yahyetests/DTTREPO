// ──────────────────────────────────────────────────────────
// Vercel Serverless Function — catch-all API handler
// Wraps the Express app from apps/api for serverless execution
// ──────────────────────────────────────────────────────────
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../apps/api/src/index.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    return app(req as any, res as any);
}
