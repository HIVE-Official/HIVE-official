"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { motionDurations } from '../../motion/hive-motion-system';
import { MessageSquare, Plus, MessageCircle, Share2, MoreHorizontal, Pin, Trash2, Eye, Heart, Bookmark, Reply, BarChart3 as Poll, Link as LinkIcon, Crown } from 'lucide-react';
// HIVE Posts Surface - Community Discussion & Threads
// Rich posting system with threads, polls, and engagement
const hivePostsSurfaceVariants = cva("relative w-full", {
    variants: {
        mode: {
            view: "",
            edit: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
            builder: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
        }
    },
    defaultVariants: {
        mode: "view",
    },
});
// Post types with HIVE design patterns
const postTypes = {
    discussion: {
        icon: MessageSquare,
        label: 'Discussion',
        color: 'text-[var(--hive-status-info)]',
        description: 'Start a conversation'
    },
    question: {
        icon: MessageCircle,
        label: 'Question',
        color: 'text-[var(--hive-status-success)]',
        description: 'Ask the community'
    },
    poll: {
        icon: Poll,
        label: 'Poll',
        color: 'text-[var(--hive-brand-accent)]',
        description: 'Gather opinions'
    },
    announcement: {
        icon: Pin,
        label: 'Announcement',
        color: 'text-[var(--hive-brand-primary)]',
        description: 'Important updates'
    },
    link: {
        icon: LinkIcon,
        label: 'Link Share',
        color: 'text-[var(--hive-brand-accent)]',
        description: 'Share a resource'
    },
};
export const HivePostsSurface = React.forwardRef(({ className, mode, space, posts = [], isBuilder = false, canPost = true, canModerate = false, onCreatePost, onLikePost, onReplyToPost, onSharePost, onPinPost, onDeletePost, onViewPost, sortBy = 'recent', showFilters = true, maxPosts = 10, ...props }, ref) => {
    const [hoveredPost, setHoveredPost] = useState(null);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [currentSort, setCurrentSort] = useState(sortBy);
    const [expandedPosts, setExpandedPosts] = useState(new Set());
    // Sort posts
    const sortedPosts = posts
        .sort((a, b) => {
        // Pinned posts always first
        if (a.isPinned && !b.isPinned)
            return -1;
        if (!a.isPinned && b.isPinned)
            return 1;
        switch (currentSort) {
            case 'popular':
                return (b.likes + b.replies) - (a.likes + a.replies);
            case 'trending':
                // Mock trending algorithm - consider recent engagement
                const aScore = a.likes + a.replies + (a.views / 10);
                const bScore = b.likes + b.replies + (b.views / 10);
                return bScore - aScore;
            case 'recent':
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    })
        .slice(0, maxPosts);
    const handleCreatePost = useCallback((type) => {
        onCreatePost?.(type);
        setShowCreateMenu(false);
    }, [onCreatePost]);
    const togglePostExpansion = useCallback((postId) => {
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            }
            else {
                newSet.add(postId);
            }
            return newSet;
        });
    }, []);
    // Empty state
    if (posts.length === 0) {
        return (_jsx("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(MessageSquare, { className: "w-8 h-8 text-blue-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: "Start the Conversation" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed", children: "This Space is ready for discussions! Share questions, ideas, and connect with the community through posts and threads." }), canPost && (_jsxs(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium", onClick: () => setShowCreateMenu(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), "Create First Post"] }))] }) }));
    }
    return (_jsxs("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Posts" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: [posts.length, " discussions"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [showFilters && (_jsxs("select", { value: currentSort, onChange: (e) => setCurrentSort(e.target.value), className: "bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hive-status-info)]/50", children: [_jsx("option", { value: "recent", children: "Recent" }), _jsx("option", { value: "popular", children: "Popular" }), _jsx("option", { value: "trending", children: "Trending" })] })), canPost && (_jsxs("div", { className: "relative", children: [_jsxs(motion.button, { className: "flex items-center gap-2 px-4 py-2 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium", onClick: () => setShowCreateMenu(!showCreateMenu), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "New Post" })] }), _jsx(AnimatePresence, { children: showCreateMenu && (_jsx(motion.div, { className: "absolute top-full right-0 mt-2 w-64 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: motionDurations.quick }, children: _jsx("div", { className: "p-2", children: Object.entries(postTypes).map(([type, config]) => {
                                                    const Icon = config.icon;
                                                    return (_jsxs(motion.button, { className: "w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", onClick: () => handleCreatePost(type), whileHover: { x: 4 }, children: [_jsx(Icon, { className: cn("w-5 h-5", config.color) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: config.label }), _jsx("div", { className: "text-xs text-gray-400", children: config.description })] })] }, type));
                                                }) }) })) })] }))] })] }), _jsx("div", { className: "space-y-4", children: sortedPosts.map((post, index) => {
                    const typeConfig = postTypes[post.type];
                    const TypeIcon = typeConfig.icon;
                    const isHovered = hoveredPost === post.id;
                    const isExpanded = expandedPosts.has(post.id);
                    return (_jsxs(motion.article, { className: cn("relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200", isHovered && "border-white/10", post.isPinned && "ring-1 ring-yellow-500/30 bg-yellow-500/5", mode === 'edit' && "hover:ring-2 hover:ring-blue-500/30"), onMouseEnter: () => setHoveredPost(post.id), onMouseLeave: () => setHoveredPost(null), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, layout: true, children: [post.isPinned && (_jsx(motion.div, { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/50 to-yellow-500/20", initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: index * 0.05 + 0.2 } })), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 overflow-hidden", children: post.authorAvatar ? (_jsx("img", { src: post.authorAvatar, alt: "", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: post.authorName.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] text-sm", children: post.authorName }), _jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("time", { className: "text-xs text-gray-400", children: new Date(post.createdAt).toLocaleDateString() }), post.isPinned && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-yellow-400", children: [_jsx(Pin, { className: "w-3 h-3" }), _jsx("span", { children: "Pinned" })] })] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TypeIcon, { className: cn("w-4 h-4", typeConfig.color) }), _jsx("span", { className: "text-xs text-gray-400", children: typeConfig.label }), post.tags.length > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("div", { className: "flex items-center gap-1", children: post.tags.slice(0, 2).map((tag, i) => (_jsx("span", { className: "text-xs bg-[var(--hive-text-primary)]/5 px-2 py-0.5 rounded text-gray-300", children: tag }, i))) })] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [canModerate && (_jsx(AnimatePresence, { children: (isHovered || mode === 'edit') && (_jsxs(motion.div, { className: "flex items-center gap-1", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, children: [_jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-all duration-200", onClick: () => onPinPost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Pin, { className: "w-3.5 h-3.5" }) }), _jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200", onClick: () => onDeletePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] })) })), _jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] text-base leading-snug", children: post.title }), _jsx("div", { className: cn("text-sm text-gray-300 leading-relaxed", !isExpanded && "line-clamp-3"), children: post.content }), post.content.length > 200 && (_jsx(motion.button, { className: "text-xs text-blue-400 hover:text-blue-300 transition-colors", onClick: () => togglePostExpansion(post.id), whileHover: { scale: 1.02 }, children: isExpanded ? 'Show less' : 'Read more' })), post.pollOptions && (_jsx("div", { className: "space-y-2", children: post.pollOptions.map((option, i) => (_jsxs(motion.div, { className: "relative p-3 bg-[var(--hive-text-primary)]/5 rounded-lg cursor-pointer hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200", whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: option.text }), _jsxs("span", { className: "text-xs text-gray-400", children: [option.votes, " votes"] })] }), _jsx("div", { className: "absolute bottom-0 left-0 h-0.5 bg-purple-500/50 rounded-full", style: {
                                                                width: `${(option.votes / Math.max(...post.pollOptions.map(o => o.votes))) * 100}%`
                                                            } })] }, option.id))) })), post.linkPreview && (_jsx(motion.div, { className: "p-3 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/5", whileHover: { scale: 1.01 }, children: _jsxs("div", { className: "flex gap-3", children: [post.linkPreview.imageUrl && (_jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0", children: _jsx("img", { src: post.linkPreview.imageUrl, alt: "", className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)] truncate", children: post.linkPreview.title }), _jsx("p", { className: "text-xs text-gray-400 line-clamp-2 mt-1", children: post.linkPreview.description }), _jsx("span", { className: "text-xs text-blue-400 mt-1 block", children: post.linkPreview.domain })] })] }) }))] }), _jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-white/5", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors", onClick: () => onLikePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Heart, { className: "w-4 h-4" }), _jsx("span", { children: post.likes })] }), _jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors", onClick: () => onReplyToPost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Reply, { className: "w-4 h-4" }), _jsx("span", { children: post.replies })] }), _jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors", onClick: () => onSharePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Share2, { className: "w-4 h-4" }), _jsx("span", { children: "Share" })] })] }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), _jsx("span", { children: post.views })] }), _jsx(motion.button, { className: "p-1 hover:text-yellow-400 transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Bookmark, { className: "w-3 h-3" }) })] })] })] })] }, post.id));
                }) }), isBuilder && mode === 'edit' && (_jsx(motion.div, { className: "mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, transition: { delay: 0.5 }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Crown, { className: "w-5 h-5 text-blue-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-blue-400 mb-1", children: "Builder Mode Active" }), _jsx("p", { className: "text-xs text-blue-300/80", children: "Posts drive community engagement. Enable posting Tools to let members share ideas, ask questions, and build connections." })] })] }) }))] }));
});
HivePostsSurface.displayName = "HivePostsSurface";
export { hivePostsSurfaceVariants, postTypes };
//# sourceMappingURL=hive-posts-surface.js.map