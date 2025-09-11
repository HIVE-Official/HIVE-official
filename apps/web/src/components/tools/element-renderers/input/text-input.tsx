"use client";

import React, { useState, useEffect } from 'react';
import { Input, Label } from '@hive/ui';
import { ElementRendererProps } from '../types';

export function TextInputRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const [value, setValue] = useState(data || config.defaultValue || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      setValue(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Validation
    if (config.maxLength && newValue.length > config.maxLength) {
      setError(`Maximum ${config.maxLength} characters allowed`);
      return;
    }
    
    if (config.pattern) {
      const regex = new RegExp(config.pattern);
      if (!regex.test(newValue) && newValue !== '') {
        setError('Invalid format');
        return;
      }
    }
    
    setError(null);
    setValue(newValue);
    
    if (onChange) {
      onChange(element.instanceId, newValue);
    }
    
    if (onAction) {
      onAction(element.instanceId, 'onChange', newValue);
    }
  };

  const handleBlur = () => {
    if (config.required && !value) {
      setError('This field is required');
    }
    
    if (onAction) {
      onAction(element.instanceId, 'onBlur', value);
    }
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Text Input</div>
        <div className="font-medium">{config.label || 'Text Input'}</div>
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
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={config.placeholder}
        disabled={isPreview}
        maxLength={config.maxLength}
        className={error ? 'border-red-500' : ''}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}