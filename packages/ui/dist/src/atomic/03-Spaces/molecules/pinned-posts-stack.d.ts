export interface PinnedPost {
    id: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    timestamp: string;
    imageUrl?: string;
}
export interface PinnedPostsStackProps {
    posts: PinnedPost[];
    onPostClick?: (postId: string) => void;
}
export declare function PinnedPostsStack({ posts, onPostClick }: PinnedPostsStackProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=pinned-posts-stack.d.ts.map