import React from 'react';
export interface BuilderTool {
    id: string;
    name: string;
    type: 'template' | 'automation' | 'widget' | 'integration' | 'custom';
    category: 'productivity' | 'social' | 'academic' | 'utility' | 'entertainment';
    description: string;
    icon?: string;
    isLocked?: boolean;
    isPremium?: boolean;
    usageCount?: number;
    lastUsed?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    timeToCreate?: string;
    popularity?: number;
}
export interface CreatedTool {
    id: string;
    name: string;
    type: BuilderTool['type'];
    category: BuilderTool['category'];
    description: string;
    icon?: string;
    createdAt: string;
    usageCount: number;
    isPublic: boolean;
    likes?: number;
    isStarred?: boolean;
}
export interface CampusBuilderToolsProps {
    availableTools: BuilderTool[];
    createdTools: CreatedTool[];
    isBuilder?: boolean;
    isLoading?: boolean;
    variant?: 'default' | 'compact' | 'subtle';
    showBecomeBuilder?: boolean;
    isLocked?: boolean;
    onToolClick?: (toolId: string) => void;
    onCreateTool?: (toolType: BuilderTool['type']) => void;
    onViewTool?: (toolId: string) => void;
    onBecomeBuilder?: () => void;
    onViewAllCreated?: () => void;
    onJoinWaitlist?: () => void;
    className?: string;
}
export declare const CampusBuilderTools: React.FC<CampusBuilderToolsProps>;
export default CampusBuilderTools;
//# sourceMappingURL=campus-builder-tools.d.ts.map