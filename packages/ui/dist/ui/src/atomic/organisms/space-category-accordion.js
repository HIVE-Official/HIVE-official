"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger, } from "../atoms/accordion.js";
import { cn } from "../../lib/utils.js";
/**
 * Space Category Accordion Item
 *
 * Built on shadcn Accordion primitive with HIVE visual language.
 * Uses design tokens from hive-theme.ts (monochrome + gold accent).
 *
 * Features:
 * - Accordion pattern for collapsible categories
 * - Monochrome design with gold accent for recommended
 * - Icon in circular container
 * - Count badge
 * - Proper semantic HTML
 */
const SpaceCategoryAccordion = React.forwardRef(({ className, value, icon: Icon, title, subtitle, count, isRecommended = false, children, ...props }, ref) => {
    return (_jsxs(AccordionItem, { value: value, className: cn("border rounded-lg overflow-hidden", "hover:border-[#FFD700]/20 transition-colors duration-fast", className), ...props, children: [_jsx(AccordionTrigger, { className: cn("px-6 py-6 hover:no-underline", "[&[data-state=open]]:border-b", "transition-all duration-[400ms]"), children: _jsxs("div", { className: "flex items-center gap-4 flex-1 text-left", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shrink-0 transition-colors duration-fast group-hover:bg-white/5", children: _jsx(Icon, { className: "h-5 w-5 text-white/70", "aria-hidden": "true" }) }), _jsxs("div", { className: "flex-1 space-y-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight leading-tight", children: title }), _jsx("span", { className: "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-2 text-xs font-semibold text-white", children: count }), isRecommended && (_jsx("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-xs font-medium", children: "\u2728 For You" }))] }), subtitle && (_jsx("p", { className: "text-sm text-white/70 leading-normal line-clamp-1", children: subtitle }))] })] }) }), _jsx(AccordionContent, { className: "px-6 pb-6 pt-3", children: children })] }));
});
SpaceCategoryAccordion.displayName = "SpaceCategoryAccordion";
export { SpaceCategoryAccordion };
//# sourceMappingURL=space-category-accordion.js.map