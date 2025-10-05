"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card.js";
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { cn } from "../../lib/utils.js";
import { Clock, MapPin, ChevronRight, Calendar as CalendarIcon, Plus, Upload } from "lucide-react";
/**
 * Profile Schedule Widget
 *
 * Prominent display of today's classes and events on profile.
 * Key feature: Students can import their class schedule.
 *
 * Design Strategy:
 * - Shows today's schedule at a glance
 * - Upcoming events highlighted
 * - Quick RSVP for events
 * - Import schedule CTA if empty
 * - Timeline view with current time indicator
 *
 * Differentiation:
 * - Class import integration (from university registrar)
 * - Combined classes + social events
 * - "Happening now" indicator
 * - Quick actions (RSVP, navigate)
 */
const ProfileScheduleWidget = React.forwardRef(({ className, events, showOnlyUpcoming = false, onEventClick, onRsvp, onViewFullCalendar, onImportClasses, date = new Date(), ...props }, ref) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    // Filter upcoming events if requested
    const displayEvents = React.useMemo(() => {
        if (!showOnlyUpcoming)
            return events;
        return events.filter(event => {
            const [hourStr, minuteStr] = event.startTime.split(':');
            const hour = parseInt(hourStr);
            const minute = parseInt(minuteStr.split(' ')[0]);
            const isPM = event.startTime.includes('PM');
            const eventHour = isPM && hour !== 12 ? hour + 12 : hour;
            const eventTime = eventHour * 60 + minute;
            const currentTime = currentHour * 60 + currentMinute;
            return eventTime >= currentTime;
        });
    }, [events, showOnlyUpcoming, currentHour, currentMinute]);
    // Check if an event is happening now
    const isHappeningNow = (event) => {
        const parseTime = (timeStr) => {
            const [hourStr, minuteStr] = timeStr.split(':');
            const hour = parseInt(hourStr);
            const minute = parseInt(minuteStr.split(' ')[0]);
            const isPM = timeStr.includes('PM');
            return (isPM && hour !== 12 ? hour + 12 : hour) * 60 + minute;
        };
        const startTime = parseTime(event.startTime);
        const endTime = parseTime(event.endTime);
        const currentTime = currentHour * 60 + currentMinute;
        return currentTime >= startTime && currentTime <= endTime;
    };
    if (displayEvents.length === 0) {
        return (_jsxs(Card, { ref: ref, className: cn("", className), ...props, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "h-5 w-5" }), "Today's Schedule"] }), onViewFullCalendar && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewFullCalendar, children: [_jsx(CalendarIcon, { className: "h-4 w-4 mr-2" }), "Full Calendar"] }))] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: _jsx(CalendarIcon, { className: "h-8 w-8 text-muted-foreground" }) }), _jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No events today" }), _jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Import your class schedule to see it here" }), onImportClasses && (_jsxs("div", { className: "flex gap-2 justify-center", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: onImportClasses, children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Import Classes"] }), onViewFullCalendar && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onViewFullCalendar, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Event"] }))] }))] }) })] }));
    }
    return (_jsxs(Card, { ref: ref, className: cn("", className), ...props, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "h-5 w-5" }), "Today's Schedule", _jsxs(Badge, { variant: "sophomore", className: "ml-2", children: [displayEvents.length, " ", displayEvents.length === 1 ? 'event' : 'events'] })] }), onViewFullCalendar && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewFullCalendar, children: ["View All", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] }))] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-2", children: displayEvents.map((event, index) => {
                            const isNow = isHappeningNow(event);
                            return (_jsxs("div", { className: cn("p-3 rounded-lg border transition-all cursor-pointer", isNow && "border-primary bg-primary/5", !isNow && "hover:bg-accent/50"), onClick: () => onEventClick?.(event.id), children: [_jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-sm font-semibold text-foreground line-clamp-1", children: event.title }), isNow && (_jsx(Badge, { variant: "freshman", className: "h-5 text-[9px] bg-primary", children: "Happening now" }))] }), event.instructor && (_jsx("p", { className: "text-xs text-muted-foreground", children: event.instructor })), event.spaceName && !event.instructor && (_jsx("p", { className: "text-xs text-muted-foreground", children: event.spaceName }))] }), _jsx(Badge, { variant: "freshman", className: cn("text-[9px] h-5 shrink-0", event.type === "class" && "border-blue-500/50 text-blue-600", event.type === "event" && "border-green-500/50 text-green-600", event.type === "office-hours" && "border-purple-500/50 text-purple-600"), children: event.type === "class" ? "Class" : event.type === "event" ? "Event" : "Office Hours" })] }), _jsx("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: [event.startTime, " - ", event.endTime] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { className: "truncate", children: event.location })] })] }) }), event.type === "event" && onRsvp && (_jsx("div", { className: "flex gap-2 mt-2 pt-2 border-t", children: event.rsvpStatus === "going" ? (_jsx(Badge, { variant: "freshman", className: "text-[9px] h-5 bg-[#FFD700] text-black", children: "You're going \u2713" })) : (_jsx(Button, { variant: "outline", size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onRsvp(event.id);
                                            }, className: "h-7 text-xs", children: "RSVP" })) }))] }, event.id));
                        }) }), onImportClasses && displayEvents.length < 3 && (_jsx("div", { className: "mt-4 pt-4 border-t", children: _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", onClick: onImportClasses, children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Import Your Class Schedule"] }) }))] })] }));
});
ProfileScheduleWidget.displayName = "ProfileScheduleWidget";
export { ProfileScheduleWidget };
//# sourceMappingURL=profile-schedule-widget.js.map