export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    profilePhotoURL?: string;
    bio: string;
    academicInfo: {
        year: string;
        major: string;
        school: string;
        housing?: string;
    };
    builderStatus: boolean;
    isVerified: boolean;
    ghostMode: boolean;
    lastSeen: string;
    isOnline: boolean;
}
export interface AvatarCardProps {
    profile: UserProfile;
    isEditMode: boolean;
    onProfileUpdate: (updates: Partial<UserProfile>) => void;
    onPhotoUpload: (file: File) => Promise<string>;
    onEditClick?: () => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function AvatarCard({ profile, isEditMode, onProfileUpdate, onPhotoUpload, onEditClick, onSettingsClick, className }: AvatarCardProps): import("react/jsx-runtime").JSX.Element;
export declare const mockUserProfile: UserProfile;
//# sourceMappingURL=avatar-card.d.ts.map