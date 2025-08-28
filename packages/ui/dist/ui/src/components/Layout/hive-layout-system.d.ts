/**
 * HIVE Layout System - Systematic Layout & IA Implementation
 * Production-ready layout components implementing IA patterns
 * Built for University at Buffalo campus social platform
 */
import * as React from 'react';
export interface HiveLayoutProps {
    children: React.ReactNode;
    className?: string;
}
export interface HiveCardLayoutProps extends HiveLayoutProps {
    variant?: 'compact' | 'comfortable' | 'spacious';
    padding?: boolean;
}
export interface HiveGridLayoutProps extends HiveLayoutProps {
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    responsive?: boolean;
}
export interface HiveStackLayoutProps extends HiveLayoutProps {
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    gap?: 'sm' | 'md' | 'lg';
    wrap?: boolean;
    responsive?: boolean;
}
export interface HiveComponentIAProps extends HiveLayoutProps {
    identity?: React.ReactNode;
    context?: React.ReactNode;
    content?: React.ReactNode;
    metrics?: React.ReactNode;
    actions?: React.ReactNode;
    layout?: 'profile' | 'space' | 'tool' | 'feed';
    responsive?: boolean;
}
export declare const HiveCard: React.ForwardRefExoticComponent<HiveCardLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveGrid: React.ForwardRefExoticComponent<HiveGridLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveStack: React.ForwardRefExoticComponent<HiveStackLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveComponentIA: React.ForwardRefExoticComponent<HiveComponentIAProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveProfileLayout: React.ForwardRefExoticComponent<{
    avatar: React.ReactNode;
    name: React.ReactNode;
    handle?: React.ReactNode;
    context?: React.ReactNode;
    bio?: React.ReactNode;
    metrics?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const HiveSpaceLayout: React.ForwardRefExoticComponent<{
    name: React.ReactNode;
    category?: React.ReactNode;
    memberCount?: React.ReactNode;
    status?: React.ReactNode;
    description?: React.ReactNode;
    activity?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export declare const HiveToolLayout: React.ForwardRefExoticComponent<{
    icon?: React.ReactNode;
    name: React.ReactNode;
    creator?: React.ReactNode;
    description?: React.ReactNode;
    usage?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
} & React.RefAttributes<HTMLDivElement>>;
export { HiveCard, HiveGrid, HiveStack, HiveComponentIA, HiveProfileLayout, HiveSpaceLayout, HiveToolLayout, type HiveLayoutProps, type HiveCardLayoutProps, type HiveGridLayoutProps, type HiveStackLayoutProps, type HiveComponentIAProps };
//# sourceMappingURL=hive-layout-system.d.ts.map