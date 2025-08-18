import React from 'react';
export interface RitualCardProps {
    id: string;
    title: string;
    description: string;
    type: 'first_light' | 'torch_pass' | 'space_hunt' | 'builder_spotlight' | 'wave';
    participantCount: number;
    timeRemaining?: string;
    isActive: boolean;
    hasParticipated: boolean;
    onParticipate?: () => void;
    className?: string;
}
export declare const RitualCard: React.FC<RitualCardProps>;
//# sourceMappingURL=ritual-card.d.ts.map