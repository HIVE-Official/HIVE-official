"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Building2, Users, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Card } from "../atoms/card.js";
import { PrivacyControl, } from "../molecules/privacy-control.js";
const formatLastActivity = (value) => {
    if (!value)
        return "Recently";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime()))
        return "Recently";
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1)
        return "Active now";
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7)
        return `${days}d ago`;
    return date.toLocaleDateString();
};
export function ProfileSpacesWidget({ spaces, isOwnProfile = false, privacyLevel = "public", onPrivacyChange, className, }) {
    const visible = spaces.slice(0, 4);
    return (_jsxs(Card, { className: cn("relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 60%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 86%,transparent)] p-6", className), children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)] p-2", children: _jsx(Building2, { className: "h-4 w-4 text-[var(--hive-brand-primary,#facc15)]", "aria-hidden": true }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: "Spaces" })] }), isOwnProfile && onPrivacyChange ? (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true })) : null] }), visible.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center", children: [_jsx(Sparkles, { className: "h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]", "aria-hidden": true }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: isOwnProfile
                            ? "Join a space to showcase your campus communities."
                            : "No spaces shared publicly yet." })] })) : (_jsx("div", { className: "space-y-3", children: visible.map((space) => (_jsxs("div", { className: "rounded-2xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 75%,transparent)] p-4", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: space.name }), space.headline ? (_jsx("p", { className: "text-xs text-[var(--hive-text-muted,#8d90a2)]", children: space.headline })) : null] }), space.role ? (_jsx("span", { className: "rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 16%,transparent)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--hive-brand-primary,#facc15)]", children: space.role })) : null] }), _jsxs("div", { className: "mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Users, { className: "h-3.5 w-3.5", "aria-hidden": true }), space.memberCount ?? 0, " members"] }), _jsx("span", { "aria-hidden": true, children: "\u2022" }), _jsxs("span", { children: ["Active ", formatLastActivity(space.lastActivityAt)] })] })] }, space.id))) }))] }));
}
//# sourceMappingURL=profile-spaces-widget.js.map