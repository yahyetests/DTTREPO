import test from 'node:test';
import assert from 'node:assert';
import { computeCheckoutPrice } from './pricing.ts';

test('computeCheckoutPrice - Happy Path (Standard)', () => {
    const input = {
        tier: 'platinum-path',
        level: 'gcse',
        sessionMinutes: 60,
        sessionsPerWeek: 1,
    };
    const output = computeCheckoutPrice(input);

    assert.strictEqual(output.unitAmountPence, 4400);
    assert.strictEqual(output.perSession, 44);
    assert.strictEqual(output.quantity, 1);
    assert.strictEqual(output.productName, 'GCSE Platinum Path (1:1) Tuition');
    assert.ok(output.productDescription.includes('60-minute session'));
});

test('computeCheckoutPrice - Happy Path (90 min, multiple sessions)', () => {
    const input = {
        tier: 'gold-edge',
        level: 'a-level',
        sessionMinutes: 90,
        sessionsPerWeek: 2,
    };
    const output = computeCheckoutPrice(input);

    // Gold Edge, A-Level: 175
    // 175 / 4 = 43.75
    // 43.75 * 1.5 = 65.625
    // Math.round(65.625) = 66
    assert.strictEqual(output.unitAmountPence, 6600);
    assert.strictEqual(output.perSession, 66);
    assert.strictEqual(output.quantity, 2);
});

test('computeCheckoutPrice - Happy Path (Rounding)', () => {
    const input = {
        tier: 'foundational-focus',
        level: '11-plus',
        sessionMinutes: 60,
        sessionsPerWeek: 1,
    };
    const output = computeCheckoutPrice(input);

    // Foundational Focus, 11-plus: 15
    // 15 / 4 = 3.75
    // Math.round(3.75) = 4
    assert.strictEqual(output.unitAmountPence, 400);
    assert.strictEqual(output.perSession, 4);
});

test('computeCheckoutPrice - Error Case (Invalid Tier)', () => {
    const input = {
        tier: 'invalid',
        level: 'gcse',
        sessionMinutes: 60,
        sessionsPerWeek: 1,
    };
    assert.throws(() => computeCheckoutPrice(input), {
        message: 'Unknown tier: invalid',
    });
});

test('computeCheckoutPrice - Error Case (Invalid Level)', () => {
    const input = {
        tier: 'platinum-path',
        level: 'invalid',
        sessionMinutes: 60,
        sessionsPerWeek: 1,
    };
    assert.throws(() => computeCheckoutPrice(input), {
        message: 'Unknown level: invalid',
    });
});
