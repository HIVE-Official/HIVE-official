/**
 * HIVE Desktop Top Navigation Bar
 * YC-Quality Implementation with Clean Design
 *
 * Horizontal navigation optimized for content consumption
 * with integrated search, notifications, and user menu.
 */
import React from 'react';
import type { NavigationItem, NavigationUser } from '../core/types';
interface DesktopTopbarProps {
    items: ReadonlyArray<NavigationItem>;
    user: NavigationUser;
    onNavigate: (href: string) => void;
    onOpenCommandPalette?: () => void;
    onOpenNotifications?: () => void;
    unreadNotificationCount?: number;
    className?: string;
    testId?: string;
}
export declare const DesktopTopbar: React.NamedExoticComponent<DesktopTopbarProps>;
export {};
//# sourceMappingURL=DesktopTopbar.d.ts.map