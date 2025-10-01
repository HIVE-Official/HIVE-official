import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Stats Dashboard
 *
 * Detailed stats dashboard
 */
declare const profilestatsdashboardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileStatsDashboardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profilestatsdashboardVariants> {
    stats?: any;
    timePeriod?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileStatsDashboard: React.ForwardRefExoticComponent<ProfileStatsDashboardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-stats-dashboard.d.ts.map