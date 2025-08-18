import React from 'react';
export interface RitualCardCountdownProps {
    id: string;
    title: string;
    description: string;
    type: 'first_light' | 'torch_pass' | 'space_hunt' | 'builder_spotlight' | 'wave';
    participantCount: number;
    startTime: Date;
    endTime: Date;
    isActive: boolean;
    hasParticipated: boolean;
    urgencyLevel: 'low' | 'medium' | 'high';
    onParticipate?: () => void;
    onSetReminder?: () => void;
    className?: string;
}
export declare const RitualCardCountdown: React.FC<RitualCardCountdownProps>;
//# sourceMappingURL=ritual-card-countdown.d.ts.map