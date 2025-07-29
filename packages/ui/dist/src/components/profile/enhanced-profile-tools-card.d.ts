import React from 'react';
import type { EventSystemConfig } from '../tools';
export interface ProfileToolInstallation {
    id: string;
    toolId: string;
    installationDate: Date;
    lastUsed?: Date;
    configuration: Record<string, any>;
    isActive: boolean;
    usage: {
        totalSessions: number;
        totalTime: number;
        lastActivity: Date;
    };
}
export interface ProfileToolsData {
    installations: ProfileToolInstallation[];
    eventSystemConfig?: EventSystemConfig;
    isEventSystemInstalled: boolean;
    totalToolsAvailable: number;
    quickActions: {
        toolId: string;
        action: string;
        label: string;
        icon: React.ComponentType<{
            className?: string;
        }>;
    }[];
}
interface EnhancedProfileToolsCardProps {
    data?: ProfileToolsData;
    isLoading?: boolean;
    onToolAction?: (toolId: string, action: string, data?: any) => void;
    onInstallTool?: (toolId: string) => void;
    onBrowseMarketplace?: () => void;
    onConfigureTool?: (installationId: string) => void;
    className?: string;
}
export declare const EnhancedProfileToolsCard: React.FC<EnhancedProfileToolsCardProps>;
export default EnhancedProfileToolsCard;
//# sourceMappingURL=enhanced-profile-tools-card.d.ts.map