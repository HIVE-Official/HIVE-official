/**
 * HIVE Comment System
 * Threaded comments with real-time updates and social interactions
 */
import React from 'react';
export interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        role?: string;
        isVerified?: boolean;
    };
    timestamp: string;
    engagement: {
        likes: number;
        replies: number;
    };
    isLiked?: boolean;
    isEdited?: boolean;
    parentId?: string;
    replies?: Comment[];
    canEdit?: boolean;
    canDelete?: boolean;
}
interface CommentSystemProps {
    postId: string;
    comments: Comment[];
    currentUserId?: string;
    onAddComment?: (content: string, parentId?: string) => Promise<void>;
    onLikeComment?: (commentId: string) => Promise<void>;
    onEditComment?: (commentId: string, content: string) => Promise<void>;
    onDeleteComment?: (commentId: string) => Promise<void>;
    onReportComment?: (commentId: string, reason: string) => Promise<void>;
    isLoading?: boolean;
    maxDepth?: number;
    showCount?: boolean;
    enableFeatureFlag?: boolean;
}
export declare const CommentSystem: React.FC<CommentSystemProps>;
export {};
//# sourceMappingURL=comment-system.d.ts.map