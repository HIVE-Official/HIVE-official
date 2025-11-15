import * as React from 'react';
import type { FeedCardSpace } from './feed-card-post';
export interface FeedCardToolMeta {
    featured?: boolean;
    categoryLabel?: string;
    lastUpdatedLabel?: string;
}
export interface FeedCardToolStats {
    installs?: number;
    activeUsers?: number;
    ratingLabel?: string;
}
export interface FeedCardToolData {
    id: string;
    title: string;
    summary?: string;
    authorLabel: string;
    previewDescription?: string;
    space: FeedCardSpace;
    meta?: FeedCardToolMeta;
    stats?: FeedCardToolStats;
    tags?: string[];
}
export interface FeedCardToolCallbacks {
    onOpenTool?: (toolId: string) => void;
    onPreview?: (toolId: string) => void;
    onSpaceClick?: (spaceId: string) => void;
}
export interface FeedCardToolProps extends FeedCardToolCallbacks, React.HTMLAttributes<HTMLDivElement> {
    tool: FeedCardToolData;
    tone?: 'default' | 'featured';
}
export declare const FeedCardTool: React.ForwardRefExoticComponent<FeedCardToolProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-card-tool.d.ts.map