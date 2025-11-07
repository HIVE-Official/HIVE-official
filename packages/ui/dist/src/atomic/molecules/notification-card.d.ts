export type NotificationCardProps = {
    title: string;
    message?: string;
    timestamp?: string;
    type?: 'mention' | 'comment' | 'system';
    read?: boolean;
};
export declare function NotificationCard({ title, message, timestamp, type, read }: NotificationCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=notification-card.d.ts.map