"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, Edit3, Trash2, Eye, Star, Search, Grid, List, BarChart3, UserCheck, Share2, Download, Activity, AlertCircle, CheckCircle, XCircle, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
export function EventManagerTool({ spaceId, spaceName, isLeader = false, currentUserRole = 'member', leaderMode, onEventAction, authenticatedFetch, className }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Fetch events data from API
    useEffect(() => {
        async function fetchEvents() {
            try {
                const fetchFunction = authenticatedFetch || fetch;
                const response = await fetchFunction(`/api/spaces/${spaceId}/events?limit=50&upcoming=true`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch events: ${response.status}`);
                }
                const data = await response.json();
                const apiEvents = data.events || [];
                // Transform API data to match Event interface
                const transformedEvents = apiEvents.map((event) => ({
                    id: event.id,
                    title: event.title || 'Untitled Event',
                    description: event.description || '',
                    startDate: new Date(event.startDate || Date.now()),
                    endDate: new Date(event.endDate || Date.now()),
                    location: event.location || event.virtualLink || 'Location TBD',
                    isVirtual: event.virtualLink ? true : false,
                    maxCapacity: event.maxAttendees,
                    currentAttendees: event.currentAttendees || 0,
                    waitlistCount: 0, // Not implemented in API yet
                    status: event.status || 'draft',
                    visibility: event.isPrivate ? 'members' : 'public',
                    createdBy: event.organizer?.fullName || event.organizer?.handle || 'Unknown',
                    createdAt: new Date(event.createdAt || Date.now()),
                    tags: event.tags || [],
                    rsvpDeadline: event.rsvpDeadline ? new Date(event.rsvpDeadline) : undefined,
                    requiresApproval: event.requiredRSVP || false,
                    attendees: [], // Would need separate API call to get full attendee list
                    analytics: {
                        views: 0, // Not implemented yet
                        clicks: 0,
                        shares: 0,
                        conversationRate: 0
                    }
                }));
                setEvents(transformedEvents);
            }
            catch (error) {
                console.error('Error fetching events:', error);
                // Fallback to empty array on error
                setEvents([]);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchEvents();
    }, [spaceId, authenticatedFetch]);
    const handleEventAction = async (eventId, action, data) => {
        try {
            const fetchFunction = authenticatedFetch || fetch;
            switch (action) {
                case 'create': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to create event: ${response.status}`);
                    }
                    break;
                }
                case 'edit':
                case 'update': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to update event: ${response.status}`);
                    }
                    break;
                }
                case 'delete': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to delete event: ${response.status}`);
                    }
                    break;
                }
                case 'publish': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: 'published' }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to publish event: ${response.status}`);
                    }
                    break;
                }
                case 'cancel': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: 'cancelled' }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to cancel event: ${response.status}`);
                    }
                    break;
                }
                case 'rsvp': {
                    const response = await fetchFunction(`/api/spaces/${spaceId}/events/${eventId}/rsvp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: data?.status || 'going' }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to RSVP to event: ${response.status}`);
                    }
                    break;
                }
                case 'share': {
                    // This would integrate with sharing functionality
                    // For now, just trigger the callback
                    if (onEventAction) {
                        onEventAction(eventId, action, data);
                    }
                    return;
                }
                case 'copy': {
                    // This would copy event details to clipboard
                    if (onEventAction) {
                        onEventAction(eventId, action, data);
                    }
                    return;
                }
                case 'analytics': {
                    // This would show analytics for the event
                    if (onEventAction) {
                        onEventAction(eventId, action, data);
                    }
                    return;
                }
                default:
                    if (onEventAction) {
                        onEventAction(eventId, action, data);
                    }
                    return;
            }
            // Refresh event data after successful action
            const refreshFetchFunction = authenticatedFetch || fetch;
            const response = await refreshFetchFunction(`/api/spaces/${spaceId}/events?limit=50&upcoming=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                const apiEvents = data.events || [];
                const transformedEvents = apiEvents.map((event) => ({
                    id: event.id,
                    title: event.title || 'Untitled Event',
                    description: event.description || '',
                    startDate: new Date(event.startDate || Date.now()),
                    endDate: new Date(event.endDate || Date.now()),
                    location: event.location || event.virtualLink || 'Location TBD',
                    isVirtual: event.virtualLink ? true : false,
                    maxCapacity: event.maxAttendees,
                    currentAttendees: event.currentAttendees || 0,
                    waitlistCount: 0,
                    status: event.status || 'draft',
                    visibility: event.isPrivate ? 'members' : 'public',
                    createdBy: event.organizer?.fullName || event.organizer?.handle || 'Unknown',
                    createdAt: new Date(event.createdAt || Date.now()),
                    tags: event.tags || [],
                    rsvpDeadline: event.rsvpDeadline ? new Date(event.rsvpDeadline) : undefined,
                    requiresApproval: event.requiredRSVP || false,
                    attendees: [],
                    analytics: {
                        views: 0,
                        clicks: 0,
                        shares: 0,
                        conversationRate: 0
                    }
                }));
                setEvents(transformedEvents);
            }
            // Also trigger callback for any additional handling
            if (onEventAction) {
                onEventAction(eventId, action, data);
            }
        }
        catch (error) {
            console.error(`Error performing event action ${action}:`, error);
            // You might want to show a toast notification here
            throw error;
        }
    };
    // Filter and sort events
    const filteredEvents = useMemo(() => {
        return events
            .filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }, [events, searchQuery, statusFilter]);
    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'text-gray-400 bg-gray-500/20';
            case 'published': return 'text-green-400 bg-green-500/20';
            case 'ongoing': return 'text-blue-400 bg-blue-500/20';
            case 'completed': return 'text-purple-400 bg-purple-500/20';
            case 'cancelled': return 'text-red-400 bg-red-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft': return Eye;
            case 'published': return CheckCircle;
            case 'ongoing': return Activity;
            case 'completed': return Star;
            case 'cancelled': return XCircle;
            default: return AlertCircle;
        }
    };
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        }).format(date);
    };
    const getCapacityColor = (current, max) => {
        if (!max)
            return 'text-gray-400';
        const percentage = current / max;
        if (percentage >= 0.9)
            return 'text-red-400';
        if (percentage >= 0.7)
            return 'text-yellow-400';
        return 'text-green-400';
    };
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-5 w-5 text-[#FFD700]" }), _jsx("h2", { className: "text-xl font-semibold text-white", children: "Event Manager" }), _jsxs(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: [filteredEvents.length, " events"] })] }), isLeader && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "border-green-500/30 text-green-400 hover:bg-green-500/10", onClick: () => setShowCreateModal(true), children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Create Event"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export"] })] }))] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" }), _jsx("input", { type: "text", placeholder: "Search events, descriptions, or tags...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white placeholder-neutral-400 focus:border-[#FFD700]/30 focus:outline-none" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-lg text-white focus:border-[#FFD700]/30 focus:outline-none", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "draft", children: "Draft" }), _jsx("option", { value: "published", children: "Published" }), _jsx("option", { value: "ongoing", children: "Ongoing" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "cancelled", children: "Cancelled" })] }), _jsx("div", { className: "flex items-center bg-white/[0.02] border border-white/[0.06] rounded-lg", children: ['list', 'grid', 'calendar'].map((mode, index) => {
                                    const icons = { list: List, grid: Grid, calendar: Calendar };
                                    const Icon = icons[mode];
                                    return (_jsx("button", { onClick: () => setViewMode(mode), className: cn("p-2 transition-colors capitalize", viewMode === mode
                                            ? "bg-[#FFD700]/20 text-[#FFD700]"
                                            : "text-neutral-400 hover:text-white", index === 0 && "rounded-l-lg", index === 2 && "rounded-r-lg"), children: _jsx(Icon, { className: "h-4 w-4" }) }, mode));
                                }) })] })] }), _jsx("div", { className: cn(viewMode === 'grid'
                    ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                    : "space-y-4"), children: isLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 animate-pulse", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-5 bg-white/10 rounded w-3/4" }), _jsx("div", { className: "h-4 bg-white/10 rounded w-full" }), _jsx("div", { className: "h-4 bg-white/10 rounded w-2/3" })] }), _jsx("div", { className: "w-16 h-6 bg-white/10 rounded ml-3" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-3", children: [_jsx("div", { className: "h-4 bg-white/10 rounded" }), _jsx("div", { className: "h-4 bg-white/10 rounded" }), _jsx("div", { className: "h-4 bg-white/10 rounded" }), _jsx("div", { className: "h-4 bg-white/10 rounded" })] }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("div", { className: "h-5 bg-white/10 rounded w-16" }), _jsx("div", { className: "h-5 bg-white/10 rounded w-20" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "h-8 bg-white/10 rounded w-20" }), _jsx("div", { className: "h-8 bg-white/10 rounded w-16" })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "w-8 h-8 bg-white/10 rounded" }), _jsx("div", { className: "w-8 h-8 bg-white/10 rounded" })] })] })] }, i)))) : filteredEvents.map((event) => {
                    const StatusIcon = getStatusIcon(event.status);
                    const capacityColor = getCapacityColor(event.currentAttendees, event.maxCapacity);
                    return (_jsxs(motion.div, { className: "bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: { scale: 1.01 }, layout: true, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-white truncate", children: event.title }), event.isVirtual && (_jsx(Badge, { variant: "secondary", className: "text-xs bg-blue-500/20 text-blue-400", children: "Virtual" }))] }), _jsx("p", { className: "text-sm text-neutral-400 line-clamp-2 mb-2", children: event.description })] }), _jsxs("div", { className: "flex items-center gap-2 ml-3", children: [_jsxs("div", { className: cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs", getStatusColor(event.status)), children: [_jsx(StatusIcon, { className: "h-3 w-3" }), _jsx("span", { className: "capitalize", children: event.status })] }), isLeader && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEventAction(event.id, 'edit'), children: _jsx(Edit3, { className: "h-3 w-3" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEventAction(event.id, 'delete'), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-3 w-3" }) })] }))] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-3 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-neutral-400", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formatDate(event.startDate) })] }), _jsxs("div", { className: "flex items-center gap-2 text-neutral-400", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { className: "truncate", children: event.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-neutral-400" }), _jsxs("span", { className: capacityColor, children: [event.currentAttendees, event.maxCapacity && `/${event.maxCapacity}`] }), event.waitlistCount > 0 && (_jsxs("span", { className: "text-yellow-400", children: ["+", event.waitlistCount, " waitlist"] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-neutral-400", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsxs("span", { children: ["Created ", formatDate(event.createdAt)] })] })] }), event.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mb-3", children: [event.tags.slice(0, 3).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs bg-purple-500/20 text-purple-300", children: tag }, tag))), event.tags.length > 3 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: ["+", event.tags.length - 3] }))] })), leaderMode === 'insights' && event.analytics && (_jsx(motion.div, { className: "mb-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, children: _jsxs("div", { className: "grid grid-cols-4 gap-3 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-blue-400", children: event.analytics.views }), _jsx("div", { className: "text-xs text-neutral-400", children: "Views" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-green-400", children: event.analytics.clicks }), _jsx("div", { className: "text-xs text-neutral-400", children: "Clicks" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-yellow-400", children: event.analytics.shares }), _jsx("div", { className: "text-xs text-neutral-400", children: "Shares" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm font-bold text-purple-400", children: [Math.round(event.analytics.conversationRate * 100), "%"] }), _jsx("div", { className: "text-xs text-neutral-400", children: "Conversion" })] })] }) })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "text-xs", onClick: () => setSelectedEvent(event), children: [_jsx(Eye, { className: "h-3 w-3 mr-1" }), "View Details"] }), event.status === 'published' && (_jsxs(Button, { variant: "secondary", size: "sm", className: "text-xs border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(UserCheck, { className: "h-3 w-3 mr-1" }), "RSVP"] }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEventAction(event.id, 'share'), children: _jsx(Share2, { className: "h-3 w-3" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEventAction(event.id, 'copy'), children: _jsx(Copy, { className: "h-3 w-3" }) }), isLeader && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEventAction(event.id, 'analytics'), children: _jsx(BarChart3, { className: "h-3 w-3" }) }))] })] })] }, event.id));
                }) }), filteredEvents.length === 0 && (_jsxs(motion.div, { className: "text-center py-12", initial: { opacity: 0 }, animate: { opacity: 1 }, children: [_jsx(Calendar, { className: "h-16 w-16 text-neutral-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: "No Events Found" }), _jsx("p", { className: "text-neutral-400 text-sm mb-6", children: searchQuery || statusFilter !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Create your first event to get started' }), isLeader && !searchQuery && statusFilter === 'all' && (_jsxs(Button, { variant: "secondary", onClick: () => setShowCreateModal(true), className: "border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Create First Event"] }))] })), _jsx(AnimatePresence, { children: selectedEvent && (_jsx(motion.div, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setSelectedEvent(null), children: _jsxs(motion.div, { className: "bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "p-6 border-b border-white/[0.06]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: selectedEvent.title }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => setSelectedEvent(null), children: "\u2715" })] }) }), _jsx("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]", children: _jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-neutral-300 leading-relaxed", children: selectedEvent.description }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white mb-2", children: "Event Details" }), _jsxs("div", { className: "space-y-2 text-sm text-neutral-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsxs("span", { children: [formatDate(selectedEvent.startDate), " - ", formatDate(selectedEvent.endDate)] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: selectedEvent.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), _jsxs("span", { children: [selectedEvent.currentAttendees, " attending"] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-white mb-2", children: "Attendees" }), _jsxs("div", { className: "space-y-2", children: [selectedEvent.attendees.slice(0, 5).map((attendee) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center", children: attendee.avatar ? (_jsx("img", { src: attendee.avatar, alt: attendee.name, className: "w-5 h-5 rounded-full" })) : (_jsx("span", { className: "text-xs font-bold text-white", children: attendee.name.charAt(0) })) }), _jsx("span", { className: "text-sm text-white", children: attendee.name }), _jsx(Badge, { variant: "secondary", className: "text-xs capitalize", children: attendee.status.replace('_', ' ') })] }, attendee.id))), selectedEvent.attendees.length > 5 && (_jsxs("div", { className: "text-xs text-neutral-400", children: ["+", selectedEvent.attendees.length - 5, " more attendees"] }))] })] })] }), _jsxs("div", { className: "flex justify-between items-center pt-4 border-t border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [selectedEvent.status === 'published' && (_jsxs(Button, { className: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30", children: [_jsx(UserCheck, { className: "h-4 w-4 mr-2" }), "RSVP Now"] })), _jsxs(Button, { variant: "secondary", children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), "Share"] })] }), isLeader && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(Edit3, { className: "h-4 w-4 mr-1" }), "Edit"] }), _jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(BarChart3, { className: "h-4 w-4 mr-1" }), "Analytics"] })] }))] })] }) })] }) })) })] }));
}
//# sourceMappingURL=event-manager-tool.js.map