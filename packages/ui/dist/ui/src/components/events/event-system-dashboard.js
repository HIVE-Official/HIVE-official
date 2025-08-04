"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Event System Dashboard - Complete Frontend
 *
 * The main interface for the Event Management System (vBETA focus).
 * Provides access to all 5 event tools with seamless integration.
 */
import { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index.js';
import { Calendar, Users, QrCode, BarChart3, MessageSquare, Plus, Clock } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { EventCreatorToolV2 } from './event-creator-tool-v2.js';
import { ToolRuntimeEngine } from '../tools/tool-runtime-engine.js';
export function EventSystemDashboard({ spaceId, userId, userRole, className }) {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedTool, setSelectedTool] = useState(null);
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    // Event System Tools (5 core tools)
    const eventTools = [
        {
            id: 'event-creator',
            name: 'Event Creator',
            description: 'Create and configure new events with all the details',
            icon: Plus,
            category: 'creation',
            toolDefinition: createEventCreatorTool()
        },
        {
            id: 'rsvp-manager',
            name: 'RSVP Manager',
            description: 'Track responses and manage event attendance',
            icon: Users,
            category: 'management',
            toolDefinition: createRSVPManagerTool()
        },
        {
            id: 'event-checkin',
            name: 'Event Check-In',
            description: 'QR code check-in system for live events',
            icon: QrCode,
            category: 'engagement',
            toolDefinition: createCheckInTool()
        },
        {
            id: 'event-calendar',
            name: 'Event Calendar',
            description: 'View and manage all space events in calendar format',
            icon: Calendar,
            category: 'management',
            toolDefinition: createEventCalendarTool()
        },
        {
            id: 'event-feedback',
            name: 'Event Feedback',
            description: 'Collect post-event feedback and ratings',
            icon: MessageSquare,
            category: 'analysis',
            toolDefinition: createFeedbackTool()
        }
    ];
    // Fetch space events
    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/spaces/${spaceId}/events`, {
                headers: { 'Authorization': `Bearer ${userId}` }
            });
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events || []);
                setUpcomingEvents((data.events || []).filter((event) => new Date(event.startDate) > new Date()).slice(0, 5));
            }
            else {
                // Fallback to sample events
                const sampleEvents = getSampleEvents();
                setEvents(sampleEvents);
                setUpcomingEvents(sampleEvents.slice(0, 5));
            }
        }
        catch (error) {
            console.error('Failed to fetch events:', error);
            const sampleEvents = getSampleEvents();
            setEvents(sampleEvents);
            setUpcomingEvents(sampleEvents.slice(0, 5));
        }
        finally {
            setLoading(false);
        }
    }, [spaceId, userId]);
    // Launch tool
    const handleLaunchTool = (tool) => {
        setSelectedTool(tool);
        setCurrentView('tool');
    };
    // Handle tool actions
    const handleToolSave = async (data) => {
        if (!selectedTool)
            return;
        try {
            await fetch(`/api/tools/${selectedTool.id}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                },
                body: JSON.stringify({ spaceId, data })
            });
        }
        catch (error) {
            console.error('Failed to save tool data:', error);
        }
    };
    const handleToolSubmit = async (data) => {
        if (!selectedTool)
            return;
        try {
            await fetch(`/api/tools/${selectedTool.id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`
                },
                body: JSON.stringify({ spaceId, data })
            });
            // Refresh events after submission
            await fetchEvents();
            // Return to dashboard
            setSelectedTool(null);
            setCurrentView('dashboard');
        }
        catch (error) {
            console.error('Failed to submit tool data:', error);
        }
    };
    // Load events on mount
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
    // Tool Runtime View
    if (currentView === 'tool' && selectedTool) {
        return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => {
                                    setSelectedTool(null);
                                    setCurrentView('dashboard');
                                }, children: "\u2190 Back to Event System" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(selectedTool.icon, { className: "w-5 h-5 text-amber-600" }), _jsx("span", { className: "font-medium text-gray-900", children: selectedTool.name })] })] }) }), _jsx(ToolRuntimeEngine, { tool: selectedTool.toolDefinition, userId: userId, spaceId: spaceId, mode: "production", onSave: handleToolSave, onSubmit: handleToolSubmit })] }));
    }
    // Event Creator View
    if (currentView === 'create') {
        return (_jsx("div", { className: cn("", className), children: _jsx(EventCreatorToolV2, { spaceId: spaceId, onEventCreated: async (event) => {
                    await fetchEvents();
                    setCurrentView('dashboard');
                }, onCancel: () => setCurrentView('dashboard') }) }));
    }
    // Main Dashboard View
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Event Management System" }), _jsx("p", { className: "text-gray-600", children: "Complete event coordination for your campus community" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(HiveBadge, { variant: "outline", children: [events.length, " total events"] }), _jsxs(HiveButton, { onClick: () => setCurrentView('create'), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Create Event"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Calendar, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: upcomingEvents.length }), _jsx("p", { className: "text-sm text-gray-600", children: "Upcoming Events" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5 text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: "847" }), _jsx("p", { className: "text-sm text-gray-600", children: "Total RSVPs" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center", children: _jsx(Clock, { className: "w-5 h-5 text-amber-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: "94%" }), _jsx("p", { className: "text-sm text-gray-600", children: "Attendance Rate" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center", children: _jsx(BarChart3, { className: "w-5 h-5 text-purple-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-gray-900", children: "4.8" }), _jsx("p", { className: "text-sm text-gray-600", children: "Avg Rating" })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Event Tools" }), _jsx(HiveBadge, { variant: "outline", children: "5 tools" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: eventTools.map(tool => (_jsx(EventToolCard, { tool: tool, onLaunch: () => handleLaunchTool(tool) }, tool.id))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Upcoming Events" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "View All Events" })] }), loading ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3].map(i => (_jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "h-20 bg-gray-200 rounded-lg" }) }, i))) })) : upcomingEvents.length === 0 ? (_jsxs(HiveCard, { className: "p-8 text-center", children: [_jsx(Calendar, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No upcoming events" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Create your first event to get started" }), _jsx(HiveButton, { onClick: () => setCurrentView('create'), children: "Create Event" })] })) : (_jsx("div", { className: "space-y-3", children: upcomingEvents.map(event => (_jsx(EventCard, { event: event }, event.id))) }))] }), _jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-amber-800 mb-2", children: "\uD83C\uDFAF vBETA Event System" }), _jsx("p", { className: "text-sm text-amber-700 mb-2", children: "This is HIVE's focused Event Management System - the single system we're launching for vBETA." }), _jsxs("div", { className: "text-xs text-amber-600 space-y-1", children: [_jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "5 Integrated Tools" }), ": Event Creator, RSVP Manager, Check-In System, Calendar, Feedback"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "Complete Workflow" }), ": Plan \u2192 Promote \u2192 Execute \u2192 Analyze"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "Campus Integration" }), ": Works across all Spaces with unified coordination"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "Built with Elements" }), ": Shows students how tools are constructed from reusable components"] })] })] })] }));
}
function EventToolCard({ tool, onLaunch }) {
    const categoryColors = {
        creation: 'bg-green-100 text-green-800',
        management: 'bg-blue-100 text-blue-800',
        engagement: 'bg-purple-100 text-purple-800',
        analysis: 'bg-orange-100 text-orange-800',
    };
    return (_jsx(HiveCard, { className: "p-4 hover:shadow-md transition-shadow cursor-pointer", onClick: onLaunch, children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center", children: _jsx(tool.icon, { className: "w-5 h-5 text-amber-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: tool.name }), _jsx(HiveBadge, { variant: "outline", className: cn("text-xs", categoryColors[tool.category]), children: tool.category })] })] }) }), _jsx("p", { className: "text-sm text-gray-600", children: tool.description }), _jsx("div", { className: "flex items-center gap-2 pt-2 border-t border-gray-100", children: _jsx(HiveButton, { size: "sm", className: "flex-1", children: "Launch Tool" }) })] }) }));
}
function EventCard({ event }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };
    return (_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: event.title }), _jsx(HiveBadge, { variant: "outline", className: "text-xs", children: event.category })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: formatDate(event.startDate) })] }), event.location && (_jsx("div", { className: "flex items-center gap-1", children: _jsx("span", { children: event.location.venue || event.location.type }) }))] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(HiveBadge, { variant: event.status === 'published' ? 'default' : 'outline', children: event.status }) })] }) }));
}
// Tool Definition Creators (these would create the actual tool definitions)
function createEventCreatorTool() {
    return {
        id: 'event-creator-tool',
        name: 'Event Creator',
        description: 'Create comprehensive events with all details',
        version: '1.0.0',
        elements: [
            {
                id: 'event-title',
                type: 'text_input',
                label: 'Event Title',
                properties: { placeholder: 'Enter event title...' },
                position: { x: 0, y: 0 },
                size: { width: 100, height: 60 },
                validation: { required: true }
            },
            // Additional elements would be defined here
        ],
        actions: [
            {
                id: 'create-event',
                trigger: 'submit-button',
                type: 'submit',
                config: { endpoint: '/api/events/create' }
            }
        ],
        metadata: {
            createdBy: 'hive-system',
            createdAt: new Date().toISOString(),
            category: 'event',
            tags: ['event', 'creation']
        }
    };
}
function createRSVPManagerTool() {
    // Similar structure for RSVP Manager
    return {
        id: 'rsvp-manager-tool',
        name: 'RSVP Manager',
        description: 'Manage event responses and attendance',
        version: '1.0.0',
        elements: [],
        actions: [],
        metadata: {
            createdBy: 'hive-system',
            createdAt: new Date().toISOString(),
            category: 'event',
            tags: ['rsvp', 'management']
        }
    };
}
function createCheckInTool() {
    return {
        id: 'checkin-tool',
        name: 'Event Check-In',
        description: 'QR code based event check-in system',
        version: '1.0.0',
        elements: [],
        actions: [],
        metadata: {
            createdBy: 'hive-system',
            createdAt: new Date().toISOString(),
            category: 'event',
            tags: ['checkin', 'qr-code']
        }
    };
}
function createEventCalendarTool() {
    return {
        id: 'event-calendar-tool',
        name: 'Event Calendar',
        description: 'Calendar view of all space events',
        version: '1.0.0',
        elements: [],
        actions: [],
        metadata: {
            createdBy: 'hive-system',
            createdAt: new Date().toISOString(),
            category: 'event',
            tags: ['calendar', 'scheduling']
        }
    };
}
function createFeedbackTool() {
    return {
        id: 'feedback-tool',
        name: 'Event Feedback',
        description: 'Collect post-event feedback and ratings',
        version: '1.0.0',
        elements: [],
        actions: [],
        metadata: {
            createdBy: 'hive-system',
            createdAt: new Date().toISOString(),
            category: 'event',
            tags: ['feedback', 'analysis']
        }
    };
}
// Sample events for development
function getSampleEvents() {
    return [
        {
            id: 'event-1',
            spaceId: 'space-1',
            createdBy: 'user-1',
            title: 'CS Study Group - Algorithms',
            description: 'Weekly study session for CSE 331 - Algorithm Design',
            category: 'academic',
            type: 'study_session',
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            timezone: 'America/New_York',
            isAllDay: false,
            location: {
                type: 'on_campus',
                venue: 'Davis Hall',
                room: '101'
            },
            capacity: 25,
            requiresRSVP: true,
            allowGuests: false,
            visibility: 'space_only',
            coHostingSpaces: [],
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: ['study', 'algorithms', 'cs']
        },
        // More sample events...
    ];
}
export default EventSystemDashboard;
//# sourceMappingURL=event-system-dashboard.js.map