"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";
// ============================================================================
// PostCardListItem - Main Component
// ============================================================================
export const PostCardListItem = React.forwardRef(({ post, onOpen, onMoreOptions, onRepostClick, onShare, onUpvoteClick, className, ...rest }, ref) => {
    const handleCardClick = (e) => {
        // Get bounding rect for animation origin
        const rect = e.currentTarget.getBoundingClientRect();
        onOpen?.(post, rect, { mode: "post" });
    };
    const handleCommentsClick = (e) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        onOpen?.(post, rect, { mode: "comments" });
    };
    const handleUpvoteClick = (e) => {
        e.stopPropagation();
        onUpvoteClick?.(post);
    };
    const handleRepostClick = (e) => {
        e.stopPropagation();
        onRepostClick?.(post);
    };
    const handleShareClick = (e) => {
        e.stopPropagation();
        onShare?.(post);
    };
    const handleMoreClick = (e) => {
        e.stopPropagation();
        onMoreOptions?.(post);
    };
    const isUpvoted = post.votes?.my === "up";
    return (_jsx(motion.article, { ref: ref, className: cn("group relative overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm", "hover:border-neutral-700/50 hover:bg-neutral-900/60", "transition-colors duration-200", className), layout: true, ...rest, children: _jsxs(CardContent, { className: "p-0", children: [post.repostAttribution && (_jsxs("div", { className: "flex items-center gap-2 px-4 pt-3 text-xs text-neutral-400", children: [_jsx("span", { className: "text-neutral-500", children: "\u21BB" }), _jsxs(Avatar, { className: "h-4 w-4", children: [_jsx(AvatarImage, { src: post.repostAttribution.avatarUrl, alt: post.repostAttribution.name }), _jsx(AvatarFallback, { className: "text-[8px]", children: post.repostAttribution.name[0] })] }), _jsxs("span", { children: [post.repostAttribution.name, " reposted \u00B7 ", post.repostAttribution.timeAgo] })] })), _jsxs("div", { className: "cursor-pointer p-4", onClick: handleCardClick, role: "button", tabIndex: 0, onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardClick(e);
                        }
                    }, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10 flex-shrink-0", children: [_jsx(AvatarImage, { src: post.author.avatarUrl, alt: post.author.name }), _jsx(AvatarFallback, { children: post.author.name[0] })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: "font-semibold text-white truncate", children: post.author.name }), post.author.verified && (_jsx("span", { className: "text-xs text-yellow-500", title: "Verified", children: "\u2713" })), post.author.badges?.map((badge) => (_jsx(Badge, { variant: "outline", className: "text-xs border-neutral-700 text-neutral-300", children: badge }, badge)))] }), _jsxs("div", { className: "flex items-center gap-1.5 text-sm text-neutral-400", children: [post.author.handle && _jsxs("span", { children: ["@", post.author.handle] }), post.space && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u00B7" }), _jsx("span", { className: "text-neutral-300", children: post.space })] })), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: post.timeAgo }), post.isEdited && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u00B7" }), _jsx("span", { className: "text-neutral-500 text-xs", children: "edited" })] }))] })] }), _jsx("button", { onClick: handleMoreClick, className: "p-1.5 -m-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors", "aria-label": "More options", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: [_jsx("circle", { cx: "8", cy: "3", r: "1.5" }), _jsx("circle", { cx: "8", cy: "8", r: "1.5" }), _jsx("circle", { cx: "8", cy: "13", r: "1.5" })] }) })] }), post.title && (_jsx("h3", { className: "mt-3 text-lg font-semibold text-white leading-snug", children: post.title })), post.body && (_jsx("p", { className: "mt-2 text-neutral-200 leading-relaxed whitespace-pre-wrap", children: post.body })), post.media && post.media.length > 0 && (_jsx("div", { className: cn("mt-3 grid gap-2 rounded-lg overflow-hidden", post.media.length === 1 && "grid-cols-1", post.media.length === 2 && "grid-cols-2", post.media.length === 3 && "grid-cols-3", post.media.length >= 4 && "grid-cols-2"), children: post.media.slice(0, 4).map((item, idx) => (_jsxs("div", { className: cn("relative aspect-square bg-neutral-800", post.media?.length === 1 && "aspect-video", post.media?.length === 3 && idx === 0 && "col-span-2 aspect-video"), children: [item.type === "image" && (_jsx("img", { src: item.url, alt: item.alt || "", className: "w-full h-full object-cover" })), item.type === "video" && (_jsx("video", { src: item.url, className: "w-full h-full object-cover", controls: true })), post.media && idx === 3 && post.media.length > 4 && (_jsxs("div", { className: "absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-semibold", children: ["+", post.media.length - 4] }))] }, item.id))) })), post.tags && post.tags.length > 0 && (_jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsxs("span", { className: "text-xs text-yellow-500 hover:text-yellow-400 cursor-pointer", children: ["#", tag] }, tag))) }))] }), _jsxs("div", { className: "flex items-center gap-1 px-4 pb-3 text-sm text-neutral-400", children: [_jsxs("button", { onClick: handleUpvoteClick, className: cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors", "hover:bg-neutral-800", isUpvoted && "text-yellow-500"), "aria-label": isUpvoted ? "Remove upvote" : "Upvote", children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: _jsx("path", { d: "M8 2l2.5 5h5L10 11l1.5 5L8 13l-3.5 3L6 11 .5 7h5z" }) }), _jsx("span", { className: "font-medium", children: post.votes?.up || 0 })] }), _jsxs("button", { onClick: handleCommentsClick, className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors", "aria-label": "View comments", children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: _jsx("path", { d: "M2 2h12a1 1 0 011 1v8a1 1 0 01-1 1H8l-3 3v-3H2a1 1 0 01-1-1V3a1 1 0 011-1z" }) }), _jsx("span", { className: "font-medium", children: post.counts?.comments || 0 })] }), _jsxs("button", { onClick: handleRepostClick, className: cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors", "hover:bg-neutral-800", post.repostedByMe && "text-green-500"), "aria-label": "Repost", children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: _jsx("path", { d: "M5 2v3H2v2h3v3l4-4-4-4zm6 12v-3h3V9h-3V6l-4 4 4 4z" }) }), post.counts?.reposts ? (_jsx("span", { className: "font-medium", children: post.counts.reposts })) : null] }), _jsxs("button", { onClick: handleShareClick, className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors ml-auto", "aria-label": "Share", children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: _jsx("path", { d: "M13 9v4H3V9H1v4a2 2 0 002 2h10a2 2 0 002-2V9h-2zM8 1L4 5h2.5v6h3V5H12L8 1z" }) }), post.counts?.shares ? (_jsx("span", { className: "font-medium", children: post.counts.shares })) : null] }), post.counts?.views && (_jsxs("span", { className: "text-xs text-neutral-500 ml-2", children: [post.counts.views.toLocaleString(), " views"] }))] })] }) }));
});
PostCardListItem.displayName = "PostCardListItem";
// ============================================================================
// PostCardSkeleton - Loading State
// ============================================================================
export const PostCardSkeleton = () => {
    return (_jsx(Card, { className: "border-neutral-800/50 bg-neutral-900/40", children: _jsxs(CardContent, { className: "p-4 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-neutral-800 animate-pulse flex-shrink-0" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 w-32 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3 w-48 bg-neutral-800 rounded animate-pulse" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-5 w-3/4 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-4 w-full bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-4 w-5/6 bg-neutral-800 rounded animate-pulse" })] }), _jsx("div", { className: "aspect-video bg-neutral-800 rounded-lg animate-pulse" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-8 w-16 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-8 w-16 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-8 w-16 bg-neutral-800 rounded animate-pulse" })] })] }) }));
};
//# sourceMappingURL=post-card.js.map