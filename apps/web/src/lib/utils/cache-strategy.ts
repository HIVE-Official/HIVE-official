/// <reference path="../types/global.d.ts" />
import { LRUCache } from 'lru-cache';
import { logger } from '@/lib/logger';

import { unstable_cache } from 'next/cache';

/**
 * Comprehensive Caching Strategy for HIVE Platform
 * Implements multi-layer caching with memory, edge, and browser caching
 */

// Cache configuration types
export interface CacheConfig {
  ttl?: number;              // Time to live in milliseconds
  staleWhileRevalidate?: number; // Serve stale while revalidating
  maxSize?: number;           // Maximum cache size
  swr?: boolean;              // Stale-while-revalidate strategy
  tags?: string[];            // Cache tags for invalidation
}

// Cache layers
export enum CacheLayer {
  MEMORY = 'memory',
  EDGE = 'edge',
  BROWSER = 'browser',
  CDN = 'cdn'
}

// Cache strategies
export enum CacheStrategy {
  CACHE_FIRST = 'cache-first',           // Cache, fallback to network
  NETWORK_FIRST = 'network-first',       // Network, fallback to cache
  CACHE_ONLY = 'cache-only',             // Cache only, error if miss
  NETWORK_ONLY = 'network-only',         // Network only, no cache
  STALE_WHILE_REVALIDATE = 'swr'         // Return stale, update in background
}

/**
 * Memory Cache Implementation
 */
class MemoryCache {
  private caches: Map<string, LRUCache<string, any>> = new Map();
  
  getCache(namespace: string, config: CacheConfig = {}): LRUCache<string, any> {
    if (!this.caches.has(namespace)) {
      const cache = new LRUCache<string, any>({
        max: config.maxSize || 100,
        ttl: config.ttl || 1000 * 60 * 5, // 5 minutes default
        updateAgeOnGet: true,
        updateAgeOnHas: true,
        stale: config.swr
      });
      this.caches.set(namespace, cache);
    }
    return this.caches.get(namespace)!;
  }
  
  get<T>(namespace: string, key: string): T | undefined {
    const cache = this.getCache(namespace);
    return cache.get(key);
  }
  
  set<T>(namespace: string, key: string, value: T, config?: CacheConfig): void {
    const cache = this.getCache(namespace, config);
    cache.set(key, value);
  }
  
  delete(namespace: string, key: string): void {
    const cache = this.caches.get(namespace);
    if (cache) {
      cache.delete(key);
    }
  }
  
  clear(namespace?: string): void {
    if (namespace) {
      const cache = this.caches.get(namespace);
      if (cache) {
        cache.clear();
      }
    } else {
      this.caches.forEach(cache => cache.clear());
    }
  }
  
  has(namespace: string, key: string): boolean {
    const cache = this.caches.get(namespace);
    return cache ? cache.has(key) : false;
  }
}

// Singleton memory cache instance
export const memoryCache = new MemoryCache();

/**
 * Cache key builder with consistent hashing
 */
export function buildCacheKey(
  namespace: string,
  params: Record<string, any>
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${JSON.stringify(params[key])}`)
    .join('|');
  return `${namespace}:${sortedParams}`;
}

/**
 * Next.js Data Cache wrapper
 */
export function createCachedFunction<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  config: {
    revalidate?: number | false;
    tags?: string[];
  } = {}
): T {
  return unstable_cache(
    fn,
    undefined,
    {
      revalidate: config.revalidate ?? 3600, // 1 hour default
      tags: config.tags || []
    }
  ) as T;
}

/**
 * SWR-style cache wrapper
 */
export async function withSWR<T>(
  key: string,
  fetcher: () => Promise<T>,
  config: CacheConfig = {}
): Promise<T> {
  const namespace = 'swr';
  const cached = memoryCache.get<{ data: T; timestamp: number }>(namespace, key);
  
  const now = Date.now();
  const ttl = config.ttl || 1000 * 60 * 5; // 5 minutes default
  const staleTime = config.staleWhileRevalidate || 1000 * 60; // 1 minute stale time
  
  // If we have cached data
  if (cached) {
    const age = now - cached.timestamp;
    
    // Data is fresh
    if (age < ttl) {
      return cached.data;
    }
    
    // Data is stale but within revalidation window
    if (age < ttl + staleTime) {
      // Return stale data and revalidate in background
      fetcher().then(data => {
        memoryCache.set(namespace, key, { data, timestamp: Date.now() }, config);
      }).catch(console.error);
      
      return cached.data;
    }
  }
  
  // Fetch fresh data
  const data = await fetcher();
  memoryCache.set(namespace, key, { data, timestamp: now }, config);
  return data;
}

/**
 * Cache invalidation helpers
 */
export const cacheInvalidation = {
  // Invalidate by pattern
  invalidatePattern(pattern: string): void {
    // This would integrate with your cache infrastructure
  },
  
  // Invalidate by tags
  invalidateTags(tags: string[]): void {
    // Next.js revalidateTag integration
    tags.forEach(tag => {
      if (typeof window === 'undefined') {
        // Server-side only
        try {
          const { revalidateTag } = require('next/cache');
          revalidateTag(tag);
        } catch (error) {
          logger.error('Failed to revalidate tag:', { error: String(tag, { error: String(error) }) });
        }
      }
    });
  },
  
  // Invalidate specific keys
  invalidateKeys(namespace: string, keys: string[]): void {
    keys.forEach(key => memoryCache.delete(namespace, key));
  },
  
  // Clear all caches
  clearAll(): void {
    memoryCache.clear();
  }
};

/**
 * Response cache headers builder
 */
export function buildCacheHeaders(config: {
  maxAge?: number;
  sMaxAge?: number;
  staleWhileRevalidate?: number;
  staleIfError?: number;
  private?: boolean;
  noCache?: boolean;
  noStore?: boolean;
  mustRevalidate?: boolean;
}): Headers {
  const headers = new Headers();
  const directives: string[] = [];
  
  if (config.noStore) {
    directives.push('no-store');
  } else if (config.noCache) {
    directives.push('no-cache');
  } else {
    if (config.private) {
      directives.push('private');
    } else {
      directives.push('public');
    }
    
    if (config.maxAge !== undefined) {
      directives.push(`max-age=${config.maxAge}`);
    }
    
    if (config.sMaxAge !== undefined) {
      directives.push(`s-maxage=${config.sMaxAge}`);
    }
    
    if (config.staleWhileRevalidate !== undefined) {
      directives.push(`stale-while-revalidate=${config.staleWhileRevalidate}`);
    }
    
    if (config.staleIfError !== undefined) {
      directives.push(`stale-if-error=${config.staleIfError}`);
    }
    
    if (config.mustRevalidate) {
      directives.push('must-revalidate');
    }
  }
  
  headers.set('Cache-Control', directives.join(', '));
  return headers;
}

/**
 * Cache strategies for different data types
 */
export const cacheStrategies = {
  // Static content (images, fonts, etc.)
  static: {
    maxAge: 31536000, // 1 year
    sMaxAge: 31536000,
    staleWhileRevalidate: 86400 // 1 day
  },
  
  // API responses
  api: {
    maxAge: 0,
    sMaxAge: 60, // 1 minute
    staleWhileRevalidate: 300 // 5 minutes
  },
  
  // User-specific data
  user: {
    private: true,
    maxAge: 0,
    sMaxAge: 0,
    noCache: true
  },
  
  // Feed data
  feed: {
    maxAge: 30, // 30 seconds
    sMaxAge: 60, // 1 minute
    staleWhileRevalidate: 120 // 2 minutes
  },
  
  // Space data
  space: {
    maxAge: 300, // 5 minutes
    sMaxAge: 600, // 10 minutes
    staleWhileRevalidate: 1800 // 30 minutes
  }
};

/**
 * Cached fetch wrapper with strategy
 */
export async function cachedFetch(
  url: string,
  options: RequestInit | any & {
    cacheStrategy?: CacheStrategy;
    cacheConfig?: CacheConfig;
  } = {}
): Promise<Response> {
  const strategy = options.cacheStrategy || CacheStrategy.CACHE_FIRST;
  const config = options.cacheConfig || {};
  const cacheKey = buildCacheKey('fetch', { url, ...options });
  
  switch (strategy) {
    case CacheStrategy.CACHE_FIRST: {
      const cached = memoryCache.get<Response>('fetch', cacheKey);
      if (cached) return cached;
      
      const response = await fetch(url, options);
      memoryCache.set('fetch', cacheKey, response.clone(), config);
      return response;
    }
    
    case CacheStrategy.NETWORK_FIRST: {
      try {
        const response = await fetch(url, options);
        memoryCache.set('fetch', cacheKey, response.clone(), config);
        return response;
      } catch (error) {
        const cached = memoryCache.get<Response>('fetch', cacheKey);
        if (cached) return cached;
        throw error;
      }
    }
    
    case CacheStrategy.CACHE_ONLY: {
      const cached = memoryCache.get<Response>('fetch', cacheKey);
      if (!cached) {
        throw new Error('Cache miss for cache-only request');
      }
      return cached;
    }
    
    case CacheStrategy.NETWORK_ONLY: {
      return fetch(url, options);
    }
    
    case CacheStrategy.STALE_WHILE_REVALIDATE: {
      return withSWR(cacheKey, () => fetch(url, options), config) as Promise<Response>;
    }
    
    default:
      return fetch(url, options);
  }
}

/**
 * Preload and warm cache
 */
export async function warmCache(
  requests: Array<{
    url: string;
    options?: RequestInit | any;
    cacheConfig?: CacheConfig;
  }>
): Promise<void> {
  await Promise.all(
    requests.map(({ url, options, cacheConfig }) =>
      cachedFetch(url, {
        ...options,
        cacheStrategy: CacheStrategy.NETWORK_FIRST,
        cacheConfig
      }).catch(console.error)
    )
  );
}

/**
 * Cache metrics and monitoring
 */
export class CacheMetrics {
  private hits = 0;
  private misses = 0;
  private errors = 0;
  
  recordHit(): void {
    this.hits++;
  }
  
  recordMiss(): void {
    this.misses++;
  }
  
  recordError(): void {
    this.errors++;
  }
  
  getMetrics(): {
    hits: number;
    misses: number;
    errors: number;
    hitRate: number;
  } {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      errors: this.errors,
      hitRate: total > 0 ? this.hits / total : 0
    };
  }
  
  reset(): void {
    this.hits = 0;
    this.misses = 0;
    this.errors = 0;
  }
}

export const cacheMetrics = new CacheMetrics();

/**
 * Browser storage cache (localStorage/sessionStorage)
 */
export const browserCache = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const { value, expiry } = JSON.parse(item);
      if (expiry && Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return value;
    } catch {
      return null;
    }
  },
  
  set<T>(key: string, value: T, ttlMs?: number): void {
    if (typeof window === 'undefined') return;
    
    try {
      const item = {
        value,
        expiry: ttlMs ? Date.now() + ttlMs : null
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      logger.error('Failed to save to localStorage:', { error: String(error) });
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
};

// Export cache presets for common use cases
export const cachePresets = {
  // User session data
  session: {
    ttl: 1000 * 60 * 30, // 30 minutes
    staleWhileRevalidate: 1000 * 60 * 5 // 5 minutes
  },
  
  // API data
  apiData: {
    ttl: 1000 * 60 * 5, // 5 minutes
    staleWhileRevalidate: 1000 * 60 // 1 minute
  },
  
  // Static assets
  staticAsset: {
    ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
    staleWhileRevalidate: 1000 * 60 * 60 * 24 // 1 day
  },
  
  // Real-time data
  realtime: {
    ttl: 1000 * 30, // 30 seconds
    staleWhileRevalidate: 1000 * 10 // 10 seconds
  }
};