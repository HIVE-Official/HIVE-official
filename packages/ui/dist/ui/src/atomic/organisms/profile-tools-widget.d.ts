import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Tools Widget
 *
 * User tools widget
 */
declare const profiletoolswidgetVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileToolsWidgetProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profiletoolswidgetVariants> {
    tools?: any;
    canCreate?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileToolsWidget: React.ForwardRefExoticComponent<ProfileToolsWidgetProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-tools-widget.d.ts.map