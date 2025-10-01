import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Progress Tracker
 *
 * Visual progress tracker for ritual
 */
declare const ritualprogresstrackerVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualprogresstrackerVariants> {
    dailyGoals?: any;
    weeklyProgress?: any;
    completion?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualProgressTracker: React.ForwardRefExoticComponent<RitualProgressTrackerProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-progress-tracker.d.ts.map