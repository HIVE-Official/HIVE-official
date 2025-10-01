import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Member Card
 *
 * Member card in space member list
 */
declare const spacemembercardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceMemberCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacemembercardVariants> {
    name?: any;
    avatar?: any;
    role?: any;
    joinDate?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceMemberCard: React.ForwardRefExoticComponent<SpaceMemberCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-member-card.d.ts.map