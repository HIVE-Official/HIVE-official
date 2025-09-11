'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Plus, Settings, BarChart3, Play, Pause, Trash2, MoreHorizontal, Hash, CheckCircle2, AlertTriangle, Clock, TrendingUp, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
export const HiveToolsSurface = ({ space, tools = [], maxTools, canManageTools = false, leaderMode, isBuilder = false, viewMode = 'grid', onAddTool, onConfigureTool, onViewToolAnalytics, onRunTool, onPauseTool, onRemoveTool }) => {
    const [filter, setFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredTools = useMemo(() => {
        let filtered = tools.filter(tool => {
            const matchesType = filter === 'all' || tool.category === filter;
            const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
            return matchesType && matchesStatus;
        });
        // Sort by deployment count
        filtered.sort((a, b) => b.originalTool.totalDeployments - a.originalTool.totalDeployments);
        if (maxTools) {
            filtered = filtered.slice(0, maxTools);
        }
        return filtered;
    }, [tools, filter, statusFilter, maxTools]);
    const getToolCategoryIcon = (category) => {
        switch (category) {
            case 'study': return '📚';
            case 'social': return '👥';
            case 'productivity': return '⚡';
            case 'coordination': return '🎯';
            case 'analytics': return '📊';
            case 'communication': return '💬';
            case 'resources': return '📁';
            case 'fun': return '🎮';
            default: return '🔧';
        }
    };
    const getToolCategoryColor = (category) => {
        switch (category) {
            case 'study': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'social': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'productivity': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'coordination': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'analytics': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
            case 'communication': return 'text-pink-400 bg-pink-400/10 border-pink-400/20';
            case 'resources': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'fun': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    const getStatusIndicator = (status) => {
        switch (status) {
            case 'active':
                return (_jsxs("div", { className: "flex items-center gap-1 text-green-400", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { className: "text-xs", children: "Active" })] }));
            case 'paused':
                return (_jsxs("div", { className: "flex items-center gap-1 text-yellow-400", children: [_jsx(Pause, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Paused" })] }));
            default:
                return null;
            case 'configuring':
                return (_jsxs("div", { className: "flex items-center gap-1 text-blue-400", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Configuring" })] }));
            case 'error':
                return (_jsxs("div", { className: "flex items-center gap-1 text-red-400", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Error" })] }));
        }
    };
    const formatLastRun = (dateStr) => {
        if (!dateStr)
            return 'Never';
        const date = new Date(dateStr);
        const diff = Date.now() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        if (minutes > 0)
            return `${minutes}m ago`;
        return 'Just now';
    };
    const toolStats = useMemo(() => {
        return {
            total: tools.length,
            active: tools.filter(t => t.status === 'active').length,
            totalUsage: tools.reduce((sum, tool) => sum + tool.usageCount, 0),
            avgRating: tools.length > 0
                ? Math.round(tools.reduce((sum, tool) => sum + tool.originalTool.averageRating, 0) / tools.length * 10) / 10
                : 0
        };
    }, [tools]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: "Tools" }), _jsxs("span", { className: "text-sm text-neutral-400", children: ["(", toolStats.active, "/", toolStats.total, ")"] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canManageTools && (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("button", { onClick: onAddTool, className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Add Tool" })] }) }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: toolStats.total }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Tools" })] }), _jsxs("div", { className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: toolStats.active }), _jsx("div", { className: "text-xs text-neutral-400", children: "Active Tools" })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: toolStats.totalUsage }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Usage" })] }), _jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3", children: [_jsxs("div", { className: "text-lg font-bold text-yellow-400", children: [toolStats.avgRating, "/5"] }), _jsx("div", { className: "text-xs text-neutral-400", children: "Avg Rating" })] })] })), tools.length > 3 && (_jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: [_jsx(Filter, { className: "h-4 w-4 text-neutral-400 flex-shrink-0" }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "study", children: "Study" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "productivity", children: "Productivity" }), _jsx("option", { value: "coordination", children: "Coordination" }), _jsx("option", { value: "analytics", children: "Analytics" }), _jsx("option", { value: "communication", children: "Communication" }), _jsx("option", { value: "resources", children: "Resources" }), _jsx("option", { value: "fun", children: "Fun" })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] })), _jsxs("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
                    : "space-y-3"), children: [_jsx(AnimatePresence, { children: filteredTools.map((tool, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.05 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5", tool.status === 'error' && "border-red-500/30 bg-red-500/5"), children: _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "text-lg", children: getToolCategoryIcon(tool.category) }), _jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: tool.name }), _jsx("span", { className: cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize", getToolCategoryColor(tool.category)), children: tool.category })] }), _jsx("p", { className: "text-sm text-neutral-300 mb-3 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between mb-3", children: [getStatusIndicator(tool.status), tool.originalTool.isVerified && (_jsx(CheckCircle2, { className: "h-4 w-4 text-green-400" }))] }), _jsxs("div", { className: "space-y-1 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Usage:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: tool.usageCount })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Last used:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: formatLastRun(tool.lastUsed) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Rating:" }), _jsxs("span", { className: cn("font-medium", tool.originalTool.averageRating >= 4.5 ? "text-green-400" :
                                                                    tool.originalTool.averageRating >= 3.5 ? "text-yellow-400" : "text-orange-400"), children: [tool.originalTool.averageRating, "/5 (", tool.originalTool.ratingCount, ")"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Deployments:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: tool.originalTool.totalDeployments })] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "mt-3 pt-3 border-t border-purple-500/20 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Version:" }), _jsx("span", { className: "text-purple-400", children: tool.version })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Deployed by:" }), _jsx("span", { className: "text-purple-400", children: tool.deployer?.name || 'Unknown' })] })] }))] }), _jsxs("div", { className: "flex flex-col gap-2 ml-4", children: [tool.status === 'active' && canManageTools && (_jsx("button", { onClick: () => onRunTool?.(tool.deploymentId), className: "p-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", title: "Run tool", children: _jsx(Play, { className: "h-4 w-4" }) })), tool.status === 'active' && canManageTools && (_jsx("button", { onClick: () => onPauseTool?.(tool.deploymentId), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Pause tool", children: _jsx(Pause, { className: "h-4 w-4 text-neutral-400" }) })), canManageTools && (_jsx("button", { onClick: () => onConfigureTool?.(tool.deploymentId), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Configure tool", children: _jsx(Settings, { className: "h-4 w-4 text-neutral-400" }) })), (isBuilder || leaderMode === 'insights') && (_jsx("button", { onClick: () => onViewToolAnalytics?.(tool.deploymentId), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "View analytics", children: _jsx(BarChart3, { className: "h-4 w-4 text-neutral-400" }) })), canManageTools && (_jsx("div", { className: "relative", children: _jsx("button", { className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-neutral-400" }) }) })), canManageTools && (_jsx("button", { onClick: () => onRemoveTool?.(tool.deploymentId), className: "p-2 hover:bg-red-500/10 rounded-lg transition-colors", title: "Remove tool", children: _jsx(Trash2, { className: "h-4 w-4 text-red-400" }) }))] })] }) }, tool.deploymentId))) }), filteredTools.length === 0 && (_jsxs("div", { className: "text-center py-8 col-span-full", children: [_jsx(Hash, { className: "h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" }), _jsx("p", { className: "text-neutral-400", children: "No tools found" }), _jsx("p", { className: "text-sm text-neutral-500 mt-1", children: canManageTools ? 'Add tools to enhance your space functionality' : 'Tools will appear here when added by leaders' })] }))] }), maxTools && tools.length > maxTools && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium", children: ["View all ", tools.length, " tools"] }) }))] }));
};
export default HiveToolsSurface;
//# sourceMappingURL=hive-tools-surface.js.map