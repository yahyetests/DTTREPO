import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
    registerSchema,
    loginSchema,
    createSessionSchema,
    addSubjectSchema,
    updateProfileSchema,
    createProgressSchema,
    sendMessageSchema
} from './validators.js';

describe('Validators', () => {
    describe('registerSchema', () => {
        const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password123',
            role: 'STUDENT'
        };

        test('should validate valid data', () => {
            const result = registerSchema.safeParse(validData);
            assert.strictEqual(result.success, true);
        });

        test('should fail with short name', () => {
            const result = registerSchema.safeParse({ ...validData, name: 'J' });
            assert.strictEqual(result.success, false);
            if (!result.success) {
                assert.ok(result.error.errors.some(e => e.message === 'Name must be at least 2 characters'));
            }
        });

        test('should fail with invalid email', () => {
            const result = registerSchema.safeParse({ ...validData, email: 'invalid-email' });
            assert.strictEqual(result.success, false);
            if (!result.success) {
                assert.ok(result.error.errors.some(e => e.message === 'Invalid email address'));
            }
        });

        test('should fail with weak password (no uppercase)', () => {
            const result = registerSchema.safeParse({ ...validData, password: 'password123' });
            assert.strictEqual(result.success, false);
            if (!result.success) {
                assert.ok(result.error.errors.some(e => e.message === 'Password must contain at least one uppercase letter'));
            }
        });

        test('should fail with weak password (no number)', () => {
            const result = registerSchema.safeParse({ ...validData, password: 'Password' });
            assert.strictEqual(result.success, false);
            if (!result.success) {
                assert.ok(result.error.errors.some(e => e.message === 'Password must contain at least one number'));
            }
        });

        test('should fail with invalid role', () => {
            const result = registerSchema.safeParse({ ...validData, role: 'INVALID_ROLE' });
            assert.strictEqual(result.success, false);
            if (!result.success) {
                assert.ok(result.error.errors.some(e => e.message === 'Role must be STUDENT or TUTOR'));
            }
        });
    });

    describe('loginSchema', () => {
        const validData = {
            email: 'john@example.com',
            password: 'Password123'
        };

        test('should validate valid data', () => {
            const result = loginSchema.safeParse(validData);
            assert.strictEqual(result.success, true);
        });

        test('should fail with invalid email', () => {
            const result = loginSchema.safeParse({ ...validData, email: 'invalid-email' });
            assert.strictEqual(result.success, false);
        });

        test('should fail with missing password', () => {
            const result = loginSchema.safeParse({ email: 'john@example.com', password: '' });
            assert.strictEqual(result.success, false);
        });
    });

    describe('createSessionSchema', () => {
        const validData = {
            tutorId: '550e8400-e29b-41d4-a716-446655440000',
            subjectId: '550e8400-e29b-41d4-a716-446655440001',
            startTime: '2024-03-07T14:00:00Z',
            endTime: '2024-03-07T15:00:00Z'
        };

        test('should validate valid data', () => {
            const result = createSessionSchema.safeParse(validData);
            assert.strictEqual(result.success, true);
        });

        test('should fail with invalid UUID', () => {
            const result = createSessionSchema.safeParse({ ...validData, tutorId: 'not-a-uuid' });
            assert.strictEqual(result.success, false);
        });

        test('should fail with invalid datetime', () => {
            const result = createSessionSchema.safeParse({ ...validData, startTime: 'not-a-date' });
            assert.strictEqual(result.success, false);
        });
    });

    describe('addSubjectSchema', () => {
        test('should validate valid UUID', () => {
            const result = addSubjectSchema.safeParse({ subjectId: '550e8400-e29b-41d4-a716-446655440000' });
            assert.strictEqual(result.success, true);
        });

        test('should fail with invalid UUID', () => {
            const result = addSubjectSchema.safeParse({ subjectId: 'not-a-uuid' });
            assert.strictEqual(result.success, false);
        });
    });

    describe('updateProfileSchema', () => {
        test('should validate valid data', () => {
            const result = updateProfileSchema.safeParse({ name: 'Jane Doe' });
            assert.strictEqual(result.success, true);
        });

        test('should validate when name is missing (optional)', () => {
            const result = updateProfileSchema.safeParse({});
            assert.strictEqual(result.success, true);
        });

        test('should fail with short name', () => {
            const result = updateProfileSchema.safeParse({ name: 'J' });
            assert.strictEqual(result.success, false);
        });
    });

    describe('createProgressSchema', () => {
        const validData = {
            studentProfileId: '550e8400-e29b-41d4-a716-446655440000',
            subjectId: '550e8400-e29b-41d4-a716-446655440001',
            metricType: 'Math Quiz',
            value: 85
        };

        test('should validate valid data', () => {
            const result = createProgressSchema.safeParse(validData);
            assert.strictEqual(result.success, true);
        });

        test('should fail with value out of range (>100)', () => {
            const result = createProgressSchema.safeParse({ ...validData, value: 101 });
            assert.strictEqual(result.success, false);
        });

        test('should fail with value out of range (<0)', () => {
            const result = createProgressSchema.safeParse({ ...validData, value: -1 });
            assert.strictEqual(result.success, false);
        });
    });

    describe('sendMessageSchema', () => {
        const validData = {
            toUserId: '550e8400-e29b-41d4-a716-446655440000',
            body: 'Hello there!'
        };

        test('should validate valid data', () => {
            const result = sendMessageSchema.safeParse(validData);
            assert.strictEqual(result.success, true);
        });

        test('should fail with empty body', () => {
            const result = sendMessageSchema.safeParse({ ...validData, body: '' });
            assert.strictEqual(result.success, false);
        });

        test('should fail with body too long', () => {
            const result = sendMessageSchema.safeParse({ ...validData, body: 'a'.repeat(5001) });
            assert.strictEqual(result.success, false);
        });
    });
});
