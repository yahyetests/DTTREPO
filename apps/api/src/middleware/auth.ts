import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, type TokenPayload } from '../lib/auth.js';

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (!token) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Insufficient permissions' });
            return;
        }

        next();
    };
}
