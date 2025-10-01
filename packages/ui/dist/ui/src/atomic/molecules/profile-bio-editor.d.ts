import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Profile Bio Editor
 *
 * Editable bio field
 */
declare const profilebioeditorVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ProfileBioEditorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profilebioeditorVariants> {
    bio?: any;
    maxLength?: any;
    onSave?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const ProfileBioEditor: React.ForwardRefExoticComponent<ProfileBioEditorProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=profile-bio-editor.d.ts.map