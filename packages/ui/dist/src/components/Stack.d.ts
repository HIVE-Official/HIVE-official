import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const stackVariants: (props?: {
    direction?: "row" | "col";
    align?: "center" | "end" | "start" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around";
    gap?: 0 | 5 | 4 | 3 | 1 | 2 | 6 | 12 | 8 | 10;
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export { Stack, stackVariants };
//# sourceMappingURL=Stack.d.ts.map