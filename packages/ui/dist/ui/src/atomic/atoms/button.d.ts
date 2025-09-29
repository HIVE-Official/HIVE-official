import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: {
    variant?: "default" | "destructive" | "link" | "outline" | "secondary" | "primary" | "ghost" | "glow" | "glass" | "gradient";
    size?: "default" | "icon" | "sm" | "lg" | "xl" | "icon-sm" | "icon-lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map