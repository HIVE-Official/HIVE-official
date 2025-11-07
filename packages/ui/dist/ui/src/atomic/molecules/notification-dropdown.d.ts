import * as React from "react";
export interface NotificationListItem {
    id: string;
    title: string;
    message?: string;
    type?: string;
    category?: string;
    priority?: "low" | "medium" | "high" | "urgent";
    isRead?: boolean;
    timestamp?: Date | string | number | {
        toDate: () => Date;
    };
    actionUrl?: string;
    actionText?: string;
    metadata?: Record<string, unknown>;
}
export interface NotificationDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    notifications: NotificationListItem[];
    unreadCount?: number;
    loading?: boolean;
    error?: string | null;
    onNavigate?: (url: string, notification: NotificationListItem) => void;
    onMarkAsRead?: (id: string) => void | Promise<void>;
    onMarkAllAsRead?: () => void | Promise<void>;
    onClearAll?: () => void | Promise<void>;
    emptyState?: React.ReactNode;
    heading?: string;
}
export declare const NotificationDropdown: React.ForwardRefExoticComponent<NotificationDropdownProps & React.RefAttributes<HTMLDivElement>>;
export default NotificationDropdown;
//# sourceMappingURL=notification-dropdown.d.ts.map