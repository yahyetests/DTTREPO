import type { Request, Response, NextFunction } from 'express';

const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number = 10, windowMs: number = 60_000) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = req.ip || 'unknown';
        const now = Date.now();
        const record = requests.get(key);

        if (!record || now > record.resetTime) {
            requests.set(key, { count: 1, resetTime: now + windowMs });
            next();
            return;
        }

        if (record.count >= maxRequests) {
            res.status(429).json({ error: 'Too many requests. Please try again later.' });
            return;
        }

        record.count++;
        next();
    };
}
