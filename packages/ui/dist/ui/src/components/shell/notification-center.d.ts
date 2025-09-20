interface Notification {
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
interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
    notifications?: Notification[];
}
export declare function NotificationCenter({ isOpen, onClose, notifications }: NotificationCenterProps): void;
export {};
//# sourceMappingURL=notification-center.d.ts.map