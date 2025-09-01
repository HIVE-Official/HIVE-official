import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils.js";
import { MotionDiv } from "./motion-wrapper.js";
const spinnerVariants = cva("animate-spin", {
    variants: {
        variant: {
            default: "text-accent",
            muted: "text-muted",
            foreground: "text-foreground",
            surface: "text-muted-foreground",
        },
        size: {
            xs: "h-3 w-3",
            sm: "h-4 w-4",
            default: "h-6 w-6",
            lg: "h-8 w-8",
            xl: "h-12 w-12",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const LoadingSpinner = React.forwardRef(({ className, variant, size, message, centered, ...props }, ref) => {
    // Extract conflicting HTML animation events
    const { onAnimationStart: _onAnimationStart, onAnimationEnd: _onAnimationEnd, onAnimationIteration: _onAnimationIteration, onTransitionStart: _onTransitionStart, onTransitionEnd: _onTransitionEnd, onTransitionRun: _onTransitionRun, onTransitionCancel: _onTransitionCancel, ...motionProps } = props;
    const spinner = (_jsxs(MotionDiv, { ref: ref, className: cn("flex items-center", centered && "justify-center min-h-[200px]", !centered && "justify-start", className), initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }, ...motionProps, children: [_jsx(MotionDiv, { animate: {
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }, transition: {
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: [0.33, 0.65, 0, 1] }
                }, children: _jsx(Loader2, { className: cn(spinnerVariants({ variant, size })) }) }), message && (_jsx("span", { className: "ml-3 text-body font-sans text-muted", children: message }))] }));
    if (centered) {
        return (_jsx("div", { className: "flex items-center justify-center w-full h-full", children: spinner }));
    }
    return spinner;
});
LoadingSpinner.displayName = "LoadingSpinner";
// Convenience components for common use cases
const PageLoader = React.forwardRef((props, ref) => (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx(LoadingSpinner, { ...props, size: "xl", centered: true, ref: ref }) })));
PageLoader.displayName = "PageLoader";
const InlineLoader = React.forwardRef((props, ref) => _jsx(LoadingSpinner, { ...props, size: "sm", ref: ref }));
InlineLoader.displayName = "InlineLoader";
const CardLoader = React.forwardRef((props, ref) => (_jsx("div", { className: "bg-surface-01 border border-border rounded-lg p-8", children: _jsx(LoadingSpinner, { ...props, size: "lg", centered: true, ref: ref }) })));
CardLoader.displayName = "CardLoader";
export { LoadingSpinner, PageLoader, InlineLoader, CardLoader, spinnerVariants };
//# sourceMappingURL=loading-spinner.js.map