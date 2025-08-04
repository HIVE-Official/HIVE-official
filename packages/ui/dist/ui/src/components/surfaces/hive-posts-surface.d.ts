import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hivePostsSurfaceVariants: (props?: {
    mode?: "view" | "builder" | "edit";
} & import("class-variance-authority/types").ClassProp) => string;
declare const postTypes: {
    readonly discussion: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Discussion";
        readonly color: "text-[var(--hive-status-info)]";
        readonly description: "Start a conversation";
    };
    readonly question: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Question";
        readonly color: "text-[var(--hive-status-success)]";
        readonly description: "Ask the community";
    };
    readonly poll: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Poll";
        readonly color: "text-[var(--hive-brand-accent)]";
        readonly description: "Gather opinions";
    };
    readonly announcement: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Announcement";
        readonly color: "text-[var(--hive-brand-primary)]";
        readonly description: "Important updates";
    };
    readonly link: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Link Share";
        readonly color: "text-[var(--hive-brand-accent)]";
        readonly description: "Share a resource";
    };
};
export interface Comment {
    id: string;
    content: string;
    authorId: string;
    author?: {
        id: string;
        fullName: string;
        handle: string;
        photoURL?: string;
    };
    createdAt: Date | {
        toDate: () => Date;
    };
    updatedAt: Date | {
        toDate: () => Date;
    };
    parentCommentId?: string;
    replies: Comment[];
    reactions?: {
        heart: number;
    };
    isEdited?: boolean;
    isDeleted?: boolean;
}
export interface Post {
    id: string;
    type: string;
    content: string;
    authorId: string;
    author?: {
        id: string;
        fullName: string;
        handle: string;
        photoURL?: string;
    };
    createdAt: Date | {
        toDate: () => Date;
    };
    updatedAt: Date | {
        toDate: () => Date;
    };
    reactions?: {
        heart: number;
    };
    isPinned?: boolean;
    isEdited?: boolean;
    isDeleted?: boolean;
    spaceId: string;
    comments?: Comment[];
    replyCount?: number;
    title?: string;
    authorName?: string;
    authorAvatar?: string;
    likes?: number;
    replies?: number;
    views?: number;
    isLocked?: boolean;
    tags?: string[];
    imageUrls?: string[];
    pollOptions?: Array<{
        id: string;
        text: string;
        votes: number;
    }>;
    linkPreview?: {
        title: string;
        description: string;
        imageUrl?: string;
        domain: string;
    };
}
export interface HivePostsSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hivePostsSurfaceVariants> {
    space: Space;
    posts?: Post[];
    isBuilder?: boolean;
    canPost?: boolean;
    canModerate?: boolean;
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    onCreatePost?: (type: keyof typeof postTypes) => void;
    onLikePost?: (postId: string) => void;
    onReplyToPost?: (postId: string, parentCommentId?: string) => void;
    onCreateComment?: (postId: string, content: string, parentCommentId?: string) => Promise<Comment>;
    onLoadComments?: (postId: string) => Promise<Comment[]>;
    onSharePost?: (postId: string) => void;
    onPinPost?: (postId: string) => void;
    onDeletePost?: (postId: string) => void;
    onLockPost?: (postId: string) => void;
    onViewPost?: (postId: string) => void;
    sortBy?: 'recent' | 'popular' | 'trending';
    showFilters?: boolean;
    maxPosts?: number;
    autoFetch?: boolean;
    authToken?: string;
    usePlatformIntegration?: boolean;
}
export declare const HivePostsSurface: React.ForwardRefExoticComponent<HivePostsSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hivePostsSurfaceVariants, postTypes };
//# sourceMappingURL=hive-posts-surface.d.ts.map