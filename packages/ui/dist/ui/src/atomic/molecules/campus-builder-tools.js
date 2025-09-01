'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { Lock, Star, Zap, Clock, Users } from 'lucide-react';
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
        border: 'border-[var(--hive-brand-secondary)]/30',
        label: 'Custom'
    }
};
const difficultyConfig = {
    beginner: { icon: '🟢', label: 'Beginner' },
    intermediate: { icon: '🟡', label: 'Intermediate' },
    advanced: { icon: '🔴', label: 'Advanced' }
};
export const CampusBuilderTools = ({ availableTools, createdTools, isBuilder = false, isLoading = false, variant = 'default', showBecomeBuilder = true, isLocked = true, // Default to locked for vBETA
onToolClick, onCreateTool, onViewTool, onBecomeBuilder, onViewAllCreated, onJoinWaitlist, className }) => {
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
    const displayedAvailableTools = availableTools?.slice(0, 4) ?? [];
    const displayedCreatedTools = createdTools?.slice(0, 3) ?? [];
    if (isLoading) {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn('relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 'p-6', className), children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-steel/20 rounded animate-pulse" }), [...Array(3)].map((_, i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-steel/20 rounded-xl animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-steel/20 rounded animate-pulse" }), _jsx("div", { className: "h-3 bg-steel/20 rounded animate-pulse w-2/3" })] })] }, i)))] }) }));
    }
    // Locked state for vBETA - Coming in v1 with proper teasing
    if (isLocked) {
        return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: {
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
            }, className: cn('relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/60 via-charcoal/50 to-graphite/60', 'backdrop-blur-xl border border-steel/8', 'shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-hover)_30%,transparent)]', 'hover:border-[var(--hive-brand-secondary)]/10 hover:shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-hover)_50%,transparent)]', 'transition-all duration-500 ease-hive-smooth', 'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-purple-500/10" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/30 to-transparent rounded-full blur-2xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-xl" })] }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/15 flex items-center justify-center", children: _jsx(Lock, { className: "h-5 w-5 text-steel/60" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-platinum/70 font-semibold text-lg tracking-tight", children: "Personal Tools" }), _jsx("p", { className: "text-steel/70 text-xs", children: "Coming in HIVE v1" })] })] }), _jsx("div", { className: "px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-gold/10 border border-purple-500/20 rounded-full", children: _jsx("span", { className: "text-purple-300/80 text-xs font-medium tracking-wide", children: "v1 Preview" }) })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.2 }, className: "w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold/10 to-purple-500/10 border border-[var(--hive-brand-secondary)]/20 flex items-center justify-center relative", children: [_jsx(motion.div, { animate: {
                                                        rotate: [0, 360],
                                                        scale: [1, 1.1, 1]
                                                    }, transition: {
                                                        rotate: { duration: 10, ease: "linear", repeat: Infinity },
                                                        scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
                                                    }, className: "text-3xl", children: "\uD83D\uDEE0\uFE0F" }), _jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-purple-500/5 blur-xl animate-pulse" })] }), _jsx("h4", { className: "text-platinum/80 font-semibold mb-2 text-lg", children: "Your Personal Toolkit" }), _jsx("p", { className: "text-mercury/60 text-sm leading-relaxed max-w-xs mx-auto", children: "Create, customize, and share tools that enhance your campus experience" })] }), _jsx("div", { className: "grid grid-cols-1 gap-3 mt-6", children: [
                                        {
                                            icon: _jsx(Zap, { className: "h-4 w-4" }),
                                            title: "Custom Automations",
                                            description: "Build workflows that save you hours every week",
                                            color: "from-purple-500/10 to-purple-600/5 border-purple-500/20"
                                        },
                                        {
                                            icon: _jsx(Users, { className: "h-4 w-4" }),
                                            title: "Community Tools",
                                            description: "Share your creations with friends and classmates",
                                            color: "from-blue-500/10 to-blue-600/5 border-blue-500/20"
                                        },
                                        {
                                            icon: _jsx(Star, { className: "h-4 w-4" }),
                                            title: "Smart Templates",
                                            description: "Start with proven templates, customize to your needs",
                                            color: "from-gold/10 to-gold/5 border-[var(--hive-brand-secondary)]/20"
                                        }
                                    ].map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4 + index * 0.1 }, className: cn("p-4 rounded-xl bg-gradient-to-r border backdrop-blur-sm", feature.color), children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-white/5 text-[var(--hive-text-inverse)]/80 mt-0.5", children: feature.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: "font-medium text-[var(--hive-text-inverse)]/90 text-sm mb-1", children: feature.title }), _jsx("p", { className: "text-[var(--hive-text-inverse)]/60 text-xs leading-relaxed", children: feature.description })] })] }) }, feature.title))) })] }), _jsxs("div", { className: "text-center pt-4 border-t border-steel/10", children: [_jsxs(motion.button, { whileHover: {
                                        scale: 1.02,
                                        boxShadow: "0 8px 32px color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)"
                                    }, whileTap: { scale: 0.98 }, onClick: onJoinWaitlist, className: cn('w-full px-6 py-3 rounded-xl', 'bg-gradient-to-r from-gold/15 to-purple-500/15', 'border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/50', 'text-[var(--hive-brand-secondary)] hover:text-champagne transition-all duration-300', 'font-medium text-sm group flex items-center justify-center gap-2'), children: [_jsx(Clock, { className: "h-4 w-4 group-hover:rotate-12 transition-transform duration-300" }), _jsx("span", { children: "Get Early Access to v1" }), _jsx(motion.span, { animate: { x: [0, 4, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, children: "\u2192" })] }), _jsx("p", { className: "text-steel/60 text-xs mt-3", children: "Be among the first to build custom tools for your campus" })] })] })] }));
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
                            }, whileTap: { scale: 0.98 }, onClick: onBecomeBuilder, className: cn('px-6 py-3 rounded-xl border border-steel/20', 'bg-gradient-to-r from-charcoal/60 to-graphite/60', 'hover:border-[var(--hive-brand-secondary)]/20 hover:from-charcoal/80 hover:to-graphite/80', 'text-mercury hover:text-[var(--hive-brand-secondary)] transition-all duration-300', 'text-sm font-medium group'), children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx(motion.span, { className: "group-hover:rotate-12 transition-transform duration-300", children: "\u2728" }), "Become a Builder"] }) })] })] }));
    }
    // Builder view - Full functionality with subtle aesthetics
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }, className: cn(
        // Subtle BentoGrid treatment - elegant but not dominant
        'relative overflow-hidden rounded-2xl', 'bg-gradient-to-br from-charcoal/80 via-charcoal/70 to-graphite/80', 'backdrop-blur-xl border border-steel/10', 'shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)]', 'hover:border-steel/15 hover:shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]', 'transition-all duration-300 ease-hive-smooth', 'p-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-3", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-28 h-28 bg-gradient-radial from-gold/15 to-transparent rounded-full blur-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-20 h-20 bg-gradient-radial from-platinum/8 to-transparent rounded-full blur-lg" })] }), _jsxs("div", { className: "relative z-10 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold/15 to-champagne/8 border border-[var(--hive-brand-secondary)]/15 flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)]/80 text-lg", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("h3", { className: "text-platinum/90 font-semibold text-lg tracking-tight", children: "Builder Tools" })] }), _jsx("div", { className: "px-3 py-1.5 bg-gradient-to-r from-gold/10 to-champagne/10 border border-[var(--hive-brand-secondary)]/20 rounded-full", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)]/80 text-xs font-medium tracking-wide", children: "Builder" }) })] }), _jsx("p", { className: "text-mercury/80 text-sm", children: "Create and manage your custom campus tools" })] }), _jsx("div", { className: "relative z-10 mb-6", children: _jsx("div", { className: "flex bg-charcoal/30 rounded-xl p-1 border border-steel/10", children: [
                        { id: 'available', label: 'Create New', count: availableTools?.length ?? 0 },
                        { id: 'created', label: 'My Tools', count: createdTools?.length ?? 0 }
                    ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: cn('flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200', activeTab === tab.id
                            ? 'bg-gradient-to-r from-gold/15 to-champagne/10 text-[var(--hive-brand-secondary)]/90 border border-[var(--hive-brand-secondary)]/20'
                            : 'text-mercury/70 hover:text-mercury/90 hover:bg-charcoal/40'), children: _jsxs("span", { className: "flex items-center justify-center gap-2", children: [tab.label, _jsxs("span", { className: "text-xs opacity-60", children: ["(", tab.count, ")"] })] }) }, tab.id))) }) }), _jsxs("div", { className: "relative z-10", children: [_jsx(AnimatePresence, { children: activeTab === 'available' ? (_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, className: "space-y-3", children: displayedAvailableTools.map((tool, index) => {
                                const config = toolTypeConfig[tool.type];
                                const difficultyInfo = difficultyConfig[tool.difficulty];
                                return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, onHoverStart: () => setHoveredTool(tool.id), onHoverEnd: () => setHoveredTool(null), onClick: () => onToolClick?.(tool.id), className: cn('group cursor-pointer rounded-xl p-4', 'bg-gradient-to-br from-charcoal/30 via-charcoal/20 to-graphite/30', 'border border-steel/8 backdrop-blur-sm', 'hover:border-steel/15 hover:from-charcoal/50 hover:to-graphite/50', 'transition-all duration-300 ease-hive-smooth', tool.isLocked && 'opacity-60'), children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn('w-10 h-10 rounded-xl flex items-center justify-center border', 'bg-gradient-to-br from-charcoal/40 to-graphite/40 border-steel/15', 'group-hover:border-[var(--hive-brand-secondary)]/20 transition-all duration-300', hoveredTool === tool.id && 'scale-105'), children: _jsx("span", { className: "text-lg opacity-80", children: tool.icon || config.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-platinum/90 font-medium truncate text-sm", children: tool.name }), tool.isLocked && (_jsx("span", { className: "text-xs text-steel/60", children: "\uD83D\uDD12" })), tool.isPremium && (_jsx("span", { className: "text-xs text-[var(--hive-brand-secondary)]/60", children: "\u2728" }))] }), _jsx("p", { className: "text-mercury/70 text-xs mb-2 line-clamp-1", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-steel/80", children: [_jsxs("span", { className: "flex items-center gap-1", children: [difficultyInfo.icon, difficultyInfo.label] }), tool.timeToCreate && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { children: tool.timeToCreate })] }))] })] }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: (e) => {
                                                    e.stopPropagation();
                                                    onCreateTool?.(tool.type);
                                                }, disabled: tool.isLocked, className: cn('px-3 py-1.5 rounded-lg text-xs font-medium', 'bg-gradient-to-r from-gold/15 to-champagne/10 border border-[var(--hive-brand-secondary)]/20', 'text-[var(--hive-brand-secondary)]/80 hover:text-[var(--hive-brand-secondary)] hover:from-gold/20 hover:to-champagne/15', 'transition-all duration-200', 'disabled:opacity-40 disabled:cursor-not-allowed'), children: "Create" })] }) }, tool.id));
                            }) }, "available")) : (_jsx(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, className: "space-y-3", children: displayedCreatedTools.length > 0 ? (displayedCreatedTools.map((tool, index) => {
                                const config = toolTypeConfig[tool.type];
                                return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, onClick: () => onViewTool?.(tool.id), className: "group cursor-pointer rounded-xl p-4 bg-gradient-to-br from-charcoal/30 via-charcoal/20 to-graphite/30 border border-steel/8 hover:border-steel/15 hover:from-charcoal/50 hover:to-graphite/50 transition-all duration-300", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/15 flex items-center justify-center", children: _jsx("span", { className: "text-lg opacity-80", children: tool.icon || config.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-platinum/90 font-medium truncate text-sm", children: tool.name }), tool.isStarred && (_jsx("span", { className: "text-[var(--hive-brand-secondary)]/60 text-xs", children: "\u2B50" }))] }), _jsx("p", { className: "text-mercury/70 text-xs mb-2 line-clamp-1", children: tool.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-steel/80", children: [_jsxs("span", { children: [tool.usageCount, " uses"] }), tool.likes && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["\u2764\uFE0F ", tool.likes] })] })), _jsx("span", { children: "\u2022" }), _jsx("span", { className: tool.isPublic ? 'text-emerald/60' : 'text-steel/60', children: tool.isPublic ? 'Public' : 'Private' })] })] })] }) }, tool.id));
                            })) : (_jsxs("div", { className: "text-center py-6", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-charcoal/40 to-graphite/40 border border-steel/15 flex items-center justify-center", children: _jsx("span", { className: "text-lg opacity-60", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("p", { className: "text-mercury/70 text-sm", children: "No tools created yet" }), _jsx("p", { className: "text-steel/60 text-xs mt-1", children: "Start building your first tool!" })] })) }, "created")) }), ((activeTab === 'available' && (availableTools?.length ?? 0) > 4) ||
                        (activeTab === 'created' && (createdTools?.length ?? 0) > 3)) && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "text-center pt-4 border-t border-steel/8 mt-4", children: _jsx("button", { onClick: activeTab === 'created' ? onViewAllCreated : undefined, className: "text-mercury/70 hover:text-mercury transition-colors duration-200 text-sm", children: activeTab === 'available'
                                ? `+${(availableTools?.length ?? 0) - 4} more templates`
                                : `+${(createdTools?.length ?? 0) - 3} more tools` }) }))] })] }));
};
export default CampusBuilderTools;
//# sourceMappingURL=campus-builder-tools.js.map