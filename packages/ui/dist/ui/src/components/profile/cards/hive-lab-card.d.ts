export interface Tool {
    id: string;
    name: string;
    description: string;
    icon?: string;
    type: 'form' | 'calculator' | 'tracker' | 'game' | 'utility' | 'social' | 'academic';
    status: 'draft' | 'testing' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
    usage: {
        totalUses: number;
        uniqueUsers: number;
        thisWeek: number;
        rating: number;
        reviews: number;
    };
    progress: number;
    isPublic: boolean;
    isShared: boolean;
    spaceId?: string;
    spaceName?: string;
    collaborators?: {
        id: string;
        name: string;
        avatar?: string;
        role: 'owner' | 'editor' | 'viewer';
    }[];
}
export interface BuilderStats {
    level: number;
    xp: number;
    xpToNext: number;
    totalTools: number;
    publishedTools: number;
    totalUses: number;
    streak: number;
    badges: {
        id: string;
        name: string;
        icon: string;
        earnedAt: Date;
        description: string;
    }[];
    achievements: {
        id: string;
        title: string;
        progress: number;
        total: number;
        completed: boolean;
    }[];
}
export interface HiveLabCardProps {
    tools: Tool[];
    builderStats: BuilderStats;
    isBuilder: boolean;
    isEditMode: boolean;
    onCreateTool?: () => void;
    onToolClick?: (toolId: string) => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function HiveLabCard({ tools, builderStats, isBuilder, isEditMode, onCreateTool, onToolClick, onSettingsClick, className }: HiveLabCardProps): import("react/jsx-runtime").JSX.Element;
export declare const mockTools: Tool[];
export declare const mockBuilderStats: BuilderStats;
//# sourceMappingURL=hive-lab-card.d.ts.map