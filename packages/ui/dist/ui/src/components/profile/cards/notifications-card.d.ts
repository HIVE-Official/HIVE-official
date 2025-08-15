export interface Notification {
    id: string;
    type: 'space' | 'tool' | 'social' | 'academic' | 'system' | 'ritual' | 'campus';
    category: 'mention' | 'like' | 'comment' | 'join' | 'invite' | 'update' | 'reminder' | 'announcement' | 'achievement';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    source: {
        id: string;
        name: string;
        type: 'user' | 'space' | 'tool' | 'system';
        avatar?: string;
    };
    actionable: boolean;
    actions?: {
        primary?: {
            label: string;
            action: string;
            data?: any;
        };
        secondary?: {
            label: string;
            action: string;
            data?: any;
        };
    };
    metadata?: {
        spaceId?: string;
        toolId?: string;
        postId?: string;
        eventId?: string;
        userId?: string;
        url?: string;
    };
    expiresAt?: Date;
}
export interface NotificationsCardProps {
    notifications: Notification[];
    unreadCount: number;
    isEditMode: boolean;
    onNotificationRead?: (id: string) => void;
    onNotificationArchive?: (id: string) => void;
    onNotificationAction?: (id: string, action: string, data?: any) => void;
    onMarkAllRead?: () => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function NotificationsCard({ notifications, unreadCount, isEditMode, onNotificationRead, onNotificationArchive, onNotificationAction, onMarkAllRead, onSettingsClick, className }: NotificationsCardProps): import("react/jsx-runtime").JSX.Element;
export declare const mockNotifications: Notification[];
//# sourceMappingURL=notifications-card.d.ts.map