import * as React from "react";
export interface FeedPost {
    id: string;
    content: string;
    author: {
        name: string;
        handle: string;
        avatar?: string;
    };
    space: {
        name: string;
        id: string;
        memberCount: number;
    };
    timestamp: string;
    reactions: {
        count: number;
        hasReacted: boolean;
        topEmoji?: string;
    };
    comments: {
        count: number;
        preview?: Array<{
            author: string;
            text: string;
        }>;
    };
    reposts: {
        count: number;
        hasReposted: boolean;
    };
    requotes: {
        count: number;
    };
    saves: {
        count: number;
        hasSaved: boolean;
    };
    isPromoted?: boolean;
    isTrending?: boolean;
    media?: {
        type: "image" | "video";
        url: string;
    }[];
    requotedPost?: {
        author: string;
        content: string;
        timestamp: string;
    };
    friendActivity?: {
        names: string[];
        action: "reacted" | "commented" | "reposted";
    };
}
export interface FeedPostCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Post data */
    post: FeedPost;
    /** React handler */
    onReact?: (postId: string) => void;
    /** Comment handler */
    onComment?: (postId: string) => void;
    /** Repost handler */
    onRepost?: (postId: string) => void;
    /** Requote handler */
    onRequote?: (postId: string) => void;
    /** Save handler */
    onSave?: (postId: string) => void;
    /** Hide handler */
    onHide?: (postId: string) => void;
    /** Space navigation handler */
    onSpaceClick?: (spaceId: string) => void;
    /** Author profile handler */
    onAuthorClick?: (handle: string) => void;
    /** Show compact version */
    compact?: boolean;
    /** Enable mobile touch gestures */
    enableMobileGestures?: boolean;
}
declare const FeedPostCard: React.ForwardRefExoticComponent<FeedPostCardProps & React.RefAttributes<HTMLDivElement>>;
export { FeedPostCard };
//# sourceMappingURL=feed-post-card.d.ts.map