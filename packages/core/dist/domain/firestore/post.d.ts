/**
 * Post Domain Model - Space Content
 */
import { Timestamp } from 'firebase/firestore';
export interface Post {
    id: string;
    spaceId: string;
    authorId: string;
    authorHandle: string;
    authorName: string;
    authorPhoto?: string;
    content: string;
    images?: string[];
    likes: string[];
    commentCount: number;
    isPinned: boolean;
    isPromoted: boolean;
    visibility: 'public' | 'members' | 'private';
    tags?: string[];
    mentions?: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt?: Timestamp;
    campusId: string;
}
export interface PostComment {
    id: string;
    postId: string;
    authorId: string;
    authorHandle: string;
    authorName: string;
    authorPhoto?: string;
    content: string;
    likes: string[];
    replyTo?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt?: Timestamp;
}
export interface PostReaction {
    userId: string;
    type: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';
    timestamp: Timestamp;
}
export interface PostDraft {
    content: string;
    images?: string[];
    tags?: string[];
    mentions?: string[];
    visibility: 'public' | 'members' | 'private';
    savedAt: Timestamp;
}
//# sourceMappingURL=post.d.ts.map