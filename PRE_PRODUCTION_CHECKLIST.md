## Design

- [ ] `apps/web/app/layout.tsx` (Line 18): Hardcoded `bg-white text-slate-900`. Missing dark/light mode handling or CSS variable theme support.
- [ ] `apps/web/app/(auth)/login/page.tsx` (Line 53): Error states are manually styled (`bg-red-50 text-red-600`) instead of relying on a centralised, consistent design system alert component.
- [ ] `apps/web/components/ui/button.tsx`: Brand alignment is acceptable, but lacking explicit typographic scale tokens (e.g. using `text-sm` explicitly stringed instead of mapped typography scales).
- [ ] `apps/web/app/(dashboard)/layout.tsx` (Line 104): Missing skeleton screens for dashboard loading states. Only a basic generic spinner is used in `ProtectedRoute.tsx`.
- [ ] `apps/api/src/routes/student.ts` (Line 68): The backend correctly returns `sessions`, `messages`, and `progress` arrays. However, the frontend lacks explicit Empty State UX designs for when these arrays return empty.

## UX

- [ ] `apps/web/app/(dashboard)/layout.tsx` (Line 81): Missing logout confirmation dialog. Clicking "Sign Out" instantly terminates the session via `logout()` with no warning.
- [ ] `apps/web/app/(auth)/login/page.tsx` (Line 59): Missing robust form validation messages. Relies entirely on native HTML5 `required` attributes and a generic "Login failed" error alert. 
- [ ] `apps/api/src/routes/student.ts` (Line 175): Dead end in flow: If Zoom meeting creation throws an error, the catch block logs it but still returns a `201 Created` payload. The student sees a successful booking but lacks the required Zoom URL.
- [ ] `apps/web/components/ui/button.tsx` (Line 31): Accessibility gaps: Focus management outlines are present (`focus-visible:ring-2`), but `<Button>` props don't enforce or warn on missing `aria-labels` for icon-only buttons.
- [ ] `apps/api/src/routes/checkout.ts` (Line 53): The checkout session returns a generic 500 on failure with no specific recovery action for the user. Dead end in purchase flow.

## UI

- [ ] `apps/web/app/(dashboard)/layout.tsx` (Line 99): Touch targets < 44px. The mobile user icon wrapper is sized `w-8 h-8` (32px), failing WCAG AA mobile touch target minimums.
- [ ] `apps/web/app/layout.tsx` (Line 22): `<CookieConsent />` uses inconsistent manual z-indexes rather than a defined modal/drawer architectural pattern.
- [ ] `apps/web/components/ui/button.tsx` (Line 22): Inconsistent padding constraints `px-4 py-2` hardcoded rather than utilizing strictly semantic spacing primitives.
- [ ] Missing global toast/notification patterns: Actions like "Sign Out" or "Login Failed" use either immediate redirects or raw block-level text instead of a standardized toast layer.

## Security

- [ ] `apps/web/vite.config.ts` (Line 21): EXPOSED SECRET: `process.env.GEMINI_API_KEY` is explicitly stringified and injected into the client bundle.
- [ ] `apps/api/src/routes/checkout.ts` (Line 19): Missing rate limiting on `/create-session`. Unlike `/auth/*`, creating Stripe checkout sessions is not bound by `rateLimit()`, enabling potential Stripe API spamming.
- [ ] `supabase/migration.sql` (Line 114, 144): Overly permissive RLS policies: `public.tutor_profiles` and `public.tutor_subjects` offer fully public `SELECT` queries (`USING (true)`). This leaks bio, hourly rates, and verification status to unauthenticated scrapers.
- [ ] `apps/web/context/AuthContext.tsx` (Line 28): Client-side trust: The application relies on frontend JWT evaluation (via `supabase.auth`) but manually coerces roles mapping, desynchronising with the actual Prisma database `User` role.
- [ ] `apps/web/vite.config.ts` (Line 5): Missing security headers: No Content Security Policy (CSP), HSTS, or X-Frame-Options configured for the Vite frontend server preview/deployments. The backend utilizes `helmet()`, but the frontend SPA needs specific meta tags or edge response headers.
- [ ] `apps/api/src/routes/auth.ts` (Line 39): Missing input sanitisation: `bcrypt.hash(password)` evaluates directly off `req.body` without strict maximum length constraints via Zod. This introduces a potential bcrypt hashing DDoS vulnerability for oversized payloads.
