"use strict";
/**
 * RitualId Value Object Tests
 * Tests for unique ritual identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_id_value_1 = require("../ritual-id.value");
(0, vitest_1.describe)('RitualId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid RitualId with provided id', () => {
            const result = ritual_id_value_1.RitualId.create('ritual_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const ritualId = result.getValue();
            (0, vitest_1.expect)(ritualId.value).toBe('ritual_123');
            (0, vitest_1.expect)(ritualId.id).toBe('ritual_123');
        });
    });
    (0, vitest_1.describe)('generate()', () => {
        (0, vitest_1.it)('should auto-generate a valid RitualId', () => {
            const result = ritual_id_value_1.RitualId.generate();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const ritualId = result.getValue();
            (0, vitest_1.expect)(ritualId.value).toBeDefined();
            (0, vitest_1.expect)(ritualId.value.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(ritualId.value).toContain('ritual_');
        });
        (0, vitest_1.it)('should create different ids when called multiple times', () => {
            const id1 = ritual_id_value_1.RitualId.generate().getValue();
            const id2 = ritual_id_value_1.RitualId.generate().getValue();
            (0, vitest_1.expect)(id1.value).not.toBe(id2.value);
        });
        (0, vitest_1.it)('should fail when provided id is empty string', () => {
            const result = ritual_id_value_1.RitualId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('RitualId cannot be empty');
        });
        (0, vitest_1.it)('should fail when provided id is whitespace only', () => {
            const result = ritual_id_value_1.RitualId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('RitualId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = ritual_id_value_1.RitualId.create('ritual_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('ritual_abc-123_xyz');
        });
        (0, vitest_1.it)('should accept UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = ritual_id_value_1.RitualId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = ritual_id_value_1.RitualId.create('ritual_123').getValue();
            const id2 = ritual_id_value_1.RitualId.create('ritual_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = ritual_id_value_1.RitualId.create('ritual_123').getValue();
            const id2 = ritual_id_value_1.RitualId.create('ritual_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when auto-generated', () => {
            const id1 = ritual_id_value_1.RitualId.generate().getValue();
            const id2 = ritual_id_value_1.RitualId.generate().getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const ritualId = ritual_id_value_1.RitualId.create('ritual_test').getValue();
            (0, vitest_1.expect)(ritualId.toString()).toBe('ritual_test');
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should create ids for various ritual types', () => {
            const rituals = [
                'ritual_welcome_week_2024',
                'ritual_finals_survival',
                'ritual_basketball_challenge',
                'ritual_community_service'
            ];
            rituals.forEach(ritualId => {
                const result = ritual_id_value_1.RitualId.create(ritualId);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should handle short ritual ids', () => {
            const result = ritual_id_value_1.RitualId.create('ritual_short');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle anticipatory ritual ids', () => {
            const result = ritual_id_value_1.RitualId.create('ritual_anticipatory_welcome_2024');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle yearbook ritual ids', () => {
            const result = ritual_id_value_1.RitualId.create('ritual_yearbook_ub_2024');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=ritual-id.value.test.js.map