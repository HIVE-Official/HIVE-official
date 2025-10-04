"use client";
import { useState, createContext, useContext, useCallback } from "react";
// Create welcome mat context
const WelcomeMatContext = createContext(null);
// useWelcomeMat hook
export function useWelcomeMat() {
    const context = useContext(WelcomeMatContext);
    if (!context) {
        // During SSR or when context is not available, provide a safe fallback
        if (typeof window === 'undefined') {
            // SSR fallback - provide minimal welcome mat state without hooks
            return {
                isOpen: false,
                currentStep: 0,
                totalSteps: 0,
                completedSteps: new Set(),
                skippedSteps: new Set(),
                currentFlow: null,
                flows: new Map(),
                completedFlows: new Set(),
                openFlow: () => { },
                closeFlow: () => { },
                nextStep: () => { },
                previousStep: () => { },
                skipStep: () => { },
                completeStep: () => { },
                jumpToStep: () => { },
                registerFlow: () => { },
                unregisterFlow: () => { },
                markFlowCompleted: () => { },
                resetFlow: () => { },
                setStepTarget: () => { },
            };
        }
        // Return a default implementation if no provider
        return createDefaultWelcomeMatContext();
    }
    return context;
}
// Create default welcome mat context
function createDefaultWelcomeMatContext() {
    const [state, setState] = useState({
        isOpen: false,
        currentStep: 0,
        totalSteps: 0,
        completedSteps: new Set(),
        skippedSteps: new Set(),
        currentFlow: null,
        flows: new Map(),
        completedFlows: new Set(),
    });
    const openFlow = useCallback((flowId) => {
        const flow = state.flows.get(flowId);
        if (!flow) {
            console.warn(`WelcomeMat: Flow "${flowId}" not found`);
            return;
        }
        setState(prev => ({
            ...prev,
            isOpen: true,
            currentFlow: flow,
            currentStep: 0,
            totalSteps: flow.steps.length,
            completedSteps: new Set(),
            skippedSteps: new Set(),
        }));
    }, [state.flows]);
    const closeFlow = useCallback(() => {
        setState(prev => ({
            ...prev,
            isOpen: false,
            currentFlow: null,
            currentStep: 0,
            totalSteps: 0,
            completedSteps: new Set(),
            skippedSteps: new Set(),
        }));
    }, []);
    const nextStep = useCallback(() => {
        setState(prev => {
            if (!prev.currentFlow || prev.currentStep >= prev.totalSteps - 1) {
                return prev;
            }
            return {
                ...prev,
                currentStep: prev.currentStep + 1
            };
        });
    }, []);
    const previousStep = useCallback(() => {
        setState(prev => {
            if (prev.currentStep <= 0) {
                return prev;
            }
            return {
                ...prev,
                currentStep: prev.currentStep - 1
            };
        });
    }, []);
    const skipStep = useCallback((stepId) => {
        setState(prev => {
            if (!prev.currentFlow)
                return prev;
            const currentStepId = stepId || prev.currentFlow.steps[prev.currentStep]?.id;
            if (!currentStepId)
                return prev;
            const newSkippedSteps = new Set(prev.skippedSteps);
            newSkippedSteps.add(currentStepId);
            return {
                ...prev,
                skippedSteps: newSkippedSteps
            };
        });
        nextStep();
    }, [nextStep]);
    const completeStep = useCallback((stepId) => {
        setState(prev => {
            if (!prev.currentFlow)
                return prev;
            const currentStepId = stepId || prev.currentFlow.steps[prev.currentStep]?.id;
            if (!currentStepId)
                return prev;
            const newCompletedSteps = new Set(prev.completedSteps);
            newCompletedSteps.add(currentStepId);
            return {
                ...prev,
                completedSteps: newCompletedSteps
            };
        });
        nextStep();
    }, [nextStep]);
    const jumpToStep = useCallback((stepIndex) => {
        setState(prev => {
            if (!prev.currentFlow || stepIndex < 0 || stepIndex >= prev.totalSteps) {
                return prev;
            }
            return {
                ...prev,
                currentStep: stepIndex
            };
        });
    }, []);
    const registerFlow = useCallback((flow) => {
        setState(prev => {
            const newFlows = new Map(prev.flows);
            newFlows.set(flow.id, flow);
            return {
                ...prev,
                flows: newFlows
            };
        });
    }, []);
    const unregisterFlow = useCallback((flowId) => {
        setState(prev => {
            const newFlows = new Map(prev.flows);
            newFlows.delete(flowId);
            return {
                ...prev,
                flows: newFlows
            };
        });
    }, []);
    const markFlowCompleted = useCallback((flowId) => {
        setState(prev => {
            const newCompletedFlows = new Set(prev.completedFlows);
            newCompletedFlows.add(flowId);
            return {
                ...prev,
                completedFlows: newCompletedFlows
            };
        });
    }, []);
    const resetFlow = useCallback((flowId) => {
        setState(prev => {
            const newCompletedFlows = new Set(prev.completedFlows);
            newCompletedFlows.delete(flowId);
            return {
                ...prev,
                completedFlows: newCompletedFlows
            };
        });
    }, []);
    const setStepTarget = useCallback((target) => {
        // This would highlight the target element
        console.log(`WelcomeMat: Highlighting target "${target}"`);
    }, []);
    return {
        ...state,
        openFlow,
        closeFlow,
        nextStep,
        previousStep,
        skipStep,
        completeStep,
        jumpToStep,
        registerFlow,
        unregisterFlow,
        markFlowCompleted,
        resetFlow,
        setStepTarget,
    };
}
// Provider component
export const WelcomeMatProvider = WelcomeMatContext.Provider;
// Create welcome mat value for provider
export function createWelcomeMatValue() {
    return createDefaultWelcomeMatContext();
}
//# sourceMappingURL=use-welcome-mat.js.map