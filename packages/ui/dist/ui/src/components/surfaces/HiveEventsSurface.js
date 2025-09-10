"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { HiveBadge } from '../hive-badge.js';
import { Clock, Users, Plus, ChevronRight, Video, Globe, Building, CalendarDays, UserCheck, Edit, Trash2, Share2 } from 'lucide-react';
import { format, isPast, isToday, isTomorrow, addDays, startOfWeek } from 'date-fns';
import { useRealtimeEvents, useOptimisticUpdates } from '../../hooks/use-live-updates.js';
// Event Card Component
const EventCard = ({ event, isLeader, currentUserId, variant = 'widget', onEdit, onDelete, onRSVP, onShare }) => {
    const [showActions, setShowActions] = useState(false);
    const LocationIcon = event.location?.type === 'virtual' ? Video :
        event.location?.type === 'hybrid' ? Globe : Building;
    const eventStatus = useMemo(() => {
        if (isPast(event.endTime))
            return 'past';
        if (isPast(event.startTime) && !isPast(event.endTime))
            return 'ongoing';
        if (isToday(event.startTime))
            return 'today';
        if (isTomorrow(event.startTime))
            return 'tomorrow';
        return 'upcoming';
    }, [event.startTime, event.endTime]);
    const statusColors = {
        past: 'bg-gray-100 text-gray-600',
        ongoing: 'bg-green-100 text-green-700 animate-pulse',
        today: 'bg-orange-100 text-orange-700',
        tomorrow: 'bg-blue-100 text-blue-700',
        upcoming: 'bg-purple-100 text-purple-700'
    };
    const rsvpColors = {
        going: 'bg-green-500 text-[var(--hive-text-primary)]',
        maybe: 'bg-[var(--hive-gold)] text-[var(--hive-text-primary)]',
        not_going: 'bg-gray-400 text-[var(--hive-text-primary)]'
    };
    return (_jsx(HiveCard, { className: cn("hover:shadow-md transition-all", variant === 'compact' && "p-3", eventStatus === 'past' && "opacity-60"), children: _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: cn("flex flex-col items-center justify-center rounded-lg p-3 min-w-[60px]", statusColors[eventStatus]), children: [_jsx("span", { className: "text-2xl font-bold", children: format(event.startTime, 'd') }), _jsx("span", { className: "text-xs uppercase", children: format(event.startTime, 'MMM') })] }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 line-clamp-1", children: event.title }), _jsxs("div", { className: "flex items-center gap-3 mt-1 text-sm text-gray-600", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), format(event.startTime, 'h:mm a')] }), event.location && (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(LocationIcon, { className: "h-3 w-3" }), event.location.name] }))] })] }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowActions(!showActions), className: "p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100", children: _jsx(ChevronRight, { className: "h-4 w-4" }) }), showActions && (_jsxs("div", { className: "absolute right-0 top-6 w-48 bg-[var(--hive-white)] rounded-lg shadow-lg border border-gray-200 py-1 z-10", children: [eventStatus !== 'past' && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                                onRSVP?.('going');
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(UserCheck, { className: "h-4 w-4 text-green-600" }), "I'm going"] }), _jsxs("button", { onClick: () => {
                                                                onRSVP?.('maybe');
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(UserCheck, { className: "h-4 w-4 text-yellow-600" }), "Maybe"] }), _jsxs("button", { onClick: () => {
                                                                onRSVP?.('not_going');
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(UserCheck, { className: "h-4 w-4 text-gray-600" }), "Can't go"] }), _jsx("div", { className: "border-t border-gray-100 my-1" })] })), _jsxs("button", { onClick: () => {
                                                        onShare?.();
                                                        setShowActions(false);
                                                    }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Share2, { className: "h-4 w-4" }), "Share event"] }), isLeader && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-t border-gray-100 my-1" }), _jsxs("button", { onClick: () => {
                                                                onEdit?.();
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2", children: [_jsx(Edit, { className: "h-4 w-4" }), "Edit event"] }), _jsxs("button", { onClick: () => {
                                                                onDelete?.();
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2", children: [_jsx(Trash2, { className: "h-4 w-4" }), "Delete event"] })] }))] }))] })] }), variant !== 'compact' && event.description && (_jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: event.description })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsxs("span", { className: "flex items-center gap-1 text-gray-600", children: [_jsx(Users, { className: "h-3 w-3" }), event.attendees.going, " going"] }), event.attendees.maybe > 0 && (_jsxs("span", { className: "text-gray-500", children: [event.attendees.maybe, " maybe"] }))] }), event.rsvpStatus && (_jsx(HiveBadge, { variant: "secondary", className: cn("text-xs", rsvpColors[event.rsvpStatus]), children: event.rsvpStatus === 'not_going' ? "Can't go" : event.rsvpStatus }))] }), event.tags && event.tags.length > 0 && variant === 'full' && (_jsx("div", { className: "flex flex-wrap gap-1", children: event.tags.map((tag) => (_jsx("span", { className: "text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded", children: tag }, tag))) }))] })] }) }));
};
// Calendar View Component
const CalendarView = ({ events, onDateSelect }) => {
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
    const weekDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(addDays(currentWeek, i));
        }
        return days;
    }, [currentWeek]);
    const getEventsForDay = (date) => {
        return events.filter(event => format(event.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    };
    return (_jsx("div", { className: "bg-[var(--hive-white)] rounded-lg border border-gray-200 p-4", children: _jsx("div", { className: "grid grid-cols-7 gap-2", children: weekDays.map((day) => {
                const dayEvents = getEventsForDay(day);
                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                return (_jsxs("button", { onClick: () => onDateSelect?.(day), className: cn("p-2 rounded-lg text-center hover:bg-gray-50 transition-colors", isToday && "bg-orange-50 border border-orange-200"), children: [_jsx("div", { className: "text-xs text-gray-500", children: format(day, 'EEE') }), _jsx("div", { className: cn("text-lg font-medium", isToday ? "text-[var(--hive-gold-dark)]" : "text-gray-900"), children: format(day, 'd') }), dayEvents.length > 0 && (_jsx("div", { className: "flex justify-center gap-1 mt-1", children: dayEvents.slice(0, 3).map((_, idx) => (_jsx("div", { className: "w-1 h-1 bg-[var(--hive-gold)] rounded-full" }, idx))) }))] }, day.toString()));
            }) }) }));
};
// Main Surface Component
export const HiveEventsSurface = ({ spaceId, spaceName, isLeader = false, currentUserId, className, variant = 'widget', events: propEvents, loading = false, error = null, onCreateEvent, onEditEvent, onDeleteEvent, onRSVP, }) => {
    const [view, setView] = useState('list');
    const [filter, setFilter] = useState('upcoming');
    // Real-time events data
    const { data: realtimeEvents, loading: realtimeLoading, error: realtimeError } = useRealtimeEvents(spaceId);
    const { data: optimisticEvents, addOptimisticItem, removeOptimisticItem } = useOptimisticUpdates((propEvents || realtimeEvents || []));
    // No mock data - use real events only
    const emptyEvents = [];
    /* Removed mock data
    const mockEvents: SpaceEvent[] = useMemo(() => [
      {
        id: '1',
        title: 'Weekly Team Sync',
        description: 'Regular team sync to discuss progress and blockers. Everyone is welcome to join and share updates.',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 3),
        location: {
          type: 'hybrid',
          name: 'Room 301 + Zoom',
          address: 'Engineering Building',
          url: 'https://zoom.us/j/123456'
        },
        organizer: {
          id: '1',
          name: 'Sarah Chen'
        },
        attendees: {
          going: 12,
          maybe: 3,
          invited: 20
        },
        rsvpStatus: 'going',
        tags: ['meeting', 'weekly'],
        isRecurring: true,
        recurringPattern: 'Every Thursday',
        spaceId: spaceId,
        visibility: 'members'
      },
      {
        id: '2',
        title: 'Design Workshop',
        description: 'Hands-on workshop covering UI/UX best practices and design thinking methodology.',
        startTime: addDays(new Date(), 1),
        endTime: addDays(new Date(), 1),
        location: {
          type: 'physical',
          name: 'Design Lab',
          address: 'Art Building, Room 205'
        },
        organizer: {
          id: '3',
          name: 'Emily Rodriguez'
        },
        attendees: {
          going: 8,
          maybe: 5,
          invited: 15
        },
        rsvpStatus: 'maybe',
        tags: ['workshop', 'design'],
        spaceId: spaceId,
        visibility: 'public'
      },
      {
        id: '3',
        title: 'Hackathon Planning Session',
        description: 'Planning session for the upcoming campus hackathon. Looking for volunteers!',
        startTime: addDays(new Date(), 3),
        endTime: addDays(new Date(), 3),
        location: {
          type: 'virtual',
          name: 'Discord',
          url: 'https://discord.gg/hive'
        },
        organizer: {
          id: '2',
          name: 'Marcus Johnson'
        },
        attendees: {
          going: 15,
          maybe: 7,
          invited: 30
        },
        tags: ['hackathon', 'planning'],
        spaceId: spaceId,
        visibility: 'members'
      }
    ], [spaceId]);
    */
    // Use optimistic events for immediate UI updates
    const events = optimisticEvents || emptyEvents;
    const isLoading = loading || realtimeLoading;
    const displayError = error || realtimeError;
    // Filter events
    const filteredEvents = useMemo(() => {
        let filtered = [...events];
        switch (filter) {
            case 'upcoming':
                filtered = filtered.filter(e => !isPast(e.endTime));
                break;
            case 'past':
                filtered = filtered.filter(e => isPast(e.endTime));
                break;
        }
        // Sort by start time
        filtered.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        return filtered;
    }, [events, filter]);
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-gray-200 rounded-lg h-20 mb-4" }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => (_jsx("div", { className: "bg-gray-100 rounded-lg h-32" }, i))) })] }) }));
    }
    if (displayError) {
        return (_jsx(HiveCard, { className: cn("p-6", className), children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-gray-600", children: "Unable to load events" }), _jsx("p", { className: "text-sm text-gray-500", children: displayError.message })] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: variant === 'full' && spaceName ? `${spaceName} Events` : 'Events' }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [filteredEvents.length, " ", filter === 'upcoming' ? 'upcoming' : filter, " events"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [variant === 'full' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex border border-gray-200 rounded-lg", children: [_jsx("button", { onClick: () => setView('list'), className: cn("px-3 py-1.5 text-sm", view === 'list' ? "bg-gray-100" : "hover:bg-gray-50"), children: "List" }), _jsx("button", { onClick: () => setView('calendar'), className: cn("px-3 py-1.5 text-sm", view === 'calendar' ? "bg-gray-100" : "hover:bg-gray-50"), children: "Calendar" })] }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]", children: [_jsx("option", { value: "all", children: "All Events" }), _jsx("option", { value: "upcoming", children: "Upcoming" }), _jsx("option", { value: "past", children: "Past" })] })] })), isLeader && (_jsxs(HiveButton, { variant: "primary", size: "sm", onClick: onCreateEvent, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), variant === 'widget' ? 'New' : 'Create Event'] }))] })] }), view === 'calendar' && variant === 'full' && (_jsx(CalendarView, { events: filteredEvents, onDateSelect: (date) => console.log('Selected date:', date) })), view === 'list' && (_jsx("div", { className: "space-y-3", children: filteredEvents.length === 0 ? (_jsx(HiveCard, { className: "p-8", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx(CalendarDays, { className: "h-12 w-12 text-gray-400 mx-auto" }), _jsx("p", { className: "text-gray-600", children: "No events scheduled" }), _jsx("p", { className: "text-sm text-gray-500", children: isLeader ? "Create an event to bring your community together" : "Check back later for upcoming events" })] }) })) : (filteredEvents
                    .slice(0, variant === 'widget' ? 3 : undefined)
                    .map((event) => (_jsx(EventCard, { event: event, isLeader: isLeader, currentUserId: currentUserId, variant: variant, onEdit: () => onEditEvent?.(event.id), onDelete: () => onDeleteEvent?.(event.id), onRSVP: (status) => onRSVP?.(event.id, status), onShare: () => console.log('Share event:', event.id) }, event.id)))) })), variant === 'widget' && filteredEvents.length > 3 && (_jsxs("button", { className: "w-full py-2 text-sm text-[var(--hive-gold-dark)] hover:text-orange-700 font-medium", children: ["View all ", filteredEvents.length, " events \u2192"] }))] }));
};
// Export display name for debugging
HiveEventsSurface.displayName = 'HiveEventsSurface';
//# sourceMappingURL=HiveEventsSurface.js.map