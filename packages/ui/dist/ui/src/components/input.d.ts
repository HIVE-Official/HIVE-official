import * as React from "react";
import { type VariantProps } from "class-variance-authority";
export type InputState = 'default' | 'error' | 'success' | 'loading';
declare const inputVariants: (props?: {
    variant?: "default" | "filled" | "floating" | "accent" | "search" | "minimal";
    inputSize?: "sm" | "md" | "lg";
    state?: "default" | "success" | "error" | "loading";
} & import("class-variance-authority/types").ClassProp) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, Omit<VariantProps<typeof inputVariants>, "state"> {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
    loading?: boolean;
    state?: InputState;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
declare const SimpleInput: React.ForwardRefExoticComponent<Omit<InputProps, "success" | "error" | "icon" | "loading" | "rightIcon" | "label" | "hint" | "showPasswordToggle"> & React.RefAttributes<HTMLInputElement>>;
export { Input, SimpleInput, inputVariants };
//# sourceMappingURL=input.d.ts.map