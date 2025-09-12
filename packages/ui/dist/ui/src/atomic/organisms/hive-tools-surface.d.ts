import React from 'react';
import type { Space } from '../../types';
export type ToolStatus = 'active' | 'paused' | 'configuring' | 'error';
export type ToolType = 'automation' | 'coordination' | 'analytics' | 'utility' | 'integration';
export interface SpaceTool {
    deploymentId: string;
    toolId: string;
    name: string;
    description: string;
    category: string;
    version: string;
    status: string;
    configuration: Record<string, unknown>;
    permissions: {
        canEdit: string[];
        canView: string[];
        isPublic: boolean;
    };
    isShared: boolean;
    deployer: {
        id: string;
        name: string;
        avatar: string | null;
    } | null;
    deployedAt: string;
    lastUsed: string | null;
    usageCount: number;
    originalTool: {
        averageRating: number;
        ratingCount: number;
        totalDeployments: number;
        isVerified: boolean;
        creatorId: string;
    };
}
export interface HiveToolsSurfaceProps {
    space: Space;
    tools?: SpaceTool[];
    maxTools?: number;
    canManageTools?: boolean;
    leaderMode?: 'configure' | 'moderate' | 'insights' | null;
    isBuilder?: boolean;
    viewMode?: 'grid' | 'list';
    onAddTool?: () => void;
    onConfigureTool?: (toolId: string) => void;
    onViewToolAnalytics?: (toolId: string) => void;
    onRunTool?: (toolId: string) => void;
    onPauseTool?: (toolId: string) => void;
    onRemoveTool?: (toolId: string) => void;
}
export declare const HiveToolsSurface: React.FC<HiveToolsSurfaceProps>;
export default HiveToolsSurface;
//# sourceMappingURL=hive-tools-surface.d.ts.map