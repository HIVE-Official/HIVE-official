import React from 'react';
import { NavigationStyle, useNavigationLayout } from '../../hooks/use-navigation-layout';
type NavigationMode = 'sidebar' | 'topbar';
interface ShellContextType {
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    commandPaletteOpen: boolean;
    setCommandPaletteOpen: (open: boolean) => void;
    notificationCenterOpen: boolean;
    setNotificationCenterOpen: (open: boolean) => void;
    unreadNotificationCount: number;
    setUnreadNotificationCount: (count: number) => void;
    navigationMode: NavigationMode;
    setNavigationMode: (mode: NavigationMode) => void;
    navigationPreference: NavigationStyle;
    setNavigationPreference: (preference: NavigationStyle) => void;
    navigationLayout: ReturnType<typeof useNavigationLayout>;
}
export declare function useShell(): ShellContextType;
interface ShellProviderProps {
    children: React.ReactNode;
    initialSidebarCollapsed?: boolean;
    initialUnreadCount?: number;
    initialNavigationMode?: NavigationMode;
    initialNavigationPreference?: NavigationStyle;
}
export declare function ShellProvider({ children, initialSidebarCollapsed, initialUnreadCount, initialNavigationMode, initialNavigationPreference }: ShellProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=shell-provider.d.ts.map