import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Tool Builder Palette
 *
 * Element palette sidebar
 */
declare const toolbuilderpaletteVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToolBuilderPaletteProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toolbuilderpaletteVariants> {
    elementTypes?: any;
    onDragStart?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ToolBuilderPalette: React.ForwardRefExoticComponent<ToolBuilderPaletteProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=tool-builder-palette.d.ts.map