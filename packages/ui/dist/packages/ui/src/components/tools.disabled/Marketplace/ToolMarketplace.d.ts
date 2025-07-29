import React from 'react';
export interface MarketplaceTool {
    id: string;
    name: string;
    description: string;
    category: 'event_management' | 'academic' | 'productivity' | 'social' | 'creative';
    type: 'system' | 'individual';
    systemParent?: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    color: string;
    downloads: number;
    rating: number;
    ratingCount: number;
    creator: string;
    creatorType: 'hive_team' | 'student' | 'organization';
    tags: string[];
    version: string;
    lastUpdated: Date;
    isFeatured: boolean;
    isVerified: boolean;
    isInstalled?: boolean;
    isPremium: boolean;
    supportedPlatforms: ('web' | 'mobile' | 'desktop')[];
    requiredPermissions: string[];
    components?: string[];
    integrations?: string[];
}
export interface EventSystemShowcase {
    id: 'event-management-system';
    name: 'Event Management System';
    description: 'Complete professional event coordination solution';
    components: MarketplaceTool[];
    stats: {
        totalDownloads: number;
        averageRating: number;
        eventsCreated: number;
        successRate: number;
    };
    testimonials: {
        user: string;
        organization: string;
        quote: string;
        rating: number;
    }[];
}
interface ToolMarketplaceProps {
    tools?: MarketplaceTool[];
    eventSystem?: EventSystemShowcase;
    onToolInstall?: (toolId: string) => Promise<void>;
    onToolPreview?: (toolId: string) => void;
    onSystemInstall?: (systemId: string) => Promise<void>;
    onToolAction?: (toolId: string, action: string) => void;
    className?: string;
}
export declare const ToolMarketplace: React.FC<ToolMarketplaceProps>;
export default ToolMarketplace;
//# sourceMappingURL=ToolMarketplace.d.ts.map