import React from 'react';
export interface PrivacySetting {
    id: string;
    name: string;
    description: string;
    category: 'visibility' | 'data' | 'interaction' | 'location' | 'activity';
    isEnabled: boolean;
    level: 'public' | 'friends' | 'private' | 'hidden';
    lastModified: string;
}
export interface GhostModeConfig {
    isActive: boolean;
    duration: 'temporary' | 'scheduled' | 'permanent';
    scheduledEnd?: string;
    hiddenActivities: string[];
    visibilityLevel: 'invisible' | 'minimal' | 'selective';
    allowedInteractions: string[];
}
export interface ProfileGhostModeWidgetProps {
    user: {
        id: string;
        name: string;
    };
    ghostModeConfig?: GhostModeConfig;
    privacySettings?: PrivacySetting[];
    visibilityLevel?: 'public' | 'friends' | 'private' | 'ghost';
    lastPrivacyUpdate?: string;
    privacyScore?: number;
    activeSessions?: number;
    isEditable?: boolean;
    onToggleGhostMode?: (enabled: boolean) => void;
    onUpdatePrivacySetting?: (settingId: string, enabled: boolean) => void;
    onViewPrivacySettings?: () => void;
    onConfigureGhostMode?: () => void;
    onViewDataExport?: () => void;
    className?: string;
}
export declare const ProfileGhostModeWidget: React.FC<ProfileGhostModeWidgetProps>;
//# sourceMappingURL=profile-ghost-mode-widget.d.ts.map