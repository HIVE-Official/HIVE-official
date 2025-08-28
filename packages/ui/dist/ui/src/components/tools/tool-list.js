/**
 * ToolList - Simple, purpose-built tool browsing
 *
 * Replaces the AI "CompleteHIVEToolsSystem" with focused components.
 * Students just want to find, install, and use tools - that's it.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ToolCard, ToolCardCompact, ToolCardSkeleton } from './tool-card';
export function ToolList({ tools, loading = false, currentUserId, onInstallTool, onRunTool, onShareTool, onFavoriteTool, onViewTool, showSearch = true, showViewToggle = true, className }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [categoryFilter, setCategoryFilter] = useState('all');
    // Filter tools based on search and category
    const filteredTools = tools.filter(tool => {
        const matchesSearch = !searchQuery ||
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    const categories = [
        { value: 'all', label: 'All Tools' },
        { value: 'academic', label: 'Academic' },
        { value: 'productivity', label: 'Productivity' },
        { value: 'social', label: 'Social' },
        { value: 'utility', label: 'Utility' }
    ];
    if (loading) {
        return (_jsxs("div", { className: cn("space-y-6", className), children: [showSearch && (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-10 bg-gray-800 rounded animate-pulse" }), _jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4].map(i => (_jsx("div", { className: "h-8 bg-gray-800 rounded animate-pulse w-20" }, i))) })] })), _jsx("div", { className: "space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4", children: [1, 2, 3, 4, 5, 6].map(i => (_jsx(ToolCardSkeleton, {}, i))) })] }));
    }
    return (_jsxs("div", { className: cn("space-y-6", className), children: [showSearch && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { type: "text", placeholder: "Search tools, creators...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full" }) }), showViewToggle && (_jsxs("div", { className: "flex border border-gray-700 rounded-lg overflow-hidden", children: [_jsx(Button, { variant: viewMode === 'grid' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), className: "rounded-none border-0", children: _jsx(Grid, { className: "h-4 w-4" }) }), _jsx(Button, { variant: viewMode === 'list' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('list'), className: "rounded-none border-0 border-l border-gray-700", children: _jsx(List, { className: "h-4 w-4" }) })] }))] }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(category => (_jsx(Button, { variant: categoryFilter === category.value ? 'primary' : 'ghost', size: "sm", onClick: () => setCategoryFilter(category.value), className: "text-xs", children: category.label }, category.value))) })] })), _jsxs("div", { className: "text-sm text-gray-400", children: [filteredTools.length, " ", filteredTools.length === 1 ? 'tool' : 'tools', searchQuery && ` matching "${searchQuery}"`] }), filteredTools.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "text-gray-500 space-y-2", children: [_jsx("p", { className: "text-lg font-medium", children: "No tools found" }), _jsx("p", { className: "text-sm", children: "Try adjusting your search or filters" })] }) })) : (_jsx(_Fragment, { children: viewMode === 'grid' ? (_jsx("div", { className: "space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4", children: filteredTools.map(tool => (_jsx(ToolCard, { tool: tool, currentUserId: currentUserId, onInstall: onInstallTool, onRun: onRunTool, onShare: onShareTool, onFavorite: onFavoriteTool, onView: onViewTool }, tool.id))) })) : (_jsx("div", { className: "border border-gray-700 rounded-lg overflow-hidden bg-gray-900", children: filteredTools.map((tool, index) => (_jsx(ToolCardCompact, { tool: tool, currentUserId: currentUserId, onInstall: onInstallTool, onRun: onRunTool, className: index === filteredTools.length - 1 ? 'border-b-0' : '' }, tool.id))) })) }))] }));
}
// Quick access component for homepage/dashboard
export function ToolQuickList({ title, tools, onViewAll, ...props }) {
    const displayTools = tools.slice(0, 3); // Show only first 3
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: title }), onViewAll && tools.length > 3 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewAll, children: ["View All (", tools.length, ")"] }))] }), _jsx("div", { className: "space-y-3", children: displayTools.map(tool => (_jsx(ToolCardCompact, { tool: tool, ...props }, tool.id))) })] }));
}
//# sourceMappingURL=tool-list.js.map