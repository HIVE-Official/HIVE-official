/**
 * Notifications API Test Suite
 * Tests: GET/POST/PUT /api/notifications
 *
 * Critical for:
 * - Notification retrieval with filtering
 * - Mark as read/unread functionality
 * - Bulk operations (mark all read, delete)
 * - Unread count tracking
 * - Category filtering
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST, PUT } from '@/app/api/notifications/route';
import type { NextRequest } from 'next/server';

// Mock Firebase Admin
const mockGet = vi.fn();
const mockUpdate = vi.fn();
const mockDelete = vi.fn();
const mockBatch = vi.fn();
const mockCommit = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();
const mockLimit = vi.fn();
const mockCount = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      where: mockWhere,
      orderBy: mockOrderBy,
      doc: mockDoc,
    })),
    batch: vi.fn(() => ({
      update: mockUpdate,
      delete: mockDelete,
      commit: mockCommit,
    })),
  },
}));

vi.mock('@/lib/auth-server', () => ({
  getCurrentUser: vi.fn(async (request: any) => {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return null;
    }
    const token = auth.substring(7);
    if (token === 'valid_token') {
      return { uid: 'user123', email: 'john@buffalo.edu' };
    }
    return null;
  }),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Create mock request helper
function createMockRequest(
  url: string = 'http://localhost:3000/api/notifications',
  method: string = 'GET',
  body?: any,
  token?: string
): NextRequest {
  return new NextRequest(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...(body && { 'Content-Type': 'application/json' }),
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
}

describe('Notifications API - GET /api/notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = createMockRequest();

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('Unauthorized');
    });

    it('should accept valid bearer token', async () => {
      const mockNotifications = {
        docs: [],
      };

      const mockCountSnapshot = {
        data: () => ({ count: 0 }),
      };

      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => mockNotifications),
          })),
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => mockCountSnapshot),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'GET',
        undefined,
        'valid_token'
      );

      const response = await GET(request);
      expect(response.status).toBe(200);
    });
  });

  describe('Notification Retrieval', () => {
    it('should fetch user notifications', async () => {
      const mockNotifications = {
        docs: [
          {
            id: 'notif1',
            data: () => ({
              userId: 'user123',
              type: 'space_invite',
              title: 'New Space Invitation',
              message: 'You were invited to join Computer Science Club',
              isRead: false,
              category: 'social',
              timestamp: new Date(),
            }),
          },
          {
            id: 'notif2',
            data: () => ({
              userId: 'user123',
              type: 'ritual_reminder',
              title: 'Ritual Reminder',
              message: 'Time for your focus session',
              isRead: true,
              category: 'ritual',
              timestamp: new Date(),
            }),
          },
        ],
      };

      const mockCountSnapshot = {
        data: () => ({ count: 5 }),
      };

      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => mockNotifications),
          })),
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => mockCountSnapshot),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'GET',
        undefined,
        'valid_token'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.notifications).toBeDefined();
      expect(data.notifications.length).toBe(2);
      expect(data.unreadCount).toBe(5);
      expect(data.hasMore).toBe(false);
    });

    it('should filter by unread only', async () => {
      const whereSpy = vi.fn(() => ({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => ({ data: () => ({ count: 0 }) })),
        })),
      }));

      mockWhere.mockImplementation(whereSpy);

      const request = createMockRequest(
        'http://localhost:3000/api/notifications?unread=true',
        'GET',
        undefined,
        'valid_token'
      );

      await GET(request);

      expect(whereSpy).toHaveBeenCalledWith('userId', '==', 'user123');
      expect(whereSpy).toHaveBeenCalledWith('isRead', '==', false);
    });

    it('should filter by category', async () => {
      const whereSpy = vi.fn(() => ({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => ({ data: () => ({ count: 0 }) })),
        })),
      }));

      mockWhere.mockImplementation(whereSpy);

      const request = createMockRequest(
        'http://localhost:3000/api/notifications?category=social',
        'GET',
        undefined,
        'valid_token'
      );

      await GET(request);

      expect(whereSpy).toHaveBeenCalledWith('category', '==', 'social');
    });

    it('should respect pagination limit', async () => {
      const limitSpy = vi.fn(() => ({
        get: vi.fn(async () => ({ docs: [] })),
      }));

      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: limitSpy,
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => ({ data: () => ({ count: 0 }) })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications?limit=25',
        'GET',
        undefined,
        'valid_token'
      );

      await GET(request);

      expect(limitSpy).toHaveBeenCalledWith(25);
    });

    it('should default to 10 notifications per page', async () => {
      const limitSpy = vi.fn(() => ({
        get: vi.fn(async () => ({ docs: [] })),
      }));

      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: limitSpy,
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => ({ data: () => ({ count: 0 }) })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'GET',
        undefined,
        'valid_token'
      );

      await GET(request);

      expect(limitSpy).toHaveBeenCalledWith(10);
    });

    it('should indicate hasMore when at limit', async () => {
      const mockNotifications = {
        docs: new Array(10).fill({
          id: 'notif',
          data: () => ({ userId: 'user123' }),
        }),
      };

      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => mockNotifications),
          })),
        })),
        count: vi.fn(() => ({
          get: vi.fn(async () => ({ data: () => ({ count: 5 }) })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications?limit=10',
        'GET',
        undefined,
        'valid_token'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(data.hasMore).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      mockWhere.mockReturnValue({
        orderBy: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => {
              throw new Error('Firestore connection failed');
            }),
          })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'GET',
        undefined,
        'valid_token'
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Failed to fetch notifications');
    });
  });
});

describe('Notifications API - POST /api/notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Mark as Read', () => {
    it('should mark single notification as read', async () => {
      const mockBatchObj = {
        update: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({})),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'mark_read',
          notificationIds: 'notif123',
        },
        'valid_token'
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockBatchObj.update).toHaveBeenCalled();
      expect(mockBatchObj.commit).toHaveBeenCalled();
    });

    it('should mark multiple notifications as read', async () => {
      const mockBatchObj = {
        update: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({})),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'mark_read',
          notificationIds: ['notif1', 'notif2', 'notif3'],
        },
        'valid_token'
      );

      const response = await POST(request);

      expect(mockBatchObj.update).toHaveBeenCalledTimes(3);
    });

    it('should include readAt timestamp', async () => {
      let capturedUpdate: any;
      const mockBatchObj = {
        update: vi.fn((ref, data) => {
          capturedUpdate = data;
          return mockBatchObj;
        }),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({})),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'mark_read',
          notificationIds: 'notif123',
        },
        'valid_token'
      );

      await POST(request);

      expect(capturedUpdate).toBeDefined();
      expect(capturedUpdate.isRead).toBe(true);
      expect(capturedUpdate.readAt).toBeDefined();
    });
  });

  describe('Mark All Read', () => {
    it('should mark all unread notifications as read', async () => {
      const mockUnreadNotifications = {
        docs: [
          { ref: { id: 'notif1' } },
          { ref: { id: 'notif2' } },
          { ref: { id: 'notif3' } },
        ],
        size: 3,
      };

      const mockBatchObj = {
        update: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            get: vi.fn(async () => mockUnreadNotifications),
          })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'mark_all_read',
        },
        'valid_token'
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.updatedCount).toBe(3);
      expect(mockBatchObj.update).toHaveBeenCalledTimes(3);
    });

    it('should filter by userId for mark all read', async () => {
      const whereSpy = vi.fn(() => ({
        where: vi.fn(() => ({
          get: vi.fn(async () => ({ docs: [], size: 0 })),
        })),
      }));

      mockCollection.mockReturnValue({
        where: whereSpy,
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'mark_all_read',
        },
        'valid_token'
      );

      await POST(request);

      expect(whereSpy).toHaveBeenCalledWith('userId', '==', 'user123');
      expect(whereSpy).toHaveBeenCalledWith('isRead', '==', false);
    });
  });

  describe('Delete Notifications', () => {
    it('should delete single notification', async () => {
      const mockBatchObj = {
        delete: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({})),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'delete',
          notificationIds: 'notif123',
        },
        'valid_token'
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockBatchObj.delete).toHaveBeenCalled();
    });

    it('should delete multiple notifications', async () => {
      const mockBatchObj = {
        delete: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({})),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'delete',
          notificationIds: ['notif1', 'notif2'],
        },
        'valid_token'
      );

      await POST(request);

      expect(mockBatchObj.delete).toHaveBeenCalledTimes(2);
    });
  });

  describe('Invalid Actions', () => {
    it('should reject unknown actions', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'POST',
        {
          action: 'unknown_action',
        },
        'valid_token'
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid action');
    });
  });
});

describe('Notifications API - PUT /api/notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Update Notification', () => {
    it('should update notification read status', async () => {
      const mockNotificationDoc = {
        exists: true,
        data: () => ({
          userId: 'user123',
          isRead: false,
        }),
      };

      const mockNotificationRef = {
        get: vi.fn(async () => mockNotificationDoc),
        update: vi.fn(async () => {}),
      };

      mockCollection.mockReturnValue({
        doc: vi.fn(() => mockNotificationRef),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'PUT',
        {
          notificationId: 'notif123',
          isRead: true,
        },
        'valid_token'
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockNotificationRef.update).toHaveBeenCalled();
    });

    it('should add readAt timestamp when marking as read', async () => {
      const mockNotificationDoc = {
        exists: true,
        data: () => ({
          userId: 'user123',
          isRead: false,
        }),
      };

      let capturedUpdate: any;
      const mockNotificationRef = {
        get: vi.fn(async () => mockNotificationDoc),
        update: vi.fn(async (data) => {
          capturedUpdate = data;
        }),
      };

      mockCollection.mockReturnValue({
        doc: vi.fn(() => mockNotificationRef),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'PUT',
        {
          notificationId: 'notif123',
          isRead: true,
        },
        'valid_token'
      );

      await PUT(request);

      expect(capturedUpdate).toBeDefined();
      expect(capturedUpdate.isRead).toBe(true);
      expect(capturedUpdate.readAt).toBeDefined();
    });

    it('should require notificationId', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'PUT',
        {
          isRead: true,
        },
        'valid_token'
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Notification ID is required');
    });

    it('should return 404 if notification not found', async () => {
      const mockNotificationDoc = {
        exists: false,
      };

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn(async () => mockNotificationDoc),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'PUT',
        {
          notificationId: 'nonexistent',
          isRead: true,
        },
        'valid_token'
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain('Notification not found');
    });

    it('should prevent unauthorized access to other users notifications', async () => {
      const mockNotificationDoc = {
        exists: true,
        data: () => ({
          userId: 'different_user',
          isRead: false,
        }),
      };

      mockCollection.mockReturnValue({
        doc: vi.fn(() => ({
          get: vi.fn(async () => mockNotificationDoc),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/notifications',
        'PUT',
        {
          notificationId: 'notif123',
          isRead: true,
        },
        'valid_token'
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('Unauthorized access');
    });
  });
});
