"use strict";
/**
 * SpaceName Value Object Tests
 * Tests for space name validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_name_value_1 = require("../space-name.value");
(0, vitest_1.describe)('SpaceName', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid space name', () => {
            const result = space_name_value_1.SpaceName.create('UB ACM Chapter');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const name = result.getValue();
            (0, vitest_1.expect)(name.value).toBe('UB ACM Chapter');
            (0, vitest_1.expect)(name.name).toBe('UB ACM Chapter');
        });
        (0, vitest_1.it)('should trim whitespace from name', () => {
            const result = space_name_value_1.SpaceName.create('  Study Group  ');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('Study Group');
        });
        (0, vitest_1.it)('should fail when name is too short (< 3 chars)', () => {
            const result = space_name_value_1.SpaceName.create('AB');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('at least 3 characters');
        });
        (0, vitest_1.it)('should fail when name is too long (> 50 chars)', () => {
            const result = space_name_value_1.SpaceName.create('a'.repeat(51));
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('no more than 50 characters');
        });
        (0, vitest_1.it)('should accept name with exactly 3 characters', () => {
            const result = space_name_value_1.SpaceName.create('ACM');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('ACM');
        });
        (0, vitest_1.it)('should accept name with exactly 50 characters', () => {
            const name = 'a'.repeat(50);
            const result = space_name_value_1.SpaceName.create(name);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(name);
        });
        (0, vitest_1.it)('should fail when trimmed name is too short', () => {
            const result = space_name_value_1.SpaceName.create('  a  ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('at least 3 characters');
        });
        (0, vitest_1.it)('should fail when name is empty', () => {
            const result = space_name_value_1.SpaceName.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when name is whitespace only', () => {
            const result = space_name_value_1.SpaceName.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should accept names with special characters', () => {
            const result = space_name_value_1.SpaceName.create('Study Group: CSE 116');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept names with numbers', () => {
            const result = space_name_value_1.SpaceName.create('CSE 116 Study Group');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept names with emojis', () => {
            const result = space_name_value_1.SpaceName.create('Basketball 🏀 Pickup');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when names are the same', () => {
            const name1 = space_name_value_1.SpaceName.create('Study Group').getValue();
            const name2 = space_name_value_1.SpaceName.create('Study Group').getValue();
            (0, vitest_1.expect)(name1.equals(name2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when names differ', () => {
            const name1 = space_name_value_1.SpaceName.create('Study Group').getValue();
            const name2 = space_name_value_1.SpaceName.create('Social Club').getValue();
            (0, vitest_1.expect)(name1.equals(name2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal after trimming whitespace', () => {
            const name1 = space_name_value_1.SpaceName.create('  Study Group  ').getValue();
            const name2 = space_name_value_1.SpaceName.create('Study Group').getValue();
            (0, vitest_1.expect)(name1.equals(name2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the name value as string', () => {
            const name = space_name_value_1.SpaceName.create('Test Space').getValue();
            (0, vitest_1.expect)(name.toString()).toBe('Test Space');
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should accept typical UB space names', () => {
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
                const result = space_name_value_1.SpaceName.create(name);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should reject invalid space names', () => {
            const names = [
                'AB', // Too short
                'a'.repeat(51), // Too long
                '', // Empty
                '  ' // Whitespace only
            ];
            names.forEach(name => {
                const result = space_name_value_1.SpaceName.create(name);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
            });
        });
        (0, vitest_1.it)('should accept space names with various formats', () => {
            const names = [
                'UB ACM: Buffalo Chapter',
                'Study Group (CSE 116)',
                'Basketball @ Alumni Arena',
                'Co-op & Internship Prep',
                'Math Help 24/7'
            ];
            names.forEach(name => {
                const result = space_name_value_1.SpaceName.create(name);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
    });
    (0, vitest_1.describe)('boundary conditions', () => {
        (0, vitest_1.it)('should fail with 2 characters', () => {
            const result = space_name_value_1.SpaceName.create('AB');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should succeed with 3 characters', () => {
            const result = space_name_value_1.SpaceName.create('ACM');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should succeed with 50 characters', () => {
            const result = space_name_value_1.SpaceName.create('a'.repeat(50));
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should fail with 51 characters', () => {
            const result = space_name_value_1.SpaceName.create('a'.repeat(51));
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
    });
});
//# sourceMappingURL=space-name.value.test.js.map