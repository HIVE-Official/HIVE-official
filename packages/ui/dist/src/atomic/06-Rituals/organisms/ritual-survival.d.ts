import * as React from 'react';
export interface SurvivalMatchup {
    id: string;
    competitor1: {
        id: string;
        name: string;
        votes: number;
    };
    competitor2: {
        id: string;
        name: string;
        votes: number;
    };
    status: 'upcoming' | 'active' | 'completed';
    eliminated?: string;
}
export interface RitualSurvivalProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    roundName?: string;
    timeRemaining?: string;
    currentMatchups: SurvivalMatchup[];
    eliminatedCount?: number;
    survivorsCount?: number;
    onVote?: (matchupId: string, competitorId: string) => void;
    isLive?: boolean;
}
export declare const RitualSurvival: React.FC<RitualSurvivalProps>;
//# sourceMappingURL=ritual-survival.d.ts.map