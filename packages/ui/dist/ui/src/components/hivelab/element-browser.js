"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { Search, Filter, Code, Eye, Settings, MousePointer, Database, BarChart3, Grid, List, Download, Star, Users, Layers, Package } from 'lucide-react';
import { cn } from '../../lib/utils.js';
// Mock Elements Data
const MOCK_ELEMENTS = [
    {
        id: 'text-input',
        name: 'Text Input',
        description: 'Collect text input from users with validation and formatting options',
        category: 'input',
        type: 'text_input',
        version: '1.2.0',
        author: 'HIVE Team',
        authorType: 'hive_team',
        icon: ({ className }) => _jsx(Code, { className: className }),
        previewComponent: ({ value = '', placeholder = 'Enter text...' }) => (_jsx("input", { type: "text", value: value, placeholder: placeholder, className: "w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", readOnly: true })),
        configComponent: () => _jsx("div", { children: "Config Component" }),
        props: [
            {
                name: 'label',
                type: 'string',
                label: 'Label',
                description: 'Text label displayed above the input',
                required: false,
                defaultValue: ''
            },
            {
                name: 'placeholder',
                type: 'string',
                label: 'Placeholder',
                description: 'Placeholder text shown when input is empty',
                required: false,
                defaultValue: 'Enter text...'
            },
            {
                name: 'required',
                type: 'boolean',
                label: 'Required',
                description: 'Whether this field is required',
                required: false,
                defaultValue: false
            },
            {
                name: 'maxLength',
                type: 'number',
                label: 'Max Length',
                description: 'Maximum number of characters allowed',
                required: false,
                validation: { min: 1, max: 1000 }
            }
        ],
        defaultProps: {
            label: '',
            placeholder: 'Enter text...',
            required: false,
            maxLength: 255
        },
        downloads: 1247,
        likes: 89,
        rating: 4.8,
        ratingCount: 45,
        tags: ['form', 'input', 'text', 'validation'],
        complexity: 'beginner',
        isVerified: true,
        isPremium: false,
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-15T00:00:00Z'),
        documentation: 'A versatile text input component for collecting user data.',
        examples: [
            {
                id: 'basic',
                title: 'Basic Text Input',
                description: 'Simple text input with placeholder',
                props: { placeholder: 'Enter your name' }
            },
            {
                id: 'required',
                title: 'Required Field',
                description: 'Required text input with validation',
                props: { label: 'Email Address', placeholder: 'you@example.com', required: true }
            }
        ]
    },
    {
        id: 'action-button',
        name: 'Action Button',
        description: 'Trigger actions with customizable styling and behavior',
        category: 'action',
        type: 'button',
        version: '2.1.0',
        author: 'HIVE Team',
        authorType: 'hive_team',
        icon: ({ className }) => _jsx(MousePointer, { className: className }),
        previewComponent: ({ label = 'Button', variant = 'primary' }) => (_jsx("button", { className: cn("px-4 py-2 rounded-md font-medium transition-colors", variant === 'primary' && "bg-amber-500 text-[var(--hive-text-inverse)] hover:bg-amber-600", variant === 'secondary' && "bg-gray-200 text-gray-900 hover:bg-gray-300"), children: label })),
        configComponent: () => _jsx("div", { children: "Button Config" }),
        props: [
            {
                name: 'label',
                type: 'string',
                label: 'Button Text',
                description: 'Text displayed on the button',
                required: true,
                defaultValue: 'Button'
            },
            {
                name: 'variant',
                type: 'select',
                label: 'Style Variant',
                description: 'Visual style of the button',
                required: false,
                defaultValue: 'primary',
                options: [
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'outline', label: 'Outline' },
                    { value: 'ghost', label: 'Ghost' }
                ]
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled State',
                description: 'Whether the button is disabled',
                required: false,
                defaultValue: false
            }
        ],
        defaultProps: {
            label: 'Button',
            variant: 'primary',
            disabled: false
        },
        downloads: 2156,
        likes: 156,
        rating: 4.9,
        ratingCount: 78,
        tags: ['action', 'button', 'click', 'trigger'],
        complexity: 'beginner',
        isVerified: true,
        isPremium: false,
        createdAt: new Date('2024-01-05T00:00:00Z'),
        updatedAt: new Date('2024-01-20T00:00:00Z')
    },
    {
        id: 'data-chart',
        name: 'Data Chart',
        description: 'Visualize data with interactive charts and graphs',
        category: 'display',
        type: 'chart',
        version: '1.5.0',
        author: 'DataViz Team',
        authorType: 'student',
        icon: ({ className }) => _jsx(BarChart3, { className: className }),
        previewComponent: ({ type = 'bar', data = [] }) => (_jsx("div", { className: "w-full h-32 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(BarChart3, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsxs("p", { className: "text-sm text-gray-500", children: [type, " Chart Preview"] })] }) })),
        configComponent: () => _jsx("div", { children: "Chart Config" }),
        props: [
            {
                name: 'type',
                type: 'select',
                label: 'Chart Type',
                description: 'Type of chart to display',
                required: true,
                defaultValue: 'bar',
                options: [
                    { value: 'bar', label: 'Bar Chart' },
                    { value: 'line', label: 'Line Chart' },
                    { value: 'pie', label: 'Pie Chart' },
                    { value: 'scatter', label: 'Scatter Plot' }
                ]
            },
            {
                name: 'data',
                type: 'array',
                label: 'Chart Data',
                description: 'Data to display in the chart',
                required: true,
                defaultValue: []
            },
            {
                name: 'title',
                type: 'string',
                label: 'Chart Title',
                description: 'Title displayed above the chart',
                required: false,
                defaultValue: ''
            }
        ],
        defaultProps: {
            type: 'bar',
            data: [],
            title: '',
            animated: true
        },
        downloads: 892,
        likes: 67,
        rating: 4.6,
        ratingCount: 34,
        tags: ['chart', 'graph', 'data', 'visualization', 'analytics'],
        complexity: 'intermediate',
        isVerified: true,
        isPremium: false,
        createdAt: new Date('2024-01-10T00:00:00Z'),
        updatedAt: new Date('2024-01-18T00:00:00Z')
    },
    {
        id: 'user-profile-card',
        name: 'User Profile Card',
        description: 'Display user information with avatar and social connections',
        category: 'social',
        type: 'user_profile',
        version: '1.0.0',
        author: 'Community Builder',
        authorType: 'community',
        icon: ({ className }) => _jsx(Users, { className: className }),
        previewComponent: ({ userName = 'John Doe', userEmail = 'john@example.com' }) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-[var(--hive-text-inverse)] font-semibold", children: userName.charAt(0) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: userName }), _jsx("p", { className: "text-sm text-gray-500", children: userEmail })] })] })),
        configComponent: () => _jsx("div", { children: "Profile Card Config" }),
        props: [
            {
                name: 'showAvatar',
                type: 'boolean',
                label: 'Show Avatar',
                description: 'Whether to display user avatar',
                required: false,
                defaultValue: true
            },
            {
                name: 'showEmail',
                type: 'boolean',
                label: 'Show Email',
                description: 'Whether to display user email',
                required: false,
                defaultValue: true
            },
            {
                name: 'size',
                type: 'select',
                label: 'Card Size',
                description: 'Size of the profile card',
                required: false,
                defaultValue: 'medium',
                options: [
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' }
                ]
            }
        ],
        defaultProps: {
            showAvatar: true,
            showEmail: true,
            size: 'medium'
        },
        downloads: 543,
        likes: 89,
        rating: 4.7,
        ratingCount: 23,
        tags: ['profile', 'user', 'avatar', 'social', 'card'],
        complexity: 'intermediate',
        isVerified: false,
        isPremium: true,
        createdAt: new Date('2024-01-12T00:00:00Z'),
        updatedAt: new Date('2024-01-12T00:00:00Z')
    }
];
const ElementCard = ({ element, view = 'grid', onSelect, onPreview, onInstall }) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = element.icon;
    if (view === 'list') {
        return (_jsx(Card, { className: "p-4 hover:shadow-md transition-all cursor-pointer", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: () => onSelect?.(element), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 flex-1 min-w-0", children: [_jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", style: { backgroundColor: `${element.isVerified ? '#10B981' : '#6B7280'}20` }, children: _jsx(IconComponent, { className: cn("w-6 h-6", element.isVerified ? "text-green-600" : "text-[var(--hive-text-muted)]") }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 truncate", children: element.name }), _jsxs("div", { className: "flex items-center gap-1", children: [element.isVerified && (_jsx(Badge, { className: "bg-green-100 text-green-800 border-green-200 text-xs", children: "Verified" })), element.isPremium && (_jsx(Badge, { className: "bg-amber-100 text-amber-800 border-amber-200 text-xs", children: "Premium" })), _jsx(Badge, { variant: "secondary", className: "text-xs", children: element.complexity })] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] truncate mb-2", children: element.description }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-yellow-400" }), element.rating, " (", element.ratingCount, ")"] }), _jsxs("span", { children: [element.downloads.toLocaleString(), " downloads"] }), _jsxs("span", { children: ["v", element.version] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { size: "sm", variant: "secondary", onClick: (e) => {
                                    e.stopPropagation();
                                    onPreview?.(element);
                                }, children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), "Preview"] }), _jsxs(Button, { size: "sm", onClick: (e) => {
                                    e.stopPropagation();
                                    onInstall?.(element.id);
                                }, children: [_jsx(Download, { className: "w-3 h-3 mr-1" }), "Use"] })] })] }) }));
    }
    return (_jsx(Card, { className: "p-6 hover:shadow-lg transition-all cursor-pointer group", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: () => onSelect?.(element), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center transition-colors", style: { backgroundColor: `${element.isVerified ? '#10B981' : '#6B7280'}20` }, children: _jsx(IconComponent, { className: cn("w-6 h-6 transition-colors", element.isVerified ? "text-green-600" : "text-[var(--hive-text-muted)]", isHovered && "scale-110") }) }), _jsxs("div", { className: "flex items-center gap-1", children: [element.isVerified && (_jsx(Badge, { className: "bg-green-100 text-green-800 border-green-200 text-xs", children: "\u2713" })), element.isPremium && (_jsx(Badge, { className: "bg-amber-100 text-amber-800 border-amber-200 text-xs", children: "Pro" }))] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors", children: element.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mb-3 line-clamp-2", children: element.description }), _jsxs("div", { className: "flex flex-wrap gap-1 mb-3", children: [element.tags.slice(0, 3).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))), element.tags.length > 3 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: ["+", element.tags.length - 3] }))] })] }), _jsx("div", { className: "h-24 bg-gray-50 rounded-lg p-3 flex items-center justify-center", children: _jsx(element.previewComponent, { ...element.defaultProps }) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-yellow-400" }), element.rating] }), _jsx("span", { children: element.downloads.toLocaleString() })] }), _jsx(Badge, { variant: "secondary", className: "text-xs", children: element.complexity })] }), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-gray-100", children: [_jsxs(Button, { size: "sm", variant: "secondary", className: "flex-1", onClick: (e) => {
                                e.stopPropagation();
                                onPreview?.(element);
                            }, children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), "Preview"] }), _jsxs(Button, { size: "sm", className: "flex-1", onClick: (e) => {
                                e.stopPropagation();
                                onInstall?.(element.id);
                            }, children: [_jsx(Download, { className: "w-3 h-3 mr-1" }), "Use"] })] })] }) }));
};
export function ElementBrowser({ onElementSelect, onElementPreview, onElementInstall, selectedCategories = [], showInstalled = false }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [complexityFilter, setComplexityFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const categories = [
        { id: 'input', label: 'Input', icon: Code, count: 12 },
        { id: 'display', label: 'Display', icon: Eye, count: 18 },
        { id: 'action', label: 'Action', icon: MousePointer, count: 8 },
        { id: 'logic', label: 'Logic', icon: Settings, count: 6 },
        { id: 'layout', label: 'Layout', icon: Layers, count: 14 },
        { id: 'data', label: 'Data', icon: Database, count: 10 },
        { id: 'social', label: 'Social', icon: Users, count: 7 },
        { id: 'media', label: 'Media', icon: Package, count: 5 }
    ];
    const filteredElements = useMemo(() => {
        let filtered = MOCK_ELEMENTS.filter(element => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!element.name.toLowerCase().includes(query) &&
                    !element.description.toLowerCase().includes(query) &&
                    !element.tags.some(tag => tag.toLowerCase().includes(query))) {
                    return false;
                }
            }
            // Category filter
            if (categoryFilter !== 'all' && element.category !== categoryFilter) {
                return false;
            }
            // Selected categories filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(element.category)) {
                return false;
            }
            // Complexity filter
            if (complexityFilter !== 'all' && element.complexity !== complexityFilter) {
                return false;
            }
            return true;
        });
        // Sort elements
        switch (sortBy) {
            case 'popularity':
                filtered.sort((a, b) => b.downloads - a.downloads);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'recent':
                filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        return filtered;
    }, [searchQuery, categoryFilter, selectedCategories, complexityFilter, sortBy]);
    const handleElementSelect = useCallback((element) => {
        onElementSelect?.(element);
    }, [onElementSelect]);
    const handleElementPreview = useCallback((element) => {
        onElementPreview?.(element);
    }, [onElementPreview]);
    const handleElementInstall = useCallback((elementId) => {
        onElementInstall?.(elementId);
    }, [onElementInstall]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Element Browser" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Discover and use pre-built components for your tools" })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1", children: [_jsx(Button, { size: "sm", variant: viewMode === 'grid' ? 'primary' : 'ghost', onClick: () => setViewMode('grid'), children: _jsx(Grid, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: viewMode === 'list' ? 'primary' : 'ghost', onClick: () => setViewMode('list'), children: _jsx(List, { className: "w-4 h-4" }) })] }) })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search elements, descriptions, or tags...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-[var(--hive-border-default)] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "px-3 py-2 border border-[var(--hive-border-default)] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Categories" }), categories.map(cat => (_jsx("option", { value: cat.id, children: cat.label }, cat.id)))] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 border border-[var(--hive-border-default)] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "popularity", children: "Most Popular" }), _jsx("option", { value: "rating", children: "Highest Rated" }), _jsx("option", { value: "recent", children: "Recently Updated" }), _jsx("option", { value: "name", children: "A-Z" })] }), _jsxs(Button, { variant: "secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filters"] })] })] }), showFilters && (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Complexity Level" }), _jsxs("select", { value: complexityFilter, onChange: (e) => setComplexityFilter(e.target.value), className: "w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Levels" }), _jsx("option", { value: "beginner", children: "Beginner" }), _jsx("option", { value: "intermediate", children: "Intermediate" }), _jsx("option", { value: "advanced", children: "Advanced" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Element Type" }), _jsx("div", { className: "flex flex-wrap gap-1", children: ['Verified', 'Premium', 'Community'].map(type => (_jsx(Badge, { variant: "secondary", className: "cursor-pointer hover:bg-[var(--hive-background-secondary)]", children: type }, type))) })] }), _jsx("div", { className: "flex items-end", children: _jsx(Button, { size: "sm", variant: "secondary", onClick: () => {
                                    setSearchQuery('');
                                    setCategoryFilter('all');
                                    setComplexityFilter('all');
                                    setSortBy('popularity');
                                }, children: "Clear Filters" }) })] }) })), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = categoryFilter === category.id;
                    return (_jsxs("button", { onClick: () => setCategoryFilter(isActive ? 'all' : category.id), className: cn("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors", isActive
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-[var(--hive-background-secondary)] text-gray-700 hover:bg-gray-200"), children: [_jsx(IconComponent, { className: "w-4 h-4" }), category.label, _jsxs("span", { className: "text-xs opacity-75", children: ["(", category.count, ")"] })] }, category.id));
                }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-[var(--hive-text-muted)]", children: [filteredElements.length, " element", filteredElements.length !== 1 ? 's' : '', " found"] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Sorted by ", sortBy === 'popularity' ? 'popularity' : sortBy === 'rating' ? 'rating' : sortBy === 'recent' ? 'recent updates' : 'name'] })] }), filteredElements.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Package, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Elements Found" }), _jsx("p", { className: "text-[var(--hive-text-muted)] mb-6", children: "Try adjusting your search terms or filters to find what you're looking for." }), _jsx(Button, { onClick: () => {
                            setSearchQuery('');
                            setCategoryFilter('all');
                            setComplexityFilter('all');
                        }, children: "Clear All Filters" })] })) : (_jsxs(_Fragment, { children: [viewMode === 'grid' ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredElements.map((element) => (_jsx(ElementCard, { element: element, view: "grid", onSelect: handleElementSelect, onPreview: handleElementPreview, onInstall: handleElementInstall }, element.id))) })) : (_jsx("div", { className: "space-y-3", children: filteredElements.map((element) => (_jsx(ElementCard, { element: element, view: "list", onSelect: handleElementSelect, onPreview: handleElementPreview, onInstall: handleElementInstall }, element.id))) })), filteredElements.length >= 20 && (_jsx("div", { className: "text-center pt-8", children: _jsx(Button, { variant: "secondary", children: "Load More Elements" }) }))] }))] }));
}
export default ElementBrowser;
//# sourceMappingURL=element-browser.js.map