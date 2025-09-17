"use client";

import React from 'react';
import { GitBranch } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function ConditionRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder,
  renderElement
}: ElementRendererProps) {
  const config = element.config;
  const condition = config.condition || 'equals';
  const compareValue = config.compareValue;
  const trueElements = config.trueElements || [];
  const falseElements = config.falseElements || [];
  
  // Evaluate condition
  const evaluateCondition = () => {
    if (data === undefined || data === null) return false;
    
    switch (condition) {
      case 'equals':
        return data === compareValue;
      case 'notEquals':
        return data !== compareValue;
      case 'greaterThan':
        return Number(data) > Number(compareValue);
      case 'lessThan':
        return Number(data) < Number(compareValue);
      case 'contains':
        return String(data).includes(String(compareValue));
      case 'isEmpty':
        return !data || (typeof data === 'string' && data.trim() === '');
      case 'isNotEmpty':
        return !!data && (typeof data !== 'string' || data.trim() !== '');
      default:
        return false;
    }
  };
  
  const conditionMet = evaluateCondition();
  
  // Fire action when condition changes
  React.useEffect(() => {
    if (onAction && !isPreview) {
      onAction(element.instanceId, conditionMet ? 'onTrue' : 'onFalse', data);
    }
  }, [conditionMet, data, element.instanceId, onAction, isPreview]);
  
  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <GitBranch className="h-3 w-3" />
          Condition
        </div>
        <div className="font-medium">If {condition}</div>
        <div className="text-xs text-gray-500 mt-1">
          True: {trueElements.length} elements | False: {falseElements.length} elements
        </div>
      </div>
    );
  }
  
  // Render appropriate branch
  const elementsToRender = conditionMet ? trueElements : falseElements;
  
  if (!renderElement || elementsToRender.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        {conditionMet ? 'Condition met' : 'Condition not met'}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {elementsToRender.map((childElement: any) => (
        <div key={childElement.instanceId}>
          {renderElement(childElement)}
        </div>
      ))}
    </div>
  );
}