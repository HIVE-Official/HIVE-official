/**
 * HIVE Stack System
 * Campus-first flexible stacking layout component
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const stackVariants: (props?: {
    direction?: "row" | "column" | "column-reverse" | "row-reverse";
    align?: "end" | "center" | "baseline" | "start" | "stretch";
    justify?: "end" | "center" | "start" | "between" | "around" | "evenly";
    gap?: "sm" | "md" | "lg" | "xl" | "none" | "xs" | "2xl";
    wrap?: boolean;
    campusLayout?: "navigation" | "course-header" | "profile-info" | "activity-row" | "tool-actions" | "form-field" | "card-content";
} & import("class-variance-authority/types").ClassProp) => string;
export interface StackProps extends VariantProps<typeof stackVariants> {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Stack: React.FC<StackProps>;
//# sourceMappingURL=stack.d.ts.map