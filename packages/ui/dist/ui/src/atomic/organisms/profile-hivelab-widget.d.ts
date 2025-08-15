import React from 'react';
export interface BuilderTool {
    id: string;
    name: string;
    description: string;
    category: 'academic' | 'productivity' | 'social' | 'utility' | 'experimental';
    buildStatus: 'concept' | 'prototype' | 'testing' | 'published' | 'archived';
    progress: number;
    collaborators: number;
    deployments: number;
    lastWorkedOn: string;
    isPublic: boolean;
    isFeatured?: boolean;
    technologyStack?: string[];
}
export interface BuilderProject {
    id: string;
    name: string;
    description: string;
    type: 'individual' | 'team' | 'hackathon' | 'academic';
    deadline?: string;
    progress: number;
    teamSize: number;
    isActive: boolean;
}
export interface ProfileHiveLabWidgetProps {
    user: {
        id: string;
        name: string;
        builderLevel?: 'novice' | 'apprentice' | 'expert' | 'master';
    };
    builderTools?: BuilderTool[];
    activeProjects?: BuilderProject[];
    totalBuilds?: number;
    totalDeployments?: number;
    totalCollaborations?: number;
    builderScore?: number;
    weeklyBuildTime?: number;
    featuredBuild?: BuilderTool;
    isEditable?: boolean;
    onCreateTool?: () => void;
    onViewTool?: (toolId: string) => void;
    onEditTool?: (toolId: string) => void;
    onDeployTool?: (toolId: string) => void;
    onViewAllBuilds?: () => void;
    onViewBuildLab?: () => void;
    className?: string;
}
export declare const ProfileHiveLabWidget: React.FC<ProfileHiveLabWidgetProps>;
//# sourceMappingURL=profile-hivelab-widget.d.ts.map