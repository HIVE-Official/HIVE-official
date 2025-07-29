import React from 'react';
interface PerformanceMetrics {
    renderTime: number;
    paintTime: number;
    layoutTime: number;
    memoryUsage: number;
    frameRate: number;
    cacheHitRate: number;
    bundleSize: number;
    timeToInteractive: number;
}
interface PerformanceConfig {
    enableMetrics: boolean;
    enableLogging: boolean;
    enableProfiling: boolean;
    enableOptimizations: boolean;
    targetFrameRate: number;
    maxMemoryUsage: number;
    lazyLoadThreshold: number;
}
interface OptimizationStrategy {
    virtualizeRendering: boolean;
    memoizeCalculations: boolean;
    debounceUpdates: boolean;
    useWebWorkers: boolean;
    preloadAssets: boolean;
    cacheResults: boolean;
    minifyOutput: boolean;
}
interface PerformanceLogoProps {
    variant?: 'primary' | 'gold' | 'inverted' | 'monochrome';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    performance?: PerformanceConfig;
    optimization?: OptimizationStrategy;
    lazy?: boolean;
    preload?: boolean;
    priority?: 'high' | 'normal' | 'low';
    cacheKey?: string;
    cacheDuration?: number;
    quality?: 'auto' | 'high' | 'medium' | 'low';
    optimizeForSpeed?: boolean;
    optimizeForSize?: boolean;
    onPerformanceMetrics?: (metrics: PerformanceMetrics) => void;
    enableProfiler?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare class LogoCache {
    private static instance;
    private cache;
    static getInstance(): LogoCache;
    set(key: string, data: any, ttl?: number): void;
    get(key: string): any | null;
    clear(): void;
    size(): number;
    getHitRate(): number;
}
export declare const HiveLogoHighPerformance: React.MemoExoticComponent<({ variant, size, performance, optimization, lazy, preload, priority, cacheKey, cacheDuration, quality, optimizeForSpeed, optimizeForSize, onPerformanceMetrics, enableProfiler, className, ...props }: PerformanceLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoPerformanceDashboard: React.FC<{
    metrics: PerformanceMetrics[];
    className?: string;
}>;
export declare const createLogoWorker: () => Worker | null;
export { LogoCache, };
//# sourceMappingURL=hive-logo-performance.d.ts.map