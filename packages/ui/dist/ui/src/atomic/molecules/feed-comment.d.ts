import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Comment
 *
 * Single comment display with author, content, and actions
 */
declare const feedcommentVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedCommentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedcommentVariants> {
    authorName?: any;
    authorAvatar?: any;
    content?: any;
    timestamp?: any;
    likeCount?: any;
    isLiked?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedComment: React.ForwardRefExoticComponent<FeedCommentProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-comment.d.ts.map