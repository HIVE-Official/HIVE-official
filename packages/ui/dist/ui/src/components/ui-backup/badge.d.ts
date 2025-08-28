import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: {
    variant?: "secondary" | "accent" | "destructive" | "outline" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    children?: React.ReactNode;
    className?: string;
    variant?: "default" | "accent" | "secondary" | "destructive" | "outline";
}
declare function Badge({ className, variant, children, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map