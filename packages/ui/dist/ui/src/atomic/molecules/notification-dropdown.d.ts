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
import React from 'react';
import { HiveNotification } from '../../types/notifications';
export interface NotificationDropdownProps {
    /** Array of notifications */
    notifications: HiveNotification[];
    /** Unread count */
    unreadCount: number;
    /** Loading state */
    loading?: boolean;
    /** Error state */
    error?: string | null;
    /** Dropdown open state */
    isOpen: boolean;
    /** Close dropdown handler */
    onClose: () => void;
    /** Mark notification as read */
    onMarkAsRead: (notificationId: string) => Promise<void>;
    /** Mark all as read */
    onMarkAllAsRead: () => Promise<void>;
    /** Delete notification */
    onDeleteNotification: (notificationId: string) => Promise<void>;
    /** Clear all notifications */
    onClearAll: () => Promise<void>;
    /** Navigation handler */
    onNavigate?: (url: string) => void;
    /** Custom className */
    className?: string;
}
export declare const NotificationDropdown: React.FC<NotificationDropdownProps>;
export default NotificationDropdown;
//# sourceMappingURL=notification-dropdown.d.ts.map