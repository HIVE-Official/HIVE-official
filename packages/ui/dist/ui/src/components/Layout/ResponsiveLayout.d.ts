import React from 'react';
interface ViewportState {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    orientation: 'portrait' | 'landscape';
    touchCapable: boolean;
    hasNotch: boolean;
    safeAreaInsets: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}
type ContentDensity = 'compact' | 'comfortable' | 'spacious';
type LayoutStrategy = 'mobile-first' | 'content-aware' | 'performance-optimized';
interface ResponsiveLayoutProps {
    children: React.ReactNode;
    strategy?: LayoutStrategy;
    contentDensity?: ContentDensity;
    adaptToNotch?: boolean;
    enableGestureNavigation?: boolean;
    enableLayoutShiftPrevention?: boolean;
    prefersReducedMotion?: boolean;
    optimizeForCampusNetwork?: boolean;
    campusContext?: {
        networkQuality: 'poor' | 'fair' | 'good' | 'excellent';
        deviceType: 'personal' | 'shared' | 'library';
        accessibilityNeeds?: string[];
    };
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'adaptive';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'adaptive';
    spacing?: 'tight' | 'normal' | 'loose' | 'adaptive';
    announceLayoutChanges?: boolean;
    maintainFocusOnResize?: boolean;
    className?: string;
}
declare function useAdvancedViewport(): ViewportState;
declare function calculateDynamicSpacing(viewport: ViewportState, density: ContentDensity, networkQuality?: string): string;
declare function calculateMaxWidth(maxWidth: ResponsiveLayoutProps['maxWidth'], viewport: ViewportState, strategy: LayoutStrategy): string;
export declare const ResponsiveLayout: React.FC<ResponsiveLayoutProps>;
export { useAdvancedViewport, calculateDynamicSpacing, calculateMaxWidth };
export type { ViewportState, ContentDensity, LayoutStrategy, ResponsiveLayoutProps };
//# sourceMappingURL=ResponsiveLayout.d.ts.map