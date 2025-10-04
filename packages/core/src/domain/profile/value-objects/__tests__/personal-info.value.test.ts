/**
 * PersonalInfo Value Object Tests
 * Tests for user personal information composite value object
 */

import { describe, it, expect } from 'vitest';
import { PersonalInfo } from '../personal-info.value';

describe('PersonalInfo', () => {
  const validProps = {
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Computer Science student at UB',
    major: 'Computer Science',
    graduationYear: new Date().getFullYear() + 2,
    dorm: 'Governors'
  };

  describe('create()', () => {
    it('should create valid PersonalInfo with all fields', () => {
      const result = PersonalInfo.create(validProps);
      expect(result.isSuccess).toBe(true);

      const info = result.getValue();
      expect(info.firstName).toBe('John');
      expect(info.lastName).toBe('Doe');
      expect(info.bio).toBe('Computer Science student at UB');
      expect(info.major).toBe('Computer Science');
      expect(info.graduationYear).toBe(validProps.graduationYear);
      expect(info.dorm).toBe('Governors');
    });

    it('should create valid PersonalInfo with null graduation year', () => {
      const props = { ...validProps, graduationYear: null };
      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().graduationYear).toBeNull();
    });

    it('should trim whitespace from string fields', () => {
      const props = {
        firstName: '  John  ',
        lastName: '  Doe  ',
        bio: '  Test bio  ',
        major: '  CS  ',
        graduationYear: null,
        dorm: '  Governors  '
      };

      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);

      const info = result.getValue();
      expect(info.firstName).toBe('John');
      expect(info.lastName).toBe('Doe');
      expect(info.bio).toBe('Test bio');
      expect(info.major).toBe('CS');
      expect(info.dorm).toBe('Governors');
    });

    it('should fail when bio exceeds 500 characters', () => {
      const props = { ...validProps, bio: 'a'.repeat(501) };
      const result = PersonalInfo.create(props);
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Bio must be at most 500 characters');
    });

    it('should accept bio with exactly 500 characters', () => {
      const props = { ...validProps, bio: 'a'.repeat(500) };
      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
    });

    it('should accept empty bio', () => {
      const props = { ...validProps, bio: '' };
      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().bio).toBe('');
    });

    it('should fail when graduation year is too early', () => {
      const props = { ...validProps, graduationYear: new Date().getFullYear() - 1 };
      const result = PersonalInfo.create(props);
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid graduation year');
    });

    it('should fail when graduation year is too far in future (> 6 years)', () => {
      const props = { ...validProps, graduationYear: new Date().getFullYear() + 7 };
      const result = PersonalInfo.create(props);
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid graduation year');
    });

    it('should accept graduation year at minimum boundary (current year)', () => {
      const props = { ...validProps, graduationYear: new Date().getFullYear() };
      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
    });

    it('should accept graduation year at maximum boundary (+6 years)', () => {
      const props = { ...validProps, graduationYear: new Date().getFullYear() + 6 };
      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
    });

    it('should accept empty string fields', () => {
      const props = {
        firstName: '',
        lastName: '',
        bio: '',
        major: '',
        graduationYear: null,
        dorm: ''
      };

      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('fullName getter', () => {
    it('should return combined first and last name', () => {
      const info = PersonalInfo.create(validProps).getValue();
      expect(info.fullName).toBe('John Doe');
    });

    it('should handle first name only', () => {
      const props = { ...validProps, lastName: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.fullName).toBe('John');
    });

    it('should handle last name only', () => {
      const props = { ...validProps, firstName: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.fullName).toBe('Doe');
    });

    it('should return empty string when both names are empty', () => {
      const props = { ...validProps, firstName: '', lastName: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.fullName).toBe('');
    });
  });

  describe('isComplete()', () => {
    it('should return true when all required fields are present', () => {
      const info = PersonalInfo.create(validProps).getValue();
      expect(info.isComplete()).toBe(true);
    });

    it('should return false when firstName is missing', () => {
      const props = { ...validProps, firstName: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(false);
    });

    it('should return false when lastName is missing', () => {
      const props = { ...validProps, lastName: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(false);
    });

    it('should return false when major is missing', () => {
      const props = { ...validProps, major: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(false);
    });

    it('should return false when graduationYear is null', () => {
      const props = { ...validProps, graduationYear: null };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(false);
    });

    it('should not require bio for completeness', () => {
      const props = { ...validProps, bio: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(true);
    });

    it('should not require dorm for completeness', () => {
      const props = { ...validProps, dorm: '' };
      const info = PersonalInfo.create(props).getValue();
      expect(info.isComplete()).toBe(true);
    });
  });

  describe('equality', () => {
    it('should be equal when all props are the same', () => {
      const info1 = PersonalInfo.create(validProps).getValue();
      const info2 = PersonalInfo.create(validProps).getValue();

      expect(info1.equals(info2)).toBe(true);
    });

    it('should not be equal when firstName differs', () => {
      const info1 = PersonalInfo.create(validProps).getValue();
      const info2 = PersonalInfo.create({ ...validProps, firstName: 'Jane' }).getValue();

      expect(info1.equals(info2)).toBe(false);
    });

    it('should not be equal when graduationYear differs', () => {
      const info1 = PersonalInfo.create(validProps).getValue();
      const info2 = PersonalInfo.create({
        ...validProps,
        graduationYear: validProps.graduationYear! + 1
      }).getValue();

      expect(info1.equals(info2)).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should create complete freshman profile', () => {
      const props = {
        firstName: 'Alex',
        lastName: 'Johnson',
        bio: 'Freshman studying Computer Science. Love coding and basketball!',
        major: 'Computer Science',
        graduationYear: new Date().getFullYear() + 4,
        dorm: 'Ellicott Complex'
      };

      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().isComplete()).toBe(true);
    });

    it('should create partial senior profile', () => {
      const props = {
        firstName: 'Sarah',
        lastName: 'Williams',
        bio: '',
        major: 'Engineering',
        graduationYear: new Date().getFullYear(),
        dorm: ''
      };

      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().isComplete()).toBe(true);
    });

    it('should handle long realistic bio', () => {
      const props = {
        ...validProps,
        bio: 'Senior studying Computer Science with a minor in Mathematics. ' +
             'Currently working as a TA for CSE 116. Interested in machine learning ' +
             'and software engineering. Member of UB ACM and HackBU organizing team. ' +
             'Looking for full-time opportunities in tech after graduation.'
      };

      const result = PersonalInfo.create(props);
      expect(result.isSuccess).toBe(true);
    });
  });
});
