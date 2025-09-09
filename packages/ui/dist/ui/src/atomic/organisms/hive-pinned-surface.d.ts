import React from 'react';
import type { Space } from '../../types';
export type PinnedItemType = 'document' | 'link' | 'announcement' | 'event' | 'resource';
export interface PinnedItem {
    id: string;
    title: string;
    description?: string;
    type: PinnedItemType;
    url?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    pinnedBy: {
        id: string;
        name: string;
        role?: string;
    };
    pinnedAt: Date;
    expiresAt?: Date;
    viewCount?: number;
    downloadCount?: number;
    lastAccessed?: Date;
}
export interface HivePinnedSurfaceProps {
    space: Space;
    items?: PinnedItem[];
    maxItems?: number;
    canPin?: boolean;
    canModerate?: boolean;
    leaderMode?: 'configure' | 'moderate' | 'insights' | null;
    viewMode?: 'list' | 'grid';
    onAddPinned?: () => void;
    onViewItem?: (itemId: string) => void;
    onDownloadItem?: (itemId: string) => void;
    onUnpinItem?: (itemId: string) => void;
}
export declare const HivePinnedSurface: React.FC<HivePinnedSurfaceProps>;
export default HivePinnedSurface;
//# sourceMappingURL=hive-pinned-surface.d.ts.map