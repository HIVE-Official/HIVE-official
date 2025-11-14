import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const surfaceVariants: (props?: {
    tone?: "glass" | "default" | "contrast" | "subtle" | "inverted";
    elevation?: "sm" | "md" | "lg" | "flat";
    padding?: "sm" | "md" | "lg" | "xl" | "none" | "xs";
    radius?: "md" | "lg" | "full";
    interactive?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {
    /**
     * Adds `role="presentation"` when the surface is purely decorative.
     */
    decorative?: boolean;
}
export declare const Surface: React.ForwardRefExoticComponent<SurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { surfaceVariants };
//# sourceMappingURL=surface.d.ts.map