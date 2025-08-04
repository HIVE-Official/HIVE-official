/**
 * HIVE Space Tool Deployment
 * Deploy HiveLab tools to specific spaces with permissions and configuration
 */
import React from 'react';
import { Tool } from '@hive/core';
import { Space } from '../../lib/api-client';
interface ComponentToolDeploymentConfig {
    spaceId: string;
    permissions: {
        view: ('all' | 'member' | 'moderator' | 'admin')[];
        use: ('all' | 'member' | 'moderator' | 'admin')[];
        manage: ('admin' | 'moderator')[];
    };
    settings: {
        isActive: boolean;
        requirePermission: boolean;
        autoLaunch: boolean;
        maxConcurrentUsers?: number;
        allowAnonymous?: boolean;
        trackUsage: boolean;
    };
    customization: {
        displayName?: string;
        description?: string;
        category: 'productivity' | 'collaboration' | 'communication' | 'organization' | 'engagement' | 'academic';
        icon?: string;
    };
}
interface SpaceToolDeploymentProps {
    tool: Tool;
    availableSpaces?: Space[];
    onDeploy: (config: ComponentToolDeploymentConfig) => Promise<void>;
    onCancel: () => void;
    isDeploying?: boolean;
}
export declare const SpaceToolDeployment: React.FC<SpaceToolDeploymentProps>;
export {};
//# sourceMappingURL=space-tool-deployment.d.ts.map