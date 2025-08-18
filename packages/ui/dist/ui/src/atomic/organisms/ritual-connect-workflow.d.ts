export interface ConnectRitualProps {
    currentStep?: number;
    onStepComplete?: (stepId: string, data: any) => void;
    onRitualComplete?: () => void;
    userProfile?: {
        name: string;
        handle: string;
        interests: string[];
    };
    className?: string;
}
export declare function RitualConnectWorkflow({ currentStep, onStepComplete, onRitualComplete, userProfile, className }: ConnectRitualProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ritual-connect-workflow.d.ts.map