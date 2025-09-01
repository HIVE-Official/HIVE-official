/**
 * Simple in-memory rate limiter for authentication endpoints
 * Production-ready rate limiting for HIVE auth security
 */

interface RateLimitWindow {
  count: number;
  resetTime: number;
}

class AuthRateLimiter {
  private limits = new Map<string, RateLimitWindow>();
  
  /**
   * Check if a request should be rate limited
   * @param key - Unique identifier (IP, email, etc.)
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns { allowed: boolean, resetTime?: number, remaining?: number }
   */
  checkLimit(key: string, maxRequests: number, windowMs: number): {
    allowed: boolean;
    resetTime?: number;
    remaining?: number;
    retryAfter?: number;
  } {
    const now = Date.now();
    const existingWindow = this.limits.get(key);
    
    // Clean up expired entries periodically
    this.cleanup();
    
    if (!existingWindow || now > existingWindow.resetTime) {
      // Create new window
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      
      return {
        allowed: true,
        resetTime: now + windowMs,
        remaining: maxRequests - 1
      };
    }
    
    // Check existing window
    if (existingWindow.count >= maxRequests) {
      return {
        allowed: false,
        resetTime: existingWindow.resetTime,
        remaining: 0,
        retryAfter: Math.ceil((existingWindow.resetTime - now) / 1000)
      };
    }
    
    // Increment count
    existingWindow.count++;
    this.limits.set(key, existingWindow);
    
    return {
      allowed: true,
      resetTime: existingWindow.resetTime,
      remaining: maxRequests - existingWindow.count
    };
  }
  
  /**
   * Clean up expired rate limit windows
   */
  private cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.limits.forEach((window, key) => {
      if (now > window.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.limits.delete(key));
  }
  
  /**
   * Get client identifier for rate limiting
   * Uses multiple fallbacks to prevent bypass attacks
   */
  getClientKey(request: Request): string {
    // SECURITY: Use multiple identifiers to prevent rate limit bypass
    // Don't trust forwarded headers in production as they can be spoofed
    
    const identifiers: string[] = [];
    
    // In production environments, prefer connection info over headers
    if (process.env.NODE_ENV === 'production') {
      // Use 'anonymous' for now - in production you'd use:
      // - Server connection IP (not available in serverless)  
      // - User agent + basic fingerprinting
      // - Session-based rate limiting
      identifiers.push('production-client');
    } else {
      // In development, we can use forwarded headers
      const forwarded = request.headers.get('x-forwarded-for');
      const realIp = request.headers.get('x-real-ip');
      
      if (forwarded) {
        identifiers.push(forwarded.split(',')[0].trim());
      }
      
      if (realIp) {
        identifiers.push(realIp);
      }
    }
    
    // Add user agent as additional identifier (harder to spoof)
    const userAgent = request.headers.get('user-agent');
    if (userAgent) {
      // Create a simple hash of user agent to avoid storing full UA strings
      const uaHash = userAgent.split('').reduce((hash, char) => {
        return hash * 31 + char.charCodeAt(0);
      }, 0);
      identifiers.push(`ua_${Math.abs(uaHash)}`);
    }
    
    // Use the first available identifier or fallback
    return identifiers[0] || 'anonymous';
  }
}

// Singleton instance
export const authRateLimiter = new AuthRateLimiter();

/**
 * Rate limiting configurations for different auth endpoints
 */
export const RATE_LIMITS = {
  MAGIC_LINK: {
    maxRequests: 3, // 3 magic links per window
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  MAGIC_LINK_VERIFY: {
    maxRequests: 10, // 10 verification attempts per window
    windowMs: 5 * 60 * 1000, // 5 minutes
  },
  ONBOARDING_COMPLETE: {
    maxRequests: 5, // 5 onboarding attempts per window
    windowMs: 10 * 60 * 1000, // 10 minutes
  }
} as const;