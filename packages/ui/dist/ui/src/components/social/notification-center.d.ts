/**
 * HIVE Notification Center
 * Real-time notifications with categorization and interactions
 */
import React from 'react';
export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'space_invite' | 'tool_update' | 'event' | 'mention' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    isArchived: boolean;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    actor?: {
        id: string;
        name: string;
        avatar?: string;
        handle?: string;
    };
    target?: {
        type: 'post' | 'comment' | 'space' | 'tool' | 'event';
        id: string;
        title?: string;
    };
    actions?: Array<{
        id: string;
        label: string;
        type: 'primary' | 'secondary';
        action: () => void;
    }>;
    metadata?: Record<string, any>;
}
interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
    unreadCount: number;
    onMarkAsRead?: (notificationId: string) => Promise<void>;
    onMarkAllAsRead?: () => Promise<void>;
    onArchive?: (notificationId: string) => Promise<void>;
    onDelete?: (notificationId: string) => Promise<void>;
    onNotificationClick?: (notification: Notification) => void;
    onSettingsClick?: () => void;
    isLoading?: boolean;
    enableFeatureFlag?: boolean;
}
export declare const NotificationCenter: React.FC<NotificationCenterProps>;
export {};
//# sourceMappingURL=notification-center.d.ts.map