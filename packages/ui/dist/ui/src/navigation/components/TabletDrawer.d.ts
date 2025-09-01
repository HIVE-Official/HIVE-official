/**
 * HIVE Tablet Drawer Navigation
 * YC-Quality Implementation with Smooth Drawer Experience
 *
 * Features slide-out drawer navigation optimized for tablet usage,
 * with smooth animations and touch-friendly interactions.
 */
import React from 'react';
import type { NavigationItem, NavigationUser } from '../core/types';
interface TabletDrawerProps {
    items: ReadonlyArray<NavigationItem>;
    user: NavigationUser;
    isOpen: boolean;
    onNavigate: (href: string) => void;
    onClose: () => void;
    className?: string;
    testId?: string;
}
export declare const TabletDrawer: React.NamedExoticComponent<TabletDrawerProps>;
interface TabletDrawerTriggerProps {
    onOpen: () => void;
    className?: string;
}
export declare const TabletDrawerTrigger: React.NamedExoticComponent<TabletDrawerTriggerProps>;
/**
 * Hook for handling swipe gestures to close drawer
 */
export declare const useDrawerSwipeGesture: (onClose: () => void) => (event: React.TouchEvent) => void;
export {};
//# sourceMappingURL=TabletDrawer.d.ts.map