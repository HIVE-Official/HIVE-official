/**
 * FeedId Value Object Tests
 * Tests for unique feed identifier validation
 */

import { describe, it, expect } from 'vitest';
import { FeedId } from '../feed-id.value';

describe('FeedId', () => {
  describe('create()', () => {
    it('should create a valid FeedId with provided id', () => {
      const result = FeedId.create('feed_123');
      expect(result.isSuccess).toBe(true);

      const feedId = result.getValue();
      expect(feedId.value).toBe('feed_123');
      expect(feedId.id).toBe('feed_123');
    });

    it('should fail when provided id is empty string', () => {
      const result = FeedId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('FeedId cannot be empty');
    });

    it('should fail when provided id is whitespace only', () => {
      const result = FeedId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('FeedId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = FeedId.create('feed_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('feed_abc-123_xyz');
    });

    it('should accept UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = FeedId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = FeedId.create('feed_123').getValue();
      const id2 = FeedId.create('feed_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = FeedId.create('feed_123').getValue();
      const id2 = FeedId.create('feed_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should not be equal with different values', () => {
      const id1 = FeedId.create('feed_123').getValue();
      const id2 = FeedId.create('feed_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const feedId = FeedId.create('feed_test').getValue();
      expect(feedId.toString()).toBe('feed_test');
    });
  });

  describe('real-world usage', () => {
    it('should create feed id for user profile', () => {
      const result = FeedId.create('feed_user_john_doe');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed id for campus-wide feed', () => {
      const result = FeedId.create('feed_campus_ub_buffalo');
      expect(result.isSuccess).toBe(true);
    });

    it('should create feed id for space-specific feed', () => {
      const result = FeedId.create('feed_space_ub_acm');
      expect(result.isSuccess).toBe(true);
    });
  });
});
