"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { cn } from "../../lib/utils";
const SpaceEventsPanel = React.forwardRef(({ className, events = [], onCreateEvent, onEventClick, onRSVP, canCreateEvents = false, showPastEvents = false, emptyStateMessage = "No upcoming events", ...props }, ref) => {
    // Filter events based on status
    const upcomingEvents = React.useMemo(() => {
        const now = new Date();
        return events
            .filter((e) => {
            if (e.status === "cancelled")
                return false;
            if (!showPastEvents && e.status === "completed")
                return false;
            if (!showPastEvents && e.endDate < now)
                return false;
            return true;
        })
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }, [events, showPastEvents]);
    // Format date range
    const formatDateRange = (start, end, isAllDay) => {
        const sameDay = start.toDateString() === end.toDateString();
        if (isAllDay) {
            if (sameDay) {
                return new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                }).format(start);
            }
            return `${new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
            }).format(start)} - ${new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
            }).format(end)}`;
        }
        if (sameDay) {
            const dateStr = new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
            }).format(start);
            const timeStr = new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
            }).format(start);
            return `${dateStr} at ${timeStr}`;
        }
        return `${new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(start)} - ${new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(end)}`;
    };
    return (_jsxs(Card, { ref: ref, className: cn("transition-all duration-[400ms]", className), ...props, children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-base", children: "Upcoming Events" }), canCreateEvents && onCreateEvent && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onCreateEvent, className: "h-8 px-2 transition-all duration-[400ms]", children: [_jsx("svg", { className: "h-3.5 w-3.5 mr-1", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }), _jsx("span", { className: "text-xs", children: "New Event" })] }))] }) }), _jsx(CardContent, { className: "space-y-3", children: upcomingEvents.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center", children: [_jsx("svg", { className: "h-12 w-12 text-white/30 mb-3", fill: "none", strokeWidth: "1.5", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" }) }), _jsx("p", { className: "text-sm text-white/70", children: emptyStateMessage }), canCreateEvents && onCreateEvent && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onCreateEvent, className: "mt-3 transition-all duration-[400ms]", children: [_jsx("svg", { className: "h-4 w-4 mr-1.5", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) }), "Create First Event"] }))] })) : (_jsx("div", { className: "space-y-3", children: upcomingEvents.map((event) => (_jsxs("div", { onClick: () => onEventClick?.(event), className: cn("group relative rounded-lg border border-white/8 bg-[#0c0c0c] p-3 transition-all duration-[400ms]", onEventClick && "cursor-pointer hover:border-white/20 hover:bg-white/10"), children: [event.type && (_jsx(Badge, { variant: "secondary", className: "absolute right-3 top-3 text-xs capitalize", children: event.type })), _jsx("h4", { className: "text-sm font-semibold text-white pr-20", children: event.title }), _jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-white/70", children: [_jsx("svg", { className: "h-3.5 w-3.5 shrink-0", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" }) }), _jsx("span", { children: formatDateRange(event.startDate, event.endDate, event.isAllDay) })] }), event.location && (_jsxs("div", { className: "mt-1.5 flex items-center gap-1.5 text-xs text-white/70", children: [_jsxs("svg", { className: "h-3.5 w-3.5 shrink-0", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })] }), _jsx("span", { className: "truncate", children: event.location })] })), event.description && (_jsx("p", { className: "mt-2 text-xs text-white/70 line-clamp-2", children: event.description })), _jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/8", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-white/70", children: [_jsx("svg", { className: "h-3.5 w-3.5", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }), _jsxs("span", { children: [event.rsvpCount ?? 0, " ", event.rsvpCount === 1 ? "person" : "people", " going"] })] }), onRSVP && (_jsx(Button, { variant: event.isAttending ? "default" : "outline", size: "sm", onClick: (e) => {
                                            e.stopPropagation();
                                            onRSVP(event.id, !event.isAttending);
                                        }, className: "h-7 px-3 text-xs transition-all duration-[400ms]", children: event.isAttending ? "Going" : "RSVP" }))] })] }, event.id))) })) })] }));
});
SpaceEventsPanel.displayName = "SpaceEventsPanel";
export { SpaceEventsPanel };
//# sourceMappingURL=space-events-panel.js.map