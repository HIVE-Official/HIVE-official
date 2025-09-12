"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '../atoms/index.js';
import { Card } from '../molecules/index.js';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, User, Hash, ArrowUp, RefreshCw, Calendar, Target, Users, Sparkles, Award, Filter } from 'lucide-react';
export function ActivityFeed({ feedType = 'personal', userId, spaceFilter = [], className = '' }) {
    const [feedState, setFeedState] = useState({
        posts: [],
        isLoading: true,
        isLoadingMore: false,
        hasMore: true,
        error: null,
        lastUpdated: null
    });
    const [filters, setFilters] = useState({
        postTypes: [],
        timeRange: 'week',
        spaces: spaceFilter,
        sortBy: 'recent'
    });
    const [showFilters, setShowFilters] = useState(false);
    // Mock feed data based on ritual-seeded platform
    const generateMockPosts = useCallback(() => {
        return [
            {
                id: '1',
                type: 'tool_success',
                title: 'New Study Group Matcher Success!',
                content: 'The Study Group Matcher tool just formed a new CS study group for Data Structures! 8 students matched based on schedule compatibility and learning preferences. First meeting is tomorrow at 2 PM in the library.',
                author: {
                    id: 'system_hive',
                    name: 'HIVE Tools',
                    handle: '@hive_tools',
                    isVerified: true,
                    badges: ['system']
                },
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                spaceName: 'Computer Science',
                spaceId: 'cs_study_group',
                attachments: [
                    {
                        type: 'tool',
                        title: 'Study Group Matcher',
                        description: 'AI-powered tool for forming optimal study groups'
                    }
                ],
                engagement: {
                    likes: 24,
                    comments: 8,
                    shares: 12,
                    views: 156,
                    hasLiked: false,
                    hasBookmarked: true
                },
                metadata: {
                    toolName: 'Study Group Matcher',
                    collaborators: ['alex_chen', 'sarah_kim', 'jordan_lee']
                }
            },
            {
                id: '2',
                type: 'space_event',
                title: 'CS Study Circle Weekly Meetup',
                content: 'Join us for our weekly study session! This week we\'re focusing on algorithm optimization and dynamic programming. Bring your laptops and any specific problems you\'re working on.',
                author: {
                    id: 'sarah_chen',
                    name: 'Sarah Chen',
                    handle: '@sarah_codes',
                    isVerified: true,
                    badges: ['space_leader']
                },
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                spaceName: 'CS Study Circle',
                spaceId: 'cs_study_circle',
                attachments: [
                    {
                        type: 'event',
                        title: 'Weekly Study Session',
                        description: 'Thursday 6 PM - NSC 225'
                    }
                ],
                engagement: {
                    likes: 18,
                    comments: 15,
                    shares: 6,
                    views: 89,
                    hasLiked: true,
                    hasBookmarked: false
                },
                metadata: {
                    eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                }
            },
            {
                id: '3',
                type: 'ritual_milestone',
                title: 'Campus Milestone Reached!',
                content: '🎉 Amazing news! Our campus community has reached 1,500 students who completed their summer rituals. The Initialize ritual has a 89% completion rate, and over 1,200 students have joined their spaces. We\'re building something incredible together!',
                author: {
                    id: 'hive_community',
                    name: 'HIVE Community',
                    handle: '@hive_campus',
                    isVerified: true,
                    badges: ['official']
                },
                createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                engagement: {
                    likes: 67,
                    comments: 23,
                    shares: 31,
                    views: 445,
                    hasLiked: false,
                    hasBookmarked: false
                },
                metadata: {
                    milestoneType: 'community_growth'
                }
            },
            {
                id: '4',
                type: 'collaboration',
                title: 'Cross-Space Research Project Forming',
                content: 'Exciting collaboration opportunity! Students from Pre-Med Society and Undergraduate Research are teaming up for a health informatics project. We\'re looking for CS students with interest in healthcare applications.',
                author: {
                    id: 'research_coordinator',
                    name: 'Dr. Amanda Torres',
                    handle: '@dr_torres',
                    isVerified: true,
                    badges: ['faculty', 'research']
                },
                createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                spaceName: 'Undergraduate Research',
                spaceId: 'undergrad_research',
                engagement: {
                    likes: 31,
                    comments: 19,
                    shares: 14,
                    views: 203,
                    hasLiked: false,
                    hasBookmarked: true
                },
                metadata: {
                    collaborators: ['pre_med_society', 'cs_study_circle']
                }
            },
            {
                id: '5',
                type: 'space_join',
                title: 'Welcome New Members!',
                content: 'Big welcome to the 12 new members who joined UB Hackers this week! 🚀 Don\'t forget to introduce yourselves in our #introductions channel and check out our upcoming hackathon prep sessions.',
                author: {
                    id: 'ub_hackers_admin',
                    name: 'Alex Rodriguez',
                    handle: '@alex_hacks',
                    badges: ['space_admin']
                },
                createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                spaceName: 'UB Hackers',
                spaceId: 'ub_hackers',
                engagement: {
                    likes: 22,
                    comments: 8,
                    shares: 4,
                    views: 67,
                    hasLiked: false,
                    hasBookmarked: false
                }
            }
        ];
    }, []);
    // Load posts with filters applied
    useEffect(() => {
        const loadPosts = async () => {
            setFeedState(prev => ({ ...prev, isLoading: true, error: null }));
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                let posts = generateMockPosts();
                // Apply filters
                if (filters.postTypes.length > 0) {
                    posts = posts.filter(post => filters.postTypes.includes(post.type));
                }
                if (filters.spaces.length > 0) {
                    posts = posts.filter(post => post.spaceId && filters.spaces.includes(post.spaceId));
                }
                // Apply time filter
                const now = new Date();
                const timeFilters = {
                    today: 24 * 60 * 60 * 1000,
                    week: 7 * 24 * 60 * 60 * 1000,
                    month: 30 * 24 * 60 * 60 * 1000,
                    all: Infinity
                };
                const timeLimit = timeFilters[filters.timeRange];
                posts = posts.filter(post => now.getTime() - new Date(post.createdAt).getTime() <= timeLimit);
                // Apply sorting
                switch (filters.sortBy) {
                    case 'popular':
                        posts.sort((a, b) => b.engagement.likes - a.engagement.likes);
                        break;
                    case 'trending':
                        posts.sort((a, b) => (b.engagement.likes + b.engagement.comments + b.engagement.shares) -
                            (a.engagement.likes + a.engagement.comments + a.engagement.shares));
                        break;
                    case 'recent':
                    default:
                        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }
                setFeedState(prev => ({
                    ...prev,
                    posts,
                    isLoading: false,
                    lastUpdated: new Date()
                }));
            }
            catch (error) {
                setFeedState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : 'Failed to load posts'
                }));
            }
        };
        loadPosts();
    }, [filters, generateMockPosts]);
    const handleLike = useCallback((postId) => {
        setFeedState(prev => ({
            ...prev,
            posts: prev.posts.map(post => post.id === postId
                ? {
                    ...post,
                    engagement: {
                        ...post.engagement,
                        likes: post.engagement.hasLiked
                            ? post.engagement.likes - 1
                            : post.engagement.likes + 1,
                        hasLiked: !post.engagement.hasLiked
                    }
                }
                : post)
        }));
    }, []);
    const handleBookmark = useCallback((postId) => {
        setFeedState(prev => ({
            ...prev,
            posts: prev.posts.map(post => post.id === postId
                ? {
                    ...post,
                    engagement: {
                        ...post.engagement,
                        hasBookmarked: !post.engagement.hasBookmarked
                    }
                }
                : post)
        }));
    }, []);
    const handleShare = useCallback((postId) => {
        if (navigator.share) {
            navigator.share({
                title: 'HIVE Post',
                url: `${window.location.origin}/post/${postId}`
            }).catch(() => {
                navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
            });
        }
        else {
            navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
        }
    }, []);
    const getPostIcon = (type) => {
        switch (type) {
            case 'space_event': return Calendar;
            case 'tool_success': return Target;
            case 'community_post': return MessageCircle;
            case 'ritual_milestone': return Award;
            case 'space_join': return Users;
            case 'collaboration': return Sparkles;
            default: return Hash;
        }
    };
    const getPostTypeColor = (type) => {
        switch (type) {
            case 'space_event': return 'text-blue-400';
            case 'tool_success': return 'text-hive-gold';
            case 'community_post': return 'text-green-400';
            case 'ritual_milestone': return 'text-purple-400';
            case 'space_join': return 'text-hive-brand-secondary';
            case 'collaboration': return 'text-pink-400';
            default: return 'text-hive-text-secondary';
        }
    };
    const formatTimeAgo = useCallback((timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        return 'Just now';
    }, []);
    const refreshFeed = useCallback(() => {
        setFeedState(prev => ({ ...prev, posts: [], hasMore: true }));
    }, []);
    if (feedState.error) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4", children: _jsx(User, { className: "h-6 w-6 text-[var(--hive-text-inverse)]" }) }), _jsx("p", { className: "text-[var(--hive-text-inverse)] mb-2", children: "Failed to load activity feed" }), _jsx("p", { className: "text-red-400 text-sm", children: feedState.error }), _jsx(Button, { onClick: refreshFeed, className: "mt-4 bg-hive-gold text-hive-obsidian", children: "Try Again" })] }) }));
    }
    if (feedState.isLoading) {
        return (_jsx("div", { className: "space-y-6", children: Array.from({ length: 3 }).map((_, i) => (_jsx(Card, { className: "p-6 animate-pulse", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-hive-surface-elevated rounded-full" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 w-32 bg-hive-surface-elevated rounded" }), _jsx("div", { className: "h-3 w-24 bg-hive-surface-elevated rounded" }), _jsxs("div", { className: "space-y-2 mt-4", children: [_jsx("div", { className: "h-4 w-full bg-hive-surface-elevated rounded" }), _jsx("div", { className: "h-4 w-3/4 bg-hive-surface-elevated rounded" })] })] })] }) }, i))) }));
    }
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-hive-text-primary", children: feedType === 'personal' ? 'Your Activity Feed' :
                                    feedType === 'campus' ? 'Campus Activity' :
                                        'Trending Now' }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Powered by your summer ritual preferences" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: refreshFeed, children: _jsx(RefreshCw, { className: "h-4 w-4" }) })] })] }), showFilters && (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Post Types" }), _jsx("div", { className: "space-y-2", children: ['space_event', 'tool_success', 'ritual_milestone', 'collaboration'].map(type => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: filters.postTypes.includes(type), onChange: (e) => {
                                                    if (e.target.checked) {
                                                        setFilters(prev => ({ ...prev, postTypes: [...prev.postTypes, type] }));
                                                    }
                                                    else {
                                                        setFilters(prev => ({ ...prev, postTypes: prev.postTypes.filter(t => t !== type) }));
                                                    }
                                                }, className: "mr-2" }), _jsx("span", { className: "text-sm text-hive-text-secondary capitalize", children: type.replace('_', ' ') })] }, type))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Time Range" }), _jsxs("select", { value: filters.timeRange, onChange: (e) => setFilters(prev => ({ ...prev, timeRange: e.target.value })), className: "w-full p-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary", children: [_jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "week", children: "This Week" }), _jsx("option", { value: "month", children: "This Month" }), _jsx("option", { value: "all", children: "All Time" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Sort By" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => setFilters(prev => ({ ...prev, sortBy: e.target.value })), className: "w-full p-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary", children: [_jsx("option", { value: "recent", children: "Most Recent" }), _jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "trending", children: "Trending" })] })] })] }) })), _jsxs("div", { className: "space-y-6", children: [feedState.posts.map((post) => {
                        const PostIcon = getPostIcon(post.type);
                        const typeColor = getPostTypeColor(post.type);
                        return (_jsxs(Card, { className: "p-6 hover:bg-hive-background-interactive transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-bold text-hive-obsidian", children: post.author.name.charAt(0) }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary", children: post.author.name }), post.author.isVerified && (_jsx("div", { className: "w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx(User, { className: "h-2 w-2 text-[var(--hive-text-inverse)]" }) })), _jsx(PostIcon, { className: `h-4 w-4 ${typeColor}` })] }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-hive-text-secondary", children: [_jsx("span", { children: post.author.handle }), post.spaceName && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: post.spaceName })] })), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTimeAgo(post.createdAt) })] })] })] }), _jsx(Button, { variant: "secondary", size: "sm", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: post.title }), _jsx("p", { className: "text-hive-text-secondary whitespace-pre-wrap", children: post.content })] }), post.attachments && post.attachments.length > 0 && (_jsx("div", { className: "mb-4", children: post.attachments.map((attachment, index) => (_jsx("div", { className: "p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${attachment.type === 'tool' ? 'bg-hive-gold/20' :
                                                        attachment.type === 'event' ? 'bg-blue-500/20' : 'bg-hive-surface-elevated'}`, children: [attachment.type === 'tool' && _jsx(Target, { className: "h-4 w-4 text-hive-gold" }), attachment.type === 'event' && _jsx(Calendar, { className: "h-4 w-4 text-blue-400" })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-hive-text-primary text-sm", children: attachment.title }), attachment.description && (_jsx("p", { className: "text-xs text-hive-text-secondary", children: attachment.description }))] })] }) }, index))) })), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-hive-border-subtle", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: () => handleLike(post.id), className: post.engagement.hasLiked ? '!text-red-400 !border-red-400' : '', children: [_jsx(Heart, { className: `h-4 w-4 mr-2 ${post.engagement.hasLiked ? 'fill-current' : ''}` }), post.engagement.likes] }), _jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-2" }), post.engagement.comments] }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => handleShare(post.id), children: [_jsx(Share, { className: "h-4 w-4 mr-2" }), post.engagement.shares] })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => handleBookmark(post.id), className: post.engagement.hasBookmarked ? '!text-hive-gold !border-hive-gold' : '', children: _jsx(Bookmark, { className: `h-4 w-4 ${post.engagement.hasBookmarked ? 'fill-current' : ''}` }) })] })] }, post.id));
                    }), feedState.hasMore && (_jsx("div", { className: "text-center py-8", children: _jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-hive-text-secondary mb-4", children: "You're all caught up!" }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: refreshFeed, className: "flex items-center mx-auto", children: [_jsx(ArrowUp, { className: "h-4 w-4 mr-2" }), "Back to Top"] })] }) }))] })] }));
}
//# sourceMappingURL=activity-feed.js.map