/**
 * SpaceId Value Object Tests
 * Tests for unique space identifier validation
 */

import { describe, it, expect } from 'vitest';
import { SpaceId } from '../space-id.value';

describe('SpaceId', () => {
  describe('create()', () => {
    it('should create a valid SpaceId with provided id', () => {
      const result = SpaceId.create('space_123');
      expect(result.isSuccess).toBe(true);

      const spaceId = result.getValue();
      expect(spaceId.value).toBe('space_123');
      expect(spaceId.id).toBe('space_123');
    });

  });

  describe('generate()', () => {
    it('should auto-generate a valid SpaceId', () => {
      const result = SpaceId.generate();
      expect(result.isSuccess).toBe(true);

      const spaceId = result.getValue();
      expect(spaceId.value).toBeDefined();
      expect(spaceId.value.length).toBeGreaterThan(0);
      expect(spaceId.value).toContain('space_');
    });

    it('should create different ids when called multiple times', () => {
      const id1 = SpaceId.generate().getValue();
      const id2 = SpaceId.generate().getValue();

      expect(id1.value).not.toBe(id2.value);
    });
  });

  describe('validation', () => {
    it('should fail when provided id is empty string', () => {
      const result = SpaceId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('SpaceId cannot be empty');
    });

    it('should fail when provided id is whitespace only', () => {
      const result = SpaceId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('SpaceId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = SpaceId.create('space_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('space_abc-123_xyz');
    });

    it('should accept UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = SpaceId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = SpaceId.create('space_123').getValue();
      const id2 = SpaceId.create('space_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = SpaceId.create('space_123').getValue();
      const id2 = SpaceId.create('space_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should not be equal when auto-generated', () => {
      const id1 = SpaceId.generate().getValue();
      const id2 = SpaceId.generate().getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const spaceId = SpaceId.create('space_test').getValue();
      expect(spaceId.toString()).toBe('space_test');
    });
  });

  describe('edge cases', () => {
    it('should handle very long id strings', () => {
      const longId = 'a'.repeat(200);
      const result = SpaceId.create(longId);
      expect(result.isSuccess).toBe(true);
    });

    it('should handle ids with special characters', () => {
      const result = SpaceId.create('space@test#123');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle numeric ids', () => {
      const result = SpaceId.create('12345');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('real-world usage', () => {
    it('should create ids for various space types', () => {
      const spaces = [
        'space_ub_acm',
        'space_ellicott_complex',
        'space_study_group_cse116',
        'space_basketball_pickup'
      ];

      spaces.forEach(spaceId => {
        const result = SpaceId.create(spaceId);
        expect(result.isSuccess).toBe(true);
      });
    });
  });
});
