/**
 * CampusId Value Object Tests
 * Tests for campus identifier validation (multi-tenant isolation)
 */

import { describe, it, expect } from 'vitest';
import { CampusId } from '../campus-id.value';

describe('CampusId', () => {
  describe('create()', () => {
    it('should create valid CampusId for ub-buffalo', () => {
      const result = CampusId.create('ub-buffalo');
      expect(result.isSuccess).toBe(true);

      const campusId = result.getValue();
      expect(campusId.value).toBe('ub-buffalo');
      expect(campusId.id).toBe('ub-buffalo');
    });

    it('should fail when campus id is not ub-buffalo (v1 restriction)', () => {
      const result = CampusId.create('harvard');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('ub-buffalo');
    });

    it('should fail when campus id is empty', () => {
      const result = CampusId.create('');
      expect(result.isFailure).toBe(true);
    });

    it('should fail when campus id is whitespace only', () => {
      const result = CampusId.create('   ');
      expect(result.isFailure).toBe(true);
    });

    it('should fail for case variations of ub-buffalo', () => {
      const variations = ['UB-Buffalo', 'UB-BUFFALO', 'ub-Buffalo', 'Ub-buffalo'];

      variations.forEach(variation => {
        const result = CampusId.create(variation);
        expect(result.isFailure).toBe(true);
      });
    });

    it('should not trim whitespace before validation', () => {
      const result = CampusId.create('  ub-buffalo  ');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('equality', () => {
    it('should be equal when both are ub-buffalo', () => {
      const id1 = CampusId.create('ub-buffalo').getValue();
      const id2 = CampusId.create('ub-buffalo').getValue();

      expect(id1.equals(id2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the campus id value as string', () => {
      const campusId = CampusId.create('ub-buffalo').getValue();
      expect(campusId.toString()).toBe('ub-buffalo');
    });
  });

  describe('campus isolation', () => {
    it('should enforce single campus in v1', () => {
      // v1 only supports ub-buffalo for campus isolation
      const result = CampusId.create('ub-buffalo');
      expect(result.isSuccess).toBe(true);
    });

    it('should reject other universities', () => {
      const otherUniversities = [
        'mit',
        'stanford',
        'cornell',
        'suny-binghamton',
        'columbia'
      ];

      otherUniversities.forEach(uni => {
        const result = CampusId.create(uni);
        expect(result.isFailure).toBe(true);
      });
    });
  });
});
