import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Social Links
 *
 * Social media links display
 */
declare const profilesociallinksVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileSocialLinksProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profilesociallinksVariants> {
    links?: any;
    isEditable?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileSocialLinks: React.ForwardRefExoticComponent<ProfileSocialLinksProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-social-links.d.ts.map