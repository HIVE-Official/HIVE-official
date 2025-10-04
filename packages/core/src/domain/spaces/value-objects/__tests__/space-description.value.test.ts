/**
 * SpaceDescription Value Object Tests
 * Tests for space description validation
 */

import { describe, it, expect } from 'vitest';
import { SpaceDescription } from '../space-description.value';

describe('SpaceDescription', () => {
  describe('create()', () => {
    it('should create a valid space description', () => {
      const text = 'A study group for CSE 116 students to collaborate and help each other.';
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);

      const description = result.getValue();
      expect(description.value).toBe(text);
    });

    it('should trim whitespace from description', () => {
      const result = SpaceDescription.create('  Test description  ');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('Test description');
    });

    it('should accept empty description', () => {
      const result = SpaceDescription.create('');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('');
    });

    it('should accept whitespace-only description (trims to empty)', () => {
      const result = SpaceDescription.create('   ');
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe('');
    });

    it('should fail when description exceeds 500 characters', () => {
      const result = SpaceDescription.create('a'.repeat(501));
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('no more than 500 characters');
    });

    it('should accept description with exactly 500 characters', () => {
      const text = 'a'.repeat(500);
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(text);
    });

    it('should accept multi-line descriptions', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(text);
    });

    it('should accept descriptions with special characters', () => {
      const text = 'Meet @ Alumni Arena! 🏀 Everyone welcome :)';
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe(text);
    });

    it('should accept descriptions with URLs', () => {
      const text = 'Join us at https://ub.edu/acm for more info';
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);
    });

    it('should accept descriptions with markdown-style formatting', () => {
      const text = '**Welcome** to our space! Visit our *website* for more info.';
      const result = SpaceDescription.create(text);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('createEmpty()', () => {
    it('should create empty description', () => {
      const result = SpaceDescription.createEmpty();
      expect(result.isSuccess).toBe(true);

      const description = result.getValue();
      expect(description.value).toBe('');
    });

    it('should be equal to create("") result', () => {
      const empty1 = SpaceDescription.createEmpty().getValue();
      const empty2 = SpaceDescription.create('').getValue();

      expect(empty1.equals(empty2)).toBe(true);
    });
  });

  describe('equality', () => {
    it('should be equal when descriptions are the same', () => {
      const desc1 = SpaceDescription.create('Test description').getValue();
      const desc2 = SpaceDescription.create('Test description').getValue();

      expect(desc1.equals(desc2)).toBe(true);
    });

    it('should not be equal when descriptions differ', () => {
      const desc1 = SpaceDescription.create('Description 1').getValue();
      const desc2 = SpaceDescription.create('Description 2').getValue();

      expect(desc1.equals(desc2)).toBe(false);
    });

    it('should be equal after trimming whitespace', () => {
      const desc1 = SpaceDescription.create('  Test  ').getValue();
      const desc2 = SpaceDescription.create('Test').getValue();

      expect(desc1.equals(desc2)).toBe(true);
    });

    it('should be equal when both are empty', () => {
      const desc1 = SpaceDescription.createEmpty().getValue();
      const desc2 = SpaceDescription.create('').getValue();

      expect(desc1.equals(desc2)).toBe(true);
    });
  });

  describe('toString()', () => {
    it('should return the description value as string', () => {
      const description = SpaceDescription.create('Test description').getValue();
      expect(description.toString()).toBe('Test description');
    });

    it('should return empty string for empty description', () => {
      const description = SpaceDescription.createEmpty().getValue();
      expect(description.toString()).toBe('');
    });
  });

  describe('real-world examples', () => {
    it('should accept typical space descriptions', () => {
      const descriptions = [
        'Weekly study sessions for CSE 116. Bring your laptop and questions!',
        'Join us for pickup basketball games every Tuesday and Thursday at 7pm.',
        'A community for Ellicott residents to connect and share events.',
        'Pre-Med students helping each other prepare for the MCAT.',
        ''
      ];

      descriptions.forEach(desc => {
        const result = SpaceDescription.create(desc);
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should accept long detailed description', () => {
      const description =
        'Welcome to the UB ACM student chapter! We host weekly meetings every ' +
        'Wednesday at 6pm in Davis Hall. Topics include coding challenges, ' +
        'tech talks, career prep, and networking events. All skill levels welcome. ' +
        'Join our Discord for updates and discussion. Looking forward to seeing you there!';

      const result = SpaceDescription.create(description);
      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value.length).toBeLessThanOrEqual(500);
    });

    it('should reject excessively long description', () => {
      const longDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);

      const result = SpaceDescription.create(longDescription);
      if (longDescription.length > 500) {
        expect(result.isFailure).toBe(true);
      } else {
        expect(result.isSuccess).toBe(true);
      }
    });

    it('should handle description with formatting', () => {
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

      const result = SpaceDescription.create(description);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('boundary conditions', () => {
    it('should succeed with exactly 500 characters', () => {
      const result = SpaceDescription.create('a'.repeat(500));
      expect(result.isSuccess).toBe(true);
    });

    it('should fail with exactly 501 characters', () => {
      const result = SpaceDescription.create('a'.repeat(501));
      expect(result.isFailure).toBe(true);
    });

    it('should succeed with 0 characters (empty)', () => {
      const result = SpaceDescription.create('');
      expect(result.isSuccess).toBe(true);
    });

    it('should succeed with 1 character', () => {
      const result = SpaceDescription.create('a');
      expect(result.isSuccess).toBe(true);
    });
  });
});
