import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Ritual Creation Modal
 *
 * Create ritual modal
 */
declare const ritualcreationmodalVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface RitualCreationModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ritualcreationmodalVariants> {
    onSubmit?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const RitualCreationModal: React.ForwardRefExoticComponent<RitualCreationModalProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ritual-creation-modal.d.ts.map