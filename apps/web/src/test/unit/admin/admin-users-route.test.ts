import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST, DELETE } from '../../../app/api/admin/users/route';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  startAfter: vi.fn()
}));

// Mock Firebase database
vi.mock('@hive/core/server', () => ({
  db: {},
  adminAuth: {
    getUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn()
  }
}));

// Mock admin auth
vi.mock('../../../lib/admin-auth', () => ({
  validateAdminToken: vi.fn(),
  checkAdminPermissions: vi.fn()
}));

// Mock admin activity logger
vi.mock('../../../lib/admin-activity-logger', () => ({
  logAdminActivity: vi.fn()
}));

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit as fbLimit,
  startAfter
} from 'firebase/firestore';
import { adminAuth } from '@hive/core/server';
import { validateAdminToken, checkAdminPermissions } from '../../../lib/admin-auth';
import { logAdminActivity } from '../../../lib/admin-activity-logger';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Admin Users Route API', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    role: 'admin',
    permissions: ['users:manage', 'users:view', 'users:suspend']
  };

  const mockUser = {
    uid: 'user-123',
    email: 'user@example.com',
    displayName: 'Test User',
    disabled: false,
    customClaims: { role: 'user' },
    metadata: {
      creationTime: '2024-01-15T10:00:00Z',
      lastSignInTime: '2024-01-20T14:30:00Z'
    }
  };

  const mockUserProfile = {
    userId: 'user-123',
    email: 'user@example.com',
    displayName: 'Test User',
    major: 'Computer Science',
    graduationYear: 2025,
    role: 'user',
    status: 'active',
    joinedAt: '2024-01-15T10:00:00Z',
    lastActive: '2024-01-20T14:30:00Z',
    statistics: {
      spacesJoined: 3,
      toolsCreated: 2,
      postsCreated: 15,
      reputationScore: 85
    },
    preferences: {
      notifications: true,
      publicProfile: true
    },
    moderationInfo: {
      warnings: 0,
      suspensions: 0,
      strikes: 0
    }
  };

  const mockValidationResult = {
    isValid: true,
    user: mockAdminUser,
    profile: mockAdminProfile
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.error.mockClear();

    // Setup default mocks
    vi.mocked(validateAdminToken).mockResolvedValue(mockValidationResult);
    vi.mocked(checkAdminPermissions).mockResolvedValue(true);
    vi.mocked(logAdminActivity).mockResolvedValue(undefined);
    
    vi.mocked(doc).mockReturnValue({} as any);
    vi.mocked(collection).mockReturnValue({} as any);
    vi.mocked(query).mockReturnValue({} as any);
    vi.mocked(where).mockReturnValue({} as any);
    vi.mocked(orderBy).mockReturnValue({} as any);
    vi.mocked(fbLimit).mockReturnValue({} as any);
    vi.mocked(startAfter).mockReturnValue({} as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET - Get Users', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          {
            id: 'user-123',
            data: () => mockUserProfile
          },
          {
            id: 'user-456',
            data: () => ({
              ...mockUserProfile,
              userId: 'user-456',
              email: 'user2@example.com',
              displayName: 'User Two'
            })
          }
        ],
        size: 2
      } as any);

      vi.mocked(adminAuth.getUser).mockResolvedValue(mockUser as any);
    });

    it('gets users with default pagination', async () => {
      const request = new NextRequest('http://localhost/api/admin/users');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.users).toHaveLength(2);
      expect(responseData.users[0]).toEqual(
        expect.objectContaining({
          userId: 'user-123',
          email: 'user@example.com',
          displayName: 'Test User'
        })
      );
      expect(responseData.pagination.limit).toBe(20);
    });

    it('filters users by status', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?status=suspended');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('status', '==', 'suspended');
      expect(response.status).toBe(200);
    });

    it('filters users by major', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?major=Computer Science');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('major', '==', 'Computer Science');
      expect(response.status).toBe(200);
    });

    it('filters users by role', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?role=builder');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('role', '==', 'builder');
      expect(response.status).toBe(200);
    });

    it('searches users by name or email', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?search=john');

      const response = await GET(request);

      expect(response.status).toBe(200);
      // Search would filter results client-side after fetching
    });

    it('handles pagination with cursor', async () => {
      const mockCursor = { id: 'user-100' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: 'user-100'
      } as any);

      const request = new NextRequest('http://localhost/api/admin/users?cursor=user-100&limit=10');

      const response = await GET(request);

      expect(vi.mocked(startAfter)).toHaveBeenCalled();
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(10);
      expect(response.status).toBe(200);
    });

    it('includes user statistics when requested', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?includeStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.users[0].statistics).toBeDefined();
      expect(responseData.users[0].statistics.spacesJoined).toBe(3);
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest('http://localhost/api/admin/users');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 403 for insufficient permissions', async () => {
      vi.mocked(checkAdminPermissions).mockResolvedValue(false);

      const request = new NextRequest('http://localhost/api/admin/users');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Insufficient permissions');
    });

    it('handles Firestore query errors', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'));

      const request = new NextRequest('http://localhost/api/admin/users');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get users');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('logs admin activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/users');

      await GET(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'users:view',
        expect.objectContaining({
          action: 'get_users',
          filters: expect.any(Object)
        })
      );
    });
  });

  describe('POST - Update User', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockUserProfile
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(adminAuth.updateUser).mockResolvedValue(mockUser as any);
    });

    it('updates user profile successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          updates: {
            displayName: 'Updated Name',
            major: 'Electrical Engineering'
          }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.user.displayName).toBe('Updated Name');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          displayName: 'Updated Name',
          major: 'Electrical Engineering',
          updatedAt: expect.any(String)
        })
      );
    });

    it('suspends user account', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          action: 'suspend',
          reason: 'Policy violation',
          duration: '7d'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(adminAuth.updateUser)).toHaveBeenCalledWith('user-123', {
        disabled: true
      });
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'suspended',
          suspensionInfo: expect.objectContaining({
            reason: 'Policy violation',
            duration: '7d',
            suspendedBy: mockAdminUser.uid
          })
        })
      );
    });

    it('unsuspends user account', async () => {
      const suspendedUser = {
        ...mockUserProfile,
        status: 'suspended',
        suspensionInfo: {
          reason: 'Policy violation',
          suspendedAt: '2024-01-20T10:00:00Z',
          suspendedBy: 'admin-user-123'
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => suspendedUser
      } as any);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          action: 'unsuspend'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(adminAuth.updateUser)).toHaveBeenCalledWith('user-123', {
        disabled: false
      });
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'active',
          suspensionInfo: null
        })
      );
    });

    it('updates user role and permissions', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          action: 'promote',
          newRole: 'builder'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(adminAuth.updateUser)).toHaveBeenCalledWith('user-123', {
        customClaims: expect.objectContaining({ role: 'builder' })
      });
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          role: 'builder',
          promotedAt: expect.any(String),
          promotedBy: mockAdminUser.uid
        })
      );
    });

    it('adds warning to user account', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          action: 'warn',
          reason: 'Inappropriate behavior',
          severity: 'medium'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'moderationInfo.warnings': 1,
          'moderationInfo.strikes': expect.any(Number),
          warningHistory: expect.arrayContaining([
            expect.objectContaining({
              reason: 'Inappropriate behavior',
              severity: 'medium',
              issuedBy: mockAdminUser.uid
            })
          ])
        })
      );
    });

    it('returns 400 for invalid user ID', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          updates: { displayName: 'New Name' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('User ID is required');
    });

    it('returns 404 for non-existent user', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'nonexistent-user',
          updates: { displayName: 'New Name' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('User not found');
    });

    it('prevents admin from modifying other admins without super admin role', async () => {
      const targetAdminProfile = { ...mockUserProfile, role: 'admin' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => targetAdminProfile
      } as any);

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'admin-target',
          action: 'suspend',
          reason: 'Test'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Cannot modify admin users without super admin privileges');
    });

    it('logs admin activity for user modifications', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          action: 'suspend',
          reason: 'Policy violation'
        })
      });

      await POST(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'users:suspend',
        expect.objectContaining({
          targetUserId: 'user-123',
          action: 'suspend',
          reason: 'Policy violation'
        })
      );
    });
  });

  describe('DELETE - Delete User', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockUserProfile
      } as any);

      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(adminAuth.deleteUser).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { ref: { delete: vi.fn() } },
          { ref: { delete: vi.fn() } }
        ]
      } as any);
    });

    it('deletes user account successfully', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=user-123&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('User deleted successfully');
      expect(vi.mocked(adminAuth.deleteUser)).toHaveBeenCalledWith('user-123');
      expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
    });

    it('requires confirmation for user deletion', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=user-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Deletion confirmation required');
    });

    it('soft deletes user by default', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=user-123&confirm=true&soft=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'deleted',
          deletedAt: expect.any(String),
          deletedBy: mockAdminUser.uid
        })
      );
      expect(vi.mocked(adminAuth.deleteUser)).not.toHaveBeenCalled();
    });

    it('cleans up user-related data', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=user-123&confirm=true&cleanup=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(getDocs)).toHaveBeenCalledTimes(4); // Posts, tools, memberships, notifications
    });

    it('prevents deletion of admin users without super admin role', async () => {
      const adminProfile = { ...mockUserProfile, role: 'admin' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => adminProfile
      } as any);

      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=admin-user&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Cannot delete admin users without super admin privileges');
    });

    it('returns 404 for non-existent user', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=nonexistent&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('User not found');
    });

    it('logs user deletion activity', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/users?userId=user-123&confirm=true',
        { method: 'DELETE' }
      );

      await DELETE(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'users:delete',
        expect.objectContaining({
          targetUserId: 'user-123',
          deletionType: 'hard',
          cleanup: false
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update user');
    });

    it('handles Firebase Auth errors', async () => {
      vi.mocked(adminAuth.updateUser).mockRejectedValue(new Error('Firebase Auth error'));

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          updates: { displayName: 'New Name' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update user');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error updating user:',
        expect.any(Error)
      );
    });

    it('handles concurrent modification conflicts', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Document was modified concurrently'));

      const request = new NextRequest('http://localhost/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user-123',
          updates: { displayName: 'New Name' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update user');
    });
  });

  describe('User Analytics and Statistics', () => {
    it('calculates user engagement metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?includeEngagement=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.users[0]).toEqual(
        expect.objectContaining({
          engagementMetrics: expect.objectContaining({
            postsPerWeek: expect.any(Number),
            spacesActive: expect.any(Number),
            toolsUsed: expect.any(Number),
            lastActiveRelative: expect.any(String)
          })
        })
      );
    });

    it('includes user reputation and community standing', async () => {
      const request = new NextRequest('http://localhost/api/admin/users?includeReputation=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.users[0].statistics.reputationScore).toBe(85);
    });
  });
});