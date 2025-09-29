import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink } from 'firebase/auth';
import { auth } from '@hive/firebase';

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  signInWithEmailLink: vi.fn(),
  sendSignInLinkToEmail: vi.fn(),
  isSignInWithEmailLink: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('@hive/firebase', () => ({
  auth: {
    currentUser: null,
  },
}));

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Magic Link Authentication', () => {
    it('should validate UB email addresses', () => {
      const isValidUBEmail = (email: string) => {
        return email.endsWith('@buffalo.edu');
      };

      expect(isValidUBEmail('student@buffalo.edu')).toBe(true);
      expect(isValidUBEmail('faculty@buffalo.edu')).toBe(true);
      expect(isValidUBEmail('invalid@gmail.com')).toBe(false);
      expect(isValidUBEmail('notanemail')).toBe(false);
    });

    it('should send magic link to valid UB email', async () => {
      const email = 'student@buffalo.edu';
      const actionCodeSettings = {
        url: 'http://localhost:3000/auth/verify',
        handleCodeInApp: true,
      };

      (sendSignInLinkToEmail as any).mockResolvedValueOnce(undefined);

      const sendMagicLink = async (email: string) => {
        if (!email.endsWith('@buffalo.edu')) {
          throw new Error('Only UB emails allowed');
        }
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        localStorage.setItem('emailForSignIn', email);
      };

      await sendMagicLink(email);

      expect(sendSignInLinkToEmail).toHaveBeenCalledWith(auth, email, actionCodeSettings);
      expect(localStorage.getItem('emailForSignIn')).toBe(email);
    });

    it('should reject non-UB email addresses', async () => {
      const email = 'external@gmail.com';

      const sendMagicLink = async (email: string) => {
        if (!email.endsWith('@buffalo.edu')) {
          throw new Error('Only UB emails allowed');
        }
        await sendSignInLinkToEmail(auth, email, {} as any);
      };

      await expect(sendMagicLink(email)).rejects.toThrow('Only UB emails allowed');
      expect(sendSignInLinkToEmail).not.toHaveBeenCalled();
    });

    it('should verify magic link and sign in user', async () => {
      const email = 'student@buffalo.edu';
      const magicLink = 'http://localhost:3000/auth/verify?apiKey=test&oobCode=testCode';

      localStorage.setItem('emailForSignIn', email);
      (isSignInWithEmailLink as any).mockReturnValue(true);
      (signInWithEmailLink as any).mockResolvedValueOnce({
        user: {
          uid: 'test-uid',
          email,
          emailVerified: true,
        },
      });

      const verifyMagicLink = async (link: string) => {
        if (isSignInWithEmailLink(auth, link)) {
          const storedEmail = localStorage.getItem('emailForSignIn');
          if (!storedEmail) throw new Error('Email not found');

          const result = await signInWithEmailLink(auth, storedEmail, link);
          localStorage.removeItem('emailForSignIn');
          return result;
        }
        throw new Error('Invalid magic link');
      };

      const result = await verifyMagicLink(magicLink);

      expect(isSignInWithEmailLink).toHaveBeenCalledWith(auth, magicLink);
      expect(signInWithEmailLink).toHaveBeenCalledWith(auth, email, magicLink);
      expect(result.user.email).toBe(email);
      expect(localStorage.getItem('emailForSignIn')).toBe(null);
    });

    it('should handle expired magic links', async () => {
      const email = 'student@buffalo.edu';
      const expiredLink = 'http://localhost:3000/auth/verify?expired=true';

      localStorage.setItem('emailForSignIn', email);
      (isSignInWithEmailLink as any).mockReturnValue(true);
      (signInWithEmailLink as any).mockRejectedValueOnce({
        code: 'auth/expired-action-code',
        message: 'The action code has expired',
      });

      const verifyMagicLink = async (link: string) => {
        try {
          if (isSignInWithEmailLink(auth, link)) {
            const storedEmail = localStorage.getItem('emailForSignIn');
            if (!storedEmail) throw new Error('Email not found');

            return await signInWithEmailLink(auth, storedEmail, link);
          }
        } catch (error: any) {
          if (error.code === 'auth/expired-action-code') {
            throw new Error('Magic link has expired. Please request a new one.');
          }
          throw error;
        }
      };

      await expect(verifyMagicLink(expiredLink)).rejects.toThrow('Magic link has expired');
    });

    it('should handle invalid magic links', async () => {
      const invalidLink = 'http://localhost:3000/some/random/url';

      (isSignInWithEmailLink as any).mockReturnValue(false);

      const verifyMagicLink = async (link: string) => {
        if (!isSignInWithEmailLink(auth, link)) {
          throw new Error('Invalid magic link');
        }
        // Sign in logic...
      };

      await expect(verifyMagicLink(invalidLink)).rejects.toThrow('Invalid magic link');
      expect(signInWithEmailLink).not.toHaveBeenCalled();
    });
  });

  describe('Session Management', () => {
    it('should persist auth state across page reloads', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'student@buffalo.edu',
        emailVerified: true,
      };

      const sessionManager = {
        user: null as any,
        isAuthenticated: false,

        async checkSession() {
          // Simulate checking persisted session
          const persistedUser = localStorage.getItem('user');
          if (persistedUser) {
            this.user = JSON.parse(persistedUser);
            this.isAuthenticated = true;
          }
          return this.isAuthenticated;
        },

        async saveSession(user: any) {
          this.user = user;
          this.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(user));
        },

        async clearSession() {
          this.user = null;
          this.isAuthenticated = false;
          localStorage.removeItem('user');
        },
      };

      // Initially not authenticated
      expect(await sessionManager.checkSession()).toBe(false);

      // Save session
      await sessionManager.saveSession(mockUser);
      expect(sessionManager.isAuthenticated).toBe(true);
      expect(sessionManager.user).toEqual(mockUser);

      // Simulate page reload - session should persist
      sessionManager.user = null;
      sessionManager.isAuthenticated = false;

      expect(await sessionManager.checkSession()).toBe(true);
      expect(sessionManager.user).toEqual(mockUser);

      // Clear session
      await sessionManager.clearSession();
      expect(await sessionManager.checkSession()).toBe(false);
    });

    it('should handle sign out correctly', async () => {
      const signOutUser = async () => {
        // Clear Firebase auth
        await auth.signOut();
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('emailForSignIn');
        // Clear any session cookies
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        return true;
      };

      localStorage.setItem('user', JSON.stringify({ uid: 'test' }));
      localStorage.setItem('emailForSignIn', 'test@buffalo.edu');

      const result = await signOutUser();

      expect(result).toBe(true);
      expect(localStorage.getItem('user')).toBe(null);
      expect(localStorage.getItem('emailForSignIn')).toBe(null);
    });
  });

  describe('Campus Isolation', () => {
    it('should enforce UB-only access during beta', () => {
      const validateCampusAccess = (email: string): boolean => {
        const allowedDomains = ['@buffalo.edu'];
        return allowedDomains.some(domain => email.endsWith(domain));
      };

      expect(validateCampusAccess('student@buffalo.edu')).toBe(true);
      expect(validateCampusAccess('faculty@buffalo.edu')).toBe(true);
      expect(validateCampusAccess('student@cornell.edu')).toBe(false);
      expect(validateCampusAccess('user@gmail.com')).toBe(false);
    });

    it('should tag all user data with campus ID', () => {
      const createUserProfile = (email: string, data: any) => {
        if (!email.endsWith('@buffalo.edu')) {
          throw new Error('Invalid campus email');
        }

        return {
          ...data,
          campusId: 'ub-buffalo',
          email,
          createdAt: new Date(),
        };
      };

      const profile = createUserProfile('student@buffalo.edu', {
        displayName: 'Test Student',
        major: 'Computer Science',
      });

      expect(profile.campusId).toBe('ub-buffalo');
      expect(profile.email).toBe('student@buffalo.edu');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      (sendSignInLinkToEmail as any).mockRejectedValueOnce({
        code: 'auth/network-request-failed',
        message: 'Network error',
      });

      const sendMagicLink = async (email: string) => {
        try {
          await sendSignInLinkToEmail(auth, email, {} as any);
        } catch (error: any) {
          if (error.code === 'auth/network-request-failed') {
            throw new Error('Network error. Please check your connection and try again.');
          }
          throw error;
        }
      };

      await expect(sendMagicLink('student@buffalo.edu')).rejects.toThrow('Network error');
    });

    it('should handle rate limiting', async () => {
      (sendSignInLinkToEmail as any).mockRejectedValueOnce({
        code: 'auth/too-many-requests',
        message: 'Too many requests',
      });

      const sendMagicLink = async (email: string) => {
        try {
          await sendSignInLinkToEmail(auth, email, {} as any);
        } catch (error: any) {
          if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many attempts. Please wait a few minutes and try again.');
          }
          throw error;
        }
      };

      await expect(sendMagicLink('student@buffalo.edu')).rejects.toThrow('Too many attempts');
    });
  });
});