import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Creation Modal
 *
 * Multi-step modal for creating a space
 */
declare const spacecreationmodalVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceCreationModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacecreationmodalVariants> {
    currentStep?: any;
    onNext?: any;
    onBack?: any;
    onSubmit?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceCreationModal: React.ForwardRefExoticComponent<SpaceCreationModalProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-creation-modal.d.ts.map