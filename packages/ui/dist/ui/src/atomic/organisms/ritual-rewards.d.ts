export interface RitualReward {
    id: string;
    type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization' | 'achievement';
    name: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    category: 'completion' | 'participation' | 'social' | 'creative' | 'leadership' | 'milestone' | 'streak';
    unlockedAt?: string;
    unlockedBy?: string;
    unlockedFromRitual?: {
        id: string;
        name: string;
        title: string;
    };
    minimumParticipation: number;
    unlockScope: 'user' | 'space' | 'campus' | 'platform';
    icon?: string;
    color?: string;
    imageUrl?: string;
    animationUrl?: string;
    expiresAt?: string;
    stats?: {
        totalEarned: number;
        firstEarnedAt?: string;
        difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    };
    featureUnlocks?: Array<{
        featureId: string;
        name: string;
        description: string;
    }>;
    isShowcase: boolean;
    canShare: boolean;
}
export interface Achievement extends RitualReward {
    type: 'achievement';
    progress?: {
        current: number;
        target: number;
        unit: string;
    };
    conditions: Array<{
        type: string;
        description: string;
        completed: boolean;
    }>;
}
export interface RitualRewardsProps {
    rewards: RitualReward[];
    achievements: Achievement[];
    onViewReward?: (reward: RitualReward) => void;
    onShareReward?: (reward: RitualReward) => void;
    onToggleShowcase?: (rewardId: string, showcase: boolean) => void;
    className?: string;
    view?: 'grid' | 'list' | 'showcase';
    filterCategory?: string[];
    filterRarity?: string[];
    filterStatus?: 'all' | 'unlocked' | 'locked';
    sortBy?: 'date' | 'rarity' | 'name' | 'category';
    showStats?: boolean;
    showProgress?: boolean;
}
export declare function RitualRewards({ rewards, achievements, onViewReward, onShareReward, onToggleShowcase, className, view, filterCategory, filterRarity, filterStatus, sortBy, showStats, showProgress }: RitualRewardsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ritual-rewards.d.ts.map