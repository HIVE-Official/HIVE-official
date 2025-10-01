import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Settings Modal
 *
 * Space settings modal with tabs
 */
declare const spacesettingsmodalVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceSettingsModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacesettingsmodalVariants> {
    activeTab?: any;
    space?: any;
    onSave?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceSettingsModal: React.ForwardRefExoticComponent<SpaceSettingsModalProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-settings-modal.d.ts.map