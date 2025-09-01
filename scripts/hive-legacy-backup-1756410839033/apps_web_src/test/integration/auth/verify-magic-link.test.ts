import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/auth/verify-magic-link/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
      })),
    })),
  },
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    checkActionCode: vi.fn().mockResolvedValue({
      data: { email: 'test@test.edu' },
    }),
    applyActionCode: vi.fn().mockResolvedValue(undefined),
    getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
    createUser: vi.fn().mockResolvedValue({
      uid: 'new-user-123',
      email: 'test@test.edu',
      emailVerified: true,
    }),
    updateUser: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock('@/lib/production-auth', () => ({
  auditAuthEvent: vi.fn(),
}));

vi.mock('@/lib/env', () => {
  // Create state inside the mock to avoid hoisting issues
  const mockEnvState = {
    currentEnvironment: 'development' as 'development' | 'production' | 'staging',
    isDevelopment: true,
    isProduction: false,
    isStaging: false,
  };
  
  // Expose state globally so we can control it from tests
  (globalThis as any).__mockEnvState = mockEnvState;
  
  return {
    get currentEnvironment() { return mockEnvState.currentEnvironment; },
    get isDevelopment() { return mockEnvState.isDevelopment; },
    get isProduction() { return mockEnvState.isProduction; },
    get isStaging() { return mockEnvState.isStaging; },
    isFirebaseAdminConfigured: true,
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
    magicLinkVerify: {
      shape: {
        email: {
          parse: vi.fn((val: string) => val),
        },
        token: {
          parse: vi.fn((val: string) => val),
        }
      }
    }
  }
}));

vi.mock('@/lib/secure-rate-limiter', () => ({
  enforceRateLimit: vi.fn(),
}));

// Helper function to set environment for specific tests
function setTestEnvironment(env: 'development' | 'production' | 'staging') {
  const mockEnvState = (globalThis as any).__mockEnvState;
  if (mockEnvState) {
    mockEnvState.currentEnvironment = env;
    mockEnvState.isDevelopment = env === 'development';
    mockEnvState.isProduction = env === 'production';
    mockEnvState.isStaging = env === 'staging';
  }
}

describe('/api/auth/verify-magic-link', () => {
  let mockDbAdmin: any;
  let mockGetAuth: any;
  let mockAuditAuth: any;
  let mockValidateWithSecurity: any;
  let mockEnforceRateLimit: any;

  beforeEach(async () => {
    mockDbAdmin = vi.mocked((await import('@/lib/firebase-admin')).dbAdmin);
    mockGetAuth = vi.mocked((await import('firebase-admin/auth')).getAuth);
    mockAuditAuth = vi.mocked((await import('@/lib/production-auth')).auditAuthEvent);
    mockValidateWithSecurity = vi.mocked((await import('@/lib/secure-input-validation')).validateWithSecurity);
    mockEnforceRateLimit = vi.mocked((await import('@/lib/secure-rate-limiter')).enforceRateLimit);
    
    vi.clearAllMocks();

    // Default mock implementations
    mockEnforceRateLimit.mockResolvedValue({
      allowed: true,
      error: '',
      status: 200,
      headers: {},
    });

    // Make validation mock dynamic to handle different test data
    mockValidateWithSecurity.mockImplementation((data) => Promise.resolve({
      success: true,
      data: {
        email: data.email,
        schoolId: data.schoolId,
        token: data.token,
      },
      securityLevel: 'safe',
    }));

    // Default Firebase Admin Auth mock with dynamic behavior
    const defaultAuth = {
      checkActionCode: vi.fn().mockImplementation((token) => {
        // Extract email from current test context or use default
        const currentTestEmail = (globalThis as any).__currentTestEmail || 'test@test.edu';
        return Promise.resolve({
          data: { email: currentTestEmail },
        });
      }),
      applyActionCode: vi.fn().mockResolvedValue(undefined),
      getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
      createUser: vi.fn().mockImplementation((userData) => Promise.resolve({
        uid: 'new-user-123',
        email: userData.email,
        emailVerified: userData.emailVerified || true,
      })),
      updateUser: vi.fn().mockResolvedValue(undefined),
    };
    mockGetAuth.mockReturnValue(defaultAuth as any);

    // Default Firestore mock
    mockDbAdmin.collection.mockReturnValue({
      doc: vi.fn(() => ({
        get: vi.fn().mockResolvedValue({ exists: false }),
        set: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
      })),
    } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
    // Reset environment to development for next test
    setTestEnvironment('development');
  });

  describe('Rate Limiting', () => {
    it('blocks requests that exceed rate limit', async () => {
      mockEnforceRateLimit.mockResolvedValue({
        allowed: false,
        error: 'Too many authentication attempts',
        status: 429,
        headers: { 'Retry-After': '300' },
      });

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'test-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toBe('Too many authentication attempts');
      expect(response.headers.get('Retry-After')).toBe('300');
    });
  });

  describe('Input Validation', () => {
    it('rejects malicious input', async () => {
      mockValidateWithSecurity.mockResolvedValue({
        success: false,
        securityLevel: 'dangerous',
        errors: [{ code: 'MALICIOUS_INPUT', message: 'Dangerous input detected' }],
      });

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: '<script>alert("xss")</script>',
          schoolId: 'test-university',
          token: 'test-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Request validation failed');
      expect(mockAuditAuth).toHaveBeenCalledWith('security_threat', expect.any(Object), expect.any(Object));
    });

    it('validates required fields', async () => {
      mockValidateWithSecurity.mockResolvedValue({
        success: false,
        securityLevel: 'moderate',
        errors: [{ code: 'MISSING_FIELD', message: 'Email is required' }],
      });

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          schoolId: 'test-university',
          token: 'test-token',
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });

  describe('School Domain Validation', () => {
    it('validates school domain in production', async () => {
      // Set production environment
      setTestEnvironment('production');

      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'buffalo.edu',
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@gmail.com', // Wrong domain
          schoolId: 'ub',
          token: 'test-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email domain does not match school');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'invalid_school_domain',
      }));
    });

    it('skips domain validation in development', async () => {
      // Already mocked as 'test' environment, which should skip validation
      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@gmail.com',
          schoolId: 'test-university',
          token: 'test-token',
        }),
      });

      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'test@gmail.com' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user-123',
          email: 'test@gmail.com',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const response = await POST(request);
      expect(response.status).toBe(200);
    });
  });

  describe('Magic Link Token Verification', () => {
    it('verifies valid Firebase action code', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'test@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user-123',
          email: 'test@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'valid-token-123',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.needsOnboarding).toBe(true);
      expect(data.userId).toBe('new-user-123');

      expect(mockAuth.checkActionCode).toHaveBeenCalledWith('valid-token-123');
      expect(mockAuth.applyActionCode).toHaveBeenCalledWith('valid-token-123');
    });

    it('handles custom tokens in development', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockRejectedValue(new Error('Invalid action code')),
        applyActionCode: vi.fn().mockResolvedValue(undefined),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'dev-user-123',
          email: 'dev@test.edu',
          emailVerified: true,
        }),
        updateUser: vi.fn().mockResolvedValue(undefined),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'dev@test.edu',
          schoolId: 'test-university',
          token: 'custom-dev-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.userId).toBe('dev-user-123');

      // Should not call applyActionCode for custom tokens
      expect(mockAuth.applyActionCode).not.toHaveBeenCalled();
    });

    it('rejects invalid tokens in production', async () => {
      // Set production environment
      setTestEnvironment('production');

      const mockAuth = {
        checkActionCode: vi.fn().mockRejectedValue(new Error('Invalid or expired action code')),
        applyActionCode: vi.fn().mockResolvedValue(undefined),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user-123',
          email: 'test@test.edu',
          emailVerified: true,
        }),
        updateUser: vi.fn().mockResolvedValue(undefined),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      // Mock school doc for domain validation in production
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
        }),
      };
      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'invalid-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid or expired magic link');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'invalid_magic_link_token',
      }));
    });

    it('validates email matches token', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'different@test.edu' }, // Different from request
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email mismatch');
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        error: 'email_mismatch',
      }));
    });
  });

  describe('User Management', () => {
    it('creates new user when not found', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'newuser@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user-456',
          email: 'newuser@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'newuser@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.needsOnboarding).toBe(true);
      expect(data.userId).toBe('new-user-456');

      expect(mockAuth.createUser).toHaveBeenCalledWith({
        email: 'newuser@test.edu',
        emailVerified: true,
      });
    });

    it('uses existing user when found', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'existing@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockResolvedValue({
          uid: 'existing-user-789',
          email: 'existing@test.edu',
          emailVerified: true,
        }),
        createUser: vi.fn(), // Add this so the test can assert it wasn't called
        updateUser: vi.fn(),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const mockUserDoc = {
        exists: true,
        data: () => ({
          id: 'existing-user-789',
          email: 'existing@test.edu',
          fullName: 'Existing User',
          handle: 'existinguser',
        }),
      };

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockUserDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'existing@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.needsOnboarding).toBe(false);
      expect(data.userId).toBe('existing-user-789');

      expect(mockAuth.createUser).not.toHaveBeenCalled();
    });

    it('verifies email for existing users', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'unverified@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockResolvedValue({
          uid: 'unverified-user',
          email: 'unverified@test.edu',
          emailVerified: false, // Not verified
        }),
        updateUser: vi.fn(),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'unverified@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      await POST(request);

      expect(mockAuth.updateUser).toHaveBeenCalledWith('unverified-user', {
        emailVerified: true,
      });
    });
  });

  describe('Firestore User Document Management', () => {
    it('creates Firestore document for new users', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'newuser@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user-123',
          email: 'newuser@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const mockSet = vi.fn();
      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: mockSet,
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'newuser@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      await POST(request);

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'new-user-123',
          email: 'newuser@test.edu',
          schoolId: 'test-university',
          emailVerified: true,
          fullName: '',
          handle: '',
          major: '',
          isPublic: false,
        })
      );
    });

    it('skips document creation for existing users', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'existing@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockResolvedValue({
          uid: 'existing-user',
          email: 'existing@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const mockSet = vi.fn();
      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({ id: 'existing-user' }),
          }),
          set: mockSet,
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'existing@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      await POST(request);

      expect(mockSet).not.toHaveBeenCalled();
    });
  });

  describe('Audit Logging', () => {
    it('logs successful verifications', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'test@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user',
          email: 'test@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn(),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      await POST(request);

      expect(mockAuditAuth).toHaveBeenCalledWith('success', expect.any(Object), expect.objectContaining({
        userId: 'new-user',
        operation: 'verify_magic_link',
      }));
    });

    it('logs failed verifications', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockRejectedValue(new Error('Invalid token')),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'invalid-token',
        }),
      });

      await POST(request);

      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.objectContaining({
        operation: 'verify_magic_link',
      }));
    });
  });

  describe('Error Handling', () => {
    it('handles Firebase Auth errors gracefully', async () => {
      // Set production environment to avoid development bypass
      setTestEnvironment('production');
      
      const mockAuth = {
        checkActionCode: vi.fn().mockRejectedValue(new Error('Firebase service unavailable')),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      // Mock school doc for production domain validation
      const mockSchoolDoc = {
        exists: true,
        data: () => ({
          domain: 'test.edu',
        }),
      };
      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue(mockSchoolDoc),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'test-token',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.any(Object));
    });

    it('handles Firestore errors during user creation', async () => {
      const mockAuth = {
        checkActionCode: vi.fn().mockResolvedValue({
          data: { email: 'test@test.edu' },
        }),
        applyActionCode: vi.fn(),
        getUserByEmail: vi.fn().mockRejectedValue(new Error('User not found')),
        createUser: vi.fn().mockResolvedValue({
          uid: 'new-user',
          email: 'test@test.edu',
          emailVerified: true,
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockDbAdmin.collection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn().mockResolvedValue({ exists: false }),
          set: vi.fn().mockRejectedValue(new Error('Firestore write failed')),
        })),
      } as any);

      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.edu',
          schoolId: 'test-university',
          token: 'valid-token',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
      expect(mockAuditAuth).toHaveBeenCalledWith('failure', expect.any(Object), expect.any(Object));
    });

    it('handles malformed JSON requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/verify-magic-link', {
        method: 'POST',
        body: 'invalid-json',
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});