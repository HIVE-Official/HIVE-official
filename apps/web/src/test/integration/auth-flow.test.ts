import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the actual API route handlers
import { POST as sendMagicLinkPOST } from '../../app/api/auth/send-magic-link/route';
import { POST as verifyMagicLinkPOST } from '../../app/api/auth/verify-magic-link/route';
import { GET as sessionGET, POST as sessionPOST } from '../../app/api/auth/session/route';
import { POST as completeOnboardingPOST } from '../../app/api/auth/complete-onboarding/route';
import { POST as checkHandlePOST } from '../../app/api/auth/check-handle/route';

// Mock Firebase
vi.mock('firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: vi.fn(),
    createCustomToken: vi.fn(),
    getUser: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    generateEmailVerificationLink: vi.fn()
  }),
  credential: {
    cert: vi.fn()
  },
  initializeApp: vi.fn()
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() }))
  }
}));

vi.mock('@hive/core/server', () => ({
  db: {},
  adminAuth: {
    verifyIdToken: vi.fn(),
    createCustomToken: vi.fn(),
    getUser: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    generateEmailVerificationLink: vi.fn()
  }
}));

import { adminAuth } from '@hive/core/server';
import { getDoc, setDoc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
};

describe('Authentication Flow Integration Tests', () => {
  const mockUserEmail = 'student@university.edu';
  const mockInvalidEmail = 'user@gmail.com';
  const mockMagicLink = 'https://hive.test/verify?token=mock-token-123';
  const mockToken = 'mock-firebase-token-123';
  const mockUserId = 'user-123';
  
  const mockUser = {
    uid: mockUserId,
    email: mockUserEmail,
    displayName: 'Test Student',
    emailVerified: true,
    customClaims: { role: 'student' }
  };

  const mockUserProfile = {
    userId: mockUserId,
    email: mockUserEmail,
    displayName: 'Test Student',
    handle: 'teststudent',
    role: 'student',
    status: 'active',
    onboardingComplete: false,
    createdAt: new Date().toISOString()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.error.mockClear();
    consoleSpy.log.mockClear();

    // Setup default mocks
    vi.mocked(adminAuth.generateEmailVerificationLink).mockResolvedValue(mockMagicLink);
    vi.mocked(adminAuth.verifyIdToken).mockResolvedValue({
      uid: mockUserId,
      email: mockUserEmail
    } as any);
    vi.mocked(adminAuth.createCustomToken).mockResolvedValue(mockToken);
    vi.mocked(adminAuth.getUser).mockResolvedValue(mockUser as any);
    vi.mocked(adminAuth.createUser).mockResolvedValue(mockUser as any);
    vi.mocked(adminAuth.updateUser).mockResolvedValue(mockUser as any);

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => mockUserProfile
    } as any);
    vi.mocked(setDoc).mockResolvedValue(undefined);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(addDoc).mockResolvedValue({ id: 'doc-123' } as any);
    vi.mocked(getDocs).mockResolvedValue({ empty: true, docs: [] } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Complete Authentication Flow', () => {
    it('completes full auth flow: magic link → verification → session → onboarding', async () => {
      // Step 1: Send magic link
      const magicLinkRequest = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: mockUserEmail })
      });

      const magicLinkResponse = await sendMagicLinkPOST(magicLinkRequest);
      const magicLinkData = await magicLinkResponse.json();

      expect(magicLinkResponse.status).toBe(200);
      expect(magicLinkData.success).toBe(true);
      expect(magicLinkData.magicLink).toBe(mockMagicLink);

      // Step 2: Verify magic link (new user)
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => false
      } as any);

      const verifyRequest = new NextRequest('http://localhost/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({ 
          token: mockToken,
          continueUrl: 'http://localhost/dashboard'
        })
      });

      const verifyResponse = await verifyMagicLinkPOST(verifyRequest);
      const verifyData = await verifyResponse.json();

      expect(verifyResponse.status).toBe(200);
      expect(verifyData.success).toBe(true);
      expect(verifyData.user.userId).toBe(mockUserId);
      expect(verifyData.isNewUser).toBe(true);

      // Step 3: Check handle availability
      const checkHandleRequest = new NextRequest('http://localhost/api/auth/check-handle', {
        method: 'POST',
        body: JSON.stringify({ handle: 'teststudent' })
      });

      const checkHandleResponse = await checkHandlePOST(checkHandleRequest);
      const checkHandleData = await checkHandleResponse.json();

      expect(checkHandleResponse.status).toBe(200);
      expect(checkHandleData.available).toBe(true);

      // Step 4: Complete onboarding
      const onboardingRequest = new NextRequest('http://localhost/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify({
          displayName: 'Test Student',
          handle: 'teststudent',
          major: 'Computer Science',
          graduationYear: 2025,
          bio: 'CS student interested in web development'
        })
      });

      const onboardingResponse = await completeOnboardingPOST(onboardingRequest);
      const onboardingData = await onboardingResponse.json();

      expect(onboardingResponse.status).toBe(200);
      expect(onboardingData.success).toBe(true);
      expect(onboardingData.profile.onboardingComplete).toBe(true);

      // Step 5: Validate session
      const sessionRequest = new NextRequest('http://localhost/api/auth/session', {
        headers: {
          'Authorization': `Bearer ${mockToken}`
        }
      });

      const sessionResponse = await sessionGET(sessionRequest);
      const sessionData = await sessionResponse.json();

      expect(sessionResponse.status).toBe(200);
      expect(sessionData.valid).toBe(true);
      expect(sessionData.user.userId).toBe(mockUserId);
    });

    it('handles returning user authentication flow', async () => {
      // Setup existing user
      const existingUserProfile = { ...mockUserProfile, onboardingComplete: true };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => existingUserProfile
      } as any);

      // Step 1: Send magic link
      const magicLinkRequest = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: mockUserEmail })
      });

      const magicLinkResponse = await sendMagicLinkPOST(magicLinkRequest);
      expect(magicLinkResponse.status).toBe(200);

      // Step 2: Verify magic link (existing user)
      const verifyRequest = new NextRequest('http://localhost/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({ 
          token: mockToken,
          continueUrl: 'http://localhost/dashboard'
        })
      });

      const verifyResponse = await verifyMagicLinkPOST(verifyRequest);
      const verifyData = await verifyResponse.json();

      expect(verifyResponse.status).toBe(200);
      expect(verifyData.success).toBe(true);
      expect(verifyData.isNewUser).toBe(false);
      expect(verifyData.user.onboardingComplete).toBe(true);

      // Step 3: Session should be valid immediately
      const sessionRequest = new NextRequest('http://localhost/api/auth/session', {
        headers: {
          'Authorization': `Bearer ${mockToken}`
        }
      });

      const sessionResponse = await sessionGET(sessionRequest);
      const sessionData = await sessionResponse.json();

      expect(sessionResponse.status).toBe(200);
      expect(sessionData.valid).toBe(true);
      expect(sessionData.user.onboardingComplete).toBe(true);
    });

    it('rejects non-educational email domains', async () => {
      const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: mockInvalidEmail })
      });

      const response = await sendMagicLinkPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Email must be from an educational institution');
    });

    it('handles handle conflicts during onboarding', async () => {
      // Mock handle already taken
      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'other-user', data: () => ({ handle: 'teststudent' }) }]
      } as any);

      const checkHandleRequest = new NextRequest('http://localhost/api/auth/check-handle', {
        method: 'POST',
        body: JSON.stringify({ handle: 'teststudent' })
      });

      const checkHandleResponse = await checkHandlePOST(checkHandleRequest);
      const checkHandleData = await checkHandleResponse.json();

      expect(checkHandleResponse.status).toBe(200);
      expect(checkHandleData.available).toBe(false);
      expect(checkHandleData.suggestions).toHaveLength(3);
      expect(checkHandleData.suggestions).toEqual(
        expect.arrayContaining([
          'teststudent1',
          'teststudent2', 
          'teststudent24'
        ])
      );
    });

    it('validates token expiration', async () => {
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(
        new Error('Firebase ID token has expired')
      );

      const request = new NextRequest('http://localhost/api/auth/session', {
        headers: {
          'Authorization': `Bearer expired-token`
        }
      });

      const response = await sessionGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.valid).toBe(false);
      expect(responseData.error).toBe('Token expired');
    });

    it('handles Firebase auth service outages', async () => {
      vi.mocked(adminAuth.generateEmailVerificationLink).mockRejectedValue(
        new Error('Firebase service unavailable')
      );

      const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: mockUserEmail })
      });

      const response = await sendMagicLinkPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send magic link');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error sending magic link:',
        expect.any(Error)
      );
    });

    it('enforces rate limiting on magic link requests', async () => {
      const email = mockUserEmail;
      
      // Send multiple requests rapidly
      const requests = Array(6).fill(null).map(() =>
        sendMagicLinkPOST(new NextRequest('http://localhost/api/auth/send-magic-link', {
          method: 'POST',
          body: JSON.stringify({ email })
        }))
      );

      const responses = await Promise.all(requests);
      const lastResponse = responses[5];
      const lastResponseData = await lastResponse.json();

      // Should be rate limited after 5 requests
      expect(lastResponse.status).toBe(429);
      expect(lastResponseData.error).toBe('Too many requests');
    });

    it('handles concurrent onboarding completion', async () => {
      const onboardingData = {
        displayName: 'Test Student',
        handle: 'teststudent',
        major: 'Computer Science',
        graduationYear: 2025
      };

      // Simulate two concurrent onboarding requests
      const request1 = completeOnboardingPOST(new NextRequest('http://localhost/api/auth/complete-onboarding', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mockToken}` },
        body: JSON.stringify(onboardingData)
      }));

      const request2 = completeOnboardingPOST(new NextRequest('http://localhost/api/auth/complete-onboarding', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mockToken}` },
        body: JSON.stringify(onboardingData)
      }));

      const [response1, response2] = await Promise.all([request1, request2]);

      // One should succeed, one should fail due to already completed
      expect([response1.status, response2.status]).toContain(200);
      expect([response1.status, response2.status]).toContain(400);
    });

    it('validates onboarding data completeness', async () => {
      const incompleteData = {
        displayName: 'Test Student'
        // Missing handle, major, graduationYear
      };

      const request = new NextRequest('http://localhost/api/auth/complete-onboarding', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mockToken}` },
        body: JSON.stringify(incompleteData)
      });

      const response = await completeOnboardingPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Handle, major, and graduation year are required');
    });

    it('creates audit trail for authentication events', async () => {
      const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: mockUserEmail })
      });

      await sendMagicLinkPOST(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          action: 'magic_link_sent',
          email: mockUserEmail,
          timestamp: expect.any(String),
          ipAddress: expect.any(String),
          userAgent: expect.any(String)
        })
      );
    });

    it('handles malformed authentication requests', async () => {
      const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await sendMagicLinkPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send magic link');
    });

    it('validates session refresh functionality', async () => {
      const refreshRequest = new NextRequest('http://localhost/api/auth/session', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${mockToken}` },
        body: JSON.stringify({ refresh: true })
      });

      const refreshResponse = await sessionPOST(refreshRequest);
      const refreshData = await refreshResponse.json();

      expect(refreshResponse.status).toBe(200);
      expect(refreshData.success).toBe(true);
      expect(refreshData.newToken).toBeDefined();
      expect(vi.mocked(adminAuth.createCustomToken)).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe('Security and Edge Cases', () => {
    it('prevents email enumeration attacks', async () => {
      // Test with non-existent educational email
      const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({ email: 'nonexistent@university.edu' })
      });

      const response = await sendMagicLinkPOST(request);
      const responseData = await response.json();

      // Should still return success to prevent enumeration
      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('handles database connection failures gracefully', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({ token: mockToken })
      });

      const response = await verifyMagicLinkPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Authentication failed');
    });

    it('validates token format and structure', async () => {
      const malformedTokens = [
        'short',
        '',
        'invalid.token.format',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid',
        null,
        undefined
      ];

      for (const token of malformedTokens) {
        const request = new NextRequest('http://localhost/api/auth/session', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });

        const response = await sessionGET(request);
        const responseData = await response.json();

        expect(response.status).toBe(401);
        expect(responseData.valid).toBe(false);
      }
    });

    it('enforces handle format validation', async () => {
      const invalidHandles = [
        'ab', // too short
        'thishandleiswaytoolongandexceedsthemaximumlength', // too long
        'handle with spaces',
        'handle@with$pecial',
        '123numericstart',
        'UPPERCASE',
        'handle-with-dashes'
      ];

      for (const handle of invalidHandles) {
        const request = new NextRequest('http://localhost/api/auth/check-handle', {
          method: 'POST',
          body: JSON.stringify({ handle })
        });

        const response = await checkHandlePOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Invalid handle format');
      }
    });

    it('prevents concurrent user creation with same email', async () => {
      // Simulate race condition where two verify requests come in simultaneously
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false // First check says user doesn't exist
      } as any);

      vi.mocked(adminAuth.createUser).mockRejectedValueOnce(
        new Error('The email address is already in use by another account')
      );

      const request = new NextRequest('http://localhost/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({ token: mockToken })
      });

      const response = await verifyMagicLinkPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      // Should handle the race condition gracefully
    });
  });

  describe('Educational Domain Validation', () => {
    it('validates legitimate educational domains', async () => {
      const validEducationalEmails = [
        'student@mit.edu',
        'faculty@stanford.edu',
        'user@berkeley.edu',
        'test@caltech.edu',
        'admin@harvard.edu'
      ];

      for (const email of validEducationalEmails) {
        const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
          method: 'POST',
          body: JSON.stringify({ email })
        });

        const response = await sendMagicLinkPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
      }
    });

    it('rejects non-educational domains', async () => {
      const invalidEmails = [
        'user@gmail.com',
        'test@yahoo.com',
        'admin@company.com',
        'student@business.org',
        'user@fake-university.net'
      ];

      for (const email of invalidEmails) {
        const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
          method: 'POST',
          body: JSON.stringify({ email })
        });

        const response = await sendMagicLinkPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Email must be from an educational institution');
      }
    });

    it('validates email format before domain check', async () => {
      const malformedEmails = [
        'notanemail',
        'missing@',
        '@nodomain.edu',
        'user@',
        'user.edu',
        'user@@double.edu'
      ];

      for (const email of malformedEmails) {
        const request = new NextRequest('http://localhost/api/auth/send-magic-link', {
          method: 'POST',
          body: JSON.stringify({ email })
        });

        const response = await sendMagicLinkPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Invalid email format');
      }
    });
  });
});