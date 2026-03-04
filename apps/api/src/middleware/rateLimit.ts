import type { Request, Response, NextFunction } from 'express';

const requests = new Map<string, { count: number; resetTime: number }>();

// ── SECURITY: Periodic cleanup to prevent memory leak ──
const CLEANUP_INTERVAL_MS = 5 * 60_000; // 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requests) {
        if (now > record.resetTime) {
            requests.delete(key);
        }
    }
}, CLEANUP_INTERVAL_MS);

export function rateLimit(
    maxRequests: number = 10,
    windowMs: number = 60_000,
    keyFn?: (req: Request) => string,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = keyFn ? keyFn(req) : (req.ip || req.socket.remoteAddress || 'unknown');
        const now = Date.now();
        const record = requests.get(key);

        if (!record || now > record.resetTime) {
            requests.set(key, { count: 1, resetTime: now + windowMs });
            next();
            return;
        }

        if (record.count >= maxRequests) {
            res.set('Retry-After', String(Math.ceil((record.resetTime - now) / 1000)));
            res.status(429).json({ error: 'Too many requests. Please try again later.' });
            return;
        }

        record.count++;
        next();
    };
}
