import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Edit Form
 *
 * Profile edit form
 */
declare const profileeditformVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileEditFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileeditformVariants> {
    user?: any;
    onSave?: any;
    onCancel?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileEditForm: React.ForwardRefExoticComponent<ProfileEditFormProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-edit-form.d.ts.map