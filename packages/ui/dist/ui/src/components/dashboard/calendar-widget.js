'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users, Plus, Eye, Bell, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../ui/badge';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
        }
    }
};
export function CalendarWidget({ data, isLoading = false, onEventClick, onDateSelect, onAddEvent, className = "", viewMode = 'agenda' }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeView, setActiveView] = useState(viewMode);
    // Get current week events
    const currentWeekEvents = useMemo(() => {
        if (!data?.events)
            return [];
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return data.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
        }).sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime());
    }, [data?.events, currentDate]);
    // Get today's events
    const todayEvents = useMemo(() => {
        if (!data?.events)
            return [];
        const today = new Date().toISOString().split('T')[0];
        return data.events.filter(event => event.date === today);
    }, [data?.events]);
    // Get upcoming deadlines (next 7 days)
    const upcomingDeadlines = useMemo(() => {
        if (!data?.upcomingDeadlines)
            return [];
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        return data.upcomingDeadlines.filter(deadline => {
            const dueDate = new Date(deadline.dueDate);
            return dueDate >= today && dueDate <= nextWeek;
        }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [data?.upcomingDeadlines]);
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (date.toDateString() === today.toDateString())
            return 'Today';
        if (date.toDateString() === tomorrow.toDateString())
            return 'Tomorrow';
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'academic': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'personal': return 'bg-green-100 text-green-700 border-green-200';
            case 'space': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'social': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };
    if (isLoading) {
        return _jsx(CalendarSkeleton, {});
    }
    if (!data) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg text-gray-600 mb-4", children: "Unable to load calendar" }), _jsx(Button, { onClick: () => window.location.reload(), children: "Try Again" })] }) }));
    }
    return (_jsxs(motion.div, { className: `calendar-widget space-y-4 ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-indigo-600" }), _jsx("span", { children: "Calendar" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: onAddEvent, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Event"] }) })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "h-5 w-5 text-blue-600" }), _jsx("span", { children: "Today's Schedule" }), _jsx(Badge, { variant: "secondary", children: todayEvents.length })] }) }), _jsx(CardContent, { children: todayEvents.length > 0 ? (_jsx("div", { className: "space-y-3", children: todayEvents.map((event) => (_jsx(motion.div, { className: `p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${getEventTypeColor(event.type)}`, onClick: () => onEventClick?.(event.id), whileHover: { x: 4 }, whileTap: { scale: 0.98 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "font-medium text-sm", children: event.title }), event.reminderSet && (_jsx(Bell, { className: "h-3 w-3 text-gray-500" }))] }), _jsxs("div", { className: "flex items-center space-x-4 mt-1 text-xs text-gray-600", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: event.isAllDay
                                                                            ? 'All day'
                                                                            : `${formatTime(event.startTime)} - ${formatTime(event.endTime)}` })] }), event.location && (_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: event.location })] })), event.attendeeCount && (_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: event.attendeeCount })] }))] })] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Eye, { className: "h-3 w-3" }) })] }) }, event.id))) })) : (_jsxs("div", { className: "text-center py-6 text-gray-500", children: [_jsx(Calendar, { className: "h-8 w-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { className: "text-sm", children: "No events scheduled for today" }), _jsx("p", { className: "text-xs mt-1", children: "Add an event to get started" })] })) })] }) }), upcomingDeadlines.length > 0 && (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(BookOpen, { className: "h-5 w-5 text-red-600" }), _jsx("span", { children: "Upcoming Deadlines" }), _jsx(Badge, { variant: "destructive", children: upcomingDeadlines.length })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: upcomingDeadlines.map((deadline) => (_jsx(motion.div, { className: `p-3 rounded-lg border ${getPriorityColor(deadline.priority)}`, whileHover: { x: 4 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm", children: deadline.title }), _jsxs("div", { className: "flex items-center space-x-4 mt-1 text-xs", children: [_jsxs("span", { children: ["Due ", formatDate(deadline.dueDate)] }), deadline.spaceName && (_jsxs("span", { className: "text-gray-600", children: ["in ", deadline.spaceName] })), _jsx(Badge, { variant: "outline", className: "text-xs", children: deadline.type })] })] }), _jsx(Badge, { variant: deadline.priority === 'high' ? 'destructive' : 'secondary', className: "text-xs", children: deadline.priority })] }) }, deadline.id))) }) })] }) })), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-green-600" }), _jsx("span", { children: "This Week" }), _jsx(Badge, { variant: "secondary", children: currentWeekEvents.length })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                    const prevWeek = new Date(currentDate);
                                                    prevWeek.setDate(currentDate.getDate() - 7);
                                                    setCurrentDate(prevWeek);
                                                }, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                                    const nextWeek = new Date(currentDate);
                                                    nextWeek.setDate(currentDate.getDate() + 7);
                                                    setCurrentDate(nextWeek);
                                                }, children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] }) }), _jsx(CardContent, { children: currentWeekEvents.length > 0 ? (_jsx("div", { className: "space-y-2", children: currentWeekEvents.map((event) => (_jsxs(motion.div, { className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors", onClick: () => onEventClick?.(event.id), whileHover: { x: 2 }, children: [_jsx("div", { className: `w-3 h-3 rounded-full bg-${event.color || 'blue'}-500` }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-sm truncate", children: event.title }), _jsxs("p", { className: "text-xs text-gray-500", children: [formatDate(event.date), " \u2022 ", formatTime(event.startTime), event.spaceName && ` • ${event.spaceName}`] })] }), _jsx(Badge, { variant: "outline", className: `text-xs ${getEventTypeColor(event.type)}`, children: event.type })] }, event.id))) })) : (_jsxs("div", { className: "text-center py-6 text-gray-500", children: [_jsx(Calendar, { className: "h-8 w-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { className: "text-sm", children: "No events this week" })] })) })] }) })] }));
}
// Loading Skeleton
function CalendarSkeleton() {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-20 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-32 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-24 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-40 bg-gray-200 rounded-lg animate-pulse" })] }));
}
// Mock data for development
export const mockCalendarData = {
    events: [
        {
            id: 'event_1',
            title: 'CS 101 Lecture',
            description: 'Introduction to Computer Science',
            startTime: '10:00',
            endTime: '11:30',
            date: new Date().toISOString().split('T')[0],
            type: 'academic',
            location: 'Room 204',
            spaceId: 'cs_majors',
            spaceName: 'CS Majors',
            color: 'blue',
            reminderSet: true
        },
        {
            id: 'event_2',
            title: 'Study Group',
            description: 'Algorithms and Data Structures',
            startTime: '14:00',
            endTime: '16:00',
            date: new Date().toISOString().split('T')[0],
            type: 'space',
            location: 'Library',
            spaceId: 'study_groups',
            spaceName: 'Study Groups',
            attendeeCount: 5,
            color: 'purple',
            reminderSet: true
        },
        {
            id: 'event_3',
            title: 'Coffee Chat',
            startTime: '11:00',
            endTime: '12:00',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            type: 'social',
            location: 'Campus Cafe',
            attendeeCount: 3,
            color: 'orange'
        }
    ],
    upcomingDeadlines: [
        {
            id: 'deadline_1',
            title: 'Math Assignment 3',
            dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
            type: 'assignment',
            spaceId: 'math_study',
            spaceName: 'Math Study Group',
            priority: 'high'
        },
        {
            id: 'deadline_2',
            title: 'CS Project Proposal',
            dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
            type: 'project',
            spaceId: 'cs_majors',
            spaceName: 'CS Majors',
            priority: 'medium'
        }
    ]
};
export default CalendarWidget;
//# sourceMappingURL=calendar-widget.js.map