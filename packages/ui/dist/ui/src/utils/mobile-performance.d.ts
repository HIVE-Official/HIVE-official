export interface PerformanceMetrics {
    deviceMemory: number | null;
    cpuCores: number;
    networkType: string;
    batteryLevel: number | null;
    isLowPowerMode: boolean;
    renderBudget: number;
    shouldReduceAnimations: boolean;
    shouldLazyLoad: boolean;
    shouldPreload: boolean;
}
export declare class MobilePerformanceManager {
    private metrics;
    private observers;
    private rafId;
    private frameTimings;
    initialize(): Promise<PerformanceMetrics>;
    getMetrics(): PerformanceMetrics | null;
    private setupPerformanceMonitoring;
    private startFrameMonitoring;
    private handleLongTask;
    private handleMemoryPressure;
    getAverageFrameRate(): number;
    shouldReduceComplexity(): boolean;
    getOptimalImageQuality(): number;
    getLazyLoadThreshold(): string;
    destroy(): void;
}
export declare function useMobilePerformance(): {
    metrics: PerformanceMetrics | null;
    isInitialized: boolean;
    shouldReduceComplexity: () => boolean;
    getOptimalImageQuality: () => number;
    getLazyLoadThreshold: () => string;
    getAverageFrameRate: () => number;
};
export declare class BatteryEfficientAnimations {
    static shouldAnimate(batteryLevel: number | null, isCharging: boolean): boolean;
    static getAnimationDuration(baseDuration: number, batteryLevel: number | null): number;
    static shouldUseGPU(deviceMemory: number | null): boolean;
}
export declare class MemoryManager {
    private static readonly MEMORY_THRESHOLD;
    static checkMemoryPressure(): Promise<boolean>;
    static freeMemory(): Promise<void>;
}
export declare class AdaptiveLoader {
    static shouldPreloadImages(networkInfo: any, batteryLevel: number | null): boolean;
    static getImageLoadingStrategy(networkInfo: any): 'eager' | 'lazy';
    static getOptimalChunkSize(networkInfo: any): number;
}
export declare class PerformanceBudget {
    private static readonly BUDGETS;
    static getBudget(deviceMemory: number | null, cpuCores: number): typeof PerformanceBudget.BUDGETS.highEnd;
    static checkBudget(bundleSize: number, budget: number): boolean;
}
export declare const mobilePerformanceManager: MobilePerformanceManager;
//# sourceMappingURL=mobile-performance.d.ts.map