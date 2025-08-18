import React from 'react';
export type HivePlatformSection = 'profile' | 'spaces' | 'feed' | 'hivelab' | 'rituals';
export type HiveLayoutType = 'dashboard' | 'feed' | 'builder' | 'surface' | 'ritual' | 'full' | 'split' | 'modal';
interface AppShellProps {
    children: React.ReactNode;
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        builderStatus?: 'none' | 'pending' | 'active';
    } | null;
    currentSection?: HivePlatformSection;
    layoutType?: HiveLayoutType;
    className?: string;
    showGlobalSearch?: boolean;
    showNotifications?: boolean;
    showBuilderAccess?: boolean;
    onOpenCommandPalette?: () => void;
    onOpenNotifications?: () => void;
    sidebarWidth?: 'compact' | 'standard' | 'wide';
    headerHeight?: 'compact' | 'standard' | 'tall';
}
export declare function AppShell({ children, user, currentSection, layoutType, className, showGlobalSearch, showNotifications, showBuilderAccess, onOpenCommandPalette, onOpenNotifications, sidebarWidth, headerHeight }: AppShellProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=app-shell.d.ts.map