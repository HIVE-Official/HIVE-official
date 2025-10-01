import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Header
 *
 * Complete profile header
 */
declare const profileheaderVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileheaderVariants> {
    user?: any;
    coverPhoto?: any;
    isOwnProfile?: any;
    isConnected?: any;
    stats?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileHeader: React.ForwardRefExoticComponent<ProfileHeaderProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-header.d.ts.map