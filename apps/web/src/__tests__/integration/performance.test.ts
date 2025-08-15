import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'perf_hooks';
import { PlatformIntegration } from '@/lib/platform-integration';
import { ResilientHiveApiClient } from '@/lib/api-client-resilient';
import { HivePlatformSearchEngine } from '@/lib/platform-wide-search';

// Mock dependencies
vi.mock('@/lib/firebase-admin');
vi.mock('@/lib/unified-state-management');
vi.mock('@/lib/cross-platform-notifications');

describe('Performance Integration Tests', () => {
  let platformIntegration: PlatformIntegration;
  let apiClient: ResilientHiveApiClient;
  let searchEngine: HivePlatformSearchEngine;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful responses for performance testing
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'mock response' })
    });

    platformIntegration = new PlatformIntegration({
      enableRealtime: false,
      enableCrossSliceNotifications: false,
      enableUnifiedSearch: true,
      enableActivityStreaming: false,
      cacheStrategy: 'memory'
    });
    apiClient = new ResilientHiveApiClient('/api');
    searchEngine = new HivePlatformSearchEngine();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Platform Integration Performance', () => {
    it('should complete unified feed data fetch within acceptable time', async () => {
      const startTime = performance.now();
      
      // Mock the internal methods to return quickly
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([
        { id: '1', type: 'post', content: 'Test post' },
        { id: '2', type: 'event', title: 'Test event' },
      ]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);

      await platformIntegration.getUnifiedFeedData('test-user-id', { limit: 50 });
      
      const duration = performance.now() - startTime;
      
      // Should complete within 1 second for integration layer
      expect(duration).toBeLessThan(1000);
    });

    it('should handle concurrent feed requests efficiently', async () => {
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);

      const startTime = performance.now();
      
      // Make 10 concurrent requests
      const requests = Array.from({ length: 10 }, () => 
        platformIntegration.getUnifiedFeedData('test-user-id', { limit: 20 })
      );

      const results = await Promise.all(requests);
      
      const duration = performance.now() - startTime;
      
      // All requests should complete within 2 seconds
      expect(duration).toBeLessThan(2000);
      expect(results).toHaveLength(10);
    });

    it('should cache repeated requests effectively', async () => {
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([
        { id: '1', type: 'post', content: 'Test post' }
      ]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([
        { id: '1', type: 'post', content: 'Test post' }
      ]);

      // First request - should fetch from source
      const startTime1 = performance.now();
      await platformIntegration.getUnifiedFeedData('test-user-id');
      const duration1 = performance.now() - startTime1;

      // Second identical request - should be faster due to caching
      const startTime2 = performance.now();
      await platformIntegration.getUnifiedFeedData('test-user-id');
      const duration2 = performance.now() - startTime2;

      // Second request should be significantly faster
      expect(duration2).toBeLessThan(duration1 * 0.5);
    });

    it('should handle large datasets efficiently', async () => {
      // Generate large mock dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `item-${i}`,
        type: 'post',
        content: `Test content ${i}`,
        timestamp: new Date().toISOString(),
        relevanceScore: Math.random() * 100
      }));

      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue(largeDataset);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockImplementation((data: any) => {
        // Simulate ranking algorithm
        return data.sort((a: any, b: any) => b.relevanceScore - a.relevanceScore);
      });

      const startTime = performance.now();
      
      const result = await platformIntegration.getUnifiedFeedData('test-user-id', { limit: 50 });
      
      const duration = performance.now() - startTime;
      
      // Should handle 1000 items and return 50 within 2 seconds
      expect(duration).toBeLessThan(2000);
      expect(result).toHaveLength(50);
    });
  });

  describe('API Client Performance', () => {
    it('should make API requests within acceptable time', async () => {
      const startTime = performance.now();
      
      await apiClient.getSpaces({ limit: 20 });
      
      const duration = performance.now() - startTime;
      
      // Should complete within 500ms for single request
      expect(duration).toBeLessThan(500);
    });

    it('should handle concurrent API requests efficiently', async () => {
      const startTime = performance.now();
      
      // Make multiple concurrent requests
      const requests = [
        apiClient.getSpaces(),
        apiClient.getTools(),
        apiClient.getFeed(),
        apiClient.getProfile(),
      ];

      const results = await Promise.all(requests);
      
      const duration = performance.now() - startTime;
      
      // All 4 requests should complete within 1 second
      expect(duration).toBeLessThan(1000);
      expect(results).toHaveLength(4);
    });

    it('should batch similar requests efficiently', async () => {
      const startTime = performance.now();
      
      // Make multiple similar requests
      const spaceRequests = Array.from({ length: 5 }, (_, i) => 
        apiClient.getSpace(`space-${i}`)
      );

      const results = await Promise.all(spaceRequests);
      
      const duration = performance.now() - startTime;
      
      // Should be more efficient than sequential requests
      expect(duration).toBeLessThan(1000);
      expect(results).toHaveLength(5);
    });

    it('should handle offline fallback quickly', async () => {
      // Mock localStorage for offline cache
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify({
          data: { spaces: [{ id: 'cached-space' }] },
          timestamp: Date.now() - 30000 // 30 seconds ago
        }))
      };
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

      // Mock network failure
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const startTime = performance.now();
      
      const result = await apiClient.getSpacesWithOfflineSupport();
      
      const duration = performance.now() - startTime;
      
      // Fallback should be very fast
      expect(duration).toBeLessThan(100);
      expect(result.spaces).toHaveLength(1);
    });
  });

  describe('Search Engine Performance', () => {
    it('should complete search within acceptable time', async () => {
      // Mock search results
      vi.spyOn(searchEngine as any, 'searchSpaces').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchTools').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchFeed').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchUsers').mockResolvedValue([]);

      const startTime = performance.now();
      
      await searchEngine.search({
        query: 'test query',
        filters: {
          slices: ['spaces', 'tools', 'feed'],
          types: []
        },
        options: {
          limit: 20,
          offset: 0,
          sortBy: 'relevance',
          sortOrder: 'desc',
          includePreview: false,
          highlightMatches: false,
          personalizeResults: false
        }
      });
      
      const duration = performance.now() - startTime;
      
      // Should complete within 1 second
      expect(duration).toBeLessThan(1000);
    });

    it('should handle large search results efficiently', async () => {
      // Mock large search results
      const largeResults = Array.from({ length: 500 }, (_, i) => ({
        id: `result-${i}`,
        type: 'space',
        title: `Space ${i}`,
        relevanceScore: Math.random() * 100
      }));

      vi.spyOn(searchEngine as any, 'searchSpaces').mockResolvedValue(largeResults);
      vi.spyOn(searchEngine as any, 'searchTools').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchFeed').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchUsers').mockResolvedValue([]);

      const startTime = performance.now();
      
      const result = await searchEngine.search({
        query: 'test',
        filters: {
          slices: ['spaces', 'tools', 'feed'],
          types: []
        },
        options: {
          limit: 50,
          offset: 0,
          sortBy: 'relevance',
          sortOrder: 'desc',
          includePreview: false,
          highlightMatches: false,
          personalizeResults: false
        }
      });
      
      const duration = performance.now() - startTime;
      
      // Should handle large results and return top 50 within 1.5 seconds
      expect(duration).toBeLessThan(1500);
      expect(result.results).toHaveLength(50);
    });

    it('should cache search results for repeated queries', async () => {
      vi.spyOn(searchEngine as any, 'searchSpaces').mockResolvedValue([
        { id: 'space-1', type: 'space', title: 'Test Space', relevanceScore: 90 }
      ]);
      vi.spyOn(searchEngine as any, 'searchTools').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchFeed').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchUsers').mockResolvedValue([]);

      // First search
      const startTime1 = performance.now();
      await searchEngine.search({ 
        query: 'test query', 
        filters: {
          slices: ['spaces'],
          types: ['space']
        },
        options: {
          limit: 20,
          offset: 0,
          sortBy: 'relevance',
          sortOrder: 'desc',
          includePreview: false,
          highlightMatches: false,
          personalizeResults: false
        }
      });
      const duration1 = performance.now() - startTime1;

      // Second identical search - should be cached
      const startTime2 = performance.now();
      await searchEngine.search({ 
        query: 'test query', 
        filters: {
          slices: ['spaces'],
          types: ['space']
        },
        options: {
          limit: 20,
          offset: 0,
          sortBy: 'relevance',
          sortOrder: 'desc',
          includePreview: false,
          highlightMatches: false,
          personalizeResults: false
        }
      });
      const duration2 = performance.now() - startTime2;

      // Second search should be much faster due to caching
      expect(duration2).toBeLessThan(duration1 * 0.3);
    });
  });

  describe('Memory Usage', () => {
    it('should not create excessive memory usage during operations', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Perform multiple operations
      for (let i = 0; i < 100; i++) {
        vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([
          { id: `item-${i}`, type: 'post', content: `Content ${i}` }
        ]);
        vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);
        
        await platformIntegration.getUnifiedFeedData('test-user-id', { limit: 10 });
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });

  describe('Stress Testing', () => {
    it('should handle high concurrent load', async () => {
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);

      const startTime = performance.now();
      
      // Create 50 concurrent requests
      const heavyLoad = Array.from({ length: 50 }, () => 
        platformIntegration.getUnifiedFeedData('test-user-id', { limit: 10 })
      );

      const results = await Promise.all(heavyLoad);
      
      const duration = performance.now() - startTime;
      
      // Should handle 50 concurrent requests within 5 seconds
      expect(duration).toBeLessThan(5000);
      expect(results).toHaveLength(50);
    });

    it('should maintain performance with mixed operations', async () => {
      // Mock various operations
      vi.spyOn(platformIntegration as any, 'fetchFromMultipleSources').mockResolvedValue([]);
      vi.spyOn(platformIntegration as any, 'applyIntelligentRanking').mockReturnValue([]);
      vi.spyOn(searchEngine as any, 'searchSpaces').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchTools').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchFeed').mockResolvedValue([]);
      vi.spyOn(searchEngine as any, 'searchUsers').mockResolvedValue([]);

      const startTime = performance.now();
      
      // Mix of different operations
      const mixedOperations = [
        ...Array.from({ length: 10 }, () => platformIntegration.getUnifiedFeedData('test-user-id')),
        ...Array.from({ length: 10 }, () => apiClient.getSpaces()),
        ...Array.from({ length: 10 }, () => searchEngine.search({ 
          query: 'test', 
          filters: {
            slices: ['spaces'],
            types: ['space']
          },
          options: {
            limit: 10,
            offset: 0,
            sortBy: 'relevance',
            sortOrder: 'desc',
            includePreview: false,
            highlightMatches: false,
            personalizeResults: false
          }
        })),
      ];

      const results = await Promise.all(mixedOperations);
      
      const duration = performance.now() - startTime;
      
      // Mixed load of 30 operations should complete within 3 seconds
      expect(duration).toBeLessThan(3000);
      expect(results).toHaveLength(30);
    });
  });

  describe('Error Handling Performance', () => {
    it('should handle errors quickly without blocking', async () => {
      // Mock failures
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      const startTime = performance.now();
      
      // These should fail fast
      const failingOperations = [
        apiClient.getSpaces().catch(() => null),
        apiClient.getTools().catch(() => null),
        apiClient.getFeed().catch(() => null),
      ];

      const results = await Promise.all(failingOperations);
      
      const duration = performance.now() - startTime;
      
      // Failures should be handled quickly (within 1 second)
      expect(duration).toBeLessThan(1000);
      expect(results.every(result => result === null)).toBe(true);
    });

    it('should recover from failures without performance degradation', async () => {
      // Mock initial failures then success
      global.fetch = vi.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ data: 'success' })
        });

      const startTime = performance.now();
      
      // After failures, should still perform well
      const result = await apiClient.getSpaces().catch(() => ({ spaces: [] }));
      
      const duration = performance.now() - startTime;
      
      // Recovery should be quick
      expect(duration).toBeLessThan(1000);
      expect(result).toBeDefined();
    });
  });
});