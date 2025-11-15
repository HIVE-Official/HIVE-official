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
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { HeartIcon, MessageCircleIcon, BookmarkIcon, ShareIcon, } from '../../00-Global/atoms/icon-library';
const ActionButton = ({ icon: Icon, count, isActive, onClick, label, compact = false, activeColor = 'var(--hive-brand-primary)', isToggle = false, }) => {
    // Track if this is the first mount to avoid initial animation
    const isInitialMount = React.useRef(true);
    const [wasActive, setWasActive] = React.useState(isActive);
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            setWasActive(isActive);
        }
    }, [isActive]);
    return (_jsxs(motion.button, { type: "button", onClick: onClick, "aria-label": label, "aria-pressed": isToggle ? isActive : undefined, className: cn('group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]', compact ? 'min-h-[36px]' : 'min-h-[44px]'), 
        // Instant tap feedback (< 16ms perceived latency)
        whileTap: { scale: 0.95 }, transition: { type: 'spring', stiffness: 400, damping: 25 }, children: [_jsx(motion.div, { animate: isActive ? { scale: 1.1 } : { scale: 1 }, transition: { type: 'spring', stiffness: 400, damping: 15 }, children: _jsx(Icon, { className: cn('h-5 w-5 transition-colors duration-150', isActive && 'fill-current'), style: {
                        color: isActive ? activeColor : 'var(--hive-text-secondary)',
                    } }) }), count !== undefined && count > 0 && (_jsx(motion.span, { initial: !isInitialMount.current && isActive !== wasActive ? { scale: 1.2, opacity: 0.7 } : false, animate: { scale: 1, opacity: 1 }, transition: { type: 'spring', stiffness: 400, damping: 20 }, className: cn('text-sm font-medium tabular-nums transition-colors', isActive
                    ? 'text-[var(--hive-text-primary)]'
                    : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'), children: count > 999 ? `${(count / 1000).toFixed(1)}k` : count }, count))] }));
};
export const FeedPostActions = React.forwardRef(({ upvotes, comments, isUpvoted, isBookmarked, onUpvote, onComment, onBookmark, onShare, className, compact = false, }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn('flex items-center gap-1', className), role: "toolbar", "aria-label": "Post actions", children: [_jsx(ActionButton, { icon: HeartIcon, count: upvotes, isActive: isUpvoted, onClick: onUpvote, label: isUpvoted ? 'Remove upvote' : 'Upvote post', compact: compact, activeColor: "#ef4444" // Red for heart/upvote
                , isToggle: true }), _jsx(ActionButton, { icon: MessageCircleIcon, count: comments, isActive: false, onClick: onComment, label: `View ${comments} ${comments === 1 ? 'comment' : 'comments'}`, compact: compact }), _jsx(ActionButton, { icon: BookmarkIcon, count: undefined, isActive: isBookmarked, onClick: onBookmark, label: isBookmarked ? 'Remove bookmark' : 'Bookmark post', compact: compact, activeColor: "var(--hive-brand-primary)" // Gold for bookmark
                , isToggle: true }), _jsx(ActionButton, { icon: ShareIcon, count: undefined, isActive: false, onClick: onShare, label: "Share post", compact: compact })] }));
});
FeedPostActions.displayName = 'FeedPostActions';
//# sourceMappingURL=feed-post-actions.js.map