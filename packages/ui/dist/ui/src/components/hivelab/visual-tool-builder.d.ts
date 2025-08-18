/**
 * HIVE Visual Tool Builder
 * Drag-and-drop interface for creating tools from elements
 */
import React from 'react';
import { Tool } from '@hive/core';
interface Space {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    type: 'public' | 'private' | 'restricted';
    category: string;
    userRole: 'admin' | 'moderator' | 'member';
}
export interface VisualToolBuilderProps {
    onSave?: (tool: Tool) => void;
    onPreview?: (tool: Tool) => void;
    onDeploy?: (tool: Tool, deploymentConfig: any) => void;
    initialTool?: Tool;
    availableSpaces?: Space[];
}
export declare const VisualToolBuilder: React.FC<VisualToolBuilderProps>;
export {};
//# sourceMappingURL=visual-tool-builder.d.ts.map