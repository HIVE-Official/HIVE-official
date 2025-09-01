/**
 * HIVE Desktop Sidebar Navigation
 * YC-Quality Implementation with Power User Features
 *
 * Features collapsible sidebar, status indicators, keyboard shortcuts,
 * and smooth animations optimized for desktop productivity.
 */
import React from 'react';
import type { NavigationItem, NavigationUser } from '../core/types';
interface DesktopSidebarProps {
    items: ReadonlyArray<NavigationItem>;
    user: NavigationUser;
    collapsed: boolean;
    onNavigate: (href: string) => void;
    onToggleCollapse: () => void;
    className?: string;
    testId?: string;
}
export declare const DesktopSidebar: React.NamedExoticComponent<DesktopSidebarProps>;
interface SidebarOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}
export declare const SidebarOverlay: React.NamedExoticComponent<SidebarOverlayProps>;
export {};
//# sourceMappingURL=DesktopSidebar.d.ts.map