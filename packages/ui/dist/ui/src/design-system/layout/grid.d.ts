/**
 * HIVE Grid System
 * Campus-first responsive grid layout component
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const gridVariants: (props?: ({
    cols?: 2 | 1 | 3 | 4 | 5 | 6 | 12 | null | undefined;
    gap?: "xs" | "sm" | "md" | "lg" | "xl" | "none" | "2xl" | null | undefined;
    responsive?: boolean | null | undefined;
    campusLayout?: "course-grid" | "profile-grid" | "activity-grid" | "tool-grid" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface GridProps extends VariantProps<typeof gridVariants> {
    children: React.ReactNode;
    className?: string;
}
export declare const Grid: React.FC<GridProps>;
//# sourceMappingURL=grid.d.ts.map