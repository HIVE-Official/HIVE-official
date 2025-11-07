"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
// ============================================================================
// Animation Variants (HIVE Motion Design)
// ============================================================================
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1], // Custom ease for smooth entry
            staggerChildren: 0.05
        }
    },
    hover: {
        y: -2,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
};
const actionButtonVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.15, ease: "easeOut" }
    },
    tap: {
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeIn" }
    }
};
const imageVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};
// ============================================================================
// PostCard Component (HIVE Design System - Vercel/OpenAI inspired)
// ============================================================================
export const PostCardListItem = React.forwardRef(({ post, onOpen, onMoreOptions, onRepostClick, onShare, onUpvoteClick, className, ...props }, ref) => {
    const hasMedia = post.media && post.media.length > 0;
    const firstMedia = hasMedia ? post.media[0] : null;
    const isUpvoted = post.votes?.my === "up";
    return (_jsxs(motion.article, { ref: ref, initial: "hidden", animate: "visible", whileHover: "hover", variants: cardVariants, className: cn(
        // HIVE Design: Clean card with subtle border
        "group relative", "rounded-xl border border-neutral-800/50", "bg-neutral-900/30 backdrop-blur-sm", "p-6", "hover:border-neutral-700/70 hover:bg-neutral-900/50", "will-change-transform", className), ...props, children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [_jsxs(Avatar, { className: "h-10 w-10 ring-1 ring-neutral-800", children: [_jsx(AvatarImage, { src: post.author.avatarUrl, alt: post.author.name }), _jsx(AvatarFallback, { className: "bg-neutral-800 text-neutral-300 text-sm font-medium", children: post.author.name.charAt(0).toUpperCase() })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-neutral-100 truncate", children: post.author.name }), post.author.verified && (_jsx("svg", { className: "w-4 h-4 text-yellow-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }) })), _jsx("span", { className: "text-xs text-neutral-500", children: "\u00B7" }), _jsx("span", { className: "text-xs text-neutral-500", children: post.timeAgo })] }), post.space && (_jsxs("div", { className: "text-xs text-neutral-600 truncate mt-0.5", children: ["in ", post.space] }))] })] }), onMoreOptions && (_jsx(motion.button, { onClick: (e) => {
                            e.stopPropagation();
                            onMoreOptions(post);
                        }, variants: actionButtonVariants, initial: "rest", whileHover: "hover", whileTap: "tap", className: "flex-shrink-0 p-1.5 rounded-lg text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-800 hover:text-neutral-300", "aria-label": "More options", children: _jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 6a2 2 2 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" }) }) }))] }), _jsxs("div", { className: "space-y-3 mb-4 cursor-pointer", onClick: (e) => {
                    if (onOpen) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        onOpen(post, rect, { mode: "post" });
                    }
                }, children: [post.title && (_jsx("h3", { className: "text-base font-semibold text-neutral-50 leading-snug", children: post.title })), post.body && (_jsx("p", { className: "text-sm text-neutral-300 leading-relaxed line-clamp-3", children: post.body }))] }), firstMedia && firstMedia.type === "image" && firstMedia.url && (_jsx(motion.div, { className: "mb-4 -mx-1 cursor-pointer overflow-hidden rounded-lg border border-neutral-800/50", onClick: (e) => {
                    if (onOpen) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        onOpen(post, rect, { mode: "post" });
                    }
                }, variants: imageVariants, initial: "rest", whileHover: "hover", children: _jsx(motion.img, { src: firstMedia.url, alt: firstMedia.alt || "", className: "w-full h-auto object-cover", style: { originX: 0.5, originY: 0.5 } }) })), _jsxs("div", { className: "flex items-center gap-6 pt-2 border-t border-neutral-800/30", children: [_jsxs(motion.button, { onClick: (e) => {
                            e.stopPropagation();
                            onUpvoteClick?.(post);
                        }, variants: actionButtonVariants, initial: "rest", whileHover: "hover", whileTap: "tap", className: cn("flex items-center gap-2 text-xs", isUpvoted
                            ? "text-yellow-500"
                            : "text-neutral-500 hover:text-neutral-300"), "aria-label": `Upvote (${post.votes?.up || 0})`, children: [_jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z", clipRule: "evenodd" }) }), _jsx("span", { className: "font-medium", children: post.votes?.up || 0 })] }), _jsxs(motion.button, { onClick: (e) => {
                            e.stopPropagation();
                            if (onOpen) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                onOpen(post, rect, { mode: "comments" });
                            }
                        }, variants: actionButtonVariants, initial: "rest", whileHover: "hover", whileTap: "tap", className: "flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300", "aria-label": `Comments (${post.counts?.comments || 0})`, children: [_jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z", clipRule: "evenodd" }) }), _jsx("span", { className: "font-medium", children: post.counts?.comments || 0 })] }), onRepostClick && (_jsxs(motion.button, { onClick: (e) => {
                            e.stopPropagation();
                            onRepostClick(post);
                        }, variants: actionButtonVariants, initial: "rest", whileHover: "hover", whileTap: "tap", className: cn("flex items-center gap-2 text-xs", post.repostedByMe
                            ? "text-yellow-500"
                            : "text-neutral-500 hover:text-neutral-300"), "aria-label": `Repost (${post.counts?.reposts || 0})`, children: [_jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z", clipRule: "evenodd" }) }), _jsx("span", { className: "font-medium", children: post.counts?.reposts || 0 })] })), onShare && (_jsx(motion.button, { onClick: (e) => {
                            e.stopPropagation();
                            onShare(post);
                        }, variants: actionButtonVariants, initial: "rest", whileHover: "hover", whileTap: "tap", className: "flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 ml-auto", "aria-label": "Share", children: _jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.367A2.52 2.52 0 0113 4.5z" }) }) }))] })] }));
});
PostCardListItem.displayName = "PostCardListItem";
// ============================================================================
// Loading Skeleton (matching design)
// ============================================================================
export const PostCardSkeleton = () => {
    return (_jsxs("div", { className: "rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-neutral-800 animate-pulse" }), _jsxs("div", { className: "space-y-2 flex-1", children: [_jsx("div", { className: "h-3.5 w-32 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3 w-24 bg-neutral-800 rounded animate-pulse" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-4 w-3/4 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3.5 w-full bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3.5 w-5/6 bg-neutral-800 rounded animate-pulse" })] }), _jsx("div", { className: "h-48 bg-neutral-800 rounded-lg animate-pulse" }), _jsxs("div", { className: "flex items-center gap-6 pt-2", children: [_jsx("div", { className: "h-3 w-12 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3 w-12 bg-neutral-800 rounded animate-pulse" }), _jsx("div", { className: "h-3 w-12 bg-neutral-800 rounded animate-pulse" })] })] }));
};
export const PostOverlay = () => {
    // Stub for now - can be implemented later if needed
    return null;
};
//# sourceMappingURL=post-card.js.map