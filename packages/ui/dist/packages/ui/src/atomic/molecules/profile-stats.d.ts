import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const profileStatsVariants: (props?: {
    layout?: "grid" | "horizontal" | "vertical" | "compact";
    columns?: "auto" | "2" | "3" | "4" | "5";
    variant?: "card" | "default" | "ghost" | "minimal";
    spacing?: "tight" | "loose" | "normal";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ProfileStats {
    spacesJoined: number;
    spacesLed?: number;
    toolsCreated: number;
    toolsUsed?: number;
    connectionsCount: number;
    totalActivity?: number;
    weekStreak?: number;
    reputation: number;
    achievements?: number;
    gpa?: number;
}
export interface ProfileStatsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileStatsVariants> {
    stats: ProfileStats;
    priority?: ('spacesJoined' | 'spacesLed' | 'toolsCreated' | 'toolsUsed' | 'connectionsCount' | 'totalActivity' | 'weekStreak' | 'reputation' | 'achievements')[];
    maxStats?: number;
    showIcons?: boolean;
    showTrends?: boolean;
    interactive?: boolean;
    onStatClick?: (statKey: string, value: number) => void;
    changes?: Partial<Record<keyof ProfileStats, number>>;
    loading?: boolean;
}
export declare function ProfileStats({ stats, priority, maxStats, showIcons, showTrends, interactive, onStatClick, changes, loading, layout, columns, variant, spacing, className, ...props }: ProfileStatsProps): import("react/jsx-runtime").JSX.Element;
export declare function CompactProfileStats(props: Omit<ProfileStatsProps, 'layout' | 'maxStats'>): import("react/jsx-runtime").JSX.Element;
export declare function CardProfileStats(props: Omit<ProfileStatsProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export declare function GridProfileStats(props: Omit<ProfileStatsProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function StudentProfileStats(props: Omit<ProfileStatsProps, 'priority'>): import("react/jsx-runtime").JSX.Element;
export declare function BuilderProfileStats(props: Omit<ProfileStatsProps, 'priority'>): import("react/jsx-runtime").JSX.Element;
export { profileStatsVariants };
//# sourceMappingURL=profile-stats.d.ts.map