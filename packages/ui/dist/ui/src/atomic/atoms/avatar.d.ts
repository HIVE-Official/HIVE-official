import React from 'react';
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
    initials?: string;
    placeholder?: React.ReactNode;
    interactive?: boolean;
    role?: 'student' | 'builder' | 'leader' | 'verified';
    affiliation?: 'university' | 'residential' | 'greek';
    privacy?: 'public' | 'ghost' | 'anonymous';
    showBadge?: boolean;
}
export declare const Avatar: React.FC<AvatarProps>;
//# sourceMappingURL=avatar.d.ts.map