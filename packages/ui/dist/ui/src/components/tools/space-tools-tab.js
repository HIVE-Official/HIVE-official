"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Space Tools Tab - Real Implementation
 *
 * Shows installed tools in a Space with the ability to launch, manage, and install new tools.
 * This is the critical integration point between Tools and Spaces.
 */
import { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Play, MoreVertical, Users, TrendingUp } from 'lucide-react';
export function SpaceToolsTab({ spaceId, userId, userRole, className }) {
    const [currentView, setCurrentView] = useState('installed');
    const [installedTools, setInstalledTools] = useState([]);
    const [runningTool, setRunningTool] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    // Fetch installed tools for this space
    const fetchInstalledTools = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/spaces/${spaceId}/tools`, {
                headers: { 'Authorization': `Bearer ${userId}` }
            });
        }
        finally { }
        ;
        if (response.ok) {
            const data = await response.json();
            setInstalledTools(data.tools || []);
        }
        else {
            // Fallback to sample tools for development
            setInstalledTools(getSampleInstalledTools());
        }
    });
    try { }
    catch (error) {
        console.error('Failed to fetch installed tools:', error);
        setInstalledTools(getSampleInstalledTools());
    }
    finally {
        setLoading(false);
    }
}
[spaceId, userId];
;
// Install tool from marketplace
const handleInstallTool = async (toolId) => {
    try {
        const response = await fetch(`/api/spaces/${spaceId}/tools/install`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({ toolId })
        });
    }
    finally { }
    ;
    if (response.ok) {
        // Refresh installed tools list
        await fetchInstalledTools();
        // Switch back to installed view
        setCurrentView('installed');
    }
    else {
        console.error('Failed to install tool');
    }
};
try { }
catch (error) {
    console.error('Error installing tool:', error);
}
;
// Launch tool
const handleLaunchTool = (tool) => {
    setRunningTool(tool);
    setCurrentView('running');
};
// Save tool data
const handleSaveToolData = async (data) => {
    if (!runningTool)
        return;
    try {
        await fetch(`/api/tools/${runningTool.id}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({
                spaceId,
                data,
                userId
            })
        });
    }
    finally { }
    ;
};
try { }
catch (error) {
    console.error('Failed to save tool data:', error);
}
;
// Submit tool data
const handleSubmitToolData = async (data) => {
    if (!runningTool)
        return;
    try {
        await fetch(`/api/tools/${runningTool.id}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({
                spaceId,
                data,
                userId
            })
        });
    }
    finally { }
    ;
    // Close tool after successful submission
    setRunningTool(null);
    setCurrentView('installed');
};
try { }
catch (error) {
    console.error('Failed to submit tool data:', error);
}
;
// Load installed tools on mount
useEffect(() => {
    fetchInstalledTools();
}, [fetchInstalledTools]);
// Filter tools by search
const filteredTools = installedTools.filter(tool => !searchQuery ||
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()));
if (currentView === 'running' && runningTool) {
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => {
                                setRunningTool(null);
                                setCurrentView('installed');
                            }, children: "\u2190 Back to Tools" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-sm text-gray-600", children: "Tool Running" })] })] }) }), _jsx(ToolRuntimeEngine, { tool: runningTool, userId: userId, spaceId: spaceId, mode: "production", onSave: handleSaveToolData, onSubmit: handleSubmitToolData })] }));
}
if (currentView === 'marketplace') {
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Add Tools to Space" }), _jsx(HiveButton, { variant: "outline", onClick: () => setCurrentView('installed'), children: "\u2190 Back to Installed" })] }), _jsx(ToolMarketplace, { spaceId: spaceId, userId: userId, onInstallTool: handleInstallTool, onViewTool: (toolId) => {
                    // Could implement tool preview here
                    console.log('View tool:', toolId);
                } })] }));
}
return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Space Tools" }), _jsxs("p", { className: "text-sm text-gray-600", children: [installedTools.length, " tools installed \u2022 ", installedTools.filter(t => t.settings.enabled).length, " active"] })] }), (userRole === 'admin' || userRole === 'moderator') && (_jsxs(HiveButton, { onClick: () => setCurrentView('marketplace'), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Tools"] }))] }), installedTools.length > 0 && (_jsxs("div", { className: "relative max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search installed tools...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] })), loading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map(i => (_jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "h-48 bg-gray-200 rounded-lg" }) }, i))) })) : filteredTools.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Plus, { className: "w-8 h-8 text-gray-400" }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: installedTools.length === 0 ? 'No tools installed yet' : 'No tools found' }), _jsx("p", { className: "text-gray-600 mb-4", children: installedTools.length === 0
                        ? 'Add tools from the marketplace to help coordinate your space activities'
                        : 'Try adjusting your search terms' }), (userRole === 'admin' || userRole === 'moderator') && installedTools.length === 0 && (_jsx(HiveButton, { onClick: () => setCurrentView('marketplace'), children: "Browse Marketplace" }))] })) : (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [filteredTools.map(tool => (_jsx(InstalledToolCard, { tool: tool, userRole: userRole, onLaunch: () => handleLaunchTool(tool), onToggle: async (enabled) => {
                        // Update tool enabled status
                        try {
                            await fetch(`/api/spaces/${spaceId}/tools/${tool.id}/settings`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${userId}`
                                },
                                body: JSON.stringify({ enabled })
                            });
                        }
                        finally { }
                        ;
                        // Update local state
                        setInstalledTools(prev => prev.map(t => t.id === tool.id
                            ? { ...t, settings: { ...t.settings, enabled } }
                            : t));
                    }, catch: true }, tool.id))(error), {
                    console, : .error('Failed to update tool settings:', error)
                }), "} /> ))}"] }))] }));
function InstalledToolCard({ tool, userRole, onLaunch, onToggle }) {
    const canManage = userRole === 'admin' || userRole === 'moderator';
    return (_jsx(HiveCard, { className: "p-4 hover:shadow-md transition-shadow", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 truncate", children: tool.name }), !tool.settings.enabled && (_jsx(HiveBadge, { variant: "outline", className: "text-xs", children: "Disabled" }))] }), _jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: tool.description })] }), canManage && (_jsx("button", { className: "p-1 text-gray-400 hover:text-gray-600", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4" }), _jsxs("span", { children: [tool.usage.totalUsers, " users"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), _jsxs("span", { children: [tool.usage.thisWeek, " this week"] })] })] }), tool.usage.lastUsed && (_jsxs("p", { className: "text-xs text-gray-500", children: ["Last used ", new Date(tool.usage.lastUsed).toLocaleDateString()] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-gray-100", children: [_jsxs(HiveButton, { size: "sm", onClick: onLaunch, disabled: !tool.settings.enabled, className: "flex-1", children: [_jsx(Play, { className: "w-4 h-4 mr-1" }), "Launch"] }), canManage && (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => onToggle(!tool.settings.enabled), children: tool.settings.enabled ? 'Disable' : 'Enable' }))] })] }) }));
}
// Sample installed tools for development
function getSampleInstalledTools() {
    return [
        {
            id: 'event-creator',
            name: 'Event Creator',
            description: 'Create and manage events with RSVP tracking and check-in capabilities.',
            version: '1.0.0',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'hive-team',
                createdAt: '2024-01-01T00:00:00Z',
                category: 'event',
                tags: ['events', 'coordination']
            },
            installedAt: '2024-01-15T10:00:00Z',
            installedBy: 'space-admin',
            settings: {
                enabled: true,
                permissions: ['create_events', 'manage_rsvps'],
                position: 1
            },
            usage: {
                totalUsers: 45,
                thisWeek: 12,
                lastUsed: '2024-01-20T14:30:00Z'
            }
        },
        {
            id: 'study-scheduler',
            name: 'Study Group Scheduler',
            description: 'Coordinate study sessions and group meetings with scheduling and room booking.',
            version: '1.2.0',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'student-builder',
                createdAt: '2024-01-10T00:00:00Z',
                category: 'academic',
                tags: ['study', 'scheduling']
            },
            installedAt: '2024-01-18T09:00:00Z',
            installedBy: 'space-admin',
            settings: {
                enabled: true,
                permissions: ['create_sessions', 'book_rooms'],
                position: 2
            },
            usage: {
                totalUsers: 23,
                thisWeek: 8,
                lastUsed: '2024-01-19T16:00:00Z'
            }
        },
        {
            id: 'feedback-collector',
            name: 'Feedback Collector',
            description: 'Gather feedback from space members on events, activities, and improvements.',
            version: '1.0.5',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'community-builder',
                createdAt: '2024-01-12T00:00:00Z',
                category: 'social',
                tags: ['feedback', 'community']
            },
            installedAt: '2024-01-20T11:00:00Z',
            installedBy: 'space-moderator',
            settings: {
                enabled: false,
                permissions: ['create_surveys', 'view_responses'],
                position: 3
            },
            usage: {
                totalUsers: 7,
                thisWeek: 2,
                lastUsed: '2024-01-19T10:00:00Z'
            }
        }
    ];
}
export default SpaceToolsTab;
//# sourceMappingURL=space-tools-tab.js.map