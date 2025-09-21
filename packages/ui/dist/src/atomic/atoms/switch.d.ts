import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const switchVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
declare const switchThumbVariants: (props?: {
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">, VariantProps<typeof switchVariants> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    error?: string;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch, switchVariants, switchThumbVariants };
//# sourceMappingURL=switch.d.ts.map