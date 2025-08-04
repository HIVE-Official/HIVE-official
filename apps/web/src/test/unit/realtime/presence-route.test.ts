import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST, GET, PUT, DELETE, cleanupStalePresence } from '../../../app/api/realtime/presence/route';

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
  limit: vi.fn()
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
  limit as fbLimit
} from 'firebase/firestore';
import { getCurrentUser } from '@/lib/server-auth';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Presence Route API', () => {
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User'
  };

  const mockPresence = {
    userId: 'test-user-123',
    userName: 'Test User',
    userRole: 'member',
    status: 'online',
    lastSeen: '2024-01-15T10:00:00Z',
    currentActivity: {
      type: 'viewing',
      context: {
        spaceId: 'space-123',
        spaceName: 'Test Space'
      },
      startedAt: '2024-01-15T10:00:00Z',
      details: 'Browsing the space'
    },
    device: {
      type: 'desktop',
      platform: 'Mac OS',
      browser: 'Chrome'
    },
    connections: [
      {
        connectionId: 'conn-123',
        establishedAt: '2024-01-15T10:00:00Z',
        lastPing: '2024-01-15T10:05:00Z'
      }
    ],
    settings: {
      showOnlineStatus: true,
      showCurrentActivity: true,
      allowDisturbance: true,
      invisibleMode: false
    },
    metadata: {
      timezone: 'America/New_York',
      locale: 'en-US',
      lastActivityUpdate: '2024-01-15T10:00:00Z'
    }
  };

  const mockSpacePresence = {
    spaceId: 'space-123',
    spaceName: 'Test Space',
    activeUsers: [
      {
        userId: 'test-user-123',
        userName: 'Test User',
        status: 'online',
        activity: 'viewing',
        joinedAt: '2024-01-15T10:00:00Z'
      }
    ],
    recentActivity: [
      {
        userId: 'test-user-123',
        userName: 'Test User',
        action: 'status_change',
        timestamp: '2024-01-15T10:00:00Z'
      }
    ],
    statistics: {
      totalOnline: 1,
      totalActive: 1,
      totalMembers: 5,
      averageSessionDuration: 3600,
      peakOnlineTime: '2024-01-15T14:00:00Z'
    },
    lastUpdate: '2024-01-15T10:00:00Z'
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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('POST - Update User Presence', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-123' }) }]
      } as any);
    });

    it('updates user status successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'away',
          connectionId: 'conn-123'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.presence.userId).toBe(mockUser.uid);
      expect(responseData.presence.status).toBe('away');
      expect(vi.mocked(updateDoc)).toHaveBeenCalled();
      expect(vi.mocked(setDoc)).toHaveBeenCalled(); // Presence event
      expect(vi.mocked(addDoc)).toHaveBeenCalled(); // Broadcast
    });

    it('updates user activity successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          activity: {
            type: 'editing',
            context: {
              toolId: 'tool-456',
              toolName: 'Code Editor'
            },
            details: 'Editing main.py'
          }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.presence.activity.type).toBe('editing');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          currentActivity: expect.objectContaining({
            type: 'editing',
            context: expect.objectContaining({
              toolId: 'tool-456'
            })
          })
        })
      );
    });

    it('updates device information', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'online',
          device: {
            type: 'mobile',
            platform: 'iOS',
            browser: 'Safari'
          }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          device: {
            type: 'mobile',
            platform: 'iOS',
            browser: 'Safari'
          }
        })
      );
    });

    it('updates presence settings', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'online',
          settings: {
            showOnlineStatus: false,
            invisibleMode: true
          }
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          settings: expect.objectContaining({
            showOnlineStatus: false,
            invisibleMode: true
          })
        })
      );
    });

    it('manages connection information', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'online',
          connectionId: 'new-conn-456'
        })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          connections: expect.arrayContaining([
            expect.objectContaining({
              connectionId: 'new-conn-456'
            })
          ])
        })
      );
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({ status: 'online' })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });

    it('returns 400 for missing status and activity', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Status or activity update is required');
    });

    it('broadcasts presence update to user spaces', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'busy',
          context: { spaceId: 'space-123' }
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          type: 'presence',
          channel: 'space:space-123:presence',
          content: expect.objectContaining({
            action: 'presence_updated',
            userId: mockUser.uid,
            newStatus: 'busy'
          })
        })
      );
    });
  });

  describe('GET - Get Presence Information', () => {
    beforeEach(() => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => mockMembership }]
      } as any);
    });

    it('gets specific user presence', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=test-user-123&spaceId=space-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence).toEqual(mockPresence);
    });

    it('returns 404 for non-existent user presence', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=nonexistent'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('User presence not found');
    });

    it('returns privacy-filtered presence for unauthorized viewers', async () => {
      const invisibleUserPresence = {
        ...mockPresence,
        settings: { ...mockPresence.settings, invisibleMode: true }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: invisibleUserPresence.userId,
        data: () => invisibleUserPresence
      } as any);

      vi.mocked(getDocs).mockResolvedValue({ empty: true } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=invisible-user'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence.status).toBe('offline');
    });

    it('gets space presence information', async () => {
      const mockSpace = { id: 'space-123', name: 'Test Space' };
      
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockSpace
      } as any).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: [{ data: () => ({ userId: 'test-user-123' }) }]
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ recentEvents: [] })
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?spaceId=space-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spacePresence).toBeDefined();
      expect(responseData.spacePresence.spaceId).toBe('space-123');
      expect(responseData.spacePresence.activeUsers).toHaveLength(1);
    });

    it('returns 404 for inaccessible space', async () => {
      vi.mocked(getDocs).mockResolvedValue({ empty: true } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?spaceId=inaccessible-space'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.error).toBe('Space not found or access denied');
    });

    it('gets user\'s own presence and space summaries', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any).mockResolvedValue({
        exists: () => true,
        data: () => ({ name: 'Test Space' })
      } as any);

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{ data: () => ({ spaceId: 'space-123' }) }]
      } as any).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/presence');

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.userPresence).toEqual(mockPresence);
      expect(responseData.spacePresenceSummaries).toBeDefined();
      expect(responseData.activeSpaces).toBe(1);
    });

    it('includes offline users when requested', async () => {
      const offlineUser = { ...mockPresence, status: 'offline' };
      
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ name: 'Test Space' })
      } as any).mockResolvedValue({
        exists: () => true,
        id: offlineUser.userId,
        data: () => offlineUser
      } as any);

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: [{ data: () => ({ userId: 'test-user-123' }) }]
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ recentEvents: [] })
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?spaceId=space-123&includeOffline=true'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spacePresence.activeUsers).toHaveLength(0); // Offline users not in activeUsers
    });
  });

  describe('PUT - Update Presence Settings', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
    });

    it('updates presence settings successfully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'PUT',
        body: JSON.stringify({
          settings: {
            showOnlineStatus: false,
            allowDisturbance: false,
            invisibleMode: true
          }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.settings.showOnlineStatus).toBe(false);
      expect(responseData.settings.invisibleMode).toBe(true);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          settings: expect.objectContaining({
            showOnlineStatus: false,
            allowDisturbance: false,
            invisibleMode: true
          })
        })
      );
    });

    it('merges with existing settings', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'PUT',
        body: JSON.stringify({
          settings: {
            invisibleMode: true
          }
        })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.settings.showOnlineStatus).toBe(true); // From existing
      expect(responseData.settings.invisibleMode).toBe(true); // Updated
    });

    it('returns 400 for missing settings', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'PUT',
        body: JSON.stringify({})
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Settings are required');
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'PUT',
        body: JSON.stringify({ settings: {} })
      });

      const response = await PUT(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });
  });

  describe('DELETE - Remove Presence or Cleanup', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(deleteDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-123' }) }]
      } as any);
    });

    it('removes specific connection', async () => {
      const presenceWithMultipleConnections = {
        ...mockPresence,
        connections: [
          { connectionId: 'conn-123', establishedAt: '2024-01-15T10:00:00Z', lastPing: '2024-01-15T10:05:00Z' },
          { connectionId: 'conn-456', establishedAt: '2024-01-15T09:00:00Z', lastPing: '2024-01-15T10:05:00Z' }
        ]
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: presenceWithMultipleConnections.userId,
        data: () => presenceWithMultipleConnections
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?connectionId=conn-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('Connection removed');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          connections: expect.arrayContaining([
            expect.objectContaining({ connectionId: 'conn-456' })
          ])
        })
      );
    });

    it('sets user offline when last connection removed', async () => {
      const presenceWithSingleConnection = {
        ...mockPresence,
        connections: [
          { connectionId: 'conn-123', establishedAt: '2024-01-15T10:00:00Z', lastPing: '2024-01-15T10:05:00Z' }
        ]
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: presenceWithSingleConnection.userId,
        data: () => presenceWithSingleConnection
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?connectionId=conn-123',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'offline',
          connections: []
        })
      );
      expect(vi.mocked(addDoc)).toHaveBeenCalled(); // Broadcast offline status
    });

    it('cleans up old presence events', async () => {
      const oldEvents = [
        { ref: { delete: vi.fn() } },
        { ref: { delete: vi.fn() } }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{ data: () => ({ spaceId: 'space-123' }) }]
      } as any).mockResolvedValueOnce({
        docs: oldEvents,
        size: 2
      } as any);

      const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const request = new NextRequest(
        `http://localhost/api/realtime/presence?cleanupOld=true&olderThan=${cutoffDate}`,
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.deletedEvents).toBe(2);
      expect(vi.mocked(deleteDoc)).toHaveBeenCalledTimes(2);
    });

    it('sets user offline when no specific action', async () => {
      const request = new NextRequest(
        'http://localhost/api/realtime/presence',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toBe('User set to offline');
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'offline',
          connections: []
        })
      );
      expect(vi.mocked(addDoc)).toHaveBeenCalled(); // Broadcast offline status
    });

    it('returns 401 for unauthorized requests', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence',
        { method: 'DELETE' }
      );

      const response = await DELETE(request);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.error).toBe('Unauthorized');
    });
  });

  describe('Error Handling', () => {
    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update presence');
    });

    it('handles Firebase errors gracefully', async () => {
      vi.mocked(getDoc).mockRejectedValue(new Error('Firebase error'));

      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({ status: 'online' })
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update presence');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error updating user presence:',
        expect.any(Error)
      );
    });

    it('handles unauthorized requests in all methods', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);

      const methods = [
        { method: 'POST', body: JSON.stringify({ status: 'online' }) },
        { method: 'GET', url: '' },
        { method: 'PUT', body: JSON.stringify({ settings: {} }) },
        { method: 'DELETE', url: '' }
      ];

      for (const { method, body, url } of methods) {
        const request = new NextRequest(
          `http://localhost/api/realtime/presence${url}`,
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

  describe('Privacy and Permissions', () => {
    it('respects invisible mode settings', async () => {
      const invisibleUser = {
        ...mockPresence,
        userId: 'invisible-user',
        settings: { ...mockPresence.settings, invisibleMode: true }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: invisibleUser.userId,
        data: () => invisibleUser
      } as any);

      vi.mocked(getDocs).mockResolvedValue({ empty: true } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=invisible-user'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence.status).toBe('offline'); // Privacy filtered
    });

    it('shows full presence to space members', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(getDocs).mockResolvedValue({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=test-user-123&spaceId=space-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence).toEqual(mockPresence); // Full presence
    });

    it('filters activity when showCurrentActivity is false', async () => {
      const privateActivityUser = {
        ...mockPresence,
        settings: { ...mockPresence.settings, showCurrentActivity: false }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: privateActivityUser.userId,
        data: () => privateActivityUser
      } as any);

      vi.mocked(getDocs).mockResolvedValue({ empty: false, docs: [] } as any);

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?userId=test-user-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.presence.currentActivity.type).toBe('idle');
    });
  });

  describe('Space Presence Statistics', () => {
    it('calculates correct statistics for space presence', async () => {
      const spaceMembers = ['user-1', 'user-2', 'user-3'];
      const userPresences = [
        { ...mockPresence, userId: 'user-1', status: 'online' },
        { ...mockPresence, userId: 'user-2', status: 'away' },
        { ...mockPresence, userId: 'user-3', status: 'offline' }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => mockMembership }]
      } as any).mockResolvedValueOnce({
        docs: spaceMembers.map(id => ({ data: () => ({ userId: id }) }))
      } as any).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ recentEvents: [] })
      } as any);

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ name: 'Test Space' })
      } as any);

      // Mock individual user presence lookups
      userPresences.forEach((presence, index) => {
        vi.mocked(getDoc).mockResolvedValueOnce({
          exists: () => true,
          id: presence.userId,
          data: () => presence
        } as any);
      });

      const request = new NextRequest(
        'http://localhost/api/realtime/presence?spaceId=space-123'
      );

      const response = await GET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spacePresence.statistics.totalOnline).toBe(2); // online + away
      expect(responseData.spacePresence.statistics.totalMembers).toBe(3);
      expect(responseData.spacePresence.activeUsers).toHaveLength(2); // Excludes offline
    });
  });

  describe('Cleanup Stale Presence', () => {
    it('cleans up stale presence data', async () => {
      const stalePresenceData = [
        { ref: { update: vi.fn() } },
        { ref: { update: vi.fn() } }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: stalePresenceData
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);

      const cleaned = await cleanupStalePresence();

      expect(cleaned).toBe(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledTimes(2);
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'offline',
          connections: []
        })
      );
    });

    it('handles cleanup errors gracefully', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Cleanup error'));

      const cleaned = await cleanupStalePresence();

      expect(cleaned).toBe(0);
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Error cleaning up stale presence:',
        expect.any(Error)
      );
    });
  });

  describe('Presence Broadcasting', () => {
    beforeEach(() => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        id: mockPresence.userId,
        data: () => mockPresence
      } as any);

      vi.mocked(updateDoc).mockResolvedValue(undefined);
      vi.mocked(setDoc).mockResolvedValue(undefined);
      vi.mocked(addDoc).mockResolvedValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ data: () => ({ spaceId: 'space-123' }) }]
      } as any);
    });

    it('broadcasts presence updates to all user spaces', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [
          { data: () => ({ spaceId: 'space-1' }) },
          { data: () => ({ spaceId: 'space-2' }) }
        ]
      } as any);

      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({ status: 'busy' })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(addDoc)).toHaveBeenCalledTimes(2); // One for each space
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          channel: 'space:space-1:presence'
        })
      );
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          channel: 'space:space-2:presence'
        })
      );
    });

    it('updates space presence statistics', async () => {
      const request = new NextRequest('http://localhost/api/realtime/presence', {
        method: 'POST',
        body: JSON.stringify({
          status: 'online',
          context: { spaceId: 'space-123' }
        })
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          spaceId: 'space-123',
          recentEvents: expect.arrayContaining([
            expect.objectContaining({
              userId: mockUser.uid,
              eventType: 'status_change'
            })
          ])
        })
      );
    });
  });
});