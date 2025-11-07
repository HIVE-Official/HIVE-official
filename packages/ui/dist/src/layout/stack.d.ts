import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const stackVariants: (props?: {
    direction?: "row" | "column";
    gap?: "sm" | "lg" | "xl" | "none" | "md" | "xs";
    align?: "center" | "end" | "start" | "baseline" | "stretch";
    justify?: "center" | "end" | "start" | "between" | "around" | "evenly";
    wrap?: boolean;
    fullHeight?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export declare const HStack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export declare const VStack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement>, Omit<VariantProps<typeof stackVariants>, "direction" | "wrap"> {
    alignY?: VariantProps<typeof stackVariants>["align"];
}
export declare const Cluster: React.ForwardRefExoticComponent<ClusterProps & React.RefAttributes<HTMLDivElement>>;
export { stackVariants };
//# sourceMappingURL=stack.d.ts.map