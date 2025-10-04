import * as React from "react";
export interface ProfileEditData {
    fullName: string;
    bio?: string;
    major: string;
    academicYear?: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";
    graduationYear?: number;
    pronouns?: string;
    photos?: string[];
    interests?: string[];
}
export interface ProfileEditSheetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current profile data */
    profile: ProfileEditData;
    /** Save handler */
    onSave?: (data: ProfileEditData) => void | Promise<void>;
    /** Photo upload handler */
    onUploadPhoto?: (file: File) => Promise<string>;
    /** Photo remove handler */
    onRemovePhoto?: (photoUrl: string) => void;
    /** Trigger button (optional - defaults to "Edit Profile") */
    trigger?: React.ReactNode;
    /** Loading state */
    isLoading?: boolean;
}
/**
 * Profile Edit Sheet
 *
 * Side drawer for inline profile editing.
 * Better UX than full-page forms - students can edit without losing context.
 *
 * Features:
 * - Photo carousel editing (upload/reorder/remove)
 * - Inline field editing
 * - Interest tag management
 * - Auto-save on blur (optional)
 * - Validation feedback
 */
declare const ProfileEditSheet: React.ForwardRefExoticComponent<ProfileEditSheetProps & React.RefAttributes<HTMLDivElement>>;
export { ProfileEditSheet };
//# sourceMappingURL=profile-edit-sheet.d.ts.map