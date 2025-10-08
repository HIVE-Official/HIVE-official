"use strict";
/**
 * SpaceDescription Value Object Tests
 * Tests for space description validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_description_value_1 = require("../space-description.value");
(0, vitest_1.describe)('SpaceDescription', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid space description', () => {
            const text = 'A study group for CSE 116 students to collaborate and help each other.';
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const description = result.getValue();
            (0, vitest_1.expect)(description.value).toBe(text);
        });
        (0, vitest_1.it)('should trim whitespace from description', () => {
            const result = space_description_value_1.SpaceDescription.create('  Test description  ');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('Test description');
        });
        (0, vitest_1.it)('should accept empty description', () => {
            const result = space_description_value_1.SpaceDescription.create('');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('');
        });
        (0, vitest_1.it)('should accept whitespace-only description (trims to empty)', () => {
            const result = space_description_value_1.SpaceDescription.create('   ');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('');
        });
        (0, vitest_1.it)('should fail when description exceeds 500 characters', () => {
            const result = space_description_value_1.SpaceDescription.create('a'.repeat(501));
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('no more than 500 characters');
        });
        (0, vitest_1.it)('should accept description with exactly 500 characters', () => {
            const text = 'a'.repeat(500);
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(text);
        });
        (0, vitest_1.it)('should accept multi-line descriptions', () => {
            const text = 'Line 1\nLine 2\nLine 3';
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(text);
        });
        (0, vitest_1.it)('should accept descriptions with special characters', () => {
            const text = 'Meet @ Alumni Arena! 🏀 Everyone welcome :)';
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(text);
        });
        (0, vitest_1.it)('should accept descriptions with URLs', () => {
            const text = 'Join us at https://ub.edu/acm for more info';
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should accept descriptions with markdown-style formatting', () => {
            const text = '**Welcome** to our space! Visit our *website* for more info.';
            const result = space_description_value_1.SpaceDescription.create(text);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('createEmpty()', () => {
        (0, vitest_1.it)('should create empty description', () => {
            const result = space_description_value_1.SpaceDescription.createEmpty();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const description = result.getValue();
            (0, vitest_1.expect)(description.value).toBe('');
        });
        (0, vitest_1.it)('should be equal to create("") result', () => {
            const empty1 = space_description_value_1.SpaceDescription.createEmpty().getValue();
            const empty2 = space_description_value_1.SpaceDescription.create('').getValue();
            (0, vitest_1.expect)(empty1.equals(empty2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when descriptions are the same', () => {
            const desc1 = space_description_value_1.SpaceDescription.create('Test description').getValue();
            const desc2 = space_description_value_1.SpaceDescription.create('Test description').getValue();
            (0, vitest_1.expect)(desc1.equals(desc2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when descriptions differ', () => {
            const desc1 = space_description_value_1.SpaceDescription.create('Description 1').getValue();
            const desc2 = space_description_value_1.SpaceDescription.create('Description 2').getValue();
            (0, vitest_1.expect)(desc1.equals(desc2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal after trimming whitespace', () => {
            const desc1 = space_description_value_1.SpaceDescription.create('  Test  ').getValue();
            const desc2 = space_description_value_1.SpaceDescription.create('Test').getValue();
            (0, vitest_1.expect)(desc1.equals(desc2)).toBe(true);
        });
        (0, vitest_1.it)('should be equal when both are empty', () => {
            const desc1 = space_description_value_1.SpaceDescription.createEmpty().getValue();
            const desc2 = space_description_value_1.SpaceDescription.create('').getValue();
            (0, vitest_1.expect)(desc1.equals(desc2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the description value as string', () => {
            const description = space_description_value_1.SpaceDescription.create('Test description').getValue();
            (0, vitest_1.expect)(description.toString()).toBe('Test description');
        });
        (0, vitest_1.it)('should return empty string for empty description', () => {
            const description = space_description_value_1.SpaceDescription.createEmpty().getValue();
            (0, vitest_1.expect)(description.toString()).toBe('');
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should accept typical space descriptions', () => {
            const descriptions = [
                'Weekly study sessions for CSE 116. Bring your laptop and questions!',
                'Join us for pickup basketball games every Tuesday and Thursday at 7pm.',
                'A community for Ellicott residents to connect and share events.',
                'Pre-Med students helping each other prepare for the MCAT.',
                ''
            ];
            descriptions.forEach(desc => {
                const result = space_description_value_1.SpaceDescription.create(desc);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should accept long detailed description', () => {
            const description = 'Welcome to the UB ACM student chapter! We host weekly meetings every ' +
                'Wednesday at 6pm in Davis Hall. Topics include coding challenges, ' +
                'tech talks, career prep, and networking events. All skill levels welcome. ' +
                'Join our Discord for updates and discussion. Looking forward to seeing you there!';
            const result = space_description_value_1.SpaceDescription.create(description);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value.length).toBeLessThanOrEqual(500);
        });
        (0, vitest_1.it)('should reject excessively long description', () => {
            const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
            const result = space_description_value_1.SpaceDescription.create(longDescription);
            if (longDescription.length > 500) {
                (0, vitest_1.expect)(result.isFailure).toBe(true);
            }
            else {
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            }
        });
        (0, vitest_1.it)('should handle description with formatting', () => {
            const description = `
📚 Study Group for CSE 116

When: Tuesdays & Thursdays, 7-9pm
Where: Capen Hall, 3rd floor

Topics:
- OOP concepts
- Data structures
- Exam prep

All welcome! Bring your laptop 💻
      `.trim();
            const result = space_description_value_1.SpaceDescription.create(description);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
    (0, vitest_1.describe)('boundary conditions', () => {
        (0, vitest_1.it)('should succeed with exactly 500 characters', () => {
            const result = space_description_value_1.SpaceDescription.create('a'.repeat(500));
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should fail with exactly 501 characters', () => {
            const result = space_description_value_1.SpaceDescription.create('a'.repeat(501));
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should succeed with 0 characters (empty)', () => {
            const result = space_description_value_1.SpaceDescription.create('');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should succeed with 1 character', () => {
            const result = space_description_value_1.SpaceDescription.create('a');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=space-description.value.test.js.map