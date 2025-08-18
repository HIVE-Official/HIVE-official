import React from 'react';
export interface RitualCardCelebrationProps {
    id: string;
    title: string;
    description: string;
    type: 'first_light' | 'torch_pass' | 'space_hunt' | 'builder_spotlight' | 'wave';
    participantCount: number;
    timeRemaining?: string;
    isActive: boolean;
    hasParticipated: boolean;
    celebrationMoment?: boolean;
    onParticipate?: () => void;
    className?: string;
}
export declare const RitualCardCelebration: React.FC<RitualCardCelebrationProps>;
//# sourceMappingURL=ritual-card-celebration.d.ts.map