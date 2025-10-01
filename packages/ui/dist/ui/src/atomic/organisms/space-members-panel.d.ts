import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Members Panel
 *
 * Members panel for space
 */
declare const spacememberspanelVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceMembersPanelProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacememberspanelVariants> {
    members?: any;
    total?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceMembersPanel: React.ForwardRefExoticComponent<SpaceMembersPanelProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-members-panel.d.ts.map