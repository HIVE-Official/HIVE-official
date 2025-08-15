'use client';

/**
 * Mobile Performance Optimizations
 * Battery-efficient patterns and performance monitoring for mobile devices
 */

import { useState, useEffect } from 'react';
import { getNetworkInfo, getBatteryInfo, getDeviceMemory, getHardwareConcurrency } from './mobile-native-features';

export interface PerformanceMetrics {
  deviceMemory: number | null;
  cpuCores: number;
  networkType: string;
  batteryLevel: number | null;
  isLowPowerMode: boolean;
  renderBudget: number; // ms per frame
  shouldReduceAnimations: boolean;
  shouldLazyLoad: boolean;
  shouldPreload: boolean;
}

export class MobilePerformanceManager {
  private metrics: PerformanceMetrics | null = null;
  private observers: PerformanceObserver[] = [];
  private rafId: number | null = null;
  private frameTimings: number[] = [];

  async initialize(): Promise<PerformanceMetrics> {
    const [batteryInfo, networkInfo] = await Promise.all([
      getBatteryInfo(),
      Promise.resolve(getNetworkInfo())
    ]);

    const deviceMemory = getDeviceMemory();
    const cpuCores = getHardwareConcurrency();
    
    // Determine performance budget based on device capabilities
    const isLowEndDevice = (deviceMemory && deviceMemory < 4) || cpuCores < 4;
    const isSlowNetwork = networkInfo?.effectiveType === '2g' || networkInfo?.effectiveType === 'slow-2g';
    const isLowBattery = batteryInfo && batteryInfo.level < 0.2 && !batteryInfo.charging;

    this.metrics = {
      deviceMemory,
      cpuCores,
      networkType: networkInfo?.effectiveType || 'unknown',
      batteryLevel: batteryInfo?.level || null,
      isLowPowerMode: isLowBattery || false,
      renderBudget: isLowEndDevice ? 8 : 16, // Lower budget for low-end devices
      shouldReduceAnimations: isLowEndDevice || isLowBattery || false,
      shouldLazyLoad: isLowEndDevice || isSlowNetwork,
      shouldPreload: !isLowEndDevice && !isSlowNetwork && !isLowBattery
    };

    this.setupPerformanceMonitoring();
    return this.metrics;
  }

  getMetrics(): PerformanceMetrics | null {
    return this.metrics;
  }

  // Frame rate monitoring
  private setupPerformanceMonitoring(): void {
    // Monitor frame timing
    this.startFrameMonitoring();

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) { // Tasks longer than 50ms
              this.handleLongTask(entry);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      } catch (e) {
        // Long task API not supported
      }

      // Monitor memory usage
      try {
        const memoryObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.handleMemoryPressure(entry);
          }
        });
        memoryObserver.observe({ entryTypes: ['memory'] });
        this.observers.push(memoryObserver);
      } catch (e) {
        // Memory API not supported
      }
    }
  }

  private startFrameMonitoring(): void {
    let lastTime = performance.now();
    
    const measureFrame = (currentTime: number) => {
      const frameDuration = currentTime - lastTime;
      this.frameTimings.push(frameDuration);
      
      // Keep only last 60 frames
      if (this.frameTimings.length > 60) {
        this.frameTimings.shift();
      }
      
      lastTime = currentTime;
      this.rafId = requestAnimationFrame(measureFrame);
    };
    
    this.rafId = requestAnimationFrame(measureFrame);
  }

  private handleLongTask(entry: PerformanceEntry): void {
    console.warn('Long task detected:', {
      name: entry.name,
      duration: entry.duration,
      startTime: entry.startTime
    });

    // Automatically reduce performance budget if long tasks are frequent
    if (this.metrics) {
      this.metrics.renderBudget = Math.max(4, this.metrics.renderBudget - 1);
      this.metrics.shouldReduceAnimations = true;
    }
  }

  private handleMemoryPressure(entry: PerformanceEntry): void {
    console.warn('Memory pressure detected:', entry);
    
    if (this.metrics) {
      this.metrics.shouldLazyLoad = true;
      this.metrics.shouldPreload = false;
    }
  }

  // Get current frame rate
  getAverageFrameRate(): number {
    if (this.frameTimings.length < 10) return 60; // Assume 60fps initially
    
    const averageFrameTime = this.frameTimings.reduce((sum, time) => sum + time, 0) / this.frameTimings.length;
    return Math.min(60, 1000 / averageFrameTime);
  }

  // Check if we should reduce visual complexity
  shouldReduceComplexity(): boolean {
    if (!this.metrics) return false;
    
    const currentFps = this.getAverageFrameRate();
    return currentFps < 30 || this.metrics.isLowPowerMode || this.metrics.shouldReduceAnimations;
  }

  // Adaptive image loading based on device capabilities
  getOptimalImageQuality(): number {
    if (!this.metrics) return 0.8;
    
    if (this.metrics.isLowPowerMode) return 0.5;
    if (this.metrics.deviceMemory && this.metrics.deviceMemory < 2) return 0.6;
    if (this.metrics.networkType === '2g' || this.metrics.networkType === 'slow-2g') return 0.4;
    
    return 0.8;
  }

  // Get optimal lazy loading threshold
  getLazyLoadThreshold(): string {
    if (!this.metrics) return '100px';
    
    if (this.metrics.networkType === '4g' && !this.metrics.isLowPowerMode) return '300px';
    if (this.metrics.networkType === '3g') return '200px';
    
    return '100px';
  }

  // Cleanup
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    this.frameTimings = [];
  }
}

// React hook for mobile performance
export function useMobilePerformance() {
  const [performanceManager] = useState(() => new MobilePerformanceManager());
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    performanceManager.initialize().then((initialMetrics) => {
      if (mounted) {
        setMetrics(initialMetrics);
        setIsInitialized(true);
      }
    });

    return () => {
      mounted = false;
      performanceManager.destroy();
    };
  }, [performanceManager]);

  return {
    metrics,
    isInitialized,
    shouldReduceComplexity: () => performanceManager.shouldReduceComplexity(),
    getOptimalImageQuality: () => performanceManager.getOptimalImageQuality(),
    getLazyLoadThreshold: () => performanceManager.getLazyLoadThreshold(),
    getAverageFrameRate: () => performanceManager.getAverageFrameRate()
  };
}

// Battery-efficient animation utilities
export class BatteryEfficientAnimations {
  static shouldAnimate(batteryLevel: number | null, isCharging: boolean): boolean {
    if (batteryLevel === null) return true; // Unknown battery state, assume OK
    if (isCharging) return true; // Charging, animations OK
    
    return batteryLevel > 0.15; // Only animate if battery > 15%
  }

  static getAnimationDuration(baseDuration: number, batteryLevel: number | null): number {
    if (batteryLevel === null) return baseDuration;
    if (batteryLevel < 0.2) return baseDuration * 0.5; // 50% faster when low battery
    if (batteryLevel < 0.5) return baseDuration * 0.75; // 25% faster when medium battery
    
    return baseDuration;
  }

  static shouldUseGPU(deviceMemory: number | null): boolean {
    if (deviceMemory === null) return true; // Unknown, assume GPU OK
    return deviceMemory >= 2; // Only use GPU acceleration on devices with 2GB+ RAM
  }
}

// Memory pressure detection
export class MemoryManager {
  private static readonly MEMORY_THRESHOLD = 0.8; // 80% of available memory

  static async checkMemoryPressure(): Promise<boolean> {
    try {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        const usedRatio = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
        return usedRatio > this.MEMORY_THRESHOLD;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  static async freeMemory(): Promise<void> {
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc && typeof window.gc === 'function') {
      window.gc();
    }

    // Clear any cached images
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => 
            cacheName.includes('images') ? caches.delete(cacheName) : Promise.resolve()
          )
        );
      } catch (e) {
        // Cache API not available
      }
    }
  }
}

// Network-aware loading
export class AdaptiveLoader {
  static shouldPreloadImages(networkInfo: any, batteryLevel: number | null): boolean {
    if (batteryLevel && batteryLevel < 0.3) return false; // Low battery
    if (!networkInfo) return true; // Unknown network, assume good
    
    return networkInfo.effectiveType === '4g' && networkInfo.downlink > 1.5;
  }

  static getImageLoadingStrategy(networkInfo: any): 'eager' | 'lazy' {
    if (!networkInfo) return 'lazy'; // Unknown network, be conservative
    
    const isSlowNetwork = networkInfo.effectiveType === '2g' || 
                          networkInfo.effectiveType === 'slow-2g' ||
                          networkInfo.downlink < 0.5;
                          
    return isSlowNetwork ? 'lazy' : 'eager';
  }

  static getOptimalChunkSize(networkInfo: any): number {
    if (!networkInfo) return 50; // Conservative default
    
    switch (networkInfo.effectiveType) {
      case '4g':
        return 100;
      case '3g':
        return 75;
      case '2g':
      case 'slow-2g':
        return 25;
      default:
        return 50;
    }
  }
}

// Performance budget utilities
export class PerformanceBudget {
  private static readonly BUDGETS = {
    highEnd: { js: 170, css: 75, images: 1712 }, // KB
    midRange: { js: 130, css: 50, images: 1000 }, // KB  
    lowEnd: { js: 65, css: 25, images: 500 } // KB
  };

  static getBudget(deviceMemory: number | null, cpuCores: number): typeof PerformanceBudget.BUDGETS.highEnd {
    if (deviceMemory && deviceMemory >= 4 && cpuCores >= 4) {
      return this.BUDGETS.highEnd;
    } else if (deviceMemory && deviceMemory >= 2 && cpuCores >= 2) {
      return this.BUDGETS.midRange;
    } else {
      return this.BUDGETS.lowEnd;
    }
  }

  static checkBudget(bundleSize: number, budget: number): boolean {
    return bundleSize <= budget;
  }
}

// Export performance manager singleton
export const mobilePerformanceManager = new MobilePerformanceManager();