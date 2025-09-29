import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: {
    variant?: "default" | "success" | "error" | "glow" | "glass";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants };
//# sourceMappingURL=input.d.ts.map