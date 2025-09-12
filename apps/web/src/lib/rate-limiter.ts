import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
  maxRequests?: number;
}

interface RateLimitResult {
  limit: number;
  remaining: number;
  success: boolean;
}

// Create different caches for different rate limit tiers
const caches = new Map<string, LRUCache<string, number[]>>();

function getCache(tier: string, options: RateLimitOptions): LRUCache<string, number[]> {
  const cacheKey = `${tier}-${options.uniqueTokenPerInterval}`;
  
  if (!caches.has(cacheKey)) {
    const cache = new LRUCache<string, number[]>({
      max: options.uniqueTokenPerInterval || 500,
      ttl: options.interval || 60000, // 1 minute default
    });
    caches.set(cacheKey, cache);
  }
  
  return caches.get(cacheKey)!;
}

export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const {
    uniqueTokenPerInterval = 500,
    interval = 60000, // 1 minute
    maxRequests = 10,
  } = options;

  // Get identifier from IP or user session
  const identifier = getIdentifier(request);
  const tier = getTier(request);
  
  const cache = getCache(tier, { uniqueTokenPerInterval, interval });
  
  const now = Date.now();
  const windowStart = now - interval;
  
  // Get existing requests for this identifier
  const requests = cache.get(identifier) || [];
  
  // Filter out old requests outside the current window
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  // Check if limit exceeded
  if (recentRequests.length >= maxRequests) {
    return {
      limit: maxRequests,
      remaining: 0,
      success: false,
    };
  }
  
  // Add current request
  recentRequests.push(now);
  cache.set(identifier, recentRequests);
  
  return {
    limit: maxRequests,
    remaining: maxRequests - recentRequests.length,
    success: true,
  };
}

function getIdentifier(request: NextRequest): string {
  // Try to get user ID from auth header or session
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    // Extract user ID from JWT or session token
    const userId = extractUserIdFromAuth(authHeader);
    if (userId) return `user:${userId}`;
  }
  
  // Fallback to IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] || request.headers?.['x-forwarded-for'] || request.headers?.['x-real-ip'] || 'unknown';
  return `ip:${ip}`;
}

function getTier(request: NextRequest): string {
  // Check for premium users, admins, etc.
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const userRole = extractUserRoleFromAuth(authHeader);
    if (userRole === 'admin') return 'admin';
    if (userRole === 'premium') return 'premium';
  }
  return 'default';
}

function extractUserIdFromAuth(authHeader: string): string | null {
  // Implement JWT/session parsing to extract user ID
  // This is a placeholder - implement based on your auth system
  try {
    const token = authHeader.replace('Bearer ', '');
    // Parse JWT or lookup session
    return null; // Return actual user ID
  } catch {
    return null;
  }
}

function extractUserRoleFromAuth(authHeader: string): string | null {
  // Implement JWT/session parsing to extract user role
  // This is a placeholder - implement based on your auth system
  try {
    const token = authHeader.replace('Bearer ', '');
    // Parse JWT or lookup session
    return 'default'; // Return actual user role
  } catch {
    return 'default';
  }
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  // Authentication endpoints - stricter limits
  auth: {
    login: { maxRequests: 5, interval: 60000 * 15 }, // 5 per 15 minutes
    signup: { maxRequests: 3, interval: 60000 * 60 }, // 3 per hour
    magicLink: { maxRequests: 3, interval: 60000 * 5 }, // 3 per 5 minutes
  },
  
  // API endpoints - standard limits
  api: {
    default: { maxRequests: 60, interval: 60000 }, // 60 per minute
    search: { maxRequests: 30, interval: 60000 }, // 30 per minute
    upload: { maxRequests: 10, interval: 60000 * 5 }, // 10 per 5 minutes
    webhook: { maxRequests: 100, interval: 60000 }, // 100 per minute
  },
  
  // User tiers
  tiers: {
    default: { maxRequests: 60, interval: 60000 },
    premium: { maxRequests: 200, interval: 60000 },
    admin: { maxRequests: 1000, interval: 60000 },
  },
};

// Middleware helper
export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>,
  options?: RateLimitOptions
): Promise<NextResponse> {
  const result = await rateLimit(request, options);
  
  if (!result.success) {
    return NextResponse.json(
      { 
        error: 'Too many requests',
        message: 'Please slow down and try again later',
        retryAfter: 60,
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
          'Retry-After': '60',
        },
      }
    );
  }
  
  const response = await handler();
  
  // Add rate limit headers to successful responses
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 60000).toISOString());
  
  return response;
}

// LRU Cache polyfill if not available
class LRUCache<K, V> {
  private max: number;
  private ttl: number;
  private cache: Map<K, { value: V; expires: number }>;

  constructor(options: { max: number; ttl: number }) {
    this.max = options.max;
    this.ttl = options.ttl;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return undefined;
    }
    
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);
    
    return item.value;
  }

  set(key: K, value: V): void {
    // Remove oldest if at capacity
    if (this.cache.size >= this.max && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      expires: Date.now() + this.ttl,
    });
  }
}