"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Tool, ComposedElement, ToolRuntime, ExecutionState } from '@hive/core/domain/tools';
import { getElementById } from '@hive/core/domain/tools/element-registry';
import { ElementRenderer } from './element-renderers';
import { Button, Card } from '@hive/ui';
import { Play, Pause, RotateCcw, Save, Share2 } from 'lucide-react';

interface ToolExecutorProps {
  tool: Tool;
  initialData?: Record<string, any>;
  onSave?: (data: Record<string, any>) => void;
  onShare?: () => void;
  isPreview?: boolean;
  className?: string;
}

export function ToolExecutor({
  tool,
  initialData = {},
  onSave,
  onShare,
  isPreview = false,
  className = ''
}: ToolExecutorProps) {
  // State management
  const [runtime, setRuntime] = useState<ToolRuntime>({
    toolId: tool.id,
    state: 'idle',
    data: initialData,
    startedAt: null,
    completedAt: null
  });
  
  const [elementData, setElementData] = useState<Record<string, any>>(initialData);
  const [executionState, setExecutionState] = useState<ExecutionState>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Handle element changes
  const handleElementChange = useCallback((instanceId: string, value: any) => {
    setElementData(prev => ({
      ...prev,
      [instanceId]: value
    }));
    
    // Update runtime data
    setRuntime(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [instanceId]: value
      }
    }));
  }, []);
  
  // Handle element actions
  const handleElementAction = useCallback((instanceId: string, action: string, payload?: any) => {
    // Process action based on type
    switch (action) {
      case 'onSubmit':
        handleSubmit();
        break;
      case 'onReset':
        handleReset();
        break;
      case 'onComplete':
        setExecutionState('completed');
        break;
      default:
        // Custom action handling
        break;
    }
  }, []);
  
  // Render element recursively
  const renderElement = useCallback((element: ComposedElement): JSX.Element => {
    const elementDef = getElementById(element.elementId);
    if (!elementDef) {
      return (
        <div className="text-red-500 text-sm">
          Unknown element: {element.elementId}
        </div>
      );
    }
    
    return (
      <ElementRenderer
        key={element.instanceId}
        element={element}
        elementDef={elementDef}
        data={elementData[element.instanceId]}
        onChange={handleElementChange}
        onAction={handleElementAction}
        isPreview={isPreview}
        isBuilder={false}
        renderElement={renderElement}
      />
    );
  }, [elementData, handleElementChange, handleElementAction, isPreview]);
  
  // Handle execution controls
  const handleStart = () => {
    setExecutionState('running');
    setRuntime(prev => ({
      ...prev,
      state: 'running',
      startedAt: new Date()
    }));
  };
  
  const handlePause = () => {
    setExecutionState('paused');
    setRuntime(prev => ({
      ...prev,
      state: 'paused'
    }));
  };
  
  const handleReset = () => {
    setExecutionState('idle');
    setElementData(initialData);
    setRuntime({
      toolId: tool.id,
      state: 'idle',
      data: initialData,
      startedAt: null,
      completedAt: null
    });
    setError(null);
  };
  
  const handleSubmit = () => {
    // Validate required fields
    const requiredElements = tool.composition.elements.filter(
      el => el.config?.required
    );
    
    for (const element of requiredElements) {
      if (!elementData[element.instanceId]) {
        setError(`Required field "${element.config?.label || element.elementId}" is missing`);
        return;
      }
    }
    
    setError(null);
    setExecutionState('completed');
    setRuntime(prev => ({
      ...prev,
      state: 'completed',
      completedAt: new Date()
    }));
    
    if (onSave) {
      onSave(elementData);
    }
  };
  
  // Render tool interface
  const renderToolInterface = () => {
    switch (tool.interface?.type) {
      case 'form':
        return (
          <div className="space-y-4">
            {tool.composition.elements.map(element => renderElement(element))}
            {!isPreview && (
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tool.composition.elements.map(element => (
              <Card key={element.instanceId} className="p-4">
                {renderElement(element)}
              </Card>
            ))}
          </div>
        );
        
      case 'wizard':
        return <WizardInterface tool={tool} renderElement={renderElement} />;
        
      default:
        // Free layout
        return (
          <div className="space-y-4">
            {tool.composition.elements.map(element => renderElement(element))}
          </div>
        );
    }
  };
  
  return (
    <div className={`tool-executor ${className}`}>
      {/* Tool Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{tool.name}</h2>
            {tool.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {tool.description}
              </p>
            )}
          </div>
          
          {!isPreview && (
            <div className="flex gap-2">
              {tool.visibility === 'public' && onShare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
              {onSave && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSave(elementData)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Execution Controls */}
        {tool.config?.showControls && !isPreview && (
          <div className="flex gap-2 mt-4">
            {executionState === 'idle' && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleStart}
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            )}
            {executionState === 'running' && (
              <Button
                size="sm"
                variant="outline"
                onClick={handlePause}
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            {executionState !== 'idle' && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      {/* Tool Interface */}
      <div className="tool-interface">
        {renderToolInterface()}
      </div>
      
      {/* Execution State */}
      {tool.config?.showState && executionState !== 'idle' && (
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              State: <span className="font-medium">{executionState}</span>
            </span>
            {runtime.startedAt && (
              <span className="text-gray-600 dark:text-gray-400">
                Started: {new Date(runtime.startedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Wizard Interface Component
function WizardInterface({ 
  tool, 
  renderElement 
}: { 
  tool: Tool; 
  renderElement: (element: ComposedElement) => JSX.Element;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = tool.interface?.steps || [];
  
  if (steps.length === 0) {
    return <div>No wizard steps configured</div>;
  }
  
  const currentStepElements = tool.composition.elements.filter(
    el => el.config?.step === currentStep
  );
  
  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index < steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index === currentStep
                  ? 'bg-blue-500 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {steps[currentStep]?.title}
        </h3>
        {steps[currentStep]?.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {steps[currentStep].description}
          </p>
        )}
        
        <div className="space-y-4">
          {currentStepElements.map(element => renderElement(element))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}