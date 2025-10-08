/**
 * UBEmail Value Object Tests
 * Tests for University at Buffalo email validation
 */

import { describe, it, expect } from 'vitest';
import { UBEmail } from '../ub-email.value';

describe('UBEmail', () => {
  describe('create()', () => {
    it('should create a valid @buffalo.edu email', () => {
      const result = UBEmail.create('student@buffalo.edu');
      expect(result.isSuccess).toBe(true);

      const email = result.getValue();
      expect(email.value).toBe('student@buffalo.edu');
      expect(email.email).toBe('student@buffalo.edu');
    });

    it('should normalize email to lowercase', () => {
      const result = UBEmail.create('Student@Buffalo.EDU');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('student@buffalo.edu');
    });

    it('should extract username from email', () => {
      const email = UBEmail.create('johndoe@buffalo.edu').getValue();
      expect(email.username).toBe('johndoe');
    });

    it('should fail when email is not @buffalo.edu', () => {
      const result = UBEmail.create('student@gmail.com');
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('@buffalo.edu');
    });

    it('should fail when email is not from buffalo.edu domain', () => {
      const result = UBEmail.create('student@suny.buffalo.edu');
      expect(result.isFailure).toBe(true);
    });

    it('should fail when email format is invalid', () => {
      const result = UBEmail.create('notanemail');
      expect(result.isFailure).toBe(true);
    });

    it('should fail when email is empty', () => {
      const result = UBEmail.create('');
      expect(result.isFailure).toBe(true);
    });

    it('should fail when email is whitespace only', () => {
      const result = UBEmail.create('   ');
      expect(result.isFailure).toBe(true);
    });

    it('should trim whitespace from email', () => {
      const result = UBEmail.create('  student@buffalo.edu  ');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('student@buffalo.edu');
    });

    it('should fail when username is missing', () => {
      const result = UBEmail.create('@buffalo.edu');
      expect(result.isFailure).toBe(true);
    });

    it('should accept valid username formats', () => {
      const validEmails = [
        'john.doe@buffalo.edu',
        'jane_doe@buffalo.edu',
        'student123@buffalo.edu',
        'test-user@buffalo.edu',
        'a@buffalo.edu'
      ];

      validEmails.forEach(email => {
        const result = UBEmail.create(email);
        expect(result.isSuccess).toBe(true);
      });
    });
  });

  describe('equality', () => {
    it('should be equal when emails are the same', () => {
      const email1 = UBEmail.create('student@buffalo.edu').getValue();
      const email2 = UBEmail.create('student@buffalo.edu').getValue();

      expect(email1.equals(email2)).toBe(true);
    });

    it('should be equal when case differs (normalized)', () => {
      const email1 = UBEmail.create('student@buffalo.edu').getValue();
      const email2 = UBEmail.create('STUDENT@BUFFALO.EDU').getValue();

      expect(email1.equals(email2)).toBe(true);
    });

    it('should not be equal when emails differ', () => {
      const email1 = UBEmail.create('student1@buffalo.edu').getValue();
      const email2 = UBEmail.create('student2@buffalo.edu').getValue();

      expect(email1.equals(email2)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the email value as string', () => {
      const email = UBEmail.create('test@buffalo.edu').getValue();
      expect(email.toString()).toBe('test@buffalo.edu');
    });
  });

  describe('username extraction', () => {
    it('should extract simple username', () => {
      const email = UBEmail.create('johndoe@buffalo.edu').getValue();
      expect(email.username).toBe('johndoe');
    });

    it('should extract username with dots', () => {
      const email = UBEmail.create('john.doe@buffalo.edu').getValue();
      expect(email.username).toBe('john.doe');
    });

    it('should extract username with underscores', () => {
      const email = UBEmail.create('john_doe@buffalo.edu').getValue();
      expect(email.username).toBe('john_doe');
    });

    it('should extract username with numbers', () => {
      const email = UBEmail.create('student123@buffalo.edu').getValue();
      expect(email.username).toBe('student123');
    });
  });

  describe('real-world examples', () => {
    it('should accept typical UB student emails', () => {
      const emails = [
        'jwrhineh@buffalo.edu',
        'noahowsh@buffalo.edu',
        'student2024@buffalo.edu',
        'john.smith@buffalo.edu'
      ];

      emails.forEach(email => {
        const result = UBEmail.create(email);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should reject non-UB emails', () => {
      const emails = [
        'student@gmail.com',
        'user@yahoo.com',
        'test@outlook.com',
        'admin@buffalo.com', // Wrong TLD
        'student@ub.edu'     // Wrong domain
      ];

      emails.forEach(email => {
        const result = UBEmail.create(email);
        expect(result.isFailure).toBe(true);
      });
    });
  });
});
