import React from 'react';
import { BentoCardSize } from '../bento-grid';
import { ProfileCompletionStatus } from './avatar-card';
export interface EnhancedProfileUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isBuilder?: boolean;
    isVerifiedStudent?: boolean;
    campus?: string;
    gradYear?: string;
    major?: string;
    ghostMode?: boolean;
    stats?: {
        spacesJoined: number;
        toolsUsed: number;
        connectionsCount: number;
        toolsCreated?: number;
        spacesLed?: number;
    };
}
export interface PersonalTool {
    id: string;
    name: string;
    description: string;
    icon: string;
    lastUsed?: string;
    usageCount: number;
    isForked: boolean;
    originalCreator?: string;
}
export interface ActivityLogItem {
    id: string;
    type: 'space_joined' | 'tool_used' | 'tool_created' | 'connection_made';
    title: string;
    description: string;
    timestamp: string;
    metadata?: Record<string, any>;
}
export interface EnhancedProfileDashboardProps {
    user: EnhancedProfileUser;
    spaces?: any[];
    events?: any[];
    connections?: any[];
    personalTools?: PersonalTool[];
    activityLog?: ActivityLogItem[];
    hiveLab?: any;
    completionStatus?: ProfileCompletionStatus;
    isLoading?: boolean;
    cardLayout?: Record<string, {
        size: BentoCardSize;
        isVisible: boolean;
        order: number;
    }>;
    onCardLayoutChange?: (layout: Record<string, {
        size: BentoCardSize;
        isVisible: boolean;
        order: number;
    }>) => void;
    onPhotoUpload?: (file: File) => void;
    onGenerateAvatar?: () => void;
    onEditProfile?: () => void;
    onPrivacySettings?: () => void;
    onSpaceClick?: (spaceId: string) => void;
    onEventClick?: (eventId: string) => void;
    onToolClick?: (toolId: string) => void;
    onCreateTool?: () => void;
    className?: string;
}
export declare const EnhancedProfileDashboard: React.FC<EnhancedProfileDashboardProps>;
export default EnhancedProfileDashboard;
//# sourceMappingURL=enhanced-profile-dashboard.d.ts.map