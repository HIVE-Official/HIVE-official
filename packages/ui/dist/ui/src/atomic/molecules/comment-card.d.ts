import * as React from "react";
export interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar?: string;
    userName: string;
    timestamp: string;
    content: string;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    isAuthor?: boolean;
    maxLines?: number;
    showActions?: boolean;
    likeCount?: number;
    isLiked?: boolean;
    onLike?: () => void;
    onReply?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}
declare const CommentCard: React.ForwardRefExoticComponent<CommentCardProps & React.RefAttributes<HTMLDivElement>>;
export { CommentCard };
//# sourceMappingURL=comment-card.d.ts.map