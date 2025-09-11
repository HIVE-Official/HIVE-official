'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Search, Filter, Grid3X3, List, Users, Zap, Building2, Home, GraduationCap, UserCheck, Sparkles, TrendingUp, MapPin, Hash, Eye, UserPlus, Bookmark, BookmarkCheck } from 'lucide-react';
const CATEGORY_CONFIG = {
    university: {
        label: 'University',
        description: 'Academic departments, programs, and university-wide communities',
        icon: _jsx(Building2, { className: "w-5 h-5" }),
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/30',
        gradient: 'from-blue-400/20 to-indigo-400/20',
    },
    residential: {
        label: 'Residential',
        description: 'Dorms, floors, and residential communities',
        icon: _jsx(Home, { className: "w-5 h-5" }),
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        borderColor: 'border-green-400/30',
        gradient: 'from-green-400/20 to-emerald-400/20',
    },
    greek: {
        label: 'Greek Life',
        description: 'Fraternities, sororities, and Greek organizations',
        icon: _jsx(GraduationCap, { className: "w-5 h-5" }),
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        borderColor: 'border-purple-400/30',
        gradient: 'from-purple-400/20 to-pink-400/20',
    },
    student: {
        label: 'Student Groups',
        description: 'Clubs, organizations, and student-led communities',
        icon: _jsx(UserCheck, { className: "w-5 h-5" }),
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        borderColor: 'border-orange-400/30',
        gradient: 'from-orange-400/20 to-red-400/20',
    },
};
const FILTER_OPTIONS = [
    { value: 'all', label: 'All Spaces', icon: _jsx(Grid3X3, { className: "w-4 h-4" }) },
    { value: 'joined', label: 'My Spaces', icon: _jsx(UserCheck, { className: "w-4 h-4" }) },
    { value: 'bookmarked', label: 'Bookmarked', icon: _jsx(Bookmark, { className: "w-4 h-4" }) },
    { value: 'recommended', label: 'Recommended', icon: _jsx(Sparkles, { className: "w-4 h-4" }) },
    { value: 'trending', label: 'Trending', icon: _jsx(TrendingUp, { className: "w-4 h-4" }) },
];
const SORT_OPTIONS = [
    { value: 'name', label: 'Name' },
    { value: 'members', label: 'Member Count' },
    { value: 'activity', label: 'Recent Activity' },
    { value: 'created', label: 'Recently Created' },
    { value: 'trending', label: 'Trending Score' },
];
export const SpaceCategoryBrowser = ({ spaces, selectedCategory, initialViewMode = 'grid', showCategoryFilter = true, showJoinActions = true, onSpaceClick, onJoinSpace, onLeaveSpace, onBookmarkSpace, onCreateSpace, currentUserRole = 'member', className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState(initialViewMode);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [showFilters, setShowFilters] = useState(false);
    const [activeCategory, setActiveCategory] = useState(selectedCategory);
    const filteredSpaces = useMemo(() => {
        const filtered = spaces.filter(space => {
            // Category filter
            if (activeCategory && space.category !== activeCategory)
                return false;
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesName = space.name.toLowerCase().includes(query);
                const matchesDescription = space.description.toLowerCase().includes(query);
                const matchesTags = space.tags.some(tag => tag.toLowerCase().includes(query));
                const matchesLocation = space.location?.toLowerCase().includes(query);
                if (!matchesName && !matchesDescription && !matchesTags && !matchesLocation)
                    return false;
            }
            // Content filter
            switch (selectedFilter) {
                case 'joined':
                    return space.isJoined;
                case 'bookmarked':
                    return space.isBookmarked;
                case 'recommended':
                    return space.isRecommended;
                case 'trending':
                    return space.isTrending;
                default:
                    return true;
            }
        });
        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'members':
                    return b.memberCount - a.memberCount;
                case 'activity': {
                    const aActivity = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
                    const bActivity = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
                    return bActivity - aActivity;
                }
                case 'created':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'trending':
                    return b.engagementScore - a.engagementScore;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        return filtered;
    }, [spaces, activeCategory, searchQuery, selectedFilter, sortBy]);
    const categoryStats = useMemo(() => {
        return Object.entries(CATEGORY_CONFIG).map(([category, config]) => ({
            category: category,
            ...config,
            count: spaces.filter(s => s.category === category).length,
            joined: spaces.filter(s => s.category === category && s.isJoined).length,
        }));
    }, [spaces]);
    const handleJoinSpace = async (spaceId) => {
        if (!onJoinSpace)
            return;
        try {
            await onJoinSpace(spaceId);
        }
        catch (error) {
            console.error('Failed to join space:', error);
        }
    };
    const handleLeaveSpace = async (spaceId) => {
        if (!onLeaveSpace)
            return;
        try {
            await onLeaveSpace(spaceId);
        }
        catch (error) {
            console.error('Failed to leave space:', error);
        }
    };
    const handleBookmarkSpace = async (spaceId, bookmarked) => {
        if (!onBookmarkSpace)
            return;
        try {
            await onBookmarkSpace(spaceId, bookmarked);
        }
        catch (error) {
            console.error('Failed to bookmark space:', error);
        }
    };
    const SpaceCard = ({ space }) => {
        const categoryConfig = CATEGORY_CONFIG[space.category];
        return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, whileHover: { y: -2 }, className: cn('group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 via-[var(--hive-background-tertiary)]/40 to-[var(--hive-background-interactive)]/60', 'border-[var(--hive-border-primary)]/20', 'hover:border-[var(--hive-brand-primary)]/30 hover:shadow-xl hover:shadow-[var(--hive-brand-primary)]/10', viewMode === 'list' && 'flex items-center gap-6'), onClick: () => onSpaceClick?.(space.id), children: [_jsx("div", { className: cn('absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300', `bg-gradient-to-br ${categoryConfig.gradient}`) }), _jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2", children: [space.isTrending && (_jsxs("div", { className: "px-2 py-1 rounded-full bg-orange-400/20 text-orange-400 text-xs font-medium flex items-center gap-1", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), _jsx("span", { children: "Trending" })] })), space.isRecommended && (_jsxs("div", { className: "px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium flex items-center gap-1", children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsx("span", { children: "Recommended" })] })), space.isPrivate && (_jsx("div", { className: "w-6 h-6 rounded-full bg-[var(--hive-background-tertiary)]/80 flex items-center justify-center", children: _jsx(Eye, { className: "w-3 h-3 text-[var(--hive-text-muted)]" }) }))] }), _jsxs("div", { className: cn('relative z-10', viewMode === 'list' ? 'flex items-center gap-4 flex-1' : 'space-y-4'), children: [_jsxs("div", { className: cn('relative', viewMode === 'list' ? 'flex-shrink-0' : ''), children: [_jsx("div", { className: cn('rounded-2xl flex items-center justify-center font-bold text-[var(--hive-text-inverse)] relative overflow-hidden', viewMode === 'list' ? 'w-16 h-16 text-xl' : 'w-20 h-20 text-2xl', `bg-gradient-to-br ${categoryConfig.gradient}`), children: space.avatar ? (_jsx("img", { src: space.avatar, alt: space.name, className: "w-full h-full object-cover" })) : (_jsx("span", { children: space.name.charAt(0).toUpperCase() })) }), space.isJoined && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[var(--hive-background-secondary)] flex items-center justify-center", children: _jsx(UserCheck, { className: "w-3 h-3 text-[var(--hive-text-inverse)]" }) }))] }), _jsxs("div", { className: cn(viewMode === 'list' ? 'flex-1 min-w-0' : 'space-y-3'), children: [_jsxs("div", { className: cn(viewMode === 'list' ? 'flex items-start justify-between' : 'space-y-2'), children: [_jsxs("div", { className: cn(viewMode === 'list' ? 'min-w-0 flex-1' : ''), children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-bold text-[var(--hive-text-primary)] truncate", children: space.name }), viewMode === 'grid' && (_jsxs("div", { className: cn('px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1', categoryConfig.bgColor, categoryConfig.borderColor, categoryConfig.color, 'border'), children: [categoryConfig.icon, _jsx("span", { children: categoryConfig.label })] }))] }), _jsx("p", { className: cn('text-[var(--hive-text-secondary)] line-clamp-2', viewMode === 'list' ? 'text-sm' : 'text-sm mb-3'), children: space.description }), space.location && viewMode === 'grid' && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-muted)] mb-2", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: space.location })] }))] }), viewMode === 'list' && showJoinActions && (_jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleBookmarkSpace(space.id, !space.isBookmarked);
                                                    }, className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center", children: space.isBookmarked ? (_jsx(BookmarkCheck, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" })) : (_jsx(Bookmark, { className: "w-4 h-4 text-[var(--hive-text-muted)]" })) }), space.isJoined ? (_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleLeaveSpace(space.id);
                                                    }, className: "px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium", children: "Leave" })) : (_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleJoinSpace(space.id);
                                                    }, className: "px-3 py-1.5 rounded-lg bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 text-sm font-medium", children: "Join" }))] }))] }), viewMode === 'grid' && (_jsxs("div", { className: "flex items-center gap-4 text-xs text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [space.memberCount, " members"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Hash, { className: "w-3 h-3" }), _jsxs("span", { children: [space.postCount, " posts"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Zap, { className: "w-3 h-3" }), _jsxs("span", { children: [space.toolCount, " tools"] })] })] })), space.tags.length > 0 && viewMode === 'grid' && (_jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [space.tags.slice(0, 3).map((tag) => (_jsx("span", { className: "px-2 py-1 rounded-lg bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-muted)] text-xs", children: tag }, tag))), space.tags.length > 3 && (_jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["+", space.tags.length - 3, " more"] }))] }))] }), viewMode === 'grid' && showJoinActions && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        handleBookmarkSpace(space.id, !space.isBookmarked);
                                    }, className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 hover:bg-[var(--hive-brand-primary)]/10 transition-colors duration-200 flex items-center justify-center", children: space.isBookmarked ? (_jsx(BookmarkCheck, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" })) : (_jsx(Bookmark, { className: "w-4 h-4 text-[var(--hive-text-muted)]" })) }), space.isJoined ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: space.userRole && space.userRole !== 'member' ? space.userRole.replace('_', ' ') : 'Member' }), _jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                handleLeaveSpace(space.id);
                                            }, className: "px-3 py-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20 transition-all duration-200 text-sm font-medium", children: "Leave" })] })) : (_jsxs("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        handleJoinSpace(space.id);
                                    }, className: "px-4 py-2 rounded-xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-200 font-medium flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: "Join" })] }))] }))] })] }));
    };
    return (_jsxs("div", { className: cn('h-full flex flex-col', className), children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: activeCategory ? CATEGORY_CONFIG[activeCategory].label : 'Browse Spaces' }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: [filteredSpaces.length, " spaces found"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center rounded-2xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 p-1", children: [_jsx("button", { onClick: () => setViewMode('grid'), className: cn('w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200', viewMode === 'grid'
                                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                                            : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'), children: _jsx(Grid3X3, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setViewMode('list'), className: cn('w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200', viewMode === 'list'
                                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                                            : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'), children: _jsx(List, { className: "w-4 h-4" }) })] }), onCreateSpace && (_jsxs("button", { onClick: () => onCreateSpace(activeCategory || 'student'), className: "px-4 py-2.5 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60 transition-all duration-300 font-semibold flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: "Create Space" })] }))] })] }), showCategoryFilter && !selectedCategory && (_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsxs("button", { onClick: () => setActiveCategory(undefined), className: cn('px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2', !activeCategory
                                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                                : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'), children: [_jsx(Grid3X3, { className: "w-4 h-4" }), _jsx("span", { children: "All Categories" })] }), categoryStats.map((category) => (_jsxs("button", { onClick: () => setActiveCategory(category.category), className: cn('px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2', activeCategory === category.category
                                ? `${category.bgColor} ${category.color} ${category.borderColor}`
                                : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'), children: [category.icon, _jsx("span", { children: category.label }), _jsxs("span", { className: "text-xs opacity-80", children: ["(", category.count, ")"] })] }, category.category)))] }) })), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search spaces by name, description, or tags...", className: "w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200" })] }), _jsx("button", { onClick: () => setShowFilters(!showFilters), className: cn('w-12 h-12 rounded-2xl border transition-all duration-200 flex items-center justify-center', showFilters
                                    ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40'
                                    : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'), children: _jsx(Filter, { className: "w-5 h-5" }) })] }), _jsx(AnimatePresence, { children: showFilters && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "space-y-3", children: [_jsx("div", { className: "flex items-center gap-2 flex-wrap", children: FILTER_OPTIONS.map((option) => (_jsxs("button", { onClick: () => setSelectedFilter(option.value), className: cn('px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2', selectedFilter === option.value
                                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                                            : 'bg-[var(--hive-background-tertiary)]/40 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/20 hover:text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/30'), children: [option.icon, _jsx("span", { children: option.label })] }, option.value))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Sort by:" }), _jsx("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-1.5 rounded-lg border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200", children: SORT_OPTIONS.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] })] })) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredSpaces.length > 0 ? (_jsx("div", { className: cn(viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-4'), children: filteredSpaces.map((space) => (_jsx(SpaceCard, { space: space }, space.id))) })) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-3xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/20 flex items-center justify-center", children: _jsx(Grid3X3, { className: "w-8 h-8 text-[var(--hive-text-muted)]" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "No spaces found" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-sm mx-auto mb-6", children: searchQuery
                                    ? 'Try adjusting your search or filters to find spaces.'
                                    : 'There are no spaces in this category yet.' }), onCreateSpace && (_jsxs("button", { onClick: () => onCreateSpace(activeCategory || 'student'), className: "px-6 py-3 rounded-2xl bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300 font-semibold flex items-center gap-2 mx-auto", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { children: "Create the First Space" })] }))] })) }) })] }));
};
export default SpaceCategoryBrowser;
//# sourceMappingURL=space-category-browser.js.map