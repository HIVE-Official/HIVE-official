"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index.js';
import { Plus, Search, Wand2, Sparkles, Target, Users, BarChart3, MessageSquare, Zap, Clock, TrendingUp, Star, X } from 'lucide-react';
// Mock contextual suggestions based on space type and current tools
const generateContextualSuggestions = (space) => {
    // Mock element data - in production, this would come from the Element Browser
    const mockElements = [
        {
            id: 'poll-creator',
            name: 'Quick Poll',
            description: 'Create instant polls for group decisions and feedback',
            category: 'social',
            type: 'text_input',
            version: '1.0.0',
            author: 'HIVE Team',
            authorType: 'hive_team',
            icon: ({ className }) => _jsx(BarChart3, { className: className }),
            previewComponent: () => _jsx("div", { className: "text-sm text-gray-600", children: "Poll preview" }),
            configComponent: () => _jsx("div", { children: "Poll Config" }),
            props: [],
            defaultProps: {},
            downloads: 2543,
            likes: 189,
            rating: 4.8,
            ratingCount: 67,
            tags: ['poll', 'voting', 'decision', 'group'],
            complexity: 'beginner',
            isVerified: true,
            isPremium: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'study-timer',
            name: 'Focus Timer',
            description: 'Pomodoro-style timer for study sessions and productivity',
            category: 'action',
            type: 'button',
            version: '2.0.0',
            author: 'StudyHive',
            authorType: 'student',
            icon: ({ className }) => _jsx(Clock, { className: className }),
            previewComponent: () => _jsx("div", { className: "text-sm text-gray-600", children: "Timer preview" }),
            configComponent: () => _jsx("div", { children: "Timer Config" }),
            props: [],
            defaultProps: {},
            downloads: 1876,
            likes: 143,
            rating: 4.6,
            ratingCount: 89,
            tags: ['timer', 'focus', 'pomodoro', 'study'],
            complexity: 'beginner',
            isVerified: true,
            isPremium: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'attendance-tracker',
            name: 'Attendance Tracker',
            description: 'Track meeting and event attendance with check-in codes',
            category: 'data',
            type: 'table',
            version: '1.5.0',
            author: 'OrganizeU',
            authorType: 'faculty',
            icon: ({ className }) => _jsx(Users, { className: className }),
            previewComponent: () => _jsx("div", { className: "text-sm text-gray-600", children: "Attendance preview" }),
            configComponent: () => _jsx("div", { children: "Attendance Config" }),
            props: [],
            defaultProps: {},
            downloads: 987,
            likes: 76,
            rating: 4.4,
            ratingCount: 34,
            tags: ['attendance', 'tracking', 'meetings', 'organization'],
            complexity: 'intermediate',
            isVerified: true,
            isPremium: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'mood-check',
            name: 'Team Mood Check',
            description: 'Quick anonymous mood surveys for team wellness',
            category: 'social',
            type: 'text_input',
            version: '1.2.0',
            author: 'WellnessLab',
            authorType: 'community',
            icon: ({ className }) => _jsx(MessageSquare, { className: className }),
            previewComponent: () => _jsx("div", { className: "text-sm text-gray-600", children: "Mood check preview" }),
            configComponent: () => _jsx("div", { children: "Mood Config" }),
            props: [],
            defaultProps: {},
            downloads: 1234,
            likes: 98,
            rating: 4.7,
            ratingCount: 56,
            tags: ['mood', 'wellness', 'team', 'survey'],
            complexity: 'beginner',
            isVerified: false,
            isPremium: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];
    // Generate contextual suggestions based on space category and existing tools
    const suggestions = [];
    // Space-specific recommendations
    switch (space.category) {
        case 'study':
            suggestions.push({
                element: mockElements.find(e => e.id === 'study-timer'),
                relevanceScore: 0.9,
                reason: 'Perfect for study group productivity',
                category: 'space_specific'
            });
            break;
        case 'social':
            suggestions.push({
                element: mockElements.find(e => e.id === 'poll-creator'),
                relevanceScore: 0.8,
                reason: 'Great for group decision making',
                category: 'space_specific'
            });
            break;
        case 'clubs':
            suggestions.push({
                element: mockElements.find(e => e.id === 'attendance-tracker'),
                relevanceScore: 0.9,
                reason: 'Essential for club meeting management',
                category: 'space_specific'
            });
            break;
    }
    // Trending tools
    suggestions.push({
        element: mockElements.find(e => e.id === 'mood-check'),
        relevanceScore: 0.7,
        reason: 'Trending in wellness communities',
        category: 'trending'
    });
    // Popular recommendations
    mockElements
        .filter(e => e.downloads > 1500)
        .forEach(element => {
        if (!suggestions.find(s => s.element.id === element.id)) {
            suggestions.push({
                element,
                relevanceScore: 0.6,
                reason: `Popular choice with ${element.downloads.toLocaleString()} downloads`,
                category: 'popular'
            });
        }
    });
    return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
const SuggestionCard = ({ suggestion, onInstall, onPreview }) => {
    const { element, reason, category } = suggestion;
    const IconComponent = element.icon;
    const categoryConfig = {
        trending: { label: 'Trending', className: 'bg-purple-100 text-purple-800 border-purple-200' },
        recommended: { label: 'Recommended', className: 'bg-blue-100 text-blue-800 border-blue-200' },
        space_specific: { label: 'For This Space', className: 'bg-green-100 text-green-800 border-green-200' },
        popular: { label: 'Popular', className: 'bg-amber-100 text-amber-800 border-amber-200' }
    };
    return (_jsx(HiveCard, { className: "p-4 hover:shadow-md transition-all group cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0", children: _jsx(IconComponent, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors", children: element.name }), _jsx("p", { className: "text-sm text-gray-600 line-clamp-2 mb-2", children: element.description })] }), _jsxs("div", { className: "flex items-center gap-1 ml-2", children: [_jsx(HiveBadge, { className: categoryConfig[category].className, children: categoryConfig[category].label }), element.isVerified && (_jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200", children: "\u2713" }))] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-yellow-400" }), element.rating] }), _jsx("span", { children: element.downloads.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: (e) => {
                                                e.stopPropagation();
                                                onPreview(element);
                                            }, children: "Preview" }), _jsxs(HiveButton, { size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onInstall(element.id);
                                            }, children: [_jsx(Plus, { className: "w-3 h-3 mr-1" }), "Add"] })] })] }), _jsx("div", { className: "mt-2 p-2 bg-gray-50 rounded-md", children: _jsx("p", { className: "text-xs text-gray-600", children: reason }) })] })] }) }));
};
const CategorySection = ({ category, suggestions, onInstall, onPreview }) => {
    const IconComponent = category.icon;
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IconComponent, { className: "w-5 h-5 text-amber-600" }), _jsx("h3", { className: "font-semibold text-gray-900", children: category.title }), _jsxs("span", { className: "text-sm text-gray-500", children: ["(", suggestions.length, ")"] })] }), _jsx("p", { className: "text-sm text-gray-600", children: category.description }), _jsx("div", { className: "grid gap-3", children: suggestions.map((suggestion) => (_jsx(SuggestionCard, { suggestion: suggestion, onInstall: onInstall, onPreview: onPreview }, suggestion.element.id))) })] }));
};
export function LibraryContextualAccess({ space, onToolInstall, onClose, isOpen = false, triggerRef }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const suggestions = useMemo(() => generateContextualSuggestions(space), [space]);
    // Group suggestions by category
    const categorizedSuggestions = useMemo(() => {
        const categories = [
            {
                id: 'space_specific',
                title: `Perfect for ${space.category} spaces`,
                description: `Tools specifically designed for ${space.category} communities like yours`,
                icon: Target,
                elements: [],
                priority: 1
            },
            {
                id: 'trending',
                title: 'Trending Now',
                description: 'Popular tools that communities are adding this week',
                icon: TrendingUp,
                elements: [],
                priority: 2
            },
            {
                id: 'popular',
                title: 'Community Favorites',
                description: 'Most downloaded and highest-rated tools',
                icon: Star,
                elements: [],
                priority: 3
            }
        ];
        // Group suggestions by category
        suggestions.forEach(suggestion => {
            const category = categories.find(c => c.id === suggestion.category);
            if (category) {
                category.elements.push(suggestion.element);
            }
        });
        return categories
            .filter(category => category.elements.length > 0)
            .sort((a, b) => a.priority - b.priority);
    }, [suggestions, space.category]);
    const filteredSuggestions = useMemo(() => {
        let filtered = suggestions;
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(suggestion => suggestion.element.name.toLowerCase().includes(query) ||
                suggestion.element.description.toLowerCase().includes(query) ||
                suggestion.element.tags.some(tag => tag.toLowerCase().includes(query)));
        }
        // Category filter
        if (activeCategory !== 'all') {
            filtered = filtered.filter(suggestion => suggestion.category === activeCategory);
        }
        return filtered;
    }, [suggestions, searchQuery, activeCategory]);
    const handleInstall = useCallback(async (elementId) => {
        setLoading(true);
        try {
            await onToolInstall?.(elementId);
            onClose?.();
        }
        catch (error) {
            console.error('Failed to install tool:', error);
        }
        finally {
            setLoading(false);
        }
    }, [onToolInstall, onClose]);
    const handlePreview = useCallback((element) => {
        // Open element preview modal or navigate to preview
        console.log('Preview element:', element);
    }, []);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col", children: [_jsxs("div", { className: "p-6 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [_jsx(Wand2, { className: "w-6 h-6 text-amber-500" }), "Add Tools to ", space.name] }), _jsxs("p", { className: "text-gray-600", children: ["Discover tools perfect for your ", space.category, " community"] })] }), _jsx(HiveButton, { variant: "outline", onClick: onClose, children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mt-4 flex gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tools...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("select", { value: activeCategory, onChange: (e) => setActiveCategory(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "space_specific", children: "Space Specific" }), _jsx("option", { value: "trending", children: "Trending" }), _jsx("option", { value: "popular", children: "Popular" })] })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Installing tool..." })] })) : filteredSuggestions.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Sparkles, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Tools Found" }), _jsx("p", { className: "text-gray-600", children: searchQuery ? 'Try different search terms' : 'No tools available for the selected category' })] })) : searchQuery || activeCategory !== 'all' ? (
                    /* Filtered Results */
                    _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("h3", { className: "font-semibold text-gray-900", children: [filteredSuggestions.length, " tool", filteredSuggestions.length !== 1 ? 's' : '', " found"] }) }), _jsx("div", { className: "grid gap-3", children: filteredSuggestions.map((suggestion) => (_jsx(SuggestionCard, { suggestion: suggestion, onInstall: handleInstall, onPreview: handlePreview }, suggestion.element.id))) })] })) : (
                    /* Categorized View */
                    _jsx("div", { className: "space-y-8", children: categorizedSuggestions.map((category) => {
                            const categorySuggestions = suggestions.filter(s => s.category === category.id);
                            return (_jsx(CategorySection, { category: category, suggestions: categorySuggestions, onInstall: handleInstall, onPreview: handlePreview }, category.id));
                        }) })) }), _jsx("div", { className: "p-6 border-t border-gray-200 bg-gray-50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-600", children: ["Can't find what you need? ", _jsx("button", { className: "text-amber-600 hover:text-amber-700 font-medium", children: "Browse all tools" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsxs(HiveButton, { onClick: () => console.log('Browse HiveLAB'), children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Browse HiveLAB"] })] })] }) })] }) }));
}
export default LibraryContextualAccess;
//# sourceMappingURL=library-contextual-access.js.map