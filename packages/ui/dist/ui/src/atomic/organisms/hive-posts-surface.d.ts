import React from 'react';
import type { Space } from '../../types';
export type HivePostType = 'discussion' | 'question' | 'poll' | 'announcement' | 'link' | 'event' | 'study_session' | 'food_run' | 'ride_share' | 'meetup';
export interface HivePostAuthor {
    id: string;
    name: string;
    avatar?: string;
    role?: 'owner' | 'admin' | 'moderator' | 'member';
}
export interface HivePostReaction {
    emoji: string;
    count: number;
    userReacted: boolean;
}
export interface CoordinationResponse {
    userId: string;
    response: 'yes' | 'no' | 'maybe';
    details?: string;
    timestamp: Date;
}
export interface HiveSpacePost {
    id: string;
    type: HivePostType;
    content: string;
    author: HivePostAuthor;
    timestamp: Date;
    reactions?: HivePostReaction[];
    commentCount?: number;
    isPinned?: boolean;
    coordinationType?: 'study_session' | 'food_run' | 'ride_share' | 'meetup';
    coordinationData?: {
        title: string;
        description?: string;
        location?: string;
        datetime?: Date;
        capacity?: number;
        deadline?: Date;
        responses?: CoordinationResponse[];
        status?: 'open' | 'full' | 'closed' | 'completed';
        organizer: string;
    };
    pollData?: {
        question: string;
        options: Array<{
            id: string;
            text: string;
            votes: number;
            userVoted: boolean;
        }>;
        allowMultiple?: boolean;
        endsAt?: Date;
    };
}
export interface HivePostsSurfaceProps {
    space: Space;
    posts?: HiveSpacePost[];
    isLoading?: boolean;
    mode?: 'view' | 'edit';
    maxPosts?: number;
    showFilters?: boolean;
    canPost?: boolean;
    canModerate?: boolean;
    leaderMode?: 'configure' | 'moderate' | 'insights' | null;
    showLiveActivity?: boolean;
    liveActivityCount?: number;
    currentUserId?: string;
    onCreatePost?: (type: HivePostType) => void;
    onCreateComment?: (postId: string, content: string, parentCommentId?: string) => Promise<any>;
    onLoadComments?: (postId: string) => Promise<any[]>;
    onCoordinationResponse?: (postId: string, response: CoordinationResponse) => void;
    onUpdateCoordinationStatus?: (postId: string, status: 'open' | 'full' | 'closed' | 'completed') => void;
    PostRenderer?: React.ComponentType<{
        post: HiveSpacePost;
        spaceId: string;
        currentUserId?: string;
        canModerate?: boolean;
        onReaction?: (postId: string, emoji: string) => void;
        onShare?: (postId: string) => void;
        onDelete?: (postId: string) => void;
    }>;
    onReaction?: (postId: string, emoji: string) => void;
    onShare?: (postId: string) => void;
    onDelete?: (postId: string) => void;
}
export declare const HivePostsSurface: React.FC<HivePostsSurfaceProps>;
export default HivePostsSurface;
//# sourceMappingURL=hive-posts-surface.d.ts.map