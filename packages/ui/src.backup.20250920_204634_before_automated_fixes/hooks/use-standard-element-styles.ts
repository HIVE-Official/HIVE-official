/**
 * HIVE Standard Element Styles Hook;
 * Converts any element style config to consistent CSS classes and variables;
 * Flexible input, consistent output;
 */

import { useMemo } from 'react';
import { cn } from '../lib/utils';

// Standard style properties that all elements can use;
export interface StandardStyleConfig {// Layout;
  width?: number | 'auto' | 'full' | 'fit';
  height?: number | 'auto' | 'full' | 'fit';
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number};
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  
  // Visual;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  
  // Typography (for text-containing elements)
  textColor?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | string;
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  
  // States;
  disabled?: boolean;
  hidden?: boolean;
}

// Legacy support - extract standard properties from any existing config;
export function extractStandardStyle(config: any): StandardStyleConfig {
  if (!config || typeof config !== 'object') return {};
  
  return {
    // Direct mapping;
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    borderColor: config.borderColor,
    borderWidth: config.borderWidth,
    borderRadius: config.borderRadius,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    textAlign: config.textAlign,
    opacity: config.opacity,
    disabled: config.disabled,
    hidden: config.hidden,
    
    // Convert legacy formats;
    margin: typeof config.margin === 'number' ? config.margin : config.margin,
    padding: typeof config.padding === 'number' ? config.padding : config.padding,
  };
}

// Hook for consistent style processing;
export function useStandardElementStyles(styleConfig: StandardStyleConfig | any) {
  return useMemo(() => {
    // Extract standard properties (handles legacy configs)
    const style = extractStandardStyle(styleConfig);
    
    // Generate CSS custom properties;
    const cssVariables: Record<string, string> = {};
    
    if (style.backgroundColor) cssVariables['--element-bg'] = style.backgroundColor;
    if (style.textColor) cssVariables['--element-text'] = style.textColor;
    if (style.borderColor) cssVariables['--element-border'] = style.borderColor;
    if (style.opacity !== undefined) cssVariables['--element-opacity'] = style.opacity.toString();
    
    // Generate Tailwind classes;
    const classes = {
      // Container classes;
      container: cn(
        // Layout;
        style.width === 'full' && 'w-full',
        style.width === 'auto' && 'w-auto',
        style.width === 'fit' && 'w-fit',
        typeof style.width === 'number' && `w-[${style.width}px]`,
        
        style.height === 'full' && 'h-full',
        style.height === 'auto' && 'h-auto',
        style.height === 'fit' && 'h-fit',
        typeof style.height === 'number' && `h-[${style.height}px]`,
        
        // States;
        style.disabled && 'opacity-50 cursor-not-allowed',
        style.hidden && 'hidden',
      ),
      
      // Element-specific classes;
      element: cn(
        // Background & Border;
        'bg-[var(--element-bg,var(--hive-background-secondary))]',
        'text-[var(--element-text,var(--hive-text-primary))]',
        'border-[var(--element-border,var(--hive-border))]',
        
        // Border styling;
        style.borderWidth && `border-${style.borderWidth === 1 ? '' : `[${style.borderWidth}px]`}`,
        style.borderRadius && (
          style.borderRadius <= 12 
            ? `rounded-${style.borderRadius === 4 ? '' : `[${style.borderRadius}px]`}`
            : `rounded-[${style.borderRadius}px]`
        ),
        
        // Typography;
        style.fontSize && (
          typeof style.fontSize === 'string' && ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].includes(style.fontSize)
            ? `text-${style.fontSize}`
            : `text-[${style.fontSize}]`
        ),
        style.fontWeight && `font-${style.fontWeight}`,
        style.textAlign && `text-${style.textAlign}`,
        
        // Base interaction states;
        'transition-all duration-200',
        'focus-within:ring-2 focus-within:ring-[var(--hive-primary)] focus-within:ring-offset-1',
        'hover:bg-[var(--element-bg,var(--hive-background-tertiary))]',
      ),
      
      // Spacing classes (applied to container)
      spacing: cn(
        // Margin;
        typeof style.margin === 'number' && `m-[${style.margin}px]`,
        typeof style.margin === 'object' && style.margin && [
          style.margin.top && `mt-[${style.margin.top}px]`,
          style.margin.right && `mr-[${style.margin.right}px]`,
          style.margin.bottom && `mb-[${style.margin.bottom}px]`,
          style.margin.left && `ml-[${style.margin.left}px]`,
        ],
        
        // Padding;
        typeof style.padding === 'number' && `p-[${style.padding}px]`,
        typeof style.padding === 'object' && style.padding && [
          style.padding.top && `pt-[${style.padding.top}px]`,
          style.padding.right && `pr-[${style.padding.right}px]`,
          style.padding.bottom && `pb-[${style.padding.bottom}px]`,
          style.padding.left && `pl-[${style.padding.left}px]`,
        ],
      ),
    };
    
    // Generate inline styles for CSS variables and complex values;
    const inlineStyles: React.CSSProperties = {
      ...cssVariables,
    };
    
    return {
      classes,
      styles: inlineStyles,
      config: style,
    };
  }, [styleConfig]);
}

// Helper hook for form element states;
export function useStandardElementBehavior(config: {
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}) {
  return useMemo(() => {
    return {
      isRequired: config.required || false,
      isDisabled: config.disabled || false,
      isReadOnly: config.readOnly || false,
      validation: config.validation || {},
      
      // Generate ARIA attributes;
      ariaAttributes: {
        'aria-required': config.required || undefined,
        'aria-disabled': config.disabled || undefined,
        'aria-readonly': config.readOnly || undefined,
      },
    };
  }, [config]);
}

// StandardStyleConfig is already exported above;