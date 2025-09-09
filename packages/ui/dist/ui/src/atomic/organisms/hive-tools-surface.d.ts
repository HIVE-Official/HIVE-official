import React from 'react';
import type { Space } from '../../types';
export type ToolStatus = 'active' | 'paused' | 'configuring' | 'error';
export type ToolType = 'automation' | 'coordination' | 'analytics' | 'utility' | 'integration';
export interface SpaceTool {
    id: string;
    name: string;
    description: string;
    type: ToolType;
    status: ToolStatus;
    icon?: string;
    isConfigured: boolean;
    configuredBy: {
        id: string;
        name: string;
        role?: string;
    };
    configuredAt: Date;
    executions?: number;
    lastRun?: Date;
    errorCount?: number;
    successRate?: number;
    outputChannel?: string;
    permissions: {
        canExecute: string[];
        canConfigure: string[];
        canView: string[];
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