import React from 'react';
export interface AvatarCardProps {
    src?: string;
    name: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'online' | 'offline' | 'away' | 'busy' | 'ghost';
    role?: 'student' | 'builder' | 'leader' | 'verified';
    affiliation?: 'university' | 'residential' | 'greek';
    privacy?: 'public' | 'ghost' | 'anonymous';
    interactive?: boolean;
    layout?: 'horizontal' | 'vertical';
    className?: string;
    onClick?: () => void;
}
export declare const AvatarCard: React.FC<AvatarCardProps>;
//# sourceMappingURL=avatar-card.d.ts.map