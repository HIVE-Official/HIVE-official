import React from 'react';
export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
    user: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        bio?: string;
        status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
        role?: 'student' | 'builder' | 'leader' | 'verified';
        affiliation?: 'university' | 'residential' | 'greek';
        privacy?: 'public' | 'ghost' | 'anonymous';
        university?: string;
        graduationYear?: number;
        major?: string;
        location?: string;
        joinedDate?: string;
        website?: string;
        followers?: number;
        following?: number;
        spaces?: number;
        tools?: number;
    };
    variant?: 'default' | 'compact' | 'detailed' | 'minimal';
    relationship?: 'none' | 'following' | 'followed' | 'mutual' | 'blocked';
    onFollow?: (userId: string) => void;
    onMessage?: (userId: string) => void;
    onEmail?: (userId: string) => void;
    onViewProfile?: (userId: string) => void;
    onMenu?: (userId: string) => void;
    showActions?: boolean;
    showStats?: boolean;
    showBio?: boolean;
    showDetails?: boolean;
    interactive?: boolean;
}
export declare const UserCard: React.FC<UserCardProps>;
//# sourceMappingURL=user-card.d.ts.map