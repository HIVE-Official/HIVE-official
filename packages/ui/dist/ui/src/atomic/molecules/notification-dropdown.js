'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎯 HIVE Notification Dropdown Component
 *
 * Behavioral Psychology Implementation:
 * - "Someone needs you" framing (relief amplifier)
 * - Social proof messaging
 * - Variable reward scheduling through urgency
 * - 70% completion target optimization
 * - Effortless competence positioning
 */
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Heart, AlertCircle, ChevronDown, CheckCheck, X } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { NotificationItem } from '../atoms/notification-item.js';
const MotionDiv = React.forwardRef(({ animate, transition, initial, exit, layoutId, whileHover, whileTap, className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: className, ...props, children: children })));
MotionDiv.displayName = 'MotionDiv';
const MotionButton = React.forwardRef(({ animate, transition, initial, whileHover, whileTap, className, children, ...props }, ref) => (_jsx("button", { ref: ref, className: className, ...props, children: children })));
MotionButton.displayName = 'MotionButton';
// HIVE Easing Curves
const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1]
};
export const NotificationDropdown = ({ notifications, unreadCount, loading = false, error = null, isOpen, onClose, onMarkAsRead, onMarkAllAsRead, onDeleteNotification, onClearAll, onNavigate, className, }) => {
    const [processingIds, setProcessingIds] = useState(new Set());
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    // Behavioral grouping: Prioritize "someone needs you" notifications
    const groupedNotifications = React.useMemo(() => {
        const urgent = notifications.filter(n => n.priority === 'urgent' || n.category === 'someone_needs_you');
        const social = notifications.filter(n => n.category === 'social_proof' && n.priority !== 'urgent');
        const insider = notifications.filter(n => n.category === 'insider_knowledge' && n.priority !== 'urgent');
        const other = notifications.filter(n => !urgent.includes(n) && !social.includes(n) && !insider.includes(n));
        return { urgent, social, insider, other };
    }, [notifications]);
    // Handle notification action with optimistic updates
    const handleNotificationAction = async (notificationId, action, optimisticUpdate) => {
        setProcessingIds(prev => new Set(prev).add(notificationId));
        try {
            if (optimisticUpdate)
                optimisticUpdate();
            await action();
        }
        catch (error) {
            console.error('Notification action failed:', error);
            // Could show toast error here
        }
        finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(notificationId);
                return newSet;
            });
        }
    };
    // Behavioral psychology: Get contextual empty state message
    const getEmptyStateMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12)
            return "Good morning! No one needs your help right now.";
        if (hour < 17)
            return "All caught up! Your community is thriving.";
        return "Quiet evening! Check back tomorrow for new ways to help.";
    };
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsxs(MotionDiv, { className: cn('absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] z-50', 'bg-hive-background-secondary/95 backdrop-blur-xl', 'border border-hive-border-default rounded-lg', 'shadow-hive-level3 overflow-hidden', className), initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.2, ease: HIVE_EASING.liquid }, children: [_jsx("div", { className: "p-4 border-b border-hive-border-default bg-gradient-to-r from-hive-background-secondary to-hive-background-tertiary/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-hive-text-primary font-semibold font-sans", children: unreadCount > 0 ? 'People Need You' : 'All Caught Up' }), _jsx("p", { className: "text-hive-text-tertiary text-sm font-sans", children: unreadCount > 0
                                            ? `${unreadCount} ${unreadCount === 1 ? 'person needs' : 'people need'} your help`
                                            : 'No urgent requests right now' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [unreadCount > 0 && (_jsx(MotionButton, { className: "text-hive-text-tertiary hover:text-hive-brand-primary text-sm font-medium transition-colors", onClick: onMarkAllAsRead, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, title: "Mark all as read", children: _jsx(CheckCheck, { className: "w-4 h-4" }) })), _jsx(MotionButton, { className: "text-hive-text-tertiary hover:text-hive-text-primary p-1 rounded-md hover:bg-hive-background-tertiary", onClick: onClose, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, title: "Close notifications", children: _jsx(X, { className: "w-4 h-4" }) })] })] }) }), _jsx("div", { className: "max-h-96 overflow-y-auto", children: loading ? (_jsx(NotificationSkeleton, {})) : error ? (_jsxs("div", { className: "p-4 text-center", children: [_jsx(AlertCircle, { className: "w-8 h-8 text-hive-status-error mx-auto mb-2" }), _jsx("p", { className: "text-hive-status-error text-sm", children: error })] })) : notifications.length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(Heart, { className: "w-12 h-12 text-hive-text-tertiary mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-hive-text-secondary font-sans", children: getEmptyStateMessage() }), _jsx("p", { className: "text-hive-text-tertiary text-sm mt-2 font-sans", children: "You're making a difference! \u2728" })] })) : (_jsxs("div", { className: "py-2", children: [groupedNotifications.urgent.length > 0 && (_jsx(NotificationSection, { title: "\uD83C\uDD98 Someone Needs You", notifications: groupedNotifications.urgent, onMarkAsRead: onMarkAsRead, onDeleteNotification: onDeleteNotification, onNavigate: onNavigate, processingIds: processingIds, handleAction: handleNotificationAction })), groupedNotifications.social.length > 0 && (_jsx(NotificationSection, { title: "\uD83C\uDFC6 Social Recognition", notifications: groupedNotifications.social, onMarkAsRead: onMarkAsRead, onDeleteNotification: onDeleteNotification, onNavigate: onNavigate, processingIds: processingIds, handleAction: handleNotificationAction })), groupedNotifications.insider.length > 0 && (_jsx(NotificationSection, { title: "\uD83D\uDCA1 Insider Updates", notifications: groupedNotifications.insider, onMarkAsRead: onMarkAsRead, onDeleteNotification: onDeleteNotification, onNavigate: onNavigate, processingIds: processingIds, handleAction: handleNotificationAction })), groupedNotifications.other.length > 0 && (_jsx(NotificationSection, { title: "\uD83D\uDCEC Other Updates", notifications: groupedNotifications.other, onMarkAsRead: onMarkAsRead, onDeleteNotification: onDeleteNotification, onNavigate: onNavigate, processingIds: processingIds, handleAction: handleNotificationAction }))] })) }), notifications.length > 0 && (_jsx("div", { className: "p-3 border-t border-hive-border-default bg-hive-background-tertiary/30", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-hive-text-tertiary text-xs font-sans", children: [notifications.length, " total notifications"] }), !showClearConfirm ? (_jsx(MotionButton, { className: "text-hive-text-tertiary hover:text-hive-status-error text-xs font-medium transition-colors", onClick: () => setShowClearConfirm(true), whileHover: { scale: 1.05 }, children: "Clear All" })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-hive-text-tertiary text-xs", children: "Sure?" }), _jsx(MotionButton, { className: "text-hive-status-error text-xs font-medium", onClick: () => {
                                            onClearAll();
                                            setShowClearConfirm(false);
                                        }, whileHover: { scale: 1.05 }, children: "Yes" }), _jsx(MotionButton, { className: "text-hive-text-tertiary text-xs font-medium", onClick: () => setShowClearConfirm(false), whileHover: { scale: 1.05 }, children: "No" })] }))] }) }))] }) }));
};
const NotificationSection = ({ title, notifications, onMarkAsRead, onDeleteNotification, onNavigate, processingIds, handleAction, }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (_jsxs("div", { className: "border-b border-hive-border-default/50 last:border-b-0", children: [_jsxs(MotionButton, { className: "w-full px-4 py-2 text-left text-hive-text-secondary text-xs font-medium uppercase tracking-wide flex items-center justify-between hover:bg-hive-background-tertiary/30", onClick: () => setIsCollapsed(!isCollapsed), whileHover: { x: 2 }, children: [_jsxs("span", { children: [title, " (", notifications.length, ")"] }), _jsx(ChevronDown, { className: cn('w-3 h-3 transition-transform', isCollapsed && 'rotate-180') })] }), _jsx(AnimatePresence, { children: !isCollapsed && (_jsx(MotionDiv, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2, ease: HIVE_EASING.silk }, children: notifications.map((notification, index) => (_jsx(NotificationItem, { notification: notification, isProcessing: processingIds.has(notification.id), onMarkAsRead: () => handleAction(notification.id, () => onMarkAsRead(notification.id)), onDelete: () => handleAction(notification.id, () => onDeleteNotification(notification.id)), onNavigate: onNavigate, index: index }, notification.id))) })) })] }));
};
// Loading skeleton
const NotificationSkeleton = () => (_jsx("div", { className: "p-4 space-y-3", children: [...Array(3)].map((_, i) => (_jsxs("div", { className: "flex gap-3 animate-pulse", children: [_jsx("div", { className: "w-8 h-8 bg-hive-background-tertiary rounded-full" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-hive-background-tertiary rounded w-3/4" }), _jsx("div", { className: "h-3 bg-hive-background-tertiary rounded w-1/2" })] })] }, i))) }));
export default NotificationDropdown;
//# sourceMappingURL=notification-dropdown.js.map