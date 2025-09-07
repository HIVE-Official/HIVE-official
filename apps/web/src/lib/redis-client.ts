import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';

/**
 * Redis client for production-grade caching and rate limiting
 * Falls back to filesystem implementation for development
 */

let redis: Redis | null = null;
let isConnected = false;

// In-memory fallback for development
const memoryStore = new Map<string, any>();

// Filesystem storage for development (persists across reloads)
const DEV_STORAGE_PATH = path.join(process.cwd(), '.next', 'cache', 'dev-redis');

// Ensure dev storage directory exists
if (process.env.NODE_ENV === 'development') {
  try {
    if (!fs.existsSync(DEV_STORAGE_PATH)) {
      fs.mkdirSync(DEV_STORAGE_PATH, { recursive: true });
    }
  } catch (error) {
    console.error('Failed to create dev storage directory:', error);
  }
}

/**
 * Initialize Redis connection
 */
export function initializeRedis(): Redis | null {
  if (redis && isConnected) {
    return redis;
  }

  try {
    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
    
    if (!redisUrl) {
      if (process.env.NODE_ENV === 'production') {
        console.error('⚠️ Redis URL not configured in production environment');
        throw new Error('Redis URL is required in production');
      }
      
      return null;
    }

    // Parse Redis URL
    const url = new URL(redisUrl);
    
    // Create Redis instance with proper configuration
    redis = new Redis({
      host: url.hostname,
      port: parseInt(url.port) || 6379,
      password: url.password || process.env.REDIS_PASSWORD,
      username: url.username || process.env.REDIS_USERNAME,
      db: 0,
      
      // Connection settings
      connectTimeout: 10000,
      commandTimeout: 5000,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      
      // Connection pool settings
      family: 4,
      keepAlive: true,
      
      // Reconnection settings
      retryDelayOnClusterDown: 300,
      enableOfflineQueue: false,
      
      // Health check
      lazyConnect: true,
    });

    // Event handlers
    redis.on('connect', () => {
      
      isConnected = true;
    });

    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
      isConnected = false;
    });

    redis.on('close', () => {
      
      isConnected = false;
    });

    redis.on('reconnecting', () => {
      
    });

    // Test the connection
    redis.ping().catch((error) => {
      console.error('❌ Redis ping failed:', error);
      isConnected = false;
    });

    return redis;
  } catch (error) {
    console.error('❌ Failed to initialize Redis:', error);
    
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
    
    return null;
  }
}

/**
 * Get Redis client or null if using fallback
 */
export function getRedisClient(): Redis | null {
  if (!redis) {
    return initializeRedis();
  }
  return isConnected ? redis : null;
}

/**
 * Redis operations with automatic fallback to in-memory store
 */
export class RedisService {
  private client: Redis | null;

  constructor() {
    this.client = getRedisClient();
  }

  /**
   * Set a key-value pair with optional TTL
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    try {
      if (this.client && isConnected) {
        if (ttlSeconds) {
          await this.client.setex(key, ttlSeconds, value);
        } else {
          await this.client.set(key, value);
        }
        return true;
      } else {
        // Fallback to filesystem in development
        if (process.env.NODE_ENV === 'development') {
          const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
          const data = { value, expiry };
          const filename = path.join(DEV_STORAGE_PATH, `${Buffer.from(key).toString('base64')}.json`);
          try {
            fs.writeFileSync(filename, JSON.stringify(data));
            console.log('💾 Stored in dev filesystem:', { key, filename: path.basename(filename) });
            return true;
          } catch (err) {
            console.error('Failed to write to dev storage:', err);
            memoryStore.set(key, data);
            return false;
          }
        } else {
          // Fallback to memory store
          const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
          memoryStore.set(key, { value, expiry });
        }
        return true;
      }
    } catch (error) {
      console.error('Redis SET error:', error);
      // Fallback to memory store
      const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
      memoryStore.set(key, { value, expiry });
      return false;
    }
  }

  /**
   * Get a value by key
   */
  async get(key: string): Promise<string | null> {
    try {
      if (this.client && isConnected) {
        return await this.client.get(key);
      } else {
        // Fallback to filesystem in development
        if (process.env.NODE_ENV === 'development') {
          const filename = path.join(DEV_STORAGE_PATH, `${Buffer.from(key).toString('base64')}.json`);
          try {
            if (fs.existsSync(filename)) {
              const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
              
              // Check expiry
              if (data.expiry && Date.now() > data.expiry) {
                fs.unlinkSync(filename);
                console.log('🗑️ Expired dev storage:', { key, filename: path.basename(filename) });
                return null;
              }
              
              console.log('📖 Retrieved from dev filesystem:', { key, filename: path.basename(filename) });
              return data.value;
            }
          } catch (err) {
            console.error('Failed to read from dev storage:', err);
          }
        }
        
        // Fallback to memory store
        const item = memoryStore.get(key);
        if (!item) return null;
        
        if (item.expiry && Date.now() > item.expiry) {
          memoryStore.delete(key);
          return null;
        }
        
        return item.value;
      }
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  }

  /**
   * Increment a counter with optional TTL
   */
  async incr(key: string, ttlSeconds?: number): Promise<number> {
    try {
      if (this.client && isConnected) {
        const result = await this.client.incr(key);
        if (ttlSeconds && result === 1) {
          await this.client.expire(key, ttlSeconds);
        }
        return result;
      } else {
        // Fallback to memory store
        const item = memoryStore.get(key);
        let count = 1;
        
        if (item && (!item.expiry || Date.now() <= item.expiry)) {
          count = parseInt(item.value) + 1;
        }
        
        const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
        memoryStore.set(key, { value: count.toString(), expiry });
        return count;
      }
    } catch (error) {
      console.error('Redis INCR error:', error);
      return 1;
    }
  }

  /**
   * Delete a key
   */
  async del(key: string): Promise<boolean> {
    try {
      if (this.client && isConnected) {
        const result = await this.client.del(key);
        return result > 0;
      } else {
        // Fallback to filesystem in development
        if (process.env.NODE_ENV === 'development') {
          const filename = path.join(DEV_STORAGE_PATH, `${Buffer.from(key).toString('base64')}.json`);
          try {
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
              console.log('🗑️ Deleted from dev storage:', { key, filename: path.basename(filename) });
              return true;
            }
          } catch (err) {
            console.error('Failed to delete from dev storage:', err);
          }
        }
        
        // Fallback to memory store
        return memoryStore.delete(key);
      }
    } catch (error) {
      console.error('Redis DEL error:', error);
      return false;
    }
  }

  /**
   * Get TTL for a key
   */
  async ttl(key: string): Promise<number> {
    try {
      if (this.client && isConnected) {
        return await this.client.ttl(key);
      } else {
        // Fallback to memory store
        const item = memoryStore.get(key);
        if (!item || !item.expiry) return -1;
        
        const remaining = Math.ceil((item.expiry - Date.now()) / 1000);
        return remaining > 0 ? remaining : -2;
      }
    } catch (error) {
      console.error('Redis TTL error:', error);
      return -1;
    }
  }

  /**
   * Execute a Lua script for atomic operations
   */
  async eval(script: string, keys: string[], args: string[]): Promise<any> {
    try {
      if (this.client && isConnected) {
        return await this.client.eval(script, keys.length, ...keys, ...args);
      } else {
        // For memory fallback, we can't execute Lua scripts
        // This is a limitation - complex atomic operations won't work
        throw new Error('Lua scripts not supported in memory fallback mode');
      }
    } catch (error) {
      console.error('Redis EVAL error:', error);
      throw error;
    }
  }

  /**
   * Check if Redis is available
   */
  isAvailable(): boolean {
    return this.client !== null && isConnected;
  }

  /**
   * Get connection status
   */
  getStatus(): { connected: boolean; usingFallback: boolean } {
    return {
      connected: isConnected,
      usingFallback: !this.client || !isConnected
    };
  }
}

// Export singleton instance
export const redisService = new RedisService();

// Initialize Redis on module load
if (process.env.NODE_ENV === 'production' || process.env.REDIS_URL) {
  initializeRedis();
}

// Cleanup on process exit (only in Node.js runtime, not Edge)
// Edge Runtime doesn't support process.on, so we check runtime type
if (typeof process !== 'undefined' && 
    process.on && 
    (typeof process.env.NEXT_RUNTIME === 'undefined' || 
     process.env.NEXT_RUNTIME === 'nodejs')) {
  process.on('SIGTERM', () => {
    if (redis) {
      redis.disconnect();
    }
  });

  process.on('SIGINT', () => {
    if (redis) {
      redis.disconnect();
    }
  });
}