import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const profileStatsVariants: (props?: {
    layout?: "horizontal" | "vertical" | "grid" | "compact";
    columns?: "2" | "3" | "4" | "5" | "auto";
    variant?: "default" | "ghost" | "card" | "minimal";
    spacing?: "normal" | "loose" | "tight";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveProfileStats {
    spacesJoined: number;
    spacesActive?: number;
    spacesLed?: number;
    toolsUsed?: number;
    connectionsCount: number;
    totalActivity?: number;
    currentStreak?: number;
    longestStreak?: number;
    reputation?: number;
    achievements?: number;
}
export interface ProfileStatsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileStatsVariants> {
    stats: HiveProfileStats;
    priority?: ('spacesJoined' | 'spacesActive' | 'spacesLed' | 'toolsUsed' | 'connectionsCount' | 'totalActivity' | 'currentStreak' | 'longestStreak' | 'reputation' | 'achievements')[];
    maxStats?: number;
    showIcons?: boolean;
    showTrends?: boolean;
    interactive?: boolean;
    onStatClick?: (statKey: string, value: number) => void;
    changes?: Partial<Record<keyof HiveProfileStats, number>>;
    loading?: boolean;
}
export declare function ProfileStats({ stats, priority, maxStats, showIcons, showTrends, interactive, onStatClick, changes, loading, layout, columns, variant, spacing, className, ...props }: ProfileStatsProps): void;
export declare function CompactProfileStats(props: Omit<ProfileStatsProps, 'layout' | 'maxStats'>): import("react/jsx-runtime").JSX.Element;
export declare function CardProfileStats(props: Omit<ProfileStatsProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export declare function GridProfileStats(props: Omit<ProfileStatsProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function StudentProfileStats(props: Omit<ProfileStatsProps, 'priority'>): import("react/jsx-runtime").JSX.Element;
export declare function BuilderProfileStats(props: Omit<ProfileStatsProps, 'priority'>): import("react/jsx-runtime").JSX.Element;
export declare function ActiveUserProfileStats(props: Omit<ProfileStatsProps, 'priority'>): import("react/jsx-runtime").JSX.Element;
export { profileStatsVariants };
//# sourceMappingURL=profile-stats.d.ts.map