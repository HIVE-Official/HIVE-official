"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { motionDurations } from '../../motion/hive-motion-system.js';
import { MessageSquare, Plus, MessageCircle, Share2, MoreHorizontal, Pin, Trash2, Clock, Users, Eye, Heart, Bookmark, Reply, Send, BarChart3 as Poll, Link as LinkIcon, Calendar, Crown, Lock, Loader2 } from 'lucide-react';
// Post creation will be handled via props/callbacks
// Coordination Post Component for campus coordination
const CoordinationSection = ({ post, onCoordinationResponse, onUpdateStatus, currentUserId }) => {
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [responseType, setResponseType] = useState('interested');
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const coordination = post.coordinationData;
    if (!coordination)
        return null;
    const handleResponse = async () => {
        if (!onCoordinationResponse || !currentUserId)
            return;
        setIsSubmitting(true);
        try {
            await onCoordinationResponse(post.id, {
                userId: currentUserId,
                responseType,
                message: responseMessage.trim() || undefined,
            });
            setShowResponseForm(false);
            setResponseMessage('');
        }
        catch (error) {
            console.error('Failed to submit coordination response:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const userResponse = coordination.responses.find(r => r.userId === currentUserId);
    const interestedCount = coordination.responses.filter(r => r.responseType === 'interested' || r.responseType === 'going').length;
    const getStatusColor = (status) => {
        switch (status) {
            case 'planning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
            case 'confirmed': return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'in_progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            case 'completed': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
            case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/30';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    };
    return (_jsxs(motion.div, { className: "mt-4 p-4 bg-white/5 border border-white/10 rounded-lg", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("px-2 py-1 rounded text-xs border", getStatusColor(coordination.status)), children: coordination.status.replace('_', ' ').toUpperCase() }), _jsxs("span", { className: "text-sm text-gray-300", children: [interestedCount, " ", interestedCount === 1 ? 'person' : 'people', " interested", coordination.maxParticipants && ` (${coordination.maxParticipants} max)`] })] }), coordination.datetime && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-400", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: new Date(coordination.datetime instanceof Date
                                    ? coordination.datetime
                                    : coordination.datetime.toDate()).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                }) })] }))] }), coordination.details && (_jsxs("div", { className: "mb-3 space-y-2", children: [coordination.details.subject && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Subject:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: coordination.details.subject })] })), coordination.details.restaurant && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Restaurant:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: coordination.details.restaurant })] })), coordination.details.destination && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Destination:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: coordination.details.destination })] })), coordination.location && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Location:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: coordination.location })] }))] })), coordination.responses.length > 0 && (_jsx("div", { className: "mb-3", children: _jsxs("div", { className: "flex flex-wrap gap-1", children: [coordination.responses.slice(0, 8).map((response, i) => (_jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-gray-600 overflow-hidden", children: response.user?.photoURL ? (_jsx("img", { src: response.user.photoURL, alt: "", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-xs text-[var(--hive-text-inverse)]", children: (response.user?.fullName || 'U').charAt(0).toUpperCase() }) })) }), _jsx("span", { className: "text-blue-300", children: response.user?.fullName || 'User' }), response.responseType === 'going' && (_jsx("span", { className: "text-green-400", children: "\u2713" }))] }, response.id))), coordination.responses.length > 8 && (_jsxs("span", { className: "text-xs text-gray-400 px-2 py-1", children: ["+", coordination.responses.length - 8, " more"] }))] }) })), _jsx("div", { className: "flex items-center gap-2", children: userResponse ? (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "text-gray-400", children: "You're" }), _jsx("span", { className: cn("px-2 py-1 rounded text-xs border", userResponse.responseType === 'going' ? 'text-green-400 bg-green-500/20 border-green-500/30' :
                                userResponse.responseType === 'interested' ? 'text-blue-400 bg-blue-500/20 border-blue-500/30' :
                                    userResponse.responseType === 'maybe' ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' :
                                        'text-gray-400 bg-gray-500/20 border-gray-500/30'), children: userResponse.responseType.replace('_', ' ') }), _jsx(motion.button, { className: "text-xs text-blue-400 hover:text-blue-300 transition-colors", onClick: () => setShowResponseForm(true), whileHover: { scale: 1.02 }, children: "Change" })] })) : (_jsx(motion.button, { className: "px-3 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all text-sm", onClick: () => setShowResponseForm(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "I'm Interested" })) }), showResponseForm && (_jsx(motion.div, { className: "mt-3 p-3 bg-white/5 border border-white/10 rounded-lg", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: ['interested', 'going', 'maybe', 'cant_make_it'].map((type) => (_jsx(motion.button, { className: cn("px-3 py-1 rounded text-xs border transition-all", responseType === type
                                    ? 'text-blue-400 bg-blue-500/20 border-blue-500/30'
                                    : 'text-gray-400 bg-gray-500/20 border-gray-500/30 hover:text-[var(--hive-text-inverse)]'), onClick: () => setResponseType(type), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: type.replace('_', ' ') }, type))) }), _jsx("textarea", { className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-inverse)] placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors", placeholder: "Add a message (optional)...", rows: 2, value: responseMessage, onChange: (e) => setResponseMessage(e.target.value) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(motion.button, { className: "px-3 py-1 bg-gray-600 hover:bg-gray-700 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors", onClick: () => {
                                        setShowResponseForm(false);
                                        setResponseMessage('');
                                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Cancel" }), _jsx(motion.button, { className: "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors disabled:opacity-50", onClick: handleResponse, disabled: isSubmitting, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-3 h-3 mr-1 inline animate-spin" }), "Submitting..."] })) : ('Submit Response') })] })] }) }))] }));
};
// Comment Thread Component for nested replies
const CommentThread = ({ comment, onReply, level }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const maxLevel = 3; // Limit nesting depth
    const handleReply = () => {
        if (replyContent.trim()) {
            onReply(comment.id, replyContent.trim());
            setReplyContent('');
            setShowReplyInput(false);
        }
    };
    return (_jsxs("div", { className: cn("relative", level > 0 && "ml-8 pl-4 border-l border-white/10"), children: [_jsxs("div", { className: "flex gap-3 mb-3", children: [_jsx("div", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-gray-600 overflow-hidden", children: comment.author?.photoURL ? (_jsx("img", { src: comment.author.photoURL, alt: "", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: comment.author?.fullName?.charAt(0).toUpperCase() || 'U' }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] text-sm", children: comment.author?.fullName || 'Unknown User' }), _jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("time", { className: "text-xs text-gray-400", children: new Date(comment.createdAt instanceof Date ? comment.createdAt : comment.createdAt.toDate()).toLocaleDateString() }), comment.isEdited && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("span", { className: "text-xs text-gray-400", children: "edited" })] }))] }), _jsx("div", { className: "text-sm text-gray-300 mb-2", children: comment.content }), _jsxs("div", { className: "flex items-center gap-4 text-xs", children: [_jsxs(motion.button, { className: "flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Heart, { className: "w-3 h-3" }), _jsx("span", { children: comment.reactions?.heart || 0 })] }), level < maxLevel && (_jsx(motion.button, { className: "text-gray-400 hover:text-blue-400 transition-colors", onClick: () => setShowReplyInput(!showReplyInput), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Reply" }))] }), showReplyInput && (_jsx(motion.div, { className: "mt-3", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: _jsxs("div", { className: "flex gap-2", children: [_jsx("textarea", { className: "flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors", placeholder: `Reply to ${comment.author?.fullName || 'user'}...`, rows: 2, value: replyContent, onChange: (e) => setReplyContent(e.target.value) }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(motion.button, { className: "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors", onClick: handleReply, disabled: !replyContent.trim(), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Reply" }), _jsx(motion.button, { className: "px-3 py-1 bg-gray-600 hover:bg-gray-700 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors", onClick: () => {
                                                        setShowReplyInput(false);
                                                        setReplyContent('');
                                                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Cancel" })] })] }) }))] })] }), comment.replies && comment.replies.length > 0 && (_jsx("div", { className: "space-y-3", children: comment.replies.map((reply) => (_jsx(CommentThread, { comment: reply, onReply: onReply, level: level + 1 }, reply.id))) }))] }));
};
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
// Post types with HIVE design patterns - Enhanced for Campus Coordination
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
    // NEW: Campus Coordination Post Types
    study_session: {
        icon: Users,
        label: 'Study Session',
        color: 'text-blue-400',
        description: 'Organize study groups',
        coordinationType: 'study_session'
    },
    food_run: {
        icon: Users,
        label: 'Food Run',
        color: 'text-orange-400',
        description: 'Coordinate food orders',
        coordinationType: 'food_run'
    },
    activity: {
        icon: Calendar,
        label: 'Activity',
        color: 'text-green-400',
        description: 'Plan group activities',
        coordinationType: 'activity'
    },
    ride_share: {
        icon: Users,
        label: 'Ride Share',
        color: 'text-purple-400',
        description: 'Share transportation',
        coordinationType: 'ride_share'
    },
    meetup: {
        icon: Users,
        label: 'Meetup',
        color: 'text-pink-400',
        description: 'Quick meetups',
        coordinationType: 'meetup'
    },
};
// Helper function to get auth token from session storage
const getAuthToken = () => {
    if (typeof window === 'undefined')
        return null;
    try {
        const sessionJson = localStorage.getItem('hive_session');
        if (sessionJson) {
            const session = JSON.parse(sessionJson);
            return process.env.NODE_ENV === 'development'
                ? `dev_token_${session.uid}`
                : session.token;
        }
    }
    catch (error) {
        console.error('Error getting session:', error);
    }
    return null;
};
// API function to fetch posts
const fetchPosts = async (spaceId, limit = 20) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('No authentication token available');
    }
    const response = await fetch(`/api/spaces/${spaceId}/posts?limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const data = await response.json();
    return data.posts || [];
};
export const HivePostsSurface = React.forwardRef(({ className, mode, space, posts: propPosts, isBuilder = false, canPost = true, canModerate = false, leaderMode = null, onCreatePost, onLikePost, onReplyToPost, onCreateComment, onLoadComments, onSharePost, onPinPost, onDeletePost, onLockPost, onViewPost, onCoordinationResponse, onUpdateCoordinationStatus, sortBy = 'recent', showFilters = true, maxPosts = 10, autoFetch = true, authToken, usePlatformIntegration = true, showLiveActivity = false, liveActivityCount = 0, onActivityUpdate, currentUserId, ...props }, ref) => {
    const [hoveredPost, setHoveredPost] = useState(null);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [currentSort, setCurrentSort] = useState(sortBy);
    const [expandedPosts, setExpandedPosts] = useState(new Set());
    const [fetchedPosts, setFetchedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    const [expandedComments, setExpandedComments] = useState(new Set());
    const [commentText, setCommentText] = useState({});
    const [replyText, setReplyText] = useState({});
    const [loadingComments, setLoadingComments] = useState(new Set());
    // Fetch posts from API if autoFetch is enabled
    useEffect(() => {
        if (!autoFetch || !space?.id)
            return;
        const loadPosts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const posts = await fetchPosts(space.id, maxPosts);
                setFetchedPosts(posts);
            }
            catch (error) {
                console.error('Failed to fetch posts:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch posts');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadPosts();
    }, [autoFetch, space?.id, maxPosts]);
    // Use either provided posts or fetched posts
    const posts = propPosts || fetchedPosts;
    // Normalize post data and sort posts
    const normalizedPosts = posts.map(post => ({
        ...post,
        // Normalize date fields
        createdAt: post.createdAt && typeof post.createdAt === 'object' && 'toDate' in post.createdAt
            ? post.createdAt.toDate()
            : post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt),
        updatedAt: post.updatedAt && typeof post.updatedAt === 'object' && 'toDate' in post.updatedAt
            ? post.updatedAt.toDate()
            : post.updatedAt instanceof Date ? post.updatedAt : new Date(post.updatedAt),
        // Use real author data or fallback to legacy fields
        authorName: post.author?.fullName || post.authorName || 'Unknown User',
        authorAvatar: post.author?.photoURL || post.authorAvatar,
        // Use real reaction data or fallback to legacy fields
        likes: post.reactions?.heart || post.likes || 0,
        replies: post.replies || 0,
        views: post.views || 0,
        // Ensure boolean fields are properly set
        isPinned: post.isPinned || false,
        isLocked: post.isLocked || false,
        tags: post.tags || [],
        // Map type if needed
        type: post.type || 'discussion',
        // Create title from content if not provided
        title: post.title || post.content.slice(0, 100) + (post.content.length > 100 ? '...' : ''),
    }));
    const sortedPosts = normalizedPosts
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
    // Loading state
    if (isLoading) {
        return (_jsx("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: _jsx("div", { className: "space-y-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-5 animate-pulse", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gray-600 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-4 bg-gray-600 rounded mb-2 w-32" }), _jsx("div", { className: "h-3 bg-gray-700 rounded w-24" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-600 rounded" }), _jsx("div", { className: "h-4 bg-gray-600 rounded w-3/4" }), _jsx("div", { className: "h-4 bg-gray-600 rounded w-1/2" })] })] }, i))) }) }));
    }
    // Error state
    if (error) {
        return (_jsx("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(MessageSquare, { className: "w-8 h-8 text-red-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: "Unable to Load Posts" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed", children: error }), _jsx(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium", onClick: () => {
                            setError(null);
                            setIsLoading(true);
                            // Retry fetching
                            if (autoFetch && space?.id) {
                                fetchPosts(space.id, maxPosts)
                                    .then(setFetchedPosts)
                                    .catch(e => setError(e.message))
                                    .finally(() => setIsLoading(false));
                            }
                        }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Try Again" })] }) }));
    }
    // Empty state
    if (posts.length === 0) {
        return (_jsx("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: _jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx(motion.div, { className: "w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-2xl flex items-center justify-center", whileHover: { scale: 1.05, rotate: 5 }, transition: { duration: motionDurations.quick }, children: _jsx(MessageSquare, { className: "w-8 h-8 text-blue-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-3", children: "Start the Conversation" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed", children: "This Space is ready for discussions! Share questions, ideas, and connect with the community through posts and threads." }), canPost && (_jsxs(motion.button, { className: "inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium", onClick: () => setShowCreateMenu(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), "Create First Post"] }))] }) }));
    }
    return (_jsxs("div", { ref: ref, className: cn(hivePostsSurfaceVariants({ mode, className })), ...props, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Posts" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: [posts.length, " discussions"] }), showLiveActivity && liveActivityCount && liveActivityCount > 0 && (_jsxs(motion.div, { className: "flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full", initial: { opacity: 0, scale: 0.8 }, animate: {
                                    opacity: 1,
                                    scale: [1, 1.05, 1]
                                }, transition: {
                                    opacity: { duration: 0.3 },
                                    scale: { repeat: Infinity, duration: 2 }
                                }, children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsxs("span", { className: "text-xs text-green-300", children: [liveActivityCount, " active now"] })] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [showFilters && (_jsxs("select", { value: currentSort, onChange: (e) => setCurrentSort(e.target.value), className: "bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hive-status-info)]/50", children: [_jsx("option", { value: "recent", children: "Recent" }), _jsx("option", { value: "popular", children: "Popular" }), _jsx("option", { value: "trending", children: "Trending" })] })), canPost && (_jsxs("div", { className: "relative", children: [_jsxs(motion.button, { className: "flex items-center gap-2 px-4 py-2 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium", onClick: () => setShowCreateMenu(!showCreateMenu), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "New Post" })] }), _jsx(AnimatePresence, { children: showCreateMenu && (_jsx(motion.div, { className: "absolute top-full right-0 mt-2 w-64 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: motionDurations.quick }, children: _jsx("div", { className: "p-2", children: Object.entries(postTypes).map(([type, config]) => {
                                                    const Icon = config.icon;
                                                    return (_jsxs(motion.button, { className: "w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", onClick: () => handleCreatePost(type), whileHover: { x: 4 }, children: [_jsx(Icon, { className: cn("w-5 h-5", config.color) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: config.label }), _jsx("div", { className: "text-xs text-gray-400", children: config.description })] })] }, type));
                                                }) }) })) })] }))] })] }), _jsx("div", { className: "space-y-4", children: sortedPosts.map((post, index) => {
                    const typeConfig = postTypes[post.type];
                    const TypeIcon = typeConfig.icon;
                    const isHovered = hoveredPost === post.id;
                    const isExpanded = expandedPosts.has(post.id);
                    return (_jsxs(motion.article, { className: cn("relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200", isHovered && "border-white/10", post.isPinned && "ring-1 ring-yellow-500/30 bg-yellow-500/5", mode === 'edit' && "hover:ring-2 hover:ring-blue-500/30"), onMouseEnter: () => setHoveredPost(post.id), onMouseLeave: () => setHoveredPost(null), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, layout: true, children: [post.isPinned && (_jsx(motion.div, { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/50 to-yellow-500/20", initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: index * 0.05 + 0.2 } })), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 overflow-hidden", children: post.authorAvatar ? (_jsx("img", { src: post.authorAvatar, alt: "", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: post.authorName.charAt(0).toUpperCase() }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] text-sm", children: post.authorName }), _jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("time", { className: "text-xs text-gray-400", children: new Date(post.createdAt).toLocaleDateString() }), post.isPinned && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-yellow-400", children: [_jsx(Pin, { className: "w-3 h-3" }), _jsx("span", { children: "Pinned" })] })] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TypeIcon, { className: cn("w-4 h-4", typeConfig.color) }), _jsx("span", { className: "text-xs text-gray-400", children: typeConfig.label }), post.tags.length > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("div", { className: "flex items-center gap-1", children: post.tags.slice(0, 2).map((tag, i) => (_jsx("span", { className: "text-xs bg-[var(--hive-text-primary)]/5 px-2 py-0.5 rounded text-gray-300", children: tag }, i))) })] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [(canModerate || leaderMode === 'moderate') && (_jsx(AnimatePresence, { children: (isHovered || mode === 'edit' || leaderMode === 'moderate') && (_jsxs(motion.div, { className: "flex items-center gap-1", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, children: [_jsx(motion.button, { className: cn("p-1.5 rounded-lg transition-all duration-200", leaderMode === 'moderate'
                                                                        ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30"
                                                                        : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"), onClick: () => onPinPost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Pin, { className: "w-3.5 h-3.5" }) }), onLockPost && (_jsx(motion.button, { className: cn("p-1.5 rounded-lg transition-all duration-200", leaderMode === 'moderate'
                                                                        ? "text-orange-400 bg-orange-500/20 border border-orange-500/30"
                                                                        : "text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"), onClick: () => onLockPost(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Lock, { className: "w-3.5 h-3.5" }) })), _jsx(motion.button, { className: cn("p-1.5 rounded-lg transition-all duration-200", leaderMode === 'moderate'
                                                                        ? "text-red-400 bg-red-500/20 border border-red-500/30"
                                                                        : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"), onClick: () => onDeletePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) }), leaderMode === 'moderate' && (_jsx(motion.div, { className: "ml-2 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400", initial: { opacity: 0 }, animate: { opacity: 1 }, children: "Moderate" }))] })) })), _jsx(motion.button, { className: "p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] text-base leading-snug", children: post.title }), _jsx("div", { className: cn("text-sm text-gray-300 leading-relaxed", !isExpanded && "line-clamp-3"), children: post.content }), post.content.length > 200 && (_jsx(motion.button, { className: "text-xs text-blue-400 hover:text-blue-300 transition-colors", onClick: () => togglePostExpansion(post.id), whileHover: { scale: 1.02 }, children: isExpanded ? 'Show less' : 'Read more' })), post.pollOptions && (_jsx("div", { className: "space-y-2", children: post.pollOptions.map((option, i) => (_jsxs(motion.div, { className: "relative p-3 bg-[var(--hive-text-primary)]/5 rounded-lg cursor-pointer hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200", whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: option.text }), _jsxs("span", { className: "text-xs text-gray-400", children: [option.votes, " votes"] })] }), _jsx("div", { className: "absolute bottom-0 left-0 h-0.5 bg-purple-500/50 rounded-full", style: {
                                                                width: `${(option.votes / Math.max(...post.pollOptions.map(o => o.votes))) * 100}%`
                                                            } })] }, option.id))) })), post.linkPreview && (_jsx(motion.div, { className: "p-3 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/5", whileHover: { scale: 1.01 }, children: _jsxs("div", { className: "flex gap-3", children: [post.linkPreview.imageUrl && (_jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0", children: _jsx("img", { src: post.linkPreview.imageUrl, alt: "", className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)] truncate", children: post.linkPreview.title }), _jsx("p", { className: "text-xs text-gray-400 line-clamp-2 mt-1", children: post.linkPreview.description }), _jsx("span", { className: "text-xs text-blue-400 mt-1 block", children: post.linkPreview.domain })] })] }) }))] }), _jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-white/5", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors", onClick: () => onLikePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Heart, { className: "w-4 h-4" }), _jsx("span", { children: post.likes })] }), _jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors", onClick: () => {
                                                            if (expandedComments.has(post.id)) {
                                                                setExpandedComments(prev => {
                                                                    const newSet = new Set(prev);
                                                                    newSet.delete(post.id);
                                                                    return newSet;
                                                                });
                                                            }
                                                            else {
                                                                setExpandedComments(prev => new Set([...prev, post.id]));
                                                            }
                                                        }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Reply, { className: "w-4 h-4" }), _jsx("span", { children: post.replyCount || post.replies || 0 }), _jsx("span", { className: "ml-1", children: expandedComments.has(post.id) ? 'Hide' : 'Reply' })] }), _jsxs(motion.button, { className: "flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors", onClick: () => onSharePost?.(post.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Share2, { className: "w-4 h-4" }), _jsx("span", { children: "Share" })] })] }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), _jsx("span", { children: post.views })] }), _jsx(motion.button, { className: "p-1 hover:text-yellow-400 transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Bookmark, { className: "w-3 h-3" }) })] })] }), post.coordinationData && (_jsx(CoordinationSection, { post: post, onCoordinationResponse: onCoordinationResponse, onUpdateStatus: onUpdateCoordinationStatus, currentUserId: currentUserId })), expandedComments.has(post.id) && (_jsxs(motion.div, { className: "mt-4 pt-4 border-t border-white/5", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: [_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 overflow-hidden", children: _jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: "U" }) }) }), _jsxs("div", { className: "flex-1", children: [_jsx("textarea", { className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors", placeholder: "Add a comment...", rows: 2, value: commentText[post.id] || '', onChange: (e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value })) }), commentText[post.id]?.trim() && (_jsx("div", { className: "flex justify-end mt-2", children: _jsxs(motion.button, { className: "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors", onClick: async () => {
                                                                            if (onCreateComment && commentText[post.id]?.trim()) {
                                                                                try {
                                                                                    await onCreateComment(post.id, commentText[post.id].trim());
                                                                                    setCommentText(prev => ({ ...prev, [post.id]: '' }));
                                                                                    // Refresh comments if needed
                                                                                    if (onLoadComments) {
                                                                                        const comments = await onLoadComments(post.id);
                                                                                        // Update post with new comments - would need state management
                                                                                    }
                                                                                }
                                                                                catch (error) {
                                                                                    console.error('Failed to create comment:', error);
                                                                                }
                                                                            }
                                                                        }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Send, { className: "w-3 h-3 mr-1 inline" }), "Comment"] }) }))] })] }) }), post.comments && post.comments.length > 0 && (_jsx("div", { className: "space-y-3", children: post.comments.map((comment) => (_jsx(CommentThread, { comment: comment, onReply: (commentId, content) => {
                                                        if (onCreateComment) {
                                                            onCreateComment(post.id, content, commentId);
                                                        }
                                                    }, level: 0 }, comment.id))) })), !post.comments && (post.replyCount || post.replies) > 0 && (_jsx("div", { className: "text-center", children: _jsx(motion.button, { className: "text-sm text-blue-400 hover:text-blue-300 transition-colors", onClick: async () => {
                                                        if (onLoadComments && !loadingComments.has(post.id)) {
                                                            setLoadingComments(prev => new Set([...prev, post.id]));
                                                            try {
                                                                const comments = await onLoadComments(post.id);
                                                                // Would need to update the post with comments in parent state
                                                            }
                                                            catch (error) {
                                                                console.error('Failed to load comments:', error);
                                                            }
                                                            finally {
                                                                setLoadingComments(prev => {
                                                                    const newSet = new Set(prev);
                                                                    newSet.delete(post.id);
                                                                    return newSet;
                                                                });
                                                            }
                                                        }
                                                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: loadingComments.has(post.id) ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 inline animate-spin" }), "Loading comments..."] })) : (_jsxs(_Fragment, { children: ["View ", post.replyCount || post.replies, " ", (post.replyCount || post.replies) === 1 ? 'comment' : 'comments'] })) }) }))] }))] })] }, post.id));
                }) }), isBuilder && mode === 'edit' && (_jsx(motion.div, { className: "mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, transition: { delay: 0.5 }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Crown, { className: "w-5 h-5 text-blue-400 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-blue-400 mb-1", children: "Builder Mode Active" }), _jsx("p", { className: "text-xs text-blue-300/80", children: "Posts drive community engagement. Enable posting Tools to let members share ideas, ask questions, and build connections." })] })] }) }))] }));
});
HivePostsSurface.displayName = "HivePostsSurface";
export { hivePostsSurfaceVariants, postTypes };
//# sourceMappingURL=hive-posts-surface.js.map