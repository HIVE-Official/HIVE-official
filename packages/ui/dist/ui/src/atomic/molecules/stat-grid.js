"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card } from "../atoms/card";
import { cn } from "../../lib/utils";
const StatGrid = React.forwardRef(({ className, stats, variant = "grid", columns, ...props }, ref) => {
    if (variant === "inline") {
        return (_jsx("div", { ref: ref, className: cn("flex flex-wrap gap-6", className), ...props, children: stats.map((stat, index) => (_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("span", { className: "text-2xl font-bold text-foreground", children: typeof stat.value === 'number' && stat.value > 999
                                    ? `${(stat.value / 1000).toFixed(1)}k`
                                    : stat.value }), stat.trend && (_jsxs("span", { className: cn("text-xs font-medium", stat.trend.isPositive
                                    ? "text-primary"
                                    : "text-muted-foreground"), children: [stat.trend.isPositive ? "+" : "-", stat.trend.value, "%"] }))] }), _jsx("span", { className: "text-sm text-muted-foreground", children: stat.label })] }, index))) }));
    }
    // Determine grid columns
    const gridCols = columns
        ? `grid-cols-${columns}`
        : stats.length === 2
            ? "grid-cols-2"
            : stats.length === 3
                ? "grid-cols-3"
                : stats.length === 4
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    return (_jsx("div", { ref: ref, className: cn("grid gap-4", gridCols, className), ...props, children: stats.map((stat, index) => {
            const content = (_jsx(Card, { className: cn("p-4 transition-smooth ease-liquid", stat.href && "cursor-pointer hover:bg-accent/50"), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: stat.label }), _jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("p", { className: "text-2xl font-bold text-foreground", children: typeof stat.value === 'number' && stat.value > 999
                                                ? `${(stat.value / 1000).toFixed(1)}k`
                                                : stat.value }), stat.trend && (_jsxs("span", { className: cn("text-xs font-medium flex items-center gap-1", stat.trend.isPositive
                                                ? "text-primary"
                                                : "text-muted-foreground"), children: [_jsx("svg", { className: "h-3 w-3", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: stat.trend.isPositive ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 15.75l7.5-7.5 7.5 7.5" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" })) }), stat.trend.value, "%"] }))] })] }), stat.icon && (_jsx("div", { className: "shrink-0 text-muted-foreground/50", children: stat.icon }))] }) }));
            if (stat.href) {
                return (_jsx("a", { href: stat.href, children: content }, index));
            }
            return _jsx("div", { children: content }, index);
        }) }));
});
StatGrid.displayName = "StatGrid";
export { StatGrid };
//# sourceMappingURL=stat-grid.js.map