import React from 'react';
export interface PageLayoutProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    breadcrumbs?: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    background?: 'default' | 'alt' | 'glass';
    stickyHeader?: boolean;
    hideHeaderOnMobile?: boolean;
    loading?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
}
export declare const PageLayout: React.FC<PageLayoutProps>;
//# sourceMappingURL=page-layout.d.ts.map