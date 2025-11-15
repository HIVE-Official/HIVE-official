import * as React from 'react';
import { type FeedItem } from '../../02-Feed/organisms/feed-virtualized-list';
export interface PinnedPost {
    id: string;
    title: string;
    author: string;
    timeAgo: string;
}
export interface SpaceBoardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    spaceId: string;
    spaceName: string;
    spaceIcon?: string;
    spaceColor?: string;
    memberCount: number;
    isMember: boolean;
    isLeader?: boolean;
    pinnedPosts?: PinnedPost[];
    onPinnedPostClick?: (postId: string) => void;
    showComposer?: boolean;
    onCompose?: () => void;
    feedItems: FeedItem[];
    renderFeedItem: (item: FeedItem, index: number) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
    onJoin?: (spaceId: string) => void;
    onLeave?: (spaceId: string) => void;
    onShare?: () => void;
}
export declare const SpaceBoardLayout: React.ForwardRefExoticComponent<SpaceBoardLayoutProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-board-layout.d.ts.map