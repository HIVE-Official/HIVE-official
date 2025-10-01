'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * 🎯 HIVE Notification Toast Manager
 *
 * Behavioral Psychology Implementation:
 * - High-priority "someone needs you" alerts
 * - Variable reward scheduling for engagement
 * - Relief amplifier design patterns
 * - Smooth, non-intrusive animations
 */
import React, { useEffect, useCallback } from 'react';
import { useToast } from '../../systems/modal-toast-system';
export const NotificationToastManager = ({ notifications, previousCount = 0, onNavigate, shouldShowToast, }) => {
    const { showToast } = useToast();
    // Default filter for toast-worthy notifications
    const defaultShouldShowToast = useCallback((notification) => {
        // Only show toasts for high-priority, unread notifications
        if (notification.isRead)
            return false;
        // Behavioral criteria: "Someone needs you" gets immediate toast
        if (notification.category === 'someone_needs_you')
            return true;
        // High/urgent priority notifications
        if (notification.priority === 'urgent' || notification.priority === 'high')
            return true;
        // Direct connections (friend requests, mentions)
        if (notification.type === 'connection')
            return true;
        return false;
    }, []);
    // Create behavioral toast message
    const createToastFromNotification = useCallback((notification) => {
        const baseToast = {
            id: `toast-${notification.id}`,
            title: notification.title,
            message: notification.message,
            type: 'info',
            duration: 5000,
            urgencyLevel: notification.urgencyLevel === 'immediate' ? 'immediate' : 'high',
            category: notification.category,
        };
        // Behavioral customization based on category
        switch (notification.category) {
            case 'someone_needs_you':
                return {
                    ...baseToast,
                    type: 'warning',
                    title: '🆘 Someone Needs You',
                    message: notification.message,
                    duration: 8000, // Longer duration for help requests
                    action: notification.actionUrl ? {
                        label: 'Help Now',
                        onClick: () => onNavigate?.(notification.actionUrl)
                    } : undefined,
                };
            case 'social_proof':
                return {
                    ...baseToast,
                    type: 'success',
                    title: '🏆 ' + notification.title,
                    duration: 4000,
                    action: notification.actionUrl ? {
                        label: 'See More',
                        onClick: () => onNavigate?.(notification.actionUrl)
                    } : undefined,
                };
            case 'insider_knowledge':
                return {
                    ...baseToast,
                    type: 'info',
                    title: '💡 ' + notification.title,
                    duration: 6000,
                    action: notification.actionUrl ? {
                        label: 'Check It Out',
                        onClick: () => onNavigate?.(notification.actionUrl)
                    } : undefined,
                };
            default:
                return {
                    ...baseToast,
                    action: notification.actionUrl ? {
                        label: notification.actionText || 'View',
                        onClick: () => onNavigate?.(notification.actionUrl)
                    } : undefined,
                };
        }
    }, [onNavigate]);
    // Monitor for new notifications and show toasts
    useEffect(() => {
        const currentCount = notifications.length;
        // Only check for new notifications if count increased
        if (currentCount <= previousCount)
            return;
        // Get the most recent notifications (new ones)
        const recentNotifications = notifications
            .slice(0, currentCount - previousCount)
            .filter(notification => {
            const filter = shouldShowToast || defaultShouldShowToast;
            return filter(notification);
        });
        // Show toasts for qualifying notifications
        recentNotifications.forEach((notification, index) => {
            // Stagger toasts to avoid overwhelming the user
            setTimeout(() => {
                const toastData = createToastFromNotification(notification);
                showToast(toastData);
            }, index * 500); // 500ms delay between toasts
        });
    }, [notifications, previousCount, showToast, shouldShowToast, defaultShouldShowToast, createToastFromNotification]);
    // This component doesn't render anything visible
    return null;
};
// Hook for easy integration
export const useNotificationToasts = (notifications, onNavigate, shouldShowToast) => {
    const [previousCount, setPreviousCount] = React.useState(notifications.length);
    // Update previous count when notifications change
    React.useEffect(() => {
        setPreviousCount(prev => {
            // Only update if the count actually increased (new notifications)
            return notifications.length > prev ? prev : notifications.length;
        });
    }, [notifications.length]);
    return {
        ToastManager: () => (_jsx(NotificationToastManager, { notifications: notifications, previousCount: previousCount, onNavigate: onNavigate, shouldShowToast: shouldShowToast })),
        currentCount: notifications.length,
        previousCount,
    };
};
// Behavioral toast presets
export const createUrgentHelpToast = (senderName, helpType, actionUrl, onNavigate) => ({
    id: `urgent-help-${Date.now()}`,
    title: '🆘 Urgent Help Request',
    message: `${senderName} really needs help with ${helpType}`,
    type: 'warning',
    duration: 10000, // Long duration for urgent requests
    urgencyLevel: 'immediate',
    category: 'someone_needs_you',
    action: {
        label: 'Help Now',
        onClick: () => onNavigate(actionUrl)
    }
});
export const createSocialProofToast = (achievement, percentile, actionUrl, onNavigate) => ({
    id: `achievement-${Date.now()}`,
    title: '🏆 Achievement Unlocked!',
    message: `${achievement} - You're in the top ${percentile}%`,
    type: 'success',
    duration: 6000,
    category: 'social_proof',
    action: actionUrl && onNavigate ? {
        label: 'Celebrate',
        onClick: () => onNavigate(actionUrl)
    } : undefined
});
export const createInsiderToast = (updateTitle, exclusivityText, actionUrl, onNavigate) => ({
    id: `insider-${Date.now()}`,
    title: '💡 Exclusive Update',
    message: `${updateTitle} - ${exclusivityText}`,
    type: 'info',
    duration: 7000,
    category: 'insider_knowledge',
    action: actionUrl && onNavigate ? {
        label: 'Explore',
        onClick: () => onNavigate(actionUrl)
    } : undefined
});
export default NotificationToastManager;
//# sourceMappingURL=notification-toast-manager.js.map