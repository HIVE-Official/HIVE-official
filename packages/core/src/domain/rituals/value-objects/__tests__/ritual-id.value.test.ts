/**
 * RitualId Value Object Tests
 * Tests for unique ritual identifier validation
 */

import { describe, it, expect } from 'vitest';
import { RitualId } from '../ritual-id.value';

describe('RitualId', () => {
  describe('create()', () => {
    it('should create a valid RitualId with provided id', () => {
      const result = RitualId.create('ritual_123');
      expect(result.isSuccess).toBe(true);

      const ritualId = result.getValue();
      expect(ritualId.value).toBe('ritual_123');
      expect(ritualId.id).toBe('ritual_123');
    });

  });

  describe('generate()', () => {
    it('should auto-generate a valid RitualId', () => {
      const result = RitualId.generate();
      expect(result.isSuccess).toBe(true);

      const ritualId = result.getValue();
      expect(ritualId.value).toBeDefined();
      expect(ritualId.value.length).toBeGreaterThan(0);
      expect(ritualId.value).toContain('ritual_');
    });

    it('should create different ids when called multiple times', () => {
      const id1 = RitualId.generate().getValue();
      const id2 = RitualId.generate().getValue();

      expect(id1.value).not.toBe(id2.value);
    });

    it('should fail when provided id is empty string', () => {
      const result = RitualId.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('RitualId cannot be empty');
    });

    it('should fail when provided id is whitespace only', () => {
      const result = RitualId.create('   ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('RitualId cannot be empty');
    });

    it('should accept alphanumeric with underscores and hyphens', () => {
      const result = RitualId.create('ritual_abc-123_xyz');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('ritual_abc-123_xyz');
    });

    it('should accept UUID format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      const result = RitualId.create(uuid);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(uuid);
    });
  });

  describe('equality', () => {
    it('should be equal when values are the same', () => {
      const id1 = RitualId.create('ritual_123').getValue();
      const id2 = RitualId.create('ritual_123').getValue();

      expect(id1.equals(id2)).toBe(true);
    });

    it('should not be equal when values differ', () => {
      const id1 = RitualId.create('ritual_123').getValue();
      const id2 = RitualId.create('ritual_456').getValue();

      expect(id1.equals(id2)).toBe(false);
    });

    it('should not be equal when auto-generated', () => {
      const id1 = RitualId.generate().getValue();
      const id2 = RitualId.generate().getValue();

      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the id value as string', () => {
      const ritualId = RitualId.create('ritual_test').getValue();
      expect(ritualId.toString()).toBe('ritual_test');
    });
  });

  describe('real-world usage', () => {
    it('should create ids for various ritual types', () => {
      const rituals = [
        'ritual_welcome_week_2024',
        'ritual_finals_survival',
        'ritual_basketball_challenge',
        'ritual_community_service'
      ];

      rituals.forEach(ritualId => {
        const result = RitualId.create(ritualId);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should handle short ritual ids', () => {
      const result = RitualId.create('ritual_short');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle anticipatory ritual ids', () => {
      const result = RitualId.create('ritual_anticipatory_welcome_2024');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle yearbook ritual ids', () => {
      const result = RitualId.create('ritual_yearbook_ub_2024');
      expect(result.isSuccess).toBe(true);
    });
  });
});
