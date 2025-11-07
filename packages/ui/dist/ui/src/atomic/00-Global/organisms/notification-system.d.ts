import * as React from "react";
import { type NotificationDropdownProps, type NotificationListItem } from "../molecules/notification-dropdown";
import { type NotificationToastContainerProps } from "./notification-toast-container";
export interface NotificationSystemProps extends Omit<NotificationDropdownProps, "heading" | "className" | "error"> {
    /**
     * Optional className applied to the wrapper element.
     */
    className?: string;
    /**
     * Disable interaction with the notification bell.
     */
    disabled?: boolean;
    /**
     * Position for the toast container rendered for urgent notifications.
     */
    toastPosition?: NotificationToastContainerProps["position"];
    /**
     * Callback fired when the dropdown open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Optional error to display in the dropdown.
     */
    error?: NotificationDropdownProps["error"] | Error | null;
}
export declare const NotificationSystem: React.ForwardRefExoticComponent<NotificationSystemProps & React.RefAttributes<HTMLDivElement>>;
export type { NotificationListItem };
export default NotificationSystem;
//# sourceMappingURL=notification-system.d.ts.map