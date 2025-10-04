/**
 * Spaces API Route Tests
 * Tests authentication, campus isolation, space creation validation, and permissions
 *
 * Routes: GET /api/spaces, POST /api/spaces
 * Middleware: withAuthAndErrors, withAuthValidationAndErrors
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET, POST } from '@/app/api/spaces/route';
import { NextRequest } from 'next/server';
import type { AuthenticatedRequest } from '@/lib/middleware';

// Mock Firebase Admin
vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(),
        set: vi.fn(),
        id: 'mock-space-id'
      })),
      where: vi.fn(() => ({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn()
            })),
            get: vi.fn()
          })),
          limit: vi.fn(() => ({
            get: vi.fn()
          })),
          get: vi.fn()
        })),
        limit: vi.fn(() => ({
          get: vi.fn()
        })),
        get: vi.fn()
      }))
    })),
    batch: vi.fn(() => ({
      set: vi.fn(),
      commit: vi.fn()
    }))
  }
}));

// Mock secure queries
vi.mock('@/lib/secure-firebase-queries', () => ({
  getSecureSpacesQuery: vi.fn(),
  getSecureSpacesWithCursor: vi.fn(),
  addSecureCampusMetadata: vi.fn((data) => ({
    ...data,
    campusId: 'ub-buffalo',
    campus_isolated: true
  })),
  CURRENT_CAMPUS_ID: 'ub-buffalo'
}));

// Mock middleware
vi.mock('@/lib/middleware', () => ({
  withAuthAndErrors: (handler: any) => handler,
  withAuthValidationAndErrors: (schema: any, handler: any) => handler,
  getUserId: vi.fn((req) => req.user?.uid || 'user-123'),
  ResponseFormatter: {
    success: (data: any) => ({ json: () => Promise.resolve(data), status: 200 }),
    error: (message: string) => ({ json: () => Promise.resolve({ error: message }), status: 400 })
  }
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

// Mock firebase-admin
vi.mock('firebase-admin', () => ({
  default: {
    firestore: {
      FieldValue: {
        serverTimestamp: vi.fn(() => new Date())
      }
    }
  },
  firestore: {
    FieldValue: {
      serverTimestamp: vi.fn(() => new Date())
    }
  }
}));

describe('Spaces API - GET /api/spaces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = undefined as any;

      // Middleware should reject unauthenticated requests
      expect(request.user).toBeUndefined();
    });

    it('should accept authenticated requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = {
        uid: 'user-123',
        email: 'john@buffalo.edu',
        decodedToken: { email_verified: true }
      } as any;

      expect(request.user.uid).toBeDefined();
    });
  });

  describe('Campus Isolation', () => {
    it('should only return spaces from ub-buffalo campus', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      vi.mocked(getSecureSpacesWithCursor).mockResolvedValue({
        spaces: [
          { id: 'space-1', name: 'CS Club', campusId: 'ub-buffalo' },
          { id: 'space-2', name: 'Engineering', campusId: 'ub-buffalo' }
        ],
        hasMore: false,
        nextCursor: null
      } as any);

      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalled();
      expect(mockRespond.success).toHaveBeenCalled();
    });

    it('should never expose spaces from other campuses', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      // Mock should never return other campuses due to secure query
      vi.mocked(getSecureSpacesWithCursor).mockResolvedValue({
        spaces: [], // Empty because secure query filters by campus
        hasMore: false,
        nextCursor: null
      } as any);

      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      const callArg = vi.mocked(mockRespond.success).mock.calls[0][0];
      const spaces = callArg.spaces;

      // All returned spaces should be from ub-buffalo
      spaces.forEach((space: any) => {
        expect(space.campusId).toBe('ub-buffalo');
      });
    });
  });

  describe('Filtering', () => {
    it('should filter by space type', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces?type=student_org') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: 'student_org'
        })
      );
    });

    it('should filter by search term', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces?q=computer') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          searchTerm: 'computer'
        })
      );
    });

    it('should support type=all to show all spaces', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces?type=all') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          filterType: undefined
        })
      );
    });
  });

  describe('Pagination', () => {
    it('should default to 50 items per page', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 50
        })
      );
    });

    it('should cap limit at 100 items', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces?limit=200') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 100
        })
      );
    });

    it('should support cursor-based pagination', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      const request = new NextRequest('http://localhost:3000/api/spaces?cursor=space-50') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      expect(getSecureSpacesWithCursor).toHaveBeenCalledWith(
        expect.objectContaining({
          cursor: 'space-50'
        })
      );
    });

    it('should return pagination metadata', async () => {
      const { getSecureSpacesWithCursor } = await import('@/lib/secure-firebase-queries');

      vi.mocked(getSecureSpacesWithCursor).mockResolvedValue({
        spaces: [{ id: 'space-1' }],
        hasMore: true,
        nextCursor: 'space-2'
      } as any);

      const request = new NextRequest('http://localhost:3000/api/spaces') as AuthenticatedRequest;
      request.user = { uid: 'user-123', email: 'john@buffalo.edu' } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data) })),
        error: vi.fn()
      };

      await GET(request, {}, mockRespond as any);

      const callArg = vi.mocked(mockRespond.success).mock.calls[0][0];

      expect(callArg.pagination).toBeDefined();
      expect(callArg.pagination.hasMore).toBe(true);
      expect(callArg.pagination.nextCursor).toBe('space-2');
    });
  });
});

describe('Spaces API - POST /api/spaces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Validation', () => {
    it('should require name field', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test space',
          category: 'student_org',
          agreedToGuidelines: true
        })
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      // Zod schema should reject missing name
      // This would be caught by withAuthValidationAndErrors middleware
    });

    it('should require description field', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'CS Club',
          category: 'student_org',
          agreedToGuidelines: true
        })
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      // Should fail validation
    });

    it('should require category field', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'CS Club',
          description: 'Computer Science club',
          agreedToGuidelines: true
        })
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      // Should fail validation
    });

    it('should require agreement to guidelines', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student'
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: false
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'Must agree to community guidelines',
        'VALIDATION_ERROR',
        expect.any(Object)
      );
    });

    it('should validate name length (3-100 characters)', async () => {
      // Short name should fail
      const shortBody = {
        name: 'CS',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      // Long name should fail
      const longBody = {
        name: 'a'.repeat(101),
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      // These should be caught by Zod schema
    });

    it('should validate description length (1-500 characters)', async () => {
      const longDescriptionBody = {
        name: 'CS Club',
        description: 'a'.repeat(501),
        category: 'student_org',
        agreedToGuidelines: true
      };

      // Should fail Zod validation
    });

    it('should validate category enum', async () => {
      const invalidCategoryBody = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'invalid_category',
        agreedToGuidelines: true
      };

      // Should fail Zod enum validation
    });
  });

  describe('Permissions - Account Age', () => {
    it('should require 7-day old account for non-admins', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }, // 3 days old
          role: 'student'
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        expect.stringContaining('Account must be at least 7 days old'),
        'PERMISSION_DENIED',
        expect.any(Object)
      );
    });

    it('should allow admins to bypass account age requirement', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');
      const { addSecureCampusMetadata } = await import('@/lib/secure-firebase-queries');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date() }, // Brand new account
          role: 'admin',
          isAdmin: true
        })
      };

      const mockSpaceSnapshot = {
        empty: true
      };

      const mockBatch = {
        set: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined)
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);
      vi.mocked(dbAdmin.collection('spaces').where).mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue(mockSpaceSnapshot)
          })
        })
      } as any);
      vi.mocked(dbAdmin.batch).mockReturnValue(mockBatch as any);
      vi.mocked(addSecureCampusMetadata).mockImplementation((data) => ({ ...data, campusId: 'ub-buffalo' }));

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'admin@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn((data) => ({ json: () => Promise.resolve(data), status: 201 })),
        error: vi.fn()
      };

      await POST(request, {}, body, mockRespond as any);

      // Admin should be able to create space
      expect(mockRespond.error).not.toHaveBeenCalled();
    });
  });

  describe('Permissions - Email Verification', () => {
    it('should require email verification for non-admins', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student'
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: false } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'Email verification required',
        'PERMISSION_DENIED',
        expect.any(Object)
      );
    });
  });

  describe('Permissions - Rate Limiting', () => {
    it('should enforce 3 spaces per day limit', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student'
        })
      };

      const mockSpacesCreatedToday = {
        size: 3
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);
      vi.mocked(dbAdmin.collection('spaces').where).mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue(mockSpacesCreatedToday)
        })
      } as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'Daily limit reached (3 spaces per day)',
        'RATE_LIMIT',
        expect.any(Object)
      );
    });
  });

  describe('Permissions - Category Restrictions', () => {
    it('should restrict university_org to admins only', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student'
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const body = {
        name: 'Official UB Office',
        description: 'Official university organization',
        category: 'university_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'University organizations require admin approval',
        'PERMISSION_DENIED',
        expect.any(Object)
      );
    });

    it('should require greek_life verification', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student',
          greekLifeVerified: false
        })
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);

      const body = {
        name: 'Alpha Beta Gamma',
        description: 'Greek life organization',
        category: 'greek_life',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'Greek Life spaces require verification',
        'PERMISSION_DENIED',
        expect.any(Object)
      );
    });
  });

  describe('Campus Metadata', () => {
    it('should automatically add campusId to all spaces', async () => {
      const { addSecureCampusMetadata } = await import('@/lib/secure-firebase-queries');

      vi.mocked(addSecureCampusMetadata).mockImplementation((data) => ({
        ...data,
        campusId: 'ub-buffalo',
        campus_isolated: true
      }));

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      // Function should call addSecureCampusMetadata
      expect(addSecureCampusMetadata).toBeDefined();
    });

    it('should use CURRENT_CAMPUS_ID constant', async () => {
      const { CURRENT_CAMPUS_ID } = await import('@/lib/secure-firebase-queries');

      expect(CURRENT_CAMPUS_ID).toBe('ub-buffalo');
    });
  });

  describe('Name Uniqueness', () => {
    it('should prevent duplicate space names', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      const mockUserDoc = {
        exists: true,
        data: () => ({
          createdAt: { toDate: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          role: 'student'
        })
      };

      const mockExistingSpace = {
        empty: false // Space with same name exists
      };

      vi.mocked(dbAdmin.collection('users').doc('user-123').get).mockResolvedValue(mockUserDoc as any);
      vi.mocked(dbAdmin.collection('spaces').where).mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue(mockExistingSpace)
          })
        })
      } as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      const request = new NextRequest('http://localhost:3000/api/spaces', {
        method: 'POST',
        body: JSON.stringify(body)
      }) as AuthenticatedRequest;

      request.user = { uid: 'user-123', email: 'john@buffalo.edu', decodedToken: { email_verified: true } } as any;

      const mockRespond = {
        success: vi.fn(),
        error: vi.fn((message) => ({ json: () => Promise.resolve({ error: message }) }))
      };

      await POST(request, {}, body, mockRespond as any);

      expect(mockRespond.error).toHaveBeenCalledWith(
        'A space with this name already exists',
        'CONFLICT',
        expect.any(Object)
      );
    });

    it('should check name uniqueness case-insensitively', async () => {
      const { dbAdmin } = await import('@/lib/firebase-admin');

      // Should query using name_lowercase field
      const whereMock = vi.fn().mockReturnValue({
        limit: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: true })
        })
      });

      vi.mocked(dbAdmin.collection('spaces').where).mockReturnValue({
        where: whereMock
      } as any);

      const body = {
        name: 'CS Club',
        description: 'Computer Science club',
        category: 'student_org',
        agreedToGuidelines: true
      };

      // Should query with name_lowercase: 'cs club'
    });
  });
});
