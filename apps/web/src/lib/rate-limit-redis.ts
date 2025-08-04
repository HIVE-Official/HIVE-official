import { redisService } from './redis-client';

/**
 * Production-ready rate limiting with Redis backend
 * Implements sliding window algorithm for accurate rate limiting
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (_identifier: string) => string;
  skipOnError?: boolean; // Whether to allow requests when Redis is down
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Sliding window rate limiter using Redis
 * More accurate than fixed window, prevents bursts at window boundaries
 */
export class SlidingWindowRateLimit {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if request is within rate limits using sliding window
   */
  async checkLimit(identifier: string): Promise<RateLimitResult> {
    const key = this.config.keyGenerator 
      ? this.config.keyGenerator(identifier)
      : `rate_limit:${identifier}`;

    const windowSizeMs = this.config.windowMs;
    const maxRequests = this.config.maxRequests;
    const now = Date.now();
    const windowStart = now - windowSizeMs;

    try {
      // Use Redis for production-grade rate limiting
      if (redisService.isAvailable()) {
        return await this.redisSlidingWindow(key, now, windowStart, maxRequests, windowSizeMs);
      } else {
        // Fallback to simple counter for development/when Redis unavailable
        return await this.fallbackRateLimit(key, maxRequests, windowSizeMs);
      }
    } catch (error) {
      console.error('Rate limiting error:', error);
      
      // If skipOnError is true, allow the request
      if (this.config.skipOnError) {
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          resetTime: now + windowSizeMs
        };
      }
      
      // Otherwise, deny the request to be safe
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetTime: now + windowSizeMs,
        retryAfter: Math.ceil(windowSizeMs / 1000)
      };
    }
  }

  /**
   * Redis-based sliding window implementation
   */
  private async redisSlidingWindow(
    key: string,
    now: number,
    windowStart: number,
    maxRequests: number,
    windowSizeMs: number
  ): Promise<RateLimitResult> {
    // Lua script for atomic sliding window operation
    const luaScript = `
      local key = KEYS[1]
      local now = tonumber(ARGV[1])
      local window_start = tonumber(ARGV[2])
      local max_requests = tonumber(ARGV[3])
      local window_size_ms = tonumber(ARGV[4])
      local ttl_seconds = tonumber(ARGV[5])
      
      -- Remove expired entries
      redis.call('zremrangebyscore', key, 0, window_start)
      
      -- Count current requests in window
      local current_requests = redis.call('zcard', key)
      
      -- Check if limit exceeded
      if current_requests >= max_requests then
        -- Get the oldest request time to calculate reset time
        local oldest = redis.call('zrange', key, 0, 0, 'WITHSCORES')
        local reset_time = now + window_size_ms
        if #oldest > 0 then
          reset_time = oldest[2] + window_size_ms
        end
        
        return {0, max_requests, 0, reset_time}
      end
      
      -- Add current request
      redis.call('zadd', key, now, now .. ':' .. math.random(1000000))
      
      -- Set expiration
      redis.call('expire', key, ttl_seconds)
      
      -- Calculate remaining requests
      local remaining = max_requests - current_requests - 1
      local reset_time = now + window_size_ms
      
      return {1, max_requests, remaining, reset_time}
    `;

    const ttlSeconds = Math.ceil(windowSizeMs / 1000) + 10; // Add buffer
    
    const result = await redisService.eval(luaScript, [key], [
      now.toString(),
      windowStart.toString(),
      maxRequests.toString(),
      windowSizeMs.toString(),
      ttlSeconds.toString()
    ]);

    const [success, limit, remaining, resetTime] = result;

    return {
      success: success === 1,
      limit,
      remaining,
      resetTime,
      retryAfter: success === 0 ? Math.ceil((resetTime - now) / 1000) : undefined
    };
  }

  /**
   * Fallback rate limiting when Redis is unavailable
   */
  private async fallbackRateLimit(
    key: string,
    maxRequests: number,
    windowSizeMs: number
  ): Promise<RateLimitResult> {
    const ttlSeconds = Math.ceil(windowSizeMs / 1000);
    const now = Date.now();
    
    // Get current count
    const currentCountStr = await redisService.get(key);
    const currentCount = currentCountStr ? parseInt(currentCountStr) : 0;
    
    if (currentCount >= maxRequests) {
      const ttlRemaining = await redisService.ttl(key);
      const resetTime = ttlRemaining > 0 ? now + (ttlRemaining * 1000) : now + windowSizeMs;
      
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetTime,
        retryAfter: Math.ceil((resetTime - now) / 1000)
      };
    }
    
    // Increment counter
    const newCount = await redisService.incr(key, ttlSeconds);
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - newCount,
      resetTime: now + windowSizeMs
    };
  }
}

/**
 * Fixed window rate limiter (simpler, less accurate)
 */
export class FixedWindowRateLimit {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(identifier: string): Promise<RateLimitResult> {
    const key = this.config.keyGenerator 
      ? this.config.keyGenerator(identifier)
      : `rate_limit:${identifier}`;

    const windowSizeMs = this.config.windowMs;
    const maxRequests = this.config.maxRequests;
    const now = Date.now();
    
    // Create window-based key
    const windowKey = `${key}:${Math.floor(now / windowSizeMs)}`;
    const ttlSeconds = Math.ceil(windowSizeMs / 1000);

    try {
      const currentCount = await redisService.incr(windowKey, ttlSeconds);
      
      if (currentCount > maxRequests) {
        const resetTime = Math.ceil(now / windowSizeMs) * windowSizeMs + windowSizeMs;
        
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          resetTime,
          retryAfter: Math.ceil((resetTime - now) / 1000)
        };
      }
      
      const resetTime = Math.ceil(now / windowSizeMs) * windowSizeMs + windowSizeMs;
      
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - currentCount,
        resetTime
      };
    } catch (error) {
      console.error('Fixed window rate limiting error:', error);
      
      if (this.config.skipOnError) {
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          resetTime: now + windowSizeMs
        };
      }
      
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetTime: now + windowSizeMs,
        retryAfter: Math.ceil(windowSizeMs / 1000)
      };
    }
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const RateLimitConfigs = {
  // Authentication endpoints - strict limits
  AUTH: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: false // Never skip auth rate limits
  },

  // Magic link requests - very strict
  MAGIC_LINK: {
    maxRequests: 3,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: false
  },

  // Handle checking - moderate limits
  HANDLE_CHECK: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: true // Allow checking when Redis down
  },

  // General API requests
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: true
  },

  // Post creation
  POST_CREATION: {
    maxRequests: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
    skipOnError: false
  },

  // Search requests
  SEARCH: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: true
  },

  // Admin operations - higher limits
  ADMIN: {
    maxRequests: 200,
    windowMs: 60 * 1000, // 1 minute
    skipOnError: false
  }
} as const;

/**
 * Create rate limiter instances
 */
export function createRateLimit(configName: keyof typeof RateLimitConfigs): SlidingWindowRateLimit {
  const config = RateLimitConfigs[configName];
  return new SlidingWindowRateLimit(config);
}

/**
 * Legacy compatibility function for existing code
 */
export function rateLimit(config: { windowMs: number; max: number }): { check: (_identifier?: string) => Promise<void> } {
  const rateLimiter = new SlidingWindowRateLimit({
    maxRequests: config.max,
    windowMs: config.windowMs,
    skipOnError: true
  });

  return {
    check: async (identifier?: string): Promise<void> => {
      const result = await rateLimiter.checkLimit(identifier || 'default');
      if (!result.success) {
        throw new Error('Rate limit exceeded');
      }
    }
  };
}

// Pre-configured rate limiters for common use cases
export const authRateLimit = createRateLimit('AUTH');
export const magicLinkRateLimit = createRateLimit('MAGIC_LINK');
export const handleCheckRateLimit = createRateLimit('HANDLE_CHECK');
export const apiRateLimit = createRateLimit('API');
export const postCreationRateLimit = createRateLimit('POST_CREATION');
export const searchRateLimit = createRateLimit('SEARCH');
export const adminRateLimit = createRateLimit('ADMIN');