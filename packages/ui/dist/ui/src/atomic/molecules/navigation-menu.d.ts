/**
 * HIVE Navigation Menu Molecule
 * Campus-optimized navigation components - tabs, menu items, and nav groups
 *
 * Built using all foundation systems:
 * - Typography: Consistent nav label hierarchy and badge formatting
 * - Color: Campus semantic colors and active state indicators
 * - Layout: Systematic spacing between nav items and groups
 * - Icon: Navigation icons with proper sizing and context
 * - Interaction: Hover states, active feedback, and keyboard navigation
 * - Shadow: Subtle elevation for floating nav elements
 * - Border: Consistent radius and active state borders
 * - Motion: Smooth navigation transitions and indicator animations
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const navigationItemVariants: (props?: ({
    size?: "small" | "base" | "large" | null | undefined;
    variant?: "default" | "ghost" | "tab" | "sidebar" | "pill" | null | undefined;
    state?: "default" | "disabled" | "active" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const navigationContainerVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    layout?: "floating" | "sidebar" | "tabs" | "basic" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface NavigationItem {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    badge?: string | number;
    disabled?: boolean;
    external?: boolean;
    href?: string;
    onClick?: () => void;
}
export interface NavigationGroup {
    id: string;
    label?: string;
    items: NavigationItem[];
}
export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navigationContainerVariants> {
    items?: NavigationItem[];
    groups?: NavigationGroup[];
    activeId?: string;
    size?: 'small' | 'base' | 'large';
    variant?: 'default' | 'tab' | 'pill' | 'sidebar' | 'ghost';
    campusOptimized?: boolean;
    showIcons?: boolean;
    showBadges?: boolean;
    onItemClick?: (item: NavigationItem) => void;
    onActiveChange?: (activeId: string) => void;
}
interface NavigationBadgeProps {
    children: React.ReactNode;
    className?: string;
}
declare const NavigationBadge: React.ForwardRefExoticComponent<NavigationBadgeProps & React.RefAttributes<HTMLSpanElement>>;
export declare const NavigationMenu: React.ForwardRefExoticComponent<NavigationMenuProps & React.RefAttributes<HTMLElement>>;
export declare const campusNavigationPresets: {
    readonly mainNav: NavigationItem[];
    readonly profileTabs: NavigationItem[];
    readonly settingsGroups: NavigationGroup[];
};
export { navigationItemVariants, navigationContainerVariants, NavigationBadge };
//# sourceMappingURL=navigation-menu.d.ts.map