import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/auth/send-magic-link/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(),
      })),
    })),
  },
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    generateSignInWithEmailLink: vi.fn(),
    createCustomToken: vi.fn(),
  })),
}));

vi.mock('@/lib/email', () => ({
  sendMagicLinkEmail: vi.fn(),
}));

vi.mock('@/lib/production-auth', () => ({
  auditAuthEvent: vi.fn(),
}));

vi.mock('@/lib/env', () => {
  // Create state inside the mock to avoid hoisting issues
  const mockEnvState = {
    currentEnvironment: 'test' as 'development' | 'production' | 'staging',
    isDevelopment: true,
    isProduction: false,
    isStaging: false,
    isFirebaseAdminConfigured: true,
  };
  
  // Expose state globally so we can control it from tests
  (globalThis as any).__mockSendMagicLinkEnvState = mockEnvState;
  
  return {
    get currentEnvironment() { return mockEnvState.currentEnvironment; },
    get isDevelopment() { return mockEnvState.isDevelopment; },
    get isProduction() { return mockEnvState.isProduction; },
    get isStaging() { return mockEnvState.isStaging; },
    get isFirebaseAdminConfigured() { return mockEnvState.isFirebaseAdminConfigured; },
    env: {
      NODE_ENV: 'test',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
      FIREBASE_PROJECT_ID: 'test-project',
    },
    getFirebaseConfig: vi.fn(() => ({
      apiKey: 'test-api-key',
      authDomain: 'test.firebaseapp.com',
      projectId: 'test-project',
    })),
  };
});

vi.mock('@/lib/secure-input-validation', () => ({
  validateWithSecurity: vi.fn(),
  ApiSchemas: {
    magicLinkRequest: {
      shape: {
        email: {
          parse: vi.fn((val: string) => val),
        }
      }
    }
  }
}));

vi.mock('@/lib/secure-rate-limiter', () => ({
  enforceRateLimit: vi.fn(),
}));

vi.mock('@/lib/dev-auth-helper', () => ({
  isDevUser: vi.fn(),
  validateDevSchool: vi.fn(),
  createDevSession: vi.fn(),
}));

vi.mock('@hive/core', () => ({
  getDefaultActionCodeSettings: vi.fn(() => ({
    url: 'http://localhost:3000/auth/verify',
    handleCodeInApp: true,
  })),
  validateEmailDomain: vi.fn(),
}));

// Helper function to set environment for specific tests
function setTestEnvironment(env: 'development' | 'production' | 'staging') {
  const mockEnvState = (globalThis as any).__mockSendMagicLinkEnvState;
  if (mockEnvState) {
    mockEnvState.currentEnvironment = env;
    mockEnvState.isDevelopment = env === 'development';
    mockEnvState.isProduction = env === 'production';
    mockEnvState.isStaging = env === 'staging';
  }
}

describe('/api/auth/send-magic-link', () => {
  let mockDbAdmin: any;
  let mockGetAuth: any;
  let mockSendEmail: any;
  let mockAuditAuth: any;
  let mockValidateWithSecurity: any;
  let mockEnforceRateLimit: any;
  let mockIsDevUser: any;
  let mockValidateDevSchool: any;
  let mockCreateDevSession: any;
  let mockValidateEmailDomain: any;

  beforeEach(async () => {
    mockDbAdmin = vi.mocked((await import('@/lib/firebase-admin')).dbAdmin);
    mockGetAuth = vi.mocked((await import('firebase-admin/auth')).getAuth);
    mockSendEmail = vi.mocked((await import('@/lib/email')).sendMagicLinkEmail);
    mockAuditAuth = vi.mocked((await import('@/lib/production-auth')).auditAuthEvent);
    mockValidateWithSecurity = vi.mocked((await import('@/lib/secure-input-validation')).validateWithSecurity);
    mockEnforceRateLimit = vi.mocked((await import('@/lib/secure-rate-limiter')).enforceRateLimit);
    mockIsDevUser = vi.mocked((await import('@/lib/dev-auth-helper')).isDevUser);
    mockValidateDevSchool = vi.mocked((await import('@/lib/dev-auth-helper')).validateDevSchool);
    mockCreateDevSession = vi.mocked((await import('@/lib/dev-auth-helper')).createDevSession);
    mockValidateEmailDomain = vi.mocked((await import('@hive/core')).validateEmailDomain);
  });

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockEnforceRateLimit.mockResolvedValue({
      allowed: true,
      error: '',
      status: 200,
      headers: {},
    });

    mockValidateWithSecurity.mockResolvedValue({
      success: true,
      data: {
        email: 'test@test.edu',
        schoolId: 'test-university',
      },
      securityLevel: 'safe',
    });

    mockIsDevUser.mockReturnValue(false);
    mockValidateDevSchool.mockReturnValue(false);
  });

  afterEach(() => {
    vi.resetAllMocks();
    // Reset environment to test for next test
    setTestEnvironment('test' as any);
  });

  describe('Rate Limiting', () => {
    it('blocks requests that exceed rate limit', async () => {
      mockEnforceRateLimit.mockResolvedValue({
        allowed: false,
        error: 'Rate limit exceeded',
        status: 429,
        headers: { 'Retry-After': '60' },
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toBe('Rate limit exceeded');
      expect(response.headers.get('Retry-After')).toBe('60');
    });
  });

  describe('Input Validation', () => {
    it('rejects invalid input data', async () => {
      mockValidateWithSecurity.mockResolvedValue({
        success: false,
        securityLevel: 'dangerous',
        errors: [{ code: 'INVALID_EMAIL', message: 'Invalid email format' }],
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Request validation failed');
      expect(mockAuditAuth).toHaveBeenCalledWith('security_threat', expect.any(Object), expect.any(Object));
    });

    it('rejects malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: 'invalid-json',
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });

  describe('Development User Handling', () => {
    it('handles development users successfully', async () => {
      mockIsDevUser.mockReturnValue(true);
      mockValidateDevSchool.mockReturnValue(true);
      mockCreateDevSession.mockResolvedValue({
        success: true,
        user: {
          userId: 'dev-user-123',
          handle: 'devuser',
          role: 'student',
        },
        tokens: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'dev@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.dev).toBe(true);
      expect(data.user.userId).toBe('dev-user-123');
      expect(mockAuditAuth).toHaveBeenCalledWith('success', expect.any(Object), expect.objectContaining({
        operation: 'dev_auth_success',
      }));
    });

    it('handles failed development session creation', async () => {
      mockIsDevUser.mockReturnValue(true);
      mockValidateDevSchool.mockReturnValue(true);
      mockCreateDevSession.mockResolvedValue({
        success: false,
        error: 'Failed to create dev session',
      });

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'dev@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Failed to create dev session');
    });
  });

  describe('School Validation', () => {
    it('validates school exists and is active', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('http://localhost:3000/auth/verify?oob=test'),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockSendEmail.mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Magic link sent to your email address');
    });

    it('rejects inactive schools', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'inactive.edu',
          name: 'Inactive University',
          active: false,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@inactive.edu',
          schoolId: 'inactive-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('School not found or inactive');
    });

    it('rejects non-existent schools', async () => {
      const mockSchoolDoc = {
        exists: false,
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@nonexistent.edu',
          schoolId: 'nonexistent-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('School not found or inactive');
    });
  });

  describe('Email Domain Validation', () => {
    it('validates email domain matches school', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
          name: 'University at Buffalo',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(false);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@gmail.com',
          schoolId: 'ub',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email must be from buffalo.edu domain');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'domain_mismatch',
      }));
    });
  });

  describe('Firebase Magic Link Generation', () => {
    it('generates magic link successfully', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('http://localhost:3000/auth/verify?oob=test-code'),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockSendEmail.mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);

      expect(mockAuth.generateSignInWithEmailLink).toHaveBeenCalledWith(
        'test@test.edu',
        expect.objectContaining({
          url: 'http://localhost:3000/auth/verify',
          handleCodeInApp: true,
        })
      );

      expect(mockSendEmail).toHaveBeenCalledWith({
        to: 'test@test.edu',
        magicLink: 'http://localhost:3000/auth/verify?oob=test-code',
        schoolName: 'Test University',
      });
    });

    it('handles Firebase Dynamic Links not configured (development)', async () => {
      // Set development environment
      setTestEnvironment('development');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const firebaseError = new Error('DYNAMIC_LINK_NOT_ACTIVATED');
      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockRejectedValue(firebaseError),
        createCustomToken: vi.fn().mockResolvedValue('custom-token-123'),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockSendEmail.mockResolvedValue(undefined);

      // Set process.env for this test
      const originalEnv = process.env.NEXT_PUBLIC_APP_URL;
      process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(mockAuth.createCustomToken).toHaveBeenCalledWith('test_at_test_dot_edu');
      expect(mockSendEmail).toHaveBeenCalledWith({
        to: 'test@test.edu',
        magicLink: expect.stringContaining('token=custom-token-123'),
        schoolName: 'Test University',
      });

      // Restore original env
      process.env.NEXT_PUBLIC_APP_URL = originalEnv;
    });

    it('handles Firebase errors in production', async () => {
      // Set production environment
      setTestEnvironment('production');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const firebaseError = new Error('Firebase service error');
      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockRejectedValue(firebaseError),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Unable to generate magic link');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'firebase_generation_failed',
      }));
    });
  });

  describe('Email Sending', () => {
    it('handles email sending failures', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('http://localhost:3000/auth/verify?oob=test'),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockSendEmail.mockRejectedValue(new Error('Email service unavailable'));

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Unable to send email');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'email_sending_failed',
      }));
    });
  });

  describe('Audit Logging', () => {
    it('logs successful operations', async () => {
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
          name: 'Test University',
          active: true,
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      mockValidateEmailDomain.mockReturnValue(true);

      const mockAuth = {
        generateSignInWithEmailLink: vi.fn().mockResolvedValue('http://localhost:3000/auth/verify?oob=test'),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockSendEmail.mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      await POST(request);

      expect(mockAuditAuth).toHaveBeenCalledWith('success', expect.any(Object), expect.objectContaining({
        operation: 'send_magic_link',
      }));
    });

    it('logs failed operations', async () => {
      const mockSchoolDoc = {
        exists: false,
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@nonexistent.edu',
          schoolId: 'nonexistent',
        }),
      });

      await POST(request);

      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        operation: 'send_magic_link',
        error: 'invalid_school',
      }));
    });
  });

  describe('Error Recovery', () => {
    it('handles database connection errors', async () => {
      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockRejectedValue(new Error('Database connection failed')),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);

      // The current implementation catches database errors in validateSchool() and returns null,
      // which results in a 404 "School not found or inactive" response.
      // This is the expected behavior based on the implementation.
      expect(response.status).toBe(404);
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.any(Object));
    });

    it('handles unexpected errors gracefully', async () => {
      mockValidateWithSecurity.mockRejectedValue(new Error('Unexpected validation error'));

      const request = new NextRequest('http://localhost:3000/api/auth/send-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.any(Object));
    });
  });
});