"use strict";
/**
 * UserType Value Object Tests
 * Tests for user type classification (student, alumni, faculty, etc.)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const user_type_value_1 = require("../user-type.value");
(0, vitest_1.describe)('UserType', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid UserType for student', () => {
            const result = user_type_value_1.UserType.create('student');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const userType = result.getValue();
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.STUDENT);
            (0, vitest_1.expect)(userType.isStudent()).toBe(true);
        });
        (0, vitest_1.it)('should create valid UserType for alumni', () => {
            const result = user_type_value_1.UserType.create('alumni');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const userType = result.getValue();
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.ALUMNI);
            (0, vitest_1.expect)(userType.isAlumni()).toBe(true);
        });
        (0, vitest_1.it)('should create valid UserType for faculty', () => {
            const result = user_type_value_1.UserType.create('faculty');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(user_type_value_1.UserTypeEnum.FACULTY);
        });
        (0, vitest_1.it)('should create valid UserType for staff', () => {
            const result = user_type_value_1.UserType.create('staff');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(user_type_value_1.UserTypeEnum.STAFF);
        });
        (0, vitest_1.it)('should create valid UserType for prospective', () => {
            const result = user_type_value_1.UserType.create('prospective');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(user_type_value_1.UserTypeEnum.PROSPECTIVE);
        });
        (0, vitest_1.it)('should fail for invalid user type', () => {
            const result = user_type_value_1.UserType.create('invalid');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid user type');
        });
        (0, vitest_1.it)('should fail for empty string', () => {
            const result = user_type_value_1.UserType.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid user type');
        });
        (0, vitest_1.it)('should fail for uppercase types', () => {
            const result = user_type_value_1.UserType.create('STUDENT');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail for mixed case types', () => {
            const result = user_type_value_1.UserType.create('Student');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
    (0, vitest_1.describe)('createStudent()', () => {
        (0, vitest_1.it)('should create student type directly', () => {
            const result = user_type_value_1.UserType.createStudent();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const userType = result.getValue();
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.STUDENT);
            (0, vitest_1.expect)(userType.isStudent()).toBe(true);
        });
        (0, vitest_1.it)('should create student type without validation errors', () => {
            const result = user_type_value_1.UserType.createStudent();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.isFailure).toBe(false);
        });
    });
    (0, vitest_1.describe)('isStudent()', () => {
        (0, vitest_1.it)('should return true for student type', () => {
            const userType = user_type_value_1.UserType.create('student').getValue();
            (0, vitest_1.expect)(userType.isStudent()).toBe(true);
            (0, vitest_1.expect)(userType.isAlumni()).toBe(false);
        });
        (0, vitest_1.it)('should return false for non-student types', () => {
            const types = ['alumni', 'faculty', 'staff', 'prospective'];
            types.forEach(type => {
                const userType = user_type_value_1.UserType.create(type).getValue();
                (0, vitest_1.expect)(userType.isStudent()).toBe(false);
            });
        });
    });
    (0, vitest_1.describe)('isAlumni()', () => {
        (0, vitest_1.it)('should return true for alumni type', () => {
            const userType = user_type_value_1.UserType.create('alumni').getValue();
            (0, vitest_1.expect)(userType.isAlumni()).toBe(true);
            (0, vitest_1.expect)(userType.isStudent()).toBe(false);
        });
        (0, vitest_1.it)('should return false for non-alumni types', () => {
            const types = ['student', 'faculty', 'staff', 'prospective'];
            types.forEach(type => {
                const userType = user_type_value_1.UserType.create(type).getValue();
                (0, vitest_1.expect)(userType.isAlumni()).toBe(false);
            });
        });
    });
    (0, vitest_1.describe)('static constants', () => {
        (0, vitest_1.it)('should provide STUDENT constant', () => {
            (0, vitest_1.expect)(user_type_value_1.UserType.STUDENT).toBe(user_type_value_1.UserTypeEnum.STUDENT);
        });
        (0, vitest_1.it)('should provide ALUMNI constant', () => {
            (0, vitest_1.expect)(user_type_value_1.UserType.ALUMNI).toBe(user_type_value_1.UserTypeEnum.ALUMNI);
        });
        (0, vitest_1.it)('should provide FACULTY constant', () => {
            (0, vitest_1.expect)(user_type_value_1.UserType.FACULTY).toBe(user_type_value_1.UserTypeEnum.FACULTY);
        });
        (0, vitest_1.it)('should provide STAFF constant', () => {
            (0, vitest_1.expect)(user_type_value_1.UserType.STAFF).toBe(user_type_value_1.UserTypeEnum.STAFF);
        });
        (0, vitest_1.it)('should provide PROSPECTIVE constant', () => {
            (0, vitest_1.expect)(user_type_value_1.UserType.PROSPECTIVE).toBe(user_type_value_1.UserTypeEnum.PROSPECTIVE);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when types are the same', () => {
            const type1 = user_type_value_1.UserType.create('student').getValue();
            const type2 = user_type_value_1.UserType.create('student').getValue();
            (0, vitest_1.expect)(type1.equals(type2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when types differ', () => {
            const type1 = user_type_value_1.UserType.create('student').getValue();
            const type2 = user_type_value_1.UserType.create('alumni').getValue();
            (0, vitest_1.expect)(type1.equals(type2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal when created with create() and createStudent()', () => {
            const type1 = user_type_value_1.UserType.create('student').getValue();
            const type2 = user_type_value_1.UserType.createStudent().getValue();
            (0, vitest_1.expect)(type1.equals(type2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the user type value as string', () => {
            const userType = user_type_value_1.UserType.create('student').getValue();
            (0, vitest_1.expect)(userType.toString()).toBe('student');
        });
        (0, vitest_1.it)('should return lowercase string for all types', () => {
            const types = ['student', 'alumni', 'faculty', 'staff', 'prospective'];
            types.forEach(type => {
                const userType = user_type_value_1.UserType.create(type).getValue();
                (0, vitest_1.expect)(userType.toString()).toBe(type);
            });
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should correctly classify UB student', () => {
            const userType = user_type_value_1.UserType.createStudent().getValue();
            (0, vitest_1.expect)(userType.isStudent()).toBe(true);
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.STUDENT);
        });
        (0, vitest_1.it)('should correctly classify UB alumni', () => {
            const userType = user_type_value_1.UserType.create('alumni').getValue();
            (0, vitest_1.expect)(userType.isAlumni()).toBe(true);
        });
        (0, vitest_1.it)('should handle faculty member', () => {
            const userType = user_type_value_1.UserType.create('faculty').getValue();
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.FACULTY);
            (0, vitest_1.expect)(userType.isStudent()).toBe(false);
            (0, vitest_1.expect)(userType.isAlumni()).toBe(false);
        });
        (0, vitest_1.it)('should handle prospective student', () => {
            const userType = user_type_value_1.UserType.create('prospective').getValue();
            (0, vitest_1.expect)(userType.value).toBe(user_type_value_1.UserTypeEnum.PROSPECTIVE);
        });
    });
});
//# sourceMappingURL=user-type.value.test.js.map