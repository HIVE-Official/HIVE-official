"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardDescription, CardHeader, CardTitle, } from "../atoms/card.js";
import { cn } from "../../lib/utils.js";
/**
 * Elevated stat card with optional delta and icon slot.
 */
export function StatCard({ label, value, delta, icon, className, }) {
    return (_jsxs(Card, { className: cn("relative w-full overflow-hidden rounded-[22px] border border-white/8 bg-[#111112]/90 shadow-[0_25px_65px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur-xl", className), children: [_jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_55%)] opacity-80" }), _jsxs(CardHeader, { className: "relative z-10 space-y-3 p-5 md:p-6", children: [_jsxs("div", { className: "flex items-center justify-between text-sm font-medium text-[var(--hive-text-tertiary)]", children: [_jsx(CardTitle, { className: "text-sm font-medium tracking-wide text-[var(--hive-text-secondary)]", children: label }), icon ? (_jsx("div", { className: "text-[var(--hive-text-muted)]", children: icon })) : null] }), _jsx("div", { className: "text-3xl font-semibold text-[var(--hive-text-primary)] md:text-4xl", children: value }), delta ? (_jsx(CardDescription, { className: "text-sm text-[var(--hive-text-secondary)]", children: delta })) : null] })] }));
}
//# sourceMappingURL=stat-card.js.map