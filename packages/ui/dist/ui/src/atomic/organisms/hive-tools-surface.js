'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Plus, Settings, BarChart3, Play, Pause, Trash2, MoreHorizontal, Hash, CheckCircle2, AlertTriangle, Clock, TrendingUp, Activity, Zap, Filter } from 'lucide-react';
import { cn } from '../../lib/utils.js';
// Mock tools data
const mockTools = [
    {
        id: '1',
        name: 'Study Session Coordinator',
        description: 'Automatically matches students for study sessions based on courses and availability.',
        type: 'coordination',
        status: 'active',
        icon: '📚',
        isConfigured: true,
        configuredBy: {
            id: 'ra1',
            name: 'Jordan Martinez',
            role: 'RA'
        },
        configuredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        executions: 23,
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        errorCount: 1,
        successRate: 96,
        outputChannel: 'posts',
        permissions: {
            canExecute: ['member', 'moderator', 'admin', 'owner'],
            canConfigure: ['admin', 'owner'],
            canView: ['member', 'moderator', 'admin', 'owner']
        }
    },
    {
        id: '2',
        name: 'Food Run Organizer',
        description: 'Helps coordinate group food orders with automatic order collection and payment tracking.',
        type: 'coordination',
        status: 'active',
        icon: '🍕',
        isConfigured: true,
        configuredBy: {
            id: 'u1',
            name: 'Sarah Chen',
            role: 'admin'
        },
        configuredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        executions: 8,
        lastRun: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        errorCount: 0,
        successRate: 100,
        outputChannel: 'posts',
        permissions: {
            canExecute: ['member', 'moderator', 'admin', 'owner'],
            canConfigure: ['admin', 'owner'],
            canView: ['member', 'moderator', 'admin', 'owner']
        }
    },
    {
        id: '3',
        name: 'Event Attendance Tracker',
        description: 'Tracks attendance at floor events and generates participation reports.',
        type: 'analytics',
        status: 'configuring',
        icon: '📊',
        isConfigured: false,
        configuredBy: {
            id: 'ra1',
            name: 'Jordan Martinez',
            role: 'RA'
        },
        configuredAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        executions: 0,
        errorCount: 0,
        permissions: {
            canExecute: ['admin', 'owner'],
            canConfigure: ['admin', 'owner'],
            canView: ['moderator', 'admin', 'owner']
        }
    },
    {
        id: '4',
        name: 'Maintenance Request Bot',
        description: 'Automatically submits maintenance requests to campus facilities.',
        type: 'integration',
        status: 'error',
        icon: '🔧',
        isConfigured: true,
        configuredBy: {
            id: 'ra1',
            name: 'Jordan Martinez',
            role: 'RA'
        },
        configuredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        executions: 12,
        lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        errorCount: 3,
        successRate: 75,
        permissions: {
            canExecute: ['member', 'moderator', 'admin', 'owner'],
            canConfigure: ['admin', 'owner'],
            canView: ['member', 'moderator', 'admin', 'owner']
        }
    }
];
export const HiveToolsSurface = ({ space, tools = mockTools, maxTools, canManageTools = false, leaderMode, isBuilder = false, viewMode = 'grid', onAddTool, onConfigureTool, onViewToolAnalytics, onRunTool, onPauseTool, onRemoveTool }) => {
    const [filter, setFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredTools = useMemo(() => {
        let filtered = tools.filter(tool => {
            const matchesType = filter === 'all' || tool.type === filter;
            const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
            return matchesType && matchesStatus;
        });
        // Sort by status priority: active > configuring > paused > error
        const statusPriority = { active: 0, configuring: 1, paused: 2, error: 3 };
        filtered.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
        if (maxTools) {
            filtered = filtered.slice(0, maxTools);
        }
        return filtered;
    }, [tools, filter, statusFilter, maxTools]);
    const getToolTypeIcon = (type) => {
        switch (type) {
            case 'automation': return _jsx(Zap, { className: "h-4 w-4" });
            case 'coordination': return _jsx(Activity, { className: "h-4 w-4" });
            case 'analytics': return _jsx(BarChart3, { className: "h-4 w-4" });
            case 'utility': return _jsx(Settings, { className: "h-4 w-4" });
            case 'integration': return _jsx(Code, { className: "h-4 w-4" });
            default: return _jsx(Hash, { className: "h-4 w-4" });
        }
    };
    const getToolTypeColor = (type) => {
        switch (type) {
            case 'automation': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'coordination': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'analytics': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'utility': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'integration': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    const getStatusIndicator = (status) => {
        switch (status) {
            case 'active':
                return (_jsxs("div", { className: "flex items-center gap-1 text-green-400", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { className: "text-xs", children: "Active" })] }));
            case 'paused':
                return (_jsxs("div", { className: "flex items-center gap-1 text-yellow-400", children: [_jsx(Pause, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Paused" })] }));
            case 'configuring':
                return (_jsxs("div", { className: "flex items-center gap-1 text-blue-400", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Configuring" })] }));
            case 'error':
                return (_jsxs("div", { className: "flex items-center gap-1 text-red-400", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Error" })] }));
        }
    };
    const formatLastRun = (date) => {
        if (!date)
            return 'Never';
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
            totalExecutions: tools.reduce((sum, tool) => sum + (tool.executions || 0), 0),
            avgSuccessRate: tools.length > 0
                ? Math.round(tools.reduce((sum, tool) => sum + (tool.successRate || 0), 0) / tools.length)
                : 0
        };
    }, [tools]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: "Tools" }), _jsxs("span", { className: "text-sm text-neutral-400", children: ["(", toolStats.active, "/", toolStats.total, ")"] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canManageTools && (_jsx("div", { className: "flex items-center gap-2", children: _jsxs("button", { onClick: onAddTool, className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Add Tool" })] }) }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: toolStats.total }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Tools" })] }), _jsxs("div", { className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: toolStats.active }), _jsx("div", { className: "text-xs text-neutral-400", children: "Active Tools" })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: toolStats.totalExecutions }), _jsx("div", { className: "text-xs text-neutral-400", children: "Executions" })] }), _jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3", children: [_jsxs("div", { className: "text-lg font-bold text-yellow-400", children: [toolStats.avgSuccessRate, "%"] }), _jsx("div", { className: "text-xs text-neutral-400", children: "Success Rate" })] })] })), tools.length > 3 && (_jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: [_jsx(Filter, { className: "h-4 w-4 text-neutral-400 flex-shrink-0" }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Types" }), _jsx("option", { value: "coordination", children: "Coordination" }), _jsx("option", { value: "analytics", children: "Analytics" }), _jsx("option", { value: "automation", children: "Automation" }), _jsx("option", { value: "integration", children: "Integration" }), _jsx("option", { value: "utility", children: "Utility" })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "paused", children: "Paused" }), _jsx("option", { value: "configuring", children: "Configuring" }), _jsx("option", { value: "error", children: "Error" })] })] })), _jsxs("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
                    : "space-y-3"), children: [_jsx(AnimatePresence, { children: filteredTools.map((tool, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.05 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5", tool.status === 'error' && "border-red-500/30 bg-red-500/5"), children: _jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "text-lg", children: tool.icon || '🔧' }), _jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: tool.name }), _jsxs("span", { className: cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize flex items-center gap-1", getToolTypeColor(tool.type)), children: [getToolTypeIcon(tool.type), tool.type] })] }), _jsx("p", { className: "text-sm text-neutral-300 mb-3 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between mb-3", children: [getStatusIndicator(tool.status), tool.isConfigured ? (_jsx(CheckCircle2, { className: "h-4 w-4 text-green-400" })) : (_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-400" }))] }), tool.executions !== undefined && (_jsxs("div", { className: "space-y-1 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Executions:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: tool.executions })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Last run:" }), _jsx("span", { className: "text-[var(--hive-text-inverse)]", children: formatLastRun(tool.lastRun) })] }), tool.successRate !== undefined && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Success rate:" }), _jsxs("span", { className: cn("font-medium", tool.successRate >= 95 ? "text-green-400" :
                                                                    tool.successRate >= 80 ? "text-yellow-400" : "text-red-400"), children: [tool.successRate, "%"] })] })), tool.errorCount !== undefined && tool.errorCount > 0 && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Recent errors:" }), _jsx("span", { className: "text-red-400", children: tool.errorCount })] }))] })), leaderMode === 'insights' && (_jsxs("div", { className: "mt-3 pt-3 border-t border-purple-500/20 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Output:" }), _jsx("span", { className: "text-purple-400 capitalize", children: tool.outputChannel || 'none' })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-neutral-400", children: "Configured by:" }), _jsx("span", { className: "text-purple-400", children: tool.configuredBy.name })] })] }))] }), _jsxs("div", { className: "flex flex-col gap-2 ml-4", children: [tool.status === 'active' && canManageTools && (_jsx("button", { onClick: () => onRunTool?.(tool.id), className: "p-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", title: "Run tool", children: _jsx(Play, { className: "h-4 w-4" }) })), tool.status === 'active' && canManageTools && (_jsx("button", { onClick: () => onPauseTool?.(tool.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Pause tool", children: _jsx(Pause, { className: "h-4 w-4 text-neutral-400" }) })), canManageTools && (_jsx("button", { onClick: () => onConfigureTool?.(tool.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Configure tool", children: _jsx(Settings, { className: "h-4 w-4 text-neutral-400" }) })), (isBuilder || leaderMode === 'insights') && (_jsx("button", { onClick: () => onViewToolAnalytics?.(tool.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "View analytics", children: _jsx(BarChart3, { className: "h-4 w-4 text-neutral-400" }) })), canManageTools && (_jsx("div", { className: "relative", children: _jsx("button", { className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-neutral-400" }) }) })), canManageTools && (_jsx("button", { onClick: () => onRemoveTool?.(tool.id), className: "p-2 hover:bg-red-500/10 rounded-lg transition-colors", title: "Remove tool", children: _jsx(Trash2, { className: "h-4 w-4 text-red-400" }) }))] })] }) }, tool.id))) }), filteredTools.length === 0 && (_jsxs("div", { className: "text-center py-8 col-span-full", children: [_jsx(Hash, { className: "h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" }), _jsx("p", { className: "text-neutral-400", children: "No tools found" }), _jsx("p", { className: "text-sm text-neutral-500 mt-1", children: canManageTools ? 'Add tools to enhance your space functionality' : 'Tools will appear here when added by leaders' })] }))] }), maxTools && tools.length > maxTools && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium", children: ["View all ", tools.length, " tools"] }) }))] }));
};
export default HiveToolsSurface;
//# sourceMappingURL=hive-tools-surface.js.map