import * as React from "react";
export type NavigationLayout = "sidebar" | "rail" | "bottom" | "inline";
export interface NavigationItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    id?: string;
    icon?: React.ReactNode;
    label: string;
    description?: string;
    badge?: string | number;
    active?: boolean;
    disabled?: boolean;
    layout?: NavigationLayout;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    onSelect?: (event: React.MouseEvent<HTMLElement>) => void;
}
export declare const NavigationItem: React.ForwardRefExoticComponent<NavigationItemProps & React.RefAttributes<HTMLElement>>;
export interface NavigationNode extends NavigationItemProps {
    id: string;
}
export interface SidebarNavSection {
    id: string;
    label?: string;
    items: NavigationNode[];
}
export interface SidebarNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    sections: SidebarNavSection[];
    activeId?: string;
    onSelect?: (item: NavigationNode, event: React.MouseEvent<HTMLElement>) => void;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}
export declare function SidebarNav({ sections, activeId, onSelect, header, footer, className, ...props }: SidebarNavProps): import("react/jsx-runtime").JSX.Element;
export interface NavigationRailProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    items: NavigationNode[];
    activeId?: string;
    onSelect?: (item: NavigationNode, event: React.MouseEvent<HTMLElement>) => void;
    footerItems?: NavigationNode[];
    label?: string;
}
export declare function NavigationRail({ items, activeId, onSelect, footerItems, label, className, ...props }: NavigationRailProps): import("react/jsx-runtime").JSX.Element;
export interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    items: NavigationNode[];
    activeId?: string;
    onSelect?: (item: NavigationNode, event: React.MouseEvent<HTMLElement>) => void;
    label?: string;
}
export declare function BottomNav({ items, activeId, onSelect, label, className, ...props }: BottomNavProps): import("react/jsx-runtime").JSX.Element;
export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
    leading?: React.ReactNode;
    centered?: React.ReactNode;
    trailing?: React.ReactNode;
    border?: "none" | "subtle";
    sticky?: boolean;
}
export declare function TopBar({ leading, centered, trailing, border, sticky, className, children, ...props }: TopBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=navigation-primitives.d.ts.map