export interface ProfileCompletionStep {
    id: string;
    title: string;
    description?: string;
}
export interface ProfileCompletionCardProps {
    completionPercentage: number;
    completedSteps?: string[];
    steps?: ProfileCompletionStep[];
    onStepClick?: (stepId: string) => void;
    className?: string;
}
export declare function ProfileCompletionCard({ completionPercentage, completedSteps, steps, onStepClick, className, }: ProfileCompletionCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-completion-card.d.ts.map