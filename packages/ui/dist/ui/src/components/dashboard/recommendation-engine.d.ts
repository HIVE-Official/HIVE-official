export interface SpaceRecommendation {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    category: 'academic' | 'social' | 'professional' | 'creative';
    matchScore: number;
    matchReasons: string[];
    previewMembers: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
    }>;
    recentActivity: string;
    isJoined: boolean;
    isPending: boolean;
}
export interface ToolRecommendation {
    id: string;
    name: string;
    description: string;
    category: 'academic' | 'productivity' | 'social' | 'wellness';
    author: string;
    authorId: string;
    rating: number;
    usageCount: number;
    matchScore: number;
    matchReasons: string[];
    tags: string[];
    lastUpdated: string;
    isBookmarked: boolean;
    previewImages?: string[];
}
export interface ConnectionRecommendation {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    major?: string;
    academicYear?: string;
    matchScore: number;
    mutualSpaces: number;
    mutualConnections: number;
    sharedInterests: string[];
    recentActivity: string;
    isConnected: boolean;
    isPending: boolean;
}
export interface ContentRecommendation {
    id: string;
    type: 'post' | 'event' | 'resource' | 'tutorial';
    title: string;
    preview: string;
    author: string;
    authorId: string;
    authorAvatar?: string;
    spaceId?: string;
    spaceName?: string;
    engagement: {
        likes: number;
        comments: number;
        shares: number;
    };
    timestamp: string;
    tags: string[];
    matchScore: number;
    isBookmarked: boolean;
    isLiked: boolean;
}
export interface RecommendationData {
    spaces: SpaceRecommendation[];
    tools: ToolRecommendation[];
    connections: ConnectionRecommendation[];
    content: ContentRecommendation[];
    trending: {
        hashtags: Array<{
            tag: string;
            count: number;
            growth: number;
        }>;
        topics: Array<{
            topic: string;
            engagement: number;
            spaces: number;
        }>;
    };
}
interface RecommendationEngineProps {
    data: RecommendationData;
    onSpaceJoin: (spaceId: string) => void;
    onToolBookmark: (toolId: string) => void;
    onConnectionRequest: (userId: string) => void;
    onContentLike: (contentId: string) => void;
    onContentBookmark: (contentId: string) => void;
    onRefresh: () => void;
    className?: string;
}
export declare function RecommendationEngine({ data, onSpaceJoin, onToolBookmark, onConnectionRequest, onContentLike, onContentBookmark, onRefresh, className }: RecommendationEngineProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=recommendation-engine.d.ts.map