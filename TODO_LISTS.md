# Project TODO Lists

Based on the codebase audit, here are three prioritised, actionable lists detailing specific changes needed to reach production readiness.

### 🔴 Todo List 1 — Critical (Block Production)
- [ ] [Architecture/Auth] Resolve dual-database/auth split. The frontend uses `supabase.auth` while the backend Express API uses custom Prisma/JWT auth (`apps/api/src/routes/auth.ts`). Decide on and implement a single source of truth for auth.
- [ ] [apps/web/vite.config.ts] Remove `GEMINI_API_KEY` from the client bundle (Line 21). Inject it via a secure backend proxy (`/api/ai`) instead of mapping to `process.env`.
- [ ] [apps/api/src/routes/checkout.ts] Add Rate Limiting (`rateLimit(100, 60_000)`) specifically to the `/create-session` Stripe endpoint to prevent malicious abuse scaling fake sessions.
- [ ] [supabase/migration.sql] Fix overly permissive RLS policies on `tutor_profiles` and `tutor_subjects` exposing private tutor data (Line 114, 144) to unauthenticated scraping via `USING (true)`.
- [ ] [apps/api/src/routes/auth.ts] Add Zod string maximum length constraints (`.max(72)`) for the `password` input payload before passing it to `bcrypt.hash()` to mitigate regex/bcrypt computational DDoS vectors.

### 🟡 Todo List 2 — Important (Should Ship Soon After Launch)
- [ ] [apps/api/src/routes/stripe-webhook.ts] Implement the database `Booking` row insertion and updates. It is currently entirely commented out behind a `TODO:` comment wrapper on `checkout.session.completed`.
- [ ] [apps/api/src/routes/student.ts] Handle the Zoom API catch failure gracefully. If `createZoomMeeting` fails, the backend currently catches it silently and returns `201 Created` without a meeting link, leaving students confused.
- [ ] [apps/web/app/(dashboard)/layout.tsx] Add a confirmation modal logic (e.g. Radix UI AlertDialog) before signing out the user. The current "Sign Out" button executes instantly on click.
- [ ] [apps/web/app/(auth)/login/page.tsx] Centralise the error alerts mechanism into a reusable global component (e.g. `sonner` or Shadcn Toaster). It currently relies on manual inline `bg-red-50` styling.
- [ ] [apps/web/app/(dashboard)/layout.tsx] Increase `userIcon` wrapper touch target sizes (`w-8 h-8`) to `44px` minimum for mobile WCAG AA accessibility compliance.

### 🟢 Todo List 3 — Nice to Have (Backlog)
- [ ] [apps/api/src/routes/] Implement GraphQL DataLoaders or explicit Prisma cursor pagination (`take/skip`) to avoid severe N+1 query slowdowns as user volumes spike.
- [ ] [apps/web/pages/StripeCheckoutPage.tsx] Remove generic `declare const Stripe: any;` and implement proper `@stripe/stripe-js` type definitions for strict typescript compiler safety.
- [ ] [apps/web/app/layout.tsx] Implement standard Tailwind dark/light mode overrides via `next-themes` CSS custom properties instead of statically typing `bg-white text-slate-900`.
- [ ] [apps/web/components/ui/button.tsx] Replace manual spacing values (like `px-4 py-2`) with generic semantic padding utilities and enforce explicit `aria-label` passing for icon-only button variants.
- [ ] [apps/api/prisma/schema.prisma*] Add explicit relational indices (e.g. `@@index([studentId])`) against highly accessed foreign keys in `Message` and `Session` models.
