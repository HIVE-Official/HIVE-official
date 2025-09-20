"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ConditionGateConfigSchema } from '@hive/core';
import { z } from 'zod';

// Extract the config type from the schema
type ConditionGateConfig = z.infer<typeof ConditionGateConfigSchema>;

interface ConditionGateProps {
  config: ConditionGateConfig;
  children: React.ReactNode;
  toolState: Record<string, any>;
  onAction?: (action: ConditionAction) => void;
  className?: string
}

interface ConditionAction {
  type: 'show' | 'hide' | 'setValue' | 'trigger';
  targetElementId: string;
  value?: unknown
}

interface ToolState {
  [elementId: string]: any
}

export const ConditionGate: React.FC<ConditionGateProps> = ({
  config,
  children,
  toolState,
  onAction,
  className
}) => {
  const [isConditionMet, setIsConditionMet] = useState(false);
  const [debugInfo, setDebugInfo] = useState<{
    conditionResults: boolean[];
    finalResult: boolean;
    evaluationTime: number
  } | null>(null);

  const { conditions, logic = 'and', onTrue, onFalse } = config;

  // Evaluate individual condition
  const evaluateCondition = useCallback((condition: any): boolean => {
    const { sourceElementId, sourceProperty, operator, value: expectedValue } = condition;
    
    // Get the current value from tool state
    const currentValue = toolState[sourceElementId]?.[sourceProperty] ?? toolState[sourceElementId];
    
    // Handle different operators
    switch (operator) {
      case 'equals':
        return currentValue === expectedValue;
      
      case 'notEquals':
        return currentValue !== expectedValue;
      
      case 'contains':
        if (typeof currentValue === 'string' && typeof expectedValue === 'string') {
          return currentValue.toLowerCase().includes(expectedValue.toLowerCase())
        }
        if (Array.isArray(currentValue)) {
          return currentValue.includes(expectedValue)
        }
        return false;
      
      case 'greaterThan':
        return Number(currentValue) > Number(expectedValue);
      
      case 'lessThan':
        return Number(currentValue) < Number(expectedValue);
      
      default:
        return false
    }
  }, [toolState]);

  // Evaluate all conditions based on logic
  const evaluateConditions = useCallback((): { result: boolean; details: boolean[]} => {
    const startTime = performance.now();
    
    const conditionResults = conditions.map(evaluateCondition);
    
    let finalResult: boolean;
    if (logic === 'and') {
      finalResult = conditionResults.every(Boolean)
    } else { // 'or'
      finalResult = conditionResults.some(Boolean)
    }

    const evaluationTime = performance.now() - startTime;
    
    // Update debug info in development
    if (process.env.NODE_ENV === 'development') {
      setDebugInfo({
        conditionResults,
        finalResult,
        evaluationTime
      })}
    }

    return { result: finalResult, details: conditionResults }
  }, [conditions, logic, evaluateCondition]);

  // Execute actions based on condition result
  const executeActions = useCallback((actions: ConditionAction[], conditionMet: boolean) => {
    actions.forEach(action => {
      // Execute the action through callback
      onAction?.(action);

      // For demonstration, we can also handle some actions directly
      if (action.type === 'trigger') {
        // Trigger custom events or analytics
        console.log('ConditionGate triggered action:', action)
      }
    })
  }, [onAction]);

  // Main condition evaluation effect
  useEffect(() => {
    const { result } = evaluateConditions();
    
    // Only update if result changed to avoid unnecessary re-renders
    if (result !== isConditionMet) {
      setIsConditionMet(result);
      
      // Execute appropriate actions
      if (result) {
        executeActions(onTrue, true)
      } else if (onFalse) {
        executeActions(onFalse, false)
      }
    }
  }, [toolState, evaluateConditions, isConditionMet, onTrue, onFalse, executeActions]);

  // Animation variants for smooth show/hide
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Main Conditional Content */}
      <AnimatePresence mode="wait">
        {isConditionMet && (
          <motion.div
            key="condition-content"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              // HIVE design system base styles
              "transition-all duration-300 ease-out",
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Development Debug Panel */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={cn(
            "mt-4 p-3 rounded-lg border border-dashed",
            "bg-[var(--hive-background-secondary)]/30",
            "border-[var(--hive-border-secondary)]",
            "text-xs font-mono"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[var(--hive-text-primary)]">
              ConditionGate Debug
            </span>
            <span className="text-[var(--hive-text-secondary)]">
              {debugInfo.evaluationTime.toFixed(2)}ms
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--hive-text-secondary)]">Logic:</span>
              <span className="text-[var(--hive-brand-primary)]">{logic.toUpperCase()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[var(--hive-text-secondary)]">Result:</span>
              <span className={cn(
                "px-2 py-0.5 rounded",
                debugInfo.finalResult 
                  ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]"
                  : "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]"
              )}>
                {debugInfo.finalResult ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[var(--hive-text-secondary)]">Conditions:</span>
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2 pl-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    debugInfo.conditionResults[index]
                      ? "bg-[var(--hive-status-success)]"
                      : "bg-[var(--hive-status-error)]"
                  )} />
                  <span className="text-[var(--hive-text-secondary)]">
                    {condition.sourceElementId}.{condition.sourceProperty} {condition.operator} {JSON.stringify(condition.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
};

// Hook for managing condition gates in tools
export const useConditionGate = (
  gateId: string,
  config: ConditionGateConfig,
  toolState: ToolState
) => {
  const [isActive, setIsActive] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<Date | null>(null);

  const handleAction = useCallback((action: ConditionAction) => {
    console.log(`ConditionGate ${gateId} executed action:`, action);
    
    // Here you would typically dispatch actions to your tool state manager
    // For example, updating element visibility, values, etc.
    
    setLastEvaluation(new Date())
  }, [gateId]);

  const evaluateGate = useCallback(() => {
    const { conditions, logic } = config;
    
    const results = conditions.map(condition => {
      const { sourceElementId, sourceProperty, operator, value } = condition;
      const currentValue = toolState[sourceElementId]?.[sourceProperty] ?? toolState[sourceElementId];
      
      switch (operator) {
        case 'equals':
          return currentValue === value;
        case 'notEquals':
          return currentValue !== value;
        case 'contains':
          return String(currentValue).includes(String(value));
        case 'greaterThan':
          return Number(currentValue) > Number(value);
        case 'lessThan':
          return Number(currentValue) < Number(value);
        default:
          return false
      }
    });

    const isConditionMet = logic === 'and' 
      ? results.every(Boolean) 
      : results.some(Boolean);
    
    setIsActive(isConditionMet);
    return isConditionMet
  }, [config, toolState]);

  useEffect(() => {
    evaluateGate()
  }, [evaluateGate]);

  return {
    isActive,
    lastEvaluation,
    handleAction,
    evaluateGate
  }
};

export default ConditionGate;