/**
 * Space-specific caching utilities for performance optimization
 *
 * Production-ready caching layer that reduces Firebase calls
 * and improves user experience for frequently accessed spaces
 */

import { logger } from '@/lib/logger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class SpaceCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 1000; // Prevent memory bloat

  /**
   * Get cached data if available and not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cached data with optional TTL
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // Prevent memory bloat
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Remove specific cache entry
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries (garbage collection)
   */
  cleanup(): void {
    const now = Date.now();
    let removedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      logger.debug('Cache cleanup completed', {
        entriesRemoved: removedCount,
        totalEntries: this.cache.size
      });
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.MAX_CACHE_SIZE,
      defaultTTL: this.DEFAULT_TTL
    };
  }

  /**
   * Evict oldest entry when cache is full
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }
}

// Global cache instance
const spaceCache = new SpaceCache();

// Cleanup expired entries every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => spaceCache.cleanup(), 10 * 60 * 1000);
}

/**
 * Cache keys for different space data types
 */
export const CacheKeys = {
  space: (spaceId: string) => `space:${spaceId}`,
  membership: (userId: string, spaceId: string) => `membership:${userId}:${spaceId}`,
  members: (spaceId: string) => `members:${spaceId}`,
  tools: (spaceId: string) => `tools:${spaceId}`,
  posts: (spaceId: string, cursor?: string) => `posts:${spaceId}:${cursor || 'latest'}`,
  permissions: (userId: string, spaceId: string) => `permissions:${userId}:${spaceId}`,
  spacesList: (filterType?: string, searchTerm?: string) =>
    `spaces:${filterType || 'all'}:${searchTerm || 'none'}`,
};

/**
 * High-level caching functions for common space operations
 */
export const SpaceCaching = {
  /**
   * Cache or retrieve space data
   */
  async getOrSetSpace<T>(
    spaceId: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cacheKey = CacheKeys.space(spaceId);
    const cached = spaceCache.get<T>(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const fresh = await fetcher();
      spaceCache.set(cacheKey, fresh, ttl);
      return fresh;
    } catch (error) {
      logger.error('Failed to fetch space data for cache', { spaceId, error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  },

  /**
   * Cache or retrieve user membership data
   */
  async getOrSetMembership<T>(
    userId: string,
    spaceId: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cacheKey = CacheKeys.membership(userId, spaceId);
    const cached = spaceCache.get<T>(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const fresh = await fetcher();
      spaceCache.set(cacheKey, fresh, ttl);
      return fresh;
    } catch (error) {
      logger.error('Failed to fetch membership data for cache', { userId, spaceId, error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  },

  /**
   * Cache or retrieve space tools
   */
  async getOrSetTools<T>(
    spaceId: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cacheKey = CacheKeys.tools(spaceId);
    const cached = spaceCache.get<T>(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const fresh = await fetcher();
      spaceCache.set(cacheKey, fresh, ttl);
      return fresh;
    } catch (error) {
      logger.error('Failed to fetch tools data for cache', { spaceId, error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  },

  /**
   * Invalidate cache for a specific space
   */
  invalidateSpace(spaceId: string): void {
    spaceCache.delete(CacheKeys.space(spaceId));
    spaceCache.delete(CacheKeys.members(spaceId));
    spaceCache.delete(CacheKeys.tools(spaceId));

    // Invalidate posts cache (all cursors)
    for (const key of spaceCache['cache'].keys()) {
      if (key.startsWith(`posts:${spaceId}:`)) {
        spaceCache.delete(key);
      }
    }

    logger.debug('Space cache invalidated', { spaceId });
  },

  /**
   * Invalidate membership cache for a user across all spaces
   */
  invalidateUserMemberships(userId: string): void {
    for (const key of spaceCache['cache'].keys()) {
      if (key.startsWith(`membership:${userId}:`) ||
          key.startsWith(`permissions:${userId}:`)) {
        spaceCache.delete(key);
      }
    }

    logger.debug('User membership cache invalidated', { userId });
  },

  /**
   * Get cache statistics for monitoring
   */
  getStats() {
    return spaceCache.getStats();
  },

  /**
   * Manual cache cleanup
   */
  cleanup() {
    spaceCache.cleanup();
  },

  /**
   * Clear all cached data (use sparingly)
   */
  clearAll() {
    spaceCache.clear();
    logger.info('All space cache cleared');
  }
};

export default spaceCache;