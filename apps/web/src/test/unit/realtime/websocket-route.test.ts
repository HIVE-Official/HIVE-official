import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST, GET, PUT, DELETE } from '../../../app/api/realtime/websocket/route';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  onSnapshot: vi.fn()
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
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore';
import { getCurrentUser } from '@/lib/server-auth';

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('WebSocket Route API', () => {
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com'
  };

  const mockConnection = {
    id: 'conn_test-user-123_1640995200000_abc123def',
    userId: 'test-user-123',
    socketId: 'conn_test-user-123_1640995200000_abc123def',
    connectionType: 'chat',
    status: 'connected',
    channels: ['user:test-user-123:notifications', 'space:space-1:chat'],
    metadata: {
      userAgent: 'Mozilla/5.0',
      connectionTime: '2024-01-15T10:00:00Z',
      lastActivity: '2024-01-15T10:00:00Z',
      platform: 'web',
      clientVersion: '1.0.0'
    },
    settings: {
      enableNotifications: true,
      enablePresence: true,
      enableToolUpdates: true,
      messagePreferences: {
        sound: true,
        desktop: true,
        mobile: true
      }
    }
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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('POST - Establish WebSocket Connection', () => {
    it('creates a new WebSocket connection successfully', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-1' }) }]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          connectionType: 'chat',
          spaceId: 'space-1',
          channels: ['space:space-1:chat'],
          clientInfo: {
            platform: 'web',
            version: '1.0.0'
          }
        }),
        headers: {
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0'
        }
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connectionId).toMatch(/^conn_test-user-123_\d+_[a-z0-9]+$/);
      expect(responseData.channels).toContain('user:test-user-123:notifications');
      expect(responseData.metadata.supportedFeatures).toContain('chat');
      expect(vi.mocked(setDoc)).toHaveBeenCalled();
    });

    it('returns unauthorized for unauthenticated requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('handles different connection types', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any);

      const connectionTypes = ['chat', 'notifications', 'tool_updates', 'presence', 'feed'];

      for (const connectionType of connectionTypes) {
        const request = new NextRequest('http://localhost/api/realtime/websocket', {
          method: 'POST',
          body: JSON.stringify({ connectionType })
        });

        const response = await POST(request);
        const responseData = await response.json();

        expect(response.status).toBe(200);
        expect(responseData.success).toBe(true);
      }
    });

    it('applies default settings when none provided', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(responseData.settings.enableNotifications).toBe(true);
      expect(responseData.settings.enablePresence).toBe(true);
      expect(responseData.settings.enableToolUpdates).toBe(true);
      expect(responseData.settings.messagePreferences.sound).toBe(true);
    });

    it('handles Firebase errors gracefully', async () => {
      vi.mocked(setDoc).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to establish connection');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error establishing WebSocket connection:',
        expect.any(Error)
      );
    });
  });

  describe('GET - Get Connection Info', () => {
    it('retrieves specific connection by ID', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockConnection.id,
        data: () => mockConnection
      } as any);

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}&includeChannels=true`
      );

      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ id: 'sub-1', data: () => ({ channel: 'test:channel' }) }]
      } as any);

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.connection.id).toBe(mockConnection.id);
      expect(responseData.channels).toBeDefined();
      expect(responseData.serverTime).toBeDefined();
    });

    it('returns 404 for non-existent connection', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/websocket?connectionId=nonexistent'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Connection not found');
    });

    it('returns 404 for connection owned by different user', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ ...mockConnection, userId: 'different-user' })
      } as any);

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}`
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Connection not found');
    });

    it('retrieves all user connections', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: 'conn-1', data: () => ({ ...mockConnection, id: 'conn-1' }) },
          { id: 'conn-2', data: () => ({ ...mockConnection, id: 'conn-2' }) }
        ]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.connections).toHaveLength(2);
      expect(responseData.activeConnections).toBe(2);
    });

    it('handles unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/websocket');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('handles Firebase errors', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}`
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to get connection info');
    });
  });

  describe('PUT - Update Connection', () => {
    it('updates connection settings successfully', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      const newSettings = {
        enableNotifications: false,
        enablePresence: true,
        enableToolUpdates: false,
        messagePreferences: {
          sound: false,
          desktop: true,
          mobile: false
        }
      };

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({
          connectionId: mockConnection.id,
          settings: newSettings
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connectionId).toBe(mockConnection.id);
      expect(vi.mocked(updateDoc)).toHaveBeenCalled();
    });

    it('subscribes to new channels', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({
          connectionId: mockConnection.id,
          channels: ['space:new-space:chat'],
          action: 'subscribe'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('subscribe');
      expect(vi.mocked(setDoc)).toHaveBeenCalled();
    });

    it('unsubscribes from channels', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({
          connectionId: mockConnection.id,
          channels: ['space:old-space:chat'],
          action: 'unsubscribe'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('unsubscribe');
      expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
    });

    it('replaces channel subscriptions', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { ref: { delete: vi.fn() } },
          { ref: { delete: vi.fn() } }
        ]
      } as any);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({
          connectionId: mockConnection.id,
          channels: ['space:new-space:chat', 'space:new-space:notifications'],
          action: 'replace'
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.action).toBe('replace');
    });

    it('returns 400 for missing connection ID', async () => {
      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({ settings: {} })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Connection ID required');
    });

    it('returns 404 for non-existent connection', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({
          connectionId: 'nonexistent',
          settings: {}
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Connection not found or not owned');
    });

    it('handles unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: JSON.stringify({})
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });
  });

  describe('DELETE - Close Connection', () => {
    it('closes specific connection successfully', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{ ref: { delete: vi.fn() } }]
      } as any).mockResolvedValueOnce({
        empty: true
      } as any);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.connectionId).toBe(mockConnection.id);
      expect(responseData.message).toBe('Connection closed');
    });

    it('closes all user connections', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { id: 'conn-1', data: () => ({ ...mockConnection, id: 'conn-1' }) },
          { id: 'conn-2', data: () => ({ ...mockConnection, id: 'conn-2' }) }
        ]
      } as any);
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);

      const request = new NextRequest(
        'http://localhost/api/realtime/websocket?closeAll=true',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.closedConnections).toBe(2);
      expect(responseData.message).toBe('All connections closed');
    });

    it('returns 404 for non-existent connection', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/websocket?connectionId=nonexistent',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Connection not found or not owned');
    });

    it('returns 400 for missing connection ID', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/websocket',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Connection ID required');
    });

    it('updates presence when no remaining connections', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => mockConnection
      } as any);
      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{ ref: { delete: vi.fn() } }]
      } as any).mockResolvedValueOnce({
        empty: true
      } as any);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          status: 'offline'
        })
      );
    });

    it('handles unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest(
        'http://localhost/api/realtime/websocket?connectionId=test',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('handles Firebase errors gracefully', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest(
        `http://localhost/api/realtime/websocket?connectionId=${mockConnection.id}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to close connection');
    });
  });

  describe('Channel Management', () => {
    it('generates correct default channels for chat connection', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-1' }) }]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          connectionType: 'chat',
          spaceId: 'space-1'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(responseData.channels).toContain('user:test-user-123:notifications');
      expect(responseData.channels).toContain('user:test-user-123:presence');
      expect(responseData.channels).toContain('space:space-1:chat');
      expect(responseData.channels).toContain('space:space-1:typing');
    });

    it('generates correct default channels for notifications connection', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { data: () => ({ spaceId: 'space-1' }) },
          { data: () => ({ spaceId: 'space-2' }) }
        ]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          connectionType: 'notifications'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(responseData.channels).toContain('system:announcements');
      expect(responseData.channels).toContain('space:space-1:notifications');
      expect(responseData.channels).toContain('space:space-2:notifications');
    });

    it('generates correct default channels for tool_updates connection', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({
          connectionType: 'tool_updates',
          spaceId: 'space-1'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(responseData.channels).toContain('user:test-user-123:tools');
      expect(responseData.channels).toContain('space:space-1:tools');
    });
  });

  describe('Presence Management', () => {
    it('updates user presence on connection', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({ docs: [] } as any);
      vi.mocked(addDoc).mockResolvedValue({} as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      await POST(request);

      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          status: 'online'
        })
      );
    });

    it('broadcasts presence updates to user spaces', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-1' }) }]
      } as any);
      vi.mocked(addDoc).mockResolvedValue({} as any);

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      await POST(request);

      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'presence',
          channel: 'space:space-1:presence',
          content: expect.objectContaining({
            userId: mockUser.uid,
            status: 'online'
          })
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON in POST request', async () => {
      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to establish connection');
    });

    it('handles malformed JSON in PUT request', async () => {
      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'PUT',
        body: 'invalid json'
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update connection');
    });

    it('logs appropriate error messages', async () => {
      vi.mocked(setDoc).mockRejectedValue(new Error('Test error'));

      const request = new NextRequest('http://localhost/api/realtime/websocket', {
        method: 'POST',
        body: JSON.stringify({})
      });

      await POST(request);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error establishing WebSocket connection:',
        expect.any(Error)
      );
    });
  });
});