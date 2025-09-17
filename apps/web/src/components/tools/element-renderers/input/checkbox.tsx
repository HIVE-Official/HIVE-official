"use client";

import React, { useState, useEffect } from 'react';
import { Checkbox, Label } from '@hive/ui';
import { ElementRendererProps } from '../types';

export function CheckboxRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const [checked, setChecked] = useState(data ?? config.defaultChecked ?? false);

  useEffect(() => {
    if (data !== undefined) {
      setChecked(data);
    }
  }, [data]);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    
    if (onChange) {
      onChange(element.instanceId, newChecked);
    }
    
    if (onAction) {
      onAction(element.instanceId, 'onChange', newChecked);
    }
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Checkbox</div>
        <div className="font-medium">{config.label || 'Checkbox'}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={element.instanceId}
        checked={checked}
        onCheckedChange={handleChange}
        disabled={isPreview}
      />
      {config.label && (
        <Label 
          htmlFor={element.instanceId}
          className="cursor-pointer select-none"
        >
          {config.label}
        </Label>
      )}
    </div>
  );
}