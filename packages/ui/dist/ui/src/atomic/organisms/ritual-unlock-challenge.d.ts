import * as React from 'react';
export interface UnlockMilestone {
    threshold: number;
    unlock: string;
    message: string;
    completed: boolean;
}
export interface UnlockReward {
    type: 'ritual' | 'feature' | 'content' | 'prize';
    name: string;
    description: string;
    teaser: string;
    preview?: string;
}
export interface RecentActivity {
    id: string;
    userName: string;
    action: string;
    timestamp: string;
}
export interface RitualUnlockChallengeProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    goalMetric: string;
    targetValue: number;
    currentValue: number;
    deadline?: string;
    reward: UnlockReward;
    milestones?: UnlockMilestone[];
    recentActivity?: RecentActivity[];
    onContribute?: () => void;
    encouragement?: string;
}
export declare const RitualUnlockChallenge: React.FC<RitualUnlockChallengeProps>;
//# sourceMappingURL=ritual-unlock-challenge.d.ts.map