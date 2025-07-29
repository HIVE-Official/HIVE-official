"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSmartCalendarProps = exports.adaptEventsToCalendarCardData = void 0;
/**
 * Converts Event array and loading states to CalendarCardData format
 * for use with the new CalendarCard component
 */
var adaptEventsToCalendarCardData = function (events, isLoading, error) {
    // Handle loading state
    if (isLoading) {
        return { state: 'loading' };
    }
    // Handle error state
    if (error) {
        return { state: 'error' };
    }
    // Handle empty state
    if (!events || events.length === 0) {
        return { state: 'empty' };
    }
    // Sort events by time
    var sortedEvents = __spreadArray([], events, true).sort(function (a, b) {
        // Simple time comparison (assuming format like "2:00 PM")
        var timeA = convertTimeToMinutes(a.time);
        var timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
    });
    // Find next upcoming event
    var now = new Date();
    var currentTime = now.getHours() * 60 + now.getMinutes();
    var nextEvent = sortedEvents.find(function (event) {
        var eventTime = convertTimeToMinutes(event.time);
        return eventTime > currentTime;
    });
    // Get remaining events after next event
    var nextEventIndex = nextEvent ? sortedEvents.findIndex(function (e) { return e.id === nextEvent.id; }) : -1;
    var upcomingEvents = nextEventIndex >= 0 ? sortedEvents.slice(nextEventIndex + 1) : sortedEvents;
    // Mock calendar connections - in real app, this would come from props or API
    var mockConnections = [
        {
            id: 'google',
            name: 'Google',
            type: 'google',
            status: 'connected',
            lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            color: 'var(--hive-status-info)'
        },
        {
            id: 'university',
            name: 'University',
            type: 'university',
            status: 'connected',
            lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            color: 'var(--hive-brand-secondary)'
        }
    ];
    var data = {
        nextEvent: nextEvent,
        upcomingEvents: upcomingEvents.slice(0, 5), // Limit to 5 upcoming events
        todaysEvents: sortedEvents,
        connections: mockConnections,
        conflicts: [], // TODO: Implement conflict detection logic
        lastUpdated: new Date()
    };
    return { data: data, state: 'default' };
};
exports.adaptEventsToCalendarCardData = adaptEventsToCalendarCardData;
/**
 * Convert time string like "2:00 PM" to minutes since midnight
 */
function convertTimeToMinutes(timeStr) {
    var _a = timeStr.split(' '), time = _a[0], period = _a[1];
    var _b = time.split(':').map(Number), hours = _b[0], minutes = _b[1];
    var totalMinutes = minutes;
    if (period === 'AM') {
        totalMinutes += hours === 12 ? 0 : hours * 60;
    }
    else if (period === 'PM') {
        totalMinutes += hours === 12 ? 12 * 60 : (hours + 12) * 60;
    }
    return totalMinutes;
}
/**
 * Props adapter to convert SmartCalendar props to CalendarCard props
 */
var adaptSmartCalendarProps = function (events, isLoading, error, onEventClick, onAddEvent, variant) {
    if (variant === void 0) { variant = 'desktop'; }
    var _a = (0, exports.adaptEventsToCalendarCardData)(events, isLoading, error), data = _a.data, state = _a.state;
    return {
        data: data,
        state: state,
        variant: variant,
        onEventClick: function (event) { return onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event.id); },
        onAddEvent: onAddEvent,
        onViewCalendar: function () {
            // Navigate to full calendar view
            console.log('Navigate to calendar page');
        },
        onConnectCalendar: function (type) {
            // Handle calendar connection
            console.log('Connect calendar:', type);
        },
        onResolveConflict: function (conflictId) {
            // Handle conflict resolution
            console.log('Resolve conflict:', conflictId);
        },
        onSyncCalendar: function (connectionId) {
            // Handle calendar sync
            console.log('Sync calendar:', connectionId);
        }
    };
};
exports.adaptSmartCalendarProps = adaptSmartCalendarProps;
