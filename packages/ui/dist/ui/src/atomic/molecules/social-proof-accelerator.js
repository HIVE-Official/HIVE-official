'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles, Eye, TrendingUp, Clock, Heart } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../atoms/hive-card.js';
import { SimpleAvatar } from '../atoms/simple-avatar.js';
// Mock data - replace with real API calls
const mockActivityData = [
    {
        id: '1',
        type: 'join',
        user: { name: 'Emma', avatar: '/avatars/emma.jpg', isAttractive: true, year: 'Junior', major: 'Psychology' },
        space: 'CS Study Group',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    },
    {
        id: '2',
        type: 'match',
        user: { name: 'Alex', avatar: '/avatars/alex.jpg', isAttractive: true, year: 'Sophomore', major: 'Engineering' },
        content: 'found their perfect study partner',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
        id: '3',
        type: 'insider',
        user: { name: 'Jordan', avatar: '/avatars/jordan.jpg', year: 'Senior', major: 'Business' },
        content: 'shared exclusive career fair insider info',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        exclusivity: 47, // Only 47 people have access
    },
];
const mockTrendingSpaces = [
    {
        id: 'study-help',
        name: 'Study Crisis Support',
        memberCount: 234,
        activeNow: 12,
        trendingReason: 'Finals week preparation',
        attractiveMembers: [
            { name: 'Sarah', avatar: '/avatars/sarah.jpg' },
            { name: 'Mike', avatar: '/avatars/mike.jpg' },
            { name: 'Zoe', avatar: '/avatars/zoe.jpg' },
        ],
        insiderContent: true,
    },
    {
        id: 'career-network',
        name: 'Career Networking',
        memberCount: 156,
        activeNow: 8,
        trendingReason: 'Job fair tomorrow',
        attractiveMembers: [
            { name: 'Taylor', avatar: '/avatars/taylor.jpg' },
            { name: 'Morgan', avatar: '/avatars/morgan.jpg' },
        ],
        insiderContent: true,
    },
];
export const SocialProofAccelerator = ({ className, variant = 'dashboard', showTrending = true, showAttractive = true, showInsider = true, }) => {
    const [activityData] = useState(mockActivityData);
    const [trendingSpaces] = useState(mockTrendingSpaces);
    const [currentTime, setCurrentTime] = useState(new Date());
    // Update time every minute for relative timestamps
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);
    const getRelativeTime = (timestamp) => {
        const diff = currentTime.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1)
            return 'just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };
    const getActivityIcon = (type) => {
        switch (type) {
            case 'join': return _jsx(Users, { className: "w-4 h-4" });
            case 'match': return _jsx(Heart, { className: "w-4 h-4 text-pink-400" });
            case 'insider': return _jsx(Eye, { className: "w-4 h-4 text-purple-400" });
            case 'trending': return _jsx(TrendingUp, { className: "w-4 h-4 text-green-400" });
            default: return _jsx(Sparkles, { className: "w-4 h-4" });
        }
    };
    const formatActivityText = (activity) => {
        switch (activity.type) {
            case 'join':
                return `joined ${activity.space}`;
            case 'match':
                return activity.content || 'made a connection';
            case 'insider':
                return activity.content || 'shared exclusive content';
            default:
                return activity.content || 'was active';
        }
    };
    const variantStyles = {
        header: 'flex items-center gap-6 p-4 bg-[var(--hive-background-secondary)]/20',
        sidebar: 'w-full space-y-4',
        dashboard: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
    };
    return (_jsxs("div", { className: cn('social-proof-accelerator', variantStyles[variant], className), children: [_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), "Live Activity"] }), _jsxs("span", { className: "text-sm text-[var(--hive-text-muted)]", children: [activityData.reduce((acc, item) => acc + (item.engagement || 1), 0), " UB students active"] })] }), _jsx("div", { className: "space-y-3 max-h-64 overflow-y-auto", children: _jsx(AnimatePresence, { children: activityData.map((activity, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { delay: index * 0.1 }, className: "flex items-center gap-3 p-3 rounded-lg bg-[var(--hive-background-secondary)]/30 hover:bg-[var(--hive-background-secondary)]/50 transition-colors", children: [_jsx(SimpleAvatar, { size: "sm", src: activity.user.avatar, fallback: activity.user.name[0], className: cn(showAttractive && activity.user.isAttractive && "ring-2 ring-pink-400/50") }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: activity.user.name }), showAttractive && activity.user.isAttractive && (_jsx(Sparkles, { className: "w-3 h-3 text-pink-400" })), activity.user.year && (_jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: activity.user.year }))] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]", children: [getActivityIcon(activity.type), _jsx("span", { className: "truncate", children: formatActivityText(activity) }), showInsider && activity.exclusivity && (_jsxs("span", { className: "text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded", children: ["Only ", activity.exclusivity, " know this"] }))] })] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-muted)]", children: [_jsx(Clock, { className: "w-3 h-3" }), getRelativeTime(activity.timestamp)] })] }, activity.id))) }) })] }), showTrending && (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-green-400" }), "Trending Spaces"] }), _jsx("span", { className: "text-sm text-[var(--hive-text-muted)]", children: "What everyone's joining" })] }), _jsx("div", { className: "space-y-4", children: trendingSpaces.map((space, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "p-4 rounded-lg bg-[var(--hive-background-secondary)]/20 hover:bg-[var(--hive-background-secondary)]/40 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsxs("span", { className: "text-green-400", children: [space.activeNow, " active"] }), _jsxs("span", { className: "text-[var(--hive-text-muted)]", children: [space.memberCount, " members"] })] })] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-3", children: ["Trending: ", space.trendingReason] }), showAttractive && space.attractiveMembers.length > 0 && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex -space-x-2", children: space.attractiveMembers.slice(0, 3).map((member, idx) => (_jsx(SimpleAvatar, { size: "sm", src: member.avatar, fallback: member.name[0], className: "border-2 border-[var(--hive-background-primary)]" }, idx))) }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: "People you might click with" }), showInsider && space.insiderContent && (_jsx(Eye, { className: "w-3 h-3 text-purple-400" }))] }))] }, space.id))) })] }))] }));
};
//# sourceMappingURL=social-proof-accelerator.js.map