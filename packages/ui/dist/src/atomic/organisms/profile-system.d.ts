import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type ActivityItem } from './profile-card';
import { type ProfileUser } from '../molecules/profile-header';
import { type ProfileStats as ProfileStatsType } from '../molecules/profile-stats';
declare const profileSystemVariants: (props?: {
    layout?: "mobile" | "desktop";
    spacing?: "normal" | "loose" | "tight";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ProfileSpace {
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club' | 'academic' | 'community';
    role: 'member' | 'moderator' | 'leader';
    memberCount: number;
    lastActivity: string;
    isPrivate: boolean;
    color?: string;
    icon?: string;
}
export interface ProfileTool {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    lastUsed: string;
    usageCount: number;
    isCreated: boolean;
    isFavorite: boolean;
    rating?: number;
    tags: string[];
}
export interface ProfileSystemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileSystemVariants> {
    user: ProfileUser;
    stats: ProfileStatsType;
    spaces: ProfileSpace[];
    tools: ProfileTool[];
    recentActivity: ActivityItem[];
    isOwnProfile?: boolean;
    loading?: boolean;
    onEditProfile?: () => void;
    onEditAvatar?: () => void;
    onShareProfile?: () => void;
    onMessageUser?: () => void;
    onFollowUser?: () => void;
    onPrivacySettings?: () => void;
}
export declare function ProfileSystem({ user, stats, spaces, tools, recentActivity, isOwnProfile, loading, onEditProfile, onEditAvatar, onShareProfile, onMessageUser, onFollowUser, onPrivacySettings, layout, spacing, className, ...props }: ProfileSystemProps): import("react/jsx-runtime").JSX.Element;
declare function ActivityItem({ activity }: {
    activity: ActivityItem;
}): import("react/jsx-runtime").JSX.Element;
export { profileSystemVariants };
//# sourceMappingURL=profile-system.d.ts.map