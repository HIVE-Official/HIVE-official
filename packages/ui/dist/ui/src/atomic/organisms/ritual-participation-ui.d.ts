import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Participation Ui
 *
 * Complete participation interface
 */
declare const ritualparticipationuiVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualParticipationUiProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualparticipationuiVariants> {
    ritual?: any;
    progress?: any;
    streak?: any;
    points?: any;
    leaderboardPosition?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualParticipationUi: React.ForwardRefExoticComponent<RitualParticipationUiProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-participation-ui.d.ts.map