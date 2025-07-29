interface NavigationHeaderProps {
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        builderStatus?: 'none' | 'pending' | 'active';
    } | null;
    currentSection?: 'profile' | 'spaces' | 'feed' | 'hivelab' | 'rituals';
    onToggleSidebar: () => void;
    sidebarCollapsed: boolean;
    showGlobalSearch?: boolean;
    showNotifications?: boolean;
    showBuilderAccess?: boolean;
    onOpenNotifications?: () => void;
    onOpenCommandPalette?: () => void;
    unreadNotificationCount?: number;
    height?: 'compact' | 'standard' | 'tall';
    className?: string;
}
export declare function NavigationHeader({ user, currentSection, onToggleSidebar, sidebarCollapsed, showGlobalSearch, showNotifications, showBuilderAccess, onOpenNotifications, onOpenCommandPalette, unreadNotificationCount, height, className }: NavigationHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=navigation-header.d.ts.map