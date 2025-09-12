export type RitualType = 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
export type ParticipationType = 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
export interface RitualCreationData {
    name: string;
    title: string;
    description: string;
    tagline: string;
    type: RitualType;
    category: string;
    tags: string[];
    startTime: string;
    endTime?: string;
    duration?: number;
    timezone: string;
    participationType: ParticipationType;
    maxParticipants?: number;
    minParticipants?: number;
    requiresInvitation: boolean;
    universities: string[];
    isGlobal: boolean;
    actions: RitualAction[];
    milestones: RitualMilestone[];
    rewards: RitualReward[];
    prerequisites: {
        minSpaceMemberships?: number;
        requiredFeatures?: string[];
        completedRituals?: string[];
        accountAge?: number;
        academicStatus?: string[];
    };
}
interface RitualAction {
    id: string;
    type: 'post' | 'join_space' | 'create_tool' | 'interact' | 'vote' | 'share' | 'comment' | 'attend';
    name: string;
    description: string;
    isRequired: boolean;
    weight: number;
    maxOccurrences?: number;
    timeLimit?: number;
}
interface RitualMilestone {
    id: string;
    name: string;
    description: string;
    participantThreshold: number;
    progressThreshold: number;
    timeThreshold?: string;
    unlocks: string[];
    celebration?: {
        message: string;
        animation?: string;
        badgeAwarded?: string;
    };
}
interface RitualReward {
    id: string;
    type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
    name: string;
    description: string;
    requiresCompletion: boolean;
    minimumParticipation: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    isTimeLimited: boolean;
    expiresAt?: string;
    unlockScope: 'user' | 'space' | 'campus' | 'platform';
}
export interface RitualCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RitualCreationData) => Promise<void>;
    spaceId?: string;
    isLoading?: boolean;
}
export declare function RitualCreationModal({ isOpen, onClose, onSubmit, spaceId, isLoading }: RitualCreationModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ritual-creation-modal.d.ts.map