"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Plus, Download, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../atoms/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog.js";
import { Badge } from "../atoms/badge.js";
import { Calendar } from "../atoms/calendar.js";
/**
 * Profile Calendar Modal
 *
 * Full-screen calendar for viewing schedule with:
 * - Month view with date indicators
 * - Event list for selected date
 * - Class import CTA
 * - Export calendar functionality
 * - RSVP quick actions
 *
 * Design Pattern: Modal-first IA
 * - Opens from ProfileScheduleWidget
 * - Shows full calendar context
 * - Quick actions without leaving modal
 */
const ProfileCalendarModal = React.forwardRef(({ isOpen, onClose, events, selectedDate: controlledDate, onDateSelect, onImportClasses, onAddEvent, onEventClick, onExport, }, ref) => {
    const [internalDate, setInternalDate] = React.useState(new Date());
    const isControlled = controlledDate !== undefined;
    const selectedDate = isControlled ? controlledDate : internalDate;
    const handleDateSelect = React.useCallback((date) => {
        if (!date)
            return;
        if (!isControlled) {
            setInternalDate(date);
        }
        onDateSelect?.(date);
    }, [isControlled, onDateSelect]);
    // Get events for selected date
    const eventsForSelectedDate = React.useMemo(() => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (eventDate.getFullYear() === selectedDate.getFullYear() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getDate() === selectedDate.getDate());
        }).sort((a, b) => {
            // Sort by start time
            return a.startTime.localeCompare(b.startTime);
        });
    }, [events, selectedDate]);
    // Get dates with events for calendar highlighting
    const datesWithEvents = React.useMemo(() => {
        return new Set(events.map(event => {
            const date = new Date(event.date);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }));
    }, [events]);
    const hasEventsOnDate = React.useCallback((date) => {
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return datesWithEvents.has(key);
    }, [datesWithEvents]);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsxs(DialogContent, { ref: ref, className: "max-w-6xl h-[90vh] p-0 overflow-hidden", children: [_jsx(DialogHeader, { className: "p-6 pb-4 border-b", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(DialogTitle, { className: "text-2xl font-bold flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "h-6 w-6" }), "My Calendar"] }), _jsxs("div", { className: "flex items-center gap-2", children: [onExport && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onExport, className: "gap-2", children: [_jsx(Download, { className: "h-4 w-4" }), "Export"] })), onImportClasses && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onImportClasses, className: "gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Import Classes"] })), onAddEvent && (_jsxs(Button, { size: "sm", onClick: onAddEvent, className: "gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Event"] }))] })] }) }), _jsxs("div", { className: "flex h-[calc(90vh-120px)]", children: [_jsx("div", { className: "flex-1 p-6 border-r overflow-auto", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: handleDateSelect, className: "rounded-lg border", modifiers: {
                                            hasEvents: (date) => hasEventsOnDate(date),
                                        }, modifiersClassNames: {
                                            hasEvents: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
                                        } }), _jsxs("div", { className: "mt-6 p-4 rounded-lg border bg-muted/50", children: [_jsx("h3", { className: "text-sm font-semibold mb-3", children: "This Month" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: events.filter(e => e.type === 'class').length }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Classes" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: events.filter(e => e.type === 'event').length }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Events" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: events.filter(e => e.type === 'office-hours').length }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Office Hrs" })] })] })] })] }) }), _jsxs("div", { className: "w-[400px] flex flex-col", children: [_jsxs("div", { className: "p-6 border-b", children: [_jsx("h3", { className: "font-semibold", children: selectedDate.toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                            }) }), _jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [eventsForSelectedDate.length, " event", eventsForSelectedDate.length !== 1 ? 's' : ''] })] }), _jsx("div", { className: "flex-1 overflow-auto p-6", children: eventsForSelectedDate.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [_jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3", children: _jsx(CalendarIcon, { className: "h-8 w-8 text-muted-foreground" }) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "No events scheduled" }), onAddEvent && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onAddEvent, className: "mt-4 gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Event"] }))] })) : (_jsx("div", { className: "space-y-3", children: eventsForSelectedDate.map((event) => (_jsxs("div", { onClick: () => onEventClick?.(event.id), className: cn("p-4 rounded-lg border bg-card transition-all cursor-pointer", "hover:bg-accent/50 hover:shadow-md"), children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-semibold text-sm mb-1", children: event.title }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [event.startTime, " - ", event.endTime] })] }), _jsx(Badge, { variant: "freshman", className: cn("text-xs ml-2", event.type === "class" && "border-blue-500/50 text-blue-600", event.type === "event" && "border-green-500/50 text-green-600", event.type === "office-hours" && "border-purple-500/50 text-purple-600"), children: event.type === "class" ? "Class" : event.type === "event" ? "Event" : "Office Hrs" })] }), _jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: _jsxs("span", { children: ["\uD83D\uDCCD ", event.location] }) }), event.instructor && (_jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: ["\uD83D\uDC68\u200D\uD83C\uDFEB ", event.instructor] })), event.spaceName && (_jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: ["\uD83C\uDFE2 ", event.spaceName] })), event.type === "event" && (_jsx("div", { className: "mt-3 pt-3 border-t", children: event.rsvpStatus === "going" ? (_jsx(Badge, { variant: "freshman", className: "text-xs", children: "\u2713 Going" })) : event.rsvpStatus === "interested" ? (_jsx(Badge, { variant: "sophomore", className: "text-xs", children: "\u2B50 Interested" })) : (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: "flex-1 h-7 text-xs", children: "Interested" }), _jsx(Button, { size: "sm", className: "flex-1 h-7 text-xs", children: "Going" })] })) }))] }, event.id))) })) })] })] })] }) }));
});
ProfileCalendarModal.displayName = "ProfileCalendarModal";
export { ProfileCalendarModal };
//# sourceMappingURL=profile-calendar-modal.js.map