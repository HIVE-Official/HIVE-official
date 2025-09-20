/**
 * Performance Optimizer for HIVE Tools System
 *
 * Provides comprehensive performance optimizations including:
 * - Intelligent caching strategies
 * - Component virtualization
 * - Lazy loading and code splitting
 * - Memory management
 * - Real-time performance monitoring
 */
import React from 'react';
export declare function usePerformanceMonitor(componentName: string): {
    renderCount: number;
    totalTime: number;
};
declare class ToolCache {
    private static instance;
    private cache;
    private readonly DEFAULT_TTL;
    static getInstance(): ToolCache;
    set(key: string, data: any, ttl?: number): void;
    get(key: string): any | null;
    invalidate(pattern: string): void;
    private cleanup;
    getStats(): {
        size: number;
        keys: string[];
    };
}
export declare function useToolCache<T>(key: string, fetcher: () => Promise<T>, ttl?: number): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
};
interface VirtualScrollProps {
    items: any[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: any, index: number) => React.ReactNode;
    className?: string;
}
export declare function VirtualScroll({ items, itemHeight, containerHeight, renderItem, className }: VirtualScrollProps): import("react/jsx-runtime").JSX.Element;
interface LazyComponentProps {
    fallback?: React.ReactNode;
    threshold?: number;
    children: React.ReactNode;
}
export declare function LazyComponent({ children, fallback, threshold }: LazyComponentProps): import("react/jsx-runtime").JSX.Element;
interface DebouncedInputProps {
    value: string;
    onChange: (value: string) => void;
    delay?: number;
    placeholder?: string;
    className?: string;
}
export declare function DebouncedInput({ value, onChange, delay, placeholder, className }: DebouncedInputProps): import("react/jsx-runtime").JSX.Element;
export declare function memoize<T extends React.ComponentType<any>>(Component: T, compareProps?: (prevProps: any, nextProps: any) => boolean): T;
interface PerformanceMonitorProps {
    children: React.ReactNode;
    onMetrics?: (metrics: any) => void;
}
export declare function PerformanceMonitor({ children, onMetrics }: PerformanceMonitorProps): void;
interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    lazy?: boolean;
}
export declare function OptimizedImage({ src, alt, width, height, className, lazy }: OptimizedImageProps): import("react/jsx-runtime").JSX.Element;
export { ToolCache };
//# sourceMappingURL=performance-optimizer.d.ts.map