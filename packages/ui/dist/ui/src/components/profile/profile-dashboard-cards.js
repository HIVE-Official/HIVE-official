import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Profile Dashboard Cards - Campus Command Center
 * Uses ComprehensiveCard molecule for profile dashboard widgets
 *
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveCard molecule for consistent card structure
 * - SocialInteraction molecule for card engagement
 * - UserIdentity molecule for user displays in cards
 * - Campus-specific dashboard widgets and cross-slice integration
 */
import React from 'react';
import { cn } from '../../lib/utils.js';
// Molecule imports
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card.js';
import { UserIdentity } from '../../atomic/molecules/user-identity.js';
import { iconComposition, Users, Hammer, Calendar, Activity, Star, Zap, Clock, MapPin, BarChart3, Plus, ChevronRight } from '../../atomic/foundations/icon-composition.js';
// === MY SPACES CARD ===
export const MySpacesCard = React.forwardRef(({ spaces, onSpaceClick, onViewAll, className }, ref) => {
    const totalUnread = spaces.reduce((sum, space) => sum + space.unreadCount, 0);
    return (_jsx(ComprehensiveCard, { ref: ref, title: "My Spaces", subtitle: `${spaces.length} active spaces`, badge: totalUnread > 0 ? totalUnread.toString() : undefined, icon: Users, variant: "interactive", campus: "space", size: "comfortable", actions: [
            { id: 'view-all', label: 'View All', onClick: onViewAll },
            { id: 'discover', label: 'Discover', icon: Plus }
        ], className: className, children: _jsxs("div", { className: "space-y-3", children: [spaces.slice(0, 4).map(space => (_jsxs("button", { onClick: () => onSpaceClick?.(space.id), className: cn('w-full flex items-center justify-between p-3 rounded-lg', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', 'text-left'), children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [_jsx("div", { className: "text-xl", children: space.icon || '🏠' }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: space.name }), _jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)] truncate", children: [space.memberCount, " members \u2022 ", space.lastActivity] })] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [space.unreadCount > 0 && (_jsx("span", { className: "px-2 py-1 text-xs font-medium bg-[var(--hive-info-background)] text-[var(--hive-info-primary)] rounded-full", children: space.unreadCount })), _jsx(ChevronRight, { className: iconComposition.sizes.small.className + ' text-[var(--hive-text-muted)]' })] })] }, space.id))), spaces.length === 0 && (_jsxs("div", { className: "text-center py-6 text-[var(--hive-text-secondary)]", children: [_jsx(Users, { className: iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50' }), _jsx("p", { className: "text-sm", children: "Join your first space to get started" })] }))] }) }));
});
MySpacesCard.displayName = 'MySpacesCard';
// === MY TOOLS CARD ===
export const MyToolsCard = React.forwardRef(({ tools, builderStats, onToolClick, onBuildNew, onViewAll, className }, ref) => {
    const builtTools = tools.filter(tool => tool.isBuiltByUser);
    const savedTools = tools.filter(tool => !tool.isBuiltByUser);
    return (_jsx(ComprehensiveCard, { ref: ref, title: "My Tools", subtitle: `${builtTools.length} built • ${savedTools.length} saved`, icon: Hammer, variant: "interactive", campus: "tool", size: "comfortable", badge: builderStats ? `${builderStats.averageRating}/5★` : undefined, actions: [
            { id: 'build-new', label: 'Build New', variant: 'primary', icon: Plus, onClick: onBuildNew },
            { id: 'view-all', label: 'View All', onClick: onViewAll }
        ], className: className, children: _jsxs("div", { className: "space-y-4", children: [builderStats && builtTools.length > 0 && (_jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-success-background)]", children: [_jsx("div", { className: "font-semibold text-[var(--hive-success-primary)]", children: builderStats.totalBuilt }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Built" })] }), _jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-info-background)]", children: [_jsx("div", { className: "font-semibold text-[var(--hive-info-primary)]", children: builderStats.totalUsage.toLocaleString() }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Uses" })] }), _jsxs("div", { className: "text-center p-3 rounded-lg bg-[var(--hive-gold-background)]", children: [_jsx("div", { className: "font-semibold text-[var(--hive-gold-primary)]", children: builderStats.averageRating.toFixed(1) }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Rating" })] })] })), _jsx("div", { className: "space-y-2", children: tools.slice(0, 3).map(tool => (_jsxs("button", { onClick: () => onToolClick?.(tool.id), className: cn('w-full flex items-center justify-between p-2 rounded-md', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', 'text-left'), children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [_jsx("div", { className: cn('p-2 rounded-md', tool.isBuiltByUser
                                            ? 'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]'
                                            : 'bg-[var(--hive-bg-subtle)] text-[var(--hive-text-secondary)]'), children: tool.isBuiltByUser ? _jsx(Zap, { className: "w-4 h-4" }) : _jsx(Hammer, { className: "w-4 h-4" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: tool.name }), _jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: [tool.category, " \u2022 ", tool.usageCount, " uses"] })] })] }), _jsxs("div", { className: "flex items-center gap-1 shrink-0 text-[var(--hive-text-muted)]", children: [_jsx(Star, { className: "w-3 h-3 fill-current" }), _jsx("span", { className: "text-xs", children: tool.rating })] })] }, tool.id))) }), tools.length === 0 && (_jsxs("div", { className: "text-center py-6 text-[var(--hive-text-secondary)]", children: [_jsx(Hammer, { className: iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50' }), _jsx("p", { className: "text-sm", children: "Build your first tool to get started" })] }))] }) }));
});
MyToolsCard.displayName = 'MyToolsCard';
// === UPCOMING EVENTS CARD ===
export const UpcomingEventsCard = React.forwardRef(({ events, onEventClick, onCreateEvent, onViewCalendar, className }, ref) => {
    const sortedEvents = [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    const todayEvents = sortedEvents.filter(event => {
        const today = new Date();
        return event.startTime.toDateString() === today.toDateString();
    });
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Upcoming Events", subtitle: `${todayEvents.length} today • ${events.length} total`, icon: Calendar, variant: "interactive", campus: "event", size: "comfortable", badge: todayEvents.length > 0 ? 'Today' : undefined, actions: [
            { id: 'create', label: 'Create Event', variant: 'primary', icon: Plus, onClick: onCreateEvent },
            { id: 'calendar', label: 'View Calendar', onClick: onViewCalendar }
        ], className: className, children: _jsxs("div", { className: "space-y-3", children: [sortedEvents.slice(0, 4).map(event => {
                    const isToday = event.startTime.toDateString() === new Date().toDateString();
                    const timeString = event.startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                    return (_jsxs("button", { onClick: () => onEventClick?.(event.id), className: cn('w-full flex items-center gap-3 p-3 rounded-lg', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', 'text-left', isToday && 'bg-[var(--hive-warning-background)] border border-[var(--hive-warning-border)]'), children: [_jsx("div", { className: cn('p-2 rounded-md shrink-0', {
                                    'bg-[var(--hive-info-background)] text-[var(--hive-info-primary)]': event.type === 'class',
                                    'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]': event.type === 'meeting',
                                    'bg-[var(--hive-gold-background)] text-[var(--hive-gold-primary)]': event.type === 'social',
                                    'bg-[var(--hive-error-background)] text-[var(--hive-error-primary)]': event.type === 'deadline'
                                }), children: _jsx(Calendar, { className: "w-4 h-4" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: event.title }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: isToday ? `Today ${timeString}` : event.startTime.toLocaleDateString() }), event.location && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { className: "truncate", children: event.location })] }))] }), event.spaceName && (_jsx("div", { className: "text-xs text-[var(--hive-gold-primary)] truncate", children: event.spaceName }))] })] }, event.id));
                }), events.length === 0 && (_jsxs("div", { className: "text-center py-6 text-[var(--hive-text-secondary)]", children: [_jsx(Calendar, { className: iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50' }), _jsx("p", { className: "text-sm", children: "No upcoming events" })] }))] }) }));
});
UpcomingEventsCard.displayName = 'UpcomingEventsCard';
// === CAMPUS CONNECTIONS CARD ===
export const CampusConnectionsCard = React.forwardRef(({ connections, suggestedConnections = [], onConnectionClick, onViewAll, onDiscoverMore, className }, ref) => {
    const onlineConnections = connections.filter(c => c.status === 'online' || c.status === 'studying');
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Campus Connections", subtitle: `${connections.length} connections • ${onlineConnections.length} active`, icon: Activity, variant: "interactive", campus: "profile", size: "comfortable", badge: onlineConnections.length > 0 ? 'Online' : undefined, actions: [
            { id: 'view-all', label: 'View All', onClick: onViewAll },
            { id: 'discover', label: 'Discover More', onClick: onDiscoverMore }
        ], className: className, children: _jsxs("div", { className: "space-y-4", children: [onlineConnections.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Active Now" }), _jsx("div", { className: "space-y-2", children: onlineConnections.slice(0, 3).map(connection => (_jsxs("button", { onClick: () => onConnectionClick?.(connection.id), className: cn('w-full flex items-center gap-3 p-2 rounded-lg', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', 'text-left'), children: [_jsx(UserIdentity, { name: connection.name, handle: connection.handle, avatar: connection.avatar, status: connection.status, size: "small", layout: "horizontal", interactive: "none", showStatus: true }), _jsx("div", { className: "ml-auto text-xs text-[var(--hive-text-muted)]", children: connection.context })] }, connection.id))) })] })), suggestedConnections.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "You Might Know" }), _jsx("div", { className: "space-y-2", children: suggestedConnections.slice(0, 2).map(connection => (_jsxs("div", { className: "flex items-center justify-between p-2 rounded-lg bg-[var(--hive-bg-subtle)]", children: [_jsx(UserIdentity, { name: connection.name, handle: connection.handle, avatar: connection.avatar, size: "small", layout: "horizontal", interactive: "none" }), _jsx("button", { onClick: () => onConnectionClick?.(connection.id), className: "px-3 py-1 text-xs font-medium bg-[var(--hive-gold-primary)] text-[var(--hive-bg-primary)] rounded-full hover:opacity-90", children: "Connect" })] }, connection.id))) })] })), connections.length === 0 && (_jsxs("div", { className: "text-center py-6 text-[var(--hive-text-secondary)]", children: [_jsx(Activity, { className: iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50' }), _jsx("p", { className: "text-sm", children: "Connect with classmates to get started" })] }))] }) }));
});
CampusConnectionsCard.displayName = 'CampusConnectionsCard';
// === PROFILE STATS CARD ===
export const ProfileStatsCard = React.forwardRef(({ stats, onStatClick, className }, ref) => {
    const statItems = [
        { key: 'spaces', label: 'Spaces', value: stats.spacesCount, icon: Users, color: 'info' },
        { key: 'tools-built', label: 'Tools Built', value: stats.toolsBuilt, icon: Hammer, color: 'success' },
        { key: 'connections', label: 'Connections', value: stats.connectionsCount, icon: Activity, color: 'warning' },
        { key: 'reputation', label: 'Reputation', value: `${stats.reputation}/5`, icon: Star, color: 'gold' }
    ];
    const colorMap = {
        info: 'text-[var(--hive-info-primary)] bg-[var(--hive-info-background)]',
        success: 'text-[var(--hive-success-primary)] bg-[var(--hive-success-background)]',
        warning: 'text-[var(--hive-warning-primary)] bg-[var(--hive-warning-background)]',
        gold: 'text-[var(--hive-gold-primary)] bg-[var(--hive-gold-background)]'
    };
    return (_jsxs(ComprehensiveCard, { ref: ref, title: "Your Campus Impact", subtitle: "Activity and engagement metrics", icon: BarChart3, variant: "glass", campus: "profile", size: "comfortable", badge: stats.weeklyActive ? 'Active This Week' : undefined, className: className, children: [_jsx("div", { className: "grid grid-cols-2 gap-4", children: statItems.map(item => {
                    const IconComponent = item.icon;
                    return (_jsxs("button", { onClick: () => onStatClick?.(item.key), className: cn('flex flex-col items-center p-4 rounded-lg', 'hover:bg-[var(--hive-bg-subtle)]', 'transition-colors', 'text-center'), children: [_jsx("div", { className: cn('p-3 rounded-full mb-2', colorMap[item.color]), children: _jsx(IconComponent, { className: iconComposition.sizes.base.className }) }), _jsx("div", { className: "font-semibold text-lg text-[var(--hive-text-primary)]", children: typeof item.value === 'number' ? item.value.toLocaleString() : item.value }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: item.label })] }, item.key));
                }) }), stats.campusRank && (_jsx("div", { className: "mt-4 p-3 rounded-lg bg-[var(--hive-gold-background)] border border-[var(--hive-gold-border)] text-center", children: _jsxs("div", { className: "text-sm text-[var(--hive-gold-primary)]", children: ["\uD83C\uDFC6 Ranked #", stats.campusRank, " on campus"] }) }))] }));
});
ProfileStatsCard.displayName = 'ProfileStatsCard';
// === QUICK ACTIONS CARD ===
export const QuickActionsCard = React.forwardRef(({ actions = [], className }, ref) => {
    const defaultActions = [
        {
            id: 'create-space',
            label: 'Create Space',
            icon: Users,
            description: 'Start a new campus community',
            onClick: () => console.log('Create space')
        },
        {
            id: 'build-tool',
            label: 'Build Tool',
            icon: Hammer,
            description: 'Create a campus utility',
            onClick: () => console.log('Build tool')
        },
        {
            id: 'schedule-event',
            label: 'Schedule Event',
            icon: Calendar,
            description: 'Plan a campus gathering',
            onClick: () => console.log('Schedule event')
        },
        {
            id: 'find-connections',
            label: 'Find Connections',
            icon: Activity,
            description: 'Discover classmates',
            onClick: () => console.log('Find connections')
        }
    ];
    const actionsToShow = actions.length > 0 ? actions : defaultActions;
    return (_jsx(ComprehensiveCard, { ref: ref, title: "Quick Actions", subtitle: "Campus coordination at your fingertips", icon: Zap, variant: "interactive", size: "comfortable", className: className, children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: actionsToShow.map(action => {
                const IconComponent = action.icon;
                return (_jsxs("button", { onClick: action.onClick, className: cn('flex flex-col items-center p-4 rounded-lg', 'border border-[var(--hive-border-subtle)]', 'hover:bg-[var(--hive-bg-subtle)]', 'hover:border-[var(--hive-border-glass-strong)]', 'transition-all', 'text-center', 'group'), children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.large.className, 'text-[var(--hive-text-secondary)]', 'mb-2', 'group-hover:text-[var(--hive-gold-primary)]', 'transition-colors') }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)] text-sm mb-1", children: action.label }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: action.description })] }, action.id));
            }) }) }));
});
QuickActionsCard.displayName = 'QuickActionsCard';
//# sourceMappingURL=profile-dashboard-cards.js.map