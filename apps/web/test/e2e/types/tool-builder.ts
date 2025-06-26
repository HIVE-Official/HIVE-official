// Tool types
export interface TestTool {
  name: string;
  description: string;
}

// Element types
export interface TestElement {
  type: 'textBlock' | 'textInput' | 'choiceSelect' | 'button' | 'ratingStars';
  name: string;
}

// Configuration types
export type ConfigValue = string | number | boolean;
export type ElementConfig = Record<string, ConfigValue>;

// Position type
export interface Position {
  x: number;
  y: number;
}

// Analytics event types
export interface ToolBuilderEvent {
  type: 'tool_created' | 'element_added' | 'element_configured' | 'tool_published';
  toolId: string;
  metadata?: {
    elementType?: string;
    elementId?: string;
    config?: ElementConfig;
    [key: string]: unknown;
  };
} 