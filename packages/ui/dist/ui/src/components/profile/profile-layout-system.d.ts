/**
 * Profile Layout System - Unified layout architecture for Profile components
 * Prevents overlapping and ensures proper component positioning
 */
import * as React from 'react';
export interface ProfileLayoutProps {
    variant?: 'header' | 'card' | 'dashboard' | 'sidebar';
    size?: 'compact' | 'comfortable' | 'spacious';
    children: React.ReactNode;
    className?: string;
}
export interface ProfileGridProps {
    columns?: 1 | 2 | 3 | 4;
    gap?: 'none' | 'sm' | 'base' | 'lg';
    breakpoints?: 'mobile' | 'tablet' | 'desktop' | 'responsive';
    children: React.ReactNode;
    className?: string;
}
export interface ProfileSectionProps {
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    collapsible?: boolean;
    defaultExpanded?: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare const ProfileLayout: React.ForwardRefExoticComponent<ProfileLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileContent: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileActions: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileGrid: React.ForwardRefExoticComponent<ProfileGridProps & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileSection: React.ForwardRefExoticComponent<ProfileSectionProps & React.RefAttributes<HTMLDivElement>>;
export declare const ResponsiveProfileWrapper: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileIdentityLayout: React.ForwardRefExoticComponent<{
    avatar: React.ReactNode;
    info: React.ReactNode;
    actions?: React.ReactNode;
    layout?: "horizontal" | "vertical";
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileStatsLayout: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    columns?: 2 | 3 | 4;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export type { ProfileLayoutProps, ProfileGridProps, ProfileSectionProps };
//# sourceMappingURL=profile-layout-system.d.ts.map