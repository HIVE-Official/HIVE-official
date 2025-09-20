export type RitualType = 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
export type ParticipationType = 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
export interface RitualCreationData {
    title: string;
    description: string;
    tagline: string;
    type: RitualType;
    category: string;
    tags: string[];
    endTime?: string;
    duration?: number;
    maxParticipants?: number;
    minParticipants?: number;
    requiresInvitation: boolean;
    universities: string[];
    isGlobal: boolean;
    rewards: RitualReward[];
    minSpaceMemberships?: number;
    requiredFeatures?: string[];
    completedRituals?: string[];
    accountAge?: number;
    academicStatus?: string[];
}
interface RitualReward {
    id: string;
    type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
    name: string;
    description: string;
    requiresCompletion: boolean;
    minimumParticipation: number;
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
export declare function RitualCreationModal({ isOpen, onClose, onSubmit, spaceId: _spaceId, isLoading }: RitualCreationModalProps): void;
export {};
//# sourceMappingURL=ritual-creation-modal.d.ts.map