"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { motionDurations } from '../motion/hive-motion-system';
import { HiveSpaceCard } from '../atomic/organisms/hive-space-card';
import { Search, Grid, List, TrendingUp, Users, Home, GraduationCap, Building, Zap, SortAsc, Plus, Sparkles, Target } from 'lucide-react';
// HIVE Space Directory - Comprehensive Space Discovery System
// Advanced filtering, search, and organization for the HIVE ecosystem
const hiveSpaceDirectoryVariants = cva("relative w-full min-h-screen bg-[var(--hive-background-primary)]/5 backdrop-blur-sm", {
    variants: {
        layout: {
            grid: "",
            list: "",
            masonry: "",
        }
    },
    defaultVariants: {
        layout: "grid",
    },
});
// Filter configurations
const spaceTypeFilters = [
    {
        type: 'all',
        label: 'All Spaces',
        icon: Target,
        color: 'text-[var(--hive-text-primary)]',
        count: 0
    },
    {
        type: 'academic',
        label: 'Academic',
        icon: GraduationCap,
        color: 'text-blue-400',
        count: 0
    },
    {
        type: 'social',
        label: 'Social',
        icon: Users,
        color: 'text-green-400',
        count: 0
    },
    {
        type: 'residential',
        label: 'Residential',
        icon: Home,
        color: 'text-purple-400',
        count: 0
    },
    {
        type: 'administrative',
        label: 'Administrative',
        icon: Building,
        color: 'text-gray-400',
        count: 0
    },
];
const sortOptions = [
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'newest', label: 'Newest', icon: Sparkles },
    { key: 'members', label: 'Most Members', icon: Users },
    { key: 'activity', label: 'Most Active', icon: Zap },
    { key: 'alphabetical', label: 'A-Z', icon: SortAsc },
];
export const HiveSpaceDirectory = React.forwardRef(({ className, layout, spaces = [], isLoading = false, onSpaceClick, onSpaceJoin, onSpaceLeave, onCreateSpace, joinedSpaceIds = [], trendingSpaceIds = [], searchPlaceholder = "Search spaces...", showCreateButton = true, showTrendingSection = true, showFilters = true, showLayoutToggle = true, defaultSort = 'trending', maxSpacesPerRow = 4, enableVirtualization = false, ...props }, ref) => {
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [sortBy, setSortBy] = useState(defaultSort);
    const [viewLayout, setViewLayout] = useState(layout || 'grid');
    const [showSearch, setShowSearch] = useState(false);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);
    // Calculate filter counts
    const filterCounts = useMemo(() => {
        const counts = { all: spaces.length };
        spaces.forEach(space => {
            const type = space.tags?.[0]?.type || 'academic';
            counts[type] = (counts[type] || 0) + 1;
        });
        return counts;
    }, [spaces]);
    // Enhanced filtering and sorting logic
    const filteredAndSortedSpaces = useMemo(() => {
        let filtered = spaces.filter(space => {
            // Type filter
            const typeMatch = selectedType === 'all' || space.tags?.[0]?.type === selectedType;
            // Search filter
            const searchMatch = searchQuery === '' ||
                space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.tags?.some(tag => tag.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tag.sub_type?.toLowerCase().includes(searchQuery.toLowerCase()));
            return typeMatch && searchMatch;
        });
        // Sorting logic
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'trending':
                    const aTrending = trendingSpaceIds.includes(a.id) ? 1 : 0;
                    const bTrending = trendingSpaceIds.includes(b.id) ? 1 : 0;
                    if (aTrending !== bTrending)
                        return bTrending - aTrending;
                    return b.memberCount - a.memberCount;
                case 'newest':
                    const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                    const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                    return bDate.getTime() - aDate.getTime();
                case 'members':
                    return b.memberCount - a.memberCount;
                case 'activity':
                    // Mock activity score - in real app would come from backend
                    return Math.random() - 0.5;
                case 'alphabetical':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
        return filtered;
    }, [spaces, selectedType, searchQuery, sortBy, trendingSpaceIds]);
    // Separate trending spaces for special section
    const trendingSpaces = useMemo(() => filteredAndSortedSpaces
        .filter(space => trendingSpaceIds.includes(space.id))
        .slice(0, 5), [filteredAndSortedSpaces, trendingSpaceIds]);
    // Handle search toggle
    const handleSearchToggle = useCallback(() => {
        setShowSearch(prev => !prev);
        if (!showSearch) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [showSearch]);
    // Handle keyboard shortcuts
    const handleKeyDown = useCallback((e) => {
        if (e.key === '/' && !showSearch) {
            e.preventDefault();
            handleSearchToggle();
        }
        if (e.key === 'Escape' && showSearch) {
            setShowSearch(false);
            setSearchQuery('');
        }
    }, [showSearch, handleSearchToggle]);
    return (_jsxs("div", { ref: ref, className: cn(hiveSpaceDirectoryVariants({ layout: viewLayout, className })), onKeyDown: handleKeyDown, tabIndex: 0, ...props, children: [_jsx("div", { className: "sticky top-0 z-30 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border-b border-white/10", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: motionDurations.smooth }, children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Spaces" }), _jsxs("p", { className: "text-gray-400", children: ["Discover and join ", spaces.length, " campus communities"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(motion.button, { className: cn("flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200", showSearch
                                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20"), onClick: handleSearchToggle, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Search" }), _jsx("kbd", { className: "px-1.5 py-0.5 text-xs bg-[var(--hive-text-primary)]/10 rounded border border-white/20", children: "/" })] }), showLayoutToggle && (_jsx("div", { className: "flex bg-[var(--hive-background-primary)]/20 rounded-xl border border-white/10 p-1", children: [
                                                { key: 'grid', icon: Grid },
                                                { key: 'list', icon: List }
                                            ].map(({ key, icon: Icon }) => (_jsx(motion.button, { className: cn("p-2 rounded-lg transition-all duration-200", viewLayout === key
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "text-gray-400 hover:text-[var(--hive-text-primary)]"), onClick: () => setViewLayout(key), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Icon, { className: "w-4 h-4" }) }, key))) })), showCreateButton && (_jsxs(motion.button, { className: "flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200", onClick: onCreateSpace, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "Create Space" })] }))] })] }), _jsx(AnimatePresence, { children: showSearch && (_jsx(motion.div, { className: "mb-6", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: motionDurations.smooth }, children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { ref: searchInputRef, type: "text", placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-3 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl text-[var(--hive-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/30 transition-all duration-200" })] }) })) }), showFilters && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-2 overflow-x-auto", children: spaceTypeFilters.map((filter, index) => {
                                        const Icon = filter.icon;
                                        const count = filterCounts[filter.type] || 0;
                                        const isActive = selectedType === filter.type;
                                        return (_jsxs(motion.button, { className: cn("flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap", isActive
                                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"), onClick: () => setSelectedType(filter.type), initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.05 }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Icon, { className: cn("w-4 h-4", isActive ? "text-yellow-400" : filter.color) }), _jsx("span", { children: filter.label }), _jsx("span", { className: cn("px-2 py-0.5 rounded-full text-xs", isActive
                                                        ? "bg-yellow-500/30 text-yellow-300"
                                                        : "bg-[var(--hive-text-primary)]/10 text-gray-500"), children: count })] }, filter.type));
                                    }) }), _jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Sort by:" }), _jsx("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50", children: sortOptions.map(option => (_jsx("option", { value: option.key, children: option.label }, option.key))) })] })] }))] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [showTrendingSection && trendingSpaces.length > 0 && (_jsxs(motion.section, { className: "mb-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-yellow-400" }), _jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Trending Spaces" })] }), _jsx("div", { className: "h-px bg-gradient-to-r from-yellow-500/30 to-transparent flex-1" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6", children: trendingSpaces.map((space, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(HiveSpaceCard, { space: space, variant: "featured", size: "sm", onClick: onSpaceClick, onJoin: onSpaceJoin, onLeave: onSpaceLeave, isJoined: joinedSpaceIds.includes(space.id), isTrending: true, activityScore: Math.floor(Math.random() * 40) + 60, showActivityIndicator: true }) }, space.id))) })] })), _jsxs(motion.section, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: searchQuery ? `Search Results (${filteredAndSortedSpaces.length})` : 'All Spaces' }), filteredAndSortedSpaces.length > 0 && (_jsxs("span", { className: "text-sm text-gray-400", children: [filteredAndSortedSpaces.length, " space", filteredAndSortedSpaces.length !== 1 ? 's' : ''] }))] }), isLoading && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({ length: 8 }).map((_, index) => (_jsx("div", { className: "h-64 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-2xl animate-pulse" }, index))) })), !isLoading && filteredAndSortedSpaces.length > 0 && (_jsx(motion.div, { className: cn(viewLayout === 'grid'
                                    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${Math.min(maxSpacesPerRow, 4)} gap-6`
                                    : "space-y-4"), variants: {
                                    show: {
                                        transition: {
                                            staggerChildren: 0.05
                                        }
                                    }
                                }, initial: "hidden", animate: "show", children: filteredAndSortedSpaces.map((space, index) => (_jsx(motion.div, { variants: {
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }, transition: { duration: motionDurations.smooth }, children: _jsx(HiveSpaceCard, { space: space, variant: trendingSpaceIds.includes(space.id) ? "featured" : "default", size: viewLayout === 'list' ? 'sm' : 'md', onClick: onSpaceClick, onJoin: onSpaceJoin, onLeave: onSpaceLeave, isJoined: joinedSpaceIds.includes(space.id), isTrending: trendingSpaceIds.includes(space.id), activityScore: Math.floor(Math.random() * 100), recentActivity: index % 3 === 0 ? "New post 2 hours ago" : undefined, showActivityIndicator: true, showMemberPreview: true }) }, space.id))) })), !isLoading && filteredAndSortedSpaces.length === 0 && (_jsxs(motion.div, { className: "text-center py-16", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center", children: _jsx(Search, { className: "w-8 h-8 text-gray-400" }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No spaces found" }), _jsx("p", { className: "text-gray-400 mb-6", children: searchQuery
                                            ? `No spaces match "${searchQuery}". Try adjusting your search or filters.`
                                            : "No spaces available in this category." }), searchQuery && (_jsx(motion.button, { className: "px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200", onClick: () => setSearchQuery(''), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Clear search" }))] }))] })] })] }));
});
HiveSpaceDirectory.displayName = "HiveSpaceDirectory";
export { hiveSpaceDirectoryVariants };
//# sourceMappingURL=hive-space-directory.js.map