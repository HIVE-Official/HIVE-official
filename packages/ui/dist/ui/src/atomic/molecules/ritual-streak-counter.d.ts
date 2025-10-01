import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Streak Counter
 *
 * Streak counter with calendar
 */
declare const ritualstreakcounterVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualStreakCounterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualstreakcounterVariants> {
    currentStreak?: any;
    longestStreak?: any;
    checkIns?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualStreakCounter: React.ForwardRefExoticComponent<RitualStreakCounterProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-streak-counter.d.ts.map