"use client";

import React, { useState, useEffect } from 'react';
import { Input, Label } from '@hive/ui';
import { ElementRendererProps } from '../types';

export function NumberInputRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const [value, setValue] = useState<number | ''>(data ?? config.defaultValue ?? '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      setValue(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (inputValue === '') {
      setValue('');
      if (onChange) {
        onChange(element.instanceId, null);
      }
      return;
    }
    
    const numValue = parseFloat(inputValue);
    
    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }
    
    // Validation
    if (config.min !== undefined && numValue < config.min) {
      setError(`Minimum value is ${config.min}`);
      return;
    }
    
    if (config.max !== undefined && numValue > config.max) {
      setError(`Maximum value is ${config.max}`);
      return;
    }
    
    setError(null);
    setValue(numValue);
    
    if (onChange) {
      onChange(element.instanceId, numValue);
    }
    
    if (onAction) {
      onAction(element.instanceId, 'onChange', numValue);
    }
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Number Input</div>
        <div className="font-medium">{config.label || 'Number'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {config.label && (
        <Label htmlFor={element.instanceId}>
          {config.label}
          {config.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={element.instanceId}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={config.placeholder || '0'}
        disabled={isPreview}
        min={config.min}
        max={config.max}
        step={config.step}
        className={error ? 'border-red-500' : ''}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}