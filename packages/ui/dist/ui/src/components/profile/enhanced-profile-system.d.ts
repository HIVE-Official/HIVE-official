import React from 'react';
export interface EnhancedProfileUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isBuilder: boolean;
    isVerifiedStudent: boolean;
    campus: string;
    gradYear: string;
    major: string;
    ghostMode?: boolean;
    stats: {
        spacesJoined: number;
        toolsUsed: number;
        connectionsCount: number;
        toolsCreated: number;
        spacesLed: number;
    };
}
export interface ProfileCompletionStatus {
    overall: number;
    avatar: number;
    profile: number;
    verification: number;
    privacy: number;
    missing: string[];
}
interface EnhancedProfileSystemProps {
    user: EnhancedProfileUser;
    spaces: any[];
    events: any[];
    connections: any[];
    hiveLab: any;
    completionStatus: ProfileCompletionStatus;
    isLoading?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    onEditProfile?: () => void;
    onPrivacySettings?: () => void;
    onSpaceClick?: (spaceId: string) => void;
    onEventClick?: (eventId: string) => void;
    onConnectionClick?: (connectionId: string) => void;
    onJoinSpace?: (spaceId: string) => void;
    onCreateTool?: () => void;
}
export declare const EnhancedProfileSystem: React.FC<EnhancedProfileSystemProps>;
export default EnhancedProfileSystem;
//# sourceMappingURL=enhanced-profile-system.d.ts.map