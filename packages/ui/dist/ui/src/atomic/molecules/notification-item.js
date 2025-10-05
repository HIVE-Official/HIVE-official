"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent } from "../atoms/card.js";
import { Badge } from "../atoms/badge.js";
import { cn } from "../../lib/utils.js";
const notificationIcons = {
    comment: "💬",
    like: "❤️",
    follow: "👤",
    mention: "@",
    space_invite: "🏠",
    event_reminder: "📅",
    ritual_reminder: "⚡",
    post: "📝",
};
const NotificationItem = React.forwardRef(({ className, avatar, userName, type, message, timestamp, isRead = false, badge, badgeVariant = "secondary", onRead, onClick, ...props }, ref) => {
    const initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    const handleClick = (e) => {
        if (!isRead && onRead) {
            onRead();
        }
        onClick?.(e);
    };
    return (_jsx(Card, { ref: ref, className: cn("cursor-pointer transition-all duration-smooth ease-liquid hover:shadow-md hover:border-primary/50", !isRead && "bg-primary/5 border-primary/20", className), onClick: handleClick, ...props, children: _jsxs(CardContent, { className: "flex items-start gap-3 p-3", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("div", { className: "h-12 w-10 overflow-hidden rounded-md border border-border bg-muted transition-smooth ease-liquid", children: avatar ? (_jsx("img", { src: avatar, alt: userName, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary", children: initials })) }), _jsx("div", { className: "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-background text-xs transition-smooth ease-liquid", children: notificationIcons[type] })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("p", { className: "text-sm text-foreground", children: [_jsx("span", { className: "font-semibold", children: userName }), " ", _jsx("span", { className: "text-muted-foreground", children: message })] }), !isRead && (_jsx("div", { className: "h-2 w-2 shrink-0 rounded-full bg-primary transition-smooth ease-liquid" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: timestamp }), badge && (_jsx(Badge, { variant: badgeVariant, className: "transition-smooth ease-liquid", children: badge }))] })] })] }) }));
});
NotificationItem.displayName = "NotificationItem";
export { NotificationItem };
//# sourceMappingURL=notification-item.js.map