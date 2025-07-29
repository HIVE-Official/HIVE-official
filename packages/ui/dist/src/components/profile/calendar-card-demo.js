'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarCard } from './calendar-card.js';
const mockEvents = [
    {
        id: '1',
        title: 'CS 101 Lecture',
        time: '2:00 PM',
        type: 'class',
        location: 'Davis Hall, Room 101',
        attendees: ['Prof. Johnson'],
        isAllDay: false,
        hasReminder: true,
        metadata: {
            professor: 'Prof. Johnson',
            room: '101',
            buildingCode: 'DAVIS'
        }
    },
    {
        id: '2',
        title: 'Study Group',
        time: '4:00 PM',
        type: 'academic',
        location: 'CS Majors Space',
        attendees: ['Alice', 'Bob', 'Charlie'],
        isAllDay: false,
        hasReminder: false,
        metadata: {
            spaceId: 'cs-majors',
            rsvpStatus: 'yes'
        }
    },
    {
        id: '3',
        title: 'Pizza Social',
        time: '6:00 PM',
        type: 'social',
        location: 'Student Union',
        attendees: ['Everyone'],
        isAllDay: false,
        hasReminder: true,
        metadata: {
            rsvpStatus: 'pending'
        }
    }
];
const mockConnections = [
    {
        id: 'google',
        name: 'Google',
        type: 'google',
        status: 'connected',
        lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        color: 'var(--hive-status-info)'
    },
    {
        id: 'university',
        name: 'University',
        type: 'university',
        status: 'connected',
        lastSync: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        color: 'var(--hive-brand-secondary)'
    }
];
const mockData = {
    nextEvent: mockEvents[0],
    upcomingEvents: mockEvents.slice(1),
    todaysEvents: mockEvents,
    connections: mockConnections,
    conflicts: [],
    lastUpdated: new Date()
};
export const CalendarCardDemo = ({ state = 'default', variant = 'desktop', showActions = true }) => {
    return (_jsx("div", { className: "p-4 bg-hive-background min-h-screen", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-6", children: "HIVE Calendar Card Demo" }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: _jsx(CalendarCard, { state: state, data: state === 'default' ? mockData : undefined, variant: variant, onViewCalendar: () => console.log('View calendar clicked'), onConnectCalendar: (type) => console.log('Connect calendar:', type), onAddEvent: () => console.log('Add event clicked'), onResolveConflict: (conflictId) => console.log('Resolve conflict:', conflictId), onSyncCalendar: (connectionId) => console.log('Sync calendar:', connectionId), onEventClick: (event) => console.log('Event clicked:', event) }) }), showActions && (_jsxs("div", { className: "mt-8 p-4 bg-[var(--hive-text-primary)]/5 rounded-lg border border-hive-border-secondary", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Available States" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-2", children: ['loading', 'default', 'empty', 'error', 'sync-failed'].map((demoState) => (_jsx("button", { onClick: () => window.location.href = `?state=${demoState}`, className: "px-3 py-2 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded border border-hive-gold/30 hover:bg-[var(--hive-brand-secondary)]/30 transition-colors", children: demoState }, demoState))) })] }))] }) }));
};
export default CalendarCardDemo;
//# sourceMappingURL=calendar-card-demo.js.map