"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Camera, GraduationCap, MapPin } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Card } from "../atoms/card.js";
import { Avatar, AvatarImage, AvatarFallback } from "../atoms/avatar.js";
import { Badge } from "../atoms/badge.js";
import { Button } from "../atoms/button.js";
import { PresenceIndicator, } from "../atoms/presence-indicator.js";
import { PrivacyControl, } from "../molecules/privacy-control.js";
const presenceText = (status, lastSeen) => {
    if (status === "online")
        return "Online now";
    if (status === "away")
        return "Away";
    if (!lastSeen)
        return "Offline";
    const diff = Date.now() - lastSeen.getTime();
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
    return lastSeen.toLocaleDateString();
};
export function ProfileIdentityWidget({ profile, isOwnProfile = false, presenceStatus = "offline", lastSeen, campusLabel = profile.academic.campusId?.replace(/-/g, " ") ?? "UB", completionPercentage = profile.metadata?.completionPercentage ?? 0, onEditPhoto, privacyLevel = profile.widgets?.myActivity?.level, onPrivacyChange, className, }) {
    const displayName = profile.identity.fullName || "Student";
    const initials = React.useMemo(() => {
        return displayName
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "UB";
    }, [displayName]);
    const parsedLastSeen = React.useMemo(() => {
        if (!lastSeen)
            return null;
        if (lastSeen instanceof Date)
            return lastSeen;
        const parsed = new Date(lastSeen);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }, [lastSeen]);
    const academicYear = profile.academic.academicYear
        ? profile.academic.academicYear.charAt(0).toUpperCase() + profile.academic.academicYear.slice(1)
        : undefined;
    const housing = profile.academic.housing;
    return (_jsxs(Card, { className: cn("relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 65%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 90%,transparent)] p-6", className), children: [_jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 75%,transparent)] to-transparent" }), isOwnProfile && onPrivacyChange ? (_jsx("div", { className: "absolute right-4 top-4", children: _jsx(PrivacyControl, { level: privacyLevel ?? "public", onLevelChange: onPrivacyChange, compact: true }) })) : null, _jsxs("div", { className: "flex flex-col gap-5 md:flex-row md:items-center", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { className: "h-24 w-24 border-2 border-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 28%,transparent)]", children: profile.identity.avatarUrl ? (_jsx(AvatarImage, { src: profile.identity.avatarUrl, alt: displayName })) : (_jsx(AvatarFallback, { children: initials })) }), _jsx("div", { className: "absolute -right-2 -bottom-2", children: _jsx(PresenceIndicator, { status: presenceStatus, lastActiveAt: parsedLastSeen ?? undefined }) }), isOwnProfile && onEditPhoto ? (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onEditPhoto, className: "absolute inset-0 hidden items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm transition-opacity hover:bg-black/70 md:flex", children: [_jsx(Camera, { className: "mr-1 h-3.5 w-3.5", "aria-hidden": true }), "Edit"] })) : null] }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("h2", { className: "text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]", children: displayName }), _jsx(Badge, { variant: "primary", className: "uppercase tracking-[0.32em]", children: campusLabel })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: [academicYear ? (_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(GraduationCap, { className: "h-4 w-4", "aria-hidden": true }), academicYear] })) : null, profile.academic.major ? (_jsx("span", { children: profile.academic.major })) : null, profile.academic.graduationYear ? (_jsxs("span", { className: "inline-flex items-center gap-1 text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 90%,transparent)]", children: ["Class of ", profile.academic.graduationYear] })) : null] }), housing ? (_jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted,#8e90a2)]", children: [_jsx(MapPin, { className: "h-4 w-4", "aria-hidden": true }), housing] })) : null, profile.personal?.bio ? (_jsx("p", { className: "max-w-xl text-sm text-[var(--hive-text-secondary,#c0c2cc)]", children: profile.personal.bio })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 95%,transparent)]", children: [_jsx("span", { children: presenceText(presenceStatus, parsedLastSeen) }), _jsx("span", { "aria-hidden": true, children: "\u2022" }), _jsxs("span", { children: [(profile.social?.connections?.connectionIds?.length ?? 0) +
                                                (profile.social?.connections?.friendIds?.length ?? 0), ' ', "connections"] }), _jsx("span", { "aria-hidden": true, children: "\u2022" }), _jsxs("span", { children: [profile.social?.mutualSpaces?.length ?? 0, " shared spaces"] })] })] })] }), isOwnProfile ? (_jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[var(--hive-text-muted,#8e90a2)]", children: [_jsx("span", { children: "Profile completeness" }), _jsxs("span", { className: "text-[var(--hive-brand-primary,#facc15)]", children: [Math.round(completionPercentage), "%"] })] }), _jsx("div", { className: "mt-2 h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 75%,transparent)]", children: _jsx("div", { className: "h-full rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 90%,transparent)] transition-[width] duration-500", style: { width: `${Math.min(100, Math.max(0, completionPercentage))}%` } }) })] })) : null] }));
}
//# sourceMappingURL=profile-identity-widget.js.map