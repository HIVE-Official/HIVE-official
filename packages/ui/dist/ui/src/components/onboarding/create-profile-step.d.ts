import React from 'react';
export interface CreateProfileStepProps {
    displayName: string;
    onDisplayNameChange: (value: string) => void;
    handle: string;
    onHandleChange: (value: string) => void;
    handleAvailability: {
        isChecking: boolean;
        available: boolean | null;
    };
    avatarUrl?: string;
    avatarModerationStatus?: "pending" | "approved" | "rejected" | "under_review";
    onFileSelect: (file: File | null) => void;
    onSubmit: (e: React.FormEvent) => void;
    isUploading: boolean;
    error?: string;
    selectedFile: File | null;
    termsAccepted: boolean;
    onTermsAcceptedChange: (checked: boolean) => void;
    userRole?: 'student' | 'faculty' | 'alumni';
    schoolName?: string;
    photos?: string[];
    onPhotosChange?: (photos: string[]) => void;
}
export declare const CreateProfileStep: React.FC<CreateProfileStepProps>;
//# sourceMappingURL=create-profile-step.d.ts.map