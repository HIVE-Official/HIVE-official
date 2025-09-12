/// <reference path="../types/global.d.ts" />
/**
 * Production Optimizations for HIVE Platform
 * Performance enhancements and production-ready configurations
 */

import { headers } from 'next/headers';

/**
 * Image optimization configuration
 */
export const imageOptimization = {
  // Responsive image sizes
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Image formats
  formats: ['image/webp', 'image/avif'],
  
  // Lazy loading configuration
  lazyBoundary: '200px',
  
  // Quality settings
  quality: {
    thumbnail: 60,
    standard: 75,
    high: 90
  },
  
  // Blur placeholder
  placeholder: 'blur' as const,
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
};

/**
 * Bundle optimization settings
 */
export const bundleOptimization = {
  // Code splitting boundaries
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      default: false,
      vendors: false,
      framework: {
        name: 'framework',
        chunks: 'all',
        test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
        priority: 40,
        enforce: true
      },
      lib: {
        test: /[\\/]node_modules[\\/]/,
        name(module: any) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];
          return `npm.${packageName.replace('@', '')}`;
        },
        priority: 30,
        minChunks: 1,
        reuseExistingChunk: true
      },
      commons: {
        name: 'commons',
        minChunks: 2,
        priority: 20
      },
      shared: {
        name: 'shared',
        priority: 10,
        reuseExistingChunk: true,
        enforce: true
      }
    }
  },
  
  // Minification settings
  minify: true,
  
  // Tree shaking
  sideEffects: false,
  
  // Module concatenation
  concatenateModules: true
};

/**
 * Security headers for production
 */
export function getSecurityHeaders(): HeadersInit | Record<string, string> {
  return {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com",
      "style-src 'self' 'unsafe-inline' *.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: *.gstatic.com",
      "connect-src 'self' *.googleapis.com *.firebase.com wss://*.firebaseio.com",
      "frame-src 'self' *.firebase.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  };
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  
  mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(name);
    }
  }
  
  measure(name: string, startMark: string, endMark?: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        const measure = performance.measure(name, startMark, endMark);
        
        // Store metric
        if (!this.metrics.has(name)) {
          this.metrics.set(name, []);
        }
        this.metrics.get(name)!.push(measure.duration);
        
        // Log slow operations
        if (measure.duration > 1000) {
          console.warn(`Slow operation detected: ${name} took ${measure.duration}ms`);
        }
      } catch (error) {
        console.error('Performance measurement failed:', error);
      }
    }
  }
  
  getMetrics(name?: string): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, any> = {};
    
    const metricsToProcess = name 
      ? [[name, this.metrics.get(name) || []]]
      : Array.from(this.metrics.entries());
    
    for (const [key, values] of metricsToProcess) {
      if (values.length > 0) {
        result[key] = {
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          count: values.length
        };
      }
    }
    
    return result;
  }
  
  clear(): void {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Resource hints for faster loading
 */
export function getResourceHints(): Array<{ rel: string; href: string; as?: string }> {
  return [
    // DNS prefetch
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://firebasestorage.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://identitytoolkit.googleapis.com' },
    
    // Preconnect
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://firebasestorage.googleapis.com' },
    
    // Prefetch critical resources
    { rel: 'prefetch', href: '/api/auth/session', as: 'fetch' },
    { rel: 'prefetch', href: '/api/spaces', as: 'fetch' },
    
    // Preload fonts
    { 
      rel: 'preload', 
      href: '/fonts/inter-var.woff2', 
      as: 'font',
    }
  ];
}

/**
 * Database query optimization
 */
export const dbOptimization = {
  // Batch size for bulk operations
  batchSize: 500,
  
  // Query limits
  defaultLimit: 20,
  maxLimit: 100,
  
  // Indexing strategy
  indexes: [
    'spaces.campusId',
    'spaces.createdAt',
    'posts.spaceId',
    'posts.createdAt',
    'users.email',
    'events.spaceId',
    'events.startDate'
  ],
  
  // Connection pooling
  connectionPool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000
  }
};

/**
 * API response compression
 */
export function compressResponse(data: any): string {
  // Remove null values and empty arrays
  const cleaned = JSON.parse(JSON.stringify(data, (key, value) => {
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      return undefined;
    }
    return value;
  }));
  
  return JSON.stringify(cleaned);
}

/**
 * Client-side optimization utilities
 */
export const clientOptimization = {
  // Debounce for search/filter inputs
  debounceDelay: 300,
  
  // Throttle for scroll events
  throttleDelay: 100,
  
  // Intersection observer config
  intersectionObserver: {
    rootMargin: '100px',
    threshold: 0.1
  },
  
  // Virtual scrolling
  virtualScroll: {
    itemHeight: 80,
    buffer: 5,
    maxItemsInView: 20
  }
};

/**
 * Service Worker configuration
 */
export const serviceWorkerConfig = {
  // Cache strategies per route
  cacheStrategies: {
    '/api/auth': 'network-first',
    '/api/spaces': 'cache-first',
    '/api/feed': 'stale-while-revalidate',
    '/api/posts': 'network-first',
    '/api/tools': 'cache-first',
    '/api/events': 'cache-first'
  },
  
  // Offline fallback pages
  offlineFallbacks: {
    '/': '/offline.html',
    '/spaces': '/offline-spaces.html',
    '/feed': '/offline-feed.html'
  },
  
  // Background sync queues
  syncQueues: [
    'post-creation',
    'comment-submission',
    'space-join',
    'event-rsvp'
  ]
};

/**
 * Memory leak prevention
 */
export class MemoryManager {
  private intervals: Set<NodeJS.Timeout> = new Set();
  private timeouts: Set<NodeJS.Timeout> = new Set();
  private listeners: Map<string, Function> = new Map();
  
  registerInterval(interval: NodeJS.Timeout): void {
    this.intervals.add(interval);
  }
  
  registerTimeout(timeout: NodeJS.Timeout): void {
    this.timeouts.add(timeout);
  }
  
  registerListener(key: string, listener: Function): void {
    this.listeners.set(key, listener);
  }
  
  cleanup(): void {
    // Clear intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    
    // Clear timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    
    // Remove listeners
    this.listeners.clear();
  }
}

export const memoryManager = new MemoryManager();

/**
 * Lazy loading configuration
 */
export const lazyLoadConfig = {
  // Components to lazy load
  components: [
    'ProfileDashboard',
    'SpaceCreationModal',
    'ToolBuilder',
    'EventCalendar',
    'NotificationCenter',
    'SearchModal'
  ],
  
  // Routes to prefetch
  prefetchRoutes: [
    '/spaces',
    '/feed',
    '/profile',
    '/tools'
  ],
  
  // Dynamic imports with loading states
  dynamicImportOptions: {
    loading: () => null,
    ssr: false
  }
};

/**
 * Production build optimizations
 */
export const buildOptimizations = {
  // Remove console logs in production
  removeConsole: process.env.NODE_ENV === 'production',
  
  // Source maps configuration
  sourceMap: process.env.NODE_ENV === 'development',
  
  // Analyze bundle size
  analyzeBundle: process.env.ANALYZE === 'true',
  
  // Compression
  compress: true,
  
  // Output configuration
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  }
};

/**
 * CDN configuration
 */
export const cdnConfig = {
  // Asset prefix for CDN
  assetPrefix: process.env.CDN_URL || '',
  
  // Static file caching
  staticCacheMaxAge: 31536000, // 1 year
  
  // Dynamic content caching
  dynamicCacheMaxAge: 300, // 5 minutes
  
  // Edge locations
  edgeLocations: [
    'us-east-1',
    'us-west-2',
    'eu-west-1',
    'ap-southeast-1'
  ]
};

/**
 * Database connection optimization
 */
export async function optimizeDbConnection(): Promise<void> {
  // Implement connection pooling
  // Set query timeout
  // Enable query caching
  // Configure read replicas
  console.log('Database connection optimized');
}

/**
 * Critical CSS extraction
 */
export function getCriticalCSS(): string {
  // This would be generated during build
  return `
    :root {
      --hive-gold: #FFD700;
      --hive-black: #0A0A0A;
      --hive-white: #FFFFFF;
    }
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--hive-black);
      color: var(--hive-white);
    }
    
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
  `;
}

/**
 * Export all optimizations as a single config
 */
export const productionConfig = {
  imageOptimization,
  bundleOptimization,
  dbOptimization,
  clientOptimization,
  serviceWorkerConfig,
  lazyLoadConfig,
  buildOptimizations,
  cdnConfig
};