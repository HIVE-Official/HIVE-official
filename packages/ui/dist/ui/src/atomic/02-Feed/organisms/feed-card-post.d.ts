import * as React from 'react';
import { type MediaItem } from '../molecules/feed-media-preview';
export interface FeedCardAuthor {
    id: string;
    name: string;
    avatarUrl?: string;
    role?: string;
    verified?: boolean;
}
export interface FeedCardSpace {
    id: string;
    name: string;
    color?: string;
    icon?: string;
}
export interface FeedCardPostStats {
    upvotes: number;
    comments: number;
    isUpvoted: boolean;
    isBookmarked: boolean;
}
export interface FeedCardPostContent {
    headline?: string;
    body?: string;
    media?: MediaItem[];
    tags?: string[];
}
export interface FeedCardPostMeta {
    timeAgo: string;
    isPinned?: boolean;
    isEdited?: boolean;
}
export interface FeedCardPostData {
    id: string;
    author: FeedCardAuthor;
    space: FeedCardSpace;
    content: FeedCardPostContent;
    stats: FeedCardPostStats;
    meta: FeedCardPostMeta;
}
export interface FeedCardPostCallbacks {
    onOpen?: (postId: string) => void;
    onSpaceClick?: (spaceId: string) => void;
    onUpvote?: (postId: string) => void;
    onComment?: (postId: string) => void;
    onBookmark?: (postId: string) => void;
    onShare?: (postId: string) => void;
}
type ArticleElement = React.ComponentPropsWithoutRef<"article">;
export interface FeedCardPostProps extends FeedCardPostCallbacks, ArticleElement {
    post: FeedCardPostData;
    layout?: 'default' | 'cozy';
    showSpaceChip?: boolean;
}
export declare const FeedCardPost: React.ForwardRefExoticComponent<FeedCardPostProps & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=feed-card-post.d.ts.map