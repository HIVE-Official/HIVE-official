import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type ProfileUser } from '../molecules/profile-header';
import { type ProfileStats as StatsType } from '../molecules/profile-stats';
declare const profileCardVariants: (props?: {
    size?: "sm" | "lg" | "md";
    variant?: "default" | "interactive" | "minimal" | "elevated";
    layout?: "horizontal" | "vertical" | "stacked";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ActivityItem {
    id: string;
    type: 'space_joined' | 'tool_created' | 'tool_used' | 'connection_made' | 'achievement_earned';
    title: string;
    description: string;
    timestamp: string;
    icon?: React.ReactNode;
}
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileCardVariants> {
    user: ProfileUser;
    stats: StatsType;
    recentActivity?: ActivityItem[];
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
export declare function ProfileCard({ user, stats, recentActivity, isOwnProfile, showStats, showActivity, showHeader, maxActivities, onEditProfile, onEditAvatar, onShareProfile, onViewActivity, onStatClick, loading, size, variant, layout, className, ...props }: ProfileCardProps): import("react/jsx-runtime").JSX.Element;
export declare function StudentProfileCard(props: Omit<ProfileCardProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function BuilderProfileCard(props: Omit<ProfileCardProps, 'layout'>): import("react/jsx-runtime").JSX.Element;
export declare function CompactProfileCard(props: Omit<ProfileCardProps, 'size' | 'showActivity'>): import("react/jsx-runtime").JSX.Element;
export declare function InteractiveProfileCard(props: Omit<ProfileCardProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export declare function MinimalProfileCard(props: Omit<ProfileCardProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export { profileCardVariants };
//# sourceMappingURL=profile-card.d.ts.map