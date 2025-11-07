'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useReducedMotion, } from "framer-motion";
import { ArrowBigUp, BadgeCheck, MessageCircle, MoreHorizontal, Repeat2, Share2, X, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Skeleton } from "../atoms/skeleton";
import { Textarea } from "../atoms/textarea";
import { cn } from "../../lib/utils";
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary,#FACC15)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary,#0A0A0A)]";
const surfaceClasses = "relative rounded-[28px] border border-[color-mix(in_srgb,var(--hive-border-default,#2F2F37) 92%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,12,15,0.92)) 90%,transparent)] backdrop-blur-[36px] transition-colors duration-200";
const metaText = "text-[var(--hive-text-mutedLight,#9CA3AF)]";
const secondaryText = "text-[var(--hive-text-secondary,#E5E7EB)]";
const clampText = (text, limit = 90) => {
    if (!text)
        return "";
    return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
};
const AnimatedNumber = ({ value }) => {
    const prefersReducedMotion = useReducedMotion();
    const [display, setDisplay] = React.useState(Math.round(value));
    const previous = React.useRef(value);
    React.useEffect(() => {
        if (prefersReducedMotion) {
            setDisplay(Math.round(value));
            previous.current = value;
            return;
        }
        const controls = animate(previous.current, value, {
            duration: 0.35,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(Math.round(latest)),
        });
        previous.current = value;
        return () => {
            controls.stop();
        };
    }, [value, prefersReducedMotion]);
    return _jsx("span", { className: "tabular-nums", children: display });
};
const MediaGrid = ({ media }) => {
    if (!media || media.length === 0)
        return null;
    const gridCols = media.length === 1
        ? "grid-cols-1"
        : media.length === 2
            ? "grid-cols-2"
            : "sm:grid-cols-3 grid-cols-2";
    return (_jsx("div", { className: cn("grid gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2F2F37) 95%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,rgba(24,24,28,0.88)) 85%,transparent)] p-2", gridCols), children: media.map((item) => {
            if (item.type === "image" && item.url) {
                return (_jsxs("figure", { className: "relative aspect-[4/3] overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#3F3F46) 95%,transparent)] bg-[var(--hive-background-tertiary,#111827)]", children: [_jsx("img", { src: item.url, alt: item.alt ?? "", className: "h-full w-full object-cover", loading: "lazy" }), item.alt ? (_jsx("figcaption", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 py-2 text-xs text-white/90", children: item.alt })) : null] }, item.id));
            }
            if (item.type === "link" && item.url) {
                return (_jsxs("a", { href: item.url, target: "_blank", rel: "noreferrer", className: cn("flex flex-col justify-between gap-3 rounded-xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#3F3F46) 92%,transparent)] bg-[var(--hive-background-primary,#0B0B0F)] p-3 transition-colors", focusRing), children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary,#F9FAFB)]", children: item.title ?? item.url.replace(/^https?:\/\//, "") }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted,#9CA3AF)]", children: item.url })] }, item.id));
            }
            return (_jsxs("div", { className: "flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#3F3F46) 95%,transparent)] bg-[var(--hive-background-tertiary,#111827)]", children: [_jsx(Skeleton, { className: "h-6 w-16 rounded-full" }), _jsx(Skeleton, { className: "h-4 w-24 rounded-full" })] }, item.id));
        }) }));
};
const CommentRow = ({ comment }) => (_jsxs(motion.div, { layout: true, className: "flex items-start gap-3 scroll-mt-24", children: [_jsx(Avatar, { size: "sm", shape: "portrait", className: "min-w-[44px] max-w-[44px] rounded-[16px]", children: comment.author.avatarUrl ? (_jsx(AvatarImage, { src: comment.author.avatarUrl, alt: comment.author.name })) : (_jsx(AvatarFallback, { children: comment.author.name.charAt(0).toUpperCase() })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-[var(--hive-text-muted,#9CA3AF)]", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-secondary,#E5E7EB)]", children: comment.author.name }), comment.author.handle ? (_jsxs("span", { className: "text-[var(--hive-text-mutedLight,#9CA3AF)]", children: ["@", comment.author.handle] })) : null, comment.author.role ? (_jsxs("span", { className: "text-[var(--hive-text-mutedLight,#9CA3AF)]", children: ["\u2022 ", comment.author.role] })) : null, _jsxs("span", { children: ["\u00B7 ", comment.timeAgo] })] }), _jsx("p", { className: cn("mt-1 text-sm", comment.removed
                        ? "italic text-[var(--hive-text-muted,#9CA3AF)]"
                        : "text-[var(--hive-text-secondary,#E5E7EB)]"), children: comment.removed ? "This comment was removed." : comment.body })] })] }));
const PostCardListItemComponent = ({ post, onOpen, onMoreOptions, onRepostClick, onShare, onUpvoteClick, className, ...props }, ref) => {
    const containerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => containerRef.current);
    const showRepostLabel = post.repostedByMe || Boolean(post.repostAttribution);
    const repostBannerText = post.repostedByMe
        ? "You reposted"
        : post.repostAttribution
            ? `${post.repostAttribution.name} reposted`
            : "";
    const handleClick = () => {
        if (!onOpen)
            return;
        const rect = containerRef.current?.getBoundingClientRect();
        onOpen(post, rect, { mode: "post" });
    };
    const handleComments = (event) => {
        event.stopPropagation();
        if (!onOpen)
            return;
        const rect = containerRef.current?.getBoundingClientRect();
        onOpen(post, rect, { mode: "comments" });
    };
    const handleKeyDown = (event) => {
        if (event.defaultPrevented)
            return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    };
    return (_jsxs(motion.article, { ref: containerRef, layout: true, className: cn(surfaceClasses, "group cursor-pointer p-6 text-[var(--hive-text-primary,#F9FAFB)] hover:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,12,15,0.94)) 99%,transparent)] focus-within:bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,12,15,0.94)) 99%,transparent)] hover:shadow-[0_24px_64px_rgba(8,9,16,0.45)] focus-within:shadow-[0_24px_72px_rgba(8,9,16,0.5)]", className), role: "button", tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown, "aria-haspopup": "dialog", "aria-label": `Open post from ${post.author.name}`, ...props, children: [_jsx("div", { className: "absolute inset-0 rounded-[32px] bg-[radial-gradient(120%_140%_at_0%_0%,rgba(255,255,255,0.035),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" }), _jsxs("div", { className: "relative flex flex-col gap-4", children: [showRepostLabel ? (_jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted,#9CA3AF)]", children: [_jsx(Repeat2, { className: "h-3.5 w-3.5 text-[var(--hive-brand-primary,#FACC15)]" }), _jsx("span", { className: "font-medium text-[var(--hive-text-secondary,#E5E7EB)]", children: repostBannerText }), post.repostAttribution ? _jsxs("span", { children: ["\u00B7 ", post.repostAttribution.timeAgo] }) : null] })) : null, _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Avatar, { shape: "portrait", className: "h-[72px] w-[56px] rounded-[20px]", children: post.author.avatarUrl ? (_jsx(AvatarImage, { src: post.author.avatarUrl, alt: post.author.name })) : (_jsx(AvatarFallback, { children: post.author.name.charAt(0).toUpperCase() })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: [_jsxs("span", { className: "font-medium text-[var(--hive-text-primary,#F9FAFB)]", children: [post.author.name, post.author.verified ? (_jsx(BadgeCheck, { className: "ml-1 inline h-4 w-4 align-[-2px] text-[var(--hive-brand-primary,#FACC15)]" })) : null] }), _jsx("span", { className: "text-xs uppercase tracking-wide text-[var(--hive-text-muted,#9CA3AF)]", children: post.timeAgo }), post.isEdited ? _jsx("span", { className: metaText, children: "\u00B7 Edited" }) : null, post.isPinned ? (_jsx(Badge, { variant: "outline", className: "rounded-full border-[color-mix(in_srgb,var(--hive-border-primary,#3F3F46) 90%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-tertiary,#111827) 65%,transparent)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[var(--hive-brand-primary,#FACC15)]", children: "Pinned" })) : null, _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: cn("ml-auto h-9 w-9 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", focusRing), "aria-label": "More options", title: "More options", onClick: (event) => {
                                                            event.stopPropagation();
                                                            onMoreOptions?.(post);
                                                        }, children: _jsx(MoreHorizontal, { className: "h-5 w-5" }) })] }), (post.author.role || post.space) ? (_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-[var(--hive-text-muted,#9CA3AF)] sm:text-sm", children: [post.author.role ? (_jsx("span", { children: post.author.role })) : null, post.author.role && post.space ? _jsx("span", { children: "\u2022" }) : null, post.space ? _jsx("span", { children: post.space }) : null] })) : null, post.author.badges && post.author.badges.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-1 text-[11px]", children: post.author.badges.map((badge) => (_jsx("span", { className: "inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 22%,transparent)] px-2 py-0.5 text-[var(--hive-brand-primary,#FACC15)]", children: badge }, badge))) })) : null] }), _jsxs("div", { className: "mt-3 space-y-2", children: [post.title ? (_jsx("h3", { className: "text-[15px] font-semibold leading-snug text-[var(--hive-text-primary,#F9FAFB)]", children: clampText(post.title, 72) })) : null, post.body ? (_jsx("p", { className: cn("text-[15px] leading-relaxed", secondaryText, "line-clamp-3"), children: post.body })) : null, _jsx(MediaGrid, { media: post.media }), post.tags && post.tags.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsxs(Badge, { variant: "outline", className: "rounded-full border border-[color-mix(in_srgb,var(--hive-border-primary,#3F3F46) 90%,transparent)] bg-transparent px-3 py-1 text-xs text-[var(--hive-brand-primary,#FACC15)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 16%,transparent)]", title: `View posts tagged ${tag}`, children: ["#", tag] }, tag))) })) : null] }), _jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-3 text-[var(--hive-text-secondary,#E5E7EB)]", children: [_jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: cn("h-10 rounded-full px-4 text-sm", focusRing, post.votes?.my === "up" &&
                                                    "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 18%,transparent)] text-[var(--hive-brand-primary,#FACC15)]"), "aria-label": post.votes?.my === "up" ? "Remove upvote" : "Upvote post", title: post.votes?.my === "up" ? "Remove upvote" : "Upvote post", onClick: (event) => {
                                                    event.stopPropagation();
                                                    onUpvoteClick?.(post);
                                                }, children: [_jsx(ArrowBigUp, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.votes?.up ?? 0 })] }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: cn("h-10 rounded-full px-4 text-sm", focusRing), "aria-label": "Open comments", title: "Open comments", onClick: handleComments, children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.counts?.comments ?? 0 })] }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: cn("h-10 rounded-full px-4 text-sm", focusRing), "aria-label": "Repost", title: "Repost", onClick: (event) => {
                                                    event.stopPropagation();
                                                    onRepostClick?.(post);
                                                }, children: [_jsx(Repeat2, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.counts?.reposts ?? 0 })] }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: cn("h-10 rounded-full px-4 text-sm", focusRing), "aria-label": "Share post", title: "Share post", onClick: (event) => {
                                                    event.stopPropagation();
                                                    onShare?.(post);
                                                }, children: [_jsx(Share2, { className: "h-4 w-4" }), post.counts?.shares !== undefined ? (_jsx(AnimatedNumber, { value: post.counts?.shares ?? 0 })) : (_jsx("span", { className: "text-xs uppercase tracking-wide text-[var(--hive-text-muted,#9CA3AF)]", children: "Share" }))] })] })] })] })] })] }));
};
export const PostCardListItem = React.forwardRef(PostCardListItemComponent);
PostCardListItem.displayName = "PostCardListItem";
export const PostOverlay = ({ post: initialPost, anchorRect, onClose, initialMode = "post", onUpvoteToggle, onRepost, onCommentSubmit, onShare, onMoreOptions, }) => {
    const overlayId = React.useId();
    const prefersReducedMotion = useReducedMotion();
    const [post, setPost] = React.useState({ ...initialPost });
    const [commentText, setCommentText] = React.useState("");
    const [repostDraft, setRepostDraft] = React.useState("");
    const [repostOpen, setRepostOpen] = React.useState(false);
    const [isSubmittingRepost, setSubmittingRepost] = React.useState(false);
    const [isSubmittingComment, setSubmittingComment] = React.useState(false);
    const [commentError, setCommentError] = React.useState(null);
    const commentInputRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const [viewport, setViewport] = React.useState(() => {
        if (typeof window === "undefined") {
            return { width: 0, height: 0 };
        }
        return { width: window.innerWidth, height: window.innerHeight };
    });
    const COMMENTS_PREVIEW = 3;
    const [commentsExpanded, setCommentsExpanded] = React.useState(initialMode === "comments");
    const visibleComments = React.useMemo(() => {
        if (!post.comments)
            return [];
        return commentsExpanded ? post.comments : post.comments.slice(0, COMMENTS_PREVIEW);
    }, [commentsExpanded, post.comments]);
    const hasMoreComments = !commentsExpanded && (post.comments?.length ?? 0) > COMMENTS_PREVIEW;
    React.useEffect(() => {
        if (typeof window === "undefined")
            return;
        const updateViewport = () => {
            setViewport({ width: window.innerWidth, height: window.innerHeight });
        };
        updateViewport();
        window.addEventListener("resize", updateViewport);
        window.addEventListener("orientationchange", updateViewport);
        return () => {
            window.removeEventListener("resize", updateViewport);
            window.removeEventListener("orientationchange", updateViewport);
        };
    }, []);
    React.useEffect(() => {
        setPost({ ...initialPost });
        if (initialMode === "comments") {
            setCommentsExpanded(true);
        }
        setCommentError(null);
    }, [initialPost, initialMode]);
    React.useEffect(() => {
        if (typeof document === "undefined" || typeof window === "undefined") {
            return;
        }
        const handleKey = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        };
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            const computedPadding = parseFloat(window.getComputedStyle(document.body).paddingRight || "0");
            document.body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
        }
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKey);
        const timer = window.setTimeout(() => {
            if (initialMode === "comments" && commentInputRef.current) {
                commentInputRef.current.focus({ preventScroll: false });
            }
            else {
                containerRef.current?.focus();
            }
        }, 60);
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
            window.removeEventListener("keydown", handleKey);
            window.clearTimeout(timer);
        };
    }, [initialMode, onClose]);
    const CARD_SPRING = prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 90, damping: 20, mass: 0.9 };
    const SECTION_SPRING = prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 120, damping: 24, mass: 0.9 };
    const targetStyle = React.useMemo(() => {
        if (viewport.width === 0 || viewport.height === 0) {
            return {
                top: 24,
                left: 24,
                width: 720,
                maxHeight: 720,
                borderRadius: 24,
            };
        }
        const vw = viewport.width;
        const vh = viewport.height;
        const isMobile = vw < 640;
        if (isMobile) {
            return {
                top: 0,
                left: 0,
                width: vw,
                height: vh,
                borderRadius: 0,
            };
        }
        const width = Math.min(820, Math.round(vw * 0.9));
        const left = Math.round(vw / 2 - width / 2);
        const top = Math.max(32, Math.round(vh * 0.08));
        return {
            top,
            left,
            width,
            height: "auto",
            maxHeight: Math.round(vh * 0.84),
            borderRadius: 24,
        };
    }, [viewport]);
    const originStyle = React.useMemo(() => {
        if (!anchorRect || typeof window === "undefined")
            return undefined;
        const top = anchorRect.top + window.scrollY;
        return {
            top,
            left: anchorRect.left,
            width: anchorRect.width,
            height: anchorRect.height,
            borderRadius: 24,
        };
    }, [anchorRect]);
    const handleUpvote = async () => {
        const previousVotes = post.votes ?? { up: 0, my: null };
        const nextState = previousVotes.my === "up" ? null : "up";
        setPost((prev) => ({
            ...prev,
            votes: {
                up: Math.max(0, (prev.votes?.up ?? 0) + (nextState === "up" ? 1 : prev.votes?.my === "up" ? -1 : 0)),
                my: nextState,
            },
        }));
        try {
            await onUpvoteToggle?.(post.id, nextState);
        }
        catch (error) {
            // revert on failure
            setPost((prev) => ({
                ...prev,
                votes: { ...previousVotes },
            }));
        }
    };
    const handleCommentSubmit = async () => {
        const trimmed = commentText.trim();
        if (!trimmed) {
            setCommentError("Add a comment before posting.");
            return;
        }
        setSubmittingComment(true);
        setCommentError(null);
        const previousState = {
            ...post,
            counts: post.counts ? { ...post.counts } : undefined,
            comments: post.comments ? [...post.comments] : undefined,
        };
        const optimisticComment = {
            id: `${overlayId}-c-${Date.now()}`,
            author: {
                name: "You",
            },
            timeAgo: "now",
            body: trimmed,
        };
        setPost((prev) => ({
            ...prev,
            counts: {
                ...prev.counts,
                comments: (prev.counts?.comments ?? 0) + 1,
            },
            comments: [optimisticComment, ...(prev.comments ?? [])],
        }));
        setCommentText("");
        try {
            const result = await onCommentSubmit?.(post.id, trimmed);
            if (result && result.comments) {
                setPost((prev) => ({
                    ...prev,
                    comments: result.comments,
                    counts: {
                        ...prev.counts,
                        comments: result.totalComments ?? result.comments.length,
                    },
                }));
            }
        }
        catch (error) {
            setPost(previousState);
            setCommentText(trimmed);
            if (process.env.NODE_ENV !== "production") {
                console.error("Failed to submit comment", error);
            }
            setCommentError("Could not post your comment. Try again.");
        }
        finally {
            setSubmittingComment(false);
        }
    };
    const handleRepostSubmit = async () => {
        if (!onRepost) {
            setRepostOpen(false);
            return;
        }
        const message = repostDraft.trim();
        if (isSubmittingRepost)
            return;
        setSubmittingRepost(true);
        try {
            const result = await onRepost(post.id, message);
            let nextReposts = undefined;
            if (result && typeof result === 'object' && 'reposts' in result) {
                nextReposts = result.reposts;
            }
            setPost((prev) => ({
                ...prev,
                counts: {
                    ...prev.counts,
                    reposts: (nextReposts ?? (prev.counts?.reposts ?? 0) + 1),
                },
            }));
            setRepostDraft("");
            setRepostOpen(false);
        }
        finally {
            setSubmittingRepost(false);
        }
    };
    const handleComposerKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void handleCommentSubmit();
        }
    };
    return (_jsx(LayoutGroup, { children: _jsxs(motion.div, { className: "fixed inset-0 z-[60] flex items-start justify-center", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(motion.button, { type: "button", className: "absolute inset-0 bg-black/60 backdrop-blur-[10px]", onClick: onClose, "aria-label": "Close post overlay" }), _jsxs(motion.div, { ref: containerRef, layout: true, role: "dialog", "aria-modal": "true", "aria-labelledby": `${overlayId}-title`, tabIndex: -1, initial: originStyle ?? {
                        y: 24,
                        opacity: 0,
                    }, animate: {
                        ...targetStyle,
                        opacity: 1,
                    }, exit: { opacity: 0, y: 16 }, transition: CARD_SPRING, className: cn(surfaceClasses, "relative mx-auto flex max-h-[84vh] w-full flex-col overflow-hidden bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(12,12,15,0.95)) 96%,transparent)]"), children: [_jsx("button", { type: "button", onClick: onClose, className: cn("absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary,#111827) 90%,transparent)] text-[var(--hive-text-muted,#9CA3AF)] transition-colors hover:text-[var(--hive-text-primary,#F9FAFB)]", focusRing), "aria-label": "Close overlay", children: _jsx(X, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex-1 overflow-y-auto px-6 pb-[max(env(safe-area-inset-bottom),2.5rem)] pt-6 sm:px-8 sm:pt-8", children: _jsxs("div", { className: "flex items-start gap-5", children: [_jsx(Avatar, { shape: "portrait", className: "h-[86px] w-[64px] rounded-[24px]", children: post.author.avatarUrl ? (_jsx(AvatarImage, { src: post.author.avatarUrl, alt: post.author.name })) : (_jsx(AvatarFallback, { children: post.author.name.charAt(0).toUpperCase() })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: [_jsxs("span", { id: `${overlayId}-title`, className: "font-semibold text-[var(--hive-text-primary,#F9FAFB)]", children: [post.author.name, post.author.verified ? (_jsx(BadgeCheck, { className: "ml-1 inline h-4 w-4 align-[-2px] text-[var(--hive-brand-primary,#FACC15)]" })) : null] }), post.author.role ? (_jsxs("span", { className: metaText, children: ["\u2022 ", post.author.role] })) : null, post.space ? (_jsxs("span", { className: metaText, children: ["\u2022 ", post.space] })) : null, _jsxs("span", { className: metaText, children: ["\u00B7 ", post.timeAgo] }), post.isEdited ? (_jsx("span", { className: metaText, children: "\u00B7 Edited" })) : null, onMoreOptions ? (_jsx(Button, { type: "button", variant: "ghost", size: "icon", className: cn("ml-auto h-9 w-9 text-[var(--hive-text-mutedLight,#9CA3AF)] hover:text-[var(--hive-text-primary,#F9FAFB)]", focusRing), "aria-label": "More options", title: "More options", "aria-haspopup": "menu", onClick: () => onMoreOptions?.(post.id), children: _jsx(MoreHorizontal, { className: "h-5 w-5" }) })) : null] }), _jsxs("div", { className: "mt-3 space-y-3", children: [post.title ? (_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary,#F9FAFB)] sm:text-2xl", children: post.title })) : null, post.body ? (_jsx("p", { className: cn("text-[15px] leading-relaxed", secondaryText), children: post.body })) : null, _jsx(MediaGrid, { media: post.media }), post.tags && post.tags.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsxs(Badge, { variant: "outline", className: "rounded-full border border-[color-mix(in_srgb,var(--hive-border-primary,#3F3F46) 90%,transparent)] bg-transparent px-3 py-1 text-xs text-[var(--hive-brand-primary,#FACC15)]", children: ["#", tag] }, tag))) })) : null] }), _jsxs(motion.div, { layout: true, className: "mt-5 flex flex-wrap items-center gap-3 text-[var(--hive-text-secondary,#E5E7EB)]", children: [_jsxs(Button, { type: "button", variant: "ghost", className: cn("h-10 rounded-full px-4 text-sm", focusRing, post.votes?.my === "up" &&
                                                            "bg-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 15%,transparent)] text-[var(--hive-brand-primary,#FACC15)]"), onClick: handleUpvote, "aria-pressed": post.votes?.my === "up", children: [_jsx(ArrowBigUp, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.votes?.up ?? 0 })] }), _jsxs("div", { className: "inline-flex items-center gap-1.5 text-sm text-[var(--hive-text-secondary,#E5E7EB)]", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.counts?.comments ?? 0 })] }), _jsxs(Button, { type: "button", variant: "ghost", className: cn("h-10 rounded-full px-4 text-sm", focusRing), "aria-expanded": repostOpen, onClick: () => setRepostOpen((open) => !open), children: [_jsx(Repeat2, { className: "h-4 w-4" }), _jsx(AnimatedNumber, { value: post.counts?.reposts ?? 0 })] }), _jsxs(Button, { type: "button", variant: "ghost", className: cn("h-10 rounded-full px-4 text-sm", focusRing), onClick: () => onShare?.(post.id), children: [_jsx(Share2, { className: "h-4 w-4" }), "Share"] })] }), _jsx(AnimatePresence, { initial: false, children: repostOpen ? (_jsxs(motion.section, { layout: true, initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: SECTION_SPRING, className: "mt-4 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-subtle,#3F3F46) 90%,transparent)] bg-[var(--hive-background-primary,#0B0B0F)]/90 p-4", children: [_jsx("div", { className: "text-xs text-[var(--hive-text-muted,#9CA3AF)]", children: "Repost with an optional comment" }), _jsx(Textarea, { value: repostDraft, onChange: (event) => setRepostDraft(event.target.value), autoResize: true, placeholder: "Add your message", size: "sm", className: "mt-3 min-h-[72px] rounded-[20px] bg-[var(--hive-background-secondary,#15151B)]" }), _jsxs("div", { className: "mt-3 flex items-center justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "ghost", className: "h-9 px-4 text-sm", onClick: () => setRepostOpen(false), children: "Cancel" }), _jsx(Button, { type: "button", className: "h-9 px-4 text-sm", onClick: handleRepostSubmit, loading: isSubmittingRepost, disabled: isSubmittingRepost, leadingIcon: _jsx(Repeat2, { className: "h-4 w-4" }), children: "Repost" })] })] }, "repost")) : null }), _jsxs(motion.section, { layout: true, className: "mt-6 space-y-5", children: [_jsxs("div", { className: "rounded-[32px] border border-[color-mix(in_srgb,var(--hive-border-subtle,#3F3F46) 92%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0B0B0F) 95%,transparent)]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]", children: [_jsx("div", { className: "relative overflow-hidden rounded-[28px] bg-[var(--hive-background-secondary,#15151B)]", children: _jsx(Textarea, { ref: commentInputRef, value: commentText, onChange: (event) => setCommentText(event.target.value), onKeyDown: handleComposerKeyDown, onFocus: () => setCommentError(null), placeholder: "Write a thoughtful comment\u2026", autoResize: true, size: "sm", "aria-invalid": Boolean(commentError), className: cn("min-h-[96px] rounded-[28px] border border-transparent bg-transparent px-5 py-4 text-sm text-[var(--hive-text-secondary,#E5E7EB)]", "focus-visible:border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 45%,transparent)] focus-visible:shadow-[0_0_0_1px_color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 45%,transparent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15) 60%,transparent)]") }) }), _jsxs("div", { className: "mt-3 flex flex-col gap-2 text-xs text-[var(--hive-text-muted,#9CA3AF)] sm:flex-row sm:items-center sm:justify-between", children: [_jsx("span", { children: "Enter to post \u2022 Shift+Enter for newline" }), _jsxs("div", { className: "flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3", children: [commentError ? (_jsx("span", { className: "text-[var(--hive-feedback-negative,#F87171)]", role: "alert", children: commentError })) : null, _jsx(Button, { type: "button", onClick: handleCommentSubmit, loading: isSubmittingComment, disabled: isSubmittingComment, leadingIcon: _jsx(MessageCircle, { className: "h-4 w-4" }), size: "sm", children: "Comment" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [visibleComments.map((comment) => (_jsx(CommentRow, { comment: comment }, comment.id))), hasMoreComments ? (_jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "mt-2 h-9 rounded-full px-4 text-xs text-[var(--hive-brand-primary,#FACC15)]", onClick: () => setCommentsExpanded(true), children: "Show more comments" })) : null] })] })] })] }) })] })] }) }));
};
export const PostCardSkeleton = () => (_jsx("div", { className: cn(surfaceClasses, "p-5"), children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Skeleton, { className: "h-[72px] w-[56px] rounded-[20px]" }), _jsxs("div", { className: "flex-1 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Skeleton, { className: "h-4 w-32 rounded-full" }), _jsx(Skeleton, { className: "h-4 w-16 rounded-full" })] }), _jsx(Skeleton, { className: "h-5 w-3/4 rounded-full" }), _jsx(Skeleton, { className: "h-5 w-5/6 rounded-full" }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Skeleton, { className: "aspect-[4/3] rounded-xl" }), _jsx(Skeleton, { className: "aspect-[4/3] rounded-xl" }), _jsx(Skeleton, { className: "aspect-[4/3] rounded-xl" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Skeleton, { className: "h-6 w-20 rounded-full" }), _jsx(Skeleton, { className: "h-6 w-20 rounded-full" }), _jsx(Skeleton, { className: "h-6 w-20 rounded-full" })] })] })] }) }));
export const usePostCardDemo = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorRect, setAnchorRect] = React.useState();
    const [mode, setMode] = React.useState("post");
    return {
        open,
        setOpen,
        anchorRect,
        setAnchorRect,
        mode,
        setMode,
    };
};
//# sourceMappingURL=post-card.js.map