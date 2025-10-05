/**
 * HIVE Performance Monitoring & Analytics
 * Comprehensive performance tracking for platform optimization
 */

import { useState, useEffect } from 'react';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Enhanced metrics for comprehensive monitoring
export interface EnhancedPerformanceMetric {
  id: string;
  timestamp: Date;
  type: MetricType;
  value: number;
  unit: string;
  labels: Record<string, string>;
  userId?: string;
  spaceId?: string;
  endpoint?: string;
  component?: string;
}

export enum MetricType {
  // API Performance
  _API_RESPONSE_TIME = 'api_response_time',
  _API_ERROR_RATE = 'api_error_rate',
  _API_THROUGHPUT = 'api_throughput',
  
  // Database Performance
  _DB_QUERY_TIME = 'db_query_time',
  _DB_CONNECTION_COUNT = 'db_connection_count',
  _DB_ERROR_RATE = 'db_error_rate',
  
  // Frontend Performance
  _PAGE_LOAD_TIME = 'page_load_time',
  _COMPONENT_RENDER_TIME = 'component_render_time',
  _BUNDLE_SIZE = 'bundle_size',
  
  // User Experience
  _TIME_TO_INTERACTIVE = 'time_to_interactive',
  _FIRST_CONTENTFUL_PAINT = 'first_contentful_paint',
  _CUMULATIVE_LAYOUT_SHIFT = 'cumulative_layout_shift',
  
  // Platform Integration
  _INTEGRATION_LATENCY = 'integration_latency',
  _CACHE_HIT_RATE = 'cache_hit_rate',
  _WEBSOCKET_CONNECTION_TIME = 'websocket_connection_time',
  
  // Business Metrics
  _USER_ENGAGEMENT = 'user_engagement',
  _FEATURE_USAGE = 'feature_usage',
  _CONVERSION_RATE = 'conversion_rate',
  
  // System Health
  _MEMORY_USAGE = 'memory_usage',
  _CPU_USAGE = 'cpu_usage',
  _ERROR_COUNT = 'error_count'
}

export interface WebVitalsMetrics {
  LCP?: PerformanceMetric; // Largest Contentful Paint
  FID?: PerformanceMetric; // First Input Delay  
  CLS?: PerformanceMetric; // Cumulative Layout Shift
  FCP?: PerformanceMetric; // First Contentful Paint
  TTFB?: PerformanceMetric; // Time to First Byte
}

// Enhanced Performance Collector
export class HivePerformanceCollector {
  private enhancedMetrics: EnhancedPerformanceMetric[] = [];
  private batchSize: number = 50;
  private flushInterval: number = 30000; // 30 seconds
  private flushTimer: NodeJS.Timeout | null = null;
  private collectors: Map<string, () => EnhancedPerformanceMetric[]> = new Map();

  constructor(config: {
    batchSize?: number;
    flushInterval?: number;
    autoStart?: boolean;
  } = {}) {
    this.batchSize = config.batchSize || 50;
    this.flushInterval = config.flushInterval || 30000;
    
    if (config.autoStart !== false) {
      this.start();
    }

    this.setupBuiltInCollectors();
  }

  private setupBuiltInCollectors(): void {
    // Web Vitals Collector
    if (typeof window !== 'undefined') {
      this.registerCollector('web-vitals', () => {
        const metrics: EnhancedPerformanceMetric[] = [];
        
        // Performance Observer for navigation timing
        if ('performance' in window && 'getEntriesByType' in performance) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            metrics.push({
              id: `nav_${Date.now()}`,
              timestamp: new Date(),
              type: MetricType._PAGE_LOAD_TIME,
              value: navigation.loadEventEnd - navigation.fetchStart,
              unit: 'ms',
              labels: { page: window.location.pathname }
            });

            if (navigation.domContentLoadedEventEnd) {
              metrics.push({
                id: `dcl_${Date.now()}`,
                timestamp: new Date(),
                type: MetricType._TIME_TO_INTERACTIVE,
                value: navigation.domContentLoadedEventEnd - navigation.fetchStart,
                unit: 'ms',
                labels: { page: window.location.pathname }
              });
            }
          }
        }

        return metrics;
      });

      // Memory Usage Collector
      this.registerCollector('memory', () => {
        const metrics: EnhancedPerformanceMetric[] = [];
        
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          metrics.push({
            id: `mem_${Date.now()}`,
            timestamp: new Date(),
            type: MetricType._MEMORY_USAGE,
            value: memory.usedJSHeapSize,
            unit: 'bytes',
            labels: { type: 'used_heap' }
          });
        }

        return metrics;
      });
    }

    // Node.js Metrics Collector
    if (typeof process !== 'undefined') {
      this.registerCollector('node-metrics', () => {
        const metrics: EnhancedPerformanceMetric[] = [];
        
        const memUsage = process.memoryUsage();
        metrics.push({
          id: `node_mem_${Date.now()}`,
          timestamp: new Date(),
          type: MetricType._MEMORY_USAGE,
          value: memUsage.heapUsed,
          unit: 'bytes',
          labels: { type: 'heap_used', runtime: 'node' }
        });

        if (process.cpuUsage) {
          const cpuUsage = process.cpuUsage();
          metrics.push({
            id: `node_cpu_${Date.now()}`,
            timestamp: new Date(),
            type: MetricType._CPU_USAGE,
            value: cpuUsage.user + cpuUsage.system,
            unit: 'microseconds',
            labels: { runtime: 'node' }
          });
        }

        return metrics;
      });
    }
  }

  registerCollector(name: string, collector: () => EnhancedPerformanceMetric[]): void {
    this.collectors.set(name, collector);
  }

  unregisterCollector(name: string): void {
    this.collectors.delete(name);
  }

  record(metric: Omit<EnhancedPerformanceMetric, 'id' | 'timestamp'>): void {
    const fullMetric: EnhancedPerformanceMetric = {
      id: `${metric.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...metric
    };

    this.enhancedMetrics.push(fullMetric);

    if (this.enhancedMetrics.length >= this.batchSize) {
      this.flush();
    }
  }

  recordApiCall(endpoint: string, method: string, responseTime: number, status: number): void {
    this.record({
      type: MetricType._API_RESPONSE_TIME,
      value: responseTime,
      unit: 'ms',
      labels: { endpoint, method, status: status.toString() },
      endpoint
    });

    this.record({
      type: MetricType._API_THROUGHPUT,
      value: 1,
      unit: 'requests',
      labels: { endpoint, method },
      endpoint
    });

    if (status >= 400) {
      this.record({
        type: MetricType._API_ERROR_RATE,
        value: 1,
        unit: 'errors',
        labels: { endpoint, method, status: status.toString() },
        endpoint
      });
    }
  }

  recordComponentRender(component: string, renderTime: number): void {
    this.record({
      type: MetricType._COMPONENT_RENDER_TIME,
      value: renderTime,
      unit: 'ms',
      labels: { component },
      component
    });
  }

  recordUserEngagement(action: string, userId: string, spaceId?: string): void {
    this.record({
      type: MetricType._USER_ENGAGEMENT,
      value: 1,
      unit: 'actions',
      labels: { action },
      userId,
      spaceId
    });
  }

  recordFeatureUsage(feature: string, userId: string, usage: number = 1): void {
    this.record({
      type: MetricType._FEATURE_USAGE,
      value: usage,
      unit: 'usage',
      labels: { feature },
      userId
    });
  }

  recordIntegrationLatency(integration: string, latency: number): void {
    this.record({
      type: MetricType._INTEGRATION_LATENCY,
      value: latency,
      unit: 'ms',
      labels: { integration }
    });
  }

  recordCacheMetrics(action: 'hit' | 'miss', cacheType: string): void {
    this.record({
      type: MetricType._CACHE_HIT_RATE,
      value: action === 'hit' ? 1 : 0,
      unit: 'ratio',
      labels: { operation: action, cache_type: cacheType }
    });
  }

  recordDatabaseQuery(query: string, duration: number, success: boolean): void {
    this.record({
      type: MetricType._DB_QUERY_TIME,
      value: duration,
      unit: 'ms',
      labels: { query_type: query, success: success.toString() }
    });

    if (!success) {
      this.record({
        type: MetricType._DB_ERROR_RATE,
        value: 1,
        unit: 'errors',
        labels: { query_type: query }
      });
    }
  }

  private collectFromRegisteredCollectors(): EnhancedPerformanceMetric[] {
    const collectedMetrics: EnhancedPerformanceMetric[] = [];
    
    for (const [name, collector] of this.collectors) {
      try {
        const metrics = collector();
        collectedMetrics.push(...metrics);
      } catch (error) {
        // Intentionally suppressed - non-critical error
      }
    }

    return collectedMetrics;
  }

  async flush(): Promise<void> {
    if (this.enhancedMetrics.length === 0) return;

    // Collect from registered collectors
    const collectedMetrics = this.collectFromRegisteredCollectors();
    const allMetrics = [...this.enhancedMetrics, ...collectedMetrics];

    // Clear current metrics
    this.enhancedMetrics = [];

    try {
      await this.sendMetrics(allMetrics);
    } catch (error) {
      // Re-add metrics for retry (keep only recent ones)
      this.enhancedMetrics.unshift(...allMetrics.slice(-10));
    }
  }

  private async sendMetrics(metrics: EnhancedPerformanceMetric[]): Promise<void> {
    if (typeof window !== 'undefined') {
      // Browser environment - send to analytics endpoint
      try {
        await fetch('/api/analytics/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ metrics })
        });
      } catch (error) {
        // Fallback to local storage for offline scenarios
        this.storeMetricsLocally(metrics);
      }
    } else {
      // Server environment - log to console or external service
    }
  }

  private storeMetricsLocally(metrics: EnhancedPerformanceMetric[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existing = localStorage.getItem('hive_metrics_queue') || '[]';
        const queue = JSON.parse(existing);
        queue.push(...metrics);
        
        // Keep only last 500 metrics in local storage
        const truncated = queue.slice(-500);
        localStorage.setItem('hive_metrics_queue', JSON.stringify(truncated));
      } catch (error) {
        // Intentionally suppressed - non-critical error
      }
    }
  }

  start(): void {
    if (this.flushTimer) return;
    
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  stop(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    
    // Flush remaining metrics
    this.flush();
  }

  getMetrics(): EnhancedPerformanceMetric[] {
    return [...this.enhancedMetrics];
  }

  getMetricsSummary(): Record<MetricType, {
    count: number;
    average: number;
    min: number;
    max: number;
    latest: number;
  }> {
    const summary: Record<string, any> = {};
    
    const allMetrics = [...this.enhancedMetrics, ...this.collectFromRegisteredCollectors()];
    
    for (const metric of allMetrics) {
      if (!summary[metric.type]) {
        summary[metric.type] = {
          count: 0,
          total: 0,
          min: Infinity,
          max: -Infinity,
          latest: 0
        };
      }
      
      const stats = summary[metric.type];
      stats.count++;
      stats.total += metric.value;
      stats.min = Math.min(stats.min, metric.value);
      stats.max = Math.max(stats.max, metric.value);
      stats.latest = metric.value;
    }
    
    // Calculate averages
    for (const type in summary) {
      const stats = summary[type];
      stats.average = stats.total / stats.count;
      delete stats.total;
    }
    
    return summary as any;
  }
}

class PerformanceMonitor {
  private metrics: WebVitalsMetrics = {};
  private isClient = typeof window !== 'undefined';
  private enhancedCollector: HivePerformanceCollector;

  constructor() {
    this.enhancedCollector = new HivePerformanceCollector();
    if (this.isClient) {
      this.initializeTracking();
    }
  }

  private initializeTracking() {
    // Track Core Web Vitals
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
    this.trackFCP();
    this.trackTTFB();
  }

  private trackLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        this.metrics.LCP = {
          name: 'LCP',
          value: lastEntry.startTime,
          rating: this.getRating('LCP', lastEntry.startTime),
          timestamp: Date.now()
        };
        
        this.reportMetric(this.metrics.LCP);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private trackFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.FID = {
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            rating: this.getRating('FID', entry.processingStart - entry.startTime),
            timestamp: Date.now()
          };
          
          this.reportMetric(this.metrics.FID);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private trackCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.CLS = {
          name: 'CLS',
          value: clsValue,
          rating: this.getRating('CLS', clsValue),
          timestamp: Date.now()
        };
        
        this.reportMetric(this.metrics.CLS);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private trackFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = {
              name: 'FCP',
              value: entry.startTime,
              rating: this.getRating('FCP', entry.startTime),
              timestamp: Date.now()
            };
            
            this.reportMetric(this.metrics.FCP);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  private trackTTFB() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
      
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        
        this.metrics.TTFB = {
          name: 'TTFB',
          value: ttfb,
          rating: this.getRating('TTFB', ttfb),
          timestamp: Date.now()
        };
        
        this.reportMetric(this.metrics.TTFB);
      }
    }
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private reportMetric(metric: PerformanceMetric) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 ${metric.name} Performance`);
      console.groupEnd();
    }

    // In production, send to analytics
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  }

  private async sendToAnalytics(metric: PerformanceMetric) {
    try {
      // Send to your analytics service
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          timestamp: metric.timestamp,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      // Silently fail in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Performance monitoring error:', error);
      }
    }
  }

  // Public API
  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public getMetricRating(metricName: keyof WebVitalsMetrics): string {
    const metric = this.metrics[metricName];
    return metric ? metric.rating : 'unknown';
  }

  public getAllRatings(): Record<string, string> {
    const ratings: Record<string, string> = {};
    Object.entries(this.metrics).forEach(([key, metric]) => {
      if (metric) {
        ratings[key] = metric.rating;
      }
    });
    return ratings;
  }
}

// Singleton instances
export const performanceMonitor = new PerformanceMonitor();
let globalCollector: HivePerformanceCollector | null = null;

export function getGlobalCollector(): HivePerformanceCollector {
  if (!globalCollector) {
    globalCollector = new HivePerformanceCollector();
  }
  return globalCollector;
}

export function initializePerformanceMonitoring(config?: {
  batchSize?: number;
  flushInterval?: number;
  enableAutoCollection?: boolean;
}): HivePerformanceCollector {
  globalCollector = new HivePerformanceCollector({
    batchSize: config?.batchSize,
    flushInterval: config?.flushInterval,
    autoStart: config?.enableAutoCollection !== false
  });

  // Setup browser-specific collectors
  if (typeof window !== 'undefined') {
    // Unload handler to flush metrics
    window.addEventListener('beforeunload', () => {
      globalCollector?.flush();
    });

    // Page visibility change handler
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        globalCollector?.flush();
      }
    });

    // Error tracking
    window.addEventListener('error', (event) => {
      globalCollector?.record({
        type: MetricType._ERROR_COUNT,
        value: 1,
        unit: 'errors',
        labels: {
          message: event.message,
          filename: event.filename || 'unknown',
          line: event.lineno?.toString() || 'unknown'
        }
      });
    });

    // Unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', (event) => {
      globalCollector?.record({
        type: MetricType._ERROR_COUNT,
        value: 1,
        unit: 'errors',
        labels: {
          type: 'unhandled_promise_rejection',
          reason: event.reason?.toString() || 'unknown'
        }
      });
    });
  }

  return globalCollector;
}

// Performance Monitor for React Components
export function usePerformanceMonitor(componentName: string) {
  const collector = getGlobalCollector();
  
  return {
    startRender: () => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        collector.recordComponentRender(componentName, end - start);
      };
    },
    
    recordUserAction: (action: string, userId?: string, spaceId?: string) => {
      if (userId) {
        collector.recordUserEngagement(action, userId, spaceId);
      }
    },
    
    recordFeatureUsage: (feature: string, userId?: string) => {
      if (userId) {
        collector.recordFeatureUsage(`${componentName}:${feature}`, userId);
      }
    }
  };
}

// API Performance Wrapper
export function withApiMetrics<T extends (..._args: any[]) => Promise<any>>(
  fn: T,
  endpoint: string,
  method: string = 'GET'
): T {
  return (async (..._args: any[]) => {
    const collector = getGlobalCollector();
    const start = performance.now();
    let status = 200;
    
    try {
      const result = await fn(..._args);
      return result;
    } catch (error: any) {
      status = error.response?.status || 500;
      throw error;
    } finally {
      const end = performance.now();
      collector.recordApiCall(endpoint, method, end - start, status);
    }
  }) as T;
}

// Database Query Performance Wrapper
export function withDatabaseMetrics<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  _queryType: string
): T {
  return (async (..._args: any[]) => {
    const collector = getGlobalCollector();
    const start = performance.now();
    let success = true;
    
    try {
      const result = await fn(..._args);
      return result;
    } catch (error) {
      success = false;
      throw error;
    } finally {
      const end = performance.now();
      collector.recordDatabaseQuery(_queryType, end - start, success);
    }
  }) as T;
}

// Hook for React components
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}

// Enhanced hook for comprehensive metrics
export function useEnhancedPerformanceMetrics() {
  const [metrics, setMetrics] = useState<EnhancedPerformanceMetric[]>([]);
  const [summary, setSummary] = useState<Record<MetricType, any>>({} as any);

  useEffect(() => {
    const collector = getGlobalCollector();
    const interval = setInterval(() => {
      setMetrics(collector.getMetrics());
      setSummary(collector.getMetricsSummary());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { metrics, summary };
}

// Web Vitals reporting for Next.js
export function reportWebVitals(metric: any) {
  const performanceMetric: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: performanceMonitor['getRating'](metric.name, metric.value),
    timestamp: Date.now()
  };

  performanceMonitor['reportMetric'](performanceMetric);
  
  // Also record in enhanced collector
  const collector = getGlobalCollector();
  let metricType: MetricType;
  
  switch (metric.name) {
    case 'LCP':
      metricType = MetricType._FIRST_CONTENTFUL_PAINT;
      break;
    case 'CLS':
      metricType = MetricType._CUMULATIVE_LAYOUT_SHIFT;
      break;
    case 'FCP':
      metricType = MetricType._FIRST_CONTENTFUL_PAINT;
      break;
    default:
      metricType = MetricType._PAGE_LOAD_TIME;
  }
  
  collector.record({
    type: metricType,
    value: metric.value,
    unit: 'ms',
    labels: { 
      metric_name: metric.name,
      rating: performanceMetric.rating,
      page: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    }
  });
}

// Export convenience functions
export const recordMetric = (metric: Omit<EnhancedPerformanceMetric, 'id' | 'timestamp'>) => {
  getGlobalCollector().record(metric);
};

export const recordApiCall = (endpoint: string, method: string, responseTime: number, status: number) => {
  getGlobalCollector().recordApiCall(endpoint, method, responseTime, status);
};

export const recordUserAction = (action: string, userId: string, spaceId?: string) => {
  getGlobalCollector().recordUserEngagement(action, userId, spaceId);
};

export const recordFeatureUsage = (feature: string, userId: string) => {
  getGlobalCollector().recordFeatureUsage(feature, userId);
};

export const recordComponentRender = (component: string, renderTime: number) => {
  getGlobalCollector().recordComponentRender(component, renderTime);
};

export const recordIntegrationLatency = (integration: string, latency: number) => {
  getGlobalCollector().recordIntegrationLatency(integration, latency);
};

export const recordCacheHit = (cacheType: string, hit: boolean) => {
  getGlobalCollector().recordCacheMetrics(hit ? 'hit' : 'miss', cacheType);
};

export const recordDatabaseQuery = (query: string, duration: number, success: boolean) => {
  getGlobalCollector().recordDatabaseQuery(query, duration, success);
};
