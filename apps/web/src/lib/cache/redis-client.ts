// Advanced Redis-based caching layer for HIVE platform
// Optimized for multi-tenant architecture and cross-campus scaling

import Redis, { Redis as RedisClient } from 'ioredis';
import { logger } from '@/lib/logger';

interface CacheConfig {
  host: string;
  port: number;
  password?: string;
  retryDelayOnFailover: number;
  enableOfflineQueue: boolean;
  maxRetriesPerRequest: number;
  lazyConnect: boolean;
  keepAlive: number;
  family: number;
  keyPrefix: string;
  enabled: boolean;
}

// Mock Redis implementation for development when Redis is disabled
class MockRedis {
  private data: Map<string, { value: string; expiry?: number }> = new Map();

  async get(key: string): Promise<string | null> {
    const entry = this.data.get(key);
    if (!entry) return null;

    if (entry.expiry && Date.now() > entry.expiry) {
      this.data.delete(key);
      return null;
    }

    return entry.value;
  }

  async set(key: string, value: string, ...args: any[]): Promise<string> {
    const entry = { value };

    // Handle Redis set with expiry: SET key value PX milliseconds
    if (args.length >= 2 && args[0] === 'PX') {
      const expiryMs = args[1];
      (entry as any).expiry = Date.now() + expiryMs;
    }

    this.data.set(key, entry);
    return 'OK';
  }

  async setex(key: string, seconds: number, value: string): Promise<string> {
    this.data.set(key, {
      value,
      expiry: Date.now() + (seconds * 1000)
    });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let deleted = 0;
    keys.forEach(key => {
      if (this.data.delete(key)) deleted++;
    });
    return deleted;
  }

  async exists(key: string): Promise<number> {
    const entry = this.data.get(key);
    if (!entry) return 0;

    if (entry.expiry && Date.now() > entry.expiry) {
      this.data.delete(key);
      return 0;
    }

    return 1;
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.data.keys()).filter(key => regex.test(key));
  }

  async mget(...keys: string[]): Promise<Array<string | null>> {
    return Promise.all(keys.map(key => this.get(key)));
  }

  async incrby(key: string, increment: number): Promise<number> {
    const current = await this.get(key);
    const newValue = (parseInt(current || '0') + increment).toString();
    await this.set(key, newValue);
    return parseInt(newValue);
  }

  async ping(): Promise<string> {
    return 'PONG';
  }

  async info(section?: string): Promise<string> {
    return `# ${section || 'Server'}
redis_version:7.0.0-mock
used_memory:1024
used_memory_human:1.00K
used_memory_rss:2048
used_memory_peak:2048
maxmemory:0
mem_fragmentation_ratio:1.0
connected_clients:1
uptime_in_seconds:3600`;
  }

  async flushall(): Promise<string> {
    this.data.clear();
    return 'OK';
  }

  async quit(): Promise<string> {
    this.data.clear();
    return 'OK';
  }

  pipeline() {
    return {
      setex: (key: string, ttl: number, value: string) => this.setex(key, ttl, value),
      exec: async () => [['OK']]
    };
  }

  on(event: string, handler: Function) {
    // Mock event handlers
    if (event === 'ready') {
      setTimeout(handler, 100);
    }
  }
}

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
  campusId: string;
  metadata?: Record<string, any>;
}

interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  errors: number;
  avgResponseTime: number;
  memoryUsage: number;
  activeConnections: number;
}

class HiveRedisCache {
  private client: RedisClient | MockRedis;
  private readonly config: CacheConfig;
  private stats: CacheStats;
  private healthCheckInterval?: NodeJS.Timeout;
  private _isUsingMockRedis: boolean;

  constructor() {
    this.config = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      keyPrefix: 'hive:',
      enabled: process.env.REDIS_ENABLED === 'true'
    };

    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      avgResponseTime: 0,
      memoryUsage: 0,
      activeConnections: 0
    };

    this._isUsingMockRedis = !this.config.enabled;
    this.initializeClient();
  }

  private initializeClient(): void {
    if (this.config.enabled) {
      // Real Redis client
      this.client = new Redis(this.config);

      this.client.on('connect', () => {
        logger.info('Redis client connected successfully');
      });

      this.client.on('error', (error) => {
        this.stats.errors++;
        logger.error('Redis client error:', error);
      });

      this.client.on('ready', () => {
        logger.info('Redis client ready for operations');
        this.startHealthCheck();
      });

      this.client.on('reconnecting', () => {
        logger.info('Redis client reconnecting...');
      });
    } else {
      // Mock Redis for development
      this.client = new MockRedis();
      logger.info('Using Mock Redis for development (REDIS_ENABLED=false)');

      // Simulate ready event for mock Redis
      setTimeout(() => {
        this.startHealthCheck();
      }, 100);
    }
  }

  private startHealthCheck(): void {
    this.healthCheckInterval = setInterval(async () => {
      try {
        const start = Date.now();
        await this.client.ping();
        const responseTime = Date.now() - start;

        // Update average response time
        this.stats.avgResponseTime = (this.stats.avgResponseTime + responseTime) / 2;

        // Get memory usage from Redis INFO
        const info = await this.client.info('memory');
        const memoryMatch = info.match(/used_memory:(\d+)/);
        if (memoryMatch) {
          this.stats.memoryUsage = parseInt(memoryMatch[1]);
        }

        // Get connection count
        const clientInfo = await this.client.info('clients');
        const connectionMatch = clientInfo.match(/connected_clients:(\d+)/);
        if (connectionMatch) {
          this.stats.activeConnections = parseInt(connectionMatch[1]);
        }
      } catch (error) {
        this.stats.errors++;
        logger.error('Redis health check failed:', error);
      }
    }, 30000); // Every 30 seconds
  }

  private generateKey(namespace: string, key: string, campusId: string = 'ub-buffalo'): string {
    return `${namespace}:${campusId}:${key}`;
  }

  private async trackOperation<T>(operation: Promise<T>, type: 'get' | 'set' | 'del'): Promise<T> {
    const start = Date.now();

    try {
      const result = await operation;

      switch (type) {
        case 'get':
          if (result !== null) {
            this.stats.hits++;
          } else {
            this.stats.misses++;
          }
          break;
        case 'set':
          this.stats.sets++;
          break;
        case 'del':
          this.stats.deletes++;
          break;
      }

      return result;
    } catch (error) {
      this.stats.errors++;
      throw error;
    } finally {
      const responseTime = Date.now() - start;
      this.stats.avgResponseTime = (this.stats.avgResponseTime + responseTime) / 2;
    }
  }

  async get<T>(namespace: string, key: string, campusId?: string): Promise<T | null> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    return this.trackOperation(
      this.client.get(cacheKey).then(result => {
        if (result) {
          try {
            const entry: CacheEntry<T> = JSON.parse(result);

            // Check if expired
            if (Date.now() > entry.timestamp + entry.ttl * 1000) {
              this.delete(namespace, key, campusId);
              return null;
            }

            return entry.data;
          } catch (error) {
            logger.error('Failed to parse cache entry:', error);
            return null;
          }
        }
        return null;
      }),
      'get'
    );
  }

  async set<T>(
    namespace: string,
    key: string,
    data: T,
    ttlSeconds: number = 3600,
    campusId?: string,
    metadata?: Record<string, any>
  ): Promise<boolean> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds,
      version: '1.0.0',
      campusId: campusId || 'ub-buffalo',
      metadata
    };

    return this.trackOperation(
      this.client.setex(cacheKey, ttlSeconds, JSON.stringify(entry)).then(result => result === 'OK'),
      'set'
    );
  }

  async delete(namespace: string, key: string, campusId?: string): Promise<boolean> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    return this.trackOperation(
      this.client.del(cacheKey).then(result => result > 0),
      'del'
    );
  }

  async deletePattern(namespace: string, pattern: string, campusId?: string): Promise<number> {
    const searchPattern = this.generateKey(namespace, pattern, campusId);

    try {
      const keys = await this.client.keys(searchPattern);
      if (keys.length === 0) return 0;

      const deleted = await this.client.del(...keys);
      this.stats.deletes += deleted;
      return deleted;
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to delete pattern:', error);
      return 0;
    }
  }

  async exists(namespace: string, key: string, campusId?: string): Promise<boolean> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    try {
      const result = await this.client.exists(cacheKey);
      return result === 1;
    } catch (error) {
      this.stats.errors++;
      return false;
    }
  }

  async increment(namespace: string, key: string, amount: number = 1, campusId?: string): Promise<number> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    try {
      return await this.client.incrby(cacheKey, amount);
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to increment key:', error);
      return 0;
    }
  }

  async setWithExpiry(
    namespace: string,
    key: string,
    data: any,
    expiryMs: number,
    campusId?: string
  ): Promise<boolean> {
    const cacheKey = this.generateKey(namespace, key, campusId);

    try {
      const result = await this.client.set(cacheKey, JSON.stringify(data), 'PX', expiryMs);
      if (result === 'OK') {
        this.stats.sets++;
        return true;
      }
      return false;
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to set with expiry:', error);
      return false;
    }
  }

  // Multi-campus operations
  async getCampusData<T>(namespace: string, key: string): Promise<Record<string, T>> {
    const campuses = ['ub-buffalo']; // Will expand as we add more campuses
    const results: Record<string, T> = {};

    const promises = campuses.map(async (campusId) => {
      const data = await this.get<T>(namespace, key, campusId);
      if (data) {
        results[campusId] = data;
      }
    });

    await Promise.all(promises);
    return results;
  }

  async invalidateCampusCache(campusId: string): Promise<number> {
    try {
      const pattern = `*:${campusId}:*`;
      const keys = await this.client.keys(pattern);

      if (keys.length === 0) return 0;

      const deleted = await this.client.del(...keys);
      this.stats.deletes += deleted;

      logger.info(`Invalidated ${deleted} cache entries for campus: ${campusId}`);
      return deleted;
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to invalidate campus cache:', error);
      return 0;
    }
  }

  // Performance optimization methods
  async pipeline(): Promise<any> {
    return this.client.pipeline();
  }

  // Check if using mock Redis
  isUsingMockRedis(): boolean {
    return this._isUsingMockRedis;
  }

  async mget<T>(namespace: string, keys: string[], campusId?: string): Promise<Array<T | null>> {
    const cacheKeys = keys.map(key => this.generateKey(namespace, key, campusId));

    try {
      const results = await this.client.mget(...cacheKeys);
      return results.map(result => {
        if (result) {
          try {
            const entry: CacheEntry<T> = JSON.parse(result);

            // Check if expired
            if (Date.now() > entry.timestamp + entry.ttl * 1000) {
              return null;
            }

            this.stats.hits++;
            return entry.data;
          } catch (error) {
            logger.error('Failed to parse cache entry in mget:', error);
            this.stats.misses++;
            return null;
          }
        }
        this.stats.misses++;
        return null;
      });
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to execute mget:', error);
      return new Array(keys.length).fill(null);
    }
  }

  async mset(entries: Array<{ namespace: string; key: string; data: any; ttl?: number; campusId?: string }>): Promise<boolean> {
    try {
      const pipeline = this.client.pipeline();

      entries.forEach(({ namespace, key, data, ttl = 3600, campusId }) => {
        const cacheKey = this.generateKey(namespace, key, campusId);
        const entry: CacheEntry = {
          data,
          timestamp: Date.now(),
          ttl,
          version: '1.0.0',
          campusId: campusId || 'ub-buffalo'
        };

        pipeline.setex(cacheKey, ttl, JSON.stringify(entry));
      });

      const results = await pipeline.exec();
      const success = results?.every(result => result && result[1] === 'OK') || false;

      if (success) {
        this.stats.sets += entries.length;
      }

      return success;
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to execute mset:', error);
      return false;
    }
  }

  // Analytics and monitoring
  getStats(): CacheStats & { hitRate: number; totalOperations: number } {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? (this.stats.hits / (this.stats.hits + this.stats.misses)) * 100
      : 0;

    return {
      ...this.stats,
      hitRate: parseFloat(hitRate.toFixed(2)),
      totalOperations: this.stats.hits + this.stats.misses + this.stats.sets + this.stats.deletes
    };
  }

  async getMemoryInfo(): Promise<Record<string, any>> {
    try {
      const info = await this.client.info('memory');
      const lines = info.split('\r\n');
      const memoryInfo: Record<string, any> = {};

      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value !== undefined) {
          memoryInfo[key] = isNaN(Number(value)) ? value : Number(value);
        }
      });

      return memoryInfo;
    } catch (error) {
      logger.error('Failed to get memory info:', error);
      return {};
    }
  }

  async flushAll(): Promise<boolean> {
    try {
      await this.client.flushall();
      logger.warn('Redis cache completely flushed');
      return true;
    } catch (error) {
      this.stats.errors++;
      logger.error('Failed to flush cache:', error);
      return false;
    }
  }

  async close(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    try {
      await this.client.quit();
      logger.info('Redis client connection closed');
    } catch (error) {
      logger.error('Error closing Redis connection:', error);
    }
  }

  // Health check method
  async isHealthy(): Promise<boolean> {
    try {
      const result = await this.client.ping();
      return result === 'PONG';
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const redisCache = new HiveRedisCache();
export default redisCache;