import React from 'react';
interface NavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    badge?: string | number;
    description?: string;
    featured?: boolean;
    children?: NavItem[];
    disabled?: boolean;
    external?: boolean;
}
interface User {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
    role?: 'student' | 'faculty' | 'admin';
}
interface EnhancedNavigationBarProps {
    user?: User | null;
    onToggleSidebar?: () => void;
    sidebarCollapsed?: boolean;
    showGlobalSearch?: boolean;
    showNotifications?: boolean;
    onOpenNotifications?: () => void;
    onOpenCommandPalette?: () => void;
    unreadNotificationCount?: number;
    className?: string;
    navigationItems?: NavItem[];
    onToggleNavigationMode?: () => void;
}
export declare function EnhancedNavigationBar({ user, onToggleSidebar, sidebarCollapsed, showGlobalSearch, showNotifications, onOpenNotifications, onOpenCommandPalette, unreadNotificationCount, className, navigationItems, onToggleNavigationMode }: EnhancedNavigationBarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=enhanced-navigation-bar.d.ts.map