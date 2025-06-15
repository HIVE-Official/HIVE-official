import type { Element } from '@hive/core';

export interface PropertySchema {
  /** Property key in the config object */
  key: string;
  /** Display label for the property */
  label: string;
  /** Input type for editing */
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'url';
  /** Default value if not set */
  defaultValue?: any;
  /** Whether this property is required */
  required?: boolean;
  /** Placeholder text for inputs */
  placeholder?: string;
  /** Options for select type */
  options?: Array<{ label: string; value: any }>;
  /** Minimum value for number type */
  min?: number;
  /** Maximum value for number type */
  max?: number;
  /** Help text to display */
  helpText?: string;
  /** Validation function */
  validate?: (value: any) => string | null;
}

export interface ElementConfigSchema {
  /** Element type this schema applies to */
  elementType: string;
  /** Display name for this element type */
  displayName: string;
  /** Property configurations */
  properties: PropertySchema[];
  /** Configuration presets */
  presets?: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
}

export interface ElementConfigPanelProps {
  /** The currently selected element instance */
  selectedElement?: {
    id: string;
    elementId: string;
    elementType: string;
    config: Record<string, any>;
  } | null;
  /** Available element definitions */
  elements: Element[];
  /** Callback when element config changes */
  onConfigChange: (elementId: string, config: Record<string, any>) => void;
  /** Whether the panel is in preview mode */
  isPreview?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface PropertyInputProps {
  /** Property schema definition */
  property: PropertySchema;
  /** Current value */
  value: any;
  /** Callback when value changes */
  onChange: (value: any) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface ConfigPresetProps {
  /** Available presets for this element type */
  presets: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
  /** Callback when preset is selected */
  onPresetSelect: (config: Record<string, any>) => void;
  /** Optional CSS class name */
  className?: string;
} 

export interface PropertySchema {
  /** Property key in the config object */
  key: string;
  /** Display label for the property */
  label: string;
  /** Input type for editing */
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'url';
  /** Default value if not set */
  defaultValue?: any;
  /** Whether this property is required */
  required?: boolean;
  /** Placeholder text for inputs */
  placeholder?: string;
  /** Options for select type */
  options?: Array<{ label: string; value: any }>;
  /** Minimum value for number type */
  min?: number;
  /** Maximum value for number type */
  max?: number;
  /** Help text to display */
  helpText?: string;
  /** Validation function */
  validate?: (value: any) => string | null;
}

export interface ElementConfigSchema {
  /** Element type this schema applies to */
  elementType: string;
  /** Display name for this element type */
  displayName: string;
  /** Property configurations */
  properties: PropertySchema[];
  /** Configuration presets */
  presets?: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
}

export interface ElementConfigPanelProps {
  /** The currently selected element instance */
  selectedElement?: {
    id: string;
    elementId: string;
    elementType: string;
    config: Record<string, any>;
  } | null;
  /** Available element definitions */
  elements: Element[];
  /** Callback when element config changes */
  onConfigChange: (elementId: string, config: Record<string, any>) => void;
  /** Whether the panel is in preview mode */
  isPreview?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface PropertyInputProps {
  /** Property schema definition */
  property: PropertySchema;
  /** Current value */
  value: any;
  /** Callback when value changes */
  onChange: (value: any) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface ConfigPresetProps {
  /** Available presets for this element type */
  presets: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
  /** Callback when preset is selected */
  onPresetSelect: (config: Record<string, any>) => void;
  /** Optional CSS class name */
  className?: string;
} 

export interface PropertySchema {
  /** Property key in the config object */
  key: string;
  /** Display label for the property */
  label: string;
  /** Input type for editing */
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'url';
  /** Default value if not set */
  defaultValue?: any;
  /** Whether this property is required */
  required?: boolean;
  /** Placeholder text for inputs */
  placeholder?: string;
  /** Options for select type */
  options?: Array<{ label: string; value: any }>;
  /** Minimum value for number type */
  min?: number;
  /** Maximum value for number type */
  max?: number;
  /** Help text to display */
  helpText?: string;
  /** Validation function */
  validate?: (value: any) => string | null;
}

export interface ElementConfigSchema {
  /** Element type this schema applies to */
  elementType: string;
  /** Display name for this element type */
  displayName: string;
  /** Property configurations */
  properties: PropertySchema[];
  /** Configuration presets */
  presets?: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
}

export interface ElementConfigPanelProps {
  /** The currently selected element instance */
  selectedElement?: {
    id: string;
    elementId: string;
    elementType: string;
    config: Record<string, any>;
  } | null;
  /** Available element definitions */
  elements: Element[];
  /** Callback when element config changes */
  onConfigChange: (elementId: string, config: Record<string, any>) => void;
  /** Whether the panel is in preview mode */
  isPreview?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface PropertyInputProps {
  /** Property schema definition */
  property: PropertySchema;
  /** Current value */
  value: any;
  /** Callback when value changes */
  onChange: (value: any) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface ConfigPresetProps {
  /** Available presets for this element type */
  presets: Array<{
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
  /** Callback when preset is selected */
  onPresetSelect: (config: Record<string, any>) => void;
  /** Optional CSS class name */
  className?: string;
} 
