/**
 * SpaceName Value Object Tests
 * Tests for space name validation
 */

import { describe, it, expect } from 'vitest';
import { SpaceName } from '../space-name.value';

describe('SpaceName', () => {
  describe('create()', () => {
    it('should create a valid space name', () => {
      const result = SpaceName.create('UB ACM Chapter');
      expect(result.isSuccess).toBe(true);

      const name = result.getValue();
      expect(name.value).toBe('UB ACM Chapter');
      expect(name.name).toBe('UB ACM Chapter');
    });

    it('should trim whitespace from name', () => {
      const result = SpaceName.create('  Study Group  ');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('Study Group');
    });

    it('should fail when name is too short (< 3 chars)', () => {
      const result = SpaceName.create('AB');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should fail when name is too long (> 50 chars)', () => {
      const result = SpaceName.create('a'.repeat(51));
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('no more than 50 characters');
    });

    it('should accept name with exactly 3 characters', () => {
      const result = SpaceName.create('ACM');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('ACM');
    });

    it('should accept name with exactly 50 characters', () => {
      const name = 'a'.repeat(50);
      const result = SpaceName.create(name);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(name);
    });

    it('should fail when trimmed name is too short', () => {
      const result = SpaceName.create('  a  ');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should fail when name is empty', () => {
      const result = SpaceName.create('');
      expect(result.isFailure).toBe(true);
    });

    it('should fail when name is whitespace only', () => {
      const result = SpaceName.create('   ');
      expect(result.isFailure).toBe(true);
    });

    it('should accept names with special characters', () => {
      const result = SpaceName.create('Study Group: CSE 116');
      expect(result.isSuccess).toBe(true);
    });

    it('should accept names with numbers', () => {
      const result = SpaceName.create('CSE 116 Study Group');
      expect(result.isSuccess).toBe(true);
    });

    it('should accept names with emojis', () => {
      const result = SpaceName.create('Basketball 🏀 Pickup');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('equality', () => {
    it('should be equal when names are the same', () => {
      const name1 = SpaceName.create('Study Group').getValue();
      const name2 = SpaceName.create('Study Group').getValue();

      expect(name1.equals(name2)).toBe(true);
    });

    it('should not be equal when names differ', () => {
      const name1 = SpaceName.create('Study Group').getValue();
      const name2 = SpaceName.create('Social Club').getValue();

      expect(name1.equals(name2)).toBe(false);
    });

    it('should be equal after trimming whitespace', () => {
      const name1 = SpaceName.create('  Study Group  ').getValue();
      const name2 = SpaceName.create('Study Group').getValue();

      expect(name1.equals(name2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the name value as string', () => {
      const name = SpaceName.create('Test Space').getValue();
      expect(name.toString()).toBe('Test Space');
    });
  });

  describe('real-world examples', () => {
    it('should accept typical UB space names', () => {
      const names = [
        'UB ACM',
        'Ellicott Complex',
        'CSE 116 Study Group',
        'Basketball Pickup Games',
        'Governors Study Lounge',
        'Engineering Department',
        'Pre-Med Student Org',
        'Computer Science Alumni'
      ];

      names.forEach(name => {
        const result = SpaceName.create(name);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should reject invalid space names', () => {
      const names = [
        'AB', // Too short
        'a'.repeat(51), // Too long
        '', // Empty
        '  ' // Whitespace only
      ];

      names.forEach(name => {
        const result = SpaceName.create(name);
        expect(result.isFailure).toBe(true);
      });
    });

    it('should accept space names with various formats', () => {
      const names = [
        'UB ACM: Buffalo Chapter',
        'Study Group (CSE 116)',
        'Basketball @ Alumni Arena',
        'Co-op & Internship Prep',
        'Math Help 24/7'
      ];

      names.forEach(name => {
        const result = SpaceName.create(name);
        expect(result.isSuccess).toBe(true);
      });
    });
  });

  describe('boundary conditions', () => {
    it('should fail with 2 characters', () => {
      const result = SpaceName.create('AB');
      expect(result.isFailure).toBe(true);
    });

    it('should succeed with 3 characters', () => {
      const result = SpaceName.create('ACM');
      expect(result.isSuccess).toBe(true);
    });

    it('should succeed with 50 characters', () => {
      const result = SpaceName.create('a'.repeat(50));
      expect(result.isSuccess).toBe(true);
    });

    it('should fail with 51 characters', () => {
      const result = SpaceName.create('a'.repeat(51));
      expect(result.isFailure).toBe(true);
    });
  });
});
