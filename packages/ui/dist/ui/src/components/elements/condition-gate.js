"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
export const ConditionGate = ({ config, children, toolState, onAction, className }) => {
    const [isConditionMet, setIsConditionMet] = useState(false);
    const [debugInfo, setDebugInfo] = useState(null);
    const { conditions, logic = 'and', onTrue, onFalse } = config;
    // Evaluate individual condition
    const evaluateCondition = useCallback((condition) => {
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
                    return currentValue.toLowerCase().includes(expectedValue.toLowerCase());
                }
                if (Array.isArray(currentValue)) {
                    return currentValue.includes(expectedValue);
                }
                return false;
            case 'greaterThan':
                return Number(currentValue) > Number(expectedValue);
            case 'lessThan':
                return Number(currentValue) < Number(expectedValue);
            default:
                return false;
        }
    }, [toolState]);
    // Evaluate all conditions based on logic
    const evaluateConditions = useCallback(() => {
        const startTime = performance.now();
        const conditionResults = conditions.map(evaluateCondition);
        let finalResult;
        if (logic === 'and') {
            finalResult = conditionResults.every(Boolean);
        }
        else { // 'or'
            finalResult = conditionResults.some(Boolean);
        }
        const evaluationTime = performance.now() - startTime;
        // Update debug info in development
        if (process.env.NODE_ENV === 'development') {
            setDebugInfo({
                conditionResults,
                finalResult,
                evaluationTime
            });
        }
        return { result: finalResult, details: conditionResults };
    }, [conditions, logic, evaluateCondition]);
    // Execute actions based on condition result
    const executeActions = useCallback((actions, conditionMet) => {
        actions.forEach(action => {
            // Execute the action through callback
            onAction?.(action);
            // For demonstration, we can also handle some actions directly
            if (action.type === 'trigger') {
                // Trigger custom events or analytics
                console.log('ConditionGate triggered action:', action);
            }
        });
    }, [onAction]);
    // Main condition evaluation effect
    useEffect(() => {
        const { result } = evaluateConditions();
        // Only update if result changed to avoid unnecessary re-renders
        if (result !== isConditionMet) {
            setIsConditionMet(result);
            // Execute appropriate actions
            if (result) {
                executeActions(onTrue, true);
            }
            else if (onFalse) {
                executeActions(onFalse, false);
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
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { mode: "wait", children: isConditionMet && (_jsx(motion.div, { variants: variants, initial: "hidden", animate: "visible", exit: "exit", className: cn(
                    // HIVE design system base styles
                    "transition-all duration-300 ease-out", className), children: children }, "condition-content")) }), process.env.NODE_ENV === 'development' && debugInfo && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: cn("mt-4 p-3 rounded-lg border border-dashed", "bg-[var(--hive-background-secondary)]/30", "border-[var(--hive-border-secondary)]", "text-xs font-mono"), children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold text-[var(--hive-text-primary)]", children: "ConditionGate Debug" }), _jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: [debugInfo.evaluationTime.toFixed(2), "ms"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Logic:" }), _jsx("span", { className: "text-[var(--hive-brand-primary)]", children: logic.toUpperCase() })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Result:" }), _jsx("span", { className: cn("px-2 py-0.5 rounded", debugInfo.finalResult
                                            ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]"
                                            : "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]"), children: debugInfo.finalResult ? 'TRUE' : 'FALSE' })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Conditions:" }), conditions.map((condition, index) => (_jsxs("div", { className: "flex items-center gap-2 pl-2", children: [_jsx("span", { className: cn("w-2 h-2 rounded-full", debugInfo.conditionResults[index]
                                                    ? "bg-[var(--hive-status-success)]"
                                                    : "bg-[var(--hive-status-error)]") }), _jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: [condition.sourceElementId, ".", condition.sourceProperty, " ", condition.operator, " ", JSON.stringify(condition.value)] })] }, index)))] })] })] }))] }));
};
// Hook for managing condition gates in tools
export const useConditionGate = (gateId, config, toolState) => {
    const [isActive, setIsActive] = useState(false);
    const [lastEvaluation, setLastEvaluation] = useState(null);
    const handleAction = useCallback((action) => {
        console.log(`ConditionGate ${gateId} executed action:`, action);
        // Here you would typically dispatch actions to your tool state manager
        // For example, updating element visibility, values, etc.
        setLastEvaluation(new Date());
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
                    return false;
            }
        });
        const isConditionMet = logic === 'and'
            ? results.every(Boolean)
            : results.some(Boolean);
        setIsActive(isConditionMet);
        return isConditionMet;
    }, [config, toolState]);
    useEffect(() => {
        evaluateGate();
    }, [evaluateGate]);
    return {
        isActive,
        lastEvaluation,
        handleAction,
        evaluateGate
    };
};
export default ConditionGate;
//# sourceMappingURL=condition-gate.js.map