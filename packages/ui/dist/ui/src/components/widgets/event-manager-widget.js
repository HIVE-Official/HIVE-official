"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, Eye, Activity, TrendingUp, UserCheck, Share2, BarChart3, Download } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button, Badge } from '../../atomic/atoms/index.js';
import { EventManagerTool } from '../tools/event-manager-tool.js';
export function EventManagerWidget({ space, isLeader = false, currentUserRole = 'member', leaderMode, showCompact = false, maxEvents = 6, onEventAction, authenticatedFetch, className }) {
    const [showFullManager, setShowFullManager] = useState(false);
    const [quickViewMode, setQuickViewMode] = useState('upcoming');
    // Mock event data for preview
    const previewEvents = [
        {
            id: '1',
            title: 'CS Study Group - Data Structures',
            description: 'Weekly study session covering binary trees, heaps, and graph algorithms.',
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            location: 'Library Study Room 304',
            isVirtual: false,
            currentAttendees: 8,
            maxCapacity: 12,
            status: 'published',
            tags: ['study', 'computer-science'],
            analytics: {
                views: 45,
                clicks: 12,
                conversationRate: 0.67
            }
        },
        {
            id: '2',
            title: 'Virtual Career Fair - Tech Industry',
            description: 'Connect with top tech companies recruiting for internships and full-time positions.',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            location: 'Zoom Meeting',
            isVirtual: true,
            currentAttendees: 156,
            maxCapacity: 200,
            status: 'published',
            tags: ['career', 'networking'],
            analytics: {
                views: 234,
                clicks: 87,
                conversationRate: 0.82
            }
        },
        {
            id: '3',
            title: 'End of Semester Social',
            description: 'Celebrate the end of finals with food, games, and networking.',
            startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            location: 'Student Union Ballroom',
            isVirtual: false,
            currentAttendees: 73,
            maxCapacity: 150,
            status: 'draft',
            tags: ['social', 'networking'],
            analytics: {
                views: 12,
                clicks: 4,
                conversationRate: 0.33
            }
        }
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-500/20 text-gray-400';
            case 'published': return 'bg-green-500/20 text-green-400';
            case 'ongoing': return 'bg-blue-500/20 text-blue-400';
            case 'completed': return 'bg-purple-500/20 text-purple-400';
            case 'cancelled': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
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
    const filteredEvents = previewEvents
        .filter(event => {
        switch (quickViewMode) {
            case 'upcoming':
                return event.status === 'published' && new Date(event.startDate) > new Date();
            case 'popular':
                return event.analytics.views > 50;
            case 'recent':
                return true; // Show all for recent
            default:
                return true;
        }
    })
        .slice(0, maxEvents);
    if (showCompact) {
        return (_jsxs("div", { className: cn("space-y-3", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-[#FFD700]" }), _jsx("span", { className: "text-sm font-medium text-white", children: "Events" }), _jsx(Badge, { variant: "secondary", className: "text-xs", children: previewEvents.length })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowFullManager(true), className: "text-xs text-neutral-400 hover:text-white", children: "View All" })] }), _jsx("div", { className: "flex gap-1", children: ['upcoming', 'popular', 'recent'].map((mode) => (_jsx("button", { onClick: () => setQuickViewMode(mode), className: cn("px-2 py-1 text-xs rounded transition-colors capitalize", quickViewMode === mode
                            ? "bg-[#FFD700]/20 text-[#FFD700]"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"), children: mode }, mode))) }), _jsx("div", { className: "space-y-2", children: filteredEvents.map((event) => (_jsxs("div", { className: "flex items-center gap-3 p-2 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer", onClick: () => setShowFullManager(true), children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center flex-shrink-0", children: _jsx(Calendar, { className: "h-4 w-4 text-[#FFD700]" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-sm font-medium text-white truncate", children: event.title }), event.isVirtual && (_jsx(Badge, { variant: "secondary", className: "text-xs bg-blue-500/20 text-blue-400", children: "Virtual" }))] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-neutral-400", children: [_jsx("span", { children: formatDate(event.startDate) }), _jsx("span", { children: "\u2022" }), _jsxs("span", { className: getCapacityColor(event.currentAttendees, event.maxCapacity), children: [event.currentAttendees, event.maxCapacity && `/${event.maxCapacity}`] })] })] }), _jsx("div", { className: cn("px-2 py-1 rounded-full text-xs capitalize", getStatusColor(event.status)), children: event.status })] }, event.id))) }), filteredEvents.length === 0 && (_jsxs("div", { className: "text-center py-4 text-neutral-400 text-sm", children: ["No ", quickViewMode, " events"] }))] }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-5 w-5 text-[#FFD700]" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: "Event Manager" }), _jsxs(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: [previewEvents.length, " events"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [isLeader && (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "border-green-500/30 text-green-400 hover:bg-green-500/10", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Create"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export"] })] })), _jsxs(Button, { variant: "secondary", size: "sm", onClick: () => setShowFullManager(true), className: "border-white/20 text-white hover:bg-white/10", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "Manage All"] })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-green-400", children: previewEvents.filter(e => e.status === 'published').length }), _jsx("div", { className: "text-xs text-neutral-400", children: "Published" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: previewEvents.reduce((sum, e) => sum + e.currentAttendees, 0) }), _jsx("div", { className: "text-xs text-neutral-400", children: "Total RSVPs" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-purple-400", children: previewEvents.filter(e => e.status === 'draft').length }), _jsx("div", { className: "text-xs text-neutral-400", children: "Drafts" })] }), _jsxs("div", { className: "text-center p-3 bg-white/[0.02] rounded-lg", children: [_jsxs("div", { className: "text-lg font-bold text-yellow-400", children: [Math.round(previewEvents.reduce((sum, e) => sum + (e.analytics?.conversationRate || 0), 0) / previewEvents.length * 100), "%"] }), _jsx("div", { className: "text-xs text-neutral-400", children: "Avg Conversion" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-neutral-400", children: "Quick view:" }), ['upcoming', 'popular', 'recent'].map((mode) => (_jsxs(Button, { variant: quickViewMode === mode ? "primary" : "secondary", size: "sm", onClick: () => setQuickViewMode(mode), className: cn("text-xs capitalize", quickViewMode === mode && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30"), children: [mode === 'upcoming' && _jsx(Calendar, { className: "h-3 w-3 mr-1" }), mode === 'popular' && _jsx(TrendingUp, { className: "h-3 w-3 mr-1" }), mode === 'recent' && _jsx(Activity, { className: "h-3 w-3 mr-1" }), mode] }, mode)))] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: filteredEvents.map((event) => (_jsxs(motion.div, { className: "p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-colors cursor-pointer", onClick: () => setShowFullManager(true), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white truncate", children: event.title }), event.isVirtual && (_jsx(Badge, { variant: "secondary", className: "text-xs bg-blue-500/20 text-blue-400", children: "Virtual" }))] }), _jsx("p", { className: "text-xs text-neutral-400 line-clamp-2 mb-2", children: event.description })] }), _jsx("div", { className: cn("px-2 py-1 rounded-full text-xs capitalize ml-2", getStatusColor(event.status)), children: event.status })] }), _jsxs("div", { className: "space-y-2 mb-3 text-xs text-neutral-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: formatDate(event.startDate) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { className: "truncate", children: event.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { className: getCapacityColor(event.currentAttendees, event.maxCapacity), children: [event.currentAttendees, event.maxCapacity && `/${event.maxCapacity}`, " attending"] })] })] }), _jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: event.tags.slice(0, 2).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs bg-purple-500/20 text-purple-300", children: tag }, tag))) }), leaderMode === 'insights' && event.analytics && (_jsx(motion.div, { className: "mb-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, children: _jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-blue-400", children: event.analytics.views }), _jsx("div", { className: "text-xs text-neutral-400", children: "Views" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-bold text-green-400", children: event.analytics.clicks }), _jsx("div", { className: "text-xs text-neutral-400", children: "Clicks" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm font-bold text-purple-400", children: [Math.round(event.analytics.conversationRate * 100), "%"] }), _jsx("div", { className: "text-xs text-neutral-400", children: "Conv." })] })] }) })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-1", children: event.status === 'published' && (_jsxs(Button, { variant: "secondary", size: "sm", className: "text-xs border-green-500/30 text-green-400 hover:bg-green-500/10", onClick: (e) => {
                                            e.stopPropagation();
                                            onEventAction?.(event.id, 'rsvp');
                                        }, children: [_jsx(UserCheck, { className: "h-3 w-3 mr-1" }), "RSVP"] })) }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onEventAction?.(event.id, 'share');
                                            }, children: _jsx(Share2, { className: "h-3 w-3" }) }), isLeader && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                e.stopPropagation();
                                                onEventAction?.(event.id, 'analytics');
                                            }, children: _jsx(BarChart3, { className: "h-3 w-3" }) }))] })] })] }, event.id))) }), _jsx(AnimatePresence, { children: showFullManager && (_jsx(motion.div, { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setShowFullManager(false), children: _jsxs(motion.div, { className: "bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/[0.06]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Calendar, { className: "h-6 w-6 text-[#FFD700]" }), _jsx("h2", { className: "text-xl font-semibold text-white", children: "Event Manager" }), _jsx(Badge, { variant: "info", className: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30", children: space.name })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => setShowFullManager(false), className: "border-white/20 text-white hover:bg-white/10", children: "\u2715" })] }), _jsx("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-120px)]", children: _jsx(EventManagerTool, { spaceId: space.id, spaceName: space.name, isLeader: isLeader, currentUserRole: currentUserRole, leaderMode: leaderMode, onEventAction: onEventAction, authenticatedFetch: authenticatedFetch }) })] }) })) })] }));
}
//# sourceMappingURL=event-manager-widget.js.map