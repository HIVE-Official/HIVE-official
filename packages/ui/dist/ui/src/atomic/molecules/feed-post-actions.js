'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { cn } from '../../lib/utils.js';
import { HeartIcon, MessageCircleIcon, BookmarkIcon, ShareIcon, } from '../atoms/icon-library.js';
const ActionButton = ({ icon: Icon, count, isActive, onClick, label, compact = false, activeColor = 'var(--hive-brand-primary)', isToggle = false, }) => {
    return (_jsxs("button", { type: "button", onClick: onClick, "aria-label": label, "aria-pressed": isToggle ? isActive : undefined, className: cn('group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]', compact ? 'min-h-[36px]' : 'min-h-[44px]'), children: [_jsx(Icon, { className: cn('h-5 w-5 transition-all duration-200', isActive
                    ? 'scale-110 fill-current'
                    : 'group-hover:scale-110'), style: {
                    color: isActive ? activeColor : 'var(--hive-text-secondary)',
                } }), count !== undefined && count > 0 && (_jsx("span", { className: cn('text-sm font-medium tabular-nums transition-colors', isActive
                    ? 'text-[var(--hive-text-primary)]'
                    : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'), children: count > 999 ? `${(count / 1000).toFixed(1)}k` : count }))] }));
};
export const FeedPostActions = React.forwardRef(({ upvotes, comments, isUpvoted, isBookmarked, onUpvote, onComment, onBookmark, onShare, className, compact = false, }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn('flex items-center gap-1', className), role: "toolbar", "aria-label": "Post actions", children: [_jsx(ActionButton, { icon: HeartIcon, count: upvotes, isActive: isUpvoted, onClick: onUpvote, label: isUpvoted ? 'Remove upvote' : 'Upvote post', compact: compact, activeColor: "#ef4444" // Red for heart/upvote
                , isToggle: true }), _jsx(ActionButton, { icon: MessageCircleIcon, count: comments, isActive: false, onClick: onComment, label: `View ${comments} ${comments === 1 ? 'comment' : 'comments'}`, compact: compact }), _jsx(ActionButton, { icon: BookmarkIcon, count: undefined, isActive: isBookmarked, onClick: onBookmark, label: isBookmarked ? 'Remove bookmark' : 'Bookmark post', compact: compact, activeColor: "var(--hive-brand-primary)" // Gold for bookmark
                , isToggle: true }), _jsx(ActionButton, { icon: ShareIcon, count: undefined, isActive: false, onClick: onShare, label: "Share post", compact: compact })] }));
});
FeedPostActions.displayName = 'FeedPostActions';
//# sourceMappingURL=feed-post-actions.js.map