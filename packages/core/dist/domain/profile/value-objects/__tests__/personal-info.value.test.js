"use strict";
/**
 * PersonalInfo Value Object Tests
 * Tests for user personal information composite value object
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const personal_info_value_1 = require("../personal-info.value");
(0, vitest_1.describe)('PersonalInfo', () => {
    const validProps = {
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Computer Science student at UB',
        major: 'Computer Science',
        graduationYear: new Date().getFullYear() + 2,
        dorm: 'Governors'
    };
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid PersonalInfo with all fields', () => {
            const result = personal_info_value_1.PersonalInfo.create(validProps);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const info = result.getValue();
            (0, vitest_1.expect)(info.firstName).toBe('John');
            (0, vitest_1.expect)(info.lastName).toBe('Doe');
            (0, vitest_1.expect)(info.bio).toBe('Computer Science student at UB');
            (0, vitest_1.expect)(info.major).toBe('Computer Science');
            (0, vitest_1.expect)(info.graduationYear).toBe(validProps.graduationYear);
            (0, vitest_1.expect)(info.dorm).toBe('Governors');
        });
        (0, vitest_1.it)('should create valid PersonalInfo with null graduation year', () => {
            const props = { ...validProps, graduationYear: null };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().graduationYear).toBeNull();
        });
        (0, vitest_1.it)('should trim whitespace from string fields', () => {
            const props = {
                firstName: '  John  ',
                lastName: '  Doe  ',
                bio: '  Test bio  ',
                major: '  CS  ',
                graduationYear: null,
                dorm: '  Governors  '
            };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const info = result.getValue();
            (0, vitest_1.expect)(info.firstName).toBe('John');
            (0, vitest_1.expect)(info.lastName).toBe('Doe');
            (0, vitest_1.expect)(info.bio).toBe('Test bio');
            (0, vitest_1.expect)(info.major).toBe('CS');
            (0, vitest_1.expect)(info.dorm).toBe('Governors');
        });
        (0, vitest_1.it)('should fail when bio exceeds 500 characters', () => {
            const props = { ...validProps, bio: 'a'.repeat(501) };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Bio must be at most 500 characters');
        });
        (0, vitest_1.it)('should accept bio with exactly 500 characters', () => {
            const props = { ...validProps, bio: 'a'.repeat(500) };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept empty bio', () => {
            const props = { ...validProps, bio: '' };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().bio).toBe('');
        });
        (0, vitest_1.it)('should fail when graduation year is too early', () => {
            const props = { ...validProps, graduationYear: new Date().getFullYear() - 1 };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid graduation year');
        });
        (0, vitest_1.it)('should fail when graduation year is too far in future (> 6 years)', () => {
            const props = { ...validProps, graduationYear: new Date().getFullYear() + 7 };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid graduation year');
        });
        (0, vitest_1.it)('should accept graduation year at minimum boundary (current year)', () => {
            const props = { ...validProps, graduationYear: new Date().getFullYear() };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept graduation year at maximum boundary (+6 years)', () => {
            const props = { ...validProps, graduationYear: new Date().getFullYear() + 6 };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept empty string fields', () => {
            const props = {
                firstName: '',
                lastName: '',
                bio: '',
                major: '',
                graduationYear: null,
                dorm: ''
            };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('fullName getter', () => {
        (0, vitest_1.it)('should return combined first and last name', () => {
            const info = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            (0, vitest_1.expect)(info.fullName).toBe('John Doe');
        });
        (0, vitest_1.it)('should handle first name only', () => {
            const props = { ...validProps, lastName: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.fullName).toBe('John');
        });
        (0, vitest_1.it)('should handle last name only', () => {
            const props = { ...validProps, firstName: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.fullName).toBe('Doe');
        });
        (0, vitest_1.it)('should return empty string when both names are empty', () => {
            const props = { ...validProps, firstName: '', lastName: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.fullName).toBe('');
        });
    });
    (0, vitest_1.describe)('isComplete()', () => {
        (0, vitest_1.it)('should return true when all required fields are present', () => {
            const info = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(true);
        });
        (0, vitest_1.it)('should return false when firstName is missing', () => {
            const props = { ...validProps, firstName: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(false);
        });
        (0, vitest_1.it)('should return false when lastName is missing', () => {
            const props = { ...validProps, lastName: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(false);
        });
        (0, vitest_1.it)('should return false when major is missing', () => {
            const props = { ...validProps, major: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(false);
        });
        (0, vitest_1.it)('should return false when graduationYear is null', () => {
            const props = { ...validProps, graduationYear: null };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(false);
        });
        (0, vitest_1.it)('should not require bio for completeness', () => {
            const props = { ...validProps, bio: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(true);
        });
        (0, vitest_1.it)('should not require dorm for completeness', () => {
            const props = { ...validProps, dorm: '' };
            const info = personal_info_value_1.PersonalInfo.create(props).getValue();
            (0, vitest_1.expect)(info.isComplete()).toBe(true);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when all props are the same', () => {
            const info1 = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            const info2 = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            (0, vitest_1.expect)(info1.equals(info2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when firstName differs', () => {
            const info1 = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            const info2 = personal_info_value_1.PersonalInfo.create({ ...validProps, firstName: 'Jane' }).getValue();
            (0, vitest_1.expect)(info1.equals(info2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when graduationYear differs', () => {
            const info1 = personal_info_value_1.PersonalInfo.create(validProps).getValue();
            const info2 = personal_info_value_1.PersonalInfo.create({
                ...validProps,
                graduationYear: validProps.graduationYear + 1
            }).getValue();
            (0, vitest_1.expect)(info1.equals(info2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should create complete freshman profile', () => {
            const props = {
                firstName: 'Alex',
                lastName: 'Johnson',
                bio: 'Freshman studying Computer Science. Love coding and basketball!',
                major: 'Computer Science',
                graduationYear: new Date().getFullYear() + 4,
                dorm: 'Ellicott Complex'
            };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().isComplete()).toBe(true);
        });
        (0, vitest_1.it)('should create partial senior profile', () => {
            const props = {
                firstName: 'Sarah',
                lastName: 'Williams',
                bio: '',
                major: 'Engineering',
                graduationYear: new Date().getFullYear(),
                dorm: ''
            };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().isComplete()).toBe(true);
        });
        (0, vitest_1.it)('should handle long realistic bio', () => {
            const props = {
                ...validProps,
                bio: 'Senior studying Computer Science with a minor in Mathematics. ' +
                    'Currently working as a TA for CSE 116. Interested in machine learning ' +
                    'and software engineering. Member of UB ACM and HackBU organizing team. ' +
                    'Looking for full-time opportunities in tech after graduation.'
            };
            const result = personal_info_value_1.PersonalInfo.create(props);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=personal-info.value.test.js.map