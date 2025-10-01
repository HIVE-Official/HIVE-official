import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const gridVariants: (props?: {
    columns?: 1 | "auto" | 2 | 3 | "auto-fit" | "auto-fill" | 4 | 5 | 6 | 12;
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 12 | 8 | 10;
    responsive?: "none" | "sm" | "lg" | "md" | "xl" | "adaptive";
} & import("class-variance-authority/types").ClassProp) => string;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
    children: React.ReactNode;
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export { Grid, gridVariants };
//# sourceMappingURL=grid.d.ts.map