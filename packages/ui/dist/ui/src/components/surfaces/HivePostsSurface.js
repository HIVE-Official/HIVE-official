"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveTextarea } from '../hive-textarea';
import { Avatar as HiveAvatar } from '../../atomic/atoms/avatar';
import { HiveBadge } from '../hive-badge';
import { MessageCircle, Heart, Share2, MoreVertical, Send, Image, Link, Hash, Smile, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useRealtimePosts, useOptimisticUpdates } from '../../hooks/use-live-updates';
// Individual Post Component
const PostCard = ({ post, onLike, onComment, onShare, variant = 'widget' }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState('');
    const roleColors = {
        leader: 'bg-purple-100 text-purple-800 border-purple-300',
        admin: 'bg-red-100 text-red-800 border-red-300',
        moderator: 'bg-blue-100 text-blue-800 border-blue-300',
        member: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return (_jsxs("div", { className: cn("bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 space-y-3", variant === 'compact' && "p-3"), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveAvatar, { src: post.authorAvatar, alt: post.authorName, initials: post.authorName.slice(0, 2).toUpperCase(), size: "sm" }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-gray-900", children: post.authorName }), post.authorRole && post.authorRole !== 'member' && (_jsx(HiveBadge, { variant: "secondary", className: cn("text-xs", roleColors[post.authorRole]), children: post.authorRole }))] }), _jsx("span", { className: "text-xs text-gray-500", children: formatDistanceToNow(post.timestamp, { addSuffix: true }) })] })] }), _jsx("button", { className: "text-gray-400 hover:text-gray-600", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "text-gray-800 whitespace-pre-wrap", children: post.content }), post.tags && post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => (_jsxs("span", { className: "text-sm text-blue-600 hover:underline cursor-pointer", children: ["#", tag] }, tag))) })), post.attachments && post.attachments.length > 0 && (_jsx("div", { className: "space-y-2", children: post.attachments.map((attachment, idx) => (_jsx("div", { className: "rounded-lg overflow-hidden border border-gray-200", children: attachment.type === 'image' ? (_jsx("img", { src: attachment.url, alt: attachment.title || 'Attachment', className: "w-full h-auto max-h-96 object-cover" })) : (_jsxs("a", { href: attachment.url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 p-3 hover:bg-gray-50", children: [_jsx(Link, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { className: "text-sm text-blue-600 hover:underline", children: attachment.title || attachment.url })] })) }, idx))) })), _jsx("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [_jsxs("span", { children: [post.likes, " likes"] }), _jsxs("span", { children: [post.comments, " comments"] }), _jsxs("span", { children: [post.shares, " shares"] })] }) }), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("button", { onClick: onLike, className: cn("flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors", post.hasLiked
                            ? "text-red-600 bg-red-50 hover:bg-red-100"
                            : "text-gray-600 hover:bg-gray-100"), children: [_jsx(Heart, { className: cn("h-4 w-4", post.hasLiked && "fill-current") }), _jsx("span", { className: "text-sm", children: "Like" })] }), _jsxs("button", { onClick: () => setShowCommentInput(!showCommentInput), className: "flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Comment" })] }), _jsxs("button", { onClick: onShare, className: "flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors", children: [_jsx(Share2, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Share" })] })] }), showCommentInput && (_jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(HiveAvatar, { src: undefined, alt: "You", initials: "ME", size: "xs" }), _jsxs("div", { className: "flex-1 flex gap-2", children: [_jsx("input", { type: "text", value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Write a comment...", className: "flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)] focus:border-transparent", onKeyDown: (e) => {
                                    if (e.key === 'Enter' && comment.trim()) {
                                        onComment?.();
                                        setComment('');
                                        setShowCommentInput(false);
                                    }
                                } }), _jsx("button", { onClick: () => {
                                    if (comment.trim()) {
                                        onComment?.();
                                        setComment('');
                                        setShowCommentInput(false);
                                    }
                                }, className: "p-1.5 text-[var(--hive-gold-dark)] hover:bg-orange-50 rounded-lg transition-colors", children: _jsx(Send, { className: "h-4 w-4" }) })] })] }))] }));
};
// Create Post Component
const CreatePost = ({ onSubmit, variant = 'widget' }) => {
    const [content, setContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content);
            setContent('');
            setIsExpanded(false);
        }
    };
    if (!isExpanded && variant !== 'full') {
        return (_jsx("button", { onClick: () => setIsExpanded(true), className: "w-full bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4 text-left hover:border-gray-300 transition-colors", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveAvatar, { src: undefined, alt: "You", initials: "ME", size: "sm" }), _jsx("span", { className: "text-gray-500", children: "Share something with the space..." })] }) }));
    }
    return (_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsx(HiveTextarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Share something with the space...", className: "min-h-[100px] resize-none", autoFocus: isExpanded }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Image, { className: "h-5 w-5" }) }), _jsx("button", { className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Link, { className: "h-5 w-5" }) }), _jsx("button", { className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Hash, { className: "h-5 w-5" }) }), _jsx("button", { className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Smile, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [variant !== 'full' && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => {
                                        setIsExpanded(false);
                                        setContent('');
                                    }, children: "Cancel" })), _jsx(HiveButton, { variant: "primary", size: "sm", onClick: handleSubmit, disabled: !content.trim(), children: "Post" })] })] })] }) }));
};
// Main Surface Component
export const HivePostsSurface = ({ spaceId, spaceName, isLeader = false, currentUserId, className, variant = 'widget', onPostCreate, onPostLike, onPostComment, posts: propPosts, loading = false, error = null, }) => {
    // Real-time posts data
    const { data: realtimePosts, loading: realtimeLoading, error: realtimeError } = useRealtimePosts(spaceId);
    const { data: optimisticPosts, addOptimisticItem, removeOptimisticItem } = useOptimisticUpdates((propPosts || realtimePosts || []));
    // Mock data for development (fallback)
    const mockPosts = useMemo(() => [
        {
            id: '1',
            content: 'Welcome to our space! Excited to collaborate with everyone here. Looking forward to building amazing things together! 🚀',
            authorId: '1',
            authorName: 'Sarah Chen',
            authorRole: 'leader',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            likes: 12,
            comments: 5,
            shares: 2,
            hasLiked: true,
            tags: ['welcome', 'collaboration']
        },
        {
            id: '2',
            content: 'Just scheduled our weekly sync for Thursday at 3pm. Check the events tab for details and RSVP!',
            authorId: '2',
            authorName: 'Marcus Johnson',
            authorRole: 'moderator',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            likes: 8,
            comments: 3,
            shares: 1,
            hasLiked: false,
            attachments: [{
                    type: 'link',
                    url: '#',
                    title: 'Weekly Sync Meeting - Thursday 3pm'
                }]
        },
        {
            id: '3',
            content: 'Great discussion in today\'s meeting! Here are the key takeaways:\n\n1. Focus on user research this week\n2. Design review scheduled for Friday\n3. Beta launch targeted for end of month\n\nLet me know if I missed anything!',
            authorId: '3',
            authorName: 'Emily Rodriguez',
            authorRole: 'member',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            likes: 15,
            comments: 7,
            shares: 3,
            hasLiked: false,
            tags: ['meeting-notes', 'updates']
        }
    ], []);
    // Use optimistic posts for immediate UI updates, fallback to empty array
    const posts = optimisticPosts || [];
    const isLoading = loading || realtimeLoading;
    const displayError = error || realtimeError;
    const handlePostCreate = useCallback(async (content) => {
        if (!currentUserId)
            return;
        // Create optimistic post
        const optimisticPost = {
            id: `temp-${Date.now()}`,
            content,
            authorId: currentUserId,
            authorName: 'You', // Will be updated when real data comes back
            authorRole: isLeader ? 'leader' : 'member',
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            shares: 0,
            hasLiked: false,
            tags: []
        };
        // Add optimistically
        addOptimisticItem(optimisticPost, async () => {
            if (onPostCreate) {
                await onPostCreate(content);
            }
            else {
                console.log('Creating post:', content);
            }
        });
    }, [onPostCreate, currentUserId, isLeader, addOptimisticItem]);
    const handlePostLike = useCallback(async (postId) => {
        if (onPostLike) {
            await onPostLike(postId);
        }
        else {
            console.log('Liking post:', postId);
        }
    }, [onPostLike]);
    const handlePostComment = useCallback(async (postId, comment) => {
        if (onPostComment) {
            await onPostComment(postId, comment);
        }
        else {
            console.log('Commenting on post:', postId, comment);
        }
    }, [onPostComment]);
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 rounded-lg h-32 mb-4" }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => (_jsx("div", { className: "bg-gray-100 rounded-lg h-40" }, i))) })] }) }));
    }
    if (displayError) {
        return (_jsx(HiveCard, { className: cn("p-6", className), children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "Unable to load posts" }), _jsx("p", { className: "text-sm text-gray-500", children: displayError.message })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [variant === 'full' && (_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: spaceName ? `${spaceName} Posts` : 'Posts' }), _jsx(HiveButton, { variant: "ghost", size: "sm", children: "Filter" })] })), (isLeader || variant === 'full') && (_jsx(CreatePost, { onSubmit: handlePostCreate, variant: variant })), _jsx("div", { className: "space-y-4", children: posts.length === 0 ? (_jsx(HiveCard, { className: "p-8", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto", children: _jsx(MessageCircle, { className: "h-8 w-8 text-gray-400" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No posts yet" }), _jsx("p", { className: "text-gray-600", children: isLeader ? "Be the first to share something with your space!" : "Check back later for updates" })] }), isLeader && (_jsxs(HiveButton, { variant: "primary", size: "sm", onClick: () => handlePostCreate(''), className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Create First Post"] }))] }) })) : (posts.map((post) => (_jsx(PostCard, { post: post, variant: variant, onLike: () => handlePostLike(post.id), onComment: () => handlePostComment(post.id, ''), onShare: () => console.log('Share:', post.id) }, post.id)))) }), variant === 'widget' && posts.length > 3 && (_jsx("button", { className: "w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium", children: "View all posts \u2192" }))] }));
};
// Export display name for debugging
HivePostsSurface.displayName = 'HivePostsSurface';
//# sourceMappingURL=HivePostsSurface.js.map