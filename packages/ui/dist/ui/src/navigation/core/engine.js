/**
 * HIVE Navigation Engine - Core Logic
 * YC-Quality Implementation with Bulletproof Performance
 *
 * This is the brain of HIVE's navigation system. It handles:
 * - Responsive breakpoint detection
 * - User preference resolution
 * - Layout mode calculation
 * - Performance optimization
 */
import { BREAKPOINTS } from './types';
// ============================================================================
// RESPONSIVE ENGINE
// ============================================================================
/**
 * Determines screen size category from viewport width
 * Uses exact breakpoints from HIVE specification
 */
export const getScreenSize = (width) => {
    if (width < BREAKPOINTS.MOBILE)
        return 'mobile';
    if (width < BREAKPOINTS.TABLET)
        return 'tablet';
    if (width < BREAKPOINTS.WIDE)
        return 'desktop';
    return 'wide';
};
/**
 * Resolves the optimal navigation mode based on:
 * 1. Screen size constraints
 * 2. User preference
 * 3. HIVE UX specifications
 */
export const resolveNavigationMode = (screenSize, userPreference) => {
    // Mobile: Always bottom tabs (preference ignored)
    if (screenSize === 'mobile') {
        return 'mobile-tabs';
    }
    // Tablet: Always drawer (preference ignored)
    if (screenSize === 'tablet') {
        return 'tablet-drawer';
    }
    // Desktop & Wide: Apply user preference
    switch (userPreference) {
        case 'tabs':
            return 'desktop-tabs';
        case 'sidebar':
            return 'desktop-sidebar';
        case 'auto':
            // Auto mode: tabs for desktop, sidebar for wide
            return screenSize === 'wide' ? 'desktop-sidebar' : 'desktop-tabs';
        default:
            // Fallback to auto behavior
            return screenSize === 'wide' ? 'desktop-sidebar' : 'desktop-tabs';
    }
};
/**
 * Calculates complete navigation state
 * Optimized for performance with memoization-friendly structure
 */
export const calculateNavigationState = (screenWidth, userPreference, sidebarCollapsed) => {
    const screenSize = getScreenSize(screenWidth);
    const mode = resolveNavigationMode(screenSize, userPreference);
    return {
        mode,
        screenSize,
        screenWidth,
        userPreference,
        sidebarCollapsed,
        showMobileNav: mode === 'mobile-tabs',
        showTabletDrawer: mode === 'tablet-drawer',
        showDesktopTabs: mode === 'desktop-tabs',
        showDesktopSidebar: mode === 'desktop-sidebar'
    };
};
/**
 * Determines layout configuration from navigation state
 * Provides exact spacing and positioning values
 */
export const calculateNavigationLayout = (state) => {
    const { mode, sidebarCollapsed } = state;
    switch (mode) {
        case 'mobile-tabs':
            return {
                mode,
                showHeader: false,
                showSidebar: false,
                showBottomTabs: true,
                contentPadding: {
                    top: 0,
                    bottom: 80, // Space for bottom tabs
                    left: 0,
                    right: 0
                }
            };
        case 'tablet-drawer':
            return {
                mode,
                showHeader: true,
                showSidebar: false, // Drawer is shown on demand
                showBottomTabs: false,
                contentPadding: {
                    top: 64, // Header height
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };
        case 'desktop-tabs':
            return {
                mode,
                showHeader: true,
                showSidebar: false,
                showBottomTabs: false,
                contentPadding: {
                    top: 64, // Header height
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            };
        case 'desktop-sidebar': {
            const sidebarWidth = sidebarCollapsed ? 64 : 256;
            return {
                mode,
                showHeader: false,
                showSidebar: true,
                showBottomTabs: false,
                contentPadding: {
                    top: 0,
                    bottom: 0,
                    left: sidebarWidth,
                    right: 0
                }
            };
        }
        default:
            // Fallback to mobile layout
            return {
                mode: 'mobile-tabs',
                showHeader: false,
                showSidebar: false,
                showBottomTabs: true,
                contentPadding: {
                    top: 0,
                    bottom: 80,
                    left: 0,
                    right: 0
                }
            };
    }
};
// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================
/**
 * Debounced window resize handler
 * Prevents excessive recalculations during window resize
 */
export const createResizeHandler = (callback, delay = 150) => {
    let timeoutId;
    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(window.innerWidth);
        }, delay);
    };
};
/**
 * Memoization helper for navigation state calculations
 * Prevents unnecessary recalculations when inputs haven't changed
 */
export const createNavigationStateMemo = () => {
    let lastInputs = null;
    let lastResult = null;
    return (screenWidth, userPreference, sidebarCollapsed) => {
        // Check if inputs have changed
        if (lastInputs &&
            lastInputs.screenWidth === screenWidth &&
            lastInputs.userPreference === userPreference &&
            lastInputs.sidebarCollapsed === sidebarCollapsed &&
            lastResult) {
            return lastResult;
        }
        // Calculate new state
        const newState = calculateNavigationState(screenWidth, userPreference, sidebarCollapsed);
        // Cache inputs and result
        lastInputs = { screenWidth, userPreference, sidebarCollapsed };
        lastResult = newState;
        return newState;
    };
};
// ============================================================================
// VALIDATION & ERROR HANDLING
// ============================================================================
/**
 * Validates navigation configuration
 * Ensures all required values are present and valid
 */
export const validateNavigationInputs = (screenWidth, userPreference, sidebarCollapsed) => {
    if (!Number.isFinite(screenWidth) || screenWidth < 0) {
        throw new Error(`Invalid screen width: ${screenWidth}`);
    }
    if (!['tabs', 'sidebar', 'auto'].includes(userPreference)) {
        throw new Error(`Invalid user preference: ${userPreference}`);
    }
    if (typeof sidebarCollapsed !== 'boolean') {
        throw new Error(`Invalid sidebar collapsed state: ${sidebarCollapsed}`);
    }
};
/**
 * Safe wrapper for navigation calculations
 * Provides fallback behavior if calculations fail
 */
export const safeCalculateNavigationState = (screenWidth, userPreference, sidebarCollapsed) => {
    try {
        validateNavigationInputs(screenWidth, userPreference, sidebarCollapsed);
        return calculateNavigationState(screenWidth, userPreference, sidebarCollapsed);
    }
    catch (error) {
        console.error('Navigation state calculation failed:', error);
        // Return safe fallback state
        return {
            mode: 'mobile-tabs',
            screenSize: 'mobile',
            screenWidth: 375,
            userPreference: 'auto',
            sidebarCollapsed: true,
            showMobileNav: true,
            showTabletDrawer: false,
            showDesktopTabs: false,
            showDesktopSidebar: false
        };
    }
};
// ============================================================================
// ANALYTICS & DEBUGGING
// ============================================================================
/**
 * Creates navigation state change event for analytics
 */
export const createNavigationStateChangeEvent = (previousState, currentState) => {
    return {
        type: 'navigation_state_change',
        timestamp: Date.now(),
        data: {
            from: previousState?.mode || null,
            to: currentState.mode,
            screenSize: currentState.screenSize,
            screenWidth: currentState.screenWidth,
            userPreference: currentState.userPreference,
            trigger: previousState ? 'user_action' : 'initial_load'
        }
    };
};
/**
 * Debug helper for navigation state
 * Only enabled in development mode
 */
export const debugNavigationState = (state) => {
    if (process.env.NODE_ENV === 'development') {
        console.group('🧭 HIVE Navigation State');
        console.log('Mode:', state.mode);
        console.log('Screen:', `${state.screenSize} (${state.screenWidth}px)`);
        console.log('Preference:', state.userPreference);
        console.log('Sidebar Collapsed:', state.sidebarCollapsed);
        console.log('Layout Flags:', {
            showMobileNav: state.showMobileNav,
            showTabletDrawer: state.showTabletDrawer,
            showDesktopTabs: state.showDesktopTabs,
            showDesktopSidebar: state.showDesktopSidebar
        });
        console.groupEnd();
    }
};
//# sourceMappingURL=engine.js.map