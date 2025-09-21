/**
 * HIVE Divider Element Renderer
 * Renders visual dividers within tools
 * Uses standard style system for consistent output
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface DividerConfig {
  // Element-specific properties (flexible)
  thickness?: number;
  color?: string;
  dividerStyle?: 'solid' | 'dashed' | 'dotted';
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties
}

interface DividerRendererProps {
  element: ElementInstance;
  config: DividerConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>;
  };
}

export const DividerRenderer: React.FC<DividerRendererProps> = ({
  element,
  config
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  // Element-specific styles (divider appearance)
  const dividerStyles: React.CSSProperties = {
    ...styles,
    height: `${config.thickness || 1}px`,
    backgroundColor: config.color || 'var(--hive-border)',
    border: 'none',
    width: '100%',
  };

  // Handle different border styles (element-specific feature)
  if (config.dividerStyle === 'dashed' || config.dividerStyle === 'dotted') {
    dividerStyles.backgroundColor = 'transparent';
    dividerStyles.borderTop = `${config.thickness || 1}px ${config.dividerStyle} ${config.color || 'var(--hive-border)'}`;
    dividerStyles.height = '0';
  }

  return (
    <div className={`w-full ${classes.container} ${classes.spacing}`}>
      <hr style={dividerStyles} className={`w-full ${classes.element}`} />
    </div>
  );
};