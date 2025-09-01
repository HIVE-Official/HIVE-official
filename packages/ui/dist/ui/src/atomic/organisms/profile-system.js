"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ProfileHeader } from '../molecules/profile-header.js';
import { ProfileStats } from '../molecules/profile-stats.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.js';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.js';
import { LayoutGrid, List, Filter, Users, Zap, Activity } from 'lucide-react';
const profileSystemVariants = cva("min-h-screen bg-hive-background-primary", {
    variants: {
        layout: {
            desktop: "pb-0",
            mobile: "pb-20"
        },
        spacing: {
            tight: "px-3 py-4",
            normal: "px-4 py-6",
            loose: "px-6 py-8"
        }
    },
    defaultVariants: {
        layout: "desktop",
        spacing: "normal"
    }
});
export function ProfileSystem({ user, stats, spaces, tools, recentActivity, isOwnProfile = false, loading = false, onEditProfile, onEditAvatar, onShareProfile, onMessageUser, onFollowUser, onPrivacySettings, layout = "desktop", spacing = "normal", className, ...props }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState('grid');
    const [showAllSpaces, setShowAllSpaces] = useState(false);
    const [showAllTools, setShowAllTools] = useState(false);
    // Mobile detection
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Calculate profile completion
    const calculateCompletion = () => {
        let completed = 0;
        const total = 8;
        if (user.avatar)
            completed++;
        if (user.bio)
            completed++;
        if (user.location)
            completed++;
        if (user.major)
            completed++;
        if (user.website)
            completed++;
        if (spaces.length > 0)
            completed++;
        if (tools.length > 0)
            completed++;
        if (stats.connectionsCount > 0)
            completed++;
        return Math.round((completed / total) * 100);
    };
    const completionPercentage = calculateCompletion();
    if (loading) {
        return (_jsx("div", { className: cn(profileSystemVariants({ layout, spacing }), className), children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "bg-hive-surface-elevated rounded-xl p-6 animate-pulse", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-20 h-20 bg-hive-background-primary rounded-full" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-6 w-32 bg-hive-background-primary rounded" }), _jsx("div", { className: "h-4 w-24 bg-hive-background-primary rounded" })] })] }) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, i) => (_jsxs("div", { className: "bg-hive-surface-elevated rounded-xl p-4 animate-pulse", children: [_jsx("div", { className: "h-8 w-16 bg-hive-background-primary rounded mb-2" }), _jsx("div", { className: "h-4 w-12 bg-hive-background-primary rounded" })] }, i))) })] }) }) }));
    }
    return (_jsx("div", { className: cn(profileSystemVariants({ layout, spacing }), className), ...props, children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx(ProfileHeader, { user: user, isOwnProfile: isOwnProfile, onEditProfile: onEditProfile, onEditAvatar: onEditAvatar, onShareProfile: onShareProfile, variant: "card", avatarSize: isMobile ? "lg" : "xl", className: "mb-6" }), isOwnProfile && completionPercentage < 100 && (_jsx(Card, { className: "mb-6 bg-gradient-to-r from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/20", children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-sm font-medium text-hive-text-primary", children: "Complete Your Profile" }), _jsxs("span", { className: "text-sm font-bold text-hive-gold", children: [completionPercentage, "%"] })] }), _jsx("div", { className: "w-full bg-hive-background-primary rounded-full h-2", children: _jsx("div", { className: "bg-hive-gold h-2 rounded-full transition-all duration-300", style: { width: `${completionPercentage}%` } }) })] }) }) }) })), _jsx(ProfileStats, { stats: stats, layout: isMobile ? "vertical" : "grid", variant: "card", priority: user.isBuilder
                        ? ['toolsUsed', 'spacesJoined', 'reputation', 'connectionsCount']
                        : ['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation'], className: "mb-6" }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs(TabsList, { className: "grid w-auto grid-cols-3 bg-hive-surface-elevated", children: [_jsx(TabsTrigger, { value: "overview", className: "px-4 py-2", children: "Overview" }), _jsxs(TabsTrigger, { value: "spaces", className: "px-4 py-2", children: ["Spaces (", spaces.length, ")"] }), _jsxs(TabsTrigger, { value: "tools", className: "px-4 py-2", children: ["Tools (", tools.length, ")"] })] }), (activeTab === 'spaces' || activeTab === 'tools') && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setViewMode(viewMode === 'grid' ? 'list' : 'grid'), className: "p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors", children: viewMode === 'grid' ? _jsx(List, { className: "h-4 w-4" }) : _jsx(LayoutGrid, { className: "h-4 w-4" }) }), _jsx("button", { className: "p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors", children: _jsx(Filter, { className: "h-4 w-4" }) })] }))] }), _jsx(TabsContent, { value: "overview", className: "mt-0", children: _jsx(OverviewTab, { user: user, stats: stats, spaces: spaces.slice(0, 6), tools: tools.slice(0, 6), recentActivity: recentActivity.slice(0, 8), isOwnProfile: isOwnProfile }) }), _jsx(TabsContent, { value: "spaces", className: "mt-0", children: _jsx(SpacesTab, { spaces: showAllSpaces ? spaces : spaces.slice(0, 12), viewMode: viewMode, showAll: showAllSpaces, onToggleShowAll: () => setShowAllSpaces(!showAllSpaces) }) }), _jsx(TabsContent, { value: "tools", className: "mt-0", children: _jsx(ToolsTab, { tools: showAllTools ? tools : tools.slice(0, 12), viewMode: viewMode, showAll: showAllTools, onToggleShowAll: () => setShowAllTools(!showAllTools) }) })] })] }) }));
}
// Tab Components
function OverviewTab({ user, stats, spaces, tools, recentActivity, isOwnProfile }) {
    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5" }), "Recent Spaces"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: spaces.slice(0, 4).map((space) => (_jsx(SpaceItem, { space: space }, space.id))) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Zap, { className: "h-5 w-5" }), isOwnProfile ? 'Your Tools' : 'Created Tools'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: tools.slice(0, 4).map((tool) => (_jsx(ToolItem, { tool: tool }, tool.id))) }) })] }), _jsxs(Card, { className: "lg:col-span-2", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5" }), "Recent Activity"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentActivity.map((activity) => (_jsx(ActivityItem, { activity: activity }, activity.id))) }) })] })] }));
}
function SpacesTab({ spaces, viewMode, showAll, onToggleShowAll }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary", children: ["All Spaces (", spaces.length, ")"] }), spaces.length > 12 && (_jsx("button", { onClick: onToggleShowAll, className: "text-hive-gold hover:underline", children: showAll ? 'Show Less' : 'Show All' }))] }), _jsx("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"), children: spaces.map((space) => (_jsx(SpaceCard, { space: space, compact: viewMode === 'list' }, space.id))) })] }));
}
function ToolsTab({ tools, viewMode, showAll, onToggleShowAll }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary", children: ["All Tools (", tools.length, ")"] }), tools.length > 12 && (_jsx("button", { onClick: onToggleShowAll, className: "text-hive-gold hover:underline", children: showAll ? 'Show Less' : 'Show All' }))] }), _jsx("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"), children: tools.map((tool) => (_jsx(ToolCard, { tool: tool, compact: viewMode === 'list' }, tool.id))) })] }));
}
// Helper Components
function SpaceItem({ space }) {
    return (_jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg hover:bg-hive-background-interactive transition-colors", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: space.icon || space.name[0] }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: space.name }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [space.memberCount, " members"] })] })] }));
}
function ToolItem({ tool }) {
    return (_jsxs("div", { className: "flex items-center gap-3 p-2 rounded-lg hover:bg-hive-background-interactive transition-colors", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-hive-gold/20 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: tool.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: tool.name }), _jsx("p", { className: "text-sm text-hive-text-secondary truncate", children: tool.description })] })] }));
}
function SpaceCard({ space, compact = false }) {
    if (compact) {
        return _jsx(SpaceItem, { space: space });
    }
    return (_jsx(Card, { className: "hover:border-hive-gold/30 transition-colors cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center", children: _jsx("span", { className: "text-lg", children: space.icon || space.name[0] }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: space.name }), _jsxs("p", { className: "text-sm text-hive-text-secondary mb-2", children: [space.memberCount, " members"] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: space.role })] })] }) }) }));
}
function ToolCard({ tool, compact = false }) {
    if (compact) {
        return _jsx(ToolItem, { tool: tool });
    }
    return (_jsx(Card, { className: "hover:border-hive-gold/30 transition-colors cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-lg bg-hive-gold/20 flex items-center justify-center", children: _jsx("span", { className: "text-lg", children: tool.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: tool.name }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-2 line-clamp-2", children: tool.description }), _jsxs("div", { className: "text-xs text-hive-text-secondary", children: ["Used ", tool.usageCount, " times"] })] })] }) }) }));
}
function ActivityItem({ activity }) {
    return (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-hive-surface-elevated/50 rounded-lg", children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: _jsx(Activity, { className: "h-4 w-4 text-hive-text-secondary" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: activity.title }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-1", children: activity.description }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: activity.timestamp })] })] }));
}
// Export variants for external use
export { profileSystemVariants };
//# sourceMappingURL=profile-system.js.map