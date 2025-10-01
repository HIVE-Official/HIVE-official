import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Event Card
 *
 * Event card in space events
 */
declare const spaceeventcardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceEventCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceeventcardVariants> {
    title?: any;
    date?: any;
    time?: any;
    location?: any;
    rsvpCount?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceEventCard: React.ForwardRefExoticComponent<SpaceEventCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-event-card.d.ts.map