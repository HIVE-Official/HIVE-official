import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Resources Panel
 *
 * Resources/links panel for space
 */
declare const spaceresourcespanelVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceResourcesPanelProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceresourcespanelVariants> {
    resources?: any;
    links?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceResourcesPanel: React.ForwardRefExoticComponent<SpaceResourcesPanelProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-resources-panel.d.ts.map