import React from 'react';
export interface ProfileAvatarWidgetProps {
    user: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        major?: string;
        year?: string;
        residence?: string;
        bio?: string;
        isOnline?: boolean;
        lastSeen?: string;
        profileViews?: number;
        achievements?: number;
        connections?: number;
        isGhostMode?: boolean;
    };
    isEditable?: boolean;
    onEditProfile?: () => void;
    onUploadPhoto?: () => void;
    onToggleVisibility?: () => void;
    onViewProfile?: () => void;
    className?: string;
}
export declare const ProfileAvatarWidget: React.FC<ProfileAvatarWidgetProps>;
//# sourceMappingURL=profile-avatar-widget.d.ts.map