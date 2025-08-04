import { describe, it, expect, beforeEach, afterEach, vi, MockedFunction } from 'vitest';
import { PlatformIntegration } from '@/lib/platform-integration';
import { useUnifiedStore } from '@/lib/unified-state-management';
import { CrossPlatformNotificationManager } from '@/lib/cross-platform-notifications';

// Mock dependencies
vi.mock('@/lib/firebase-admin');
vi.mock('@/lib/unified-state-management');
vi.mock('@/lib/cross-platform-notifications');

describe('PlatformIntegration', () => {
  let platformIntegration: PlatformIntegration;
  let mockUnifiedStore: any;
  let mockNotificationManager: any;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Mock unified store
    mockUnifiedStore = {
      getState: vi.fn(),
      setState: vi.fn(),
      subscribe: vi.fn(),
    };
    (useUnifiedStore as any).mockReturnValue(mockUnifiedStore);

    // Mock notification manager
    mockNotificationManager = {
      createNotification: vi.fn().mockResolvedValue('notification-id'),
      subscribeToChannel: vi.fn(),
      unsubscribeFromChannel: vi.fn(),
    };
    (CrossPlatformNotificationManager as any).mockImplementation(() => mockNotificationManager);

    platformIntegration = new PlatformIntegration();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with default configuration', () => {
      expect(platformIntegration).toBeInstanceOf(PlatformIntegration);
    });

    it('should setup WebSocket connection when initialized', async () => {
      const mockWebSocket = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        send: vi.fn(),
        close: vi.fn(),
        readyState: WebSocket.OPEN,
      };
      
      global.WebSocket = vi.fn().mockImplementation(() => mockWebSocket) as any;
      
      await platformIntegration.initialize('test-user-id');
      
      expect(global.WebSocket).toHaveBeenCalledWith(
        expect.stringContaining('ws://localhost:3001/ws')
      );
    });
  });

  describe('getUnifiedFeedData', () => {
    it('should return unified feed data from multiple sources', async () => {
      const mockFeedData = [
        {
          id: 'post-1',
          type: 'post',
          content: 'Test post',
          timestamp: new Date().toISOString(),
          spaceId: 'space-1',
        },
        {
          id: 'event-1',
          type: 'event',
          title: 'Test event',
          timestamp: new Date().toISOString(),
          spaceId: 'space-1',
        }
      ];

      // Mock the internal methods
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue(mockFeedData);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue(mockFeedData);

      const result = await platformIntegration.getUnifiedFeedData('test-user-id');

      expect(result).toEqual(mockFeedData);
      expect((platformIntegration as any).fetchFromMultipleSources).toHaveBeenCalledWith(
        'test-user-id',
        expect.any(Object)
      );
    });

    it('should handle errors gracefully', async () => {
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockRejectedValue(
        new Error('Network error')
      );

      await expect(platformIntegration.getUnifiedFeedData('test-user-id'))
        .rejects.toThrow('Network error');
    });

    it('should respect limit parameter', async () => {
      const mockFeedData = Array.from({ length: 50 }, (_, i) => ({
        id: `post-${i}`,
        type: 'post',
        content: `Test post ${i}`,
        timestamp: new Date().toISOString(),
      }));

      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue(mockFeedData);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue(mockFeedData);

      const result = await platformIntegration.getUnifiedFeedData('test-user-id', { limit: 10 });

      expect(result).toHaveLength(10);
    });
  });

  describe('getCrossSliceData', () => {
    it('should aggregate data from multiple slices', async () => {
      const mockData = {
        spaces: [{ id: 'space-1', name: 'Test Space' }],
        tools: [{ id: 'tool-1', name: 'Test Tool' }],
        events: [{ id: 'event-1', title: 'Test Event' }],
      };

      vi.spyOn(platformIntegration as any, 'fetchSpaceData').mockResolvedValue(mockData.spaces);
      vi.spyOn(platformIntegration as any, 'fetchToolData').mockResolvedValue(mockData.tools);
      vi.spyOn(platformIntegration as any, 'fetchEventData').mockResolvedValue(mockData.events);

      const result = await platformIntegration.getCrossSliceData('test-user-id');

      expect(result).toEqual(mockData);
    });

    it('should handle partial failures gracefully', async () => {
      vi.spyOn(platformIntegration as any, 'fetchSpaceData').mockRejectedValue(new Error('Space error'));
      vi.spyOn(platformIntegration as any, 'fetchToolData').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'fetchEventData').mockResolvedValue([]);

      const result = await platformIntegration.getCrossSliceData('test-user-id');

      expect(result.spaces).toEqual([]);
      expect(result.tools).toEqual([]);
      expect(result.events).toEqual([]);
    });
  });

  describe('subscribeToRealTimeUpdates', () => {
    it('should subscribe to WebSocket channels', async () => {
      const callback = vi.fn();
      const channels = ['space:space-1', 'user:test-user'];

      await platformIntegration.subscribeToRealTimeUpdates(channels, callback);

      expect(mockNotificationManager.subscribeToChannel).toHaveBeenCalledTimes(2);
      expect(mockNotificationManager.subscribeToChannel).toHaveBeenCalledWith('space:space-1', expect.any(Function));
      expect(mockNotificationManager.subscribeToChannel).toHaveBeenCalledWith('user:test-user', expect.any(Function));
    });

    it('should handle WebSocket messages', async () => {
      const callback = vi.fn();
      const mockMessage = {
        type: 'space_update',
        data: { id: 'space-1', name: 'Updated Space' },
        timestamp: new Date().toISOString(),
      };

      // Mock WebSocket message handling
      const mockWebSocket = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        send: vi.fn(),
        close: vi.fn(),
        readyState: WebSocket.OPEN,
      };
      
      global.WebSocket = vi.fn().mockImplementation(() => mockWebSocket) as any;
      
      await platformIntegration.initialize('test-user-id');
      await platformIntegration.subscribeToRealTimeUpdates(['space:space-1'], callback);

      // Simulate WebSocket message
      const messageHandler = mockWebSocket.addEventListener.mock.calls.find(
        call => call[0] === 'message'
      )?.[1];
      
      if (messageHandler) {
        messageHandler({ data: JSON.stringify(mockMessage) });
      }

      expect(callback).toHaveBeenCalledWith(mockMessage);
    });
  });

  describe('updateUnifiedState', () => {
    it('should update unified state with optimistic updates', async () => {
      const update = {
        type: 'space_join' as const,
        spaceId: 'space-1',
        userId: 'test-user-id',
      };

      await platformIntegration.updateUnifiedState(update);

      expect(mockUnifiedStore.setState).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it('should handle state update failures', async () => {
      mockUnifiedStore.setState.mockRejectedValue(new Error('State update failed'));

      const update = {
        type: 'space_join' as const,
        spaceId: 'space-1',
        userId: 'test-user-id',
      };

      await expect(platformIntegration.updateUnifiedState(update))
        .rejects.toThrow('State update failed');
    });
  });

  describe('invalidateCache', () => {
    it('should invalidate cache by pattern', async () => {
      // Setup cache with test data
      await platformIntegration.getUnifiedFeedData('test-user-id');
      
      // Mock cache has items
      vi.spyOn(platformIntegration as any, 'cache', 'get').mockReturnValue(new Map([
        ['feed:test-user-id:default', { data: [], timestamp: Date.now() }],
        ['spaces:test-user-id', { data: [], timestamp: Date.now() }],
      ]));

      const invalidatedKeys = await platformIntegration.invalidateCache('feed:*');

      expect(invalidatedKeys).toContain('feed:test-user-id:default');
      expect(invalidatedKeys).not.toContain('spaces:test-user-id');
    });

    it('should handle cache invalidation errors', async () => {
      vi.spyOn(platformIntegration as any, 'cache', 'get').mockImplementation(() => {
        throw new Error('Cache error');
      });

      await expect(platformIntegration.invalidateCache('*'))
        .rejects.toThrow('Cache error');
    });
  });

  describe('performance', () => {
    it('should complete unified feed data fetch within acceptable time', async () => {
      const start = Date.now();
      
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);

      await platformIntegration.getUnifiedFeedData('test-user-id');
      
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(5000); // 5 seconds max
    });

    it('should handle concurrent requests efficiently', async () => {
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);

      const requests = Array.from({ length: 10 }, () => 
        platformIntegration.getUnifiedFeedData('test-user-id')
      );

      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });

  describe('WebSocket reconnection', () => {
    it('should attempt to reconnect on connection loss', async () => {
      const mockWebSocket = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        send: vi.fn(),
        close: vi.fn(),
        readyState: WebSocket.CLOSED,
      };
      
      global.WebSocket = vi.fn().mockImplementation(() => mockWebSocket) as any;
      
      await platformIntegration.initialize('test-user-id');

      // Simulate connection close
      const closeHandler = mockWebSocket.addEventListener.mock.calls.find(
        call => call[0] === 'close'
      )?.[1];
      
      if (closeHandler) {
        closeHandler({ code: 1006, reason: 'Connection lost' });
      }

      // Wait for reconnection attempt
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(global.WebSocket).toHaveBeenCalledTimes(2); // Initial + reconnect
    });

    it('should limit reconnection attempts', async () => {
      const mockWebSocket = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        send: vi.fn(),
        close: vi.fn(),
        readyState: WebSocket.CLOSED,
      };
      
      global.WebSocket = vi.fn().mockImplementation(() => {
        const ws = { ...mockWebSocket };
        // Simulate immediate close
        setTimeout(() => {
          const closeHandler = ws.addEventListener.mock.calls.find(
            call => call[0] === 'close'
          )?.[1];
          if (closeHandler) {
            closeHandler({ code: 1006, reason: 'Connection lost' });
          }
        }, 0);
        return ws;
      }) as any;
      
      await platformIntegration.initialize('test-user-id');

      // Wait for multiple reconnection attempts
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Should limit to reasonable number of attempts (e.g., 5)
      expect(global.WebSocket).toHaveBeenCalledTimes(6); // Initial + 5 reconnects
    });
  });
});