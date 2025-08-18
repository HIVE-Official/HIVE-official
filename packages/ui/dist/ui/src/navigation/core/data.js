/**
 * HIVE Navigation Data - Brand-Consistent Navigation Items
 * YC-Quality Implementation with Perfect Brand Alignment
 *
 * This file defines the exact navigation structure as specified in HIVE's
 * product requirements with pixel-perfect brand consistency.
 */
import { User, Activity, Users, Zap } from 'lucide-react';
import { NAVIGATION_SECTIONS } from './types';
// ============================================================================
// BRAND-CONSISTENT NAVIGATION ITEMS
// ============================================================================
/**
 * Core HIVE navigation items following the four-pillar structure
 * Each item includes exact copy, descriptions, and routing from the spec
 */
export const createNavigationItems = () => [
    {
        id: 'profile',
        section: NAVIGATION_SECTIONS.PROFILE,
        label: 'Profile',
        description: 'My campus command center',
        href: '/profile',
        icon: User,
        badge: undefined,
        isActive: false,
        isDisabled: false,
        children: []
    },
    {
        id: 'feed',
        section: NAVIGATION_SECTIONS.FEED,
        label: 'Feed',
        description: "What's happening around me",
        href: '/feed',
        icon: Activity,
        badge: undefined,
        isActive: false,
        isDisabled: false,
        children: []
    },
    {
        id: 'spaces',
        section: NAVIGATION_SECTIONS.SPACES,
        label: 'Spaces',
        description: 'My communities',
        href: '/spaces',
        icon: Users,
        badge: undefined,
        isActive: false,
        isDisabled: false,
        children: []
    },
    {
        id: 'hivelab',
        section: NAVIGATION_SECTIONS.HIVELAB,
        label: 'HiveLAB',
        description: 'Build solutions',
        href: '/hivelab',
        icon: Zap,
        badge: undefined,
        isActive: false,
        isDisabled: false,
        children: []
    }
];
/**
 * Navigation items with active state management
 * Updates active state based on current path
 */
export const getNavigationItemsWithActiveState = (currentPath) => {
    const baseItems = createNavigationItems();
    return baseItems.map(item => ({
        ...item,
        isActive: isPathActive(currentPath, item.href)
    }));
};
/**
 * Determines if a navigation item should be marked as active
 * Handles exact matches and path prefixes correctly
 */
const isPathActive = (currentPath, itemHref) => {
    // Exact match
    if (currentPath === itemHref) {
        return true;
    }
    // Root path special case
    if (itemHref === '/' && currentPath === '/') {
        return true;
    }
    // Prefix match for sub-routes
    if (itemHref !== '/' && currentPath.startsWith(itemHref + '/')) {
        return true;
    }
    return false;
};
// ============================================================================
// BRAND THEME CONSTANTS
// ============================================================================
/**
 * HIVE brand colors for navigation components
 * Extracted from the design system for consistency
 */
export const NAVIGATION_THEME = {
    // Primary brand colors
    brand: {
        primary: 'var(--hive-brand-primary)',
        secondary: 'var(--hive-brand-secondary)',
        accent: 'var(--hive-gold)'
    },
    // Background system
    background: {
        primary: 'var(--hive-background-primary)',
        secondary: 'var(--hive-bg-secondary)',
        tertiary: 'var(--hive-bg-tertiary)',
        overlay: 'var(--hive-bg-overlay)'
    },
    // Text system
    text: {
        primary: 'var(--hive-text-primary)',
        secondary: 'var(--hive-text-secondary)',
        tertiary: 'var(--hive-text-tertiary)',
        inverse: 'var(--hive-text-inverse)'
    },
    // Border system
    border: {
        default: 'var(--hive-border-default)',
        subtle: 'var(--hive-border-subtle)',
        hover: 'var(--hive-border-hover)',
        active: 'var(--hive-interactive-active)'
    },
    // Interactive states
    interactive: {
        hover: 'var(--hive-interactive-hover)',
        active: 'var(--hive-interactive-active)',
        focus: 'var(--hive-interactive-focus)',
        disabled: 'var(--hive-interactive-disabled)'
    },
    // Status colors
    status: {
        success: 'var(--hive-success)',
        warning: 'var(--hive-warning)',
        error: 'var(--hive-error)',
        info: 'var(--hive-info)'
    }
};
/**
 * Navigation component sizing system
 * Consistent measurements across all navigation components
 */
export const NAVIGATION_SIZING = {
    // Height values
    heights: {
        mobileTab: 64,
        desktopHeader: 64,
        sidebarItem: 48,
        sidebarItemCompact: 40
    },
    // Width values
    widths: {
        sidebarExpanded: 256,
        sidebarCollapsed: 64,
        mobileTab: '100%'
    },
    // Padding and margins
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24
    },
    // Icon sizes
    icons: {
        small: 16,
        medium: 20,
        large: 24
    },
    // Border radius
    radius: {
        small: 6,
        medium: 8,
        large: 12
    }
};
/**
 * Animation and transition constants
 * Consistent motion design across navigation
 */
export const NAVIGATION_MOTION = {
    // Duration values (in milliseconds)
    duration: {
        fast: 150,
        normal: 200,
        slow: 300
    },
    // Easing functions
    easing: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    // Transform values
    transforms: {
        slideUp: 'translateY(-4px)',
        slideDown: 'translateY(4px)',
        slideLeft: 'translateX(-4px)',
        slideRight: 'translateX(4px)',
        scale: 'scale(1.02)'
    }
};
// ============================================================================
// ACCESSIBILITY CONSTANTS
// ============================================================================
/**
 * ARIA labels and descriptions for navigation components
 * Ensures perfect screen reader support
 */
export const NAVIGATION_A11Y = {
    labels: {
        navigation: 'Main navigation',
        mobileNavigation: 'Mobile navigation',
        desktopNavigation: 'Desktop navigation',
        sidebarNavigation: 'Sidebar navigation',
        userMenu: 'User account menu',
        toggleSidebar: 'Toggle sidebar',
        toggleMobileMenu: 'Toggle mobile menu'
    },
    descriptions: {
        profile: 'Access your profile and account settings',
        feed: 'View campus activity and updates',
        spaces: 'Browse and manage your community spaces',
        hivelab: 'Access tool building and creation features'
    },
    keyboardShortcuts: {
        commandPalette: 'Cmd+K',
        toggleSidebar: 'Cmd+B',
        toggleNotifications: 'Cmd+Shift+N',
        escape: 'Escape'
    }
};
// ============================================================================
// RESPONSIVE BREAKPOINT HELPERS
// ============================================================================
/**
 * Media query helpers for consistent responsive behavior
 */
export const NAVIGATION_MEDIA_QUERIES = {
    mobile: `(max-width: ${767}px)`,
    tablet: `(min-width: ${768}px) and (max-width: ${1199}px)`,
    desktop: `(min-width: ${1200}px) and (max-width: ${1439}px)`,
    wide: `(min-width: ${1440}px)`,
    // Hover support detection
    hover: '(hover: hover) and (pointer: fine)',
    touch: '(hover: none) and (pointer: coarse)'
};
/**
 * CSS custom properties for runtime theme switching
 */
export const NAVIGATION_CSS_VARS = {
    '--nav-height': '64px',
    '--nav-sidebar-width': '256px',
    '--nav-sidebar-collapsed-width': '64px',
    '--nav-mobile-tabs-height': '64px',
    '--nav-transition-duration': '200ms',
    '--nav-transition-easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--nav-border-radius': '8px',
    '--nav-box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1)',
    '--nav-backdrop-blur': '20px'
};
//# sourceMappingURL=data.js.map