import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const progressVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "default";
    variant?: "secondary" | "success" | "error" | "warning" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
declare const progressIndicatorVariants: (props?: {
    variant?: "secondary" | "success" | "error" | "warning" | "default" | "gradient";
    animation?: "none" | "pulse" | "indeterminate";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
    value?: number;
    max?: number;
    indeterminate?: boolean;
    showValue?: boolean;
    formatValue?: (value: number, max: number) => string;
    indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
    animation?: VariantProps<typeof progressIndicatorVariants>["animation"];
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export interface CircularProgressProps {
    value?: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    showPercentage?: boolean;
    indeterminate?: boolean;
    indicatorVariant?: "default" | "success" | "warning" | "error";
    className?: string;
}
declare const CircularProgress: React.ForwardRefExoticComponent<Omit<CircularProgressProps & React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>>;
export { Progress, CircularProgress, progressVariants, progressIndicatorVariants, };
//# sourceMappingURL=progress.d.ts.map