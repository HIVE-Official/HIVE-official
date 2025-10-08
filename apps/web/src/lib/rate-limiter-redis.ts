/**
 * Production Redis-based Rate Limiter
 * Distributed rate limiting that works across multiple servers
 */

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { logger } from './logger';

// Initialize Redis client (Upstash or Redis Cloud)
const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Only initialize Redis if we have credentials
let redis: Redis | null = null;
let rateLimiter: Map<string, Ratelimit> | null = null;

if (redisUrl && redisToken) {
  try {
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    // Initialize rate limiters for different endpoints
    rateLimiter = new Map([
      // General API rate limit: 60 requests per minute
      ['api', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, '1 m'),
        analytics: true,
        prefix: 'hive:ratelimit:api',
      })],

      // Auth rate limit: 5 attempts per 15 minutes
      ['auth', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '15 m'),
        analytics: true,
        prefix: 'hive:ratelimit:auth',
      })],

      // Magic link rate limit: 3 per hour
      ['magicLink', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'hive:ratelimit:magic',
      })],

      // Admin API: 30 requests per minute
      ['adminApi', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '1 m'),
        analytics: true,
        prefix: 'hive:ratelimit:admin:api',
      })],

      // Admin auth: 3 attempts per hour
      ['adminAuth', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'hive:ratelimit:admin:auth',
      })],

      // Space creation: 5 per day
      ['spaceCreate', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '24 h'),
        analytics: true,
        prefix: 'hive:ratelimit:space:create',
      })],

      // Post creation: 100 per hour
      ['postCreate', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 h'),
        analytics: true,
        prefix: 'hive:ratelimit:post:create',
      })],

      // File upload: 20 per hour
      ['fileUpload', new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '1 h'),
        analytics: true,
        prefix: 'hive:ratelimit:file:upload',
      })],
    ]);

    logger.info('Redis rate limiter initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Redis rate limiter', { error: error instanceof Error ? error.message : String(error) });
    // Fall back to in-memory rate limiting
  }
} else {
  logger.warn('Redis credentials not found, using in-memory rate limiting');
}

/**
 * Rate limit check with Redis
 */
export async function checkRedisRateLimit(
  limitType: string,
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> {
  // If Redis is not available, fall back to allowing the request
  // (handle rate limiting at application level)
  if (!rateLimiter) {
    return {
      success: true,
      limit: 1000,
      remaining: 999,
      reset: Date.now() + 60000,
    };
  }

  const limiter = rateLimiter.get(limitType);
  if (!limiter) {
    logger.warn(`Unknown rate limit type: ${limitType}`);
    return {
      success: true,
      limit: 1000,
      remaining: 999,
      reset: Date.now() + 60000,
    };
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier);

    // Log rate limit violations
    if (!success) {
      logger.warn('Rate limit exceeded', {
        limitType,
        identifier,
        limit,
        remaining,
      });
    }

    return {
      success,
      limit,
      remaining,
      reset,
      retryAfter: success ? undefined : Math.ceil((reset - Date.now()) / 1000),
    };
  } catch (error) {
    logger.error('Redis rate limit check failed', { error: error instanceof Error ? error.message : String(error), limitType, identifier });

    // On error, allow the request but log it
    return {
      success: true,
      limit: 1000,
      remaining: 999,
      reset: Date.now() + 60000,
    };
  }
}

/**
 * Track failed login attempt in Redis
 */
export async function trackFailedLoginRedis(
  identifier: string
): Promise<number> {
  if (!redis) {
    return 0;
  }

  try {
    const key = `hive:failed:login:${identifier}`;
    const count = await redis.incr(key);

    // Set expiration to 24 hours if this is the first attempt
    if (count === 1) {
      await redis.expire(key, 86400); // 24 hours
    }

    // Lock account after 5 failed attempts
    if (count >= 5) {
      await redis.set(`hive:locked:account:${identifier}`, 'locked', {
        ex: 3600, // Lock for 1 hour
      });

      logger.error('Account locked due to failed login attempts', {
        identifier,
        attempts: count,
      });
    }

    return count;
  } catch (error) {
    logger.error('Failed to track login attempt', { error: error instanceof Error ? error.message : String(error), identifier });
    return 0;
  }
}

/**
 * Reset failed login attempts in Redis
 */
export async function resetFailedLoginsRedis(identifier: string): Promise<void> {
  if (!redis) {
    return;
  }

  try {
    await redis.del(`hive:failed:login:${identifier}`);
    await redis.del(`hive:locked:account:${identifier}`);
  } catch (error) {
    logger.error('Failed to reset login attempts', { error: error instanceof Error ? error.message : String(error), identifier });
  }
}

/**
 * Check if account is locked in Redis
 */
export async function isAccountLockedRedis(identifier: string): Promise<boolean> {
  if (!redis) {
    return false;
  }

  try {
    const locked = await redis.get(`hive:locked:account:${identifier}`);
    return locked === 'locked';
  } catch (error) {
    logger.error('Failed to check account lock status', { error: error instanceof Error ? error.message : String(error), identifier });
    return false;
  }
}

/**
 * IP-based rate limiting for DDoS protection
 */
export async function checkIpRateLimit(
  ip: string,
  endpoint: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> {
  const identifier = `${ip}:${endpoint}`;
  return checkRedisRateLimit('api', identifier);
}

/**
 * User-based rate limiting for authenticated requests
 */
export async function checkUserRateLimit(
  userId: string,
  action: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}> {
  const identifier = `user:${userId}:${action}`;
  const limitType = getLimitTypeForAction(action);
  return checkRedisRateLimit(limitType, identifier);
}

/**
 * Get appropriate limit type for action
 */
function getLimitTypeForAction(action: string): string {
  const actionMap: Record<string, string> = {
    'create-space': 'spaceCreate',
    'create-post': 'postCreate',
    'upload-file': 'fileUpload',
    'send-magic-link': 'magicLink',
    'admin-action': 'adminApi',
  };

  return actionMap[action] || 'api';
}

/**
 * Campus-specific rate limiting
 */
export async function checkCampusRateLimit(
  campusId: string,
  action: string,
  limit: number = 1000,
  window: string = '1h'
): Promise<boolean> {
  if (!redis) {
    return true;
  }

  try {
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, window as any),
      analytics: true,
      prefix: `hive:campus:${campusId}:${action}`,
    });

    const { success } = await limiter.limit(campusId);

    if (!success) {
      logger.warn('Campus rate limit exceeded', {
        campusId,
        action,
        limit,
        window,
      });
    }

    return success;
  } catch (error) {
    logger.error('Campus rate limit check failed', { error: error instanceof Error ? error.message : String(error), campusId, action });
    return true; // Allow on error
  }
}

/**
 * Get rate limit headers for HTTP response
 */
export function getRateLimitHeaders(result: {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset),
  };

  if (result.retryAfter) {
    headers['Retry-After'] = String(result.retryAfter);
  }

  return headers;
}

// Export types
export type RateLimitResult = Awaited<ReturnType<typeof checkRedisRateLimit>>;
export type RateLimitType =
  | 'api'
  | 'auth'
  | 'magicLink'
  | 'adminApi'
  | 'adminAuth'
  | 'spaceCreate'
  | 'postCreate'
  | 'fileUpload';
