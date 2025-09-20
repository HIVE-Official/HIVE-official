/**
 * HIVE Community Tool Browser
 * Interface for browsing and installing community-created tools
 */
import React from 'react';
import { Tool } from '@hive/core';
interface CommunityTool {
    id: string;
    tool: Tool;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        isVerified?: boolean;
    };
    stats: {
        downloads: number;
        rating: number;
        ratingCount: number;
        installs: number;
        likes: number;
    };
    metadata: {
        publishedAt: string;
        updatedAt: string;
        tags: string[];
        category: 'productivity' | 'collaboration' | 'communication' | 'organization' | 'engagement' | 'academic';
        compatibility: string[];
        featured: boolean;
        verified: boolean;
    };
    preview?: {
        images: string[];
        videoUrl?: string;
        demoUrl?: string;
    };
}
interface CommunityToolBrowserProps {
    communityTools: CommunityTool[];
    onInstall: (toolId: string) => Promise<void>;
    onPreview: (tool: Tool) => void;
    onLike: (toolId: string) => void;
    onShare: (toolId: string) => void;
    installedToolIds: string[];
    currentSpaceId?: string;
    isLoading?: boolean;
}
export declare const CommunityToolBrowser: React.FC<CommunityToolBrowserProps>, communityTools: any, searchQuery: any, categoryFilter: any, sortBy: any, showFeaturedOnly: any;
export {};
//# sourceMappingURL=community-tool-browser.d.ts.map