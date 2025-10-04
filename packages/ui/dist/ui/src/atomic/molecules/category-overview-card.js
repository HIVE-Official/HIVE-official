"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MotionDiv } from "../../shells/motion-safe.js";
import { transitions } from "../../lib/animations/index.js";
import { Card, CardContent } from "../atoms/card.js";
import { Badge } from "../atoms/badge.js";
import { cn } from "../../lib/utils.js";
import { ChevronRight } from "lucide-react";
/**
 * Category Overview Card
 *
 * Large clickable card for homebase category navigation.
 * Shows icon, title, count, and explore action.
 *
 * Features:
 * - Large icon display
 * - Count badge
 * - Hover lift effect
 * - Click to explore category
 */
const CategoryOverviewCard = React.forwardRef(({ className, icon: Icon, title, subtitle, count, onExplore, badge, ...props }, ref) => {
    return (_jsx(MotionDiv, { whileHover: { scale: 1.02, y: -4 }, whileTap: { scale: 0.98 }, transition: transitions.fast, children: _jsx(Card, { ref: ref, className: cn("relative overflow-hidden cursor-pointer group", "border-2 hover:border-primary/50", "transition-all duration-300", className), onClick: onExplore, ...props, children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors", children: _jsx(Icon, { className: "h-8 w-8", "aria-hidden": "true" }) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-xl font-bold tracking-tight group-hover:text-primary transition-colors", children: title }), badge && (_jsx(Badge, { variant: "sophomore", className: "text-xs", children: badge }))] }), subtitle && (_jsx("p", { className: "text-sm text-muted-foreground", children: subtitle }))] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-3xl font-bold text-primary", children: count }), _jsx("div", { className: "text-xs text-muted-foreground", children: count === 1 ? 'space' : 'spaces' })] }), _jsx(ChevronRight, { className: "h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all", "aria-hidden": "true" })] })] }) }) }) }));
});
CategoryOverviewCard.displayName = "CategoryOverviewCard";
export { CategoryOverviewCard };
//# sourceMappingURL=category-overview-card.js.map