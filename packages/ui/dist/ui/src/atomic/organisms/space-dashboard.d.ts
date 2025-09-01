import React from 'react';
import type { AnySpace } from './hive-space-card';
import type { SpacePost } from '../molecules/post-board';
import type { PlantedTool } from '../molecules/planted-tool-widget';
export interface SpaceDashboardProps {
    space: AnySpace;
    posts: SpacePost[];
    plantedTools: PlantedTool[];
    currentUser?: {
        id: string;
        role?: 'leader' | 'co_leader' | 'member' | 'non_member';
    };
    onJoinSpace?: () => void;
    onLeaveSpace?: () => void;
    onPlantTool?: () => void;
    onConfigureTool?: (toolId: string) => void;
    onRemoveTool?: (toolId: string) => void;
    onCreatePost?: () => void;
    onPostReaction?: (postId: string, emoji: string) => void;
    onShareSpace?: () => void;
    onManageSpace?: () => void;
    variant?: 'default' | 'compact';
    showToolGrid?: boolean;
    className?: string;
}
export declare const SpaceDashboard: React.FC<SpaceDashboardProps>;
export default SpaceDashboard;
//# sourceMappingURL=space-dashboard.d.ts.map