import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address').max(255, 'Email is too long'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(72, 'Password must be 72 characters or fewer')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    role: z.enum(['STUDENT', 'TUTOR'], { message: 'Role must be STUDENT or TUTOR' }),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required').max(72, 'Password must be 72 characters or fewer'),
});

export const createSessionSchema = z.object({
    tutorId: z.string().uuid(),
    subjectId: z.string().uuid(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
});

export const addSubjectSchema = z.object({
    subjectId: z.string().uuid(),
});

export const updateProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long').optional(),
});

export const createProgressSchema = z.object({
    studentProfileId: z.string().uuid(),
    subjectId: z.string().uuid(),
    metricType: z.string().min(1).max(100),
    value: z.number().min(0).max(100),
});

export const sendMessageSchema = z.object({
    toUserId: z.string().uuid(),
    body: z.string().min(1, 'Message cannot be empty').max(5000, 'Message is too long'),
});
