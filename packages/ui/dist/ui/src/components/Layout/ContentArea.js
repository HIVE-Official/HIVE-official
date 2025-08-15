'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { useAdvancedViewport } from './ResponsiveLayout';
// Custom hook for intelligent scroll management
function useSmartScroll(containerRef, options) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isNearBottom, setIsNearBottom] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef();
    // Restore scroll position
    useEffect(() => {
        if (options.enableRestoration && containerRef.current) {
            const savedPosition = sessionStorage.getItem(`scroll-${window.location.pathname}`);
            if (savedPosition) {
                containerRef.current.scrollTo(0, parseInt(savedPosition, 10));
            }
        }
    }, [options.enableRestoration]);
    // Handle scroll events with debouncing
    const handleScroll = useCallback(() => {
        if (!containerRef.current)
            return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const threshold = options.threshold || 200;
        setScrollPosition(scrollTop);
        setIsScrolling(true);
        // Check if near bottom for infinite scroll
        const nearBottom = scrollHeight - scrollTop - clientHeight < threshold;
        setIsNearBottom(nearBottom);
        // Trigger load more for infinite scroll
        if (nearBottom && options.strategy === 'infinite-scroll' && options.hasMore && !options.loading && options.onLoadMore) {
            options.onLoadMore();
        }
        // Save scroll position for restoration
        if (options.enableRestoration) {
            sessionStorage.setItem(`scroll-${window.location.pathname}`, scrollTop.toString());
        }
        // Reset scrolling state after delay
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    }, [options.strategy, options.hasMore, options.loading, options.onLoadMore, options.threshold, options.enableRestoration]);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    return { scrollPosition, isNearBottom, isScrolling };
}
// Custom hook for focus management
function useFocusManagement(containerRef, strategy, preserveOnUpdate, initialSelector) {
    const lastFocusedElement = useRef(null);
    // Preserve focus before updates
    const preserveFocus = useCallback(() => {
        if (preserveOnUpdate && document.activeElement instanceof HTMLElement) {
            lastFocusedElement.current = document.activeElement;
        }
    }, [preserveOnUpdate]);
    // Restore or set focus after updates
    const manageFocus = useCallback(() => {
        if (!containerRef.current)
            return;
        switch (strategy) {
            case 'preserve':
                if (lastFocusedElement.current && document.contains(lastFocusedElement.current)) {
                    lastFocusedElement.current.focus();
                }
                break;
            case 'reset':
                containerRef.current.focus();
                break;
            case 'first-element':
                const firstFocusable = containerRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
                break;
            case 'custom':
                if (initialSelector) {
                    const customElement = containerRef.current.querySelector(initialSelector);
                    if (customElement) {
                        customElement.focus();
                    }
                }
                break;
        }
    }, [strategy, initialSelector]);
    return { preserveFocus, manageFocus };
}
// Performance optimization based on device capabilities
function getPerformanceConfig(level, viewport) {
    const configs = {
        'battery-saver': {
            enableAnimations: false,
            updateThrottle: 200,
            enableIntersection: false,
            enableResize: false
        },
        'balanced': {
            enableAnimations: !viewport.isMobile,
            updateThrottle: 100,
            enableIntersection: true,
            enableResize: !viewport.isMobile
        },
        'performance': {
            enableAnimations: true,
            updateThrottle: 16,
            enableIntersection: true,
            enableResize: true
        },
        'adaptive': {
            enableAnimations: viewport.isDesktop,
            updateThrottle: viewport.isMobile ? 100 : 50,
            enableIntersection: true,
            enableResize: viewport.isDesktop
        }
    };
    return configs[level];
}
export const ContentArea = ({ children, strategy = 'static', maxHeight, enableVirtualization = false, itemHeight = 60, onLoadMore, hasMore = false, loading = false, loadingThreshold = 200, scrollBehavior = 'smooth', enableScrollRestoration = true, scrollSnapType = 'none', focusStrategy = 'preserve', preserveFocusOnUpdate = true, initialFocusSelector, performanceLevel = 'adaptive', enableIntersectionObserver = true, enableResizeObserver = true, optimizeForCampusWifi = true, prefetchNext = false, ariaLabel, ariaLive = 'polite', enableKeyboardNavigation = true, padding = 'adaptive', spacing = 'adaptive', className, contentId }) => {
    const viewport = useAdvancedViewport();
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    // Performance configuration
    const perfConfig = useMemo(() => getPerformanceConfig(performanceLevel, viewport), [performanceLevel, viewport]);
    // Smart scroll management
    const scrollState = useSmartScroll(containerRef, {
        strategy,
        onLoadMore,
        hasMore,
        loading,
        threshold: loadingThreshold,
        enableRestoration: enableScrollRestoration
    });
    // Focus management
    const { preserveFocus, manageFocus } = useFocusManagement(containerRef, focusStrategy, preserveFocusOnUpdate, initialFocusSelector);
    // Intersection observer for visibility optimization
    useEffect(() => {
        if (!enableIntersectionObserver || !perfConfig.enableIntersection)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, [enableIntersectionObserver, perfConfig.enableIntersection]);
    // Keyboard navigation
    useEffect(() => {
        if (!enableKeyboardNavigation)
            return;
        const handleKeyDown = (e) => {
            if (e.target !== containerRef.current)
                return;
            switch (e.key) {
                case 'Home':
                    e.preventDefault();
                    containerRef.current?.scrollTo({ top: 0, behavior: scrollBehavior === 'disabled' ? 'auto' : scrollBehavior });
                    break;
                case 'End':
                    e.preventDefault();
                    containerRef.current?.scrollTo({
                        top: containerRef.current.scrollHeight,
                        behavior: scrollBehavior === 'disabled' ? 'auto' : scrollBehavior
                    });
                    break;
                case 'PageUp':
                    e.preventDefault();
                    containerRef.current?.scrollBy({
                        top: -containerRef.current.clientHeight * 0.8,
                        behavior: scrollBehavior === 'disabled' ? 'auto' : scrollBehavior
                    });
                    break;
                case 'PageDown':
                    e.preventDefault();
                    containerRef.current?.scrollBy({
                        top: containerRef.current.clientHeight * 0.8,
                        behavior: scrollBehavior === 'disabled' ? 'auto' : scrollBehavior
                    });
                    break;
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('keydown', handleKeyDown);
            return () => container.removeEventListener('keydown', handleKeyDown);
        }
    }, [enableKeyboardNavigation, scrollBehavior]);
    // Dynamic classes
    const containerClasses = cn(
    // Base layout
    'w-full relative', 
    // Scrolling behavior
    strategy !== 'static' && 'overflow-y-auto', scrollBehavior === 'smooth' && 'scroll-smooth', 
    // Scroll snap
    scrollSnapType !== 'none' && `scroll-snap-type-${scrollSnapType}`, 
    // Performance optimizations
    perfConfig.enableAnimations && 'transform-gpu', !perfConfig.enableAnimations && 'transform-none', 
    // Campus network optimizations
    optimizeForCampusWifi && 'contain-layout contain-style', 
    // Padding
    padding === 'adaptive' ? (viewport.isMobile ? 'p-4' : 'p-6') : {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8'
    }[padding], 
    // Spacing
    spacing === 'adaptive' ? (viewport.isMobile ? 'space-y-4' : 'space-y-6') : {
        tight: 'space-y-2',
        normal: 'space-y-4',
        loose: 'space-y-6'
    }[spacing], 
    // Accessibility
    enableKeyboardNavigation && 'focus:outline-none focus:ring-2 focus:ring-hive-gold/20', 
    // Visibility optimizations
    !isVisible && perfConfig.enableIntersection && 'invisible', className);
    const contentClasses = cn(
    // Base content styling
    'w-full', 
    // Virtual scrolling
    enableVirtualization && 'contain-strict', 
    // Loading state
    loading && 'opacity-75 transition-opacity');
    return (_jsxs("div", { ref: containerRef, className: containerClasses, id: contentId, role: "main", "aria-label": ariaLabel || 'Content area', "aria-live": ariaLive, tabIndex: enableKeyboardNavigation ? 0 : -1, style: {
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            scrollBehavior: scrollBehavior === 'disabled' ? 'auto' : scrollBehavior,
            // Performance hints
            ...(!perfConfig.enableAnimations && {
                willChange: 'auto'
            }),
            // Campus network optimizations
            ...(optimizeForCampusWifi && {
                contain: 'layout style paint'
            })
        }, onFocus: manageFocus, onBlur: preserveFocus, children: [_jsx("div", { className: contentClasses, children: children }), strategy === 'infinite-scroll' && loading && (_jsx("div", { className: "flex justify-center py-6", children: _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary", children: [_jsx("div", { className: "w-4 h-4 border-2 border-hive-gold border-t-transparent rounded-full animate-spin" }), _jsx("span", { className: "text-sm", children: "Loading more content..." })] }) })), strategy === 'infinite-scroll' && !hasMore && !loading && (_jsx("div", { className: "text-center py-6 text-hive-text-tertiary text-sm", children: "You've reached the end! \uD83C\uDF86" })), process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "fixed bottom-16 right-4 bg-black/80 text-white text-xs p-2 rounded font-mono z-40", children: [_jsxs("div", { children: ["Scroll: ", Math.round(scrollState.scrollPosition), "px"] }), _jsxs("div", { children: ["Near bottom: ", scrollState.isNearBottom ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Scrolling: ", scrollState.isScrolling ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Visible: ", isVisible ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Strategy: ", strategy] })] }))] }));
};
// Export utilities
export { useSmartScroll, useFocusManagement, getPerformanceConfig };
//# sourceMappingURL=ContentArea.js.map