import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Post Card - Displays a single post in the feed
 *
 * Required sections:
 * - Author info (avatar, name, timestamp)
 * - Space badge (which space it's from)
 * - Content (text, media)
 * - Engagement stats (likes, comments, shares)
 * - Action buttons (like, comment, share, menu)
 */
declare const feedPostCardVariants: (props?: {
    variant?: "default" | "highlighted";
    size?: "default" | "full";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedPostCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedPostCardVariants> {
    authorName?: string;
    authorHandle?: string;
    authorAvatar?: string;
    timestamp?: string;
    spaceName?: string;
    spaceIcon?: string;
    contentType?: 'text' | 'image' | 'video' | 'link' | 'event' | 'poll';
    textContent?: string;
    images?: string[];
    videoUrl?: string;
    linkPreview?: {
        title: string;
        description: string;
        image?: string;
        url: string;
    };
    likeCount?: number;
    commentCount?: number;
    shareCount?: number;
    isLiked?: boolean;
    isLoading?: boolean;
    error?: string;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onMenuClick?: () => void;
}
export declare const FeedPostCard: React.ForwardRefExoticComponent<FeedPostCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-post-card.d.ts.map