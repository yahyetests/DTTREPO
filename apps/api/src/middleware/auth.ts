import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: string;
                email?: string;
            };
        }
    }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authentication required. Missing Bearer token.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        // getUser automatically verifies the token signature and expiration
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('Supabase Auth error:', error?.message);
            res.status(401).json({ error: 'Invalid or expired token' });
            return;
        }

        // Determine role: defaults to user metadata, or 'STUDENT' fallback
        const role = user.user_metadata?.role || 'STUDENT';

        req.user = {
            userId: user.id,
            role: role.toUpperCase(),
            email: user.email,
        };

        next();
    } catch (err) {
        console.error('Unexpected Auth Middleware error:', err);
        res.status(401).json({ error: 'Authentication failed' });
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
