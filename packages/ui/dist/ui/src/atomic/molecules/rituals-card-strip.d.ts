import * as React from "react";
export interface Ritual {
    id: string;
    title: string;
    description: string;
    icon: string;
    type: "onboarding" | "seasonal" | "challenge" | "emergency";
    /** User's progress */
    progress: {
        current: number;
        total: number;
        percentage: number;
    };
    /** Campus-wide progress */
    campusProgress: {
        participants: number;
        target: number;
        percentage: number;
    };
    /** Time remaining */
    timeRemaining: {
        days: number;
        hours: number;
        isUrgent: boolean;
    };
    /** Rewards */
    rewards: {
        badge?: string;
        title?: string;
        feature?: string;
    };
    /** Status */
    status: "active" | "completed" | "failed" | "upcoming";
    /** Has user joined */
    hasJoined: boolean;
    /** Is trending */
    isTrending?: boolean;
    /** Current milestone */
    currentMilestone?: {
        name: string;
        progress: number;
    };
}
export interface RitualsCardStripProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Active rituals */
    rituals?: Ritual[];
    /** Ritual click handler */
    onRitualClick?: (ritualId: string) => void;
    /** Join ritual handler */
    onJoinRitual?: (ritualId: string) => void;
    /** Show empty state */
    showEmptyState?: boolean;
}
declare const RitualsCardStrip: React.ForwardRefExoticComponent<RitualsCardStripProps & React.RefAttributes<HTMLDivElement>>;
export { RitualsCardStrip };
//# sourceMappingURL=rituals-card-strip.d.ts.map