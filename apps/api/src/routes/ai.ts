import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = Router();

// All AI routes require auth + rate limiting
router.use(authenticate);
router.use(rateLimit(20, 60_000)); // 20 AI requests per minute per user

/**
 * POST /api/ai/generate
 * Secure server-side proxy for the Gemini API.
 * Keeps GEMINI_API_KEY out of the client bundle.
 *
 * Body: { prompt: string, model?: string }
 */
router.post('/generate', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        res.status(503).json({ error: 'AI service is not configured.' });
        return;
    }

    const { prompt, model = 'gemini-2.0-flash' } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'prompt is required and must be a string.' });
        return;
    }

    if (prompt.length > 10_000) {
        res.status(400).json({ error: 'prompt exceeds the maximum allowed length.' });
        return;
    }

    try {
        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        if (!geminiRes.ok) {
            console.error('Gemini API error:', geminiRes.status, await geminiRes.text());
            res.status(502).json({ error: 'AI service returned an error. Please try again.' });
            return;
        }

        const data = await geminiRes.json() as {
            candidates?: { content?: { parts?: { text?: string }[] } }[]
        };
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

        res.json({ text });
    } catch (err) {
        console.error('AI proxy error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
