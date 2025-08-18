import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const gridVariants: (props?: {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 7 | 8 | 9 | 12 | 11;
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 8 | 12;
} & import("class-variance-authority/types").ClassProp) => string;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export { Grid, gridVariants };
//# sourceMappingURL=Grid.d.ts.map