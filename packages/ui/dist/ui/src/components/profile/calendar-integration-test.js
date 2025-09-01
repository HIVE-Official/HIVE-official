'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarCard } from './calendar-card.js';
import { adaptSmartCalendarProps } from './calendar-data-adapter.js';
// Test component to verify the calendar integration works
const mockEvents = [
    {
        id: '1',
        title: 'CS 101 Lecture',
        time: '2:00 PM',
        type: 'academic',
        location: 'Davis Hall, Room 101',
        attendees: ['Prof. Johnson'],
        isAllDay: false,
        hasReminder: true,
        metadata: {
            professor: 'Prof. Johnson',
            room: '101',
            buildingCode: 'DAVIS'
        }
    }
];
export const CalendarIntegrationTest = () => {
    const handleEventClick = (eventId) => {
        console.log('Event clicked:', eventId);
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-[var(--hive-text-primary)] text-lg mb-4", children: "Calendar Integration Test" }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-gray-300 text-sm mb-2", children: "Desktop Calendar Card" }), _jsx(CalendarCard, { ...adaptSmartCalendarProps(mockEvents, false, undefined, handleEventClick, undefined, 'desktop') })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-gray-300 text-sm mb-2", children: "Mobile Calendar Card" }), _jsx(CalendarCard, { ...adaptSmartCalendarProps(mockEvents, false, undefined, handleEventClick, undefined, 'mobile') })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-gray-300 text-sm mb-2", children: "Loading State" }), _jsx(CalendarCard, { ...adaptSmartCalendarProps([], true, undefined, handleEventClick, undefined, 'desktop') })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-gray-300 text-sm mb-2", children: "Empty State" }), _jsx(CalendarCard, { ...adaptSmartCalendarProps([], false, undefined, handleEventClick, undefined, 'desktop') })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-gray-300 text-sm mb-2", children: "Error State" }), _jsx(CalendarCard, { ...adaptSmartCalendarProps([], false, 'Failed to load calendar events', handleEventClick, undefined, 'desktop') })] })] }));
};
export default CalendarIntegrationTest;
//# sourceMappingURL=calendar-integration-test.js.map