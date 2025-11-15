import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const wrapperVariants: (props?: {
    size?: "sm" | "md" | "lg" | "xs";
    shape?: "circle" | "rounded";
    surface?: "none" | "soft" | "solid" | "glass" | "outline";
    interactive?: boolean;
    disabled?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
type Tone = "primary" | "secondary" | "muted" | "inverse" | "accent" | "success" | "warning" | "danger";
type Surface = "none" | "soft" | "solid" | "glass" | "outline";
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "color">, VariantProps<typeof wrapperVariants> {
    as?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    tone?: Tone;
    surface?: Surface;
    iconClassName?: string;
    strokeWidth?: number;
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
export { wrapperVariants as iconWrapperVariants };
//# sourceMappingURL=icon.d.ts.map