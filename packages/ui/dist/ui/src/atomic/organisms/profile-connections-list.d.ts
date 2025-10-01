import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Connections List
 *
 * List of user connections
 */
declare const profileconnectionslistVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileConnectionsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileconnectionslistVariants> {
    connections?: any;
    onSearch?: any;
    onFilter?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileConnectionsList: React.ForwardRefExoticComponent<ProfileConnectionsListProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-connections-list.d.ts.map