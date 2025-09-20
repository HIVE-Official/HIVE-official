"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Users, Search, Download, Mail, UserCheck, UserX, AlertCircle, CheckCircle, MessageSquare, MoreVertical, Eye } from 'lucide-react';
const RSVPStatusBadge = ({ status }) => {
    const config = {
        yes: { label: 'Going', variant: 'default', className: 'bg-green-100 text-green-800 border-green-200' },
        no: { label: 'Not Going', variant: 'outline', className: 'bg-red-100 text-red-800 border-red-200' },
        maybe: { label: 'Maybe', variant: 'outline', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    };
    const { label, className } = config[status];
    return (_jsx(HiveBadge, { className: className, children: label }));
};
const AttendeeRow = ({ rsvp, onUpdateStatus, onToggleCheckin, onMessage, showActions = true }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-sm", children: rsvp.userAvatar ? (_jsx("img", { src: rsvp.userAvatar, alt: rsvp.userName, className: "w-full h-full rounded-full object-cover" })) : (rsvp.userName.charAt(0).toUpperCase()) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("p", { className: "font-medium text-gray-900 truncate", children: rsvp.userName }), rsvp.checkedIn && (_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" }))] }), _jsx("p", { className: "text-sm text-gray-500 truncate", children: rsvp.userEmail }), rsvp.guestCount > 0 && (_jsxs("p", { className: "text-xs text-gray-400", children: ["+", rsvp.guestCount, " guest", rsvp.guestCount > 1 ? 's' : ''] }))] }), _jsx(RSVPStatusBadge, { status: rsvp.status }), _jsxs("div", { className: "text-xs text-gray-400 text-right", children: [_jsx("p", { children: new Date(rsvp.respondedAt).toLocaleDateString() }), _jsxs("p", { children: [new Date(rsvp.respondedAt).toLocaleTimeString(toLocaleTimeString), ")"] })] })] }), showActions && (_jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => setShowDetails(!showDetails), children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx("div", { className: "relative", children: _jsx(HiveButton, { size: "sm", variant: "outline", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) })] }))] }), showDetails && (_jsxs("div", { className: "px-4 py-3 bg-gray-50 border-b border-gray-100", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "RSVP Details" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Status:" }), " ", rsvp.status] }), _jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Guests:" }), " ", rsvp.guestCount] }), _jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Responded:" }), " ", new Date(rsvp.respondedAt).toLocaleString()] }), rsvp.checkedIn && (_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Checked in:" }), " ", rsvp.checkedInAt ? new Date(rsvp.checkedInAt).toLocaleString() : 'Yes'] }))] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Additional Info" }), _jsxs("div", { className: "space-y-1", children: [rsvp.dietaryRestrictions && (_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Dietary:" }), " ", rsvp.dietaryRestrictions] })), rsvp.accessibilityNeeds && (_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Accessibility:" }), " ", rsvp.accessibilityNeeds] })), rsvp.comments && (_jsxs("p", { children: [_jsx("span", { className: "text-gray-500", children: "Comments:" }), " ", rsvp.comments] }))] })] })] }), rsvp.guestNames && rsvp.guestNames.length > 0 && (_jsxs("div", { className: "mt-3 pt-3 border-t border-gray-200", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Guest Names" }), _jsx("div", { className: "flex flex-wrap gap-2", children: rsvp.guestNames.map((name, index) => (_jsx(HiveBadge, { variant: "outline", className: "text-xs", children: name }, index))) })] })), _jsxs("div", { className: "mt-3 pt-3 border-t border-gray-200 flex gap-2", children: [_jsxs(HiveButton, { size: "sm", variant: "outline", onClick: () => onMessage(rsvp.userId), children: [_jsx(MessageSquare, { className: "w-3 h-3 mr-1" }), "Message"] }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => onToggleCheckin(rsvp.id), children: rsvp.checkedIn ? (_jsxs(_Fragment, { children: [_jsx(UserX, { className: "w-3 h-3 mr-1" }), "Undo Check-in"] })) : (_jsxs(_Fragment, { children: [_jsx(UserCheck, { className: "w-3 h-3 mr-1" }), "Check In"] })) })] })] }))] }));
};
export function RSVPManagerTool({ event, onUpdateEvent, onMessageAttendees, onExportRSVPs }) {
    const [rsvps, setRSVPs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [checkinFilter, setCheckinFilter] = useState('all');
    const [selectedRSVPs, setSelectedRSVPs] = useState([]);
    const [showMessageModal, setShowMessageModal] = useState(false);
    // Mock data - replace with API call
    useEffect(() => {
        const fetchRSVPs = async () => {
            setLoading(true);
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockRSVPs = [
                    {
                        id: 'rsvp_1',
                        eventId: event.id,
                        userId: 'user_1',
                        spaceId: event.spaceId,
                        status: 'yes',
                        guestCount: 1,
                        guestNames: ['Alex Smith'],
                        dietaryRestrictions: 'Vegetarian',
                        respondedAt: new Date('2024-01-15T10:30:00Z'),
                        checkedIn: true,
                        checkedInAt: new Date('2024-01-20T18:00:00Z'),
                        noShow: false,
                        userName: 'Sarah Johnson',
                        userEmail: 'sarah.johnson@university.edu',
                        userAvatar: undefined
                    },
                    {
                        id: 'rsvp_2',
                        eventId: event.id,
                        userId: 'user_2',
                        spaceId: event.spaceId,
                        status: 'yes',
                        guestCount: 0,
                        accessibilityNeeds: 'Wheelchair accessible entrance',
                        respondedAt: new Date('2024-01-16T14:20:00Z'),
                        checkedIn: false,
                        noShow: false,
                        userName: 'Michael Chen',
                        userEmail: 'michael.chen@university.edu',
                        userAvatar: undefined
                    },
                    {
                        id: 'rsvp_3',
                        eventId: event.id,
                        userId: 'user_3',
                        spaceId: event.spaceId,
                        status: 'maybe',
                        guestCount: 2,
                        guestNames: ['Jamie Wilson', 'Casey Brown'],
                        comments: 'Will try to make it if I finish my project',
                        respondedAt: new Date('2024-01-17T09:15:00Z'),
                        checkedIn: false,
                        noShow: false,
                        userName: 'Emma Davis',
                        userEmail: 'emma.davis@university.edu',
                        userAvatar: undefined
                    },
                    {
                        id: 'rsvp_4',
                        eventId: event.id,
                        userId: 'user_4',
                        spaceId: event.spaceId,
                        status: 'no',
                        guestCount: 0,
                        comments: 'Have a conflicting exam',
                        respondedAt: new Date('2024-01-18T16:45:00Z'),
                        checkedIn: false,
                        noShow: false,
                        userName: 'David Rodriguez',
                        userEmail: 'david.rodriguez@university.edu',
                        userAvatar: undefined
                    }
                ];
                setRSVPs(mockRSVPs);
            }
            catch (error) {
                console.error('Failed to fetch RSVPs:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRSVPs();
    }, [event.id]);
    // Calculate statistics
    const stats = useMemo(() => {
        const total = rsvps.length;
        const yes = rsvps.filter(r => r.status === 'yes').length;
        const no = rsvps.filter(r => r.status === 'no').length;
        const maybe = rsvps.filter(r => r.status === 'maybe').length;
        const checkedIn = rsvps.filter(r => r.checkedIn).length;
        const noShow = rsvps.filter(r => r.noShow).length;
        return {
            total,
            yes,
            no,
            maybe,
            pending: 0, // Would come from invited but not responded
            checkedIn,
            noShow,
            waitlist: event.capacity ? Math.max(0, yes - event.capacity) : 0
        };
    }, [rsvps, event.capacity]);
    // Filter RSVPs
    const filteredRSVPs = useMemo(() => {
        return rsvps.filter(rsvp => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!rsvp.userName.toLowerCase().includes(query) &&
                    !rsvp.userEmail.toLowerCase().includes(query)) {
                    return false;
                }
            }
            // Status filter
            if (statusFilter !== 'all' && rsvp.status !== statusFilter) {
                return false;
            }
            // Check-in filter
            if (checkinFilter === 'checked_in' && !rsvp.checkedIn) {
                return false;
            }
            if (checkinFilter === 'not_checked_in' && rsvp.checkedIn) {
                return false;
            }
            return true;
        });
    }, [rsvps, searchQuery, statusFilter, checkinFilter]);
    const handleUpdateRSVPStatus = useCallback((rsvpId, status) => {
        setRSVPs(prev => prev.map(rsvp => rsvp.id === rsvpId ? { ...rsvp, status, respondedAt: new Date() } : rsvp));
    }, []);
    const handleToggleCheckin = useCallback((rsvpId) => {
        setRSVPs(prev => prev.map(rsvp => rsvp.id === rsvpId ? {
            ...rsvp,
            checkedIn: !rsvp.checkedIn,
            checkedInAt: !rsvp.checkedIn ? new Date() : undefined
        } : rsvp));
    }, []);
    const handleMessageAttendee = useCallback((userId) => {
        // Open messaging interface for specific user
        console.log('Message user:', userId);
    }, []);
    const handleBulkMessage = useCallback(() => {
        if (selectedRSVPs.length === 0)
            return;
        setShowMessageModal(true);
    }, [selectedRSVPs]);
    const handleExport = useCallback((format) => {
        onExportRSVPs?.(format);
    }, [onExportRSVPs]);
    if (loading) {
        return (_jsxs("div", { className: "p-8 text-center", children: [_jsx("div", { className: "w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading RSVPs..." })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "RSVP Manager" }), _jsx("p", { className: "text-gray-600", children: "Manage event attendance and communicate with attendees" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(HiveButton, { variant: "outline", onClick: () => handleExport('csv'), children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export CSV"] }), _jsxs(HiveButton, { variant: "outline", onClick: handleBulkMessage, disabled: selectedRSVPs.length === 0, children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), "Message Selected (", selectedRSVPs.length, ")"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6", children: [_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: stats.total }), _jsx("div", { className: "text-sm text-gray-500", children: "Total RSVPs" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.yes }), _jsx("div", { className: "text-sm text-gray-500", children: "Going" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.maybe }), _jsx("div", { className: "text-sm text-gray-500", children: "Maybe" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.no }), _jsx("div", { className: "text-sm text-gray-500", children: "Not Going" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.checkedIn }), _jsx("div", { className: "text-sm text-gray-500", children: "Checked In" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: stats.noShow }), _jsx("div", { className: "text-sm text-gray-500", children: "No Shows" })] }), event.capacity && (_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.waitlist }), _jsx("div", { className: "text-sm text-gray-500", children: "Waitlist" })] }))] }), event.capacity && stats.yes > event.capacity && (_jsx("div", { className: "mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-orange-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-orange-800", children: "Over Capacity" }), _jsxs("p", { className: "text-sm text-orange-700", children: ["You have ", stats.yes, " confirmed attendees for a capacity of ", event.capacity, ". Consider increasing capacity or managing the waitlist."] })] })] }) }))] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [_jsxs("div", { className: "flex-1 relative max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search attendees...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "yes", children: "Going" }), _jsx("option", { value: "maybe", children: "Maybe" }), _jsx("option", { value: "no", children: "Not Going" })] }), _jsxs("select", { value: checkinFilter, onChange: (e) => setCheckinFilter(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: [_jsx("option", { value: "all", children: "All Attendees" }), _jsx("option", { value: "checked_in", children: "Checked In" }), _jsx("option", { value: "not_checked_in", children: "Not Checked In" })] })] })] }), _jsx(HiveCard, { children: _jsx("div", { className: "divide-y divide-gray-100", children: filteredRSVPs.length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(Users, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No RSVPs Found" }), _jsx("p", { className: "text-gray-500", children: searchQuery ? 'No attendees match your search.' : 'No one has RSVP\'d to this event yet.' })] })) : (_jsxs(_Fragment, { children: [selectedRSVPs.length > 0 && (_jsx("div", { className: "p-4 bg-amber-50 border-b border-amber-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm font-medium text-amber-800", children: [selectedRSVPs.length, " attendee", selectedRSVPs.length > 1 ? 's' : '', " selected"] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { size: "sm", variant: "outline", onClick: handleBulkMessage, children: [_jsx(Mail, { className: "w-3 h-3 mr-1" }), "Message"] }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => setSelectedRSVPs([]), children: "Clear" })] })] }) })), filteredRSVPs.map((rsvp) => (_jsx(AttendeeRow, { rsvp: rsvp, onUpdateStatus: handleUpdateRSVPStatus, onToggleCheckin: handleToggleCheckin, onMessage: handleMessageAttendee }, rsvp.id)))] })) }) }), _jsxs("div", { className: "text-sm text-gray-500 text-center", children: ["Showing ", filteredRSVPs.length, " of ", stats.total, " RSVPs", event.capacity && (_jsxs("span", { children: [" \u2022 Capacity: ", stats.yes, "/", event.capacity] }))] })] }));
}
export default RSVPManagerTool;
//# sourceMappingURL=rsvp-manager-tool.js.map