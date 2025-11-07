import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const labelVariants: (props?: {
    variant?: "secondary" | "success" | "warning" | "default" | "destructive";
    size?: "sm" | "lg" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
export { Label, labelVariants };
//# sourceMappingURL=label.d.ts.map