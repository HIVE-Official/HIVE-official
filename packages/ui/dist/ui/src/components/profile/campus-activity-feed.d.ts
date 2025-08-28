/**
 * Campus Activity Feed - Profile Integration
 * Uses SocialInteraction and UserIdentity molecules for campus social activity
 *
 * Built using HIVE foundation systems and molecules:
 * - SocialInteraction molecule for engagement actions
 * - UserIdentity molecule for consistent user display
 * - ComprehensiveCard molecule for activity item structure
 * - Campus-specific activity types and cross-slice integration
 */
import React from 'react';
export type ActivityType = 'space_join' | 'space_create' | 'tool_build' | 'tool_use' | 'event_create' | 'event_attend' | 'connection_made' | 'post_create' | 'achievement_unlock' | 'collaboration_start';
export interface ActivityItem {
    id: string;
    type: ActivityType;
    timestamp: Date;
    user: {
        id: string;
        name: string;
        handle?: string;
        avatar?: string;
        status?: 'online' | 'away' | 'offline' | 'studying';
        role?: 'student' | 'faculty' | 'admin' | 'leader';
        verified?: boolean;
    };
    title: string;
    description?: string;
    content?: string;
    target?: {
        id: string;
        name: string;
        type: 'space' | 'tool' | 'event' | 'user';
        icon?: string;
    };
    engagement?: {
        likes: number;
        comments: number;
        shares: number;
        userLiked?: boolean;
        userCommented?: boolean;
        userShared?: boolean;
    };
    campusContext?: {
        location?: string;
        course?: string;
        semester?: string;
        visibility: 'public' | 'campus' | 'connections' | 'private';
    };
    media?: {
        type: 'image' | 'video' | 'file' | 'link';
        url: string;
        preview?: string;
    }[];
    metadata?: Record<string, any>;
}
export interface CampusActivityFeedProps {
    activities: ActivityItem[];
    showUserProfiles?: boolean;
    showEngagementActions?: boolean;
    showCampusContext?: boolean;
    enableRealtime?: boolean;
    activityTypes?: ActivityType[];
    timeRange?: 'today' | 'week' | 'month' | 'all';
    variant?: 'compact' | 'comfortable' | 'detailed';
    maxItems?: number;
    isLoading?: boolean;
    hasMore?: boolean;
    onActivityClick?: (activity: ActivityItem) => void;
    onUserClick?: (userId: string) => void;
    onTargetClick?: (target: ActivityItem['target']) => void;
    onEngagement?: (activityId: string, action: 'like' | 'comment' | 'share') => void;
    onLoadMore?: () => void;
    className?: string;
}
declare const activityTypeConfig: Record<ActivityType, {
    icon: React.ComponentType<{
        className?: string;
    }>;
    color: string;
    bgColor: string;
    borderColor: string;
    verb: string;
    campusRelevant: boolean;
}>;
declare const formatRelativeTime: (timestamp: Date) => string;
export declare const CampusActivityFeed: React.ForwardRefExoticComponent<CampusActivityFeedProps & React.RefAttributes<HTMLDivElement>>;
export type { CampusActivityFeedProps, ActivityItem, ActivityType };
export { activityTypeConfig, formatRelativeTime };
//# sourceMappingURL=campus-activity-feed.d.ts.map