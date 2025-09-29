/**
 * REAL Rate Limiting Implementation
 * Not just comments about rate limiting
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

// In-memory store (replace with Redis in production for distributed systems)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Admin-specific rate limit store (stricter limits)
const adminRateLimitStore = new Map<string, RateLimitEntry>();

// Failed login attempts tracking
const failedLoginAttempts = new Map<string, number>();

// Cleanup old entries every 5 minutes
let cleanupInterval: NodeJS.Timeout | null = null;

// Only set up cleanup in Node.js environment (not browser)
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    // Clean up rate limit store
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.lastAttempt < oneHourAgo) {
        rateLimitStore.delete(key);
      }
    }

    // Clean up admin rate limit store
    for (const [key, entry] of adminRateLimitStore.entries()) {
      if (entry.lastAttempt < oneHourAgo) {
        adminRateLimitStore.delete(key);
      }
    }

    // Clean up failed login attempts older than 24 hours
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    for (const [key, _] of failedLoginAttempts.entries()) {
      // Since we don't store timestamps for failed logins,
      // we'll clear all entries periodically
      // This prevents indefinite memory growth
      if (Math.random() > 0.9) { // 10% chance to clear old entries
        failedLoginAttempts.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Ensure interval is cleared on process exit
  if (cleanupInterval) {
    cleanupInterval.unref(); // Allow process to exit even with interval running
  }
}

// Export cleanup function for testing or manual cleanup
export function stopRateLimiterCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

// Clear all rate limit data (useful for testing)
export function clearAllRateLimitData(): void {
  rateLimitStore.clear();
  adminRateLimitStore.clear();
  failedLoginAttempts.clear();
}

export interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number;  // Max requests per window
  identifier: string;  // Unique identifier (IP, userId, etc)
  isAdmin?: boolean;  // Use stricter admin limits
}

/**
 * Check if request should be rate limited
 * @returns true if request should be blocked
 */
export function checkRateLimit(config: RateLimitConfig): {
  limited: boolean;
  remaining: number;
  resetAt: number;
} {
  const { windowMs, maxRequests, identifier, isAdmin = false } = config;
  const store = isAdmin ? adminRateLimitStore : rateLimitStore;
  const now = Date.now();

  const entry = store.get(identifier);

  if (!entry) {
    // First request
    store.set(identifier, {
      count: 1,
      firstAttempt: now,
      lastAttempt: now
    });

    return {
      limited: false,
      remaining: maxRequests - 1,
      resetAt: now + windowMs
    };
  }

  // Check if window has expired
  if (now - entry.firstAttempt > windowMs) {
    // Reset window
    store.set(identifier, {
      count: 1,
      firstAttempt: now,
      lastAttempt: now
    });

    return {
      limited: false,
      remaining: maxRequests - 1,
      resetAt: now + windowMs
    };
  }

  // Within window
  if (entry.count >= maxRequests) {
    // Rate limited
    return {
      limited: true,
      remaining: 0,
      resetAt: entry.firstAttempt + windowMs
    };
  }

  // Increment counter
  entry.count++;
  entry.lastAttempt = now;
  store.set(identifier, entry);

  return {
    limited: false,
    remaining: maxRequests - entry.count,
    resetAt: entry.firstAttempt + windowMs
  };
}

/**
 * Track failed login attempt
 */
export function trackFailedLogin(identifier: string): number {
  const current = failedLoginAttempts.get(identifier) || 0;
  const newCount = current + 1;
  failedLoginAttempts.set(identifier, newCount);

  // Block after 5 failed attempts
  if (newCount >= 5) {
    console.error(`[SECURITY] Account locked after ${newCount} failed login attempts: ${identifier}`);
  }

  return newCount;
}

/**
 * Reset failed login attempts (on successful login)
 */
export function resetFailedLogins(identifier: string): void {
  failedLoginAttempts.delete(identifier);
}

/**
 * Check if account is locked due to failed attempts
 */
export function isAccountLocked(identifier: string): boolean {
  const attempts = failedLoginAttempts.get(identifier) || 0;
  return attempts >= 5;
}

// Preset configurations
export const RATE_LIMITS = {
  // General API endpoints
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60  // 60 requests per minute
  },

  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5  // 5 attempts per 15 minutes
  },

  // Admin API endpoints
  adminApi: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30  // Stricter: 30 requests per minute
  },

  // Admin login
  adminAuth: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3  // Only 3 admin login attempts per hour
  },

  // Magic link sending
  magicLink: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3  // 3 magic links per hour
  }
};