"use client";

import React, { useState, useEffect } from 'react';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hive/ui';
import { ElementRendererProps } from '../index';

export function DropdownRenderer({
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
  const options = config.options || [];

  useEffect(() => {
    if (data !== undefined) {
      setValue(data);
    }
  }, [data]);

  const handleChange = (newValue: string) => {
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
        <div className="text-xs text-gray-500 mb-1">Dropdown</div>
        <div className="font-medium">{config.label || 'Select Option'}</div>
        <div className="text-xs text-gray-400 mt-1">
          {options.length} options
        </div>
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
      <Select
        value={value}
        onValueChange={handleChange}
        disabled={isPreview}
      >
        <SelectTrigger id={element.instanceId}>
          <SelectValue placeholder={config.placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string | { label: string; value: string }, index: number) => {
            const label = typeof option === 'string' ? option : option.label;
            const optionValue = typeof option === 'string' ? option : option.value;
            
            return (
              <SelectItem key={index} value={optionValue}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}