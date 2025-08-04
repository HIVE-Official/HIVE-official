// HIVE Element Picker - Atomic Design: Organism
// Comprehensive element library with categorization and search
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, ChevronDown, Star } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { HiveInput } from '../hive-input.js';
import { HiveButton } from '../hive-button.js';
import { HiveBadge } from '../hive-badge.js';
import { HiveCard, HiveCardContent } from '../hive-card.js';
import { HiveMotionWrapper } from '../hive-motion-wrapper.js';
// Element categories with enhanced campus focus
export const ELEMENT_CATEGORIES = [
    {
        id: 'all',
        name: 'All Elements',
        description: 'Browse all available elements',
        icon: Grid3X3,
        color: 'var(--hive-color-neutral-400)'
    },
    {
        id: 'basic',
        name: 'Basic',
        description: 'Text, headings, and fundamental elements',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "Aa" }),
        color: 'var(--hive-color-blue-500)'
    },
    {
        id: 'input',
        name: 'Input',
        description: 'Forms, buttons, and interactive elements',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\u2328\uFE0F" }),
        color: 'var(--hive-color-green-500)'
    },
    {
        id: 'layout',
        name: 'Layout',
        description: 'Containers, grids, and structural elements',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\u25A1" }),
        color: 'var(--hive-color-purple-500)'
    },
    {
        id: 'media',
        name: 'Media',
        description: 'Images, videos, and multimedia elements',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\uD83C\uDFA8" }),
        color: 'var(--hive-color-orange-500)'
    },
    {
        id: 'social',
        name: 'Social',
        description: 'Polls, comments, and social interactions',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\uD83D\uDCAC" }),
        color: 'var(--hive-color-pink-500)'
    },
    {
        id: 'advanced',
        name: 'Advanced',
        description: 'Charts, calendars, and complex widgets',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\u26A1" }),
        color: 'var(--hive-color-yellow-500)'
    },
    {
        id: 'campus',
        name: 'Campus',
        description: 'University-specific elements',
        icon: () => _jsx("span", { className: "text-xs font-medium", children: "\uD83C\uDF93" }),
        color: 'var(--hive-color-gold-primary)'
    }
];
const ElementCard = ({ element, onSelect, isSelected = false, viewMode }) => {
    const IconComponent = element.icon;
    return (_jsx(HiveMotionWrapper, { children: _jsx(HiveCard, { variant: isSelected ? "gold-premium" : "default", className: cn("cursor-pointer transition-all duration-200 hover:shadow-md group", viewMode === 'list' ? "flex-row items-center p-3" : "p-4", isSelected && "ring-2 ring-[var(--hive-color-gold-primary)] ring-offset-2"), onClick: () => onSelect(element), children: _jsxs(HiveCardContent, { className: cn("p-0", viewMode === 'list' ? "flex items-center gap-3 w-full" : "text-center"), children: [_jsx("div", { className: cn("rounded-lg flex items-center justify-center shrink-0 transition-colors", viewMode === 'list' ? "w-10 h-10" : "w-12 h-12 mx-auto mb-3"), style: { backgroundColor: `${element.color}15`, color: element.color }, children: _jsx(IconComponent, { size: viewMode === 'list' ? 20 : 24 }) }), _jsxs("div", { className: cn(viewMode === 'list' ? "flex-1 min-w-0" : "w-full"), children: [_jsx("h3", { className: cn("font-medium text-[var(--hive-text-primary)] group-hover:text-[var(--hive-color-gold-primary)] transition-colors", viewMode === 'list' ? "text-sm" : "text-sm mb-1"), children: element.name }), _jsx("p", { className: cn("text-[var(--hive-text-tertiary)] leading-tight", viewMode === 'list' ? "text-xs truncate" : "text-xs mb-2"), children: element.description }), viewMode === 'grid' && element.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [element.tags.slice(0, 2).map((tag) => (_jsx(HiveBadge, { variant: "skill-tag", className: "text-xs px-1.5 py-0.5", children: tag }, tag))), element.tags.length > 2 && (_jsxs("span", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["+", element.tags.length - 2] }))] }))] }), element.version !== '1.0.0' && viewMode === 'list' && (_jsx("div", { className: "shrink-0", children: _jsx(Star, { size: 14, className: "text-[var(--hive-color-gold-primary)]" }) }))] }) }) }));
};
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, elementCounts }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "md:hidden", children: [_jsxs(HiveButton, { variant: "outline", onClick: () => setIsExpanded(!isExpanded), className: "w-full justify-between", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Filter, { size: 16 }), categories.find(cat => cat.id === selectedCategory)?.name] }), _jsx(ChevronDown, { size: 16, className: cn("transition-transform", isExpanded && "rotate-180") })] }), isExpanded && (_jsx("div", { className: "mt-2 space-y-1", children: categories.map((category) => (_jsxs(HiveButton, { variant: selectedCategory === category.id ? "primary" : "ghost", size: "sm", onClick: () => {
                                onCategoryChange(category.id);
                                setIsExpanded(false);
                            }, className: "w-full justify-start", children: [_jsx(category.icon, {}), _jsx("span", { children: category.name }), _jsx("span", { className: "ml-auto text-xs text-[var(--hive-text-tertiary)]", children: elementCounts[category.id] || 0 })] }, category.id))) }))] }), _jsx("div", { className: "hidden md:flex gap-2 overflow-x-auto pb-2", children: categories.map((category) => (_jsxs(HiveButton, { variant: selectedCategory === category.id ? "primary" : "outline", size: "sm", onClick: () => onCategoryChange(category.id), className: "shrink-0 gap-2", children: [_jsx(category.icon, {}), _jsx("span", { children: category.name }), _jsx(HiveBadge, { variant: "tool-tag", className: "text-xs", children: elementCounts[category.id] || 0 })] }, category.id))) })] }));
};
// Main Element Picker component
export const ElementPicker = ({ elements, selectedCategory = 'all', onElementSelect, searchQuery = '' }) => {
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [currentCategory, setCurrentCategory] = useState(selectedCategory);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedElement, setSelectedElement] = useState(null);
    // Filter and search logic
    const filteredElements = useMemo(() => {
        let filtered = elements;
        // Filter by category
        if (currentCategory !== 'all') {
            filtered = filtered.filter(element => element.category === currentCategory);
        }
        // Filter by search term
        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(element => element.name.toLowerCase().includes(query) ||
                element.description.toLowerCase().includes(query) ||
                element.tags.some(tag => tag.toLowerCase().includes(query)));
        }
        // Sort by popularity (usage) and name
        return filtered.sort((a, b) => {
            // Prioritize non-deprecated elements
            if (a.isDeprecated !== b.isDeprecated) {
                return a.isDeprecated ? 1 : -1;
            }
            // Then sort by name
            return a.name.localeCompare(b.name);
        });
    }, [elements, currentCategory, searchTerm]);
    // Calculate element counts per category
    const elementCounts = useMemo(() => {
        const counts = { all: elements.length };
        ELEMENT_CATEGORIES.forEach(category => {
            if (category.id !== 'all') {
                counts[category.id] = elements.filter(el => el.category === category.id).length;
            }
        });
        return counts;
    }, [elements]);
    const handleElementSelect = (element) => {
        setSelectedElement(element.id);
        onElementSelect(element);
    };
    return (_jsxs("div", { className: "flex flex-col h-full bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Element Library" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Choose elements to build your tool" })] }), _jsxs("div", { className: "flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsx(HiveButton, { variant: viewMode === 'grid' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), className: "px-2", children: _jsx(Grid3X3, { size: 16 }) }), _jsx(HiveButton, { variant: viewMode === 'list' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('list'), className: "px-2", children: _jsx(List, { size: 16 }) })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 16, className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-tertiary)]" }), _jsx(HiveInput, { placeholder: "Search elements...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] })] }), _jsx("div", { className: "p-4 border-b border-[var(--hive-border-default)]", children: _jsx(CategoryFilter, { categories: ELEMENT_CATEGORIES, selectedCategory: currentCategory, onCategoryChange: setCurrentCategory, elementCounts: elementCounts }) }), _jsx("div", { className: "flex-1 overflow-auto p-4", children: filteredElements.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mb-4", children: _jsx(Search, { size: 24, className: "text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No elements found" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] max-w-sm", children: "Try adjusting your search or filter to find the elements you're looking for." })] })) : (_jsx("div", { className: cn("gap-4", viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "space-y-2"), children: filteredElements.map((element) => (_jsx(ElementCard, { element: element, onSelect: handleElementSelect, isSelected: selectedElement === element.id, viewMode: viewMode }, element.id))) })) }), _jsx("div", { className: "p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: [filteredElements.length, " element", filteredElements.length !== 1 ? 's' : '', " available"] }), _jsx("span", { className: "text-[var(--hive-text-tertiary)]", children: "v1.0 \u2022 HIVE Elements" })] }) })] }));
};
export default ElementPicker;
//# sourceMappingURL=element-picker.js.map