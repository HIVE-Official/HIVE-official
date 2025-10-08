import * as React from "react";
export type NotificationType = "comment" | "like" | "follow" | "mention" | "space_invite" | "event_reminder" | "ritual_reminder" | "post";
export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar?: string;
    userName: string;
    type: NotificationType;
    message: string;
    timestamp: string;
    isRead?: boolean;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    onRead?: () => void;
}
declare const NotificationItem: React.ForwardRefExoticComponent<NotificationItemProps & React.RefAttributes<HTMLDivElement>>;
export { NotificationItem };
//# sourceMappingURL=notification-item.d.ts.map