import * as React from "react";
import { motion } from "framer-motion";
export type HivePostComment = {
    id: string;
    author: {
        name: string;
        avatarUrl?: string;
        handle?: string;
        role?: string;
    };
    timeAgo: string;
    body: string;
    removed?: boolean;
};
export type HivePostMedia = {
    id: string;
    type?: "image" | "video" | "file" | "link";
    url?: string;
    alt?: string;
    title?: string;
    sizeLabel?: string;
};
export type HivePost = {
    id: string;
    author: {
        name: string;
        verified?: boolean;
        role?: string;
        handle?: string;
        avatarUrl?: string;
        badges?: string[];
    };
    space?: string;
    timeAgo: string;
    title?: string;
    body?: string;
    media?: HivePostMedia[];
    repostAttribution?: {
        name: string;
        avatarUrl?: string;
        timeAgo: string;
    };
    repostedByMe?: boolean;
    visibility?: "public" | "space" | "private";
    votes?: {
        up: number;
        my: "up" | null;
    };
    counts?: {
        comments?: number;
        reposts?: number;
        shares?: number;
        views?: number;
    };
    comments?: HivePostComment[];
    tags?: string[];
    isEdited?: boolean;
    isPinned?: boolean;
};
export interface PostCardListItemProps extends React.ComponentProps<typeof motion.article> {
    post: HivePost;
    onOpen?: (post: HivePost, triggerRect?: DOMRect, meta?: {
        mode?: "post" | "comments";
    }) => void;
    onMoreOptions?: (post: HivePost) => void;
    onRepostClick?: (post: HivePost) => void;
    onShare?: (post: HivePost) => void;
    onUpvoteClick?: (post: HivePost) => void;
}
export declare const PostCardListItem: React.ForwardRefExoticComponent<Omit<PostCardListItemProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface PostOverlayProps {
    post: HivePost;
    anchorRect?: DOMRect;
    onClose: () => void;
    initialMode?: "post" | "comments";
    onUpvoteToggle?: (postId: string, nextState: "up" | null) => Promise<void> | void;
    onRepost?: (postId: string, message: string) => Promise<{
        reposts?: number;
    } | void>;
    onCommentSubmit?: (postId: string, body: string) => Promise<{
        comments?: HivePostComment[];
        totalComments?: number;
    } | void>;
    onShare?: (postId: string) => Promise<void> | void;
    onMoreOptions?: (postId: string) => void;
}
export declare const PostOverlay: React.FC<PostOverlayProps>;
export declare const PostCardSkeleton: React.FC;
export declare const usePostCardDemo: () => {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    anchorRect: DOMRect;
    setAnchorRect: React.Dispatch<React.SetStateAction<DOMRect>>;
    mode: "post" | "comments";
    setMode: React.Dispatch<React.SetStateAction<"post" | "comments">>;
};
//# sourceMappingURL=post-card.d.ts.map