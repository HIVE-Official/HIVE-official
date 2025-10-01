import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Discovery Hub
 *
 * Space discovery with featured, trending, recommendations
 */
declare const spacediscoveryhubVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceDiscoveryHubProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacediscoveryhubVariants> {
    featured?: any;
    trending?: any;
    recommended?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceDiscoveryHub: React.ForwardRefExoticComponent<SpaceDiscoveryHubProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-discovery-hub.d.ts.map