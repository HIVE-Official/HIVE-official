"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { PlantNewToolButton } from '../library/plant-new-tool-button.js';
import { Settings, Play, MoreVertical, Users, BarChart3, Clock, Zap, Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const ToolCard = ({ tool, onLaunch, onConfigure, onRemove, variant = 'grid' }) => {
    const [showActions, setShowActions] = useState(false);
    const IconComponent = tool.icon;
    if (variant === 'list') {
        return (_jsxs("div", { className: "flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center", children: _jsx(IconComponent, { className: "w-5 h-5 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 truncate", children: tool.name }), _jsxs("div", { className: "flex items-center gap-1", children: [tool.isPinned && (_jsx(Badge, { className: "bg-amber-100 text-amber-800 border-amber-200", children: "Pinned" })), !tool.isActive && (_jsx(Badge, { variant: "secondary", children: "Disabled" }))] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] truncate", children: tool.description }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500 mt-1", children: [_jsxs("span", { children: [tool.usageCount, " uses"] }), _jsxs("span", { children: ["Last used ", tool.lastUsed.toLocaleDateString()] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { size: "sm", variant: "secondary", onClick: () => onConfigure?.(tool.id), disabled: !tool.permissions.canEdit, children: [_jsx(Settings, { className: "w-3 h-3 mr-1" }), "Configure"] }), _jsxs(Button, { size: "sm", onClick: () => onLaunch?.(tool.id), disabled: !tool.isActive, children: [_jsx(Play, { className: "w-3 h-3 mr-1" }), "Launch"] })] })] }));
    }
    return (_jsx(Card, { className: "p-4 hover:shadow-lg transition-all group", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center", children: _jsx(IconComponent, { className: "w-6 h-6 text-[var(--hive-text-inverse)]" }) }), _jsxs("div", { className: "flex items-center gap-1", children: [tool.isPinned && (_jsx(Badge, { className: "bg-amber-100 text-amber-800 border-amber-200 text-xs", children: "\uD83D\uDCCC" })), !tool.isActive && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "Disabled" })), _jsx("div", { className: "relative", children: _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowActions(!showActions), children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors", children: tool.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mb-2 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("span", { children: [tool.usageCount, " uses"] }), _jsx("span", { children: tool.category })] })] }), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-gray-100", children: [_jsxs(Button, { size: "sm", variant: "secondary", className: "flex-1", onClick: () => onConfigure?.(tool.id), disabled: !tool.permissions.canEdit, children: [_jsx(Settings, { className: "w-3 h-3 mr-1" }), "Configure"] }), _jsxs(Button, { size: "sm", className: "flex-1", onClick: () => onLaunch?.(tool.id), disabled: !tool.isActive, children: [_jsx(Play, { className: "w-3 h-3 mr-1" }), "Launch"] })] })] }) }));
};
export function SpaceToolGridWithLibrary({ space, tools = [], onToolLaunch, onToolInstall, onToolConfigure, onToolRemove, variant = 'grid', showPlantButton = true, className }) {
    const [viewMode, setViewMode] = useState(variant);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showInactive, setShowInactive] = useState(false);
    // Mock tools for demonstration
    const mockTools = [
        {
            id: 'tool_1',
            elementId: 'poll-creator',
            name: 'Quick Poll',
            description: 'Create instant polls for group decisions',
            icon: BarChart3,
            category: 'Social',
            author: 'HIVE Team',
            isActive: true,
            isPinned: true,
            usageCount: 23,
            lastUsed: new Date('2024-01-15'),
            configuration: {},
            permissions: {
                canEdit: true,
                canDelete: true,
                canShare: true
            }
        },
        {
            id: 'tool_2',
            elementId: 'attendance-tracker',
            name: 'Attendance Tracker',
            description: 'Track meeting attendance with check-in codes',
            icon: Users,
            category: 'Organization',
            author: 'OrganizeU',
            isActive: true,
            isPinned: false,
            usageCount: 8,
            lastUsed: new Date('2024-01-12'),
            configuration: {},
            permissions: {
                canEdit: true,
                canDelete: false,
                canShare: true
            }
        },
        {
            id: 'tool_3',
            elementId: 'study-timer',
            name: 'Focus Timer',
            description: 'Pomodoro timer for study sessions',
            icon: Clock,
            category: 'Productivity',
            author: 'StudyHive',
            isActive: false,
            isPinned: false,
            usageCount: 45,
            lastUsed: new Date('2024-01-10'),
            configuration: {},
            permissions: {
                canEdit: true,
                canDelete: true,
                canShare: true
            }
        }
    ];
    const displayTools = tools.length > 0 ? tools : mockTools;
    const filteredTools = displayTools.filter(tool => {
        if (categoryFilter !== 'all' && tool.category !== categoryFilter) {
            return false;
        }
        if (!showInactive && !tool.isActive) {
            return false;
        }
        return true;
    });
    const categories = [...new Set(displayTools.map(tool => tool.category))];
    const handleToolInstall = useCallback(async (elementId, configuration) => {
        try {
            await onToolInstall?.(elementId, configuration);
            // Tool will be added to the grid after successful installation
        }
        catch (error) {
            console.error('Failed to install tool:', error);
            throw error; // Re-throw to keep modal open
        }
    }, [onToolInstall]);
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Tools" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: [filteredTools.length, " active tool", filteredTools.length !== 1 ? 's' : ''] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1", children: [_jsx(Button, { size: "sm", variant: viewMode === 'grid' ? 'primary' : 'ghost', onClick: () => setViewMode('grid'), children: _jsx(Grid, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: viewMode === 'list' ? 'primary' : 'ghost', onClick: () => setViewMode('list'), children: _jsx(List, { className: "w-4 h-4" }) })] }), showPlantButton && (_jsx(PlantNewToolButton, { space: space, onToolInstall: handleToolInstall, variant: "primary" }))] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "px-3 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Categories" }), categories.map(category => (_jsx("option", { value: category, children: category }, category)))] }), _jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: showInactive, onChange: (e) => setShowInactive(e.target.checked), className: "rounded border-[var(--hive-border-default)] focus:ring-amber-500" }), "Show inactive tools"] })] }), filteredTools.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Zap, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: displayTools.length === 0 ? 'No Tools Yet' : 'No Tools Match Filters' }), _jsx("p", { className: "text-[var(--hive-text-muted)] mb-6", children: displayTools.length === 0
                            ? 'Add your first tool to get started with enhanced functionality'
                            : 'Try adjusting your filters or add new tools' }), showPlantButton && (_jsx(PlantNewToolButton, { space: space, onToolInstall: handleToolInstall, variant: "primary" }))] })) : (_jsx(_Fragment, { children: viewMode === 'grid' ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filteredTools.map((tool) => (_jsx(ToolCard, { tool: tool, variant: "grid", onLaunch: onToolLaunch, onConfigure: onToolConfigure, onRemove: onToolRemove }, tool.id))) })) : (_jsx("div", { className: "space-y-3", children: filteredTools.map((tool) => (_jsx(ToolCard, { tool: tool, variant: "list", onLaunch: onToolLaunch, onConfigure: onToolConfigure, onRemove: onToolRemove }, tool.id))) })) })), filteredTools.length > 0 && (_jsxs("div", { className: "text-center text-sm text-gray-500", children: ["Showing ", filteredTools.length, " of ", displayTools.length, " tools", categoryFilter !== 'all' && ` in ${categoryFilter}`] }))] }));
}
export default SpaceToolGridWithLibrary;
//# sourceMappingURL=space-tool-grid-with-library.js.map