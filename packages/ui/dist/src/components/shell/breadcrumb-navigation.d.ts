import React from 'react';
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ElementType;
}
interface BreadcrumbNavigationProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare function BreadcrumbNavigation({ items, className }: BreadcrumbNavigationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=breadcrumb-navigation.d.ts.map