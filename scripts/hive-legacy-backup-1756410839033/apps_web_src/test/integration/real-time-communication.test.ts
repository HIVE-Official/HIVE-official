import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the actual API route handlers
import { GET as websocketGET, POST as websocketPOST } from '../../app/api/realtime/websocket/route';
import { GET as chatGET, POST as chatPOST } from '../../app/api/realtime/chat/route';
import { GET as notificationsGET, POST as notificationsPOST } from '../../app/api/realtime/notifications/route';
import { GET as presenceGET, POST as presencePOST } from '../../app/api/realtime/presence/route';

// Mock Firebase
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
    now: vi.fn(() => ({ toDate: () => new Date() })),
    fromDate: vi.fn((date) => ({ toDate: () => date }))
  }
}));

vi.mock('@hive/core/server', () => ({
  db: {}
}));

vi.mock('@/lib/server-auth', () => ({
  getCurrentUser: vi.fn()
}));

import { 
  collection, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc,
  query, where, getDocs, orderBy, limit as fbLimit, startAfter, Timestamp
} from 'firebase/firestore';
import { getCurrentUser } from '@/lib/server-auth';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Real-time Communication Integration Tests', () => {
  const mockUser = {
    uid: 'user-123',
    email: 'student@university.edu',
    displayName: 'Test Student'
  };

  const mockWebSocketConnection = {
    id: 'ws-123',
    userId: 'user-123',
    socketId: 'socket-abc-123',
    connectionType: 'chat',
    status: 'connected',
    channels: ['space:space-123:chat', 'user:user-123:notifications'],
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      ipAddress: '192.168.1.100',
      sessionId: 'session-456'
    },
    connectedAt: '2024-01-15T10:00:00Z',
    lastPing: '2024-01-15T10:05:00Z',
    pingInterval: 30000,
    maxReconnectAttempts: 5,
    reconnectCount: 0
  };

  const mockChatMessage = {
    id: 'msg-123',
    channelId: 'space:space-123:chat',
    spaceId: 'space-123',
    senderId: 'user-123',
    senderName: 'Test Student',
    content: 'Hey everyone! Ready for the study session?',
    messageType: 'text',
    timestamp: '2024-01-15T10:30:00Z',
    edited: false,
    reactions: {},
    threadId: null,
    mentions: [],
    attachments: [],
    metadata: {
      client: 'web',
      edited: false,
      pinned: false,
      priority: 'normal'
    },
    delivery: {
      sent: true,
      delivered: [],
      read: [],
      failed: []
    }
  };

  const mockUserPresence = {
    userId: 'user-123',
    userName: 'Test Student',
    status: 'online',
    lastSeen: '2024-01-15T10:30:00Z',
    currentActivity: {
      type: 'chatting',
      context: {
        spaceId: 'space-123',
        spaceName: 'CS Study Group'
      },
      startedAt: '2024-01-15T10:25:00Z'
    },
    device: {
      type: 'desktop',
      platform: 'Mac OS',
      browser: 'Chrome'
    },
    connections: [{
      connectionId: 'ws-123',
      establishedAt: '2024-01-15T10:00:00Z',
      lastPing: '2024-01-15T10:30:00Z'
    }],
    settings: {
      showOnlineStatus: true,
      showCurrentActivity: true,
      allowDisturbance: true,
      invisibleMode: false
    }
  };

  const mockNotification = {
    id: 'notif-123',
    userId: 'user-123',
    type: 'mention',
    title: 'You were mentioned in CS Study Group',
    content: '@teststudent check out this algorithm solution',
    sourceId: 'msg-456',
    sourceType: 'message',
    spaceId: 'space-123',
    spaceName: 'CS Study Group',
    metadata: {
      timestamp: '2024-01-15T10:35:00Z',
      priority: 'high',
      actionUrl: '/spaces/space-123/chat',
      category: 'social'
    },
    delivery: {
      channels: ['in_app', 'push'],
      sent: true,
      delivered: true,
      clicked: false
    },
    status: 'unread',
    isActive: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
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
    vi.mocked(Timestamp.now).mockReturnValue({ toDate: () => new Date() } as any);
    vi.mocked(Timestamp.fromDate).mockImplementation((date) => ({ toDate: () => date } as any));

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      id: 'user-123',
      data: () => mockWebSocketConnection
    } as any);
    
    vi.mocked(setDoc).mockResolvedValue(undefined);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);
    vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-123' } as any);
    
    vi.mocked(getDocs).mockResolvedValue({
      docs: [{
        id: 'ws-123',
        data: () => mockWebSocketConnection
      }],
      size: 1,
      empty: false
    } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('WebSocket Connection Management', () => {
    it('establishes WebSocket connection successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          connectionType: 'chat',
          channels: ['space:space-123:chat'],
          clientInfo: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            platform: 'web'
          }
        })
      });

      const response = await websocketPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connection.userId).toBe(mockUser.uid);
      expect(responseData.connection.connectionType).toBe('chat');
      expect(responseData.connection.status).toBe('connected');

      // Verify connection was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          connectionType: 'chat',
          status: 'connected'
        })
      );
    });

    it('manages multiple connection types simultaneously', async () => {
      const connectionTypes = ['chat', 'notifications', 'presence', 'tool_updates'];

      for (const type of connectionTypes) {
        const request = new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: JSON.stringify({
            connectionType: type,
            channels: [`user:${mockUser.uid}:${type}`]
          })
        });

        const response = await websocketPOST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.connection.connectionType).toBe(type);
      }

      // Should have created multiple connections
      expect(vi.mocked(setDoc)).toHaveBeenCalledTimes(connectionTypes.length);
    });

    it('handles connection heartbeat and keep-alive', async () => {
      const heartbeatRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'heartbeat',
          connectionId: 'ws-123',
          timestamp: new Date().toISOString()
        })
      });

      const response = await websocketPOST(heartbeatRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connection.lastPing).toBeDefined();

      // Verify heartbeat was recorded
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          lastPing: expect.any(String),
          status: 'connected'
        })
      );
    });

    it('manages channel subscriptions dynamically', async () => {
      const subscribeRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'subscribe',
          connectionId: 'ws-123',
          channels: ['space:space-456:chat', 'space:space-789:announcements']
        })
      });

      const response = await websocketPOST(subscribeRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connection.channels).toContain('space:space-456:chat');

      // Verify subscription was updated
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          channels: expect.arrayContaining(['space:space-456:chat'])
        })
      );
    });

    it('handles connection cleanup on disconnect', async () => {
      const disconnectRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'disconnect',
          connectionId: 'ws-123',
          reason: 'user_initiated'
        })
      });

      const response = await websocketPOST(disconnectRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      // Verify connection was marked as disconnected
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'disconnected',
          disconnectedAt: expect.any(String)
        })
      );
    });

    it('implements connection recovery and reconnection', async () => {
      const reconnectRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'reconnect',
          previousConnectionId: 'ws-123',
          clientState: {
            lastMessageId: 'msg-456',
            channelStates: {
              'space:space-123:chat': { lastSeen: '2024-01-15T10:25:00Z' }
            }
          }
        })
      });

      const response = await websocketPOST(reconnectRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connection.status).toBe('connected');
      expect(responseData.missedMessages).toBeDefined();

      // Should query for missed messages
      expect(vi.mocked(getDocs)).toHaveBeenCalledWith(
        expect.objectContaining({})
      );
    });
  });

  describe('Real-time Chat System', () => {
    it('sends and receives chat messages', async () => {
      const sendMessageRequest = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'space:space-123:chat',
          content: 'Hello everyone! Ready for today\'s study session?',
          messageType: 'text',
          spaceId: 'space-123'
        })
      });

      const response = await chatPOST(sendMessageRequest);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.message.content).toBe('Hello everyone! Ready for today\'s study session?');
      expect(responseData.message.senderId).toBe(mockUser.uid);

      // Verify message was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          channelId: 'space:space-123:chat',
          senderId: mockUser.uid,
          content: 'Hello everyone! Ready for today\'s study session?',
          messageType: 'text'
        })
      );

      // Verify broadcast was initiated
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'chat',
          channel: 'space:space-123:chat',
          content: expect.objectContaining({
            action: 'new_message',
            message: expect.any(Object)
          })
        })
      );
    });

    it('handles message reactions and interactions', async () => {
      const reactionRequest = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          action: 'react',
          messageId: 'msg-123',
          reaction: '👍',
          channelId: 'space:space-123:chat'
        })
      });

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockChatMessage
      } as any);

      const response = await chatPOST(reactionRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      // Verify reaction was added
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          [`reactions.👍.${mockUser.uid}`]: expect.any(String)
        })
      );
    });

    it('supports threaded conversations', async () => {
      const threadReplyRequest = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'space:space-123:chat',
          content: 'Yes, I\'ll bring my algorithms textbook!',
          messageType: 'text',
          threadId: 'msg-123',
          spaceId: 'space-123'
        })
      });

      const response = await chatPOST(threadReplyRequest);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.message.threadId).toBe('msg-123');

      // Verify thread reply was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          threadId: 'msg-123',
          content: 'Yes, I\'ll bring my algorithms textbook!'
        })
      );
    });

    it('handles message editing and deletion', async () => {
      // Edit message
      const editRequest = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          action: 'edit',
          messageId: 'msg-123',
          content: 'Updated: Hey everyone! Ready for the study session at 3 PM?',
          channelId: 'space:space-123:chat'
        })
      });

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockChatMessage
      } as any);

      const editResponse = await chatPOST(editRequest);
      const editData = await editResponse.json();

      expect(editResponse.status).toBe(200);
      expect(editData.success).toBe(true);

      // Verify message was updated
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          content: 'Updated: Hey everyone! Ready for the study session at 3 PM?',
          edited: true,
          editedAt: expect.any(String)
        })
      );
    });

    it('retrieves chat history with pagination', async () => {
      const chatHistory = Array(25).fill(null).map((_, i) => ({
        ...mockChatMessage,
        id: `msg-${i}`,
        content: `Message ${i}`,
        timestamp: new Date(Date.now() - i * 60000).toISOString()
      }));

      vi.mocked(getDocs).mockResolvedValue({
        docs: chatHistory.slice(0, 20).map(msg => ({
          id: msg.id,
          data: () => msg
        })),
        size: 20
      } as any);

      const historyRequest = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=space:space-123:chat&limit=20'
      );

      const response = await chatGET(historyRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.messages).toHaveLength(20);
      expect(responseData.pagination.hasMore).toBe(true);
    });

    it('implements message moderation and filtering', async () => {
      const inappropriateMessage = {
        channelId: 'space:space-123:chat',
        content: 'This message contains inappropriate content that should be filtered',
        messageType: 'text',
        spaceId: 'space-123'
      };

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify(inappropriateMessage)
      });

      const response = await chatPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Message content violates community guidelines');
      expect(responseData.moderationFlags).toContain('inappropriate_content');
    });
  });

  describe('User Presence Management', () => {
    it('tracks and updates user presence status', async () => {
      const updatePresenceRequest = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'busy',
          activity: {
            type: 'studying',
            context: {
              spaceId: 'space-456',
              spaceName: 'Advanced Algorithms'
            },
            details: 'Working on dynamic programming problems'
          }
        })
      });

      const response = await presencePOST(updatePresenceRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.presence.status).toBe('busy');
      expect(responseData.presence.activity.type).toBe('studying');

      // Verify presence was updated
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'busy',
          currentActivity: expect.objectContaining({
            type: 'studying',
            details: 'Working on dynamic programming problems'
          })
        })
      );
    });

    it('provides space-based presence information', async () => {
      const spacePresenceRequest = new NextRequest(
        'http://localhost/api/realtime/presence?spaceId=space-123'
      );

      vi.mocked(getDocs).mockResolvedValue({
        docs: [{
          id: 'user-123',
          data: () => mockUserPresence
        }, {
          id: 'user-456',
          data: () => ({
            ...mockUserPresence,
            userId: 'user-456',
            userName: 'Another Student',
            status: 'away'
          })
        }],
        size: 2
      } as any);

      const response = await presenceGET(spacePresenceRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spacePresence.activeUsers).toHaveLength(2);
      expect(responseData.spacePresence.statistics.totalOnline).toBe(2);
    });

    it('respects privacy settings for presence visibility', async () => {
      const invisibleUser = {
        ...mockUserPresence,
        settings: {
          ...mockUserPresence.settings,
          invisibleMode: true,
          showOnlineStatus: false
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => invisibleUser
      } as any);

      const presenceRequest = new NextRequest(
        'http://localhost/api/realtime/presence?userId=user-123'
      );

      // Mock as different user viewing
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-456',
        email: 'other@university.edu',
        displayName: 'Other User'
      });

      const response = await presenceGET(presenceRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence.status).toBe('offline'); // Privacy filtered
    });

    it('handles presence cleanup for disconnected users', async () => {
      const cleanupRequest = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          action: 'cleanup_stale',
          maxAge: '5m'
        })
      });

      const response = await presencePOST(cleanupRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.cleanedUp).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Real-time Notifications', () => {
    it('sends and delivers real-time notifications', async () => {
      const notificationRequest = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'user-456',
          type: 'mention',
          title: 'You were mentioned in CS Study Group',
          content: '@studentname check out this solution',
          sourceId: 'msg-789',
          sourceType: 'message',
          spaceId: 'space-123',
          deliveryChannels: ['in_app', 'push']
        })
      });

      const response = await notificationsPOST(notificationRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notification.type).toBe('mention');

      // Verify notification was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          targetUserId: 'user-456',
          type: 'mention',
          title: 'You were mentioned in CS Study Group'
        })
      );

      // Verify broadcast was initiated
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'notification',
          channel: 'user:user-456:notifications'
        })
      );
    });

    it('respects user notification preferences', async () => {
      const notificationRequest = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify({
          targetUserId: 'user-456',
          type: 'tool_update',
          title: 'Tool has been updated',
          content: 'Your Grade Calculator tool has a new version',
          sourceId: 'tool-123',
          sourceType: 'tool'
        })
      });

      // Mock user preferences that disable tool updates
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          userId: 'user-456',
          preferences: {
            tool_update: { enabled: false }
          }
        })
      } as any);

      const response = await notificationsPOST(notificationRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notification).toBeNull();
      expect(responseData.message).toBe('Notification blocked by user preferences');
    });

    it('manages notification batching and rate limiting', async () => {
      const batchedNotification = {
        targetUserId: 'user-456',
        type: 'space_event',
        title: 'Multiple events in your spaces',
        content: 'Several updates in your spaces',
        sourceId: 'batch-123',
        sourceType: 'batch',
        deliveryChannels: ['email']
      };

      const request = new NextRequest('http://localhost/api/realtime/notifications', {
        method: 'POST',
        body: JSON.stringify(batchedNotification)
      });

      const response = await notificationsPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      
      // Should be added to batch instead of sent immediately
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          batchType: 'grouped',
          notifications: expect.arrayContaining([
            expect.objectContaining(batchedNotification)
          ])
        })
      );
    });

    it('retrieves user notifications with filtering', async () => {
      const notificationsRequest = new NextRequest(
        'http://localhost/api/realtime/notifications?status=unread&limit=10'
      );

      vi.mocked(getDocs).mockResolvedValue({
        docs: [{
          id: 'notif-123',
          data: () => mockNotification
        }],
        size: 1
      } as any);

      const response = await notificationsGET(notificationsRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.notifications).toHaveLength(1);
      expect(responseData.summary.unreadCount).toBeDefined();
    });
  });

  describe('Message Broadcasting and Delivery', () => {
    it('broadcasts messages to all connected clients in a channel', async () => {
      const broadcastMessage = {
        type: 'system_announcement',
        channel: 'global:announcements',
        content: {
          title: 'System Maintenance Tonight',
          message: 'Platform will be down for maintenance from 2-4 AM',
          priority: 'high'
        }
      };

      // Mock multiple active connections
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: 'ws-1', data: () => ({ ...mockWebSocketConnection, id: 'ws-1', userId: 'user-123' }) },
          { id: 'ws-2', data: () => ({ ...mockWebSocketConnection, id: 'ws-2', userId: 'user-456' }) },
          { id: 'ws-3', data: () => ({ ...mockWebSocketConnection, id: 'ws-3', userId: 'user-789' }) }
        ],
        size: 3
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'broadcast',
          ...broadcastMessage
        })
      });

      const response = await websocketPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.delivered).toBe(3);

      // Verify broadcast message was created for each connection
      expect(vi.mocked(addDoc)).toHaveBeenCalledTimes(3);
    });

    it('handles message delivery confirmation and acknowledgments', async () => {
      const ackRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'acknowledge',
          messageId: 'msg-123',
          connectionId: 'ws-123',
          timestamp: new Date().toISOString()
        })
      });

      const response = await websocketPOST(ackRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      // Verify acknowledgment was recorded
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'delivery.delivered': expect.arrayContaining([mockUser.uid]),
          'delivery.deliveredAt': expect.any(String)
        })
      );
    });

    it('implements message retry logic for failed deliveries', async () => {
      const retryRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'retry_failed',
          messageId: 'msg-failed-123',
          maxRetries: 3
        })
      });

      const response = await websocketPOST(retryRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.retryAttempts).toBeGreaterThan(0);
    });
  });

  describe('Performance and Scalability', () => {
    it('handles high-frequency message bursts efficiently', async () => {
      const messages = Array(100).fill(null).map((_, i) => ({
        channelId: 'space:space-123:chat',
        content: `Burst message ${i}`,
        messageType: 'text',
        spaceId: 'space-123'
      }));

      const startTime = Date.now();
      
      const requests = messages.map(msg =>
        chatPOST(new NextRequest('http://localhost/api/realtime/chat', {
          method: 'POST',
          body: JSON.stringify(msg)
        }))
      );

      const responses = await Promise.all(requests);
      const endTime = Date.now();

      // All messages should be processed successfully
      responses.forEach(response => {
        expect(response.status).toBe(201);
      });

      // Should complete within reasonable time (under 5 seconds for 100 messages)
      expect(endTime - startTime).toBeLessThan(5000);
    });

    it('implements connection pooling and load balancing', async () => {
      // Test multiple simultaneous connections
      const connections = Array(50).fill(null).map((_, i) => ({
        connectionType: 'chat',
        channels: [`user:user-${i}:notifications`],
        clientInfo: { userAgent: `Client-${i}` }
      }));

      const requests = connections.map(conn =>
        websocketPOST(new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: JSON.stringify(conn)
        }))
      );

      const responses = await Promise.all(requests);

      // All connections should be established
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });

    it('manages memory usage for large channel subscriptions', async () => {
      const massSubscribeRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'subscribe',
          connectionId: 'ws-123',
          channels: Array(1000).fill(null).map((_, i) => `space:space-${i}:chat`)
        })
      });

      const response = await websocketPOST(massSubscribeRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      
      // Should handle large subscription lists efficiently
      expect(responseData.connection.channels.length).toBeLessThanOrEqual(100); // Should cap subscriptions
    });
  });

  describe('Error Handling and Resilience', () => {
    it('handles network disconnections gracefully', async () => {
      const connectionFailure = new Error('Network connection lost');
      vi.mocked(updateDoc).mockRejectedValueOnce(connectionFailure);

      const heartbeatRequest = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          action: 'heartbeat',
          connectionId: 'ws-123'
        })
      });

      const response = await websocketPOST(heartbeatRequest);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update connection');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('validates message content and prevents malicious payloads', async () => {
      const maliciousMessage = {
        channelId: 'space:space-123:chat',
        content: '<script>alert("xss")</script>',
        messageType: 'text',
        spaceId: 'space-123'
      };

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify(maliciousMessage)
      });

      const response = await chatPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Message content contains prohibited elements');
    });

    it('handles database failures during message processing', async () => {
      vi.mocked(setDoc).mockRejectedValue(new Error('Database write failed'));

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'space:space-123:chat',
          content: 'Test message',
          messageType: 'text',
          spaceId: 'space-123'
        })
      });

      const response = await chatPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send message');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('implements rate limiting for message sending', async () => {
      const rapidMessages = Array(20).fill(null).map(() =>
        chatPOST(new NextRequest('http://localhost/api/realtime/chat', {
          method: 'POST',
          body: JSON.stringify({
            channelId: 'space:space-123:chat',
            content: 'Rapid fire message',
            messageType: 'text',
            spaceId: 'space-123'
          })
        }))
      );

      const responses = await Promise.all(rapidMessages);
      const rateLimitedResponses = responses.filter(r => r.status === 429);

      // Should rate limit after a certain number of messages
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    it('handles malformed WebSocket requests', async () => {
      const malformedRequests = [
        new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: 'invalid json'
        }),
        new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: JSON.stringify({})
        }),
        new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: JSON.stringify({ connectionType: 'invalid_type' })
        })
      ];

      for (const request of malformedRequests) {
        const response = await websocketPOST(request);
        expect([400, 500]).toContain(response.status);
      }
    });
  });
});