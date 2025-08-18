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
    readonly study_session: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Study Session";
        readonly color: "text-blue-400";
        readonly description: "Organize study groups";
        readonly coordinationType: "study_session";
    };
    readonly food_run: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Food Run";
        readonly color: "text-orange-400";
        readonly description: "Coordinate food orders";
        readonly coordinationType: "food_run";
    };
    readonly activity: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Activity";
        readonly color: "text-green-400";
        readonly description: "Plan group activities";
        readonly coordinationType: "activity";
    };
    readonly ride_share: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Ride Share";
        readonly color: "text-purple-400";
        readonly description: "Share transportation";
        readonly coordinationType: "ride_share";
    };
    readonly meetup: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Meetup";
        readonly color: "text-pink-400";
        readonly description: "Quick meetups";
        readonly coordinationType: "meetup";
    };
};
export interface CoordinationResponse {
    id: string;
    userId: string;
    user?: {
        id: string;
        fullName: string;
        handle: string;
        photoURL?: string;
    };
    responseType: 'interested' | 'going' | 'maybe' | 'cant_make_it';
    message?: string;
    createdAt: Date | {
        toDate: () => Date;
    };
    extraData?: {
        studyTopic?: string;
        bringNotes?: boolean;
        foodOrder?: string;
        contribution?: number;
        canDrive?: boolean;
        seatsAvailable?: number;
        skillLevel?: string;
        equipment?: string[];
    };
}
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
    coordinationData?: {
        coordinationType: 'study_session' | 'food_run' | 'activity' | 'ride_share' | 'meetup';
        responses: CoordinationResponse[];
        maxParticipants?: number;
        currentParticipants?: number;
        location?: string;
        datetime?: Date | {
            toDate: () => Date;
        };
        status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
        requirements?: string[];
        details?: {
            subject?: string;
            duration?: number;
            studyMaterials?: string[];
            restaurant?: string;
            minOrder?: number;
            deadline?: Date | {
                toDate: () => Date;
            };
            activityType?: string;
            skillLevel?: 'beginner' | 'intermediate' | 'advanced';
            equipment?: string[];
            destination?: string;
            departureTime?: Date | {
                toDate: () => Date;
            };
            returnTime?: Date | {
                toDate: () => Date;
            };
            costPerPerson?: number;
        };
    };
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
    onCoordinationResponse?: (postId: string, response: Omit<CoordinationResponse, 'id' | 'createdAt'>) => Promise<void>;
    onUpdateCoordinationStatus?: (postId: string, status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled') => Promise<void>;
    sortBy?: 'recent' | 'popular' | 'trending';
    showFilters?: boolean;
    maxPosts?: number;
    autoFetch?: boolean;
    authToken?: string;
    usePlatformIntegration?: boolean;
    showLiveActivity?: boolean;
    liveActivityCount?: number;
    onActivityUpdate?: (activity: {
        type: string;
        user: string;
        action: string;
        timestamp: Date;
    }) => void;
    currentUserId?: string;
}
export declare const HivePostsSurface: React.ForwardRefExoticComponent<HivePostsSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hivePostsSurfaceVariants, postTypes };
//# sourceMappingURL=hive-posts-surface.d.ts.map