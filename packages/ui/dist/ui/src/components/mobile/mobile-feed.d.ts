interface MobileFeedProps {
    posts: FeedPost[];
    onRefresh: () => Promise<void>;
    onLoadMore: () => Promise<void>;
    onLike: (postId: string) => void;
    onBookmark: (postId: string) => void;
    onShare: (post: FeedPost) => void;
    onComment: (postId: string) => void;
    hasMore?: boolean;
    isLoading?: boolean;
}
interface FeedPost {
    id: string;
    content: string;
    author: {
        name: string;
        handle: string;
        avatar?: string;
    };
    timestamp: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    isBookmarked: boolean;
    space?: {
        name: string;
        color: string;
    };
    contentType: 'text' | 'image' | 'link' | 'tool';
    preview?: {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
    };
}
export declare function MobileFeed({ posts, onRefresh, onLoadMore, onLike, onBookmark, onShare, onComment, hasMore, isLoading }: MobileFeedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=mobile-feed.d.ts.map