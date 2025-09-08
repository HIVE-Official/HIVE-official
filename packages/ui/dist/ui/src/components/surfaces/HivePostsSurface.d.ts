import React from 'react';
interface Post {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    authorRole?: 'member' | 'moderator' | 'admin' | 'leader';
    timestamp: Date;
    likes: number;
    comments: number;
    shares: number;
    hasLiked?: boolean;
    attachments?: {
        type: 'image' | 'link';
        url: string;
        title?: string;
    }[];
    tags?: string[];
}
export interface HivePostsSurfaceProps {
    spaceId: string;
    spaceName?: string;
    isLeader?: boolean;
    currentUserId?: string;
    className?: string;
    variant?: 'widget' | 'full' | 'compact';
    onPostCreate?: (content: string) => Promise<void>;
    onPostLike?: (postId: string) => Promise<void>;
    onPostComment?: (postId: string, comment: string) => Promise<void>;
    posts?: Post[];
    loading?: boolean;
    error?: Error | null;
}
export declare const HivePostsSurface: React.FC<HivePostsSurfaceProps>;
export {};
//# sourceMappingURL=HivePostsSurface.d.ts.map