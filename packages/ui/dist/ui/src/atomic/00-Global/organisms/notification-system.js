"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../../lib/utils.js";
import { NotificationBell } from "../../02-Feed/atoms/notification-bell.js";
import { Popover, PopoverTrigger, PopoverContent, } from "../atoms/popover.js";
import { NotificationDropdown, } from "../molecules/notification-dropdown.js";
import { NotificationToastContainer, } from "./notification-toast-container.js";
const toastTypeByPriority = {
    urgent: "error",
    high: "warning",
    medium: "info",
    low: "info",
};
function toToastNotification(notification) {
    return {
        id: notification.id,
        title: notification.title,
        description: notification.message,
        type: toastTypeByPriority[notification.priority ?? "medium"],
        duration: notification.priority === "urgent" ? 8000 : 6000,
    };
}
export const NotificationSystem = React.forwardRef(({ notifications = [], unreadCount = 0, loading = false, error = null, className, disabled = false, toastPosition = "top-right", onNavigate, onMarkAsRead, onMarkAllAsRead, onClearAll, onOpenChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [toastNotifications, setToastNotifications] = React.useState([]);
    const seenToastIdsRef = React.useRef(new Set());
    const handleOpenChange = React.useCallback((open) => {
        setIsOpen(open);
        onOpenChange?.(open);
    }, [onOpenChange]);
    React.useEffect(() => {
        if (!notifications.length)
            return;
        const urgentCandidates = notifications.filter((notification) => !notification.isRead &&
            (notification.priority === "urgent" ||
                notification.priority === "high"));
        if (!urgentCandidates.length)
            return;
        const unseenToasts = urgentCandidates.filter((notification) => !seenToastIdsRef.current.has(notification.id));
        if (!unseenToasts.length)
            return;
        unseenToasts.forEach((notification) => {
            seenToastIdsRef.current.add(notification.id);
        });
        setToastNotifications((prev) => [
            ...unseenToasts.map(toToastNotification),
            ...prev,
        ]);
    }, [notifications]);
    const handleToastClose = React.useCallback((id) => {
        setToastNotifications((prev) => prev.filter((toast) => toast.id !== id));
    }, []);
    const resolvedError = typeof error === "string" ? error : error instanceof Error ? error.message : null;
    const handleNavigate = React.useCallback((url, notification) => {
        onNavigate?.(url, notification);
        handleOpenChange(false);
    }, [handleOpenChange, onNavigate]);
    return (_jsxs("div", { ref: ref, className: cn("relative inline-flex items-center", className), children: [_jsxs(Popover, { open: isOpen, onOpenChange: handleOpenChange, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(NotificationBell, { unreadCount: unreadCount, loading: loading, hasError: Boolean(resolvedError), disabled: disabled, hasUrgent: notifications.some((notification) => notification.priority === "urgent"), onClick: () => handleOpenChange(!isOpen) }) }), _jsx(PopoverContent, { align: "end", className: "p-0 shadow-hive-level4", sideOffset: 14, children: _jsx(NotificationDropdown, { notifications: notifications, unreadCount: unreadCount, loading: loading, error: resolvedError, onNavigate: handleNavigate, onMarkAsRead: onMarkAsRead, onMarkAllAsRead: onMarkAllAsRead, onClearAll: onClearAll, ...props }) })] }), toastNotifications.length > 0 ? (_jsx(NotificationToastContainer, { notifications: toastNotifications, onClose: handleToastClose, position: toastPosition })) : null] }));
});
NotificationSystem.displayName = "NotificationSystem";
export default NotificationSystem;
//# sourceMappingURL=notification-system.js.map