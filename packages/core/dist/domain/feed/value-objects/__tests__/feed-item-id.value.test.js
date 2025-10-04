"use strict";
/**
 * FeedItemId Value Object Tests
 * Tests for unique feed item identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_item_id_value_1 = require("../feed-item-id.value");
(0, vitest_1.describe)('FeedItemId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid FeedItemId with provided id', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedItemId = result.getValue();
            (0, vitest_1.expect)(feedItemId.value).toBe('feeditem_123');
            (0, vitest_1.expect)(feedItemId.id).toBe('feeditem_123');
        });
    });
    (0, vitest_1.describe)('generate()', () => {
        (0, vitest_1.it)('should auto-generate a valid FeedItemId', () => {
            const result = feed_item_id_value_1.FeedItemId.generate();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feedItemId = result.getValue();
            (0, vitest_1.expect)(feedItemId.value).toBeDefined();
            (0, vitest_1.expect)(feedItemId.value.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(feedItemId.value).toContain('item_');
        });
        (0, vitest_1.it)('should create different ids when called multiple times', () => {
            const id1 = feed_item_id_value_1.FeedItemId.generate().getValue();
            const id2 = feed_item_id_value_1.FeedItemId.generate().getValue();
            (0, vitest_1.expect)(id1.value).not.toBe(id2.value);
        });
    });
    (0, vitest_1.describe)('validation', () => {
        (0, vitest_1.it)('should fail when provided id is empty string', () => {
            const result = feed_item_id_value_1.FeedItemId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('FeedItemId cannot be empty');
        });
        (0, vitest_1.it)('should fail when provided id is whitespace only', () => {
            const result = feed_item_id_value_1.FeedItemId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('FeedItemId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('feeditem_abc-123_xyz');
        });
        (0, vitest_1.it)('should accept UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = feed_item_id_value_1.FeedItemId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = feed_item_id_value_1.FeedItemId.create('feeditem_123').getValue();
            const id2 = feed_item_id_value_1.FeedItemId.create('feeditem_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = feed_item_id_value_1.FeedItemId.create('feeditem_123').getValue();
            const id2 = feed_item_id_value_1.FeedItemId.create('feeditem_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when auto-generated', () => {
            const id1 = feed_item_id_value_1.FeedItemId.generate().getValue();
            const id2 = feed_item_id_value_1.FeedItemId.generate().getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const feedItemId = feed_item_id_value_1.FeedItemId.create('feeditem_test').getValue();
            (0, vitest_1.expect)(feedItemId.toString()).toBe('feeditem_test');
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should create feed item id for post', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_post_12345');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed item id for event', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_event_basketball');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed item id for ritual progress', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_ritual_progress_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed item id for connection suggestion', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_connection_suggestion');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should create feed item id for space recommendation', () => {
            const result = feed_item_id_value_1.FeedItemId.create('feeditem_space_recommendation');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=feed-item-id.value.test.js.map