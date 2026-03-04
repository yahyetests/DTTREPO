// Auto-generated TypeScript types for the Supabase database schema.
// These types provide full type safety for all Supabase queries.

export type Json =
 | string
 | number
 | boolean
 | null
 | { [key: string]: Json | undefined }
 | Json[];

export type Database = {
 public: {
 Tables: {
 profiles: {
 Row: {
 id: string;
 email: string;
 name: string;
 role: 'STUDENT' | 'TUTOR' | 'ADMIN';
 created_at: string;
 updated_at: string;
 };
 Insert: {
 id: string;
 email: string;
 name: string;
 role?: 'STUDENT' | 'TUTOR' | 'ADMIN';
 created_at?: string;
 updated_at?: string;
 };
 Update: {
 id?: string;
 email?: string;
 name?: string;
 role?: 'STUDENT' | 'TUTOR' | 'ADMIN';
 created_at?: string;
 updated_at?: string;
 };
 };
 student_profiles: {
 Row: {
 id: string;
 user_id: string;
 year_group: string | null;
 target_exams: string | null;
 timezone: string;
 };
 Insert: {
 id?: string;
 user_id: string;
 year_group?: string | null;
 target_exams?: string | null;
 timezone?: string;
 };
 Update: {
 id?: string;
 user_id?: string;
 year_group?: string | null;
 target_exams?: string | null;
 timezone?: string;
 };
 };
 tutor_profiles: {
 Row: {
 id: string;
 user_id: string;
 bio: string | null;
 hourly_rate: number | null;
 verification_status: 'PENDING' | 'VERIFIED';
 };
 Insert: {
 id?: string;
 user_id: string;
 bio?: string | null;
 hourly_rate?: number | null;
 verification_status?: 'PENDING' | 'VERIFIED';
 };
 Update: {
 id?: string;
 user_id?: string;
 bio?: string | null;
 hourly_rate?: number | null;
 verification_status?: 'PENDING' | 'VERIFIED';
 };
 };
 subjects: {
 Row: {
 id: string;
 name: string;
 };
 Insert: {
 id?: string;
 name: string;
 };
 Update: {
 id?: string;
 name?: string;
 };
 };
 tutor_subjects: {
 Row: {
 id: string;
 tutor_profile_id: string;
 subject_id: string;
 };
 Insert: {
 id?: string;
 tutor_profile_id: string;
 subject_id: string;
 };
 Update: {
 id?: string;
 tutor_profile_id?: string;
 subject_id?: string;
 };
 };
 sessions: {
 Row: {
 id: string;
 student_id: string;
 tutor_id: string;
 subject_id: string;
 start_time: string;
 end_time: string;
 status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
 meeting_link: string | null;
 notes: string | null;
 created_at: string;
 };
 Insert: {
 id?: string;
 student_id: string;
 tutor_id: string;
 subject_id: string;
 start_time: string;
 end_time: string;
 status?: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
 meeting_link?: string | null;
 notes?: string | null;
 created_at?: string;
 };
 Update: {
 id?: string;
 student_id?: string;
 tutor_id?: string;
 subject_id?: string;
 start_time?: string;
 end_time?: string;
 status?: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
 meeting_link?: string | null;
 notes?: string | null;
 created_at?: string;
 };
 };
 messages: {
 Row: {
 id: string;
 from_user_id: string;
 to_user_id: string;
 body: string;
 created_at: string;
 read_at: string | null;
 };
 Insert: {
 id?: string;
 from_user_id: string;
 to_user_id: string;
 body: string;
 created_at?: string;
 read_at?: string | null;
 };
 Update: {
 id?: string;
 from_user_id?: string;
 to_user_id?: string;
 body?: string;
 created_at?: string;
 read_at?: string | null;
 };
 };
 progress: {
 Row: {
 id: string;
 student_id: string;
 subject_id: string;
 metric_type: string;
 value: number;
 recorded_at: string;
 };
 Insert: {
 id?: string;
 student_id: string;
 subject_id: string;
 metric_type: string;
 value: number;
 recorded_at?: string;
 };
 Update: {
 id?: string;
 student_id?: string;
 subject_id?: string;
 metric_type?: string;
 value?: number;
 recorded_at?: string;
 };
 };
 bookings: {
 Row: {
 id: string;
 user_id: string;
 subject_slug: string;
 subject_name: string;
 tutor_id: string;
 tutor_name: string;
 plan_tier: string;
 frequency: string;
 session_length: number;
 next_lesson_iso: string;
 preferred_time: string;
 booked_at: string;
 };
 Insert: {
 id?: string;
 user_id: string;
 subject_slug: string;
 subject_name: string;
 tutor_id: string;
 tutor_name: string;
 plan_tier: string;
 frequency: string;
 session_length: number;
 next_lesson_iso: string;
 preferred_time: string;
 booked_at?: string;
 };
 Update: {
 id?: string;
 user_id?: string;
 subject_slug?: string;
 subject_name?: string;
 tutor_id?: string;
 tutor_name?: string;
 plan_tier?: string;
 frequency?: string;
 session_length?: number;
 next_lesson_iso?: string;
 preferred_time?: string;
 booked_at?: string;
 };
 };
 };
 Views: {
 [_ in never]: never;
 };
 Functions: {
 [_ in never]: never;
 };
 Enums: {
 role: 'STUDENT' | 'TUTOR' | 'ADMIN';
 session_status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
 verification_status: 'PENDING' | 'VERIFIED';
 };
 };
};
