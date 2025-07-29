import React from 'react';
export type NavigationVariant = 'sidebar' | 'topbar' | 'command' | 'mobile' | 'minimal';
export type NavigationSize = 'compact' | 'standard' | 'expanded';
export type NavigationPosition = 'fixed' | 'sticky' | 'static';
export interface NavigationItem {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    href?: string;
    onClick?: () => void;
    badge?: {
        count?: number;
        variant?: 'default' | 'success' | 'warning' | 'error';
        pulse?: boolean;
    };
    isActive?: boolean;
    isDisabled?: boolean;
    children?: NavigationItem[];
    keywords?: string[];
    description?: string;
    shortcut?: string;
}
export interface NavigationSection {
    id: string;
    label: string;
    items: NavigationItem[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
export interface NavigationUser {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: string;
    status?: 'online' | 'away' | 'busy' | 'offline';
}
export interface NavigationConfig {
    variant: NavigationVariant;
    size: NavigationSize;
    position: NavigationPosition;
    showSearch?: boolean;
    showNotifications?: boolean;
    showUserMenu?: boolean;
    showBranding?: boolean;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    mobileBreakpoint?: number;
    keyboardShortcuts?: boolean;
    accessibility?: {
        skipLinks?: boolean;
        announcements?: boolean;
        reducedMotion?: boolean;
    };
}
interface NavigationContextType {
    config: NavigationConfig;
    user: NavigationUser | null;
    sections: NavigationSection[];
    isCollapsed: boolean;
    isMobile: boolean;
    searchOpen: boolean;
    notificationsOpen: boolean;
    userMenuOpen: boolean;
    activeItemId: string | null;
    setCollapsed: (collapsed: boolean) => void;
    setSearchOpen: (open: boolean) => void;
    setNotificationsOpen: (open: boolean) => void;
    setUserMenuOpen: (open: boolean) => void;
    setActiveItem: (id: string | null) => void;
    updateConfig: (config: Partial<NavigationConfig>) => void;
    navigate: (item: NavigationItem) => void;
}
export declare const useNavigation: () => NavigationContextType;
interface NavigationProviderProps {
    children: React.ReactNode;
    config: NavigationConfig;
    user?: NavigationUser | null;
    sections: NavigationSection[];
    onNavigate?: (item: NavigationItem) => void;
    onConfigChange?: (config: NavigationConfig) => void;
}
export declare function NavigationProvider({ children, config, user, sections, onNavigate, onConfigChange }: NavigationProviderProps): import("react/jsx-runtime").JSX.Element;
export interface NavigationContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare function NavigationContainer({ children, className, style }: NavigationContainerProps): import("react/jsx-runtime").JSX.Element;
export interface NavigationBrandProps {
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    href?: string;
    className?: string;
}
export declare function NavigationBrand({ logo, title, subtitle, href, className }: NavigationBrandProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-navigation-system.d.ts.map