import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Activity Timeline
 *
 * Activity timeline
 */
declare const profileactivitytimelineVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileActivityTimelineProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileactivitytimelineVariants> {
    activities?: any;
    onLoadMore?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileActivityTimeline: React.ForwardRefExoticComponent<ProfileActivityTimelineProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-activity-timeline.d.ts.map