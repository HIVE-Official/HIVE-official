import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const textareaVariants = cva("flex min-h-[80px] w-full rounded-lg border bg-background font-sans text-body px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-fast ease-smooth resize-none", {
    variants: {
        variant: {
            default: "border-border hover:border-accent/50",
            filled: "border-border bg-muted hover:border-accent/50 focus-visible:bg-background",
            outline: "border-2 border-border hover:border-accent focus-visible:border-accent",
            ghost: "border-transparent bg-muted/50 hover:bg-muted focus-visible:bg-background focus-visible:border-border",
        },
        size: {
            sm: "min-h-[60px] px-2 py-1 text-body-sm",
            default: "min-h-[80px] px-3 py-2 text-body",
            lg: "min-h-[120px] px-4 py-3 text-body",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Textarea = React.forwardRef(({ className, variant, size, ...props }, ref) => {
    return (_jsx("textarea", { className: cn(textareaVariants({ variant, size, className })), ref: ref, ...props }));
});
Textarea.displayName = "Textarea";
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.js.map