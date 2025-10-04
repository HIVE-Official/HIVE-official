"use strict";
/**
 * UBEmail Value Object Tests
 * Tests for University at Buffalo email validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ub_email_value_1 = require("../ub-email.value");
(0, vitest_1.describe)('UBEmail', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid @buffalo.edu email', () => {
            const result = ub_email_value_1.UBEmail.create('student@buffalo.edu');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const email = result.getValue();
            (0, vitest_1.expect)(email.value).toBe('student@buffalo.edu');
            (0, vitest_1.expect)(email.email).toBe('student@buffalo.edu');
        });
        (0, vitest_1.it)('should normalize email to lowercase', () => {
            const result = ub_email_value_1.UBEmail.create('Student@Buffalo.EDU');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('student@buffalo.edu');
        });
        (0, vitest_1.it)('should extract username from email', () => {
            const email = ub_email_value_1.UBEmail.create('johndoe@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.username).toBe('johndoe');
        });
        (0, vitest_1.it)('should fail when email is not @buffalo.edu', () => {
            const result = ub_email_value_1.UBEmail.create('student@gmail.com');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('@buffalo.edu');
        });
        (0, vitest_1.it)('should fail when email is not from buffalo.edu domain', () => {
            const result = ub_email_value_1.UBEmail.create('student@suny.buffalo.edu');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when email format is invalid', () => {
            const result = ub_email_value_1.UBEmail.create('notanemail');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when email is empty', () => {
            const result = ub_email_value_1.UBEmail.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should fail when email is whitespace only', () => {
            const result = ub_email_value_1.UBEmail.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should trim whitespace from email', () => {
            const result = ub_email_value_1.UBEmail.create('  student@buffalo.edu  ');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('student@buffalo.edu');
        });
        (0, vitest_1.it)('should fail when username is missing', () => {
            const result = ub_email_value_1.UBEmail.create('@buffalo.edu');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
        });
        (0, vitest_1.it)('should accept valid username formats', () => {
            const validEmails = [
                'john.doe@buffalo.edu',
                'jane_doe@buffalo.edu',
                'student123@buffalo.edu',
                'test-user@buffalo.edu',
                'a@buffalo.edu'
            ];
            validEmails.forEach(email => {
                const result = ub_email_value_1.UBEmail.create(email);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when emails are the same', () => {
            const email1 = ub_email_value_1.UBEmail.create('student@buffalo.edu').getValue();
            const email2 = ub_email_value_1.UBEmail.create('student@buffalo.edu').getValue();
            (0, vitest_1.expect)(email1.equals(email2)).toBe(true);
        });
        (0, vitest_1.it)('should be equal when case differs (normalized)', () => {
            const email1 = ub_email_value_1.UBEmail.create('student@buffalo.edu').getValue();
            const email2 = ub_email_value_1.UBEmail.create('STUDENT@BUFFALO.EDU').getValue();
            (0, vitest_1.expect)(email1.equals(email2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when emails differ', () => {
            const email1 = ub_email_value_1.UBEmail.create('student1@buffalo.edu').getValue();
            const email2 = ub_email_value_1.UBEmail.create('student2@buffalo.edu').getValue();
            (0, vitest_1.expect)(email1.equals(email2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the email value as string', () => {
            const email = ub_email_value_1.UBEmail.create('test@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.toString()).toBe('test@buffalo.edu');
        });
    });
    (0, vitest_1.describe)('username extraction', () => {
        (0, vitest_1.it)('should extract simple username', () => {
            const email = ub_email_value_1.UBEmail.create('johndoe@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.username).toBe('johndoe');
        });
        (0, vitest_1.it)('should extract username with dots', () => {
            const email = ub_email_value_1.UBEmail.create('john.doe@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.username).toBe('john.doe');
        });
        (0, vitest_1.it)('should extract username with underscores', () => {
            const email = ub_email_value_1.UBEmail.create('john_doe@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.username).toBe('john_doe');
        });
        (0, vitest_1.it)('should extract username with numbers', () => {
            const email = ub_email_value_1.UBEmail.create('student123@buffalo.edu').getValue();
            (0, vitest_1.expect)(email.username).toBe('student123');
        });
    });
    (0, vitest_1.describe)('real-world examples', () => {
        (0, vitest_1.it)('should accept typical UB student emails', () => {
            const emails = [
                'jwrhineh@buffalo.edu',
                'noahowsh@buffalo.edu',
                'student2024@buffalo.edu',
                'john.smith@buffalo.edu'
            ];
            emails.forEach(email => {
                const result = ub_email_value_1.UBEmail.create(email);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should reject non-UB emails', () => {
            const emails = [
                'student@gmail.com',
                'user@yahoo.com',
                'test@outlook.com',
                'admin@buffalo.com', // Wrong TLD
                'student@ub.edu' // Wrong domain
            ];
            emails.forEach(email => {
                const result = ub_email_value_1.UBEmail.create(email);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=ub-email.value.test.js.map