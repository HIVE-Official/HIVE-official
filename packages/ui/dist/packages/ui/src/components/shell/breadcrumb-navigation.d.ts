import React from 'react';
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ElementType;
}
interface BreadcrumbNavigationProps {
    items: BreadcrumbItem[];
    className?: string;
    showHome?: boolean;
    maxItems?: number;
}
export declare function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[];
interface SmartBreadcrumbNavigationProps extends Omit<BreadcrumbNavigationProps, 'items'> {
    items?: BreadcrumbItem[];
    pathname?: string;
    autoGenerate?: boolean;
}
export declare function BreadcrumbNavigation({ items, className, showHome, maxItems }: BreadcrumbNavigationProps): import("react/jsx-runtime").JSX.Element;
export declare function SmartBreadcrumbNavigation({ items, pathname, autoGenerate, className, showHome, maxItems, }: SmartBreadcrumbNavigationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=breadcrumb-navigation.d.ts.map