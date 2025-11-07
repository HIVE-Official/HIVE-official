import * as React from 'react';
import { type SpaceTool } from '../molecules/space-tools-widget';
import { type FeedItem } from '../organisms/feed-virtualized-list';
import type { MediaFile } from '../organisms/feed-composer-sheet';
export interface PinnedPost {
    id: string;
    title: string;
    author: string;
    timeAgo: string;
}
export interface SpaceBoardTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
    spaceId: string;
    spaceName: string;
    spaceIcon?: string;
    spaceColor?: string;
    spaceDescription: string;
    memberCount: number;
    isPublic: boolean;
    isMember: boolean;
    isLeader?: boolean;
    leaders?: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
        role?: string;
    }>;
    pinnedPosts?: PinnedPost[];
    onPinnedPostClick?: (postId: string) => void;
    activeTools?: SpaceTool[];
    onToolClick?: (toolId: string) => void;
    feedItems: FeedItem[];
    renderFeedItem: (item: FeedItem, index: number) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoading?: boolean;
    onJoin?: (spaceId: string) => void;
    onLeave?: (spaceId: string) => void;
    onShare?: () => void;
    onPostSubmit?: (data: {
        content: string;
        spaceId: string;
        media: MediaFile[];
        anonymous: boolean;
    }) => void;
    isPostSubmitting?: boolean;
    allowAnonymous?: boolean;
    showComposer?: boolean;
}
/**
 * SpaceBoardTemplate
 *
 * Complete space board page with:
 * - Header (join/leave, share)
 * - Composer button (opens modal)
 * - Pinned posts stack
 * - Feed with infinite scroll
 * - Right rail (about, tools) - desktop only
 * - Mobile: single scroll (no tabs)
 */
export declare const SpaceBoardTemplate: React.ForwardRefExoticComponent<SpaceBoardTemplateProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-board-template.d.ts.map