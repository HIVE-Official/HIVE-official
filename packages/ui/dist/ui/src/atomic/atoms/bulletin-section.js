"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Separator } from "./separator.js";
/**
 * Bulletin Section Header
 *
 * Custom primitive for category section headers with bulletin board aesthetic.
 * Creates visual separation between different space categories.
 *
 * Features:
 * - Clean separator line (like bulletin board sections)
 * - Optional icon for category identification
 * - Count indicator for items in section
 * - Action slot for "View All" or filter buttons
 */
const BulletinSection = React.forwardRef(({ className, title, subtitle, icon: Icon, action, count, children, ...props }, ref) => {
    return (_jsxs("section", { ref: ref, className: cn("space-y-6", className), ...props, children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [Icon && (_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary", children: _jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" }) })), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: title }), typeof count === "number" && (_jsx("span", { className: "inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-semibold text-muted-foreground", children: count }))] }), subtitle && (_jsx("p", { className: "text-sm text-muted-foreground", children: subtitle }))] })] }), action && (_jsx("div", { className: "flex-shrink-0", children: action }))] }), _jsx(Separator, { className: "bg-border" }), children] }));
});
BulletinSection.displayName = "BulletinSection";
export { BulletinSection };
//# sourceMappingURL=bulletin-section.js.map