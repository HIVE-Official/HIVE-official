import React from 'react';
export interface CampusIdentityHeaderProps {
    user: {
        name: string;
        handle: string;
        avatar?: string;
        year: string;
        major: string;
        dorm?: string;
        isOnline?: boolean;
        isBuilder?: boolean;
        completionPercentage?: number;
    };
    variant?: 'default' | 'compact' | 'detailed';
    showStatus?: boolean;
    onAvatarClick?: () => void;
    onEditClick?: () => void;
    className?: string;
}
export declare const CampusIdentityHeader: React.FC<CampusIdentityHeaderProps>;
export declare const CompactCampusIdentity: React.FC<Omit<CampusIdentityHeaderProps, 'variant'>>;
export default CampusIdentityHeader;
//# sourceMappingURL=campus-identity-header.d.ts.map