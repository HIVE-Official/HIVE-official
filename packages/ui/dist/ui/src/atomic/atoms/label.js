import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        variant: {
            default: "text-[var(--hive-text-primary)]",
            secondary: "text-[var(--hive-text-secondary)]",
            destructive: "text-[var(--hive-status-error)]",
            success: "text-[var(--hive-status-success)]",
            warning: "text-[var(--hive-status-warning)]",
        },
        size: {
            default: "text-sm",
            sm: "text-xs",
            lg: "text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Label = React.forwardRef(({ className, variant, size, ...props }, ref) => (_jsx("label", { ref: ref, className: cn(labelVariants({ variant, size }), className), ...props })));
Label.displayName = "Label";
export { Label, labelVariants };
//# sourceMappingURL=label.js.map