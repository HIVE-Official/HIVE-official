/**
 * HIVE Button Element Renderer;
 * Renders interactive buttons within tools;
 * Uses standard style system for consistent output;
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { Button } from '../../atomic/atoms/button';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles';

interface ButtonConfig {// Element-specific properties (flexible)
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: {
    type: 'navigate' | 'submit' | 'reset' | 'custom';
    target?: string;
    data?: Record<string, any>};
  
  // Standard properties (any element can use these)
  disabled?: boolean;
  style?: any; // Flexible - accepts any style config, extracts standard properties;
}

interface ButtonRendererProps {element: ElementInstance;
  config: ButtonConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>}
}

export const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  element,
  config,
  onChange,
  onStateChange,
  readOnly = false,
  runtimeContext;
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);
  const behavior = useStandardElementBehavior({disabled: config.disabled,
    readOnly,)};

  const handleClick = () => {
    if (behavior.isReadOnly || behavior.isDisabled) return;

    // Handle different click actions (element-specific behavior)
    if (config.onClick) {
      switch (config.onClick.type) {
        case 'submit':
          if (onChange) {
            onChange({type: 'submit', timestamp: Date.now())}
          }
          break;
          
        case 'reset':
          if (onChange) {
            onChange({type: 'reset', timestamp: Date.now())}
          }
          break;
          
        case 'navigate':
          if (config.onClick.target) {
            if (config.onClick.target.startsWith('http')) {
              window.open(config.onClick.target, '_blank')
            } else {
              window.location.href = config.onClick.target;
            }
          }
          break;
          
        case 'custom':
          if (onChange) {
            onChange({type: 'custom', 
              data: config.onClick.data,
              timestamp: Date.now()) })}
          }
          break;
      }
    }

    // Standard analytics tracking;
    if (onStateChange) {
      onStateChange({clicked: true,
        lastClickedAt: Date.now(),
        clickCount: (runtimeContext?.elementStates.get(element.id)?.clickCount || 0) + 1) })}
    }
  };

  // Map element-specific variants (keep flexibility)
  const getButtonVariant = (variant?: string) => {
    switch (variant) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary';
      case 'outline': return 'outline';
      case 'ghost': return 'ghost';
      default: return 'default'
    }}
  };

  const getButtonSize = (size?: string) => {
    switch (size) {
      case 'sm': return 'sm';
      case 'md': return 'default';
      case 'lg': return 'lg';
      default: return 'default'
    }}
  };

  return (
    <div className={`${classes.container} ${classes.spacing}`}>
      <Button;
        variant={getButtonVariant(config.variant)}
        size={getButtonSize(config.size)}
        onClick={handleClick}
        disabled={behavior.isDisabled}
        style={styles}
        className={`${classes.element} ${config.variant === 'primary' ? 'bg-[var(--hive-primary)] hover:bg-[var(--hive-primary-dark)] text-white' : ''}`}
        {...behavior.ariaAttributes}
      >
        {config.text}
      </Button>
    </div>
  )
};