import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const separatorVariants: (props?: {
    orientation?: "horizontal" | "vertical";
    inset?: "sm" | "lg" | "none" | "md";
    tone?: "default" | "muted" | "contrast";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
}
export declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export { separatorVariants };
//# sourceMappingURL=separator.d.ts.map