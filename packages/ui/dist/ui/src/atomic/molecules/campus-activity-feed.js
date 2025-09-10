'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
const activityTypeConfig = {
    message: {
        icon: '💬',
        color: 'from-blue-500/20 to-blue-600/10',
        border: 'border-blue-500/30',
        label: 'Message'
    },
    event: {
        icon: '📅',
        color: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold-dark)]/10',
        border: 'border-[var(--hive-gold)]/30',
        label: 'Event'
    },
    announcement: {
        icon: '📢',
        color: 'from-gold/20 to-champagne/10',
        border: 'border-[var(--hive-brand-secondary)]/30',
        label: 'Announcement'
    },
    assignment: {
        icon: '📝',
        color: 'from-red-500/20 to-red-600/10',
        border: 'border-red-500/30',
        label: 'Assignment'
    },
    social: {
        icon: '🎉',
        color: 'from-pink-500/20 to-pink-600/10',
        border: 'border-pink-500/30',
        label: 'Social'
    },
    achievement: {
        icon: '🏆',
        color: 'from-gold/20 to-champagne/10',
        border: 'border-[var(--hive-brand-secondary)]/30',
        label: 'Achievement'
    },
    space_join: {
        icon: '🏛️',
        color: 'from-emerald-500/20 to-emerald-600/10',
        border: 'border-emerald-500/30',
        label: 'Space Activity'
    },
    tool_created: {
        icon: '🔧',
        color: 'from-gold/20 to-champagne/10',
        border: 'border-[var(--hive-brand-secondary)]/30',
        label: 'Tool Created'
    }
};
export const CampusActivityFeed = ({ activities, isLoading = false, variant = 'default', showFilters = false, maxItems = 8, onActivityClick, onViewAll, onFilterChange, className }) => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [hoveredActivity, setHoveredActivity] = useState(null);
    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const activity = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60));
        if (diffInMinutes < 1)
            return 'Just now';
        if (diffInMinutes < 60)
            return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440)
            return `${Math.floor(diffInMinutes / 60)}h ago`;
        if (diffInMinutes < 10080)
            return `${Math.floor(diffInMinutes / 1440)}d ago`;
        return `${Math.floor(diffInMinutes / 10080)}w ago`;
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    const displayedActivities = activities?.slice(0, maxItems) ?? [];
    const hasMoreActivities = (activities?.length ?? 0) > maxItems;
    const handleFilterToggle = (filter) => {
        const newFilters = activeFilters.includes(filter)
            ? activeFilters.filter(f => f !== filter)
            : [...activeFilters, filter];
        setActiveFilters(newFilters);
        onFilterChange?.(newFilters);
    };
    if (isLoading) {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 'p-6', className), children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-steel/20 rounded animate-pulse" }), [...Array(4)].map((_, i) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-steel/20 rounded-xl animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-steel/20 rounded animate-pulse" }), _jsx("div", { className: "h-3 bg-steel/20 rounded animate-pulse w-3/4" }), _jsx("div", { className: "h-3 bg-steel/20 rounded animate-pulse w-1/2" })] })] }, i)))] }) }));
    }
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }, className: cn(
        // BentoGrid-inspired card treatment
        'relative overflow-hidden rounded-2xl', 
        // HIVE luxury background with sophisticated glass morphism
        'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 
        // Subtle inner glow for premium feel
        'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 
        // Interactive hover states with magnetic feel
        'hover:border-steel/20 hover:shadow-[inset_0_1px_0_0_var(--hive-interactive-active)]', 'transition-all duration-300 ease-hive-smooth', 
        // Responsive padding with bento spacing
        'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-lg" })] }), _jsxs("div", { className: "relative z-10 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 border border-[var(--hive-brand-secondary)]/20 flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)] text-lg", children: "\u26A1" }) }), _jsx("h3", { className: "text-platinum font-bold text-xl tracking-tight", children: "Campus Activity" })] }), onViewAll && (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onViewAll, className: "text-[var(--hive-brand-secondary)] hover:text-champagne transition-colors duration-200 text-sm font-medium", children: "View All" }))] }), _jsx("p", { className: "text-mercury text-sm", children: "Recent campus activity from your spaces" })] }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-steel/30 via-steel/20 to-transparent" }), _jsx("div", { className: "space-y-4", children: _jsx(AnimatePresence, { children: displayedActivities.map((activity, index) => {
                                const config = activityTypeConfig[activity.type];
                                return (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: {
                                        delay: index * 0.1,
                                        duration: 0.4,
                                        ease: [0.23, 1, 0.32, 1]
                                    }, onHoverStart: () => setHoveredActivity(activity.id), onHoverEnd: () => setHoveredActivity(null), onClick: () => onActivityClick?.(activity.id), className: cn('relative group cursor-pointer rounded-xl p-4 pl-16', 'bg-gradient-to-br from-charcoal/40 via-charcoal/30 to-graphite/40', 'border border-steel/10 backdrop-blur-sm', 'hover:border-steel/20 hover:from-charcoal/60 hover:to-graphite/60', 'transition-all duration-300 ease-hive-smooth', 'hover:shadow-lg', activity.isUnread && 'ring-1 ring-gold/20'), children: [_jsx("div", { className: cn('absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl', 'flex items-center justify-center border-2 bg-gradient-to-br from-charcoal to-graphite', config.border, 'group-hover:scale-110 transition-transform duration-300'), children: _jsx("span", { className: "text-sm", children: config.icon }) }), _jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: cn('font-semibold truncate text-sm', activity.priority === 'high' ? 'text-[var(--hive-brand-secondary)]' : 'text-platinum'), children: activity.title }), activity.isUnread && (_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] shadow-[0_0_4px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]" }))] }), activity.content && (_jsx("p", { className: "text-mercury text-sm mb-2 line-clamp-2", children: activity.content })), _jsxs("div", { className: "flex items-center gap-2 text-xs text-steel", children: [activity.author && (_jsxs(_Fragment, { children: [_jsx("span", { children: activity.author.name }), _jsx("span", { children: "\u2022" })] })), activity.space && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-mercury", children: activity.space.name }), _jsx("span", { children: "\u2022" })] })), _jsx("span", { children: formatTimestamp(activity.timestamp) })] })] }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-steel", children: [activity.metadata?.replyCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCAC" }), _jsx("span", { children: activity.metadata.replyCount })] })), activity.metadata?.likes && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\u2764\uFE0F" }), _jsx("span", { children: activity.metadata.likes })] })), activity.metadata?.attachmentCount && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: "\uD83D\uDCCE" }), _jsx("span", { children: activity.metadata.attachmentCount })] }))] })] }), (activity.metadata?.dueDate || activity.metadata?.eventDate) && (_jsx("div", { className: "mt-2 pt-2 border-t border-steel/10", children: _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: activity.metadata.dueDate ? '⏰' : '📅' }), _jsxs("span", { className: "text-mercury", children: [activity.metadata.dueDate ? 'Due' : 'Event', ": ", ' ', new Date(activity.metadata.dueDate || activity.metadata.eventDate).toLocaleDateString()] })] }) }))] }), _jsx(motion.div, { className: cn('absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300', `bg-gradient-to-br ${config.color}`), animate: hoveredActivity === activity.id ? { scale: 1.02 } : { scale: 1 }, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } })] }, activity.id));
                            }) }) }), hasMoreActivities && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, className: "text-center pt-4 border-t border-steel/10 mt-4", children: _jsxs("button", { onClick: onViewAll, className: "text-mercury hover:text-platinum transition-colors duration-200 text-sm", children: ["+", (activities?.length ?? 0) - maxItems, " more activities"] }) })), (activities?.length ?? 0) === 0 && !isLoading && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60 border border-steel/20 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\u26A1" }) }), _jsx("h4", { className: "text-platinum font-medium mb-2", children: "No Recent Activity" }), _jsx("p", { className: "text-mercury text-sm", children: "Join more spaces to see campus activity here" })] }))] })] }));
};
export default CampusActivityFeed;
//# sourceMappingURL=campus-activity-feed.js.map