import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Card
 *
 * Ritual card for browse view
 */
declare const ritualcardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualcardVariants> {
    name?: any;
    icon?: any;
    description?: any;
    duration?: any;
    participants?: any;
    progress?: any;
    reward?: any;
    isJoined?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualCard: React.ForwardRefExoticComponent<RitualCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-card.d.ts.map