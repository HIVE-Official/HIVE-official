import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space About Section
 *
 * Full about section for space
 */
declare const spaceaboutsectionVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SpaceAboutSectionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spaceaboutsectionVariants> {
    description?: any;
    created?: any;
    creator?: any;
    category?: any;
    tags?: any;
    rules?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const SpaceAboutSection: React.ForwardRefExoticComponent<SpaceAboutSectionProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=space-about-section.d.ts.map