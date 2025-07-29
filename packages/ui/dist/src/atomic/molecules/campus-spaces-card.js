'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
const spaceTypeIcons = {
    course: '📚',
    housing: '🏠',
    club: '⭐',
    academic: '🎓',
    community: '👥',
    school: '🏛️',
    graduation: '🎓',
    mentoring: '🤝'
};
const spaceTypeColors = {
    course: 'from-blue-500/20 to-blue-600/10',
    housing: 'from-emerald-500/20 to-emerald-600/10',
    club: 'from-purple-500/20 to-purple-600/10',
    academic: 'from-gold/20 to-champagne/10',
    community: 'from-rose-500/20 to-rose-600/10',
    school: 'from-indigo-500/20 to-indigo-600/10',
    graduation: 'from-gold/20 to-champagne/10',
    mentoring: 'from-teal-500/20 to-teal-600/10'
};
export const CampusSpacesCard = ({ spaces, isLoading = false, variant = 'default', showQuickActions = true, onSpaceClick, onJoinSpace, onViewAll, className }) => {
    const [hoveredSpace, setHoveredSpace] = useState(null);
    const formatMemberCount = (count) => {
        if (count >= 1000)
            return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };
    const formatLastActivity = (timestamp) => {
        const now = new Date();
        const activity = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    };
    const displayedSpaces = spaces.slice(0, 6); // Show max 6 spaces
    const hasMoreSpaces = spaces.length > 6;
    if (isLoading) {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 'p-6', className), children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-steel/20 rounded animate-pulse" }), [...Array(3)].map((_, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-steel/20 rounded-xl animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-steel/20 rounded animate-pulse" }), _jsx("div", { className: "h-3 bg-steel/20 rounded animate-pulse w-2/3" })] })] }, i)))] }) }));
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
        'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-lg" })] }), _jsxs("div", { className: "relative z-10 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 border border-gold/20 flex items-center justify-center", children: _jsx("span", { className: "text-gold text-lg", children: "\uD83C\uDFDB\uFE0F" }) }), _jsx("h3", { className: "text-platinum font-bold text-xl tracking-tight", children: "Your Campus Spaces" })] }), showQuickActions && onViewAll && (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onViewAll, className: "text-gold hover:text-champagne transition-colors duration-200 text-sm font-medium", children: "View All" }))] }), _jsxs("p", { className: "text-mercury text-sm", children: [spaces.length, " space", spaces.length !== 1 ? 's' : '', " joined"] })] }), _jsxs("div", { className: "relative z-10 space-y-3", children: [_jsx(AnimatePresence, { children: displayedSpaces.map((space, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: {
                                delay: index * 0.1,
                                duration: 0.4,
                                ease: [0.23, 1, 0.32, 1]
                            }, onHoverStart: () => setHoveredSpace(space.id), onHoverEnd: () => setHoveredSpace(null), onClick: () => onSpaceClick?.(space.id), className: cn('relative group cursor-pointer rounded-xl p-4', 'bg-gradient-to-br from-charcoal/40 via-charcoal/30 to-graphite/40', 'border border-steel/10 backdrop-blur-sm', 'hover:border-steel/20 hover:from-charcoal/60 hover:to-graphite/60', 'transition-all duration-300 ease-hive-smooth', 'hover:shadow-lg'), children: [_jsx("div", { className: cn('absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300', `bg-gradient-to-br ${spaceTypeColors[space.type]}`) }), _jsxs("div", { className: "relative z-10 flex items-center gap-4", children: [_jsx("div", { className: cn('w-12 h-12 rounded-xl flex items-center justify-center border', 'bg-gradient-to-br from-charcoal/60 to-graphite/60 border-steel/20', 'group-hover:border-gold/30 transition-all duration-300', hoveredSpace === space.id && 'scale-105 shadow-lg'), children: _jsx("span", { className: "text-xl", children: space.icon || spaceTypeIcons[space.type] }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between mb-1", children: [_jsx("h4", { className: "text-platinum font-semibold truncate text-base", children: space.name }), _jsxs("div", { className: "flex items-center gap-2 ml-2", children: [space.isPinned && (_jsx("div", { className: "w-2 h-2 rounded-full bg-gold shadow-[0_0_4px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]" })), space.unreadCount && space.unreadCount > 0 && (_jsx("div", { className: "px-2 py-0.5 bg-gold/20 border border-gold/30 rounded-full", children: _jsx("span", { className: "text-gold text-xs font-medium", children: space.unreadCount > 99 ? '99+' : space.unreadCount }) }))] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-mercury", children: [_jsx("span", { className: "capitalize", children: space.type }), _jsx("span", { className: "text-steel/60", children: "\u2022" }), _jsxs("span", { children: [formatMemberCount(space.memberCount), " members"] }), space.lastActivity && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-steel/60", children: "\u2022" }), _jsx("span", { className: "text-xs", children: formatLastActivity(space.lastActivity) })] }))] }), space.recentActivity && hoveredSpace === space.id && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-2 pt-2 border-t border-steel/10", children: _jsx("p", { className: "text-xs text-silver/80 truncate", children: space.recentActivity.preview }) }))] })] }), _jsx(motion.div, { className: "absolute inset-0 rounded-xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300", animate: hoveredSpace === space.id ? { scale: 1.02 } : { scale: 1 }, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } })] }, space.id))) }), hasMoreSpaces && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "text-center pt-3 border-t border-steel/10", children: _jsxs("button", { onClick: onViewAll, className: "text-mercury hover:text-platinum transition-colors duration-200 text-sm", children: ["+", spaces.length - 6, " more spaces"] }) })), showQuickActions && onJoinSpace && (_jsxs(motion.button, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8 }, whileHover: {
                            scale: 1.02,
                            boxShadow: "0 2 32px color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)"
                        }, whileTap: { scale: 0.98 }, onClick: onJoinSpace, className: cn('w-full mt-4 p-3 rounded-xl border-2 border-dashed border-steel/30', 'hover:border-gold/50 hover:bg-gold/5', 'text-mercury hover:text-gold transition-all duration-300', 'flex items-center justify-center gap-2 text-sm font-medium', 'group'), children: [_jsx(motion.span, { className: "text-lg group-hover:rotate-90 transition-transform duration-300", children: "+" }), "Join New Space"] }))] }), spaces.length === 0 && !isLoading && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "relative z-10 text-center py-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60 border border-steel/20 flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\uD83C\uDFDB\uFE0F" }) }), _jsx("h4", { className: "text-platinum font-medium mb-2", children: "No Spaces Yet" }), _jsx("p", { className: "text-mercury text-sm mb-4", children: "Join campus spaces to connect with your community" }), onJoinSpace && (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onJoinSpace, className: "px-4 py-2 bg-gradient-to-r from-gold/20 to-champagne/20 border border-gold/30 rounded-xl text-gold text-sm font-medium hover:from-gold/30 hover:to-champagne/30 transition-all duration-300", children: "Explore Spaces" }))] }))] }));
};
export default CampusSpacesCard;
//# sourceMappingURL=campus-spaces-card.js.map