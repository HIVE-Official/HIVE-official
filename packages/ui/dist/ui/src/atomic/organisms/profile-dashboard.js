'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Calendar, MapPin, Plus, AlertTriangle, Edit, Trash2, Loader2 } from 'lucide-react';
// Import our sophisticated molecules
import { CampusIdentityHeader } from '../molecules/campus-identity-header';
import { CampusSpacesCard } from '../molecules/campus-spaces-card';
import { CampusActivityFeed } from '../molecules/campus-activity-feed';
import { CampusBuilderTools } from '../molecules/campus-builder-tools';
// Interactive Calendar Widget Component
const InteractiveCalendarWidget = React.memo(({ events, conflicts, isLoading = false, onCreateEvent, onUpdateEvent, onDeleteEvent, onResolveConflict }) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createForm, setCreateForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        type: 'personal',
        location: ''
    });
    const formatTime = useCallback((dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }, []);
    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
        else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        }
        else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }, []);
    const getEventTypeColor = useCallback((type) => {
        switch (type) {
            case 'class': return 'bg-blue-500';
            case 'study': return 'bg-green-500';
            case 'meeting': return 'bg-[var(--hive-gold)]';
            case 'personal': return 'bg-[var(--hive-gold)]';
            default: return 'bg-gray-500';
        }
    }, []);
    const handleCreateEvent = () => {
        if (!createForm.title || !createForm.startDate || !createForm.endDate)
            return;
        onCreateEvent?.({
            title: createForm.title,
            startDate: new Date(createForm.startDate).toISOString(),
            endDate: new Date(createForm.endDate).toISOString(),
            type: createForm.type,
            location: createForm.location
        });
        setCreateForm({
            title: '',
            startDate: '',
            endDate: '',
            type: 'personal',
            location: ''
        });
        setShowCreateForm(false);
    };
    const upcomingEvents = useMemo(() => events
        .filter(event => new Date(event.startDate) > new Date())
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5), [events]);
    return (_jsxs("div", { className: "bg-hive-surface-elevated rounded-xl border border-hive-border-subtle p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h3", { className: "font-semibold text-hive-text-primary flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), _jsx("span", { children: "Calendar" })] }), _jsx("button", { onClick: () => setShowCreateForm(!showCreateForm), className: "p-2 text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-tertiary rounded-lg transition-colors", children: _jsx(Plus, { className: "h-4 w-4" }) })] }), conflicts.length > 0 && (_jsxs("div", { className: "mb-4 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-[var(--hive-gold)]" }), _jsxs("span", { className: "text-sm text-yellow-600", children: [conflicts.length, " scheduling conflict", conflicts.length > 1 ? 's' : '', " detected"] })] }), conflicts.slice(0, 2).map(conflict => (_jsxs("div", { className: "mt-2 text-xs text-yellow-600", children: [_jsx("p", { children: conflict.description }), _jsxs("div", { className: "flex space-x-2 mt-1", children: [_jsx("button", { onClick: () => onResolveConflict?.(conflict.id, 'reschedule', conflict.eventIds[0]), className: "px-2 py-1 bg-[var(--hive-gold)]/20 rounded text-yellow-700 hover:bg-[var(--hive-gold)]/30", children: "Reschedule" }), _jsx("button", { onClick: () => onResolveConflict?.(conflict.id, 'ignore'), className: "px-2 py-1 bg-gray-500/20 rounded text-[var(--hive-text-muted)] hover:bg-gray-500/30", children: "Ignore" })] })] }, conflict.id)))] })), showCreateForm && (_jsxs("div", { className: "mb-4 p-4 bg-hive-background-tertiary rounded-lg space-y-3", children: [_jsx("input", { type: "text", placeholder: "Event title", value: createForm.title, onChange: (e) => setCreateForm(prev => ({ ...prev, title: e.target.value })), className: "w-full px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("input", { type: "datetime-local", value: createForm.startDate, onChange: (e) => setCreateForm(prev => ({ ...prev, startDate: e.target.value })), className: "px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm" }), _jsx("input", { type: "datetime-local", value: createForm.endDate, onChange: (e) => setCreateForm(prev => ({ ...prev, endDate: e.target.value })), className: "px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("select", { value: createForm.type, onChange: (e) => setCreateForm(prev => ({ ...prev, type: e.target.value })), className: "px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm", children: [_jsx("option", { value: "personal", children: "Personal" }), _jsx("option", { value: "class", children: "Class" }), _jsx("option", { value: "study", children: "Study" }), _jsx("option", { value: "meeting", children: "Meeting" })] }), _jsx("input", { type: "text", placeholder: "Location", value: createForm.location, onChange: (e) => setCreateForm(prev => ({ ...prev, location: e.target.value })), className: "px-3 py-2 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary text-sm" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: handleCreateEvent, className: "flex-1 px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm font-medium", children: "Create Event" }), _jsx("button", { onClick: () => setShowCreateForm(false), className: "px-3 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:bg-hive-interactive-hover transition-colors text-sm", children: "Cancel" })] })] })), isLoading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-hive-text-secondary" }) })) : upcomingEvents.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Calendar, { className: "h-12 w-12 text-hive-text-secondary mx-auto mb-3" }), _jsx("p", { className: "text-hive-text-secondary text-sm mb-3", children: "No upcoming events" }), _jsx("button", { onClick: () => setShowCreateForm(true), className: "px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm font-medium", children: "Add Your First Event" })] })) : (_jsx("div", { className: "space-y-3", children: upcomingEvents.map((event) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg hover:bg-hive-interactive-hover transition-colors group", children: [_jsx("div", { className: `w-3 h-8 ${getEventTypeColor(event.type)} rounded` }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium text-hive-text-primary text-sm truncate", children: event.title }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-hive-text-secondary", children: [_jsx("span", { children: formatDate(event.startDate) }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [formatTime(event.startDate), " - ", formatTime(event.endDate)] }), event.location && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { children: event.location })] })] }))] })] }), _jsxs("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1", children: [_jsx("button", { onClick: () => onUpdateEvent?.(event.id, { status: event.status === 'confirmed' ? 'cancelled' : 'confirmed' }), className: "p-1 text-hive-text-secondary hover:text-hive-text-primary transition-colors", children: _jsx(Edit, { className: "h-3 w-3" }) }), _jsx("button", { onClick: () => onDeleteEvent?.(event.id), className: "p-1 text-hive-text-secondary hover:text-red-400 transition-colors", children: _jsx(Trash2, { className: "h-3 w-3" }) })] })] }, event.id))) }))] }));
});
export const ProfileDashboard = ({ user, spaces, activities, availableTools, createdTools, calendarEvents = [], calendarConflicts = [], layout = 'desktop', showBuilder = true, showCalendar = true, isLoading = {}, onAvatarClick, onEditProfile, onSpaceClick, onActivityClick, onToolClick, onCreateTool, onBecomeBuilder, onJoinSpace, onViewAllSpaces, onViewAllActivities, onMuteSpace, onPinSpace, onLeaveSpace, onQuickPost, onJoinToolsWaitlist, onCreateEvent, onUpdateEvent, onDeleteEvent, onResolveConflict, className }) => {
    const [loadedSections, setLoadedSections] = useState(new Set());
    const handleSectionLoad = (section) => {
        setLoadedSections(prev => new Set([...prev, section]));
    };
    // Desktop BentoGrid Layout
    const DesktopLayout = () => (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-3 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('identity'), children: _jsx(CampusIdentityHeader, { user: user, showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('activity'), children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, maxItems: 6, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) })] }), _jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('spaces'), children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces, onMuteSpace: onMuteSpace, onPinSpace: onPinSpace, onLeaveSpace: onLeaveSpace, onQuickPost: onQuickPost }) }), showCalendar && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('calendar'), children: _jsx(InteractiveCalendarWidget, { events: calendarEvents, conflicts: calendarConflicts, isLoading: isLoading.calendar, onCreateEvent: onCreateEvent, onUpdateEvent: onUpdateEvent, onDeleteEvent: onDeleteEvent, onResolveConflict: onResolveConflict }) })), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, onAnimationComplete: () => handleSectionLoad('tools'), children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user?.isBuilder ?? false, isLoading: isLoading.tools, isLocked: true, onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder, onJoinWaitlist: onJoinToolsWaitlist }) }))] })] }));
    // Tablet Layout - 2 Column
    const TabletLayout = () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusIdentityHeader, { user: user, variant: "compact", showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces, onMuteSpace: onMuteSpace, onPinSpace: onPinSpace, onLeaveSpace: onLeaveSpace, onQuickPost: onQuickPost }) }), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user?.isBuilder ?? false, isLoading: isLoading.tools, variant: "compact", isLocked: true, onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder, onJoinWaitlist: onJoinToolsWaitlist }) }))] }), _jsx("div", { className: "space-y-6", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, variant: "compact", maxItems: 8, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) }) })] }));
    // Mobile Layout - Single Column Stack
    const MobileLayout = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusIdentityHeader, { user: user, variant: "compact", showStatus: true, onAvatarClick: onAvatarClick, onEditClick: onEditProfile }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusActivityFeed, { activities: activities, isLoading: isLoading.activities, variant: "compact", maxItems: 5, onActivityClick: onActivityClick, onViewAll: onViewAllActivities }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusSpacesCard, { spaces: spaces, isLoading: isLoading.spaces, variant: "compact", onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace, onViewAll: onViewAllSpaces, onMuteSpace: onMuteSpace, onPinSpace: onPinSpace, onLeaveSpace: onLeaveSpace, onQuickPost: onQuickPost }) }), showBuilder && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }, children: _jsx(CampusBuilderTools, { availableTools: availableTools, createdTools: createdTools, isBuilder: user?.isBuilder ?? false, isLoading: isLoading.tools, variant: "subtle", isLocked: true, onToolClick: onToolClick, onCreateTool: onCreateTool, onBecomeBuilder: onBecomeBuilder, onJoinWaitlist: onJoinToolsWaitlist }) }))] }));
    const getLayout = () => {
        switch (layout) {
            case 'mobile':
                return _jsx(MobileLayout, {});
            case 'tablet':
                return _jsx(TabletLayout, {});
            default:
                return _jsx(DesktopLayout, {});
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, className: cn(
        // HIVE Foundation
        'min-h-screen bg-obsidian', 
        // Responsive padding with HIVE spacing
        'p-4 md:p-6 lg:p-8', 
        // Maximum width constraint
        'max-w-7xl mx-auto', className), children: [_jsxs("div", { className: "fixed inset-0 opacity-[0.02] pointer-events-none", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-2xl" })] }), _jsx("div", { className: "relative z-10", children: getLayout() }), _jsx(AnimatePresence, { children: Object.values(isLoading).some(Boolean) && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "fixed bottom-6 right-6 z-50", children: _jsx("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 px-4 py-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: "w-4 h-4 rounded-full bg-gradient-to-r from-gold to-champagne", animate: {
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }, transition: {
                                        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                                    } }), _jsx("span", { className: "text-platinum text-sm font-medium", children: "Loading campus data..." })] }) }) })) }), _jsx(AnimatePresence, { children: loadedSections.size >= 3 && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { delay: 1 }, className: "fixed bottom-6 left-6 z-50", children: _jsx("div", { className: "rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl border border-emerald-500/20 px-4 py-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]" }), _jsx("span", { className: "text-emerald-400 text-sm font-medium", children: "Profile loaded successfully" })] }) }) })) })] }));
};
// Compound components for specific use cases
export const CompactProfileDashboard = (props) => (_jsx(ProfileDashboard, { ...props, variant: "compact" }));
export const FocusedProfileDashboard = (props) => (_jsx(ProfileDashboard, { ...props, variant: "focused", showBuilder: false }));
export default ProfileDashboard;
//# sourceMappingURL=profile-dashboard.js.map