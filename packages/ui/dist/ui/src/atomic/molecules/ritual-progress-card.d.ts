/**
 * Ritual Progress Card Component
 *
 * Implements campus-wide ritual tracking with behavioral psychology:
 * - Progress rings with Instagram story quality
 * - 70% completion target per SPEC
 * - Streak counters and milestone rewards
 * - Social proof and leaderboard integration
 * - Check-in buttons with haptic feedback simulation
 */
import * as React from "react";
export interface RitualData {
    id: string;
    title: string;
    description: string;
    category: 'health' | 'academic' | 'social' | 'campus' | 'seasonal';
    progress: {
        current: number;
        target: number;
        percentage: number;
        isCompleted: boolean;
        streakDays: number;
        longestStreak: number;
    };
    participation: {
        totalParticipants: number;
        friendsParticipating: string[];
        myCheckIns: number;
        lastCheckIn?: string;
        hasCheckedInToday: boolean;
    };
    duration: {
        startDate: string;
        endDate: string;
        daysRemaining: number;
        isActive: boolean;
    };
    rewards: {
        points: number;
        badges: string[];
        nextMilestone?: {
            description: string;
            pointsNeeded: number;
            reward: string;
        };
    };
    leaderboard?: {
        myRank: number;
        topParticipants: Array<{
            name: string;
            avatar?: string;
            score: number;
            isMe?: boolean;
        }>;
    };
    motivationalMessage?: string;
    urgencyLevel: 'low' | 'medium' | 'high';
    isNewRitual?: boolean;
}
export interface RitualProgressCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ritual data */
    ritual: RitualData;
    /** Check-in handler */
    onCheckIn?: (ritualId: string) => void;
    /** View details handler */
    onViewDetails?: (ritualId: string) => void;
    /** View leaderboard handler */
    onViewLeaderboard?: (ritualId: string) => void;
    /** Share handler */
    onShare?: (ritualId: string) => void;
    /** Show compact version */
    compact?: boolean;
    /** Enable behavioral psychology features */
    enablePsychology?: boolean;
}
declare const RitualProgressCard: React.ForwardRefExoticComponent<RitualProgressCardProps & React.RefAttributes<HTMLDivElement>>;
export { RitualProgressCard };
//# sourceMappingURL=ritual-progress-card.d.ts.map