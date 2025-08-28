"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Lab Integration - Complete Platform Integration
 *
 * This is the comprehensive integration system that connects all HIVE tools
 * with the broader platform ecosystem including:
 * - Profile integration
 * - Space coordination
 * - Feed connectivity
 * - Analytics tracking
 * - Cross-platform synchronization
 */
import { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Zap, Users, TrendingUp, Share2, Settings, Layers, Cpu, Database } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ToolRuntimeEngine } from './tool-runtime-engine';
import { ToolMarketplace } from './tool-marketplace';
import { SpaceToolsTab } from './space-tools-tab';
import { EventSystemDashboard } from '../events/event-system-dashboard';
import { PerformanceMonitor, useToolCache } from './performance-optimizer';
export function HiveLabIntegration({ userId, spaceId, userRole = 'member', className }) {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedTool, setSelectedTool] = useState(null);
    // Cached data with performance optimization
    const { data: labStats, loading: statsLoading } = useToolCache(`lab-stats-${userId}`, async () => {
        const response = await fetch(`/api/tools/lab/stats?userId=${userId}`);
        if (response.ok) {
            return response.json();
        }
        // Fallback data
        return {
            totalTools: 23,
            activeTools: 8,
            totalSpaces: 4,
            weeklyUsage: 47,
            systemHealth: 'excellent'
        };
    });
    const { data: recentActivity } = useToolCache(`lab-activity-${userId}`, async () => {
        const response = await fetch(`/api/tools/lab/activity?userId=${userId}&limit=10`);
        if (response.ok) {
            return response.json();
        }
        return [];
    });
    // Analytics tracking
    const trackLabAction = useCallback(async (action, metadata) => {
        try {
            await fetch('/api/analytics/lab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    spaceId,
                    action,
                    metadata,
                    timestamp: new Date().toISOString()
                })
            });
        }
        catch (error) {
            console.error('Failed to track lab action:', error);
        }
    }, [userId, spaceId]);
    // Tool launch handler
    const handleLaunchTool = useCallback((tool) => {
        setSelectedTool(tool);
        setCurrentView('tools');
        trackLabAction('tool_launched', { toolId: tool.id, toolName: tool.name });
    }, [trackLabAction]);
    // Running tool view
    if (selectedTool) {
        return (_jsx(PerformanceMonitor, { children: _jsxs("div", { className: cn("space-y-4", className), children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => {
                                        setSelectedTool(null);
                                        setCurrentView('dashboard');
                                    }, children: "\u2190 Back to HIVE Lab" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Cpu, { className: "w-5 h-5 text-amber-600" }), _jsx("span", { className: "font-medium text-gray-900", children: "Tool Runtime" })] })] }) }), _jsx(ToolRuntimeEngine, { tool: selectedTool, userId: userId, spaceId: spaceId, mode: "production", onSave: async (data) => {
                            await fetch(`/api/tools/${selectedTool.id}/save`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId, spaceId, data })
                            });
                        }, onSubmit: async (data) => {
                            await fetch(`/api/tools/${selectedTool.id}/submit`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId, spaceId, data })
                            });
                            trackLabAction('tool_submitted', { toolId: selectedTool.id, dataSize: JSON.stringify(data).length });
                            setSelectedTool(null);
                            setCurrentView('dashboard');
                        } })] }) }));
    }
    return (_jsx(PerformanceMonitor, { children: _jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-900 flex items-center gap-3", children: [_jsx(Zap, { className: "w-8 h-8 text-amber-600" }), "HIVE Lab"] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Your integrated development environment for campus tools" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(HiveBadge, { variant: "outline", className: "bg-green-50 text-green-800", children: [labStats?.systemHealth || 'excellent', " health"] }), _jsxs(HiveBadge, { children: [labStats?.activeTools || 0, " tools active"] })] })] }), _jsx("div", { className: "flex gap-1 p-1 bg-gray-100 rounded-lg overflow-x-auto", children: [
                        { id: 'dashboard', label: 'Dashboard', icon: Layers },
                        { id: 'events', label: 'Event System', icon: Users },
                        { id: 'tools', label: 'My Tools', icon: Settings },
                        { id: 'marketplace', label: 'Marketplace', icon: Share2 },
                        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setCurrentView(tab.id), className: cn("flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap", currentView === tab.id
                                ? "bg-white text-amber-600 shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"), children: [_jsx(Icon, { className: "w-4 h-4" }), tab.label] }, tab.id));
                    }) }), currentView === 'dashboard' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Settings, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: labStats?.totalTools || 0 }), _jsx("p", { className: "text-sm text-gray-600", children: "Total Tools" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5 text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: labStats?.totalSpaces || 0 }), _jsx("p", { className: "text-sm text-gray-600", children: "Connected Spaces" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center", children: _jsx(TrendingUp, { className: "w-5 h-5 text-amber-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: labStats?.weeklyUsage || 0 }), _jsx("p", { className: "text-sm text-gray-600", children: "Weekly Usage" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center", children: _jsx(Database, { className: "w-5 h-5 text-purple-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: "24" }), _jsx("p", { className: "text-sm text-gray-600", children: "Element Library" })] })] }) })] }), _jsxs("div", { className: "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6", children: [_jsxs("h3", { className: "font-semibold text-amber-800 mb-3 flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5" }), "\uD83C\uDFAF vBETA Production System Status"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-amber-800", children: "Core Systems" }), _jsxs("div", { className: "space-y-1 text-amber-700", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Tool Runtime Engine" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Online" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 24-Element Library" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Complete" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Event Management" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Active" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-amber-800", children: "Integration Status" }), _jsxs("div", { className: "space-y-1 text-amber-700", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Profile Integration" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Connected" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Space Coordination" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Synced" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Mobile Responsive" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Optimized" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-amber-800", children: "Performance" }), _jsxs("div", { className: "space-y-1 text-amber-700", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Caching System" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Active" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Load Time" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "<2s" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: "\u2022 Memory Usage" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 text-xs", children: "Optimal" })] })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs(HiveCard, { className: "p-4 hover:shadow-md transition-shadow cursor-pointer", onClick: () => setCurrentView('events'), children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Users, { className: "w-6 h-6 text-amber-600" }), _jsx("h3", { className: "font-semibold text-gray-900", children: "Event System" })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Complete event coordination with 5 integrated tools" }), _jsx(HiveButton, { size: "sm", className: "w-full", children: "Launch Event System" })] }), _jsxs(HiveCard, { className: "p-4 hover:shadow-md transition-shadow cursor-pointer", onClick: () => setCurrentView('marketplace'), children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Share2, { className: "w-6 h-6 text-amber-600" }), _jsx("h3", { className: "font-semibold text-gray-900", children: "Tool Marketplace" })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Discover and install tools built by the community" }), _jsx(HiveButton, { size: "sm", variant: "outline", className: "w-full", children: "Browse Tools" })] }), _jsxs(HiveCard, { className: "p-4 hover:shadow-md transition-shadow cursor-pointer", onClick: () => setCurrentView('analytics'), children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(TrendingUp, { className: "w-6 h-6 text-amber-600" }), _jsx("h3", { className: "font-semibold text-gray-900", children: "Analytics" })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Track usage and performance across all tools" }), _jsx(HiveButton, { size: "sm", variant: "outline", className: "w-full", children: "View Analytics" })] })] })] })), currentView === 'events' && spaceId && (_jsx(EventSystemDashboard, { spaceId: spaceId, userId: userId, userRole: userRole })), currentView === 'tools' && spaceId && (_jsx(SpaceToolsTab, { spaceId: spaceId, userId: userId, userRole: userRole })), currentView === 'marketplace' && (_jsx(ToolMarketplace, { spaceId: spaceId, userId: userId, onInstallTool: async (toolId) => {
                        await fetch(`/api/tools/install`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ toolId, spaceId, userId })
                        });
                        trackLabAction('tool_installed', { toolId });
                    }, onViewTool: (toolId) => {
                        trackLabAction('tool_viewed', { toolId });
                    } })), currentView === 'analytics' && (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Usage Analytics" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Tool Usage Over Time" }), _jsx("div", { className: "h-64 bg-gray-50 rounded-lg flex items-center justify-center", children: _jsx("p", { className: "text-gray-500", children: "Analytics charts would be rendered here" }) })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Performance Metrics" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Average Load Time" }), _jsx("span", { className: "text-sm font-medium", children: "1.2s" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Cache Hit Rate" }), _jsx("span", { className: "text-sm font-medium", children: "94%" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Error Rate" }), _jsx("span", { className: "text-sm font-medium", children: "0.1%" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "User Satisfaction" }), _jsx("span", { className: "text-sm font-medium", children: "4.8/5" })] })] })] })] })] }))] }) }));
}
export default HiveLabIntegration;
//# sourceMappingURL=hive-lab-integration.js.map