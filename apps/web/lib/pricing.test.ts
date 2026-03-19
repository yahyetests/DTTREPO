import { getPrice } from './pricing';

describe('getPrice pricing logic fallback', () => {
    it('should use fallback logic when level is not found in BASE_RATES (defaults to 30)', () => {
        const params = {
            tuitionType: 'platinum-path',
            level: 'non-existent-level',
            sessionMinutes: 60,
            sessionsPerWeek: 1
        };

        const result = getPrice(params);

        // Fallback calculation:
        // hourlyRate = BASE_RATES['non-existent-level'] || 30 = 30
        // perSession = Math.round((30 / 60) * 60) = 30
        // weekly = 30 * 1 = 30
        // monthly = Math.round(30 * 4) = 120

        expect(result).toEqual({
            perSession: 30,
            weekly: 30,
            monthly: 120,
        });
    });

    it('should use fallback logic with BASE_RATES when level is found but tier combination is missing', () => {
        // 'gcse' is in BASE_RATES (50)
        // We need a combination that is NOT in pricingMatrix.
        // pricingMatrix is populated for ALL_TIERS and ALL_LEVELS for durations [60, 90, 120] and frequencies [1, 2, 3, 4, 5].
        // So we use a different duration.

        const params = {
            tuitionType: 'platinum-path',
            level: 'gcse',
            sessionMinutes: 45,
            sessionsPerWeek: 2
        };

        const result = getPrice(params);

        // BASE_RATES['gcse'] = 50
        // perSession = Math.round((50 / 60) * 45) = Math.round(37.5) = 38
        // weekly = 38 * 2 = 76
        // monthly = Math.round(76 * 4) = 304

        expect(result).toEqual({
            perSession: 38,
            weekly: 76,
            monthly: 304,
        });
    });

    it('should handle custom session minutes and sessions per week in fallback', () => {
        const params = {
            tuitionType: 'invalid-tier',
            level: 'a-level',
            sessionMinutes: 120,
            sessionsPerWeek: 3
        };

        const result = getPrice(params);

        // BASE_RATES['a-level'] = 65
        // perSession = Math.round((65 / 60) * 120) = 130
        // weekly = 130 * 3 = 390
        // monthly = Math.round(390 * 4) = 1560

        expect(result).toEqual({
            perSession: 130,
            weekly: 390,
            monthly: 1560,
        });
    });
});
