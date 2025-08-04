/**
 * HIVE Follow System
 * Complete follow/unfollow functionality for users and spaces
 */
import React from 'react';
export interface FollowableUser {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    location?: string;
    school?: string;
    major?: string;
    year?: string;
    isVerified?: boolean;
    followersCount: number;
    followingCount: number;
    spacesCount: number;
    toolsCount: number;
    isFollowing?: boolean;
    isFollowedBy?: boolean;
    hasNotifications?: boolean;
    mutualFollowers?: FollowableUser[];
    commonSpaces?: string[];
    lastActive?: string;
}
export interface FollowableSpace {
    id: string;
    name: string;
    description: string;
    avatar?: string;
    banner?: string;
    type: 'academic' | 'residential' | 'professional' | 'recreational' | 'project';
    membersCount: number;
    toolsCount: number;
    isFollowing?: boolean;
    hasNotifications?: boolean;
    visibility: 'public' | 'private' | 'invite_only';
    tags?: string[];
    recentActivity?: string;
    createdAt: string;
}
interface FollowSystemProps {
    currentUserId: string;
    users?: FollowableUser[];
    spaces?: FollowableSpace[];
    onFollowUser?: (userId: string) => Promise<void>;
    onUnfollowUser?: (userId: string) => Promise<void>;
    onFollowSpace?: (spaceId: string) => Promise<void>;
    onUnfollowSpace?: (spaceId: string) => Promise<void>;
    onToggleUserNotifications?: (userId: string) => Promise<void>;
    onToggleSpaceNotifications?: (spaceId: string) => Promise<void>;
    onViewProfile?: (userId: string) => void;
    onViewSpace?: (spaceId: string) => void;
    isLoading?: boolean;
    enableFeatureFlag?: boolean;
}
export declare const FollowSystem: React.FC<FollowSystemProps>;
export {};
//# sourceMappingURL=follow-system.d.ts.map