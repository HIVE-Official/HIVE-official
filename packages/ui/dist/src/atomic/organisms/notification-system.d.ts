/**
 * 🔔 HIVE Complete Notification System
 *
 * Integrated notification system combining:
 * - Real-time notification bell with behavioral psychology
 * - Dropdown with "someone needs you" framing
 * - Toast manager for urgent alerts
 * - Seamless integration with existing UI
 */
import React from 'react';
interface MockNotification {
    id: string;
    title: string;
    message: string;
    type: 'connection' | 'space' | 'help_request' | 'achievement' | 'system';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: 'social_proof' | 'someone_needs_you' | 'insider_knowledge' | 'community_growth';
    isRead: boolean;
    timestamp: {
        toDate: () => Date;
    };
    actionUrl?: string;
    actionText?: string;
    metadata?: any;
    urgencyLevel?: 'immediate' | 'today' | 'this_week';
    socialProofText?: string;
    exclusivityText?: string;
}
export interface NotificationSystemProps {
    /** Custom notifications data (for testing or override) */
    notifications?: MockNotification[];
    /** Unread count override */
    unreadCount?: number;
    /** Loading state */
    loading?: boolean;
    /** Error state */
    error?: string | null;
    /** Navigation handler */
    onNavigate?: (url: string) => void;
    /** Custom className */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}
export declare const NotificationSystem: React.FC<NotificationSystemProps>;
export declare const useNotificationSystem: () => {
    notifications: any[];
    unreadCount: number;
    loading: boolean;
    error: any;
    isDropdownOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    clearAll: () => Promise<void>;
};
export default NotificationSystem;
//# sourceMappingURL=notification-system.d.ts.map