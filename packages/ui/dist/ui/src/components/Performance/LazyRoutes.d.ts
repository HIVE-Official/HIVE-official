import React from 'react';
type RoutePriority = 'critical' | 'high' | 'medium' | 'low' | 'background';
type UserPattern = 'explorer' | 'creator' | 'social' | 'focused' | 'power-user';
interface CampusContext {
    networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'library-computer';
    campusLoad: 'low' | 'medium' | 'high' | 'peak';
}
interface LazyRoute {
    id: string;
    path: string;
    component: () => Promise<{
        default: React.ComponentType<any>;
    }>;
    priority: RoutePriority;
    commonNextRoutes?: string[];
    userPatterns?: UserPattern[];
    campusUsageHours?: number[];
    preloadTriggers?: {
        onHover?: boolean;
        onVisible?: boolean;
        onUserPattern?: boolean;
        afterDelay?: number;
    };
    estimatedSize?: number;
    dependencies?: string[];
    skipOnSlowNetwork?: boolean;
    title?: string;
    description?: string;
    category?: 'core' | 'social' | 'creation' | 'analytics' | 'admin';
}
interface NavigationAnalytics {
    visitedRoutes: string[];
    currentSession: {
        startTime: number;
        routeSequence: string[];
        timeSpentPerRoute: Record<string, number>;
    };
    userPattern?: UserPattern;
    predictedNextRoutes: string[];
}
interface LazyRoutesProps {
    routes: LazyRoute[];
    campusContext?: CampusContext;
    enablePredictiveLoading?: boolean;
    enableHoverPreloading?: boolean;
    enableAnalytics?: boolean;
    loadingComponent?: React.ComponentType<any>;
    errorBoundary?: React.ComponentType<any>;
    maxConcurrentLoads?: number;
    preloadBudget?: number;
    className?: string;
    children?: React.ReactNode;
}
declare function useNavigationAnalytics(routes: LazyRoute[]): NavigationAnalytics;
declare class SmartPreloader {
    private static instance;
    private loadedChunks;
    private loadingChunks;
    private preloadBudgetUsed;
    private maxBudget;
    constructor(maxBudget?: number);
    static getInstance(maxBudget?: number): SmartPreloader;
    preloadRoute(route: LazyRoute, priority?: 'high' | 'medium' | 'low', campusContext?: CampusContext): Promise<boolean>;
}
export declare const LazyRoutes: React.FC<LazyRoutesProps>;
export declare function createLazyRoute(id: string, path: string, component: () => Promise<{
    default: React.ComponentType<any>;
}>, options?: Partial<Omit<LazyRoute, 'id' | 'path' | 'component'>>): LazyRoute;
export { SmartPreloader, useNavigationAnalytics };
export type { LazyRoutesProps, LazyRoute, RoutePriority, UserPattern, CampusContext, NavigationAnalytics };
//# sourceMappingURL=LazyRoutes.d.ts.map