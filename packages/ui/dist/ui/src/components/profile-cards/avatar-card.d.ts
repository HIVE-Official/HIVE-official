import React from 'react';
export interface ProfileCompletionStatus {
    overall: number;
    sections: {
        basicInfo: {
            completed: boolean;
            label: string;
        };
        academicInfo: {
            completed: boolean;
            label: string;
        };
        interests: {
            completed: boolean;
            label: string;
        };
        privacy: {
            completed: boolean;
            label: string;
        };
    };
}
export interface AvatarCardProps {
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
        isBuilder?: boolean;
        isVerifiedStudent?: boolean;
        campus?: string;
        gradYear?: string;
        major?: string;
        stats?: {
            spacesJoined: number;
            toolsUsed: number;
            connectionsCount: number;
        };
    };
    completionStatus?: ProfileCompletionStatus;
    showOnboarding?: boolean;
    isEditMode?: boolean;
    onPhotoUpload?: (file: File) => void;
    onGenerateAvatar?: () => void;
    onEditProfile?: () => void;
    onPrivacySettings?: () => void;
    className?: string;
}
export declare const AvatarCard: React.FC<AvatarCardProps>;
export default AvatarCard;
//# sourceMappingURL=avatar-card.d.ts.map