interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending?: Promise<void>;
}

// In-memory rate limit store
// In production, this should be replaced with Redis
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Simple rate limiter implementation
 */
class SimpleRateLimit {
  private maxRequests: number;
  private windowMs: number;
  private prefix: string;

  constructor(maxRequests: number, windowMs: number, prefix: string = '') {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.prefix = prefix;
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const key = `${this.prefix}:${identifier}`;

    const entry = rateLimitStore.get(key);

    // No existing entry or expired entry
    if (!entry || now > entry.resetTime) {
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      rateLimitStore.set(key, newEntry);

      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: newEntry.resetTime,
      };
    }

    // Existing entry within window
    if (entry.count >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: entry.resetTime,
      };
    }

    // Increment count
    entry.count += 1;
    rateLimitStore.set(key, entry);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  }
}

/**
 * Rate limit for post creation
 * Allows 5 posts per hour per user
 */
export const postCreationRateLimit = new SimpleRateLimit(
  5, // max requests
  60 * 60 * 1000, // 1 hour in milliseconds
  "hive:post-creation"
);

/**
 * Rate limit for authentication attempts
 * Allows 5 attempts per minute per IP
 */
export const authRateLimit = new SimpleRateLimit(
  5, // max requests
  60 * 1000, // 1 minute in milliseconds
  "hive:auth"
);

/**
 * Rate limit for API requests
 * Allows 100 requests per minute per user
 */
export const apiRateLimit = new SimpleRateLimit(
  100, // max requests
  60 * 1000, // 1 minute in milliseconds
  "hive:api"
);

/**
 * Rate limit for search requests
 * Allows 50 requests per minute per user
 */
export const searchRateLimit = new SimpleRateLimit(
  50, // max requests
  60 * 1000, // 1 minute in milliseconds
  "hive:search"
); 