import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
const gridVariants = cva("grid w-full gap-6", {
    variants: {
        columns: {
            1: "grid-cols-1",
            2: "grid-cols-1 sm:grid-cols-2",
            3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
            4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            6: "grid-cols-2 sm:grid-cols-3 xl:grid-cols-6",
            12: "grid-cols-1 lg:grid-cols-12",
            auto: "grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
        },
        gap: {
            none: "gap-0",
            xs: "gap-2",
            sm: "gap-3",
            md: "gap-6",
            lg: "gap-8",
            xl: "gap-12",
        },
        align: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
        },
        justify: {
            start: "justify-items-start",
            center: "justify-items-center",
            end: "justify-items-end",
            stretch: "justify-items-stretch",
        },
        flow: {
            row: "",
            col: "grid-flow-col",
            dense: "grid-flow-row-dense",
        },
    },
    defaultVariants: {
        columns: 1,
        gap: "md",
        align: "stretch",
        justify: "stretch",
        flow: "row",
    },
});
export const Grid = React.forwardRef(({ className, columns, gap, align, justify, flow, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(gridVariants({ columns, gap, align, justify, flow }), className), ...props }));
});
Grid.displayName = "Grid";
const columnsVariants = cva("grid grid-cols-1 gap-6", {
    variants: {
        layout: {
            split: "lg:grid-cols-2",
            two: "md:grid-cols-2",
            three: "md:grid-cols-3",
            sidebarLeft: "lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]",
            sidebarRight: "lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]",
            twoThirds: "lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)]",
            threeQuarter: "lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]",
            auto: "lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
        },
        gap: {
            none: "gap-0",
            xs: "gap-2",
            sm: "gap-3",
            md: "gap-6",
            lg: "gap-8",
            xl: "gap-12",
        },
        align: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
        },
        equalHeight: {
            true: "[&>*]:min-h-full",
        },
        clamp: {
            true: "[&>*]:min-w-0",
        },
    },
    defaultVariants: {
        layout: "two",
        gap: "md",
        align: "stretch",
    },
});
export const Columns = React.forwardRef(({ className, layout, gap, align, equalHeight, clamp, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(columnsVariants({ layout, gap, align, equalHeight, clamp }), className), ...props }));
});
Columns.displayName = "Columns";
export { gridVariants, columnsVariants };
//# sourceMappingURL=grid.js.map