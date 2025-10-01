'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Post Card - Displays a single post in the feed
 *
 * Required sections:
 * - Author info (avatar, name, timestamp)
 * - Space badge (which space it's from)
 * - Content (text, media)
 * - Engagement stats (likes, comments, shares)
 * - Action buttons (like, comment, share, menu)
 */
const feedPostCardVariants = cva(
// Base styles - minimal skeleton
'relative w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]', {
    variants: {
        variant: {
            default: 'border-[var(--hive-border-default)]',
            highlighted: 'border-[var(--hive-brand-primary)] shadow-lg',
        },
        size: {
            default: 'max-w-[600px]',
            full: 'w-full',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
export const FeedPostCard = React.forwardRef(({ className, variant, size, authorName = 'Author Name', authorHandle = '@handle', authorAvatar, timestamp = '2h ago', spaceName, spaceIcon, contentType = 'text', textContent = 'This is placeholder post content. Actual UI/UX to be determined in Storybook.', images = [], videoUrl, linkPreview, likeCount = 0, commentCount = 0, shareCount = 0, isLiked = false, isLoading = false, error, onLike, onComment, onShare, onMenuClick, ...props }, ref) => {
    if (isLoading) {
        return (_jsx("div", { ref: ref, className: cn(feedPostCardVariants({ variant, size }), className), ...props, children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-10 bg-[var(--hive-surface-secondary)] rounded mb-4" }), _jsx("div", { className: "h-20 bg-[var(--hive-surface-secondary)] rounded mb-4" }), _jsx("div", { className: "h-8 bg-[var(--hive-surface-secondary)] rounded" })] }) }));
    }
    if (error) {
        return (_jsx("div", { ref: ref, className: cn(feedPostCardVariants({ variant, size }), 'border-[var(--hive-error)]', className), ...props, children: _jsxs("p", { className: "text-[var(--hive-error)]", children: ["Error: ", error] }) }));
    }
    return (_jsxs("div", { ref: ref, className: cn(feedPostCardVariants({ variant, size }), className), ...props, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)] flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "\uD83D\uDC64" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)]", children: authorName }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: authorHandle }), spaceName && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-[var(--hive-text-tertiary)]", children: "\u2192" }), _jsx("span", { className: "text-sm text-[var(--hive-brand-primary)]", children: spaceName })] }))] }), _jsx("span", { className: "text-sm text-[var(--hive-text-tertiary)]", children: timestamp })] }), _jsx("button", { type: "button", onClick: onMenuClick, className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded", children: _jsx("span", { children: "\u22EF" }) })] }), _jsxs("div", { className: "mb-4", children: [contentType === 'text' && (_jsx("p", { className: "text-[var(--hive-text-primary)] whitespace-pre-wrap", children: textContent })), contentType === 'image' && images.length > 0 && (_jsxs("div", { className: "space-y-2", children: [textContent && (_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: textContent })), _jsxs("div", { className: "bg-[var(--hive-surface-secondary)] rounded-lg p-8 text-center", children: [_jsx("span", { className: "text-4xl", children: "\uD83D\uDDBC\uFE0F" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-2", children: ["Image placeholder (", images.length, " image", images.length > 1 ? 's' : '', ")"] })] })] })), contentType === 'video' && (_jsxs("div", { className: "space-y-2", children: [textContent && (_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: textContent })), _jsxs("div", { className: "bg-[var(--hive-surface-secondary)] rounded-lg p-8 text-center", children: [_jsx("span", { className: "text-4xl", children: "\uD83C\uDFA5" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-2", children: "Video placeholder" })] })] })), contentType === 'link' && linkPreview && (_jsxs("div", { className: "space-y-2", children: [textContent && (_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: textContent })), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDD17" }), _jsx("p", { className: "font-semibold text-[var(--hive-text-primary)] mt-2", children: linkPreview.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: linkPreview.description })] })] })), contentType === 'event' && (_jsxs("div", { className: "space-y-2", children: [textContent && (_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: textContent })), _jsxs("div", { className: "bg-[var(--hive-surface-secondary)] rounded-lg p-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCC5" }), _jsx("p", { className: "font-semibold text-[var(--hive-text-primary)] mt-2", children: "Event placeholder" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Date \u2022 Time \u2022 Location" })] })] })), contentType === 'poll' && (_jsxs("div", { className: "space-y-2", children: [textContent && (_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: textContent })), _jsxs("div", { className: "bg-[var(--hive-surface-secondary)] rounded-lg p-4", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCCA" }), _jsx("p", { className: "font-semibold text-[var(--hive-text-primary)] mt-2", children: "Poll placeholder" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Option 1 | Option 2 | Option 3" })] })] }))] }), _jsxs("div", { className: "border-t border-[var(--hive-border-default)] pt-3", children: [(likeCount > 0 || commentCount > 0 || shareCount > 0) && (_jsxs("div", { className: "flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mb-3", children: [likeCount > 0 && _jsxs("span", { children: [likeCount, " likes"] }), commentCount > 0 && _jsxs("span", { children: [commentCount, " comments"] }), shareCount > 0 && _jsxs("span", { children: [shareCount, " shares"] })] })), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("button", { type: "button", onClick: onLike, className: cn('flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors', isLiked && 'text-[var(--hive-brand-primary)]'), children: [isLiked ? '❤️' : '🤍', " Like"] }), _jsx("button", { type: "button", onClick: onComment, className: "flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors", children: "\uD83D\uDCAC Comment" }), _jsx("button", { type: "button", onClick: onShare, className: "flex-1 py-2 px-4 rounded hover:bg-[var(--hive-surface-secondary)] transition-colors", children: "\uD83D\uDD04 Share" })] })] }), _jsx("div", { className: "mt-4 p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]", children: "\u26A0\uFE0F SKELETON: Actual UI/UX to be designed in Storybook review" })] }));
});
FeedPostCard.displayName = 'FeedPostCard';
//# sourceMappingURL=feed-post-card.js.map