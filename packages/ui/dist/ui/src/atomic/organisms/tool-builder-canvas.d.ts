import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Tool Builder Canvas
 *
 * Drag-drop canvas for tool builder
 */
declare const toolbuildercanvasVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToolBuilderCanvasProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toolbuildercanvasVariants> {
    elements?: any;
    selectedElement?: any;
    onElementAdd?: any;
    onElementSelect?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ToolBuilderCanvas: React.ForwardRefExoticComponent<ToolBuilderCanvasProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=tool-builder-canvas.d.ts.map