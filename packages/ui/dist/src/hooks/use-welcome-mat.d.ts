export interface WelcomeMatState {
    isOpen: boolean;
    currentStep: number;
    totalSteps: number;
    completedSteps: Set<string>;
    skippedSteps: Set<string>;
    currentFlow: WelcomeMatFlow | null;
}
export interface WelcomeMatStep {
    id: string;
    title: string;
    description: string;
    content?: React.ReactNode;
    target?: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    required?: boolean;
    canSkip?: boolean;
    action?: {
        label: string;
        handler: () => void | Promise<void>;
    };
    validation?: () => boolean | Promise<boolean>;
}
export interface WelcomeMatFlow {
    id: string;
    name: string;
    description: string;
    steps: WelcomeMatStep[];
    triggers: {
        route?: string;
        event?: string;
        condition?: () => boolean;
    };
    persistent?: boolean;
    priority?: number;
}
export interface WelcomeMatActions {
    openFlow: (flowId: string) => void;
    closeFlow: () => void;
    nextStep: () => void;
    previousStep: () => void;
    skipStep: (stepId?: string) => void;
    completeStep: (stepId?: string) => void;
    jumpToStep: (stepIndex: number) => void;
    registerFlow: (flow: WelcomeMatFlow) => void;
    unregisterFlow: (flowId: string) => void;
    markFlowCompleted: (flowId: string) => void;
    resetFlow: (flowId: string) => void;
    setStepTarget: (target: string) => void;
}
export interface WelcomeMatContextType extends WelcomeMatState, WelcomeMatActions {
    flows: Map<string, WelcomeMatFlow>;
    completedFlows: Set<string>;
}
export declare function useWelcomeMat(): WelcomeMatContextType;
export declare const WelcomeMatProvider: import("react").Provider<WelcomeMatContextType>;
export declare function createWelcomeMatValue(): WelcomeMatContextType;
//# sourceMappingURL=use-welcome-mat.d.ts.map