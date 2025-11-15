export interface FeedPostAuthor {
    name: string;
    handle: string;
    campusRole: string;
    avatarInitials?: string;
    avatarUrl?: string;
    badges?: string[];
}
export interface FeedPostMedia {
    type: "image" | "gallery";
    url: string;
    alt?: string;
}
export interface FeedPostStats {
    applause: number;
    replies: number;
    reposts?: number;
    saves?: number;
}
export interface FeedPost {
    id: string;
    author: FeedPostAuthor;
    title?: string;
    content: string;
    postedAt: string;
    campusLocation?: string;
    tags?: string[];
    media?: FeedPostMedia[];
    stats: FeedPostStats;
    pinned?: boolean;
}
export interface FeedRitual {
    id: string;
    title: string;
    time: string;
    location: string;
    status?: "live" | "up-next" | "prep";
}
export interface FeedTrendingSpace {
    id: string;
    name: string;
    category: string;
    members: number;
    status?: "live" | "calm" | "growing";
}
export interface FeedPageProps {
    campusName?: string;
    userName?: string;
    activeTab?: string;
    posts?: FeedPost[];
    rituals?: FeedRitual[];
    trendingSpaces?: FeedTrendingSpace[];
    announcements?: string[];
    quickActions?: Array<{
        id: string;
        label: string;
        description: string;
    }>;
    onTabChange?: (tab: string) => void;
}
export declare function FeedPage({ campusName, userName, activeTab, posts, rituals, trendingSpaces, announcements, quickActions, onTabChange, }: FeedPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FeedPage.d.ts.map