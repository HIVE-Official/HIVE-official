/**
 * HIVE Navigation Container - Master Navigation Orchestrator
 * YC-Quality Implementation with Perfect Responsive Behavior
 *
 * This is the main navigation component that orchestrates between all
 * navigation modes based on screen size and user preferences.
 */
import React from 'react';
import { NavigationUser } from '../core/types';
import { MobileNavigation } from './MobileNavigation';
import { DesktopSidebar, SidebarOverlay } from './DesktopSidebar';
import { DesktopTopbar } from './DesktopTopbar';
import { TabletDrawer, TabletDrawerTrigger } from './TabletDrawer';
interface NavigationContainerProps {
    user: NavigationUser;
    onOpenCommandPalette?: () => void;
    onOpenNotifications?: () => void;
    unreadNotificationCount?: number;
    children?: React.ReactNode;
    className?: string;
    testId?: string;
}
export declare const NavigationContainer: React.NamedExoticComponent<NavigationContainerProps>;
interface WithNavigationProps {
    user: NavigationUser;
    onOpenCommandPalette?: () => void;
    onOpenNotifications?: () => void;
    unreadNotificationCount?: number;
    children: React.ReactNode;
}
/**
 * Higher-order component for wrapping pages with navigation
 */
export declare const withNavigation: <P extends object>(Component: React.ComponentType<P>) => React.NamedExoticComponent<P & WithNavigationProps>;
export { NavigationContainer as default };
export { MobileNavigation, DesktopSidebar, DesktopTopbar, TabletDrawer, SidebarOverlay, TabletDrawerTrigger };
export { useNavigationState } from '../hooks/useNavigationState';
export type { NavigationUser } from '../core/types';
//# sourceMappingURL=NavigationContainer.d.ts.map