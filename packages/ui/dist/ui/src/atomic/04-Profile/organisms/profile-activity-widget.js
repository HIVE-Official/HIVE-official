"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Activity, CalendarClock, ChevronRight, Heart, MessageCircle, Users, } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Card } from "../../00-Global/atoms/card.js";
import { Button } from "../../00-Global/atoms/button.js";
import { PrivacyControl, } from "../../00-Global/molecules/privacy-control.js";
const ICON_MAP = {
    post: MessageCircle,
    comment: MessageCircle,
    connection: Users,
    space_join: Users,
    ritual: CalendarClock,
    other: Activity,
};
const formatRelative = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Recently";
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
export function ProfileActivityWidget({ activities, isOwnProfile = false, privacyLevel = "public", onPrivacyChange, onViewAll, className, }) {
    const visibleActivities = activities.slice(0, 5);
    return (_jsxs(Card, { className: cn("relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 60%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 88%,transparent)] p-6", className), children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 85%,transparent)] p-2", children: _jsx(Activity, { className: "h-4 w-4 text-[var(--hive-brand-primary,#facc15)]", "aria-hidden": true }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: "Recent activity" })] }), isOwnProfile && onPrivacyChange ? (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true })) : null] }), visibleActivities.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center", children: [_jsx(Activity, { className: "h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]", "aria-hidden": true }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: isOwnProfile
                            ? "Your campus journey will appear here after you join spaces or post."
                            : "No public activity yet." })] })) : (_jsx("div", { className: "space-y-2", children: visibleActivities.map((item) => {
                    const Icon = ICON_MAP[item.type ?? "other"] ?? Activity;
                    return (_jsxs("div", { className: "group flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 55%,transparent)]", children: [_jsx("div", { className: "mt-1 rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)] p-1.5", children: _jsx(Icon, { className: "h-3.5 w-3.5 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]", "aria-hidden": true }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-primary,#f7f7ff)]", children: item.title }), item.spaceName ? (_jsxs("p", { className: "text-xs text-[var(--hive-text-muted,#8d90a2)]", children: ["in ", item.spaceName] })) : null, _jsxs("div", { className: "mt-2 flex items-center gap-3 text-xs text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 88%,transparent)]", children: [_jsx("span", { children: formatRelative(item.timestamp) }), item.engagementCount ? (_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Heart, { className: "h-3 w-3", "aria-hidden": true }), item.engagementCount] })) : null] })] }), _jsx(ChevronRight, { className: "mt-1 h-4 w-4 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 70%,transparent)] opacity-0 transition-opacity group-hover:opacity-100", "aria-hidden": true })] }, item.id));
                }) })), activities.length > visibleActivities.length && onViewAll ? (_jsx(Button, { variant: "ghost", className: "mt-4 w-full justify-center text-sm text-[var(--hive-text-secondary,#c0c2cc)]", onClick: onViewAll, children: "View all activity" })) : null] }));
}
//# sourceMappingURL=profile-activity-widget.js.map