"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "../../00-Global/atoms/button.js";
import { Card, CardContent, CardHeader, CardTitle, } from "../../00-Global/atoms/card.js";
import { cn } from "../../../lib/utils.js";
export function NowCard({ title, subtitle, when, where, ctaLabel = "View", onCta, className, ...props }) {
    return (_jsxs(Card, { className: cn("overflow-hidden", className), ...props, children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base text-[var(--hive-text-primary)]", children: title }) }), _jsxs(CardContent, { className: "space-y-2 text-sm text-[var(--hive-text-secondary)]", children: [subtitle ? _jsx("p", { children: subtitle }) : null, when ? (_jsxs("p", { className: "inline-flex items-center gap-2", children: [_jsx(CalendarDays, { className: "h-4 w-4", "aria-hidden": true }), when] })) : null, where ? (_jsxs("p", { className: "inline-flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4", "aria-hidden": true }), where] })) : null, _jsx("div", { className: "pt-2", children: _jsx(Button, { size: "sm", onClick: onCta, className: "w-full", type: "button", children: ctaLabel }) })] })] }));
}
//# sourceMappingURL=now-card.js.map