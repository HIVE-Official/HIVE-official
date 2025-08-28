import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const gridVariants: (props?: {
    cols?: 1 | 3 | 2 | 4 | 9 | 8 | 11 | 10 | 5 | 12 | 7 | 6;
    gap?: 0 | 1 | 3 | 2 | 4 | 8 | 10 | 5 | 12 | 6;
} & import("class-variance-authority/types").ClassProp) => string;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export { Grid, gridVariants };
//# sourceMappingURL=Grid.d.ts.map