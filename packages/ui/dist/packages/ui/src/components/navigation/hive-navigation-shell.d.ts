import React from 'react';
import { useNavigation, type NavigationSection, type NavigationUser, type NavigationItem, type NavigationVariant } from './hive-navigation-system';
interface HiveNavigationShellProps {
    children: React.ReactNode;
    variant?: NavigationVariant;
    size?: 'compact' | 'standard' | 'expanded';
    user?: NavigationUser | null;
    sections: NavigationSection[];
    onNavigate?: (item: NavigationItem) => void;
    className?: string;
    showSearch?: boolean;
    showNotifications?: boolean;
    showUserMenu?: boolean;
    showBranding?: boolean;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    keyboardShortcuts?: boolean;
    mobileBreakpoint?: number;
    position?: 'fixed' | 'sticky' | 'static';
    accessibility?: {
        skipLinks?: boolean;
        announcements?: boolean;
        reducedMotion?: boolean;
    };
}
export declare function HiveNavigationShell({ children, variant, size, user, sections, onNavigate, className, showSearch, showNotifications, showUserMenu, showBranding, collapsible, defaultCollapsed, keyboardShortcuts, mobileBreakpoint, position, accessibility }: HiveNavigationShellProps): import("react/jsx-runtime").JSX.Element;
export declare function useHiveNavigation(): ReturnType<typeof useNavigation>;
export declare const navigationPresets: {
    readonly sidebar: {
        readonly variant: "sidebar";
        readonly size: "standard";
        readonly showSearch: true;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly collapsible: true;
        readonly keyboardShortcuts: true;
    };
    readonly compact: {
        readonly variant: "sidebar";
        readonly size: "compact";
        readonly showSearch: false;
        readonly showNotifications: false;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly collapsible: true;
        readonly defaultCollapsed: true;
        readonly keyboardShortcuts: true;
    };
    readonly topbar: {
        readonly variant: "topbar";
        readonly size: "standard";
        readonly showSearch: true;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly keyboardShortcuts: true;
    };
    readonly command: {
        readonly variant: "command";
        readonly size: "standard";
        readonly showSearch: true;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly keyboardShortcuts: true;
    };
    readonly minimal: {
        readonly variant: "minimal";
        readonly size: "compact";
        readonly showSearch: true;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly keyboardShortcuts: true;
    };
    readonly admin: {
        readonly variant: "sidebar";
        readonly size: "expanded";
        readonly showSearch: true;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly collapsible: true;
        readonly keyboardShortcuts: true;
    };
    readonly mobile: {
        readonly variant: "topbar";
        readonly size: "compact";
        readonly showSearch: false;
        readonly showNotifications: true;
        readonly showUserMenu: true;
        readonly showBranding: true;
        readonly keyboardShortcuts: false;
    };
};
export { NavigationProvider, useNavigation } from './hive-navigation-system';
export type { NavigationConfig, NavigationSection, NavigationUser, NavigationItem, NavigationVariant } from './hive-navigation-system';
//# sourceMappingURL=hive-navigation-shell.d.ts.map