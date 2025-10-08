/**
 * ProfileId Value Object Tests
 * Tests for unique profile identifier validation
 */

import { describe, it, expect } from 'vitest';
import { ProfileId } from '../profile-id.value';

describe('ProfileId', () => {
  describe('create()', () => {
    it('should create a valid ProfileId with string argument', () => {
      const result = ProfileId.create('profile_123');
      expect(result.isSuccess).toBe(true);

      const profileId = result.getValue();
      expect(profileId.value).toBe('profile_123');
      expect(profileId.id).toBe('profile_123');
    });

    it('should create ProfileId with UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = ProfileId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });

    it('should fail when id is empty string', () => {
      const result = ProfileId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ProfileId cannot be empty');
    });

    it('should fail when id is whitespace only', () => {
      const result = ProfileId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ProfileId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = ProfileId.create('profile_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('profile_abc-123_xyz');
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = ProfileId.create('profile_123').getValue();
      const id2 = ProfileId.create('profile_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = ProfileId.create('profile_123').getValue();
      const id2 = ProfileId.create('profile_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const profileId = ProfileId.create('profile_test').getValue();
      expect(profileId.toString()).toBe('profile_test');
    });
  });

  describe('edge cases', () => {
    it('should handle very long id strings', () => {
      const longId = 'a'.repeat(200);
      const result = ProfileId.create(longId);
      expect(result.isSuccess).toBe(true);
    });

    it('should handle ids with special characters', () => {
      const result = ProfileId.create('profile@test#123');
      expect(result.isSuccess).toBe(true);
    });
  });
});
