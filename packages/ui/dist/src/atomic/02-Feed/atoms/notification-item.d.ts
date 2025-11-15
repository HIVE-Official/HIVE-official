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
import React from 'react';
import { HiveNotification } from '../../../types/notifications';
export interface NotificationItemProps {
    /** Notification data */
    notification: HiveNotification;
    /** Processing state */
    isProcessing?: boolean;
    /** Mark as read handler */
    onMarkAsRead: () => void;
    /** Delete handler */
    onDelete: () => void;
    /** Navigation handler */
    onNavigate?: (url: string) => void;
    /** Animation index for staggered entry */
    index?: number;
    /** Custom className */
    className?: string;
}
export declare const NotificationItem: React.FC<NotificationItemProps>;
export default NotificationItem;
//# sourceMappingURL=notification-item.d.ts.map