import React from 'react';
export type SpaceCategory = 'university' | 'residential' | 'greek' | 'student';
export type SpaceStatus = 'active' | 'archived' | 'private' | 'pending';
export type ViewMode = 'grid' | 'list';
export type SortOption = 'name' | 'members' | 'activity' | 'created' | 'trending';
export type FilterOption = 'all' | 'joined' | 'bookmarked' | 'recommended' | 'trending';
export interface SpacePreview {
    id: string;
    name: string;
    description: string;
    category: SpaceCategory;
    status: SpaceStatus;
    avatar?: string;
    coverImage?: string;
    color?: string;
    memberCount: number;
    postCount: number;
    toolCount: number;
    createdAt: string;
    lastActivity?: string;
    isJoined: boolean;
    isBookmarked: boolean;
    userRole?: 'leader' | 'co_leader' | 'member';
    weeklyActivity: number;
    monthlyGrowth: number;
    engagementScore: number;
    isRecommended: boolean;
    isTrending: boolean;
    isPrivate: boolean;
    requiresApproval: boolean;
    location?: string;
    building?: string;
    floor?: number;
    tags: string[];
    recentPosts?: Array<{
        id: string;
        content: string;
        author: string;
        timestamp: string;
    }>;
    activeTools?: Array<{
        id: string;
        name: string;
        icon: string;
    }>;
}
export interface SpaceCategoryBrowserProps {
    spaces: SpacePreview[];
    selectedCategory?: SpaceCategory;
    initialViewMode?: ViewMode;
    showCategoryFilter?: boolean;
    showJoinActions?: boolean;
    onSpaceClick?: (spaceId: string) => void;
    onJoinSpace?: (spaceId: string) => Promise<void>;
    onLeaveSpace?: (spaceId: string) => Promise<void>;
    onBookmarkSpace?: (spaceId: string, bookmarked: boolean) => Promise<void>;
    onCreateSpace?: (category: SpaceCategory) => void;
    currentUserRole?: 'leader' | 'co_leader' | 'member';
    className?: string;
}
export declare const SpaceCategoryBrowser: React.FC<SpaceCategoryBrowserProps>;
export default SpaceCategoryBrowser;
//# sourceMappingURL=space-category-browser.d.ts.map