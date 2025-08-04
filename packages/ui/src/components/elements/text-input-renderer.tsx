/**
 * HIVE TextInput Element Renderer
 * Renders interactive text input fields within tools
 * Uses standard style system for consistent output
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles';

interface TextInputConfig {
  // Element-specific properties (flexible)
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  
  // Standard properties (any element can use these)
  required?: boolean;
  disabled?: boolean;
  style?: any; // Flexible - accepts any style config, extracts standard properties
}

interface TextInputRendererProps {
  element: ElementInstance;
  config: TextInputConfig;
  value?: string;
  onChange?: (value: string) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>;
  };
}

export const TextInputRenderer: React.FC<TextInputRendererProps> = ({
  element,
  config,
  value = '',
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
    validation: {
      pattern: config.pattern,
      minLength: config.minLength,
      maxLength: config.maxLength,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (behavior.isReadOnly || !onChange) return;
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`}>
      <Label 
        htmlFor={element.id}
        className="text-sm font-medium text-[var(--hive-text-primary)]"
      >
        {config.label}
        {behavior.isRequired && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </Label>
      
      <Input
        id={element.id}
        type={config.type}
        placeholder={config.placeholder}
        value={value}
        onChange={handleChange}
        disabled={behavior.isDisabled}
        required={behavior.isRequired}
        minLength={behavior.validation.minLength}
        maxLength={behavior.validation.maxLength}
        pattern={behavior.validation.pattern}
        style={styles}
        className={`${classes.element} w-full border rounded-md px-3 py-2 text-sm placeholder:text-[var(--hive-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${behavior.isReadOnly ? 'bg-[var(--hive-background-secondary)]' : 'bg-white'}`}
        {...behavior.ariaAttributes}
      />
      
      {/* Character count for text inputs with maxLength */}
      {config.maxLength && config.type === 'text' && (
        <div className="text-xs text-[var(--hive-text-secondary)] text-right">
          {value.length}/{config.maxLength}
        </div>
      )}
    </div>
  );
};