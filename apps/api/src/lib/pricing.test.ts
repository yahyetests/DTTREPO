import { test, describe } from 'node:test';
import assert from 'node:assert';
import { computeCheckoutPrice } from './pricing.ts';

describe('computeCheckoutPrice', () => {
    test('should calculate correct price for standard GCSE Platinum Path session', () => {
        const input = {
            tier: 'platinum-path',
            level: 'gcse',
            sessionMinutes: 60,
            sessionsPerWeek: 1,
        };
        const result = computeCheckoutPrice(input);

        // 175 / 4 = 43.75, rounded to 44
        assert.strictEqual(result.perSession, 44);
        assert.strictEqual(result.unitAmountPence, 4400);
        assert.strictEqual(result.quantity, 1);
        assert.strictEqual(result.productName, 'GCSE Platinum Path (1:1) Tuition');
        assert.strictEqual(result.productDescription, '60-minute session · GCSE · Platinum Path (1:1)');
    });

    test('should calculate correct price for 90-minute GCSE Platinum Path session', () => {
        const input = {
            tier: 'platinum-path',
            level: 'gcse',
            sessionMinutes: 90,
            sessionsPerWeek: 1,
        };
        const result = computeCheckoutPrice(input);

        // 175 / 4 = 43.75
        // 43.75 * 1.5 = 65.625, rounded to 66
        assert.strictEqual(result.perSession, 66);
        assert.strictEqual(result.unitAmountPence, 6600);
    });

    test('should calculate correct price for multiple sessions per week', () => {
        const input = {
            tier: 'foundational-focus',
            level: '11-plus',
            sessionMinutes: 60,
            sessionsPerWeek: 3,
        };
        const result = computeCheckoutPrice(input);

        // 15 / 4 = 3.75, rounded to 4
        assert.strictEqual(result.perSession, 4);
        assert.strictEqual(result.unitAmountPence, 400);
        assert.strictEqual(result.quantity, 3);
        assert.strictEqual(result.productName, '11+ Foundational Focus (10:1) Tuition');
    });

    test('should throw error for unknown tier', () => {
        const input = {
            tier: 'invalid-tier',
            level: 'gcse',
            sessionMinutes: 60,
            sessionsPerWeek: 1,
        };
        assert.throws(() => computeCheckoutPrice(input), /Unknown tier: invalid-tier/);
    });

    test('should throw error for unknown level', () => {
        const input = {
            tier: 'platinum-path',
            level: 'invalid-level',
            sessionMinutes: 60,
            sessionsPerWeek: 1,
        };
        assert.throws(() => computeCheckoutPrice(input), /Unknown level: invalid-level/);
    });
});
