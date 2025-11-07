import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const containerVariants: (props?: {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "xs" | "2xl";
    padding?: "sm" | "md" | "lg" | "xl" | "none";
    bleed?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
}
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
export { containerVariants };
//# sourceMappingURL=container.d.ts.map