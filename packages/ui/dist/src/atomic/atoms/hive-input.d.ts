import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveInputVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "brand" | "ghost";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof hiveInputVariants> {
    label?: string;
    helperText?: string;
    error?: string;
}
declare const HiveInput: React.ForwardRefExoticComponent<HiveInputProps & React.RefAttributes<HTMLInputElement>>;
export { HiveInput, hiveInputVariants };
//# sourceMappingURL=hive-input.d.ts.map