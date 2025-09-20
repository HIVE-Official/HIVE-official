"use client";

/**
 * HIVE Live Tool Runtime
 * The core system for executing HIVE tools in real-time
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tool, ToolDataRecord, ElementInstance } from '@hive/core';
import { HiveCard } from './hive-card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useRealtimeTool } from '../hooks/use-realtime-tool';
import { apiClient } from '../lib/api-client';

// Import element renderers
import { TextBlockRenderer } from './elements/text-block-renderer';
import { ButtonRenderer } from './elements/button-renderer';
import { TextInputRenderer } from './elements/text-input-renderer';
import { ImageBlockRenderer } from './elements/image-block-renderer';
import { DividerRenderer } from './elements/divider-renderer';
import { StackRenderer } from './elements/stack-renderer';
import { ChoiceSelectRenderer } from './elements/choice-select-renderer';
import { RatingStarsRenderer } from './elements/rating-stars-renderer';
import { CountdownTimerRenderer } from './elements/countdown-timer-renderer';
import { ProgressBarRenderer } from './elements/progress-bar-renderer';

export interface LiveToolRuntimeProps {
  tool?: Tool;
  toolId?: string;
  deploymentId?: string;
  spaceId?: string;
  className?: string;
  onToolLoad?: (toolId: string) => void;
  onDataSubmit?: (data: Record<string, any>) => void;
  onError?: (error: Error) => void;
  readOnly?: boolean;
  showDebugInfo?: boolean;
  enableRealtime?: boolean;
  collectUsageData?: boolean
}

interface RuntimeState {
  formData: Record<string, any>;
  elementStates: Map<string, any>;
  isSubmitting: boolean;
  submitResult: 'success' | 'error' | null;
  errors: string[]
}

export const LiveToolRuntime: React.FC<LiveToolRuntimeProps> = ({
  tool,
  toolId,
  deploymentId,
  spaceId,
  className,
  onToolLoad,
  onDataSubmit,
  onError,
  readOnly = false,
  showDebugInfo = false,
  enableRealtime = true,
  collectUsageData = true
}) => {
  const [loading, setLoading] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [interactionCount, setInteractionCount] = useState(0);
  const [loadedTool, setLoadedTool] = useState<Tool | null>(tool || null);
  const [runtimeState, setRuntimeState] = useState<RuntimeState>({
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
      })})
    },
    onUpdate: (update) => {
      if (showDebugInfo) {
        console.log('Real-time tool update:', update)
      }
    },
    onError: (error) => {
      console.error('Real-time error:', error);
      if (onError) {
        onError(new Error(error))
      }
    },
  }) : [null, null];

  // Load tool if only ID provided
  useEffect(() => {
    if (toolId && !tool && onToolLoad) {
      setLoading(true);
      onToolLoad(toolId)
    }

    if (tool) {
      setLoadedTool(tool);
      setLoading(false)
    }
  }, [toolId, tool, onToolLoad]);

  // Track session start
  useEffect(() => {
    if (collectUsageData && (toolId || tool?.id)) {
      const trackingData = {
        toolId: toolId || tool?.id || '',
        spaceId,
        userId: 'current-user', // Should be actual user ID
        dataType: 'usage' as const,
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
        console.warn('Failed to track session start:', error)
      })}
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
  const handleElementChange = useCallback((elementId: string, value: any) => {
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
      realtimeActions.updateToolState(
        { [elementId]: value },
        true // optimistic update
      ).catch(error => {
        console.warn('Failed to sync real-time state:', error)
      })}
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
      })}.catch(error => {
        console.warn('Failed to track interaction:', error)
      })}
    }
  }, [enableRealtime, realtimeActions, collectUsageData, toolId, tool?.id, spaceId, deploymentId, interactionCount]);

  // Handle element state changes (for conditional logic)
  const handleElementStateChange = useCallback((elementId: string, state: any) => {
    setRuntimeState(prev => {
      const newElementStates = new Map(prev.elementStates);
      newElementStates.set(elementId, state);
      return {
        ...prev,
        elementStates: newElementStates
      }
    })
  }, []);

  // Process conditional rules
  const processConditionalRules = useCallback((element: ElementInstance) => {
    if (!element.config || typeof element.config !== 'object') return {};
    
    const config = element.config as any;
    if (!config.conditionalRules || !Array.isArray(config.conditionalRules)) {
      return {}
    }

    const modifications: Record<string, any> = {};

    config.conditionalRules.forEach((rule: any) => {
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
          break
      }

      if (conditionMet) {
        rule.actions.forEach((action: any) => {
          switch (action.type) {
            case 'show':
              modifications.isVisible = true;
              break;
            case 'hide':
              modifications.isVisible = false;
              break;
            case 'setValue':
              if (action.targetElementId === element.id) {
                modifications.value = action.value
              }
              break;
            case 'setStyle':
              modifications.style = { ...modifications.style, ...action.value };
              break
          }
        })
      }
    });

    return modifications
  }, [runtimeState.formData]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!loadedTool || readOnly) return;

    setRuntimeState(prev => ({ ...prev, isSubmitting: true, errors: [] }));

    const sessionEndTime = new Date();
    const sessionDuration = sessionEndTime.getTime() - sessionStartTime.getTime();

    try {
      // Validate required fields
      const errors: string[] = [];
      
      loadedTool.elements.forEach(element => {
        const config = element.config as any;
        if (config?.required && !runtimeState.formData[element.id]) {
          errors.push(`${config.label || element.id} is required`)
        }
      })};

      if (errors.length > 0) {
        setRuntimeState(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          errors,
          submitResult: 'error'
        }));
        return
      }

      // Create submission data
      const submissionData: Partial<ToolDataRecord> = {
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
          console.warn('Failed to send completion update:', error)
        })
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
          console.warn('Failed to track completion:', error)
        })
      }

      // Call onDataSubmit callback
      if (onDataSubmit) {
        await onDataSubmit(runtimeState.formData)
      }

      setRuntimeState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        submitResult: 'success'
      })})

    } catch (error) {
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
          console.warn('Failed to track error:', trackError)
        })
      }

      // Send real-time error update
      if (enableRealtime && realtimeActions) {
        realtimeActions.sendUpdate('error', {
          errorMessage,
          timestamp: sessionEndTime.toISOString(),
          sessionDuration,
          interactionCount,
        }).catch(rtError => {
          console.warn('Failed to send error update:', rtError)
        })
      }
      
      setRuntimeState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        errors: [errorMessage],
        submitResult: 'error'
      })});

      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage))
      }
    }
  }, [loadedTool, readOnly, runtimeState.formData, onDataSubmit, onError, sessionStartTime, enableRealtime, realtimeActions, collectUsageData, toolId, spaceId, deploymentId, interactionCount]);

  // Render individual element
  const renderElement = useCallback((element: ElementInstance) => {
    const { elementId } = element;
    const elementType = elementId.split('-')[0] as keyof typeof elementRenderers;
    const ElementRenderer = elementRenderers[elementType];

    if (!ElementRenderer) {
      if (showDebugInfo) {
        return (
          <div key={element.id} className="p-2 border border-dashed border-yellow-400 bg-yellow-50">
            <span className="text-xs text-yellow-700">
              Unsupported element: {elementType}
            </span>
          </div>
        )
      }
      return null
    }

    // Apply conditional modifications
    const modifications = processConditionalRules(element);
    const effectiveConfig = element.config && typeof element.config === 'object' 
      ? { ...element.config, ...modifications }
      : modifications;
    const currentValue = runtimeState.formData[element.id];

    // Don't render if conditionally hidden
    if (modifications.isVisible === false) {
      return null
    }

    return (
      <ElementRenderer
        key={element.id}
        element={element}
        config={effectiveConfig}
        value={currentValue}
        onChange={(value) => handleElementChange(element.id, value)}
        onStateChange={(state) => handleElementStateChange(element.id, state)}
        readOnly={readOnly}
        runtimeContext={{
          formData: runtimeState.formData,
          elementStates: runtimeState.elementStates,
          }}
      />
    )
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
    return (
      <HiveCard className={className} variant="elevated">
        <div className="p-6 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Loading tool...
          </p>
        </div>
      </HiveCard>
    )
  }

  // No tool state
  if (!loadedTool) {
    return (
      <HiveCard className={className} variant="elevated">
        <div className="p-6 text-center">
          <AlertCircle className="w-6 h-6 text-[var(--hive-text-secondary)] mx-auto mb-2" />
          <p className="text-sm text-[var(--hive-text-secondary)]">
            {toolId ? `Tool ${toolId} not found` : 'No tool provided'}
          </p>
        </div>
      </HiveCard>
    )
  }

  // Sort elements by order and filter root elements (no parent)
  const rootElements = loadedTool.elements
    .filter(el => !el.parentId)
    .sort((a, b) => a.order - b.order);

  return (
    <HiveCard className={className} variant="elevated">
      <div className="p-6">
        {/* Tool header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            {loadedTool.name}
          </h3>
          {loadedTool.description && (
            <p className="text-sm text-[var(--hive-text-secondary)]">
              {loadedTool.description}
            </p>
          )}
        </div>

        {/* Error messages */}
        {runtimeState.errors.length > 0 && (
          <Alert className="mb-4" variant="error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {runtimeState.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Success message */}
        {runtimeState.submitResult === 'success' && (
          <Alert className="mb-4" variant="secondary">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Tool submitted successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Tool elements */}
        <div className="space-y-4 mb-6">
          {rootElements.map(renderElement)}
        </div>

        {/* Submit button (if not read-only and has input elements) */}
        {!readOnly && loadedTool.elements.some(el => 
          ['textInput', 'choiceSelect', 'ratingStars'].includes(el.elementId.split('-')[0])
        ) && (
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={runtimeState.isSubmitting}
              className="bg-[var(--hive-primary)] text-white hover:bg-[var(--hive-primary-dark)]"
            >
              {runtimeState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        )}

        {/* Debug info */}
        {showDebugInfo && (
          <details className="mt-6 p-4 bg-gray-50 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium">
              Debug Information
            </summary>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify({
                toolId: loadedTool.id,
                elementsCount: loadedTool.elements.length,
                formData: runtimeState.formData,
                elementStates: Object.fromEntries(runtimeState.elementStates),
              }, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </HiveCard>
  )
};