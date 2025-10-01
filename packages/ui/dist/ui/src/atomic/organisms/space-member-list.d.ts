import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Member List
 *
 * List of space members with filters
 */
declare const spacememberlistVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceMemberListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacememberlistVariants> {
    members?: any;
    onFilter?: any;
    onSearch?: any;
    isLeader?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceMemberList: React.ForwardRefExoticComponent<SpaceMemberListProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-member-list.d.ts.map