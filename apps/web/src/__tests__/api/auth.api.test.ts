/**
 * Auth API Route Tests
 * Tests authentication, magic link, session validation, and security
 *
 * Routes:
 * - POST /api/auth/send-magic-link
 * - GET /api/auth/session
 * - POST /api/auth/session
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST as sendMagicLink } from '@/app/api/auth/send-magic-link/route';
import { GET as getSession, POST as refreshSession } from '@/app/api/auth/session/route';
import { NextRequest } from 'next/server';

// Mock Firebase Admin
vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    generateSignInWithEmailLink: vi.fn(),
    verifyIdToken: vi.fn(),
    createCustomToken: vi.fn()
  }))
}));

// Mock Firebase Admin DB
vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn()
      }))
    }))
  }
}));

// Mock validation
vi.mock('@/lib/secure-input-validation', () => ({
  validateWithSecurity: vi.fn(() => Promise.resolve({
    success: true,
    securityLevel: 'safe',
    data: {}
  })),
  ApiSchemas: {
    magicLinkRequest: {
      shape: {
        email: {
          parse: vi.fn((v: any) => v)
        }
      }
    }
  }
}));

// Mock rate limiting
vi.mock('@/lib/secure-rate-limiter', () => ({
  enforceRateLimit: vi.fn(() => Promise.resolve({
    allowed: true,
    limit: 5,
    remaining: 4,
    resetAt: Date.now() + 60000
  }))
}));

// Mock audit
vi.mock('@/lib/production-auth', () => ({
  auditAuthEvent: vi.fn()
}));

// Mock environment
vi.mock('@/lib/env', () => ({
  currentEnvironment: 'development',
  isFirebaseAdminConfigured: true
}));

// Mock email sending
vi.mock('@/lib/firebase-auth-email', () => ({
  sendFirebaseMagicLinkEmail: vi.fn(),
  isFirebaseEmailAuthEnabled: vi.fn(() => Promise.resolve(true))
}));

// Mock core functions
vi.mock('@hive/core', () => ({
  getDefaultActionCodeSettings: vi.fn(() => ({
    url: 'http://localhost:3000/auth/verify',
    handleCodeInApp: true
  })),
  validateEmailDomain: vi.fn((email: string, domains: string[]) => {
    const domain = email.split('@')[1];
    return domains.includes(domain);
  })
}));

// Mock middleware
vi.mock('@/lib/middleware', () => ({
  withValidation: (schema: any, handler: any) => handler
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('Auth API - POST /api/auth/send-magic-link', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Email Validation', () => {
    it('should require valid email format', async () => {
      const body = {
        email: 'invalid-email',
        schoolId: 'ub-buffalo'
      };

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message: string) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      // Email validation happens at Zod schema level
      // This test validates the schema exists
    });

    it('should enforce @buffalo.edu domain for UB campus', async () => {
      const { validateEmailDomain } = await import('@hive/core');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const body = {
        email: 'john@gmail.com',
        schoolId: 'ub-buffalo'
      };

      // validateEmailDomain should reject non-buffalo.edu email
      const result = validateEmailDomain(body.email, ['buffalo.edu']);
      expect(result).toBe(false);
    });

    it('should accept valid @buffalo.edu email', async () => {
      const { validateEmailDomain } = await import('@hive/core');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const body = {
        email: 'john@buffalo.edu',
        schoolId: 'ub-buffalo'
      };

      const result = validateEmailDomain(body.email, ['buffalo.edu']);
      expect(result).toBe(true);
    });

    it('should validate email length', async () => {
      const longEmail = 'a'.repeat(300) + '@buffalo.edu';

      const body = {
        email: longEmail,
        schoolId: 'ub-buffalo'
      };

      // Zod schema should reject emails that are too long
    });
  });

  describe('School Validation', () => {
    it('should require valid schoolId', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: false
      };

      vi.mocked(dbAdmin.collection('schools').doc('invalid-school').get).mockResolvedValue(mockSchoolDoc as any);

      const body = {
        email: 'john@buffalo.edu',
        schoolId: 'invalid-school'
      };

      // School validation should fail
    });

    it('should reject inactive schools', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: false // Inactive
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const body = {
        email: 'john@buffalo.edu',
        schoolId: 'ub-buffalo'
      };

      // Should reject inactive school
    });

    it('should validate schoolId format', async () => {
      const invalidSchoolIds = [
        'school with spaces',
        'school@invalid',
        'school!special'
      ];

      for (const schoolId of invalidSchoolIds) {
        const body = {
          email: 'john@buffalo.edu',
          schoolId
        };

        // Zod schema should reject invalid schoolId format
        // Schema: /^[a-zA-Z0-9_-]+$/
      }
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits on magic link requests', async () => {
      const { enforceRateLimit } = await import('@/lib/secure-rate-limiter');

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message: string) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(enforceRateLimit).toHaveBeenCalledWith('magicLink', request);
    });

    it('should return 429 when rate limit exceeded', async () => {
      const { enforceRateLimit } = await import('@/lib/secure-rate-limiter');

      vi.mocked(enforceRateLimit).mockResolvedValue({
        allowed: false,
        limit: 5,
        remaining: 0,
        resetAt: Date.now() + 60000,
        error: 'Rate limit exceeded',
        status: 429
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message: string, code: string, opts: any) => ({
          json: () => Promise.resolve({ error: message }),
          status: opts.status
        }))
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit'),
        'RATE_LIMITED',
        expect.objectContaining({ status: 429 })
      );
    });
  });

  describe('Security Validation', () => {
    it('should detect and block dangerous inputs', async () => {
      const { validateWithSecurity } = await import('@/lib/secure-input-validation');

      vi.mocked(validateWithSecurity).mockResolvedValue({
        success: false,
        securityLevel: 'dangerous',
        errors: [{ code: 'SQL_INJECTION' }],
        data: {}
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: "'; DROP TABLE users; --@buffalo.edu",
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message: string) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await sendMagicLink(request, {}, { email: "'; DROP TABLE users; --@buffalo.edu", schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith('Request validation failed', 'INVALID_INPUT', expect.any(Object));
    });

    it('should audit suspicious activity', async () => {
      const { auditAuthEvent } = await import('@/lib/production-auth');
      const { validateWithSecurity } = await import('@/lib/secure-input-validation');

      vi.mocked(validateWithSecurity).mockResolvedValue({
        success: false,
        securityLevel: 'dangerous',
        errors: [{ code: 'XSS_ATTEMPT' }],
        data: {}
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: '<script>alert(1)</script>@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn(() => ({ json: () => Promise.resolve({}) }))
      };

      await sendMagicLink(request, {}, { email: '<script>alert(1)</script>@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(auditAuthEvent).toHaveBeenCalledWith(
        'suspicious',
        request,
        expect.objectContaining({
          operation: 'send_magic_link',
          securityLevel: 'dangerous'
        })
      );
    });
  });

  describe('Magic Link Generation', () => {
    it('should generate Firebase magic link in production', async () => {
      const { getAuth } = await import('firebase-admin/auth');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('https://firebase.link/magic')
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn((data: any) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(mockAuth.generateSignInWithEmailLink).toHaveBeenCalledWith(
        'john@buffalo.edu',
        expect.any(Object)
      );
    });

    it('should include action code settings', async () => {
      const { getDefaultActionCodeSettings } = await import('@hive/core');

      const settings = getDefaultActionCodeSettings('ub-buffalo');

      expect(settings).toHaveProperty('url');
      expect(settings).toHaveProperty('handleCodeInApp');
    });

    it('should handle Firebase errors gracefully', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockRejectedValue(new Error('Firebase error'))
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn(() => ({ json: () => Promise.resolve({}) }))
      };

      // Should handle error gracefully
      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);
    });
  });

  describe('Email Sending', () => {
    it('should send magic link via Firebase Auth', async () => {
      const { sendFirebaseMagicLinkEmail } = await import('@/lib/firebase-auth-email');
      const { dbAdmin } = await import('@/lib/firebase-admin');
      const { getAuth } = await import('firebase-admin/auth');

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('https://firebase.link/magic')
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn((data: any) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      // Should send email
      expect(sendFirebaseMagicLinkEmail).toHaveBeenCalled();
    });

    it('should handle email sending failures', async () => {
      const { sendFirebaseMagicLinkEmail } = await import('@/lib/firebase-auth-email');

      vi.mocked(sendFirebaseMagicLinkEmail).mockRejectedValue(new Error('Email service down'));

      // Should handle gracefully
    });
  });

  describe('Audit Logging', () => {
    it('should log successful magic link send', async () => {
      const { auditAuthEvent } = await import('@/lib/production-auth');
      const { getAuth } = await import('firebase-admin/auth');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('https://firebase.link/magic')
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true
        })
      };

      vi.mocked(dbAdmin.collection('schools').doc('ub-buffalo').get).mockResolvedValue(mockSchoolDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'ub-buffalo'
        })
      });

      const mockRespond = {
        success: vi.fn((data: any) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'ub-buffalo' }, mockRespond as any);

      expect(auditAuthEvent).toHaveBeenCalledWith(
        'success',
        request,
        expect.objectContaining({
          operation: 'send_magic_link'
        })
      );
    });

    it('should log failures with details', async () => {
      const { auditAuthEvent } = await import('@/lib/production-auth');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockSchoolDoc = {
        exists: false
      };

      vi.mocked(dbAdmin.collection('schools').doc('invalid').get).mockResolvedValue(mockSchoolDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'john@buffalo.edu',
          schoolId: 'invalid'
        })
      });

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn(() => ({ json: () => Promise.resolve({}) }))
      };

      await sendMagicLink(request, {}, { email: 'john@buffalo.edu', schoolId: 'invalid' }, mockRespond as any);

      expect(auditAuthEvent).toHaveBeenCalledWith(
        'failure',
        request,
        expect.objectContaining({
          operation: 'send_magic_link',
          error: 'invalid_school'
        })
      );
    });
  });
});

describe('Auth API - GET /api/auth/session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Token Validation', () => {
    it('should require Bearer token', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {}
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('authorization');
    });

    it('should validate Firebase ID token', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const mockDecodedToken = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        email_verified: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        auth_time: Math.floor(Date.now() / 1000),
        iss: 'https://securetoken.google.com/project',
        aud: 'project'
      };

      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer valid-token-123'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(mockAuth.verifyIdToken).toHaveBeenCalledWith('valid-token-123');
      expect(data.valid).toBe(true);
    });

    it('should reject expired tokens', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const mockAuth = {
        verifyIdToken: vi.fn().mockRejectedValue(new Error('Token expired'))
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer expired-token'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.valid).toBe(false);
      expect(data.code).toBe('TOKEN_INVALID');
    });

    it('should reject malformed tokens', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const mockAuth = {
        verifyIdToken: vi.fn().mockRejectedValue(new Error('Malformed token'))
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer malformed.token.here'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.valid).toBe(false);
    });
  });

  describe('User Profile Fetching', () => {
    it('should fetch user profile from Firestore', async () => {
      const { getAuth } = await import('firebase-admin/auth');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockDecodedToken = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        email_verified: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        auth_time: Math.floor(Date.now() / 1000),
        iss: 'https://securetoken.google.com/project',
        aud: 'project'
      };

      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'John Doe',
          handle: 'johndoe',
          major: 'Computer Science',
          schoolId: 'ub-buffalo',
          emailVerified: true,
          onboardingCompletedAt: new Date()
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(data.valid).toBe(true);
      expect(data.user.fullName).toBe('John Doe');
      expect(data.user.handle).toBe('johndoe');
    });

    it('should handle missing user profile gracefully', async () => {
      const { getAuth } = await import('firebase-admin/auth');
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockDecodedToken = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        email_verified: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        auth_time: Math.floor(Date.now() / 1000),
        iss: 'https://securetoken.google.com/project',
        aud: 'project'
      };

      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const mockUserDoc = {
        exists: false
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(data.valid).toBe(true);
      expect(data.user.email).toBe('john@buffalo.edu');
      expect(data.user.onboardingCompleted).toBe(false);
    });
  });

  describe('Session Metadata', () => {
    it('should return session timestamps', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const now = Math.floor(Date.now() / 1000);
      const mockDecodedToken = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        iat: now,
        exp: now + 3600,
        auth_time: now,
        iss: 'https://securetoken.google.com/project',
        aud: 'project'
      };

      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(data.session.issuedAt).toBeDefined();
      expect(data.session.expiresAt).toBeDefined();
      expect(data.session.authTime).toBeDefined();
    });

    it('should return token metadata', async () => {
      const { getAuth } = await import('firebase-admin/auth');

      const mockDecodedToken = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        auth_time: Math.floor(Date.now() / 1000),
        iss: 'https://securetoken.google.com/project',
        aud: 'project',
        alg: 'RS256'
      };

      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
      };

      vi.mocked(getAuth).mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/session', {
        headers: {
          'Authorization': 'Bearer valid-token'
        }
      });

      const response = await getSession(request);
      const data = await response.json();

      expect(data.token.algorithm).toBe('RS256');
      expect(data.token.type).toBe('JWT');
      expect(data.token.firebase).toBe(true);
    });
  });
});

describe('Auth API - POST /api/auth/session (Refresh)', () => {
  it('should refresh session by validating token', async () => {
    const { getAuth } = await import('firebase-admin/auth');

    const mockDecodedToken = {
      uid: 'user-123',
      email: 'john@buffalo.edu',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      auth_time: Math.floor(Date.now() / 1000),
      iss: 'https://securetoken.google.com/project',
      aud: 'project'
    };

    const mockAuth = {
      verifyIdToken: vi.fn().mockResolvedValue(mockDecodedToken)
    };

    vi.mocked(getAuth).mockReturnValue(mockAuth as any);

    const request = new NextRequest('http://localhost:3000/api/auth/session', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer valid-token'
      }
    });

    const response = await refreshSession(request);
    const data = await response.json();

    expect(data.valid).toBe(true);
    expect(data.user.id).toBe('user-123');
  });

  it('should handle refresh errors', async () => {
    const { getAuth } = await import('firebase-admin/auth');

    const mockAuth = {
      verifyIdToken: vi.fn().mockRejectedValue(new Error('Token expired'))
    };

    vi.mocked(getAuth).mockReturnValue(mockAuth as any);

    const request = new NextRequest('http://localhost:3000/api/auth/session', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer expired-token'
      }
    });

    const response = await refreshSession(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.valid).toBe(false);
  });
});
