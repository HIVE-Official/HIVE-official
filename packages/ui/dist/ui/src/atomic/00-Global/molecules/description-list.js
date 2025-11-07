"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
export const DescriptionList = React.forwardRef(function DescriptionList({ items, variant = "grid", columns = 2, tone = "default", className, ...props }, ref) {
    const gridCols = variant === "grid"
        ? columns === 3
            ? "md:grid-cols-3"
            : columns === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
        : undefined;
    const baseSurface = tone === "subtle"
        ? "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)] border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]"
        : "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_20%,transparent)] border-[color-mix(in_srgb,var(--hive-border-default,#373945)_65%,transparent)]";
    if (variant === "inline") {
        return (_jsx("dl", { ref: ref, className: cn("divide-y divide-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)] overflow-hidden rounded-xl border", baseSurface, className), ...props, children: items.map((item, idx) => (_jsxs("div", { className: "grid grid-cols-1 gap-2 px-4 py-3 md:grid-cols-[240px_1fr]", children: [_jsxs("dt", { className: "flex items-start gap-2 text-sm font-medium text-[var(--hive-text-secondary)]", children: [item.icon ? (_jsx("span", { "aria-hidden": true, className: "mt-0.5", children: item.icon })) : null, _jsx("span", { children: item.label })] }), _jsxs("dd", { className: "text-sm text-[var(--hive-text-primary)]", children: [item.value, item.helpText ? (_jsx("div", { className: "mt-1 text-xs text-[var(--hive-text-secondary)]", children: item.helpText })) : null] })] }, idx))) }));
    }
    return (_jsx("dl", { ref: ref, className: cn("grid gap-3", gridCols, className), ...props, children: items.map((item, idx) => (_jsxs("div", { className: cn("rounded-xl border p-4", baseSurface, variant === "stacked" && "md:p-5"), children: [_jsxs("dt", { className: "mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--hive-text-secondary)]", children: [item.icon ? (_jsx("span", { "aria-hidden": true, children: item.icon })) : null, _jsx("span", { children: item.label })] }), _jsxs("dd", { className: "text-sm text-[var(--hive-text-primary)]", children: [item.value, item.helpText ? (_jsx("div", { className: "mt-1 text-xs text-[var(--hive-text-secondary)]", children: item.helpText })) : null] })] }, idx))) }));
});
//# sourceMappingURL=description-list.js.map