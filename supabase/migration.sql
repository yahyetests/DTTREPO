-- ============================================================
-- Takween Tutors — Supabase Migration
-- Run this SQL in the Supabase Dashboard → SQL Editor
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- 1. Custom Types (Enums)
-- ──────────────────────────────────────────────────────────
CREATE TYPE public.user_role AS ENUM ('STUDENT', 'TUTOR', 'ADMIN');
CREATE TYPE public.session_status AS ENUM ('UPCOMING', 'COMPLETED', 'CANCELLED');
CREATE TYPE public.verification_status AS ENUM ('PENDING', 'VERIFIED');

-- ──────────────────────────────────────────────────────────
-- 2. Profiles (linked to auth.users)
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
    id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email      TEXT NOT NULL,
    name       TEXT NOT NULL,
    role       public.user_role NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Only students and parents can insert their own profile
CREATE POLICY "Students and parents can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (
        auth.uid() = id
        AND (auth.jwt()->'user_metadata'->>'role') IN ('STUDENT', 'PARENT')
    );

-- ──────────────────────────────────────────────────────────
-- 3. Auto-create profile on signup (trigger)
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'STUDENT')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────────────────
-- 4. Student Profiles
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.student_profiles (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    year_group   TEXT,
    target_exams TEXT,
    timezone     TEXT NOT NULL DEFAULT 'Europe/London'
);

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own student profile"
    ON public.student_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Students can update own student profile"
    ON public.student_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own student profile"
    ON public.student_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────
-- 5. Tutor Profiles
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.tutor_profiles (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    bio                 TEXT,
    hourly_rate         NUMERIC(10, 2),
    verification_status public.verification_status NOT NULL DEFAULT 'PENDING'
);

ALTER TABLE public.tutor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view own tutor profile"
    ON public.tutor_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Tutors can update own tutor profile"
    ON public.tutor_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Tutors can insert own tutor profile"
    ON public.tutor_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Public read for tutor browsing
CREATE POLICY "Anyone can view tutor profiles"
    ON public.tutor_profiles FOR SELECT
    USING (true);

-- ──────────────────────────────────────────────────────────
-- 6. Subjects
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.subjects (
    id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subjects"
    ON public.subjects FOR SELECT
    USING (true);

-- ──────────────────────────────────────────────────────────
-- 7. Tutor ↔ Subject Junction
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.tutor_subjects (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tutor_profile_id UUID NOT NULL REFERENCES public.tutor_profiles(id) ON DELETE CASCADE,
    subject_id       UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    UNIQUE(tutor_profile_id, subject_id)
);

ALTER TABLE public.tutor_subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tutor subjects"
    ON public.tutor_subjects FOR SELECT
    USING (true);

-- ──────────────────────────────────────────────────────────
-- 8. Sessions (Bookings/Lessons)
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.sessions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id   UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    tutor_id     UUID NOT NULL REFERENCES public.tutor_profiles(id) ON DELETE CASCADE,
    subject_id   UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    start_time   TIMESTAMPTZ NOT NULL,
    end_time     TIMESTAMPTZ NOT NULL,
    status       public.session_status NOT NULL DEFAULT 'UPCOMING',
    meeting_link TEXT,
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own sessions"
    ON public.sessions FOR SELECT
    USING (student_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Tutors can view own sessions"
    ON public.sessions FOR SELECT
    USING (tutor_id IN (SELECT id FROM public.tutor_profiles WHERE user_id = auth.uid()));

-- ──────────────────────────────────────────────────────────
-- 9. Messages
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.messages (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    to_user_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    body         TEXT NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    read_at      TIMESTAMPTZ
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
    ON public.messages FOR SELECT
    USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can send messages"
    ON public.messages FOR INSERT
    WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Recipient can mark as read"
    ON public.messages FOR UPDATE
    USING (auth.uid() = to_user_id);

-- ──────────────────────────────────────────────────────────
-- 10. Progress Tracking
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.progress (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id  UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    subject_id  UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL,
    value       NUMERIC(10, 2) NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own progress"
    ON public.progress FOR SELECT
    USING (student_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid()));

-- ──────────────────────────────────────────────────────────
-- 11. Bookings (Student Purchases)
-- ──────────────────────────────────────────────────────────
CREATE TABLE public.bookings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_slug    TEXT NOT NULL,
    subject_name    TEXT NOT NULL,
    tutor_id        TEXT NOT NULL,
    tutor_name      TEXT NOT NULL,
    plan_tier       TEXT NOT NULL,
    frequency       TEXT NOT NULL,
    session_length  INTEGER NOT NULL,
    next_lesson_iso TEXT NOT NULL,
    preferred_time  TEXT NOT NULL,
    booked_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
    ON public.bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings"
    ON public.bookings FOR DELETE
    USING (auth.uid() = user_id);
