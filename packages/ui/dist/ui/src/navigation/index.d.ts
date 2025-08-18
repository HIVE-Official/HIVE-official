/**
 * HIVE Navigation System - Complete Export
 * YC-Quality Production-Ready Navigation
 *
 * Complete adaptive navigation system with responsive behavior,
 * user preferences, and perfect brand consistency.
 */
export { default as NavigationContainer } from './components/NavigationContainer';
export { withNavigation } from './components/NavigationContainer';
export { MobileNavigation } from './components/MobileNavigation';
export { DesktopSidebar, SidebarOverlay } from './components/DesktopSidebar';
export { DesktopTopbar } from './components/DesktopTopbar';
export { TabletDrawer, TabletDrawerTrigger } from './components/TabletDrawer';
export { useNavigationState, useCurrentNavigationSection, useIsMobileNavigation, useNavigationPreferences } from './hooks/useNavigationState';
export type { NavigationItem, NavigationUser, NavigationSection, NavigationPreference, NavigationMode, NavigationState, NavigationLayout, NavigationContext, ScreenSize, NavigationBadge } from './core/types';
export { NAVIGATION_SECTIONS, BREAKPOINTS } from './core/types';
export { calculateNavigationState, calculateNavigationLayout, resolveNavigationMode, getScreenSize, createResizeHandler, safeCalculateNavigationState } from './core/engine';
export { createNavigationItems, getNavigationItemsWithActiveState, NAVIGATION_THEME, NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y, NAVIGATION_MEDIA_QUERIES, NAVIGATION_CSS_VARS } from './core/data';
export { getMobileSafeAreaStyles, getTouchTargetStyles, mobileNavItemVariants, useMobileNavigationAnalytics } from './components/MobileNavigation';
export { useDrawerSwipeGesture } from './components/TabletDrawer';
export declare const NAVIGATION_VERSION = "1.0.0";
export declare const NAVIGATION_BUILD_DATE: string;
/**
 * Default navigation configuration for HIVE applications
 */
export declare const DEFAULT_NAVIGATION_CONFIG: {
    readonly enableAnalytics: true;
    readonly enableDebug: boolean;
    readonly initialPreference: "auto";
    readonly enableKeyboardShortcuts: true;
    readonly enableSwipeGestures: true;
    readonly animationDuration: 200;
    readonly sidebarWidth: {
        readonly expanded: 256;
        readonly collapsed: 64;
    };
    readonly breakpoints: {
        readonly mobile: 768;
        readonly tablet: 1200;
        readonly desktop: 1440;
    };
};
//# sourceMappingURL=index.d.ts.map