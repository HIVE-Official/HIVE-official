import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const stackVariants = cva("flex gap-4", {
    variants: {
        direction: {
            column: "flex-col",
            row: "flex-row",
        },
        gap: {
            none: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
        },
        align: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justify: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
            evenly: "justify-evenly",
        },
        wrap: {
            false: "flex-nowrap",
            true: "flex-wrap",
        },
        fullHeight: {
            true: "h-full",
        },
    },
    defaultVariants: {
        direction: "column",
        gap: "md",
        align: "stretch",
        justify: "start",
        wrap: false,
    },
});
export const Stack = React.forwardRef(({ className, direction, gap, align, justify, wrap, fullHeight, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(stackVariants({ direction, gap, align, justify, wrap, fullHeight }), className), ...props }));
});
Stack.displayName = "Stack";
const stackFactory = (direction, defaultAlign) => {
    return React.forwardRef(({ align, ...props }, ref) => (_jsx(Stack, { ref: ref, direction: direction, align: align ?? defaultAlign, ...props })));
};
export const HStack = stackFactory("row", "center");
HStack.displayName = "HStack";
export const VStack = stackFactory("column", "stretch");
VStack.displayName = "VStack";
export const Cluster = React.forwardRef(({ className, gap, justify, align, alignY, fullHeight, ...props }, ref) => {
    return (_jsx(Stack, { ref: ref, className: cn("flex-wrap", className), direction: "row", wrap: true, gap: gap ?? "md", justify: justify ?? "start", align: align ?? alignY ?? "center", fullHeight: fullHeight, ...props }));
});
Cluster.displayName = "Cluster";
export { stackVariants };
//# sourceMappingURL=stack.js.map