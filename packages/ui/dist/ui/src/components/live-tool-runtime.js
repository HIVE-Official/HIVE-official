"use client";
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Live Tool Runtime
 * The core system for executing HIVE tools in real-time
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from './ui/button.js';
import { Alert, AlertDescription } from './ui/alert.js';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useRealtimeTool } from '../hooks/use-realtime-tool.js';
import { apiClient } from '../lib/api-client.js';
// Import element renderers
import { TextBlockRenderer } from './elements/text-block-renderer.js';
import { ButtonRenderer } from './elements/button-renderer.js';
import { TextInputRenderer } from './elements/text-input-renderer.js';
import { ImageBlockRenderer } from './elements/image-block-renderer.js';
import { DividerRenderer } from './elements/divider-renderer.js';
import { StackRenderer } from './elements/stack-renderer.js';
import { ChoiceSelectRenderer } from './elements/choice-select-renderer.js';
import { RatingStarsRenderer } from './elements/rating-stars-renderer.js';
import { CountdownTimerRenderer } from './elements/countdown-timer-renderer.js';
import { ProgressBarRenderer } from './elements/progress-bar-renderer.js';
export const LiveToolRuntime = ({ tool, toolId, deploymentId, spaceId, className, onToolLoad, onDataSubmit, onError, readOnly = false, showDebugInfo = false, enableRealtime = true, collectUsageData = true }) => {
    const [loading, setLoading] = useState(false);
    const [sessionStartTime] = useState(new Date());
    const [interactionCount, setInteractionCount] = useState(0);
    const [loadedTool, setLoadedTool] = useState(tool || null);
    const [runtimeState, setRuntimeState] = useState({
        formData: {},
        elementStates: new Map(),
        isSubmitting: false,
        submitResult: null,
        errors: []
    });
    // Real-time integration (only if enabled and toolId provided)
    const [realtimeState, realtimeActions] = enableRealtime && (toolId || tool?.id) ? useRealtimeTool({
        toolId: toolId || tool?.id || '',
        deploymentId,
        spaceId,
        initialState: runtimeState.formData,
        autoConnect: true,
        onStateChange: (newState, previousState) => {
            // Sync real-time state changes with local runtime state
            setRuntimeState(prev => ({
                ...prev,
                formData: { ...prev.formData, ...newState },
            }));
        },
        onUpdate: (update) => {
            if (showDebugInfo) {
                console.log('Real-time tool update:', update);
            }
        },
        onError: (error) => {
            console.error('Real-time error:', error);
            if (onError) {
                onError(new Error(error));
            }
        },
    }) : [null, null];
    // Load tool if only ID provided
    useEffect(() => {
        if (toolId && !tool && onToolLoad) {
            setLoading(true);
            onToolLoad(toolId);
        }
        if (tool) {
            setLoadedTool(tool);
            setLoading(false);
        }
    }, [toolId, tool, onToolLoad]);
    // Track session start
    useEffect(() => {
        if (collectUsageData && (toolId || tool?.id)) {
            const trackingData = {
                toolId: toolId || tool?.id || '',
                spaceId,
                userId: 'current-user', // Should be actual user ID
                dataType: 'usage',
                value: {
                    sessionStart: sessionStartTime.toISOString(),
                    deploymentId,
                },
                metadata: {
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                },
            };
            apiClient.collectCommunityData(trackingData).catch(error => {
                console.warn('Failed to track session start:', error);
            });
        }
    }, [toolId, tool?.id, spaceId, deploymentId, collectUsageData, sessionStartTime]);
    // Element renderers map
    const elementRenderers = useMemo(() => ({
        textBlock: TextBlockRenderer,
        imageBlock: ImageBlockRenderer,
        divider: DividerRenderer,
        stack: StackRenderer,
        button: ButtonRenderer,
        choiceSelect: ChoiceSelectRenderer,
        textInput: TextInputRenderer,
        ratingStars: RatingStarsRenderer,
        countdownTimer: CountdownTimerRenderer,
        progressBar: ProgressBarRenderer,
        // Logic elements are handled differently
        conditionGate: null,
        pingTrigger: null,
    }), []);
    // Handle element value changes
    const handleElementChange = useCallback((elementId, value) => {
        // Update local state
        setRuntimeState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [elementId]: value
            }
        }));
        // Increment interaction count
        setInteractionCount(prev => prev + 1);
        // Send real-time update if enabled
        if (enableRealtime && realtimeActions) {
            realtimeActions.updateToolState({ [elementId]: value }, true // optimistic update
            ).catch(error => {
                console.warn('Failed to sync real-time state:', error);
            });
        }
        // Track user interaction
        if (collectUsageData && (toolId || tool?.id)) {
            apiClient.collectCommunityData({
                toolId: toolId || tool?.id || '',
                spaceId,
                userId: 'current-user', // Should be actual user ID
                dataType: 'usage',
                value: {
                    interactionType: 'element_change',
                    elementId,
                    value,
                    timestamp: new Date().toISOString(),
                },
                metadata: {
                    deploymentId,
                    interactionCount: interactionCount + 1,
                },
            }).catch(error => {
                console.warn('Failed to track interaction:', error);
            });
        }
    }, [enableRealtime, realtimeActions, collectUsageData, toolId, tool?.id, spaceId, deploymentId, interactionCount]);
    // Handle element state changes (for conditional logic)
    const handleElementStateChange = useCallback((elementId, state) => {
        setRuntimeState(prev => {
            const newElementStates = new Map(prev.elementStates);
            newElementStates.set(elementId, state);
            return {
                ...prev,
                elementStates: newElementStates
            };
        });
    }, []);
    // Process conditional rules
    const processConditionalRules = useCallback((element) => {
        if (!element.config || typeof element.config !== 'object')
            return {};
        const config = element.config;
        if (!config.conditionalRules || !Array.isArray(config.conditionalRules)) {
            return {};
        }
        const modifications = {};
        config.conditionalRules.forEach((rule) => {
            const sourceValue = runtimeState.formData[rule.condition.sourceElementId];
            const sourceProperty = rule.condition.sourceProperty;
            const conditionValue = rule.condition.value;
            let conditionMet = false;
            switch (rule.condition.type) {
                case 'equals':
                    conditionMet = sourceValue === conditionValue;
                    break;
                case 'notEquals':
                    conditionMet = sourceValue !== conditionValue;
                    break;
                case 'contains':
                    conditionMet = String(sourceValue).includes(String(conditionValue));
                    break;
                case 'greaterThan':
                    conditionMet = Number(sourceValue) > Number(conditionValue);
                    break;
                case 'lessThan':
                    conditionMet = Number(sourceValue) < Number(conditionValue);
                    break;
                case 'isEmpty':
                    conditionMet = !sourceValue || sourceValue === '';
                    break;
                case 'isNotEmpty':
                    conditionMet = !!sourceValue && sourceValue !== '';
                    break;
            }
            if (conditionMet) {
                rule.actions.forEach((action) => {
                    switch (action.type) {
                        case 'show':
                            modifications.isVisible = true;
                            break;
                        case 'hide':
                            modifications.isVisible = false;
                            break;
                        case 'setValue':
                            if (action.targetElementId === element.id) {
                                modifications.value = action.value;
                            }
                            break;
                        case 'setStyle':
                            modifications.style = { ...modifications.style, ...action.value };
                            break;
                    }
                });
            }
        });
        return modifications;
    }, [runtimeState.formData]);
    // Handle form submission
    const handleSubmit = useCallback(async () => {
        if (!loadedTool || readOnly)
            return;
        setRuntimeState(prev => ({ ...prev, isSubmitting: true, errors: [] }));
        const sessionEndTime = new Date();
        const sessionDuration = sessionEndTime.getTime() - sessionStartTime.getTime();
        try {
            // Validate required fields
            const errors = [];
            loadedTool.elements.forEach(element => {
                const config = element.config;
                if (config?.required && !runtimeState.formData[element.id]) {
                    errors.push(`${config.label || element.id} is required`);
                }
            });
            if (errors.length > 0) {
                setRuntimeState(prev => ({
                    ...prev,
                    isSubmitting: false,
                    errors,
                    submitResult: 'error'
                }));
                return;
            }
            // Create submission data
            const submissionData = {
                toolId: loadedTool.id,
                data: runtimeState.formData,
                submittedAt: new Date(),
                isAnonymous: false,
                isValid: true,
            };
            // Send real-time completion update
            if (enableRealtime && realtimeActions) {
                realtimeActions.sendUpdate('execution_result', {
                    completedSuccessfully: true,
                    submissionData,
                    sessionDuration,
                    interactionCount,
                    timestamp: sessionEndTime.toISOString(),
                }).catch(error => {
                    console.warn('Failed to send completion update:', error);
                });
            }
            // Track successful completion
            if (collectUsageData && (toolId || loadedTool.id)) {
                apiClient.collectCommunityData({
                    toolId: toolId || loadedTool.id,
                    spaceId,
                    userId: 'current-user', // Should be actual user ID
                    dataType: 'usage',
                    value: {
                        sessionEnd: sessionEndTime.toISOString(),
                        sessionDuration,
                        completedSuccessfully: true,
                        interactionCount,
                        submissionData: runtimeState.formData,
                    },
                    metadata: {
                        deploymentId,
                        toolName: loadedTool.name,
                    },
                }).catch(error => {
                    console.warn('Failed to track completion:', error);
                });
            }
            // Call onDataSubmit callback
            if (onDataSubmit) {
                await onDataSubmit(runtimeState.formData);
            }
            setRuntimeState(prev => ({
                ...prev,
                isSubmitting: false,
                submitResult: 'success'
            }));
        }
        catch (error) {
            console.error('Tool submission error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Submission failed';
            // Track failed completion
            if (collectUsageData && (toolId || loadedTool?.id)) {
                apiClient.collectCommunityData({
                    toolId: toolId || loadedTool?.id || '',
                    spaceId,
                    userId: 'current-user', // Should be actual user ID
                    dataType: 'usage',
                    value: {
                        sessionEnd: sessionEndTime.toISOString(),
                        sessionDuration,
                        completedSuccessfully: false,
                        interactionCount,
                        errorMessage,
                    },
                    metadata: {
                        deploymentId,
                        toolName: loadedTool?.name || 'Unknown Tool',
                    },
                }).catch(trackError => {
                    console.warn('Failed to track error:', trackError);
                });
            }
            // Send real-time error update
            if (enableRealtime && realtimeActions) {
                realtimeActions.sendUpdate('error', {
                    errorMessage,
                    timestamp: sessionEndTime.toISOString(),
                    sessionDuration,
                    interactionCount,
                }).catch(rtError => {
                    console.warn('Failed to send error update:', rtError);
                });
            }
            setRuntimeState(prev => ({
                ...prev,
                isSubmitting: false,
                errors: [errorMessage],
                submitResult: 'error'
            }));
            if (onError) {
                onError(error instanceof Error ? error : new Error(errorMessage));
            }
        }
    }, [loadedTool, readOnly, runtimeState.formData, onDataSubmit, onError, sessionStartTime, enableRealtime, realtimeActions, collectUsageData, toolId, spaceId, deploymentId, interactionCount]);
    // Render individual element
    const renderElement = useCallback((element) => {
        const { elementId } = element;
        const elementType = elementId.split('-')[0];
        const ElementRenderer = elementRenderers[elementType];
        if (!ElementRenderer) {
            if (showDebugInfo) {
                return (_jsx("div", { className: "p-2 border border-dashed border-yellow-400 bg-yellow-50", children: _jsxs("span", { className: "text-xs text-yellow-700", children: ["Unsupported element: ", elementType] }) }, element.id));
            }
            return null;
        }
        // Apply conditional modifications
        const modifications = processConditionalRules(element);
        const effectiveConfig = element.config && typeof element.config === 'object'
            ? { ...element.config, ...modifications }
            : modifications;
        const currentValue = runtimeState.formData[element.id];
        // Don't render if conditionally hidden
        if (modifications.isVisible === false) {
            return null;
        }
        return (_jsx(ElementRenderer, { element: element, config: effectiveConfig, value: currentValue, onChange: (value) => handleElementChange(element.id, value), onStateChange: (state) => handleElementStateChange(element.id, state), readOnly: readOnly, runtimeContext: {
                formData: runtimeState.formData,
                elementStates: runtimeState.elementStates,
            } }, element.id));
    }, [
        elementRenderers,
        processConditionalRules,
        runtimeState.formData,
        runtimeState.elementStates,
        handleElementChange,
        handleElementStateChange,
        readOnly,
        showDebugInfo
    ]);
    // Loading state
    if (loading) {
        return (_jsx(Card, { className: className, variant: "elevated", children: _jsxs("div", { className: "p-6 text-center", children: [_jsx(Loader2, { className: "w-6 h-6 animate-spin mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Loading tool..." })] }) }));
    }
    // No tool state
    if (!loadedTool) {
        return (_jsx(Card, { className: className, variant: "elevated", children: _jsxs("div", { className: "p-6 text-center", children: [_jsx(AlertCircle, { className: "w-6 h-6 text-[var(--hive-text-secondary)] mx-auto mb-2" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: toolId ? `Tool ${toolId} not found` : 'No tool provided' })] }) }));
    }
    // Sort elements by order and filter root elements (no parent)
    const rootElements = loadedTool.elements
        .filter(el => !el.parentId)
        .sort((a, b) => a.order - b.order);
    return (_jsx(Card, { className: className, variant: "elevated", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: loadedTool.name }), loadedTool.description && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: loadedTool.description }))] }), runtimeState.errors.length > 0 && (_jsxs(Alert, { className: "mb-4", variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: _jsx("ul", { className: "list-disc list-inside", children: runtimeState.errors.map((error, index) => (_jsx("li", { children: error }, index))) }) })] })), runtimeState.submitResult === 'success' && (_jsxs(Alert, { className: "mb-4", variant: "primary", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Tool submitted successfully!" })] })), _jsx("div", { className: "space-y-4 mb-6", children: rootElements.map(renderElement) }), !readOnly && loadedTool.elements.some(el => ['textInput', 'choiceSelect', 'ratingStars'].includes(el.elementId.split('-')[0])) && (_jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: handleSubmit, disabled: runtimeState.isSubmitting, className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-primary-dark)]", children: runtimeState.isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Submitting..."] })) : ('Submit') }) })), showDebugInfo && (_jsxs("details", { className: "mt-6 p-4 bg-gray-50 rounded-lg", children: [_jsx("summary", { className: "cursor-pointer text-sm font-medium", children: "Debug Information" }), _jsx("pre", { className: "mt-2 text-xs overflow-auto", children: JSON.stringify({
                                toolId: loadedTool.id,
                                elementsCount: loadedTool.elements.length,
                                formData: runtimeState.formData,
                                elementStates: Object.fromEntries(runtimeState.elementStates),
                            }, null, 2) })] }))] }) }));
};
//# sourceMappingURL=live-tool-runtime.js.map