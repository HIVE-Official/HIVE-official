export interface HiveNotification {
    id: string;
    type: 'mention' | 'like' | 'comment' | 'space_invite' | 'tool_update' | 'achievement' | 'reminder' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    actionUrl?: string;
    imageUrl?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    metadata?: {
        userId?: string;
        userName?: string;
        spaceId?: string;
        spaceName?: string;
        toolId?: string;
        toolName?: string;
        achievementId?: string;
        eventId?: string;
    };
}
interface NotificationCenterProps {
    notifications: HiveNotification[];
    onNotificationRead: (notificationId: string) => void;
    onNotificationAction: (notificationId: string, action: string) => void;
    onMarkAllRead: () => void;
    onNotificationClick: (notification: HiveNotification) => void;
    className?: string;
}
export declare function NotificationCenter({ notifications, onNotificationRead, onNotificationAction, onMarkAllRead, onNotificationClick, className }: NotificationCenterProps): import("react/jsx-runtime").JSX.Element;
export default NotificationCenter;
//# sourceMappingURL=notification-center.d.ts.map