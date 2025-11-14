"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { NotificationBell } from "../../02-Feed/atoms/notification-bell";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../atoms/popover";
import {
  NotificationDropdown,
  type NotificationDropdownProps,
  type NotificationListItem,
} from "../molecules/notification-dropdown";
import {
  NotificationToastContainer,
  type NotificationToastContainerProps,
  type ToastNotification,
} from "./notification-toast-container";

const toastTypeByPriority: Record<
  NonNullable<NotificationListItem["priority"]>,
  ToastNotification["type"]
> = {
  urgent: "error",
  high: "warning",
  medium: "info",
  low: "info",
};

function toToastNotification(
  notification: NotificationListItem,
): ToastNotification {
  return {
    id: notification.id,
    title: notification.title,
    description: notification.message,
    type: toastTypeByPriority[notification.priority ?? "medium"],
    duration: notification.priority === "urgent" ? 8000 : 6000,
  };
}

export interface NotificationSystemProps
  extends Omit<NotificationDropdownProps, "heading" | "className" | "error"> {
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

export const NotificationSystem = React.forwardRef<
  HTMLDivElement,
  NotificationSystemProps
>(
  (
    {
      notifications = [],
      unreadCount = 0,
      loading = false,
      error = null,
      className,
      disabled = false,
      toastPosition = "top-right",
      onNavigate,
      onMarkAsRead,
      onMarkAllAsRead,
      onClearAll,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [toastNotifications, setToastNotifications] = React.useState<
      ToastNotification[]
    >([]);
    const seenToastIdsRef = React.useRef<Set<string>>(new Set());

    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
      },
      [onOpenChange],
    );

    React.useEffect(() => {
      if (!notifications.length) return;

      const urgentCandidates = notifications.filter(
        (notification) =>
          !notification.isRead &&
          (notification.priority === "urgent" ||
            notification.priority === "high"),
      );

      if (!urgentCandidates.length) return;

      const unseenToasts = urgentCandidates.filter(
        (notification) => !seenToastIdsRef.current.has(notification.id),
      );

      if (!unseenToasts.length) return;

      unseenToasts.forEach((notification) => {
        seenToastIdsRef.current.add(notification.id);
      });

      setToastNotifications((prev) => [
        ...unseenToasts.map(toToastNotification),
        ...prev,
      ]);
    }, [notifications]);

    const handleToastClose = React.useCallback((id: string) => {
      setToastNotifications((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const resolvedError =
      typeof error === "string" ? error : error instanceof Error ? error.message : null;

    const handleNavigate = React.useCallback(
      (url: string, notification: NotificationListItem) => {
        onNavigate?.(url, notification);
        handleOpenChange(false);
      },
      [handleOpenChange, onNavigate],
    );

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center", className)}
      >
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <NotificationBell
              unreadCount={unreadCount}
              loading={loading}
              hasError={Boolean(resolvedError)}
              disabled={disabled}
              hasUrgent={notifications.some(
                (notification) => notification.priority === "urgent",
              )}
              onClick={() => handleOpenChange(!isOpen)}
            />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="p-0 shadow-hive-level4"
            sideOffset={14}
          >
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              loading={loading}
              error={resolvedError}
              onNavigate={handleNavigate}
              onMarkAsRead={onMarkAsRead}
              onMarkAllAsRead={onMarkAllAsRead}
              onClearAll={onClearAll}
              {...props}
            />
          </PopoverContent>
        </Popover>

        {toastNotifications.length > 0 ? (
          <NotificationToastContainer
            notifications={toastNotifications}
            onClose={handleToastClose}
            position={toastPosition}
          />
        ) : null}
      </div>
    );
  },
);

NotificationSystem.displayName = "NotificationSystem";

export type { NotificationListItem };

export default NotificationSystem;
