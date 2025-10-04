"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe";
import { transitions } from "../../lib/animations";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
/**
 * HIVE Category Section
 *
 * Collapsible category section for space discovery.
 * Each category has unique visual identity with custom colors.
 *
 * Features:
 * - Click header to expand/collapse
 * - Smooth height animations
 * - Custom color schemes per category
 * - Large count display
 * - Icon with colored background
 */
const HiveCategorySection = React.forwardRef(({ className, icon: Icon, title, subtitle, count, defaultExpanded = false, accentColor = "#FFD700", categoryColor, children, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
    // Default to gold accent if no category color provided
    const colors = categoryColor || {
        iconBg: `${accentColor}15`,
        iconFg: accentColor,
        border: accentColor,
    };
    return (_jsxs("section", { ref: ref, className: cn("space-y-0 rounded-lg border border-border overflow-hidden", className), ...props, children: [_jsxs("button", { onClick: () => setIsExpanded(!isExpanded), className: cn("w-full p-6 flex items-center justify-between gap-4", "transition-all duration-200", "hover:bg-muted/50", isExpanded && "bg-muted/30 border-b border-border"), children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200", style: {
                                    backgroundColor: colors.iconBg,
                                    color: colors.iconFg,
                                }, children: _jsx(Icon, { className: "h-6 w-6", "aria-hidden": "true" }) }), _jsxs("div", { className: "text-left space-y-1", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-xl font-bold tracking-tight", children: title }), _jsx("div", { className: "flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold", style: {
                                                    backgroundColor: colors.iconBg,
                                                    color: colors.iconFg,
                                                }, children: count })] }), subtitle && (_jsx("p", { className: "text-sm text-muted-foreground", children: subtitle }))] })] }), _jsx("div", { className: cn("flex-shrink-0 transition-transform duration-200", isExpanded && "rotate-180"), children: _jsx(ChevronDown, { className: "h-5 w-5 text-muted-foreground", "aria-hidden": "true" }) })] }), _jsx(AnimatePresence, { initial: false, children: isExpanded && (_jsx(MotionDiv, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: transitions.slow, className: "overflow-hidden", children: _jsx("div", { className: "p-6 pt-0", children: children }) })) })] }));
});
HiveCategorySection.displayName = "HiveCategorySection";
export { HiveCategorySection };
//# sourceMappingURL=hive-category-section.js.map