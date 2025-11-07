"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip.js";
/** Horizontal segmented distribution bar with optional tooltips */
export function PercentBar({ segments = [], value, total, showLabels = false, rounded = true, ariaLabel = "Distribution", className, ...props }) {
    const isSingleValue = typeof value === "number" && segments.length === 0;
    const effectiveSegments = isSingleValue
        ? [{ id: "value", label: "", value: Math.max(0, Math.min(100, value)) }]
        : segments;
    const sum = (total ?? effectiveSegments.reduce((acc, s) => acc + (s.value || 0), 0)) || 1;
    const pct = (v) => Math.max(0, Math.min(100, (v / sum) * 100));
    return (_jsxs("div", { className: cn("space-y-2", className), ...props, children: [_jsx("div", { role: "group", "aria-label": ariaLabel, className: cn("flex w-full overflow-hidden border bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_25%,transparent)]", "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]", rounded ? "rounded-full" : "rounded-md"), children: _jsx(TooltipProvider, { children: effectiveSegments.map((s, i) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("div", { role: "img", "aria-label": s.label ? `${s.label}: ${Math.round(pct(s.value))}%` : `${Math.round(pct(s.value))}%`, className: cn("h-3", i === 0 ? "" : "border-l border-black/10"), style: {
                                        width: `${pct(s.value)}%`,
                                        background: s.color || segmentPalette[i % segmentPalette.length],
                                    } }) }), s.label && (_jsx(TooltipContent, { children: _jsxs("div", { className: "text-xs", children: [_jsx("strong", { children: s.label }), ": ", Math.round(pct(s.value)), "% (", s.value, ")"] }) }))] }, s.id || i))) }) }), showLabels && effectiveSegments.some((s) => s.label) && (_jsx("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--hive-text-secondary)]", children: effectiveSegments.map((s, i) => (s.label ? (_jsxs("div", { className: "inline-flex items-center gap-2", children: [_jsx("span", { "aria-hidden": true, className: "h-2 w-2 rounded-sm", style: { background: s.color || segmentPalette[i % segmentPalette.length] } }), _jsxs("span", { children: [s.label, " \u00B7 ", Math.round(pct(s.value)), "%"] })] }, `${s.id ?? i}-label`)) : null)) }))] }));
}
const segmentPalette = [
    "var(--hive-brand-primary)",
    "var(--hive-status-success)",
    "var(--hive-status-warning)",
    "var(--hive-status-error)",
    "var(--hive-text-secondary)",
];
/** Alias for voting scenarios */
export function VoteBar(props) {
    return _jsx(PercentBar, { ariaLabel: props.ariaLabel ?? "Vote distribution", ...props });
}
//# sourceMappingURL=percent-bar.js.map