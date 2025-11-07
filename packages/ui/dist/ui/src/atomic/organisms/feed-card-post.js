'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Avatar, AvatarFallback, AvatarImage, Badge, } from '../atoms/index.js';
import { FeedSpaceChip } from '../molecules/feed-space-chip.js';
import { FeedMediaPreview } from '../molecules/feed-media-preview.js';
import { FeedPostActions, } from '../molecules/feed-post-actions.js';
const clampCopy = (copy) => copy?.trim();
export const FeedCardPost = React.forwardRef(({ post, layout = 'default', className, showSpaceChip = true, onOpen, onSpaceClick, onUpvote, onComment, onBookmark, onShare, ...props }, ref) => {
    const { author, content, space, stats, meta } = post;
    const media = content.media ?? [];
    const hasMedia = media.length > 0;
    const actions = {
        upvotes: stats.upvotes,
        comments: stats.comments,
        isUpvoted: stats.isUpvoted,
        isBookmarked: stats.isBookmarked,
        onUpvote: () => onUpvote?.(post.id),
        onComment: () => onComment?.(post.id),
        onBookmark: () => onBookmark?.(post.id),
        onShare: () => onShare?.(post.id),
    };
    const handleCardClick = () => {
        onOpen?.(post.id);
    };
    const cardPadding = layout === 'cozy' ? 'p-4' : 'p-6';
    return (_jsxs("article", { ref: ref, tabIndex: 0, role: "article", className: cn('group relative rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 94%,transparent)] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]', cardPadding, className), onClick: handleCardClick, ...props, children: [meta.isPinned && (_jsx(Badge, { variant: "outline", className: "absolute -top-3 left-6 bg-[var(--hive-background-primary)] text-[var(--hive-brand-primary)] shadow-md", children: "Pinned" })), _jsxs("header", { className: "flex items-start gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10 shrink-0 border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)]", children: [_jsx(AvatarImage, { src: author.avatarUrl, alt: author.name }), _jsx(AvatarFallback, { children: author.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-2 min-w-0", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: author.name }), author.role && (_jsx("span", { className: "rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[var(--hive-text-tertiary)]", children: author.role })), _jsxs("span", { className: "text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]", children: [meta.timeAgo, meta.isEdited ? ' • Edited' : ''] })] }), showSpaceChip && (_jsx(FeedSpaceChip, { spaceId: space.id, spaceName: space.name, spaceColor: space.color, spaceIcon: space.icon, onClick: onSpaceClick
                                    ? (event) => {
                                        event.stopPropagation();
                                        onSpaceClick(space.id);
                                    }
                                    : undefined }))] })] }), _jsxs("div", { className: "mt-4 space-y-3", children: [content.headline && (_jsx("h2", { className: "text-base font-semibold leading-snug text-[var(--hive-text-primary)]", children: content.headline })), clampCopy(content.body) && (_jsx("p", { className: cn('text-sm leading-relaxed text-[var(--hive-text-secondary)]', content.body && content.body.length > 220 ? 'line-clamp-5' : 'line-clamp-3'), children: content.body })), hasMedia && (_jsx(FeedMediaPreview, { media: media, className: "mt-2" })), content.tags && content.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: content.tags.map((tag) => (_jsxs("span", { className: "rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 50%,transparent)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]", children: ["#", tag] }, tag))) }))] }), _jsx("footer", { className: "mt-5", children: _jsx(FeedPostActions, { className: "-ml-2", ...actions }) })] }));
});
FeedCardPost.displayName = 'FeedCardPost';
//# sourceMappingURL=feed-card-post.js.map