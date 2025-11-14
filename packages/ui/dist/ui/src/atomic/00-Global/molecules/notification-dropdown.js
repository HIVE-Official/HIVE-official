"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { NotificationCard } from "./notification-card.js";
const DEFAULT_EMPTY_STATE = (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-10 text-center", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-secondary)]", children: "You\u2019re all caught up" }), _jsx("p", { className: "max-w-[220px] text-xs text-[var(--hive-text-tertiary)]", children: "Check back later for updates from your spaces, classes, and tools." })] }));
const LoadingState = () => (_jsx("div", { className: "space-y-3 py-6", children: Array.from({ length: 3 }).map((_, index) => (_jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[color-mix(in_srgb,var(--hive-border) 15%,transparent)]" }, index))) }));
function normalizeTimestamp(input) {
    if (!input)
        return undefined;
    if (input instanceof Date)
        return input;
    if (typeof input === "number")
        return new Date(input);
    if (typeof input === "string")
        return new Date(input);
    if (typeof input === "object" && typeof input.toDate === "function") {
        try {
            return input.toDate();
        }
        catch {
            return undefined;
        }
    }
    return undefined;
}
function formatRelativeTime(date) {
    if (!date)
        return undefined;
    const now = Date.now();
    const diffMs = date.getTime() - now;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const divisions = [
        [60, "seconds"],
        [60, "minutes"],
        [24, "hours"],
        [7, "days"],
        [4.34524, "weeks"],
        [12, "months"],
        [Number.POSITIVE_INFINITY, "years"],
    ];
    let duration = Math.round(diffMs / 1000);
    for (const [amount, unit] of divisions) {
        if (Math.abs(duration) < amount) {
            return rtf.format(Math.round(duration), unit);
        }
        duration /= amount;
    }
    return undefined;
}
export const NotificationDropdown = React.forwardRef(({ notifications, unreadCount = 0, loading = false, error = null, onNavigate, onMarkAsRead, onMarkAllAsRead, onClearAll, emptyState = DEFAULT_EMPTY_STATE, heading = "Notifications", className, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn("w-[min(360px,90vw)] rounded-2xl border border-[var(--hive-border)] bg-[var(--hive-background-elevated)] shadow-hive-level4", className), ...props, children: [_jsxs("header", { className: "flex items-start justify-between gap-3 border-b border-[var(--hive-border)] px-5 py-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: heading }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: unreadCount > 0
                                    ? `${unreadCount} unread`
                                    : "You&rsquo;re up to date" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [onMarkAllAsRead ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onMarkAllAsRead?.(), disabled: loading || unreadCount === 0, children: "Mark all read" })) : null, onClearAll ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onClearAll?.(), disabled: loading || notifications.length === 0, children: "Clear" })) : null] })] }), _jsx("div", { className: "max-h-[400px]", children: loading ? (_jsx(LoadingState, {})) : error ? (_jsx("div", { className: "px-5 py-8 text-center text-sm text-[var(--hive-status-error)]", children: error || "Unable to load notifications" })) : notifications.length === 0 ? (emptyState) : (_jsx("div", { className: "max-h-[360px] overflow-y-auto px-1 py-2", children: _jsx("div", { className: "space-y-3 px-4", children: notifications.map((notification) => {
                            const timestamp = normalizeTimestamp(notification.timestamp);
                            const relativeTime = formatRelativeTime(timestamp);
                            const handleNavigate = () => {
                                if (notification.actionUrl) {
                                    onNavigate?.(notification.actionUrl, notification);
                                }
                                if (!notification.isRead) {
                                    onMarkAsRead?.(notification.id);
                                }
                            };
                            return (_jsx("button", { onClick: handleNavigate, type: "button", className: cn("w-full text-left transition-colors", "rounded-xl border border-transparent hover:border-[var(--hive-border-strong)] focus:border-[var(--hive-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30", !notification.isRead &&
                                    "bg-[color-mix(in_srgb,var(--hive-brand-primary-bg) 65%,transparent)]"), children: _jsx(NotificationCard, { title: notification.title, message: notification.message, timestamp: relativeTime, type: notification.category || notification.type, read: notification.isRead }) }, notification.id));
                        }) }) })) })] }));
});
NotificationDropdown.displayName = "NotificationDropdown";
export default NotificationDropdown;
//# sourceMappingURL=notification-dropdown.js.map