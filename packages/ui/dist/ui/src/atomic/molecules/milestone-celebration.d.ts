export interface MilestoneCelebrationProps {
    milestone: {
        id: string;
        name: string;
        description: string;
        type: 'personal' | 'community' | 'ritual_complete';
        icon?: string;
        rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
        unlockedFeatures?: string[];
        communityStats?: {
            totalAchievers: number;
            percentageComplete: number;
        };
    };
    isVisible: boolean;
    onClose?: () => void;
    onShare?: () => void;
    className?: string;
}
export declare function MilestoneCelebration({ milestone, isVisible, onClose, onShare, className }: MilestoneCelebrationProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=milestone-celebration.d.ts.map