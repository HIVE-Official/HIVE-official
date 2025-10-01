import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Tool Browse Grid
 *
 * Grid of browsable tools
 */
declare const toolbrowsegridVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToolBrowseGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toolbrowsegridVariants> {
    tools?: any;
    onInstall?: any;
    onRun?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ToolBrowseGrid: React.ForwardRefExoticComponent<ToolBrowseGridProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=tool-browse-grid.d.ts.map