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
import React from 'react';
import type { NavigationVariant } from '../navigation/hive-navigation-system';
export interface ResponsiveBreakpoints {
    mobile: number;
    tablet: number;
    desktop: number;
    wide: number;
}
export declare const hiveBreakpoints: ResponsiveBreakpoints;
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide';
export type LayoutMode = 'mobile-tabs' | 'tablet-hybrid' | 'desktop-sidebar' | 'wide-columns';
export interface ResponsiveLayoutConfig {
    deviceType: DeviceType;
    layoutMode: LayoutMode;
    navigation: {
        variant: NavigationVariant;
        showSidebar: boolean;
        showBottomTabs: boolean;
        sidebarCollapsible: boolean;
        defaultCollapsed: boolean;
    };
    content: {
        maxWidth: string;
        padding: string;
        columns: number;
        gridGap: string;
        cardSpacing: string;
    };
    feed: {
        itemsPerPage: number;
        showSidePanels: boolean;
        compactMode: boolean;
        previewImages: boolean;
    };
    bentoGrid: {
        columns: number;
        minCardWidth: string;
        maxCardHeight: string;
        allowReordering: boolean;
        showExpandButtons: boolean;
    };
    spaceLayout: {
        surfaceColumns: number;
        showAllSurfaces: boolean;
        allowHorizontalScroll: boolean;
        surfacePreview: boolean;
    };
}
export declare const responsiveLayoutConfigs: Record<DeviceType, ResponsiveLayoutConfig>;
interface ResponsiveContextType {
    deviceType: DeviceType;
    layoutMode: LayoutMode;
    layoutConfig: ResponsiveLayoutConfig;
    windowSize: {
        width: number;
        height: number;
    };
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isWide: boolean;
    getBreakpointValue: (values: Partial<Record<DeviceType, any>>) => any;
    isBreakpointAndAbove: (breakpoint: DeviceType) => boolean;
    isBreakpointAndBelow: (breakpoint: DeviceType) => boolean;
}
export declare const useResponsive: () => ResponsiveContextType;
interface ResponsiveProviderProps {
    children: React.ReactNode;
    breakpoints?: Partial<ResponsiveBreakpoints>;
    customLayouts?: Partial<Record<DeviceType, ResponsiveLayoutConfig>>;
}
export declare function ResponsiveProvider({ children, breakpoints, customLayouts }: ResponsiveProviderProps): () => void;
/**
 * Show/hide content based on breakpoints
 */
interface ResponsiveShowProps {
    on?: DeviceType[];
    above?: DeviceType;
    below?: DeviceType;
    children: React.ReactNode;
    className?: string;
}
export declare function ResponsiveShow({ on, above, below, children, className }: ResponsiveShowProps): import("react/jsx-runtime").JSX.Element;
/**
 * Responsive container with breakpoint-specific styling
 */
interface ResponsiveContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: boolean;
    padding?: boolean;
    centered?: boolean;
}
export declare function ResponsiveContainer({ children, className, maxWidth, padding, centered }: ResponsiveContainerProps): import("react/jsx-runtime").JSX.Element;
/**
 * Responsive grid with breakpoint-specific columns
 */
interface ResponsiveGridProps {
    children: React.ReactNode;
    className?: string;
    useLayoutColumns?: boolean;
    customColumns?: Partial<Record<DeviceType, number>>;
}
export declare function ResponsiveGrid({ children, className, useLayoutColumns, customColumns }: ResponsiveGridProps): import("react/jsx-runtime").JSX.Element;
/**
 * Bottom tab navigation for mobile
 */
interface MobileBottomTabsProps {
    tabs: Array<{
        id: string;
        label: string;
        icon: React.ComponentType<{
            className?: string;
        }>;
        href: string;
        badge?: number;
        isActive?: boolean;
    }>;
    onTabClick?: (tabId: string) => void;
    className?: string;
}
export declare function MobileBottomTabs({ tabs, onTabClick, className }: MobileBottomTabsProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook for responsive values
 */
export declare function useResponsiveValue<T>(values: Partial<Record<DeviceType, T>>): T | undefined;
/**
 * Hook for media queries
 */
export declare function useMediaQuery(query: string): boolean;
/**
 * Generate responsive CSS classes
 */
export declare function generateResponsiveClasses(baseClass: string, variants: Partial<Record<DeviceType, string>>): string;
export {};
//# sourceMappingURL=hive-responsive-system.d.ts.map