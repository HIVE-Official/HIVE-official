import React from 'react';
export interface CompletionStep {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    completed: boolean;
    points: number;
    action?: () => void;
}
export interface ProfileCompletionCardProps {
    completionPercentage: number;
    completedSteps: string[];
    onStepClick?: (stepId: string) => void;
    className?: string;
}
/**
 * Profile Completion Card - DESIGN_SPEC Compliant with Behavioral Psychology
 *
 * Psychology Principles:
 * - 70% completion target for habit formation
 * - Variable rewards at strategic points
 * - Social proof through completion stats
 * - Loss aversion with "almost there" messaging
 * - Gamification without being obvious
 */
export declare const ProfileCompletionCard: React.FC<ProfileCompletionCardProps>;
//# sourceMappingURL=profile-completion-card.d.ts.map