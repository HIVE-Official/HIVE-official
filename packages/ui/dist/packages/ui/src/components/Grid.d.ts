import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const gridVariants: (props?: {
    cols?: 1 | 4 | 10 | 2 | 8 | 5 | 12 | 3 | 6 | 7 | 9 | 11;
    gap?: 0 | 1 | 4 | 10 | 2 | 8 | 5 | 12 | 3 | 6;
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
export { Grid, gridVariants };
//# sourceMappingURL=Grid.d.ts.map