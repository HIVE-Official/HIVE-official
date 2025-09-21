/**
 * HIVE Stack Element Renderer;
 * Renders layout containers for organizing other elements;
 * Uses standard style system for consistent output;
 */

import React from 'react';
import { ElementInstance, Tool } from '@hive/core';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface StackConfig {// Element-specific properties (flexible)
  direction?: 'vertical' | 'horizontal';
  spacing?: number;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: boolean;
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties;}

interface StackRendererProps {element: ElementInstance;
  config: StackConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>};
  // Additional props for rendering children;
  tool?: Tool;
  renderElement?: (element: ElementInstance) => React.ReactNode;
}

export const StackRenderer: React.FC<StackRendererProps> = ({
  element,
  config,
  tool,
  renderElement;
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  // Get child elements;
  const childElements = tool?.elements;
    .filter(el => el.parentId === element.id)
    .sort((a, b) => a.order - b.order) || [];

  // Flexbox direction;
  const flexDirection = config.direction === 'horizontal' ? 'row' : 'column';
  
  // Alignment mapping;
  const getAlignItems = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'center';
      case 'end': return 'flex-end';
      case 'stretch': return 'stretch';
      default: return 'flex-start'
    }}
  };

  const getJustifyContent = (alignment?: string) => {
    switch (alignment) {
      case 'center': return 'center';
      case 'end': return 'flex-end';
      default: return 'flex-start'
    }}
  };

  // Element-specific flex styles (layout behavior)
  const flexStyles: React.CSSProperties = {
    ...styles,
    display: 'flex',
    flexDirection,
    alignItems: getAlignItems(config.alignment),
    justifyContent: getJustifyContent(config.alignment),
    flexWrap: config.wrap ? 'wrap' : 'nowrap',
    gap: `${config.spacing || 8}px`,
  };

  return (
    <div className={`${classes.container} ${classes.spacing} ${classes.element}`} style={flexStyles}>
      {childElements.map(childElement => 
        renderElement ? renderElement(childElement) : (
          <div key={childElement.id} className="text-xs text-[var(--hive-text-tertiary)]">
            Nested element: {childElement.elementId}
          </div>
        )
      )}
      
      {childElements.length === 0 && (
        <div className="text-xs text-[var(--hive-text-tertiary)] p-4 border-2 border-dashed border-[var(--hive-border)] rounded-lg">
          Empty stack container;
        </div>
      )}
    </div>
  )
};