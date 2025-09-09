'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Calendar, MapPin, Users, Clock, ChevronDown, MessageCircle, Share2, Pin, MoreHorizontal, AlertCircle, CheckCircle2, Timer, Car, Coffee, BookOpen, Crown, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils.js';
// Mock posts data for demo
const mockPosts = [
    {
        id: '1',
        type: 'study_session',
        content: 'Anyone want to study for the midterm tomorrow? Library group room 204.',
        author: {
            id: 'user1',
            name: 'Sarah Chen',
            role: 'member'
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        coordinationType: 'study_session',
        coordinationData: {
            title: 'CS 220 Midterm Study Session',
            description: 'Review data structures and algorithms',
            location: 'Library Group Room 204',
            datetime: new Date(Date.now() + 22 * 60 * 60 * 1000), // Tomorrow
            capacity: 6,
            responses: [
                { userId: 'user2', response: 'yes', timestamp: new Date() },
                { userId: 'user3', response: 'maybe', timestamp: new Date() },
            ],
            status: 'open',
            organizer: 'user1'
        },
        reactions: [
            { emoji: '📚', count: 3, userReacted: true },
            { emoji: '👍', count: 2, userReacted: false }
        ],
        commentCount: 2
    },
    {
        id: '2',
        type: 'food_run',
        content: 'Chipotle run in 30 minutes! Drop your orders in the comments.',
        author: {
            id: 'user2',
            name: 'Alex Rodriguez',
            role: 'member'
        },
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        coordinationType: 'food_run',
        coordinationData: {
            title: 'Chipotle Run',
            description: 'Leaving from dorm lobby',
            location: 'Chipotle on Main St',
            datetime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
            deadline: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from now
            responses: [
                { userId: 'user4', response: 'yes', details: 'Burrito bowl, chicken, brown rice', timestamp: new Date() },
                { userId: 'user5', response: 'yes', details: 'Burrito, steak, white rice', timestamp: new Date() },
            ],
            status: 'open',
            organizer: 'user2'
        },
        reactions: [
            { emoji: '🌯', count: 5, userReacted: false },
            { emoji: '🔥', count: 2, userReacted: true }
        ]
    },
    {
        id: '3',
        type: 'announcement',
        content: 'Reminder: Floor meeting tonight at 8 PM in the common room. We\'ll discuss the upcoming formal and new quiet hours policy.',
        author: {
            id: 'user6',
            name: 'Jordan Martinez',
            role: 'admin'
        },
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        isPinned: true,
        reactions: [
            { emoji: '👍', count: 8, userReacted: true },
            { emoji: '📝', count: 3, userReacted: false }
        ],
        commentCount: 5
    }
];
export const HivePostsSurface = React.memo(({ space, posts: propsPosts, isLoading = false, mode = 'view', maxPosts, showFilters = true, canPost = false, canModerate = false, leaderMode, showLiveActivity = false, liveActivityCount = 0, currentUserId, onCreatePost, onCoordinationResponse, onUpdateCoordinationStatus, PostRenderer, onReaction, onShare, onDelete }) => {
    const [filter, setFilter] = useState('all');
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const filteredPosts = useMemo(() => {
        // Use props posts if provided, otherwise fall back to mock data for development
        let posts = propsPosts || mockPosts;
        if (filter === 'coordination') {
            posts = posts.filter(post => ['study_session', 'food_run', 'ride_share', 'meetup'].includes(post.type));
        }
        else if (filter === 'discussion') {
            posts = posts.filter(post => ['discussion', 'question', 'announcement'].includes(post.type));
        }
        if (maxPosts) {
            posts = posts.slice(0, maxPosts);
        }
        return posts;
    }, [filter, maxPosts, propsPosts]);
    const getPostIcon = (type) => {
        switch (type) {
            case 'study_session': return _jsx(BookOpen, { className: "h-4 w-4" });
            case 'food_run': return _jsx(Coffee, { className: "h-4 w-4" });
            case 'ride_share': return _jsx(Car, { className: "h-4 w-4" });
            case 'meetup': return _jsx(Users, { className: "h-4 w-4" });
            case 'event': return _jsx(Calendar, { className: "h-4 w-4" });
            case 'announcement': return _jsx(AlertCircle, { className: "h-4 w-4" });
            case 'poll': return _jsx(CheckCircle2, { className: "h-4 w-4" });
            default: return _jsx(MessageSquare, { className: "h-4 w-4" });
        }
    };
    const getCoordinationStatusColor = (status) => {
        switch (status) {
            case 'open': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'full': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
            case 'completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            default: return 'text-green-400 bg-green-400/10 border-green-400/20';
        }
    };
    const formatTimeRemaining = (date) => {
        const diff = date.getTime() - Date.now();
        if (diff <= 0)
            return 'Ended';
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d remaining`;
        if (hours > 0)
            return `${hours}h remaining`;
        return `${minutes}m remaining`;
    };
    const formatTimeAgo = (date) => {
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        if (minutes > 0)
            return `${minutes}m ago`;
        return 'just now';
    };
    const postTypes = [
        { type: 'discussion', label: 'Discussion', icon: _jsx(MessageSquare, { className: "h-4 w-4" }), description: 'Start a conversation' },
        { type: 'question', label: 'Question', icon: _jsx(AlertCircle, { className: "h-4 w-4" }), description: 'Ask for help' },
        { type: 'study_session', label: 'Study Session', icon: _jsx(BookOpen, { className: "h-4 w-4" }), description: 'Coordinate studying' },
        { type: 'food_run', label: 'Food Run', icon: _jsx(Coffee, { className: "h-4 w-4" }), description: 'Order food together' },
        { type: 'ride_share', label: 'Ride Share', icon: _jsx(Car, { className: "h-4 w-4" }), description: 'Share transportation' },
        { type: 'meetup', label: 'Meetup', icon: _jsx(Users, { className: "h-4 w-4" }), description: 'Plan group activities' }
    ];
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageSquare, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: mode === 'view' ? 'Recent Posts' : 'Post Feed' })] }), showLiveActivity && liveActivityCount > 0 && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsxs("span", { className: "text-xs text-green-400", children: [liveActivityCount, " online"] })] })), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canPost && (_jsxs("div", { className: "relative", children: [_jsxs(motion.button, { onClick: () => setShowCreateMenu(!showCreateMenu), className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, "aria-expanded": showCreateMenu, "aria-haspopup": "menu", "aria-label": "Create new post", children: [_jsx(Plus, { className: "h-4 w-4" }), "Create Post", _jsx(ChevronDown, { className: cn("h-3 w-3 transition-transform", showCreateMenu && "rotate-180") })] }), _jsx(AnimatePresence, { children: showCreateMenu && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "absolute right-0 mt-2 w-64 bg-[var(--hive-background-primary)] border border-white/10 rounded-xl p-2 shadow-lg z-10", role: "menu", "aria-label": "Post creation options", children: postTypes.map((postType) => (_jsxs("button", { onClick: () => {
                                            onCreatePost?.(postType.type);
                                            setShowCreateMenu(false);
                                        }, className: "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 rounded-lg transition-colors min-h-[44px]", role: "menuitem", "aria-label": `Create ${postType.label.toLowerCase()}: ${postType.description}`, children: [_jsx("div", { className: "text-[var(--hive-brand-secondary)]", children: postType.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-inverse)]", children: postType.label }), _jsx("div", { className: "text-xs text-neutral-400", children: postType.description })] })] }, postType.type))) })) })] }))] }), showFilters && (_jsx("div", { className: "flex items-center gap-2", children: [
                    { id: 'all', label: 'All Posts' },
                    { id: 'coordination', label: 'Coordination' },
                    { id: 'discussion', label: 'Discussion' }
                ].map((filterOption) => (_jsx("button", { onClick: () => setFilter(filterOption.id), className: cn("px-3 py-1 rounded-full text-sm transition-colors", filter === filterOption.id
                        ? "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30"
                        : "bg-white/5 text-neutral-400 border border-white/10 hover:text-[var(--hive-text-inverse)]"), children: filterOption.label }, filterOption.id))) })), _jsx("div", { className: "space-y-4", children: isLoading ? (
                // Loading skeleton
                _jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 animate-pulse", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-white/10" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-4 bg-white/10 rounded w-32 mb-2" }), _jsx("div", { className: "h-3 bg-white/5 rounded w-20" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-white/5 rounded w-full" }), _jsx("div", { className: "h-4 bg-white/5 rounded w-3/4" })] })] }, i))) })) : filteredPosts.length === 0 ? (
                // Empty state
                _jsxs("div", { className: "text-center py-12", children: [_jsx(MessageSquare, { className: "h-12 w-12 text-neutral-500 mx-auto mb-4" }), _jsx("p", { className: "text-neutral-400", children: "No posts yet" }), canPost && (_jsx("p", { className: "text-neutral-500 text-sm mt-2", children: "Be the first to share something!" }))] })) : (
                // Posts list
                _jsx(AnimatePresence, { children: filteredPosts.map((post, index) => (PostRenderer ? (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.1 }, children: _jsx(PostRenderer, { post: post, spaceId: space.id, currentUserId: currentUserId, canModerate: canModerate, onReaction: onReaction, onShare: onShare, onDelete: onDelete }) }, post.id)) : (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.1 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-xl p-4", post.isPinned && "border-[var(--hive-brand-secondary)]/30 bg-[var(--hive-brand-secondary)]/5", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5"), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center", children: post.author.avatar ? (_jsx("img", { src: post.author.avatar, alt: "", className: "w-full h-full rounded-lg object-cover" })) : (_jsx("span", { className: "text-sm font-semibold text-[var(--hive-text-inverse)]", children: post.author.name.split(' ').map(n => n[0]).join('') })) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-inverse)]", children: post.author.name }), post.author.role === 'admin' && _jsx(Crown, { className: "h-3 w-3 text-[var(--hive-brand-secondary)]" }), post.isPinned && _jsx(Pin, { className: "h-3 w-3 text-[var(--hive-brand-secondary)]" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-neutral-400", children: [getPostIcon(post.type), _jsx("span", { className: "capitalize", children: post.type.replace('_', ' ') }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTimeAgo(post.timestamp) })] })] })] }), _jsx("button", { className: "text-neutral-400 hover:text-[var(--hive-text-inverse)] transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "mb-3", children: _jsx("p", { className: "text-[var(--hive-text-inverse)] leading-relaxed", children: post.content }) }), post.coordinationData && (_jsxs("div", { className: "mb-3 p-3 bg-white/5 border border-white/10 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)]", children: post.coordinationData.title }), _jsx("span", { className: cn("px-2 py-1 text-xs font-medium rounded-full border", getCoordinationStatusColor(post.coordinationData.status)), children: post.coordinationData.status })] }), _jsxs("div", { className: "space-y-1 text-sm text-neutral-300", children: [post.coordinationData.location && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: post.coordinationData.location })] })), post.coordinationData.datetime && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: post.coordinationData.datetime.toLocaleString() })] })), post.coordinationData.deadline && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Timer, { className: "h-3 w-3" }), _jsx("span", { className: "text-yellow-400", children: formatTimeRemaining(post.coordinationData.deadline) })] }))] }), post.coordinationData.responses && post.coordinationData.responses.length > 0 && (_jsx("div", { className: "mt-3 pt-2 border-t border-white/10", children: _jsxs("div", { className: "flex items-center gap-4 text-xs", children: [_jsxs("span", { className: "text-green-400", children: [post.coordinationData.responses.filter(r => r.response === 'yes').length, " joining"] }), _jsxs("span", { className: "text-yellow-400", children: [post.coordinationData.responses.filter(r => r.response === 'maybe').length, " maybe"] }), post.coordinationData.capacity && (_jsxs("span", { className: "text-neutral-400", children: [post.coordinationData.capacity - post.coordinationData.responses.filter(r => r.response === 'yes').length, " spots left"] }))] }) })), post.coordinationData.status === 'open' && currentUserId && (_jsx("div", { className: "mt-3 flex items-center gap-2", children: ['yes', 'maybe', 'no'].map((response) => (_jsxs("button", { onClick: () => onCoordinationResponse?.(post.id, {
                                                userId: currentUserId,
                                                response: response,
                                                timestamp: new Date()
                                            }), className: cn("px-3 py-1 text-xs rounded-full border transition-colors", response === 'yes' && "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20", response === 'maybe' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20", response === 'no' && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"), children: [response === 'yes' && '✓ I\'m in', response === 'maybe' && '? Maybe', response === 'no' && '✗ Can\'t make it'] }, response))) }))] })), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [_jsx("div", { className: "flex items-center gap-4", children: post.reactions && post.reactions.map((reaction, idx) => (_jsxs("button", { className: cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors", reaction.userReacted
                                                ? "bg-[var(--hive-brand-secondary)]/20 border border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]"
                                                : "hover:bg-white/5 text-neutral-400"), children: [_jsx("span", { children: reaction.emoji }), _jsx("span", { children: reaction.count })] }, idx))) }), _jsxs("div", { className: "flex items-center gap-3 text-neutral-400", children: [post.commentCount && post.commentCount > 0 && (_jsxs("button", { className: "flex items-center gap-1 hover:text-[var(--hive-text-inverse)] transition-colors", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: post.commentCount })] })), _jsx("button", { className: "hover:text-[var(--hive-text-inverse)] transition-colors", children: _jsx(Share2, { className: "h-4 w-4" }) })] })] })] }, post.id)))) })) })] }));
});
HivePostsSurface.displayName = 'HivePostsSurface';
export default HivePostsSurface;
//# sourceMappingURL=hive-posts-surface.js.map