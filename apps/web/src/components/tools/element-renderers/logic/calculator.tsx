"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { Calculator } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function CalculatorRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const operation = config.operation || 'add';
  const operandA = config.operandA ?? 0;
  const operandB = config.operandB ?? 0;
  const formula = config.formula;
  
  const [result, setResult] = useState<number>(0);
  
  useEffect(() => {
    let calculated: number = 0;
    
    if (formula) {
      // Advanced formula mode
      try {
        // Simple formula evaluation (safe subset)
        // In production, use a proper expression parser
        const expression = formula
          .replace(/\{data\}/g, String(data || 0))
          .replace(/\{a\}/g, String(operandA))
          .replace(/\{b\}/g, String(operandB));
        
        // Very basic safe evaluation
        calculated = evaluateExpression(expression);
      } catch (error) {
        logger.error('Formula evaluation error:', error);
        calculated = 0;
      }
    } else {
      // Simple operation mode
      const a = Number(data ?? operandA);
      const b = Number(operandB);
      
      switch (operation) {
        case 'add':
          calculated = a + b;
          break;
        case 'subtract':
          calculated = a - b;
          break;
        case 'multiply':
          calculated = a * b;
          break;
        case 'divide':
          calculated = b !== 0 ? a / b : 0;
          break;
        case 'modulo':
          calculated = b !== 0 ? a % b : 0;
          break;
        case 'power':
          calculated = Math.pow(a, b);
          break;
        case 'sqrt':
          calculated = Math.sqrt(a);
          break;
        case 'abs':
          calculated = Math.abs(a);
          break;
        case 'round':
          calculated = Math.round(a);
          break;
        case 'floor':
          calculated = Math.floor(a);
          break;
        case 'ceil':
          calculated = Math.ceil(a);
          break;
        case 'min':
          calculated = Math.min(a, b);
          break;
        case 'max':
          calculated = Math.max(a, b);
          break;
        default:
          calculated = a;
      }
    }
    
    // Round to specified decimal places
    if (config.decimalPlaces !== undefined) {
      calculated = Number(calculated.toFixed(config.decimalPlaces));
    }
    
    setResult(calculated);
    
    if (onChange && !isPreview) {
      onChange(element.instanceId, calculated);
    }
    
    if (onAction && !isPreview) {
      onAction(element.instanceId, 'onCalculate', calculated);
    }
  }, [data, operandA, operandB, operation, formula, config.decimalPlaces, element.instanceId, onChange, onAction, isPreview]);
  
  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Calculator className="h-3 w-3" />
          Calculator
        </div>
        <div className="font-medium">
          {formula || `${operation}(${operandA}, ${operandB})`}
        </div>
      </div>
    );
  }
  
  return (
    <div className="inline-flex items-center gap-2">
      <Calculator className="h-4 w-4 text-gray-500" />
      <span className="font-mono font-semibold">
        {result}
      </span>
      {config.showFormula && (
        <span className="text-xs text-gray-500">
          ({formula || `${operation}(${data ?? operandA}, ${operandB})`})
        </span>
      )}
    </div>
  );
}

// Very basic expression evaluator for simple math
// In production, use math.js or similar library
function evaluateExpression(expr: string): number {
  // Remove whitespace
  expr = expr.replace(/\s/g, '');
  
  // Only allow numbers, operators, and parentheses
  if (!/^[\d+\-*/().\s]+$/.test(expr)) {
    throw new Error('Invalid expression');
  }
  
  try {
    // Use Function constructor as safer alternative to eval
    // Still not perfect - in production use proper parser
    return new Function('return ' + expr)();
  } catch {
    return 0;
  }
}