-- ============================================================
-- Takween Tutors — Supabase RLS Fix
-- Fixes overly permissive policies on tutor_profiles and
-- tutor_subjects that allow unauthenticated scraping of
-- private tutor data.
--
-- Run this in the Supabase Dashboard → SQL Editor
-- AFTER the initial migration.sql has been applied.
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- 1. Fix tutor_profiles: remove the open "USING (true)" policy
--    Replace with one that only exposes VERIFIED tutors publicly,
--    while owners can always read their own profile.
-- ──────────────────────────────────────────────────────────

-- Drop the permissive public policy
DROP POLICY IF EXISTS "Anyone can view tutor profiles" ON public.tutor_profiles;

-- Allow anyone to view ONLY verified tutor profiles (for the tutor browse/directory page)
-- This prevents scraping of pending/unverified tutor data
CREATE POLICY "Public can view verified tutor profiles"
    ON public.tutor_profiles FOR SELECT
    USING (
        -- Authenticated users can see verified tutors
        (auth.role() = 'authenticated' AND verification_status = 'VERIFIED')
        -- OR the tutor is viewing their own profile (regardless of status)
        OR auth.uid() = user_id
    );

-- ──────────────────────────────────────────────────────────
-- 2. Fix tutor_subjects: only expose subjects for verified tutors
-- ──────────────────────────────────────────────────────────

-- Drop the open policy
DROP POLICY IF EXISTS "Anyone can view tutor subjects" ON public.tutor_subjects;

-- Replace with a policy that only exposes subjects for verified tutors
CREATE POLICY "Public can view subjects for verified tutors"
    ON public.tutor_subjects FOR SELECT
    USING (
        tutor_profile_id IN (
            SELECT id FROM public.tutor_profiles
            WHERE verification_status = 'VERIFIED'
               OR user_id = auth.uid()
        )
    );

-- ──────────────────────────────────────────────────────────
-- 3. Allow tutors to manage their own subject associations
-- ──────────────────────────────────────────────────────────

CREATE POLICY IF NOT EXISTS "Tutors can insert own subjects"
    ON public.tutor_subjects FOR INSERT
    WITH CHECK (
        tutor_profile_id IN (
            SELECT id FROM public.tutor_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY IF NOT EXISTS "Tutors can delete own subjects"
    ON public.tutor_subjects FOR DELETE
    USING (
        tutor_profile_id IN (
            SELECT id FROM public.tutor_profiles WHERE user_id = auth.uid()
        )
    );
