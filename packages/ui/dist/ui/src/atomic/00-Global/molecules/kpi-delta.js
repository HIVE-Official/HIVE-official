"use client";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../../lib/utils.js";
/**
 * KPI delta pill that color-codes positive/negative trends.
 */
export function KpiDelta({ value, className }) {
    const positive = value >= 0;
    const sign = positive ? "+" : "";
    return (_jsxs("span", { className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs", positive
            ? "bg-green-500/15 text-green-400"
            : "bg-red-500/15 text-red-400", className), children: [positive ? "\u25B2" : "\u25BC", " ", sign, value, "%"] }));
}
//# sourceMappingURL=kpi-delta.js.map