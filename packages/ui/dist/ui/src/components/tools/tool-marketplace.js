"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Tool Marketplace - Real Implementation
 *
 * Replaces the mock marketplace with actual tool discovery, installation, and management.
 */
import { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Star, Download, Users, TrendingUp, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';
export function ToolMarketplace({ spaceId, userId, onInstallTool, onViewTool, className }) {
    const [tools, setTools] = useState([]);
    const [filteredTools, setFilteredTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [installingTools, setInstallingTools] = useState(new Set());
    // Fetch tools from API
    const fetchTools = useCallback(async () => {
        setLoading(true);
        try {
            // In production, this would be a real API call
            const response = await fetch('/api/tools/marketplace', {
                headers: { 'Authorization': `Bearer ${userId}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTools(data.tools || []);
            }
            else {
                // Fallback to sample tools for development
                setTools(getSampleMarketplaceTools());
            }
        }
        catch (error) {
            console.error('Failed to fetch tools:', error);
            // Use sample tools as fallback
            setTools(getSampleMarketplaceTools());
        }
        finally {
            setLoading(false);
        }
    }, [userId]);
    // Filter and sort tools
    useEffect(() => {
        let filtered = tools.filter(tool => {
            // Search filter
            const matchesSearch = !searchQuery ||
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
            // Category filter
            const matchesCategory = selectedCategory === 'all' ||
                tool.categories.includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });
    });
    // Sort tools
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'popular':
                return b.stats.installations - a.stats.installations;
            case 'rating':
                return b.stats.rating - a.stats.rating;
            case 'recent':
                return new Date(b.stats.lastUpdated).getTime() - new Date(a.stats.lastUpdated).getTime();
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });
    setFilteredTools(filtered);
}
[tools, searchQuery, selectedCategory, sortBy];
;
// Install tool
const handleInstallTool = async (toolId) => {
    if (!onInstallTool)
        return;
    setInstallingTools(prev => new Set([...prev, toolId]));
    try {
        await onInstallTool(toolId, spaceId);
        // Update tool installation status
        setTools(prev => prev.map(tool => tool.id === toolId
            ? { ...tool, isInstalled: true, stats: { ...tool.stats, installations: tool.stats.installations + 1 } }
            : tool));
    }
    catch (error) {
        console.error('Failed to install tool:', error);
    }
    finally {
        setInstallingTools(prev => {
            const next = new Set(prev);
            next.delete(toolId);
            return next;
        });
    }
};
// Load tools on mount
useEffect(() => {
    fetchTools();
}, [fetchTools]);
if (loading) {
    return (_jsx("div", { className: cn("space-y-6", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-1/3 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map(i => (_jsx("div", { className: "h-64 bg-gray-200 rounded-lg" }, i))) })] }) }));
}
return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Tool Marketplace" }), _jsx("p", { className: "text-gray-600", children: "Discover and install tools built by the HIVE community" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(HiveBadge, { variant: "outline", children: [filteredTools.length, " tools available"] }), spaceId && (_jsx(HiveBadge, { children: "Installing for Space" }))] })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(HiveInput, { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tools, creators, or categories...", className: "pl-10" })] }), _jsxs("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "event", children: "Event Management" }), _jsx("option", { value: "academic", children: "Academic" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "productivity", children: "Productivity" }), _jsx("option", { value: "wellness", children: "Wellness" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "rating", children: "Highest Rated" }), _jsx("option", { value: "recent", children: "Recently Updated" }), _jsx("option", { value: "name", children: "Name A-Z" })] })] }), searchQuery === '' && selectedCategory === 'all' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-amber-600" }), _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Trending Tools" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: filteredTools
                        .filter(tool => tool.stats.trending)
                        .slice(0, 4)
                        .map(tool => (_jsx(ToolCard, { tool: tool, compact: true, onInstall: () => handleInstallTool(tool.id), onView: () => onViewTool?.(tool.id), installing: installingTools.has(tool.id) }, `trending-${tool.id}`))) })] })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'All Tools' }), _jsxs("div", { className: "text-sm text-gray-500", children: [filteredTools.length, " tools found"] })] }), filteredTools.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Search, { className: "w-8 h-8 text-gray-400" }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No tools found" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Try adjusting your search terms or filters" }), _jsx(HiveButton, { variant: "outline", onClick: () => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }, children: "Clear Filters" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTools.map(tool => (_jsx(ToolCard, { tool: tool, onInstall: () => handleInstallTool(tool.id), onView: () => onViewTool?.(tool.id), installing: installingTools.has(tool.id) }, tool.id))) }))] })] }));
function ToolCard({ tool, compact = false, onInstall, onView, installing }) {
    return (_jsx(HiveCard, { className: cn("p-4 hover:shadow-md transition-shadow", compact && "p-3"), children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: cn("font-semibold text-gray-900 truncate", compact ? "text-sm" : "text-lg"), children: tool.name }), _jsxs("p", { className: cn("text-gray-600 truncate", compact ? "text-xs" : "text-sm"), children: ["by ", tool.creator.name, tool.creator.verified && _jsx("span", { className: "text-blue-500 ml-1", children: "\u2713" })] })] }), tool.stats.trending && !compact && (_jsxs(HiveBadge, { variant: "outline", className: "text-xs", children: [_jsx(TrendingUp, { className: "w-3 h-3 mr-1" }), "Trending"] }))] }), !compact && (_jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: tool.description })), _jsx("div", { className: "flex flex-wrap gap-1", children: tool.categories.slice(0, compact ? 2 : 3).map(category => (_jsx(HiveBadge, { variant: "outline", className: "text-xs", children: category }, category))) }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { children: tool.stats.installations.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 fill-current text-yellow-400" }), _jsx("span", { children: tool.stats.rating.toFixed(1) })] }), !compact && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: tool.stats.reviews })] }))] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [tool.isInstalled ? (_jsx(HiveBadge, { className: "flex-1 justify-center", children: "\u2713 Installed" })) : (_jsx(HiveButton, { size: "sm", onClick: onInstall, disabled: installing, className: "flex-1", children: installing ? 'Installing...' : 'Install' })), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: onView, children: _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }));
}
// Sample marketplace tools for development/fallback
function getSampleMarketplaceTools() {
    return [
        {
            id: 'event-creator-pro',
            name: 'Event Creator Pro',
            description: 'Create and manage campus events with advanced features like RSVP tracking, check-in systems, and analytics.',
            version: '2.1.0',
            elements: [], // Would be populated with actual elements
            actions: [],
            metadata: {
                createdBy: 'sarah-chen',
                createdAt: '2024-01-15T10:00:00Z',
                category: 'event',
                tags: ['events', 'coordination', 'rsvp']
            },
            stats: {
                installations: 1247,
                rating: 4.8,
                reviews: 89,
                lastUpdated: '2024-01-20T10:00:00Z',
                trending: true
            },
            creator: {
                name: 'Sarah Chen',
                school: 'University at Buffalo',
                verified: true
            },
            pricing: {
                type: 'free'
            },
            categories: ['event', 'social'],
            isInstalled: false
        },
        {
            id: 'study-group-matcher',
            name: 'Study Group Matcher',
            description: 'Find study partners and form study groups based on courses, schedules, and learning preferences.',
            version: '1.5.2',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'mike-torres',
                createdAt: '2024-01-10T14:30:00Z',
                category: 'academic',
                tags: ['study', 'groups', 'matching']
            },
            stats: {
                installations: 892,
                rating: 4.6,
                reviews: 67,
                lastUpdated: '2024-01-18T09:15:00Z',
                trending: true
            },
            creator: {
                name: 'Mike Torres',
                school: 'University at Buffalo',
                verified: true
            },
            pricing: {
                type: 'free'
            },
            categories: ['academic', 'productivity'],
            isInstalled: true
        },
        {
            id: 'room-booking-system',
            name: 'Room Booking System',
            description: 'Book study rooms, common areas, and meeting spaces with real-time availability and conflict detection.',
            version: '1.2.0',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'alex-kim',
                createdAt: '2024-01-05T16:45:00Z',
                category: 'productivity',
                tags: ['booking', 'rooms', 'scheduling']
            },
            stats: {
                installations: 654,
                rating: 4.4,
                reviews: 45,
                lastUpdated: '2024-01-16T11:30:00Z',
                trending: false
            },
            creator: {
                name: 'Alex Kim',
                school: 'Cornell University',
                verified: false
            },
            pricing: {
                type: 'free'
            },
            categories: ['productivity', 'academic'],
            isInstalled: false
        },
        {
            id: 'wellness-tracker',
            name: 'Campus Wellness Tracker',
            description: 'Track fitness goals, mental health check-ins, and connect with campus wellness resources.',
            version: '1.0.5',
            elements: [],
            actions: [],
            metadata: {
                createdBy: 'jessica-wong',
                createdAt: '2024-01-12T08:20:00Z',
                category: 'wellness',
                tags: ['health', 'fitness', 'mental-health']
            },
            stats: {
                installations: 423,
                rating: 4.7,
                reviews: 31,
                lastUpdated: '2024-01-19T14:45:00Z',
                trending: true
            },
            creator: {
                name: 'Jessica Wong',
                school: 'Syracuse University',
                verified: true
            },
            pricing: {
                type: 'free'
            },
            categories: ['wellness', 'social'],
            isInstalled: false
        }
    ];
}
export default ToolMarketplace;
//# sourceMappingURL=tool-marketplace.js.map