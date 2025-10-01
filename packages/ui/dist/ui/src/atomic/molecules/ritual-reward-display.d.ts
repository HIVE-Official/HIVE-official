import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Reward Display
 *
 * Display ritual reward
 */
declare const ritualrewarddisplayVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualRewardDisplayProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualrewarddisplayVariants> {
    icon?: any;
    description?: any;
    points?: any;
    isEarned?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualRewardDisplay: React.ForwardRefExoticComponent<RitualRewardDisplayProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-reward-display.d.ts.map