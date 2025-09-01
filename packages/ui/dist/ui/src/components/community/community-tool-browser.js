"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Community Tool Browser
 * Interface for browsing and installing community-created tools
 */
import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../ui/input';
import { Badge } from '../../atomic/atoms/badge.js';
import { LiveToolRuntime } from '../live-tool-runtime.js';
import { Search, Star, Download, Eye, CheckCircle, Zap, User, Heart, Share2, MoreHorizontal } from 'lucide-react';
export const CommunityToolBrowser = ({ communityTools, onInstall, onPreview, onLike, onShare, installedToolIds, currentSpaceId, isLoading = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [previewTool, setPreviewTool] = useState(null);
    const [installingTool, setInstallingTool] = useState(null);
    // Filter and sort tools
    const filteredAndSortedTools = useMemo(() => {
        let filtered = communityTools.filter(communityTool => {
            const matchesSearch = communityTool.tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                communityTool.tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                communityTool.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                communityTool.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = categoryFilter === 'all' || communityTool.metadata.category === categoryFilter;
            const matchesFeatured = !showFeaturedOnly || communityTool.metadata.featured;
            return matchesSearch && matchesCategory && matchesFeatured;
        });
        // Sort tools
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.stats.downloads - a.stats.downloads;
                case 'recent':
                    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
                case 'trending':
                    return b.stats.installs - a.stats.installs; // Using installs as trending metric
                case 'rating':
                    return b.stats.rating - a.stats.rating;
                default:
                    return 0;
            }
        });
        return filtered;
    }, [communityTools, searchQuery, categoryFilter, sortBy, showFeaturedOnly]);
    // Handle tool installation
    const handleInstall = useCallback(async (toolId) => {
        setInstallingTool(toolId);
        try {
            await onInstall(toolId);
        }
        catch (error) {
            console.error('Installation failed:', error);
        }
        finally {
            setInstallingTool(null);
        }
    }, [onInstall]);
    // Format time ago
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        if (diffHours < 1)
            return 'Just now';
        if (diffHours < 24)
            return `${diffHours}h ago`;
        if (diffDays < 7)
            return `${diffDays}d ago`;
        return `${Math.floor(diffDays / 7)}w ago`;
    };
    // Get category color
    const getCategoryColor = (category) => {
        switch (category) {
            case 'productivity': return 'bg-blue-500';
            case 'collaboration': return 'bg-green-500';
            case 'communication': return 'bg-orange-500';
            case 'organization': return 'bg-purple-500';
            case 'engagement': return 'bg-pink-500';
            case 'academic': return 'bg-indigo-500';
            default: return 'bg-gray-500';
        }
    };
    // Generate star rating display
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(_jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }, i));
        }
        if (hasHalfStar) {
            stars.push(_jsx(Star, { className: "w-3 h-3 fill-yellow-400/50 text-yellow-400" }, "half"));
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(_jsx(Star, { className: "w-3 h-3 text-gray-400" }, `empty-${i}`));
        }
        return stars;
    };
    if (isLoading) {
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-primary)] rounded-lg animate-pulse mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Loading community tools..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-[var(--hive-text-primary)]", children: "Community Tools" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Discover and install tools created by the HIVE community" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Badge, { variant: "secondary", className: "text-xs", children: [filteredAndSortedTools.length, " tools available"] }) })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-4 flex-1", children: [_jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx(Input, { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tools, creators, or tags...", className: "pl-10" })] }), _jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm focus:border-[var(--hive-primary)] focus:outline-none", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "productivity", children: "Productivity" }), _jsx("option", { value: "collaboration", children: "Collaboration" }), _jsx("option", { value: "communication", children: "Communication" }), _jsx("option", { value: "organization", children: "Organization" }), _jsx("option", { value: "engagement", children: "Engagement" }), _jsx("option", { value: "academic", children: "Academic" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm focus:border-[var(--hive-primary)] focus:outline-none", children: [_jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "recent", children: "Recently Added" }), _jsx("option", { value: "trending", children: "Trending" }), _jsx("option", { value: "rating", children: "Highest Rated" })] })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("button", { onClick: () => setShowFeaturedOnly(!showFeaturedOnly), className: `px-3 py-2 text-sm rounded-lg transition-colors ${showFeaturedOnly
                                ? 'bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]'
                                : 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'}`, children: "Featured Only" }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredAndSortedTools.map((communityTool) => {
                    const isInstalled = installedToolIds.includes(communityTool.id);
                    const isInstalling = installingTool === communityTool.id;
                    return (_jsxs(Card, { className: "p-6 hover:shadow-lg transition-shadow duration-200", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-start space-x-3 flex-1", children: [_jsx("div", { className: `w-12 h-12 ${getCategoryColor(communityTool.metadata.category)} rounded-lg flex items-center justify-center text-2xl`, children: "\uD83D\uDEE0\uFE0F" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] line-clamp-1", children: communityTool.tool.name }), communityTool.metadata.verified && (_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" })), communityTool.metadata.featured && (_jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }))] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] line-clamp-2 mb-2", children: communityTool.tool.description }), _jsx(Badge, { variant: "secondary", className: "text-xs capitalize", children: communityTool.metadata.category })] })] }), _jsx("button", { className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-3 h-3 text-[var(--hive-primary)]" }) }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["by ", communityTool.author.name] }), communityTool.author.isVerified && (_jsx(CheckCircle, { className: "w-3 h-3 text-green-500" }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "flex items-center", children: renderStars(communityTool.stats.rating) }), _jsxs("span", { className: "text-[var(--hive-text-secondary)] ml-1", children: ["(", communityTool.stats.ratingCount, ")"] })] }), _jsxs("div", { className: "flex items-center space-x-1 text-[var(--hive-text-secondary)]", children: [_jsx(Download, { className: "w-3 h-3" }), _jsx("span", { children: communityTool.stats.downloads.toLocaleString() })] })] }), _jsxs("div", { className: "flex flex-wrap gap-1 mb-4", children: [communityTool.metadata.tags.slice(0, 3).map((tag) => (_jsxs("span", { className: "text-xs px-2 py-1 rounded bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]", children: ["#", tag] }, tag))), communityTool.metadata.tags.length > 3 && (_jsxs("span", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["+", communityTool.metadata.tags.length - 3, " more"] }))] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-[var(--hive-border-default)]", children: [_jsx("div", { className: "flex items-center space-x-2", children: isInstalled ? (_jsxs(Button, { size: "sm", disabled: true, className: "bg-green-500/20 text-green-500 border-green-500/30", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-1" }), "Installed"] })) : (_jsx(Button, { size: "sm", onClick: () => handleInstall(communityTool.id), disabled: isInstalling, className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]", children: isInstalling ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 mr-1 animate-spin border-2 border-white/30 border-t-white rounded-full" }), "Installing"] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "w-4 h-4 mr-1" }), "Install"] })) })) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                    setPreviewTool(communityTool.tool);
                                                    onPreview(communityTool.tool);
                                                }, children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => onLike(communityTool.id), children: _jsx(Heart, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => onShare(communityTool.id), children: _jsx(Share2, { className: "w-4 h-4" }) })] })] })] }, communityTool.id));
                }) }), filteredAndSortedTools.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Zap, { className: "w-16 h-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "No tools found" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-6", children: searchQuery || categoryFilter !== 'all' || showFeaturedOnly
                            ? 'Try adjusting your search or filters.'
                            : 'The community tool library is growing. Check back soon!' })] })), previewTool && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-[var(--hive-background-primary)] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden", children: [_jsx("div", { className: "border-b border-[var(--hive-border-default)] p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: ["Preview: ", previewTool.name] }), _jsx(Button, { variant: "ghost", onClick: () => setPreviewTool(null), children: "\u00D7" })] }) }), _jsx("div", { className: "p-6 overflow-y-auto max-h-[80vh]", children: _jsx(LiveToolRuntime, { tool: previewTool, readOnly: true, className: "border border-[var(--hive-border-default)]" }) })] }) }))] }));
};
//# sourceMappingURL=community-tool-browser.js.map