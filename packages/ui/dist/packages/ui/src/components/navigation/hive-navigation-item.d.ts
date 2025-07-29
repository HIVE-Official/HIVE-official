import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type NavigationItem } from './hive-navigation-system';
declare const hiveNavigationItemVariants: (props?: {
    variant?: "disabled" | "default" | "premium" | "ghost" | "minimal" | "active";
    size?: "default" | "sm" | "lg";
    level?: 0 | 1 | 2 | 3;
    collapsed?: boolean;
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveNavigationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof hiveNavigationItemVariants> {
    item: NavigationItem;
    isActive?: boolean;
    isCollapsed?: boolean;
    level?: 0 | 1 | 2 | 3;
    onNavigate?: (item: NavigationItem) => void;
}
export declare function HiveNavigationItem({ item, isActive, isCollapsed, level, onNavigate, className, variant, size, onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, onDrop: _onDrop, onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, ...props }: HiveNavigationItemProps): import("react/jsx-runtime").JSX.Element;
export interface HiveNavigationSectionProps {
    label: string;
    collapsed?: boolean;
    className?: string;
}
export declare function HiveNavigationSection({ label, collapsed, className }: HiveNavigationSectionProps): import("react/jsx-runtime").JSX.Element;
export interface HiveNavigationCreateButtonProps {
    collapsed?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare function HiveNavigationCreateButton({ collapsed, onClick, className }: HiveNavigationCreateButtonProps): import("react/jsx-runtime").JSX.Element;
export type { NavigationItem } from './hive-navigation-system';
//# sourceMappingURL=hive-navigation-item.d.ts.map