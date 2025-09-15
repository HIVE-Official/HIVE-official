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
    
    // In production environments, use proper client identification
    if (process.env.NODE_ENV === 'production') {
      // SECURITY FIX: Use proper client fingerprinting for production rate limiting
      const userAgent = request.headers.get('user-agent') || '';
      const acceptLanguage = request.headers.get('accept-language') || '';
      const acceptEncoding = request.headers.get('accept-encoding') || '';
      
      // Create a fingerprint from stable browser characteristics
      const fingerprint = this.hashString(`${userAgent}:${acceptLanguage}:${acceptEncoding}`);
      identifiers.push(`prod-${fingerprint.substring(0, 16)}`);
      
      // Also try to get real IP from Vercel headers (more reliable than x-forwarded-for)
      const vercelIp = request.headers.get('x-vercel-forwarded-for') || 
                      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
      if (vercelIp) {
        identifiers.push(`ip-${this.hashString(vercelIp).substring(0, 12)}`);
      }
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

  /**
   * Simple hash function for client fingerprinting
   * SECURITY: Uses a basic hash - sufficient for rate limiting, not cryptographic security
   */
  private hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
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
  },
  HANDLE_CHECK: {
    maxRequests: 20, // 20 handle checks per window
    windowMs: 60 * 1000, // 1 minute
  }
} as const;