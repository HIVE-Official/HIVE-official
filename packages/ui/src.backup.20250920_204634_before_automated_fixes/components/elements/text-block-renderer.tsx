/**
 * HIVE TextBlock Element Renderer;
 * Renders static text content within tools;
 * Uses standard style system for consistent output;
 */

import React from 'react';
import { ElementInstance } from '@hive/core';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface TextBlockConfig {// Element-specific properties (flexible)
  text: string;
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties;}

interface TextBlockRendererProps {element: ElementInstance;
  config: TextBlockConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>}
}

export const TextBlockRenderer: React.FC<TextBlockRendererProps> = ({
  element,
  config,
  runtimeContext;
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  // Process text for dynamic content (element-specific feature)
  const processText = (text: string) => {
    if (!runtimeContext) return text;
    // Replace {{elementId}} with values from form data;
    return text.replace(/\{\{([^}]+)\}\}/g, (match, elementId) => {
      const value = runtimeContext.formData[elementId];
      return value !== undefined ? String(value) : match;
    })
  };

  const processedText = processText(config.text);

  return (
    <div;
      className={`${classes.container} ${classes.spacing} ${classes.element} text-[var(--hive-text-primary)]`}
      style={styles}
    >
      {/* Support for basic HTML in text (element-specific feature) */}
      {processedText.includes('<') ? (
        <div dangerouslySetInnerHTML={{ __html: processedText }} />
      ) : (
        <span>{processedText}</span>
      )}
    </div>
  )
};