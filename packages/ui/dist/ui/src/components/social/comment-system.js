import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Comment System
 * Threaded comments with real-time updates and social interactions
 */
import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Avatar, HiveBadge as Badge } from '../index.js'; // Use atomic components
import { MessageCircle, Heart, Reply, MoreHorizontal, Flag, Edit3, Trash2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const CommentItem = ({ comment, depth, maxDepth, currentUserId, onLike, onReply, onEdit, onDelete, onReport }) => {
    const [showReplies, setShowReplies] = useState(depth < 2);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [editContent, setEditContent] = useState(comment.content);
    const [showMenu, setShowMenu] = useState(false);
    const isOwnComment = currentUserId === comment.author.id;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const canReply = depth < maxDepth;
    const handleLike = useCallback(async () => {
        await onLike?.(comment.id);
    }, [comment.id, onLike]);
    const handleReply = useCallback(async () => {
        if (!replyContent.trim())
            return;
        await onReply?.(replyContent, comment.id);
        setReplyContent('');
        setIsReplying(false);
        setShowReplies(true);
    }, [replyContent, comment.id, onReply]);
    const handleEdit = useCallback(async () => {
        if (!editContent.trim() || editContent === comment.content) {
            setIsEditing(false);
            return;
        }
        await onEdit?.(comment.id, editContent);
        setIsEditing(false);
    }, [editContent, comment.id, comment.content, onEdit]);
    const formatTimeAgo = useCallback((timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d`;
        if (hours > 0)
            return `${hours}h`;
        if (minutes > 0)
            return `${minutes}m`;
        return 'now';
    }, []);
    return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `relative ${depth > 0 ? 'ml-8 pl-4 border-l border-[var(--hive-border-subtle)]' : ''}`, children: _jsxs("div", { className: "flex gap-3 group", children: [_jsx(Avatar, { src: comment.author.avatar, initials: comment.author.name.charAt(0), size: "sm", className: "flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] text-sm hover:text-[var(--hive-primary)] cursor-pointer", children: comment.author.name }), _jsxs("span", { className: "text-[var(--hive-text-muted)] text-xs", children: ["@", comment.author.handle] }), comment.author.role && (_jsx(Badge, { size: "xs", variant: "secondary", children: comment.author.role })), _jsx("span", { className: "text-[var(--hive-text-muted)] text-xs", children: formatTimeAgo(comment.timestamp) }), comment.isEdited && (_jsx("span", { className: "text-[var(--hive-text-muted)] text-xs", children: "(edited)" }))] }), isEditing ? (_jsxs("div", { className: "mb-3", children: [_jsx("textarea", { value: editContent, onChange: (e) => setEditContent(e.target.value), className: "w-full p-2 text-sm bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)]", rows: 3, autoFocus: true }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Button, { size: "xs", onClick: handleEdit, children: "Save" }), _jsx(Button, { size: "xs", variant: "ghost", onClick: () => setIsEditing(false), children: "Cancel" })] })] })) : (_jsx("p", { className: "text-[var(--hive-text-primary)] text-sm mb-3 leading-relaxed", children: comment.content })), _jsxs("div", { className: "flex items-center gap-4 mb-3", children: [_jsxs(Button, { variant: "ghost", size: "xs", onClick: handleLike, className: `gap-1 ${comment.isLiked ? 'text-[var(--hive-accent)]' : 'text-[var(--hive-text-muted)]'} hover:text-[var(--hive-accent)]`, children: [_jsx(Heart, { className: `w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}` }), comment.engagement.likes > 0 && (_jsx("span", { className: "text-xs", children: comment.engagement.likes }))] }), canReply && (_jsxs(Button, { variant: "ghost", size: "xs", onClick: () => setIsReplying(!isReplying), className: "gap-1 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]", children: [_jsx(Reply, { className: "w-3 h-3" }), _jsx("span", { className: "text-xs", children: "Reply" })] })), hasReplies && (_jsxs(Button, { variant: "ghost", size: "xs", onClick: () => setShowReplies(!showReplies), className: "gap-1 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]", children: [showReplies ? (_jsx(ChevronUp, { className: "w-3 h-3" })) : (_jsx(ChevronDown, { className: "w-3 h-3" })), _jsxs("span", { className: "text-xs", children: [comment.replies?.length, " ", comment.replies?.length === 1 ? 'reply' : 'replies'] })] })), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: () => setShowMenu(!showMenu), className: "opacity-0 group-hover:opacity-100 transition-opacity text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-10 min-w-[120px]", children: [isOwnComment && comment.canEdit && (_jsxs("button", { onClick: () => {
                                                            setIsEditing(true);
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Edit3, { className: "w-3 h-3" }), "Edit"] })), isOwnComment && comment.canDelete && (_jsxs("button", { onClick: () => {
                                                            onDelete?.(comment.id);
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]", children: [_jsx(Trash2, { className: "w-3 h-3" }), "Delete"] })), !isOwnComment && (_jsxs("button", { onClick: () => {
                                                            onReport?.(comment.id, 'inappropriate');
                                                            setShowMenu(false);
                                                        }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-warning)]", children: [_jsx(Flag, { className: "w-3 h-3" }), "Report"] }))] })) })] })] }), _jsx(AnimatePresence, { children: isReplying && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mb-4", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("textarea", { value: replyContent, onChange: (e) => setReplyContent(e.target.value), placeholder: "Write a reply...", className: "flex-1 p-2 text-sm bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)]", rows: 2, autoFocus: true }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Button, { size: "xs", onClick: handleReply, disabled: !replyContent.trim(), children: _jsx(Send, { className: "w-3 h-3" }) }), _jsx(Button, { size: "xs", variant: "ghost", onClick: () => setIsReplying(false), children: _jsx("span", { className: "text-xs", children: "Cancel" }) })] })] }) })) }), _jsx(AnimatePresence, { children: showReplies && hasReplies && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "space-y-3", children: comment.replies?.map((reply) => (_jsx(CommentItem, { comment: reply, depth: depth + 1, maxDepth: maxDepth, currentUserId: currentUserId, onLike: onLike, onReply: onReply, onEdit: onEdit, onDelete: onDelete, onReport: onReport }, reply.id))) })) })] })] }) }));
};
export const CommentSystem = ({ postId, comments, currentUserId, onAddComment, onLikeComment, onEditComment, onDeleteComment, onReportComment, isLoading = false, maxDepth = 3, showCount = true, enableFeatureFlag = true }) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const totalComments = useMemo(() => {
        const countComments = (commentList) => {
            return commentList.reduce((count, comment) => {
                return count + 1 + (comment.replies ? countComments(comment.replies) : 0);
            }, 0);
        };
        return countComments(comments);
    }, [comments]);
    const handleSubmit = useCallback(async () => {
        if (!newComment.trim() || isSubmitting)
            return;
        setIsSubmitting(true);
        try {
            await onAddComment?.(newComment);
            setNewComment('');
        }
        finally {
            setIsSubmitting(false);
        }
    }, [newComment, isSubmitting, onAddComment]);
    return (_jsxs("div", { className: "space-y-4", children: [showCount && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageCircle, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [totalComments, " ", totalComments === 1 ? 'Comment' : 'Comments'] })] })), _jsxs("div", { className: "flex gap-3", children: [_jsx(Avatar, { initials: "U", size: "sm", className: "flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("textarea", { value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: "Write a comment...", className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg resize-none focus:outline-none focus:border-[var(--hive-primary)] text-sm", rows: 3 }), _jsx("div", { className: "flex justify-end mt-2", children: _jsx(Button, { onClick: handleSubmit, disabled: !newComment.trim() || isSubmitting, size: "sm", children: isSubmitting ? 'Posting...' : 'Comment' }) })] })] }), _jsx("div", { className: "space-y-4", children: isLoading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin w-6 h-6 border-2 border-[var(--hive-primary)] border-t-transparent rounded-full mx-auto" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mt-2", children: "Loading comments..." })] })) : comments.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(MessageCircle, { className: "w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "No comments yet. Be the first to comment!" })] })) : (comments.map((comment) => (_jsx(CommentItem, { comment: comment, depth: 0, maxDepth: maxDepth, currentUserId: currentUserId, onLike: onLikeComment, onReply: onAddComment, onEdit: onEditComment, onDelete: onDeleteComment, onReport: onReportComment }, comment.id)))) })] }));
};
//# sourceMappingURL=comment-system.js.map