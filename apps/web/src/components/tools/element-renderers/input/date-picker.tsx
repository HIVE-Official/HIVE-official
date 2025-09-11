"use client";

import React, { useState, useEffect } from 'react';
import { Input, Label } from '@hive/ui';
import { Calendar } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function DatePickerRenderer({
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
    if (config.minDate && newValue < config.minDate) {
      setError(`Date must be after ${config.minDate}`);
      return;
    }
    
    if (config.maxDate && newValue > config.maxDate) {
      setError(`Date must be before ${config.maxDate}`);
      return;
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

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Date Picker
        </div>
        <div className="font-medium">{config.label || 'Select Date'}</div>
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
      <div className="relative">
        <Input
          id={element.instanceId}
          type="date"
          value={value}
          onChange={handleChange}
          disabled={isPreview}
          min={config.minDate}
          max={config.maxDate}
          className={error ? 'border-red-500' : ''}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}