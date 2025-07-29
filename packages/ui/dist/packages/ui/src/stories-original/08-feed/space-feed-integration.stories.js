import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FeedComposer } from '../../components/feed/feed-composer';
import { PostCard } from '../../components/feed/post-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
const meta = {
    title: '08-Feed/Space Feed Integration',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Space Feed Integration

Complete feed experience within HIVE spaces, demonstrating how the feed components work together to create a seamless content creation and consumption experience.

## Feed Components

1. **Feed Composer** - Create new posts, questions, and content
2. **Post Cards** - Display individual posts with interactions
3. **Space Feed** - Infinite scroll feed with real-time updates
4. **Feed Filters** - Sort and filter content by type and relevance
5. **Moderation Tools** - Content moderation and management features

## Integration Features

- **Real-time Updates** - Live feed updates and notifications
- **Optimistic Updates** - Immediate UI feedback for actions
- **Infinite Scroll** - Seamless content loading
- **Rich Interactions** - Reactions, comments, sharing
- **Content Moderation** - Pin, hide, delete posts
- **Contextual Actions** - Role-based action availability

## When to Use

- **Space Interior** - Main content area of a space
- **Content Creation** - Member content creation workflows
- **Content Consumption** - Member content browsing experience
- **Moderation Workflows** - Builder content management
- **Real-time Collaboration** - Live community discussions
        `,
            },
        },
    },
};
export default meta;
// Mock data for feed integration
const mockUser = {
    id: 'user123',
    name: 'Alex Chen',
    email: 'alex.chen@stanford.edu',
    avatar: '/api/placeholder/40/40',
    role: 'builder',
};
const mockSpace = {
    id: 'space123',
    name: 'Stanford CS Study Group',
    memberCount: 156,
    isBuilder: true,
};
const mockPosts = [
    {
        id: 'post1',
        author: {
            id: 'user1',
            name: 'Sarah Miller',
            avatar: '/api/placeholder/40/40',
            role: 'builder',
        },
        content: '📚 Just uploaded the complete CS106B study guide with practice problems and solutions. Perfect for the upcoming midterm!',
        timestamp: new Date('2024-01-20T14:30:00'),
        type: 'text',
        reactions: { heart: 18, helpful: 12 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [
            {
                id: 'comment1',
                author: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
                content: 'This is exactly what I needed! Thank you so much!',
                timestamp: new Date('2024-01-20T14:35:00'),
            },
            {
                id: 'comment2',
                author: { name: 'Emily Davis', avatar: '/api/placeholder/32/32' },
                content: 'The practice problems are really helpful. Great resource!',
                timestamp: new Date('2024-01-20T14:40:00'),
            },
        ],
        isPinned: true,
        isEdited: false,
        tags: ['study-guide', 'cs106b', 'midterm'],
    },
    {
        id: 'post2',
        author: {
            id: 'user2',
            name: 'John Smith',
            avatar: '/api/placeholder/40/40',
            role: 'member',
        },
        content: 'Can someone explain the difference between DFS and BFS? I keep getting confused about when to use each one. Any visual examples would be super helpful!',
        timestamp: new Date('2024-01-20T13:45:00'),
        type: 'question',
        reactions: { heart: 5, helpful: 8 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [
            {
                id: 'comment3',
                author: { name: 'Alex Chen', avatar: '/api/placeholder/32/32' },
                content: 'Great question! DFS goes deep first (think of exploring a maze by going as far as possible before backtracking), while BFS explores level by level (like ripples in a pond).',
                timestamp: new Date('2024-01-20T13:50:00'),
            },
        ],
        isPinned: false,
        isEdited: false,
        tags: ['algorithms', 'dfs', 'bfs', 'help-needed'],
    },
    {
        id: 'post3',
        author: {
            id: 'user3',
            name: 'Emily Davis',
            avatar: '/api/placeholder/40/40',
            role: 'member',
        },
        content: '🎯 Study session update: We\'ll be meeting tomorrow at 2 PM in the Gates Building, room 104. We\'ll focus on recursive algorithms and dynamic programming. Bring your laptops!',
        timestamp: new Date('2024-01-20T12:15:00'),
        type: 'event',
        reactions: { heart: 12, helpful: 6 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [
            {
                id: 'comment4',
                author: { name: 'David Wilson', avatar: '/api/placeholder/32/32' },
                content: 'I\'ll be there! Should we prepare any specific problems beforehand?',
                timestamp: new Date('2024-01-20T12:20:00'),
            },
        ],
        isPinned: false,
        isEdited: false,
        tags: ['study-session', 'algorithms', 'dp'],
    },
    {
        id: 'post4',
        author: {
            id: 'user4',
            name: 'David Wilson',
            avatar: '/api/placeholder/40/40',
            role: 'member',
        },
        content: 'Found this amazing visualization tool for sorting algorithms: https://visualgo.net/sorting - it really helped me understand quicksort and mergesort better!',
        timestamp: new Date('2024-01-20T11:30:00'),
        type: 'resource',
        reactions: { heart: 15, helpful: 20 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [
            {
                id: 'comment5',
                author: { name: 'Lisa Brown', avatar: '/api/placeholder/32/32' },
                content: 'This is gold! The step-by-step visualization makes it so much clearer.',
                timestamp: new Date('2024-01-20T11:35:00'),
            },
        ],
        isPinned: false,
        isEdited: false,
        tags: ['resource', 'visualization', 'sorting', 'algorithms'],
    },
];
const mockNotifications = [
    {
        id: 'notif1',
        type: 'new_post',
        message: 'Sarah Miller posted a new study guide',
        timestamp: new Date('2024-01-20T14:30:00'),
        read: false,
    },
    {
        id: 'notif2',
        type: 'comment',
        message: 'Mike Johnson commented on your post',
        timestamp: new Date('2024-01-20T14:35:00'),
        read: false,
    },
    {
        id: 'notif3',
        type: 'reaction',
        message: '3 people reacted to your question',
        timestamp: new Date('2024-01-20T13:50:00'),
        read: true,
    },
];
// Feed Filter Component
const FeedFilter = ({ activeFilter, onFilterChange, sortBy, onSortChange }) => (_jsxs("div", { className: "flex items-center justify-between p-4 border-b bg-[var(--hive-text-primary)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Filter:" }), ['all', 'questions', 'resources', 'events'].map((filter) => (_jsx("button", { onClick: () => onFilterChange(filter), className: `
            px-3 py-1 rounded-full text-sm transition-colors
            ${activeFilter === filter
                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `, children: filter.charAt(0).toUpperCase() + filter.slice(1) }, filter)))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Sort:" }), _jsxs("select", { value: sortBy, onChange: (e) => onSortChange(e.target.value), className: "px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "recent", children: "Most Recent" }), _jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "helpful", children: "Most Helpful" }), _jsx("option", { value: "commented", children: "Most Commented" })] })] })] }));
// Notification Badge Component
const NotificationBadge = ({ notifications, onToggle }) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    return (_jsx("div", { className: "relative", children: _jsxs("button", { onClick: onToggle, className: "relative p-2 text-gray-600 hover:text-gray-900 transition-colors", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDD14" }), unreadCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center", children: unreadCount }))] }) }));
};
export const CompleteFeedExperience = {
    render: () => {
        const [posts, setPosts] = useState(mockPosts);
        const [activeFilter, setActiveFilter] = useState('all');
        const [sortBy, setSortBy] = useState('recent');
        const [showNotifications, setShowNotifications] = useState(false);
        const [notifications, setNotifications] = useState(mockNotifications);
        const handleNewPost = (newPost) => {
            const post = {
                id: `post${posts.length + 1}`,
                author: mockUser,
                content: newPost.content,
                timestamp: new Date(),
                type: newPost.type || 'text',
                reactions: { heart: 0, helpful: 0 },
                reactedUsers: { heart: [], helpful: [] },
                comments: [],
                isPinned: false,
                isEdited: false,
                tags: newPost.tags || [],
            };
            setPosts([post, ...posts]);
        };
        const handleReaction = (postId, reactionType) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    const newReactions = { ...post.reactions };
                    newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
                    return { ...post, reactions: newReactions };
                }
                return post;
            }));
        };
        const handleComment = (postId, commentContent) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    const newComment = {
                        id: `comment${Date.now()}`,
                        author: mockUser,
                        content: commentContent,
                        timestamp: new Date(),
                    };
                    return { ...post, comments: [...post.comments, newComment] };
                }
                return post;
            }));
        };
        const handlePin = (postId) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return { ...post, isPinned: !post.isPinned };
                }
                return post;
            }));
        };
        const handleDelete = (postId) => {
            setPosts(posts.filter(post => post.id !== postId));
        };
        const filteredPosts = posts.filter(post => {
            if (activeFilter === 'all')
                return true;
            if (activeFilter === 'questions')
                return post.type === 'question';
            if (activeFilter === 'resources')
                return post.type === 'resource';
            if (activeFilter === 'events')
                return post.type === 'event';
            return true;
        });
        const sortedPosts = [...filteredPosts].sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return b.timestamp.getTime() - a.timestamp.getTime();
                case 'popular':
                    return (b.reactions.heart || 0) - (a.reactions.heart || 0);
                case 'helpful':
                    return (b.reactions.helpful || 0) - (a.reactions.helpful || 0);
                case 'commented':
                    return b.comments.length - a.comments.length;
                default:
                    return 0;
            }
        });
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: mockSpace.name }), _jsxs("p", { className: "text-gray-600", children: [mockSpace.memberCount, " members"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(NotificationBadge, { notifications: notifications, onToggle: () => setShowNotifications(!showNotifications) }), _jsx(HiveBadge, { variant: "default", children: mockUser.role === 'builder' ? '🛠️ Builder' : '👤 Member' })] })] }) }), showNotifications && (_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Recent Notifications" }), _jsx("div", { className: "space-y-2", children: notifications.slice(0, 3).map((notification) => (_jsxs("div", { className: `
                        p-3 rounded-lg text-sm
                        ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}
                      `, children: [_jsx("div", { className: "font-medium", children: notification.message }), _jsx("div", { className: "text-gray-500 text-xs", children: notification.timestamp.toLocaleTimeString() })] }, notification.id))) })] }) })), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b", children: _jsx("div", { className: "p-4", children: _jsx(FeedComposer, { user: mockUser, onPost: handleNewPost, placeholder: "Share your thoughts, questions, or resources..." }) }) }), _jsx(FeedFilter, { activeFilter: activeFilter, onFilterChange: setActiveFilter, sortBy: sortBy, onSortChange: setSortBy }), _jsxs("div", { className: "bg-[var(--hive-text-primary)]", children: [_jsx("div", { className: "divide-y", children: sortedPosts.map((post) => (_jsx("div", { className: "p-4", children: _jsx(PostCard, { post: post, onReaction: (reactionType) => handleReaction(post.id, reactionType), onComment: (content) => handleComment(post.id, content), onPin: () => handlePin(post.id), onDelete: () => handleDelete(post.id), canModerate: mockUser.role === 'builder' }) }, post.id))) }), _jsx("div", { className: "p-4 text-center border-t", children: _jsx(HiveButton, { variant: "outline", children: "Load More Posts" }) })] })] }) }));
    },
};
export const FeedWithSurfaceIntegration = {
    render: () => {
        const [activeSurface, setActiveSurface] = useState('posts');
        const [posts, setPosts] = useState(mockPosts);
        const surfaces = [
            { id: 'pinned', name: 'Pinned', icon: '📌' },
            { id: 'posts', name: 'Posts', icon: '💬' },
            { id: 'events', name: 'Events', icon: '📅' },
            { id: 'tools', name: 'Tools', icon: '🔧' },
            { id: 'members', name: 'Members', icon: '👥' },
        ];
        const handleSurfaceChange = (surfaceId) => {
            setActiveSurface(surfaceId);
        };
        const getSurfaceContent = () => {
            switch (activeSurface) {
                case 'pinned':
                    return posts.filter(post => post.isPinned);
                case 'posts':
                    return posts.filter(post => !post.isPinned);
                case 'events':
                    return posts.filter(post => post.type === 'event');
                case 'tools':
                    return []; // Tools would be handled differently
                case 'members':
                    return []; // Members would be handled differently
                default:
                    return posts;
            }
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: mockSpace.name }), _jsx("p", { className: "text-gray-600", children: "6-Surface Architecture Demo" })] }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-64 bg-[var(--hive-text-primary)] border-r", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Surfaces" }), _jsx("div", { className: "space-y-1", children: surfaces.map((surface) => (_jsxs("button", { onClick: () => handleSurfaceChange(surface.id), className: `
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                        ${activeSurface === surface.id
                                                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                                    : 'text-gray-600 hover:bg-gray-100'}
                      `, children: [_jsx("span", { children: surface.icon }), _jsx("span", { className: "font-medium", children: surface.name })] }, surface.id))) })] }) }), _jsxs("div", { className: "flex-1", children: [activeSurface === 'posts' && (_jsxs("div", { children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx(FeedComposer, { user: mockUser, onPost: (newPost) => {
                                                        const post = {
                                                            id: `post${posts.length + 1}`,
                                                            author: mockUser,
                                                            content: newPost.content,
                                                            timestamp: new Date(),
                                                            type: newPost.type || 'text',
                                                            reactions: { heart: 0, helpful: 0 },
                                                            reactedUsers: { heart: [], helpful: [] },
                                                            comments: [],
                                                            isPinned: false,
                                                            isEdited: false,
                                                            tags: newPost.tags || [],
                                                        };
                                                        setPosts([post, ...posts]);
                                                    }, placeholder: "Share with the community..." }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] divide-y", children: getSurfaceContent().map((post) => (_jsx("div", { className: "p-4", children: _jsx(PostCard, { post: post, onReaction: () => { }, onComment: () => { }, onPin: () => { }, onDelete: () => { }, canModerate: mockUser.role === 'builder' }) }, post.id))) })] })), activeSurface === 'pinned' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)]", children: [_jsxs("div", { className: "p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "\uD83D\uDCCC Pinned Content" }), _jsx("p", { className: "text-gray-600", children: "Important announcements and resources" })] }), _jsx("div", { className: "divide-y", children: getSurfaceContent().map((post) => (_jsx("div", { className: "p-4 bg-[var(--hive-brand-secondary)]/5 border-l-4 border-hive-gold", children: _jsx(PostCard, { post: post, onReaction: () => { }, onComment: () => { }, onPin: () => { }, onDelete: () => { }, canModerate: mockUser.role === 'builder' }) }, post.id))) })] })), activeSurface === 'events' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)]", children: [_jsxs("div", { className: "p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "\uD83D\uDCC5 Events" }), _jsx("p", { className: "text-gray-600", children: "Upcoming study sessions and activities" })] }), _jsx("div", { className: "divide-y", children: getSurfaceContent().map((post) => (_jsx("div", { className: "p-4 bg-blue-50 border-l-4 border-blue-500", children: _jsx(PostCard, { post: post, onReaction: () => { }, onComment: () => { }, onPin: () => { }, onDelete: () => { }, canModerate: mockUser.role === 'builder' }) }, post.id))) })] })), activeSurface === 'tools' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)]", children: [_jsxs("div", { className: "p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "\uD83D\uDD27 Tools" }), _jsx("p", { className: "text-gray-600", children: "Collaborative tools and resources" })] }), _jsxs("div", { className: "p-8 text-center text-gray-500", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDD27" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Tools Surface" }), _jsx("p", { children: "Deployed tools and resources would appear here" })] })] })), activeSurface === 'members' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)]", children: [_jsxs("div", { className: "p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "\uD83D\uDC65 Members" }), _jsxs("p", { className: "text-gray-600", children: [mockSpace.memberCount, " community members"] })] }), _jsxs("div", { className: "p-8 text-center text-gray-500", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDC65" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Members Directory" }), _jsx("p", { children: "Member profiles and directory would appear here" })] })] }))] })] })] }) }));
    },
};
export const FeedModerationInterface = {
    render: () => {
        const [posts, setPosts] = useState(mockPosts);
        const [moderationMode, setModerationMode] = useState(false);
        const [selectedPosts, setSelectedPosts] = useState([]);
        const handleBulkAction = (action) => {
            if (action === 'pin') {
                setPosts(posts.map(post => selectedPosts.includes(post.id)
                    ? { ...post, isPinned: true }
                    : post));
            }
            else if (action === 'delete') {
                setPosts(posts.filter(post => !selectedPosts.includes(post.id)));
            }
            setSelectedPosts([]);
        };
        const handlePostSelect = (postId, selected) => {
            if (selected) {
                setSelectedPosts([...selectedPosts, postId]);
            }
            else {
                setSelectedPosts(selectedPosts.filter(id => id !== postId));
            }
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Content Moderation" }), _jsx("p", { className: "text-gray-600", children: moderationMode ? 'Bulk moderation mode' : 'Normal view' })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: moderationMode ? 'default' : 'outline', onClick: () => setModerationMode(!moderationMode), children: moderationMode ? 'Exit Moderation' : 'Moderation Mode' }), moderationMode && selectedPosts.length > 0 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-gray-600", children: [selectedPosts.length, " selected"] }), _jsx(HiveButton, { size: "sm", onClick: () => handleBulkAction('pin'), children: "Pin Selected" }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => handleBulkAction('delete'), children: "Delete Selected" })] }))] })] }) }), moderationMode && (_jsx("div", { className: "bg-blue-50 border border-blue-200 p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: posts.length }), _jsx("div", { className: "text-sm text-blue-800", children: "Total Posts" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: posts.filter(p => p.isPinned).length }), _jsx("div", { className: "text-sm text-green-800", children: "Pinned Posts" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: "0" }), _jsx("div", { className: "text-sm text-orange-800", children: "Flagged Posts" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: posts.reduce((sum, p) => sum + p.comments.length, 0) }), _jsx("div", { className: "text-sm text-purple-800", children: "Total Comments" })] })] }) })), _jsx("div", { className: "bg-[var(--hive-text-primary)] divide-y", children: posts.map((post) => (_jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [moderationMode && (_jsx("input", { type: "checkbox", checked: selectedPosts.includes(post.id), onChange: (e) => handlePostSelect(post.id, e.target.checked), className: "mt-1 text-[var(--hive-brand-secondary)]" })), _jsx("div", { className: "flex-1", children: _jsx(PostCard, { post: post, onReaction: () => { }, onComment: () => { }, onPin: () => {
                                                setPosts(posts.map(p => p.id === post.id
                                                    ? { ...p, isPinned: !p.isPinned }
                                                    : p));
                                            }, onDelete: () => {
                                                setPosts(posts.filter(p => p.id !== post.id));
                                            }, canModerate: true, moderationMode: moderationMode }) })] }) }, post.id))) })] }) }));
    },
};
export const FeedNotificationSystem = {
    render: () => {
        const [posts, setPosts] = useState(mockPosts);
        const [notifications, setNotifications] = useState(mockNotifications);
        const [liveActivity, setLiveActivity] = useState([]);
        const addLiveActivity = (activity) => {
            setLiveActivity(prev => [activity, ...prev.slice(0, 4)]);
        };
        const handleNewPost = (newPost) => {
            const post = {
                id: `post${posts.length + 1}`,
                author: mockUser,
                content: newPost.content,
                timestamp: new Date(),
                type: newPost.type || 'text',
                reactions: { heart: 0, helpful: 0 },
                reactedUsers: { heart: [], helpful: [] },
                comments: [],
                isPinned: false,
                isEdited: false,
                tags: newPost.tags || [],
            };
            setPosts([post, ...posts]);
            // Add live activity
            addLiveActivity({
                id: `activity${Date.now()}`,
                type: 'new_post',
                user: mockUser.name,
                content: newPost.content.substring(0, 50) + '...',
                timestamp: new Date(),
            });
            // Add notification
            const notification = {
                id: `notif${Date.now()}`,
                type: 'new_post',
                message: `${mockUser.name} created a new post`,
                timestamp: new Date(),
                read: false,
            };
            setNotifications([notification, ...notifications]);
        };
        const handleReaction = (postId, reactionType) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    const newReactions = { ...post.reactions };
                    newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
                    return { ...post, reactions: newReactions };
                }
                return post;
            }));
            // Add live activity
            addLiveActivity({
                id: `activity${Date.now()}`,
                type: 'reaction',
                user: mockUser.name,
                content: `reacted with ${reactionType}`,
                timestamp: new Date(),
            });
        };
        const handleComment = (postId, commentContent) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    const newComment = {
                        id: `comment${Date.now()}`,
                        author: mockUser,
                        content: commentContent,
                        timestamp: new Date(),
                    };
                    return { ...post, comments: [...post.comments, newComment] };
                }
                return post;
            }));
            // Add live activity
            addLiveActivity({
                id: `activity${Date.now()}`,
                type: 'comment',
                user: mockUser.name,
                content: commentContent.substring(0, 50) + '...',
                timestamp: new Date(),
            });
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "flex gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: mockSpace.name }), _jsx("p", { className: "text-gray-600", children: "Real-time feed with notifications" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-sm text-gray-600", children: "Live" })] })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx(FeedComposer, { user: mockUser, onPost: handleNewPost, placeholder: "Share something with the community..." }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] divide-y", children: posts.map((post) => (_jsx("div", { className: "p-4", children: _jsx(PostCard, { post: post, onReaction: (reactionType) => handleReaction(post.id, reactionType), onComment: (content) => handleComment(post.id, content), onPin: () => { }, onDelete: () => { }, canModerate: mockUser.role === 'builder' }) }, post.id))) })] }), _jsxs("div", { className: "w-80 space-y-4", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsxs("h3", { className: "font-semibold mb-3 flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), "Live Activity"] }), _jsx("div", { className: "space-y-3", children: liveActivity.length === 0 ? (_jsx("p", { className: "text-gray-500 text-sm", children: "No recent activity" })) : (liveActivity.map((activity) => (_jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium", children: activity.user }), _jsx("div", { className: "text-gray-600", children: activity.content }), _jsx("div", { className: "text-gray-500 text-xs", children: activity.timestamp.toLocaleTimeString() })] }, activity.id)))) })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsxs("h3", { className: "font-semibold mb-3 flex items-center justify-between", children: ["Notifications", _jsxs("span", { className: "text-sm text-gray-500", children: [notifications.filter(n => !n.read).length, " unread"] })] }), _jsx("div", { className: "space-y-3", children: notifications.slice(0, 5).map((notification) => (_jsxs("div", { className: `
                        p-3 rounded-lg text-sm
                        ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}
                      `, children: [_jsx("div", { className: "font-medium", children: notification.message }), _jsx("div", { className: "text-gray-500 text-xs", children: notification.timestamp.toLocaleTimeString() })] }, notification.id))) })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Activity" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Posts today" }), _jsx("span", { className: "font-medium", children: "12" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Active members" }), _jsx("span", { className: "font-medium", children: "89" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Comments today" }), _jsx("span", { className: "font-medium", children: "47" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Reactions today" }), _jsx("span", { className: "font-medium", children: "156" })] })] })] })] })] }) }) }));
    },
};
//# sourceMappingURL=space-feed-integration.stories.js.map