import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const separatorVariants = cva("bg-[var(--hive-border-subtle)]", {
    variants: {
        orientation: {
            horizontal: "h-px w-full",
            vertical: "w-px h-full",
        },
        inset: {
            none: "",
            sm: "mx-4",
            md: "mx-6",
            lg: "mx-8",
        },
        tone: {
            default: "bg-[var(--hive-border-subtle)]",
            muted: "bg-[var(--hive-border-muted)]",
            contrast: "bg-[var(--hive-border-primary)]/80",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
        inset: "none",
        tone: "default",
    },
});
export const Separator = React.forwardRef(({ className, orientation, inset, tone, role = "separator", ...props }, ref) => {
    const ariaOrientation = orientation === "vertical" ? "vertical" : "horizontal";
    return (_jsx("div", { ref: ref, role: role, "aria-orientation": ariaOrientation, className: cn(separatorVariants({ orientation, inset, tone }), className), ...props }));
});
Separator.displayName = "Separator";
export { separatorVariants };
//# sourceMappingURL=separator.js.map