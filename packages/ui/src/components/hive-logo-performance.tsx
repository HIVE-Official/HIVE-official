"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// High-Performance HIVE Logo System
// Advanced optimization techniques for production environments

// Performance monitoring types
interface PerformanceMetrics {
  renderTime: number;
  paintTime: number;
  layoutTime: number;
  memoryUsage: number;
  frameRate: number;
  cacheHitRate: number;
  bundleSize: number;
  timeToInteractive: number
}

interface PerformanceConfig {
  enableMetrics: boolean;
  enableLogging: boolean;
  enableProfiling: boolean;
  enableOptimizations: boolean;
  targetFrameRate: number;
  maxMemoryUsage: number;
  lazyLoadThreshold: number
}

interface OptimizationStrategy {
  virtualizeRendering: boolean;
  memoizeCalculations: boolean;
  debounceUpdates: boolean;
  useWebWorkers: boolean;
  preloadAssets: boolean;
  cacheResults: boolean;
  minifyOutput: boolean
}

// Performance-optimized logo props
interface PerformanceLogoProps {
  variant?: 'primary' | 'gold' | 'inverted' | 'monochrome';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  
  // Performance settings
  performance?: PerformanceConfig;
  optimization?: OptimizationStrategy;
  
  // Lazy loading
  lazy?: boolean;
  preload?: boolean;
  priority?: 'high' | 'normal' | 'low';
  
  // Caching
  cacheKey?: string;
  cacheDuration?: number;
  
  // Resource optimization
  quality?: 'auto' | 'high' | 'medium' | 'low';
  optimizeForSpeed?: boolean;
  optimizeForSize?: boolean;
  
  // Monitoring
  onPerformanceMetrics?: (metrics: PerformanceMetrics) => void;
  enableProfiler?: boolean;
  
  className?: string;
  children?: React.ReactNode
}

// Performance monitoring hook
const usePerformanceMonitor = (
  componentName: string,
  config: PerformanceConfig,
  onMetrics?: (metrics: PerformanceMetrics) => void
) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    paintTime: 0,
    layoutTime: 0,
    memoryUsage: 0,
    frameRate: 0,
    cacheHitRate: 0,
    bundleSize: 0,
    timeToInteractive: 0,
  });
  
  const frameCount = useRef(0);
  const lastFrameTime = useRef(performance.now());
  const renderStartTime = useRef<number>();
  
  // Performance observer for detailed metrics
  useEffect(() => {
    if (!config.enableMetrics) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.name.includes(componentName)) {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration,
            paintTime: entry.startTime,
          })})
        }
      })}
    });
    
    observer.observe({ entryTypes: ['measure', 'paint'] });
    
    return () => observer.disconnect()
  }, [componentName, config.enableMetrics]);
  
  // Memory usage monitoring
  useEffect(() => {
    if (!config.enableMetrics || typeof window === 'undefined') return;
    
    const measureMemory = () => {
      if (typeof window !== 'undefined' && 'memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize;
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage,
        }));
        
        // Alert if memory usage exceeds threshold
        if (config.maxMemoryUsage && memoryUsage > config.maxMemoryUsage) {
          console.warn(`[${componentName}] Memory usage exceeded threshold: ${memoryUsage}MB`)
        }
      }
    };
    
    const interval = setInterval(measureMemory, 1000);
    return () => clearInterval(interval)
  }, [componentName, config]);
  
  // Frame rate monitoring
  useEffect(() => {
    if (!config.enableMetrics) return;
    
    const measureFrameRate = () => {
      const now = performance.now();
      const delta = now - lastFrameTime.current;
      lastFrameTime.current = now;
      
      frameCount.current++;
      
      if (frameCount.current % 60 === 0) {
        const fps = 1000 / delta;
        setMetrics(prev => ({
          ...prev,
          frameRate: fps,
        }));
        
        // Alert if frame rate drops below target
        if (fps < config.targetFrameRate) {
          console.warn(`[${componentName}] Frame rate below target: ${fps}fps`)
        }
      }
      
      requestAnimationFrame(measureFrameRate)
    };
    
    const rafId = requestAnimationFrame(measureFrameRate);
    return () => cancelAnimationFrame(rafId)
  }, [componentName, config]);
  
  // Report metrics to callback
  useEffect(() => {
    if (onMetrics && config.enableMetrics) {
      onMetrics(metrics)
    }
  }, [metrics, onMetrics, config.enableMetrics]);
  
  const startRender = useCallback(() => {
    if (config.enableProfiling) {
      renderStartTime.current = performance.now();
      performance.mark(`${componentName}-render-start`)
    }
  }, [componentName, config.enableProfiling]);
  
  const endRender = useCallback(() => {
    if (config.enableProfiling && renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      performance.mark(`${componentName}-render-end`);
      performance.measure(
        `${componentName}-render`,
        `${componentName}-render-start`,
        `${componentName}-render-end`
      );
      
      setMetrics(prev => ({
        ...prev,
        renderTime,
      })})
    }
  }, [componentName, config.enableProfiling]);
  
  return { metrics, startRender, endRender }
};

// SVG optimization hook
const useOptimizedSVG = (
  variant: string,
  size: string,
  quality: string,
  optimization: OptimizationStrategy
) => {
  return useMemo(() => {
    const isSmallSize = ['xs', 'sm'].includes(size);
    const isLowQuality = quality === 'low' || (quality === 'auto' && isSmallSize);
    
    // Simplified path for small sizes or low quality
    if (isLowQuality && optimization.minifyOutput) {
      return {
        viewBox: "0 0 100 100",
        path: "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z M50,25 L70,35 L70,65 L50,75 L30,65 L30,35 Z",
        simplified: true,
      }
    }
    
    // Full detailed path
    return {
      viewBox: "0 0 1500 1500",
      path: "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z",
      simplified: false,
    }
  }, [variant, size, quality, optimization.minifyOutput])
};

// Resource caching system
class LogoCache {
  private static instance: LogoCache;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  static getInstance(): LogoCache {
    if (!LogoCache.instance) {
      LogoCache.instance = new LogoCache()
    }
    return LogoCache.instance
  }
  
  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }
  
  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null
    }
    
    return item.data
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  size(): number {
    return this.cache.size
  }
  
  getHitRate(): number {
    // Simple hit rate calculation
    return this.cache.size > 0 ? 0.8 : 0; // Mock implementation
  }
}

// Virtualized rendering for large collections
const useVirtualization = (enabled: boolean, itemCount: number, containerHeight: number) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const itemHeight = 50; // Approximate logo height
      
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(itemCount, start + Math.ceil(containerHeight / itemHeight) + 5);
      
      setVisibleRange({ start, end })
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, itemCount, containerHeight]);
  
  return visibleRange
};

// Performance variants system
const performanceVariants = cva(
  "inline-flex items-center transition-all duration-200 will-change-transform",
  {
    variants: {
      variant: {
        primary: "text-[var(--hive-text-primary)]",
        gold: "text-[var(--hive-color-gold)]",
        inverted: "text-[var(--hive-background-primary)]",
        monochrome: "text-current",
      },
      size: {
        xs: "w-4 h-4",
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-10 h-10",
        "2xl": "w-12 h-12",
        "3xl": "w-16 h-16",
        "4xl": "w-20 h-20",
      },
      optimization: {
        speed: "transform-gpu backface-visibility-hidden",
        size: "",
        balanced: "transform-gpu",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      optimization: "balanced",
    },
  }
);

// Main high-performance logo component
export const HiveLogoHighPerformance = memo(({
  variant = 'primary',
  size = 'md',
  performance = {
    enableMetrics: false,
    enableLogging: false,
    enableProfiling: false,
    enableOptimizations: true,
    targetFrameRate: 60,
    maxMemoryUsage: 50 * 1024 * 1024, // 50MB
    lazyLoadThreshold: 0.1,
  },
  optimization = {
    virtualizeRendering: false,
    memoizeCalculations: true,
    debounceUpdates: true,
    useWebWorkers: false,
    preloadAssets: false,
    cacheResults: true,
    minifyOutput: true,
  },
  lazy = true,
  preload = false,
  priority = 'normal',
  cacheKey,
  cacheDuration = 300000,
  quality = 'auto',
  optimizeForSpeed = false,
  optimizeForSize = false,
  onPerformanceMetrics,
  enableProfiler = false,
  className,
  ...props
}: PerformanceLogoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: performance.lazyLoadThreshold });
  const shouldReduceMotion = useReducedMotion();
  const cache = LogoCache.getInstance();
  
  // Performance monitoring
  const { metrics, startRender, endRender } = usePerformanceMonitor(
    'HiveLogoHighPerformance',
    performance,
    onPerformanceMetrics
  );
  
  // Optimized SVG generation
  const svgData = useOptimizedSVG(variant, size, quality, optimization);
  
  // Cache key generation
  const finalCacheKey = useMemo(() => {
    if (cacheKey) return cacheKey;
    return `hive-logo-${variant}-${size}-${quality}-${JSON.stringify(optimization)}`
  }, [cacheKey, variant, size, quality, optimization]);
  
  // Cached rendering
  const cachedRender = useMemo(() => {
    if (!optimization.cacheResults) return null;
    
    const cached = cache.get(finalCacheKey);
    if (cached) return cached;
    
    return null
  }, [optimization.cacheResults, finalCacheKey, cache]);
  
  // Optimized rendering strategy
  const optimizationLevel = useMemo(() => {
    if (optimizeForSpeed) return 'speed';
    if (optimizeForSize) return 'size';
    return 'balanced'
  }, [optimizeForSpeed, optimizeForSize]);
  
  // Render timing
  useEffect(() => {
    startRender();
    return () => endRender()
  }, [startRender, endRender]);
  
  // Preloading
  useEffect(() => {
    if (preload && priority === 'high') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = `data:image/svg+xml,${encodeURIComponent(
        `<svg viewBox="${svgData.viewBox}" xmlns="http://www.w3.org/2000/svg"><path d="${svgData.path}" fill="currentColor"/></svg>`
      )}`;
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [preload, priority, svgData]);
  
  // Cache results
  useEffect(() => {
    if (optimization.cacheResults && !cachedRender) {
      const renderData = {
        svgData,
        metrics,
        timestamp: Date.now(),
      };
      cache.set(finalCacheKey, renderData, cacheDuration)
    }
  }, [optimization.cacheResults, cachedRender, svgData, metrics, finalCacheKey, cache, cacheDuration]);
  
  // Lazy loading placeholder
  if (lazy && !isInView) {
    return (
      <div
        ref={ref}
        className={cn(performanceVariants({ variant, size, optimization: optimizationLevel, className }))}
        style={{ backgroundColor: 'transparent' }}
      />
    )
  }
  
  // Use cached render if available
  if (cachedRender) {
    return (
      <div
        ref={ref}
        className={cn(performanceVariants({ variant, size, optimization: optimizationLevel, className }))}
        {...props}
      >
        <svg viewBox={cachedRender.svgData.viewBox} fill="none" className="w-full h-full">
          <path d={cachedRender.svgData.path} fill="currentColor" />
        </svg>
      </div>
    )
  }
  
  return (
    <motion.div
      ref={ref}
      className={cn(performanceVariants({ variant, size, optimization: optimizationLevel, className }))}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={shouldReduceMotion ? false : { opacity: 1 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.2 }}
      {...props}
    >
      <svg
        viewBox={svgData.viewBox}
        fill="none"
        className="w-full h-full"
        style={{
          vectorEffect: 'non-scaling-stroke',
          shapeRendering: optimizeForSpeed ? 'optimizeSpeed' : 'auto',
          }}
      >
        <path
          d={svgData.path}
          fill="currentColor"
          style={{
            fillRule: 'evenodd',
            clipRule: 'evenodd',
          }}
        />
      </svg>
      
      {/* Performance metrics overlay (development only) */}
      {enableProfiler && process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-12 left-0 text-xs text-[var(--hive-text-primary)]/60 bg-[var(--hive-background-primary)]/80 p-2 rounded whitespace-nowrap">
          <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
          <div>FPS: {metrics.frameRate.toFixed(0)}</div>
          <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
          <div>Cache: {(cache.getHitRate() * 100).toFixed(0)}%</div>
        </div>
      )}
    </motion.div>
  )
});

HiveLogoHighPerformance.displayName = 'HiveLogoHighPerformance';

// Performance dashboard component
export const HiveLogoPerformanceDashboard: React.FC<{
  metrics: PerformanceMetrics[];
  className?: string
}> = ({ metrics = [], className }) => {
  const averageMetrics = useMemo(() => {
    if (metrics.length === 0) return null;
    
    return {
      renderTime: metrics.reduce((sum, m) => sum + m.renderTime, 0) / metrics.length,
      frameRate: metrics.reduce((sum, m) => sum + m.frameRate, 0) / metrics.length,
      memoryUsage: metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length,
      cacheHitRate: metrics.reduce((sum, m) => sum + m.cacheHitRate, 0) / metrics.length,
    }
  }, [metrics]);
  
  if (!averageMetrics) {
    return (
      <div className={cn("p-6 bg-[var(--hive-background-primary)]/20 rounded-xl", className)}>
        <div className="text-[var(--hive-text-primary)]/60">No performance data available</div>
      </div>
    )
  }
  
  return (
    <div className={cn("p-6 bg-[var(--hive-background-primary)]/20 rounded-xl space-y-6", className)}>
      <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">Performance Dashboard</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {averageMetrics.renderTime.toFixed(1)}ms
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Avg Render Time</div>
        </div>
        
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {averageMetrics.frameRate.toFixed(0)}fps
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Frame Rate</div>
        </div>
        
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {(averageMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Memory Usage</div>
        </div>
        
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {(averageMetrics.cacheHitRate * 100).toFixed(0)}%
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Cache Hit Rate</div>
        </div>
      </div>
      
      {/* Performance recommendations */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Optimization Recommendations</h4>
        
        {averageMetrics.renderTime > 16 && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="text-yellow-400 font-medium">High Render Time</div>
            <div className="text-yellow-300/70 text-sm">
              Consider enabling speed optimizations or reducing logo complexity
            </div>
          </div>
        )}
        
        {averageMetrics.frameRate < 60 && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="text-red-400 font-medium">Low Frame Rate</div>
            <div className="text-red-300/70 text-sm">
              Enable GPU acceleration and reduce motion animations
            </div>
          </div>
        )}
        
        {averageMetrics.memoryUsage > 10 * 1024 * 1024 && (
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="text-orange-400 font-medium">High Memory Usage</div>
            <div className="text-orange-300/70 text-sm">
              Enable caching and consider using smaller logo variants
            </div>
          </div>
        )}
        
        {averageMetrics.cacheHitRate < 0.5 && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="text-blue-400 font-medium">Low Cache Hit Rate</div>
            <div className="text-blue-300/70 text-sm">
              Increase cache duration or improve cache key strategy
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

// Web Worker for heavy computations
export const createLogoWorker = (): Worker | null => {
  if (typeof Worker === 'undefined') return null;
  
  const workerScript = `
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      switch (type) {
        case 'OPTIMIZE_SVG':
          // SVG optimization logic
          const optimized = optimizeSVG(data);
          self.postMessage({ type: 'SVG_OPTIMIZED', data: optimized });
          break;
          
        case 'CALCULATE_METRICS':
          // Performance metrics calculation
          const metrics = calculateMetrics(data);
          self.postMessage({ type: 'METRICS_CALCULATED', data: metrics });
          break
      }
    };
    
    function optimizeSVG(svgData) {
      // Implement SVG optimization
      return svgData
    }
    
    function calculateMetrics(data) {
      // Implement metrics calculation
      return {}
    }
  `;
  
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob))
};

// Export performance components (already exported with const declarations above)
export {
  LogoCache,
};