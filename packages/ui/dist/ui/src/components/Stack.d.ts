import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const stackVariants: (props?: {
    direction?: "row" | "col";
    align?: "center" | "end" | "start" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around";
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 8 | 12;
} & import("class-variance-authority/types").ClassProp) => string;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export { Stack, stackVariants };
//# sourceMappingURL=Stack.d.ts.map