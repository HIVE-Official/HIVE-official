/**
 * HiveLab Element Library Panel
 *
 * Floating panel containing all available elements organized by category.
 * Users can search, filter, and drag elements onto the canvas.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Input } from '../../atoms/input';
import { Badge } from '../../atoms/badge';
import { Button } from '../../atoms/button';
import { FloatingPanel } from '../../molecules/panels/floating-panel';
import { ElementLibraryItem } from '../../molecules/panels/element-library-item';
import { Search, Star, Grid3x3, List } from 'lucide-react';
/**
 * Category definitions matching ElementCategory type
 */
const categories = [
    {
        id: 'all',
        name: 'All Elements',
        icon: '🎨',
        color: 'text-white',
        description: 'Show everything',
    },
    {
        id: 'trigger',
        name: 'Triggers',
        icon: '⚡',
        color: 'text-red-500',
        description: 'Start your flow',
    },
    {
        id: 'collector',
        name: 'Collectors',
        icon: '📝',
        color: 'text-blue-500',
        description: 'Get user input',
    },
    {
        id: 'transformer',
        name: 'Transformers',
        icon: '🔄',
        color: 'text-purple-500',
        description: 'Process data',
    },
    {
        id: 'router',
        name: 'Routers',
        icon: '🔀',
        color: 'text-orange-500',
        description: 'Control flow',
    },
    {
        id: 'storage',
        name: 'Storage',
        icon: '💾',
        color: 'text-green-500',
        description: 'Save data',
    },
    {
        id: 'display',
        name: 'Display',
        icon: '👁️',
        color: 'text-cyan-500',
        description: 'Show results',
    },
    {
        id: 'action',
        name: 'Actions',
        icon: '🚀',
        color: 'text-pink-500',
        description: 'Do things',
    },
    {
        id: 'connector',
        name: 'Connectors',
        icon: '🔌',
        color: 'text-yellow-500',
        description: 'Link systems',
    },
];
export function HiveLabElementLibrary({ elements, onElementSelect, onToggleFavorite, searchQuery: externalSearchQuery, onSearchChange: externalOnSearchChange, showFavoritesOnly = false, position = 'left', width = 280, isCollapsed = false, onToggleCollapse, onClose, className, }) {
    // Local state for search and category
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [localShowFavorites, setLocalShowFavorites] = useState(showFavoritesOnly);
    // Use external search if provided, otherwise internal
    const searchQuery = externalSearchQuery ?? internalSearchQuery;
    const setSearchQuery = externalOnSearchChange ?? setInternalSearchQuery;
    // Filter elements
    const filteredElements = useMemo(() => {
        let filtered = elements;
        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((e) => e.category === selectedCategory);
        }
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((e) => e.name.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query) ||
                e.category.toLowerCase().includes(query));
        }
        // Favorites filter
        if (localShowFavorites) {
            filtered = filtered.filter((e) => e.isNew);
        }
        return filtered;
    }, [elements, selectedCategory, searchQuery, localShowFavorites]);
    // Group by category for "all" view
    const groupedElements = useMemo(() => {
        const grouped = {
            trigger: [],
            collector: [],
            transformer: [],
            router: [],
            storage: [],
            display: [],
            action: [],
            connector: [],
        };
        filteredElements.forEach((element) => {
            grouped[element.category].push(element);
        });
        return grouped;
    }, [filteredElements]);
    return (_jsxs(FloatingPanel, { title: "Element Library", icon: _jsx(Grid3x3, { className: "h-4 w-4" }), position: position, width: width, isCollapsed: isCollapsed, onToggleCollapse: onToggleCollapse, onClose: onClose, className: className, children: [_jsxs("div", { className: "px-3 py-2 border-b space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" }), _jsx(Input, { placeholder: "Search elements...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-9 h-9 text-sm" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: viewMode === 'list' ? 'default' : 'ghost', size: "sm", onClick: () => setViewMode('list'), className: "h-7 w-7 p-0", title: "List view", children: _jsx(List, { className: "h-3.5 w-3.5" }) }), _jsx(Button, { variant: viewMode === 'grid' ? 'default' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), className: "h-7 w-7 p-0", title: "Grid view", children: _jsx(Grid3x3, { className: "h-3.5 w-3.5" }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: localShowFavorites ? 'default' : 'ghost', size: "sm", onClick: () => setLocalShowFavorites(!localShowFavorites), className: "h-7 gap-1 px-2", title: "Show new elements only", children: [_jsx(Star, { className: cn('h-3.5 w-3.5', localShowFavorites && 'fill-current') }), _jsx("span", { className: "text-xs", children: "New" })] }), _jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: filteredElements.length })] })] })] }), _jsx("div", { className: "px-3 py-2 border-b overflow-x-auto", children: _jsx("div", { className: "flex gap-1.5 min-w-max", children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), className: cn('px-2.5 py-1.5 rounded-md text-xs font-medium transition-all shrink-0', 'hover:bg-white/10', selectedCategory === category.id
                            ? 'bg-[#FFD700] text-black'
                            : 'bg-white/10 text-white/70'), title: category.description, children: [_jsx("span", { className: "mr-1", children: category.icon }), category.name] }, category.id))) }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-3", children: [selectedCategory === 'all' ? (
                    // Grouped view
                    _jsx("div", { className: "space-y-4", children: categories.slice(1).map((category) => {
                            const categoryElements = groupedElements[category.id];
                            if (!categoryElements || categoryElements.length === 0)
                                return null;
                            return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs("span", { className: cn('text-sm font-semibold', category.color), children: [category.icon, " ", category.name] }), _jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: categoryElements.length })] }), _jsx("div", { className: cn(viewMode === 'grid'
                                            ? 'grid grid-cols-2 gap-2'
                                            : 'space-y-1'), children: categoryElements.map((element) => (_jsx(ElementLibraryItem, { element: element, onSelect: onElementSelect ? () => onElementSelect(element) : undefined, onToggleFavorite: onToggleFavorite, compact: viewMode === 'grid' }, element.id))) })] }, category.id));
                        }) })) : (
                    // Flat list for specific category
                    _jsx("div", { className: cn(viewMode === 'grid'
                            ? 'grid grid-cols-2 gap-2'
                            : 'space-y-1'), children: filteredElements.map((element) => (_jsx(ElementLibraryItem, { element: element, onSelect: onElementSelect ? () => onElementSelect(element) : undefined, onToggleFavorite: onToggleFavorite, compact: viewMode === 'grid' }, element.id))) })), filteredElements.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDD0D" }), _jsx("p", { className: "text-sm font-medium mb-1", children: "No elements found" }), _jsx("p", { className: "text-xs text-white/70", children: "Try a different search or category" })] }))] }), _jsx("div", { className: "px-3 py-2 border-t bg-white/5", children: _jsx("p", { className: "text-[10px] text-white/70 text-center", children: "\uD83D\uDCA1 Drag elements to the canvas to build your tool" }) })] }));
}
HiveLabElementLibrary.displayName = 'HiveLabElementLibrary';
//# sourceMappingURL=hivelab-element-library.js.map