/**
 * Rate limiting - fallback to memory-based implementation
 * Redis-based rate limiting disabled until Redis is properly configured
 */

import {
  rateLimit,
  authRateLimit,
  apiRateLimit,
  strictRateLimit,
  getRateLimiterHealth
} from './rate-limit-simple';

// Re-export core functions
export {
  rateLimit,
  authRateLimit,
  apiRateLimit,
  strictRateLimit,
  getRateLimiterHealth
};

// Named exports for compatibility
export const magicLinkRateLimit = authRateLimit;
export const handleCheckRateLimit = strictRateLimit;
export const postCreationRateLimit = apiRateLimit;
export const searchRateLimit = apiRateLimit;
export const adminRateLimit = strictRateLimit;