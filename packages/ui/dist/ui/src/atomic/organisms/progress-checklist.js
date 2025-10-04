"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/card";
import { Progress } from "../atoms/progress";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { cn } from "../../lib/utils";
const ProgressChecklist = React.forwardRef(({ className, title = "Progress", description, items, percentage: overridePercentage, targetPercentage = 100, targetReachedLabel = "✓ Target Reached", targetNotReachedLabel, variant = "default", showIncompleteOnly = false, ...props }, ref) => {
    // Calculate percentage from items if not provided
    const calculatedPercentage = React.useMemo(() => {
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        const completedWeight = items
            .filter((item) => item.completed)
            .reduce((sum, item) => sum + item.weight, 0);
        return Math.round((completedWeight / totalWeight) * 100);
    }, [items]);
    const percentage = overridePercentage ?? calculatedPercentage;
    const isTargetReached = percentage >= targetPercentage;
    const displayItems = showIncompleteOnly
        ? items.filter((item) => !item.completed)
        : items;
    // Generate default description based on state
    const defaultDescription = isTargetReached
        ? targetReachedLabel
        : targetNotReachedLabel || `${targetPercentage - percentage}% remaining to reach ${targetPercentage}% target`;
    const finalDescription = description ?? defaultDescription;
    if (variant === "compact") {
        return (_jsxs("div", { ref: ref, className: cn("space-y-3", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: title }), _jsxs("span", { className: "text-sm font-bold text-foreground", children: [percentage, "%"] })] }), _jsx(Progress, { value: percentage, className: "h-2" }), !isTargetReached && (_jsxs("p", { className: "text-xs text-muted-foreground", children: [targetPercentage - percentage, "% to complete \u2022 Target: ", targetPercentage, "%"] }))] }));
    }
    return (_jsxs(Card, { ref: ref, className: cn("", className), ...props, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [title, isTargetReached && (_jsx(Badge, { variant: "freshman", className: "ml-2", children: targetReachedLabel }))] }), _jsx(CardDescription, { children: finalDescription })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-3xl font-bold text-foreground", children: [percentage, "%"] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Complete" })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Progress, { value: percentage, className: "h-3" }), displayItems.length > 0 && (_jsx("div", { className: "space-y-3 pt-2", children: displayItems.map((item) => (_jsxs("div", { className: cn("flex items-start gap-3 p-3 rounded-lg border border-border transition-smooth ease-liquid", item.completed
                                ? "bg-primary/5 border-primary/20"
                                : "bg-muted/30 hover:bg-muted/50"), children: [_jsx("div", { className: cn("shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5", item.completed
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted border-2 border-border"), children: item.completed && (_jsx("svg", { className: "h-3 w-3", fill: "none", strokeWidth: "3", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("p", { className: cn("text-sm font-medium", item.completed
                                                        ? "text-primary line-through"
                                                        : "text-foreground"), children: item.label }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["+", item.weight, "%"] })] }), item.description && (_jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.description }))] }), !item.completed && item.onAction && (_jsx(Button, { size: "sm", variant: "outline", onClick: item.onAction, className: "shrink-0", children: item.actionLabel || "Complete" }))] }, item.id))) })), showIncompleteOnly && displayItems.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3", children: _jsx("svg", { className: "h-8 w-8 text-primary", fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "All items completed!" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Great work on completing everything" })] }))] })] }));
});
ProgressChecklist.displayName = "ProgressChecklist";
export { ProgressChecklist };
//# sourceMappingURL=progress-checklist.js.map