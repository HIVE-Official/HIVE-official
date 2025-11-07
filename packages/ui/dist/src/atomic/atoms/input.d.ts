import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: {
    variant?: "success" | "error" | "warning" | "default" | "ghost" | "destructive" | "brand" | "subtle";
    size?: "sm" | "lg" | "xl" | "default";
    width?: "full" | "auto" | "fit";
} & import("class-variance-authority/types").ClassProp) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    description?: React.ReactNode;
    error?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
    wrapperClassName?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants };
//# sourceMappingURL=input.d.ts.map