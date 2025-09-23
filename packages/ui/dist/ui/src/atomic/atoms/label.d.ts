import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const labelVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning" | "secondary";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
export { Label, labelVariants };
//# sourceMappingURL=label.d.ts.map