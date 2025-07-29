'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, BookOpen, Coffee, Award, Briefcase, User, ExternalLink, AlertTriangle, RefreshCw, Settings, ChevronRight, Bell, Navigation } from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { cn } from '../../lib/utils';
export const CalendarCard = ({ data, state = 'loading', variant = 'desktop', onViewCalendar, onConnectCalendar, onAddEvent, onResolveConflict, onSyncCalendar, onEventClick, className }) => {
    const [showConflictDetails, setShowConflictDetails] = useState(false);
    // Time-aware display logic
    const currentHour = new Date().getHours();
    const timeOfDay = useMemo(() => {
        if (currentHour >= 6 && currentHour < 12)
            return 'morning';
        if (currentHour >= 12 && currentHour < 18)
            return 'afternoon';
        if (currentHour >= 18 && currentHour < 24)
            return 'evening';
        return 'night';
    }, [currentHour]);
    const getTimeBasedTitle = () => {
        switch (timeOfDay) {
            case 'morning': return "Today's Schedule";
            case 'afternoon': return "Today's Schedule";
            case 'evening': return "Tonight & Tomorrow";
            case 'night': return "Tomorrow's Schedule";
            default: return "Today's Schedule";
        }
    };
    const getEventIcon = (type) => {
        const iconMap = {
            academic: _jsx(BookOpen, { className: "h-4 w-4" }),
            study: _jsx(Coffee, { className: "h-4 w-4" }),
            social: _jsx(Users, { className: "h-4 w-4" }),
            personal: _jsx(User, { className: "h-4 w-4" }),
            work: _jsx(Briefcase, { className: "h-4 w-4" }),
            class: _jsx(BookOpen, { className: "h-4 w-4" }),
            meeting: _jsx(Users, { className: "h-4 w-4" }),
            milestone: _jsx(Award, { className: "h-4 w-4" })
        };
        return iconMap[type] || _jsx(Calendar, { className: "h-4 w-4" });
    };
    const getEventTypeEmoji = (type) => {
        const emojiMap = {
            academic: '🎓',
            study: '📚',
            social: '🎉',
            personal: '⚡',
            work: '🏢',
            class: '🎓',
            meeting: '🤝',
            milestone: '🏆'
        };
        return emojiMap[type] || '📅';
    };
    const getEventColor = (type) => {
        // PRD-Aligned: Subtle gradients with consistent color system
        const colorMap = {
            academic: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-300',
            study: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-300',
            social: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-300',
            personal: 'from-yellow-500/10 to-yellow-400/10 border-yellow-500/20 text-yellow-300',
            work: 'from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-300',
            class: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-300',
            meeting: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-300',
            milestone: 'from-yellow-500/10 to-yellow-400/10 border-yellow-500/20 text-yellow-300'
        };
        return colorMap[type] || 'from-gray-600/10 to-gray-700/10 border-gray-600/20 text-gray-300';
    };
    const getConnectionStatusIcon = (connection) => {
        // PRD-Aligned: Consistent status colors
        switch (connection.status) {
            case 'connected':
                return _jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" });
            case 'syncing':
                return _jsx(RefreshCw, { className: "w-3 h-3 animate-spin text-blue-400" });
            case 'error':
                return _jsx("div", { className: "w-2 h-2 rounded-full bg-red-500" });
            default:
                return _jsx("div", { className: "w-2 h-2 rounded-full bg-gray-500" });
        }
    };
    const formatTimeUntil = (event) => {
        const now = new Date();
        const eventTime = new Date(event.time);
        const diff = eventTime.getTime() - now.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        if (minutes < 0)
            return 'Now';
        if (minutes < 60)
            return `in ${minutes} mins`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `in ${hours}h ${minutes % 60}m`;
        const days = Math.floor(hours / 24);
        return `in ${days} days`;
    };
    // Loading State
    if (state === 'loading') {
        return (_jsx(HiveCard, { className: cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-blue-400" }), _jsx("div", { className: "h-5 bg-gray-700 rounded animate-pulse w-32" })] }), _jsx("div", { className: "h-8 bg-gray-700 rounded animate-pulse w-24" })] }), _jsx("div", { className: "h-px bg-gray-700" }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-4 bg-gray-700 rounded animate-pulse w-40" }), _jsx("div", { className: "border rounded-lg p-4 space-y-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gray-700 rounded-lg animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-700 rounded animate-pulse w-3/4" }), _jsx("div", { className: "h-3 bg-gray-700 rounded animate-pulse w-1/2" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "h-6 bg-gray-700 rounded animate-pulse w-16" }), _jsx("div", { className: "h-6 bg-gray-700 rounded animate-pulse w-20" })] })] })] }) })] }), _jsxs("div", { className: "text-center text-sm text-gray-400", children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin inline mr-2" }), "Syncing with Google Calendar..."] })] }) }));
    }
    // Empty State
    if (state === 'empty') {
        return (_jsx(HiveCard, { className: cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-blue-400" }), _jsx("span", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: getTimeBasedTitle() })] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: onViewCalendar, className: "flex items-center gap-1", children: [variant === 'mobile' ? 'Setup' : 'View Calendar', " ", _jsx(ExternalLink, { className: "h-3 w-3" })] })] }), _jsx("div", { className: "h-px bg-gray-700" }), _jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDCC5" }), _jsx("h3", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "No events today" }), _jsx("p", { className: "text-gray-400 mb-6", children: variant === 'mobile' ? 'Ready for a productive day?' : 'Looks like you have a free day!' }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm text-gray-300", children: "Connect your calendar:" }), _jsxs("div", { className: "flex gap-2 justify-center", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => onConnectCalendar?.('google'), className: "flex items-center gap-2", children: "\uD83D\uDCF1 Google Calendar" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => onConnectCalendar?.('outlook'), className: "flex items-center gap-2", children: "\uD83D\uDCF1 Outlook" })] }), _jsx("div", { className: "text-gray-400", children: "or" }), _jsxs(HiveButton, { onClick: onAddEvent, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), " Add Event"] })] })] })] }) }));
    }
    // Error State
    if (state === 'error' || state === 'sync-failed') {
        return (_jsx(HiveCard, { className: cn("p-6", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className), children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-blue-400" }), _jsx("span", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: getTimeBasedTitle() })] }), _jsx(HiveButton, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "h-px bg-gray-700" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-orange-400", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Calendar Sync Issue" })] }), _jsxs("div", { className: "bg-orange-500/10 border border-orange-500/30 rounded-lg p-4", children: [_jsx("p", { className: "text-orange-300 mb-3", children: "Unable to sync with Google Calendar" }), _jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Last successful sync: 2 hours ago" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: () => onSyncCalendar?.('google'), className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), " Try Sync Again"] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", children: [_jsx(Settings, { className: "h-4 w-4" }), " Check Connection"] })] })] }), data?.todaysEvents && data.todaysEvents.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-300 mb-2", children: "\uD83D\uDCF1 Showing Cached Events:" }), _jsx("div", { className: "space-y-2 text-sm text-gray-400", children: data.todaysEvents.slice(0, 2).map((event) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: getEventTypeEmoji(event.type) }), _jsxs("span", { children: [event.time, " - ", event.title] }), _jsx("span", { className: "text-xs", children: "(may have changed)" })] }, event.id))) })] }))] })] }) }));
    }
    // Default State with data
    if (!data)
        return null;
    const { nextEvent, upcomingEvents, connections, conflicts } = data;
    const hasConflicts = conflicts.length > 0;
    return (_jsx(HiveCard, { className: cn("p-6 cursor-pointer hover:border-blue-400/30 transition-colors", variant === 'mobile' ? 'col-span-full' : 'col-span-2', className), onClick: onViewCalendar, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: getTimeBasedTitle() })] }), _jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                onViewCalendar?.();
                            }, className: "flex items-center gap-1", children: [variant === 'mobile' ? 'View All' : 'View Calendar', " ", _jsx(ExternalLink, { className: "h-3 w-3" })] })] }), _jsx("div", { className: "h-px bg-hive-border-secondary" }), nextEvent && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-primary)] font-medium", children: [_jsx(Clock, { className: "h-4 w-4 text-blue-400" }), _jsx("span", { children: variant === 'mobile'
                                        ? `UP NEXT: ${nextEvent.title} ${formatTimeUntil(nextEvent)}`
                                        : `UP NEXT (${formatTimeUntil(nextEvent)})` })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `bg-gradient-to-r ${getEventColor(nextEvent.type)} border rounded-lg p-4 cursor-pointer`, onClick: (e) => {
                                e.stopPropagation();
                                onEventClick?.(nextEvent);
                            }, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3 flex-1", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center", children: getEventIcon(nextEvent.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-1 flex items-center gap-2", children: [getEventTypeEmoji(nextEvent.type), " ", nextEvent.title, variant !== 'mobile' && _jsx("span", { className: "text-[var(--hive-text-primary)]/70", children: nextEvent.time })] }), nextEvent.location && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300 mb-2", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: nextEvent.location }), nextEvent.metadata?.professor && _jsxs("span", { children: ["\u2022 ", nextEvent.metadata.professor] })] })), variant !== 'mobile' && (_jsxs("div", { className: "flex gap-2 mt-2", children: [_jsxs(HiveButton, { size: "xs", variant: "ghost", children: [_jsx(Navigation, { className: "h-3 w-3 mr-1" }), " Directions"] }), _jsxs(HiveButton, { size: "xs", variant: "ghost", children: [_jsx(Bell, { className: "h-3 w-3 mr-1" }), " Remind me in 10 mins"] })] }))] })] }), variant !== 'mobile' && (_jsx("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]/90", children: nextEvent.time }))] }) })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-primary)] font-medium", children: [_jsx("span", { children: "\uD83D\uDCCA" }), _jsx("span", { children: variant === 'mobile' ? `${upcomingEvents.length} more events today:` : "TODAY'S OVERVIEW" })] }), _jsxs("div", { className: "space-y-2 text-sm text-gray-300", children: [upcomingEvents.slice(0, 3).map((event, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { children: ["\u2022 ", event.time, " ", event.title] }), event.metadata?.spaceId && (_jsx(HiveBadge, { variant: "study-streak", className: "text-xs", children: event.location || 'HIVE Space' }))] }, event.id))), upcomingEvents.length > 3 && (_jsxs("div", { className: "text-blue-400", children: ["+", upcomingEvents.length - 3, " more events"] }))] })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-[var(--hive-border-default)]", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "flex items-center gap-1 text-xs", children: [_jsx("span", { children: "\uD83D\uDD17" }), connections.map((conn, index) => (_jsxs("div", { className: "flex items-center gap-1", children: [getConnectionStatusIcon(conn), _jsx("span", { className: "text-gray-400", children: conn.name }), index < connections.length - 1 && _jsx("span", { className: "text-gray-600", children: "\u2022" })] }, conn.id)))] }) }), hasConflicts && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-orange-400 cursor-pointer", onClick: (e) => {
                                e.stopPropagation();
                                setShowConflictDetails(!showConflictDetails);
                            }, children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), _jsxs("span", { children: [conflicts.length, " scheduling conflict", conflicts.length > 1 ? 's' : ''] })] }))] }), _jsx(AnimatePresence, { children: showConflictDetails && hasConflicts && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "bg-orange-500/10 border border-orange-500/30 rounded-lg p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "font-medium text-orange-300 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Scheduling Conflict Detected"] }), conflicts[0] && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "text-gray-300 font-medium mb-2", children: "Overlapping Events:" }), conflicts[0].events.map((event, index) => (_jsxs("div", { className: "flex items-center gap-2 text-gray-300", children: [_jsx("span", { children: getEventTypeEmoji(event.type) }), _jsx("span", { children: event.title }), _jsxs("span", { className: "text-gray-400", children: [event.time, " \u2022 ", event.location] })] }, event.id)))] }), conflicts[0].suggestion && (_jsxs("div", { className: "text-sm text-gray-400", children: [_jsx("p", { className: "font-medium text-gray-300", children: "Suggestion:" }), _jsx("p", { children: conflicts[0].suggestion })] })), _jsxs("div", { className: "flex gap-2 mt-3", children: [_jsx(HiveButton, { size: "sm", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onResolveConflict?.(conflicts[0].id);
                                                    }, children: "Resolve Conflict" }), _jsx(HiveButton, { variant: "ghost", size: "sm", onClick: (e) => {
                                                        e.stopPropagation();
                                                        setShowConflictDetails(false);
                                                    }, children: "Ignore for Now" })] })] }))] }) })) }), _jsx("div", { className: "pt-2 border-t border-[var(--hive-border-default)]/50", children: _jsxs("div", { className: "flex items-center justify-center text-xs text-gray-400", children: [_jsx("span", { children: variant === 'mobile' ? 'Tap to open calendar' : 'Click anywhere to open full calendar' }), _jsx(ChevronRight, { className: "h-3 w-3 ml-1" })] }) })] }) }));
};
export default CalendarCard;
//# sourceMappingURL=calendar-card.js.map