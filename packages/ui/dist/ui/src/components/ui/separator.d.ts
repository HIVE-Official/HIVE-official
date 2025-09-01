import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const separatorVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    variant?: "default" | "strong" | "gold" | "muted" | "subtle" | "glass" | null | undefined;
    size?: "default" | "thick" | "thin" | null | undefined;
    spacing?: "default" | "loose" | "tight" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
    /**
     * Optional decorative element to display in the center of the separator
     */
    decorative?: React.ReactNode;
    /**
     * Whether the separator should be animated (subtle pulse for gold variant)
     */
    animated?: boolean;
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export { Separator, separatorVariants };
//# sourceMappingURL=separator.d.ts.map