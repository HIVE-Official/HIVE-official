"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
const statusTokens = {
    online: {
        label: "Online",
        dot: "var(--hive-status-success)",
        halo: "color-mix(in srgb, var(--hive-status-success) 45%, transparent)",
    },
    away: {
        label: "Away",
        dot: "var(--hive-status-warning)",
        halo: "color-mix(in srgb, var(--hive-status-warning) 45%, transparent)",
    },
    offline: {
        label: "Offline",
        dot: "color-mix(in srgb, var(--hive-border-muted) 80%, transparent)",
        textTone: "secondary",
        trackTime: true,
    },
    ghost: {
        label: "Ghost",
        dot: "color-mix(in srgb, var(--hive-border-muted) 40%, transparent)",
        textTone: "muted",
        trackTime: true,
    },
};
const presenceVariants = cva("inline-flex items-center", {
    variants: {
        size: {
            sm: "gap-2 text-[var(--hive-font-size-body-xs)]",
            md: "gap-3 text-[var(--hive-font-size-body-sm)]",
            lg: "gap-4 text-[var(--hive-font-size-body-md)]",
        },
        tone: {
            neutral: "",
            inverse: "text-[var(--hive-text-inverse)]",
        },
        emphasis: {
            true: "font-[var(--hive-font-weight-medium,500)]",
        },
    },
    defaultVariants: {
        size: "md",
        tone: "neutral",
    },
});
const dotSize = {
    sm: { dot: "h-2.5 w-2.5", halo: "h-3.5 w-3.5" },
    md: { dot: "h-3 w-3", halo: "h-4.5 w-4.5" },
    lg: { dot: "h-3.5 w-3.5", halo: "h-5.5 w-5.5" },
};
const formatLastActive = (date) => {
    if (!date)
        return null;
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1)
        return "Just now";
    if (minutes < 60)
        return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7)
        return `${days}d ago`;
    return date.toLocaleDateString();
};
export const PresenceDot = React.forwardRef(({ className, status = "offline", size, tone, showLabel = true, label, lastActiveAt, ...props }, ref) => {
    const token = statusTokens[status];
    const sizeConfig = dotSize[size ?? "md"];
    const showTimestamp = (token.trackTime ?? false) && lastActiveAt && (status === "offline" || status === "ghost");
    const timestamp = showTimestamp ? formatLastActive(lastActiveAt) : null;
    const textColor = token.textTone === "primary"
        ? "var(--hive-text-primary)"
        : token.textTone === "muted"
            ? "var(--hive-text-muted)"
            : "var(--hive-text-secondary)";
    return (_jsxs("span", { ref: ref, className: cn(presenceVariants({
            size,
            tone,
            emphasis: showLabel ? true : undefined,
        }), className), ...props, children: [_jsxs("span", { className: "relative inline-flex items-center justify-center", children: [token.halo && (_jsx("span", { "aria-hidden": "true", className: cn("absolute inset-0 rounded-full", sizeConfig.halo), style: {
                            background: token.halo,
                            opacity: 0.28,
                        } })), _jsx("span", { "aria-hidden": "true", className: cn("relative rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.85)]", sizeConfig.dot), style: {
                            background: status === "ghost"
                                ? "color-mix(in srgb, var(--hive-background-tertiary) 70%, transparent)"
                                : token.dot,
                            opacity: status === "ghost" ? 0.5 : 1,
                        } })] }), showLabel ? (_jsxs("span", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[var(--hive-font-size-body-sm)] font-[var(--hive-font-weight-medium,500)]", style: { color: textColor }, children: label ?? token.label }), timestamp ? (_jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-[var(--hive-text-muted)]", children: timestamp })) : null] })) : null] }));
});
PresenceDot.displayName = "PresenceDot";
export { presenceVariants };
//# sourceMappingURL=presence.js.map