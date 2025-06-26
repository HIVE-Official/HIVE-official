import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limit store
// In production, this should be replaced with Redis
const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (identifier: string) => string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

/**
 * Check if a request is within rate limits
 * @param identifier - Unique identifier (usually user ID or IP)
 * @param config - Rate limit configuration
 * @returns RateLimitResult
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = config.keyGenerator
    ? config.keyGenerator(identifier)
    : identifier;

  const entry = rateLimitStore.get(key);

  // No existing entry or expired entry
  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, newEntry);

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime: newEntry.resetTime,
    };
  }

  // Existing entry within window
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Predefined rate limit configurations
 */
export const RateLimits = {
  // API requests - 100 per minute
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },

  // Post creation - 10 per 5 minutes
  POST_CREATION: {
    maxRequests: 10,
    windowMs: 5 * 60 * 1000, // 5 minutes
  },

  // Auth requests - 5 per minute
  AUTH: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
  },

  // Search requests - 50 per minute
  SEARCH: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;

/**
 * Express-style middleware for rate limiting
 */
export function rateLimitMiddleware(config: RateLimitConfig) {
  return (identifier: string): RateLimitResult => {
    return checkRateLimit(identifier, config);
  };
}

/**
 * Rate limit for user-specific actions
 */
export const userRateLimit = rateLimitMiddleware(RateLimits.API);

/**
 * Rate limit for post creation
 */
export const postCreationRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

/**
 * Rate limit for authentication attempts
 */
export const authRateLimit = rateLimitMiddleware(RateLimits.AUTH);

/**
 * Rate limit for search requests
 */
export const searchRateLimit = rateLimitMiddleware(RateLimits.SEARCH);

/**
 * Factory function to create custom rate limiters
 * This matches the usage pattern in the route files
 */
export function rateLimit(config: { windowMs: number; max: number }) {
  const rateLimitConfig: RateLimitConfig = {
    maxRequests: config.max,
    windowMs: config.windowMs,
  };

  return {
    check: async (identifier?: string): Promise<void> => {
      const result = checkRateLimit(identifier || "default", rateLimitConfig);
      if (!result.success) {
        throw new Error("Rate limit exceeded");
      }
    },
  };
}
