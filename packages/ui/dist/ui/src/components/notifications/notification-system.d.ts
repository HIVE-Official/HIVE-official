export interface Notification {
    id: string;
    type: 'social' | 'system' | 'space' | 'tool' | 'calendar' | 'achievement';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    isArchived: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    actionUrl?: string;
    actionText?: string;
    sender?: {
        id: string;
        name: string;
        avatar?: string;
    };
    metadata?: {
        spaceId?: string;
        toolId?: string;
        eventId?: string;
        achievementId?: string;
    };
}
interface NotificationSystemProps {
    notifications: Notification[];
    unreadCount: number;
    isOpen: boolean;
    onClose: () => void;
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onAction: (notification: Notification) => void;
    className?: string;
}
export declare function NotificationSystem({ notifications, unreadCount, isOpen, onClose, onMarkAsRead, onMarkAllAsRead, onArchive, onDelete, onAction, className }: NotificationSystemProps): import("react/jsx-runtime").JSX.Element;
interface NotificationBellProps {
    unreadCount: number;
    onClick: () => void;
    className?: string;
}
export declare function NotificationBell({ unreadCount, onClick, className }: NotificationBellProps): import("react/jsx-runtime").JSX.Element;
export declare function useNotifications(): void;
export {};
//# sourceMappingURL=notification-system.d.ts.map