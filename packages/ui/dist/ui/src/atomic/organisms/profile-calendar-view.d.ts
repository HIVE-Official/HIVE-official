import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Calendar View
 *
 * Calendar with events and check-ins
 */
declare const profilecalendarviewVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileCalendarViewProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profilecalendarviewVariants> {
    events?: any;
    checkIns?: any;
    month?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileCalendarView: React.ForwardRefExoticComponent<ProfileCalendarViewProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-calendar-view.d.ts.map