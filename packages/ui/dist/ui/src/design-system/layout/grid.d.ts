/**
 * HIVE Grid System
 * Campus-first responsive grid layout component
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const gridVariants: (props?: {
    cols?: 1 | 3 | 2 | 4 | 5 | 12 | 6;
    gap?: "sm" | "md" | "lg" | "xl" | "none" | "xs" | "2xl";
    responsive?: boolean;
    campusLayout?: "course-grid" | "profile-grid" | "activity-grid" | "tool-grid";
} & import("class-variance-authority/types").ClassProp) => string;
export interface GridProps extends VariantProps<typeof gridVariants> {
    children: React.ReactNode;
    className?: string;
}
export declare const Grid: React.FC<GridProps>;
//# sourceMappingURL=grid.d.ts.map