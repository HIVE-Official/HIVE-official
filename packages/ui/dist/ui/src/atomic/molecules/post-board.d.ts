import React from 'react';
export interface PostAuthor {
    id: string;
    name: string;
    avatar?: string;
    role?: 'leader' | 'co_leader' | 'member';
    verified?: boolean;
}
export interface PostReaction {
    emoji: string;
    count: number;
    userReacted?: boolean;
    users?: {
        id: string;
        name: string;
    }[];
}
export interface PostAttachment {
    id: string;
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
    size?: number;
    preview?: string;
}
export interface PostEvent {
    id: string;
    title: string;
    date: string;
    location?: string;
    rsvpCount?: number;
    userRsvp?: 'yes' | 'no' | 'maybe' | null;
}
export interface PostPoll {
    id: string;
    question: string;
    options: Array<{
        id: string;
        text: string;
        votes: number;
        userVoted?: boolean;
    }>;
    totalVotes: number;
    expiresAt?: string;
    allowMultiple?: boolean;
}
export interface PostAnnouncement {
    priority: 'low' | 'medium' | 'high' | 'urgent';
    isPinned?: boolean;
    expiresAt?: string;
}
export interface SpacePost {
    id: string;
    type: 'text' | 'event' | 'poll' | 'announcement' | 'tool_output';
    content: string;
    author: PostAuthor;
    timestamp: string;
    editedAt?: string;
    reactions?: PostReaction[];
    commentCount?: number;
    shareCount?: number;
    viewCount?: number;
    attachments?: PostAttachment[];
    event?: PostEvent;
    poll?: PostPoll;
    announcement?: PostAnnouncement;
    toolSource?: {
        toolId: string;
        toolName: string;
        icon: string;
    };
    isPinned?: boolean;
    isEdited?: boolean;
    isReported?: boolean;
}
export interface PostBoardProps {
    posts: SpacePost[];
    currentUser?: {
        id: string;
        role?: 'leader' | 'co_leader' | 'member';
    };
    onReaction?: (postId: string, emoji: string, add: boolean) => void;
    onComment?: (postId: string) => void;
    onShare?: (postId: string) => void;
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    onPin?: (postId: string, pin: boolean) => void;
    onReport?: (postId: string) => void;
    onEventRsvp?: (eventId: string, response: 'yes' | 'no' | 'maybe') => void;
    onPollVote?: (pollId: string, optionId: string) => void;
    showComments?: boolean;
    enableInfiniteScroll?: boolean;
    className?: string;
}
export declare const PostBoard: React.FC<PostBoardProps>;
export default PostBoard;
//# sourceMappingURL=post-board.d.ts.map