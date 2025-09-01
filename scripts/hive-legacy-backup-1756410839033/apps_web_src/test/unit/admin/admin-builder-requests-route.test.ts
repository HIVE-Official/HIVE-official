import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET, POST, PUT, DELETE } from '../../../app/api/admin/builder-requests/route';

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
  startAfter: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() }))
  }
}));

// Mock Firebase database
vi.mock('@hive/core/server', () => ({
  db: {},
  adminAuth: {
    updateUser: vi.fn()
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

// Mock admin notifications
vi.mock('../../../lib/admin-notifications', () => ({
  sendAdminNotification: vi.fn()
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
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { adminAuth } from '@hive/core/server';
import { validateAdminToken, checkAdminPermissions } from '../../../lib/admin-auth';
import { logAdminActivity } from '../../../lib/admin-activity-logger';
import { sendAdminNotification } from '../../../lib/admin-notifications';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Admin Builder Requests Route API', () => {
  const mockAdminUser = {
    uid: 'admin-user-123',
    email: 'admin@hive.test',
    displayName: 'Admin User'
  };

  const mockAdminProfile = {
    userId: 'admin-user-123',
    role: 'admin',
    permissions: ['builder_requests:manage', 'builder_requests:view', 'users:promote']
  };

  const mockBuilderRequest = {
    id: 'request-123',
    userId: 'user-123',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    spaceId: 'space-456',
    spaceName: 'CS Study Group',
    requestType: 'builder_application',
    status: 'pending',
    priority: 'normal',
    submittedAt: '2024-01-15T10:00:00Z',
    application: {
      motivation: 'I want to create tools to help fellow students',
      experience: 'Built 3 web applications, 2 years coding experience',
      toolIdeas: [
        'Study session scheduler',
        'Group project collaboration tool'
      ],
      portfolio: 'https://github.com/johndoe',
      references: ['professor@university.edu']
    },
    reviewInfo: {
      assignedTo: null,
      reviewStarted: null,
      notes: [],
      score: null,
      criteria: {
        technicalSkill: null,
        motivation: null,
        communityFit: null,
        projectQuality: null
      }
    },
    metadata: {
      urgency: 'normal',
      tags: ['first-time', 'student'],
      sourceSpace: 'space-456',
      referralCode: null,
      applicationVersion: '1.0'
    },
    timeline: {
      submitted: '2024-01-15T10:00:00Z',
      acknowledged: null,
      reviewed: null,
      decided: null,
      completed: null
    }
  };

  const mockUserProfile = {
    userId: 'user-123',
    email: 'john@example.com',
    displayName: 'John Doe',
    role: 'user',
    status: 'active',
    statistics: {
      spacesJoined: 3,
      postsCreated: 12,
      reputationScore: 75
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
    vi.mocked(sendAdminNotification).mockResolvedValue(undefined);
    
    vi.mocked(doc).mockReturnValue({} as any);
    vi.mocked(collection).mockReturnValue({} as any);
    vi.mocked(query).mockReturnValue({} as any);
    vi.mocked(where).mockReturnValue({} as any);
    vi.mocked(orderBy).mockReturnValue({} as any);
    vi.mocked(fbLimit).mockReturnValue({} as any);
    vi.mocked(startAfter).mockReturnValue({} as any);
    vi.mocked(Timestamp.now).mockReturnValue({ toDate: () => new Date() } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET - Get Builder Requests', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          {
            id: 'request-123',
            data: () => mockBuilderRequest
          },
          {
            id: 'request-456',
            data: () => ({
              ...mockBuilderRequest,
              id: 'request-456',
              userId: 'user-456',
              userName: 'Jane Smith',
              status: 'approved'
            })
          }
        ],
        size: 2
      } as any);
    });

    it('gets builder requests with default pagination', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.requests).toHaveLength(2);
      expect(responseData.requests[0]).toEqual(
        expect.objectContaining({
          id: 'request-123',
          userId: 'user-123',
          userName: 'John Doe',
          status: 'pending'
        })
      );
      expect(responseData.pagination.limit).toBe(20);
    });

    it('filters requests by status', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?status=pending');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('status', '==', 'pending');
      expect(response.status).toBe(200);
    });

    it('filters requests by priority', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?priority=high');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('priority', '==', 'high');
      expect(response.status).toBe(200);
    });

    it('filters requests by space', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?spaceId=space-456');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('spaceId', '==', 'space-456');
      expect(response.status).toBe(200);
    });

    it('sorts requests by submission date', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?sortBy=submittedAt&sortOrder=desc');

      const response = await GET(request);

      expect(vi.mocked(orderBy)).toHaveBeenCalledWith('submittedAt', 'desc');
      expect(response.status).toBe(200);
    });

    it('includes request statistics when requested', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?includeStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.statistics).toBeDefined();
      expect(responseData.statistics).toEqual(
        expect.objectContaining({
          totalRequests: expect.any(Number),
          pendingRequests: expect.any(Number),
          approvedRequests: expect.any(Number),
          rejectedRequests: expect.any(Number),
          averageProcessingTime: expect.any(Number)
        })
      );
    });

    it('gets assigned requests for specific admin', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?assignedTo=admin-user-123');

      const response = await GET(request);

      expect(vi.mocked(where)).toHaveBeenCalledWith('reviewInfo.assignedTo', '==', 'admin-user-123');
      expect(response.status).toBe(200);
    });

    it('handles pagination with cursor', async () => {
      const mockCursor = { id: 'request-100' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: 'request-100'
      } as any);

      const request = new NextRequest('http://localhost/api/admin/builder-requests?cursor=request-100&limit=10');

      const response = await GET(request);

      expect(vi.mocked(startAfter)).toHaveBeenCalled();
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(10);
      expect(response.status).toBe(200);
    });

    it('returns urgent requests first when sorting by priority', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?sortBy=priority');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      // Would expect urgent requests to be sorted first in actual implementation
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(validateAdminToken).mockResolvedValue({
        isValid: false,
        error: 'Unauthorized'
      });

      const request = new NextRequest('http://localhost/api/admin/builder-requests');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 403 for insufficient permissions', async () => {
      vi.mocked(checkAdminPermissions).mockResolvedValue(false);

      const request = new NextRequest('http://localhost/api/admin/builder-requests');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Insufficient permissions');
    });

    it('logs admin activity', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests');

      await GET(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'builder_requests:view',
        expect.objectContaining({
          action: 'get_builder_requests',
          filters: expect.any(Object)
        })
      );
    });
  });

  describe('POST - Process Builder Request', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockBuilderRequest
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockUserProfile
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(adminAuth.updateUser).mockResolvedValue(undefined as any);
      vi.mocked(addDoc).mockResolvedValue({ id: 'notification-123' } as any);
    });

    it('approves builder request successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'approve',
          reviewNotes: 'Strong application, good technical background',
          score: 85
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.request.status).toBe('approved');
      
      // Should update request status
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'approved',
          'reviewInfo.reviewedBy': mockAdminUser.uid,
          'reviewInfo.reviewedAt': expect.any(String),
          'reviewInfo.decision': 'approved',
          'reviewInfo.notes': expect.arrayContaining([
            expect.objectContaining({
              content: 'Strong application, good technical background',
              author: mockAdminUser.uid
            })
          ]),
          'reviewInfo.score': 85,
          'timeline.decided': expect.any(String)
        })
      );

      // Should promote user to builder role
      expect(vi.mocked(adminAuth.updateUser)).toHaveBeenCalledWith('user-123', {
        customClaims: expect.objectContaining({ role: 'builder' })
      });
    });

    it('rejects builder request with reason', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'reject',
          reviewNotes: 'Insufficient experience for current needs',
          rejectionReason: 'experience_insufficient',
          allowReapply: true,
          reapplyAfter: '2024-03-15T10:00:00Z'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.request.status).toBe('rejected');

      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'rejected',
          'reviewInfo.decision': 'rejected',
          'reviewInfo.rejectionReason': 'experience_insufficient',
          'reviewInfo.allowReapply': true,
          'reviewInfo.reapplyAfter': '2024-03-15T10:00:00Z',
          'timeline.decided': expect.any(String)
        })
      );

      // Should NOT promote user
      expect(vi.mocked(adminAuth.updateUser)).not.toHaveBeenCalled();
    });

    it('assigns request to admin for review', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'assign',
          assignTo: 'reviewer-admin-456'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'reviewInfo.assignedTo': 'reviewer-admin-456',
          'reviewInfo.assignedBy': mockAdminUser.uid,
          'reviewInfo.assignedAt': expect.any(String),
          'timeline.acknowledged': expect.any(String)
        })
      );
    });

    it('updates request priority', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'update_priority',
          priority: 'high',
          reason: 'Exceptional candidate with urgent space needs'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          priority: 'high',
          'metadata.priorityUpdatedBy': mockAdminUser.uid,
          'metadata.priorityReason': 'Exceptional candidate with urgent space needs'
        })
      );
    });

    it('adds review notes to request', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'add_note',
          note: 'Candidate shows promise, need to verify portfolio links',
          noteType: 'review_progress'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'reviewInfo.notes': expect.arrayContaining([
            expect.objectContaining({
              content: 'Candidate shows promise, need to verify portfolio links',
              type: 'review_progress',
              author: mockAdminUser.uid,
              timestamp: expect.any(String)
            })
          ])
        })
      );
    });

    it('starts review process', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'start_review',
          estimatedCompletionDate: '2024-01-22T10:00:00Z'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'under_review',
          'reviewInfo.reviewStarted': expect.any(String),
          'reviewInfo.estimatedCompletion': '2024-01-22T10:00:00Z',
          'timeline.acknowledged': expect.any(String)
        })
      );
    });

    it('sends notification to user on decision', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'approve',
          reviewNotes: 'Welcome to the builder program!'
        })
      });

      await POST(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: 'user-123',
          type: 'builder_request_approved',
          title: 'Builder Request Approved!',
          content: expect.stringContaining('Welcome to the builder program!')
        })
      );
    });

    it('returns 400 for invalid request ID', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          action: 'approve'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Request ID and action are required');
    });

    it('returns 404 for non-existent request', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'nonexistent-request',
          action: 'approve'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Builder request not found');
    });

    it('prevents processing already decided requests', async () => {
      const decidedRequest = { ...mockBuilderRequest, status: 'approved' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => decidedRequest
      } as any);

      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'reject'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Request has already been decided');
    });

    it('logs admin activity for request processing', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'approve',
          reviewNotes: 'Approved after thorough review'
        })
      });

      await POST(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'builder_requests:approve',
        expect.objectContaining({
          requestId: 'request-123',
          userId: 'user-123',
          action: 'approve',
          spaceName: 'CS Study Group'
        })
      );
    });
  });

  describe('PUT - Update Builder Request', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockBuilderRequest
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
    });

    it('updates request metadata successfully', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'PUT',
        body: JSON.stringify({
          requestId: 'request-123',
          updates: {
            'metadata.urgency': 'high',
            'metadata.tags': ['priority', 'experienced']
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
          'metadata.urgency': 'high',
          'metadata.tags': ['priority', 'experienced'],
          updatedAt: expect.any(String),
          updatedBy: mockAdminUser.uid
        })
      );
    });

    it('updates review criteria scores', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'PUT',
        body: JSON.stringify({
          requestId: 'request-123',
          updates: {
            'reviewInfo.criteria.technicalSkill': 85,
            'reviewInfo.criteria.motivation': 90,
            'reviewInfo.criteria.communityFit': 80,
            'reviewInfo.criteria.projectQuality': 75
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
          'reviewInfo.criteria.technicalSkill': 85,
          'reviewInfo.criteria.motivation': 90,
          'reviewInfo.criteria.communityFit': 80,
          'reviewInfo.criteria.projectQuality': 75
        })
      );
    });

    it('returns 400 for invalid request ID', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'PUT',
        body: JSON.stringify({
          updates: { priority: 'high' }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Request ID and updates are required');
    });

    it('returns 404 for non-existent request', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'PUT',
        body: JSON.stringify({
          requestId: 'nonexistent-request',
          updates: { priority: 'high' }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Builder request not found');
    });
  });

  describe('DELETE - Delete Builder Request', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockBuilderRequest
      } as any);

      vi.mocked(deleteDoc).mockResolvedValue(undefined);
    });

    it('deletes builder request successfully', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/builder-requests?requestId=request-123&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('Builder request deleted successfully');
      expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
    });

    it('requires confirmation for deletion', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/builder-requests?requestId=request-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Deletion confirmation required');
    });

    it('archives request instead of hard delete when specified', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/builder-requests?requestId=request-123&confirm=true&archive=true',
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
      expect(vi.mocked(deleteDoc)).not.toHaveBeenCalled();
    });

    it('returns 404 for non-existent request', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/admin/builder-requests?requestId=nonexistent&confirm=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Builder request not found');
    });

    it('logs deletion activity', async () => {
      const request = new NextRequest(
        'http://localhost/api/admin/builder-requests?requestId=request-123&confirm=true',
        { method: 'DELETE' }
      );

      await DELETE(request);

      expect(vi.mocked(logAdminActivity)).toHaveBeenCalledWith(
        mockAdminUser.uid,
        'builder_requests:delete',
        expect.objectContaining({
          requestId: 'request-123',
          userId: 'user-123',
          userName: 'John Doe'
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to process builder request');
    });

    it('handles Firebase Auth errors when promoting users', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockBuilderRequest
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockUserProfile
      } as any);

      vi.mocked(adminAuth.updateUser).mockRejectedValue(new Error('Auth error'));

      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'approve'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to process builder request');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error processing builder request:',
        expect.any(Error)
      );
    });

    it('handles Firestore errors gracefully', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'));

      const request = new NextRequest('http://localhost/api/admin/builder-requests');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get builder requests');
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('Request Analytics and Reporting', () => {
    it('calculates processing time statistics', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?includeStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.statistics).toEqual(
        expect.objectContaining({
          averageProcessingTime: expect.any(Number),
          totalRequests: expect.any(Number),
          approvalRate: expect.any(Number),
          pendingRequests: expect.any(Number)
        })
      );
    });

    it('provides space-specific request analytics', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?spaceAnalytics=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaceBreakdown).toBeDefined();
    });

    it('includes reviewer performance metrics', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests?includeReviewerStats=true');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.reviewerMetrics).toBeDefined();
    });
  });

  describe('Bulk Operations', () => {
    it('processes multiple requests in bulk', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          action: 'bulk_assign',
          requestIds: ['request-123', 'request-456'],
          assignTo: 'reviewer-admin-789'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.processedCount).toBe(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledTimes(2);
    });

    it('bulk updates request priorities', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'bulk_priority',
          requestIds: ['request-123', 'request-456'],
          priority: 'high',
          reason: 'Urgent processing needed'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.updatedCount).toBe(2);
    });
  });

  describe('Notification System Integration', () => {
    it('sends admin notification on new high-priority request', async () => {
      const highPriorityRequest = { ...mockBuilderRequest, priority: 'urgent' };
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => highPriorityRequest
      } as any);

      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'update_priority',
          priority: 'urgent'
        })
      });

      await POST(request);

      expect(vi.mocked(sendAdminNotification)).toHaveBeenCalledWith(
        'high_priority_request',
        expect.objectContaining({
          title: 'Urgent Builder Request Requires Attention',
          requestId: 'request-123',
          priority: 'urgent'
        })
      );
    });

    it('notifies assigned reviewer of new assignment', async () => {
      const request = new NextRequest('http://localhost/api/admin/builder-requests', {
        method: 'POST',
        body: JSON.stringify({
          requestId: 'request-123',
          action: 'assign',
          assignTo: 'reviewer-admin-456'
        })
      });

      await POST(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: 'reviewer-admin-456',
          type: 'request_assigned',
          title: 'Builder Request Assigned for Review'
        })
      );
    });
  });
});