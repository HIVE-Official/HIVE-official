"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, MessageCircle, Heart, Users, Zap, Award, Calendar, AlertCircle, Info, ChevronRight, Filter, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs.js';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};
const notificationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2
        }
    }
};
export function NotificationCenter({ notifications, onNotificationRead, onNotificationAction, onMarkAllRead, onNotificationClick, className = "" }) {
    const [activeTab, setActiveTab] = useState('all');
    const [isExpanded, setIsExpanded] = useState(false);
    // Filter notifications based on active tab
    const filteredNotifications = notifications.filter(notification => {
        switch (activeTab) {
            case 'unread':
                return !notification.isRead;
            case 'mentions':
                return notification.type === 'mention' || notification.type === 'comment';
            case 'achievements':
                return notification.type === 'achievement';
            default:
                return true;
        }
    });
    // Group notifications by priority
    const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
        if (!acc[notification.priority])
            acc[notification.priority] = [];
        acc[notification.priority].push(notification);
        return acc;
    }, {});
    // Get notification icon
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'mention':
            case 'comment':
                return _jsx(MessageCircle, { className: "h-4 w-4" });
            case 'like':
                return _jsx(Heart, { className: "h-4 w-4" });
            case 'space_invite':
                return _jsx(Users, { className: "h-4 w-4" });
            case 'tool_update':
                return _jsx(Zap, { className: "h-4 w-4" });
            case 'achievement':
                return _jsx(Award, { className: "h-4 w-4" });
            case 'reminder':
                return _jsx(Calendar, { className: "h-4 w-4" });
            case 'system':
                return _jsx(Info, { className: "h-4 w-4" });
            default:
                return _jsx(Bell, { className: "h-4 w-4" });
        }
    };
    // Get notification color
    const getNotificationColor = (type, priority) => {
        if (priority === 'urgent')
            return 'text-red-400 bg-red-500/20';
        if (priority === 'high')
            return 'text-orange-400 bg-orange-500/20';
        switch (type) {
            case 'mention':
            case 'comment':
                return 'text-blue-400 bg-blue-500/20';
            case 'like':
                return 'text-pink-400 bg-pink-500/20';
            case 'space_invite':
                return 'text-purple-400 bg-purple-500/20';
            case 'tool_update':
                return 'text-green-400 bg-green-500/20';
            case 'achievement':
                return 'text-yellow-400 bg-yellow-500/20';
            case 'reminder':
                return 'text-indigo-400 bg-indigo-500/20';
            default:
                return 'text-gray-400 bg-gray-500/20';
        }
    };
    // Format time ago
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
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return (_jsxs(Card, { className: `notification-center ${className}`, children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Bell, { className: "h-5 w-5 text-hive-gold" }), _jsx("span", { children: "Notifications" }), unreadCount > 0 && (_jsx(Badge, { variant: "secondary", className: "bg-hive-gold text-hive-obsidian", children: unreadCount }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: onMarkAllRead, disabled: unreadCount === 0, children: [_jsx(Check, { className: "h-4 w-4 mr-1" }), "Mark All Read"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsExpanded(!isExpanded), children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] })] }) }), _jsxs(CardContent, { children: [_jsx(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), className: "mb-4", children: _jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-hive-background-overlay", children: [_jsxs(TabsTrigger, { value: "all", className: "text-xs", children: ["All", _jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: notifications.length })] }), _jsxs(TabsTrigger, { value: "unread", className: "text-xs", children: ["Unread", unreadCount > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 text-xs bg-hive-gold text-hive-obsidian", children: unreadCount }))] }), _jsx(TabsTrigger, { value: "mentions", className: "text-xs", children: "Mentions" }), _jsx(TabsTrigger, { value: "achievements", className: "text-xs", children: "Awards" })] }) }), _jsx(motion.div, { className: "space-y-3 max-h-96 overflow-y-auto custom-scrollbar", variants: containerVariants, initial: "hidden", animate: "visible", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredNotifications.length === 0 ? (_jsxs(motion.div, { className: "text-center py-8", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(Bell, { className: "h-12 w-12 mx-auto mb-4 text-hive-text-mutedLight opacity-50" }), _jsx("p", { className: "text-hive-text-mutedLight", children: activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet' })] })) : (
                            // Render notifications by priority
                            ['urgent', 'high', 'medium', 'low'].map(priority => (groupedNotifications[priority] && (_jsxs("div", { className: "space-y-2", children: [priority === 'urgent' && (_jsxs("div", { className: "flex items-center space-x-2 text-xs text-red-400 font-medium mb-2", children: [_jsx(AlertCircle, { className: "h-3 w-3" }), _jsx("span", { children: "Urgent" })] })), groupedNotifications[priority].map((notification) => (_jsx(NotificationItem, { notification: notification, onRead: onNotificationRead, onAction: onNotificationAction, onClick: onNotificationClick, getIcon: getNotificationIcon, getColor: getNotificationColor, formatTimeAgo: formatTimeAgo }, notification.id)))] }, priority))))) }) }), isExpanded && (_jsxs(motion.div, { className: "mt-4 pt-4 border-t border-hive-border-default space-y-3", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-hive-text-mutedLight", children: "Notification Settings" }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => console.log('Open notification settings'), children: [_jsx(Filter, { className: "h-4 w-4 mr-1" }), "Customize"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { className: "p-2 rounded bg-hive-background-overlay", children: [_jsx("p", { className: "text-white font-medium", children: "Email Notifications" }), _jsx("p", { className: "text-hive-text-mutedLight", children: "Important updates only" })] }), _jsxs("div", { className: "p-2 rounded bg-hive-background-overlay", children: [_jsx("p", { className: "text-white font-medium", children: "Push Notifications" }), _jsx("p", { className: "text-hive-text-mutedLight", children: "All activities" })] })] })] }))] })] }));
}
function NotificationItem({ notification, onRead, onAction, onClick, getIcon, getColor, formatTimeAgo }) {
    return (_jsx(motion.div, { variants: notificationVariants, layout: true, className: `notification-item p-3 rounded-lg border transition-all duration-200 cursor-pointer group hover:bg-hive-background-interactive ${notification.isRead
            ? 'bg-hive-background-overlay border-hive-border-default opacity-70'
            : 'bg-hive-background-overlay border-hive-border-default hover:border-hive-gold/30'}`, onClick: () => onClick(notification), children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getColor(notification.type, notification.priority)}`, children: getIcon(notification.type) }), _jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: `text-sm font-medium transition-colors ${notification.isRead ? 'text-hive-text-mutedLight' : 'text-white group-hover:text-hive-gold'}`, children: notification.title }), _jsxs("div", { className: "flex items-center space-x-2", children: [!notification.isRead && (_jsx("div", { className: "w-2 h-2 bg-hive-gold rounded-full animate-pulse" })), _jsx("span", { className: "text-xs text-hive-text-mutedLight", children: formatTimeAgo(notification.timestamp) })] })] }), _jsx("p", { className: `text-sm transition-colors ${notification.isRead ? 'text-hive-text-mutedLight' : 'text-hive-silver'}`, children: notification.message }), (notification.metadata?.spaceName || notification.metadata?.toolName) && (_jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [notification.metadata.spaceName && (_jsx(Badge, { variant: "outline", className: "text-xs", children: notification.metadata.spaceName })), notification.metadata.toolName && (_jsx(Badge, { variant: "outline", className: "text-xs", children: notification.metadata.toolName }))] }))] }), _jsxs("div", { className: "flex-shrink-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [!notification.isRead && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                onRead(notification.id);
                            }, className: "h-6 w-6 p-0", children: _jsx(Check, { className: "h-3 w-3" }) })), notification.actionUrl && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                onAction(notification.id, 'navigate');
                            }, className: "h-6 w-6 p-0", children: _jsx(ChevronRight, { className: "h-3 w-3" }) }))] })] }) }));
}
export default NotificationCenter;
//# sourceMappingURL=notification-center.js.map