import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const stackVariants: (props?: {
    direction?: "col" | "row";
    align?: "center" | "end" | "start" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around";
    gap?: 0 | 1 | 4 | 10 | 2 | 8 | 5 | 12 | 3 | 6;
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export { Stack, stackVariants };
//# sourceMappingURL=Stack.d.ts.map