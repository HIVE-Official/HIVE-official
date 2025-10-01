import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Stat Card
 *
 * Single stat display card
 */
declare const profilestatcardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileStatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profilestatcardVariants> {
    icon?: any;
    value?: any;
    label?: any;
    onClick?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileStatCard: React.ForwardRefExoticComponent<ProfileStatCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-stat-card.d.ts.map