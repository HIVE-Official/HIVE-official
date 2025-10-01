import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Comment Thread
 *
 * Nested comment thread with replies
 */
declare const feedcommentthreadVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface FeedCommentThreadProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof feedcommentthreadVariants> {
    comments?: any;
    maxDepth?: any;
    onLoadMore?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const FeedCommentThread: React.ForwardRefExoticComponent<FeedCommentThreadProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=feed-comment-thread.d.ts.map