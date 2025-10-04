/**
 * SpaceCategory Value Object Tests
 * Tests for space category/type classification
 */

import { describe, it, expect } from 'vitest';
import { SpaceCategory, SpaceCategoryEnum } from '../space-category.value';

describe('SpaceCategory', () => {
  describe('create()', () => {
    it('should create valid category for general', () => {
      const result = SpaceCategory.create('general');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.GENERAL);
    });

    it('should create valid category for study-group', () => {
      const result = SpaceCategory.create('study-group');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.STUDY_GROUP);
    });

    it('should create valid category for social', () => {
      const result = SpaceCategory.create('social');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.SOCIAL);
    });

    it('should create valid category for event', () => {
      const result = SpaceCategory.create('event');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.EVENT);
    });

    it('should create valid category for resource', () => {
      const result = SpaceCategory.create('resource');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.RESOURCE);
    });

    it('should create valid category for dorm', () => {
      const result = SpaceCategory.create('dorm');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.DORM);
    });

    it('should create valid category for club', () => {
      const result = SpaceCategory.create('club');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.CLUB);
    });

    it('should create valid category for sports', () => {
      const result = SpaceCategory.create('sports');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.SPORTS);
    });

    it('should create valid category for academic', () => {
      const result = SpaceCategory.create('academic');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.ACADEMIC);
    });

    it('should fail for invalid category', () => {
      const result = SpaceCategory.create('invalid');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid space category');
    });

    it('should fail for empty string', () => {
      const result = SpaceCategory.create('');
      expect(result.isFailure).toBe(true);
    });

    it('should fail for uppercase category', () => {
      const result = SpaceCategory.create('GENERAL');
      expect(result.isFailure).toBe(true);
    });

    it('should fail for mixed case category', () => {
      const result = SpaceCategory.create('Study-Group');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('createGeneral()', () => {
    it('should create general category directly', () => {
      const result = SpaceCategory.createGeneral();
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.GENERAL);
    });
  });

  describe('createStudyGroup()', () => {
    it('should create study-group category directly', () => {
      const result = SpaceCategory.createStudyGroup();
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(SpaceCategoryEnum.STUDY_GROUP);
    });
  });

  describe('isAcademic()', () => {
    it('should return true for study-group', () => {
      const category = SpaceCategory.create('study-group').getValue();
      expect(category.isAcademic()).toBe(true);
    });

    it('should return true for academic', () => {
      const category = SpaceCategory.create('academic').getValue();
      expect(category.isAcademic()).toBe(true);
    });

    it('should return true for resource', () => {
      const category = SpaceCategory.create('resource').getValue();
      expect(category.isAcademic()).toBe(true);
    });

    it('should return false for social categories', () => {
      const categories = ['social', 'dorm', 'club', 'sports'];

      categories.forEach(cat => {
        const category = SpaceCategory.create(cat).getValue();
        expect(category.isAcademic()).toBe(false);
      });
    });

    it('should return false for general', () => {
      const category = SpaceCategory.create('general').getValue();
      expect(category.isAcademic()).toBe(false);
    });

    it('should return false for event', () => {
      const category = SpaceCategory.create('event').getValue();
      expect(category.isAcademic()).toBe(false);
    });
  });

  describe('isSocial()', () => {
    it('should return true for social', () => {
      const category = SpaceCategory.create('social').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should return true for dorm', () => {
      const category = SpaceCategory.create('dorm').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should return true for club', () => {
      const category = SpaceCategory.create('club').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should return true for sports', () => {
      const category = SpaceCategory.create('sports').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should return false for academic categories', () => {
      const categories = ['study-group', 'academic', 'resource'];

      categories.forEach(cat => {
        const category = SpaceCategory.create(cat).getValue();
        expect(category.isSocial()).toBe(false);
      });
    });

    it('should return false for general', () => {
      const category = SpaceCategory.create('general').getValue();
      expect(category.isSocial()).toBe(false);
    });
  });

  describe('equality', () => {
    it('should be equal when categories are the same', () => {
      const cat1 = SpaceCategory.create('study-group').getValue();
      const cat2 = SpaceCategory.create('study-group').getValue();

      expect(cat1.equals(cat2)).toBe(true);
    });

    it('should not be equal when categories differ', () => {
      const cat1 = SpaceCategory.create('study-group').getValue();
      const cat2 = SpaceCategory.create('social').getValue();

      expect(cat1.equals(cat2)).toBe(false);
    });

    it('should be equal when created via different methods', () => {
      const cat1 = SpaceCategory.create('general').getValue();
      const cat2 = SpaceCategory.createGeneral().getValue();

      expect(cat1.equals(cat2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the category value as string', () => {
      const category = SpaceCategory.create('study-group').getValue();
      expect(category.toString()).toBe('study-group');
    });

    it('should return lowercase string for all categories', () => {
      const categories = Object.values(SpaceCategoryEnum);

      categories.forEach(cat => {
        const category = SpaceCategory.create(cat).getValue();
        expect(category.toString()).toBe(cat);
      });
    });
  });

  describe('real-world examples', () => {
    it('should categorize CSE 116 study group as academic', () => {
      const category = SpaceCategory.createStudyGroup().getValue();
      expect(category.isAcademic()).toBe(true);
      expect(category.isSocial()).toBe(false);
    });

    it('should categorize UB ACM as club (social)', () => {
      const category = SpaceCategory.create('club').getValue();
      expect(category.isSocial()).toBe(true);
      expect(category.isAcademic()).toBe(false);
    });

    it('should categorize Ellicott Complex as dorm (social)', () => {
      const category = SpaceCategory.create('dorm').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should categorize basketball pickup as sports (social)', () => {
      const category = SpaceCategory.create('sports').getValue();
      expect(category.isSocial()).toBe(true);
    });

    it('should categorize textbook exchange as resource (academic)', () => {
      const category = SpaceCategory.create('resource').getValue();
      expect(category.isAcademic()).toBe(true);
    });

    it('should categorize career fair as event', () => {
      const category = SpaceCategory.create('event').getValue();
      expect(category.isAcademic()).toBe(false);
      expect(category.isSocial()).toBe(false);
    });
  });

  describe('all categories', () => {
    it('should accept all valid SpaceCategoryEnum values', () => {
      const categories = Object.values(SpaceCategoryEnum);

      categories.forEach(cat => {
        const result = SpaceCategory.create(cat);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should have 9 total categories', () => {
      const categories = Object.values(SpaceCategoryEnum);
      expect(categories.length).toBe(9);
    });
  });
});
