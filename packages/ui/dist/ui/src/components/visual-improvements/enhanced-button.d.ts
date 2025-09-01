import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const enhancedButtonVariants: (props?: ({
    variant?: "pulse" | "magnetic" | "signature" | "neon" | "chunky" | "sticker" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
    intensity?: "normal" | "high" | "subtle" | "extreme" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof enhancedButtonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const EnhancedButton: React.ForwardRefExoticComponent<EnhancedButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { EnhancedButton, enhancedButtonVariants };
//# sourceMappingURL=enhanced-button.d.ts.map