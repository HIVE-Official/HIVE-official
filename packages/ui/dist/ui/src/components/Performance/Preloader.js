'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';
// Advanced preload manager with campus intelligence
class CampusPreloadManager {
    constructor() {
        this.loadedResources = new Map();
        this.loadingPromises = new Map();
        this.loadStats = {
            totalResources: 0,
            loadedSuccessfully: 0,
            failedLoads: 0,
            totalSizeLoaded: 0,
            totalLoadTime: 0,
            averageLoadTime: 0,
            cacheHitRate: 0,
            networkSavings: 0
        };
        this.bandwidthMonitor = {
            samples: [],
            currentEstimate: 0
        };
    }
    static getInstance() {
        if (!CampusPreloadManager.instance) {
            CampusPreloadManager.instance = new CampusPreloadManager();
        }
        return CampusPreloadManager.instance;
    }
    // Intelligent resource prioritization based on campus context
    prioritizeResources(resources, campusContext, userContext) {
        return resources
            .filter(resource => this.shouldLoadResource(resource, campusContext, userContext))
            .sort((a, b) => {
            // Priority order
            const priorityOrder = { critical: 5, high: 4, medium: 3, low: 2, background: 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            // Secondary sort by user preference
            if (userContext) {
                const aPreferred = userContext.preferredFeatures.includes(a.type) ? 1 : 0;
                const bPreferred = userContext.preferredFeatures.includes(b.type) ? 1 : 0;
                if (aPreferred !== bPreferred)
                    return bPreferred - aPreferred;
            }
            // Tertiary sort by estimated load time (faster first)
            return a.estimatedLoadTime - b.estimatedLoadTime;
        });
    }
    // Check if resource should be loaded given current conditions
    shouldLoadResource(resource, campusContext, userContext) {
        const conditions = resource.loadConditions;
        if (!conditions)
            return true;
        // Network quality check
        if (conditions.minNetworkQuality && campusContext) {
            const qualityOrder = { fair: 1, good: 2, excellent: 3 };
            if (qualityOrder[campusContext.networkQuality] < qualityOrder[conditions.minNetworkQuality]) {
                return false;
            }
        }
        // Campus load check
        if (conditions.maxCampusLoad && campusContext) {
            const loadOrder = { medium: 1, high: 2, peak: 3 };
            if (loadOrder[campusContext.campusLoad] > loadOrder[conditions.maxCampusLoad]) {
                return false;
            }
        }
        // User type check
        if (conditions.userTypes && userContext) {
            if (!conditions.userTypes.includes(userContext.userType)) {
                return false;
            }
        }
        // Time restrictions
        if (conditions.timeRestrictions) {
            const currentHour = new Date().getHours();
            if (!conditions.timeRestrictions.includes(currentHour)) {
                return false;
            }
        }
        return true;
    }
    // Load resource with intelligent strategy selection
    async loadResource(resource, campusContext) {
        // Check if already loaded
        if (this.loadedResources.has(resource.id)) {
            this.loadStats.cacheHitRate++;
            return this.loadedResources.get(resource.id);
        }
        // Check if currently loading
        if (this.loadingPromises.has(resource.id)) {
            return this.loadingPromises.get(resource.id);
        }
        const startTime = performance.now();
        // Select loading strategy based on resource type and campus context
        const strategy = this.selectLoadingStrategy(resource, campusContext);
        const loadingPromise = this.executeLoadingStrategy(resource, strategy, campusContext);
        this.loadingPromises.set(resource.id, loadingPromise);
        try {
            const result = await loadingPromise;
            const loadTime = performance.now() - startTime;
            // Update statistics
            this.loadStats.loadedSuccessfully++;
            this.loadStats.totalSizeLoaded += resource.estimatedSize;
            this.loadStats.totalLoadTime += loadTime;
            this.loadStats.averageLoadTime = this.loadStats.totalLoadTime / this.loadStats.loadedSuccessfully;
            // Cache result
            this.loadedResources.set(resource.id, result);
            // Update bandwidth estimate
            this.updateBandwidthEstimate(resource.estimatedSize, loadTime);
            return result;
        }
        catch (error) {
            this.loadStats.failedLoads++;
            throw error;
        }
        finally {
            this.loadingPromises.delete(resource.id);
        }
    }
    // Select optimal loading strategy
    selectLoadingStrategy(resource, campusContext) {
        // Default to prefetch for most resources
        let strategy = 'prefetch';
        // Critical resources should be preloaded
        if (resource.priority === 'critical') {
            strategy = 'preload';
        }
        // Large resources or poor network should use background fetch
        if (resource.estimatedSize > 500 || campusContext?.networkQuality === 'poor') {
            strategy = 'backgroundFetch';
        }
        // During peak campus hours, defer non-critical resources
        if (campusContext?.campusLoad === 'peak' && resource.priority !== 'critical') {
            strategy = 'lazy';
        }
        return strategy;
    }
    // Execute the selected loading strategy
    async executeLoadingStrategy(resource, strategy, campusContext) {
        switch (strategy) {
            case 'preload':
                return this.preloadResource(resource);
            case 'prefetch':
                return this.prefetchResource(resource);
            case 'backgroundFetch':
                return this.backgroundFetchResource(resource);
            case 'lazy':
                return this.lazyLoadResource(resource);
            case 'cache':
                return this.cacheResource(resource);
            default:
                return this.prefetchResource(resource);
        }
    }
    // Implement different loading strategies
    async preloadResource(resource) {
        if (resource.url) {
            // Create preload link
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.url;
            link.as = this.getResourceAs(resource.type);
            document.head.appendChild(link);
            // Fetch the resource
            const response = await fetch(resource.url);
            return await this.processResponse(response, resource);
        }
        return resource.data;
    }
    async prefetchResource(resource) {
        if (resource.url) {
            // Create prefetch link
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource.url;
            document.head.appendChild(link);
            // Return immediately for prefetch
            return new Promise(resolve => {
                link.onload = () => resolve(resource.data || resource.url);
                link.onerror = () => resolve(null);
            });
        }
        return resource.data;
    }
    async backgroundFetchResource(resource) {
        // Use requestIdleCallback for background loading
        return new Promise((resolve, reject) => {
            const loadInBackground = async () => {
                try {
                    if (resource.url) {
                        const response = await fetch(resource.url);
                        const result = await this.processResponse(response, resource);
                        resolve(result);
                    }
                    else {
                        resolve(resource.data);
                    }
                }
                catch (error) {
                    reject(error);
                }
            };
            if ('requestIdleCallback' in window) {
                requestIdleCallback(loadInBackground);
            }
            else {
                setTimeout(loadInBackground, 100);
            }
        });
    }
    async lazyLoadResource(resource) {
        // Lazy load - just return a promise that resolves immediately
        return resource.data || resource.url;
    }
    async cacheResource(resource) {
        // Try to load from cache first
        const cached = localStorage.getItem(`preload_${resource.id}`);
        if (cached) {
            return JSON.parse(cached);
        }
        // Load and cache
        if (resource.url) {
            const response = await fetch(resource.url);
            const result = await this.processResponse(response, resource);
            // Cache the result
            localStorage.setItem(`preload_${resource.id}`, JSON.stringify(result));
            return result;
        }
        return resource.data;
    }
    getResourceAs(type) {
        const typeMap = {
            'critical-css': 'style',
            'hero-images': 'image',
            'fonts': 'font',
            'icons': 'image',
            'profile-data': 'fetch',
            'feed-content': 'fetch',
            'tools-data': 'fetch',
            'spaces-data': 'fetch',
            'analytics-data': 'fetch',
            'background-data': 'fetch',
            'prefetch-routes': 'script',
            'media-assets': 'video'
        };
        return typeMap[type] || 'fetch';
    }
    async processResponse(response, resource) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return await response.json();
        }
        else if (contentType.includes('text/')) {
            return await response.text();
        }
        else {
            return await response.blob();
        }
    }
    updateBandwidthEstimate(sizeKB, loadTimeMs) {
        const speedKbps = (sizeKB * 8) / (loadTimeMs / 1000);
        this.bandwidthMonitor.samples.push(speedKbps);
        // Keep only recent samples
        if (this.bandwidthMonitor.samples.length > 10) {
            this.bandwidthMonitor.samples.shift();
        }
        // Calculate rolling average
        this.bandwidthMonitor.currentEstimate =
            this.bandwidthMonitor.samples.reduce((a, b) => a + b, 0) /
                this.bandwidthMonitor.samples.length;
    }
    getStats() {
        return { ...this.loadStats };
    }
    getBandwidthEstimate() {
        return this.bandwidthMonitor.currentEstimate;
    }
}
export const Preloader = ({ resources, campusContext, userContext, enableIntelligentPreloading = true, enableCampusOptimization = true, enableUserPersonalization = true, maxConcurrentLoads = 3, maxTotalSize = 10, // MB
maxLoadTime = 30000, // 30 seconds
onResourceLoaded, onResourceFailed, onLoadingComplete, onBudgetExceeded, enableAnalytics = true, className }) => {
    const viewport = useAdvancedViewport();
    const [loadingStats, setLoadingStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const preloadManager = CampusPreloadManager.getInstance();
    const loadingStartTime = useRef(0);
    // Main preloading effect
    useEffect(() => {
        const executePreloading = async () => {
            if (resources.length === 0)
                return;
            setIsLoading(true);
            loadingStartTime.current = performance.now();
            // Prioritize resources based on context
            const prioritizedResources = enableIntelligentPreloading
                ? preloadManager.prioritizeResources(resources, campusContext, userContext)
                : resources;
            // Apply size and time limits
            let totalSize = 0;
            const filteredResources = prioritizedResources.filter(resource => {
                if (totalSize + resource.estimatedSize > maxTotalSize * 1024) {
                    onBudgetExceeded?.(resource);
                    return false;
                }
                totalSize += resource.estimatedSize;
                return true;
            });
            // Load resources with concurrency limit
            const semaphore = new Array(maxConcurrentLoads).fill(null);
            let currentIndex = 0;
            const loadNext = async () => {
                if (currentIndex >= filteredResources.length)
                    return;
                const resource = filteredResources[currentIndex++];
                try {
                    await preloadManager.loadResource(resource, campusContext);
                    onResourceLoaded?.(resource);
                }
                catch (error) {
                    onResourceFailed?.(resource, error);
                }
                // Load next resource
                return loadNext();
            };
            // Start concurrent loading
            await Promise.all(semaphore.map(() => loadNext()));
            // Update final stats
            const finalStats = preloadManager.getStats();
            setLoadingStats(finalStats);
            setIsLoading(false);
            onLoadingComplete?.(finalStats);
        };
        executePreloading();
    }, [resources, campusContext, userContext, enableIntelligentPreloading]);
    // Don't render anything - this is a background process
    if (!enableAnalytics && process.env.NODE_ENV !== 'development') {
        return null;
    }
    return (_jsx(_Fragment, { children: process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "fixed top-4 right-4 bg-black/90 text-white text-xs p-3 rounded-lg font-mono z-50 max-w-sm", children: [_jsx("div", { className: "font-semibold mb-2", children: "Preloader Debug" }), _jsxs("div", { children: ["Status: ", isLoading ? 'Loading...' : 'Complete'] }), loadingStats && (_jsxs(_Fragment, { children: [_jsxs("div", { children: ["Loaded: ", loadingStats.loadedSuccessfully, "/", loadingStats.totalResources] }), _jsxs("div", { children: ["Failed: ", loadingStats.failedLoads] }), _jsxs("div", { children: ["Size: ", Math.round(loadingStats.totalSizeLoaded), "KB"] }), _jsxs("div", { children: ["Avg Time: ", Math.round(loadingStats.averageLoadTime), "ms"] }), _jsxs("div", { children: ["Cache Hit: ", Math.round(loadingStats.cacheHitRate), "%"] })] })), _jsxs("div", { children: ["Bandwidth: ", Math.round(preloadManager.getBandwidthEstimate()), "Kbps"] }), _jsxs("div", { children: ["Network: ", campusContext?.networkQuality || 'unknown'] }), _jsxs("div", { children: ["Campus Load: ", campusContext?.campusLoad || 'unknown'] })] })) }));
};
// Utility function to create preload resources
export function createPreloadResource(id, type, options) {
    return {
        id,
        type,
        priority: 'medium',
        estimatedSize: 50, // KB
        estimatedLoadTime: 1000, // ms
        strategy: {
            prefetch: true
        },
        campusOptimizations: {
            skipOnSlowNetwork: false,
            compressForMobile: true,
            deferDuringPeakHours: false,
            enableOfflineCache: false
        },
        ...options
    };
}
export { CampusPreloadManager };
//# sourceMappingURL=Preloader.js.map