import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const stackVariants: (props?: {
    direction?: "row" | "col";
    align?: "end" | "center" | "start" | "stretch";
    justify?: "end" | "center" | "start" | "between" | "around";
    gap?: 0 | 1 | 3 | 2 | 4 | 8 | 10 | 5 | 12 | 6;
} & import("class-variance-authority/types").ClassProp) => string;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export { Stack, stackVariants };
//# sourceMappingURL=Stack.d.ts.map