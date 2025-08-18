'use client';
/**
 * Mobile Performance Optimizations
 * Battery-efficient patterns and performance monitoring for mobile devices
 */
import { useState, useEffect } from 'react';
import { getNetworkInfo, getBatteryInfo, getDeviceMemory, getHardwareConcurrency } from './mobile-native-features';
export class MobilePerformanceManager {
    constructor() {
        this.metrics = null;
        this.observers = [];
        this.rafId = null;
        this.frameTimings = [];
    }
    async initialize() {
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
    getMetrics() {
        return this.metrics;
    }
    // Frame rate monitoring
    setupPerformanceMonitoring() {
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
            }
            catch (e) {
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
            }
            catch (e) {
                // Memory API not supported
            }
        }
    }
    startFrameMonitoring() {
        let lastTime = performance.now();
        const measureFrame = (currentTime) => {
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
    handleLongTask(entry) {
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
    handleMemoryPressure(entry) {
        console.warn('Memory pressure detected:', entry);
        if (this.metrics) {
            this.metrics.shouldLazyLoad = true;
            this.metrics.shouldPreload = false;
        }
    }
    // Get current frame rate
    getAverageFrameRate() {
        if (this.frameTimings.length < 10)
            return 60; // Assume 60fps initially
        const averageFrameTime = this.frameTimings.reduce((sum, time) => sum + time, 0) / this.frameTimings.length;
        return Math.min(60, 1000 / averageFrameTime);
    }
    // Check if we should reduce visual complexity
    shouldReduceComplexity() {
        if (!this.metrics)
            return false;
        const currentFps = this.getAverageFrameRate();
        return currentFps < 30 || this.metrics.isLowPowerMode || this.metrics.shouldReduceAnimations;
    }
    // Adaptive image loading based on device capabilities
    getOptimalImageQuality() {
        if (!this.metrics)
            return 0.8;
        if (this.metrics.isLowPowerMode)
            return 0.5;
        if (this.metrics.deviceMemory && this.metrics.deviceMemory < 2)
            return 0.6;
        if (this.metrics.networkType === '2g' || this.metrics.networkType === 'slow-2g')
            return 0.4;
        return 0.8;
    }
    // Get optimal lazy loading threshold
    getLazyLoadThreshold() {
        if (!this.metrics)
            return '100px';
        if (this.metrics.networkType === '4g' && !this.metrics.isLowPowerMode)
            return '300px';
        if (this.metrics.networkType === '3g')
            return '200px';
        return '100px';
    }
    // Cleanup
    destroy() {
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
    const [metrics, setMetrics] = useState(null);
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
    static shouldAnimate(batteryLevel, isCharging) {
        if (batteryLevel === null)
            return true; // Unknown battery state, assume OK
        if (isCharging)
            return true; // Charging, animations OK
        return batteryLevel > 0.15; // Only animate if battery > 15%
    }
    static getAnimationDuration(baseDuration, batteryLevel) {
        if (batteryLevel === null)
            return baseDuration;
        if (batteryLevel < 0.2)
            return baseDuration * 0.5; // 50% faster when low battery
        if (batteryLevel < 0.5)
            return baseDuration * 0.75; // 25% faster when medium battery
        return baseDuration;
    }
    static shouldUseGPU(deviceMemory) {
        if (deviceMemory === null)
            return true; // Unknown, assume GPU OK
        return deviceMemory >= 2; // Only use GPU acceleration on devices with 2GB+ RAM
    }
}
// Memory pressure detection
export class MemoryManager {
    static async checkMemoryPressure() {
        try {
            if ('memory' in performance) {
                const memInfo = performance.memory;
                const usedRatio = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
                return usedRatio > this.MEMORY_THRESHOLD;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    static async freeMemory() {
        // Force garbage collection if available (Chrome DevTools)
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
        }
        // Clear any cached images
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(cacheName => cacheName.includes('images') ? caches.delete(cacheName) : Promise.resolve()));
            }
            catch (e) {
                // Cache API not available
            }
        }
    }
}
MemoryManager.MEMORY_THRESHOLD = 0.8; // 80% of available memory
// Network-aware loading
export class AdaptiveLoader {
    static shouldPreloadImages(networkInfo, batteryLevel) {
        if (batteryLevel && batteryLevel < 0.3)
            return false; // Low battery
        if (!networkInfo)
            return true; // Unknown network, assume good
        return networkInfo.effectiveType === '4g' && networkInfo.downlink > 1.5;
    }
    static getImageLoadingStrategy(networkInfo) {
        if (!networkInfo)
            return 'lazy'; // Unknown network, be conservative
        const isSlowNetwork = networkInfo.effectiveType === '2g' ||
            networkInfo.effectiveType === 'slow-2g' ||
            networkInfo.downlink < 0.5;
        return isSlowNetwork ? 'lazy' : 'eager';
    }
    static getOptimalChunkSize(networkInfo) {
        if (!networkInfo)
            return 50; // Conservative default
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
    static getBudget(deviceMemory, cpuCores) {
        if (deviceMemory && deviceMemory >= 4 && cpuCores >= 4) {
            return this.BUDGETS.highEnd;
        }
        else if (deviceMemory && deviceMemory >= 2 && cpuCores >= 2) {
            return this.BUDGETS.midRange;
        }
        else {
            return this.BUDGETS.lowEnd;
        }
    }
    static checkBudget(bundleSize, budget) {
        return bundleSize <= budget;
    }
}
PerformanceBudget.BUDGETS = {
    highEnd: { js: 170, css: 75, images: 1712 }, // KB
    midRange: { js: 130, css: 50, images: 1000 }, // KB  
    lowEnd: { js: 65, css: 25, images: 500 } // KB
};
// Export performance manager singleton
export const mobilePerformanceManager = new MobilePerformanceManager();
//# sourceMappingURL=mobile-performance.js.map