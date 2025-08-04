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
export { default as NavigationContainer } from './components/NavigationContainer.js';
export { withNavigation } from './components/NavigationContainer.js';
// Individual navigation components
export { MobileNavigation } from './components/MobileNavigation.js';
export { DesktopSidebar, SidebarOverlay } from './components/DesktopSidebar.js';
export { DesktopTopbar } from './components/DesktopTopbar.js';
export { TabletDrawer, TabletDrawerTrigger } from './components/TabletDrawer.js';
// ============================================================================
// HOOKS AND STATE MANAGEMENT
// ============================================================================
export { useNavigationState, useCurrentNavigationSection, useIsMobileNavigation, useNavigationPreferences } from './hooks/useNavigationState.js';
export { NAVIGATION_SECTIONS, BREAKPOINTS } from './core/types.js';
// ============================================================================
// NAVIGATION ENGINE AND UTILITIES
// ============================================================================
export { calculateNavigationState, calculateNavigationLayout, resolveNavigationMode, getScreenSize, createResizeHandler, safeCalculateNavigationState } from './core/engine.js';
// ============================================================================
// BRAND DATA AND CONSTANTS
// ============================================================================
export { createNavigationItems, getNavigationItemsWithActiveState, NAVIGATION_THEME, NAVIGATION_SIZING, NAVIGATION_MOTION, NAVIGATION_A11Y, NAVIGATION_MEDIA_QUERIES, NAVIGATION_CSS_VARS } from './core/data.js';
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
export { getMobileSafeAreaStyles, getTouchTargetStyles, mobileNavItemVariants, useMobileNavigationAnalytics } from './components/MobileNavigation.js';
export { useDrawerSwipeGesture } from './components/TabletDrawer.js';
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