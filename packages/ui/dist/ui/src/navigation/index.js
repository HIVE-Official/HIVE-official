/**
 * HIVE Navigation System - Complete Export
 * YC-Quality Production-Ready Navigation
 *
 * Complete adaptive navigation system with responsive behavior,
 * user preferences, and perfect brand consistency.
 */
// ============================================================================
// MAIN NAVIGATION COMPONENTS
// ============================================================================
export { default as NavigationContainer } from './components/NavigationContainer';
export { withNavigation } from './components/NavigationContainer';
// Individual navigation components
export { MobileNavigation } from './components/MobileNavigation';
export { DesktopSidebar, SidebarOverlay } from './components/DesktopSidebar';
export { DesktopTopbar } from './components/DesktopTopbar';
export { TabletDrawer, TabletDrawerTrigger } from './components/TabletDrawer';
// ============================================================================
// HOOKS AND STATE MANAGEMENT
// ============================================================================
export { useNavigationState, useCurrentNavigationSection, useIsMobileNavigation, useNavigationPreferences } from './hooks/useNavigationState';
export { NAVIGATION_SECTIONS, BREAKPOINTS } from './core/types';
// ============================================================================
// NAVIGATION ENGINE AND UTILITIES
// ============================================================================
export { calculateNavigationState, calculateNavigationLayout, resolveNavigationMode, getScreenSize, createResizeHandler, safeCalculateNavigationState } from './core/engine';
// ============================================================================
// BRAND DATA AND CONSTANTS
// ============================================================================
export { createNavigationItems, getNavigationItemsWithActiveState, NAVIGATION_THEME, NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y, NAVIGATION_MEDIA_QUERIES, NAVIGATION_CSS_VARS } from './core/data';
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
export { getMobileSafeAreaStyles, getTouchTargetStyles, mobileNavItemVariants, useMobileNavigationAnalytics } from './components/MobileNavigation';
export { useDrawerSwipeGesture } from './components/TabletDrawer';
// ============================================================================
// VERSION AND METADATA
// ============================================================================
export const NAVIGATION_VERSION = '1.0.0';
export const NAVIGATION_BUILD_DATE = new Date().toISOString();
// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================
/**
 * Default navigation configuration for HIVE applications
 */
export const DEFAULT_NAVIGATION_CONFIG = {
    enableAnalytics: true,
    enableDebug: process.env.NODE_ENV === 'development',
    initialPreference: 'auto',
    enableKeyboardShortcuts: true,
    enableSwipeGestures: true,
    animationDuration: 200,
    sidebarWidth: {
        expanded: 256,
        collapsed: 64
    },
    breakpoints: {
        mobile: 768,
        tablet: 1200,
        desktop: 1440
    }
};
//# sourceMappingURL=index.js.map