/**
 * HIVE Profile Layout System - Brand Consistent
 * Campus Command Center layout with HIVE's gold/black branding
 * Built for University at Buffalo students
 */
import * as React from 'react';
export interface SimpleProfileLayoutProps {
    variant?: 'header' | 'card' | 'dashboard';
    children: React.ReactNode;
    className?: string;
}
export interface SimpleProfileGridProps {
    columns?: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    className?: string;
}
export declare const SimpleProfileLayout: React.ForwardRefExoticComponent<SimpleProfileLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const SimpleProfileContent: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const SimpleProfileActions: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const SimpleProfileGrid: React.ForwardRefExoticComponent<SimpleProfileGridProps & React.RefAttributes<HTMLDivElement>>;
export declare const SimpleProfileIdentity: React.ForwardRefExoticComponent<{
    avatar: React.ReactNode;
    info: React.ReactNode;
    actions?: React.ReactNode;
    layout?: "horizontal" | "vertical";
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=simple-layout-system.d.ts.map