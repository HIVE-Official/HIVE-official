import React from 'react';
export interface CampusActivity {
    id: string;
    type: 'message' | 'event' | 'announcement' | 'assignment' | 'social' | 'achievement' | 'space_join' | 'tool_created';
    title: string;
    content?: string;
    author?: {
        name: string;
        avatar?: string;
        handle?: string;
    };
    space?: {
        id: string;
        name: string;
        type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
    };
    timestamp: string;
    priority?: 'high' | 'medium' | 'low';
    isUnread?: boolean;
    metadata?: {
        attachmentCount?: number;
        replyCount?: number;
        likes?: number;
        eventDate?: string;
        dueDate?: string;
    };
}
export interface CampusActivityFeedProps {
    activities: CampusActivity[];
    isLoading?: boolean;
    variant?: 'default' | 'compact' | 'detailed';
    showFilters?: boolean;
    maxItems?: number;
    onActivityClick?: (activityId: string) => void;
    onViewAll?: () => void;
    onFilterChange?: (filters: string[]) => void;
    className?: string;
}
export declare const CampusActivityFeed: React.FC<CampusActivityFeedProps>;
export default CampusActivityFeed;
//# sourceMappingURL=campus-activity-feed.d.ts.map