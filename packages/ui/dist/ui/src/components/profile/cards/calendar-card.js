'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { motion } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, CheckCircle, XCircle, Circle, BookOpen, Coffee, Presentation, MoreHorizontal } from 'lucide-react';
// Event Type Configuration
const eventTypeConfig = {
    academic: {
        icon: BookOpen,
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        label: 'Academic'
    },
    space: {
        icon: Users,
        color: 'bg-purple-500',
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-50',
        label: 'Space Event'
    },
    social: {
        icon: Coffee,
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        label: 'Social'
    },
    study: {
        icon: Presentation,
        color: 'bg-orange-500',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-50',
        label: 'Study Session'
    },
    ritual: {
        icon: Circle,
        color: 'bg-pink-500',
        textColor: 'text-pink-700',
        bgColor: 'bg-pink-50',
        label: 'Ritual'
    },
    personal: {
        icon: Calendar,
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50',
        label: 'Personal'
    }
};
// RSVP Status Configuration
const rsvpStatusConfig = {
    going: { icon: CheckCircle, color: 'text-green-600', label: 'Going' },
    maybe: { icon: Circle, color: 'text-yellow-600', label: 'Maybe' },
    'not-going': { icon: XCircle, color: 'text-red-600', label: 'Not Going' },
    pending: { icon: Clock, color: 'text-gray-600', label: 'Pending' }
};
// Time formatting utilities
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function formatDate(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    }
    else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    }
}
function getTimeUntilEvent(date) {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 0)
        return 'Started';
    if (diffMins < 60)
        return `in ${diffMins}m`;
    if (diffHours < 24)
        return `in ${diffHours}h`;
    return `in ${diffDays}d`;
}
// Event Quick Actions Component
function EventQuickActions({ event, onRSVP }) {
    if (!event.isRSVPRequired)
        return null;
    return (_jsx("div", { className: "flex gap-1 mt-2", children: ['going', 'maybe', 'not-going'].map((status) => {
            const config = rsvpStatusConfig[status];
            const Icon = config.icon;
            const isSelected = event.userRSVPStatus === status;
            return (_jsxs(Button, { size: "sm", variant: isSelected ? "default" : "outline", className: cn("h-6 px-2 text-xs", isSelected && "pointer-events-none", !isSelected && "hover:scale-105"), onClick: () => onRSVP?.(status), children: [_jsx(Icon, { className: "w-3 h-3 mr-1" }), config.label] }, status));
        }) }));
}
// Event Item Component
function EventItem({ event, onRSVP, isCompact = false }) {
    const config = eventTypeConfig[event.type];
    const Icon = config.icon;
    const timeUntil = getTimeUntilEvent(event.startTime);
    const handleRSVP = useCallback((status) => {
        onRSVP?.(event.id, status);
    }, [event.id, onRSVP]);
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: cn('group relative p-3 rounded-lg border transition-all hover:shadow-md', config.bgColor, event.isConflicting && 'ring-2 ring-red-200', event.priority === 'high' && 'ring-1 ring-orange-300'), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 min-w-0 flex-1", children: [_jsx("div", { className: cn('w-2 h-2 rounded-full mt-2', config.color) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h4", { className: cn('font-medium truncate', config.textColor, isCompact ? 'text-sm' : 'text-base'), children: event.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-muted)]", children: [_jsx(Clock, { className: "w-3 h-3" }), formatTime(event.startTime), event.endTime && ` - ${formatTime(event.endTime)}`] }), timeUntil !== 'Started' && (_jsx(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5", children: timeUntil }))] }), event.location && !isCompact && (_jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-[var(--hive-text-muted)]", children: [_jsx(MapPin, { className: "w-3 h-3" }), event.location] })), event.spaceName && (_jsx("div", { className: "flex items-center gap-1 mt-1", children: _jsxs(Badge, { variant: "outline", className: "text-xs", children: [_jsx(Users, { className: "w-3 h-3 mr-1" }), event.spaceName] }) }))] })] }), event.priority === 'high' && (_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full" }))] }), event.isRSVPRequired && !isCompact && (_jsx(EventQuickActions, { event: event, onRSVP: handleRSVP })), event.attendees && event.attendees.length > 0 && !isCompact && (_jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("div", { className: "flex -space-x-1", children: event.attendees.slice(0, 3).map((attendee) => (_jsxs(Avatar, { className: "w-6 h-6 border-2 border-white", children: [_jsx(AvatarImage, { src: attendee.avatar }), _jsx(AvatarFallback, { className: "text-xs", children: attendee.name.split(' ').map(n => n[0]).join('') })] }, attendee.id))) }), event.attendees.length > 3 && (_jsxs("span", { className: "text-xs text-[var(--hive-text-muted)]", children: ["+", event.attendees.length - 3, " more"] }))] })), _jsx("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }) })] }));
}
// Calendar Mini View Component
function CalendarMiniView({ events, selectedDate, onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        const days = [];
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dayEvents = events.filter(event => event.startTime.toDateString() === date.toDateString());
            days.push({
                date,
                isCurrentMonth: date.getMonth() === month,
                isToday: date.toDateString() === new Date().toDateString(),
                isSelected: date.toDateString() === selectedDate.toDateString(),
                events: dayEvents,
                hasEvents: dayEvents.length > 0
            });
        }
        return days;
    }, [currentMonth, events, selectedDate]);
    const navigateMonth = useCallback((direction) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    }, []);
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: () => navigateMonth('prev'), children: _jsx(ChevronLeft, { className: "w-3 h-3" }) }), _jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: () => navigateMonth('next'), children: _jsx(ChevronRight, { className: "w-3 h-3" }) })] })] }), _jsxs("div", { className: "grid grid-cols-7 gap-1 text-xs", children: [['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (_jsx("div", { className: "text-center font-medium text-[var(--hive-text-muted)] py-1", children: day }, day))), daysInMonth.map((day, index) => (_jsxs("button", { className: cn('aspect-square flex items-center justify-center rounded text-xs relative transition-colors', day.isCurrentMonth
                            ? 'text-[var(--hive-text-primary)]'
                            : 'text-[var(--hive-text-muted)]', day.isToday && 'bg-[var(--hive-brand-primary)] text-white font-medium', day.isSelected && !day.isToday && 'bg-[var(--hive-background-secondary)] ring-1 ring-[var(--hive-brand-primary)]', 'hover:bg-[var(--hive-background-secondary)]'), onClick: () => onDateSelect(day.date), children: [day.date.getDate(), day.hasEvents && !day.isToday && (_jsx("div", { className: "absolute bottom-0.5 right-0.5 w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" }))] }, index)))] })] }));
}
// Main Calendar Card Component
export function CalendarCard({ events, isEditMode, onEventCreate, onEventUpdate, onRSVP, onSettingsClick, className }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('today');
    const [showAllEvents, setShowAllEvents] = useState(false);
    // Filter events based on current view
    const filteredEvents = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        switch (viewMode) {
            case 'today':
                return events.filter(event => {
                    const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
                    return eventDate.getTime() === today.getTime();
                });
        }
        sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    });
    'upcoming';
    return events.filter(event => event.startTime >= now)
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .slice(0, showAllEvents ? undefined : 5);
    'calendar';
    return events.filter(event => {
        const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
        return eventDate.getTime() === selectedDay.getTime();
    });
}
sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
return [];
[events, viewMode, selectedDate, showAllEvents];
;
const todayEventsCount = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return events.filter(event => {
        const eventDate = new Date(event.startTime.getFullYear(), event.startTime.getMonth(), event.startTime.getDate());
        return eventDate.getTime() === todayStart.getTime();
    });
}, length);
[events];
;
const nextEvent = useMemo(() => {
    const now = new Date();
    return events
        .filter(event => event.startTime > now)
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())[0];
}, [events]);
return (_jsxs(Card, { className: cn('h-full overflow-hidden', className), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Calendar" }), todayEventsCount > 0 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [todayEventsCount, " today"] }))] }), !isEditMode && (_jsx("div", { className: "flex gap-1", children: _jsx(Button, { size: "sm", variant: "ghost", className: "h-8 w-8 p-0", onClick: onSettingsClick, children: _jsx(Settings, { className: "w-4 h-4" }) }) }))] }), _jsxs("div", { className: "flex gap-1 mt-2", children: [[
                            { key: 'today', label: 'Today', count: todayEventsCount },
                            { key: 'upcoming', label: 'Upcoming' },
                            { key: 'calendar', label: 'Calendar' }
                        ].map(({ key, label, count })), " => (", _jsxs(Button, { size: "sm", variant: viewMode === key ? "default" : "ghost", className: "h-7 px-3 text-xs", onClick: () => setViewMode(key), children: [label, count !== undefined && count > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 h-4 px-1 text-xs", children: count }))] }, key), "))}"] })] }), _jsxs(CardContent, { className: "space-y-4", children: [viewMode === 'today' && nextEvent && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "p-3 bg-[var(--hive-background-tertiary)] rounded-lg border", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-4 h-4 text-[var(--hive-brand-primary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Next Up" })] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: [nextEvent.title, " \u2022 ", getTimeUntilEvent(nextEvent.startTime)] })] })), viewMode === 'calendar' && (_jsx(CalendarMiniView, { events: events, selectedDate: selectedDate, onDateSelect: setSelectedDate })), _jsxs("div", { className: "space-y-3", children: [viewMode !== 'calendar' && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: viewMode === 'today' ? `Today, ${formatDate(new Date())}` : 'Upcoming Events' }), viewMode === 'upcoming' && !showAllEvents && filteredEvents.length === 5 && (_jsxs(Button, { size: "sm", variant: "ghost", className: "h-6 px-2 text-xs", onClick: () => setShowAllEvents(true), children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), "View All"] }))] })), _jsx(ScrollArea, { className: "max-h-80", children: _jsx("div", { className: "space-y-2", children: _jsx(AnimatePresence, { children: filteredEvents.length > 0 ? (filteredEvents.map((event) => (_jsx(EventItem, { event: event, onRSVP: onRSVP, isCompact: viewMode === 'upcoming' }, event.id)))) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-8 text-[var(--hive-text-muted)]", children: [_jsx(Calendar, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }), _jsx("p", { className: "text-sm", children: viewMode === 'today'
                                                    ? 'No events today'
                                                    : viewMode === 'calendar'
                                                        ? `No events on ${formatDate(selectedDate)}`
                                                        : 'No upcoming events' })] })) }) }) })] }), !isEditMode && (_jsxs(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => onEventCreate?.({
                        type: 'personal',
                        startTime: new Date(),
                        endTime: new Date(Date.now() + 60 * 60 * 1000),
                        isRSVPRequired: false,
                        source: 'manual',
                        priority: 'medium'
                    }), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Event"] }))] })] }));
// Default props for development
export const mockCalendarEvents = [
    {
        id: 'event-1',
        title: 'Data Structures Study Group',
        description: 'Final exam prep session for CSE250',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        location: 'Davis Hall 101',
        type: 'study',
        source: 'space',
        attendees: [
            { id: 'user-2', name: 'Alex Kim', status: 'going' },
            { id: 'user-3', name: 'Maria Lopez', status: 'going' },
            { id: 'user-4', name: 'David Chen', status: 'maybe' }
        ],
        isRSVPRequired: true,
        userRSVPStatus: 'going',
        spaceId: 'space-cs250',
        spaceName: 'CS 250 Study Group',
        priority: 'high'
    },
    {
        id: 'event-2',
        title: 'UB Hackathon 2024',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        location: 'Student Union',
        type: 'academic',
        source: 'ub',
        isRSVPRequired: true,
        userRSVPStatus: 'pending',
        priority: 'high'
    },
    {
        id: 'event-3',
        title: 'Coffee & Code',
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        location: 'Starbucks (North Campus)',
        type: 'social',
        source: 'manual',
        isRSVPRequired: false,
        priority: 'low'
    },
    {
        id: 'event-4',
        title: 'Morning Meditation',
        startTime: new Date(),
        startTime: new Date(new Date().setHours(7, 0, 0, 0)),
        endTime: new Date(new Date().setHours(7, 30, 0, 0)),
        type: 'ritual',
        source: 'manual',
        isRSVPRequired: false,
        priority: 'medium'
    }
];
//# sourceMappingURL=calendar-card.js.map