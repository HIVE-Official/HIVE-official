import * as React from "react";
import { Card } from "../atoms/card";
export interface NotificationCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
    title: React.ReactNode;
    message?: React.ReactNode;
    timestamp?: React.ReactNode;
    type?: string;
    read?: boolean;
}
export declare function NotificationCard({ title, message, timestamp, type, read, className, ...props }: NotificationCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=notification-card.d.ts.map