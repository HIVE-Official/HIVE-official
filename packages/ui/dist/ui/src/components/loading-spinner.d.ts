import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const spinnerVariants: (props?: {
    variant?: "default" | "surface" | "muted" | "foreground";
    size?: "default" | "sm" | "lg" | "xl" | "xs";
} & import("class-variance-authority/types").ClassProp) => string;
export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
    /** Optional loading message */
    message?: string;
    /** Show the spinner centered in a container */
    centered?: boolean;
}
declare const LoadingSpinner: React.ForwardRefExoticComponent<LoadingSpinnerProps & React.RefAttributes<HTMLDivElement>>;
declare const PageLoader: React.ForwardRefExoticComponent<Omit<LoadingSpinnerProps, "size" | "centered"> & React.RefAttributes<HTMLDivElement>>;
declare const InlineLoader: React.ForwardRefExoticComponent<Omit<LoadingSpinnerProps, "centered"> & React.RefAttributes<HTMLDivElement>>;
declare const CardLoader: React.ForwardRefExoticComponent<Omit<LoadingSpinnerProps, "size"> & React.RefAttributes<HTMLDivElement>>;
export { LoadingSpinner, PageLoader, InlineLoader, CardLoader, spinnerVariants };
//# sourceMappingURL=loading-spinner.d.ts.map