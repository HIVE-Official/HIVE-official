'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';

// Resource types for strategic preloading
type ResourceType = 
  | 'critical-css'     // Above-the-fold styles
  | 'hero-images'      // First-view images
  | 'fonts'           // Typography assets
  | 'icons'           // UI icons and graphics
  | 'profile-data'    // User profile information
  | 'feed-content'    // Social feed data
  | 'tools-data'      // User's tools and creations
  | 'spaces-data'     // Community spaces
  | 'analytics-data'  // Dashboard insights
  | 'background-data' // Non-critical background data
  | 'prefetch-routes' // Next likely page components
  | 'media-assets';   // Videos, large images

// Campus network context for intelligent preloading
interface CampusPreloadContext {
  networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
  campusLoad: 'low' | 'medium' | 'high' | 'peak';
  connectionType: 'wifi' | 'cellular' | 'ethernet' | 'unknown';
  bandwidthEstimate?: number; // Mbps
  isDataSaverEnabled?: boolean;
}

// User context for personalized preloading
interface UserPreloadContext {
  userId: string;
  userType: 'student' | 'faculty' | 'admin';
  usagePattern: 'heavy' | 'moderate' | 'light';
  preferredFeatures: ResourceType[];
  recentActivity: {
    spaces: string[];
    tools: string[];
    lastActiveTime: Date;
  };
  devicePreferences: {
    preferHighQuality: boolean;
    enableBackgroundSync: boolean;
    maxPreloadSize: number; // MB
  };
}

// Preload resource definition
interface PreloadResource {
  id: string;
  type: ResourceType;
  url?: string;
  data?: any;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'background';
  
  // Size and timing
  estimatedSize: number; // KB
  estimatedLoadTime: number; // ms
  expiryTime?: number; // ms from load time
  
  // Conditions
  loadConditions?: {
    minNetworkQuality?: 'fair' | 'good' | 'excellent';
    maxCampusLoad?: 'medium' | 'high' | 'peak';
    userTypes?: ('student' | 'faculty' | 'admin')[];
    timeRestrictions?: number[]; // Hours when this should load
    deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
  };
  
  // Dependencies
  dependencies?: string[]; // Resource IDs this depends on
  provides?: string[]; // What this resource enables
  
  // Campus-specific optimizations
  campusOptimizations?: {
    skipOnSlowNetwork: boolean;
    compressForMobile: boolean;
    deferDuringPeakHours: boolean;
    enableOfflineCache: boolean;
  };
  
  // Loading strategy
  strategy?: {
    prefetch?: boolean;     // Use <link rel="prefetch">
    preload?: boolean;      // Use <link rel="preload">
    backgroundFetch?: boolean; // Fetch in service worker
    lazy?: boolean;         // Load on demand
    cache?: boolean;        // Cache in browser storage
  };
}

interface PreloaderProps {
  resources: PreloadResource[];
  campusContext?: CampusPreloadContext;
  userContext?: UserPreloadContext;
  
  // Configuration
  enableIntelligentPreloading?: boolean;
  enableCampusOptimization?: boolean;
  enableUserPersonalization?: boolean;
  
  // Performance limits
  maxConcurrentLoads?: number;
  maxTotalSize?: number; // MB
  maxLoadTime?: number; // ms
  
  // Callbacks
  onResourceLoaded?: (resource: PreloadResource) => void;
  onResourceFailed?: (resource: PreloadResource, error: Error) => void;
  onLoadingComplete?: (stats: PreloadStats) => void;
  onBudgetExceeded?: (resource: PreloadResource) => void;
  
  // Analytics
  enableAnalytics?: boolean;
  
  className?: string;
}

// Preloading statistics
interface PreloadStats {
  totalResources: number;
  loadedSuccessfully: number;
  failedLoads: number;
  totalSizeLoaded: number; // KB
  totalLoadTime: number; // ms
  averageLoadTime: number; // ms
  cacheHitRate: number; // percentage
  networkSavings: number; // KB saved through optimization
}

// Advanced preload manager with campus intelligence
class CampusPreloadManager {
  private static instance: CampusPreloadManager;
  private loadedResources = new Map<string, any>();
  private loadingPromises = new Map<string, Promise<any>>();
  private loadStats: PreloadStats = {
    totalResources: 0,
    loadedSuccessfully: 0,
    failedLoads: 0,
    totalSizeLoaded: 0,
    totalLoadTime: 0,
    averageLoadTime: 0,
    cacheHitRate: 0,
    networkSavings: 0
  };
  
  private bandwidthMonitor: {
    samples: number[];
    currentEstimate: number;
  } = {
    samples: [],
    currentEstimate: 0
  };
  
  static getInstance(): CampusPreloadManager {
    if (!CampusPreloadManager.instance) {
      CampusPreloadManager.instance = new CampusPreloadManager();
    }
    return CampusPreloadManager.instance;
  }
  
  // Intelligent resource prioritization based on campus context
  prioritizeResources(
    resources: PreloadResource[],
    campusContext?: CampusPreloadContext,
    userContext?: UserPreloadContext
  ): PreloadResource[] {
    return resources
      .filter(resource => this.shouldLoadResource(resource, campusContext, userContext))
      .sort((a, b) => {
        // Priority order
        const priorityOrder = { critical: 5, high: 4, medium: 3, low: 2, background: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        
        if (priorityDiff !== 0) return priorityDiff;
        
        // Secondary sort by user preference
        if (userContext) {
          const aPreferred = userContext.preferredFeatures.includes(a.type) ? 1 : 0;
          const bPreferred = userContext.preferredFeatures.includes(b.type) ? 1 : 0;
          if (aPreferred !== bPreferred) return bPreferred - aPreferred;
        }
        
        // Tertiary sort by estimated load time (faster first)
        return a.estimatedLoadTime - b.estimatedLoadTime;
      });
  }
  
  // Check if resource should be loaded given current conditions
  private shouldLoadResource(
    resource: PreloadResource,
    campusContext?: CampusPreloadContext,
    userContext?: UserPreloadContext
  ): boolean {
    const conditions = resource.loadConditions;
    if (!conditions) return true;
    
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
  async loadResource(
    resource: PreloadResource,
    campusContext?: CampusPreloadContext
  ): Promise<any> {
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
      
    } catch (error) {
      this.loadStats.failedLoads++;
      throw error;
    } finally {
      this.loadingPromises.delete(resource.id);
    }
  }
  
  // Select optimal loading strategy
  private selectLoadingStrategy(
    resource: PreloadResource,
    campusContext?: CampusPreloadContext
  ): keyof PreloadResource['strategy'] {
    // Default to prefetch for most resources
    let strategy: keyof PreloadResource['strategy'] = 'prefetch';
    
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
  private async executeLoadingStrategy(
    resource: PreloadResource,
    strategy: keyof PreloadResource['strategy'],
    campusContext?: CampusPreloadContext
  ): Promise<any> {
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
  private async preloadResource(resource: PreloadResource): Promise<any> {
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
  
  private async prefetchResource(resource: PreloadResource): Promise<any> {
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
  
  private async backgroundFetchResource(resource: PreloadResource): Promise<any> {
    // Use requestIdleCallback for background loading
    return new Promise((resolve, reject) => {
      const loadInBackground = async () => {
        try {
          if (resource.url) {
            const response = await fetch(resource.url);
            const result = await this.processResponse(response, resource);
            resolve(result);
          } else {
            resolve(resource.data);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadInBackground);
      } else {
        setTimeout(loadInBackground, 100);
      }
    });
  }
  
  private async lazyLoadResource(resource: PreloadResource): Promise<any> {
    // Lazy load - just return a promise that resolves immediately
    return resource.data || resource.url;
  }
  
  private async cacheResource(resource: PreloadResource): Promise<any> {
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
  
  private getResourceAs(type: ResourceType): string {
    const typeMap: Record<ResourceType, string> = {
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
  
  private async processResponse(response: Response, resource: PreloadResource): Promise<any> {
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType.includes('text/')) {
      return await response.text();
    } else {
      return await response.blob();
    }
  }
  
  private updateBandwidthEstimate(sizeKB: number, loadTimeMs: number) {
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
  
  getStats(): PreloadStats {
    return { ...this.loadStats };
  }
  
  getBandwidthEstimate(): number {
    return this.bandwidthMonitor.currentEstimate;
  }
}

export const Preloader: React.FC<PreloaderProps> = ({
  resources,
  campusContext,
  userContext,
  enableIntelligentPreloading = true,
  enableCampusOptimization = true,
  enableUserPersonalization = true,
  maxConcurrentLoads = 3,
  maxTotalSize = 10, // MB
  maxLoadTime = 30000, // 30 seconds
  onResourceLoaded,
  onResourceFailed,
  onLoadingComplete,
  onBudgetExceeded,
  enableAnalytics = true,
  className
}) => {
  const viewport = useAdvancedViewport();
  const [loadingStats, setLoadingStats] = useState<PreloadStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const preloadManager = CampusPreloadManager.getInstance();
  const loadingStartTime = useRef<number>(0);
  
  // Main preloading effect
  useEffect(() => {
    const executePreloading = async () => {
      if (resources.length === 0) return;
      
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
      
      const loadNext = async (): Promise<void> => {
        if (currentIndex >= filteredResources.length) return;
        
        const resource = filteredResources[currentIndex++];
        
        try {
          await preloadManager.loadResource(resource, campusContext);
          onResourceLoaded?.(resource);
        } catch (error) {
          onResourceFailed?.(resource, error as Error);
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
  
  return (
    <>
      {/* Development debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/90 text-white text-xs p-3 rounded-lg font-mono z-50 max-w-sm">
          <div className="font-semibold mb-2">Preloader Debug</div>
          <div>Status: {isLoading ? 'Loading...' : 'Complete'}</div>
          {loadingStats && (
            <>
              <div>Loaded: {loadingStats.loadedSuccessfully}/{loadingStats.totalResources}</div>
              <div>Failed: {loadingStats.failedLoads}</div>
              <div>Size: {Math.round(loadingStats.totalSizeLoaded)}KB</div>
              <div>Avg Time: {Math.round(loadingStats.averageLoadTime)}ms</div>
              <div>Cache Hit: {Math.round(loadingStats.cacheHitRate)}%</div>
            </>
          )}
          <div>Bandwidth: {Math.round(preloadManager.getBandwidthEstimate())}Kbps</div>
          <div>Network: {campusContext?.networkQuality || 'unknown'}</div>
          <div>Campus Load: {campusContext?.campusLoad || 'unknown'}</div>
        </div>
      )}
    </>
  );
};

// Utility function to create preload resources
export function createPreloadResource(
  id: string,
  type: ResourceType,
  options: Partial<Omit<PreloadResource, 'id' | 'type'>>
): PreloadResource {
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
export type {
  PreloaderProps,
  PreloadResource,
  ResourceType,
  CampusPreloadContext,
  UserPreloadContext,
  PreloadStats
};