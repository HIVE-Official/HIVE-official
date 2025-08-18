/**
 * HIVE ProgressBar Element Renderer
 * Renders progress indicators within tools
 * Uses standard style system for consistent output
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { Label } from '../../components/ui/label';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface ProgressBarConfig {
  // Element-specific properties (flexible)
  label?: string;
  value?: number;
  max?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  height?: number;
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties
}

interface ProgressBarRendererProps {
  element: ElementInstance;
  config: ProgressBarConfig;
  value?: number;
  onChange?: (value: number) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>;
  };
}

export const ProgressBarRenderer: React.FC<ProgressBarRendererProps> = ({
  element,
  config,
  value,
  runtimeContext
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  const currentValue = value !== undefined ? value : (config.value || 0);
  const maxValue = config.max || 100;
  const percentage = Math.min(Math.max((currentValue / maxValue) * 100, 0), 100);
  
  const barColor = config.color || 'var(--hive-primary)';
  const bgColor = config.backgroundColor || 'var(--hive-background-secondary)';
  const barHeight = config.height || 8;

  // Dynamic value from form data (for progress that updates based on other inputs)
  const getDynamicValue = (): number => {
    if (!runtimeContext?.formData) return currentValue;
    
    // Check if there's a dynamic reference in the element config
    // This would typically be configured in the element's conditional rules
    // For now, we'll just use the current value
    return currentValue;
  };

  const displayValue = getDynamicValue();
  const displayPercentage = Math.min(Math.max((displayValue / maxValue) * 100, 0), 100);

  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`} style={styles}>
      {config.label && (
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
            {config.label}
          </Label>
          {config.showPercentage && (
            <span className="text-sm text-[var(--hive-text-secondary)]">
              {Math.round(displayPercentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`relative ${classes.element}`}>
        {/* Background bar */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{
            height: `${barHeight}px`,
            backgroundColor: bgColor
          }}
        >
          {/* Progress fill */}
          <div
            className="h-full transition-all duration-300 ease-out rounded-full"
            style={{
              width: `${displayPercentage}%`,
              backgroundColor: barColor
            }}
          />
        </div>
        
        {/* Value display inside bar (for larger bars) */}
        {barHeight >= 20 && config.showPercentage && (
          <div 
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{ color: displayPercentage > 50 ? 'white' : '#374151' }}
          >
            {Math.round(displayPercentage)}%
          </div>
        )}
      </div>
      
      {/* Detailed value display */}
      {!config.showPercentage && (
        <div className="text-sm text-[var(--hive-text-secondary)] text-right">
          {displayValue} / {maxValue}
        </div>
      )}
    </div>
  );
};