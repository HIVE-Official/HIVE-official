import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Leaderboard
 *
 * Ritual leaderboard with rankings
 */
declare const ritualleaderboardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualLeaderboardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualleaderboardVariants> {
    rankings?: any;
    userPosition?: any;
    filter?: any;
    timePeriod?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualLeaderboard: React.ForwardRefExoticComponent<RitualLeaderboardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-leaderboard.d.ts.map