import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['STUDENT', 'TUTOR'], { message: 'Role must be STUDENT or TUTOR' }),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
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
