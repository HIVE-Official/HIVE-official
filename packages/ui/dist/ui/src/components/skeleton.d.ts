import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const skeletonVariants: (props?: {
    variant?: "default" | "subtle" | "shimmer";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
}
declare function Skeleton({ className, variant, size, ...props }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
export { Skeleton, skeletonVariants };
//# sourceMappingURL=skeleton.d.ts.map