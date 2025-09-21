"use client"

import { useState, useEffect, createContext, useContext, useCallback } from "react"

// Welcome mat state for onboarding and feature discovery
export interface WelcomeMatState {
  isOpen: boolean
  currentStep: number
  totalSteps: number
  completedSteps: Set<string>
  skippedSteps: Set<string>
  currentFlow: WelcomeMatFlow | null
}

export interface WelcomeMatStep {
  id: string
  title: string
  description: string
  content?: React.ReactNode
  target?: string // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  required?: boolean
  canSkip?: boolean
  action?: {
    label: string
    handler: () => void | Promise<void>
  }
  validation?: () => boolean | Promise<boolean>
}

export interface WelcomeMatFlow {
  id: string
  name: string
  description: string
  steps: WelcomeMatStep[]
  triggers: {
    route?: string
    event?: string
    condition?: () => boolean
  }
  persistent?: boolean // Should persist across sessions
  priority?: number
}

export interface WelcomeMatActions {
  openFlow: (flowId: string) => void
  closeFlow: () => void
  nextStep: () => void
  previousStep: () => void
  skipStep: (stepId?: string) => void
  completeStep: (stepId?: string) => void
  jumpToStep: (stepIndex: number) => void
  registerFlow: (flow: WelcomeMatFlow) => void
  unregisterFlow: (flowId: string) => void
  markFlowCompleted: (flowId: string) => void
  resetFlow: (flowId: string) => void
  setStepTarget: (target: string) => void
}

export interface WelcomeMatContextType extends WelcomeMatState, WelcomeMatActions {
  flows: Map<string, WelcomeMatFlow>
  completedFlows: Set<string>
}

// Create welcome mat context
const WelcomeMatContext = createContext<WelcomeMatContextType | null>(null)

// useWelcomeMat hook
export function useWelcomeMat(): WelcomeMatContextType {
  const context = useContext(WelcomeMatContext)
  if (!context) {
    // Return a default implementation if no provider
    return createDefaultWelcomeMatContext()
  }
  return context
}

// Create default welcome mat context
function createDefaultWelcomeMatContext(): WelcomeMatContextType {
  const [state, setState] = useState<WelcomeMatState & { flows: Map<string, WelcomeMatFlow>, completedFlows: Set<string> }>({
    isOpen: false,
    currentStep: 0,
    totalSteps: 0,
    completedSteps: new Set(),
    skippedSteps: new Set(),
    currentFlow: null,
    flows: new Map(),
    completedFlows: new Set(),
  })

  const openFlow = useCallback((flowId: string) => {
    const flow = state.flows.get(flowId)
    if (!flow) {
      console.warn(`WelcomeMat: Flow "${flowId}" not found`)
      return
    }

    setState(prev => ({
      ...prev,
      isOpen: true,
      currentFlow: flow,
      currentStep: 0,
      totalSteps: flow.steps.length,
      completedSteps: new Set(),
      skippedSteps: new Set(),
    }))
  }, [state.flows])

  const closeFlow = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      currentFlow: null,
      currentStep: 0,
      totalSteps: 0,
      completedSteps: new Set(),
      skippedSteps: new Set(),
    }))
  }, [])

  const nextStep = useCallback(() => {
    setState(prev => {
      if (!prev.currentFlow || prev.currentStep >= prev.totalSteps - 1) {
        return prev
      }
      return {
        ...prev,
        currentStep: prev.currentStep + 1
      }
    })
  }, [])

  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep <= 0) {
        return prev
      }
      return {
        ...prev,
        currentStep: prev.currentStep - 1
      }
    })
  }, [])

  const skipStep = useCallback((stepId?: string) => {
    setState(prev => {
      if (!prev.currentFlow) return prev

      const currentStepId = stepId || prev.currentFlow.steps[prev.currentStep]?.id
      if (!currentStepId) return prev

      const newSkippedSteps = new Set(prev.skippedSteps)
      newSkippedSteps.add(currentStepId)

      return {
        ...prev,
        skippedSteps: newSkippedSteps
      }
    })
    nextStep()
  }, [nextStep])

  const completeStep = useCallback((stepId?: string) => {
    setState(prev => {
      if (!prev.currentFlow) return prev

      const currentStepId = stepId || prev.currentFlow.steps[prev.currentStep]?.id
      if (!currentStepId) return prev

      const newCompletedSteps = new Set(prev.completedSteps)
      newCompletedSteps.add(currentStepId)

      return {
        ...prev,
        completedSteps: newCompletedSteps
      }
    })
    nextStep()
  }, [nextStep])

  const jumpToStep = useCallback((stepIndex: number) => {
    setState(prev => {
      if (!prev.currentFlow || stepIndex < 0 || stepIndex >= prev.totalSteps) {
        return prev
      }
      return {
        ...prev,
        currentStep: stepIndex
      }
    })
  }, [])

  const registerFlow = useCallback((flow: WelcomeMatFlow) => {
    setState(prev => {
      const newFlows = new Map(prev.flows)
      newFlows.set(flow.id, flow)
      return {
        ...prev,
        flows: newFlows
      }
    })
  }, [])

  const unregisterFlow = useCallback((flowId: string) => {
    setState(prev => {
      const newFlows = new Map(prev.flows)
      newFlows.delete(flowId)
      return {
        ...prev,
        flows: newFlows
      }
    })
  }, [])

  const markFlowCompleted = useCallback((flowId: string) => {
    setState(prev => {
      const newCompletedFlows = new Set(prev.completedFlows)
      newCompletedFlows.add(flowId)
      return {
        ...prev,
        completedFlows: newCompletedFlows
      }
    })
  }, [])

  const resetFlow = useCallback((flowId: string) => {
    setState(prev => {
      const newCompletedFlows = new Set(prev.completedFlows)
      newCompletedFlows.delete(flowId)
      return {
        ...prev,
        completedFlows: newCompletedFlows
      }
    })
  }, [])

  const setStepTarget = useCallback((target: string) => {
    // This would highlight the target element
    console.log(`WelcomeMat: Highlighting target "${target}"`)
  }, [])

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
  }
}

// Provider component
export const WelcomeMatProvider = WelcomeMatContext.Provider

// Create welcome mat value for provider
export function createWelcomeMatValue(): WelcomeMatContextType {
  return createDefaultWelcomeMatContext()
}