import React from 'react';
interface SpaceTool {
    id: string;
    name: string;
    description: string;
    category: 'productivity' | 'collaboration' | 'analytics' | 'automation' | 'social' | 'custom';
    icon?: string;
    coverImage?: string;
    creator: {
        id: string;
        name: string;
        avatar?: string;
    };
    stats: {
        users: number;
        rating: number;
        reviews: number;
    };
    status: 'active' | 'beta' | 'coming_soon' | 'deprecated';
    visibility: 'public' | 'space' | 'private';
    url?: string;
    integrations?: string[];
    features?: string[];
    lastUpdated: Date;
    price?: {
        type: 'free' | 'paid' | 'freemium';
        amount?: string;
    };
    isInstalled?: boolean;
    isFavorite?: boolean;
}
export interface HiveToolsSurfaceProps {
    spaceId: string;
    spaceName?: string;
    isLeader?: boolean;
    currentUserId?: string;
    className?: string;
    variant?: 'widget' | 'full' | 'compact';
    tools?: SpaceTool[];
    loading?: boolean;
    error?: Error | null;
    onCreateTool?: () => void;
    onInstallTool?: (toolId: string) => Promise<void>;
    onUninstallTool?: (toolId: string) => Promise<void>;
    onFavoriteTool?: (toolId: string) => Promise<void>;
    onConfigureTool?: (toolId: string) => void;
}
export declare const HiveToolsSurface: React.FC<HiveToolsSurfaceProps>;
export {};
//# sourceMappingURL=HiveToolsSurface.d.ts.map