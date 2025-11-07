import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const gridVariants: (props?: {
    columns?: 2 | 1 | 3 | 4 | "auto" | 6 | 12;
    gap?: "sm" | "md" | "lg" | "xl" | "none" | "xs";
    align?: "end" | "center" | "stretch" | "start";
    justify?: "end" | "center" | "stretch" | "start";
    flow?: "row" | "dense" | "col";
} & import("class-variance-authority/types").ClassProp) => string;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
declare const columnsVariants: (props?: {
    layout?: "split" | "auto" | "two" | "three" | "sidebarLeft" | "sidebarRight" | "twoThirds" | "threeQuarter";
    gap?: "sm" | "md" | "lg" | "xl" | "none" | "xs";
    align?: "end" | "center" | "stretch" | "start";
    equalHeight?: boolean;
    clamp?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
export interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof columnsVariants> {
}
export declare const Columns: React.ForwardRefExoticComponent<ColumnsProps & React.RefAttributes<HTMLDivElement>>;
export { gridVariants, columnsVariants };
//# sourceMappingURL=grid.d.ts.map