export interface Ritual {
    id: string;
    name: string;
    title: string;
    description: string;
    tagline: string;
    type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
    status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled' | 'archived';
    week: number;
    duration: number;
    totalParticipants: number;
    activeParticipants: number;
    completionRate: number;
    userParticipation?: {
        status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
        progressPercentage: number;
        currentStep: string;
        nextAction: string;
    };
    milestones: Array<{
        id: string;
        name: string;
        description: string;
        isReached: boolean;
        progress?: number;
    }>;
    actions: Array<{
        id: string;
        name: string;
        description: string;
        isCompleted: boolean;
        type: 'initialize' | 'connect' | 'discover' | 'complete';
    }>;
}
export interface RitualsHubProps {
    currentWeek?: number;
    availableRituals?: Ritual[];
    completedRituals?: Ritual[];
    className?: string;
}
export declare function RitualsHub({ currentWeek, availableRituals, completedRituals, className }: RitualsHubProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=rituals-hub.d.ts.map