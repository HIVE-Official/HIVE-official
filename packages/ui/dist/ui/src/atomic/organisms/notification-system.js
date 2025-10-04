'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🔔 HIVE Complete Notification System
 *
 * Integrated notification system combining:
 * - Real-time notification bell with behavioral psychology
 * - Dropdown with "someone needs you" framing
 * - Toast manager for urgent alerts
 * - Seamless integration with existing UI
 */
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotificationBell } from '../atoms/notification-bell.js';
import { NotificationDropdown } from '../molecules/notification-dropdown.js';
import { NotificationToastManager } from '../molecules/notification-toast-manager.js';
const MotionDiv = React.forwardRef(({ animate, transition, initial, exit, className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: className, ...props, children: children })));
MotionDiv.displayName = 'MotionDiv';
export const NotificationSystem = ({ notifications: propNotifications, unreadCount: propUnreadCount, loading = false, error = null, onNavigate, className, disabled = false, }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
    const dropdownRef = useRef(null);
    // Mock notifications for demo (in production, use useRealtimeNotifications hook)
    const mockNotifications = propNotifications || [
        {
            id: '1',
            title: 'Sarah needs help with calculus',
            message: 'She\'s stuck on derivatives and you helped her before!',
            type: 'help_request',
            priority: 'urgent',
            category: 'someone_needs_you',
            isRead: false,
            timestamp: { toDate: () => new Date(Date.now() - 5 * 60 * 1000) },
            actionUrl: '/spaces/math-help/posts/calc-derivatives',
            actionText: 'Help Now',
            metadata: {
                senderName: 'Sarah Chen',
                avatarUrl: '/api/placeholder/32/32',
                urgencyLevel: 'immediate'
            },
            urgencyLevel: 'immediate',
            socialProofText: '2 others are also helping',
        },
        {
            id: '2',
            title: 'You\'re now a Top Contributor!',
            message: 'Your insights in Computer Science spaces are making a real impact.',
            type: 'achievement',
            priority: 'medium',
            category: 'social_proof',
            isRead: false,
            timestamp: { toDate: () => new Date(Date.now() - 30 * 60 * 1000) },
            actionUrl: '/profile/achievements',
            actionText: 'View Achievement',
            exclusivityText: 'You\'re in the top 5% of contributors',
        },
        {
            id: '3',
            title: 'New study group: Database Design',
            message: 'CS majors are forming a study group for the midterm. Early access for active members!',
            type: 'space',
            priority: 'medium',
            category: 'insider_knowledge',
            isRead: false,
            timestamp: { toDate: () => new Date(Date.now() - 2 * 60 * 60 * 1000) },
            actionUrl: '/spaces/cs-database-design',
            actionText: 'Join Group',
            exclusivityText: 'You\'re among the first to know',
        },
        {
            id: '4',
            title: 'Mike wants to connect',
            message: 'You have 3 mutual connections and similar interests in Engineering.',
            type: 'connection',
            priority: 'medium',
            category: 'social_proof',
            isRead: true,
            timestamp: { toDate: () => new Date(Date.now() - 24 * 60 * 60 * 1000) },
            actionUrl: '/profile/connections/requests',
            actionText: 'View Request',
            metadata: {
                senderName: 'Mike Rodriguez',
                avatarUrl: '/api/placeholder/32/32'
            },
            socialProofText: '3 mutual connections',
        },
    ];
    const notifications = mockNotifications;
    const unreadCount = propUnreadCount ?? notifications.filter(n => !n.isRead).length;
    const hasUrgent = notifications.some(n => n.priority === 'urgent' && !n.isRead);
    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen]);
    // Update previous count for toast manager
    useEffect(() => {
        setPreviousNotificationCount(notifications.length);
    }, [notifications.length]);
    // Notification action handlers
    const handleMarkAsRead = async (notificationId) => {
        console.log('Marking notification as read:', notificationId);
        // In production: await markAsRead(notificationId);
    };
    const handleMarkAllAsRead = async () => {
        console.log('Marking all notifications as read');
        // In production: await markAllAsRead();
    };
    const handleDeleteNotification = async (notificationId) => {
        console.log('Deleting notification:', notificationId);
        // In production: await deleteNotification(notificationId);
    };
    const handleClearAll = async () => {
        console.log('Clearing all notifications');
        // In production: await clearAll();
    };
    const handleBellClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };
    return (_jsxs("div", { className: className, ref: dropdownRef, children: [_jsx(NotificationBell, { unreadCount: unreadCount, loading: loading, hasError: !!error, hasUrgent: hasUrgent, onClick: handleBellClick, disabled: disabled, "aria-label": `Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}` }), _jsx(AnimatePresence, { children: isDropdownOpen && (_jsx(NotificationDropdown, { notifications: notifications, unreadCount: unreadCount, loading: loading, error: error, isOpen: isDropdownOpen, onClose: handleDropdownClose, onMarkAsRead: handleMarkAsRead, onMarkAllAsRead: handleMarkAllAsRead, onDeleteNotification: handleDeleteNotification, onClearAll: handleClearAll, onNavigate: onNavigate })) }), _jsx(NotificationToastManager, { notifications: notifications, previousCount: previousNotificationCount, onNavigate: onNavigate })] }));
};
// Hook version for easy integration with real data
export const useNotificationSystem = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // In production, this would use the real hook:
    // const {
    //   notifications,
    //   unreadCount,
    //   loading,
    //   error,
    //   markAsRead,
    //   markAllAsRead,
    //   deleteNotification,
    //   clearAll,
    // } = useRealtimeNotifications();
    return {
        // Mock data for development
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null,
        isDropdownOpen,
        setIsDropdownOpen,
        // Mock handlers
        markAsRead: async (id) => console.log('Mark as read:', id),
        markAllAsRead: async () => console.log('Mark all as read'),
        deleteNotification: async (id) => console.log('Delete:', id),
        clearAll: async () => console.log('Clear all'),
    };
};
export default NotificationSystem;
//# sourceMappingURL=notification-system.js.map