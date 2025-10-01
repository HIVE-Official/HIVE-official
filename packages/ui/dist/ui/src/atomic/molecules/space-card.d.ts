import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Card
 *
 * Space card for browse/discovery views
 */
declare const spacecardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacecardVariants> {
    name?: any;
    description?: any;
    coverImage?: any;
    memberCount?: any;
    isJoined?: any;
    isPrivate?: any;
    category?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceCard: React.ForwardRefExoticComponent<SpaceCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-card.d.ts.map