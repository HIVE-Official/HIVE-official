import React from 'react';
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ElementType;
}
interface PageContainerProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}
export declare function PageContainer({ children, title, subtitle, breadcrumbs, actions, className, maxWidth, padding }: PageContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=page-container.d.ts.map