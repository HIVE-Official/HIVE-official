"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const gridVariants = cva("grid", {
    variants: {
        columns: {
            1: "grid-cols-1",
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
            5: "grid-cols-5",
            6: "grid-cols-6",
            12: "grid-cols-12",
            auto: "grid-cols-auto",
            "auto-fit": "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
            "auto-fill": "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
        },
        gap: {
            0: "gap-0",
            1: "gap-1",
            2: "gap-2",
            3: "gap-3",
            4: "gap-4",
            5: "gap-5",
            6: "gap-6",
            8: "gap-8",
            10: "gap-10",
            12: "gap-12",
        },
        responsive: {
            none: "",
            sm: "sm:grid-cols-2",
            md: "md:grid-cols-3",
            lg: "lg:grid-cols-4",
            xl: "xl:grid-cols-5",
            adaptive: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        },
    },
    defaultVariants: {
        columns: 1,
        gap: 4,
        responsive: "none",
    },
});
const Grid = React.forwardRef(({ className, columns, gap, responsive, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(gridVariants({ columns, gap, responsive }), className), ...props, children: children }));
});
Grid.displayName = "Grid";
export { Grid, gridVariants };
//# sourceMappingURL=grid.js.map