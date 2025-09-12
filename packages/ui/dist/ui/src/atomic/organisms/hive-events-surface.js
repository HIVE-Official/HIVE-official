'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Clock, MapPin, Users, CheckCircle2, XCircle, AlertCircle, Eye, Settings, TrendingUp, Activity, Filter } from 'lucide-react';
import { cn } from '../../lib/utils.js';
export const HiveEventsSurface = ({ space, events = [], maxEvents, canCreateEvents = false, canModerate = false, leaderMode, viewMode = 'list', onCreateEvent, onRSVPEvent, onEditEvent, onCancelEvent }) => {
    const [filter, setFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('upcoming');
    const filteredEvents = useMemo(() => {
        let filtered = events.filter(event => {
            const matchesType = filter === 'all' || event.type === filter;
            const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
            return matchesType && matchesStatus;
        });
        // Sort by start date
        filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        if (maxEvents) {
            filtered = filtered.slice(0, maxEvents);
        }
        return filtered;
    }, [events, filter, statusFilter, maxEvents]);
    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'meeting': return _jsx(Users, { className: "h-4 w-4" });
            case 'academic': return _jsx(Eye, { className: "h-4 w-4" });
            case 'social': return _jsx(Activity, { className: "h-4 w-4" });
            case 'service': return _jsx(CheckCircle2, { className: "h-4 w-4" });
            default: return _jsx(Calendar, { className: "h-4 w-4" });
        }
    };
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'meeting': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'academic': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'social': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'service': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };
    const getStatusBadge = (status, startDate) => {
        const isNow = Date.now() >= startDate.getTime() && Date.now() <= (startDate.getTime() + 3 * 60 * 60 * 1000);
        if (isNow && status === 'upcoming') {
            return (_jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full border bg-green-500/20 text-green-400 border-green-500/30", children: "Live Now" }));
        }
        switch (status) {
            case 'upcoming':
                return (_jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30", children: "Upcoming" }));
            case 'completed':
                return (_jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30", children: "Completed" }));
            case 'cancelled':
                return (_jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full border bg-red-500/20 text-red-400 border-red-500/30", children: "Cancelled" }));
            default:
                return null;
        }
    };
    const formatEventTime = (startDate, endDate) => {
        const start = startDate.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
        if (endDate) {
            const end = endDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });
            return `${start} - ${end}`;
        }
        return start;
    };
    const getTimeUntilEvent = (startDate) => {
        const diff = startDate.getTime() - Date.now();
        if (diff < 0)
            return null;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `in ${days}d`;
        if (hours > 0)
            return `in ${hours}h`;
        const minutes = Math.floor(diff / (1000 * 60));
        return `in ${minutes}m`;
    };
    const eventStats = useMemo(() => {
        return {
            total: events.length,
            upcoming: events.filter(e => e.status === 'upcoming').length,
            thisWeek: events.filter(e => e.startDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
                e.startDate.getTime() > Date.now()).length
        };
    }, [events]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-inverse)]", children: "Events" }), _jsxs("span", { className: "text-sm text-neutral-400", children: ["(", eventStats.upcoming, " upcoming)"] })] }), leaderMode === 'insights' && (_jsxs("div", { className: "flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-purple-400" }), _jsx("span", { className: "text-xs text-purple-400", children: "Analytics Active" })] }))] }), canCreateEvents && (_jsxs("button", { onClick: onCreateEvent, className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Create Event" })] }))] }), leaderMode === 'insights' && (_jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: eventStats.total }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total Events" })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: eventStats.upcoming }), _jsx("div", { className: "text-xs text-neutral-400", children: "Upcoming" })] }), _jsxs("div", { className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: eventStats.thisWeek }), _jsx("div", { className: "text-xs text-neutral-400", children: "This Week" })] })] })), events.length > 3 && (_jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: [_jsx(Filter, { className: "h-4 w-4 text-neutral-400 flex-shrink-0" }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Types" }), _jsx("option", { value: "meeting", children: "Meetings" }), _jsx("option", { value: "academic", children: "Academic" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "service", children: "Service" }), _jsx("option", { value: "other", children: "Other" })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "upcoming", children: "Upcoming" }), _jsx("option", { value: "ongoing", children: "Ongoing" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "cancelled", children: "Cancelled" })] })] })), _jsxs("div", { className: "space-y-3", children: [_jsx(AnimatePresence, { children: filteredEvents.map((event, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { delay: index * 0.05 }, className: cn("bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 hover:bg-white/[0.05] transition-colors", leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5", event.status === 'cancelled' && "opacity-75"), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-inverse)] truncate", children: event.title }), _jsxs("span", { className: cn("px-2 py-0.5 text-xs font-medium rounded-full border capitalize flex items-center gap-1", getEventTypeColor(event.type)), children: [getEventTypeIcon(event.type), event.type] }), getStatusBadge(event.status, event.startDate)] }), _jsx("p", { className: "text-sm text-neutral-300 mb-3 line-clamp-2", children: event.description }), _jsxs("div", { className: "space-y-1 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: formatEventTime(event.startDate, event.endDate) }), getTimeUntilEvent(event.startDate) && (_jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: getTimeUntilEvent(event.startDate) }))] }), event.location && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: event.location }), event.isVirtual && (_jsx("span", { className: "text-blue-400", children: "(Virtual)" }))] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: ["Organized by ", event.organizer.name] })] }), event.tags && event.tags.length > 0 && (_jsx("div", { className: "flex items-center gap-1 mt-2", children: event.tags.map((tag, idx) => (_jsxs("span", { className: "px-2 py-0.5 bg-white/10 text-neutral-300 rounded-full text-xs", children: ["#", tag] }, idx))) }))] })] }), canModerate && (_jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsx("button", { onClick: () => onEditEvent?.(event.id), className: "p-2 hover:bg-white/10 rounded-lg transition-colors", title: "Edit event", children: _jsx(Settings, { className: "h-4 w-4 text-neutral-400" }) }), event.status === 'upcoming' && (_jsx("button", { onClick: () => onCancelEvent?.(event.id), className: "p-2 hover:bg-red-500/10 rounded-lg transition-colors", title: "Cancel event", children: _jsx(XCircle, { className: "h-4 w-4 text-red-400" }) }))] }))] }), event.requiresRSVP && event.status === 'upcoming' && (_jsxs("div", { className: "pt-3 border-t border-white/10", children: [_jsx("div", { className: "flex items-center justify-between mb-3", children: _jsxs("div", { className: "flex items-center gap-4 text-xs text-neutral-400", children: [_jsxs("span", { className: "text-green-400", children: [event.rsvps.filter(r => r.status === 'yes').length, " going"] }), _jsxs("span", { className: "text-yellow-400", children: [event.rsvps.filter(r => r.status === 'maybe').length, " maybe"] }), event.capacity && (_jsxs("span", { children: [event.capacity - event.rsvps.filter(r => r.status === 'yes').length, " spots left"] })), event.rsvpDeadline && (_jsxs("span", { className: "text-red-400", children: ["RSVP by ", event.rsvpDeadline.toLocaleDateString()] }))] }) }), _jsx("div", { className: "flex items-center gap-2", children: ['yes', 'maybe', 'no'].map((status) => (_jsxs("button", { onClick: () => onRSVPEvent?.(event.id, status), className: cn("px-3 py-1 text-xs rounded-full border transition-colors", status === 'yes' && "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20", status === 'maybe' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20", status === 'no' && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"), children: [status === 'yes' && _jsx(CheckCircle2, { className: "h-3 w-3 mr-1 inline" }), status === 'maybe' && _jsx(AlertCircle, { className: "h-3 w-3 mr-1 inline" }), status === 'no' && _jsx(XCircle, { className: "h-3 w-3 mr-1 inline" }), status === 'yes' ? 'Going' : status === 'maybe' ? 'Maybe' : 'Not Going'] }, status))) })] }))] }, event.id))) }), filteredEvents.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Calendar, { className: "h-12 w-12 mx-auto mb-3 text-neutral-400 opacity-50" }), _jsx("p", { className: "text-neutral-400", children: "No events found" }), _jsx("p", { className: "text-sm text-neutral-500 mt-1", children: canCreateEvents ? 'Create your first event!' : 'Check back soon for upcoming events' })] }))] }), maxEvents && events.length > maxEvents && (_jsx("div", { className: "text-center pt-4", children: _jsxs("button", { className: "text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors text-sm font-medium", children: ["View all ", events.length, " events"] }) }))] }));
};
export default HiveEventsSurface;
//# sourceMappingURL=hive-events-surface.js.map