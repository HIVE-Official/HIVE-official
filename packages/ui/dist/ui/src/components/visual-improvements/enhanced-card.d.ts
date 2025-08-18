import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const enhancedCardVariants: (props?: {
    variant?: "pulse" | "neon" | "signature" | "bulletin" | "mesh";
    size?: "sm" | "md" | "lg" | "xl";
    elevation?: "flat" | "high" | "low" | "medium" | "dramatic";
} & import("class-variance-authority/types").ClassProp) => string;
export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof enhancedCardVariants> {
    asChild?: boolean;
}
declare const EnhancedCard: React.ForwardRefExoticComponent<EnhancedCardProps & React.RefAttributes<HTMLDivElement>>;
export { EnhancedCard, enhancedCardVariants };
//# sourceMappingURL=enhanced-card.d.ts.map