/// <reference path="../types/global.d.ts" />
/**
 * Performance optimization utilities
 */

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Memoize function
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    // Limit cache size
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }) as T;
}

// Lazy load images
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Virtual scrolling helper
export class VirtualScroller<T> {
  private items: T[];
  private itemHeight: number;
  private containerHeight: number;
  private scrollTop: number = 0;
  private overscan: number;

  constructor(
    items: T[],
    itemHeight: number,
    containerHeight: number,
    overscan = 3
  ) {
    this.items = items;
    this.itemHeight = itemHeight;
    this.containerHeight = containerHeight;
    this.overscan = overscan;
  }

  setScrollTop(scrollTop: number) {
    this.scrollTop = scrollTop;
  }

  getVisibleItems(): { items: T[]; offset: number } {
    const startIndex = Math.max(
      0,
      Math.floor(this.scrollTop / this.itemHeight) - this.overscan
    );
    
    const endIndex = Math.min(
      this.items.length - 1,
      Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + this.overscan
    );

    return {
      items: this.items.slice(startIndex, endIndex + 1),
      offset: startIndex * this.itemHeight
    };
  }

  getTotalHeight(): number {
    return this.items.length * this.itemHeight;
  }
}

// Request idle callback polyfill
export const requestIdleCallback =
  typeof window !== 'undefined' && window.requestIdleCallback
    ? window.requestIdleCallback
    : (callback: (deadline: IdleDeadline) => void) => {
        const start = Date.now();
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          });
        }, 1);
      };

// Cancel idle callback polyfill
export const cancelIdleCallback =
  typeof window !== 'undefined' && window.cancelIdleCallback
    ? window.cancelIdleCallback
    : clearTimeout;

// Batch DOM updates
export class DOMBatcher {
  private queue: (() => void)[] = [];
  private scheduled = false;

  add(callback: () => void) {
    this.queue.push(callback);
    
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  flush() {
    const callbacks = this.queue.slice();
    this.queue = [];
    this.scheduled = false;
    
    callbacks.forEach(callback => callback());
  }
}

// Performance monitor
export class PerformanceMonitor {
  private marks = new Map<string, number>();
  private measures: Array<{ name: string; duration: number }> = [];

  mark(name: string) {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string, endMark?: string) {
    const start = this.marks.get(startMark);
    const end = endMark ? this.marks.get(endMark) : performance.now();
    
    if (start && end) {
      const duration = end - (typeof start === 'number' ? start : 0);
      this.measures.push({ name, duration });
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      }
    }
  }

  getMetrics() {
    return {
      marks: Array.from(this.marks.entries()),
      measures: this.measures
    };
  }

  clear() {
    this.marks.clear();
    this.measures = [];
  }
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('[WebVitals] FCP:', entry.startTime);
      }
    }
  });
  
  observer.observe({ entryTypes: ['paint'] });

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('[WebVitals] LCP:', lastEntry.startTime);
  });
  
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const delay = entry.processingStart - entry.startTime;
      console.log('[WebVitals] FID:', delay);
    }
  });
  
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        console.log('[WebVitals] CLS:', clsValue);
      }
    }
  });
  
  clsObserver.observe({ entryTypes: ['layout-shift'] });
}

// Optimize bundle size with dynamic imports
export async function dynamicImport<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  const mod = await importFn();
  return mod.default;
}

// Memory leak detector
export class MemoryLeakDetector {
  private intervals: Set<NodeJS.Timeout> = new Set();
  private listeners: Array<{ element: EventTarget; type: string; listener: EventListener }> = [];

  trackInterval(interval: NodeJS.Timeout) {
    this.intervals.add(interval);
  }

  trackListener(element: EventTarget, type: string, listener: EventListener) {
    this.listeners.push({ element, type, listener });
  }

  cleanup() {
    // Clear intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();

    // Remove event listeners
    this.listeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });
    this.listeners = [];
  }

  getStatus() {
    return {
      activeIntervals: this.intervals.size,
      activeListeners: this.listeners.length
    };
  }
}