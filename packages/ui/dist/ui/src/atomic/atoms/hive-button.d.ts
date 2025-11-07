import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveButtonVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning" | "link" | "brand" | "outline" | "secondary" | "ghost";
    size?: "default" | "icon" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof hiveButtonVariants> {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const HiveButton: React.ForwardRefExoticComponent<HiveButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { HiveButton, hiveButtonVariants };
//# sourceMappingURL=hive-button.d.ts.map