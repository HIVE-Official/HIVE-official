import React from 'react';
export type PostType = 'text' | 'event' | 'poll' | 'announcement';
export interface PostCreationData {
    type: PostType;
    content: string;
    event?: {
        title: string;
        date: string;
        time: string;
        location?: string;
        description?: string;
        capacity?: number;
        requireRsvp: boolean;
    };
    poll?: {
        question: string;
        options: string[];
        allowMultiple: boolean;
        expiresIn?: number;
        anonymous: boolean;
    };
    announcement?: {
        priority: 'low' | 'medium' | 'high' | 'urgent';
        pinned: boolean;
        expiresAt?: string;
    };
    attachments?: File[];
    mentions?: string[];
    tags?: string[];
}
export interface PostCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PostCreationData) => Promise<void>;
    spaceType?: 'university' | 'residential' | 'greek' | 'student';
    userRole?: 'leader' | 'co_leader' | 'member';
    initialType?: PostType;
    isSubmitting?: boolean;
    className?: string;
}
export declare const PostCreationModal: React.FC<PostCreationModalProps>;
export default PostCreationModal;
//# sourceMappingURL=post-creation-modal.d.ts.map