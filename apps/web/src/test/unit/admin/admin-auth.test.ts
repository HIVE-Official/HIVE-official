import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminUser, checkAdminPermissions, validateAdminToken } from '../../../lib/admin-auth';

// Mock Firebase Admin
vi.mock('firebase-admin', () => ({
  auth: () => ({
    verifyIdToken: vi.fn(),
    getUser: vi.fn(),
    updateUser: vi.fn()
  }),
  credential: {
    cert: vi.fn()
  },
  initializeApp: vi.fn()
}));

// Mock Firebase Firestore
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
  orderBy: vi.fn(),
  limit: vi.fn()
}));

// Mock Firebase database
vi.mock('@hive/core/server', () => ({
  db: {},
  adminAuth: {
    verifyIdToken: vi.fn(),
    getUser: vi.fn()
  }
}));

import { adminAuth } from '@hive/core/server';
import { getDoc, doc, collection, addDoc } from 'firebase/firestore';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
};

describe('Admin Authentication System', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    email: 'admin@hive.test',
    role: 'admin',
    permissions: ['users:manage', 'spaces:manage', 'builder_requests:manage'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-15T10:00:00Z',
    loginCount: 15,
    adminSettings: {
      dashboardPreferences: {},
      notificationSettings: {
        email: true,
        push: true,
        security: true
      }
    }
  };

  const mockModeratorProfile = {
    ...mockAdminProfile,
    role: 'moderator',
    permissions: ['spaces:moderate', 'builder_requests:review']
  };

  const mockValidToken = 'valid-admin-token-123';
  const mockInvalidToken = 'invalid-token';

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.error.mockClear();
    consoleSpy.warn.mockClear();

    // Setup default mocks
    vi.mocked(adminAuth.verifyIdToken).mockResolvedValue({
      uid: mockAdminUser.uid,
      email: mockAdminUser.email
    } as any);

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => mockAdminProfile
    } as any);

    vi.mocked(doc).mockReturnValue({} as any);
    vi.mocked(collection).mockReturnValue({} as any);
    vi.mocked(addDoc).mockResolvedValue({} as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('verifyAdminUser', () => {
    it('successfully verifies admin user with valid token', async () => {
      const result = await verifyAdminUser(mockValidToken);

      expect(result).toEqual({
        isValid: true,
        user: mockAdminUser,
        profile: mockAdminProfile
      });
      expect(vi.mocked(adminAuth.verifyIdToken)).toHaveBeenCalledWith(mockValidToken);
    });

    it('returns invalid for expired token', async () => {
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(new Error('Token expired'));

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token expired or invalid');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error verifying admin token:',
        expect.any(Error)
      );
    });

    it('returns invalid for non-admin user', async () => {
      const nonAdminProfile = { ...mockAdminProfile, role: 'user' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => nonAdminProfile
      } as any);

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Insufficient permissions');
    });

    it('returns invalid for inactive admin', async () => {
      const inactiveProfile = { ...mockAdminProfile, isActive: false };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => inactiveProfile
      } as any);

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin account is inactive');
    });

    it('handles missing admin profile', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin profile not found');
    });

    it('logs admin login activity', async () => {
      await verifyAdminUser(mockValidToken);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          adminId: mockAdminUser.uid,
          action: 'login',
          timestamp: expect.any(String),
          ipAddress: expect.any(String),
          userAgent: expect.any(String)
        })
      );
    });

    it('handles malformed token gracefully', async () => {
      const result = await verifyAdminUser('malformed.token');

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token expired or invalid');
    });

    it('validates token format', async () => {
      const result = await verifyAdminUser('');

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token is required');
    });
  });

  describe('checkAdminPermissions', () => {
    it('grants access for admin with required permission', async () => {
      const hasPermission = await checkAdminPermissions(mockAdminProfile, 'users:manage');

      expect(hasPermission).toBe(true);
    });

    it('denies access for admin without required permission', async () => {
      const hasPermission = await checkAdminPermissions(mockModeratorProfile, 'users:manage');

      expect(hasPermission).toBe(false);
    });

    it('grants access for super admin role', async () => {
      const superAdminProfile = { ...mockAdminProfile, role: 'super_admin' };
      const hasPermission = await checkAdminPermissions(superAdminProfile, 'any:permission');

      expect(hasPermission).toBe(true);
    });

    it('handles multiple permission checks', async () => {
      const hasAllPermissions = await checkAdminPermissions(
        mockAdminProfile, 
        ['users:manage', 'spaces:manage']
      );

      expect(hasAllPermissions).toBe(true);
    });

    it('fails when any required permission is missing', async () => {
      const hasAllPermissions = await checkAdminPermissions(
        mockModeratorProfile, 
        ['spaces:moderate', 'users:manage']
      );

      expect(hasAllPermissions).toBe(false);
    });

    it('handles inactive admin properly', async () => {
      const inactiveProfile = { ...mockAdminProfile, isActive: false };
      const hasPermission = await checkAdminPermissions(inactiveProfile, 'users:manage');

      expect(hasPermission).toBe(false);
    });

    it('logs permission checks for audit', async () => {
      await checkAdminPermissions(mockAdminProfile, 'users:manage');

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          adminId: mockAdminProfile.userId,
          action: 'permission_check',
          resource: 'users:manage',
          granted: true,
          timestamp: expect.any(String)
        })
      );
    });
  });

  describe('validateAdminToken', () => {
    it('validates token and returns user data', async () => {
      const request = new NextRequest('http://localhost/api/admin/test', {
        headers: {
          'Authorization': `Bearer ${mockValidToken}`
        }
      });

      const result = await validateAdminToken(request);

      expect(result.isValid).toBe(true);
      expect(result.user).toEqual(mockAdminUser);
      expect(result.profile).toEqual(mockAdminProfile);
    });

    it('rejects request without authorization header', async () => {
      const request = new NextRequest('http://localhost/api/admin/test');

      const result = await validateAdminToken(request);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Authorization header required');
    });

    it('rejects malformed authorization header', async () => {
      const request = new NextRequest('http://localhost/api/admin/test', {
        headers: {
          'Authorization': 'Invalid header format'
        }
      });

      const result = await validateAdminToken(request);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid authorization header format');
    });

    it('handles bearer token extraction', async () => {
      const request = new NextRequest('http://localhost/api/admin/test', {
        headers: {
          'Authorization': `Bearer ${mockValidToken}`
        }
      });

      const result = await validateAdminToken(request);

      expect(vi.mocked(adminAuth.verifyIdToken)).toHaveBeenCalledWith(mockValidToken);
    });

    it('logs failed validation attempts', async () => {
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(new Error('Invalid token'));

      const request = new NextRequest('http://localhost/api/admin/test', {
        headers: {
          'Authorization': `Bearer ${mockInvalidToken}`
        }
      });

      await validateAdminToken(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          action: 'failed_auth',
          token: expect.any(String),
          reason: 'Token validation failed',
          timestamp: expect.any(String)
        })
      );
    });

    it('handles token expiration gracefully', async () => {
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(
        new Error('Firebase ID token has expired')
      );

      const request = new NextRequest('http://localhost/api/admin/test', {
        headers: {
          'Authorization': `Bearer expired-token`
        }
      });

      const result = await validateAdminToken(request);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token expired or invalid');
    });
  });

  describe('Error Handling', () => {
    it('handles Firebase connection errors', async () => {
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(
        new Error('Network connection failed')
      );

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token expired or invalid');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error verifying admin token:',
        expect.any(Error)
      );
    });

    it('handles Firestore read errors gracefully', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Firestore error'));

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('handles missing environment variables', async () => {
      // Simulate missing Firebase config
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(
        new Error('Firebase Admin SDK not initialized')
      );

      const result = await verifyAdminUser(mockValidToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Token expired or invalid');
    });
  });

  describe('Security Features', () => {
    it('masks sensitive data in logs', async () => {
      await verifyAdminUser(mockValidToken);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          token: expect.stringMatching(/^\*+.*\*+$/) // Should be masked
        })
      );
    });

    it('validates token length and format', async () => {
      const shortToken = 'abc';
      const result = await verifyAdminUser(shortToken);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Invalid token format');
    });

    it('prevents timing attacks in validation', async () => {
      const startTime = Date.now();
      await verifyAdminUser('invalid-token');
      const invalidTime = Date.now() - startTime;

      const startTime2 = Date.now();
      await verifyAdminUser(mockValidToken);
      const validTime = Date.now() - startTime2;

      // Timing should be reasonably similar (within 50ms)
      expect(Math.abs(invalidTime - validTime)).toBeLessThan(50);
    });

    it('rate limits admin authentication attempts', async () => {
      // Simulate multiple failed attempts
      vi.mocked(adminAuth.verifyIdToken).mockRejectedValue(new Error('Invalid token'));

      const attempts = Array(6).fill(null).map(() => 
        verifyAdminUser('invalid-token')
      );

      const results = await Promise.all(attempts);

      // Should show rate limiting after multiple failures
      expect(results[5].error).toContain('rate limit');
    });
  });

  describe('Role-Based Access Control', () => {
    it('validates admin role hierarchy', async () => {
      const roleHierarchy = [
        { role: 'super_admin', level: 100 },
        { role: 'admin', level: 80 },
        { role: 'moderator', level: 60 },
        { role: 'user', level: 1 }
      ];

      for (const { role, level } of roleHierarchy) {
        const profile = { ...mockAdminProfile, role };
        const hasAccess = await checkAdminPermissions(profile, 'high_level:action');
        
        expect(hasAccess).toBe(level >= 80); // Only admin+ should have access
      }
    });

    it('handles custom permission combinations', async () => {
      const customProfile = {
        ...mockAdminProfile,
        permissions: ['spaces:read', 'users:read', 'analytics:view']
      };

      const readAccess = await checkAdminPermissions(customProfile, 'spaces:read');
      const writeAccess = await checkAdminPermissions(customProfile, 'spaces:write');

      expect(readAccess).toBe(true);
      expect(writeAccess).toBe(false);
    });

    it('validates permission inheritance', async () => {
      const profileWithInheritance = {
        ...mockAdminProfile,
        permissions: ['spaces:*', 'users:read']
      };

      const hasSpaceWrite = await checkAdminPermissions(profileWithInheritance, 'spaces:write');
      const hasUserWrite = await checkAdminPermissions(profileWithInheritance, 'users:write');

      expect(hasSpaceWrite).toBe(true); // Inherited from spaces:*
      expect(hasUserWrite).toBe(false); // Only has users:read
    });
  });
});