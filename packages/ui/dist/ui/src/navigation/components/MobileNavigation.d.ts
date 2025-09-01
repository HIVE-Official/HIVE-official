/**
 * HIVE Mobile Navigation - Bottom Tabs
 * YC-Quality Implementation with Perfect Touch Optimization
 *
 * Optimized for thumb navigation with 44px+ touch targets,
 * smooth animations, and flawless user experience.
 */
import React from 'react';
import type { NavigationItem } from '../core/types';
interface MobileNavigationProps {
    items: ReadonlyArray<NavigationItem>;
    onNavigate: (href: string) => void;
    className?: string;
    testId?: string;
}
export declare const MobileNavigation: React.NamedExoticComponent<MobileNavigationProps>;
/**
 * Calculates safe area padding for iOS devices
 */
export declare const getMobileSafeAreaStyles: () => {
    paddingBottom: string;
    marginBottom: string;
};
/**
 * Creates proper touch target sizes for accessibility
 */
export declare const getTouchTargetStyles: (minSize?: number) => {
    minWidth: string;
    minHeight: string;
};
/**
 * Animation variants for mobile navigation items
 */
export declare const mobileNavItemVariants: {
    idle: {
        scale: number;
        y: number;
    };
    hover: {
        scale: number;
        y: number;
        transition: {
            duration: number;
            ease: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    tap: {
        scale: number;
        transition: {
            duration: number;
            ease: "cubic-bezier(0.4, 0, 0.6, 1)";
        };
    };
};
/**
 * Custom hook for mobile navigation analytics
 */
export declare const useMobileNavigationAnalytics: () => {
    trackNavigation: (from: string, to: string, section: string) => void;
    trackInteraction: (action: string, section: string) => void;
};
export {};
//# sourceMappingURL=MobileNavigation.d.ts.map