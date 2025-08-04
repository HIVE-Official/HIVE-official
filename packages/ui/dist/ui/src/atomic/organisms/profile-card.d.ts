import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type ProfileUser } from '../molecules/profile-header';
import { type HiveProfileStats } from '../molecules/profile-stats';
declare const profileCardVariants: (props?: {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "interactive" | "elevated" | "minimal";
    layout?: "horizontal" | "vertical" | "stacked";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveActivityItem {
    id: string;
    type: 'space' | 'tool' | 'connection' | 'achievement' | 'builder';
    action: string;
    title: string;
    description?: string;
    timestamp: string;
    icon?: React.ReactNode;
    spaceId?: string;
    toolId?: string;
}
export interface HiveProfileCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileCardVariants> {
    user: ProfileUser;
    stats: HiveProfileStats;
    recentActivity?: HiveActivityItem[];
    isOwnProfile?: boolean;
    showStats?: boolean;
    showActivity?: boolean;
    showHeader?: boolean;
    maxActivities?: number;
    onEditProfile?: () => void;
    onEditAvatar?: () => void;
    onShareProfile?: () => void;
    onViewActivity?: () => void;
    onStatClick?: (statKey: string, value: number) => void;
    loading?: boolean;
}
export declare function HiveProfileCard({ user, stats, recentActivity, isOwnProfile, showStats, showActivity, showHeader, maxActivities, onEditProfile, onEditAvatar, onShareProfile, onViewActivity, onStatClick, loading, size, variant, layout, className, ...props }: HiveProfileCardProps): import("react/jsx-runtime").JSX.Element;
export declare const ProfileCard: typeof HiveProfileCard;
export type ProfileCardProps = HiveProfileCardProps;
export type ActivityItem = HiveActivityItem;
export declare function StudentProfileCard(props: Omit<HiveProfileCardProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function BuilderProfileCard(props: Omit<HiveProfileCardProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function CompactProfileCard(props: Omit<HiveProfileCardProps, 'size' | 'showActivity'>): import("react/jsx-runtime").JSX.Element;
export declare function InteractiveProfileCard(props: Omit<HiveProfileCardProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export declare function MinimalProfileCard(props: Omit<HiveProfileCardProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export { profileCardVariants };
//# sourceMappingURL=profile-card.d.ts.map