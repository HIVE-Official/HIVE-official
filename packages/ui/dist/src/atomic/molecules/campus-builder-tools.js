'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
const toolTypeConfig = {
    template: {
        icon: '📋',
        color: 'from-blue-500/20 to-blue-600/10',
        border: 'border-blue-500/30',
        label: 'Template'
    },
    automation: {
        icon: '⚡',
        color: 'from-purple-500/20 to-purple-600/10',
        border: 'border-purple-500/30',
        label: 'Automation'
    },
    widget: {
        icon: '🎛️',
        color: 'from-emerald-500/20 to-emerald-600/10',
        border: 'border-emerald-500/30',
        label: 'Widget'
    },
    integration: {
        icon: '🔗',
        color: 'from-orange-500/20 to-orange-600/10',
        border: 'border-orange-500/30',
        label: 'Integration'
    },
    custom: {
        icon: '🛠️',
        color: 'from-gold/20 to-champagne/10',
        border: 'border-gold/30',
        label: 'Custom'
    }
};
const difficultyConfig = {
    beginner: { icon: '🟢', label: 'Beginner' },
    intermediate: { icon: '🟡', label: 'Intermediate' },
    advanced: { icon: '🔴', label: 'Advanced' }
};
export const CampusBuilderTools = ({ availableTools, createdTools, isBuilder = false, isLoading = false, variant = 'default', showBecomeBuilder = true, onToolClick, onCreateTool, onViewTool, onBecomeBuilder, onViewAllCreated, className }) => {
    const [hoveredTool, setHoveredTool] = useState(null);
    const [activeTab, setActiveTab] = useState('available');
    const formatLastUsed = (timestamp) => {
        const now = new Date();
        const used = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - used.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    };
    const displayedAvailableTools = availableTools.slice(0, 4);
    const displayedCreatedTools = createdTools.slice(0, 3);
    if (isLoading) {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 'p-6', className), children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-steel/20 rounded animate-pulse" }), [...Array(3)].map((_, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-steel/20 rounded-xl animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-steel/20 rounded animate-pulse" }), _jsx("div", { className: "h-3 bg-steel/20 rounded animate-pulse w-2/3" })] })] }, i)))] }) }));
    }
    // Non-builder view - Subtle invitation to become a builder
    if (!isBuilder && showBecomeBuilder) {
        return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: {
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
            }, className: cn(
            // Subtle BentoGrid treatment - less prominent than other cards
            'relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/70 via-charcoal/60 to-graphite/70', 'backdrop-blur-xl border border-steel/5', 'shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)]', 'hover:border-steel/10 hover:shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 'transition-all duration-500 ease-hive-smooth', 'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-2", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-gold/10 to-transparent rounded-full blur-xl" })] }), _jsxs("div", { className: "relative z-10 text-center py-4", children: [_jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.3 }, className: "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/10 flex items-center justify-center", children: _jsx("span", { className: "text-2xl opacity-60", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("h4", { className: "text-mercury font-medium mb-2 text-lg", children: "Build Custom Tools" }), _jsx("p", { className: "text-steel text-sm mb-6 max-w-xs mx-auto leading-relaxed", children: "Create personalized tools to enhance your campus experience" }), _jsx(motion.button, { whileHover: {
                                scale: 1.02,
                                boxShadow: "0 2 32px color-mix(in_srgb,var(--hive-brand-secondary)_8%,transparent)"
                            }, whileTap: { scale: 0.98 }, onClick: onBecomeBuilder, className: cn('px-6 py-3 rounded-xl border border-steel/20', 'bg-gradient-to-r from-charcoal/60 to-graphite/60', 'hover:border-gold/20 hover:from-charcoal/80 hover:to-graphite/80', 'text-mercury hover:text-gold transition-all duration-300', 'text-sm font-medium group'), children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx(motion.span, { className: "group-hover:rotate-12 transition-transform duration-300", children: "\u2728" }), "Become a Builder"] }) })] })] }));
    }
    // Builder view - Full functionality with subtle aesthetics
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }, className: cn(
        // Subtle BentoGrid treatment - elegant but not dominant
        'relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/80 via-charcoal/70 to-graphite/80', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)]', 'hover:border-steel/15 hover:shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]', 'transition-all duration-300 ease-hive-smooth', 'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-3", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-28 h-28 bg-gradient-radial from-gold/15 to-transparent rounded-full blur-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-20 h-20 bg-gradient-radial from-platinum/8 to-transparent rounded-full blur-lg" })] }), _jsxs("div", { className: "relative z-10 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold/15 to-champagne/8 border border-gold/15 flex items-center justify-center", children: _jsx("span", { className: "text-gold/80 text-lg", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("h3", { className: "text-platinum/90 font-semibold text-lg tracking-tight", children: "Builder Tools" })] }), _jsx("div", { className: "px-3 py-1.5 bg-gradient-to-r from-gold/10 to-champagne/10 border border-gold/20 rounded-full", children: _jsx("span", { className: "text-gold/80 text-xs font-medium tracking-wide", children: "Builder" }) })] }), _jsx("p", { className: "text-mercury/80 text-sm", children: "Create and manage your custom campus tools" })] }), _jsx("div", { className: "relative z-10 mb-6", children: _jsx("div", { className: "flex bg-charcoal/30 rounded-xl p-1 border border-steel/10", children: [
                        { id: 'available', label: 'Create New', count: availableTools.length },
                        { id: 'created', label: 'My Tools', count: createdTools.length }
                    ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: cn('flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200', activeTab === tab.id
                            ? 'bg-gradient-to-r from-gold/15 to-champagne/10 text-gold/90 border border-gold/20'
                            : 'text-mercury/70 hover:text-mercury/90 hover:bg-charcoal/40'), children: _jsxs("span", { className: "flex items-center justify-center gap-2", children: [tab.label, _jsxs("span", { className: "text-xs opacity-60", children: ["(", tab.count, ")"] })] }) }, tab.id))) }) }), _jsxs("div", { className: "relative z-10", children: [_jsx(AnimatePresence, { children: activeTab === 'available' ? (_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, className: "space-y-3", children: displayedAvailableTools.map((tool, index) => {
                                const config = toolTypeConfig[tool.type];
                                const difficultyInfo = difficultyConfig[tool.difficulty];
                                return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, onHoverStart: () => setHoveredTool(tool.id), onHoverEnd: () => setHoveredTool(null), onClick: () => onToolClick?.(tool.id), className: cn('group cursor-pointer rounded-xl p-4', 'bg-gradient-to-br from-charcoal/30 via-charcoal/20 to-graphite/30', 'border border-steel/8 backdrop-blur-sm', 'hover:border-steel/15 hover:from-charcoal/50 hover:to-graphite/50', 'transition-all duration-300 ease-hive-smooth', tool.isLocked && 'opacity-60'), children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn('w-10 h-10 rounded-xl flex items-center justify-center border', 'bg-gradient-to-br from-charcoal/40 to-graphite/40 border-steel/15', 'group-hover:border-gold/20 transition-all duration-300', hoveredTool === tool.id && 'scale-105'), children: _jsx("span", { className: "text-lg opacity-80", children: tool.icon || config.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-platinum/90 font-medium truncate text-sm", children: tool.name }), tool.isLocked && (_jsx("span", { className: "text-xs text-steel/60", children: "\uD83D\uDD12" })), tool.isPremium && (_jsx("span", { className: "text-xs text-gold/60", children: "\u2728" }))] }), _jsx("p", { className: "text-mercury/70 text-xs mb-2 line-clamp-1", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-steel/80", children: [_jsxs("span", { className: "flex items-center gap-1", children: [difficultyInfo.icon, difficultyInfo.label] }), tool.timeToCreate && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: tool.timeToCreate })] }))] })] }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: (e) => {
                                                    e.stopPropagation();
                                                    onCreateTool?.(tool.type);
                                                }, disabled: tool.isLocked, className: cn('px-3 py-1.5 rounded-lg text-xs font-medium', 'bg-gradient-to-r from-gold/15 to-champagne/10 border border-gold/20', 'text-gold/80 hover:text-gold hover:from-gold/20 hover:to-champagne/15', 'transition-all duration-200', 'disabled:opacity-40 disabled:cursor-not-allowed'), children: "Create" })] }) }, tool.id));
                            }) }, "available")) : (_jsx(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, className: "space-y-3", children: displayedCreatedTools.length > 0 ? (displayedCreatedTools.map((tool, index) => {
                                const config = toolTypeConfig[tool.type];
                                return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, onClick: () => onViewTool?.(tool.id), className: "group cursor-pointer rounded-xl p-4 bg-gradient-to-br from-charcoal/30 via-charcoal/20 to-graphite/30 border border-steel/8 hover:border-steel/15 hover:from-charcoal/50 hover:to-graphite/50 transition-all duration-300", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/15 flex items-center justify-center", children: _jsx("span", { className: "text-lg opacity-80", children: tool.icon || config.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-platinum/90 font-medium truncate text-sm", children: tool.name }), tool.isStarred && (_jsx("span", { className: "text-gold/60 text-xs", children: "\u2B50" }))] }), _jsx("p", { className: "text-mercury/70 text-xs mb-2 line-clamp-1", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-steel/80", children: [_jsxs("span", { children: [tool.usageCount, " uses"] }), tool.likes && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["\u2764\uFE0F ", tool.likes] })] })), _jsx("span", { children: "\u2022" }), _jsx("span", { className: tool.isPublic ? 'text-emerald/60' : 'text-steel/60', children: tool.isPublic ? 'Public' : 'Private' })] })] })] }) }, tool.id));
                            })) : (_jsxs("div", { className: "text-center py-6", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/15 flex items-center justify-center", children: _jsx("span", { className: "text-lg opacity-60", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("p", { className: "text-mercury/70 text-sm", children: "No tools created yet" }), _jsx("p", { className: "text-steel/60 text-xs mt-1", children: "Start building your first tool!" })] })) }, "created")) }), ((activeTab === 'available' && availableTools.length > 4) ||
                        (activeTab === 'created' && createdTools.length > 3)) && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "text-center pt-4 border-t border-steel/8 mt-4", children: _jsx("button", { onClick: activeTab === 'created' ? onViewAllCreated : undefined, className: "text-mercury/70 hover:text-mercury transition-colors duration-200 text-sm", children: activeTab === 'available'
                                ? `+${availableTools.length - 4} more templates`
                                : `+${createdTools.length - 3} more tools` }) }))] })] }));
};
export default CampusBuilderTools;
//# sourceMappingURL=campus-builder-tools.js.map