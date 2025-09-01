/**
 * HIVE Navigation Data - Brand-Consistent Navigation Items
 * YC-Quality Implementation with Perfect Brand Alignment
 *
 * This file defines the exact navigation structure as specified in HIVE's
 * product requirements with pixel-perfect brand consistency.
 */
import type { NavigationItem } from './types';
/**
 * Core HIVE navigation items following the four-pillar structure
 * Each item includes exact copy, descriptions, and routing from the spec
 */
export declare const createNavigationItems: () => ReadonlyArray<NavigationItem>;
/**
 * Navigation items with active state management
 * Updates active state based on current path
 */
export declare const getNavigationItemsWithActiveState: (currentPath: string) => ReadonlyArray<NavigationItem>;
/**
 * HIVE brand colors for navigation components
 * Extracted from the design system for consistency
 */
export declare const NAVIGATION_THEME: {
    readonly brand: {
        readonly primary: "var(--hive-brand-primary)";
        readonly secondary: "var(--hive-brand-secondary)";
        readonly accent: "var(--hive-gold)";
    };
    readonly background: {
        readonly primary: "var(--hive-background-primary)";
        readonly secondary: "var(--hive-bg-secondary)";
        readonly tertiary: "var(--hive-bg-tertiary)";
        readonly overlay: "var(--hive-bg-overlay)";
    };
    readonly text: {
        readonly primary: "var(--hive-text-primary)";
        readonly secondary: "var(--hive-text-secondary)";
        readonly tertiary: "var(--hive-text-tertiary)";
        readonly inverse: "var(--hive-text-inverse)";
    };
    readonly border: {
        readonly default: "var(--hive-border-default)";
        readonly subtle: "var(--hive-border-subtle)";
        readonly hover: "var(--hive-border-hover)";
        readonly active: "var(--hive-interactive-active)";
    };
    readonly interactive: {
        readonly hover: "var(--hive-interactive-hover)";
        readonly active: "var(--hive-interactive-active)";
        readonly focus: "var(--hive-interactive-focus)";
        readonly disabled: "var(--hive-interactive-disabled)";
    };
    readonly status: {
        readonly success: "var(--hive-success)";
        readonly warning: "var(--hive-warning)";
        readonly error: "var(--hive-error)";
        readonly info: "var(--hive-info)";
    };
};
/**
 * Navigation component sizing system
 * Consistent measurements across all navigation components
 */
export declare const NAVIGATION_SIZING: {
    readonly heights: {
        readonly mobileTab: 64;
        readonly desktopHeader: 64;
        readonly sidebarItem: 48;
        readonly sidebarItemCompact: 40;
    };
    readonly widths: {
        readonly sidebarExpanded: 256;
        readonly sidebarCollapsed: 64;
        readonly mobileTab: "100%";
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 20;
        readonly xxl: 24;
    };
    readonly icons: {
        readonly small: 16;
        readonly medium: 20;
        readonly large: 24;
    };
    readonly radius: {
        readonly small: 6;
        readonly medium: 8;
        readonly large: 12;
    };
};
/**
 * Animation and transition constants
 * Consistent motion design across navigation
 */
export declare const NAVIGATION_MOTION: {
    readonly duration: {
        readonly fast: 150;
        readonly normal: 200;
        readonly slow: 300;
    };
    readonly easing: {
        readonly default: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly sharp: "cubic-bezier(0.4, 0, 0.6, 1)";
        readonly smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };
    readonly transforms: {
        readonly slideUp: "translateY(-4px)";
        readonly slideDown: "translateY(4px)";
        readonly slideLeft: "translateX(-4px)";
        readonly slideRight: "translateX(4px)";
        readonly scale: "scale(1.02)";
    };
};
/**
 * ARIA labels and descriptions for navigation components
 * Ensures perfect screen reader support
 */
export declare const NAVIGATION_A11Y: {
    readonly labels: {
        readonly navigation: "Main navigation";
        readonly mobileNavigation: "Mobile navigation";
        readonly desktopNavigation: "Desktop navigation";
        readonly sidebarNavigation: "Sidebar navigation";
        readonly userMenu: "User account menu";
        readonly toggleSidebar: "Toggle sidebar";
        readonly toggleMobileMenu: "Toggle mobile menu";
    };
    readonly descriptions: {
        readonly profile: "Access your profile and account settings";
        readonly feed: "View campus activity and updates";
        readonly spaces: "Browse and manage your community spaces";
        readonly hivelab: "Access tool building and creation features";
    };
    readonly keyboardShortcuts: {
        readonly commandPalette: "Cmd+K";
        readonly toggleSidebar: "Cmd+B";
        readonly toggleNotifications: "Cmd+Shift+N";
        readonly escape: "Escape";
    };
};
/**
 * Media query helpers for consistent responsive behavior
 */
export declare const NAVIGATION_MEDIA_QUERIES: {
    readonly mobile: "(max-width: 767px)";
    readonly tablet: "(min-width: 768px) and (max-width: 1199px)";
    readonly desktop: "(min-width: 1200px) and (max-width: 1439px)";
    readonly wide: "(min-width: 1440px)";
    readonly hover: "(hover: hover) and (pointer: fine)";
    readonly touch: "(hover: none) and (pointer: coarse)";
};
/**
 * CSS custom properties for runtime theme switching
 */
export declare const NAVIGATION_CSS_VARS: {
    readonly '--nav-height': "64px";
    readonly '--nav-sidebar-width': "256px";
    readonly '--nav-sidebar-collapsed-width': "64px";
    readonly '--nav-mobile-tabs-height': "64px";
    readonly '--nav-transition-duration': "200ms";
    readonly '--nav-transition-easing': "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly '--nav-border-radius': "8px";
    readonly '--nav-box-shadow': "0 1px 3px rgba(0, 0, 0, 0.1)";
    readonly '--nav-backdrop-blur': "20px";
};
//# sourceMappingURL=data.d.ts.map