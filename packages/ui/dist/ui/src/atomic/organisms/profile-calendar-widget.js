'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Calendar, Clock, MapPin, Plus, ChevronRight, Users, BookOpen, Coffee, Zap, Settings, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
const getEventTypeConfig = (type) => {
    const configs = {
        class: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: BookOpen,
            label: 'Class'
        },
        study: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Zap,
            label: 'Study'
        },
        meeting: {
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            icon: Users,
            label: 'Meeting'
        },
        personal: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Coffee,
            label: 'Personal'
        },
        deadline: {
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            icon: AlertCircle,
            label: 'Deadline'
        }
    };
    return configs[type] || configs.personal;
};
const getAvailabilityConfig = (status) => {
    const configs = {
        available: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            label: 'Available for Study',
            icon: CheckCircle2
        },
        busy: {
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            label: 'Busy',
            icon: AlertCircle
        },
        'in-class': {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            label: 'In Class',
            icon: BookOpen
        },
        studying: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            label: 'Studying',
            icon: Zap
        },
        offline: {
            color: 'text-[var(--hive-text-muted)]',
            bgColor: 'bg-[var(--hive-background-secondary)]',
            label: 'Offline',
            icon: Clock
        }
    };
    return configs[status] || configs.offline;
};
export const ProfileCalendarWidget = ({ user, todayEvents = [], upcomingEvents = [], availabilityStatus = 'available', nextAvailableSlot, studyHoursToday = 0, studyGoal = 6, isEditable = true, onAddEvent, onViewCalendar, onEditEvent, onUpdateAvailability, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const availabilityConfig = getAvailabilityConfig(availabilityStatus);
    const studyProgress = studyGoal > 0 ? Math.min((studyHoursToday / studyGoal) * 100, 100) : 0;
    // Get next event from today's schedule
    const nextEvent = todayEvents.find(event => event.status !== 'completed');
    // Format time for display
    const formatTime = (time) => {
        return new Date(`2024-01-01 ${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "Calendar & Schedule" }), _jsxs(Badge, { variant: "outline", className: cn('text-xs', availabilityConfig.color), children: [_jsx(availabilityConfig.icon, { className: "h-3 w-3 mr-1" }), availabilityConfig.label] })] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onUpdateAvailability, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: cn('p-3 rounded-lg border', availabilityConfig.bgColor, 'border-[var(--hive-border-primary)]'), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(availabilityConfig.icon, { className: cn('h-4 w-4', availabilityConfig.color) }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: availabilityConfig.label })] }), nextAvailableSlot && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Next free: ", nextAvailableSlot] }))] }) }), studyGoal > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", children: "Today's Study Progress" }), _jsxs(Text, { variant: "body-sm", color: "gold", weight: "medium", children: [studyHoursToday, "h / ", studyGoal, "h"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-gold)] rounded-full h-2 transition-all duration-500", style: { width: `${studyProgress}%` } }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: studyProgress >= 100 ? '🎉 Daily goal achieved!' : `${(studyGoal - studyHoursToday).toFixed(1)}h remaining` })] }))] }), nextEvent && (_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Next Event:" }), _jsx("div", { className: cn('p-3 rounded-lg border', getEventTypeConfig(nextEvent.type).bgColor, getEventTypeConfig(nextEvent.type).borderColor), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [(() => {
                                                    const IconComponent = getEventTypeConfig(nextEvent.type).icon;
                                                    return _jsx(IconComponent, { className: cn('h-4 w-4 mt-0.5 flex-shrink-0', getEventTypeConfig(nextEvent.type).color) });
                                                })(), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", className: "truncate", children: nextEvent.title }), _jsxs("div", { className: "flex items-center gap-3 mt-1", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formatTime(nextEvent.startTime), " - ", formatTime(nextEvent.endTime)] })] }), nextEvent.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "truncate", children: nextEvent.location })] }))] }), nextEvent.participants && nextEvent.participants > 1 && (_jsxs("div", { className: "flex items-center gap-1 mt-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [nextEvent.participants, " participants"] })] }))] })] }), isEditable && onEditEvent && (_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onEditEvent(nextEvent.id), className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] flex-shrink-0 ml-2", children: _jsx(ChevronRight, { className: "h-3 w-3" }) }))] }) })] })), todayEvents.length > 1 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Today's Schedule:" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [todayEvents.filter(e => e.status === 'completed').length, "/", todayEvents.length, " completed"] })] }), _jsxs("div", { className: "space-y-1", children: [todayEvents.slice(0, 3).map((event) => {
                                        const config = getEventTypeConfig(event.type);
                                        return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer", onClick: () => isEditable && onEditEvent?.(event.id), children: [_jsx("div", { className: cn('w-2 h-2 rounded-full', config.color.replace('text-', 'bg-')) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: event.title }), _jsx(Text, { variant: "body-xs", color: "secondary", children: formatTime(event.startTime) }), event.status === 'completed' && (_jsx(CheckCircle2, { className: "h-3 w-3 text-green-500" }))] }, event.id));
                                    }), todayEvents.length > 3 && (_jsx("div", { className: "text-center pt-1", children: _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", todayEvents.length - 3, " more events"] }) }))] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onAddEvent && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onAddEvent, className: "flex-1", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Add Event"] })), onViewCalendar && (_jsxs(Button, { variant: "default", size: "sm", onClick: onViewCalendar, className: "flex-1", children: [_jsx(Calendar, { className: "h-3 w-3 mr-1" }), "View Calendar"] })), _jsx(Button, { variant: "ghost", size: "icon", onClick: onViewCalendar, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(ExternalLink, { className: "h-3 w-3" }) })] })] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-calendar-widget.js.map