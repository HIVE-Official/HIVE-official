import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Cross-Slice Integration - Campus Command Center Hub
 * Provides integration components connecting Profile with Spaces, Tools, Feed, and Events
 *
 * Built using HIVE foundation systems and molecules:
 * - All molecule components for consistent UI patterns
 * - Campus-specific integration features
 * - Real-time cross-slice data flow
 * - Mobile-first responsive design
 */
import React, { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
// Molecule imports
import { UserIdentity } from '../../atomic/molecules/user-identity';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';
import { iconComposition, Users, Hammer, Calendar, Activity, MapPin, Clock, Star, MessageSquare, Plus, ExternalLink, Zap, Filter, RefreshCw, ChevronRight, Home } from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';
export const SpacesIntegration = React.forwardRef(({ spaces, onSpaceClick, onViewAll, className }, ref) => {
    const prioritySpaces = spaces
        .filter(space => space.isActive)
        .sort((a, b) => b.unreadCount - a.unreadCount || b.memberCount - a.memberCount)
        .slice(0, 4);
    const totalUnread = spaces.reduce((sum, space) => sum + space.unreadCount, 0);
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Active Spaces", subtitle: `${spaces.length} spaces, ${totalUnread} updates`, badge: totalUnread > 0 ? totalUnread.toString() : undefined, icon: Users, variant: "interactive", campus: "space", size: "comfortable", menuActions: [
            { id: 'view-all', label: 'View All Spaces', icon: ExternalLink },
            { id: 'create', label: 'Create Space', icon: Plus }
        ], onActionClick: (actionId) => {
            if (actionId === 'view-all')
                onViewAll?.();
        }, className: className, children: _jsxs("div", { className: "space-y-3", children: [prioritySpaces.map((space) => (_jsx("button", { onClick: () => onSpaceClick?.(space.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx(UserIdentity, { name: space.name, avatar: space.avatar, status: space.isActive ? 'online' : 'offline', role: space.role, size: "small", layout: "horizontal", showHandle: false }), _jsxs("div", { className: "flex flex-col items-end", children: [_jsxs("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]'), children: [space.memberCount, " members"] }), space.unreadCount > 0 && (_jsx("span", { className: cn('mt-1 px-2 py-0.5 rounded-full', 'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]', 'font-[var(--hive-font-family-primary)]', 'text-xs font-medium'), children: space.unreadCount }))] })] }), _jsx(ChevronRight, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-text-muted)]') })] }) }, space.id))), spaces.length > 4 && (_jsxs("button", { onClick: onViewAll, className: cn('w-full p-2 text-center rounded-lg', 'text-[var(--hive-info-primary)] hover:bg-[var(--hive-info-background)]', 'font-[var(--hive-font-family-primary)] text-sm font-medium', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: ["View All ", spaces.length, " Spaces"] }))] }) }));
});
SpacesIntegration.displayName = 'SpacesIntegration';
export const ToolsIntegration = React.forwardRef(({ tools, onToolClick, onViewAll, className }, ref) => {
    const myTools = tools.filter(tool => tool.isOwned).slice(0, 3);
    const recentTools = tools
        .filter(tool => tool.lastUsed && !tool.isOwned)
        .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))
        .slice(0, 2);
    return (_jsx(ComprehensiveCard, { ref: ref, title: "My Tools", subtitle: `${myTools.length} created, ${recentTools.length} recent`, icon: Hammer, variant: "interactive", campus: "tool", size: "comfortable", menuActions: [
            { id: 'create', label: 'Create Tool', icon: Plus },
            { id: 'workshop', label: 'Tool Workshop', icon: Zap },
            { id: 'view-all', label: 'View All Tools', icon: ExternalLink }
        ], onActionClick: (actionId) => {
            if (actionId === 'view-all')
                onViewAll?.();
        }, className: className, children: _jsxs("div", { className: "space-y-4", children: [myTools.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-secondary)]', 'mb-2'), children: "Tools I Built" }), _jsx("div", { className: "space-y-2", children: myTools.map((tool) => (_jsx("button", { onClick: () => onToolClick?.(tool.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]'), children: tool.name }), tool.spaceName && (_jsxs("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]'), children: ["Used in ", tool.spaceName] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-gold-primary)]') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-sm font-medium', 'text-[var(--hive-text-secondary)]'), children: tool.rating.toFixed(1) })] })] }) }, tool.id))) })] })), recentTools.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-secondary)]', 'mb-2'), children: "Recently Used" }), _jsx("div", { className: "space-y-2", children: recentTools.map((tool) => (_jsx("button", { onClick: () => onToolClick?.(tool.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]'), children: tool.name }) }, tool.id))) })] }))] }) }));
});
ToolsIntegration.displayName = 'ToolsIntegration';
export const EventsIntegration = React.forwardRef(({ events, onEventClick, onViewAll, className }, ref) => {
    const upcomingEvents = events
        .filter(event => event.startTime > new Date())
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .slice(0, 3);
    const formatEventTime = (date) => {
        const now = new Date();
        const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (diffHours < 24) {
            return `${Math.round(diffHours)}h`;
        }
        else {
            const diffDays = Math.round(diffHours / 24);
            return `${diffDays}d`;
        }
    };
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Upcoming Events", subtitle: `${upcomingEvents.length} this week`, icon: Calendar, variant: "interactive", campus: "event", size: "comfortable", menuActions: [
            { id: 'create', label: 'Create Event', icon: Plus },
            { id: 'calendar', label: 'View Calendar', icon: Calendar },
            { id: 'view-all', label: 'View All Events', icon: ExternalLink }
        ], onActionClick: (actionId) => {
            if (actionId === 'view-all')
                onViewAll?.();
        }, className: className, children: _jsx("div", { className: "space-y-3", children: upcomingEvents.length > 0 ? upcomingEvents.map((event) => (_jsx("button", { onClick: () => onEventClick?.(event.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]', 'truncate'), children: event.title }), _jsxs("div", { className: "flex items-center gap-4 mt-1", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-text-muted)]') }), _jsxs("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]'), children: ["in ", formatEventTime(event.startTime)] })] }), event.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-text-muted)]') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]', 'truncate'), children: event.location })] }))] }), event.spaceName && (_jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-info-primary)]', 'mt-1'), children: event.spaceName }))] }), _jsxs("div", { className: "flex flex-col items-end gap-1", children: [_jsx("span", { className: cn('px-2 py-1 rounded-full', 'font-[var(--hive-font-family-primary)]', 'text-xs font-medium', event.isRSVP
                                        ? 'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]'
                                        : 'bg-[var(--hive-bg-subtle)] text-[var(--hive-text-muted)]'), children: event.isRSVP ? 'RSVP\'d' : 'RSVP' }), _jsxs("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]'), children: [event.attendeeCount, " going"] })] })] }) }, event.id))) : (_jsxs("div", { className: "text-center py-6", children: [_jsx(Calendar, { className: cn(iconComposition.sizes.large.className, 'text-[var(--hive-text-muted)]', 'mx-auto mb-2') }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-sm text-[var(--hive-text-muted)]'), children: "No upcoming events" })] })) }) }));
});
EventsIntegration.displayName = 'EventsIntegration';
export const ActivityIntegration = React.forwardRef(({ activities, onActivityClick, onViewAll, className }, ref) => {
    const recentActivities = activities.slice(0, 4);
    const getActivityIcon = (type) => {
        switch (type) {
            case 'space_join': return Users;
            case 'tool_create': return Hammer;
            case 'event_attend': return Calendar;
            case 'connection_made': return Activity;
            case 'post_create': return MessageSquare;
            default: return Activity;
        }
    };
    const formatActivityTime = (date) => {
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        }
        else if (diffMinutes < 1440) {
            return `${Math.floor(diffMinutes / 60)}h ago`;
        }
        else {
            return `${Math.floor(diffMinutes / 1440)}d ago`;
        }
    };
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Campus Activity", subtitle: "Your recent interactions", icon: Activity, variant: "interactive", campus: "activity", size: "comfortable", menuActions: [
            { id: 'view-all', label: 'View All Activity', icon: ExternalLink },
            { id: 'filter', label: 'Filter Activity', icon: Filter }
        ], onActionClick: (actionId) => {
            if (actionId === 'view-all')
                onViewAll?.();
        }, className: className, children: _jsx("div", { className: "space-y-3", children: recentActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                return (_jsx("button", { onClick: () => onActivityClick?.(activity.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: cn('p-2 rounded-lg', 'bg-[var(--hive-gold-background)]', 'border border-[var(--hive-gold-border)]', 'flex-shrink-0'), children: _jsx(IconComponent, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-gold-primary)]') }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]', 'truncate'), children: activity.title }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-sm text-[var(--hive-text-secondary)]', 'truncate mt-1'), children: activity.description }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(UserIdentity, { name: activity.user.name, avatar: activity.user.avatar, size: "small", layout: "horizontal", showHandle: false, showStatus: false }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]'), children: formatActivityTime(activity.timestamp) })] })] })] }) }, activity.id));
            }) }) }));
});
ActivityIntegration.displayName = 'ActivityIntegration';
export const QuickActions = React.forwardRef(({ actions, onAction, className }, ref) => {
    const campusActions = actions.filter(action => action.campus);
    const otherActions = actions.filter(action => !action.campus);
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Quick Actions", subtitle: "Get things done faster", icon: Zap, variant: "interactive", campus: "action", size: "comfortable", className: className, children: _jsxs("div", { className: "space-y-4", children: [campusActions.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-secondary)]', 'mb-2'), children: "Campus" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: campusActions.map((action) => {
                                const IconComponent = action.icon;
                                return (_jsxs("button", { onClick: () => onAction?.(action.id), className: cn('p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-gold-primary)]') }), action.badge && action.badge > 0 && (_jsx("span", { className: cn('px-2 py-0.5 rounded-full', 'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]', 'font-[var(--hive-font-family-primary)]', 'text-xs font-medium'), children: action.badge }))] }), _jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-primary)]', 'mb-1'), children: action.label }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-xs text-[var(--hive-text-muted)]', 'line-clamp-2'), children: action.description })] }, action.id));
                            }) })] })), otherActions.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-secondary)]', 'mb-2'), children: "General" }), _jsx("div", { className: "space-y-2", children: otherActions.map((action) => {
                                const IconComponent = action.icon;
                                return (_jsxs("button", { onClick: () => onAction?.(action.id), className: cn('w-full p-3 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-left', 'flex items-center gap-3', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-text-secondary)]') }), _jsxs("div", { className: "flex-1", children: [_jsx("h5", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]'), children: action.label }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-sm text-[var(--hive-text-muted)]'), children: action.description })] }), action.badge && action.badge > 0 && (_jsx("span", { className: cn('px-2 py-1 rounded-full', 'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]', 'font-[var(--hive-font-family-primary)]', 'text-xs font-medium'), children: action.badge }))] }, action.id));
                            }) })] }))] }) }));
});
QuickActions.displayName = 'QuickActions';
// === MAIN CROSS-SLICE INTEGRATION COMPONENT ===
export const CrossSliceIntegration = React.forwardRef(({ spaces = [], tools = [], events = [], recentActivity = [], quickActions = [], showQuickActions = true, showSpaceActivity = true, showToolUsage = true, showUpcomingEvents = true, showCampusActivity = true, campusOptimized = true, onSpaceClick, onToolClick, onEventClick, onActivityClick, onQuickAction, onRefresh, isLoading = false, className }, ref) => {
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = useCallback(async () => {
        if (isLoading || refreshing)
            return;
        setRefreshing(true);
        try {
            await onRefresh?.();
        }
        finally {
            setRefreshing(false);
        }
    }, [onRefresh, isLoading, refreshing]);
    // Generate default quick actions if none provided
    const defaultQuickActions = [
        {
            id: 'create-space',
            label: 'Create Space',
            description: 'Start a new community for your dorm, class, or interest',
            icon: Users,
            campus: true,
            category: 'space'
        },
        {
            id: 'build-tool',
            label: 'Build Tool',
            description: 'Create a custom solution for your community',
            icon: Hammer,
            campus: true,
            category: 'tool'
        },
        {
            id: 'plan-event',
            label: 'Plan Event',
            description: 'Organize study sessions, social events, or meetings',
            icon: Calendar,
            campus: true,
            category: 'event'
        },
        {
            id: 'find-connections',
            label: 'Find Connections',
            description: 'Discover classmates and expand your campus network',
            icon: Activity,
            campus: true,
            category: 'social'
        }
    ];
    const actionsToShow = quickActions.length > 0 ? quickActions : defaultQuickActions;
    return (_jsxs("div", { ref: ref, className: cn('space-y-6', campusOptimized && 'campus-optimized', className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold text-xl', 'text-[var(--hive-text-primary)]'), children: "Campus Command Center" }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-sm text-[var(--hive-text-secondary)]'), children: "Your integrated view of spaces, tools, events, and activity" })] }), onRefresh && (_jsx("button", { onClick: handleRefresh, disabled: isLoading || refreshing, className: cn('p-2 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', 'disabled:opacity-50', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: _jsx(RefreshCw, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-text-secondary)]', (isLoading || refreshing) && 'animate-spin') }) }))] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: [showSpaceActivity && spaces.length > 0 && (_jsx(SpacesIntegration, { spaces: spaces, onSpaceClick: onSpaceClick, onViewAll: () => onQuickAction?.('view-all-spaces') })), showToolUsage && tools.length > 0 && (_jsx(ToolsIntegration, { tools: tools, onToolClick: onToolClick, onViewAll: () => onQuickAction?.('view-all-tools') })), showUpcomingEvents && (_jsx(EventsIntegration, { events: events, onEventClick: onEventClick, onViewAll: () => onQuickAction?.('view-all-events') })), showCampusActivity && recentActivity.length > 0 && (_jsx(ActivityIntegration, { activities: recentActivity, onActivityClick: onActivityClick, onViewAll: () => onQuickAction?.('view-all-activity') })), showQuickActions && (_jsx(QuickActions, { actions: actionsToShow, onAction: onQuickAction }))] }), spaces.length === 0 && tools.length === 0 && events.length === 0 && recentActivity.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Home, { className: cn(iconComposition.sizes.huge.className, 'text-[var(--hive-text-muted)]', 'mx-auto mb-4') }), _jsx("h3", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold text-lg', 'text-[var(--hive-text-primary)]', 'mb-2'), children: "Welcome to Your Campus Command Center" }), _jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', 'text-[var(--hive-text-secondary)]', 'mb-6 max-w-md mx-auto'), children: "Start by joining spaces, building tools, or attending events to see your personalized campus activity here." }), showQuickActions && (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto", children: defaultQuickActions.map((action) => {
                            const IconComponent = action.icon;
                            return (_jsxs("button", { onClick: () => onQuickAction?.(action.id), className: cn('p-4 rounded-lg', 'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-subtle)]', 'text-center', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.large.className, 'text-[var(--hive-gold-primary)]', 'mx-auto mb-2') }), _jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium text-sm', 'text-[var(--hive-text-primary)]'), children: action.label })] }, action.id));
                        }) }))] }))] }));
});
CrossSliceIntegration.displayName = 'CrossSliceIntegration';
//# sourceMappingURL=cross-slice-integration.js.map