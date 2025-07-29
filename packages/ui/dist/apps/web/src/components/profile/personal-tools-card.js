"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiveCard, HiveButton } from '@hive/ui';
// Simulated personal tools data - will connect to Tool System APIs
const mockPersonalTools = [
    { id: 'study-timer', name: 'Study Timer', icon: '⏱️', category: 'productivity', isInstalled: true, lastUsed: '2024-01-20T10:30:00Z', usageCount: 45, quickLaunch: true },
    { id: 'task-tracker', name: 'Task Tracker', icon: '✅', category: 'productivity', isInstalled: true, lastUsed: '2024-01-20T09:15:00Z', usageCount: 32, quickLaunch: true },
    { id: 'grade-calc', name: 'Grade Calculator', icon: '📊', category: 'study', isInstalled: true, lastUsed: '2024-01-19T16:45:00Z', usageCount: 28, quickLaunch: true },
    { id: 'schedule-sync', name: 'Schedule Sync', icon: '📅', category: 'organization', isInstalled: true, lastUsed: '2024-01-19T14:20:00Z', usageCount: 18, quickLaunch: true },
    { id: 'note-keeper', name: 'Note Keeper', icon: '📝', category: 'study', isInstalled: true, lastUsed: '2024-01-18T11:10:00Z', usageCount: 55, quickLaunch: true },
    { id: 'campus-map', name: 'Campus Navigator', icon: '🗺️', category: 'other', isInstalled: true, lastUsed: '2024-01-17T13:25:00Z', usageCount: 12, quickLaunch: false },
];
const mockUsageStats = {
    totalTools: 6,
    weeklyUsage: 24,
    lastUsed: 'Study Timer • 2 hours ago',
    mostUsedTool: 'Note Keeper'
};
// Fetch personal tools - connects to Tool System API
async function fetchPersonalTools() {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
            const session = JSON.parse(sessionJson);
            headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'dev_token_' + (session.userId || '123') : session.token}`;
        }
        else {
            headers.Authorization = `Bearer dev_token_123`;
        }
    }
    catch (error) {
        console.warn('Could not get auth token for tools, using dev token');
        headers.Authorization = `Bearer dev_token_123`;
    }
    const response = await fetch('/api/tools/personal', { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch personal tools: ${response.statusText}`);
    }
    const data = await response.json();
    return data.tools || [];
}
// Fetch tool usage statistics
async function fetchToolUsageStats() {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
            const session = JSON.parse(sessionJson);
            headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'dev_token_' + (session.userId || '123') : session.token}`;
        }
        else {
            headers.Authorization = `Bearer dev_token_123`;
        }
    }
    catch (error) {
        console.warn('Could not get auth token for tool stats, using dev token');
        headers.Authorization = `Bearer dev_token_123`;
    }
    const response = await fetch('/api/tools/usage-stats', { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch tool usage stats: ${response.statusText}`);
    }
    const data = await response.json();
    return data.stats || mockUsageStats;
}
export function PersonalToolsCard({ className = "", variant = "desktop", onToolClick, onManageTools, onAddTools }) {
    const [isHovered, setIsHovered] = useState(false);
    // Query personal tools
    const { data: tools, isLoading: toolsLoading, error: toolsError } = useQuery({
        queryKey: ["personal-tools"],
        queryFn: fetchPersonalTools,
        staleTime: 300000, // 5 minutes
    });
    // Query usage statistics
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ["tool-usage-stats"],
        queryFn: fetchToolUsageStats,
        staleTime: 300000, // 5 minutes
    });
    // Handle tool launch
    const handleToolClick = (toolId) => {
        console.log(`Launching tool: ${toolId}`);
        // Track tool usage analytics
        if (onToolClick) {
            onToolClick(toolId);
        }
        else {
            // Default tool launch behavior - navigate to tool interface
            window.location.href = `/tools/${toolId}/run`;
        }
    };
    // Handle manage tools click
    const handleManageTools = () => {
        console.log('Opening tool management interface');
        if (onManageTools) {
            onManageTools();
        }
        else {
            // Default behavior - navigate to tools management
            window.location.href = '/tools';
        }
    };
    // Handle add tools click
    const handleAddTools = () => {
        console.log('Opening tool marketplace');
        if (onAddTools) {
            onAddTools();
        }
        else {
            // Default behavior - navigate to tool marketplace
            window.location.href = '/tools/browse';
        }
    };
    // Loading State
    if (toolsLoading || statsLoading) {
        return (_jsx(HiveCard, { className: `h-full p-4 ${className}`, children: _jsxs("div", { className: "animate-pulse", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-20 h-4 bg-hive-text-muted/20 rounded" })] }), _jsx("div", { className: "w-16 h-6 bg-hive-text-muted/20 rounded" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "w-32 h-4 bg-hive-text-muted/20 rounded mb-2" }), _jsx("div", { className: "grid grid-cols-6 gap-2 p-3 bg-hive-background-secondary/50 rounded-lg", children: Array.from({ length: 12 }).map((_, i) => (_jsx("div", { className: "w-10 h-10 bg-hive-text-muted/20 rounded-lg" }, i))) })] }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsx("div", { className: "w-24 h-4 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-40 h-3 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-36 h-3 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-32 h-3 bg-hive-text-muted/20 rounded" })] }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsx("div", { className: "w-40 h-4 bg-hive-text-muted/20 rounded" }), _jsxs("div", { className: "p-3 bg-hive-background-secondary/50 rounded-lg space-y-2", children: [_jsx("div", { className: "w-full h-3 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-3/4 h-3 bg-hive-text-muted/20 rounded" }), _jsx("div", { className: "w-5/6 h-3 bg-hive-text-muted/20 rounded" })] })] }), _jsx("div", { className: "text-center text-sm text-hive-text-muted", children: "\uD83D\uDD04 Syncing tool configurations and data..." })] }) }));
    }
    // Empty State
    if (!tools || tools.length === 0) {
        return (_jsx(HiveCard, { className: `h-full p-6 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-hive-brand-primary/10 transition-all duration-300 ease-out ${className}`, onClick: handleAddTools, children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDD27" }), _jsx("h3", { className: "text-sm font-semibold text-hive-text-primary", children: "Your Tools" })] }), _jsx(HiveButton, { onClick: (e) => {
                                    e.stopPropagation();
                                    handleAddTools();
                                }, variant: "outline", size: "sm", className: "text-xs", children: "Browse Tools \u2197" })] }), _jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center", children: [_jsx("div", { className: "text-4xl mb-4 transition-transform duration-300 hover:scale-110", children: "\uD83D\uDD27" }), _jsx("h4", { className: "text-base font-semibold text-hive-text-primary mb-2", children: "Build Your Personal Toolkit" }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-6 max-w-xs", children: "Tools are personal utilities that help you stay organized and productive." }), _jsxs("div", { className: "w-full p-4 bg-hive-background-secondary/50 rounded-lg mb-6", children: [_jsx("h5", { className: "text-xs font-semibold text-hive-text-primary mb-3", children: "\uD83D\uDCA1 GETTING STARTED:" }), _jsxs("ul", { className: "text-xs text-hive-text-secondary space-y-1 text-left", children: [_jsx("li", { children: "\u2022 Browse the tool marketplace" }), _jsx("li", { children: "\u2022 Install tools that fit your needs" }), _jsx("li", { children: "\u2022 Launch tools directly from your Profile" }), _jsx("li", { children: "\u2022 Track your productivity and usage" })] })] }), _jsx(HiveButton, { onClick: (e) => {
                                    e.stopPropagation();
                                    handleAddTools();
                                }, variant: "primary", className: "hover:scale-105 transition-all duration-200", children: "+ Install Your First Tool" })] }), _jsx("div", { className: "text-xs text-hive-text-muted text-center mt-4", children: "Click to explore tool options \u2197" })] }) }));
    }
    // Default State with Tools
    const quickLaunchTools = tools.filter(tool => tool.quickLaunch);
    const totalSlots = variant === 'desktop' ? 12 : 8;
    return (_jsx(HiveCard, { className: `h-full p-4 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-hive-brand-primary/10 transition-all duration-300 ease-out group ${className}`, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: handleManageTools, children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg transition-transform duration-200 group-hover:scale-110", children: "\uD83D\uDD27" }), _jsx("h3", { className: "text-sm font-semibold text-hive-text-primary", children: "Your Tools" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { onClick: (e) => {
                                        e.stopPropagation();
                                        handleAddTools();
                                    }, variant: "outline", size: "sm", className: "text-xs transition-all duration-200 hover:scale-105", children: "+ Add" }), _jsx(HiveButton, { onClick: (e) => {
                                        e.stopPropagation();
                                        handleManageTools();
                                    }, variant: "ghost", size: "sm", className: "text-xs transition-all duration-200 hover:scale-105", children: "\u2699\uFE0F Manage" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-xs font-semibold text-hive-brand-primary mb-2", children: "\uD83D\uDE80 INSTALLED TOOLS" }), _jsxs("div", { className: "p-3 bg-hive-background-secondary/30 rounded-lg border border-hive-border-primary/20", children: [_jsx("div", { className: `grid ${variant === 'desktop' ? 'grid-cols-6' : 'grid-cols-4'} gap-2 mb-2`, children: Array.from({ length: totalSlots }).map((_, index) => {
                                        const tool = quickLaunchTools[index];
                                        if (tool) {
                                            return (_jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    handleToolClick(tool.id);
                                                }, className: "w-10 h-10 rounded-lg bg-hive-background-secondary border border-hive-border-primary flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 hover:border-hive-brand-primary/40 hover:bg-hive-brand-primary/10 active:scale-95", title: tool.name, children: tool.icon }, tool.id));
                                        }
                                        else {
                                            return (_jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    handleAddTools();
                                                }, className: "w-10 h-10 rounded-lg bg-hive-background-secondary border border-hive-border-primary/50 border-dashed flex items-center justify-center text-hive-text-muted transition-all duration-200 hover:scale-105 hover:border-hive-brand-primary/60 hover:text-hive-brand-primary", children: "+" }, `empty-${index}`));
                                        }
                                    }) }), _jsx("p", { className: "text-xs text-hive-text-muted", children: "\u2191 Tap any tool to launch" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-xs font-semibold text-hive-text-primary mb-2", children: "\uD83D\uDCCA TOOL ACTIVITY" }), _jsxs("div", { className: "space-y-1 text-xs text-hive-text-secondary", children: [_jsxs("div", { children: ["\u2022 ", stats?.totalTools || 0, " tools installed and configured"] }), _jsxs("div", { children: ["\u2022 Used ", stats?.weeklyUsage || 0, " times this week"] }), _jsxs("div", { children: ["\u2022 Last used: ", stats?.lastUsed || 'No recent activity'] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-xs font-semibold text-hive-text-primary mb-2", children: "\uD83C\uDFAF TOOL IMPACT (Available in v1)" }), _jsx("div", { className: "p-3 bg-hive-background-secondary/20 rounded-lg border border-hive-border-primary/10", children: _jsxs("div", { className: "space-y-1 text-xs text-hive-text-muted", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Tool usage analytics and sharing" }), _jsx("span", { className: "text-hive-text-muted/60", children: "[LOCKED] \u2197" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Community impact metrics" }), _jsx("span", { className: "text-hive-text-muted/60", children: "[LOCKED] \u2197" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "Tool recommendations and discovery" }), _jsx("span", { className: "text-hive-text-muted/60", children: "[LOCKED] \u2197" })] })] }) })] }), _jsx("div", { className: "mt-auto", children: _jsx(HiveButton, { onClick: (e) => {
                            e.stopPropagation();
                            handleManageTools();
                        }, variant: "ghost", size: "sm", className: `w-full text-xs transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-70'}`, children: "Manage All Tools \u2197" }) }), _jsx("div", { className: "text-xs text-hive-text-muted text-center mt-2 opacity-70", children: "Click card body to open tool interface \u2197" })] }) }));
}
//# sourceMappingURL=personal-tools-card.js.map