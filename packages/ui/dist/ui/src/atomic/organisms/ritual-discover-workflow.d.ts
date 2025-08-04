export interface DiscoverRitualProps {
    currentStep?: number;
    onStepComplete?: (stepId: string, data: any) => void;
    onRitualComplete?: () => void;
    userInterests?: string[];
    userGoals?: string[];
    className?: string;
}
export declare function RitualDiscoverWorkflow({ currentStep, onStepComplete, onRitualComplete, userInterests, userGoals, className }: DiscoverRitualProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ritual-discover-workflow.d.ts.map