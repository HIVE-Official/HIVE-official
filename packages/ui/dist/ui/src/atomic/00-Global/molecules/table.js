"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../../lib/utils";
export const SimpleTable = React.forwardRef(function SimpleTable({ columns, rows, caption, stickyHeader = true, dense = false, className, ...props }, ref) {
    return (_jsx("div", { ref: ref, className: cn("relative w-full overflow-x-auto rounded-xl border", className), ...props, children: _jsxs("table", { className: "min-w-full border-collapse bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_20%,transparent)] text-sm", children: [caption ? (_jsx("caption", { className: "px-4 py-3 text-left text-[var(--hive-text-secondary)]", children: caption })) : null, _jsx("thead", { className: cn("bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)] text-[var(--hive-text-secondary)]", stickyHeader && "sticky top-0 z-10"), children: _jsx("tr", { children: columns.map((column, index) => (_jsx("th", { scope: "col", className: cn("border-b border-[color-mix(in_srgb,var(--hive-border-default,#373945)_65%,transparent)] px-4 py-3 text-left font-semibold", column.align === "center" && "text-center", column.align === "right" && "text-right"), children: column.header }, `${String(column.key)}-${index}`))) }) }), _jsx("tbody", { children: rows.map((row, rowIndex) => (_jsx("tr", { className: "even:bg-white/0 odd:bg-white/0 transition-colors hover:bg-white/[0.02] motion-reduce:transition-none", children: columns.map((column, colIndex) => {
                            const cell = column.render
                                ? column.render(row)
                                : row[column.key];
                            return (_jsx("td", { className: cn("border-b border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_50%,transparent)] px-4", dense ? "py-2" : "py-3", column.align === "center" && "text-center", column.align === "right" && "text-right"), "data-label": typeof column.header === "string"
                                    ? column.header
                                    : undefined, children: cell ?? "" }, `${String(column.key)}-${colIndex}`));
                        }) }, rowIndex))) })] }) }));
});
//# sourceMappingURL=table.js.map