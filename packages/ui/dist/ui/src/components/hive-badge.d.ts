import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveBadgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HiveBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveBadgeVariants> {
}
declare const HiveBadge: React.ForwardRefExoticComponent<HiveBadgeProps & React.RefAttributes<HTMLDivElement>>;
export { HiveBadge, hiveBadgeVariants };
//# sourceMappingURL=hive-badge.d.ts.map