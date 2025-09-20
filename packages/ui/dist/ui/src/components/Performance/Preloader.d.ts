import React from 'react';
type ResourceType = 'critical-css' | 'hero-images' | 'fonts' | 'icons' | 'profile-data' | 'feed-content' | 'tools-data' | 'spaces-data' | 'analytics-data' | 'background-data' | 'prefetch-routes' | 'media-assets';
interface CampusPreloadContext {
    networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
    campusLoad: 'low' | 'medium' | 'high' | 'peak';
    connectionType: 'wifi' | 'cellular' | 'ethernet' | 'unknown';
    bandwidthEstimate?: number;
    isDataSaverEnabled?: boolean;
}
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
        maxPreloadSize: number;
    };
}
interface PreloadResource {
    id: string;
    type: ResourceType;
    url?: string;
    data?: any;
    priority: 'critical' | 'high' | 'medium' | 'low' | 'background';
    estimatedSize: number;
    estimatedLoadTime: number;
    expiryTime?: number;
    loadConditions?: {
        minNetworkQuality?: 'fair' | 'good' | 'excellent';
        maxCampusLoad?: 'medium' | 'high' | 'peak';
        userTypes?: ('student' | 'faculty' | 'admin')[];
        timeRestrictions?: number[];
        deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
    };
    dependencies?: string[];
    provides?: string[];
    campusOptimizations?: {
        skipOnSlowNetwork: boolean;
        compressForMobile: boolean;
        deferDuringPeakHours: boolean;
        enableOfflineCache: boolean;
    };
    strategy?: {
        prefetch?: boolean;
        preload?: boolean;
        backgroundFetch?: boolean;
        lazy?: boolean;
        cache?: boolean;
    };
}
interface PreloaderProps {
    resources: PreloadResource[];
    campusContext?: CampusPreloadContext;
    userContext?: UserPreloadContext;
    enableIntelligentPreloading?: boolean;
    enableCampusOptimization?: boolean;
    enableUserPersonalization?: boolean;
    maxConcurrentLoads?: number;
    maxTotalSize?: number;
    maxLoadTime?: number;
    onResourceLoaded?: (resource: PreloadResource) => void;
    onResourceFailed?: (resource: PreloadResource, error: Error) => void;
    onLoadingComplete?: (stats: PreloadStats) => void;
    onBudgetExceeded?: (resource: PreloadResource) => void;
    enableAnalytics?: boolean;
    className?: string;
}
interface PreloadStats {
    totalResources: number;
    loadedSuccessfully: number;
    failedLoads: number;
    totalSizeLoaded: number;
    totalLoadTime: number;
    averageLoadTime: number;
    cacheHitRate: number;
    networkSavings: number;
}
declare class CampusPreloadManager {
    private static instance;
    private loadedResources;
    private loadingPromises;
    private loadStats;
    private bandwidthMonitor;
    static getInstance(): CampusPreloadManager;
    prioritizeResources(resources: PreloadResource[], campusContext?: CampusPreloadContext, userContext?: UserPreloadContext): PreloadResource[];
}
export declare const Preloader: React.FC<PreloaderProps>, resources: any, campusContext: any, userContext: any, enableIntelligentPreloading: any;
export declare function createPreloadResource(id: string, type: ResourceType, options: Partial<Omit<PreloadResource, 'id' | 'type'>>): PreloadResource;
export { CampusPreloadManager };
export type { PreloaderProps, PreloadResource, ResourceType, CampusPreloadContext, UserPreloadContext, PreloadStats };
//# sourceMappingURL=Preloader.d.ts.map