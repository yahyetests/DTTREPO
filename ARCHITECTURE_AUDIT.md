# Architecture Audit

## Project Overview
- **Stack summary**: 
  - Monorepo structure using standard node scripts (via `concurrently` in root).
  - **Framework**: Frontend uses React with Vite (`apps/web`), Backend uses Express (`apps/api`).
  - **Runtime**: Node.js via `tsx` for the backend, `vite` for the frontend.
  - **Database**: PostgreSQL (Managed simultaneously by Prisma ORM and Supabase migrations).
  - **Auth**: Dual-system split (Supabase Auth partially used in frontend context, Custom JWT/bcrypt locally managed via Prisma User model in backend).
  - **Hosting**: Not explicitly configured, but built for containerised environments or standard PaaS deployments based on environment variables mapping `PORT`.
- **Entry points**: 
  - Frontend: `apps/web/index.html` → `apps/web/vite.config.ts`.
  - Backend: `apps/api/src/index.ts`.
- **Environment variable inventory**:
  - `apps/web/.env.example`: `GEMINI_API_KEY`, `VITE_SUPABASE_URL` (implicitly required by `lib/supabase.ts`), `VITE_SUPABASE_ANON_KEY`. *Startup validation*: Only simple `console.warn` logic on missing variables.
  - `apps/api/.env.example`: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN`, `PORT`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*`, `ZOOM_*`, `GOOGLE_*`. *Startup validation*: JWT Secrets rigorously validated, but Stripe and DB variables are not parsed centrally at startup.

## Directory & File Map
- `/apps/api`: Express Backend.
  - `/src/routes/`: Handlers for `auth.ts`, `checkout.ts`, `zoom.ts`.
  - `/src/lib/`: Internal modules for `auth.ts` (JWT handling), `prisma.ts`, `validators.ts` (Zod validation).
  - `/src/middleware/`: Express middlewares for `auth.ts` (JWT decoding) and `rateLimit.ts`.
  - `/prisma/`: DB Schema containing active Prisma configurations (`migrations/`, `seed.ts`).
- `/apps/web`: React Frontend.
  - `/app/`: Application routing. Surprisingly uses a Next.js App Router style structure (`(auth)`, `(dashboard)`, `(marketing)`) alongside Vite/React Router concepts. 
  - `/components/`: Shared React UI components (utilising `shadcn/ui`, `lucide-react`, `framer-motion`).
  - `/context/`: Application state management (`AuthContext.tsx`, `StudentPurchasesContext.tsx`).
  - `/lib/`: Utility/service functions (`api.ts`, `supabase.ts`, `pricing.ts`, `utils.ts`).
  - `/pages/`: Component pages used within the routing layout.
  - `/content/`: Static CMS content used for generating the site (`pricingMatrix.ts`, `subjects.ts`).
- `/supabase`: Supabase database artifacts.
  - `migration.sql`: Includes explicit native Postgres creation of `profiles`, `sessions`, `messages` and RLS policies.
- `/scripts`: Custom tooling (e.g., `audit.js`).

### Route Breakdown
**Frontend** handles:
- Core routing: Home (`page.tsx`), Authentication logic (`login/page.tsx`, `register/page.tsx`).
- Dashboard layouts (`student`, `tutor` segregated views).
- External integrations: Classroom (`/classroom/[sessionId]`), Checkout (`StripeCheckoutPage.tsx`, `CheckoutCompletePage.tsx`).

**API Endpoints**:
- `POST /api/auth/register`: Creates local User (Prisma), returns JWTs.
- `POST /api/auth/login`: Validates credentials, sets HTTP-only JWT cookies.
- `GET /api/auth/me`: Decodes JWT, returns user info.
- `POST /api/checkout/create-session`: Protected route initiating Stripe custom checkout UI.
- `GET /api/checkout/session-status`: Endpoint to poll Stripe session intents.
- `POST /api/checkout/webhook`: Receives Stripe lifecycle updates.
- `POST /api/zoom/webhook`: Receives Zoom recording completions and prepares Google Drive uploads.

## Data Architecture
Database models are duplicated between two systems:
- Prisma (`User`, `StudentProfile`, `TutorProfile`, `Session`, `Progress`, `Message`, `Subject`, `TutorSubject`).
- Supabase native SQL (`public.profiles`, `student_profiles`, `tutor_profiles`, `sessions`, `progress`, `messages`, `bookings`).

**Relationships**: Deeply relational structure mapping Profiles 1:1 against central identity tables mapping to M:N relationship junctions (`TutorSubject`).
**Indexes and Queries**: 
- Explicit Postgres unique indexing on `email`, `userId`, `name`.
- *Missing Indexes*: Foreign keys mapping joins (e.g. `studentId` inside `Session`, `fromUserId` in `Message`) lack explicit performance indexing on the Prisma side and can result in full table scans.
- Migrations check: Conflicting schemas. The Supabase `migration.sql` does not perfectly match Prisma `migration.sql` leading to a dual/split-brain database.

## Component Architecture
- **Component hierarchy**: Root-level layout providers wrapping `SiteHeader` / `SiteFooter`. Internal layouts inject `Sidebars` contextually to users roles.
- **Shared/reusable components**: Component system built around strict `shadcn/ui` composition (`Button`, `Input`, `Label`).
- **State management**: Utilising pure React Context heavily for deeply nested models.
- **Data fetching**: Standard React fetch handling wrapped internally by a JWT-refresh interceptor `api()` in `lib/api.ts`. Also fetching data natively via `@supabase/supabase-js`.

## Authentication & Authorisation
- **Auth Provider Split**: The backend strictly manages authentication via an Express JWT layout containing HMAC token signatures. However, the React application `AuthContext.tsx` initiates sessions using `supabase.auth.signInWithPassword()`!
- **Session Strategy**: Unsynchronised HTTP-Only Express access tokens interacting concurrently against Supabase LocalStorage tokens.
- **Role Model**: `STUDENT | TUTOR | ADMIN` stored centrally on Prisma & Postgres Enums. Checked on Express via `requireRole` array logic. Checked frontend via `ProtectedRoute.tsx`.
- **Protected Routing**: React `ProtectedRoute` enforces user presence, whilst server checks ensure signed verification.

## Third-Party Integrations
- **Stripe SDK v20.3.1**: Heavily integrated into custom checkout UI modes. Webhook endpoints enforce Stripe Signature Header verification natively.
- **Zoom SDK/Webhooks**: Express catches `recording.completed` event webhooks, parses the payload with HMAC `sha256` token validation against `ZOOM_WEBHOOK_SECRET_TOKEN`.
- **Google Drive**: API Skeleton exists within `.env` logic and `zoom.ts` to push MP4 recordings to secure cloud targets.

## Process & KPI Map
- **Core User Journey**: Lead generation via marketing → Auth registration → Payment execution (Stripe) → Sessions fulfilled (Zoom webhook tracked) → Student progress visualised.
- **Metrics/KPI capability**: The database captures `Progress` telemetry (`metricType: quiz, homework, attendance`) over `recordedAt` timestamps. Booking metadata logs recurring session cadences.
- **Admin Dashboard Integration**: The `booking` and `sessions` tracking offers rich opportunities to compute LTV, Churn, and platform engagement, but no native Admin dashboard implementation exists currently rendering this data.

## Audit Findings — Technical Debt
- **Critical Schema & Auth Split-Brain**: The frontend uses `supabase.auth` while internal backend logic writes via Prisma and manually rolls JWTs.
- **Code Duplication**: Pseudo Next.js app router structure exists alongside typical Vite client layouts causing mental model confusion mapping components.
- **Incomplete Webhooks**: Stripe `checkout.session.completed` handler catches event correctly but the Booking model insertion is marked explicitly as a `TODO:` comment.
- **TypeScript `any` Abuse**: Detected across `apps/web/pages/StripeCheckoutPage.tsx` (`declare const Stripe: any`), `apps/web/components/ImprovementGraph.tsx` referencing native untyped arguments, and `apps/api/src/routes/zoom.ts`.
- **Missing Webhook Error Propogation**: Stripe webhook `catch()` blocks silently bury errors whilst forcibly returning `200` leaving the platform blind to critical async failures.

## Audit Findings — Performance
- **N+1 Query Hazards**: Express controllers do not incorporate DataLoaders mappings ahead of Prisma requests, ensuring iterative lookups will loop.
- **Missing Pagination Limiters**: Core API route logic fails to default `take/skip` or `limit/offset` variables, restricting data scalability on views like Messages or historical Sessions.
- **Index Deficiencies**: Crucial foreign keys (`studentId`, `tutorId`) lack specific explicit database indexing causing downstream aggregation slowdowns.
