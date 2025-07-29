import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hivePostsSurfaceVariants: (props?: {
    mode?: "view" | "builder" | "edit";
} & import("class-variance-authority/dist/types").ClassProp) => string;
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
export interface Post {
    id: string;
    type: keyof typeof postTypes;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    replies: number;
    views: number;
    isPinned: boolean;
    isLocked: boolean;
    tags: string[];
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
    onCreatePost?: (type: keyof typeof postTypes) => void;
    onLikePost?: (postId: string) => void;
    onReplyToPost?: (postId: string) => void;
    onSharePost?: (postId: string) => void;
    onPinPost?: (postId: string) => void;
    onDeletePost?: (postId: string) => void;
    onViewPost?: (postId: string) => void;
    sortBy?: 'recent' | 'popular' | 'trending';
    showFilters?: boolean;
    maxPosts?: number;
}
export declare const HivePostsSurface: React.ForwardRefExoticComponent<HivePostsSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hivePostsSurfaceVariants, postTypes };
//# sourceMappingURL=hive-posts-surface.d.ts.map