"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Clock, Play, Sparkles } from "lucide-react";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader, CardTitle, } from "../atoms/card";
import { Progress } from "../atoms/progress";
import { cn } from "../../lib/utils";
const defaultTitle = {
    action: "Quick Action",
    progress: "Progress",
    eventNow: "Happening Now",
};
export function RailWidget({ variant, title, description, progress = 0, ctaLabel = "Open", onCta, startTimeLabel, endTimeLabel, className, ...props }) {
    return (_jsxs(Card, { className: cn("overflow-hidden", className), ...props, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-sm font-semibold text-[var(--hive-text-primary)]", children: [variant === "action" && (_jsx(Sparkles, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true })), variant === "progress" && (_jsx(Play, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true })), variant === "eventNow" && (_jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true })), _jsx("span", { children: title ?? defaultTitle[variant] })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [description ? (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: description })) : null, variant === "progress" ? (_jsx(Progress, { value: progress, size: "sm", className: "mt-1", "aria-label": `Progress ${Math.round(progress)}%` })) : null, variant === "eventNow" ? (_jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-secondary)]", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": true }), startTimeLabel ?? "Now"] }), endTimeLabel ? (_jsx("span", { children: `\u2192 ${endTimeLabel}` })) : null] })) : null, _jsx("div", { className: "pt-1", children: _jsx(Button, { size: "sm", onClick: onCta, className: "w-full", type: "button", children: ctaLabel }) })] })] }));
}
//# sourceMappingURL=rail-widget.js.map