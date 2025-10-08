"use strict";
/**
 * FeedId Value Object Tests
 * Tests for unique feed identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_id_value_1 = require("../feed-id.value");
(0, vitest_1.describe)('FeedId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid FeedId with provided id', () => {
            const result = feed_id_value_1.FeedId.create('feed_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedId = result.getValue();
            (0, vitest_1.expect)(feedId.value).toBe('feed_123');
            (0, vitest_1.expect)(feedId.id).toBe('feed_123');
        });
        (0, vitest_1.it)('should fail when provided id is empty string', () => {
            const result = feed_id_value_1.FeedId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('FeedId cannot be empty');
        });
        (0, vitest_1.it)('should fail when provided id is whitespace only', () => {
            const result = feed_id_value_1.FeedId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('FeedId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = feed_id_value_1.FeedId.create('feed_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('feed_abc-123_xyz');
        });
        (0, vitest_1.it)('should accept UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = feed_id_value_1.FeedId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = feed_id_value_1.FeedId.create('feed_123').getValue();
            const id2 = feed_id_value_1.FeedId.create('feed_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = feed_id_value_1.FeedId.create('feed_123').getValue();
            const id2 = feed_id_value_1.FeedId.create('feed_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal with different values', () => {
            const id1 = feed_id_value_1.FeedId.create('feed_123').getValue();
            const id2 = feed_id_value_1.FeedId.create('feed_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const feedId = feed_id_value_1.FeedId.create('feed_test').getValue();
            (0, vitest_1.expect)(feedId.toString()).toBe('feed_test');
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should create feed id for user profile', () => {
            const result = feed_id_value_1.FeedId.create('feed_user_john_doe');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed id for campus-wide feed', () => {
            const result = feed_id_value_1.FeedId.create('feed_campus_ub_buffalo');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed id for space-specific feed', () => {
            const result = feed_id_value_1.FeedId.create('feed_space_ub_acm');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=feed-id.value.test.js.map