"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Bell, X, Check, User, Zap, MessageSquare, Heart, Calendar, Settings } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar.js';
import { cn } from '../../lib/utils.js';
// Mock notifications for demo
const mockNotifications = [
    {
        id: '1',
        type: 'like',
        title: 'New like on your tool',
        message: 'Sarah liked your "Grade Calculator" tool',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        actor: { name: 'Sarah Chen', handle: 'sarahc', avatar: undefined }
    },
    {
        id: '2',
        type: 'comment',
        title: 'New comment',
        message: 'Alex commented on "Study Group Finder"',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actor: { name: 'Alex Rivera', handle: 'alexr', avatar: undefined }
    },
    {
        id: '3',
        type: 'space_invite',
        title: 'Space invitation',
        message: 'You were invited to join "CS Study Group"',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true,
        actor: { name: 'Jamie Park', handle: 'jamiep', avatar: undefined }
    },
    {
        id: '4',
        type: 'tool_feature',
        title: 'Tool featured',
        message: 'Your "Schedule Optimizer" was featured in Productivity Tools!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true
    },
    {
        id: '5',
        type: 'event',
        title: 'Upcoming event',
        message: 'Hackathon kickoff starts in 2 hours',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true
    }
];
const getNotificationIcon = (type) => {
    switch (type) {
        case 'like':
            return Heart;
        case 'comment':
        case 'mention':
            return MessageSquare;
        case 'follow':
            return User;
        case 'space_invite':
            return User;
        case 'tool_feature':
            return Zap;
        case 'event':
            return Calendar;
        case 'system':
            return Settings;
        default:
            return Bell;
    }
};
const formatRelativeTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1)
        return 'Just now';
    if (minutes < 60)
        return `${minutes}m ago`;
    if (hours < 24)
        return `${hours}h ago`;
    return `${days}d ago`;
};
export function NotificationCenter({ isOpen, onClose, notifications = mockNotifications }) {
    const [localNotifications, setLocalNotifications] = useState(notifications);
    const unreadCount = localNotifications.filter(n => !n.read).length;
    const markAsRead = (id) => {
        setLocalNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const markAllAsRead = () => {
        setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 bg-[var(--hive-background-primary)]/20", children: _jsx("div", { className: "w-80 mt-4", children: _jsxs("div", { className: "bg-[color-mix(in_srgb,var(--hive-background-primary)_95%,transparent)] backdrop-blur-xl border border-[color-mix(in_srgb,var(--hive-border-hover)_60%,transparent)] rounded-xl shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Bell, { className: "h-4 w-4" }), _jsx("h3", { className: "font-medium", children: "Notifications" }), unreadCount > 0 && (_jsx("span", { className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] text-xs px-1.5 py-0.5 rounded-full font-medium", children: unreadCount }))] }), _jsxs("div", { className: "flex items-center space-x-1", children: [unreadCount > 0 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: markAllAsRead, className: "h-7 px-2 text-xs hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]", children: [_jsx(Check, { className: "h-3 w-3 mr-1" }), "Mark all read"] })), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "h-7 w-7 p-0 hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]", children: _jsx(X, { className: "h-3 w-3" }) })] })] }), _jsx("div", { className: "max-h-96 overflow-y-auto", children: localNotifications.length === 0 ? (_jsxs("div", { className: "px-4 py-8 text-center text-[var(--hive-text-tertiary)]", children: [_jsx(Bell, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No notifications yet" })] })) : (_jsx("div", { className: "divide-y divide-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: localNotifications.map((notification) => {
                                const Icon = getNotificationIcon(notification.type);
                                const initials = notification.actor?.name
                                    ?.split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .toUpperCase()
                                    .slice(0, 2);
                                return (_jsx("div", { className: cn("px-4 py-3 hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] cursor-pointer transition-colors", !notification.read && "bg-[color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent)]"), onClick: () => markAsRead(notification.id), children: _jsxs("div", { className: "flex space-x-3", children: [_jsx("div", { className: "flex-shrink-0", children: notification.actor ? (_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: notification.actor.avatar }), _jsx(AvatarFallback, { className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] text-xs", children: initials })] })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] flex items-center justify-center", children: _jsx(Icon, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: notification.title }), !notification.read && (_jsx("div", { className: "w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full flex-shrink-0 mt-1" }))] }), _jsx("p", { className: "text-sm text-[var(--hive-text-tertiary)] mt-0.5", children: notification.message }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: formatRelativeTime(notification.timestamp) })] })] }) }, notification.id));
                            }) })) }), _jsx("div", { className: "px-4 py-3 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsx(Button, { variant: "ghost", size: "sm", className: "w-full justify-center text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]", children: "View all notifications" }) })] }) }) }));
}
//# sourceMappingURL=notification-center.js.map