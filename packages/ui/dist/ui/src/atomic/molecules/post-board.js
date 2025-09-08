'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { MessageCircle, Share2, MoreHorizontal, Crown, Calendar, MapPin, Users, CheckCircle, Clock, Bookmark, Pin, Eye } from 'lucide-react';
const PostReactionBar = ({ reactions, onReaction }) => {
    const popularReactions = ['👍', '❤️', '😊', '🎉', '👏'];
    return (_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [reactions.map((reaction, index) => (_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => onReaction(reaction.emoji, !reaction.userReacted), className: cn('flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200', reaction.userReacted
                    ? 'bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/40 text-[var(--hive-brand-primary)]'
                    : 'bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)] hover:bg-[var(--hive-background-tertiary)]/60'), children: [_jsx("span", { children: reaction.emoji }), _jsx("span", { className: "font-medium", children: reaction.count })] }, `${reaction.emoji}-${index}`))), popularReactions
                .filter(emoji => !reactions.find(r => r.emoji === emoji))
                .slice(0, 3)
                .map(emoji => (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => onReaction(emoji, true), className: "w-8 h-8 rounded-full bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center text-sm hover:bg-[var(--hive-background-tertiary)]/60 transition-all duration-200", children: emoji }, emoji)))] }));
};
const PostEventCard = ({ event, onRsvp }) => {
    return (_jsxs("div", { className: "mt-3 p-4 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/20 rounded-2xl", children: [_jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center", children: _jsx(Calendar, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: event.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mt-1", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: new Date(event.date).toLocaleDateString() })] }), event.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: event.location })] })), event.rsvpCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [event.rsvpCount, " attending"] })] }))] })] })] }) }), onRsvp && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)] mr-2", children: "Will you attend?" }), ['yes', 'no', 'maybe'].map((response) => (_jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => onRsvp(response), className: cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200', event.userRsvp === response
                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40'
                            : 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/30 hover:bg-[var(--hive-background-primary)]/70'), children: [response === 'yes' && '✓ Yes', response === 'no' && '✗ No', response === 'maybe' && '? Maybe'] }, response)))] }))] }));
};
const PostPollCard = ({ poll, onVote }) => {
    const hasVoted = poll.options.some(option => option.userVoted);
    const timeLeft = poll.expiresAt ? new Date(poll.expiresAt).getTime() - Date.now() : null;
    const isExpired = timeLeft !== null && timeLeft <= 0;
    return (_jsxs("div", { className: "mt-3 p-4 bg-[var(--hive-status-info)]/10 border border-[var(--hive-status-info)]/20 rounded-2xl", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-[var(--hive-status-info)]" }), _jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: poll.question })] }), _jsx("div", { className: "space-y-2 mb-4", children: poll.options.map((option) => {
                    const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                    return (_jsxs(motion.div, { whileHover: !hasVoted && !isExpired ? { scale: 1.01 } : {}, className: cn('relative overflow-hidden rounded-xl border transition-all duration-200', hasVoted || isExpired
                            ? 'cursor-default'
                            : 'cursor-pointer hover:border-[var(--hive-status-info)]/40'), onClick: () => !hasVoted && !isExpired && onVote?.(option.id), children: [_jsx("div", { className: "absolute inset-0 bg-[var(--hive-status-info)]/10 transition-all duration-500", style: { width: `${percentage}%` } }), _jsxs("div", { className: "relative z-10 flex items-center justify-between px-4 py-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [option.userVoted && (_jsx(CheckCircle, { className: "w-4 h-4 text-[var(--hive-status-info)]" })), _jsx("span", { className: cn('font-medium', option.userVoted
                                                    ? 'text-[var(--hive-status-info)]'
                                                    : 'text-[var(--hive-text-primary)]'), children: option.text })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: [option.votes, " votes"] }), (hasVoted || isExpired) && (_jsxs("span", { className: "font-medium", children: ["(", percentage.toFixed(1), "%)"] }))] })] })] }, option.id));
                }) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-muted)]", children: [_jsxs("span", { children: [poll.totalVotes, " total votes"] }), timeLeft !== null && !isExpired && (_jsxs("span", { children: ["Expires in ", Math.floor(timeLeft / (1000 * 60 * 60 * 24)), " days"] })), isExpired && _jsx("span", { className: "text-[var(--hive-status-warning)]", children: "Poll expired" })] })] }));
};
const PostCard = ({ post, currentUser, onReaction, onComment, onShare, onEdit, onDelete, onPin, onReport, onEventRsvp, onPollVote }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const canEdit = currentUser?.id === post.author.id;
    const canPin = currentUser?.role === 'leader' || currentUser?.role === 'co_leader';
    const canDelete = canEdit || canPin;
    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'border-red-500/40 bg-red-500/10';
            case 'high': return 'border-[var(--hive-gold)]/40 bg-[var(--hive-gold)]/10';
            case 'medium': return 'border-[var(--hive-gold)]/40 bg-[var(--hive-gold)]/10';
            default: return 'border-[var(--hive-border-primary)]/20 bg-[var(--hive-background-secondary)]/60';
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => { }; // No cleanup needed when menu is not shown
    }, [showMenu]);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('relative backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300', post.type === 'announcement'
            ? getPriorityColor(post.announcement?.priority)
            : 'border-[var(--hive-border-primary)]/20 bg-[var(--hive-background-secondary)]/60', post.isPinned && 'ring-2 ring-[var(--hive-brand-primary)]/20'), children: [post.isPinned && (_jsx("div", { className: "absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/40 rounded-full flex items-center justify-center", children: _jsx(Pin, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }) })), _jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center", children: _jsx("span", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: post.author.name.charAt(0) }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)]", children: post.author.name }), post.author.role === 'leader' && (_jsx(Crown, { className: "w-4 h-4 text-[var(--hive-brand-secondary)]" })), post.author.verified && (_jsx(CheckCircle, { className: "w-4 h-4 text-[var(--hive-status-success)]" })), post.toolSource && (_jsxs("div", { className: "flex items-center gap-1 px-2 py-0.5 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/30 rounded-full", children: [_jsx("span", { className: "text-xs", children: post.toolSource.icon }), _jsx("span", { className: "text-xs font-medium text-[var(--hive-status-info)]", children: post.toolSource.toolName })] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-muted)] mt-0.5", children: [_jsx("span", { children: formatTimeAgo(post.timestamp) }), post.isEdited && _jsx("span", { children: "\u2022 edited" }), post.viewCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), _jsx("span", { children: post.viewCount })] }))] })] })] }), _jsxs("div", { className: "relative", ref: menuRef, children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "w-8 h-8 rounded-lg flex items-center justify-center text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute right-0 top-10 w-48 bg-[var(--hive-background-secondary)]/95 backdrop-blur-xl border border-[var(--hive-border-primary)]/30 rounded-xl shadow-lg z-50 py-2", children: [canEdit && (_jsx("button", { onClick: () => {
                                                onEdit?.();
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: "Edit post" })), canPin && (_jsx("button", { onClick: () => {
                                                onPin?.(!post.isPinned);
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: post.isPinned ? 'Unpin post' : 'Pin post' })), _jsx("button", { onClick: () => {
                                                onReport?.();
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-status-warning)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: "Report post" }), canDelete && (_jsx("button", { onClick: () => {
                                                onDelete?.();
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-status-error)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: "Delete post" }))] })) })] })] }), _jsx("div", { className: "mb-4", children: _jsx("p", { className: "text-[var(--hive-text-primary)] leading-relaxed whitespace-pre-wrap", children: post.content }) }), post.event && (_jsx(PostEventCard, { event: post.event, onRsvp: onEventRsvp })), post.poll && (_jsx(PostPollCard, { poll: post.poll, onVote: onPollVote })), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-[var(--hive-border-primary)]/10", children: [_jsx("div", { className: "flex-1", children: post.reactions && post.reactions.length > 0 && onReaction && (_jsx(PostReactionBar, { reactions: post.reactions, onReaction: onReaction })) }), _jsxs("div", { className: "flex items-center gap-2 ml-4", children: [post.commentCount !== undefined && (_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onComment, className: "flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), _jsx("span", { children: post.commentCount })] })), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onShare, className: "flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200", children: [_jsx(Share2, { className: "w-4 h-4" }), post.shareCount && _jsx("span", { children: post.shareCount })] }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "w-8 h-8 rounded-xl flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-200", children: _jsx(Bookmark, { className: "w-4 h-4" }) })] })] })] }));
};
export const PostBoard = ({ posts, currentUser, onReaction, onComment, onShare, onEdit, onDelete, onPin, onReport, onEventRsvp, onPollVote, showComments = true, enableInfiniteScroll = false, className }) => {
    const sortedPosts = React.useMemo(() => {
        return [...posts].sort((a, b) => {
            // Pinned posts first
            if (a.isPinned && !b.isPinned)
                return -1;
            if (!a.isPinned && b.isPinned)
                return 1;
            // Then by timestamp
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    }, [posts]);
    if (posts.length === 0) {
        return (_jsxs("div", { className: cn('text-center py-12', className), children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 flex items-center justify-center", children: _jsx(MessageCircle, { className: "w-8 h-8 text-[var(--hive-text-muted)]" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "No posts yet" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Be the first to share something with this community" })] }));
    }
    return (_jsx("div", { className: cn('space-y-6', className), children: _jsx(AnimatePresence, { children: sortedPosts.map((post) => (_jsx(PostCard, { post: post, currentUser: currentUser, onReaction: onReaction ? (emoji, add) => onReaction(post.id, emoji, add) : undefined, onComment: onComment ? () => onComment(post.id) : undefined, onShare: onShare ? () => onShare(post.id) : undefined, onEdit: onEdit ? () => onEdit(post.id) : undefined, onDelete: onDelete ? () => onDelete(post.id) : undefined, onPin: onPin ? (pin) => onPin(post.id, pin) : undefined, onReport: onReport ? () => onReport(post.id) : undefined, onEventRsvp: onEventRsvp && post.event ? (response) => onEventRsvp(post.event.id, response) : undefined, onPollVote: onPollVote && post.poll ? (optionId) => onPollVote(post.poll.id, optionId) : undefined }, post.id))) }) }));
};
export default PostBoard;
//# sourceMappingURL=post-board.js.map