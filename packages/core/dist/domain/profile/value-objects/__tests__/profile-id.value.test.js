"use strict";
/**
 * ProfileId Value Object Tests
 * Tests for unique profile identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_id_value_1 = require("../profile-id.value");
(0, vitest_1.describe)('ProfileId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid ProfileId with string argument', () => {
            const result = profile_id_value_1.ProfileId.create('profile_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const profileId = result.getValue();
            (0, vitest_1.expect)(profileId.value).toBe('profile_123');
            (0, vitest_1.expect)(profileId.id).toBe('profile_123');
        });
        (0, vitest_1.it)('should create ProfileId with UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = profile_id_value_1.ProfileId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
        (0, vitest_1.it)('should fail when id is empty string', () => {
            const result = profile_id_value_1.ProfileId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ProfileId cannot be empty');
        });
        (0, vitest_1.it)('should fail when id is whitespace only', () => {
            const result = profile_id_value_1.ProfileId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ProfileId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = profile_id_value_1.ProfileId.create('profile_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('profile_abc-123_xyz');
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = profile_id_value_1.ProfileId.create('profile_123').getValue();
            const id2 = profile_id_value_1.ProfileId.create('profile_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = profile_id_value_1.ProfileId.create('profile_123').getValue();
            const id2 = profile_id_value_1.ProfileId.create('profile_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const profileId = profile_id_value_1.ProfileId.create('profile_test').getValue();
            (0, vitest_1.expect)(profileId.toString()).toBe('profile_test');
        });
    });
    (0, vitest_1.describe)('edge cases', () => {
        (0, vitest_1.it)('should handle very long id strings', () => {
            const longId = 'a'.repeat(200);
            const result = profile_id_value_1.ProfileId.create(longId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle ids with special characters', () => {
            const result = profile_id_value_1.ProfileId.create('profile@test#123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=profile-id.value.test.js.map