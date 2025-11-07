import * as React from "react";
type IconComponent = React.ComponentType<{
    className?: string;
}>;
export interface AdminNavItem {
    id: string;
    label: string;
    href?: string;
    description?: string;
    icon?: IconComponent;
    badge?: React.ReactNode;
    active?: boolean;
}
export interface AdminShellProps {
    title: string;
    subtitle?: string;
    campusName: string;
    navItems: AdminNavItem[];
    actions?: React.ReactNode;
    children: React.ReactNode;
    banner?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    navFooter?: React.ReactNode;
    onSelectNavItem?: (item: AdminNavItem) => void;
}
export declare function AdminShell({ title, subtitle, campusName, navItems, actions, children, banner, footer, className, navFooter, onSelectNavItem, }: AdminShellProps): import("react/jsx-runtime").JSX.Element;
export interface AdminTopBarProps {
    title: string;
    subtitle?: string;
    campusName: string;
    actions?: React.ReactNode;
}
export declare function AdminTopBar({ title, subtitle, campusName, actions, }: AdminTopBarProps): import("react/jsx-runtime").JSX.Element;
export interface AdminNavRailProps {
    campusName: string;
    items: AdminNavItem[];
    footer?: React.ReactNode;
    onSelect?: (item: AdminNavItem) => void;
}
export declare function AdminNavRail({ campusName, items, footer, onSelect, }: AdminNavRailProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=admin-shell.d.ts.map