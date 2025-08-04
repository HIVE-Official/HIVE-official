import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ResilientHiveApiClient, createResilientApiClient } from '@/lib/api-client-resilient';
import { HivePlatformErrorHandler } from '@/lib/error-resilience-system';

// Mock the error resilience system
vi.mock('@/lib/error-resilience-system');
vi.mock('@/lib/platform-wide-search');
vi.mock('@/lib/cross-platform-notifications');
vi.mock('@/lib/platform-integration');

describe('ResilientHiveApiClient', () => {
  let client: ResilientHiveApiClient;
  let mockFetch: any;
  let mockApiWrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Mock API wrapper
    mockApiWrapper = vi.fn().mockImplementation((fn) => fn());
    (HivePlatformErrorHandler.createApiWrapper as any).mockReturnValue(mockApiWrapper);

    client = new ResilientHiveApiClient('/api', 'test-token');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with default configuration', () => {
      expect(client).toBeInstanceOf(ResilientHiveApiClient);
      expect(HivePlatformErrorHandler.createApiWrapper).toHaveBeenCalledWith({
        retryConfig: expect.any(Object),
        circuitBreaker: 'hive-api',
        timeout: 30000
      });
    });

    it('should set authorization header when token provided', () => {
      const clientWithToken = new ResilientHiveApiClient('/api', 'test-token');
      expect(clientWithToken).toBeInstanceOf(ResilientHiveApiClient);
    });
  });

  describe('HTTP request handling', () => {
    it('should make successful GET request', async () => {
      const mockResponse = { spaces: [], total: 0 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.getSpaces();

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces?', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should make successful POST request', async () => {
      const mockResponse = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.joinSpace('space-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
      const errorResponse = { message: 'Not found' };
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve(errorResponse)
      });

      mockApiWrapper.mockImplementation(async (fn) => {
        return await fn();
      });

      await expect(client.getSpace('non-existent')).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      mockApiWrapper.mockImplementation(async (fn) => {
        return await fn();
      });

      await expect(client.getSpaces()).rejects.toThrow();
    });
  });

  describe('spaces API', () => {
    it('should get spaces with default parameters', async () => {
      const mockSpaces = { spaces: [{ id: 'space-1', name: 'Test Space' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSpaces)
      });

      const result = await client.getSpaces();

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces?', expect.any(Object));
      expect(result).toEqual(mockSpaces);
    });

    it('should get spaces with custom parameters', async () => {
      const mockSpaces = { spaces: [], total: 0 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSpaces)
      });

      await client.getSpaces({ limit: 10, offset: 20 });

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces?limit=10&offset=20', expect.any(Object));
    });

    it('should get single space', async () => {
      const mockSpace = { id: 'space-1', name: 'Test Space' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSpace)
      });

      const result = await client.getSpace('space-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1', expect.any(Object));
      expect(result).toEqual(mockSpace);
    });

    it('should join space', async () => {
      const mockResponse = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.joinSpace('space-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/join', {
        method: 'POST',
        headers: expect.any(Object)
      });
      expect(result).toEqual(mockResponse);
    });

    it('should leave space', async () => {
      const mockResponse = { success: true };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.leaveSpace('space-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/leave', {
        method: 'POST',
        headers: expect.any(Object)
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get space members', async () => {
      const mockMembers = { members: [{ id: 'user-1', name: 'John' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMembers)
      });

      const result = await client.getSpaceMembers('space-1', { limit: 20 });

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/members?limit=20', expect.any(Object));
      expect(result).toEqual(mockMembers);
    });

    it('should get space events', async () => {
      const mockEvents = { events: [{ id: 'event-1', title: 'Test Event' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEvents)
      });

      const result = await client.getSpaceEvents('space-1', { upcoming: true });

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/events?upcoming=true', expect.any(Object));
      expect(result).toEqual(mockEvents);
    });

    it('should create space event', async () => {
      const eventData = {
        title: 'New Event',
        description: 'Event description',
        startDate: '2024-01-01T00:00:00Z'
      };
      const mockResponse = { event: { id: 'event-1', ...eventData } };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.createSpaceEvent('space-1', eventData);

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/space-1/events', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify(eventData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tools API', () => {
    it('should get tools', async () => {
      const mockTools = { tools: [{ id: 'tool-1', name: 'Test Tool' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTools)
      });

      const result = await client.getTools({ category: 'productivity', verified: true });

      expect(mockFetch).toHaveBeenCalledWith('/api/tools?category=productivity&verified=true', expect.any(Object));
      expect(result).toEqual(mockTools);
    });

    it('should get single tool', async () => {
      const mockTool = { id: 'tool-1', name: 'Test Tool' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTool)
      });

      const result = await client.getTool('tool-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/tools/tool-1', expect.any(Object));
      expect(result).toEqual(mockTool);
    });

    it('should deploy tool', async () => {
      const config = { setting1: 'value1' };
      const mockResponse = { deployment: { id: 'deploy-1' } };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await client.deployTool('tool-1', config);

      expect(mockFetch).toHaveBeenCalledWith('/api/tools/tool-1/deploy', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify(config)
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get tool analytics', async () => {
      const mockAnalytics = { deployments: 50, usage: 100, ratings: [] };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockAnalytics)
      });

      const result = await client.getToolAnalytics('tool-1');

      expect(mockFetch).toHaveBeenCalledWith('/api/tools/tool-1/analytics', expect.any(Object));
      expect(result).toEqual(mockAnalytics);
    });
  });

  describe('search API', () => {
    it('should search spaces', async () => {
      const mockResults = { spaces: [{ id: 'space-1', name: 'Test Space' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResults)
      });

      const result = await client.searchSpaces('test', { type: 'academic' });

      expect(mockFetch).toHaveBeenCalledWith('/api/spaces/search', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ query: 'test', type: 'academic' })
      });
      expect(result).toEqual(mockResults);
    });

    it('should search tools', async () => {
      const mockResults = { tools: [{ id: 'tool-1', name: 'Test Tool' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResults)
      });

      const result = await client.searchTools('test', { category: 'productivity' });

      expect(mockFetch).toHaveBeenCalledWith('/api/tools/search', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ query: 'test', category: 'productivity' })
      });
      expect(result).toEqual(mockResults);
    });

    it('should search feed', async () => {
      const mockResults = { items: [{ id: 'post-1', type: 'post' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResults)
      });

      const result = await client.searchFeed('test', { type: 'post' });

      expect(mockFetch).toHaveBeenCalledWith('/api/feed/search', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ query: 'test', type: 'post' })
      });
      expect(result).toEqual(mockResults);
    });

    it('should search users', async () => {
      const mockResults = { users: [{ id: 'user-1', name: 'John Test' }], total: 1 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResults)
      });

      const result = await client.searchUsers('john', { userType: 'student' });

      expect(mockFetch).toHaveBeenCalledWith('/api/users/search', {
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify({ query: 'john', userType: 'student' })
      });
      expect(result).toEqual(mockResults);
    });
  });

  describe('fallback mechanisms', () => {
    it('should use fallback for spaces when API fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      
      // Mock API wrapper to use fallback
      mockApiWrapper.mockImplementation(async (fn, options) => {
        try {
          return await fn();
        } catch (error) {
          if (options?.fallback?.fallbackValue) {
            return options.fallback.fallbackValue;
          }
          throw error;
        }
      });

      const result = await client.getSpaces();

      expect(result).toEqual({ spaces: [], total: 0, hasMore: false });
    });

    it('should use offline cache in offline support methods', async () => {
      // Mock localStorage
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify({
          data: { spaces: [{ id: 'cached-space' }] },
          timestamp: Date.now() - 60000 // 1 minute ago
        })),
        setItem: vi.fn()
      };
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

      mockFetch.mockRejectedValue(new Error('Network error'));
      
      // Mock API wrapper to use fallback function
      mockApiWrapper.mockImplementation(async (fn, options) => {
        try {
          return await fn();
        } catch (error) {
          if (options?.fallback?.fallbackFunction) {
            return await options.fallback.fallbackFunction();
          }
          throw error;
        }
      });

      const result = await client.getSpacesWithOfflineSupport();

      expect(result).toEqual({ spaces: [{ id: 'cached-space' }] });
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('hive_spaces_cache');
    });
  });

  describe('token management', () => {
    it('should update token', () => {
      client.updateToken('new-token');
      
      // Verify token is updated in subsequent requests
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({})
      });

      client.getSpaces();

      expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          'Authorization': 'Bearer new-token'
        })
      });
    });

    it('should remove token', () => {
      client.removeToken();
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({})
      });

      client.getSpaces();

      expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.not.objectContaining({
          'Authorization': expect.any(String)
        })
      });
    });
  });

  describe('health check', () => {
    it('should perform health check successfully', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ status: 'ok' })
      });

      const result = await client.healthCheck();

      expect(result.status).toBe('healthy');
      expect(mockFetch).toHaveBeenCalledWith('/api/health', expect.any(Object));
    });

    it('should handle health check failure', async () => {
      mockFetch.mockRejectedValue(new Error('Health check failed'));
      
      mockApiWrapper.mockImplementation(async (fn) => {
        return await fn();
      });

      const result = await client.healthCheck();

      expect(result.status).toBe('unhealthy');
    });
  });

  describe('factory functions', () => {
    it('should create resilient API client', () => {
      const client = createResilientApiClient('test-token');
      expect(client).toBeInstanceOf(ResilientHiveApiClient);
    });

    it('should return existing client if no token provided', () => {
      const client1 = createResilientApiClient();
      const client2 = createResilientApiClient();
      expect(client1).toBe(client2);
    });

    it('should create new client if token provided', () => {
      const client1 = createResilientApiClient();
      const client2 = createResilientApiClient('different-token');
      expect(client1).not.toBe(client2);
    });
  });

  describe('error resilience integration', () => {
    it('should use API wrapper for all requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({})
      });

      await client.getSpaces();

      expect(mockApiWrapper).toHaveBeenCalled();
    });

    it('should handle retries through API wrapper', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValue({
                  ok: true,
                  json: () => Promise.resolve({ spaces: [] })
                });

      // Mock API wrapper to simulate retry
      mockApiWrapper.mockImplementation(async (fn) => {
        try {
          return await fn();
        } catch (error) {
          // Simulate retry
          return await fn();
        }
      });

      const result = await client.getSpaces();

      expect(result).toEqual({ spaces: [] });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should use circuit breaker through API wrapper', async () => {
      mockFetch.mockRejectedValue(new Error('Service unavailable'));

      // Mock circuit breaker behavior
      mockApiWrapper.mockRejectedValue(new Error('Circuit breaker hive-api is OPEN'));

      await expect(client.getSpaces()).rejects.toThrow('Circuit breaker hive-api is OPEN');
    });
  });
});