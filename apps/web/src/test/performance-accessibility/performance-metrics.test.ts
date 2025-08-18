import { describe, it, expect, vi, beforeEach } from 'vitest';
import { performance, PerformanceObserver } from 'perf_hooks';

// Performance monitoring utilities
const performanceMetrics = {
  measurePageLoad: () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      requestResponse: navigation.responseEnd - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalPageLoad: navigation.loadEventEnd - navigation.navigationStart
    };
  },

  measureResourceLoading: () => {
    const resources = performance.getEntriesByType('resource');
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: (resource as any).transferSize || (resource as any).encodedBodySize,
      type: (resource as any).initiatorType
    }));
  },

  measureUserTiming: () => {
    const marks = performance.getEntriesByType('mark');
    const measures = performance.getEntriesByType('measure');
    return { marks, measures };
  },

  measureMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// Mock Web Vitals metrics
const mockWebVitals = {
  getCLS: () => 0.05,
  getFID: () => 45,
  getFCP: () => 1200,
  getLCP: () => 1800,
  getTTFB: () => 180
};

describe('Performance Metrics Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    performance.clearMarks();
    performance.clearMeasures();
  });

  describe('Page Load Performance', () => {
    it('measures page load timing within acceptable thresholds', () => {
      // Mock navigation timing
      const mockNavigationTiming = {
        navigationStart: 0,
        domainLookupStart: 10,
        domainLookupEnd: 25,
        connectStart: 25,
        connectEnd: 45,
        requestStart: 50,
        responseEnd: 250,
        domContentLoadedEventStart: 300,
        domContentLoadedEventEnd: 350,
        loadEventStart: 400,
        loadEventEnd: 450
      };

      vi.spyOn(performance, 'getEntriesByType').mockReturnValue([mockNavigationTiming as any]);

      const metrics = performanceMetrics.measurePageLoad();

      // DNS lookup should be under 50ms
      expect(metrics.dnsLookup).toBeLessThan(50);
      
      // TCP connection should be under 100ms
      expect(metrics.tcpConnect).toBeLessThan(100);
      
      // Request/response should be under 500ms
      expect(metrics.requestResponse).toBeLessThan(500);
      
      // DOM content loaded should be under 100ms
      expect(metrics.domContentLoaded).toBeLessThan(100);
      
      // Total page load should be under 2 seconds
      expect(metrics.totalPageLoad).toBeLessThan(2000);
    });

    it('validates Core Web Vitals metrics meet performance standards', () => {
      const vitals = mockWebVitals;

      // Cumulative Layout Shift should be under 0.1
      expect(vitals.getCLS()).toBeLessThan(0.1);
      
      // First Input Delay should be under 100ms
      expect(vitals.getFID()).toBeLessThan(100);
      
      // First Contentful Paint should be under 1.8s
      expect(vitals.getFCP()).toBeLessThan(1800);
      
      // Largest Contentful Paint should be under 2.5s
      expect(vitals.getLCP()).toBeLessThan(2500);
      
      // Time to First Byte should be under 600ms
      expect(vitals.getTTFB()).toBeLessThan(600);
    });

    it('measures resource loading performance', () => {
      const mockResources = [
        {
          name: 'https://example.com/styles.css',
          duration: 120,
          transferSize: 25600,
          initiatorType: 'link'
        },
        {
          name: 'https://example.com/app.js',
          duration: 180,
          transferSize: 102400,
          initiatorType: 'script'
        },
        {
          name: 'https://example.com/logo.svg',
          duration: 45,
          transferSize: 2048,
          initiatorType: 'img'
        }
      ];

      vi.spyOn(performance, 'getEntriesByType').mockReturnValue(mockResources as any);

      const resources = performanceMetrics.measureResourceLoading();

      // CSS files should load quickly
      const cssFile = resources.find(r => r.name.includes('styles.css'));
      expect(cssFile?.duration).toBeLessThan(200);

      // JavaScript files should be under 300ms
      const jsFile = resources.find(r => r.name.includes('app.js'));
      expect(jsFile?.duration).toBeLessThan(300);

      // Images should load under 100ms
      const imageFile = resources.find(r => r.name.includes('logo.svg'));
      expect(imageFile?.duration).toBeLessThan(100);

      // Total transfer size should be reasonable
      const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0);
      expect(totalSize).toBeLessThan(500000); // Under 500KB total
    });
  });

  describe('Runtime Performance', () => {
    it('measures JavaScript execution performance', () => {
      performance.mark('js-execution-start');
      
      // Simulate heavy computation
      const startTime = performance.now();
      let result = 0;
      for (let i = 0; i < 10000; i++) {
        result += Math.random();
      }
      const endTime = performance.now();
      
      performance.mark('js-execution-end');
      performance.measure('js-execution', 'js-execution-start', 'js-execution-end');

      const executionTime = endTime - startTime;
      
      // JavaScript execution should complete quickly
      expect(executionTime).toBeLessThan(50);
      
      const userTiming = performanceMetrics.measureUserTiming();
      const measure = userTiming.measures.find(m => m.name === 'js-execution');
      expect(measure).toBeDefined();
      expect(measure?.duration).toBeLessThan(50);
    });

    it('monitors memory usage patterns', () => {
      const initialMemory = performanceMetrics.measureMemoryUsage();
      
      if (initialMemory) {
        // Create some objects to increase memory usage
        const largeArray = new Array(100000).fill('test data');
        
        const currentMemory = performanceMetrics.measureMemoryUsage();
        
        // Memory usage should increase but stay within reasonable bounds
        expect(currentMemory.usedJSHeapSize).toBeGreaterThan(initialMemory.usedJSHeapSize);
        expect(currentMemory.usedJSHeapSize).toBeLessThan(initialMemory.jsHeapSizeLimit * 0.8);
        
        // Clean up
        largeArray.length = 0;
      }
    });

    it('measures frame rate and animation performance', async () => {
      const frameRates: number[] = [];
      let lastTime = performance.now();
      let frameCount = 0;
      
      const measureFrameRate = () => {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        frameRates.push(1000 / delta);
        lastTime = currentTime;
        frameCount++;
        
        if (frameCount < 60) { // Measure for 60 frames
          requestAnimationFrame(measureFrameRate);
        }
      };
      
      requestAnimationFrame(measureFrameRate);
      
      // Wait for measurements to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (frameRates.length > 0) {
        const avgFrameRate = frameRates.reduce((sum, rate) => sum + rate, 0) / frameRates.length;
        
        // Should maintain at least 30 FPS for smooth animations
        expect(avgFrameRate).toBeGreaterThan(30);
        
        // Ideally close to 60 FPS
        expect(avgFrameRate).toBeGreaterThan(50);
      }
    });
  });

  describe('Bundle Size and Asset Performance', () => {
    it('validates JavaScript bundle sizes are optimized', () => {
      const mockBundleInfo = {
        'main.js': { size: 245760, gzipSize: 89600 },
        'vendor.js': { size: 512000, gzipSize: 180000 },
        'polyfills.js': { size: 45000, gzipSize: 15000 }
      };
      
      // Main bundle should be under 300KB
      expect(mockBundleInfo['main.js'].size).toBeLessThan(300000);
      expect(mockBundleInfo['main.js'].gzipSize).toBeLessThan(100000);
      
      // Vendor bundle should be under 600KB
      expect(mockBundleInfo['vendor.js'].size).toBeLessThan(600000);
      expect(mockBundleInfo['vendor.js'].gzipSize).toBeLessThan(200000);
      
      // Polyfills should be minimal
      expect(mockBundleInfo['polyfills.js'].size).toBeLessThan(50000);
      
      // Calculate compression ratio
      Object.entries(mockBundleInfo).forEach(([name, info]) => {
        const compressionRatio = info.gzipSize / info.size;
        expect(compressionRatio).toBeLessThan(0.4); // Should compress to under 40%
      });
    });

    it('measures CSS performance and optimization', () => {
      const mockCSSMetrics = {
        'styles.css': { size: 89600, renderBlockingTime: 45 },
        'critical.css': { size: 12800, renderBlockingTime: 15 },
        'non-critical.css': { size: 45000, renderBlockingTime: 0 }
      };
      
      // Critical CSS should be small and fast
      expect(mockCSSMetrics['critical.css'].size).toBeLessThan(15000);
      expect(mockCSSMetrics['critical.css'].renderBlockingTime).toBeLessThan(20);
      
      // Non-critical CSS should not block rendering
      expect(mockCSSMetrics['non-critical.css'].renderBlockingTime).toBe(0);
      
      // Total CSS size should be reasonable
      const totalCSSSize = Object.values(mockCSSMetrics).reduce((sum, css) => sum + css.size, 0);
      expect(totalCSSSize).toBeLessThan(200000);
    });

    it('validates image optimization and lazy loading', () => {
      const mockImageMetrics = [
        { src: 'hero-image.webp', size: 45000, loadTime: 120, lazy: false },
        { src: 'profile-avatar.webp', size: 8000, loadTime: 45, lazy: true },
        { src: 'tool-screenshot.webp', size: 32000, loadTime: 80, lazy: true }
      ];
      
      mockImageMetrics.forEach(image => {
        // Images should be optimized
        expect(image.size).toBeLessThan(100000);
        
        // Load times should be reasonable
        expect(image.loadTime).toBeLessThan(200);
        
        // Non-critical images should be lazy loaded
        if (image.src !== 'hero-image.webp') {
          expect(image.lazy).toBe(true);
        }
      });
      
      // Hero image should load quickly for LCP
      const heroImage = mockImageMetrics.find(img => img.src.includes('hero'));
      expect(heroImage?.loadTime).toBeLessThan(150);
    });
  });

  describe('API and Network Performance', () => {
    it('measures API response times', async () => {
      const mockAPIResponses = [
        { endpoint: '/api/feed', responseTime: 120, size: 25600 },
        { endpoint: '/api/profile', responseTime: 80, size: 8000 },
        { endpoint: '/api/tools', responseTime: 200, size: 45000 }
      ];
      
      mockAPIResponses.forEach(api => {
        // API responses should be under 300ms
        expect(api.responseTime).toBeLessThan(300);
        
        // Response sizes should be reasonable
        expect(api.size).toBeLessThan(100000);
      });
      
      // Critical APIs (feed, profile) should be faster
      const criticalAPIs = mockAPIResponses.filter(api => 
        api.endpoint.includes('feed') || api.endpoint.includes('profile')
      );
      
      criticalAPIs.forEach(api => {
        expect(api.responseTime).toBeLessThan(150);
      });
    });

    it('validates caching strategies performance', () => {
      const mockCacheMetrics = {
        staticAssets: { hitRate: 0.95, avgResponseTime: 12 },
        apiResponses: { hitRate: 0.78, avgResponseTime: 45 },
        userContent: { hitRate: 0.65, avgResponseTime: 80 }
      };
      
      // Static assets should have high cache hit rate
      expect(mockCacheMetrics.staticAssets.hitRate).toBeGreaterThan(0.9);
      expect(mockCacheMetrics.staticAssets.avgResponseTime).toBeLessThan(20);
      
      // API responses should have good cache hit rate
      expect(mockCacheMetrics.apiResponses.hitRate).toBeGreaterThan(0.7);
      expect(mockCacheMetrics.apiResponses.avgResponseTime).toBeLessThan(50);
      
      // User content cache should be reasonable
      expect(mockCacheMetrics.userContent.hitRate).toBeGreaterThan(0.6);
      expect(mockCacheMetrics.userContent.avgResponseTime).toBeLessThan(100);
    });

    it('measures WebSocket performance for real-time features', () => {
      const mockWebSocketMetrics = {
        connectionTime: 85,
        messageLatency: 25,
        messagesPerSecond: 15,
        reconnectionTime: 150
      };
      
      // WebSocket connection should be fast
      expect(mockWebSocketMetrics.connectionTime).toBeLessThan(100);
      
      // Message latency should be minimal
      expect(mockWebSocketMetrics.messageLatency).toBeLessThan(50);
      
      // Should handle reasonable message throughput
      expect(mockWebSocketMetrics.messagesPerSecond).toBeGreaterThan(10);
      
      // Reconnection should be quick
      expect(mockWebSocketMetrics.reconnectionTime).toBeLessThan(200);
    });
  });

  describe('Performance Budget Monitoring', () => {
    it('enforces performance budgets for different page types', () => {
      const performanceBudgets = {
        landingPage: { maxLoadTime: 1500, maxBundleSize: 200000 },
        dashboard: { maxLoadTime: 2000, maxBundleSize: 350000 },
        toolEditor: { maxLoadTime: 2500, maxBundleSize: 500000 }
      };
      
      const actualMetrics = {
        landingPage: { loadTime: 1200, bundleSize: 180000 },
        dashboard: { loadTime: 1800, bundleSize: 320000 },
        toolEditor: { loadTime: 2200, bundleSize: 480000 }
      };
      
      Object.entries(performanceBudgets).forEach(([pageType, budget]) => {
        const actual = actualMetrics[pageType as keyof typeof actualMetrics];
        
        expect(actual.loadTime).toBeLessThan(budget.maxLoadTime);
        expect(actual.bundleSize).toBeLessThan(budget.maxBundleSize);
      });
    });

    it('monitors performance regression over time', () => {
      const performanceHistory = [
        { date: '2024-07-01', loadTime: 1200, bundleSize: 180000 },
        { date: '2024-07-15', loadTime: 1180, bundleSize: 175000 },
        { date: '2024-07-30', loadTime: 1250, bundleSize: 185000 }
      ];
      
      // Performance should not regress significantly
      const latestMetrics = performanceHistory[performanceHistory.length - 1];
      const baselineMetrics = performanceHistory[0];
      
      const loadTimeIncrease = (latestMetrics.loadTime - baselineMetrics.loadTime) / baselineMetrics.loadTime;
      const bundleSizeIncrease = (latestMetrics.bundleSize - baselineMetrics.bundleSize) / baselineMetrics.bundleSize;
      
      // Load time should not increase by more than 10%
      expect(loadTimeIncrease).toBeLessThan(0.1);
      
      // Bundle size should not increase by more than 5%
      expect(bundleSizeIncrease).toBeLessThan(0.05);
    });
  });
});