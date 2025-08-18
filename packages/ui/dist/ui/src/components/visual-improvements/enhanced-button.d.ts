import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const enhancedButtonVariants: (props?: {
    variant?: "pulse" | "neon" | "signature" | "magnetic" | "chunky" | "sticker";
    size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
    intensity?: "high" | "normal" | "subtle" | "extreme";
} & import("class-variance-authority/types").ClassProp) => string;
export interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof enhancedButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const EnhancedButton: React.ForwardRefExoticComponent<EnhancedButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { EnhancedButton, enhancedButtonVariants };
//# sourceMappingURL=enhanced-button.d.ts.map