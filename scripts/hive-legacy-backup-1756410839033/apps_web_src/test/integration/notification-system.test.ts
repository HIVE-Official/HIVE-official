import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testEnvSetup, mockFirestore, mockAuth, mockUser, createMockRequest } from '../setup';

const mockNotification = {
  id: 'notif-123',
  userId: 'user-123',
  type: 'connection_request',
  title: 'New Connection Request',
  message: 'John Doe wants to connect with you',
  data: {
    fromUserId: 'user-456',
    fromUserName: 'John Doe',
    fromUserAvatar: 'https://example.com/avatar.jpg'
  },
  read: false,
  createdAt: '2024-07-30T10:00:00Z',
  channels: ['in_app', 'push']
};

const mockNotificationSettings = {
  userId: 'user-123',
  preferences: {
    email: {
      enabled: true,
      frequency: 'immediate',
      types: ['connection_request', 'tool_shared', 'space_invitation']
    },
    push: {
      enabled: true,
      types: ['connection_request', 'direct_message', 'tool_review']
    },
    inApp: {
      enabled: true,
      types: ['all']
    },
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00',
      timezone: 'America/New_York'
    }
  }
};

vi.mock('../../lib/firebase', () => mockFirestore);
vi.mock('../../lib/auth', () => mockAuth);

// Mock push notification service
vi.mock('../../lib/push-notifications', () => ({
  sendPushNotification: vi.fn().mockResolvedValue({ success: true }),
  subscribeToTopic: vi.fn().mockResolvedValue({ success: true }),
  unsubscribeFromTopic: vi.fn().mockResolvedValue({ success: true })
}));

// Mock email service
vi.mock('../../lib/email-service', () => ({
  sendEmail: vi.fn().mockResolvedValue({ messageId: 'email-123' }),
  sendTemplatedEmail: vi.fn().mockResolvedValue({ messageId: 'email-124' })
}));

describe('Notification System Integration Tests', () => {
  beforeEach(() => {
    testEnvSetup();
    vi.clearAllMocks();
  });

  describe('Notification Creation and Delivery', () => {
    it('creates and delivers multi-channel notifications', async () => {
      const { POST: notificationsPOST } = await import('../../app/api/notifications/route');
      
      const notificationData = {
        recipients: ['user-123', 'user-456'],
        type: 'tool_shared',
        title: 'New Tool Shared',
        message: 'A tool has been shared with you',
        data: {
          toolId: 'tool-789',
          toolName: 'Grade Calculator',
          sharedBy: 'user-789'
        },
        channels: ['in_app', 'push', 'email'],
        priority: 'normal'
      };

      const request = createMockRequest('POST', '/api/notifications', notificationData);
      const response = await notificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.notifications).toHaveLength(2);
      expect(data.delivery.inApp).toBe(2);
      expect(data.delivery.push).toBe(2);
      expect(data.delivery.email).toBe(2);
      
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledTimes(2);
    });

    it('handles notification preferences and filtering', async () => {
      const { POST: notificationsPOST } = await import('../../app/api/notifications/route');
      
      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockNotificationSettings
      } as any);

      const notificationData = {
        recipients: ['user-123'],
        type: 'space_invitation',
        title: 'Space Invitation',
        message: 'You\'ve been invited to join a space',
        channels: ['email', 'push']
      };

      const request = createMockRequest('POST', '/api/notifications', notificationData);
      const response = await notificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.delivery.email).toBe(0); // Email disabled for this type
      expect(data.delivery.push).toBe(0); // Push disabled for this type
      expect(data.delivery.inApp).toBe(1); // In-app always enabled
    });

    it('respects quiet hours and do not disturb settings', async () => {
      const { POST: notificationsPOST } = await import('../../app/api/notifications/route');
      
      // Mock current time during quiet hours (23:00)
      vi.spyOn(Date, 'now').mockReturnValue(new Date('2024-07-30T23:00:00Z').getTime());
      
      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockNotificationSettings
      } as any);

      const notificationData = {
        recipients: ['user-123'],
        type: 'tool_review',
        title: 'New Tool Review',
        message: 'Someone reviewed your tool',
        channels: ['push', 'email'],
        priority: 'normal'
      };

      const request = createMockRequest('POST', '/api/notifications', notificationData);
      const response = await notificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.delivery.push).toBe(0); // Suppressed due to quiet hours
      expect(data.delivery.email).toBe(0); // Suppressed due to quiet hours
      expect(data.scheduled).toBe(1); // Scheduled for after quiet hours
    });

    it('handles urgent notifications that bypass quiet hours', async () => {
      const { POST: notificationsPOST } = await import('../../app/api/notifications/route');
      
      vi.spyOn(Date, 'now').mockReturnValue(new Date('2024-07-30T23:00:00Z').getTime());
      
      const urgentNotification = {
        recipients: ['user-123'],
        type: 'security_alert',
        title: 'Security Alert',
        message: 'Suspicious login detected',
        channels: ['push', 'email', 'sms'],
        priority: 'urgent'
      };

      const request = createMockRequest('POST', '/api/notifications', urgentNotification);
      const response = await notificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.delivery.push).toBe(1); // Urgent notifications bypass quiet hours
      expect(data.delivery.email).toBe(1);
      expect(data.scheduled).toBe(0);
    });
  });

  describe('Notification Retrieval and Management', () => {
    it('fetches user notifications with pagination and filtering', async () => {
      const { GET: notificationsGET } = await import('../../app/api/notifications/route');
      
      const request = createMockRequest('GET', '/api/notifications?read=false&type=connection_request&limit=20');
      const response = await notificationsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.notifications).toBeInstanceOf(Array);
      expect(data.unreadCount).toBeGreaterThanOrEqual(0);
      expect(data.pagination).toMatchObject({
        page: 1,
        limit: 20,
        hasMore: expect.any(Boolean)
      });
    });

    it('marks notifications as read', async () => {
      const { PUT: notificationPUT } = await import('../../app/api/notifications/[notificationId]/route');
      
      const updateData = { read: true };
      const request = createMockRequest('PUT', '/api/notifications/notif-123', updateData);
      const response = await notificationPUT(request, { params: { notificationId: 'notif-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.notification.read).toBe(true);
      expect(data.notification.readAt).toBeDefined();
      
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ read: true, readAt: expect.any(String) })
      );
    });

    it('handles bulk notification operations', async () => {
      const { POST: bulkNotificationsPOST } = await import('../../app/api/notifications/bulk/route');
      
      const bulkData = {
        action: 'mark_read',
        notificationIds: ['notif-123', 'notif-456', 'notif-789'],
        filters: {
          type: 'connection_request',
          olderThan: '7days'
        }
      };

      const request = createMockRequest('POST', '/api/notifications/bulk', bulkData);
      const response = await bulkNotificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.processed).toBe(3);
      expect(data.successful).toBe(3);
      expect(data.failed).toBe(0);
    });

    it('deletes old notifications automatically', async () => {
      const { DELETE: notificationsCleanupDELETE } = await import('../../app/api/notifications/cleanup/route');
      
      const cleanupData = {
        olderThan: '30days',
        keepUnread: true,
        keepImportantTypes: ['security_alert', 'system_announcement']
      };

      const request = createMockRequest('DELETE', '/api/notifications/cleanup', cleanupData);
      const response = await notificationsCleanupDELETE(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.deleted).toBeGreaterThanOrEqual(0);
      expect(data.kept).toBeGreaterThanOrEqual(0);
      expect(data.summary).toBeDefined();
    });
  });

  describe('Push Notification Management', () => {
    it('registers device for push notifications', async () => {
      const { POST: pushRegisterPOST } = await import('../../app/api/notifications/push/register/route');
      
      const registrationData = {
        token: 'fcm-token-123456',
        platform: 'web',
        userAgent: 'Chrome/91.0',
        topics: ['user-123', 'general-announcements']
      };

      const request = createMockRequest('POST', '/api/notifications/push/register', registrationData);
      const response = await pushRegisterPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.registration.token).toBe('fcm-token-123456');
      expect(data.registration.userId).toBe(mockUser.uid);
      expect(data.topicsSubscribed).toBe(2);
    });

    it('sends targeted push notifications', async () => {
      const { POST: pushSendPOST } = await import('../../app/api/notifications/push/send/route');
      
      const pushData = {
        recipients: ['user-123'],
        title: 'New Message',
        body: 'You have a new message from John',
        icon: '/icons/message.png',
        badge: '/icons/badge.png',
        data: {
          type: 'message',
          messageId: 'msg-123',
          senderId: 'user-456'
        },
        actions: [
          { action: 'reply', title: 'Reply' },
          { action: 'view', title: 'View' }
        ]
      };

      const request = createMockRequest('POST', '/api/notifications/push/send', pushData);
      const response = await pushSendPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.sent).toBe(1);
      expect(data.failed).toBe(0);
      expect(data.results[0].success).toBe(true);
    });

    it('manages push notification topics and subscriptions', async () => {
      const { PUT: pushTopicsPUT } = await import('../../app/api/notifications/push/topics/route');
      
      const topicsData = {
        subscribe: ['cs-students', 'tool-updates'],
        unsubscribe: ['general-announcements'],
        deviceToken: 'fcm-token-123456'
      };

      const request = createMockRequest('PUT', '/api/notifications/push/topics', topicsData);
      const response = await pushTopicsPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.subscribed).toBe(2);
      expect(data.unsubscribed).toBe(1);
      expect(data.currentTopics).toBeInstanceOf(Array);
    });
  });

  describe('Email Notification System', () => {
    it('sends templated email notifications', async () => {
      const { POST: emailNotificationsPOST } = await import('../../app/api/notifications/email/route');
      
      const emailData = {
        recipients: ['user@university.edu'],
        template: 'tool_shared',
        data: {
          userName: 'John Doe',
          toolName: 'Grade Calculator',
          sharedBy: 'Jane Smith',
          toolUrl: 'https://hive.app/tools/grade-calculator'
        },
        priority: 'normal'
      };

      const request = createMockRequest('POST', '/api/notifications/email', emailData);
      const response = await emailNotificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.sent).toBe(1);
      expect(data.messageIds).toHaveLength(1);
      expect(data.template).toBe('tool_shared');
    });

    it('handles email digest notifications', async () => {
      const { POST: emailDigestPOST } = await import('../../app/api/notifications/email/digest/route');
      
      const digestData = {
        recipients: ['user-123'],
        period: 'weekly',
        content: {
          newConnections: 3,
          toolsShared: 5,
          spacesJoined: 2,
          upcomingEvents: [
            { title: 'CS Career Fair', date: '2024-08-15' }
          ]
        }
      };

      const request = createMockRequest('POST', '/api/notifications/email/digest', digestData);
      const response = await emailDigestPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.digest.sent).toBe(1);
      expect(data.digest.period).toBe('weekly');
    });

    it('manages email preferences and unsubscriptions', async () => {
      const { PUT: emailPreferencesPUT } = await import('../../app/api/notifications/email/preferences/route');
      
      const preferencesData = {
        enabled: true,
        frequency: 'daily',
        types: {
          connection_request: true,
          tool_shared: true,
          space_invitation: false,
          system_announcement: true
        },
        digest: {
          enabled: true,
          frequency: 'weekly',
          day: 'monday'
        }
      };

      const request = createMockRequest('PUT', '/api/notifications/email/preferences', preferencesData);
      const response = await emailPreferencesPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.preferences.enabled).toBe(true);
      expect(data.preferences.frequency).toBe('daily');
      expect(data.updated).toBe(true);
    });
  });

  describe('Real-time Notification Delivery', () => {
    it('delivers notifications via WebSocket', async () => {
      const { POST: realtimeNotificationsPOST } = await import('../../app/api/notifications/realtime/route');
      
      const realtimeData = {
        recipients: ['user-123'],
        event: 'notification_received',
        data: {
          id: 'notif-456',
          type: 'direct_message',
          title: 'New Message',
          message: 'You have a new direct message',
          timestamp: '2024-07-30T14:30:00Z'
        }
      };

      const request = createMockRequest('POST', '/api/notifications/realtime', realtimeData);
      const response = await realtimeNotificationsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.delivered).toBe(1);
      expect(data.event).toBe('notification_received');
      expect(data.connections).toBeInstanceOf(Array);
    });

    it('handles notification acknowledgments', async () => {
      const { POST: notificationAckPOST } = await import('../../app/api/notifications/ack/route');
      
      const ackData = {
        notificationId: 'notif-123',
        action: 'received',
        channel: 'websocket',
        timestamp: '2024-07-30T14:30:00Z'
      };

      const request = createMockRequest('POST', '/api/notifications/ack', ackData);
      const response = await notificationAckPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.acknowledged).toBe(true);
      expect(data.notification.deliveryStatus.websocket).toBe('delivered');
    });

    it('tracks notification delivery analytics', async () => {
      const { GET: notificationAnalyticsGET } = await import('../../app/api/notifications/analytics/route');
      
      const request = createMockRequest('GET', '/api/notifications/analytics?period=7days');
      const response = await notificationAnalyticsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.summary).toMatchObject({
        sent: expect.any(Number),
        delivered: expect.any(Number),
        read: expect.any(Number),
        failed: expect.any(Number)
      });
      expect(data.breakdown).toBeInstanceOf(Object);
      expect(data.channels).toMatchObject({
        inApp: expect.any(Object),
        push: expect.any(Object),
        email: expect.any(Object)
      });
    });
  });

  describe('Notification Settings Management', () => {
    it('updates comprehensive notification preferences', async () => {
      const { PUT: notificationSettingsPUT } = await import('../../app/api/notifications/settings/route');
      
      const settingsData = {
        global: {
          enabled: true,
          quietHours: {
            enabled: true,
            start: '22:00',
            end: '07:00',
            timezone: 'America/New_York'
          }
        },
        channels: {
          inApp: { enabled: true },
          push: { 
            enabled: true,
            sound: true,
            vibration: false
          },
          email: {
            enabled: true,
            frequency: 'immediate'
          }
        },
        types: {
          connection_request: { inApp: true, push: true, email: false },
          tool_shared: { inApp: true, push: false, email: true },
          space_invitation: { inApp: true, push: true, email: true }
        }
      };

      const request = createMockRequest('PUT', '/api/notifications/settings', settingsData);
      const response = await notificationSettingsPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.settings.global.enabled).toBe(true);
      expect(data.settings.channels.push.enabled).toBe(true);
      expect(data.updated).toBe(true);
    });

    it('handles notification frequency management', async () => {
      const { PUT: notificationFrequencyPUT } = await import('../../app/api/notifications/frequency/route');
      
      const frequencyData = {
        email: {
          immediate: ['security_alert', 'direct_message'],
          hourly: ['connection_request', 'tool_review'],
          daily: ['space_activity', 'tool_shared'],
          weekly: ['platform_updates', 'digest']
        },
        push: {
          immediate: ['direct_message', 'connection_request'],
          batched: ['tool_shared', 'space_invitation']
        }
      };

      const request = createMockRequest('PUT', '/api/notifications/frequency', frequencyData);
      const response = await notificationFrequencyPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.frequency.email.immediate).toContain('security_alert');
      expect(data.frequency.push.batched).toContain('tool_shared');
    });
  });
});