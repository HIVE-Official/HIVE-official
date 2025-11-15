/**
 * FeedPostActions - Post engagement action buttons
 *
 * Features:
 * - Upvote/comment/bookmark/share row
 * - Icon buttons with 44×44px touch targets
 * - Optimistic updates (< 16ms perceived latency)
 * - Animated state changes
 * - Count displays
 *
 * Usage:
 * ```tsx
 * import { FeedPostActions } from '@hive/ui';
 *
 * <FeedPostActions
 *   upvotes={42}
 *   comments={12}
 *   isUpvoted={false}
 *   isBookmarked={false}
 *   onUpvote={() => {}}
 *   onComment={() => {}}
 *   onBookmark={() => {}}
 *   onShare={() => {}}
 * />
 * ```
 */
import * as React from 'react';
export interface FeedPostActionsProps {
    /**
     * Number of upvotes
     */
    upvotes: number;
    /**
     * Number of comments
     */
    comments: number;
    /**
     * Whether current user has upvoted
     */
    isUpvoted: boolean;
    /**
     * Whether current user has bookmarked
     */
    isBookmarked: boolean;
    /**
     * Callback when upvote is clicked
     */
    onUpvote: () => void;
    /**
     * Callback when comment is clicked
     */
    onComment: () => void;
    /**
     * Callback when bookmark is clicked
     */
    onBookmark: () => void;
    /**
     * Callback when share is clicked
     */
    onShare: () => void;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Compact mode (smaller touch targets for desktop)
     */
    compact?: boolean;
}
export declare const FeedPostActions: React.ForwardRefExoticComponent<FeedPostActionsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-post-actions.d.ts.map