/**
 * SECURE in-memory rate limiting with no bypass vulnerabilities
 * NO SILENT FAILURES - PRODUCTION SAFE FALLBACK
 */

import { logSecurityEvent } from '../../utils/structured-logger';
import { logger } from '@/lib/logger';

import { currentEnvironment } from '../../env';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  identifier?: string;
  blockOnError?: boolean;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

interface ClientRecord {
  requests: number[];
  windowStart: number;
  violations: number;
  lastViolation: number;
}

// In-memory store for rate limiting
const clients = new Map<string, ClientRecord>();
const rateLimiterHealth = new Map<string, { failures: number; lastFailure: number }>();

/**
 * SECURE rate limiter - NO BYPASSES ALLOWED
 */
export function rateLimit(config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }) {
  const { maxRequests, windowMs, identifier = 'default', blockOnError = true } = config;

  return {
    check: (clientId: string): RateLimitResult => {
      try {
        const normalizedClientId = normalizeClientId(clientId);
        const now = Date.now();
        const windowStart = Math.floor(now / windowMs) * windowMs;
        const resetTime = windowStart + windowMs;

        // SECURITY: Check for abuse patterns
        if (isAbusiveClient(normalizedClientId)) {
          return createBlockedResult(maxRequests, resetTime, 'abusive_pattern');
        }

        // Get or create client record
        let client = clients.get(normalizedClientId);
        
        if (!client || client.windowStart !== windowStart) {
          // New window, reset the client but preserve violation history
          const previousViolations = client?.violations || 0;
          const lastViolation = client?.lastViolation || 0;
          
          client = {
            requests: [],
            windowStart: windowStart,
            violations: previousViolations,
            lastViolation: lastViolation
          };
          clients.set(normalizedClientId, client);
        }

        // Clean up old requests (outside current window)
        client.requests = client.requests.filter(requestTime => requestTime >= windowStart);

        // SECURITY: Enhanced violation tracking
        if (client.requests.length >= maxRequests) {
          client.violations++;
          client.lastViolation = now;
          
          // Log security event for rate limit violations
          logSecurityEvent('rate_limit', {
            operation: 'memory_rate_limit_exceeded',
            tags: {
              clientId: normalizedClientId,
              identifier: identifier,
              violations: client.violations.toString(),
              environment: currentEnvironment
            }
          });

          const retryAfter = Math.ceil((resetTime - now) / 1000);
          return {
            success: false,
            limit: maxRequests,
            remaining: 0,
            resetTime,
            retryAfter
          };
        }

        // Record this request
        client.requests.push(now);

        // Reset rate limiter health on successful operation
        resetHealthStatus(identifier);

        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - client.requests.length,
          resetTime
        };

      } catch (error) {
        // CRITICAL: Handle rate limiter failures securely
        const healthStatus = rateLimiterHealth.get(identifier) || { failures: 0, lastFailure: 0 };
        healthStatus.failures++;
        healthStatus.lastFailure = Date.now();
        rateLimiterHealth.set(identifier, healthStatus);

        logger.error('Memory rate limiter failure for ${identifier}:', { error: String(error) });

        // Log security event
        logSecurityEvent('rate_limit', {
          operation: 'memory_rate_limiter_failure',
          tags: {
            identifier: identifier,
            failures: healthStatus.failures.toString(),
            error: error instanceof Error ? error.message : 'unknown'
          }
        });

        // SECURITY: Block on error to prevent bypass
        if (blockOnError) {
          return createBlockedResult(maxRequests, Date.now() + windowMs, 'rate_limiter_error');
        }

        // If not blocking on error, return very conservative limits
        return {
          success: false,
          limit: 1, // Very restrictive when rate limiter fails
          remaining: 0,
          resetTime: Date.now() + windowMs,
          retryAfter: Math.ceil(windowMs / 1000)
        };
      }
    },

    /**
     * Get health status of this rate limiter
     */
    getHealthStatus: () => {
      const health = rateLimiterHealth.get(identifier) || { failures: 0, lastFailure: 0 };
      return {
        identifier,
        failures: health.failures,
        lastFailure: health.lastFailure,
        healthy: health.failures < 5,
        clientCount: clients.size
      };
    }
  };
}

/**
 * Normalize client ID for security
 */
function normalizeClientId(clientId: string): string {
  if (!clientId || clientId === 'unknown' || clientId === 'null' || clientId === 'undefined') {
    return 'anonymous';
  }
  
  // Sanitize and normalize
  return clientId
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.:_-]/g, '_')
    .substring(0, 50) || 'anonymous';
}

/**
 * Check for abusive patterns
 */
function isAbusiveClient(clientId: string): boolean {
  const client = clients.get(clientId);
  if (!client) return false;
  
  const now = Date.now();
  const recentViolationThreshold = 5 * 60 * 1000; // 5 minutes
  
  // Block clients with too many recent violations
  if (client.violations > 10 && (now - client.lastViolation) < recentViolationThreshold) {
    return true;
  }
  
  return false;
}

/**
 * Create a blocked result
 */
function createBlockedResult(limit: number, resetTime: number, _reason: string): RateLimitResult {
  const now = Date.now();
  const retryAfter = Math.ceil((resetTime - now) / 1000);
  
  return {
    success: false,
    limit,
    remaining: 0,
    resetTime,
    retryAfter
  };
}

/**
 * Reset health status on successful operation
 */
function resetHealthStatus(identifier: string): void {
  const health = rateLimiterHealth.get(identifier);
  if (health && health.failures > 0) {
    rateLimiterHealth.set(identifier, { failures: 0, lastFailure: 0 });
  }
}

/**
 * SECURE cleanup with safety checks
 */
function secureCleanup() {
  try {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour
    const beforeSize = clients.size;
    
    for (const [clientId, client] of Array.from(clients.entries())) {
      if (now - client.windowStart > maxAge) {
        clients.delete(clientId);
      }
    }
    
    const cleaned = beforeSize - clients.size;
    if (cleaned > 0) {
      // Cleanup completed successfully
    }
  } catch (error) {
    logger.error('Rate limiter cleanup failed:', { error: String(error) });
  }
}

// Run cleanup every 15 minutes
setInterval(secureCleanup, 15 * 60 * 1000);

/**
 * SECURE pre-configured rate limiters
 */
export const authRateLimit = rateLimit({ 
  maxRequests: 5, 
  windowMs: 60000, 
  identifier: 'auth_simple',
  blockOnError: true 
});

export const apiRateLimit = rateLimit({ 
  maxRequests: 100, 
  windowMs: 60000, 
  identifier: 'api_simple',
  blockOnError: true 
});

export const strictRateLimit = rateLimit({ 
  maxRequests: 10, 
  windowMs: 60000, 
  identifier: 'strict_simple',
  blockOnError: true 
});

/**
 * Get overall rate limiter health
 */
export function getRateLimiterHealth(): {
  totalClients: number;
  rateLimiters: Array<{
    identifier: string;
    failures: number;
    healthy: boolean;
  }>;
} {
  const limiters = [authRateLimit, apiRateLimit, strictRateLimit];
  
  return {
    totalClients: clients.size,
    rateLimiters: limiters.map(limiter => limiter.getHealthStatus())
  };
}