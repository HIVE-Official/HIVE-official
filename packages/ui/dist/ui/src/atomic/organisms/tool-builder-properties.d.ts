import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Tool Builder Properties
 *
 * Properties panel for selected element
 */
declare const toolbuilderpropertiesVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToolBuilderPropertiesProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toolbuilderpropertiesVariants> {
    element?: any;
    onUpdate?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ToolBuilderProperties: React.ForwardRefExoticComponent<ToolBuilderPropertiesProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=tool-builder-properties.d.ts.map