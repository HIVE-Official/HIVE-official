import { describe, it, expect } from 'vitest';

// Simple utility functions to test
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateHandle = (handle: string): { isValid: boolean; error?: string } => {
  if (handle.length < 3) {
    return { isValid: false, error: 'Handle must be at least 3 characters' };
  }
  if (handle.length > 20) {
    return { isValid: false, error: 'Handle must be at most 20 characters' };
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(handle)) {
    return { isValid: false, error: 'Handle contains invalid characters' };
  }
  if (/[._-]{2,}/.test(handle)) {
    return { isValid: false, error: 'Handle cannot contain consecutive special characters' };
  }
  return { isValid: true };
};

const createSessionData = (userData: any) => ({
  userId: userData.id,
  email: userData.email,
  schoolId: userData.schoolId,
  needsOnboarding: !userData.onboardingCompleted,
  verifiedAt: new Date().toISOString(),
  handle: userData.handle,
  role: userData.role || 'student',
  onboardingCompleted: userData.onboardingCompleted || false,
});

describe('Authentication Utilities', () => {
  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@test.edu')).toBe(true);
      expect(validateEmail('student123@university.ac.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('no-at-symbol.com')).toBe(false);
      expect(validateEmail('@no-username.com')).toBe(false);
      expect(validateEmail('no-domain@')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('a@b.c')).toBe(true); // Minimal valid email
    });
  });

  describe('validateHandle', () => {
    it('validates correct handle formats', () => {
      expect(validateHandle('validhandle')).toEqual({ isValid: true });
      expect(validateHandle('user123')).toEqual({ isValid: true });
      expect(validateHandle('test.user')).toEqual({ isValid: true });
      expect(validateHandle('user_name')).toEqual({ isValid: true });
      expect(validateHandle('user-handle')).toEqual({ isValid: true });
    });

    it('rejects handles that are too short', () => {
      expect(validateHandle('ab')).toEqual({
        isValid: false,
        error: 'Handle must be at least 3 characters'
      });
    });

    it('rejects handles that are too long', () => {
      const longHandle = 'a'.repeat(21);
      expect(validateHandle(longHandle)).toEqual({
        isValid: false,
        error: 'Handle must be at most 20 characters'
      });
    });

    it('rejects handles with invalid characters', () => {
      expect(validateHandle('invalid@handle')).toEqual({
        isValid: false,
        error: 'Handle contains invalid characters'
      });
      expect(validateHandle('invalid handle')).toEqual({
        isValid: false,
        error: 'Handle contains invalid characters'
      });
      expect(validateHandle('invalid#handle')).toEqual({
        isValid: false,
        error: 'Handle contains invalid characters'
      });
    });

    it('rejects handles with consecutive special characters', () => {
      expect(validateHandle('invalid..handle')).toEqual({
        isValid: false,
        error: 'Handle cannot contain consecutive special characters'
      });
      expect(validateHandle('invalid--handle')).toEqual({
        isValid: false,
        error: 'Handle cannot contain consecutive special characters'
      });
      expect(validateHandle('invalid__handle')).toEqual({
        isValid: false,
        error: 'Handle cannot contain consecutive special characters'
      });
    });
  });

  describe('createSessionData', () => {
    it('creates session data for new user', () => {
      const userData = {
        id: 'user-123',
        email: 'test@test.edu',
        schoolId: 'test-university',
        handle: 'testuser',
        role: 'student',
        onboardingCompleted: false,
      };

      const sessionData = createSessionData(userData);

      expect(sessionData).toMatchObject({
        userId: 'user-123',
        email: 'test@test.edu',
        schoolId: 'test-university',
        needsOnboarding: true,
        handle: 'testuser',
        role: 'student',
        onboardingCompleted: false,
      });
      expect(sessionData.verifiedAt).toBeDefined();
    });

    it('creates session data for existing user', () => {
      const userData = {
        id: 'user-456',
        email: 'existing@test.edu',
        schoolId: 'test-university',
        handle: 'existinguser',
        role: 'faculty',
        onboardingCompleted: true,
      };

      const sessionData = createSessionData(userData);

      expect(sessionData).toMatchObject({
        userId: 'user-456',
        email: 'existing@test.edu',
        needsOnboarding: false,
        role: 'faculty',
        onboardingCompleted: true,
      });
    });

    it('handles missing role field', () => {
      const userData = {
        id: 'user-789',
        email: 'student@test.edu',
        schoolId: 'test-university',
        handle: 'student',
        onboardingCompleted: false,
      };

      const sessionData = createSessionData(userData);

      expect(sessionData.role).toBe('student'); // Default role
    });
  });
});


describe('Environment Setup', () => {
  it('should have correct test environment variables', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.NEXT_PUBLIC_APP_URL).toBe('http://localhost:3000');
  });

  it('should have mocked browser APIs', () => {
    expect(window.localStorage).toBeDefined();
    expect(window.sessionStorage).toBeDefined();
    expect(global.IntersectionObserver).toBeDefined();
    expect(global.ResizeObserver).toBeDefined();
  });
});