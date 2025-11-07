'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * 🔔 HIVE Notification Bell Component
 *
 * Behavioral Psychology Features:
 * - Variable reward pulsing based on notification urgency
 * - "Someone needs you" badge styling (relief amplifier)
 * - Magnetic hover effects for engagement
 * - Smooth state transitions with Framer Motion
 */
import React, { useState, useEffect } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { cn } from '../../lib/utils';
// Create motion components (these should match the shell's motion implementation)
const MotionDiv = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: className, ...props, children: children })));
MotionDiv.displayName = 'MotionDiv';
const MotionButton = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("button", { ref: ref, className: className, ...props, children: children })));
MotionButton.displayName = 'MotionButton';
const MotionSpan = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("span", { ref: ref, className: className, ...props, children: children })));
MotionSpan.displayName = 'MotionSpan';
// HIVE Easing Curves
const HIVE_EASING = {
    liquid: [0.23, 1, 0.32, 1],
    magnetic: [0.25, 0.46, 0.45, 0.94],
    silk: [0.16, 1, 0.3, 1]
};
export const NotificationBell = ({ unreadCount = 0, loading = false, hasError = false, onClick, disabled = false, hasUrgent = false, size = 'md', className, 'aria-label': ariaLabel, }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    // Detect new notifications for behavioral animation
    useEffect(() => {
        if (unreadCount > 0 && !loading) {
            setHasNewNotification(true);
            const timer = setTimeout(() => setHasNewNotification(false), 2000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [unreadCount, loading]);
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7'
    };
    const containerSizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5'
    };
    // Behavioral psychology: Frame badge as "people who need you"
    const getBadgeText = () => {
        if (unreadCount === 0)
            return '';
        if (unreadCount > 99)
            return '99+';
        return unreadCount.toString();
    };
    // Behavioral: Different urgency states
    const getUrgencyState = () => {
        if (hasError)
            return 'error';
        if (hasUrgent)
            return 'urgent';
        if (unreadCount > 5)
            return 'high';
        if (unreadCount > 0)
            return 'medium';
        return 'none';
    };
    const urgencyState = getUrgencyState();
    return (_jsxs(MotionButton, { className: cn('relative text-hive-text-secondary hover:text-hive-text-primary transition-colors', 'focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20 focus:ring-offset-2 focus:ring-offset-hive-background-primary', 'rounded-lg group', containerSizeClasses[size], disabled && 'opacity-50 cursor-not-allowed', className), onClick: onClick, disabled: disabled || loading, onMouseDown: () => setIsPressed(true), onMouseUp: () => setIsPressed(false), onMouseLeave: () => setIsPressed(false), whileHover: !disabled ? { scale: 1.05 } : undefined, whileTap: !disabled ? { scale: 0.95 } : undefined, transition: { duration: 0.15, ease: HIVE_EASING.magnetic }, "aria-label": ariaLabel || `Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`, "aria-pressed": isPressed, children: [(urgencyState === 'urgent' || urgencyState === 'high') && (_jsx(MotionDiv, { className: cn('absolute inset-0 rounded-lg blur-lg', urgencyState === 'urgent' ? 'bg-hive-status-error/30' : 'bg-hive-brand-primary/30'), animate: {
                    opacity: hasNewNotification ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
                    scale: hasNewNotification ? [1, 1.1, 1] : [1, 1.05, 1]
                }, transition: {
                    duration: urgencyState === 'urgent' ? 1 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                } })), _jsx("div", { className: "relative", children: loading ? (_jsx(MotionDiv, { className: cn('rounded-full border-2 border-hive-text-tertiary border-t-hive-brand-primary', sizeClasses[size]), animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } })) : (_jsxs(_Fragment, { children: [hasNewNotification || urgencyState === 'urgent' ? (_jsx(MotionDiv, { animate: {
                                rotate: [-5, 5, -5, 5, 0],
                                scale: hasNewNotification ? [1, 1.1, 1] : 1
                            }, transition: {
                                duration: urgencyState === 'urgent' ? 0.5 : 0.8,
                                repeat: hasNewNotification ? 3 : Infinity,
                                ease: HIVE_EASING.magnetic
                            }, children: _jsx(BellRing, { className: sizeClasses[size] }) })) : (_jsx(Bell, { className: sizeClasses[size] })), unreadCount > 0 && (_jsxs(MotionSpan, { className: "absolute -top-1 -right-1 flex items-center justify-center", initial: { scale: 0 }, animate: { scale: 1 }, transition: {
                                duration: 0.3,
                                ease: HIVE_EASING.magnetic,
                                type: "spring",
                                stiffness: 500,
                                damping: 15
                            }, layoutId: "notification-badge", children: [_jsx(MotionDiv, { className: cn('absolute inset-0 rounded-full blur-sm', urgencyState === 'urgent' && 'bg-hive-status-error', urgencyState === 'high' && 'bg-hive-brand-primary', urgencyState === 'medium' && 'bg-hive-brand-secondary', urgencyState === 'error' && 'bg-hive-status-error'), animate: {
                                        opacity: urgencyState === 'urgent' ? [0.5, 1, 0.5] : 0.6
                                    }, transition: {
                                        duration: urgencyState === 'urgent' ? 1 : 2,
                                        repeat: urgencyState === 'urgent' ? Infinity : 0
                                    } }), _jsx("span", { className: cn('relative text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1', 'text-white shadow-lg', 
                                    // Behavioral color coding
                                    urgencyState === 'urgent' && 'bg-hive-status-error', urgencyState === 'high' && 'bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary', urgencyState === 'medium' && 'bg-hive-brand-primary', urgencyState === 'error' && 'bg-hive-status-error', hasError && 'bg-hive-status-error'), children: hasError ? '!' : getBadgeText() }), hasNewNotification && (_jsx(MotionDiv, { className: cn('absolute inset-0 rounded-full border-2', urgencyState === 'urgent' ? 'border-hive-status-error/50' : 'border-hive-brand-primary/50'), initial: { scale: 1, opacity: 1 }, animate: { scale: 2, opacity: 0 }, transition: { duration: 1, ease: HIVE_EASING.liquid } }))] }))] })) }), _jsx(MotionDiv, { className: "absolute inset-0 bg-hive-background-tertiary/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100", transition: { duration: 0.2 } }), isPressed && (_jsx(MotionDiv, { className: "absolute inset-0 bg-hive-brand-primary/10 rounded-lg", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.1 } }))] }));
};
export default NotificationBell;
//# sourceMappingURL=notification-bell.js.map