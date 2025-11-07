'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { SpaceHeader } from '../molecules/space-header';
import { SpaceAboutWidget } from '../molecules/space-about-widget';
import { SpaceToolsWidget } from '../molecules/space-tools-widget';
import { SpacePostComposer } from '../organisms/space-post-composer';
import { FeedVirtualizedList } from '../organisms/feed-virtualized-list';
import { Button, PinIcon } from '../atoms';
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
export const SpaceBoardTemplate = React.forwardRef(({ spaceId, spaceName, spaceIcon, spaceColor, spaceDescription, memberCount, isPublic, isMember, isLeader = false, leaders = [], pinnedPosts = [], onPinnedPostClick, activeTools = [], onToolClick, feedItems, renderFeedItem, onLoadMore, hasMore = false, isLoading = false, onJoin, onLeave, onShare, onPostSubmit, isPostSubmitting = false, allowAnonymous = false, showComposer = true, className, ...props }, ref) => {
    const [composerOpen, setComposerOpen] = React.useState(false);
    const normalizedLeaders = React.useMemo(() => leaders.map((leader) => ({
        ...leader,
        role: leader.role ?? "Leader",
    })), [leaders]);
    const spaceAboutData = {
        spaceId,
        description: spaceDescription,
        memberCount,
        leaders: normalizedLeaders,
        isPublic,
        isMember,
    };
    return (_jsxs("div", { ref: ref, className: cn('flex min-h-screen flex-col bg-[var(--hive-background-primary)]', className), ...props, children: [_jsx(SpaceHeader, { space: {
                    id: spaceId,
                    name: spaceName,
                    iconUrl: spaceIcon,
                }, memberCount: memberCount, membershipState: isMember ? 'joined' : 'not_joined', isLeader: isLeader, onJoin: !isMember && onJoin ? () => onJoin(spaceId) : undefined, onLeave: isMember && onLeave ? () => onLeave(spaceId) : undefined, onShare: onShare }), _jsxs("div", { className: "flex flex-1", children: [_jsx("main", { className: "flex-1 px-4 py-6", children: _jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [showComposer && isMember && (_jsx(Button, { variant: "secondary", className: "w-full justify-start text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", onClick: () => setComposerOpen(true), children: _jsx("span", { className: "text-left", children: "Share something with the space..." }) })), pinnedPosts.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 px-2", children: [_jsx(PinIcon, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]", children: "Pinned Posts" })] }), _jsx("div", { className: "space-y-2", children: pinnedPosts.map((post) => (_jsx("button", { onClick: () => onPinnedPostClick?.(post.id), className: "group flex w-full items-start gap-3 rounded-xl border-l-4 border-[var(--hive-brand-primary)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] p-4 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--hive-background-secondary) 92%,transparent)]", children: _jsxs("div", { className: "flex-1 space-y-1", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: post.title }), _jsxs("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: [post.author, " \u2022 ", post.timeAgo] })] }) }, post.id))) })] })), _jsx(FeedVirtualizedList, { items: feedItems, renderItem: renderFeedItem, onLoadMore: onLoadMore, hasMore: hasMore, isLoading: isLoading })] }) }), _jsxs("aside", { className: "hidden w-80 shrink-0 space-y-4 border-l border-[var(--hive-border-primary)] p-4 lg:block", children: [_jsx(SpaceAboutWidget, { data: spaceAboutData, onJoin: !isMember && onJoin ? () => onJoin(spaceId) : undefined, onLeave: isMember && onLeave ? () => onLeave(spaceId) : undefined }), activeTools.length > 0 && (_jsx(SpaceToolsWidget, { data: {
                                    spaceId,
                                    tools: activeTools,
                                    hasMore: activeTools.length > 3,
                                }, onToolClick: onToolClick }))] })] }), isMember && (_jsx(SpacePostComposer, { spaceId: spaceId, spaceName: spaceName, spaceIcon: spaceIcon, spaceColor: spaceColor, open: composerOpen, onOpenChange: setComposerOpen, allowAnonymous: allowAnonymous, onSubmit: onPostSubmit, isSubmitting: isPostSubmitting }))] }));
});
SpaceBoardTemplate.displayName = 'SpaceBoardTemplate';
//# sourceMappingURL=space-board-template.js.map