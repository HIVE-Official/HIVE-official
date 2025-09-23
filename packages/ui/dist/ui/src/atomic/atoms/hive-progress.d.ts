import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveProgressVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error" | "primary";
    size?: "default" | "sm" | "lg" | "xl";
    animation?: "none" | "pulse" | "bounce" | "spin";
} & import("class-variance-authority/types").ClassProp) => string;
declare const hiveProgressBarVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error" | "primary";
    gradient?: "none" | "subtle" | "vibrant" | "hive";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveProgressVariants> {
    value?: number;
    max?: number;
    showLabel?: boolean;
    showPercentage?: boolean;
    label?: string;
    gradient?: VariantProps<typeof hiveProgressBarVariants>["gradient"];
    indeterminate?: boolean;
}
declare const HiveProgress: React.ForwardRefExoticComponent<HiveProgressProps & React.RefAttributes<HTMLDivElement>>;
export { HiveProgress, hiveProgressVariants, hiveProgressBarVariants };
//# sourceMappingURL=hive-progress.d.ts.map