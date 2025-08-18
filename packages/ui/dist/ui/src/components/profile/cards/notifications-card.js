'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';
import { Switch } from '../../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../dialog';
import { Bell, Settings, Check, Archive, Users, MessageSquare, Zap, Heart, UserPlus, Star, VolumeX, Clock, AlertCircle, School, BookOpen, Crown } from 'lucide-react';
// Notification Type Configuration
const notificationTypeConfig = {
    space: {
        icon: Users,
        color: 'bg-purple-500',
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-50',
        label: 'Space'
    },
    tool: {
        icon: Zap,
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        label: 'Tool'
    },
    social: {
        icon: Heart,
        color: 'bg-pink-500',
        textColor: 'text-pink-700',
        bgColor: 'bg-pink-50',
        label: 'Social'
    },
    academic: {
        icon: BookOpen,
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        label: 'Academic'
    },
    system: {
        icon: Settings,
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-50',
        label: 'System'
    },
    ritual: {
        icon: Star,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        label: 'Ritual'
    },
    campus: {
        icon: School,
        color: 'bg-indigo-500',
        textColor: 'text-indigo-700',
        bgColor: 'bg-indigo-50',
        label: 'Campus'
    }
};
// Priority Configuration
const priorityConfig = {
    low: { color: 'text-gray-500', bgColor: 'bg-gray-100' },
    medium: { color: 'text-blue-500', bgColor: 'bg-blue-100' },
    high: { color: 'text-orange-500', bgColor: 'bg-orange-100' },
    urgent: { color: 'text-red-500', bgColor: 'bg-red-100' }
};
// Category Icons
const categoryIcons = {
    mention: MessageSquare,
    like: Heart,
    comment: MessageSquare,
    join: UserPlus,
    invite: UserPlus,
    update: Bell,
    reminder: Clock,
    announcement: AlertCircle,
    achievement: Crown
};
// Time formatting
function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1)
        return 'Just now';
    if (diffMins < 60)
        return `${diffMins}m ago`;
    if (diffHours < 24)
        return `${diffHours}h ago`;
    if (diffDays < 7)
        return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
// Notification Item Component
function NotificationItem({ notification, onRead, onArchive, onAction }) {
    const config = notificationTypeConfig[notification.type];
    const TypeIcon = config.icon;
    const CategoryIcon = categoryIcons[notification.category];
    const priority = priorityConfig[notification.priority];
    const handleRead = useCallback(() => {
        if (!notification.isRead) {
            onRead?.(notification.id);
        }
    }, [notification.id, notification.isRead, onRead]);
    const handleAction = useCallback((action, data) => {
        onAction?.(notification.id, action, data);
        if (!notification.isRead) {
            onRead?.(notification.id);
        }
    }, [notification.id, notification.isRead, onAction, onRead]);
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: cn('group relative p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer', notification.isRead
            ? 'bg-white border-[var(--hive-border-primary)]'
            : 'bg-[var(--hive-background-tertiary)] border-[var(--hive-brand-primary)] border-l-4', notification.priority === 'urgent' && 'ring-1 ring-red-200', notification.priority === 'high' && 'ring-1 ring-orange-200'), onClick: handleRead, children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: notification.source.avatar }), _jsx(AvatarFallback, { className: "text-xs", children: notification.source.type === 'system' ? (_jsx(TypeIcon, { className: "w-4 h-4" })) : (notification.source.name.split(' ').map(n => n[0]).join('')) })] }), _jsx("div", { className: cn('absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center', config.color), children: _jsx(CategoryIcon, { className: "w-2.5 h-2.5 text-white" }) })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h4", { className: cn('font-medium text-sm', notification.isRead
                                                    ? 'text-[var(--hive-text-secondary)]'
                                                    : 'text-[var(--hive-text-primary)]'), children: notification.title }), _jsx("p", { className: cn('text-sm mt-0.5 leading-relaxed', notification.isRead
                                                    ? 'text-[var(--hive-text-muted)]'
                                                    : 'text-[var(--hive-text-secondary)]'), children: notification.message })] }), notification.priority !== 'low' && (_jsx("div", { className: cn('w-2 h-2 rounded-full flex-shrink-0 mt-1', priority.color.replace('text-', 'bg-')) }))] }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: formatTimeAgo(notification.timestamp) }), _jsxs(Badge, { variant: "outline", className: "text-xs px-1.5 py-0.5", children: [_jsx(TypeIcon, { className: "w-3 h-3 mr-1" }), notification.source.name] }), notification.expiresAt && notification.expiresAt.getTime() - Date.now() < 24 * 60 * 60 * 1000 && (_jsxs(Badge, { variant: "destructive", className: "text-xs px-1.5 py-0.5", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), "Expires Soon"] }))] }), notification.actionable && notification.actions && (_jsxs("div", { className: "flex gap-2 mt-3", children: [notification.actions.primary && (_jsx(Button, { size: "sm", className: "h-7 px-3 text-xs", onClick: (e) => {
                                            e.stopPropagation();
                                            handleAction(notification.actions.primary.action, notification.actions.primary.data);
                                        }, children: notification.actions.primary.label })), notification.actions.secondary && (_jsx(Button, { size: "sm", variant: "outline", className: "h-7 px-3 text-xs", onClick: (e) => {
                                            e.stopPropagation();
                                            handleAction(notification.actions.secondary.action, notification.actions.secondary.data);
                                        }, children: notification.actions.secondary.label }))] }))] }), _jsx("div", { className: "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsxs("div", { className: "flex gap-1", children: [!notification.isRead && (_jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: (e) => {
                                        e.stopPropagation();
                                        handleRead();
                                    }, title: "Mark as read", children: _jsx(Check, { className: "w-3 h-3" }) })), _jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: (e) => {
                                        e.stopPropagation();
                                        onArchive?.(notification.id);
                                    }, title: "Archive", children: _jsx(Archive, { className: "w-3 h-3" }) })] }) })] }), !notification.isRead && (_jsx("div", { className: "absolute top-3 left-1 w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" }))] }));
}
// Notification Filter Component
function NotificationFilters({ activeFilter, onFilterChange, counts }) {
    const filters = [
        { key: 'all', label: 'All', count: counts.all },
        { key: 'unread', label: 'Unread', count: counts.unread },
        { key: 'space', label: 'Spaces', count: counts.space },
        { key: 'social', label: 'Social', count: counts.social },
        { key: 'academic', label: 'Academic', count: counts.academic }
    ];
    return (_jsx("div", { className: "flex gap-1 overflow-x-auto", children: filters.map(({ key, label, count }) => (_jsxs(Button, { size: "sm", variant: activeFilter === key ? "default" : "ghost", className: "h-6 px-2 text-xs whitespace-nowrap", onClick: () => onFilterChange(key), children: [label, count > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 h-3 px-1 text-xs", children: count }))] }, key))) }));
}
// Notification Settings Dialog
function NotificationSettingsDialog({ isOpen, onOpenChange }) {
    const [settings, setSettings] = useState({
        email: true,
        push: true,
        spaces: true,
        social: true,
        academic: true,
        system: false,
        quiet_hours: true
    });
    const handleSettingChange = useCallback((key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }, []);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Notification Settings" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Delivery" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Push Notifications" })] }), _jsx(Switch, { checked: settings.push, onCheckedChange: (checked) => handleSettingChange('push', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Email Digest" })] }), _jsx(Switch, { checked: settings.email, onCheckedChange: (checked) => handleSettingChange('email', checked) })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Content" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Space Activity" })] }), _jsx(Switch, { checked: settings.spaces, onCheckedChange: (checked) => handleSettingChange('spaces', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Social Interactions" })] }), _jsx(Switch, { checked: settings.social, onCheckedChange: (checked) => handleSettingChange('social', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Academic Updates" })] }), _jsx(Switch, { checked: settings.academic, onCheckedChange: (checked) => handleSettingChange('academic', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Settings, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "System Announcements" })] }), _jsx(Switch, { checked: settings.system, onCheckedChange: (checked) => handleSettingChange('system', checked) })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Quiet Hours" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(VolumeX, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("span", { className: "text-sm", children: "10 PM - 8 AM" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "Pause non-urgent notifications" })] })] }), _jsx(Switch, { checked: settings.quiet_hours, onCheckedChange: (checked) => handleSettingChange('quiet_hours', checked) })] })] })] })] }) }));
}
// Main Notifications Card Component
export function NotificationsCard({ notifications, unreadCount, isEditMode, onNotificationRead, onNotificationArchive, onNotificationAction, onMarkAllRead, onSettingsClick, className }) {
    const [filter, setFilter] = useState('all');
    const [settingsOpen, setSettingsOpen] = useState(false);
    // Filter notifications
    const filteredNotifications = useMemo(() => {
        let filtered = notifications;
        switch (filter) {
            case 'unread':
                filtered = notifications.filter(n => !n.isRead);
                break;
            case 'space':
                filtered = notifications.filter(n => n.type === 'space');
                break;
            case 'social':
                filtered = notifications.filter(n => n.type === 'social');
                break;
            case 'academic':
                filtered = notifications.filter(n => n.type === 'academic');
                break;
            default:
                filtered = notifications;
        }
        return filtered.sort((a, b) => {
            // Sort by priority first, then by timestamp
            const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            return b.timestamp.getTime() - a.timestamp.getTime();
        });
    }, [notifications, filter]);
    // Count notifications by type
    const counts = useMemo(() => {
        return {
            all: notifications.length,
            unread: notifications.filter(n => !n.isRead).length,
            space: notifications.filter(n => n.type === 'space').length,
            social: notifications.filter(n => n.type === 'social').length,
            academic: notifications.filter(n => n.type === 'academic').length
        };
    }, [notifications]);
    const urgentCount = useMemo(() => notifications.filter(n => !n.isRead && n.priority === 'urgent').length, [notifications]);
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: cn('h-full overflow-hidden', className), children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Bell, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), unreadCount > 0 && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center", children: unreadCount > 9 ? '9+' : unreadCount }))] }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Notifications" }), urgentCount > 0 && (_jsxs(Badge, { variant: "destructive", className: "text-xs", children: [urgentCount, " urgent"] }))] }), !isEditMode && (_jsxs("div", { className: "flex gap-1", children: [unreadCount > 0 && (_jsx(Button, { size: "sm", variant: "ghost", className: "h-8 px-2 text-xs", onClick: onMarkAllRead, children: "Mark All Read" })), _jsx(Button, { size: "sm", variant: "ghost", className: "h-8 w-8 p-0", onClick: () => setSettingsOpen(true), children: _jsx(Settings, { className: "w-4 h-4" }) })] }))] }), _jsx(NotificationFilters, { activeFilter: filter, onFilterChange: setFilter, counts: counts })] }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-80", children: _jsx("div", { className: "space-y-2", children: _jsx(AnimatePresence, { children: filteredNotifications.length > 0 ? (filteredNotifications.map((notification) => (_jsx(NotificationItem, { notification: notification, onRead: onNotificationRead, onArchive: onNotificationArchive, onAction: onNotificationAction }, notification.id)))) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-12 text-[var(--hive-text-muted)]", children: [_jsx(Bell, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }), _jsx("p", { className: "text-sm", children: filter === 'unread'
                                                    ? 'All caught up!'
                                                    : filter === 'all'
                                                        ? 'No notifications yet'
                                                        : `No ${filter} notifications` })] })) }) }) }) })] }), _jsx(NotificationSettingsDialog, { isOpen: settingsOpen, onOpenChange: setSettingsOpen })] }));
}
// Default props for development
export const mockNotifications = [
    {
        id: 'notif-1',
        type: 'space',
        category: 'mention',
        title: 'You were mentioned in CS 250 Study Group',
        message: 'Alex Kim mentioned you in a discussion about final exam prep.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: false,
        priority: 'high',
        source: {
            id: 'user-2',
            name: 'Alex Kim',
            type: 'user',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
        },
        actionable: true,
        actions: {
            primary: { label: 'Reply', action: 'reply', data: { spaceId: 'space-cs250' } },
            secondary: { label: 'View', action: 'view', data: { spaceId: 'space-cs250' } }
        },
        metadata: { spaceId: 'space-cs250' }
    },
    {
        id: 'notif-2',
        type: 'academic',
        category: 'reminder',
        title: 'Assignment Due Tomorrow',
        message: 'CSE250 Project 3 is due tomorrow at 11:59 PM.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        priority: 'urgent',
        source: {
            id: 'system-ub',
            name: 'UB Academic',
            type: 'system'
        },
        actionable: true,
        actions: {
            primary: { label: 'Submit', action: 'submit', data: { courseId: 'cse250' } }
        },
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
        id: 'notif-3',
        type: 'social',
        category: 'like',
        title: 'Maria liked your post',
        message: 'Your study tips post received 5 new likes.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: true,
        priority: 'low',
        source: {
            id: 'user-3',
            name: 'Maria Lopez',
            type: 'user',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=64&h=64&fit=crop&crop=face'
        },
        actionable: false
    },
    {
        id: 'notif-4',
        type: 'campus',
        category: 'announcement',
        title: 'UB Hackathon Registration Open',
        message: 'Register now for the biggest hackathon of the semester!',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isRead: false,
        priority: 'medium',
        source: {
            id: 'ub-events',
            name: 'UB Events',
            type: 'system'
        },
        actionable: true,
        actions: {
            primary: { label: 'Register', action: 'register', data: { eventId: 'hackathon2024' } },
            secondary: { label: 'Learn More', action: 'view', data: { url: '/events/hackathon' } }
        }
    },
    {
        id: 'notif-5',
        type: 'ritual',
        category: 'achievement',
        title: 'Streak Achievement!',
        message: 'You completed your 7-day morning meditation streak!',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        isRead: false,
        priority: 'medium',
        source: {
            id: 'ritual-system',
            name: 'HIVE Rituals',
            type: 'system'
        },
        actionable: false
    }
];
//# sourceMappingURL=notifications-card.js.map