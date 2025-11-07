/**
 * 🔔 HIVE Notification Bell Component
 *
 * Behavioral Psychology Features:
 * - Variable reward pulsing based on notification urgency
 * - "Someone needs you" badge styling (relief amplifier)
 * - Magnetic hover effects for engagement
 * - Smooth state transitions with Framer Motion
 */
import React from 'react';
export interface NotificationBellProps {
    /** Number of unread notifications */
    unreadCount?: number;
    /** Loading state */
    loading?: boolean;
    /** Error state */
    hasError?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Disabled state */
    disabled?: boolean;
    /** High priority notifications (triggers urgent animation) */
    hasUrgent?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Custom className */
    className?: string;
    /** Accessibility label */
    'aria-label'?: string;
}
export declare const NotificationBell: React.FC<NotificationBellProps>;
export default NotificationBell;
//# sourceMappingURL=notification-bell.d.ts.map