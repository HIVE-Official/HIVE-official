"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView, useAnimation } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';
// Performance-optimized variants system
const productionLogoVariants = cva("inline-flex items-center justify-center transition-all duration-200 will-change-transform", {
    variants: {
        variant: {
            primary: "text-[var(--hive-text-primary)]",
            gold: "text-[var(--hive-color-gold)]",
            inverted: "text-[var(--hive-background-primary)]",
            monochrome: "text-current",
            brand: "text-[var(--hive-text-primary)]",
            custom: "text-current",
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
        context: {
            navigation: "cursor-pointer hover:scale-105 active:scale-95",
            hero: "cursor-default",
            footer: "opacity-80 hover:opacity-100",
            sidebar: "cursor-pointer hover:scale-102",
            modal: "cursor-default",
            email: "cursor-default",
            print: "print:text-[var(--hive-background-primary)]",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        context: "navigation",
    },
});
// High-performance SVG logo component with memoization
const OptimizedHiveSVG = memo(({ variant, size, customColors, className }) => {
    // Memoized color calculation
    const fillColor = useMemo(() => {
        if (customColors?.primary)
            return customColors.primary;
        switch (variant) {
            case 'gold': return 'var(--hive-color-gold)';
            case 'inverted': return 'var(--hive-color-void)';
            case 'custom': return 'currentColor';
            default: return 'var(--hive-text-primary)';
        }
    }, [variant, customColors]);
    // Optimized path with reduced complexity for smaller sizes
    const logoPath = useMemo(() => {
        const isSmall = ['xs', 'sm'].includes(size);
        if (isSmall) {
            // Simplified path for small sizes to improve performance
            return "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z M50,25 L70,35 L70,65 L50,75 L30,65 L30,35 Z";
        }
        // Full detailed path for larger sizes
        return "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z";
    }, [size]);
    const viewBox = ['xs', 'sm'].includes(size) ? "0 0 100 100" : "0 0 1500 1500";
    return (_jsx("svg", { viewBox: viewBox, fill: "none", className: cn("w-full h-full", className), style: {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
        }, children: _jsx("path", { d: logoPath, fill: fillColor, style: {
                vectorEffect: 'non-scaling-stroke',
            } }) }));
});
OptimizedHiveSVG.displayName = 'OptimizedHiveSVG';
// Performance monitoring hook
const usePerformanceMetrics = (enabled, variant) => {
    const [metrics, setMetrics] = useState({});
    const renderStartTime = useRef();
    useEffect(() => {
        if (!enabled)
            return;
        renderStartTime.current = performance.now();
        const measurePerformance = () => {
            if (renderStartTime.current) {
                const renderTime = performance.now() - renderStartTime.current;
                setMetrics(prev => ({
                    ...prev,
                    renderTime,
                    animationFrames: prev.animationFrames ? prev.animationFrames + 1 : 1,
                }));
                // Log performance data in development
                if (process.env.NODE_ENV === 'development') {
                    console.log(`[HIVE Logo] ${variant} render: ${renderTime.toFixed(2)}ms`);
                }
            }
        };
        // Use RAF for accurate timing
        const rafId = requestAnimationFrame(measurePerformance);
        return () => cancelAnimationFrame(rafId);
    }, [enabled, variant]);
    return metrics;
};
// Advanced gesture detection hook
const useAdvancedGestures = (ref, gestures, analytics) => {
    const [gestureState, setGestureState] = useState({
        isPressed: false,
        pressStartTime: 0,
        clickCount: 0,
    });
    useEffect(() => {
        const element = ref.current;
        if (!element || !gestures)
            return;
        let clickTimeout;
        let longPressTimeout;
        const handleMouseDown = (e) => {
            if (!gestures.enableLongPress && !gestures.enableDoubleClick)
                return;
            setGestureState(prev => ({
                ...prev,
                isPressed: true,
                pressStartTime: Date.now(),
            }));
            if (gestures.enableLongPress) {
                longPressTimeout = setTimeout(() => {
                    analytics?.onLogoClick?.('longpress', 'gesture');
                    // Trigger long press action
                }, 500);
            }
        };
        const handleMouseUp = () => {
            setGestureState(prev => ({ ...prev, isPressed: false }));
            clearTimeout(longPressTimeout);
        };
        const handleClick = () => {
            if (!gestures.enableDoubleClick)
                return;
            setGestureState(prev => ({
                ...prev,
                clickCount: prev.clickCount + 1,
            }));
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                if (gestureState.clickCount === 1) {
                    // Single click
                    analytics?.onLogoClick?.('single', 'gesture');
                }
                setGestureState(prev => ({ ...prev, clickCount: 0 }));
            }, 300);
            if (gestureState.clickCount === 1) {
                // Double click detected
                analytics?.onLogoClick?.('double', 'gesture');
                setGestureState(prev => ({ ...prev, clickCount: 0 }));
                clearTimeout(clickTimeout);
            }
        };
        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('click', handleClick);
        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('mouseup', handleMouseUp);
            element.removeEventListener('click', handleClick);
            clearTimeout(clickTimeout);
            clearTimeout(longPressTimeout);
        };
    }, [gestures, analytics, gestureState.clickCount]);
    return gestureState;
};
// 1. PRODUCTION-READY ANIMATED LOGO
export const HiveLogoProductionAnimated = memo(({ variant = 'primary', size = 'md', lazy = true, preload = false, optimizeForSpeed = false, enablePerformanceMetrics = false, accessibility = {}, analytics, customColors, context = 'navigation', environment = 'production', className, ...props }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: lazy });
    const shouldReduceMotion = useReducedMotion();
    const controls = useAnimation();
    // Performance monitoring
    const metrics = usePerformanceMetrics(enablePerformanceMetrics, variant);
    // Analytics tracking
    const trackView = useCallback(() => {
        analytics?.onLogoView?.(variant, context);
    }, [analytics, variant, context]);
    const trackClick = useCallback(() => {
        analytics?.onLogoClick?.(variant, context);
    }, [analytics, variant, context]);
    const trackHover = useCallback(() => {
        analytics?.onLogoHover?.(variant, context);
    }, [analytics, variant, context]);
    // Trigger view tracking when component comes into view
    useEffect(() => {
        if (isInView) {
            trackView();
        }
    }, [isInView, trackView]);
    // Animation configuration based on performance preferences
    const animationConfig = useMemo(() => {
        if (shouldReduceMotion || optimizeForSpeed) {
            return {
                initial: { opacity: 1, scale: 1 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0 },
            };
        }
        return {
            initial: { opacity: 0, scale: 0.8, rotateY: -180 },
            animate: { opacity: 1, scale: 1, rotateY: 0 },
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        };
    }, [shouldReduceMotion, optimizeForSpeed]);
    // Accessibility attributes
    const accessibilityProps = useMemo(() => ({
        role: accessibility.role || 'img',
        'aria-label': accessibility.ariaLabel || 'HIVE logo',
        'aria-description': accessibility.ariaDescription,
        tabIndex: accessibility.focusable ? (accessibility.tabIndex || 0) : -1,
        'aria-hidden': !accessibility.focusable,
    }), [accessibility]);
    // Conditional rendering for lazy loading
    if (lazy && !isInView) {
        return (_jsx("div", { ref: ref, className: cn(productionLogoVariants({ variant, size, context, className })), style: { backgroundColor: 'transparent' } }));
    }
    return (_jsxs(motion.div, { ref: ref, className: cn(productionLogoVariants({ variant, size, context, className })), onClick: trackClick, onHoverStart: trackHover, ...animationConfig, ...accessibilityProps, ...props, children: [_jsx(OptimizedHiveSVG, { variant: variant, size: size, customColors: customColors }), enablePerformanceMetrics && environment === 'development' && (_jsxs("div", { className: "absolute -top-8 left-0 text-xs text-[var(--hive-text-primary)]/60 whitespace-nowrap", children: [metrics.renderTime?.toFixed(1), "ms"] }))] }));
});
HiveLogoProductionAnimated.displayName = 'HiveLogoProductionAnimated';
// 2. ENTERPRISE CUSTOMIZABLE LOGO
export const HiveLogoEnterprise = memo(({ variant = 'custom', size = 'md', customColors = {}, brandingOverride, abTestVariant, experimentId, accessibility = {}, analytics, context = 'navigation', className, ...props }) => {
    const ref = useRef(null);
    // A/B testing logic
    const effectiveVariant = useMemo(() => {
        if (abTestVariant && experimentId) {
            // Track A/B test participation
            analytics?.onLogoView?.(`ab_${abTestVariant}`, `experiment_${experimentId}`);
            return abTestVariant;
        }
        return variant;
    }, [variant, abTestVariant, experimentId, analytics]);
    // Custom branding override
    if (brandingOverride?.logoUrl) {
        return (_jsx("div", { className: cn(productionLogoVariants({ variant, size, context, className })), ...props, children: _jsx("img", { src: brandingOverride.logoUrl, alt: brandingOverride.companyName || 'Company logo', className: "w-full h-full object-contain", loading: "lazy" }) }));
    }
    return (_jsxs("div", { ref: ref, className: cn(productionLogoVariants({ variant, size, context, className })), style: {
            color: customColors.primary || undefined,
            filter: customColors.accent ? `drop-shadow(0 0 4px ${customColors.accent})` : undefined,
        }, ...props, children: [_jsx(OptimizedHiveSVG, { variant: effectiveVariant, size: size, customColors: customColors }), brandingOverride?.companyName && (_jsx("span", { className: "ml-2 font-bold tracking-wide text-current", children: brandingOverride.companyName }))] }));
});
HiveLogoEnterprise.displayName = 'HiveLogoEnterprise';
// 3. ADVANCED INTERACTIVE LOGO WITH GESTURES
export const HiveLogoInteractiveAdvanced = memo(({ variant = 'primary', size = 'lg', gestures = {
    enableSwipe: false,
    enableLongPress: true,
    enableDoubleClick: true,
}, accessibility = { focusable: true }, analytics, context = 'navigation', className, children, ...props }) => {
    const ref = useRef(null);
    const [interactionState, setInteractionState] = useState({
        isHovered: false,
        isFocused: false,
        isPressed: false,
    });
    const shouldReduceMotion = useReducedMotion();
    // Advanced gesture detection
    const gestureState = useAdvancedGestures(ref, gestures, analytics);
    // Interaction handlers
    const handleFocus = useCallback(() => {
        setInteractionState(prev => ({ ...prev, isFocused: true }));
        if (accessibility.announceChanges) {
            // Announce to screen readers
            const announcement = `${accessibility.ariaLabel || 'HIVE logo'} focused`;
            // Use aria-live region for announcements
        }
    }, [accessibility]);
    const handleBlur = useCallback(() => {
        setInteractionState(prev => ({ ...prev, isFocused: false }));
    }, []);
    const handleMouseEnter = useCallback(() => {
        setInteractionState(prev => ({ ...prev, isHovered: true }));
        analytics?.onLogoHover?.(variant, context);
    }, [analytics, variant, context]);
    const handleMouseLeave = useCallback(() => {
        setInteractionState(prev => ({ ...prev, isHovered: false }));
    }, []);
    // Advanced animation based on interaction state
    const animationProps = useMemo(() => {
        if (shouldReduceMotion) {
            return {
                whileHover: {},
                whileFocus: {},
                whileTap: {},
            };
        }
        return {
            whileHover: {
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400, damping: 17 }
            },
            whileFocus: {
                scale: 1.02,
                boxShadow: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)",
                transition: { duration: 0.2 }
            },
            whileTap: {
                scale: 0.95,
                rotateY: -5,
                transition: { duration: 0.1 }
            },
        };
    }, [shouldReduceMotion]);
    return (_jsxs(motion.div, { ref: ref, className: cn(productionLogoVariants({ variant, size, context, className }), "focus:outline-none focus:ring-2 focus:ring-[var(--hive-color-gold)]/50 rounded-lg", interactionState.isFocused && "ring-2 ring-[var(--hive-color-gold)]/50", gestureState.isPressed && "ring-2 ring-[var(--hive-color-gold)]/70"), tabIndex: accessibility.focusable ? 0 : -1, role: accessibility.role || 'button', "aria-label": accessibility.ariaLabel || 'Interactive HIVE logo', onFocus: handleFocus, onBlur: handleBlur, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ...animationProps, ...props, children: [_jsx(OptimizedHiveSVG, { variant: variant, size: size }), children, _jsx(AnimatePresence, { children: interactionState.isHovered && !shouldReduceMotion && (_jsx(motion.div, { className: "absolute inset-0 rounded-lg bg-[var(--hive-color-gold)]/10", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } })) })] }));
});
HiveLogoInteractiveAdvanced.displayName = 'HiveLogoInteractiveAdvanced';
// 4. ACCESSIBILITY-FIRST LOGO
export const HiveLogoAccessible = memo(({ variant = 'primary', size = 'md', accessibility = {
    focusable: true,
    announceChanges: true,
    ariaLabel: 'HIVE logo - Navigate to homepage',
}, context = 'navigation', className, ...props }) => {
    const [isAnnounced, setIsAnnounced] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    // Announce logo presence to screen readers on mount
    useEffect(() => {
        if (accessibility.announceChanges && !isAnnounced) {
            setIsAnnounced(true);
            // Create temporary live region for announcement
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
            setTimeout(() => {
                liveRegion.textContent = accessibility.ariaLabel || 'HIVE logo loaded';
                setTimeout(() => {
                    document.body.removeChild(liveRegion);
                }, 1000);
            }, 100);
        }
    }, [accessibility, isAnnounced]);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Trigger click action
            e.target.click();
        }
    }, []);
    return (_jsxs("div", { className: cn(productionLogoVariants({ variant, size, context, className }), "focus:outline-none focus:ring-2 focus:ring-[var(--hive-color-gold)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)] rounded-lg", accessibility.focusable && "cursor-pointer"), tabIndex: accessibility.focusable ? accessibility.tabIndex || 0 : -1, role: accessibility.role || 'img', "aria-label": accessibility.ariaLabel, "aria-description": accessibility.ariaDescription, onKeyDown: accessibility.focusable ? handleKeyDown : undefined, ...props, children: [_jsx(OptimizedHiveSVG, { variant: variant, size: size }), _jsx("style", { children: `
        @media (prefers-contrast: high) {
          .hive-logo {
            filter: contrast(2) brightness(1.2);
          }
        }
      ` })] }));
});
HiveLogoAccessible.displayName = 'HiveLogoAccessible';
// 5. PERFORMANCE MONITORING LOGO
export const HiveLogoPerformanceMonitored = memo(({ variant = 'primary', size = 'md', enablePerformanceMetrics = true, optimizeForSpeed = false, analytics, environment = 'development', className, ...props }) => {
    const ref = useRef(null);
    const [performanceData, setPerformanceData] = useState({});
    const renderCount = useRef(0);
    // Comprehensive performance monitoring
    useEffect(() => {
        if (!enablePerformanceMetrics)
            return;
        const startTime = performance.now();
        renderCount.current++;
        // Memory usage monitoring (if available)
        const measureMemory = () => {
            if (typeof window !== 'undefined' && 'memory' in performance) {
                const memory = performance.memory;
                return {
                    used: memory.usedJSHeapSize,
                    total: memory.totalJSHeapSize,
                    limit: memory.jsHeapSizeLimit,
                };
            }
            return null;
        };
        // Frame rate monitoring
        let frameCount = 0;
        let lastTime = startTime;
        const countFrames = () => {
            frameCount++;
            const currentTime = performance.now();
            if (currentTime - lastTime >= 1000) {
                setPerformanceData(prev => ({
                    ...prev,
                    animationFrames: frameCount,
                    renderTime: currentTime - startTime,
                    memoryUsage: measureMemory()?.used,
                }));
                // Send analytics data
                if (analytics?.onLogoView) {
                    analytics.onLogoView(`perf_${variant}`, `render_${renderCount.current}`);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(countFrames);
        };
        const rafId = requestAnimationFrame(countFrames);
        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [enablePerformanceMetrics, variant, analytics]);
    // Performance-optimized rendering
    const optimizedProps = useMemo(() => {
        if (optimizeForSpeed) {
            return {
                style: {
                    willChange: 'auto',
                    transform: 'translateZ(0)', // Force hardware acceleration
                    backfaceVisibility: 'hidden',
                }
            };
        }
        return {};
    }, [optimizeForSpeed]);
    return (_jsxs("div", { ref: ref, className: cn(productionLogoVariants({ variant, size, className })), ...optimizedProps, ...props, children: [_jsx(OptimizedHiveSVG, { variant: variant, size: size }), enablePerformanceMetrics && environment === 'development' && (_jsxs("div", { className: "absolute -top-16 left-0 text-xs text-[var(--hive-text-primary)]/60 bg-[var(--hive-background-primary)]/80 p-2 rounded whitespace-nowrap", children: [_jsxs("div", { children: ["Render: ", performanceData.renderTime?.toFixed(2), "ms"] }), _jsxs("div", { children: ["Frames: ", performanceData.animationFrames, "/s"] }), _jsxs("div", { children: ["Memory: ", performanceData.memoryUsage ? `${(performanceData.memoryUsage / 1024 / 1024).toFixed(1)}MB` : 'N/A'] }), _jsxs("div", { children: ["Renders: ", renderCount.current] })] }))] }));
});
HiveLogoPerformanceMonitored.displayName = 'HiveLogoPerformanceMonitored';
// Export all production variants
export { HiveLogoProductionAnimated as ProductionAnimatedLogo, HiveLogoEnterprise as EnterpriseLogo, HiveLogoInteractiveAdvanced as AdvancedInteractiveLogo, HiveLogoAccessible as AccessibleLogo, HiveLogoPerformanceMonitored as PerformanceMonitoredLogo, };
//# sourceMappingURL=hive-logo-production.js.map