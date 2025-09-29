/**
 * Enhanced Ritual with Campus Isolation and Rewards
 * Quick additions to make Rituals domain complete
 */
import { Ritual, RitualData, RitualCreationProps } from './ritual';
import { CampusId } from '../profile/value-objects/campus-id';
import { Result } from './value-objects';
export interface RitualBadge {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt?: Date;
}
export interface RitualReward {
    id: string;
    type: 'badge' | 'points' | 'feature_unlock' | 'physical';
    name: string;
    description: string;
    value: any;
    requiredPoints?: number;
    requiredMilestone?: string;
}
export interface RitualVisuals {
    bannerUrl?: string;
    iconUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
}
export interface EnhancedRitualData extends RitualData {
    campusId: CampusId;
    badges: RitualBadge[];
    rewards: RitualReward[];
    visuals: RitualVisuals;
    isFeatured: boolean;
    sponsoredBy?: string;
}
export declare class EnhancedRitual extends Ritual {
    private enhancedData;
    static createWithCampus(props: RitualCreationProps & {
        campusId?: string;
        visuals?: RitualVisuals;
    }): Result<EnhancedRitual>;
    addBadge(badge: RitualBadge): Result<void>;
    addReward(reward: RitualReward): Result<void>;
    awardBadge(participantId: string, badgeId: string): Result<RitualBadge>;
    feature(): void;
    unfeature(): void;
    updateVisuals(visuals: Partial<RitualVisuals>): void;
    belongsToCampus(campusId: CampusId): boolean;
    getAvailableBadges(points: number): RitualBadge[];
    private addDefaultBadges;
    generateFeedUpdate(): {
        type: 'ritual_update';
        title: string;
        description: string;
        progress: number;
        featured: boolean;
        visual?: string;
    };
    get campusId(): CampusId;
    get badges(): RitualBadge[];
    get rewards(): RitualReward[];
    get isFeatured(): boolean;
    get visuals(): RitualVisuals;
    toEnhancedData(): EnhancedRitualData;
}
//# sourceMappingURL=enhanced-ritual.d.ts.map