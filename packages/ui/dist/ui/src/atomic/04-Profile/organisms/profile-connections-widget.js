"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link2, UserPlus } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Card } from "../../00-Global/atoms/card.js";
import { PrivacyControl, } from "../../00-Global/molecules/privacy-control.js";
const connectionLabel = (item) => {
    if (item.sharedSpaces?.length) {
        return `${item.sharedSpaces.length} shared spaces`;
    }
    if (item.connectionStrength) {
        return `Strength ${item.connectionStrength}`;
    }
    return "Campus connection";
};
export function ProfileConnectionsWidget({ connections, isOwnProfile = false, privacyLevel = "public", onPrivacyChange, className, }) {
    const visible = connections.slice(0, 6);
    return (_jsxs(Card, { className: cn("relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 58%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 88%,transparent)] p-6", className), children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)] p-2", children: _jsx(Link2, { className: "h-4 w-4 text-[var(--hive-brand-primary,#facc15)]", "aria-hidden": true }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: "Connections" })] }), isOwnProfile && onPrivacyChange ? (_jsx(PrivacyControl, { level: privacyLevel, onLevelChange: onPrivacyChange, compact: true })) : null] }), visible.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center", children: [_jsx(UserPlus, { className: "h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]", "aria-hidden": true }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: isOwnProfile
                            ? "Grow your network by joining new spaces and connecting with peers."
                            : "No public connections yet." })] })) : (_jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: visible.map((connection) => (_jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 50%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)] p-3", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 18%,transparent)] text-sm font-semibold text-[var(--hive-background-primary,#090a14)]", children: (connection.name || "UB").
                                split(" ")
                                .filter(Boolean)
                                .map((part) => part[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "truncate text-sm font-medium text-[var(--hive-text-primary,#f7f7ff)]", children: connection.name }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted,#8d90a2)]", children: connectionLabel(connection) })] })] }, connection.id))) }))] }));
}
//# sourceMappingURL=profile-connections-widget.js.map