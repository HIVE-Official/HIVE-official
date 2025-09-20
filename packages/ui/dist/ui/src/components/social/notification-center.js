import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Notification Center
 * Real-time notifications with categorization and interactions
 */
import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar } from '../index';
import { HiveBadge as Badge } from '../index';
import { Bell, X, Check, Users, Heart, MessageCircle, Zap, Calendar, Settings, Archive, Filter, Trash2, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const NotificationItem = ({ notification, onMarkAsRead, onArchive, onDelete, onClick }) => {
    const [showActions, setShowActions] = useState(false);
    const getTypeIcon = () => {
        switch (notification.type) {
            case 'like': return _jsx(Heart, { className: "w-4 h-4 text-[var(--hive-accent)]" });
            case 'comment': return _jsx(MessageCircle, { className: "w-4 h-4 text-blue-500" });
            case 'follow': return _jsx(Users, { className: "w-4 h-4 text-green-500" });
            case 'space_invite': return _jsx(Users, { className: "w-4 h-4 text-purple-500" });
            case 'tool_update': return _jsx(Zap, { className: "w-4 h-4 text-yellow-500" });
            case 'event': return _jsx(Calendar, { className: "w-4 h-4 text-orange-500" });
            case 'mention': return _jsx(MessageCircle, { className: "w-4 h-4 text-pink-500" });
            case 'system': return _jsx(Bell, { className: "w-4 h-4 text-gray-500" });
            default: return _jsx(Bell, { className: "w-4 h-4 text-gray-500" });
        }
    };
    const getPriorityIndicator = () => {
        switch (notification.priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'normal': return 'bg-blue-500';
            case 'low': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days}d ago`;
        if (hours > 0)
            return `${hours}h ago`;
        if (minutes > 0)
            return `${minutes}m ago`;
        return 'Just now';
    };
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: `relative p-4 border-b border-[var(--hive-border-subtle)] hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer group ${!notification.isRead ? 'bg-[var(--hive-primary)]/5' : ''}`, onClick: () => onClick?.(notification), children: [notification.priority !== 'normal' && (_jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 ${getPriorityIndicator()}` })), !notification.isRead && (_jsx("div", { className: "absolute left-2 top-4 w-2 h-2 bg-[var(--hive-primary)] rounded-full" })), _jsxs("div", { className: "flex gap-3 ml-4", children: [_jsx("div", { className: "flex-shrink-0", children: notification.actor?.avatar ? (_jsx(Avatar, { src: notification.actor.avatar, initials: notification.actor.name.charAt(0), size: "sm" })) : (_jsx("div", { className: "w-8 h-8 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center", children: getTypeIcon() })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: notification.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed", children: notification.message }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: formatTimeAgo(notification.timestamp) }), notification.target && (_jsx(Badge, { size: "xs", variant: "secondary", children: notification.target.type }))] })] }), _jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "xs", onClick: (e) => {
                                                    e.stopPropagation();
                                                    setShowActions(!showActions);
                                                }, className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }), _jsx(AnimatePresence, { children: showActions && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, className: "absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]", children: [!notification.isRead && (_jsxs("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                onMarkAsRead?.(notification.id);
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Check, { className: "w-3 h-3" }), "Mark as read"] })), _jsxs("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                onArchive?.(notification.id);
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2", children: [_jsx(Archive, { className: "w-3 h-3" }), "Archive"] }), _jsxs("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                onDelete?.(notification.id);
                                                                setShowActions(false);
                                                            }, className: "w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2 text-[var(--hive-status-error)]", children: [_jsx(Trash2, { className: "w-3 h-3" }), "Delete"] })] })) })] })] }), notification.actions && notification.actions.length > 0 && (_jsx("div", { className: "flex gap-2 mt-3", children: notification.actions.map((action) => (_jsx(Button, { size: "xs", variant: action.type === 'primary' ? 'default' : 'outline', onClick: (e) => {
                                        e.stopPropagation();
                                        action.action();
                                    }, children: action.label }, action.id))) }))] })] })] }));
};
export const NotificationCenter = ({ isOpen, onClose, notifications, unreadCount, onMarkAsRead, onMarkAllAsRead, onArchive, onDelete, onNotificationClick, onSettingsClick, isLoading = false, enableFeatureFlag = true }) => {
    const [filter, setFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            switch (filter) {
                case 'unread':
                    return !notification.isRead;
                case 'mentions':
                    return notification.type === 'mention';
                case 'social':
                    return ['like', 'comment', 'follow'].includes(notification.type);
                default:
                    return !notification.isArchived;
            }
        });
    }, [notifications, filter]);
    const handleNotificationClick = useCallback((notification) => {
        // Mark as read when clicked
        if (!notification.isRead) {
            onMarkAsRead?.(notification.id);
        }
        // Handle navigation
        onNotificationClick?.(notification);
        // Close on mobile
        if (window.innerWidth < 768) {
            onClose();
        }
    }, [onMarkAsRead, onNotificationClick, onClose]);
    if (!isOpen)
        return null;
    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, className: "absolute top-full right-0 mt-2 w-96 max-w-[90vw] bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl shadow-xl z-50 max-h-[80vh] flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Notifications" }), unreadCount > 0 && (_jsx(Badge, { size: "sm", className: "bg-[var(--hive-primary)] text-white", children: unreadCount }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowFilters(!showFilters), children: _jsx(Filter, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onSettingsClick, children: _jsx(Settings, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, children: _jsx(X, { className: "w-4 h-4" }) })] })] }), _jsx(AnimatePresence, { children: showFilters && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, className: "border-b border-[var(--hive-border-subtle)] overflow-hidden", children: _jsxs("div", { className: "p-3 flex gap-2", children: [[
                                { key: 'all', label: 'All' },
                                { key: 'unread', label: 'Unread' },
                                { key: 'mentions', label: 'Mentions' },
                                { key: 'social', label: 'Social' }
                            ].map(map), ") => (", _jsx(Button, { variant: filter === key ? 'default' : 'outline', size: "xs", onClick: () => setFilter(key), children: label }, key), "))}"] }) })) }), unreadCount > 0 && (_jsx("div", { className: "p-3 border-b border-[var(--hive-border-subtle)]", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: onMarkAllAsRead, className: "w-full", children: [_jsx(Check, { className: "w-4 h-4 mr-2" }), "Mark all as read"] }) })), _jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "animate-spin w-6 h-6 border-2 border-[var(--hive-primary)] border-t-transparent rounded-full" }) })) : filteredNotifications.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Bell, { className: "w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: filter === 'all' ? 'No notifications yet' : `No ${filter} notifications` })] })) : (_jsx(AnimatePresence, { mode: "popLayout", children: filteredNotifications.map((notification) => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: onMarkAsRead, onArchive: onArchive, onDelete: onDelete, onClick: handleNotificationClick }, notification.id))) })) }), _jsx("div", { className: "p-3 border-t border-[var(--hive-border-subtle)] text-center", children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-xs", children: "View all notifications" }) })] }));
};
//# sourceMappingURL=notification-center.js.map