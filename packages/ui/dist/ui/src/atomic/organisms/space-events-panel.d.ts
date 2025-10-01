import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Events Panel
 *
 * Events panel for space
 */
declare const spaceeventspanelVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceEventsPanelProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceeventspanelVariants> {
    events?: any;
    canCreate?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceEventsPanel: React.ForwardRefExoticComponent<SpaceEventsPanelProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-events-panel.d.ts.map