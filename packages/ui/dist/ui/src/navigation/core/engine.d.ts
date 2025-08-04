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
import { NavigationMode, NavigationPreference, NavigationState, NavigationLayout, ScreenSize } from './types';
/**
 * Determines screen size category from viewport width
 * Uses exact breakpoints from HIVE specification
 */
export declare const getScreenSize: (width: number) => ScreenSize;
/**
 * Resolves the optimal navigation mode based on:
 * 1. Screen size constraints
 * 2. User preference
 * 3. HIVE UX specifications
 */
export declare const resolveNavigationMode: (screenSize: ScreenSize, userPreference: NavigationPreference) => NavigationMode;
/**
 * Calculates complete navigation state
 * Optimized for performance with memoization-friendly structure
 */
export declare const calculateNavigationState: (screenWidth: number, userPreference: NavigationPreference, sidebarCollapsed: boolean) => NavigationState;
/**
 * Determines layout configuration from navigation state
 * Provides exact spacing and positioning values
 */
export declare const calculateNavigationLayout: (state: NavigationState) => NavigationLayout;
/**
 * Debounced window resize handler
 * Prevents excessive recalculations during window resize
 */
export declare const createResizeHandler: (callback: (width: number) => void, delay?: number) => () => void;
/**
 * Memoization helper for navigation state calculations
 * Prevents unnecessary recalculations when inputs haven't changed
 */
export declare const createNavigationStateMemo: () => (screenWidth: number, userPreference: NavigationPreference, sidebarCollapsed: boolean) => NavigationState;
/**
 * Validates navigation configuration
 * Ensures all required values are present and valid
 */
export declare const validateNavigationInputs: (screenWidth: number, userPreference: NavigationPreference, sidebarCollapsed: boolean) => void;
/**
 * Safe wrapper for navigation calculations
 * Provides fallback behavior if calculations fail
 */
export declare const safeCalculateNavigationState: (screenWidth: number, userPreference: NavigationPreference, sidebarCollapsed: boolean) => NavigationState;
/**
 * Creates navigation state change event for analytics
 */
export declare const createNavigationStateChangeEvent: (previousState: NavigationState | null, currentState: NavigationState) => {
    type: "navigation_state_change";
    timestamp: number;
    data: {
        from: NavigationMode;
        to: NavigationMode;
        screenSize: ScreenSize;
        screenWidth: number;
        userPreference: NavigationPreference;
        trigger: string;
    };
};
/**
 * Debug helper for navigation state
 * Only enabled in development mode
 */
export declare const debugNavigationState: (state: NavigationState) => void;
//# sourceMappingURL=engine.d.ts.map