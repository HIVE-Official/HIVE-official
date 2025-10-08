import * as React from "react";
import type { SpaceActionHandler } from "../../types/space.types";
export interface SpacePost {
    id: string;
    author: {
        userId: string;
        name: string;
        handle: string;
        avatar?: string;
    };
    content: string;
    contentType?: "text" | "image" | "link" | "announcement";
    images?: string[];
    linkPreview?: {
        title: string;
        description?: string;
        url: string;
        image?: string;
    };
    createdAt: Date;
    updatedAt?: Date;
    likeCount?: number;
    commentCount?: number;
    isLiked?: boolean;
    isPinned?: boolean;
    isAnnouncement?: boolean;
}
export interface SpacePostFeedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** List of posts */
    posts?: SpacePost[];
    /** Show post composer */
    showComposer?: boolean;
    /** Composer placeholder text */
    composerPlaceholder?: string;
    /** Whether user can post */
    canPost?: boolean;
    /** Has more posts to load */
    hasMore?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyStateMessage?: string;
    /** Action handler (aggregated) */
    onAction?: SpaceActionHandler;
    /** Legacy handlers (for backward compatibility) */
    onCreatePost?: (content: string) => void;
    onPostClick?: (post: SpacePost) => void;
    onLike?: (postId: string) => void;
    onComment?: (postId: string) => void;
    onShare?: (postId: string) => void;
    onLoadMore?: () => void;
}
declare const SpacePostFeed: React.ForwardRefExoticComponent<SpacePostFeedProps & React.RefAttributes<HTMLDivElement>>;
export { SpacePostFeed };
//# sourceMappingURL=space-post-feed.d.ts.map