import React from 'react';
export interface Notification {
    id: string;
    type: 'mention' | 'like' | 'comment' | 'follow' | 'space_invite' | 'tool_feature' | 'event' | 'system';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    actor?: {
        name: string;
        handle: string;
        avatar?: string;
    };
}
interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    removeNotification: (id: string) => void;
}
export declare function useNotifications(): NotificationContextType;
interface NotificationProviderProps {
    children: React.ReactNode;
}
export declare function NotificationProvider({ children }: NotificationProviderProps): void;
export {};
//# sourceMappingURL=notification-service.d.ts.map