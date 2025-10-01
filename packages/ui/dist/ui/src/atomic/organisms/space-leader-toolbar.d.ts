import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Leader Toolbar
 *
 * Quick actions toolbar for space leaders
 */
declare const spaceleadertoolbarVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceLeaderToolbarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceleadertoolbarVariants> {
    spaceId?: any;
    actions?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceLeaderToolbar: React.ForwardRefExoticComponent<SpaceLeaderToolbarProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-leader-toolbar.d.ts.map