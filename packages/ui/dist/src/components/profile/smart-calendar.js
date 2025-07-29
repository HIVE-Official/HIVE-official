'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { HiveBadge } from '../hive-badge.js';
import { Calendar, Clock, MapPin, Users, Plus, AlertCircle, Loader2, BookOpen, Coffee, Award } from 'lucide-react';
export const SmartCalendar = ({ events, isLoading = false, error, onEventClick, onAddEvent }) => {
    if (isLoading) {
        return (_jsx(HiveCard, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-4", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" }) }) }));
    }
    if (error) {
        return (_jsx(HiveCard, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-4 text-center", children: _jsxs("div", { children: [_jsx(AlertCircle, { className: "h-8 w-8 text-red-400 mx-auto mb-2" }), _jsx("p", { className: "text-red-400 mb-2", children: "Failed to load events" }), _jsx("p", { className: "text-sm text-gray-400", children: error })] }) }) }));
    }
    const getEventIcon = (type) => {
        switch (type) {
            case 'class':
                return _jsx(BookOpen, { className: "h-4 w-4" });
            case 'social':
                return _jsx(Coffee, { className: "h-4 w-4" });
            case 'meeting':
                return _jsx(Users, { className: "h-4 w-4" });
            case 'milestone':
                return _jsx(Award, { className: "h-4 w-4" });
            default:
                return _jsx(Calendar, { className: "h-4 w-4" });
        }
    };
    const getEventColor = (type) => {
        switch (type) {
            case 'class':
                return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
            case 'social':
                return 'from-green-500/20 to-green-600/20 border-green-500/30';
            case 'meeting':
                return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
            case 'milestone':
                return 'from-hive-gold/20 to-yellow-400/20 border-hive-gold/30';
            default:
                return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
        }
    };
    return (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), "Smart Calendar"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onAddEvent, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Event"] })] }), events.length === 0 ? (_jsxs("div", { className: "text-center py-4", children: [_jsx(Calendar, { className: "h-12 w-12 text-gray-500 mx-auto mb-4" }), _jsx("p", { className: "text-gray-400 mb-4", children: "No upcoming events" }), _jsx(HiveButton, { onClick: onAddEvent, children: "Add Your First Event" })] })) : (_jsx("div", { className: "space-y-4", children: events.map((event) => (_jsx("div", { className: `bg-gradient-to-r ${getEventColor(event.type)} border rounded-lg p-4 hover:border-opacity-60 transition-all cursor-pointer`, onClick: () => onEventClick?.(event.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center", children: getEventIcon(event.type) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-1", children: event.title }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300 mb-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: event.time }), event.location && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: event.location })] }))] }), event.attendees.length > 0 && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300 mb-2", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: event.attendees.join(', ') })] })), event.overlap && event.overlap.count > 0 && (_jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(HiveBadge, { variant: "study-streak", className: "text-xs", children: "Social Discovery" }), _jsx("span", { className: "text-xs text-gray-300", children: event.overlap.message })] }))] })] }), _jsxs("div", { className: "flex flex-col items-end gap-2", children: [_jsx(HiveBadge, { variant: "freshman", className: "text-xs", children: event.type }), event.isRecurring && (_jsx("div", { className: "text-xs text-gray-400", children: "Recurring" }))] })] }) }, event.id))) })), _jsx("div", { className: "mt-6 pt-6 border-t border-hive-border-secondary", children: _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(HiveButton, { variant: "ghost", size: "sm", children: "View Full Calendar" }), _jsx(HiveButton, { variant: "ghost", size: "sm", children: "Sync Calendar" })] }) })] }));
};
export default SmartCalendar;
//# sourceMappingURL=smart-calendar.js.map