"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../atoms/badge.js";
import { cn } from "../../lib/utils.js";
/**
 * Compact tag list that collapses overflow into a "+N" badge.
 */
export function TagList({ tags, max = 6, className }) {
    const display = tags.slice(0, max);
    const extra = tags.length - display.length;
    return (_jsxs("div", { className: cn("flex flex-wrap gap-2", className), children: [display.map((tag) => (_jsx(Badge, { variant: "secondary", className: "capitalize", children: tag }, tag))), extra > 0 ? (_jsxs(Badge, { variant: "secondary", children: ["+", extra] })) : null] }));
}
//# sourceMappingURL=tag-list.js.map