import React from 'react';
export interface ActivityItem {
    id: string;
    type: 'post' | 'comment' | 'join' | 'create' | 'like' | 'collaborate' | 'achievement' | 'event';
    title: string;
    description: string;
    timestamp: string;
    contextSpace?: {
        name: string;
        type: 'academic' | 'residential' | 'social' | 'professional' | 'hobby';
    };
    engagement?: {
        likes: number;
        comments: number;
        shares: number;
    };
    isHighlighted?: boolean;
}
export interface ProfileActivityWidgetProps {
    user: {
        id: string;
        name: string;
    };
    recentActivities?: ActivityItem[];
    todayActivities?: number;
    weeklyStreak?: number;
    totalEngagement?: number;
    activityScore?: number;
    topActivityType?: string;
    isEditable?: boolean;
    onViewActivity?: (activityId: string) => void;
    onViewAllActivities?: () => void;
    onCreatePost?: () => void;
    onEngageMore?: () => void;
    className?: string;
}
export declare const ProfileActivityWidget: React.FC<ProfileActivityWidgetProps>;
//# sourceMappingURL=profile-activity-widget.d.ts.map