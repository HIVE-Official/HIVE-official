/**
 * HIVE Navigation System - Core Types
 * YC-Quality Implementation with Zero Tolerance for Bugs
 *
 * This file defines the complete type system for HIVE's adaptive navigation.
 * Every type is designed for maximum type safety and developer experience.
 */
// ============================================================================
// CORE NAVIGATION TYPES
// ============================================================================
/**
 * The four pillars of HIVE navigation as defined in the product specification
 */
export const NAVIGATION_SECTIONS = {
    PROFILE: 'profile',
    FEED: 'feed',
    SPACES: 'spaces',
    HIVELAB: 'hivelab'
};
/**
 * Screen size categories with exact breakpoints
 */
export const BREAKPOINTS = {
    MOBILE: 768, // < 768px
    TABLET: 1200, // 768px - 1199px  
    DESKTOP: 1440, // 1200px - 1439px
    WIDE: 1440 // >= 1440px
};
// ============================================================================
// UTILITY TYPES
// ============================================================================
/**
 * Type guards for runtime type checking
 */
export const isNavigationSection = (value) => {
    return Object.values(NAVIGATION_SECTIONS).includes(value);
};
export const isNavigationPreference = (value) => {
    return ['tabs', 'sidebar', 'auto'].includes(value);
};
export const isScreenSize = (value) => {
    return ['mobile', 'tablet', 'desktop', 'wide'].includes(value);
};
//# sourceMappingURL=types.js.map