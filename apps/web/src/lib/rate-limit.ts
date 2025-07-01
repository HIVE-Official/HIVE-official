// Simple in-memory rate limiting for development
// In production, use Redis or a proper rate limiting service

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  uniqueTokenPerInterval: number;
  interval: number;
}

interface RateLimitStore {
  tokens: Map<string, number>;
  lastReset: number;
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.limits.get(identifier);

    // Clean up expired entries periodically
    if (Math.random() < 0.1) {
      this.cleanup();
    }

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      const newEntry = {
        count: 1,
        resetTime: now + this.windowMs
      };
      this.limits.set(identifier, newEntry);
      
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        resetTime: newEntry.resetTime
      };
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTime: entry.resetTime
      };
    }

    // Increment count
    entry.count++;
    this.limits.set(identifier, entry);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Rate limiters for different endpoints
export const postCreationRateLimit = new RateLimiter(10, 60 * 1000); // 10 posts per minute
export const handleCheckRateLimit = new RateLimiter(20, 60 * 1000);  // 20 handle checks per minute
export const authRateLimit = new RateLimiter(5, 60 * 1000);          // 5 auth attempts per minute
export const generalApiRateLimit = new RateLimiter(100, 60 * 1000);  // 100 API calls per minute

export function rateLimit(config: RateLimitConfig) {
  const store: RateLimitStore = {
    tokens: new Map(),
    lastReset: Date.now(),
  };

  return {
    check: async (key: string, limit: number): Promise<void> => {
      const now = Date.now();
      
      // Reset if interval has passed
      if (now - store.lastReset >= config.interval) {
        store.tokens.clear();
        store.lastReset = now;
      }

      // Get current count for this key
      const currentCount = store.tokens.get(key) || 0;

      if (currentCount >= limit) {
        throw new Error('Rate limit exceeded');
      }

      // Increment count
      store.tokens.set(key, currentCount + 1);

      // Clean up old tokens periodically
      if (store.tokens.size > config.uniqueTokenPerInterval) {
        const oldestKey = store.tokens.keys().next().value;
        store.tokens.delete(oldestKey);
      }
    }
  };
} 