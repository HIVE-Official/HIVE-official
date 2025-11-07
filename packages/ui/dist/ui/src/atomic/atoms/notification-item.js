'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎯 HIVE Notification Item Component
 *
 * Behavioral Psychology Features:
 * - "Someone needs you" framing for help requests
 * - Social proof messaging for achievements
 * - Effortless competence positioning
 * - Smooth interaction animations
 * - Variable urgency indicators
 */
import React, { useState } from 'react';
import { Clock, Users, Heart, Trash2, ExternalLink, AlertCircle, Sparkles, MessageCircle, Trophy, Eye } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const MotionDiv = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: className, ...props, children: children })));
MotionDiv.displayName = 'MotionDiv';
const MotionButton = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("button", { ref: ref, className: className, ...props, children: children })));
MotionButton.displayName = 'MotionButton';
// HIVE Easing
const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1]
};
export const NotificationItem = ({ notification, isProcessing = false, onMarkAsRead, onDelete, onNavigate, index = 0, className, }) => {
    const [showActions, setShowActions] = useState(false);
    // Get notification icon based on type and category
    const getNotificationIcon = () => {
        const iconClass = "w-5 h-5";
        switch (notification.type) {
            case 'help_request':
                return _jsx(Heart, { className: cn(iconClass, "text-hive-status-error") });
            case 'connection':
                return _jsx(Users, { className: cn(iconClass, "text-hive-brand-primary") });
            case 'space':
                return _jsx(MessageCircle, { className: cn(iconClass, "text-hive-brand-secondary") });
            case 'achievement':
                return _jsx(Trophy, { className: cn(iconClass, "text-hive-brand-primary") });
            case 'system':
                return _jsx(AlertCircle, { className: cn(iconClass, "text-hive-text-tertiary") });
            default:
                return _jsx(Sparkles, { className: cn(iconClass, "text-hive-brand-primary") });
        }
    };
    // Get behavioral messaging
    const getBehavioralMessage = () => {
        const { category, metadata } = notification;
        // "Someone needs you" framing
        if (category === 'someone_needs_you') {
            return {
                prefix: "🆘",
                emphasis: "needs your help",
                context: metadata?.['urgencyLevel'] === 'immediate' ? "Right now" : "Today"
            };
        }
        // Social proof framing
        if (category === 'social_proof') {
            return {
                prefix: "🏆",
                emphasis: "You're recognized!",
                context: metadata?.['exclusivityText'] || "Top contributor"
            };
        }
        // Insider knowledge framing
        if (category === 'insider_knowledge') {
            return {
                prefix: "💡",
                emphasis: "Exclusive update",
                context: "You're among the first to know"
            };
        }
        return null;
    };
    // Get time display with behavioral context
    const getTimeDisplay = () => {
        const now = new Date();
        const notificationTime = notification.timestamp.toDate();
        const diffMs = now.getTime() - notificationTime.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffMins < 1)
            return "Just now";
        if (diffMins < 60)
            return `${diffMins}m ago`;
        if (diffHours < 24)
            return `${diffHours}h ago`;
        if (diffDays < 7)
            return `${diffDays}d ago`;
        return notificationTime.toLocaleDateString();
    };
    // Handle notification click
    const handleClick = () => {
        if (notification.actionUrl && onNavigate) {
            onNavigate(notification.actionUrl);
        }
        if (!notification.isRead) {
            onMarkAsRead();
        }
    };
    const behavioralMessage = getBehavioralMessage();
    return (_jsxs(MotionDiv, { className: cn('relative p-4 hover:bg-hive-background-tertiary/30 transition-all cursor-pointer group', !notification.isRead && 'border-l-2 border-hive-brand-primary bg-hive-brand-primary/5', isProcessing && 'opacity-50 pointer-events-none', className), initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: {
            duration: 0.3,
            delay: index * 0.05,
            ease: HIVE_EASING.silk
        }, onMouseEnter: () => setShowActions(true), onMouseLeave: () => setShowActions(false), onClick: handleClick, whileHover: { x: 2 }, children: [!notification.isRead && (_jsx(MotionDiv, { className: "absolute left-0 top-4 w-2 h-2 bg-hive-brand-primary rounded-full", animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } })), _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-shrink-0", children: notification.metadata?.avatarUrl ? (_jsx("img", { src: notification.metadata.avatarUrl, alt: notification.metadata.senderName || 'User', className: "w-8 h-8 rounded-full border border-hive-border-default" })) : (_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-hive-background-tertiary to-hive-background-secondary border border-hive-border-default flex items-center justify-center", children: getNotificationIcon() })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [behavioralMessage && (_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-xs", children: behavioralMessage.prefix }), _jsx("span", { className: "text-xs text-hive-brand-primary font-medium", children: behavioralMessage.emphasis }), _jsx("span", { className: "text-xs text-hive-text-tertiary", children: behavioralMessage.context })] })), _jsx("h4", { className: cn('font-medium text-sm mb-1 font-sans', notification.isRead ? 'text-hive-text-secondary' : 'text-hive-text-primary'), children: notification.title }), _jsx("p", { className: cn('text-sm mb-2 font-sans line-clamp-2', notification.isRead ? 'text-hive-text-tertiary' : 'text-hive-text-secondary'), children: notification.message }), notification.socialProofText && (_jsxs("p", { className: "text-xs text-hive-brand-secondary mb-2 font-sans", children: ["\uD83D\uDCAA ", notification.socialProofText] })), notification.exclusivityText && (_jsxs("p", { className: "text-xs text-hive-brand-primary mb-2 font-sans", children: ["\u2B50 ", notification.exclusivityText] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-hive-text-tertiary font-sans", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: getTimeDisplay() }), notification.priority === 'urgent' && (_jsx("span", { className: "px-1.5 py-0.5 bg-hive-status-error/20 text-hive-status-error rounded text-xs font-medium", children: "Urgent" })), notification.priority === 'high' && (_jsx("span", { className: "px-1.5 py-0.5 bg-hive-brand-primary/20 text-hive-brand-primary rounded text-xs font-medium", children: "High" }))] }), notification.actionText && notification.actionUrl && (_jsxs(MotionButton, { className: "text-xs text-hive-brand-primary hover:text-hive-brand-secondary font-medium flex items-center gap-1 transition-colors", onClick: (e) => {
                                            e.stopPropagation();
                                            if (onNavigate && notification.actionUrl) {
                                                onNavigate(notification.actionUrl);
                                            }
                                        }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [notification.actionText, _jsx(ExternalLink, { className: "w-3 h-3" })] }))] })] }), _jsxs("div", { className: cn('flex-shrink-0 flex items-start gap-1 transition-opacity', showActions ? 'opacity-100' : 'opacity-0'), children: [!notification.isRead && (_jsx(MotionButton, { className: "p-1 text-hive-text-tertiary hover:text-hive-brand-primary transition-colors rounded", onClick: (e) => {
                                    e.stopPropagation();
                                    onMarkAsRead();
                                }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, title: "Mark as read", children: _jsx(Eye, { className: "w-4 h-4" }) })), _jsx(MotionButton, { className: "p-1 text-hive-text-tertiary hover:text-hive-status-error transition-colors rounded", onClick: (e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, title: "Delete notification", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }), isProcessing && (_jsx(MotionDiv, { className: "absolute inset-0 bg-hive-background-secondary/50 backdrop-blur-sm flex items-center justify-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 }, children: _jsx("div", { className: "w-4 h-4 border-2 border-hive-brand-primary border-t-transparent rounded-full animate-spin" }) }))] }));
};
export default NotificationItem;
//# sourceMappingURL=notification-item.js.map