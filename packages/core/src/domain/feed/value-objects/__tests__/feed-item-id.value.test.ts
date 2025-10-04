/**
 * FeedItemId Value Object Tests
 * Tests for unique feed item identifier validation
 */

import { describe, it, expect } from 'vitest';
import { FeedItemId } from '../feed-item-id.value';

describe('FeedItemId', () => {
  describe('create()', () => {
    it('should create a valid FeedItemId with provided id', () => {
      const result = FeedItemId.create('feeditem_123');
      expect(result.isSuccess).toBe(true);

      const feedItemId = result.getValue();
      expect(feedItemId.value).toBe('feeditem_123');
      expect(feedItemId.id).toBe('feeditem_123');
    });

  });

  describe('generate()', () => {
    it('should auto-generate a valid FeedItemId', () => {
      const result = FeedItemId.generate();
      expect(result.isSuccess).toBe(true);

      const feedItemId = result.getValue();
      expect(feedItemId.value).toBeDefined();
      expect(feedItemId.value.length).toBeGreaterThan(0);
      expect(feedItemId.value).toContain('item_');
    });

    it('should create different ids when called multiple times', () => {
      const id1 = FeedItemId.generate().getValue();
      const id2 = FeedItemId.generate().getValue();

      expect(id1.value).not.toBe(id2.value);
    });
  });

  describe('validation', () => {
    it('should fail when provided id is empty string', () => {
      const result = FeedItemId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('FeedItemId cannot be empty');
    });

    it('should fail when provided id is whitespace only', () => {
      const result = FeedItemId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('FeedItemId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = FeedItemId.create('feeditem_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('feeditem_abc-123_xyz');
    });

    it('should accept UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = FeedItemId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = FeedItemId.create('feeditem_123').getValue();
      const id2 = FeedItemId.create('feeditem_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = FeedItemId.create('feeditem_123').getValue();
      const id2 = FeedItemId.create('feeditem_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should not be equal when auto-generated', () => {
      const id1 = FeedItemId.generate().getValue();
      const id2 = FeedItemId.generate().getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const feedItemId = FeedItemId.create('feeditem_test').getValue();
      expect(feedItemId.toString()).toBe('feeditem_test');
    });
  });

  describe('real-world usage', () => {
    it('should create feed item id for post', () => {
      const result = FeedItemId.create('feeditem_post_12345');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed item id for event', () => {
      const result = FeedItemId.create('feeditem_event_basketball');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed item id for ritual progress', () => {
      const result = FeedItemId.create('feeditem_ritual_progress_123');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed item id for connection suggestion', () => {
      const result = FeedItemId.create('feeditem_connection_suggestion');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed item id for space recommendation', () => {
      const result = FeedItemId.create('feeditem_space_recommendation');
      expect(result.isSuccess).toBe(true);
    });
  });
});
