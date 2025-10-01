import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Check In Button
 *
 * Check-in button with states
 */
declare const ritualcheckinbuttonVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualCheckInButtonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualcheckinbuttonVariants> {
    isCheckedIn?: any;
    onCheckIn?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualCheckInButton: React.ForwardRefExoticComponent<RitualCheckInButtonProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-check-in-button.d.ts.map