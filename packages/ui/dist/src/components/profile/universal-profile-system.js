"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Edit3, Settings, Share2, Camera, Crown, Shield, MessageSquare, UserPlus, Calendar, Activity, Award, Users, Zap, MapPin, Link, Clock, Star, Heart, Grid, List, Filter } from 'lucide-react';
import { Button } from '../../index.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.js';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.js';
import { UniversalBottomNav } from '../navigation/universal-bottom-nav.js';
import { cn } from '../../lib/utils.js';
export function UniversalProfileSystem({ user, spaces, tools, recentActivity, isOwnProfile, isLoading = false, onEditProfile, onMessageUser, onFollowUser, onShareProfile, onPrivacySettings, className }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState('grid');
    const [showAllSpaces, setShowAllSpaces] = useState(false);
    const [showAllTools, setShowAllTools] = useState(false);
    // Profile completion calculation
    const calculateCompletion = () => {
        let completed = 0;
        const total = 10;
        if (user.avatar)
            completed++;
        if (user.bio)
            completed++;
        if (user.location)
            completed++;
        if (user.major)
            completed++;
        if (user.gradYear)
            completed++;
        if (user.website)
            completed++;
        if (spaces.length > 0)
            completed++;
        if (tools.length > 0)
            completed++;
        if (user.stats.connectionsCount > 0)
            completed++;
        if (user.isVerified)
            completed++;
        return Math.round((completed / total) * 100);
    };
    const completionPercentage = calculateCompletion();
    // Format numbers for display
    const formatNumber = (num) => {
        if (num >= 1000)
            return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };
    // Get online status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'busy': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary", children: _jsx("div", { className: "flex items-center justify-center py-20", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-full animate-pulse mx-auto mb-4" }), _jsx("p", { className: "text-hive-text-secondary", children: "Loading profile..." })] }) }) }));
    }
    return (_jsxs("div", { className: cn("min-h-screen bg-hive-background-primary pb-20 lg:pb-0", className), children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "h-32 sm:h-40 bg-gradient-to-r from-hive-gold/20 via-hive-brand-secondary/20 to-hive-gold/20 relative overflow-hidden", children: [user.coverImage ? (_jsx("img", { src: user.coverImage, alt: `${user.name}'s cover`, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-hive-gold/10 via-transparent to-hive-brand-secondary/10" })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-hive-background-primary/50 to-transparent" }), isOwnProfile && (_jsx("div", { className: "absolute top-4 right-4", children: _jsxs(Button, { variant: "secondary", size: "sm", className: "bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border-white/20", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Edit Cover"] }) }))] }), _jsx("div", { className: "relative px-4 sm:px-6 -mt-12", children: _jsxs("div", { className: "flex flex-row items-end gap-4", children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "w-20 h-20 sm:w-24 sm:h-24 border-4 border-hive-background-primary bg-hive-surface-elevated", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name }), _jsx(AvatarFallback, { className: "text-2xl font-bold text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10", children: user.name.split(' ').map(n => n[0]).join('') })] }), user.preferences.showOnlineStatus && (_jsx("div", { className: cn("absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-hive-background-primary", getStatusColor(user.onlineStatus)) })), isOwnProfile && (_jsx(Button, { size: "sm", variant: "secondary", className: "absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-hive-surface-elevated border border-hive-border-subtle", children: _jsx(Camera, { className: "h-4 w-4" }) }))] }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h1", { className: "text-xl sm:text-2xl font-bold text-hive-text-primary truncate", children: user.name }), user.isVerified && (_jsxs(Badge, { variant: "secondary", className: "bg-blue-500/10 text-blue-400 border-blue-400/20", children: [_jsx(Shield, { className: "h-3 w-3 mr-1" }), "Verified"] })), user.isBuilder && (_jsxs(Badge, { variant: "secondary", className: "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border-hive-gold/20", children: [_jsx(Crown, { className: "h-3 w-3 mr-1" }), "Builder"] }))] }), _jsxs("p", { className: "text-hive-text-secondary mb-2", children: ["@", user.handle] }), user.bio && (_jsx("p", { className: "text-hive-text-primary mb-3 max-w-2xl", children: user.bio })), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-hive-text-secondary", children: [user.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: user.location })] })), user.website && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Link, { className: "h-4 w-4" }), _jsx("a", { href: user.website, target: "_blank", rel: "noopener noreferrer", className: "text-[var(--hive-brand-secondary)] hover:underline", children: user.website.replace(/^https?:\/\//, '') })] })), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsxs("span", { children: ["Joined ", new Date(user.joinedAt).toLocaleDateString()] })] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: isOwnProfile ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: onEditProfile, children: [_jsx(Edit3, { className: "h-4 w-4 mr-2" }), "Edit Profile"] }), _jsx(Button, { variant: "outline", onClick: onPrivacySettings, children: _jsx(Settings, { className: "h-4 w-4" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { onClick: onMessageUser, children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-2" }), "Message"] }), _jsxs(Button, { variant: "outline", onClick: onFollowUser, children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Connect"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onShareProfile, children: _jsx(Share2, { className: "h-4 w-4" }) })] })) })] }) })] }) })] }), _jsx("div", { className: "px-4 sm:px-6 mt-4", children: _jsx("div", { className: "bg-hive-surface-elevated rounded-xl p-4 border border-hive-border-subtle", children: _jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: formatNumber(user.stats.spacesJoined) }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Spaces" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: formatNumber(user.stats.connectionsCount) }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Connections" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: formatNumber(user.stats.toolsCreated) }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Tools" })] }), _jsxs("div", { className: "text-center hidden sm:block", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: formatNumber(user.stats.reputation) }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Reputation" })] }), _jsxs("div", { className: "text-center hidden lg:block", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: user.stats.weekStreak }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Streak" })] }), _jsxs("div", { className: "text-center hidden lg:block", children: [_jsx("div", { className: "text-lg sm:text-xl font-bold text-hive-text-primary", children: formatNumber(user.stats.totalActivity) }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Activity" })] }), _jsxs("div", { className: "text-center hidden lg:block", children: [_jsxs("div", { className: "text-lg sm:text-xl font-bold text-[var(--hive-brand-secondary)]", children: [completionPercentage, "%"] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Complete" })] })] }) }) }), _jsx("div", { className: "px-4 sm:px-6 mt-6", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs(TabsList, { className: "grid w-auto grid-cols-4 bg-hive-surface-elevated", children: [_jsx(TabsTrigger, { value: "overview", className: "px-3 py-2", children: "Overview" }), _jsx(TabsTrigger, { value: "spaces", className: "px-3 py-2", children: "Spaces" }), _jsx(TabsTrigger, { value: "tools", className: "px-3 py-2", children: "Tools" }), _jsx(TabsTrigger, { value: "activity", className: "px-3 py-2", children: "Activity" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setViewMode(viewMode === 'grid' ? 'list' : 'grid'), children: viewMode === 'grid' ? _jsx(List, { className: "h-4 w-4" }) : _jsx(Grid, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(TabsContent, { value: "overview", className: "mt-0", children: _jsx(OverviewTab, { user: user, spaces: spaces.slice(0, 6), tools: tools.slice(0, 6), recentActivity: recentActivity.slice(0, 10), viewMode: viewMode, completionPercentage: completionPercentage }) }), _jsx(TabsContent, { value: "spaces", className: "mt-0", children: _jsx(SpacesTab, { spaces: showAllSpaces ? spaces : spaces.slice(0, 12), viewMode: viewMode, showAll: showAllSpaces, onToggleShowAll: () => setShowAllSpaces(!showAllSpaces) }) }), _jsx(TabsContent, { value: "tools", className: "mt-0", children: _jsx(ToolsTab, { tools: showAllTools ? tools : tools.slice(0, 12), viewMode: viewMode, showAll: showAllTools, onToggleShowAll: () => setShowAllTools(!showAllTools) }) }), _jsx(TabsContent, { value: "activity", className: "mt-0", children: _jsx(ActivityTab, { activity: recentActivity }) })] })] }) }), _jsx(UniversalBottomNav, { user: user })] }));
}
// Individual Tab Components
function OverviewTab({ user, spaces, tools, recentActivity, viewMode, completionPercentage }) {
    return (_jsxs("div", { className: "space-y-4", children: [completionPercentage < 100 && (_jsx(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Star, { className: "h-5 w-5 text-[var(--hive-brand-secondary)] flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-4 mb-1", children: [_jsx("span", { className: "text-sm font-medium text-hive-text-primary", children: "Complete Your Profile" }), _jsxs("span", { className: "text-sm font-medium text-[var(--hive-brand-secondary)]", children: [completionPercentage, "%"] })] }), _jsx("div", { className: "w-full bg-hive-background-primary rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300", style: { width: `${completionPercentage}%` } }) })] })] }) }) })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-hive-text-primary text-lg", children: "Recent Spaces" }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "space-y-2", children: spaces.slice(0, 4).map((space) => (_jsx(SpaceCard, { space: space, compact: true }, space.id))) }) })] }), _jsxs(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-hive-text-primary text-lg", children: "Favorite Tools" }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "space-y-2", children: tools.filter(tool => tool.isFavorite).slice(0, 3).map((tool) => (_jsx(ToolCard, { tool: tool, compact: true }, tool.id))) }) })] })] }), _jsxs(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-hive-text-primary text-lg", children: "Recent Activity" }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "space-y-3", children: recentActivity.slice(0, 8).map((activity) => (_jsx(ActivityItem, { activity: activity }, activity.id))) }) })] })] })] }));
}
function SpacesTab({ spaces, viewMode, showAll, onToggleShowAll }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary", children: ["All Spaces (", spaces.length, ")"] }), spaces.length > 12 && (_jsx(Button, { variant: "ghost", onClick: onToggleShowAll, children: showAll ? 'Show Less' : 'Show All' }))] }), _jsx("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"), children: spaces.map((space) => (_jsx(SpaceCard, { space: space, compact: viewMode === 'list' }, space.id))) })] }));
}
function ToolsTab({ tools, viewMode, showAll, onToggleShowAll }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary", children: ["All Tools (", tools.length, ")"] }), tools.length > 12 && (_jsx(Button, { variant: "ghost", onClick: onToggleShowAll, children: showAll ? 'Show Less' : 'Show All' }))] }), _jsx("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"), children: tools.map((tool) => (_jsx(ToolCard, { tool: tool, compact: viewMode === 'list' }, tool.id))) })] }));
}
function ActivityTab({ activity }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary", children: ["Activity Feed (", activity.length, ")"] }), _jsx("div", { className: "space-y-4", children: activity.map((item) => (_jsx(ActivityItem, { activity: item }, item.id))) })] }));
}
// Helper Components
function SpaceCard({ space, compact = false }) {
    const getRoleColor = (role) => {
        switch (role) {
            case 'leader': return 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10';
            case 'moderator': return 'text-purple-400 bg-purple-400/10';
            default: return 'text-hive-text-secondary bg-hive-surface-elevated';
        }
    };
    if (compact) {
        return (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center text-lg", style: { backgroundColor: space.color + '20', color: space.color }, children: space.icon || space.name[0] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: space.name }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [space.memberCount, " members"] })] }), _jsx(Badge, { className: getRoleColor(space.role), children: space.role })] }));
    }
    return (_jsx(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold", style: { backgroundColor: space.color + '20', color: space.color }, children: space.icon || space.name[0] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: space.name }), _jsxs("p", { className: "text-sm text-hive-text-secondary mb-2", children: [space.memberCount, " members"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { className: getRoleColor(space.role), children: space.role }), space.isPrivate && (_jsx(Badge, { variant: "secondary", children: "Private" }))] })] })] }) }) }));
}
function ToolCard({ tool, compact = false }) {
    if (compact) {
        return (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-lg", children: tool.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: tool.name }), _jsx("p", { className: "text-sm text-hive-text-secondary truncate", children: tool.description })] }), _jsxs("div", { className: "flex items-center gap-1", children: [tool.isFavorite && _jsx(Heart, { className: "h-4 w-4 text-red-400 fill-current" }), tool.isCreated && _jsx(Crown, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" })] })] }));
    }
    return (_jsx(Card, { className: "bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/30 transition-colors cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center text-xl", children: tool.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-hive-text-primary truncate", children: tool.name }), tool.isFavorite && _jsx(Heart, { className: "h-4 w-4 text-red-400 fill-current" }), tool.isCreated && _jsx(Crown, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" })] }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-2 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-hive-text-secondary", children: [_jsxs("span", { children: ["Used ", tool.usageCount, " times"] }), tool.rating && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 text-yellow-400 fill-current" }), _jsx("span", { children: tool.rating })] }))] })] })] }) }) }));
}
function ActivityItem({ activity }) {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'space_joined': return _jsx(Users, { className: "h-4 w-4 text-blue-400" });
            case 'tool_created': return _jsx(Zap, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" });
            case 'tool_used': return _jsx(Activity, { className: "h-4 w-4 text-green-400" });
            case 'connection_made': return _jsx(UserPlus, { className: "h-4 w-4 text-purple-400" });
            case 'achievement_earned': return _jsx(Award, { className: "h-4 w-4 text-yellow-400" });
            default: return _jsx(Activity, { className: "h-4 w-4 text-hive-text-secondary" });
        }
    };
    return (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-hive-surface-elevated/50 rounded-lg", children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: getActivityIcon(activity.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: activity.title }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-1", children: activity.description }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-hive-text-secondary", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: activity.timestamp })] })] })] }));
}
//# sourceMappingURL=universal-profile-system.js.map