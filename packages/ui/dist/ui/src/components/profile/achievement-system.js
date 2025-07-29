'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Target, Users, Calendar, Flame, Book, Code, Heart, Lock, CheckCircle, Search, Share2, Download, Eye, EyeOff } from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
export const AchievementSystem = ({ achievements, stats, isOwnProfile = false, onAchievementClick, onClaimReward, onShareAchievement, className }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRarity, setSelectedRarity] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSecrets, setShowSecrets] = useState(false);
    const categories = [
        { id: 'all', label: 'All', icon: _jsx(Award, { className: "h-4 w-4" }) },
        { id: 'builder', label: 'Builder', icon: _jsx(Code, { className: "h-4 w-4" }) },
        { id: 'social', label: 'Social', icon: _jsx(Users, { className: "h-4 w-4" }) },
        { id: 'academic', label: 'Academic', icon: _jsx(Book, { className: "h-4 w-4" }) },
        { id: 'community', label: 'Community', icon: _jsx(Heart, { className: "h-4 w-4" }) },
        { id: 'milestone', label: 'Milestone', icon: _jsx(Target, { className: "h-4 w-4" }) },
        { id: 'seasonal', label: 'Seasonal', icon: _jsx(Calendar, { className: "h-4 w-4" }) },
        { id: 'special', label: 'Special', icon: _jsx(Star, { className: "h-4 w-4" }) }
    ];
    const rarities = [
        { id: 'all', label: 'All Rarities', color: 'text-hive-text-secondary' },
        { id: 'common', label: 'Common', color: 'text-gray-400' },
        { id: 'uncommon', label: 'Uncommon', color: 'text-green-400' },
        { id: 'rare', label: 'Rare', color: 'text-blue-400' },
        { id: 'epic', label: 'Epic', color: 'text-purple-400' },
        { id: 'legendary', label: 'Legendary', color: 'text-yellow-400' }
    ];
    const filteredAchievements = useMemo(() => {
        let filtered = achievements;
        // Filter by tab
        switch (activeTab) {
            case 'earned':
                filtered = filtered.filter(a => a.status === 'completed');
                break;
            case 'progress':
                filtered = filtered.filter(a => a.status === 'in_progress');
                break;
            case 'available':
                filtered = filtered.filter(a => a.status === 'available' || a.status === 'locked');
                break;
        }
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a => a.category === selectedCategory);
        }
        // Filter by rarity
        if (selectedRarity !== 'all') {
            filtered = filtered.filter(a => a.rarity === selectedRarity);
        }
        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Filter secrets
        if (!showSecrets) {
            filtered = filtered.filter(a => !a.isSecret || a.status === 'completed');
        }
        return filtered;
    }, [achievements, activeTab, selectedCategory, selectedRarity, searchQuery, showSecrets]);
    const getRarityColor = (rarity) => {
        const rarityItem = rarities.find(r => r.id === rarity);
        return rarityItem?.color || 'text-hive-text-secondary';
    };
    const getRarityGlow = (rarity) => {
        switch (rarity) {
            case 'common':
                return 'shadow-gray-500/20';
            case 'uncommon':
                return 'shadow-green-500/20';
            case 'rare':
                return 'shadow-blue-500/20';
            case 'epic':
                return 'shadow-purple-500/20';
            case 'legendary':
                return 'shadow-yellow-500/20';
            default:
                return '';
        }
    };
    const getProgressPercentage = (achievement) => {
        if (!achievement.progress)
            return 0;
        return Math.min((achievement.progress.current / achievement.progress.total) * 100, 100);
    };
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Achievement System" }), _jsx("p", { className: "text-hive-text-secondary", children: "Track your campus journey and unlock rewards" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: () => setShowSecrets(!showSecrets), children: [showSecrets ? _jsx(EyeOff, { className: "h-4 w-4 mr-2" }) : _jsx(Eye, { className: "h-4 w-4 mr-2" }), showSecrets ? 'Hide' : 'Show', " Secrets"] }), isOwnProfile && (_jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export Progress"] }))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-hive-gold/20 flex items-center justify-center", children: _jsx(Trophy, { className: "h-6 w-6 text-hive-gold" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-hive-text-primary", children: stats.totalEarned }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Achievements Earned" })] })] }) }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center", children: _jsx(Target, { className: "h-6 w-6 text-blue-500" }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-2xl font-bold text-hive-text-primary", children: [Math.round(stats.completionRate), "%"] }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Completion Rate" })] })] }) }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center", children: _jsx(Star, { className: "h-6 w-6 text-purple-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-hive-text-primary", children: stats.totalPoints.toLocaleString() }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Achievement Points" })] })] }) }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center", children: _jsx(Flame, { className: "h-6 w-6 text-orange-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-hive-text-primary", children: stats.streaks[0]?.current || 0 }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Current Streak" })] })] }) })] }), stats.recentAchievements.length > 0 && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Recent Achievements" }), _jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: stats.recentAchievements.map((achievement) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "flex-shrink-0", children: _jsxs("div", { className: "text-center p-4 bg-hive-background-primary rounded-lg min-w-[120px]", children: [_jsx("div", { className: "text-3xl mb-2", children: achievement.icon }), _jsx("p", { className: "text-sm font-medium text-hive-text-primary truncate", children: achievement.name }), _jsx(Badge, { className: getRarityColor(achievement.rarity), children: achievement.rarity })] }) }, achievement.id))) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-2", children: [
                            { id: 'overview', label: 'Overview' },
                            { id: 'earned', label: `Earned (${achievements.filter(a => a.status === 'completed').length})` },
                            { id: 'progress', label: `In Progress (${achievements.filter(a => a.status === 'in_progress').length})` },
                            { id: 'available', label: `Available (${achievements.filter(a => a.status === 'available' || a.status === 'locked').length})` }
                        ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: cn("px-4 py-2 rounded-lg transition-colors", activeTab === tab.id
                                ? "bg-hive-gold text-hive-text-primary"
                                : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"), children: tab.label }, tab.id))) }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-hive-text-secondary" }), _jsx("input", { type: "text", placeholder: "Search achievements...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary placeholder-hive-text-secondary focus:outline-none focus:ring-2 focus:ring-hive-gold w-64" })] }) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-hive-text-secondary", children: "Category:" }), _jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:outline-none focus:ring-2 focus:ring-hive-gold", children: categories.map((category) => (_jsx("option", { value: category.id, children: category.label }, category.id))) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium text-hive-text-secondary", children: "Rarity:" }), _jsx("select", { value: selectedRarity, onChange: (e) => setSelectedRarity(e.target.value), className: "px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:outline-none focus:ring-2 focus:ring-hive-gold", children: rarities.map((rarity) => (_jsx("option", { value: rarity.id, children: rarity.label }, rarity.id))) })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredAchievements.map((achievement) => (_jsx(motion.div, { layout: true, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.2 }, children: _jsx(AchievementCard, { achievement: achievement, onClick: () => onAchievementClick?.(achievement), onClaim: () => onClaimReward?.(achievement), onShare: () => onShareAchievement?.(achievement), isOwnProfile: isOwnProfile }) }, achievement.id))) }) }), filteredAchievements.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-hive-surface-elevated flex items-center justify-center mx-auto mb-4", children: _jsx(Award, { className: "h-10 w-10 text-hive-text-secondary" }) }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "No achievements found" }), _jsx("p", { className: "text-hive-text-secondary", children: "Try adjusting your search or filter criteria" })] }))] }));
};
const AchievementCard = ({ achievement, onClick, onClaim, onShare, isOwnProfile }) => {
    const isLocked = achievement.status === 'locked';
    const isCompleted = achievement.status === 'completed';
    const inProgress = achievement.status === 'in_progress';
    const progressPercentage = achievement.progress
        ? Math.min((achievement.progress.current / achievement.progress.total) * 100, 100)
        : 0;
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common':
                return 'text-gray-400 border-gray-400/20';
            case 'uncommon':
                return 'text-green-400 border-green-400/20';
            case 'rare':
                return 'text-blue-400 border-blue-400/20';
            case 'epic':
                return 'text-purple-400 border-purple-400/20';
            case 'legendary':
                return 'text-yellow-400 border-yellow-400/20';
            default:
                return 'text-hive-text-secondary border-hive-border-subtle';
        }
    };
    const getRarityGlow = (rarity) => {
        if (!isCompleted)
            return '';
        switch (rarity) {
            case 'rare':
                return 'shadow-lg shadow-blue-500/20';
            case 'epic':
                return 'shadow-lg shadow-purple-500/20';
            case 'legendary':
                return 'shadow-xl shadow-yellow-500/30';
            default:
                return '';
        }
    };
    return (_jsxs(HiveCard, { className: cn("p-6 cursor-pointer transition-all duration-200 hover:shadow-lg", isCompleted && getRarityGlow(achievement.rarity), isLocked && "opacity-75"), onClick: onClick, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all", isCompleted ? "bg-hive-gold/20" : "bg-hive-surface-elevated", isLocked && "grayscale"), children: isLocked && achievement.isSecret ? '?' : achievement.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: cn("font-semibold truncate", isCompleted ? "text-hive-text-primary" : "text-hive-text-secondary", isLocked && achievement.isSecret && "text-hive-text-tertiary"), children: isLocked && achievement.isSecret ? 'Secret Achievement' : achievement.name }), _jsx(Badge, { className: getRarityColor(achievement.rarity), children: achievement.rarity })] })] }), isCompleted && (_jsx(CheckCircle, { className: "h-5 w-5 text-green-500 flex-shrink-0" })), isLocked && (_jsx(Lock, { className: "h-5 w-5 text-hive-text-tertiary flex-shrink-0" }))] }), _jsx("p", { className: cn("text-sm mb-4 line-clamp-2", isCompleted ? "text-hive-text-primary" : "text-hive-text-secondary", isLocked && achievement.isSecret && "text-hive-text-tertiary"), children: isLocked && achievement.isSecret
                    ? 'Complete certain actions to unlock this achievement'
                    : achievement.description }), inProgress && achievement.progress && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-hive-text-secondary", children: "Progress" }), _jsxs("span", { className: "text-xs text-hive-text-primary font-medium", children: [achievement.progress.current, " / ", achievement.progress.total, achievement.progress.unit && ` ${achievement.progress.unit}`] })] }), _jsx("div", { className: "w-full bg-hive-background-primary rounded-full h-2", children: _jsx("div", { className: "bg-hive-gold h-2 rounded-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs text-hive-text-secondary", children: [achievement.points, " points"] }), achievement.isLimited && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "Limited" }))] }), isCompleted && isOwnProfile && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: (e) => { e.stopPropagation(); onShare(); }, children: _jsx(Share2, { className: "h-4 w-4" }) }))] }), _jsx("div", { className: "mt-3 pt-3 border-t border-hive-border-subtle", children: _jsxs("div", { className: "flex items-center justify-between text-xs text-hive-text-tertiary", children: [_jsxs("span", { children: ["Earned by ", achievement.completedBy.toLocaleString(), " students"] }), _jsxs("span", { children: [achievement.completionRate.toFixed(1), "% completion"] })] }) })] }));
};
export default AchievementSystem;
//# sourceMappingURL=achievement-system.js.map