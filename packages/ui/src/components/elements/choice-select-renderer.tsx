/**
 * HIVE ChoiceSelect Element Renderer
 * Renders selection inputs (dropdown, radio, checkboxes) within tools
 * Uses standard style system for consistent output
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../atomic/atoms/select-radix';
import { Label } from '../../atomic/atoms/label';
import { Checkbox } from '../../atomic/atoms/checkbox';
import { RadioGroup, Radio as RadioGroupItem } from '../../atomic/atoms/radio-enhanced';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles';

interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean
}

interface ChoiceSelectConfig {
  // Element-specific properties (flexible)
  label: string;
  options: ChoiceOption[];
  multiple?: boolean;
  placeholder?: string;
  
  // Standard properties (any element can use these)
  required?: boolean;
  disabled?: boolean;
  style?: any; // Flexible - accepts any style config, extracts standard properties
}

interface ChoiceSelectRendererProps {
  element: ElementInstance;
  config: ChoiceSelectConfig;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>
  }
}

export const ChoiceSelectRenderer: React.FC<ChoiceSelectRendererProps> = ({
  element,
  config,
  value,
  onChange,
  readOnly = false,
  runtimeContext
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);
  const behavior = useStandardElementBehavior({
    required: config.required,
    disabled: config.disabled,
    readOnly,
  });

  // Handle single select (dropdown or radio)
  const handleSingleSelect = (newValue: string) => {
    if (behavior.isReadOnly || !onChange) return;
    onChange(newValue)
  };

  // Handle multiple select (checkboxes)
  const handleMultipleSelect = (optionValue: string, checked: boolean) => {
    if (behavior.isReadOnly || !onChange) return;
    
    const currentValues = Array.isArray(value) ? value : [];
    let newValues: string[];
    
    if (checked) {
      newValues = [...currentValues, optionValue]
    } else {
      newValues = currentValues.filter(v => v !== optionValue)
    }
    
    onChange(newValues)
  };

  // Render multiple choice (checkboxes)
  if (config.multiple) {
    const selectedValues = Array.isArray(value) ? value : [];
    
    return (
      <div className={`space-y-3 ${classes.container} ${classes.spacing}`} style={styles}>
        <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
          {config.label}
          {behavior.isRequired && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>
        
        <div className="space-y-2">
          {config.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${element.id}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onChange={(e) => { const checked = e.target.checked; 
                  handleMultipleSelect(option.value, checked as boolean) }
                }
                disabled={behavior.isDisabled || option.disabled}
                className="border-[var(--hive-border)]"
              />
              <Label
                htmlFor={`${element.id}-${option.value}`}
                className={`text-sm ${
                  option.disabled ? 'text-[var(--hive-text-tertiary)]' : 'text-[var(--hive-text-primary)]'
                }`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render single choice (dropdown for many options, radio for few)
  const useRadio = config.options.length <= 4;
  
  if (useRadio) {
    return (
      <div className={`space-y-3 ${classes.container} ${classes.spacing}`} style={styles}>
        <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
          {config.label}
          {behavior.isRequired && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>
        
        <RadioGroup
          name={element.id}
          value={typeof value === 'string' ? value : ''}
          onValueChange={handleSingleSelect}
          disabled={behavior.isDisabled}
          className={`space-y-2 ${classes.element}`}
        >
          {config.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${element.id}-${option.value}`}
                disabled={behavior.isDisabled || option.disabled}
                className="border-[var(--hive-border)]"
              />
              <Label
                htmlFor={`${element.id}-${option.value}`}
                className={`text-sm ${
                  option.disabled ? 'text-[var(--hive-text-tertiary)]' : 'text-[var(--hive-text-primary)]'
                }`}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
  }

  // Render dropdown select
  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`} style={styles}>
      <Label 
        htmlFor={element.id}
        className="text-sm font-medium text-[var(--hive-text-primary)]"
      >
        {config.label}
        {behavior.isRequired && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </Label>
      
      <Select
        value={typeof value === 'string' ? value : ''}
        onValueChange={handleSingleSelect}
        disabled={behavior.isDisabled}
      >
        <SelectTrigger 
          className={`w-full border-[var(--hive-border)] focus:ring-[var(--hive-primary)] ${classes.element}`}
        >
          <SelectValue placeholder={config.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent>
          {config.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
};