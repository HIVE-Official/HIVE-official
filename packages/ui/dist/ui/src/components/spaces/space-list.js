/**
 * SpaceList - Simple, purpose-built space browsing
 *
 * Replaces the AI "CompleteHIVESpacesSystem" with focused components.
 * Students just want to find and join spaces - that's it.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SpaceCard, SpaceCardCompact, SpaceCardSkeleton } from './simple-space-card';
export function SpaceList({ spaces, loading = false, onJoinSpace, onViewSpace, userSpaceIds = [], showSearch = true, showViewToggle = true, className }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [categoryFilter, setCategoryFilter] = useState('all');
    // Filter spaces based on search and category
    const filteredSpaces = spaces.filter(space => {
        const matchesSearch = !searchQuery ||
            space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || space.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    const categories = [
        { value: 'all', label: 'All Spaces' },
        { value: 'academic', label: 'Academic' },
        { value: 'residential', label: 'Residential' },
        { value: 'social', label: 'Social' },
        { value: 'professional', label: 'Professional' }
    ];
    if (loading) {
        return (_jsxs("div", { className: cn("space-y-6", className), children: [showSearch && (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-10 bg-gray-800 rounded animate-pulse" }), _jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4].map(i => (_jsx("div", { className: "h-8 bg-gray-800 rounded animate-pulse w-20" }, i))) })] })), _jsx("div", { className: "space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4", children: [1, 2, 3, 4, 5, 6].map(i => (_jsx(SpaceCardSkeleton, {}, i))) })] }));
    }
    return (_jsxs("div", { className: cn("space-y-6", className), children: [showSearch && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { type: "text", placeholder: "Search spaces...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full" }) }), showViewToggle && (_jsxs("div", { className: "flex border border-gray-700 rounded-lg overflow-hidden", children: [_jsx(Button, { variant: viewMode === 'grid' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), className: "rounded-none border-0", children: _jsx(Grid, { className: "h-4 w-4" }) }), _jsx(Button, { variant: viewMode === 'list' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('list'), className: "rounded-none border-0 border-l border-gray-700", children: _jsx(List, { className: "h-4 w-4" }) })] }))] }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(category => (_jsx(Button, { variant: categoryFilter === category.value ? 'primary' : 'ghost', size: "sm", onClick: () => setCategoryFilter(category.value), className: "text-xs", children: category.label }, category.value))) })] })), _jsxs("div", { className: "text-sm text-gray-400", children: [filteredSpaces.length, " ", filteredSpaces.length === 1 ? 'space' : 'spaces', searchQuery && ` matching "${searchQuery}"`] }), filteredSpaces.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsxs("div", { className: "text-gray-500 space-y-2", children: [_jsx("p", { className: "text-lg font-medium", children: "No spaces found" }), _jsx("p", { className: "text-sm", children: "Try adjusting your search or filters" })] }) })) : (_jsx(_Fragment, { children: viewMode === 'grid' ? (_jsx("div", { className: "space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4", children: filteredSpaces.map(space => (_jsx(SpaceCard, { space: space, isJoined: userSpaceIds.includes(space.id), onJoin: onJoinSpace, onView: onViewSpace }, space.id))) })) : (_jsx("div", { className: "border border-gray-700 rounded-lg overflow-hidden bg-gray-900", children: filteredSpaces.map((space, index) => (_jsx(SpaceCardCompact, { space: space, isJoined: userSpaceIds.includes(space.id), onJoin: onJoinSpace, className: index === filteredSpaces.length - 1 ? 'border-b-0' : '' }, space.id))) })) }))] }));
}
// Quick access component for homepage/dashboard
export function SpaceQuickList({ title, spaces, onViewAll, ...props }) {
    const displaySpaces = spaces.slice(0, 3); // Show only first 3
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: title }), onViewAll && spaces.length > 3 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewAll, children: ["View All (", spaces.length, ")"] }))] }), _jsx("div", { className: "space-y-3", children: displaySpaces.map(space => (_jsx(SpaceCardCompact, { space: space, ...props }, space.id))) })] }));
}
//# sourceMappingURL=space-list.js.map