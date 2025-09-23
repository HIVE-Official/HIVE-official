import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputEnhancedVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning";
    size?: "default" | "sm" | "lg";
    width?: "auto" | "full" | "fit";
} & import("class-variance-authority/types").ClassProp) => string;
export interface InputEnhancedProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "width">, VariantProps<typeof inputEnhancedVariants> {
    label?: string;
    description?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
}
declare const InputEnhanced: React.ForwardRefExoticComponent<InputEnhancedProps & React.RefAttributes<HTMLInputElement>>;
export { InputEnhanced, inputEnhancedVariants };
//# sourceMappingURL=input-enhanced.d.ts.map