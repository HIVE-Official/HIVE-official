// High-level caching service for HIVE platform
// Provides domain-specific caching methods with optimized TTL and invalidation strategies

import { redisCache } from './redis-client';
import { logger } from '@/lib/logger';
import type { User, Space, Post, Tool, Ritual } from '@hive/core';

interface CacheNamespaces {
  USERS: 'users';
  SPACES: 'spaces';
  POSTS: 'posts';
  TOOLS: 'tools';
  RITUALS: 'rituals';
  FEED: 'feed';
  ANALYTICS: 'analytics';
  SEARCH: 'search';
  SESSIONS: 'sessions';
  RATE_LIMITS: 'rate_limits';
}

const CACHE_NAMESPACES: CacheNamespaces = {
  USERS: 'users',
  SPACES: 'spaces',
  POSTS: 'posts',
  TOOLS: 'tools',
  RITUALS: 'rituals',
  FEED: 'feed',
  ANALYTICS: 'analytics',
  SEARCH: 'search',
  SESSIONS: 'sessions',
  RATE_LIMITS: 'rate_limits'
};

interface CacheTTL {
  SHORT: number;    // 5 minutes
  MEDIUM: number;   // 1 hour
  LONG: number;     // 4 hours
  VERY_LONG: number; // 24 hours
  SESSION: number;  // 7 days
}

const TTL: CacheTTL = {
  SHORT: 300,        // 5 minutes
  MEDIUM: 3600,      // 1 hour
  LONG: 14400,       // 4 hours
  VERY_LONG: 86400,  // 24 hours
  SESSION: 604800    // 7 days
};

class HiveCacheService {
  // User caching methods
  async getCachedUser(userId: string, campusId?: string): Promise<User | null> {
    try {
      return await redisCache.get<User>(CACHE_NAMESPACES.USERS, userId, campusId);
    } catch (error) {
      logger.error('Failed to get cached user:', error);
      return null;
    }
  }

  async setCachedUser(userId: string, user: User, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.USERS,
        userId,
        user,
        TTL.MEDIUM,
        campusId,
        { type: 'user_profile', lastUpdated: Date.now() }
      );
    } catch (error) {
      logger.error('Failed to cache user:', error);
      return false;
    }
  }

  async invalidateUser(userId: string, campusId?: string): Promise<boolean> {
    try {
      // Invalidate user profile
      await redisCache.delete(CACHE_NAMESPACES.USERS, userId, campusId);

      // Invalidate user's feed cache
      await redisCache.deletePattern(CACHE_NAMESPACES.FEED, `user:${userId}:*`, campusId);

      // Invalidate user's session data
      await redisCache.deletePattern(CACHE_NAMESPACES.SESSIONS, `${userId}:*`, campusId);

      logger.info(`Invalidated cache for user: ${userId}`);
      return true;
    } catch (error) {
      logger.error('Failed to invalidate user cache:', error);
      return false;
    }
  }

  // Space caching methods
  async getCachedSpace(spaceId: string, campusId?: string): Promise<Space | null> {
    try {
      return await redisCache.get<Space>(CACHE_NAMESPACES.SPACES, spaceId, campusId);
    } catch (error) {
      logger.error('Failed to get cached space:', error);
      return null;
    }
  }

  async setCachedSpace(spaceId: string, space: Space, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.SPACES,
        spaceId,
        space,
        TTL.LONG,
        campusId,
        { type: 'space_data', memberCount: space.memberCount || 0 }
      );
    } catch (error) {
      logger.error('Failed to cache space:', error);
      return false;
    }
  }

  async getCachedSpaceMembers(spaceId: string, campusId?: string): Promise<string[] | null> {
    try {
      return await redisCache.get<string[]>(CACHE_NAMESPACES.SPACES, `${spaceId}:members`, campusId);
    } catch (error) {
      logger.error('Failed to get cached space members:', error);
      return null;
    }
  }

  async setCachedSpaceMembers(spaceId: string, memberIds: string[], campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.SPACES,
        `${spaceId}:members`,
        memberIds,
        TTL.MEDIUM,
        campusId,
        { type: 'space_members', count: memberIds.length }
      );
    } catch (error) {
      logger.error('Failed to cache space members:', error);
      return false;
    }
  }

  async invalidateSpace(spaceId: string, campusId?: string): Promise<boolean> {
    try {
      // Invalidate space data and members
      await redisCache.deletePattern(CACHE_NAMESPACES.SPACES, `${spaceId}*`, campusId);

      // Invalidate space-related posts
      await redisCache.deletePattern(CACHE_NAMESPACES.POSTS, `space:${spaceId}:*`, campusId);

      // Invalidate feed entries containing this space
      await redisCache.deletePattern(CACHE_NAMESPACES.FEED, `*space:${spaceId}*`, campusId);

      logger.info(`Invalidated cache for space: ${spaceId}`);
      return true;
    } catch (error) {
      logger.error('Failed to invalidate space cache:', error);
      return false;
    }
  }

  // Feed caching methods
  async getCachedUserFeed(userId: string, page: number = 0, campusId?: string): Promise<Post[] | null> {
    try {
      return await redisCache.get<Post[]>(
        CACHE_NAMESPACES.FEED,
        `user:${userId}:page:${page}`,
        campusId
      );
    } catch (error) {
      logger.error('Failed to get cached user feed:', error);
      return null;
    }
  }

  async setCachedUserFeed(userId: string, page: number, posts: Post[], campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.FEED,
        `user:${userId}:page:${page}`,
        posts,
        TTL.SHORT, // Feed data changes frequently
        campusId,
        { type: 'user_feed', postCount: posts.length }
      );
    } catch (error) {
      logger.error('Failed to cache user feed:', error);
      return false;
    }
  }

  async getCachedSpaceFeed(spaceId: string, page: number = 0, campusId?: string): Promise<Post[] | null> {
    try {
      return await redisCache.get<Post[]>(
        CACHE_NAMESPACES.FEED,
        `space:${spaceId}:page:${page}`,
        campusId
      );
    } catch (error) {
      logger.error('Failed to get cached space feed:', error);
      return null;
    }
  }

  async setCachedSpaceFeed(spaceId: string, page: number, posts: Post[], campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.FEED,
        `space:${spaceId}:page:${page}`,
        posts,
        TTL.SHORT,
        campusId,
        { type: 'space_feed', postCount: posts.length }
      );
    } catch (error) {
      logger.error('Failed to cache space feed:', error);
      return false;
    }
  }

  async invalidateUserFeed(userId: string, campusId?: string): Promise<boolean> {
    try {
      await redisCache.deletePattern(CACHE_NAMESPACES.FEED, `user:${userId}:*`, campusId);
      logger.info(`Invalidated feed cache for user: ${userId}`);
      return true;
    } catch (error) {
      logger.error('Failed to invalidate user feed:', error);
      return false;
    }
  }

  // Search caching methods
  async getCachedSearchResults(query: string, filters: Record<string, any>, campusId?: string): Promise<any[] | null> {
    try {
      const queryKey = this.generateSearchKey(query, filters);
      return await redisCache.get<any[]>(CACHE_NAMESPACES.SEARCH, queryKey, campusId);
    } catch (error) {
      logger.error('Failed to get cached search results:', error);
      return null;
    }
  }

  async setCachedSearchResults(query: string, filters: Record<string, any>, results: any[], campusId?: string): Promise<boolean> {
    try {
      const queryKey = this.generateSearchKey(query, filters);
      return await redisCache.set(
        CACHE_NAMESPACES.SEARCH,
        queryKey,
        results,
        TTL.MEDIUM,
        campusId,
        { type: 'search_results', resultCount: results.length, query }
      );
    } catch (error) {
      logger.error('Failed to cache search results:', error);
      return false;
    }
  }

  private generateSearchKey(query: string, filters: Record<string, any>): string {
    const normalizedQuery = query.toLowerCase().trim();
    const filterString = Object.keys(filters)
      .sort()
      .map(key => `${key}:${filters[key]}`)
      .join('|');

    return `${normalizedQuery}:${Buffer.from(filterString).toString('base64')}`;
  }

  // Analytics caching methods
  async getCachedAnalytics(key: string, campusId?: string): Promise<any | null> {
    try {
      return await redisCache.get<any>(CACHE_NAMESPACES.ANALYTICS, key, campusId);
    } catch (error) {
      logger.error('Failed to get cached analytics:', error);
      return null;
    }
  }

  async setCachedAnalytics(key: string, data: any, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.ANALYTICS,
        key,
        data,
        TTL.VERY_LONG, // Analytics can be cached longer
        campusId,
        { type: 'analytics_data', generatedAt: Date.now() }
      );
    } catch (error) {
      logger.error('Failed to cache analytics:', error);
      return false;
    }
  }

  // Ritual caching methods
  async getCachedRitual(ritualId: string, campusId?: string): Promise<Ritual | null> {
    try {
      return await redisCache.get<Ritual>(CACHE_NAMESPACES.RITUALS, ritualId, campusId);
    } catch (error) {
      logger.error('Failed to get cached ritual:', error);
      return null;
    }
  }

  async setCachedRitual(ritualId: string, ritual: Ritual, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.RITUALS,
        ritualId,
        ritual,
        TTL.LONG,
        campusId,
        { type: 'ritual_data', status: ritual.status }
      );
    } catch (error) {
      logger.error('Failed to cache ritual:', error);
      return false;
    }
  }

  async getCachedActiveRituals(campusId?: string): Promise<Ritual[] | null> {
    try {
      return await redisCache.get<Ritual[]>(CACHE_NAMESPACES.RITUALS, 'active_list', campusId);
    } catch (error) {
      logger.error('Failed to get cached active rituals:', error);
      return null;
    }
  }

  async setCachedActiveRituals(rituals: Ritual[], campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.RITUALS,
        'active_list',
        rituals,
        TTL.MEDIUM,
        campusId,
        { type: 'active_rituals', count: rituals.length }
      );
    } catch (error) {
      logger.error('Failed to cache active rituals:', error);
      return false;
    }
  }

  async invalidateRitual(ritualId: string, campusId?: string): Promise<boolean> {
    try {
      await redisCache.delete(CACHE_NAMESPACES.RITUALS, ritualId, campusId);
      await redisCache.deletePattern(CACHE_NAMESPACES.FEED, `*ritual:${ritualId}*`, campusId);
      return true;
    } catch (error) {
      logger.error('Failed to invalidate ritual cache:', error);
      return false;
    }
  }

  async invalidateActiveRituals(campusId?: string): Promise<boolean> {
    try {
      await redisCache.delete(CACHE_NAMESPACES.RITUALS, 'active_list', campusId);
      return true;
    } catch (error) {
      logger.error('Failed to invalidate active rituals cache:', error);
      return false;
    }
  }

  // Session management
  async getCachedSession(sessionId: string, campusId?: string): Promise<any | null> {
    try {
      return await redisCache.get<any>(CACHE_NAMESPACES.SESSIONS, sessionId, campusId);
    } catch (error) {
      logger.error('Failed to get cached session:', error);
      return null;
    }
  }

  async setCachedSession(sessionId: string, sessionData: any, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.set(
        CACHE_NAMESPACES.SESSIONS,
        sessionId,
        sessionData,
        TTL.SESSION,
        campusId,
        { type: 'user_session', userId: sessionData.userId }
      );
    } catch (error) {
      logger.error('Failed to cache session:', error);
      return false;
    }
  }

  async invalidateSession(sessionId: string, campusId?: string): Promise<boolean> {
    try {
      return await redisCache.delete(CACHE_NAMESPACES.SESSIONS, sessionId, campusId);
    } catch (error) {
      logger.error('Failed to invalidate session:', error);
      return false;
    }
  }

  // Rate limiting
  async checkRateLimit(userId: string, action: string, limit: number, windowSeconds: number, campusId?: string): Promise<{ allowed: boolean; remainingRequests: number; resetTime: number }> {
    try {
      const key = `${userId}:${action}`;
      const currentCount = await redisCache.get<number>(CACHE_NAMESPACES.RATE_LIMITS, key, campusId) || 0;

      if (currentCount >= limit) {
        return {
          allowed: false,
          remainingRequests: 0,
          resetTime: Date.now() + (windowSeconds * 1000)
        };
      }

      const newCount = currentCount + 1;
      await redisCache.set(CACHE_NAMESPACES.RATE_LIMITS, key, newCount, windowSeconds, campusId);

      return {
        allowed: true,
        remainingRequests: limit - newCount,
        resetTime: Date.now() + (windowSeconds * 1000)
      };
    } catch (error) {
      logger.error('Rate limit check failed:', error);
      // Allow request on error to avoid blocking users
      return {
        allowed: true,
        remainingRequests: limit,
        resetTime: Date.now() + (windowSeconds * 1000)
      };
    }
  }

  // Bulk operations for performance
  async setCachedUsers(users: Array<{ id: string; data: User; campusId?: string }>): Promise<boolean> {
    try {
      const entries = users.map(user => ({
        namespace: CACHE_NAMESPACES.USERS,
        key: user.id,
        data: user.data,
        ttl: TTL.MEDIUM,
        campusId: user.campusId
      }));

      return await redisCache.mset(entries);
    } catch (error) {
      logger.error('Failed to cache multiple users:', error);
      return false;
    }
  }

  async getCachedUsers(userIds: string[], campusId?: string): Promise<Array<User | null>> {
    try {
      return await redisCache.mget<User>(CACHE_NAMESPACES.USERS, userIds, campusId);
    } catch (error) {
      logger.error('Failed to get multiple cached users:', error);
      return new Array(userIds.length).fill(null);
    }
  }

  // Cache warming methods
  async warmUserCache(userId: string, userData: User, campusId?: string): Promise<void> {
    try {
      // Cache user profile
      await this.setCachedUser(userId, userData, campusId);

      // Pre-warm frequently accessed data
      logger.info(`Cache warmed for user: ${userId}`);
    } catch (error) {
      logger.error('Failed to warm user cache:', error);
    }
  }

  async warmSpaceCache(spaceId: string, spaceData: Space, campusId?: string): Promise<void> {
    try {
      // Cache space data
      await this.setCachedSpace(spaceId, spaceData, campusId);

      logger.info(`Cache warmed for space: ${spaceId}`);
    } catch (error) {
      logger.error('Failed to warm space cache:', error);
    }
  }

  // Cache statistics and health
  getCacheStats() {
    return redisCache.getStats();
  }

  async getCacheHealth(): Promise<{ healthy: boolean; stats: any; memory?: any }> {
    try {
      const healthy = await redisCache.isHealthy();
      const stats = this.getCacheStats();
      const memory = await redisCache.getMemoryInfo();

      return { healthy, stats, memory };
    } catch (error) {
      logger.error('Failed to get cache health:', error);
      return { healthy: false, stats: this.getCacheStats() };
    }
  }

  // Campus-wide operations
  async invalidateCampusCache(campusId: string): Promise<number> {
    try {
      return await redisCache.invalidateCampusCache(campusId);
    } catch (error) {
      logger.error('Failed to invalidate campus cache:', error);
      return 0;
    }
  }

  // Emergency cache operations
  async flushAllCache(): Promise<boolean> {
    try {
      const success = await redisCache.flushAll();
      if (success) {
        logger.warn('All cache data has been flushed');
      }
      return success;
    } catch (error) {
      logger.error('Failed to flush all cache:', error);
      return false;
    }
  }
}

// Export singleton instance
export const cacheService = new HiveCacheService();
export default cacheService;
