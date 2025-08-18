'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Settings, Play, Pause, MoreHorizontal, AlertCircle, CheckCircle, Users, Trash2, BarChart3, Calendar, MessageSquare, Zap } from 'lucide-react';
const CATEGORY_CONFIG = {
    productivity: {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        icon: _jsx(Zap, { className: "w-4 h-4" }),
    },
    social: {
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        icon: _jsx(Users, { className: "w-4 h-4" }),
    },
    academic: {
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        icon: _jsx(BarChart3, { className: "w-4 h-4" }),
    },
    coordination: {
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        icon: _jsx(Calendar, { className: "w-4 h-4" }),
    },
};
const STATUS_CONFIG = {
    active: {
        color: 'text-[var(--hive-status-success)]',
        bgColor: 'bg-[var(--hive-status-success)]/10',
        borderColor: 'border-[var(--hive-status-success)]/20',
        icon: _jsx(CheckCircle, { className: "w-4 h-4" }),
        label: 'Active',
    },
    configured: {
        color: 'text-[var(--hive-status-info)]',
        bgColor: 'bg-[var(--hive-status-info)]/10',
        borderColor: 'border-[var(--hive-status-info)]/20',
        icon: _jsx(Settings, { className: "w-4 h-4" }),
        label: 'Configured',
    },
    needs_setup: {
        color: 'text-[var(--hive-status-warning)]',
        bgColor: 'bg-[var(--hive-status-warning)]/10',
        borderColor: 'border-[var(--hive-status-warning)]/20',
        icon: _jsx(AlertCircle, { className: "w-4 h-4" }),
        label: 'Needs Setup',
    },
    error: {
        color: 'text-[var(--hive-status-error)]',
        bgColor: 'bg-[var(--hive-status-error)]/10',
        borderColor: 'border-[var(--hive-status-error)]/20',
        icon: _jsx(AlertCircle, { className: "w-4 h-4" }),
        label: 'Error',
    },
    disabled: {
        color: 'text-[var(--hive-text-muted)]',
        bgColor: 'bg-[var(--hive-background-tertiary)]/20',
        borderColor: 'border-[var(--hive-border-primary)]/10',
        icon: _jsx(Pause, { className: "w-4 h-4" }),
        label: 'Disabled',
    },
};
export const PlantedToolWidget = ({ tool, variant = 'default', onConfigure, onRemove, onToggleStatus, onViewDetails, onViewOutputs, showStats = true, showActions = true, className }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const categoryConfig = CATEGORY_CONFIG[tool.category];
    const statusConfig = STATUS_CONFIG[tool.status];
    const formatTimeAgo = (timestamp) => {
        if (!timestamp)
            return 'Never';
        const now = new Date();
        const time = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1)
            return 'Just now';
        if (diffInHours < 24)
            return `${diffInHours}h ago`;
        if (diffInHours < 168)
            return `${Math.floor(diffInHours / 24)}d ago`;
        return `${Math.floor(diffInHours / 168)}w ago`;
    };
    const handleToggleStatus = async () => {
        if (!onToggleStatus)
            return;
        setIsToggling(true);
        try {
            await onToggleStatus(tool.id, tool.status !== 'active');
        }
        finally {
            setIsToggling(false);
        }
    };
    const getPrimaryAction = () => {
        switch (tool.status) {
            case 'needs_setup':
                return {
                    label: 'Setup Required',
                    action: () => onConfigure?.(tool.id),
                    variant: 'warning',
                    icon: _jsx(Settings, { className: "w-4 h-4" }),
                };
            case 'error':
                return {
                    label: 'Fix Error',
                    action: () => onConfigure?.(tool.id),
                    variant: 'error',
                    icon: _jsx(AlertCircle, { className: "w-4 h-4" }),
                };
            case 'configured':
                return {
                    label: 'Activate',
                    action: handleToggleStatus,
                    variant: 'success',
                    icon: _jsx(Play, { className: "w-4 h-4" }),
                };
            case 'active':
                return {
                    label: 'Configure',
                    action: () => onConfigure?.(tool.id),
                    variant: 'default',
                    icon: _jsx(Settings, { className: "w-4 h-4" }),
                };
            default:
                return null;
        }
    };
    const primaryAction = getPrimaryAction();
    if (variant === 'compact') {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, whileHover: { y: -2 }, className: cn('relative group cursor-pointer overflow-hidden', 'bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl', 'border border-[var(--hive-border-primary)]/20 rounded-xl p-3', 'hover:border-[var(--hive-brand-primary)]/30 transition-all duration-300', tool.status === 'error' && 'border-[var(--hive-status-error)]/30', tool.status === 'needs_setup' && 'border-[var(--hive-status-warning)]/30', className), onClick: () => onViewDetails?.(tool.id), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-lg", children: tool.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] truncate text-sm", children: tool.name }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: cn('flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border', statusConfig.bgColor, statusConfig.borderColor, statusConfig.color), children: [statusConfig.icon, _jsx("span", { children: statusConfig.label })] }) })] })] }) }));
    }
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: { y: -4 }, className: cn('relative group cursor-pointer overflow-hidden', 'bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl', 'border border-[var(--hive-border-primary)]/20 rounded-2xl p-5', 'hover:border-[var(--hive-brand-primary)]/30 hover:shadow-lg', 'transition-all duration-300', tool.status === 'error' && 'border-[var(--hive-status-error)]/30', tool.status === 'needs_setup' && 'border-[var(--hive-status-warning)]/30', className), children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-2xl", children: tool.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300", children: tool.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] line-clamp-1", children: tool.description }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("div", { className: cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border', categoryConfig.bgColor, categoryConfig.borderColor, categoryConfig.color), children: [categoryConfig.icon, _jsx("span", { className: "capitalize", children: tool.category })] }), _jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["v", tool.version] })] })] })] }), showActions && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    setShowMenu(!showMenu);
                                }, className: "w-8 h-8 rounded-lg flex items-center justify-center text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }), _jsx(AnimatePresence, { children: showMenu && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute right-0 top-10 w-48 bg-[var(--hive-background-secondary)]/95 backdrop-blur-xl border border-[var(--hive-border-primary)]/30 rounded-xl shadow-lg z-50 py-2", children: [tool.canConfigure && (_jsxs("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                onConfigure?.(tool.id);
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2", children: [_jsx(Settings, { className: "w-4 h-4" }), "Configure Tool"] })), tool.outputs && tool.outputs > 0 && (_jsxs("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                onViewOutputs?.(tool.id);
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), "View Posts (", tool.outputs, ")"] })), _jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                handleToggleStatus();
                                                setShowMenu(false);
                                            }, disabled: isToggling, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50", children: tool.status === 'active' ? (_jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-4 h-4" }), isToggling ? 'Disabling...' : 'Disable Tool'] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4" }), isToggling ? 'Activating...' : 'Activate Tool'] })) }), tool.canRemove && (_jsxs("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                onRemove?.(tool.id);
                                                setShowMenu(false);
                                            }, className: "w-full px-4 py-2 text-left text-sm text-[var(--hive-status-error)] hover:bg-[var(--hive-background-primary)]/50 transition-colors duration-200 flex items-center gap-2", children: [_jsx(Trash2, { className: "w-4 h-4" }), "Remove Tool"] }))] })) })] }))] }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: cn('flex items-center gap-2 px-3 py-1.5 rounded-xl border', statusConfig.bgColor, statusConfig.borderColor), children: [statusConfig.icon, _jsx("span", { className: cn('text-sm font-medium', statusConfig.color), children: statusConfig.label })] }), tool.lastUsed && (_jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["Last used ", formatTimeAgo(tool.lastUsed)] }))] }), tool.status === 'error' && tool.errorMessage && (_jsx("div", { className: "mb-4 p-3 bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20 rounded-xl", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-[var(--hive-status-error)] mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-status-error)]", children: "Tool Error" }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)] mt-1", children: tool.errorMessage })] })] }) })), showStats && (_jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [tool.outputs !== undefined && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: tool.outputs }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Posts" })] })), tool.usageCount !== undefined && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: tool.usageCount }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Uses" })] })), tool.interactions !== undefined && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: tool.interactions }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Interactions" })] }))] })), primaryAction && (_jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: (e) => {
                    e.stopPropagation();
                    primaryAction.action();
                }, disabled: isToggling, className: cn('w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50', primaryAction.variant === 'warning' && 'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/40 hover:bg-[var(--hive-status-warning)]/30', primaryAction.variant === 'error' && 'bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/40 hover:bg-[var(--hive-status-error)]/30', primaryAction.variant === 'success' && 'bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/40 hover:bg-[var(--hive-status-success)]/30', primaryAction.variant === 'default' && 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30'), children: [primaryAction.icon, _jsx("span", { children: isToggling ? 'Loading...' : primaryAction.label })] })), _jsx("div", { className: "absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" })] }));
};
export default PlantedToolWidget;
//# sourceMappingURL=planted-tool-widget.js.map