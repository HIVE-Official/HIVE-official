"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, UserX, Clock, Filter, Search, Download, Calendar, MapPin, AlertCircle, CheckCircle, X, Mail, MoreVertical, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../hive-button';
import { Input } from '../../../hive-input';
import { Badge } from '../../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Progress } from '../../../hive-progress';
import { cn } from '../../../../lib/utils';
// Mock data for demonstration
const mockResponses = [
    {
        id: '1',
        userId: 'user1',
        eventId: 'event1',
        status: 'going',
        responseDate: new Date('2024-12-10'),
        guestCount: 2,
        specialRequests: 'Vegetarian meal preferred',
        user: {
            id: 'user1',
            name: 'Sarah Johnson',
            email: 'sarah@university.edu',
            avatar: '/avatars/sarah.jpg',
            profileUrl: '/profile/sarah'
        }
    },
    {
        id: '2',
        userId: 'user2',
        eventId: 'event1',
        status: 'maybe',
        responseDate: new Date('2024-12-11'),
        guestCount: 0,
        user: {
            id: 'user2',
            name: 'Michael Chen',
            email: 'michael@university.edu',
            avatar: '/avatars/michael.jpg',
            profileUrl: '/profile/michael'
        }
    },
    {
        id: '3',
        userId: 'user3',
        eventId: 'event1',
        status: 'going',
        responseDate: new Date('2024-12-09'),
        guestCount: 1,
        checkInTime: new Date('2024-12-14T14:30:00'),
        user: {
            id: 'user3',
            name: 'Emma Rodriguez',
            email: 'emma@university.edu',
            avatar: '/avatars/emma.jpg',
            profileUrl: '/profile/emma'
        }
    },
    {
        id: '4',
        userId: 'user4',
        eventId: 'event1',
        status: 'not_going',
        responseDate: new Date('2024-12-12'),
        guestCount: 0,
        specialRequests: 'Schedule conflict',
        user: {
            id: 'user4',
            name: 'David Kim',
            email: 'david@university.edu',
            avatar: '/avatars/david.jpg',
            profileUrl: '/profile/david'
        }
    },
    {
        id: '5',
        userId: 'user5',
        eventId: 'event1',
        status: 'waitlisted',
        responseDate: new Date('2024-12-13'),
        guestCount: 3,
        user: {
            id: 'user5',
            name: 'Lisa Wang',
            email: 'lisa@university.edu',
            avatar: '/avatars/lisa.jpg',
            profileUrl: '/profile/lisa'
        }
    }
];
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};
export const RSVPManagerTool = ({ eventDetails, config, responses = mockResponses, onRSVPUpdate, onBulkAction, onSendReminder, onExportData, className }) => {
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedResponses, setSelectedResponses] = useState([]);
    const [showActions, setShowActions] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Computed statistics
    const stats = useMemo(() => {
        const going = responses.filter(r => r.status === 'going');
        const maybe = responses.filter(r => r.status === 'maybe');
        const notGoing = responses.filter(r => r.status === 'not_going');
        const waitlisted = responses.filter(r => r.status === 'waitlisted');
        const totalGoing = going.reduce((sum, r) => sum + 1 + r.guestCount, 0);
        const totalCapacity = eventDetails.capacity || 0;
        const attendanceRate = responses.length > 0 ? (going.length / responses.length) * 100 : 0;
        return {
            totalResponses: responses.length,
            going: going.length,
            maybe: maybe.length,
            notGoing: notGoing.length,
            waitlisted: waitlisted.length,
            totalAttendees: totalGoing,
            attendanceRate,
            capacityUsed: totalCapacity > 0 ? (totalGoing / totalCapacity) * 100 : 0,
            checkedIn: responses.filter(r => r.checkInTime).length
        };
    }, [responses, eventDetails.capacity]);
    // Filtered responses
    const filteredResponses = useMemo(() => {
        return responses.filter(response => {
            const matchesSearch = searchQuery === '' ||
                response.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                response.user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || response.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [responses, searchQuery, statusFilter]);
    // Handle response selection
    const toggleResponseSelection = (responseId) => {
        setSelectedResponses(prev => prev.includes(responseId)
            ? prev.filter(id => id !== responseId)
            : [...prev, responseId]);
    };
    const selectAllVisible = () => {
        setSelectedResponses(filteredResponses.map(r => r.id));
    };
    const clearSelection = () => {
        setSelectedResponses([]);
    };
    // Handle bulk actions
    const handleBulkAction = async (action) => {
        if (selectedResponses.length === 0)
            return;
        setIsLoading(true);
        setError(null);
        try {
            await onBulkAction?.(action, selectedResponses);
            clearSelection();
        }
        catch (error) {
            console.error('Bulk action failed:', error);
            setError(error instanceof Error
                ? error.message
                : 'Failed to perform bulk action. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    // Handle reminder sending
    const handleSendReminders = async () => {
        const userIds = selectedResponses.map(id => responses.find(r => r.id === id)?.userId).filter(Boolean);
        if (userIds.length === 0)
            return;
        setIsLoading(true);
        setError(null);
        try {
            await onSendReminder?.(userIds);
            clearSelection();
        }
        catch (error) {
            console.error('Failed to send reminders:', error);
            setError(error instanceof Error
                ? error.message
                : 'Failed to send reminders. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    // Get status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'going':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'maybe':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'not_going':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'waitlisted':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'going':
                return _jsx(UserCheck, { className: "h-4 w-4" });
            case 'maybe':
                return _jsx(Clock, { className: "h-4 w-4" });
            case 'not_going':
                return _jsx(UserX, { className: "h-4 w-4" });
            case 'waitlisted':
                return _jsx(Users, { className: "h-4 w-4" });
            default:
                return _jsx(Users, { className: "h-4 w-4" });
        }
    };
    return (_jsxs(motion.div, { className: cn("rsvp-manager-tool space-y-6", className), variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "bg-gradient-to-br from-[var(--hive-status-success)]/10 to-[var(--hive-status-success)]/5 border-[var(--hive-status-success)]/20", children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-status-success)] rounded-xl flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-bold", children: "RSVP Manager" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Manage attendance for: ", eventDetails.title] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onExportData?.('csv'), children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowActions(!showActions), children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-gray-500" }), _jsxs("span", { children: [new Date(eventDetails.date).toLocaleDateString(), " at ", eventDetails.time] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-gray-500" }), _jsx("span", { children: eventDetails.location })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-4 w-4 text-gray-500" }), _jsxs("span", { children: [stats.totalAttendees, " / ", eventDetails.capacity || '∞', " attendees"] })] })] }) }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Response Overview" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.going }), _jsx("div", { className: "text-sm text-gray-600", children: "Going" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.maybe }), _jsx("div", { className: "text-sm text-gray-600", children: "Maybe" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.notGoing }), _jsx("div", { className: "text-sm text-gray-600", children: "Not Going" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.waitlisted }), _jsx("div", { className: "text-sm text-gray-600", children: "Waitlisted" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.checkedIn }), _jsx("div", { className: "text-sm text-gray-600", children: "Checked In" })] })] }), eventDetails.capacity && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Capacity Used" }), _jsxs("span", { children: [stats.totalAttendees, " / ", eventDetails.capacity] })] }), _jsx(Progress, { value: stats.capacityUsed, className: "h-2" }), stats.capacityUsed > 90 && (_jsxs("div", { className: "flex items-center space-x-1 text-orange-600 text-sm", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx("span", { children: "Event is nearly at capacity" })] }))] }))] })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search attendees...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }) }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsxs(SelectTrigger, { className: "w-full md:w-48", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), _jsx(SelectValue, {})] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Responses" }), _jsx(SelectItem, { value: "going", children: "Going" }), _jsx(SelectItem, { value: "maybe", children: "Maybe" }), _jsx(SelectItem, { value: "not_going", children: "Not Going" }), _jsx(SelectItem, { value: "waitlisted", children: "Waitlisted" })] })] })] }), selectedResponses.length > 0 && (_jsx("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm text-blue-700", children: [selectedResponses.length, " response(s) selected"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", onClick: handleSendReminders, children: [_jsx(Mail, { className: "h-4 w-4 mr-1" }), "Send Reminder"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleBulkAction('export'), children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export Selected"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: clearSelection, children: [_jsx(X, { className: "h-4 w-4 mr-1" }), "Clear"] })] })] }) }))] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { children: ["Responses (", filteredResponses.length, ")"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: selectAllVisible, children: "Select All" }), _jsx(Button, { size: "sm", variant: "outline", onClick: clearSelection, children: "Clear" })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsx(AnimatePresence, { mode: "popLayout", children: filteredResponses.map(response => (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: cn("p-4 border rounded-lg transition-all hover:shadow-md", selectedResponses.includes(response.id) && "border-blue-500 bg-blue-50"), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", checked: selectedResponses.includes(response.id), onChange: () => toggleResponseSelection(response.id), className: "rounded" }), _jsxs(Avatar, { className: "h-10 w-10", children: [_jsx(AvatarImage, { src: response.user.avatar, alt: response.user.name }), _jsx(AvatarFallback, { children: response.user.name.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "font-semibold", children: response.user.name }), response.checkInTime && (_jsx(Badge, { variant: "outline", className: "text-xs bg-green-50 text-green-700", children: "Checked In" }))] }), _jsx("p", { className: "text-sm text-gray-600", children: response.user.email }), response.guestCount > 0 && (_jsxs("p", { className: "text-xs text-gray-500", children: ["+", response.guestCount, " guest", response.guestCount > 1 ? 's' : ''] }))] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Badge, { variant: "outline", className: cn("text-xs", getStatusStyle(response.status)), children: [getStatusIcon(response.status), _jsx("span", { className: "ml-1 capitalize", children: response.status.replace('_', ' ') })] }), _jsx("div", { className: "text-xs text-gray-500", children: response.responseDate.toLocaleDateString() }), _jsx(Button, { size: "sm", variant: "ghost", className: "h-8 w-8 p-0", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] })] }), response.specialRequests && (_jsxs("div", { className: "mt-2 pt-2 border-t text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Note: " }), response.specialRequests] }))] }, response.id))) }), filteredResponses.length === 0 && (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Users, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }), _jsx("p", { children: "No responses found matching your criteria" })] }))] }) })] }) }), _jsx(AnimatePresence, { children: showActions && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Actions" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleBulkAction('send_reminder'), className: "h-auto p-4 flex flex-col items-center space-y-2", children: [_jsx(Mail, { className: "h-6 w-6" }), _jsx("span", { className: "text-xs", children: "Send Reminders" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => onExportData?.('csv'), className: "h-auto p-4 flex flex-col items-center space-y-2", children: [_jsx(Download, { className: "h-6 w-6" }), _jsx("span", { className: "text-xs", children: "Export List" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleBulkAction('promote_waitlist'), className: "h-auto p-4 flex flex-col items-center space-y-2", children: [_jsx(UserPlus, { className: "h-6 w-6" }), _jsx("span", { className: "text-xs", children: "Promote Waitlist" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleBulkAction('check_in_all'), className: "h-auto p-4 flex flex-col items-center space-y-2", children: [_jsx(CheckCircle, { className: "h-6 w-6" }), _jsx("span", { className: "text-xs", children: "Mass Check-in" })] })] }) })] }) })) })] }));
};
export default RSVPManagerTool;
//# sourceMappingURL=RSVPManagerTool.js.map