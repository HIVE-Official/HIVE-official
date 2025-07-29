import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar } from '../../atomic/atoms/avatar';
import { Heart, MessageSquare, Share2, Bookmark, MoreVertical, Image, Video, Link, Smile, Send, Reply, ThumbsUp, Flag, Eye, EyeOff, Pin, Trash2, Edit3, Copy, ExternalLink, Calendar, MapPin, Bold, Italic, List, Code, Quote, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
const meta = {
    title: '07-Spaces/Content Interaction',
    parameters: {
        docs: {
            description: {
                component: 'Comprehensive content interaction components for HIVE Spaces - Posts, comments, reactions, and moderation tools with kitchen sink variants',
            },
        },
    },
};
export default meta;
// Mock data for comprehensive testing
const mockPosts = [
    {
        id: '1',
        author: {
            id: 'user1',
            name: 'Sarah Chen',
            handle: '@sarahc',
            avatar: '/placeholder-avatar.jpg',
            role: 'admin',
            isVerified: true,
            reputation: 2840
        },
        content: 'Just wrapped up our machine learning workshop! Amazing to see everyone\'s projects come together. The neural network demos were particularly impressive. Who\'s excited for next week\'s deep learning session? 🚀\n\nP.S. - Don\'t forget to submit your project proposals by Friday!',
        type: 'text',
        createdAt: '2023-10-20T14:30:00Z',
        updatedAt: null,
        isPinned: true,
        isEdited: false,
        visibility: 'public',
        metrics: {
            likes: 24,
            comments: 8,
            shares: 3,
            views: 156,
            bookmarks: 12
        },
        reactions: [
            { type: 'like', count: 18, userReacted: true },
            { type: 'love', count: 4, userReacted: false },
            { type: 'fire', count: 2, userReacted: false }
        ],
        tags: ['#MachineLearning', '#Workshop', '#AI'],
        mentions: ['@john', '@emma'],
        attachments: [],
        isReported: false,
        moderationStatus: 'approved'
    },
    {
        id: '2',
        author: {
            id: 'user2',
            name: 'Marcus Rodriguez',
            handle: '@marcusr',
            avatar: '/placeholder-avatar-2.jpg',
            role: 'member',
            isVerified: false,
            reputation: 1950
        },
        content: 'Check out this interactive visualization I built for our data structures project! It shows how different sorting algorithms perform in real-time.',
        type: 'link',
        createdAt: '2023-10-20T12:15:00Z',
        updatedAt: '2023-10-20T12:45:00Z',
        isPinned: false,
        isEdited: true,
        visibility: 'public',
        metrics: {
            likes: 15,
            comments: 6,
            shares: 2,
            views: 89,
            bookmarks: 8
        },
        reactions: [
            { type: 'like', count: 12, userReacted: false },
            { type: 'fire', count: 3, userReacted: true }
        ],
        tags: ['#DataStructures', '#Visualization', '#Project'],
        mentions: [],
        attachments: [
            {
                id: 'att1',
                type: 'link',
                url: 'https://sorting-visualizer.demo.com',
                title: 'Interactive Sorting Algorithm Visualizer',
                description: 'Real-time visualization of bubble sort, merge sort, and quick sort algorithms',
                thumbnail: '/placeholder-link-preview.jpg'
            }
        ],
        isReported: false,
        moderationStatus: 'approved'
    },
    {
        id: '3',
        author: {
            id: 'user3',
            name: 'Elena Vasquez',
            handle: '@elenav',
            avatar: '/placeholder-avatar-3.jpg',
            role: 'moderator',
            isVerified: true,
            reputation: 1420
        },
        content: 'Weekly study group reminder! Tomorrow 6 PM in the library study room 204. We\'ll be covering advanced algorithms and preparing for midterms.',
        type: 'event',
        createdAt: '2023-10-19T16:20:00Z',
        updatedAt: null,
        isPinned: false,
        isEdited: false,
        visibility: 'public',
        metrics: {
            likes: 8,
            comments: 12,
            shares: 1,
            views: 67,
            bookmarks: 5
        },
        reactions: [
            { type: 'like', count: 6, userReacted: false },
            { type: 'heart', count: 2, userReacted: false }
        ],
        tags: ['#StudyGroup', '#Algorithms', '#Midterms'],
        mentions: [],
        attachments: [
            {
                id: 'att2',
                type: 'event',
                title: 'CS 441 Study Group',
                date: '2023-10-21T18:00:00Z',
                location: 'Library Study Room 204',
                description: 'Advanced algorithms review session'
            }
        ],
        isReported: false,
        moderationStatus: 'approved'
    },
    {
        id: '4',
        author: {
            id: 'user4',
            name: 'David Park',
            handle: '@davidp',
            avatar: '/placeholder-avatar-4.jpg',
            role: 'member',
            isVerified: false,
            reputation: 680
        },
        content: 'This content has been reported and is under review.',
        type: 'text',
        createdAt: '2023-10-19T10:30:00Z',
        updatedAt: null,
        isPinned: false,
        isEdited: false,
        visibility: 'hidden',
        metrics: {
            likes: 2,
            comments: 1,
            shares: 0,
            views: 23,
            bookmarks: 0
        },
        reactions: [
            { type: 'like', count: 2, userReacted: false }
        ],
        tags: [],
        mentions: [],
        attachments: [],
        isReported: true,
        moderationStatus: 'under_review',
        reportReason: 'inappropriate_content'
    }
];
const mockComments = [
    {
        id: 'c1',
        postId: '1',
        author: {
            id: 'user5',
            name: 'Jessica Wong',
            handle: '@jessicaw',
            avatar: '/placeholder-avatar-5.jpg',
            role: 'member'
        },
        content: 'This was incredible! The neural network demo completely changed how I think about AI. Can\'t wait for the deep learning session!',
        createdAt: '2023-10-20T15:45:00Z',
        isEdited: false,
        parentId: null,
        metrics: {
            likes: 5,
            replies: 2
        },
        reactions: [
            { type: 'like', count: 5, userReacted: true }
        ],
        isReported: false,
        moderationStatus: 'approved'
    },
    {
        id: 'c2',
        postId: '1',
        author: {
            id: 'user6',
            name: 'Alex Thompson',
            handle: '@alext',
            avatar: '/placeholder-avatar-6.jpg',
            role: 'member'
        },
        content: '@jessicaw Totally agree! The hands-on approach made everything click for me.',
        createdAt: '2023-10-20T16:10:00Z',
        isEdited: false,
        parentId: 'c1',
        metrics: {
            likes: 2,
            replies: 0
        },
        reactions: [
            { type: 'like', count: 2, userReacted: false }
        ],
        isReported: false,
        moderationStatus: 'approved'
    }
];
// Reaction types with emojis and colors
const reactionTypes = {
    like: { emoji: '👍', label: 'Like', color: 'text-blue-400' },
    love: { emoji: '❤️', label: 'Love', color: 'text-red-400' },
    fire: { emoji: '🔥', label: 'Fire', color: 'text-orange-400' },
    clap: { emoji: '👏', label: 'Clap', color: 'text-green-400' },
    mind_blown: { emoji: '🤯', label: 'Mind Blown', color: 'text-purple-400' },
    rocket: { emoji: '🚀', label: 'Rocket', color: 'text-yellow-400' }
};
const PostComposer = ({ variant = 'inline', placeholder = "Share something with the space...", maxLength = 2000, allowAttachments = true, allowRichText = true, onPost, currentUser = {
    name: 'Current User',
    handle: '@user',
    avatar: '/placeholder-avatar.jpg'
} }) => {
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [showRichText, setShowRichText] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const handlePost = () => {
        if (content.trim()) {
            onPost?.(content, attachments);
            setContent('');
            setAttachments([]);
            setIsExpanded(false);
        }
    };
    const handleFocus = () => {
        if (variant === 'compact') {
            setIsExpanded(true);
        }
    };
    const remainingChars = maxLength - content.length;
    const isOverLimit = remainingChars < 0;
    if (variant === 'compact' && !isExpanded) {
        return (_jsx(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { src: currentUser.avatar, fallback: currentUser.name.charAt(0), size: "sm" }), _jsx("button", { onClick: handleFocus, className: "flex-1 text-left px-4 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-full text-[var(--hive-text-tertiary)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] transition-colors", children: placeholder })] }) }));
    }
    return (_jsx(Card, { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "flex gap-4", children: [_jsx(Avatar, { src: currentUser.avatar, fallback: currentUser.name.charAt(0), size: "md" }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("textarea", { placeholder: placeholder, value: content, onChange: (e) => setContent(e.target.value), onFocus: handleFocus, rows: isExpanded || variant === 'modal' ? 4 : 2, maxLength: maxLength, className: "w-full bg-transparent border-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none focus:outline-none text-lg" }), _jsx("div", { className: "absolute bottom-2 right-2 text-xs", children: _jsx("span", { className: remainingChars < 50 ? 'text-red-400' : 'text-[var(--hive-text-tertiary)]', children: remainingChars }) })] }), allowRichText && (isExpanded || variant === 'modal') && (_jsxs("div", { className: "flex items-center gap-2 pb-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Bold, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Italic, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(List, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Quote, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Code, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Link, { className: "h-4 w-4" }) })] })), attachments.length > 0 && (_jsx("div", { className: "space-y-2", children: attachments.map((attachment, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-interactive-hover)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Image, { className: "h-5 w-5 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm", children: attachment.name })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setAttachments(attachments.filter((_, i) => i !== index)), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-4 w-4" }) })] }, index))) })), (isExpanded || variant === 'modal') && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [allowAttachments && (_jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Image, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Video, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Link, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Calendar, { className: "h-4 w-4" }) })] })), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Smile, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [variant === 'compact' && (_jsx(Button, { variant: "ghost", onClick: () => setIsExpanded(false), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: "Cancel" })), _jsxs(Button, { onClick: handlePost, disabled: !content.trim() || isOverLimit, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50", children: [_jsx(Send, { className: "h-4 w-4 mr-2" }), "Post"] })] })] }))] })] }) }) }));
};
const PostCard = ({ post, variant = 'default', showMetrics = true, showActions = true, currentUserRole = 'member', onReaction, onComment, onShare, onBookmark, onModerate }) => {
    const [showReactions, setShowReactions] = useState(false);
    const [showModerationMenu, setShowModerationMenu] = useState(false);
    const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);
    const canEdit = post.author.id === 'current-user' || canModerate;
    const getRoleIcon = () => {
        switch (post.author.role) {
            case 'owner': return _jsx(Crown, { className: "h-3 w-3 text-yellow-400" });
            case 'admin': return _jsx(Shield, { className: "h-3 w-3 text-blue-400" });
            case 'moderator': return _jsx(Star, { className: "h-3 w-3 text-purple-400" });
            default: return null;
        }
    };
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours < 1)
            return 'Just now';
        if (diffHours < 24)
            return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };
    // Don't render if content is hidden and user can't moderate
    if (post.visibility === 'hidden' && !canModerate) {
        return null;
    }
    return (_jsxs(Card, { className: `bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] ${post.isPinned ? 'border-[var(--hive-brand-secondary)]/30' : ''}`, children: [post.isReported && canModerate && (_jsxs("div", { className: "px-4 py-2 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-400" }), _jsxs(Text, { variant: "body-xs", className: "text-red-400", children: ["Content reported - ", post.reportReason?.replace('_', ' '), " - Status: ", post.moderationStatus?.replace('_', ' ')] })] })), post.isPinned && (_jsxs("div", { className: "px-4 py-2 bg-[var(--hive-brand-secondary)]/10 border-b border-[var(--hive-brand-secondary)]/20 flex items-center gap-2", children: [_jsx(Pin, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-brand-secondary)]", children: "Pinned post" })] })), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { src: post.author.avatar, fallback: post.author.name.charAt(0), size: variant === 'compact' ? 'sm' : 'md' }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] font-medium", children: post.author.name }), getRoleIcon(), post.author.isVerified && (_jsx(CheckCircle, { className: "h-4 w-4 text-blue-400" }))] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-tertiary)] text-sm", children: [_jsx("span", { children: post.author.handle }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTimeAgo(post.createdAt) }), post.isEdited && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { className: "italic", children: "edited" })] })), variant === 'detailed' && showMetrics && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx(Eye, { className: "h-3 w-3" }), _jsxs("span", { children: [post.metrics.views, " views"] })] }))] })] })] }), showActions && (_jsxs("div", { className: "relative", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowModerationMenu(!showModerationMenu), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }), showModerationMenu && (_jsx("div", { className: "absolute right-0 top-8 w-48 bg-[var(--hive-background-primary)] border border-[var(--hive-interactive-active)] rounded-lg shadow-xl z-10", children: _jsxs("div", { className: "py-2", children: [canEdit && (_jsxs("button", { className: "w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(Edit3, { className: "h-4 w-4" }), "Edit post"] })), _jsxs("button", { className: "w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(Copy, { className: "h-4 w-4" }), "Copy link"] }), !post.isPinned && canModerate && (_jsxs("button", { onClick: () => onModerate?.(post.id, 'pin'), className: "w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(Pin, { className: "h-4 w-4" }), "Pin post"] })), _jsxs("button", { className: "w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(Flag, { className: "h-4 w-4" }), "Report"] }), canModerate && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-t border-[var(--hive-interactive-active)] my-2" }), _jsxs("button", { onClick: () => onModerate?.(post.id, 'hide'), className: "w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(EyeOff, { className: "h-4 w-4" }), "Hide post"] }), _jsxs("button", { onClick: () => onModerate?.(post.id, 'delete'), className: "w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2", children: [_jsx(Trash2, { className: "h-4 w-4" }), "Delete post"] })] }))] }) }))] }))] }), _jsx("div", { className: "mb-4", children: post.visibility === 'hidden' ? (_jsx("div", { className: "p-4 bg-red-500/5 border border-red-500/20 rounded-lg", children: _jsx(Text, { variant: "body-sm", className: "text-red-400 italic", children: "This content has been hidden by moderators" }) })) : (_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] leading-relaxed whitespace-pre-wrap", children: post.content })) }), post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: post.tags.map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10", children: tag }, tag))) })), post.attachments.length > 0 && (_jsx("div", { className: "mb-4 space-y-3", children: post.attachments.map((attachment) => (_jsxs("div", { className: "border border-[var(--hive-interactive-active)] rounded-lg overflow-hidden", children: [attachment.type === 'link' && (_jsxs("div", { className: "p-4 flex gap-4", children: [attachment.thumbnail && (_jsx("div", { className: "w-20 h-20 bg-[var(--hive-interactive-hover)] rounded-lg flex-shrink-0" })), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] font-medium mb-1", children: attachment.title }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)] mb-2", children: attachment.description }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]", children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), "Visit Link"] })] })] })), attachment.type === 'event' && (_jsxs("div", { className: "p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-blue-400" }), _jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] font-medium", children: attachment.title })] }), _jsxs("div", { className: "space-y-1 text-sm text-[var(--hive-text-tertiary)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), new Date(attachment.date).toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4" }), attachment.location] })] })] }))] }, attachment.id))) })), post.reactions.length > 0 && (_jsx("div", { className: "flex items-center gap-3 mb-4 pb-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: post.reactions.map((reaction) => {
                            const reactionData = reactionTypes[reaction.type];
                            return (_jsxs("button", { onClick: () => onReaction?.(post.id, reaction.type), className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${reaction.userReacted
                                    ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]'
                                    : 'hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)]'}`, children: [_jsx("span", { children: reactionData.emoji }), _jsx("span", { children: reaction.count })] }, reaction.type));
                        }) })), showActions && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "relative", children: [_jsxs(Button, { size: "sm", variant: "ghost", onClick: () => setShowReactions(!showReactions), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4" }), showMetrics && _jsx("span", { children: post.metrics.likes })] }), showReactions && (_jsx("div", { className: "absolute bottom-8 left-0 flex gap-1 p-2 bg-[var(--hive-background-primary)] border border-[var(--hive-interactive-active)] rounded-lg shadow-xl z-10", children: Object.entries(reactionTypes).map(([type, data]) => (_jsx("button", { onClick: () => {
                                                        onReaction?.(post.id, type);
                                                        setShowReactions(false);
                                                    }, className: "w-8 h-8 flex items-center justify-center hover:bg-[var(--hive-interactive-active)] rounded transition-colors", title: data.label, children: data.emoji }, type))) }))] }), _jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onComment?.(post.id), className: "text-[var(--hive-text-tertiary)] hover:text-blue-400 flex items-center gap-2", children: [_jsx(MessageSquare, { className: "h-4 w-4" }), showMetrics && _jsx("span", { children: post.metrics.comments })] }), _jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onShare?.(post.id), className: "text-[var(--hive-text-tertiary)] hover:text-green-400 flex items-center gap-2", children: [_jsx(Share2, { className: "h-4 w-4" }), showMetrics && _jsx("span", { children: post.metrics.shares })] })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onBookmark?.(post.id), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)]", children: _jsx(Bookmark, { className: "h-4 w-4" }) })] }))] })] }));
};
const CommentSystem = ({ comments, currentUser = { name: 'Current User', handle: '@user', avatar: '/placeholder-avatar.jpg' }, onComment, onReaction, onModerate, currentUserRole = 'member' }) => {
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);
    const handleComment = () => {
        if (newComment.trim()) {
            onComment?.(newComment);
            setNewComment('');
        }
    };
    const handleReply = (parentId) => {
        if (replyContent.trim()) {
            onComment?.(replyContent, parentId);
            setReplyContent('');
            setReplyTo(null);
        }
    };
    const topLevelComments = comments.filter(c => !c.parentId);
    const getReplies = (commentId) => comments.filter(c => c.parentId === commentId);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(Avatar, { src: currentUser.avatar, fallback: currentUser.name.charAt(0), size: "sm" }), _jsxs("div", { className: "flex-1", children: [_jsx("textarea", { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value), rows: 2, className: "w-full bg-transparent border-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none focus:outline-none" }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Smile, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Image, { className: "h-4 w-4" }) })] }), _jsx(Button, { size: "sm", onClick: handleComment, disabled: !newComment.trim(), className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50", children: "Comment" })] })] })] }) }), _jsx("div", { className: "space-y-4", children: topLevelComments.map((comment) => {
                    const replies = getReplies(comment.id);
                    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(Avatar, { src: comment.author.avatar, fallback: comment.author.name.charAt(0), size: "sm" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] font-medium", children: comment.author.name }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: comment.author.handle }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "\u2022" }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: formatTimeAgo(comment.createdAt) })] }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: comment.content })] }), _jsxs("div", { className: "flex items-center gap-4 mt-2 ml-3", children: [_jsxs(Button, { size: "sm", variant: "ghost", onClick: () => onReaction?.(comment.id, 'like'), className: "text-[var(--hive-text-tertiary)] hover:text-blue-400 text-xs", children: [_jsx(ThumbsUp, { className: "h-3 w-3 mr-1" }), comment.metrics.likes] }), _jsxs(Button, { size: "sm", variant: "ghost", onClick: () => setReplyTo(replyTo === comment.id ? null : comment.id), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] text-xs", children: [_jsx(Reply, { className: "h-3 w-3 mr-1" }), "Reply"] }), canModerate && (_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-red-400 text-xs", children: _jsx(Flag, { className: "h-3 w-3" }) }))] }), replyTo === comment.id && (_jsx("div", { className: "mt-3 ml-3", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Avatar, { src: currentUser.avatar, fallback: currentUser.name.charAt(0), size: "xs" }), _jsxs("div", { className: "flex-1", children: [_jsx("textarea", { placeholder: `Reply to ${comment.author.name}...`, value: replyContent, onChange: (e) => setReplyContent(e.target.value), rows: 2, className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] text-sm resize-none focus:outline-none" }), _jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setReplyTo(null), className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] text-xs", children: "Cancel" }), _jsx(Button, { size: "sm", onClick: () => handleReply(comment.id), disabled: !replyContent.trim(), className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50 text-xs", children: "Reply" })] })] })] }) }))] })] }), replies.length > 0 && (_jsx("div", { className: "ml-8 space-y-3 border-l-2 border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] pl-4", children: replies.map((reply) => (_jsxs("div", { className: "flex gap-3", children: [_jsx(Avatar, { src: reply.author.avatar, fallback: reply.author.name.charAt(0), size: "xs" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-primary)] font-medium", children: reply.author.name }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: reply.author.handle }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "\u2022" }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: formatTimeAgo(reply.createdAt) })] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-primary)]", children: reply.content })] }), _jsx("div", { className: "flex items-center gap-4 mt-2 ml-3", children: _jsxs(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-blue-400 text-xs", children: [_jsx(ThumbsUp, { className: "h-3 w-3 mr-1" }), reply.metrics.likes] }) })] })] }, reply.id))) }))] }, comment.id));
                }) })] }));
};
// Helper function to format time
const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1)
        return 'Just now';
    if (diffHours < 24)
        return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
};
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const PostComposerInline = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(PostComposer, { onPost: (content, attachments) => console.log('Post:', content, attachments) }) })),
};
export const PostComposerCompact = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(PostComposer, { variant: "compact", onPost: (content, attachments) => console.log('Post:', content, attachments) }) })),
};
export const PostCardDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-6", children: mockPosts.map((post) => (_jsx(PostCard, { post: post, currentUserRole: "admin", onReaction: (id, type) => console.log('Reaction:', id, type), onComment: (id) => console.log('Comment:', id), onShare: (id) => console.log('Share:', id), onBookmark: (id) => console.log('Bookmark:', id), onModerate: (id, action) => console.log('Moderate:', id, action) }, post.id))) })),
};
export const PostCardDetailed = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(PostCard, { post: mockPosts[0], variant: "detailed", currentUserRole: "owner", showMetrics: true, onReaction: (id, type) => console.log('Reaction:', id, type), onComment: (id) => console.log('Comment:', id), onShare: (id) => console.log('Share:', id), onBookmark: (id) => console.log('Bookmark:', id), onModerate: (id, action) => console.log('Moderate:', id, action) }) })),
};
export const CommentSystemDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(CommentSystem, { comments: mockComments, currentUserRole: "moderator", onComment: (content, parentId) => console.log('Comment:', content, parentId), onReaction: (id, type) => console.log('Reaction:', id, type), onModerate: (id, action) => console.log('Moderate:', id, action) }) })),
};
export const KitchenSinkContentInteraction = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Content Interaction - Kitchen Sink" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Post Composer" }), _jsx(PostComposer, {})] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Post Feed" }), _jsx("div", { className: "space-y-6", children: mockPosts.slice(0, 2).map((post) => (_jsx(PostCard, { post: post, currentUserRole: "admin" }, post.id))) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Comment System" }), _jsx(CommentSystem, { comments: mockComments })] })] })),
};
export const ModerationView = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-6", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Content Moderation View" }), mockPosts.map((post) => (_jsx(PostCard, { post: post, currentUserRole: "admin", variant: "detailed", showMetrics: true }, post.id)))] })),
};
export const EdgeCasesContent = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Content Interaction - Edge Cases" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Empty Comment System" }), _jsx(CommentSystem, { comments: [] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Long Content Post" }), _jsx(PostCard, { post: {
                            ...mockPosts[0],
                            content: 'This is a very long post content that should demonstrate how the component handles extended text. '.repeat(10)
                        }, currentUserRole: "member" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Limited Permissions View" }), _jsx(PostCard, { post: mockPosts[0], currentUserRole: "member", showActions: false })] })] })),
};
//# sourceMappingURL=content-interaction.stories.js.map