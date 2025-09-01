import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST, GET, PUT, DELETE } from '../../../app/api/realtime/chat/route';

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
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Chat Route API', () => {
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User'
  };

  const mockChannel = {
    id: 'channel-123',
    spaceId: 'space-123',
    name: 'General',
    type: 'general',
    participants: ['test-user-123'],
    admins: ['admin-user'],
    settings: {
      allowFiles: true,
      allowReactions: true,
      allowThreads: true,
      allowMentions: true,
      moderationLevel: 'open',
      retentionDays: 30
    },
    isActive: true
  };

  const mockMessage = {
    id: 'msg_1640995200000_abc123def',
    channelId: 'channel-123',
    spaceId: 'space-123',
    senderId: 'test-user-123',
    senderName: 'Test User',
    senderRole: 'member',
    content: 'Hello, world!',
    messageType: 'text',
    metadata: {
      timestamp: '2024-01-15T10:00:00Z',
      isEdited: false,
      isDeleted: false
    },
    reactions: {},
    mentions: [],
    threadCount: 0,
    delivery: {
      sent: true,
      delivered: [],
      read: ['test-user-123'],
      failed: []
    }
  };

  const mockMembership = {
    userId: 'test-user-123',
    spaceId: 'space-123',
    role: 'member',
    status: 'active'
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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('POST - Send Chat Message', () => {
    beforeEach(() => {
      // Mock successful membership check
      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      // Mock channel lookup
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
    });

    it('sends a new chat message successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello, world!',
          messageType: 'text'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message.id).toMatch(/^msg_\d+_[a-z0-9]+$/);
      expect(responseData.message.channelId).toBe('channel-123');
      expect(responseData.message.spaceId).toBe('space-123');
      expect(vi.mocked(setDoc)).toHaveBeenCalled();
    });

    it('returns unauthorized for unauthenticated requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 400 for missing required fields', async () => {
      const testCases = [
        { spaceId: 'space-123', content: 'Hello' }, // Missing channelId
        { channelId: 'channel-123', content: 'Hello' }, // Missing spaceId
        { channelId: 'channel-123', spaceId: 'space-123' }, // Missing content
      ];

      for (const testCase of testCases) {
        const request = new NextRequest('http://localhost/api/realtime/chat', {
          method: 'POST',
          body: JSON.stringify(testCase)
        });

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Channel ID, space ID, and content are required');
      }
    });

    it('returns 403 for users without space membership', async () => {
      vi.mocked(getDocs).mockResolvedValue({ empty: true } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Access denied to channel');
    });

    it('returns 404 for non-existent channel', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'nonexistent',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Channel not found');
    });

    it('handles different message types', async () => {
      const messageTypes = ['text', 'tool_result', 'file', 'image', 'system'];

      for (const messageType of messageTypes) {
        const request = new NextRequest('http://localhost/api/realtime/chat', {
          method: 'POST',
          body: JSON.stringify({
            channelId: 'channel-123',
            spaceId: 'space-123',
            content: `Test ${messageType} message`,
            messageType
          })
        });

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
      }
    });

    it('handles messages with mentions', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello @user-456',
          mentions: ['user-456']
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(addDoc)).toHaveBeenCalledTimes(2); // Message broadcast + mention notification
    });

    it('handles reply messages', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'This is a reply',
          replyToMessageId: 'original-message-123'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('handles tool result messages', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Tool execution completed',
          messageType: 'tool_result',
          toolId: 'tool-123',
          toolResult: { status: 'success', output: 'Result data' }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('enforces moderation settings', async () => {
      const adminOnlyChannel = {
        ...mockChannel,
        settings: { ...mockChannel.settings, moderationLevel: 'admin_only' }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: adminOnlyChannel.id,
        data: () => adminOnlyChannel
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Not permitted to send messages in this channel');
    });
  });

  describe('GET - Get Chat Messages', () => {
    beforeEach(() => {
      // Mock membership check
      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      // Mock channel lookup
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
    });

    it('retrieves chat messages successfully', async () => {
      const mockMessages = [
        { ...mockMessage, id: 'msg-1' },
        { ...mockMessage, id: 'msg-2' },
        { ...mockMessage, id: 'msg-3' }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: mockMessages.map(msg => ({
          id: msg.id,
          data: () => msg
        }))
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123&limit=50'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.messages).toHaveLength(3);
      expect(responseData.channel).toEqual(mockChannel);
    });

    it('returns 400 for missing required parameters', async () => {
      const testCases = [
        'http://localhost/api/realtime/chat?spaceId=space-123', // Missing channelId
        'http://localhost/api/realtime/chat?channelId=channel-123', // Missing spaceId
      ];

      for (const url of testCases) {
        const request = new NextRequest(url);
        const response = await GET(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Channel ID and space ID are required');
      }
    });

    it('returns 403 for users without channel access', async () => {
      vi.mocked(getDocs).mockResolvedValue({ empty: true } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Access denied to channel');
    });

    it('handles pagination with before parameter', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        id: 'before-msg'
      } as any).mockResolvedValueOnce({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any);

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: [{ id: 'msg-1', data: () => mockMessage }]
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123&before=before-msg'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(startAfter)).toHaveBeenCalled();
    });

    it('includes threads when requested', async () => {
      const messageWithThread = {
        ...mockMessage,
        threadCount: 2
      };

      const threadMessages = [
        { ...mockMessage, id: 'thread-1', metadata: { ...mockMessage.metadata, replyToMessageId: mockMessage.id } },
        { ...mockMessage, id: 'thread-2', metadata: { ...mockMessage.metadata, replyToMessageId: mockMessage.id } }
      ];

      vi.mocked(getDocs)
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ data: () => mockMembership }]
        } as any)
        .mockResolvedValueOnce({
          docs: [{ id: messageWithThread.id, data: () => messageWithThread }]
        } as any)
        .mockResolvedValue({
          docs: threadMessages.map(msg => ({ id: msg.id, data: () => msg }))
        } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123&includeThreads=true'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.threads).toBeDefined();
      expect(responseData.threads[messageWithThread.id]).toHaveLength(2);
    });

    it('applies custom limit parameter', async () => {
      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: []
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123&limit=25'
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(25);
    });

    it('marks messages as read for user', async () => {
      const messages = [
        { ...mockMessage, id: 'msg-1' },
        { ...mockMessage, id: 'msg-2' }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: messages.map(msg => ({ id: msg.id, data: () => msg }))
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?channelId=channel-123&spaceId=space-123'
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledTimes(2); // One for each message
    });
  });

  describe('PUT - Update Chat Message', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockMessage.id,
        data: () => mockMessage
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
    });

    it('edits a message successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: mockMessage.id,
          action: 'edit',
          content: 'Updated message content'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('edit');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          content: 'Updated message content',
          'metadata.isEdited': true
        })
      );
    });

    it('adds a reaction successfully', async () => {
      const messageWithoutReaction = {
        ...mockMessage,
        reactions: {}
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: messageWithoutReaction.id,
        data: () => messageWithoutReaction
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: messageWithoutReaction.id,
          action: 'react',
          emoji: '👍'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('react');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'reactions.👍': {
            emoji: '👍',
            users: [mockUser.uid],
            count: 1
          }
        })
      );
    });

    it('removes a reaction successfully', async () => {
      const messageWithReaction = {
        ...mockMessage,
        reactions: {
          '👍': {
            emoji: '👍',
            users: [mockUser.uid, 'other-user'],
            count: 2
          }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: messageWithReaction.id,
        data: () => messageWithReaction
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: messageWithReaction.id,
          action: 'unreact',
          emoji: '👍'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('unreact');
    });

    it('deletes a message successfully (owner)', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: mockMessage.id,
          action: 'delete'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.action).toBe('delete');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'metadata.isDeleted': true,
          content: '[Message deleted]'
        })
      );
    });

    it('deletes a message successfully (moderator)', async () => {
      const otherUserMessage = {
        ...mockMessage,
        senderId: 'other-user-123'
      };

      const moderatorMembership = {
        ...mockMembership,
        role: 'moderator'
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: otherUserMessage.id,
        data: () => otherUserMessage
      } as any);

      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => moderatorMembership }]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: otherUserMessage.id,
          action: 'delete',
          spaceId: 'space-123'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('returns 400 for missing required fields', async () => {
      const testCases = [
        { action: 'edit' }, // Missing messageId
        { messageId: 'msg-123' }, // Missing action
      ];

      for (const testCase of testCases) {
        const request = new NextRequest('http://localhost/api/realtime/chat', {
          method: 'PUT',
          body: JSON.stringify(testCase)
        });

        const response = await PUT(request);
        const responseData = await response.json();

        expect(response.status).toBe(400);
        expect(responseData.error).toBe('Message ID and action are required');
      }
    });

    it('returns 404 for non-existent message', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: 'nonexistent',
          action: 'edit',
          content: 'New content'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Message not found');
    });

    it('returns 403 for unauthorized edit attempts', async () => {
      const otherUserMessage = {
        ...mockMessage,
        senderId: 'other-user-123'
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: otherUserMessage.id,
        data: () => otherUserMessage
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: otherUserMessage.id,
          action: 'edit',
          content: 'Hacked content'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Can only edit your own messages');
    });

    it('returns 400 for duplicate reactions', async () => {
      const messageWithReaction = {
        ...mockMessage,
        reactions: {
          '👍': {
            emoji: '👍',
            users: [mockUser.uid],
            count: 1
          }
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: messageWithReaction.id,
        data: () => messageWithReaction
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: messageWithReaction.id,
          action: 'react',
          emoji: '👍'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Already reacted with this emoji');
    });

    it('returns 400 for invalid actions', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'PUT',
        body: JSON.stringify({
          messageId: mockMessage.id,
          action: 'invalid_action'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Invalid action');
    });
  });

  describe('DELETE - Delete Chat Message', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockMessage.id,
        data: () => mockMessage
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
    });

    it('deletes a message successfully (owner)', async () => {
      const request = new NextRequest(
        `http://localhost/api/realtime/chat?messageId=${mockMessage.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.messageId).toBe(mockMessage.id);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'metadata.isDeleted': true,
          content: '[Message deleted]'
        })
      );
    });

    it('deletes a message successfully (moderator)', async () => {
      const otherUserMessage = {
        ...mockMessage,
        senderId: 'other-user-123'
      };

      const moderatorMembership = {
        ...mockMembership,
        role: 'moderator'
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: otherUserMessage.id,
        data: () => otherUserMessage
      } as any);

      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => moderatorMembership }]
      } as any);

      const request = new NextRequest(
        `http://localhost/api/realtime/chat?messageId=${otherUserMessage.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('returns 400 for missing message ID', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/chat',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Message ID required');
    });

    it('returns 404 for non-existent message', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/chat?messageId=nonexistent',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Message not found');
    });

    it('returns 403 for unauthorized deletion attempts', async () => {
      const otherUserMessage = {
        ...mockMessage,
        senderId: 'other-user-123'
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: otherUserMessage.id,
        data: () => otherUserMessage
      } as any);

      vi.mocked(getDocs).mockResolvedValue({
        empty: true
      } as any);

      const request = new NextRequest(
        `http://localhost/api/realtime/chat?messageId=${otherUserMessage.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Not authorized to delete this message');
    });

    it('broadcasts deletion message', async () => {
      const request = new NextRequest(
        `http://localhost/api/realtime/chat?messageId=${mockMessage.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'chat',
          content: expect.objectContaining({
            action: 'message_deleted',
            messageId: mockMessage.id
          })
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON in POST request', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send message');
    });

    it('handles Firebase errors gracefully', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to send message');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error sending chat message:',
        expect.any(Error)
      );
    });

    it('handles unauthorized requests in all methods', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const methods = [
        { method: 'POST', body: JSON.stringify({ channelId: 'test', spaceId: 'test', content: 'test' }) },
        { method: 'GET', url: '?channelId=test&spaceId=test' },
        { method: 'PUT', body: JSON.stringify({ messageId: 'test', action: 'edit' }) },
        { method: 'DELETE', url: '?messageId=test' }
      ];

      for (const { method, body, url } of methods) {
        const request = new NextRequest(
          `http://localhost/api/realtime/chat${url || ''}`,
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

    it('logs appropriate error messages', async () => {
      vi.mocked(setDoc).mockRejectedValue(new Error('Test error'));
      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockChannel
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello'
        })
      });

      await POST(request);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error sending chat message:',
        expect.any(Error)
      );
    });
  });

  describe('Message Broadcasting', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
    });

    it('broadcasts new messages to channel', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Hello, world!'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'chat',
          channel: 'space:space-123:chat',
          content: expect.objectContaining({
            action: 'new_message'
          })
        })
      );
    });

    it('updates channel last message', async () => {
      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Latest message'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          lastMessage: expect.objectContaining({
            content: 'Latest message'
          })
        })
      );
    });
  });

  describe('Analytics', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any);

      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
    });

    it('updates analytics for new messages', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any).mockResolvedValueOnce({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Analytics test',
          messageType: 'text'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          spaceId: 'space-123',
          totalMessages: 1,
          messageFrequency: { text: 1 }
        })
      );
    });

    it('increments existing analytics', async () => {
      const existingAnalytics = {
        totalMessages: 5,
        messageFrequency: { text: 3, image: 2 }
      };

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        id: mockChannel.id,
        data: () => mockChannel
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => existingAnalytics
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/chat', {
        method: 'POST',
        body: JSON.stringify({
          channelId: 'channel-123',
          spaceId: 'space-123',
          content: 'Analytics test',
          messageType: 'text'
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          totalMessages: 6,
          'messageFrequency.text': 4
        })
      );
    });
  });
});