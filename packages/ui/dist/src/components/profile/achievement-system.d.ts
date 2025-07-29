import React from 'react';
export interface Achievement {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    icon: string;
    category: AchievementCategory;
    rarity: AchievementRarity;
    points: number;
    unlockCriteria: UnlockCriteria;
    rewards?: AchievementReward[];
    status: 'locked' | 'available' | 'in_progress' | 'completed';
    progress?: {
        current: number;
        total: number;
        unit?: string;
    };
    unlockedAt?: string;
    claimedAt?: string;
    isSecret: boolean;
    isLimited: boolean;
    limitedUntil?: string;
    prerequisites?: string[];
    completedBy: number;
    completionRate: number;
}
export type AchievementCategory = 'builder' | 'social' | 'academic' | 'community' | 'milestone' | 'seasonal' | 'special';
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export interface UnlockCriteria {
    type: 'count' | 'streak' | 'time' | 'rating' | 'collaboration' | 'milestone';
    target: number;
    timeframe?: 'day' | 'week' | 'month' | 'semester' | 'year';
    conditions?: Record<string, any>;
}
export interface AchievementReward {
    type: 'badge' | 'title' | 'feature' | 'cosmetic' | 'xp' | 'boost';
    value: string | number;
    duration?: number;
}
export interface AchievementStats {
    totalEarned: number;
    totalAvailable: number;
    totalPoints: number;
    completionRate: number;
    recentAchievements: Achievement[];
    streaks: {
        current: number;
        longest: number;
        type: string;
    }[];
    leaderboardRank?: {
        position: number;
        total: number;
        percentile: number;
    };
}
interface AchievementSystemProps {
    achievements: Achievement[];
    stats: AchievementStats;
    isOwnProfile?: boolean;
    onAchievementClick?: (achievement: Achievement) => void;
    onClaimReward?: (achievement: Achievement) => void;
    onShareAchievement?: (achievement: Achievement) => void;
    className?: string;
}
export declare const AchievementSystem: React.FC<AchievementSystemProps>;
export default AchievementSystem;
//# sourceMappingURL=achievement-system.d.ts.map