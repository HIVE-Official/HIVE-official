import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const containerVariants = cva("mx-auto w-full", {
    variants: {
        maxWidth: {
            xs: "max-w-screen-sm",
            sm: "max-w-screen-md",
            md: "max-w-screen-lg",
            lg: "max-w-screen-xl",
            xl: "max-w-[1200px]",
            "2xl": "max-w-[1400px]",
            full: "max-w-none",
        },
        padding: {
            none: "px-0",
            sm: "px-4 sm:px-6",
            md: "px-6 sm:px-8",
            lg: "px-6 sm:px-10",
            xl: "px-6 sm:px-12",
        },
        bleed: {
            true: "px-0",
        },
    },
    compoundVariants: [
        {
            bleed: true,
            class: "px-0",
        },
    ],
    defaultVariants: {
        maxWidth: "lg",
        padding: "md",
    },
});
export const Container = React.forwardRef(({ className, maxWidth, padding, bleed, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(containerVariants({ maxWidth, padding, bleed }), className), ...props }));
});
Container.displayName = "Container";
export { containerVariants };
//# sourceMappingURL=container.js.map