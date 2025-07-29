import React from 'react';
interface ToolRecommendation {
    toolId: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    rating: number;
    downloads: number;
    ownerId: string;
    ownerName: string;
    pricing: {
        type: 'free' | 'paid' | 'freemium';
        price?: number;
    };
    recommendationReason: string;
    relevanceScore: number;
    isVerified: boolean;
    isFeatured: boolean;
    screenshots?: string[];
}
interface RecommendationCategory {
    category: string;
    title: string;
    tools: ToolRecommendation[];
}
interface DiscoveryData {
    recommendations: ToolRecommendation[];
    categories: RecommendationCategory[];
    trending: ToolRecommendation[];
    personalized: ToolRecommendation[];
    metadata: {
        totalRecommendations: number;
        algorithmsUsed: string[];
        lastUpdated: string;
    };
}
interface ToolDiscoveryEngineProps {
    discoveryData?: DiscoveryData;
    onToolSelect?: (tool: ToolRecommendation) => void;
    onRefreshRecommendations?: () => void;
    userPreferences?: {
        interests: string[];
        categories: string[];
        institution: string;
    };
    className?: string;
}
export declare const ToolDiscoveryEngine: React.FC<ToolDiscoveryEngineProps>;
export default ToolDiscoveryEngine;
//# sourceMappingURL=tool-discovery-engine.d.ts.map