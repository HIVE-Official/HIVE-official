import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Header
 *
 * Space header with cover, name, join button, etc
 */
declare const spaceheaderVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceheaderVariants> {
    name?: any;
    description?: any;
    coverImage?: any;
    icon?: any;
    memberCount?: any;
    isJoined?: any;
    isLeader?: any;
    isPrivate?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceHeader: React.ForwardRefExoticComponent<SpaceHeaderProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-header.d.ts.map