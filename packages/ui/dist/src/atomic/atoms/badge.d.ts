import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: {
    variant?: "primary" | "secondary" | "success" | "warning" | "default" | "outline" | "destructive" | "freshman" | "sophomore" | "junior" | "senior" | "skill-tag" | "building-tools" | "prof-favorite" | "major-tag" | "active-tag" | "tool-tag" | "leadership";
} & import("class-variance-authority/types").ClassProp) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map