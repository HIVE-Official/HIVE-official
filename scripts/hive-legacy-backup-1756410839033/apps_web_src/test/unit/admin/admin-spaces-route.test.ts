import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST, PUT, DELETE } from '../../../app/api/admin/spaces/route';

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
  db: {}
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
import { validateAdminToken, checkAdminPermissions } from '../../../lib/admin-auth';
import { logAdminActivity } from '../../../lib/admin-activity-logger';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Admin Spaces Route API', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    role: 'admin',
    permissions: ['spaces:manage', 'spaces:view', 'spaces:moderate']
  };

  const mockSpace = {
    id: 'space-123',
    name: 'Computer Science Study Group',
    description: 'A collaborative space for CS students',
    type: 'academic',
    category: 'study_group',
    privacy: 'public',
    status: 'active',
    createdBy: 'creator-user-123',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    memberCount: 25,
    settings: {
      allowTools: true,
      allowPosts: true,
      moderationLevel: 'medium',
      joinApproval: false
    },
    metadata: {
      school: 'University of Technology',
      tags: ['computer-science', 'study', 'programming'],
      featured: false,
      verified: true
    },
    statistics: {
      totalMembers: 25,
      activeMembers: 18,
      postsCount: 45,
      toolsCount: 8,
      weeklyActivity: 75,
      healthScore: 85
    },
    moderationInfo: {
      reports: 0,
      warnings: 0,
      strikes: 0,
      lastModerated: null
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

  describe('GET - Get Spaces', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          {
            id: 'space-123',
            data: () => mockSpace
          },
          {
            id: 'space-456',
            data: () => ({
              ...mockSpace,
              id: 'space-456',
              name: 'Biology Lab Partners',
              type: 'academic',
              category: 'lab_group'
            })
          }
        ],
        size: 2
      } as any);
    });

    it('gets spaces with default pagination', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.spaces).toHaveLength(2);
      expect(responseData.spaces[0]).toEqual(
        expect.objectContaining({
          id: 'space-123',
          name: 'Computer Science Study Group',
          type: 'academic'
        })
      );
      expect(responseData.pagination.limit).toBe(20);
    });

    it('filters spaces by status', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?status=inactive');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('status', '==', 'inactive');
      expect(response.status).toBe(200);
    });

    it('filters spaces by type', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?type=social');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('type', '==', 'social');
      expect(response.status).toBe(200);
    });

    it('filters spaces by category', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?category=study_group');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('category', '==', 'study_group');
      expect(response.status).toBe(200);
    });

    it('searches spaces by name', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?search=computer');

      const response = await GET(request);

      expect(response.status).toBe(200);
      // Search would filter results client-side after fetching
    });

    it('sorts spaces by creation date', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?sortBy=createdAt&sortOrder=desc');

      const response = await GET(request);

      expect(vi.mocked(orderBy)).toHaveBeenCalledWith('createdAt', 'desc');
      expect(response.status).toBe(200);
    });

    it('sorts spaces by member count', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?sortBy=memberCount&sortOrder=asc');

      const response = await GET(request);

      expect(vi.mocked(orderBy)).toHaveBeenCalledWith('memberCount', 'asc');
      expect(response.status).toBe(200);
    });

    it('includes space health metrics when requested', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?includeHealth=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaces[0].statistics.healthScore).toBe(85);
      expect(responseData.spaces[0].statistics.weeklyActivity).toBe(75);
    });

    it('handles pagination with cursor', async () => {
      const mockCursor = { id: 'space-100' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: 'space-100'
      } as any);

      const request = new NextRequest('http://localhost/api/admin/spaces?cursor=space-100&limit=10');

      const response = await GET(request);

      expect(vi.mocked(startAfter)).toHaveBeenCalled();
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(10);
      expect(response.status).toBe(200);
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest('http://localhost/api/admin/spaces');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 403 for insufficient permissions', async () => {
      vi.mocked(checkAdminPermissions).mockResolvedValue(false);

      const request = new NextRequest('http://localhost/api/admin/spaces');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Insufficient permissions');
    });

    it('logs admin activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces');

      await GET(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'spaces:view',
        expect.objectContaining({
          action: 'get_spaces',
          filters: expect.any(Object)
        })
      );
    });
  });

  describe('POST - Create Space', () => {
    beforeEach(() => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({ id: 'new-space-123' } as any);
    });

    it('creates space successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New Admin Space',
          description: 'Created by admin',
          type: 'social',
          category: 'general',
          privacy: 'public',
          settings: {
            allowTools: true,
            allowPosts: true,
            moderationLevel: 'high'
          }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.space.name).toBe('New Admin Space');
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'New Admin Space',
          createdBy: mockAdminUser.uid,
          status: 'active',
          metadata: expect.objectContaining({
            adminCreated: true
          })
        })
      );
    });

    it('validates required space fields', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Missing name'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Name, type, and category are required');
    });

    it('creates space with default settings', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Minimal Space',
          type: 'academic',
          category: 'study_group'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData.space.settings).toEqual(
        expect.objectContaining({
          allowTools: true,
          allowPosts: true,
          moderationLevel: 'medium',
          joinApproval: false
        })
      );
    });

    it('sets admin as initial moderator', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Admin Moderated Space',
          type: 'social',
          category: 'general'
        })
      });

      const response = await POST(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockAdminUser.uid,
          spaceId: expect.any(String),
          role: 'moderator',
          status: 'active'
        })
      );
    });

    it('logs space creation activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Space',
          type: 'academic',
          category: 'study_group'
        })
      });

      await POST(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'spaces:create',
        expect.objectContaining({
          spaceName: 'Test Space',
          spaceType: 'academic'
        })
      );
    });
  });

  describe('PUT - Update Space', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockSpace
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
    });

    it('updates space details successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          updates: {
            name: 'Updated Space Name',
            description: 'Updated description',
            'settings.moderationLevel': 'high'
          }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'Updated Space Name',
          description: 'Updated description',
          'settings.moderationLevel': 'high',
          updatedAt: expect.any(String),
          updatedBy: mockAdminUser.uid
        })
      );
    });

    it('activates inactive space', async () => {
      const inactiveSpace = { ...mockSpace, status: 'inactive' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => inactiveSpace
      } as any);

      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'activate'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'active',
          activatedAt: expect.any(String),
          activatedBy: mockAdminUser.uid
        })
      );
    });

    it('deactivates active space', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'deactivate',
          reason: 'Policy violation'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'inactive',
          deactivatedAt: expect.any(String),
          deactivatedBy: mockAdminUser.uid,
          deactivationReason: 'Policy violation'
        })
      );
    });

    it('features space', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'feature',
          featuredUntil: '2024-02-15T10:00:00Z'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'metadata.featured': true,
          'metadata.featuredUntil': '2024-02-15T10:00:00Z',
          'metadata.featuredBy': mockAdminUser.uid
        })
      );
    });

    it('verifies space', async () => {
      const unverifiedSpace = { ...mockSpace, metadata: { ...mockSpace.metadata, verified: false } };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => unverifiedSpace
      } as any);

      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'verify'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'metadata.verified': true,
          'metadata.verifiedAt': expect.any(String),
          'metadata.verifiedBy': mockAdminUser.uid
        })
      );
    });

    it('adds warning to space', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'warn',
          reason: 'Inappropriate content',
          severity: 'medium'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'moderationInfo.warnings': 1,
          'moderationInfo.strikes': expect.any(Number),
          'moderationInfo.lastModerated': expect.any(String),
          warningHistory: expect.arrayContaining([
            expect.objectContaining({
              reason: 'Inappropriate content',
              severity: 'medium',
              issuedBy: mockAdminUser.uid
            })
          ])
        })
      );
    });

    it('returns 400 for invalid space ID', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          updates: { name: 'New Name' }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Space ID is required');
    });

    it('returns 404 for non-existent space', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'nonexistent-space',
          updates: { name: 'New Name' }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Space not found');
    });

    it('logs space modification activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          action: 'feature'
        })
      });

      await PUT(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'spaces:feature',
        expect.objectContaining({
          spaceId: 'space-123',
          action: 'feature'
        })
      );
    });
  });

  describe('DELETE - Delete Space', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockSpace
      } as any);

      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { ref: { delete: vi.fn() } },
          { ref: { delete: vi.fn() } }
        ]
      } as any);
    });

    it('deletes space successfully', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('Space deleted successfully');
      expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
    });

    it('requires confirmation for space deletion', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Deletion confirmation required');
    });

    it('soft deletes space by default', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123&confirm=true&soft=true',
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
      expect(vi.mocked(deleteDoc)).not.toHaveBeenCalled();
    });

    it('cleans up space-related data', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123&confirm=true&cleanup=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(getDocs)).toHaveBeenCalledTimes(4); // Members, posts, tools, analytics
    });

    it('archives space before deletion', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123&confirm=true&archive=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'archived',
          archivedAt: expect.any(String),
          archivedBy: mockAdminUser.uid
        })
      );
    });

    it('returns 404 for non-existent space', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=nonexistent&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Space not found');
    });

    it('logs space deletion activity', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/spaces?spaceId=space-123&confirm=true',
        { method: 'DELETE' }
      );

      await DELETE(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'spaces:delete',
        expect.objectContaining({
          spaceId: 'space-123',
          spaceName: mockSpace.name,
          deletionType: 'hard',
          cleanup: false
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to create space');
    });

    it('handles Firestore errors gracefully', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'));

      const request = new NextRequest('http://localhost/api/admin/spaces');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get spaces');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error getting spaces:',
        expect.any(Error)
      );
    });

    it('handles concurrent modification conflicts', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Document was modified concurrently'));

      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          spaceId: 'space-123',
          updates: { name: 'New Name' }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update space');
    });
  });

  describe('Space Health and Analytics', () => {
    it('calculates space health score', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?includeHealth=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaces[0].statistics.healthScore).toBe(85);
      expect(responseData.spaces[0].statistics.weeklyActivity).toBe(75);
    });

    it('includes engagement metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?includeEngagement=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaces[0]).toEqual(
        expect.objectContaining({
          engagementMetrics: expect.objectContaining({
            averagePostsPerWeek: expect.any(Number),
            memberRetentionRate: expect.any(Number),
            toolUsageRate: expect.any(Number)
          })
        })
      );
    });

    it('provides moderation insights', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces?includeModeration=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaces[0].moderationInfo).toEqual(
        expect.objectContaining({
          reports: 0,
          warnings: 0,
          strikes: 0,
          lastModerated: null
        })
      );
    });
  });

  describe('Bulk Operations', () => {
    it('performs bulk status updates', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'bulk_update',
          spaceIds: ['space-123', 'space-456'],
          updates: { status: 'inactive' },
          reason: 'Maintenance'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.updatedCount).toBe(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledTimes(2);
    });

    it('performs bulk tagging operations', async () => {
      const request = new NextRequest('http://localhost/api/admin/spaces', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'bulk_tag',
          spaceIds: ['space-123', 'space-456'],
          tags: ['featured', 'academic'],
          operation: 'add'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'metadata.tags': expect.arrayContaining(['featured', 'academic'])
        })
      );
    });
  });
});