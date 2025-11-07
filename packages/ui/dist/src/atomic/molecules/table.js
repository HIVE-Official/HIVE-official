"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
/**
 * Simple, responsive table with optional sticky header.
 * Uses semantic <table> and respects reduced-motion.
 */
export function SimpleTable({ columns, rows, caption, stickyHeader = true, dense = false, className, ...props }) {
    return (_jsx("div", { className: cn("relative w-full overflow-x-auto rounded-xl border", className), ...props, children: _jsxs("table", { className: "min-w-full border-collapse bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_20%,transparent)] text-sm", children: [caption ? (_jsx("caption", { className: "px-4 py-3 text-left text-[var(--hive-text-secondary)]", children: caption })) : null, _jsx("thead", { className: cn("bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)] text-[var(--hive-text-secondary)]", stickyHeader && "sticky top-0 z-10"), children: _jsx("tr", { children: columns.map((c, i) => (_jsx("th", { scope: "col", className: cn("border-b border-[color-mix(in_srgb,var(--hive-border-default,#373945)_65%,transparent)] px-4 py-3 text-left font-semibold", c.align === "center" && "text-center", c.align === "right" && "text-right"), children: c.header }, String(c.key) + i))) }) }), _jsx("tbody", { children: rows.map((row, ri) => (_jsx("tr", { className: "even:bg-white/0 odd:bg-white/0 hover:bg-white/[0.02] transition-colors motion-reduce:transition-none", children: columns.map((c, ci) => (_jsx("td", { className: cn("border-b border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_50%,transparent)] px-4", dense ? "py-2" : "py-3", c.align === "center" && "text-center", c.align === "right" && "text-right"), "data-label": typeof c.header === "string" ? c.header : undefined, children: c.render ? c.render(row) : String(row[c.key] ?? "") }, String(c.key) + ci))) }, ri))) })] }) }));
}
//# sourceMappingURL=table.js.map