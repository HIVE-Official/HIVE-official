import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST, GET, PUT, DELETE } from '../../../app/api/realtime/notifications/route';

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

// Mock auth logic
vi.mock('@/lib/server-auth', () => ({
  getCurrentUser: vi.fn()
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
import { getCurrentUser } from '@/lib/server-auth';

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Notifications Route API', () => {
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User'
  };

  const mockNotification = {
    id: 'notif_test-user-123_1640995200000_abc123de',
    userId: 'test-user-123',
    type: 'mention',
    title: 'You were mentioned',
    content: 'John Doe mentioned you in CS Study Group',
    sourceId: 'message-123',
    sourceType: 'message',
    spaceId: 'space-123',
    spaceName: 'CS Study Group',
    metadata: {
      timestamp: '2024-01-15T10:00:00Z',
      priority: 'high',
      actionUrl: '/spaces/space-123/messages/message-123',
      category: 'mention',
      tags: ['mention', 'chat']
    },
    delivery: {
      channels: ['push', 'in_app'],
      sent: true,
      sentAt: '2024-01-15T10:00:01Z',
      delivered: false,
      clicked: false
    },
    status: 'unread',
    isActive: true
  };

  const mockPreferences = {
    userId: 'test-user-123',
    globalSettings: {
      enabled: true,
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00',
        timezone: 'UTC'
      },
      maxNotificationsPerHour: 10,
      groupSimilar: true
    },
    channels: {
      push: {
        enabled: true,
        types: ['mention', 'tool_update', 'space_event', 'system_announcement']
      },
      email: {
        enabled: false,
        types: ['system_announcement'],
        frequency: 'daily'
      },
      inApp: {
        enabled: true,
        types: ['mention', 'tool_update', 'space_event', 'system_announcement', 'message_reaction']
      }
    },
    typeSettings: {
      mention: { enabled: true, channels: ['push', 'in_app'], priority: 'high' },
      tool_update: { enabled: true, channels: ['in_app'], priority: 'normal' }
    },
    spaceSettings: {},
    updatedAt: '2024-01-15T09:00:00Z'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.log.mockClear();
    consoleSpy.error.mockClear();

    // Setup default mocks
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);
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

  describe('POST - Create Live Notification', () => {
    beforeEach(() => {
      // Mock preferences lookup
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockPreferences
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({ size: 2 } as any);
    });

    it('creates a notification successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'You were mentioned',
          content: 'Someone mentioned you in a message',
          sourceId: 'message-123',
          sourceType: 'message',
          spaceId: 'space-123',
          deliveryChannels: ['push', 'in_app']
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notification.id).toMatch(/^notif_target-user-456_\d+_[a-z0-9]+$/);
      expect(responseData.notification.type).toBe('mention');
      expect(responseData.notification.deliveryChannels).toContain('push');
      expect(vi.mocked(setDoc)).toHaveBeenCalled();
      expect(vi.mocked(addDoc)).toHaveBeenCalled(); // Broadcasting
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 400 for missing required fields', async () => {
      const testCases = [
        { type: 'mention', title: 'Test', content: 'Test', sourceId: 'src', sourceType: 'message' }, // Missing targetUserId
        { targetUserId: 'user', title: 'Test', content: 'Test', sourceId: 'src', sourceType: 'message' }, // Missing type
        { targetUserId: 'user', type: 'mention', content: 'Test', sourceId: 'src', sourceType: 'message' }, // Missing title
        { targetUserId: 'user', type: 'mention', title: 'Test', sourceId: 'src', sourceType: 'message' }, // Missing content
        { targetUserId: 'user', type: 'mention', title: 'Test', content: 'Test', sourceType: 'message' }, // Missing sourceId
        { targetUserId: 'user', type: 'mention', title: 'Test', content: 'Test', sourceId: 'src' }, // Missing sourceType
      ];

      for (const testCase of testCases) {
        const request = new NextRequest('http://localhost/api/realtime/notifications', {
          method: 'POST',
          body: JSON.stringify(testCase)
        });

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Target user ID, type, title, content, source ID, and source type are required');
      }
    });

    it('respects user notification preferences', async () => {
      const restrictivePreferences = {
        ...mockPreferences,
        globalSettings: { ...mockPreferences.globalSettings, enabled: false }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => restrictivePreferences
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notification).toBeNull();
      expect(responseData.message).toBe('Notification blocked by user preferences');
    });

    it('handles quiet hours restrictions', async () => {
      const quietHoursPreferences = {
        ...mockPreferences,
        globalSettings: {
          ...mockPreferences.globalSettings,
          quietHours: {
            enabled: true,
            startTime: '00:00', // Covers current time
            endTime: '23:59',
            timezone: 'UTC'
          }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => quietHoursPreferences
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notification).toBeNull();
    });

    it('includes space name when spaceId provided', async () => {
      const mockSpace = { name: 'Test Space' };
      
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockPreferences
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockSpace
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'space_event',
          title: 'New event in space',
          content: 'An event was created',
          sourceId: 'event-123',
          sourceType: 'event',
          spaceId: 'space-456'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('handles different notification types', async () => {
      const notificationTypes = [
        'mention',
        'tool_update',
        'space_event',
        'system_announcement',
        'message_reaction',
        'space_invitation',
        'tool_deployment'
      ];

      for (const type of notificationTypes) {
        const request = new NextRequest('http://localhost/api/realtime/notifications', {
          method: 'POST',
          body: JSON.stringify({
            targetUserId: 'target-user-456',
            type,
            title: `Test ${type}`,
            content: `Test ${type} notification`,
            sourceId: 'source-123',
            sourceType: 'message'
          })
        });

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
        expect(responseData.notification?.type).toBe(type);
      }
    });

    it('handles notification batching for non-urgent notifications', async () => {
      vi.mocked(getDocs).mockResolvedValueOnce({ size: 15 } as any) // Over rate limit
        .mockResolvedValueOnce({
          empty: false,
          docs: [{
            ref: {},
            data: () => ({ notifications: [], updatedAt: '2024-01-15T09:00:00Z' })
          }]
        } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'tool_update',
          title: 'Tool updated',
          content: 'A tool has been updated',
          sourceId: 'tool-123',
          sourceType: 'tool',
          metadata: { priority: 'normal' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalled(); // Added to batch
    });

    it('sends urgent notifications immediately', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'system_announcement',
          title: 'Urgent system update',
          content: 'System maintenance required',
          sourceId: 'system-123',
          sourceType: 'system',
          metadata: { priority: 'urgent' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'delivery.sent': true
        })
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining('Sending notification'),
        expect.any(Array)
      );
    });
  });

  describe('GET - Get Live Notifications', () => {
    beforeEach(() => {
      const mockNotifications = [
        { ...mockNotification, id: 'notif-1' },
        { ...mockNotification, id: 'notif-2', status: 'read' },
        { ...mockNotification, id: 'notif-3', type: 'tool_update' }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: mockNotifications.map(notif => ({
          id: notif.id,
          data: () => notif
        })),
        size: mockNotifications.length
      } as any);
    });

    it('gets user notifications successfully', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?status=unread&limit=25'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notifications).toHaveLength(3);
      expect(responseData.summary).toHaveProperty('unreadCount');
      expect(responseData.summary).toHaveProperty('totalCount');
      expect(responseData.summary).toHaveProperty('hasMore');
    });

    it('filters notifications by status', async () => {
      const readNotifications = [
        { ...mockNotification, id: 'notif-1', status: 'read' },
        { ...mockNotification, id: 'notif-2', status: 'read' }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: readNotifications.map(notif => ({
          id: notif.id,
          data: () => notif
        })),
        size: readNotifications.length
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?status=read'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notifications).toHaveLength(2);
      expect(responseData.notifications.every((n: any) => n.status === 'read')).toBe(true);
    });

    it('filters notifications by type', async () => {
      const toolNotifications = [
        { ...mockNotification, id: 'notif-1', type: 'tool_update' }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: toolNotifications.map(notif => ({
          id: notif.id,
          data: () => notif
        })),
        size: toolNotifications.length
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?type=tool_update'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notifications).toHaveLength(1);
      expect(responseData.notifications[0].type).toBe('tool_update');
    });

    it('filters notifications by space', async () => {
      const spaceNotifications = [
        { ...mockNotification, id: 'notif-1', spaceId: 'space-456' }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: spaceNotifications.map(notif => ({
          id: notif.id,
          data: () => notif
        })),
        size: spaceNotifications.length
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?spaceId=space-456'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notifications).toHaveLength(1);
      expect(responseData.notifications[0].spaceId).toBe('space-456');
    });

    it('handles pagination with before parameter', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: 'before-notif'
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?before=before-notif'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(vi.mocked(startAfter)).toHaveBeenCalled();
    });

    it('excludes expired notifications by default', async () => {
      const now = new Date();
      const expiredNotification = {
        ...mockNotification,
        id: 'expired-notif',
        metadata: {
          ...mockNotification.metadata,
          expiresAt: new Date(now.getTime() - 1000).toISOString() // Expired 1 second ago
        }
      };

      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: mockNotification.id, data: () => mockNotification },
          { id: expiredNotification.id, data: () => expiredNotification }
        ],
        size: 2
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notifications).toHaveLength(1);
      expect(responseData.notifications[0].id).toBe(mockNotification.id);
    });

    it('includes expired notifications when requested', async () => {
      const expiredNotification = {
        ...mockNotification,
        id: 'expired-notif',
        metadata: {
          ...mockNotification.metadata,
          expiresAt: new Date(Date.now() - 1000).toISOString()
        }
      };

      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: mockNotification.id, data: () => mockNotification },
          { id: expiredNotification.id, data: () => expiredNotification }
        ],
        size: 2
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?includeExpired=true'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notifications).toHaveLength(2);
    });

    it('applies custom limit parameter', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?limit=10'
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(10);
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/notifications');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });
  });

  describe('PUT - Update Notification Status', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ ...mockNotification, userId: mockUser.uid })
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: 'notif-1', ref: {} },
          { id: 'notif-2', ref: {} }
        ],
        size: 2
      } as any);
    });

    it('marks specific notifications as read', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1', 'notif-2'],
          action: 'mark_read'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('mark_read');
      expect(responseData.updatedCount).toBe(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'read'
        })
      );
    });

    it('marks notifications as unread', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'mark_unread'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('mark_unread');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'unread',
          readAt: null
        })
      );
    });

    it('archives notifications', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'archive'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('archive');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'archived'
        })
      );
    });

    it('dismisses notifications', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'dismiss'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('dismiss');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'dismissed'
        })
      );
    });

    it('marks notification as clicked', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'mark_clicked'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('mark_clicked');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'delivery.clicked': true
        })
      );
    });

    it('marks all notifications as read', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          markAllAsRead: true
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('mark_all_read');
      expect(responseData.updatedCount).toBe(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledTimes(2);
    });

    it('returns 400 for missing action', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({})
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Action is required');
    });

    it('returns 400 for missing notification IDs when action specified', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'mark_read',
          notificationIds: []
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Notification IDs are required');
    });

    it('returns 400 for invalid action', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'invalid_action'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Invalid action');
    });

    it('only updates notifications owned by user', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ ...mockNotification, userId: mockUser.uid })
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ ...mockNotification, userId: 'other-user' })
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['owned-notif', 'other-notif'],
          action: 'mark_read'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.updatedCount).toBe(1); // Only updated owned notification
    });

    it('broadcasts status updates', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'PUT',
        body: JSON.stringify({
          notificationIds: ['notif-1'],
          action: 'mark_read'
        })
      });

      const response = await PUT(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'notification',
          channel: `user:${mockUser.uid}:notifications`,
          content: expect.objectContaining({
            action: 'status_updated',
            updateType: 'mark_read'
          })
        })
      );
    });
  });

  describe('DELETE - Delete Notifications', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ ...mockNotification, userId: mockUser.uid })
      } as any);

      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { ref: { delete: vi.fn() } },
          { ref: { delete: vi.fn() } }
        ],
        size: 2
      } as any);
    });

    it('deletes specific notification', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?notificationId=notif-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.deletedCount).toBe(1);
      expect(responseData.message).toBe('Deleted 1 notifications');
      expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
    });

    it('deletes all user notifications', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?deleteAll=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.deletedCount).toBe(2);
      expect(responseData.message).toBe('Deleted 2 notifications');
    });

    it('deletes notifications older than specified date', async () => {
      const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const request = new NextRequest(
        `http://localhost/api/realtime/notifications?olderThan=${cutoffDate}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.deletedCount).toBe(2);
    });

    it('returns 400 for missing parameters', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/notifications',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Notification ID, deleteAll, or olderThan parameter required');
    });

    it('only deletes notifications owned by user', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ ...mockNotification, userId: 'other-user' })
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/notifications?notificationId=notif-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.deletedCount).toBe(0); // Nothing deleted
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to create notification');
    });

    it('handles Firebase errors gracefully', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to create notification');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error creating live notification:',
        expect.any(Error)
      );
    });

    it('handles unauthorized requests in all methods', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const methods = [
        { method: 'POST', body: JSON.stringify({ targetUserId: 'test', type: 'mention', title: 'test', content: 'test', sourceId: 'test', sourceType: 'message' }) },
        { method: 'GET', url: '' },
        { method: 'PUT', body: JSON.stringify({ action: 'mark_read', notificationIds: ['test'] }) },
        { method: 'DELETE', url: '?notificationId=test' }
      ];

      for (const { method, body, url } of methods) {
        const request = new NextRequest(
          `http://localhost/api/realtime/notifications${url || ''}`,
          { method, body }
        );

        const response = method === 'POST' ? await POST(request) 
                       : method === 'GET' ? await GET(request)
                       : method === 'PUT' ? await PUT(request)
                       : await DELETE(request);

        const responseData = await response.json();

        expect(response.status).toBe(401);
        expect(responseData.error).toBe('Unauthorized');
      }
    });
  });

  describe('Notification Preferences', () => {
    it('uses default preferences when none exist', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({ size: 2 } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('respects disabled notification types', async () => {
      const disabledTypePreferences = {
        ...mockPreferences,
        typeSettings: {
          ...mockPreferences.typeSettings,
          mention: { enabled: false, channels: [], priority: 'high' }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => disabledTypePreferences
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notification).toBeNull();
    });

    it('respects space-specific settings', async () => {
      const spaceRestrictedPreferences = {
        ...mockPreferences,
        spaceSettings: {
          'space-123': {
            enabled: false,
            types: [],
            muteUntil: undefined
          }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => spaceRestrictedPreferences
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message',
          spaceId: 'space-123'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notification).toBeNull();
    });

    it('respects mute until settings', async () => {
      const mutedSpacePreferences = {
        ...mockPreferences,
        spaceSettings: {
          'space-123': {
            enabled: true,
            types: ['mention'],
            muteUntil: new Date(Date.now() + 60000).toISOString() // Muted for 1 minute
          }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mutedSpacePreferences
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message',
          spaceId: 'space-123'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.notification).toBeNull();
    });
  });

  describe('Notification Statistics', () => {
    it('updates notification statistics', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockPreferences
      } as any).mockResolvedValueOnce({
        exists: () => false
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({ size: 2 } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message',
          spaceId: 'space-123'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: 'target-user-456',
          totalNotifications: 1,
          typeBreakdown: { mention: 1 },
          spaceBreakdown: { 'space-123': 1 }
        })
      );
    });

    it('increments existing statistics', async () => {
      const existingStats = {
        totalNotifications: 5,
        typeBreakdown: { mention: 2, tool_update: 3 }
      };

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockPreferences
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => existingStats
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({ size: 2 } as any);

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'target-user-456',
          type: 'mention',
          title: 'Test',
          content: 'Test notification',
          sourceId: 'source-123',
          sourceType: 'message'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          totalNotifications: 6,
          'typeBreakdown.mention': 3
        })
      );
    });
  });
});