/**
 * UserType Value Object Tests
 * Tests for user type classification (student, alumni, faculty, etc.)
 */

import { describe, it, expect } from 'vitest';
import { UserType, UserTypeEnum } from '../user-type.value';

describe('UserType', () => {
  describe('create()', () => {
    it('should create valid UserType for student', () => {
      const result = UserType.create('student');
      expect(result.isSuccess).toBe(true);

      const userType = result.getValue();
      expect(userType.value).toBe(UserTypeEnum.STUDENT);
      expect(userType.isStudent()).toBe(true);
    });

    it('should create valid UserType for alumni', () => {
      const result = UserType.create('alumni');
      expect(result.isSuccess).toBe(true);

      const userType = result.getValue();
      expect(userType.value).toBe(UserTypeEnum.ALUMNI);
      expect(userType.isAlumni()).toBe(true);
    });

    it('should create valid UserType for faculty', () => {
      const result = UserType.create('faculty');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(UserTypeEnum.FACULTY);
    });

    it('should create valid UserType for staff', () => {
      const result = UserType.create('staff');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(UserTypeEnum.STAFF);
    });

    it('should create valid UserType for prospective', () => {
      const result = UserType.create('prospective');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(UserTypeEnum.PROSPECTIVE);
    });

    it('should fail for invalid user type', () => {
      const result = UserType.create('invalid');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid user type');
    });

    it('should fail for empty string', () => {
      const result = UserType.create('');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid user type');
    });

    it('should fail for uppercase types', () => {
      const result = UserType.create('STUDENT');
      expect(result.isFailure).toBe(true);
    });

    it('should fail for mixed case types', () => {
      const result = UserType.create('Student');
      expect(result.isFailure).toBe(true);
    });
  });

  describe('createStudent()', () => {
    it('should create student type directly', () => {
      const result = UserType.createStudent();
      expect(result.isSuccess).toBe(true);

      const userType = result.getValue();
      expect(userType.value).toBe(UserTypeEnum.STUDENT);
      expect(userType.isStudent()).toBe(true);
    });

    it('should create student type without validation errors', () => {
      const result = UserType.createStudent();
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
    });
  });

  describe('isStudent()', () => {
    it('should return true for student type', () => {
      const userType = UserType.create('student').getValue();
      expect(userType.isStudent()).toBe(true);
      expect(userType.isAlumni()).toBe(false);
    });

    it('should return false for non-student types', () => {
      const types = ['alumni', 'faculty', 'staff', 'prospective'];

      types.forEach(type => {
        const userType = UserType.create(type).getValue();
        expect(userType.isStudent()).toBe(false);
      });
    });
  });

  describe('isAlumni()', () => {
    it('should return true for alumni type', () => {
      const userType = UserType.create('alumni').getValue();
      expect(userType.isAlumni()).toBe(true);
      expect(userType.isStudent()).toBe(false);
    });

    it('should return false for non-alumni types', () => {
      const types = ['student', 'faculty', 'staff', 'prospective'];

      types.forEach(type => {
        const userType = UserType.create(type).getValue();
        expect(userType.isAlumni()).toBe(false);
      });
    });
  });

  describe('static constants', () => {
    it('should provide STUDENT constant', () => {
      expect(UserType.STUDENT).toBe(UserTypeEnum.STUDENT);
    });

    it('should provide ALUMNI constant', () => {
      expect(UserType.ALUMNI).toBe(UserTypeEnum.ALUMNI);
    });

    it('should provide FACULTY constant', () => {
      expect(UserType.FACULTY).toBe(UserTypeEnum.FACULTY);
    });

    it('should provide STAFF constant', () => {
      expect(UserType.STAFF).toBe(UserTypeEnum.STAFF);
    });

    it('should provide PROSPECTIVE constant', () => {
      expect(UserType.PROSPECTIVE).toBe(UserTypeEnum.PROSPECTIVE);
    });
  });

  describe('equality', () => {
    it('should be equal when types are the same', () => {
      const type1 = UserType.create('student').getValue();
      const type2 = UserType.create('student').getValue();

      expect(type1.equals(type2)).toBe(true);
    });

    it('should not be equal when types differ', () => {
      const type1 = UserType.create('student').getValue();
      const type2 = UserType.create('alumni').getValue();

      expect(type1.equals(type2)).toBe(false);
    });

    it('should be equal when created with create() and createStudent()', () => {
      const type1 = UserType.create('student').getValue();
      const type2 = UserType.createStudent().getValue();

      expect(type1.equals(type2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the user type value as string', () => {
      const userType = UserType.create('student').getValue();
      expect(userType.toString()).toBe('student');
    });

    it('should return lowercase string for all types', () => {
      const types = ['student', 'alumni', 'faculty', 'staff', 'prospective'];

      types.forEach(type => {
        const userType = UserType.create(type).getValue();
        expect(userType.toString()).toBe(type);
      });
    });
  });

  describe('real-world usage', () => {
    it('should correctly classify UB student', () => {
      const userType = UserType.createStudent().getValue();
      expect(userType.isStudent()).toBe(true);
      expect(userType.value).toBe(UserTypeEnum.STUDENT);
    });

    it('should correctly classify UB alumni', () => {
      const userType = UserType.create('alumni').getValue();
      expect(userType.isAlumni()).toBe(true);
    });

    it('should handle faculty member', () => {
      const userType = UserType.create('faculty').getValue();
      expect(userType.value).toBe(UserTypeEnum.FACULTY);
      expect(userType.isStudent()).toBe(false);
      expect(userType.isAlumni()).toBe(false);
    });

    it('should handle prospective student', () => {
      const userType = UserType.create('prospective').getValue();
      expect(userType.value).toBe(UserTypeEnum.PROSPECTIVE);
    });
  });
});
