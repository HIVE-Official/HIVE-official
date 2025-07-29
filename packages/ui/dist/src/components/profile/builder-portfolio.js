'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, Eye, Heart, Edit3, Plus, Search, Crown, Award, Zap, TrendingUp, Users, Palette, Database, Package, BookOpen, Target } from 'lucide-react';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
import { cn } from '../../lib/utils.js';
export const BuilderPortfolio = ({ tools, achievements, stats, isOwnProfile = false, onToolClick, onEditTool, onCreateTool, onViewAnalytics, className }) => {
    const [view, setView] = useState('grid');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredAndSortedTools = useMemo(() => {
        let filtered = tools;
        // Filter by category
        if (filter !== 'all') {
            filtered = filtered.filter(tool => tool.category === filter);
        }
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.stats.installs - a.stats.installs;
                case 'rating':
                    return b.stats.rating - a.stats.rating;
                case 'recent':
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }
        });
        return filtered;
    }, [tools, filter, sortBy, searchQuery]);
    const categories = [
        { id: 'all', label: 'All Tools', icon: _jsx(Package, { className: "h-4 w-4" }) },
        { id: 'productivity', label: 'Productivity', icon: _jsx(Target, { className: "h-4 w-4" }) },
        { id: 'academic', label: 'Academic', icon: _jsx(BookOpen, { className: "h-4 w-4" }) },
        { id: 'social', label: 'Social', icon: _jsx(Users, { className: "h-4 w-4" }) },
        { id: 'ai', label: 'AI/ML', icon: _jsx(Zap, { className: "h-4 w-4" }) },
        { id: 'design', label: 'Design', icon: _jsx(Palette, { className: "h-4 w-4" }) },
        { id: 'data', label: 'Data', icon: _jsx(Database, { className: "h-4 w-4" }) }
    ];
    const getBuilderLevelColor = (level) => {
        switch (level) {
            case 'Visionary':
                return 'text-purple-400 bg-purple-400/10';
            case 'Architect':
                return 'text-blue-400 bg-blue-400/10';
            case 'Creator':
                return 'text-green-400 bg-green-400/10';
            case 'Developer':
                return 'text-yellow-400 bg-yellow-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'featured':
                return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'published':
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'draft':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'deprecated':
                return 'text-red-400 bg-red-400/10 border-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    const progressPercentage = (stats.experiencePoints / stats.nextLevelXP) * 100;
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(HiveCard, { className: "p-6 lg:col-span-2", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-hive-gold/20 flex items-center justify-center", children: _jsx(Crown, { className: "h-6 w-6 text-hive-gold" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary", children: "Builder Level" }), _jsx(Badge, { className: getBuilderLevelColor(stats.builderLevel), children: stats.builderLevel })] })] }), isOwnProfile && (_jsxs(HiveButton, { onClick: onCreateTool, className: "gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Create Tool"] }))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Progress to next level" }), _jsxs("span", { className: "text-hive-text-primary font-medium", children: [stats.experiencePoints, " / ", stats.nextLevelXP, " XP"] })] }), _jsx("div", { className: "w-full bg-hive-background-primary rounded-full h-3", children: _jsx("div", { className: "bg-hive-gold h-3 rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: stats.totalTools }), _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Tools Created" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: stats.totalInstalls.toLocaleString() }), _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Total Installs" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: stats.averageRating.toFixed(1) }), _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Avg Rating" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-text-primary", children: stats.streak.current }), _jsx("div", { className: "text-sm text-hive-text-secondary", children: "Day Streak" })] })] })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Award, { className: "h-5 w-5 text-hive-gold" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Recent Achievements" })] }), _jsx("div", { className: "space-y-3", children: achievements.slice(0, 3).map((achievement) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-2xl", children: achievement.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-hive-text-primary truncate", children: achievement.name }), _jsx("p", { className: "text-xs text-hive-text-secondary truncate", children: achievement.description })] })] }, achievement.id))) }), achievements.length > 3 && (_jsx(HiveButton, { variant: "ghost", size: "sm", className: "w-full mt-4", children: "View All Achievements" }))] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-semibold text-hive-text-primary", children: ["Created Tools (", filteredAndSortedTools.length, ")"] }), _jsx("p", { className: "text-hive-text-secondary", children: "Tools and applications built for the campus community" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-hive-text-secondary" }), _jsx("input", { type: "text", placeholder: "Search tools...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary placeholder-hive-text-secondary focus:outline-none focus:ring-2 focus:ring-hive-gold" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "recent", children: "Most Recent" }), _jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "rating", children: "Highest Rated" })] }), _jsxs("div", { className: "flex items-center gap-1 bg-hive-surface-elevated rounded-lg p-1", children: [_jsx("button", { onClick: () => setView('grid'), className: cn("p-2 rounded-md transition-colors", view === 'grid'
                                                    ? "bg-hive-gold text-hive-text-primary"
                                                    : "text-hive-text-secondary hover:text-hive-text-primary"), children: _jsxs("div", { className: "w-4 h-4 grid grid-cols-2 gap-0.5", children: [_jsx("div", { className: "bg-current rounded-sm" }), _jsx("div", { className: "bg-current rounded-sm" }), _jsx("div", { className: "bg-current rounded-sm" }), _jsx("div", { className: "bg-current rounded-sm" })] }) }), _jsx("button", { onClick: () => setView('list'), className: cn("p-2 rounded-md transition-colors", view === 'list'
                                                    ? "bg-hive-gold text-hive-text-primary"
                                                    : "text-hive-text-secondary hover:text-hive-text-primary"), children: _jsxs("div", { className: "w-4 h-4 flex flex-col gap-1", children: [_jsx("div", { className: "bg-current h-0.5 rounded-sm" }), _jsx("div", { className: "bg-current h-0.5 rounded-sm" }), _jsx("div", { className: "bg-current h-0.5 rounded-sm" })] }) })] })] })] }), _jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((category) => (_jsxs("button", { onClick: () => setFilter(category.id), className: cn("flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors", filter === category.id
                                ? "bg-hive-gold text-hive-text-primary"
                                : "bg-hive-surface-elevated text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary"), children: [category.icon, category.label] }, category.id))) }), _jsx("div", { className: cn(view === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"), children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredAndSortedTools.map((tool) => (_jsx(motion.div, { layout: true, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.2 }, children: _jsx(ToolCard, { tool: tool, view: view, isOwnProfile: isOwnProfile, onClick: () => onToolClick?.(tool), onEdit: () => onEditTool?.(tool), onViewAnalytics: () => onViewAnalytics?.(tool) }) }, tool.id))) }) }), filteredAndSortedTools.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-hive-surface-elevated flex items-center justify-center mx-auto mb-4", children: _jsx(Package, { className: "h-10 w-10 text-hive-text-secondary" }) }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: searchQuery || filter !== 'all' ? 'No tools found' : 'No tools created yet' }), _jsx("p", { className: "text-hive-text-secondary mb-6", children: searchQuery || filter !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Start building tools to help your campus community' }), isOwnProfile && (_jsxs(HiveButton, { onClick: onCreateTool, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Create Your First Tool"] }))] }))] })] }));
};
const ToolCard = ({ tool, view, isOwnProfile, onClick, onEdit, onViewAnalytics }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'featured':
                return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'published':
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'draft':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'deprecated':
                return 'text-red-400 bg-red-400/10 border-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    if (view === 'list') {
        return (_jsx(HiveCard, { className: "p-6 cursor-pointer hover:shadow-lg transition-shadow", onClick: onClick, children: _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "w-16 h-16 rounded-xl bg-hive-surface-elevated flex items-center justify-center text-2xl", children: tool.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("h4", { className: "text-lg font-semibold text-hive-text-primary truncate", children: tool.name }), _jsx(Badge, { className: getStatusColor(tool.status), children: tool.status }), tool.status === 'featured' && (_jsxs(Badge, { className: "bg-hive-gold/10 text-hive-gold border-hive-gold/20", children: [_jsx(Star, { className: "h-3 w-3 mr-1" }), "Featured"] }))] }), _jsx("p", { className: "text-hive-text-secondary mb-3 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-6 text-sm text-hive-text-secondary", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Download, { className: "h-4 w-4" }), tool.stats.installs.toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-4 w-4" }), tool.stats.rating.toFixed(1)] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "h-4 w-4" }), tool.stats.views.toLocaleString()] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Heart, { className: "h-4 w-4" }), tool.stats.likes] })] })] }), isOwnProfile && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: (e) => { e.stopPropagation(); onViewAnalytics(); }, children: _jsx(TrendingUp, { className: "h-4 w-4" }) }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: (e) => { e.stopPropagation(); onEdit(); }, children: _jsx(Edit3, { className: "h-4 w-4" }) })] }))] }) }));
    }
    return (_jsxs(HiveCard, { className: "overflow-hidden cursor-pointer hover:shadow-lg transition-shadow", onClick: onClick, children: [_jsxs("div", { className: "p-6 pb-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-hive-surface-elevated flex items-center justify-center text-xl", children: tool.icon }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: getStatusColor(tool.status), children: tool.status }), tool.status === 'featured' && (_jsx(Star, { className: "h-4 w-4 text-hive-gold" })), isOwnProfile && (_jsx("button", { onClick: (e) => { e.stopPropagation(); onEdit(); }, className: "p-1 rounded-md text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary", children: _jsx(Edit3, { className: "h-4 w-4" }) }))] })] }), _jsx("h4", { className: "text-lg font-semibold text-hive-text-primary mb-2 line-clamp-1", children: tool.name }), _jsx("p", { className: "text-hive-text-secondary text-sm line-clamp-2 mb-4", children: tool.shortDescription || tool.description }), _jsxs("div", { className: "flex flex-wrap gap-1 mb-4", children: [tool.tags.slice(0, 3).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))), tool.tags.length > 3 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: ["+", tool.tags.length - 3] }))] })] }), _jsxs("div", { className: "px-6 pb-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Installs" }), _jsx("span", { className: "font-medium text-hive-text-primary", children: tool.stats.installs.toLocaleString() })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Rating" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 text-yellow-400 fill-current" }), _jsx("span", { className: "font-medium text-hive-text-primary", children: tool.stats.rating.toFixed(1) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Views" }), _jsx("span", { className: "font-medium text-hive-text-primary", children: tool.stats.views.toLocaleString() })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Likes" }), _jsx("span", { className: "font-medium text-hive-text-primary", children: tool.stats.likes })] })] }), isOwnProfile && (_jsxs(HiveButton, { variant: "outline", size: "sm", className: "w-full mt-4", onClick: (e) => { e.stopPropagation(); onViewAnalytics(); }, children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2" }), "View Analytics"] }))] })] }));
};
export default BuilderPortfolio;
//# sourceMappingURL=builder-portfolio.js.map