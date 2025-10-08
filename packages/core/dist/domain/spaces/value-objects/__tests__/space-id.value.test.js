"use strict";
/**
 * SpaceId Value Object Tests
 * Tests for unique space identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_id_value_1 = require("../space-id.value");
(0, vitest_1.describe)('SpaceId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid SpaceId with provided id', () => {
            const result = space_id_value_1.SpaceId.create('space_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const spaceId = result.getValue();
            (0, vitest_1.expect)(spaceId.value).toBe('space_123');
            (0, vitest_1.expect)(spaceId.id).toBe('space_123');
        });
    });
    (0, vitest_1.describe)('generate()', () => {
        (0, vitest_1.it)('should auto-generate a valid SpaceId', () => {
            const result = space_id_value_1.SpaceId.generate();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const spaceId = result.getValue();
            (0, vitest_1.expect)(spaceId.value).toBeDefined();
            (0, vitest_1.expect)(spaceId.value.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(spaceId.value).toContain('space_');
        });
        (0, vitest_1.it)('should create different ids when called multiple times', () => {
            const id1 = space_id_value_1.SpaceId.generate().getValue();
            const id2 = space_id_value_1.SpaceId.generate().getValue();
            (0, vitest_1.expect)(id1.value).not.toBe(id2.value);
        });
    });
    (0, vitest_1.describe)('validation', () => {
        (0, vitest_1.it)('should fail when provided id is empty string', () => {
            const result = space_id_value_1.SpaceId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('SpaceId cannot be empty');
        });
        (0, vitest_1.it)('should fail when provided id is whitespace only', () => {
            const result = space_id_value_1.SpaceId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('SpaceId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = space_id_value_1.SpaceId.create('space_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('space_abc-123_xyz');
        });
        (0, vitest_1.it)('should accept UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = space_id_value_1.SpaceId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = space_id_value_1.SpaceId.create('space_123').getValue();
            const id2 = space_id_value_1.SpaceId.create('space_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = space_id_value_1.SpaceId.create('space_123').getValue();
            const id2 = space_id_value_1.SpaceId.create('space_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when auto-generated', () => {
            const id1 = space_id_value_1.SpaceId.generate().getValue();
            const id2 = space_id_value_1.SpaceId.generate().getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const spaceId = space_id_value_1.SpaceId.create('space_test').getValue();
            (0, vitest_1.expect)(spaceId.toString()).toBe('space_test');
        });
    });
    (0, vitest_1.describe)('edge cases', () => {
        (0, vitest_1.it)('should handle very long id strings', () => {
            const longId = 'a'.repeat(200);
            const result = space_id_value_1.SpaceId.create(longId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle ids with special characters', () => {
            const result = space_id_value_1.SpaceId.create('space@test#123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle numeric ids', () => {
            const result = space_id_value_1.SpaceId.create('12345');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should create ids for various space types', () => {
            const spaces = [
                'space_ub_acm',
                'space_ellicott_complex',
                'space_study_group_cse116',
                'space_basketball_pickup'
            ];
            spaces.forEach(spaceId => {
                const result = space_id_value_1.SpaceId.create(spaceId);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=space-id.value.test.js.map