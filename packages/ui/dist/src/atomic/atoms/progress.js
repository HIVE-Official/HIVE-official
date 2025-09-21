import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const progressVariants = cva("relative h-4 w-full overflow-hidden rounded-full bg-[var(--hive-background-tertiary)]", {
    variants: {
        size: {
            default: "h-4",
            sm: "h-2",
            lg: "h-6",
            xl: "h-8",
        },
        variant: {
            default: "bg-[var(--hive-background-tertiary)]",
            secondary: "bg-[var(--hive-background-secondary)]",
            success: "bg-[var(--hive-status-success)]/20",
            warning: "bg-[var(--hive-status-warning)]/20",
            error: "bg-[var(--hive-status-error)]/20",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});
const progressIndicatorVariants = cva("h-full w-full flex-1 bg-[var(--hive-brand-primary)] transition-all duration-300 ease-in-out", {
    variants: {
        variant: {
            default: "bg-[var(--hive-brand-primary)]",
            secondary: "bg-[var(--hive-text-secondary)]",
            success: "bg-[var(--hive-status-success)]",
            warning: "bg-[var(--hive-status-warning)]",
            error: "bg-[var(--hive-status-error)]",
            gradient: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
        },
        animation: {
            none: "",
            pulse: "animate-pulse",
            indeterminate: "animate-bounce",
        },
    },
    defaultVariants: {
        variant: "default",
        animation: "none",
    },
});
const Progress = React.forwardRef(({ className, value = 0, max = 100, size, variant, indeterminate = false, showValue = false, formatValue, indicatorVariant, animation, ...props }, ref) => {
    const percentage = indeterminate ? 100 : Math.min(Math.max((value / max) * 100, 0), 100);
    const defaultFormatValue = React.useCallback((val, maxVal) => `${Math.round((val / maxVal) * 100)}%`, []);
    const displayValue = formatValue
        ? formatValue(value, max)
        : defaultFormatValue(value, max);
    return (_jsxs("div", { className: "w-full", children: [showValue && (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Progress" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: indeterminate ? "Loading..." : displayValue })] })), _jsx("div", { ref: ref, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": indeterminate ? undefined : value, "aria-label": indeterminate ? "Loading" : `Progress: ${displayValue}`, className: cn(progressVariants({ size, variant }), className), ...props, children: _jsx("div", { className: cn(progressIndicatorVariants({
                        variant: indicatorVariant || "default",
                        animation: indeterminate ? "indeterminate" : animation
                    })), style: {
                        transform: indeterminate
                            ? "translateX(-100%)"
                            : `translateX(-${100 - percentage}%)`,
                        transition: indeterminate
                            ? "transform 1s ease-in-out infinite alternate"
                            : "transform 300ms ease-in-out",
                    } }) })] }));
});
Progress.displayName = "Progress";
const CircularProgress = React.forwardRef(({ value = 0, max = 100, size = 40, strokeWidth = 4, indeterminate = false, showPercentage = false, indicatorVariant = "default", className, ...props }, ref) => {
    const percentage = indeterminate ? 25 : Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (_jsxs("div", { className: "relative inline-flex items-center justify-center", children: [_jsxs("svg", { ref: ref, width: size, height: size, className: cn("transform -rotate-90", className), ...props, children: [_jsx("circle", { cx: size / 2, cy: size / 2, r: radius, strokeWidth: strokeWidth, stroke: "var(--hive-background-tertiary)", fill: "transparent" }), _jsx("circle", { cx: size / 2, cy: size / 2, r: radius, strokeWidth: strokeWidth, stroke: indicatorVariant === "success" ? "var(--hive-status-success)" :
                            indicatorVariant === "warning" ? "var(--hive-status-warning)" :
                                indicatorVariant === "error" ? "var(--hive-status-error)" :
                                    "var(--hive-brand-primary)", fill: "transparent", strokeDasharray: circumference, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", className: cn("transition-all duration-300 ease-in-out", indeterminate && "animate-spin"), style: {
                            animationDuration: indeterminate ? "2s" : undefined
                        } })] }), showPercentage && !indeterminate && (_jsxs("span", { className: "absolute text-xs font-medium text-[var(--hive-text-primary)]", children: [Math.round(percentage), "%"] }))] }));
});
CircularProgress.displayName = "CircularProgress";
export { Progress, CircularProgress, progressVariants, progressIndicatorVariants, };
//# sourceMappingURL=progress.js.map