'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Trophy, Star, Unlock, Share2, Lock, Check, Clock, Filter, Search } from 'lucide-react';
const RARITY_CONFIG = {
    common: {
        color: 'text-gray-400',
        bg: 'bg-gray-500/20',
        border: 'border-gray-500/30',
        gradient: 'from-gray-400 to-gray-600',
        glow: 'shadow-gray-500/20'
    },
    uncommon: {
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
        gradient: 'from-green-400 to-green-600',
        glow: 'shadow-green-500/20'
    },
    rare: {
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        gradient: 'from-blue-400 to-blue-600',
        glow: 'shadow-blue-500/20'
    },
    epic: {
        color: 'text-purple-400',
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/30',
        gradient: 'from-purple-400 to-purple-600',
        glow: 'shadow-purple-500/20'
    },
    legendary: {
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        gradient: 'from-yellow-400 to-orange-500',
        glow: 'shadow-yellow-500/20'
    }
};
const CATEGORY_CONFIG = {
    completion: { icon: Trophy, label: 'Completion' },
    participation: { icon: Users, label: 'Participation' },
    social: { icon: Heart, label: 'Social' },
    creative: { icon: Sparkles, label: 'Creative' },
    leadership: { icon: Crown, label: 'Leadership' },
    milestone: { icon: Target, label: 'Milestone' },
    streak: { icon: Zap, label: 'Streak' }
};
const TYPE_ICONS = {
    badge: Award,
    feature: Unlock,
    access: Shield,
    recognition: Medal,
    tool: Zap,
    customization: Sparkles,
    achievement: Trophy
};
export function RitualRewards({ rewards, achievements, onViewReward, onShareReward, onToggleShowcase, className, view = 'grid', filterCategory = [], filterRarity = [], filterStatus = 'all', sortBy = 'date', showStats = true, showProgress = true }) {
    const [selectedView, setSelectedView] = useState(view);
    const [selectedFilters, setSelectedFilters] = useState({
        category: filterCategory,
        rarity: filterRarity,
        status: filterStatus
    });
    const [sortOrder, setSortOrder] = useState(sortBy);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReward, setSelectedReward] = useState(null);
    const [showUnlockAnimation, setShowUnlockAnimation] = useState(null);
    // Combine rewards and achievements
    const allItems = [...rewards, ...achievements];
    // Filter and sort items
    const filteredItems = allItems.filter(item => {
        // Search filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Category filter
        if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(item.category)) {
            return false;
        }
        // Rarity filter
        if (selectedFilters.rarity.length > 0 && !selectedFilters.rarity.includes(item.rarity)) {
            return false;
        }
        // Status filter
        if (selectedFilters.status === 'unlocked' && !item.isUnlocked) {
            return false;
        }
        if (selectedFilters.status === 'locked' && item.isUnlocked) {
            return false;
        }
        return true;
    }).sort((a, b) => {
        switch (sortOrder) {
            case 'date':
                if (!a.unlockedAt && !b.unlockedAt)
                    return 0;
                if (!a.unlockedAt)
                    return 1;
                if (!b.unlockedAt)
                    return -1;
                return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
            case 'rarity': {
                const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            }
            case 'name':
                return a.name.localeCompare(b.name);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
    // Stats
    const stats = {
        total: allItems.length,
        unlocked: allItems.filter(item => item.isUnlocked).length,
        legendary: allItems.filter(item => item.rarity === 'legendary').length,
        legendaryUnlocked: allItems.filter(item => item.rarity === 'legendary' && item.isUnlocked).length,
        recentlyUnlocked: allItems.filter(item => item.isUnlocked && item.unlockedAt &&
            Date.now() - new Date(item.unlockedAt).getTime() < 7 * 24 * 60 * 60 * 1000).length
    };
    // Handle new unlocks animation
    useEffect(() => {
        const recentlyUnlocked = allItems.find(item => item.isUnlocked && item.unlockedAt &&
            Date.now() - new Date(item.unlockedAt).getTime() < 10000);
        if (recentlyUnlocked) {
            setShowUnlockAnimation(recentlyUnlocked.id);
            setTimeout(() => setShowUnlockAnimation(null), 5000);
        }
    }, [allItems]);
    // Render reward card
    const renderRewardCard = (item, compact = false) => {
        const rarityConfig = RARITY_CONFIG[item.rarity];
        const TypeIcon = TYPE_ICONS[item.type];
        const CategoryIcon = CATEGORY_CONFIG[item.category]?.icon || Award;
        const isAchievement = item.type === 'achievement';
        const achievement = isAchievement ? item : null;
        if (compact) {
            return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, whileHover: { y: -2 }, className: cn("relative p-3 rounded-xl border transition-all cursor-pointer group overflow-hidden", item.isUnlocked
                    ? cn(rarityConfig.bg, rarityConfig.border, "hover:shadow-lg", rarityConfig.glow)
                    : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] opacity-60"), onClick: () => onViewReward?.(item), children: [item.isUnlocked && (_jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity", rarityConfig.gradient) })), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: cn("p-2 rounded-lg", item.isUnlocked ? rarityConfig.bg : "bg-gray-500/20"), children: _jsx(TypeIcon, { className: cn("h-5 w-5", item.isUnlocked ? rarityConfig.color : "text-gray-500") }) }), !item.isUnlocked && _jsx(Lock, { className: "h-4 w-4 text-gray-500" }), item.isShowcase && _jsx(Star, { className: "h-4 w-4 text-[var(--hive-gold)]" })] }), _jsx("h4", { className: cn("font-semibold mb-1 line-clamp-1", item.isUnlocked ? "text-[var(--hive-text-primary)]" : "text-gray-500"), children: item.name }), _jsx("p", { className: cn("text-xs mb-2 line-clamp-2", item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"), children: item.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: cn("text-xs px-2 py-1 rounded-full font-medium", rarityConfig.bg, rarityConfig.color), children: item.rarity.toUpperCase() }), item.unlockedAt && (_jsx("span", { className: "text-xs text-[var(--hive-text-secondary)]", children: new Date(item.unlockedAt).toLocaleDateString() }))] }), achievement && achievement.progress && showProgress && (_jsxs("div", { className: "mt-2", children: [_jsx("div", { className: "w-full bg-[var(--hive-background-tertiary)] rounded-full h-1.5", children: _jsx("div", { className: cn("h-1.5 rounded-full bg-gradient-to-r", rarityConfig.gradient), style: { width: `${(achievement.progress.current / achievement.progress.target) * 100}%` } }) }), _jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] mt-1", children: [achievement.progress.current, "/", achievement.progress.target, " ", achievement.progress.unit] })] }))] })] }, item.id));
        }
        // Full card view
        return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: { y: -4 }, className: cn("relative p-6 rounded-xl border transition-all cursor-pointer group overflow-hidden", item.isUnlocked
                ? cn(rarityConfig.bg, rarityConfig.border, "hover:shadow-2xl", rarityConfig.glow)
                : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] opacity-75"), onClick: () => onViewReward?.(item), children: [_jsx(AnimatePresence, { children: showUnlockAnimation === item.id && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 bg-gradient-to-r from-[var(--hive-gold)]/20 to-purple-500/20 flex items-center justify-center z-20", children: _jsx(motion.div, { animate: { scale: [1, 1.2, 1], rotate: [0, 180, 360] }, transition: { duration: 2 }, className: "text-6xl", children: "\u2728" }) })) }), item.isUnlocked && (_jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-15 transition-opacity", rarityConfig.gradient) })), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("p-3 rounded-xl", item.isUnlocked ? rarityConfig.bg : "bg-gray-500/20"), children: item.imageUrl ? (_jsx("img", { src: item.imageUrl, alt: item.name, className: "h-8 w-8" })) : item.icon ? (_jsx("span", { className: "text-2xl", children: item.icon })) : (_jsx(TypeIcon, { className: cn("h-8 w-8", item.isUnlocked ? rarityConfig.color : "text-gray-500") })) }), _jsxs("div", { children: [_jsx("h3", { className: cn("text-lg font-bold", item.isUnlocked ? "text-[var(--hive-text-primary)]" : "text-gray-500"), children: item.name }), _jsx("p", { className: cn("text-sm", item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"), children: CATEGORY_CONFIG[item.category]?.label })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [!item.isUnlocked && _jsx(Lock, { className: "h-5 w-5 text-gray-500" }), item.isShowcase && _jsx(Star, { className: "h-5 w-5 text-[var(--hive-gold)]" }), item.isTimeLimited && item.expiresAt && (_jsxs("div", { className: "flex items-center gap-1 text-red-400", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Limited" })] }))] })] }), _jsx("p", { className: cn("text-sm mb-4", item.isUnlocked ? "text-[var(--hive-text-secondary)]" : "text-gray-500"), children: item.description }), achievement && achievement.progress && showProgress && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Progress" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: [achievement.progress.current, "/", achievement.progress.target, " ", achievement.progress.unit] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-tertiary)] rounded-full h-2", children: _jsx(motion.div, { className: cn("h-2 rounded-full bg-gradient-to-r", rarityConfig.gradient), initial: { width: 0 }, animate: { width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }, transition: { duration: 1.5, ease: "easeOut" } }) })] })), achievement && achievement.conditions && (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Conditions" }), _jsx("div", { className: "space-y-1", children: achievement.conditions.map((condition, index) => (_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [condition.completed ? (_jsx(Check, { className: "h-3 w-3 text-green-400" })) : (_jsx("div", { className: "h-3 w-3 border border-gray-500 rounded-sm" })), _jsx("span", { className: condition.completed ? "text-green-400" : "text-[var(--hive-text-secondary)]", children: condition.description })] }, index))) })] })), item.featureUnlocks && item.featureUnlocks.length > 0 && item.isUnlocked && (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Unlocks" }), _jsx("div", { className: "space-y-1", children: item.featureUnlocks.map((feature, index) => (_jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]", children: [_jsx(Unlock, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsx("span", { children: feature.name })] }, index))) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: cn("text-sm px-3 py-1 rounded-full font-medium", rarityConfig.bg, rarityConfig.color), children: item.rarity.toUpperCase() }), item.unlockedAt && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["Unlocked ", new Date(item.unlockedAt).toLocaleDateString()] })), item.stats?.totalEarned && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: [item.stats.totalEarned.toLocaleString(), " earned"] }))] }), item.isUnlocked && (_jsxs("div", { className: "flex items-center gap-2", children: [item.canShare && onShareReward && (_jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                onShareReward(item);
                                            }, className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", title: "Share reward", children: _jsx(Share2, { className: "h-4 w-4" }) })), onToggleShowcase && (_jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                onToggleShowcase(item.id, !item.isShowcase);
                                            }, className: cn("p-2 rounded-lg transition-all", item.isShowcase
                                                ? "text-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                                                : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"), title: item.isShowcase ? "Remove from showcase" : "Add to showcase", children: _jsx(Star, { className: "h-4 w-4" }) }))] }))] })] })] }, item.id));
    };
    return (_jsx("div", { className: cn("bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)]", className), children: _jsxs("div", { className: "p-6 border-b border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Rewards & Achievements" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Track your progress and celebrate your accomplishments" })] }), _jsx("div", { className: "flex bg-[var(--hive-background-tertiary)] rounded-lg p-1", children: [
                                { key: 'grid', icon: Grid3X3 },
                                { key: 'list', icon: List },
                                { key: 'showcase', icon: Star }
                            ].map(({ key, icon: Icon }) => (_jsx("button", { onClick: () => setSelectedView(key), className: cn("p-2 rounded-lg transition-all", selectedView === key
                                    ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                                    : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]"), title: key.charAt(0).toUpperCase() + key.slice(1) + ' view', children: _jsx(Icon, { className: "h-4 w-4" }) }, key))) })] }), showStats && (_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { className: "text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: [stats.unlocked, "/", stats.total] }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Unlocked" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-gold)]", children: [stats.legendaryUnlocked, "/", stats.legendary] }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Legendary" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: stats.recentlyUnlocked }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "This Week" })] }), _jsxs("div", { className: "text-center p-3 bg-[var(--hive-background-tertiary)] rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: [Math.round((stats.unlocked / stats.total) * 100), "%"] }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Complete" })] })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search rewards and achievements...", className: "w-full pl-10 pr-4 py-2 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-secondary)]" })] }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx(Filter, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsxs("select", { value: selectedFilters.status, onChange: (e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value })), className: "px-3 py-1 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-sm text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "unlocked", children: "Unlocked" }), _jsx("option", { value: "locked", children: "Locked" })] }), _jsxs("select", { value: sortOrder, onChange: (e) => setSortOrder(e.target.value), className: "px-3 py-1 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-sm text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "date", children: "Recent" }), _jsx("option", { value: "rarity", children: "Rarity" }), _jsx("option", { value: "name", children: "Name" }), _jsx("option", { value: "category", children: "Category" })] }), Object.entries(CATEGORY_CONFIG).map(([category, config]) => {
                                    const Icon = config.icon;
                                    const isSelected = selectedFilters.category.includes(category);
                                    return (_jsx("button", { onClick: () => {
                                            setSelectedFilters(prev => ({
                                                ...prev,
                                                category: isSelected
                                                    ? prev.category.filter(c => c !== category)
                                                    : [...prev.category, category]
                                            }));
                                        } }, category));
                                }), "className=", cn("flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all", isSelected
                                    ? "bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border border-[var(--hive-gold)]/30"
                                    : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"), ">", _jsx(Icon, { className: "h-3 w-3" }), config.label] }), "); })}", Object.entries(RARITY_CONFIG).map(([rarity, config]) => {
                            const isSelected = selectedFilters.rarity.includes(rarity);
                            return (_jsx("button", { onClick: () => {
                                    setSelectedFilters(prev => ({
                                        ...prev,
                                        rarity: isSelected
                                            ? prev.rarity.filter(r => r !== rarity)
                                            : [...prev.rarity, rarity]
                                    }));
                                } }, rarity));
                        }), "className=", cn("px-3 py-1 rounded-lg text-xs font-medium transition-all border", isSelected
                            ? cn(config.bg, config.color, config.border)
                            : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)]"), ">", rarity.toUpperCase()] }), "); })}"] }) }));
    div >
        { /* Content */}
        < div;
    className = "p-6" >
        _jsxs(AnimatePresence, { mode: "wait", children: [selectedView === 'showcase' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: filteredItems.filter(item => item.isShowcase).length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredItems.filter(item => item.isShowcase).map(item => renderRewardCard(item)) })) : (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: [_jsx(Star, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No items in showcase" }), _jsx("p", { className: "text-sm mt-2", children: "Star your favorite rewards to display them here" })] })) }, "showcase")), selectedView === 'grid' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: filteredItems.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filteredItems.map(item => renderRewardCard(item, true)) })) : (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: [_jsx(Trophy, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No rewards found" }), _jsx("p", { className: "text-sm mt-2", children: "Try adjusting your filters" })] })) }, "grid")), selectedView === 'list' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: filteredItems.length > 0 ? (_jsx("div", { className: "space-y-4", children: filteredItems.map(item => renderRewardCard(item)) })) : (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: [_jsx(Trophy, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No rewards found" }), _jsx("p", { className: "text-sm mt-2", children: "Try adjusting your filters" })] })) }, "list"))] });
    div >
    ;
    div >
    ;
    ;
}
//# sourceMappingURL=ritual-rewards.js.map