"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Calendar } from "../atoms/calendar";
import { Badge } from "../atoms/badge";
import { AvatarGroup } from "../atoms/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { ScrollArea } from "../atoms/scroll-area";
import { cn } from "../../lib/utils";
import { Clock, MapPin, Users } from "lucide-react";
/**
 * Events Calendar
 *
 * Campus-native calendar view with event preview and friend activity signals.
 * Built on shadcn Calendar with HIVE design system.
 *
 * Design Strategy:
 * - Calendar grid shows event indicators (dots for events, gold for user's RSVPs)
 * - Selected date shows event list in sidebar
 * - Campus context shown in event previews (friends going, cohort breakdown)
 * - Monochrome + gold aesthetic
 *
 * Differentiation from Generic Calendar:
 * - Shows "3 friends going" indicators on calendar dates
 * - Event previews include campus cohort context
 * - "You're going" events highlighted in gold
 * - Academic calendar integration (exam weeks, breaks)
 */
const EventsCalendar = React.forwardRef(({ className, events, selectedDate: controlledDate, onSelectDate, onEventClick, onRsvp, showOnlyUserEvents = false, ...props }, ref) => {
    const [internalDate, setInternalDate] = React.useState(new Date());
    const selectedDate = controlledDate ?? internalDate;
    const handleSelectDate = onSelectDate ?? setInternalDate;
    // Filter events by selected date
    const eventsOnSelectedDate = React.useMemo(() => {
        if (!selectedDate)
            return [];
        return events.filter((event) => {
            const eventDate = new Date(event.dateTime.start);
            return (eventDate.getFullYear() === selectedDate.getFullYear() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getDate() === selectedDate.getDate());
        });
    }, [events, selectedDate]);
    // Get events by date for calendar indicators
    const eventsByDate = React.useMemo(() => {
        const map = new Map();
        events.forEach((event) => {
            const dateKey = event.dateTime.start.toDateString();
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey).push(event);
        });
        return map;
    }, [events]);
    // Custom day renderer to show event indicators
    const renderDay = React.useCallback((day) => {
        const dateKey = day.toDateString();
        const dayEvents = eventsByDate.get(dateKey) || [];
        const userEvents = dayEvents.filter((e) => e.rsvp.status === "going");
        const friendsGoing = dayEvents.filter((e) => e.campusContext?.friendsGoing && e.campusContext.friendsGoing.length > 0);
        return (_jsxs("div", { className: "relative w-full h-full flex flex-col items-center justify-center", children: [_jsx("span", { children: day.getDate() }), dayEvents.length > 0 && (_jsxs("div", { className: "absolute bottom-1 flex gap-0.5", children: [userEvents.length > 0 && (_jsx("div", { className: "h-1 w-1 rounded-full bg-[#FFD700]" })), friendsGoing.length > 0 && userEvents.length === 0 && (_jsx("div", { className: "h-1 w-1 rounded-full bg-primary" })), dayEvents.length > 0 && userEvents.length === 0 && friendsGoing.length === 0 && (_jsx("div", { className: "h-1 w-1 rounded-full bg-muted-foreground/40" }))] }))] }));
    }, [eventsByDate]);
    return (_jsxs("div", { ref: ref, className: cn("flex flex-col lg:flex-row gap-6", className), ...props, children: [_jsxs(Card, { className: "flex-1", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Campus Events" }) }), _jsxs(CardContent, { children: [_jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: handleSelectDate, className: "rounded-md", components: {
                                    DayButton: ({ day, ...props }) => (_jsx("button", { ...props, children: renderDay(day.date) })),
                                } }), _jsxs("div", { className: "mt-4 pt-4 border-t space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-[#FFD700]" }), _jsx("span", { children: "You're going" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-primary" }), _jsx("span", { children: "Friends going" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-muted-foreground/40" }), _jsx("span", { children: "Other events" })] })] })] })] }), _jsxs(Card, { className: "lg:w-96", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: selectedDate?.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                }) }), eventsOnSelectedDate.length > 0 && (_jsxs("p", { className: "text-sm text-muted-foreground", children: [eventsOnSelectedDate.length, " ", eventsOnSelectedDate.length === 1 ? "event" : "events"] }))] }), _jsx(CardContent, { children: eventsOnSelectedDate.length === 0 ? (_jsx("div", { className: "text-center py-8 text-sm text-muted-foreground", children: "No events on this day" })) : (_jsx(ScrollArea, { className: "h-[400px] pr-4", children: _jsx("div", { className: "space-y-3", children: eventsOnSelectedDate.map((event) => (_jsx(CalendarEventPreview, { event: event, onClick: () => onEventClick?.(event.id), onRsvp: onRsvp }, event.id))) }) })) })] })] }));
});
EventsCalendar.displayName = "EventsCalendar";
function CalendarEventPreview({ event, onClick, onRsvp }) {
    return (_jsxs("div", { className: cn("p-3 rounded-md border transition-all duration-fast hover:border-primary hover:shadow-hive-sm cursor-pointer", event.rsvp.status === "going" && "border-[#FFD700] bg-[#FFD700]/5"), onClick: onClick, children: [_jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-semibold text-foreground line-clamp-1", children: event.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: event.space.name })] }), event.category && (_jsx(Badge, { variant: "outline", className: "text-[9px] h-5 shrink-0", children: event.category }))] }), _jsxs("div", { className: "space-y-1 mb-2", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: event.dateTime.display })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { className: "truncate", children: event.location.name })] })] }), event.campusContext?.friendsGoing && event.campusContext.friendsGoing.length > 0 && (_jsxs("div", { className: "flex items-center gap-2 py-1.5 px-2 bg-primary/5 border border-primary/20 rounded text-xs mb-2", children: [_jsx(AvatarGroup, { size: "xs", max: 2, avatars: event.campusContext.friendsGoing.map(f => ({ src: f.avatar, alt: f.name })) }), _jsx("span", { className: "font-medium text-foreground", children: event.campusContext.friendsGoing.length === 1
                            ? event.campusContext.friendsGoing[0].name
                            : `${event.campusContext.friendsGoing[0].name} +${event.campusContext.friendsGoing.length - 1}` }), _jsx("span", { className: "text-muted-foreground", children: "going" })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: [event.attendees.count, " going"] })] }), event.rsvp.status === "going" && (_jsx(Badge, { variant: "default", className: "h-5 text-[9px] bg-[#FFD700] text-black border-none", children: "You're going \u2713" })), event.rsvp.status === "interested" && (_jsx(Badge, { variant: "secondary", className: "h-5 text-[9px]", children: "Interested" }))] })] }));
}
export { EventsCalendar };
//# sourceMappingURL=events-calendar.js.map