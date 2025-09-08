import React from 'react';
interface PinnedItem {
    id: string;
    type: 'announcement' | 'resource' | 'link' | 'document' | 'alert';
    title: string;
    description?: string;
    content?: string;
    url?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: string;
    imageUrl?: string;
    priority: 'high' | 'medium' | 'low';
    authorId: string;
    authorName: string;
    pinnedAt: Date;
    expiresAt?: Date;
    tags?: string[];
}
export interface HivePinnedSurfaceProps {
    spaceId: string;
    spaceName?: string;
    isLeader?: boolean;
    currentUserId?: string;
    className?: string;
    variant?: 'widget' | 'full' | 'compact';
    pinnedItems?: PinnedItem[];
    loading?: boolean;
    error?: Error | null;
    onPinItem?: () => void;
    onUnpinItem?: (itemId: string) => Promise<void>;
    onEditItem?: (itemId: string) => void;
}
export declare const HivePinnedSurface: React.FC<HivePinnedSurfaceProps>;
export {};
//# sourceMappingURL=HivePinnedSurface.d.ts.map