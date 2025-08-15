import React from 'react';
export interface PersonalTool {
    id: string;
    name: string;
    description: string;
    category: 'academic' | 'productivity' | 'social' | 'utility' | 'experimental';
    status: 'active' | 'draft' | 'published' | 'archived';
    usageCount: number;
    likes: number;
    collaborators?: number;
    lastUsed?: string;
    isPublic: boolean;
    isFeatured?: boolean;
}
export interface ProfileToolsWidgetProps {
    user: {
        id: string;
        name: string;
    };
    personalTools?: PersonalTool[];
    totalToolsCreated?: number;
    totalUsage?: number;
    featuredTool?: PersonalTool;
    weeklyActivity?: number;
    isEditable?: boolean;
    onCreateTool?: () => void;
    onViewTool?: (toolId: string) => void;
    onEditTool?: (toolId: string) => void;
    onViewAllTools?: () => void;
    onToolMarketplace?: () => void;
    className?: string;
}
export declare const ProfileToolsWidget: React.FC<ProfileToolsWidgetProps>;
//# sourceMappingURL=profile-tools-widget.d.ts.map