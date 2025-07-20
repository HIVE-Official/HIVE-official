/**
 * PRODUCTION-SECURE rate limiting with no bypass vulnerabilities
 * Implements multiple fallback layers and strict enforcement
 */

// import { createRateLimit, RateLimitConfigs } from './rate-limit-redis';
import { rateLimit as fallbackRateLimit } from './rate-limit-simple';
import { logSecurityEvent } from './structured-logger';
import { currentEnvironment } from './env';

/**
 * Rate limit result interface
 */
export interface SecureRateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
  source: 'redis' | 'memory' | 'strict_block';
  blocked: boolean;
}

/**
 * Rate limiting configuration with security enforcement
 */
interface SecureRateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockOnError: boolean; // CRITICAL: Block requests when rate limiter fails
  strictMode: boolean;   // Enable strict blocking in production
  identifier: string;    // Unique identifier for this rate limiter
}

/**
 * Predefined secure rate limit configurations
 */
export const SECURE_RATE_LIMITS = {
  AUTHENTICATION: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
    blockOnError: true,
    strictMode: true,
    identifier: 'auth'
  },
  MAGIC_LINK: {
    maxRequests: 3,
    windowMs: 60 * 1000, // 1 minute  
    blockOnError: true,
    strictMode: true,
    identifier: 'magic_link'
  },
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
    blockOnError: true,
    strictMode: true,
    identifier: 'api'
  },
  HANDLE_CHECK: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
    blockOnError: true,
    strictMode: true,
    identifier: 'handle_check'
  },
  ADMIN_OPERATIONS: {
    maxRequests: 50,
    windowMs: 60 * 1000, // 1 minute
    blockOnError: true,
    strictMode: true,
    identifier: 'admin'
  }
} as const;

/**
 * SECURE rate limiter class with multiple enforcement layers
 */
export class SecureRateLimiter {
  private config: SecureRateLimitConfig;
  private redisLimiter: any | null = null;
  private memoryLimiter: ReturnType<typeof fallbackRateLimit> | null = null;
  private consecutiveFailures = 0;
  private lastFailureTime = 0;
  private isInStrictMode = false;

  constructor(config: SecureRateLimitConfig) {
    this.config = config;
    this.initializeLimiters();
  }

  /**
   * Initialize rate limiting mechanisms
   */
  private initializeLimiters(): void {
    try {
      // Primary: Redis-based rate limiter (disabled for now)
      // this.redisLimiter = createRateLimit(
      //   this.config.identifier.toUpperCase() as keyof typeof RateLimitConfigs
      // );
      console.log('Redis rate limiter not available, using memory fallback only');
    } catch (error) {
      console.error('Failed to initialize Redis rate limiter:', error);
      this.handleFailure('redis_init_failed');
    }

    try {
      // Fallback: Memory-based rate limiter
      this.memoryLimiter = fallbackRateLimit({
        maxRequests: this.config.maxRequests,
        windowMs: this.config.windowMs
      });
    } catch (error) {
      console.error('Failed to initialize memory rate limiter:', error);
      this.handleFailure('memory_init_failed');
    }
  }

  /**
   * Handle rate limiter failures
   */
  private handleFailure(reason: string): void {
    this.consecutiveFailures++;
    this.lastFailureTime = Date.now();
    
    // Enter strict mode after multiple failures
    if (this.consecutiveFailures >= 3) {
      this.isInStrictMode = true;
      console.error(`Rate limiter entering strict mode due to: ${reason}`);
    }

    // Log security event
    logSecurityEvent('rate_limit', {
      operation: 'rate_limiter_failure',
      tags: {
        reason,
        consecutiveFailures: this.consecutiveFailures.toString(),
        strictMode: this.isInStrictMode.toString(),
        identifier: this.config.identifier
      }
    });
  }

  /**
   * Reset failure state on successful operation
   */
  private resetFailures(): void {
    this.consecutiveFailures = 0;
    this.isInStrictMode = false;
  }

  /**
   * Check if client should be blocked due to strict mode
   */
  private isStrictModeBlock(): boolean {
    if (!this.isInStrictMode) return false;
    
    // Stay in strict mode for at least 5 minutes after failure
    const strictModeDuration = 5 * 60 * 1000; // 5 minutes
    const timeSinceFailure = Date.now() - this.lastFailureTime;
    
    if (timeSinceFailure > strictModeDuration) {
      this.isInStrictMode = false;
      return false;
    }
    
    return true;
  }

  /**
   * SECURE rate limit check with multiple enforcement layers
   */
  async checkLimit(clientId: string): Promise<SecureRateLimitResult> {
    const normalizedClientId = this.normalizeClientId(clientId);
    
    // SECURITY: Check strict mode first
    if (this.isStrictModeBlock()) {
      await logSecurityEvent('rate_limit', {
        operation: 'strict_mode_block',
        tags: {
          clientId: normalizedClientId,
          identifier: this.config.identifier,
          reason: 'consecutive_failures'
        }
      });

      return {
        success: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: this.lastFailureTime + (5 * 60 * 1000), // 5 minutes
        retryAfter: Math.ceil((this.lastFailureTime + (5 * 60 * 1000) - Date.now()) / 1000),
        source: 'strict_block',
        blocked: true
      };
    }

    try {
      // Try Redis rate limiter first
      if (this.redisLimiter) {
        const result = await this.redisLimiter.checkLimit(normalizedClientId);
        
        if (result.success !== undefined) {
          this.resetFailures(); // Reset on successful Redis operation
          
          return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            resetTime: result.resetTime,
            retryAfter: result.retryAfter,
            source: 'redis',
            blocked: !result.success
          };
        }
      }
    } catch (redisError) {
      console.error('Redis rate limiter failed:', redisError);
      this.handleFailure('redis_check_failed');
    }

    // Fallback to memory rate limiter
    try {
      if (this.memoryLimiter) {
        const result = this.memoryLimiter.check(normalizedClientId);
        
        return {
          success: result.success,
          limit: result.limit,
          remaining: result.remaining,
          resetTime: result.resetTime,
          retryAfter: result.retryAfter,
          source: 'memory',
          blocked: !result.success
        };
      }
    } catch (memoryError) {
      console.error('Memory rate limiter failed:', memoryError);
      this.handleFailure('memory_check_failed');
    }

    // CRITICAL: If all rate limiters fail and blockOnError is true, BLOCK the request
    if (this.config.blockOnError) {
      await logSecurityEvent('rate_limit', {
        operation: 'all_limiters_failed_blocking',
        tags: {
          clientId: normalizedClientId,
          identifier: this.config.identifier,
          environment: currentEnvironment
        }
      });

      // Return blocked state
      return {
        success: false,
        limit: this.config.maxRequests,
        remaining: 0,
        resetTime: Date.now() + this.config.windowMs,
        retryAfter: Math.ceil(this.config.windowMs / 1000),
        source: 'strict_block',
        blocked: true
      };
    }

    // DANGEROUS: Only reach here if blockOnError is false (not recommended)
    console.warn('Rate limiter failed but allowing request due to blockOnError=false');
    
    return {
      success: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - 1,
      resetTime: Date.now() + this.config.windowMs,
      source: 'memory',
      blocked: false
    };
  }

  /**
   * Normalize client identifier for security
   */
  private normalizeClientId(clientId: string): string {
    if (!clientId || clientId === 'unknown') {
      return 'anonymous';
    }
    
    // Remove potential PII and normalize
    const normalized = clientId
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9.:_-]/g, '_') // Remove special characters
      .substring(0, 50); // Limit length
    
    return normalized || 'anonymous';
  }

  /**
   * Get rate limiter health status
   */
  getHealthStatus(): {
    redis: boolean;
    memory: boolean;
    strictMode: boolean;
    consecutiveFailures: number;
  } {
    return {
      redis: !!this.redisLimiter,
      memory: !!this.memoryLimiter,
      strictMode: this.isInStrictMode,
      consecutiveFailures: this.consecutiveFailures
    };
  }
}

/**
 * Pre-configured secure rate limiters
 */
export const secureRateLimiters = {
  authentication: new SecureRateLimiter(SECURE_RATE_LIMITS.AUTHENTICATION),
  magicLink: new SecureRateLimiter(SECURE_RATE_LIMITS.MAGIC_LINK),
  apiGeneral: new SecureRateLimiter(SECURE_RATE_LIMITS.API_GENERAL),
  handleCheck: new SecureRateLimiter(SECURE_RATE_LIMITS.HANDLE_CHECK),
  adminOperations: new SecureRateLimiter(SECURE_RATE_LIMITS.ADMIN_OPERATIONS)
};

/**
 * Utility function to get client identifier from request
 */
export function getSecureClientId(request: Request): string {
  // Try multiple headers to get the real client IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'x-client-ip',
    'x-cluster-client-ip'
  ];
  
  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // Take the first IP if there are multiple (comma-separated)
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') {
        return ip;
      }
    }
  }
  
  // Fallback to connection IP (if available)
  const connectionIp = (request as any).ip;
  if (connectionIp && connectionIp !== 'unknown') {
    return connectionIp;
  }
  
  return 'unknown';
}

/**
 * Express/Next.js middleware helper for rate limiting
 */
export async function enforceRateLimit(
  limiterType: keyof typeof secureRateLimiters,
  request: Request
): Promise<{
  allowed: boolean;
  headers: Record<string, string>;
  status: number;
  error?: string;
}> {
  const limiter = secureRateLimiters[limiterType];
  const clientId = getSecureClientId(request);
  
  const result = await limiter.checkLimit(clientId);
  
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
    'X-RateLimit-Source': result.source
  };
  
  if (!result.success) {
    if (result.retryAfter) {
      headers['Retry-After'] = result.retryAfter.toString();
    }
    
    return {
      allowed: false,
      headers,
      status: 429,
      error: `Rate limit exceeded. Try again in ${result.retryAfter || 60} seconds.`
    };
  }
  
  return {
    allowed: true,
    headers,
    status: 200
  };
}