'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
// Custom hook for advanced viewport detection
function useAdvancedViewport() {
    const [viewport, setViewport] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        touchCapable: false,
        hasNotch: false,
        safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    useEffect(() => {
        const updateViewport = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Detect device capabilities
            const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const hasNotch = CSS.supports('padding-top: env(safe-area-inset-top)');
            // Calculate safe area insets
            const safeAreaInsets = {
                top: hasNotch ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0') : 0,
                bottom: hasNotch ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0') : 0,
                left: hasNotch ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0') : 0,
                right: hasNotch ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0') : 0
            };
            setViewport({
                width,
                height,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                orientation: width > height ? 'landscape' : 'portrait',
                touchCapable,
                hasNotch,
                safeAreaInsets
            });
        };
    });
    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    return () => {
        window.removeEventListener('resize', updateViewport);
        window.removeEventListener('orientationchange', updateViewport);
    };
}
[];
;
return viewport;
// Dynamic spacing calculation based on content density and viewport
function calculateDynamicSpacing(viewport, density, networkQuality) {
    const baseSpacing = {
        compact: viewport.isMobile ? 'p-3' : 'p-4',
        comfortable: viewport.isMobile ? 'p-4' : 'p-6',
        spacious: viewport.isMobile ? 'p-6' : 'p-8'
    };
    // Reduce spacing on poor network to minimize layout shifts
    if (networkQuality === 'poor') {
        return viewport.isMobile ? 'p-2' : 'p-3';
    }
    return baseSpacing[density];
}
// Adaptive max-width calculation
function calculateMaxWidth(maxWidth, viewport, strategy) {
    if (maxWidth === 'adaptive') {
        // Intelligent width based on content and device
        if (viewport.isMobile)
            return 'max-w-full';
        if (viewport.isTablet)
            return 'max-w-4xl';
        // Desktop: adaptive based on strategy
        switch (strategy) {
            case 'mobile-first': return 'max-w-5xl';
            case 'content-aware': return 'max-w-6xl';
            case 'performance-optimized': return 'max-w-4xl';
            default: return 'max-w-5xl';
        }
    }
    const widthMap = {
        sm: 'max-w-sm',
        md: 'max-w-3xl',
        lg: 'max-w-5xl',
        xl: 'max-w-7xl',
        '2xl': 'max-w-8xl',
        full: 'max-w-full'
    };
    return widthMap[maxWidth || 'xl'];
}
export const ResponsiveLayout = ({ children, strategy = 'mobile-first', contentDensity = 'comfortable', adaptToNotch = true, enableGestureNavigation = true, enableLayoutShiftPrevention = true, prefersReducedMotion = false, optimizeForCampusNetwork = true, campusContext, maxWidth = 'adaptive', padding = 'adaptive', spacing = 'adaptive', announceLayoutChanges = true, maintainFocusOnResize = true, className }) => {
    const viewport = useAdvancedViewport();
    const layoutRef = useRef(null);
    const [layoutShifts, setLayoutShifts] = useState(0);
    const [focusedElement, setFocusedElement] = useState(null);
    // Track focused element for restoration after layout changes
    useEffect(() => {
        if (!maintainFocusOnResize)
            return;
        const handleFocusChange = () => {
            setFocusedElement(document.activeElement);
        };
        document.addEventListener('focusin', handleFocusChange);
        return () => document.removeEventListener('focusin', handleFocusChange);
    }, [maintainFocusOnResize]);
    // Restore focus after viewport changes
    useEffect(() => {
        if (focusedElement && maintainFocusOnResize) {
            const timer = setTimeout(() => {
                if (document.contains(focusedElement)) {
                    focusedElement.focus();
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [viewport.width, viewport.height, focusedElement, maintainFocusOnResize]);
    // Layout shift prevention
    useEffect(() => {
        if (!enableLayoutShiftPrevention)
            return;
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                    setLayoutShifts(prev => prev + entry.value);
                }
            }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        return () => observer.disconnect();
    }, [enableLayoutShiftPrevention]);
    // Announce layout changes to screen readers
    useEffect(() => {
        if (!announceLayoutChanges)
            return;
        const announcement = `Layout changed to ${viewport.isMobile ? 'mobile' : viewport.isTablet ? 'tablet' : 'desktop'} view`;
        // Create temporary announcement element
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        document.body.appendChild(announcer);
        setTimeout(() => document.body.removeChild(announcer), 1000);
    }, [viewport.isMobile, viewport.isTablet, viewport.isDesktop, announceLayoutChanges]);
    // Calculate dynamic classes
    const containerClasses = cn(
    // Base layout
    'min-h-screen w-full', 
    // Safe area handling for devices with notches
    adaptToNotch && viewport.hasNotch && [
        'pt-[env(safe-area-inset-top)]',
        'pb-[env(safe-area-inset-bottom)]',
        'pl-[env(safe-area-inset-left)]',
        'pr-[env(safe-area-inset-right)]'
    ], 
    // Content width
    calculateMaxWidth(maxWidth, viewport, strategy), 
    // Dynamic spacing
    padding === 'adaptive'
        ? calculateDynamicSpacing(viewport, contentDensity, campusContext?.networkQuality)
        : {
            none: 'p-0',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8'
        }[padding], 
    // Gesture navigation support
    enableGestureNavigation && viewport.touchCapable && [
        'touch-pan-y',
        'overscroll-behavior-none'
    ], 
    // Performance optimizations
    enableLayoutShiftPrevention && 'will-change-auto', 
    // Reduced motion support
    prefersReducedMotion && 'motion-reduce:transform-none motion-reduce:transition-none', 
    // Campus network optimizations
    optimizeForCampusNetwork && campusContext?.networkQuality === 'poor' && [
        'transform-gpu', // Force GPU acceleration
        'backface-hidden' // Reduce repaints
    ], 
    // Accessibility enhancements
    'focus-within:ring-2 focus-within:ring-hive-gold focus-within:ring-opacity-20', 
    // Custom classes
    className);
    const contentClasses = cn(
    // Content container
    'w-full mx-auto', 
    // Responsive spacing
    spacing === 'adaptive' ? {
        tight: 'space-y-2',
        normal: viewport.isMobile ? 'space-y-4' : 'space-y-6',
        loose: viewport.isMobile ? 'space-y-6' : 'space-y-8'
    }[contentDensity === 'compact' ? 'tight' : contentDensity === 'comfortable' ? 'normal' : 'loose'] : {
        tight: 'space-y-2',
        normal: 'space-y-4',
        loose: 'space-y-6'
    }[spacing], 
    // Layout shift prevention
    enableLayoutShiftPrevention && 'contain-layout');
    return (_jsxs("div", { ref: layoutRef, className: containerClasses, "data-layout-strategy": strategy, "data-content-density": contentDensity, "data-viewport": `${viewport.width}x${viewport.height}`, "data-device-type": viewport.isMobile ? 'mobile' : viewport.isTablet ? 'tablet' : 'desktop', "data-layout-shifts": layoutShifts, style: {
            // CSS custom properties for advanced styling
            '--viewport-width': `${viewport.width}px`,
            '--viewport-height': `${viewport.height}px`,
            '--safe-area-top': `${viewport.safeAreaInsets.top}px`,
            '--safe-area-bottom': `${viewport.safeAreaInsets.bottom}px`,
            '--safe-area-left': `${viewport.safeAreaInsets.left}px`,
            '--safe-area-right': `${viewport.safeAreaInsets.right}px`,
            // Performance optimizations
            ...(enableLayoutShiftPrevention && {
                containIntrinsicSize: 'auto 100vh'
            })
        }, children: [_jsx("div", { className: contentClasses, children: children }), process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded font-mono z-50", children: [_jsxs("div", { children: ["VP: ", viewport.width, "\u00D7", viewport.height] }), _jsxs("div", { children: ["Device: ", viewport.isMobile ? 'Mobile' : viewport.isTablet ? 'Tablet' : 'Desktop'] }), _jsxs("div", { children: ["Orientation: ", viewport.orientation] }), _jsxs("div", { children: ["Touch: ", viewport.touchCapable ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Notch: ", viewport.hasNotch ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Shifts: ", layoutShifts.toFixed(3)] }), campusContext && (_jsxs("div", { children: ["Network: ", campusContext.networkQuality] }))] }))] }));
};
// Export utilities for other components
export { useAdvancedViewport, calculateDynamicSpacing, calculateMaxWidth };
//# sourceMappingURL=ResponsiveLayout.js.map