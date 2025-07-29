import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { motion } from 'framer-motion';
import { useState } from 'react';
const meta = {
    title: 'Spaces/Mobile Experience',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Mobile-optimized space experiences including responsive design, touch interactions, and mobile-specific features for HIVE spaces.',
            },
        },
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
export default meta;
// Mock data for mobile experience
const mockSpaces = [
    {
        id: 'cs-101',
        name: 'CS 101 Study Group',
        description: 'Collaborative learning space for Computer Science fundamentals',
        memberCount: 34,
        isJoined: true,
        lastActivity: '2 minutes ago',
        notifications: 3,
        surfaces: ['posts', 'events', 'tools'],
        image: '/api/placeholder/200/120'
    },
    {
        id: 'design-thinking',
        name: 'Design Thinking Workshop',
        description: 'Creative problem-solving and user experience design',
        memberCount: 18,
        isJoined: true,
        lastActivity: '15 minutes ago',
        notifications: 0,
        surfaces: ['posts', 'tools', 'members'],
        image: '/api/placeholder/200/120'
    },
    {
        id: 'startup-incubator',
        name: 'Startup Incubator',
        description: 'Building the next generation of student entrepreneurs',
        memberCount: 67,
        isJoined: false,
        lastActivity: '1 hour ago',
        notifications: 0,
        surfaces: ['posts', 'events', 'tools', 'chat'],
        image: '/api/placeholder/200/120'
    }
];
const mockPosts = [
    {
        id: '1',
        author: 'Sarah Chen',
        content: 'Just finished the React hooks assignment! The useEffect cleanup was tricky but finally got it working 🎉',
        timestamp: '5 minutes ago',
        likes: 12,
        comments: 3,
        isLiked: false
    },
    {
        id: '2',
        author: 'Mike Rodriguez',
        content: 'Study group meeting tomorrow at 2 PM in the library. We\'ll be covering recursion and dynamic programming.',
        timestamp: '1 hour ago',
        likes: 8,
        comments: 5,
        isLiked: true
    },
    {
        id: '3',
        author: 'Emma Thompson',
        content: 'Found this amazing visualization tool for algorithms. Check it out!',
        timestamp: '3 hours ago',
        likes: 15,
        comments: 7,
        isLiked: false
    }
];
export const MobileSpaceGrid = {
    render: () => {
        const [activeTab, setActiveTab] = useState('joined');
        return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsxs("div", { className: "bg-[var(--hive-text-primary)] border-b px-4 py-3 sticky top-0 z-10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-lg font-semibold", children: "My Spaces" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Search" }), _jsx(HiveButton, { variant: "primary", size: "sm", children: "Join" })] })] }), _jsxs("div", { className: "flex gap-1 mt-3", children: [_jsx("button", { onClick: () => setActiveTab('joined'), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'joined'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'}`, children: "Joined" }), _jsx("button", { onClick: () => setActiveTab('discover'), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'discover'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'}`, children: "Discover" }), _jsx("button", { onClick: () => setActiveTab('recent'), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'recent'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'}`, children: "Recent" })] })] }), _jsx("div", { className: "p-4 space-y-3", children: mockSpaces
                        .filter(space => activeTab === 'joined' ? space.isJoined : activeTab === 'discover' ? !space.isJoined : true)
                        .map((space) => (_jsx(motion.div, { whileTap: { scale: 0.98 }, transition: { duration: 0.1 }, children: _jsx(HiveCard, { className: "overflow-hidden", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" }), _jsxs("div", { className: "flex-1 p-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-sm leading-tight", children: space.name }), _jsx("p", { className: "text-xs text-gray-600 mt-1 line-clamp-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsxs("span", { className: "text-xs text-gray-500", children: [space.memberCount, " members"] }), _jsx("span", { className: "text-xs text-gray-400", children: "\u2022" }), _jsx("span", { className: "text-xs text-gray-500", children: space.lastActivity })] })] }), space.notifications > 0 && (_jsx(HiveBadge, { variant: "destructive", size: "sm", children: space.notifications }))] }), _jsx("div", { className: "flex gap-1 mt-2", children: space.surfaces.map((surface) => (_jsx("div", { className: "w-2 h-2 bg-blue-400 rounded-full" }, surface))) })] })] }) }) }, space.id))) })] }));
    },
};
export const MobileSpaceDetail = {
    render: () => {
        const [activeTab, setActiveTab] = useState('posts');
        const [showComposer, setShowComposer] = useState(false);
        return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsxs("div", { className: "bg-[var(--hive-text-primary)] border-b", children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-500 to-purple-600 h-24 relative", children: [_jsx("div", { className: "absolute inset-0 bg-[var(--hive-background-primary)] bg-opacity-20" }), _jsxs("div", { className: "absolute top-3 left-3 right-3 flex items-center justify-between", children: [_jsx(HiveButton, { variant: "outline", size: "sm", className: "text-[var(--hive-text-primary)] border-white", children: "\u2190 Back" }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "text-[var(--hive-text-primary)] border-white", children: "\u2699\uFE0F" })] })] }), _jsxs("div", { className: "px-4 py-3", children: [_jsx("h1", { className: "text-lg font-semibold", children: "CS 101 Study Group" }), _jsx("p", { className: "text-sm text-gray-600", children: "34 members \u2022 3 new notifications" }), _jsx("div", { className: "flex gap-1 mt-3 overflow-x-auto", children: ['posts', 'events', 'tools', 'members'].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${activeTab === tab
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'}`, children: tab.charAt(0).toUpperCase() + tab.slice(1) }, tab))) })] })] }), _jsxs("div", { className: "pb-16", children: [activeTab === 'posts' && (_jsx("div", { className: "p-4 space-y-3", children: mockPosts.map((post) => (_jsx(motion.div, { whileTap: { scale: 0.98 }, transition: { duration: 0.1 }, children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: post.author }), _jsx("p", { className: "text-xs text-gray-500", children: post.timestamp })] })] }), _jsx("p", { className: "text-sm mb-3", children: post.content }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [_jsxs("button", { className: `flex items-center gap-1 ${post.isLiked ? 'text-red-500' : ''}`, children: [_jsx("span", { children: post.isLiked ? '❤️' : '🤍' }), _jsx("span", { children: post.likes })] }), _jsxs("button", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCAC" }), _jsx("span", { children: post.comments })] }), _jsxs("button", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCE4" }), _jsx("span", { children: "Share" })] })] })] }) }) }, post.id))) })), activeTab === 'events' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-4 text-center", children: [_jsx("p", { className: "text-gray-500", children: "No upcoming events" }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "mt-2", children: "Create Event" })] }) }) })), activeTab === 'tools' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-4 text-center", children: [_jsx("p", { className: "text-gray-500", children: "No tools deployed" }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "mt-2", children: "Deploy Tool" })] }) }) })), activeTab === 'members' && (_jsx("div", { className: "p-4 space-y-2", children: Array.from({ length: 8 }).map((_, i) => (_jsx(HiveCard, { children: _jsxs("div", { className: "p-3 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "font-medium text-sm", children: ["Member ", i + 1] }), _jsx("p", { className: "text-xs text-gray-500", children: "Computer Science" })] }), _jsx(HiveBadge, { variant: "outline", size: "sm", children: i === 0 ? 'Builder' : 'Member' })] }) }, i))) }))] }), _jsx(motion.div, { className: "fixed bottom-6 right-6", whileTap: { scale: 0.9 }, children: _jsx(HiveButton, { variant: "primary", className: "w-14 h-14 rounded-full shadow-lg", onClick: () => setShowComposer(true), children: "+" }) }), showComposer && (_jsx(motion.div, { initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: '100%' }, className: "fixed inset-0 z-50 bg-[var(--hive-text-primary)]", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => setShowComposer(false), children: "Cancel" }), _jsx("h2", { className: "font-semibold", children: "Create Post" }), _jsx(HiveButton, { variant: "primary", size: "sm", children: "Post" })] }), _jsx("div", { className: "flex-1 p-4", children: _jsx("textarea", { className: "w-full h-32 p-3 border rounded-lg resize-none", placeholder: "What's happening in your space?", autoFocus: true }) }), _jsx("div", { className: "p-4 border-t", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { className: "text-2xl", children: "\uD83D\uDCF7" }), _jsx("button", { className: "text-2xl", children: "\uD83D\uDCCE" }), _jsx("button", { className: "text-2xl", children: "\uD83D\uDCCA" }), _jsx("button", { className: "text-2xl", children: "\uD83D\uDDD3\uFE0F" })] }) })] }) }))] }));
    },
};
export const MobileNavigation = {
    render: () => {
        const [activeTab, setActiveTab] = useState('spaces');
        return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b px-4 py-3 sticky top-0 z-10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-lg font-semibold", children: "HIVE" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "p-2 hover:bg-gray-100 rounded-full", children: "\uD83D\uDD0D" }), _jsx("button", { className: "p-2 hover:bg-gray-100 rounded-full", children: "\uD83D\uDD14" }), _jsx("button", { className: "p-2 hover:bg-gray-100 rounded-full", children: "\uD83D\uDC64" })] })] }) }), _jsxs("div", { className: "pb-16", children: [activeTab === 'spaces' && (_jsx("div", { className: "p-4 space-y-3", children: mockSpaces.map((space) => (_jsx(motion.div, { whileTap: { scale: 0.98 }, transition: { duration: 0.1 }, children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-semibold text-sm", children: space.name }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: space.description }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsxs("span", { className: "text-xs text-gray-500", children: [space.memberCount, " members"] }), space.notifications > 0 && (_jsx(HiveBadge, { variant: "destructive", size: "sm", children: space.notifications }))] })] }) }) }, space.id))) })), activeTab === 'feed' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsx("div", { className: "p-4 text-center", children: _jsx("p", { className: "text-gray-500", children: "Your personalized feed" }) }) }) })), activeTab === 'explore' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsx("div", { className: "p-4 text-center", children: _jsx("p", { className: "text-gray-500", children: "Discover new spaces" }) }) }) })), activeTab === 'create' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsx("div", { className: "p-4 text-center", children: _jsx("p", { className: "text-gray-500", children: "Create new content" }) }) }) })), activeTab === 'profile' && (_jsx("div", { className: "p-4", children: _jsx(HiveCard, { children: _jsx("div", { className: "p-4 text-center", children: _jsx("p", { className: "text-gray-500", children: "Your profile" }) }) }) }))] }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-[var(--hive-text-primary)] border-t", children: _jsx("div", { className: "flex", children: [
                            { id: 'spaces', label: 'Spaces', icon: '🏠' },
                            { id: 'feed', label: 'Feed', icon: '📰' },
                            { id: 'explore', label: 'Explore', icon: '🔍' },
                            { id: 'create', label: 'Create', icon: '➕' },
                            { id: 'profile', label: 'Profile', icon: '👤' }
                        ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex-1 py-3 px-2 text-center transition-colors ${activeTab === tab.id
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:bg-gray-50'}`, children: [_jsx("div", { className: "text-lg", children: tab.icon }), _jsx("div", { className: "text-xs mt-1", children: tab.label })] }, tab.id))) }) })] }));
    },
};
export const MobileTouchInteractions = {
    render: () => {
        const [swipeAction, setSwipeAction] = useState(null);
        const [longPressTarget, setLongPressTarget] = useState(null);
        const handleSwipe = (direction, item) => {
            setSwipeAction(`${direction} on ${item}`);
            setTimeout(() => setSwipeAction(null), 2000);
        };
        const handleLongPress = (item) => {
            setLongPressTarget(item);
            setTimeout(() => setLongPressTarget(null), 2000);
        };
        return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-4", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-lg font-semibold mb-2", children: "Touch Interactions" }), _jsx("p", { className: "text-sm text-gray-600", children: "Try swiping left/right on cards or long-pressing for actions" })] }), _jsxs("div", { className: "space-y-3 mb-6", children: [_jsx("h2", { className: "font-medium", children: "Swipe Actions" }), mockPosts.map((post) => (_jsx(motion.div, { drag: "x", dragConstraints: { left: -100, right: 100 }, onDragEnd: (event, info) => {
                                if (info.offset.x > 50) {
                                    handleSwipe('right', post.author);
                                }
                                else if (info.offset.x < -50) {
                                    handleSwipe('left', post.author);
                                }
                            }, whileDrag: { scale: 1.05 }, className: "relative", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: post.author }), _jsx("p", { className: "text-xs text-gray-500", children: post.timestamp })] })] }), _jsx("p", { className: "text-sm", children: post.content })] }) }) }, post.id)))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "font-medium", children: "Long Press Actions" }), mockSpaces.slice(0, 2).map((space) => (_jsx(motion.div, { onLongPress: () => handleLongPress(space.name), whileTap: { scale: 0.98 }, className: "relative", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-semibold text-sm", children: space.name }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: space.description }), _jsx("div", { className: "flex items-center justify-between mt-2", children: _jsxs("span", { className: "text-xs text-gray-500", children: [space.memberCount, " members"] }) })] }) }) }, space.id)))] }), swipeAction && (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 50 }, className: "fixed bottom-20 left-4 right-4 bg-[var(--hive-background-primary)] bg-opacity-80 text-[var(--hive-text-primary)] p-3 rounded-lg text-center", children: ["Swiped ", swipeAction] })), longPressTarget && (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 50 }, className: "fixed bottom-20 left-4 right-4 bg-[var(--hive-background-primary)] bg-opacity-80 text-[var(--hive-text-primary)] p-3 rounded-lg text-center", children: ["Long pressed on ", longPressTarget] }))] }));
    },
};
export const MobileResponsiveLayouts = {
    render: () => {
        const [viewMode, setViewMode] = useState('portrait');
        return (_jsxs("div", { className: `min-h-screen bg-gray-50 ${viewMode === 'landscape' ? 'flex' : ''}`, children: [_jsx("div", { className: "fixed top-4 right-4 z-10", children: _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => setViewMode(viewMode === 'portrait' ? 'landscape' : 'portrait'), children: viewMode === 'portrait' ? '↻ Landscape' : '↺ Portrait' }) }), viewMode === 'portrait' ? (
                // Portrait Layout
                _jsxs("div", { className: "flex flex-col h-screen", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx("h1", { className: "text-lg font-semibold", children: "Portrait Mode" }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: mockSpaces.map((space) => (_jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-semibold text-sm", children: space.name }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: space.description })] }) }, space.id))) })] })) : (
                // Landscape Layout
                _jsxs("div", { className: "flex w-full h-screen", children: [_jsxs("div", { className: "w-1/3 bg-[var(--hive-text-primary)] border-r overflow-y-auto", children: [_jsx("div", { className: "p-4 border-b", children: _jsx("h2", { className: "font-semibold", children: "Spaces" }) }), _jsx("div", { className: "p-2 space-y-2", children: mockSpaces.map((space) => (_jsxs("div", { className: "p-2 hover:bg-gray-50 rounded cursor-pointer", children: [_jsx("h3", { className: "font-medium text-sm", children: space.name }), _jsxs("p", { className: "text-xs text-gray-600", children: [space.memberCount, " members"] })] }, space.id))) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx("h1", { className: "text-lg font-semibold", children: "Landscape Mode" }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: mockPosts.map((post) => (_jsx(HiveCard, { children: _jsxs("div", { className: "p-3", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: post.author }), _jsx("p", { className: "text-xs text-gray-500", children: post.timestamp })] })] }), _jsx("p", { className: "text-sm", children: post.content })] }) }, post.id))) })] })] }))] }));
    },
};
//# sourceMappingURL=mobile-experience.stories.js.map