'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Users, MapPin, Sparkles, Trophy, Target, Zap, Gift, Eye, Bell, Filter, Grid3X3, List } from 'lucide-react';
const RITUAL_TYPE_CONFIG = {
    onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20', label: 'Welcome' },
    seasonal: { icon: CalendarIcon, color: 'text-orange-400', bgColor: 'bg-orange-500/20', label: 'Seasonal' },
    achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', label: 'Achievement' },
    community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Community' },
    creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-500/20', label: 'Creative' },
    emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-500/20', label: 'Emergency' },
    legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', label: 'Legacy' }
};
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export function RitualCalendar({ ritualInstances, onJoinRitual, onSetReminder, onViewDetails, className, view: initialView = 'month', filterType = [], showPastEvents = false, compactMode = false }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState(initialView);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(filterType);
    const [joiningRitual, setJoiningRitual] = useState(null);
    // Filter ritual instances
    const filteredInstances = ritualInstances.filter(instance => {
        const instanceDate = new Date(instance.startTime);
        const now = new Date();
        // Filter by past/future
        if (!showPastEvents && instanceDate < now)
            return false;
        // Filter by type
        if (selectedFilters.length > 0 && !selectedFilters.includes(instance.ritual.type)) {
            return false;
        }
        // Filter by date range based on view
        switch (view) {
            case 'month':
                return instanceDate.getMonth() === currentDate.getMonth() &&
                    instanceDate.getFullYear() === currentDate.getFullYear();
            case 'week':
                const weekStart = new Date(currentDate);
                weekStart.setDate(currentDate.getDate() - currentDate.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return instanceDate >= weekStart && instanceDate <= weekEnd;
            case 'day':
                return instanceDate.toDateString() === currentDate.toDateString();
            case 'list':
                // Show upcoming events for list view
                return instanceDate >= now;
            default:
                return true;
        }
    });
    // Get events for a specific date
    const getEventsForDate = (date) => {
        return filteredInstances.filter(instance => {
            const instanceDate = new Date(instance.startTime);
            return instanceDate.toDateString() === date.toDateString();
        });
    };
    // Handle ritual joining
    const handleJoinRitual = async (ritualId, instanceId) => {
        if (!onJoinRitual || joiningRitual)
            return;
        setJoiningRitual(instanceId);
        try {
            await onJoinRitual(ritualId, instanceId);
        }
        catch (error) {
            console.error('Failed to join ritual:', error);
        }
        finally {
            setJoiningRitual(null);
        }
    };
    // Navigation functions
    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };
    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 7);
        }
        else {
            newDate.setDate(newDate.getDate() + 7);
        }
        setCurrentDate(newDate);
    };
    const navigateDay = (direction) => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 1);
        }
        else {
            newDate.setDate(newDate.getDate() + 1);
        }
        setCurrentDate(newDate);
    };
    const handleNavigate = (direction) => {
        switch (view) {
            case 'month':
                navigateMonth(direction);
                break;
            case 'week':
                navigateWeek(direction);
                break;
            case 'day':
                navigateDay(direction);
                break;
        }
    };
    // Generate calendar days for month view
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();
        const days = [];
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    };
    // Format date for display
    const formatDate = (date, format = 'short') => {
        if (format === 'time') {
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        }
        if (format === 'long') {
            return date.toLocaleDateString([], {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric'
        });
    };
    // Render ritual instance card
    const renderRitualCard = (instance, compact = false) => {
        const config = RITUAL_TYPE_CONFIG[instance.ritual.type];
        const Icon = config.icon;
        const startTime = new Date(instance.startTime);
        const isUpcoming = startTime > new Date();
        const isActive = instance.status === 'active';
        if (compact) {
            return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: cn("p-2 rounded-lg border text-xs", config.bgColor, "border-white/10 hover:border-white/20 transition-all cursor-pointer"), onClick: () => onViewDetails?.(instance.ritualId, instance.id), children: [_jsxs("div", { className: "flex items-center gap-1 mb-1", children: [_jsx(Icon, { className: cn("h-3 w-3", config.color) }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: instance.ritual.title })] }), _jsx("div", { className: "text-[var(--hive-text-secondary)]", children: formatDate(startTime, 'time') })] }, instance.id));
        }
        return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] transition-all", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("p-2 rounded-lg", config.bgColor), children: _jsx(Icon, { className: cn("h-5 w-5", config.color) }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: instance.ritual.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: instance.ritual.description })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [instance.isUserParticipating && (_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full", title: "You're participating" })), instance.reminderSet && (_jsx(Bell, { className: "h-4 w-4 text-[var(--hive-gold)]" }))] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-[var(--hive-text-secondary)] mb-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formatDate(startTime, 'time') }), instance.endTime && (_jsxs("span", { children: [" - ", formatDate(new Date(instance.endTime), 'time')] }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-4 w-4" }), _jsxs("span", { children: [instance.ritual.currentParticipants, instance.ritual.maxParticipants && `/${instance.ritual.maxParticipants}`] })] }), instance.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: instance.location })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: cn("px-2 py-1 rounded text-xs font-medium", config.bgColor, config.color), children: config.label }), isActive && (_jsx("span", { className: "px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400", children: "Live" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [!instance.reminderSet && onSetReminder && isUpcoming && (_jsx("button", { onClick: () => onSetReminder(instance.id), className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/10 rounded-lg transition-all", title: "Set reminder", children: _jsx(Bell, { className: "h-4 w-4" }) })), _jsx("button", { onClick: () => onViewDetails?.(instance.ritualId, instance.id), className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", title: "View details", children: _jsx(Eye, { className: "h-4 w-4" }) }), !instance.isUserParticipating && instance.isUserEligible && isUpcoming && onJoinRitual && (_jsx("button", { onClick: () => handleJoinRitual(instance.ritualId, instance.id), disabled: joiningRitual === instance.id, className: "px-3 py-1.5 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg text-sm font-medium hover:bg-[var(--hive-gold)]/90 disabled:opacity-50", children: joiningRitual === instance.id ? 'Joining...' : 'Join' }))] })] })] }, instance.id));
    };
    return (_jsxs("div", { className: cn("bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)]", className), children: [_jsxs("div", { className: "p-6 border-b border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Ritual Calendar" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: [view === 'month' && MONTHS[currentDate.getMonth()] + ' ' + currentDate.getFullYear(), view === 'week' && 'Week of ' + formatDate(currentDate, 'short'), view === 'day' && formatDate(currentDate, 'long'), view === 'list' && 'Upcoming Rituals'] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex bg-[var(--hive-background-tertiary)] rounded-lg p-1", children: [
                                            { key: 'month', icon: Grid3X3 },
                                            { key: 'week', icon: CalendarIcon },
                                            { key: 'day', icon: Clock },
                                            { key: 'list', icon: List }
                                        ].map(({ key, icon: Icon }) => (_jsx("button", { onClick: () => setView(key), className: cn("p-2 rounded-lg transition-all", view === key
                                                ? "bg-[var(--hive-gold)] text-[var(--hive-black)]"
                                                : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]"), title: key.charAt(0).toUpperCase() + key.slice(1) + ' view', children: _jsx(Icon, { className: "h-4 w-4" }) }, key))) }), view !== 'list' && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => handleNavigate('prev'), className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => setCurrentDate(new Date()), className: "px-3 py-2 text-sm font-medium text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", children: "Today" }), _jsx("button", { onClick: () => handleNavigate('next'), className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsx("div", { className: "flex gap-2 flex-wrap", children: Object.entries(RITUAL_TYPE_CONFIG).map(([type, config]) => {
                                    const Icon = config.icon;
                                    const isSelected = selectedFilters.includes(type);
                                    return (_jsxs("button", { onClick: () => {
                                            setSelectedFilters(prev => isSelected
                                                ? prev.filter(t => t !== type)
                                                : [...prev, type]);
                                        }, className: cn("flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all", isSelected
                                            ? cn(config.bgColor, config.color, "border", "border-current")
                                            : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"), children: [_jsx(Icon, { className: "h-3 w-3" }), config.label] }, type));
                                }) })] })] }), _jsx("div", { className: "p-6", children: _jsxs(AnimatePresence, { mode: "wait", children: [view === 'month' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-7 gap-2", children: WEEKDAYS.map(day => (_jsx("div", { className: "p-2 text-center text-sm font-medium text-[var(--hive-text-secondary)]", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7 gap-2", children: generateCalendarDays().map((date, index) => (_jsx("div", { className: cn("min-h-[120px] p-2 border rounded-lg transition-all", date
                                            ? "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)] cursor-pointer"
                                            : "border-transparent"), onClick: () => date && setSelectedDate(date), children: date && (_jsxs(_Fragment, { children: [_jsx("div", { className: cn("text-sm font-medium mb-2", date.toDateString() === new Date().toDateString()
                                                        ? "text-[var(--hive-gold)]"
                                                        : "text-[var(--hive-text-primary)]"), children: date.getDate() }), _jsxs("div", { className: "space-y-1", children: [getEventsForDate(date).slice(0, 3).map(instance => renderRitualCard(instance, true)), getEventsForDate(date).length > 3 && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] text-center pt-1", children: ["+", getEventsForDate(date).length - 3, " more"] }))] })] })) }, index))) })] }, "month")), view === 'week' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: _jsx("div", { className: "grid grid-cols-7 gap-4", children: Array.from({ length: 7 }, (_, i) => {
                                    const date = new Date(currentDate);
                                    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
                                    const events = getEventsForDate(date);
                                    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm font-medium text-[var(--hive-text-secondary)]", children: WEEKDAYS[i] }), _jsx("div", { className: cn("text-lg font-bold", date.toDateString() === new Date().toDateString()
                                                            ? "text-[var(--hive-gold)]"
                                                            : "text-[var(--hive-text-primary)]"), children: date.getDate() })] }), _jsx("div", { className: "space-y-2", children: events.map(instance => renderRitualCard(instance, true)) })] }, i));
                                }) }) }, "week")), view === 'day' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsx("div", { className: "text-center mb-6", children: _jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: formatDate(currentDate, 'long') }) }), _jsx("div", { className: "space-y-4", children: getEventsForDate(currentDate).length > 0 ? (getEventsForDate(currentDate).map(instance => renderRitualCard(instance))) : (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: [_jsx(CalendarIcon, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No rituals scheduled for this day" })] })) })] }, "day")), view === 'list' && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: filteredInstances.length > 0 ? (_jsx("div", { className: "space-y-4", children: filteredInstances
                                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                                    .map(instance => renderRitualCard(instance)) })) : (_jsxs("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: [_jsx(CalendarIcon, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No upcoming rituals found" }), _jsx("p", { className: "text-sm mt-2", children: "Try adjusting your filters or check back later" })] })) }, "list"))] }) }), _jsx(AnimatePresence, { children: selectedDate && view === 'month' && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", onClick: () => setSelectedDate(null), children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, className: "bg-[var(--hive-background-primary)] rounded-xl border border-[var(--hive-border-subtle)] p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: formatDate(selectedDate, 'long') }), _jsx("button", { onClick: () => setSelectedDate(null), className: "p-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-all", children: "\u2715" })] }), _jsx("div", { className: "space-y-4", children: getEventsForDate(selectedDate).length > 0 ? (getEventsForDate(selectedDate).map(instance => renderRitualCard(instance))) : (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: [_jsx(CalendarIcon, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No rituals scheduled for this day" })] })) })] }) })) })] }));
}
//# sourceMappingURL=ritual-calendar.js.map