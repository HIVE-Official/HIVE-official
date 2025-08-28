"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Users, Zap, Calendar, Award, Info, Heart, Eye, MoreHorizontal, Settings, Filter, Trash2 } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { cn } from '../../lib/utils';
export function NotificationSystem({ notifications, unreadCount, isOpen, onClose, onMarkAsRead, onMarkAllAsRead, onArchive, onDelete, onAction, className }) {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    const getFilteredNotifications = () => {
        switch (activeTab) {
            case 'unread':
                return notifications.filter(n => !n.isRead && !n.isArchived);
            case 'social':
                return notifications.filter(n => n.type === 'social' && !n.isArchived);
            case 'system':
                return notifications.filter(n => n.type === 'system' && !n.isArchived);
            default:
                return notifications.filter(n => !n.isArchived);
        }
    };
    const filteredNotifications = getFilteredNotifications();
    const unreadInCurrentTab = filteredNotifications.filter(n => !n.isRead).length;
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'social': return _jsx(Heart, { className: "h-4 w-4 text-pink-400" });
            case 'space': return _jsx(Users, { className: "h-4 w-4 text-blue-400" });
            case 'tool': return _jsx(Zap, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" });
            case 'calendar': return _jsx(Calendar, { className: "h-4 w-4 text-green-400" });
            case 'achievement': return _jsx(Award, { className: "h-4 w-4 text-yellow-400" });
            case 'system': return _jsx(Info, { className: "h-4 w-4 text-purple-400" });
            default: return _jsx(Bell, { className: "h-4 w-4 text-hive-text-secondary" });
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'border-l-red-500';
            case 'high': return 'border-l-orange-400';
            case 'medium': return 'border-l-yellow-400';
            default: return 'border-l-transparent';
        }
    };
    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
        if (diffInSeconds < 60)
            return 'Just now';
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800)
            return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return time.toLocaleDateString();
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-40", onClick: onClose }), _jsx(motion.div, { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { type: 'spring', damping: 30, stiffness: 300 }, className: cn("fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-hive-background-primary border-l border-hive-border-subtle z-50 overflow-hidden", className), children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-hive-border-subtle bg-hive-surface-elevated/50", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Bell, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("h2", { className: "text-lg font-semibold text-hive-text-primary", children: "Notifications" }), unreadCount > 0 && (_jsx(Badge, { className: "bg-red-500 text-[var(--hive-text-primary)]", children: unreadCount }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [unreadInCurrentTab > 0 && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onMarkAllAsRead, children: [_jsx(Check, { className: "h-4 w-4 mr-1" }), "Mark all read"] })), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, children: _jsx(X, { className: "h-4 w-4" }) })] })] }), _jsx("div", { className: "px-4 py-3 border-b border-hive-border-subtle", children: _jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, children: _jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-hive-surface-elevated", children: [_jsxs(TabsTrigger, { value: "all", className: "text-xs", children: ["All", notifications.filter(n => !n.isArchived).length > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 h-4 w-4 p-0 text-xs", children: notifications.filter(n => !n.isArchived).length }))] }), _jsxs(TabsTrigger, { value: "unread", className: "text-xs", children: ["Unread", unreadCount > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 h-4 w-4 p-0 text-xs bg-red-500 text-[var(--hive-text-primary)]", children: unreadCount }))] }), _jsx(TabsTrigger, { value: "social", className: "text-xs", children: "Social" }), _jsx(TabsTrigger, { value: "system", className: "text-xs", children: "System" })] }) }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredNotifications.length === 0 ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "flex flex-col items-center justify-center h-64 text-center px-6", children: [_jsx(Bell, { className: "h-12 w-12 text-hive-text-secondary mb-4" }), _jsx("h3", { className: "text-lg font-medium text-hive-text-primary mb-2", children: "All caught up!" }), _jsx("p", { className: "text-hive-text-secondary", children: activeTab === 'unread'
                                                    ? "No unread notifications"
                                                    : "No notifications in this category" })] })) : (_jsx("div", { className: "space-y-1 p-2", children: filteredNotifications.map((notification) => (_jsx(NotificationItem, { notification: notification, onMarkAsRead: onMarkAsRead, onArchive: onArchive, onDelete: onDelete, onAction: onAction, getNotificationIcon: getNotificationIcon, getPriorityColor: getPriorityColor, formatTimeAgo: formatTimeAgo }, notification.id))) })) }) }), _jsx("div", { className: "p-4 border-t border-hive-border-subtle bg-hive-surface-elevated/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Settings"] }), _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] })] }) })] }) })] })) }));
}
function NotificationItem({ notification, onMarkAsRead, onArchive, onDelete, onAction, getNotificationIcon, getPriorityColor, formatTimeAgo }) {
    const [showActions, setShowActions] = useState(false);
    return (_jsx(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 }, children: _jsx(Card, { className: cn("cursor-pointer transition-all duration-200 hover:bg-hive-surface-elevated/50", "border-l-4", getPriorityColor(notification.priority), !notification.isRead && "bg-[var(--hive-brand-secondary)]/5 border-hive-gold/20"), children: _jsxs(CardContent, { className: "p-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: notification.sender ? (_jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: notification.sender.avatar, alt: notification.sender.name }), _jsx(AvatarFallback, { className: "text-xs", children: notification.sender.name.split(' ').map(n => n[0]).join('') })] })) : (_jsx("div", { className: "w-8 h-8 bg-hive-surface-elevated rounded-full flex items-center justify-center", children: getNotificationIcon(notification.type) })) }), _jsxs("div", { className: "flex-1 min-w-0", onClick: () => onAction(notification), children: [_jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [_jsx("h4", { className: cn("text-sm font-medium line-clamp-2", notification.isRead ? "text-hive-text-secondary" : "text-hive-text-primary"), children: notification.title }), _jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [!notification.isRead && (_jsx("div", { className: "w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full" })), _jsx(Button, { variant: "ghost", size: "sm", className: "h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity", onClick: (e) => {
                                                            e.stopPropagation();
                                                            setShowActions(!showActions);
                                                        }, children: _jsx(MoreHorizontal, { className: "h-3 w-3" }) })] })] }), _jsx("p", { className: cn("text-xs line-clamp-2 mb-2", notification.isRead ? "text-hive-text-secondary" : "text-hive-text-primary"), children: notification.message }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-hive-text-secondary", children: formatTimeAgo(notification.timestamp) }), notification.actionText && (_jsx(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs text-[var(--hive-brand-secondary)] hover:text-hive-brand-secondary", children: notification.actionText }))] })] })] }), _jsx(AnimatePresence, { children: showActions && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, className: "mt-3 pt-3 border-t border-hive-border-subtle flex items-center gap-2", children: [!notification.isRead && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                        e.stopPropagation();
                                        onMarkAsRead(notification.id);
                                        setShowActions(false);
                                    }, className: "text-xs", children: [_jsx(Check, { className: "h-3 w-3 mr-1" }), "Mark read"] })), _jsxs(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                        e.stopPropagation();
                                        onArchive(notification.id);
                                        setShowActions(false);
                                    }, className: "text-xs", children: [_jsx(Eye, { className: "h-3 w-3 mr-1" }), "Archive"] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                        e.stopPropagation();
                                        onDelete(notification.id);
                                        setShowActions(false);
                                    }, className: "text-xs text-red-400 hover:text-red-300", children: [_jsx(Trash2, { className: "h-3 w-3 mr-1" }), "Delete"] })] })) })] }) }) }));
}
export function NotificationBell({ unreadCount, onClick, className }) {
    return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onClick, className: cn("relative", className), children: [_jsx(Bell, { className: "h-5 w-5" }), unreadCount > 0 && (_jsx(Badge, { className: "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-[var(--hive-text-primary)] border-2 border-hive-background-primary", children: unreadCount > 99 ? '99+' : unreadCount }))] }));
}
// Hook for managing notification state
export function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;
    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };
    const archive = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isArchived: true } : n));
    };
    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };
    const addNotification = (notification) => {
        const newNotification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            isRead: false,
            isArchived: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };
    return {
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        markAsRead,
        markAllAsRead,
        archive,
        deleteNotification,
        addNotification
    };
}
//# sourceMappingURL=notification-system.js.map