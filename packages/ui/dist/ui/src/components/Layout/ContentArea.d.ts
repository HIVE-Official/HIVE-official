import React from 'react';
type ContentStrategy = 'infinite-scroll' | 'pagination' | 'virtual-scroll' | 'static';
export type ContentScrollBehavior = 'smooth' | 'auto' | 'disabled';
type FocusStrategy = 'preserve' | 'reset' | 'first-element' | 'custom';
type PerformanceLevel = 'battery-saver' | 'balanced' | 'performance' | 'adaptive';
interface ContentAreaProps {
    children: React.ReactNode;
    strategy?: ContentStrategy;
    maxHeight?: string | number;
    enableVirtualization?: boolean;
    itemHeight?: number;
    onLoadMore?: () => Promise<void>;
    hasMore?: boolean;
    loading?: boolean;
    loadingThreshold?: number;
    scrollBehavior?: ContentScrollBehavior;
    enableScrollRestoration?: boolean;
    scrollSnapType?: 'none' | 'y-mandatory' | 'y-proximity' | 'x-mandatory' | 'x-proximity';
    focusStrategy?: FocusStrategy;
    preserveFocusOnUpdate?: boolean;
    initialFocusSelector?: string;
    performanceLevel?: PerformanceLevel;
    enableIntersectionObserver?: boolean;
    enableResizeObserver?: boolean;
    optimizeForCampusWifi?: boolean;
    prefetchNext?: boolean;
    ariaLabel?: string;
    ariaLive?: 'off' | 'polite' | 'assertive';
    enableKeyboardNavigation?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'adaptive';
    spacing?: 'tight' | 'normal' | 'loose' | 'adaptive';
    className?: string;
    contentId?: string;
}
declare function useSmartScroll(containerRef: React.RefObject<HTMLElement>, options: {
    strategy: ContentStrategy;
    onLoadMore?: () => Promise<void>;
    hasMore?: boolean;
    loading?: boolean;
    threshold?: number;
    enableRestoration?: boolean;
}): {
    scrollPosition: number;
    isNearBottom: boolean;
    isScrolling: boolean;
};
declare function useFocusManagement(containerRef: React.RefObject<HTMLElement>, strategy: FocusStrategy, preserveOnUpdate: boolean, initialSelector?: string): {
    preserveFocus: () => void;
    manageFocus: () => void;
};
declare function getPerformanceConfig(level: PerformanceLevel, viewport: any): {
    enableAnimations: boolean;
    updateThrottle: number;
    enableIntersection: boolean;
    enableResize: boolean;
} | {
    enableAnimations: boolean;
    updateThrottle: number;
    enableIntersection: boolean;
    enableResize: boolean;
} | {
    enableAnimations: boolean;
    updateThrottle: number;
    enableIntersection: boolean;
    enableResize: boolean;
} | {
    enableAnimations: any;
    updateThrottle: number;
    enableIntersection: boolean;
    enableResize: any;
};
export declare const ContentArea: React.FC<ContentAreaProps>;
export { useSmartScroll, useFocusManagement, getPerformanceConfig };
export type { ContentAreaProps, ContentStrategy, FocusStrategy, PerformanceLevel };
//# sourceMappingURL=ContentArea.d.ts.map