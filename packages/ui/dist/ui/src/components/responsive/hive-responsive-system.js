/**
 * HIVE Responsive Breakpoint Strategy
 *
 * Mobile-first responsive system optimized for social consumption:
 * - Mobile (320-768px): Bottom tabs (Feed | Spaces | Profile | Lab)
 * - Tablet (768-1024px): Hybrid layout with collapsible sidebar
 * - Desktop (1024px+): Full sidebar with feed-optimized layouts
 *
 * Breakpoints align with social-first usage patterns and campus device preferences
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
export const hiveBreakpoints = {
    mobile: 768, // Most campus device usage is mobile
    tablet: 1024, // iPad/Surface usage in libraries/study spaces
    desktop: 1440, // Laptop/desktop in dorms/labs
    wide: 1920 // Lab computers/external monitors
};
// ============================================================================
// RESPONSIVE LAYOUT PRESETS
// ============================================================================
export const responsiveLayoutConfigs = {
    mobile: {
        deviceType: 'mobile',
        layoutMode: 'mobile-tabs',
        navigation: {
            variant: 'topbar',
            showSidebar: false,
            showBottomTabs: true,
            sidebarCollapsible: false,
            defaultCollapsed: false
        },
        content: {
            maxWidth: '100%',
            padding: '4px',
            columns: 1,
            gridGap: '16px',
            cardSpacing: '3'
        },
        feed: {
            itemsPerPage: 10,
            showSidePanels: false,
            compactMode: true,
            previewImages: true
        },
        bentoGrid: {
            columns: 1,
            minCardWidth: '100%',
            maxCardHeight: '300px',
            allowReordering: false,
            showExpandButtons: true
        },
        spaceLayout: {
            surfaceColumns: 1,
            showAllSurfaces: false,
            allowHorizontalScroll: true,
            surfacePreview: true
        }
    },
    tablet: {
        deviceType: 'tablet',
        layoutMode: 'tablet-hybrid',
        navigation: {
            variant: 'sidebar',
            showSidebar: true,
            showBottomTabs: false,
            sidebarCollapsible: true,
            defaultCollapsed: true
        },
        content: {
            maxWidth: '100%',
            padding: '6px',
            columns: 2,
            gridGap: '24px',
            cardSpacing: '16px'
        },
        feed: {
            itemsPerPage: 15,
            showSidePanels: false,
            compactMode: false,
            previewImages: true
        },
        bentoGrid: {
            columns: 2,
            minCardWidth: '300px',
            maxCardHeight: '400px',
            allowReordering: true,
            showExpandButtons: true
        },
        spaceLayout: {
            surfaceColumns: 2,
            showAllSurfaces: true,
            allowHorizontalScroll: false,
            surfacePreview: false
        }
    },
    desktop: {
        deviceType: 'desktop',
        layoutMode: 'desktop-sidebar',
        navigation: {
            variant: 'sidebar',
            showSidebar: true,
            showBottomTabs: false,
            sidebarCollapsible: true,
            defaultCollapsed: false
        },
        content: {
            maxWidth: '1200px',
            padding: '8px',
            columns: 3,
            gridGap: '32px',
            cardSpacing: '5'
        },
        feed: {
            itemsPerPage: 20,
            showSidePanels: true,
            compactMode: false,
            previewImages: true
        },
        bentoGrid: {
            columns: 3,
            minCardWidth: '320px',
            maxCardHeight: '500px',
            allowReordering: true,
            showExpandButtons: false
        },
        spaceLayout: {
            surfaceColumns: 3,
            showAllSurfaces: true,
            allowHorizontalScroll: false,
            surfacePreview: false
        }
    },
    wide: {
        deviceType: 'wide',
        layoutMode: 'wide-columns',
        navigation: {
            variant: 'sidebar',
            showSidebar: true,
            showBottomTabs: false,
            sidebarCollapsible: false,
            defaultCollapsed: false
        },
        content: {
            maxWidth: '1440px',
            padding: '10',
            columns: 4,
            gridGap: '10',
            cardSpacing: '24px'
        },
        feed: {
            itemsPerPage: 25,
            showSidePanels: true,
            compactMode: false,
            previewImages: true
        },
        bentoGrid: {
            columns: 4,
            minCardWidth: '300px',
            maxCardHeight: '600px',
            allowReordering: true,
            showExpandButtons: false
        },
        spaceLayout: {
            surfaceColumns: 3,
            showAllSurfaces: true,
            allowHorizontalScroll: false,
            surfacePreview: false
        }
    }
};
const ResponsiveContext = createContext(null);
export const useResponsive = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error('useResponsive must be used within a ResponsiveProvider');
    }
    return context;
};
export function ResponsiveProvider({ children, breakpoints = {}, customLayouts = {} }) {
    const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
    // Merge custom breakpoints with defaults
    const mergedBreakpoints = { ...hiveBreakpoints, ...breakpoints };
    // Merge custom layouts with defaults
    const mergedLayouts = { ...responsiveLayoutConfigs, ...customLayouts };
    // Determine current device type based on window width
    const getDeviceType = (width) => {
        if (width >= mergedBreakpoints.wide)
            return 'wide';
        if (width >= mergedBreakpoints.desktop)
            return 'desktop';
        if (width >= mergedBreakpoints.tablet)
            return 'tablet';
        return 'mobile';
    };
    const deviceType = getDeviceType(windowSize.width);
    const layoutConfig = mergedLayouts[deviceType];
    const layoutMode = layoutConfig.layoutMode;
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        // Set initial size
        handleResize();
        // Add resize listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Utility functions
    const getBreakpointValue = (values) => {
        return values[deviceType] || values.mobile || Object.values(values)[0];
    };
    const isBreakpointAndAbove = (breakpoint) => {
        const breakpointOrder = ['mobile', 'tablet', 'desktop', 'wide'];
        const currentIndex = breakpointOrder.indexOf(deviceType);
        const targetIndex = breakpointOrder.indexOf(breakpoint);
        return currentIndex >= targetIndex;
    };
    const isBreakpointAndBelow = (breakpoint) => {
        const breakpointOrder = ['mobile', 'tablet', 'desktop', 'wide'];
        const currentIndex = breakpointOrder.indexOf(deviceType);
        const targetIndex = breakpointOrder.indexOf(breakpoint);
        return currentIndex <= targetIndex;
    };
    const value = {
        deviceType,
        layoutMode,
        layoutConfig,
        windowSize,
        // Boolean helpers
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        isWide: deviceType === 'wide',
        // Utility functions
        getBreakpointValue,
        isBreakpointAndAbove,
        isBreakpointAndBelow
    };
    return (_jsx(ResponsiveContext.Provider, { value: value, children: children }));
}
export function ResponsiveShow({ on, above, below, children, className }) {
    const { deviceType, isBreakpointAndAbove, isBreakpointAndBelow } = useResponsive();
    let shouldShow = true;
    if (on && !on.includes(deviceType)) {
        shouldShow = false;
    }
    if (above && !isBreakpointAndAbove(above)) {
        shouldShow = false;
    }
    if (below && !isBreakpointAndBelow(below)) {
        shouldShow = false;
    }
    if (!shouldShow)
        return null;
    return _jsx("div", { className: className, children: children });
}
export function ResponsiveContainer({ children, className, maxWidth = true, padding = true, centered = true }) {
    const { layoutConfig } = useResponsive();
    return (_jsx("div", { className: cn('w-full', maxWidth && 'mx-auto', centered && 'mx-auto', className), style: {
            maxWidth: maxWidth ? layoutConfig.content.maxWidth : undefined,
            padding: padding ? layoutConfig.content.padding : undefined
        }, children: children }));
}
export function ResponsiveGrid({ children, className, useLayoutColumns = true, customColumns = {} }) {
    const { layoutConfig, getBreakpointValue } = useResponsive();
    const columns = useLayoutColumns
        ? layoutConfig.content.columns
        : getBreakpointValue(customColumns);
    return (_jsx("div", { className: cn('grid w-full', className), style: {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: layoutConfig.content.gridGap
        }, children: children }));
}
export function MobileBottomTabs({ tabs, onTabClick, className }) {
    const { isMobile, layoutConfig } = useResponsive();
    if (!isMobile || !layoutConfig.navigation.showBottomTabs) {
        return null;
    }
    return (_jsx("div", { className: cn('fixed bottom-0 left-0 right-0 z-50', 'bg-[var(--hive-background-primary)] border-t border-[var(--hive-border-subtle)]', 'backdrop-blur-sm', className), children: _jsx("div", { className: "flex", children: tabs.map((tab) => {
                const Icon = tab.icon;
                return (_jsxs("button", { onClick: () => onTabClick?.(tab.id), className: cn('flex-1 flex flex-col items-center justify-center py-2 px-1', 'text-xs font-medium transition-colors duration-200', tab.isActive
                        ? 'text-[var(--hive-brand-primary)]'
                        : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'), children: [_jsxs("div", { className: "relative mb-1", children: [_jsx(Icon, { className: "w-5 h-5" }), tab.badge && tab.badge > 0 && (_jsx("div", { className: "absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center", children: tab.badge > 9 ? '9+' : tab.badge }))] }), _jsx("span", { className: "truncate", children: tab.label })] }, tab.id));
            }) }) }));
}
// ============================================================================
// RESPONSIVE UTILITY HOOKS
// ============================================================================
/**
 * Hook for responsive values
 */
export function useResponsiveValue(values) {
    const { getBreakpointValue } = useResponsive();
    return getBreakpointValue(values);
}
/**
 * Hook for media queries
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const handler = (event) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);
    return matches;
}
// ============================================================================
// CSS UTILITY GENERATORS
// ============================================================================
/**
 * Generate responsive CSS classes
 */
export function generateResponsiveClasses(baseClass, variants) {
    const classes = [baseClass];
    if (variants) {
        Object.entries(variants).forEach(([breakpoint, variant]) => {
            switch (breakpoint) {
                case 'mobile':
                    classes.push(`max-md:${variant}`);
                    break;
                case 'tablet':
                    classes.push(`md:${variant}`);
                    break;
                case 'desktop':
                    classes.push(`lg:${variant}`);
                    break;
                case 'wide':
                    classes.push(`xl:${variant}`);
                    break;
            }
        });
    }
    return classes.join(' ');
}
//# sourceMappingURL=hive-responsive-system.js.map