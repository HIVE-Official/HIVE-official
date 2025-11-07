import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const checkboxVariants: (props?: {
    variant?: "success" | "warning" | "default" | "destructive";
    size?: "sm" | "lg" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof checkboxVariants> {
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    error?: string;
    indeterminate?: boolean;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export { Checkbox, checkboxVariants };
//# sourceMappingURL=checkbox.d.ts.map