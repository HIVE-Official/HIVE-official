import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Sidebar
 *
 * Space sidebar with about, members, events
 */
declare const spacesidebarVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceSidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacesidebarVariants> {
    about?: any;
    members?: any;
    events?: any;
    resources?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceSidebar: React.ForwardRefExoticComponent<SpaceSidebarProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-sidebar.d.ts.map