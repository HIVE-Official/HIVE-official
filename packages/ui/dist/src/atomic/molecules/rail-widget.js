"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Clock, Play, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../atoms/card";
import { Button } from "../atoms/button";
import { Progress } from "../atoms/progress";
import { cn } from "../../lib/utils";
export function RailWidget({ variant, title, description, progress = 0, ctaLabel = "Open", onCta, startTimeLabel, endTimeLabel, className, ...props }) {
    return (_jsxs(Card, { className: cn("overflow-hidden", className), ...props, children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [variant === 'action' && _jsx(Sparkles, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true }), variant === 'progress' && _jsx(Play, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true }), variant === 'eventNow' && _jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-brand-primary)]", "aria-hidden": true }), _jsx("span", { children: title ?? defaultTitle[variant] })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [description && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: description })), variant === 'progress' && (_jsx(Progress, { value: progress, showValue: true, className: "mt-1" })), variant === 'eventNow' && (_jsxs("div", { className: "flex items-center justify-between text-xs text-[var(--hive-text-secondary)]", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": true }), " ", startTimeLabel ?? 'Now'] }), endTimeLabel && _jsxs("span", { children: ["\u2192 ", endTimeLabel] })] })), _jsx("div", { className: "pt-1", children: _jsx(Button, { size: "sm", onClick: onCta, className: "w-full", children: ctaLabel }) })] })] }));
}
const defaultTitle = {
    action: "Quick Action",
    progress: "Progress",
    eventNow: "Happening Now",
};
//# sourceMappingURL=rail-widget.js.map