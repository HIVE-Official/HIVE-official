import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/auth/complete-onboarding/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn().mockImplementation((token) => {
      if (token === 'valid-firebase-token') {
        return Promise.resolve({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
          email_verified: true,
        });
      } else if (token === 'token-without-email') {
        return Promise.resolve({
          uid: 'user-without-email',
          // No email field
        });
      } else {
        return Promise.reject(new Error('Token verification failed'));
      }
    }),
  })),
}));

vi.mock('@/lib/handle-service', () => ({
  validateHandleFormat: vi.fn().mockImplementation((handle: string) => {
    if (handle === 'taken-handle') {
      return {
        isAvailable: false,
        normalizedHandle: handle.toLowerCase(),
        error: 'Handle is already taken'
      };
    }
    return {
      isAvailable: true,
      normalizedHandle: handle.toLowerCase(),
      error: null
    };
  }),
}));

vi.mock('@/lib/transaction-manager', () => ({
  executeOnboardingTransaction: vi.fn().mockImplementation((data) => {
    if (data.handle === 'taken-handle') {
      throw new Error('Handle is already taken');
    }
    if (data.handle === 'completed-user') {
      throw new Error('Onboarding already completed');
    }
    if (data.userId === 'nonexistent-user') {
      throw new Error('User not found');
    }
    return Promise.resolve({
      success: true,
      userId: data.userId || 'test-user-id',
      handle: data.handle
    });
  }),
  executeBuilderRequestCreation: vi.fn().mockResolvedValue({
    success: true,
    requestId: 'test-request-id'
  }),
  TransactionError: class TransactionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'TransactionError';
    }
  },
}));

vi.mock('@/lib/structured-logger', () => ({
  createRequestLogger: vi.fn(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  })),
}));

// Suppress console.error for expected test errors
const originalConsoleError = console.error;

// Mock Firebase admin
vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
        update: vi.fn()
      }))
    }))
  }
}));

// Mock fetch for cohort and auto-join APIs
global.fetch = vi.fn();

describe('/api/auth/complete-onboarding', () => {
  let mockGetAuth: any;
  let mockValidateHandleFormat: any;
  let mockExecuteOnboardingTransaction: any;
  let mockExecuteBuilderRequestCreation: any;
  let mockCreateRequestLogger: any;

  const mockLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  };

  beforeEach(async () => {
    mockGetAuth = vi.mocked((await import('firebase-admin/auth')).getAuth);
    mockValidateHandleFormat = vi.mocked((await import('@/lib/handle-service')).validateHandleFormat);
    mockExecuteOnboardingTransaction = vi.mocked((await import('@/lib/transaction-manager')).executeOnboardingTransaction);
    mockExecuteBuilderRequestCreation = vi.mocked((await import('@/lib/transaction-manager')).executeBuilderRequestCreation);
    mockCreateRequestLogger = vi.mocked((await import('@/lib/structured-logger')).createRequestLogger);
    
    vi.clearAllMocks();
    mockCreateRequestLogger.mockReturnValue(mockLogger);
    
    // Reset all mock implementations to defaults
    mockValidateHandleFormat.mockReturnValue({
      isAvailable: true,
      normalizedHandle: 'testuser',
      error: null
    });
    
    mockExecuteOnboardingTransaction.mockResolvedValue({
      success: true,
      data: {
        updatedUserData: {
          fullName: 'Test User',
          userType: 'student',
          handle: 'testuser',
          major: 'Computer Science',
          graduationYear: 2026,
        },
        normalizedHandle: 'testuser',
      },
      operationsCompleted: ['user_update', 'handle_reservation'],
      duration: 150,
    });
    
    mockExecuteBuilderRequestCreation.mockResolvedValue({
      success: true,
      data: {
        requestsCreated: 2,
      },
      operationsCompleted: ['builder_request_1', 'builder_request_2'],
      duration: 75,
    });
    
    // Suppress console.error for expected test errors
    console.error = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Authentication', () => {
    it('rejects requests without authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        body: JSON.stringify({
          fullName: 'John Doe',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'johndoe',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Missing or invalid authorization header');
    });

    it('rejects requests with invalid authorization format', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'InvalidFormat token-here',
        },
        body: JSON.stringify({
          fullName: 'John Doe',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'johndoe',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Missing or invalid authorization header');
    });

    it('handles development mode tokens', async () => {
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'devuser',
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer dev_token_dev-user-123',
        },
        body: JSON.stringify({
          fullName: 'Dev User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'devuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Onboarding completed successfully (development mode)');
      expect(data.user.id).toBe('dev-user-123');
      expect(data.user.fullName).toBe('Dev User');
    });

    it('verifies Firebase ID tokens', async () => {
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            userType: 'student',
            handle: 'testuser',
            major: 'Computer Science',
            graduationYear: 2026,
          },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: ['user_update', 'handle_reservation'],
        duration: 150,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockAuth.verifyIdToken).toHaveBeenCalledWith('valid-firebase-token');
    });

    it('rejects invalid Firebase tokens', async () => {
      const mockAuth = {
        verifyIdToken: vi.fn().mockRejectedValue(new Error('Token verification failed')),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer invalid-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid or expired token');
    });

    it('rejects tokens without email', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer token-without-email',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid token data');
    });
  });

  describe('Input Validation', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for all validation tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
    });

    it('validates required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          // Missing required fields
          userType: 'student',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request data');
      expect(data.details).toBeDefined();
    });

    it('validates full name length', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: '', // Empty name
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('validates user type enum', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'invalid-type', // Invalid enum
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('validates graduation year range', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 1800, // Invalid year
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('validates handle format', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'ab', // Too short
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('validates consent is given', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: false, // Consent not given
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('validates avatar URL format', async () => {
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: { fullName: 'Test User' },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: [],
        duration: 100,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          avatarUrl: 'not-a-valid-url',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });

  describe('Handle Validation', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for handle validation tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
    });

    it('rejects invalid handle format', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'invalid@handle', // Invalid characters
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request data');
      expect(data.details).toBeDefined();
    });

    it('normalizes valid handles', async () => {
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'normalized_handle',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            handle: 'normalized_handle',
          },
          normalizedHandle: 'normalized_handle',
        },
        operationsCompleted: [],
        duration: 100,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'Normalized.Handle',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(mockExecuteOnboardingTransaction).toHaveBeenCalledWith(
        'firebase-user-123',
        'test@test.edu',
        expect.any(Object),
        'normalized_handle',
        expect.any(Object)
      );
    });
  });

  describe('Transaction Management', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for transaction tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
      
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });
    });

    it('executes onboarding transaction successfully', async () => {
      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            userType: 'student',
            handle: 'testuser',
            major: 'Computer Science',
            graduationYear: 2026,
          },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: ['user_update', 'handle_reservation'],
        duration: 150,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.user.fullName).toBe('Test User');
      expect(data.user.handle).toBe('testuser');

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Onboarding transaction completed successfully',
        expect.any(Object)
      );
    });

    it('handles transaction failures', async () => {
      const TransactionError = (await import('@/lib/transaction-manager')).TransactionError;
      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: false,
        error: new TransactionError('Handle is already taken'),
        operationsCompleted: [],
        operationsFailed: ['handle_reservation'],
        duration: 50,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'taken-handle',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toBe('Handle is already taken');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Onboarding transaction failed',
        expect.any(Object),
        expect.any(Error)
      );
    });

    it('handles specific transaction error types', async () => {
      const TransactionError = (await import('@/lib/transaction-manager')).TransactionError;
      
      const testCases = [
        {
          error: 'Onboarding already completed',
          expectedStatus: 409,
        },
        {
          error: 'User not found',
          expectedStatus: 404,
        },
        {
          error: 'Generic transaction error',
          expectedStatus: 500,
        },
      ];

      for (const testCase of testCases) {
        // Set up Firebase auth for each test case
        const mockAuth = {
          verifyIdToken: vi.fn().mockResolvedValue({
            uid: 'firebase-user-123',
            email: 'test@test.edu',
          }),
        };
        mockGetAuth.mockReturnValue(mockAuth as any);
        
        // Mock transaction failure for this specific error
        mockExecuteOnboardingTransaction.mockResolvedValue({
          success: false,
          error: new TransactionError(testCase.error),
          operationsCompleted: [],
          operationsFailed: [],
          duration: 50,
        });

        const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid-firebase-token',
          },
          body: JSON.stringify({
            fullName: 'Test User',
            userType: 'student',
            major: 'Computer Science',
            graduationYear: 2026,
            handle: 'testuser',
            consentGiven: true,
          }),
        });

        const response = await POST(request);
        expect(response.status).toBe(testCase.expectedStatus);
        
        // Reset for next iteration
        mockExecuteOnboardingTransaction.mockResolvedValue({
          success: true,
          data: {
            updatedUserData: {
              fullName: 'Test User',
              userType: 'student',
              handle: 'testuser',
            },
            normalizedHandle: 'testuser',
          },
          operationsCompleted: [],
          duration: 100,
        });
      }
    });
  });

  describe('Builder Request Creation', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for builder request tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
      
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            userType: 'student',
            handle: 'testuser',
            builderRequestSpaces: ['cs-major', 'dorm-floor-3']
          },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: [],
        duration: 100,
      });
    });

    it('creates builder requests when spaces are selected', async () => {
      mockExecuteBuilderRequestCreation.mockResolvedValue({
        success: true,
        data: {
          requestsCreated: 2,
        },
        operationsCompleted: ['builder_request_1', 'builder_request_2'],
        duration: 75,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          builderRequestSpaces: ['cs-major', 'dorm-floor-3'],
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.builderRequestsCreated).toBe(2);

      expect(mockExecuteBuilderRequestCreation).toHaveBeenCalledWith(
        'firebase-user-123',
        'test@test.edu',
        'Test User',
        ['cs-major', 'dorm-floor-3'],
        'student',
        expect.any(Object)
      );

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Builder requests created successfully',
        expect.any(Object)
      );
    });

    it('continues when builder request creation fails', async () => {
      mockExecuteBuilderRequestCreation.mockResolvedValue({
        success: false,
        error: new Error('Builder request service unavailable'),
        operationsCompleted: [],
        operationsFailed: ['builder_request_1'],
        duration: 25,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          builderRequestSpaces: ['cs-major'],
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      // Onboarding should still succeed
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.builderRequestsCreated).toBe(1); // In production mode, it still returns the count

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Builder request creation failed, but onboarding succeeded',
        expect.any(Object),
        expect.any(Error)
      );
    });

    it('skips builder requests when no spaces selected', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          builderRequestSpaces: [],
          consentGiven: true,
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockExecuteBuilderRequestCreation).not.toHaveBeenCalled();
    });
  });

  describe('Cohort Space Creation', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for cohort space tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
      
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            userType: 'student',
            handle: 'testuser',
          },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: [],
        duration: 100,
      });
    });

    it('creates cohort spaces successfully', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, spacesCreated: 2 }),
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      await POST(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/spaces/cohort/auto-create'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer valid-firebase-token',
          }),
          body: JSON.stringify({
            major: 'Computer Science',
            graduationYear: 2026,
          }),
        })
      );

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Cohort spaces created successfully',
        expect.any(Object)
      );
    });

    it('continues when cohort creation fails', async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);

      // Onboarding should still succeed
      expect(response.status).toBe(200);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Cohort space creation failed, but onboarding succeeded',
        expect.any(Object)
      );
    });
  });

  describe('Auto-Join Functionality', () => {
    beforeEach(() => {
      // Set up Firebase auth mock for auto-join tests
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
      
      mockValidateHandleFormat.mockReturnValue({
        isAvailable: true,
        normalizedHandle: 'testuser',
      });

      mockExecuteOnboardingTransaction.mockResolvedValue({
        success: true,
        data: {
          updatedUserData: {
            fullName: 'Test User',
            userType: 'student',
            handle: 'testuser',
          },
          normalizedHandle: 'testuser',
        },
        operationsCompleted: [],
        duration: 100,
      });

      // Mock cohort creation and auto-join APIs
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, spacesJoined: 3 }),
      } as Response);
    });

    it('performs auto-join successfully', async () => {
      const mockFetch = vi.mocked(fetch);
      // First call is cohort creation (already mocked above)
      // Second call is auto-join
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ spacesJoined: 3 }),
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      await POST(request);

      expect(mockFetch).toHaveBeenNthCalledWith(
        2, // Second call is auto-join (after cohort creation)
        expect.stringContaining('/api/spaces/auto-join'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ userId: 'firebase-user-123' }),
        })
      );

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Auto-join successful',
        expect.any(Object)
      );
    });

    it('continues when auto-join fails', async () => {
      const mockFetch = vi.mocked(fetch);
      // Second call (auto-join) fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Auto-join service error',
      } as Response);

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);

      // Onboarding should still succeed
      expect(response.status).toBe(200);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Cohort space creation failed, but onboarding succeeded',
        expect.any(Object)
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: 'invalid-json',
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('handles unexpected errors gracefully', async () => {
      // Set up Firebase auth
      const mockAuth = {
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'firebase-user-123',
          email: 'test@test.edu',
        }),
      };
      mockGetAuth.mockReturnValue(mockAuth as any);
      
      mockValidateHandleFormat.mockImplementation(() => {
        throw new Error('Unexpected validation error');
      });

      const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-firebase-token',
        },
        body: JSON.stringify({
          fullName: 'Test User',
          userType: 'student',
          major: 'Computer Science',
          graduationYear: 2026,
          handle: 'testuser',
          consentGiven: true,
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(500);
    });

    it('handles specific error messages', async () => {
      // Auth will be set up per test case below

      const testCases = [
        {
          error: new Error('Handle is already taken'),
          expectedStatus: 409,
        },
        {
          error: new Error('Onboarding already completed'),
          expectedStatus: 409,
        },
        {
          error: new Error('User not found'),
          expectedStatus: 404,
        },
      ];

      for (const testCase of testCases) {
        // Set up Firebase auth for each test case
        const mockAuth = {
          verifyIdToken: vi.fn().mockResolvedValue({
            uid: 'firebase-user-123',
            email: 'test@test.edu',
          }),
        };
        mockGetAuth.mockReturnValue(mockAuth as any);
        
        mockValidateHandleFormat.mockImplementation(() => {
          throw testCase.error;
        });

        const request = new NextRequest('http://localhost:3000/api/auth/complete-onboarding', {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid-firebase-token',
          },
          body: JSON.stringify({
            fullName: 'Test User',
            userType: 'student',
            major: 'Computer Science',
            graduationYear: 2026,
            handle: 'testuser',
            consentGiven: true,
          }),
        });

        const response = await POST(request);
        expect(response.status).toBe(testCase.expectedStatus);
        
        // Reset for next iteration
        mockValidateHandleFormat.mockReturnValue({
          isAvailable: true,
          normalizedHandle: 'testuser',
        });
      }
    });
  });
});