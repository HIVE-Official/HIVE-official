/**
 * Social Calendar Card - Social Schedule Sharing
 * Displays today's schedule with social context and group coordination
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calendar, MapPin, Users, UserPlus, UserCheck, UserX, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';
export function SocialCalendarCard({ events = [], freeUntil, availabilityStatus = 'available', onEventAction, onAddEvent, onConnectCalendar, className }) {
    const [expandedEvent, setExpandedEvent] = useState(null);
    const todayEvents = events.filter(event => {
        const today = new Date().toDateString();
        return new Date(event.time).toDateString() === today;
    }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'class': return '📚';
            case 'study': return '📖';
            case 'social': return '🎉';
            case 'meeting': return '💼';
            case 'exam': return '📝';
            default: return '📅';
        }
    };
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'class': return 'var(--campus-blue)';
            case 'study': return 'var(--social-green)';
            case 'social': return 'var(--campus-blue)';
            case 'meeting': return 'var(--alert-orange)';
            case 'exam': return '#EF4444';
            default: return 'var(--text-tertiary)';
        }
    };
    const getAvailabilityMessage = () => {
        if (freeUntil) {
            return `Free until ${freeUntil} • Available for study`;
        }
        switch (availabilityStatus) {
            case 'available': return 'Available for collaboration';
            case 'studying': return 'Currently studying';
            case 'busy': return 'Busy with classes';
            case 'do-not-disturb': return 'Do not disturb';
            default: return '';
        }
    };
    const handleEventAction = (eventId, action) => {
        onEventAction?.(eventId, action);
    };
    return (_jsxs(motion.div, { className: cn("social-profile-card", butterClasses.card, className), style: { gridArea: 'calendar' }, initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center", children: _jsx(Calendar, { size: 20, className: "text-white" }) }), _jsx("div", { children: _jsxs("h3", { className: "profile-heading text-primary", children: ["\uD83D\uDCC5 TODAY \u2022 ", new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'short',
                                            day: 'numeric'
                                        })] }) })] }), _jsx(motion.button, { onClick: onConnectCalendar, className: cn("text-tertiary hover:text-primary", butterClasses.button), whileHover: { scale: 1.05, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }, whileTap: { scale: 0.98, transition: { duration: 0.2 } }, children: _jsx(Settings, { size: 16 }) })] }), getAvailabilityMessage() && (_jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 mb-6", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-green-400" }), _jsxs("span", { className: "profile-caption text-green-400", children: ["\uD83D\uDCA1 ", getAvailabilityMessage()] })] })), _jsx("div", { className: "space-y-5", children: todayEvents.length === 0 ? (_jsxs(motion.div, { className: "text-center py-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsx(Calendar, { size: 48, className: "text-tertiary mx-auto mb-4 opacity-50" }), _jsx("p", { className: "profile-body text-tertiary mb-4", children: "No events scheduled for today" }), _jsxs(motion.button, { onClick: onAddEvent, className: cn("social-action-button secondary", butterClasses.button), children: [_jsx(UserPlus, { size: 16 }), "Add Event"] })] })) : (_jsx(motion.div, { initial: "hidden", animate: "visible", variants: {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }, children: todayEvents.map((event, index) => (_jsxs(motion.div, { variants: {
                            hidden: { opacity: 0, y: 24, scale: 0.98 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                        }, className: cn("group relative p-5 rounded-xl border border-white/8 hover:border-white/16 cursor-pointer", butterClasses.listItem, getStaggerClass(index)), onClick: () => setExpandedEvent(expandedEvent === event.id ? null : event.id), whileHover: { y: -3, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, children: [_jsxs("div", { className: "flex items-start gap-5", children: [_jsxs("div", { className: "flex flex-col items-center min-w-[60px]", children: [_jsxs("div", { className: "profile-caption font-semibold text-primary", children: ["\u23F0 ", event.time] }), event.endTime && (_jsx("div", { className: "profile-fine text-tertiary", children: event.endTime }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-lg", children: getEventTypeIcon(event.type) }), _jsx("h4", { className: "profile-body font-semibold text-primary", children: event.title }), event.isRecurring && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Recurring" }))] }), event.location && (_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(MapPin, { size: 14, className: "text-tertiary" }), _jsxs("span", { className: "profile-caption text-secondary", children: ["\uD83C\uDFDB\uFE0F ", event.location, event.room && ` • Room ${event.room}`] })] })), event.professor && (_jsxs("div", { className: "profile-fine text-tertiary mb-2", children: ["\uD83D\uDC68\u200D\uD83C\uDFEB Prof. ", event.professor] })), event.attendees && (_jsxs("div", { className: "flex items-center gap-5 mb-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { size: 14, className: "text-social-green" }), _jsxs("span", { className: "profile-caption text-social-green", children: [event.attendees.going, " going"] })] }), event.attendees.maybe > 0 && (_jsx("div", { className: "flex items-center gap-1", children: _jsxs("span", { className: "profile-caption text-alert-orange", children: [event.attendees.maybe, " maybe"] }) })), event.attendees.spotsLeft && (_jsx("div", { className: "flex items-center gap-1", children: _jsxs("span", { className: "profile-caption text-campus-blue", children: [event.attendees.spotsLeft, " spots left"] }) }))] })), event.friends && event.friends.length > 0 && (_jsxs("div", { className: "social-proof mb-3", children: [_jsx("span", { className: "social-count", children: event.friends[0] }), event.friends.length > 1 && (_jsxs("span", { children: [" and ", event.friends.length - 1, " other", event.friends.length > 2 ? 's' : ''] })), _jsxs("span", { children: [" you know ", event.friends.length === 1 ? 'is' : 'are', " attending"] })] })), event.canJoin && expandedEvent === event.id && (_jsxs("div", { className: "flex gap-2 mt-3", children: [_jsxs(Button, { size: "sm", onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleEventAction(event.id, 'join');
                                                        }, className: "social-action-button", disabled: event.userStatus === 'going', children: [_jsx(UserCheck, { size: 14 }), event.userStatus === 'going' ? 'Going' : 'Join Group'] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleEventAction(event.id, 'maybe');
                                                        }, className: "social-action-button secondary", disabled: event.userStatus === 'maybe', children: [_jsx(UserPlus, { size: 14 }), event.userStatus === 'maybe' ? 'Maybe' : 'Maybe'] }), event.userStatus && event.userStatus !== 'not-going' && (_jsxs(Button, { size: "sm", variant: "outline", onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleEventAction(event.id, 'leave');
                                                        }, className: "text-red-400 border-red-400/20 hover:border-red-400/40", children: [_jsx(UserX, { size: 14 }), "Can't Make It"] }))] }))] }), _jsx("div", { className: "w-1 h-full rounded-full opacity-60", style: { background: getEventTypeColor(event.type) } })] }), event.canJoin && (_jsx("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx("div", { className: "profile-fine text-tertiary", children: expandedEvent === event.id ? 'Click to collapse' : 'Click for options' }) }))] }, event.id))) })) }), _jsx("div", { className: "mt-8 pt-6 border-t border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-social-green" }), _jsx("span", { className: "profile-caption text-secondary", children: "\uD83D\uDD17 Google Calendar \u2022 UB Portal" })] }), _jsx(motion.button, { onClick: onConnectCalendar, className: cn("text-tertiary hover:text-primary", butterClasses.button), whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: "\u2699\uFE0F" })] }) })] }));
}
export default SocialCalendarCard;
//# sourceMappingURL=social-calendar-card.js.map