export interface InitializeRitualProps {
    currentStep?: number;
    onStepComplete?: (stepId: string, data: any) => void;
    onRitualComplete?: () => void;
    userProgress?: {
        completedSteps: string[];
        currentStepData?: any;
    };
    className?: string;
}
export declare function RitualInitializeWorkflow({ currentStep, onStepComplete, onRitualComplete, userProgress, className }: InitializeRitualProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ritual-initialize-workflow.d.ts.map