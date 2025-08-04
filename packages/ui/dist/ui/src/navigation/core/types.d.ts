/**
 * HIVE Navigation System - Core Types
 * YC-Quality Implementation with Zero Tolerance for Bugs
 *
 * This file defines the complete type system for HIVE's adaptive navigation.
 * Every type is designed for maximum type safety and developer experience.
 */
/**
 * The four pillars of HIVE navigation as defined in the product specification
 */
export declare const NAVIGATION_SECTIONS: {
    readonly PROFILE: "profile";
    readonly FEED: "feed";
    readonly SPACES: "spaces";
    readonly HIVELAB: "hivelab";
};
export type NavigationSection = typeof NAVIGATION_SECTIONS[keyof typeof NAVIGATION_SECTIONS];
/**
 * User preference for navigation layout
 */
export type NavigationPreference = 'tabs' | 'sidebar' | 'auto';
/**
 * Resolved navigation mode based on screen size and user preference
 */
export type NavigationMode = 'mobile-tabs' | 'tablet-drawer' | 'desktop-tabs' | 'desktop-sidebar';
/**
 * Screen size categories with exact breakpoints
 */
export declare const BREAKPOINTS: {
    readonly MOBILE: 768;
    readonly TABLET: 1200;
    readonly DESKTOP: 1440;
    readonly WIDE: 1440;
};
export type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'wide';
/**
 * Base navigation item with all possible properties
 */
export interface NavigationItem {
    readonly id: string;
    readonly section: NavigationSection;
    readonly label: string;
    readonly description: string;
    readonly href: string;
    readonly icon: React.ComponentType<any>;
    readonly badge?: NavigationBadge;
    readonly isActive?: boolean;
    readonly isDisabled?: boolean;
    readonly children?: ReadonlyArray<NavigationSubItem>;
}
/**
 * Sub-navigation items for complex sections
 */
export interface NavigationSubItem {
    readonly id: string;
    readonly parentSection: NavigationSection;
    readonly label: string;
    readonly href: string;
    readonly icon?: React.ComponentType<any>;
    readonly badge?: NavigationBadge;
    readonly isActive?: boolean;
    readonly isDisabled?: boolean;
}
/**
 * Navigation badge for notifications/status
 */
export interface NavigationBadge {
    readonly type: 'notification' | 'status' | 'feature';
    readonly count?: number;
    readonly label?: string;
    readonly color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    readonly variant?: 'solid' | 'outline' | 'dot';
}
/**
 * Complete user context for navigation personalization
 */
export interface NavigationUser {
    readonly id: string;
    readonly name: string;
    readonly handle: string;
    readonly avatar?: string;
    readonly role: 'student' | 'faculty' | 'admin';
    readonly builderStatus: 'none' | 'pending' | 'active';
    readonly preferences: NavigationUserPreferences;
}
/**
 * User preferences that affect navigation behavior
 */
export interface NavigationUserPreferences {
    readonly layout: NavigationPreference;
    readonly sidebarCollapsed: boolean;
    readonly enableAnimations: boolean;
    readonly enableKeyboardShortcuts: boolean;
    readonly theme: 'light' | 'dark' | 'system';
}
/**
 * Complete responsive navigation state
 */
export interface NavigationState {
    readonly mode: NavigationMode;
    readonly screenSize: ScreenSize;
    readonly screenWidth: number;
    readonly userPreference: NavigationPreference;
    readonly sidebarCollapsed: boolean;
    readonly showMobileNav: boolean;
    readonly showTabletDrawer: boolean;
    readonly showDesktopTabs: boolean;
    readonly showDesktopSidebar: boolean;
}
/**
 * Navigation layout configuration
 */
export interface NavigationLayout {
    readonly mode: NavigationMode;
    readonly showHeader: boolean;
    readonly showSidebar: boolean;
    readonly showBottomTabs: boolean;
    readonly contentPadding: {
        readonly top: number;
        readonly bottom: number;
        readonly left: number;
        readonly right: number;
    };
}
/**
 * Props for the main navigation container
 */
export interface NavigationContainerProps {
    readonly user: NavigationUser;
    readonly currentPath: string;
    readonly items: ReadonlyArray<NavigationItem>;
    readonly onNavigate: (href: string) => void;
    readonly onPreferenceChange: (preference: NavigationPreference) => void;
    readonly className?: string;
    readonly testId?: string;
}
/**
 * Props for individual navigation components
 */
export interface NavigationComponentProps {
    readonly items: ReadonlyArray<NavigationItem>;
    readonly currentPath: string;
    readonly user: NavigationUser;
    readonly onNavigate: (href: string) => void;
    readonly className?: string;
    readonly testId?: string;
}
/**
 * Navigation events for analytics and state management
 */
export interface NavigationEvent {
    readonly type: 'navigate' | 'preference_change' | 'layout_change' | 'interaction';
    readonly section?: NavigationSection;
    readonly from?: string;
    readonly to?: string;
    readonly metadata?: Record<string, unknown>;
    readonly timestamp: number;
}
/**
 * Navigation context for React context
 */
export interface NavigationContext {
    readonly state: NavigationState;
    readonly layout: NavigationLayout;
    readonly items: ReadonlyArray<NavigationItem>;
    readonly user: NavigationUser;
    readonly actions: {
        readonly navigate: (href: string) => void;
        readonly setPreference: (preference: NavigationPreference) => void;
        readonly toggleSidebar: () => void;
        readonly setMobileNavOpen: (open: boolean) => void;
    };
}
/**
 * Type guards for runtime type checking
 */
export declare const isNavigationSection: (value: string) => value is NavigationSection;
export declare const isNavigationPreference: (value: string) => value is NavigationPreference;
export declare const isScreenSize: (value: string) => value is ScreenSize;
/**
 * Helper type for creating partial navigation items
 */
export type PartialNavigationItem = Partial<NavigationItem> & {
    readonly id: string;
    readonly section: NavigationSection;
    readonly label: string;
    readonly href: string;
};
/**
 * Configuration type for navigation system initialization
 */
export interface NavigationConfig {
    readonly baseItems: ReadonlyArray<PartialNavigationItem>;
    readonly breakpoints: typeof BREAKPOINTS;
    readonly defaultPreference: NavigationPreference;
    readonly enableAnalytics: boolean;
    readonly enableA11y: boolean;
    readonly animationDuration: number;
}
//# sourceMappingURL=types.d.ts.map