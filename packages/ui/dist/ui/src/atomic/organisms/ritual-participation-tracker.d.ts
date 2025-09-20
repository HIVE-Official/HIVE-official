export interface RitualParticipation {
    id: string;
    ritualId: string;
    userId: string;
    status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
    progress: number;
    score: number;
    rank?: number;
    joinedAt: string;
    lastActiveAt: string;
    completedActions: Array<{
        actionId: string;
        actionType: string;
        completedAt: string;
        points: number;
        data?: Record<string, string | number | boolean>;
    }>;
    milestonesReached: Array<{
        milestoneId: string;
        name: string;
        reachedAt: string;
        celebration?: Record<string, string | number | boolean>;
    }>;
    streakDays: number;
    personalBest?: {
        longestStreak: number;
        highestScore: number;
        fastestCompletion: number;
    };
    rewards: Array<{
        id: string;
        type: string;
        name: string;
        awardedAt: string;
    }>;
    achievements: Array<{
        id: string;
        name: string;
        description: string;
        unlockedAt: string;
        rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    }>;
}
export interface Ritual {
    id: string;
    name: string;
    title: string;
    description: string;
    type: string;
    status: string;
    startTime: string;
    endTime?: string;
    participantCount: number;
    maxParticipants?: number;
    actions: Array<{
        id: string;
        type: string;
        name: string;
        description: string;
        isRequired: boolean;
        weight: number;
    }>;
    milestones: Array<{
        id: string;
        name: string;
        description: string;
        threshold: number;
        rewards?: string[];
    }>;
}
export interface RitualParticipationTrackerProps {
    participation: RitualParticipation;
    ritual: Ritual;
    onActionComplete?: (actionId: string, data?: Record<string, string | number | boolean>) => Promise<void>;
    onWithdraw?: () => Promise<void>;
    onShare?: () => void;
    className?: string;
    variant?: 'compact' | 'detailed' | 'card';
    showActions?: boolean;
}
export declare function RitualParticipationTracker({ participation, ritual, onActionComplete, onWithdraw, onShare, className, variant, showActions }: RitualParticipationTrackerProps): void;
//# sourceMappingURL=ritual-participation-tracker.d.ts.map