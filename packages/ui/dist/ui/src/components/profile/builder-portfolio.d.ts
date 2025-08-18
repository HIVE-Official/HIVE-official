import React from 'react';
export interface Tool {
    id: string;
    name: string;
    description: string;
    shortDescription?: string;
    category: ToolCategory;
    tags: string[];
    icon: string;
    coverImage?: string;
    screenshots: string[];
    version: string;
    status: 'draft' | 'published' | 'deprecated' | 'featured';
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    stats: {
        installs: number;
        activeUsers: number;
        views: number;
        likes: number;
        comments: number;
        rating: number;
        ratingCount: number;
    };
    technical: {
        complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
        buildTime: number;
        dependencies: string[];
        platforms: ('web' | 'mobile' | 'desktop')[];
        codeLines: number;
    };
    collaborators: string[];
    isOpenSource: boolean;
    githubUrl?: string;
    demoUrl?: string;
    docsUrl?: string;
}
export type ToolCategory = 'productivity' | 'academic' | 'social' | 'utility' | 'ai' | 'design' | 'data' | 'game';
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'creation' | 'impact' | 'community' | 'technical' | 'milestone';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    earnedAt: string;
    progress?: {
        current: number;
        total: number;
    };
}
export interface BuilderStats {
    totalTools: number;
    totalInstalls: number;
    totalViews: number;
    totalLikes: number;
    averageRating: number;
    builderLevel: 'Newcomer' | 'Developer' | 'Creator' | 'Architect' | 'Visionary';
    experiencePoints: number;
    nextLevelXP: number;
    streak: {
        current: number;
        longest: number;
        lastBuildDate: string;
    };
    specialties: ToolCategory[];
    collaborations: number;
    contributions: number;
}
interface BuilderPortfolioProps {
    tools: Tool[];
    achievements: Achievement[];
    stats: BuilderStats;
    isOwnProfile?: boolean;
    onToolClick?: (tool: Tool) => void;
    onEditTool?: (tool: Tool) => void;
    onCreateTool?: () => void;
    onViewAnalytics?: (tool: Tool) => void;
    className?: string;
}
export declare const BuilderPortfolio: React.FC<BuilderPortfolioProps>;
export default BuilderPortfolio;
//# sourceMappingURL=builder-portfolio.d.ts.map