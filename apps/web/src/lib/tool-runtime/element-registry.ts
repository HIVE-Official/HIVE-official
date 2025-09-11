/**
 * Tool Element Registry
 * Defines all available elements for HiveLab tools
 */

export type ElementCategory = 'input' | 'display' | 'action' | 'logic' | 'data';

export interface ElementDefinition {
  id: string;
  name: string;
  category: ElementCategory;
  icon: string;
  description: string;
  
  // Element configuration
  properties: PropertyDefinition[];
  inputs?: PortDefinition[];
  outputs?: PortDefinition[];
  
  // Runtime behavior
  defaultConfig: Record<string, any>;
  validator?: (config: any) => boolean;
  executor: (context: ExecutionContext, config: any) => Promise<any>;
}

export interface PropertyDefinition {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect' | 'color' | 'date';
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean;
  };
}

export interface PortDefinition {
  id: string;
  label: string;
  type: 'data' | 'trigger' | 'condition';
  dataType?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
  multiple?: boolean;
}

export interface ExecutionContext {
  // Tool instance data
  toolId: string;
  spaceId: string;
  userId: string;
  
  // Runtime services
  storage: StorageService;
  api: ApiService;
  ui: UIService;
  events: EventService;
  
  // Execution state
  variables: Map<string, any>;
  inputs: Record<string, any>;
  timestamp: Date;
}

// Service interfaces for client-side execution
export interface StorageService {
  get(key: string): any;
  set(key: string, value: any): void;
  delete(key: string): void;
  clear(): void;
}

export interface ApiService {
  fetch(url: string, options?: globalThis.RequestInit): Promise<Response>;
  spaceData(path: string): Promise<any>;
  userData(path: string): Promise<any>;
}

export interface UIService {
  showToast(message: string, type?: 'success' | 'error' | 'info'): void;
  showModal(content: any): Promise<any>;
  updateDisplay(elementId: string, data: any): void;
}

export interface EventService {
  emit(event: string, data: any): void;
  on(event: string, handler: (data: any) => void): void;
  off(event: string, handler: (data: any) => void): void;
}

// Core element definitions
export const INPUT_ELEMENTS: ElementDefinition[] = [
  {
    id: 'text_input',
    name: 'Text Input',
    category: 'input',
    icon: '📝',
    description: 'Single line text input',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'string',
        required: true,
        defaultValue: 'Enter text'
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'string',
        defaultValue: ''
      },
      {
        key: 'required',
        label: 'Required',
        type: 'boolean',
        defaultValue: false
      },
      {
        key: 'maxLength',
        label: 'Max Length',
        type: 'number',
        validation: { min: 1, max: 500 }
      }
    ],
    outputs: [
      {
        id: 'value',
        label: 'Value',
        type: 'data',
        dataType: 'string'
      }
    ],
    defaultConfig: {
      label: 'Enter text',
      placeholder: '',
      required: false
    },
    executor: async (context, config) => {
      // Return current input value
      return context.inputs[config.id] || '';
    }
  },
  {
    id: 'number_input',
    name: 'Number Input',
    category: 'input',
    icon: '🔢',
    description: 'Numeric input field',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'string',
        required: true,
        defaultValue: 'Enter number'
      },
      {
        key: 'min',
        label: 'Minimum',
        type: 'number'
      },
      {
        key: 'max',
        label: 'Maximum',
        type: 'number'
      },
      {
        key: 'step',
        label: 'Step',
        type: 'number',
        defaultValue: 1
      }
    ],
    outputs: [
      {
        id: 'value',
        label: 'Value',
        type: 'data',
        dataType: 'number'
      }
    ],
    defaultConfig: {
      label: 'Enter number',
      step: 1
    },
    executor: async (context, config) => {
      const value = context.inputs[config.id] || 0;
      return Number(value);
    }
  },
  {
    id: 'date_picker',
    name: 'Date Picker',
    category: 'input',
    icon: '📅',
    description: 'Date and time selection',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'string',
        required: true,
        defaultValue: 'Select date'
      },
      {
        key: 'includeTime',
        label: 'Include Time',
        type: 'boolean',
        defaultValue: false
      },
      {
        key: 'minDate',
        label: 'Minimum Date',
        type: 'date'
      },
      {
        key: 'maxDate',
        label: 'Maximum Date',
        type: 'date'
      }
    ],
    outputs: [
      {
        id: 'value',
        label: 'Date',
        type: 'data',
        dataType: 'string'
      }
    ],
    defaultConfig: {
      label: 'Select date',
      includeTime: false
    },
    executor: async (context, config) => {
      return context.inputs[config.id] || null;
    }
  },
  {
    id: 'select_dropdown',
    name: 'Dropdown',
    category: 'input',
    icon: '📋',
    description: 'Single selection dropdown',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'string',
        required: true,
        defaultValue: 'Select option'
      },
      {
        key: 'options',
        label: 'Options',
        type: 'multiselect',
        required: true,
        defaultValue: []
      },
      {
        key: 'defaultValue',
        label: 'Default Value',
        type: 'string'
      }
    ],
    outputs: [
      {
        id: 'value',
        label: 'Selected',
        type: 'data',
        dataType: 'string'
      }
    ],
    defaultConfig: {
      label: 'Select option',
      options: []
    },
    executor: async (context, config) => {
      return context.inputs[config.id] || config.defaultValue || null;
    }
  },
  {
    id: 'button',
    name: 'Button',
    category: 'input',
    icon: '🔘',
    description: 'Clickable button',
    properties: [
      {
        key: 'text',
        label: 'Button Text',
        type: 'string',
        required: true,
        defaultValue: 'Click me'
      },
      {
        key: 'variant',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'danger', label: 'Danger' }
        ],
        defaultValue: 'primary'
      }
    ],
    outputs: [
      {
        id: 'clicked',
        label: 'Clicked',
        type: 'trigger'
      }
    ],
    defaultConfig: {
      text: 'Click me',
      variant: 'primary'
    },
    executor: async (context, config) => {
      // Emit click event
      context.events.emit(`button_${config.id}_clicked`, {});
      return true;
    }
  }
];

export const DISPLAY_ELEMENTS: ElementDefinition[] = [
  {
    id: 'text_display',
    name: 'Text Display',
    category: 'display',
    icon: '📄',
    description: 'Display text or data',
    properties: [
      {
        key: 'text',
        label: 'Text',
        type: 'string',
        defaultValue: 'Display text'
      },
      {
        key: 'size',
        label: 'Size',
        type: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ],
        defaultValue: 'medium'
      },
      {
        key: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF'
      }
    ],
    inputs: [
      {
        id: 'data',
        label: 'Data',
        type: 'data',
        dataType: 'any'
      }
    ],
    defaultConfig: {
      text: 'Display text',
      size: 'medium',
      color: '#FFFFFF'
    },
    executor: async (context, config) => {
      const inputData = context.inputs.data || config.text;
      context.ui.updateDisplay(config.id, inputData);
      return inputData;
    }
  },
  {
    id: 'list_display',
    name: 'List',
    category: 'display',
    icon: '📋',
    description: 'Display items in a list',
    properties: [
      {
        key: 'title',
        label: 'Title',
        type: 'string',
        defaultValue: 'List'
      },
      {
        key: 'showNumbers',
        label: 'Show Numbers',
        type: 'boolean',
        defaultValue: false
      }
    ],
    inputs: [
      {
        id: 'items',
        label: 'Items',
        type: 'data',
        dataType: 'array'
      }
    ],
    defaultConfig: {
      title: 'List',
      showNumbers: false
    },
    executor: async (context, config) => {
      const items = context.inputs.items || [];
      context.ui.updateDisplay(config.id, { items, config });
      return items;
    }
  },
  {
    id: 'chart_display',
    name: 'Chart',
    category: 'display',
    icon: '📊',
    description: 'Display data as a chart',
    properties: [
      {
        key: 'title',
        label: 'Title',
        type: 'string',
        defaultValue: 'Chart'
      },
      {
        key: 'type',
        label: 'Chart Type',
        type: 'select',
        options: [
          { value: 'bar', label: 'Bar' },
          { value: 'line', label: 'Line' },
          { value: 'pie', label: 'Pie' }
        ],
        defaultValue: 'bar'
      }
    ],
    inputs: [
      {
        id: 'data',
        label: 'Data',
        type: 'data',
        dataType: 'array'
      }
    ],
    defaultConfig: {
      title: 'Chart',
      type: 'bar'
    },
    executor: async (context, config) => {
      const data = context.inputs.data || [];
      context.ui.updateDisplay(config.id, { data, config });
      return data;
    }
  }
];

export const ACTION_ELEMENTS: ElementDefinition[] = [
  {
    id: 'create_post',
    name: 'Create Post',
    category: 'action',
    icon: '✉️',
    description: 'Create a new post in the space',
    properties: [
      {
        key: 'postType',
        label: 'Post Type',
        type: 'select',
        options: [
          { value: 'discussion', label: 'Discussion' },
          { value: 'announcement', label: 'Announcement' },
          { value: 'question', label: 'Question' }
        ],
        defaultValue: 'discussion'
      }
    ],
    inputs: [
      {
        id: 'title',
        label: 'Title',
        type: 'data',
        dataType: 'string'
      },
      {
        id: 'content',
        label: 'Content',
        type: 'data',
        dataType: 'string'
      }
    ],
    outputs: [
      {
        id: 'postId',
        label: 'Post ID',
        type: 'data',
        dataType: 'string'
      }
    ],
    defaultConfig: {
      postType: 'discussion'
    },
    executor: async (context, config) => {
      const title = context.inputs.title || '';
      const content = context.inputs.content || '';
      
      // Create post via API
      const response = await context.api.spaceData('posts/create', {
        method: 'POST',
        body: JSON.stringify({
          type: config.postType,
          title,
          content
        })
      });
      
      const postId = response.id;
      context.ui.showToast('Post created!', 'success');
      return postId;
    }
  },
  {
    id: 'send_notification',
    name: 'Send Notification',
    category: 'action',
    icon: '🔔',
    description: 'Send a notification to users',
    properties: [
      {
        key: 'notificationType',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'info', label: 'Info' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' }
        ],
        defaultValue: 'info'
      }
    ],
    inputs: [
      {
        id: 'message',
        label: 'Message',
        type: 'data',
        dataType: 'string'
      },
      {
        id: 'recipients',
        label: 'Recipients',
        type: 'data',
        dataType: 'array'
      }
    ],
    defaultConfig: {
      notificationType: 'info'
    },
    executor: async (context, config) => {
      const message = context.inputs.message || '';
      const recipients = context.inputs.recipients || [];
      
      // Send notification
      context.ui.showToast(message, config.notificationType);
      
      // Log notification
      await context.api.spaceData('notifications/send', {
        method: 'POST',
        body: JSON.stringify({
          message,
          recipients,
          type: config.notificationType
        })
      });
      
      return true;
    }
  },
  {
    id: 'store_data',
    name: 'Store Data',
    category: 'action',
    icon: '💾',
    description: 'Save data to storage',
    properties: [
      {
        key: 'storageKey',
        label: 'Storage Key',
        type: 'string',
        required: true,
        defaultValue: 'data'
      },
      {
        key: 'persistent',
        label: 'Persistent',
        type: 'boolean',
        defaultValue: false
      }
    ],
    inputs: [
      {
        id: 'data',
        label: 'Data',
        type: 'data',
        dataType: 'any'
      }
    ],
    outputs: [
      {
        id: 'success',
        label: 'Success',
        type: 'data',
        dataType: 'boolean'
      }
    ],
    defaultConfig: {
      storageKey: 'data',
      persistent: false
    },
    executor: async (context, config) => {
      const data = context.inputs.data;
      
      if (config.persistent) {
        // Store in Firebase
        await context.api.spaceData(`storage/${config.storageKey}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        });
      } else {
        // Store locally
        context.storage.set(config.storageKey, data);
      }
      
      return true;
    }
  }
];

export const LOGIC_ELEMENTS: ElementDefinition[] = [
  {
    id: 'condition',
    name: 'If/Then',
    category: 'logic',
    icon: '🔀',
    description: 'Conditional logic',
    properties: [
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' },
          { value: 'contains', label: 'Contains' }
        ],
        defaultValue: 'equals'
      }
    ],
    inputs: [
      {
        id: 'value1',
        label: 'Value 1',
        type: 'data',
        dataType: 'any'
      },
      {
        id: 'value2',
        label: 'Value 2',
        type: 'data',
        dataType: 'any'
      }
    ],
    outputs: [
      {
        id: 'true',
        label: 'True',
        type: 'trigger'
      },
      {
        id: 'false',
        label: 'False',
        type: 'trigger'
      }
    ],
    defaultConfig: {
      operator: 'equals'
    },
    executor: async (context, config) => {
      const value1 = context.inputs.value1;
      const value2 = context.inputs.value2;
      let result = false;
      
      switch (config.operator) {
        case 'equals':
          result = value1 === value2;
          break;
        case 'not_equals':
          result = value1 !== value2;
          break;
        case 'greater':
          result = value1 > value2;
          break;
        case 'less':
          result = value1 < value2;
          break;
        case 'contains':
          result = String(value1).includes(String(value2));
          break;
      }
      
      return result;
    }
  },
  {
    id: 'loop',
    name: 'Loop',
    category: 'logic',
    icon: '🔄',
    description: 'Repeat actions',
    properties: [
      {
        key: 'maxIterations',
        label: 'Max Iterations',
        type: 'number',
        defaultValue: 10,
        validation: { min: 1, max: 100 }
      }
    ],
    inputs: [
      {
        id: 'items',
        label: 'Items',
        type: 'data',
        dataType: 'array'
      }
    ],
    outputs: [
      {
        id: 'item',
        label: 'Current Item',
        type: 'data',
        dataType: 'any'
      },
      {
        id: 'index',
        label: 'Index',
        type: 'data',
        dataType: 'number'
      },
      {
        id: 'done',
        label: 'Done',
        type: 'trigger'
      }
    ],
    defaultConfig: {
      maxIterations: 10
    },
    executor: async (context, config) => {
      const items = context.inputs.items || [];
      const results = [];
      
      for (let i = 0; i < Math.min(items.length, config.maxIterations); i++) {
        results.push({
          item: items[i],
          index: i
        });
      }
      
      return results;
    }
  }
];

// Combine all elements
export const ALL_ELEMENTS = [
  ...INPUT_ELEMENTS,
  ...DISPLAY_ELEMENTS,
  ...ACTION_ELEMENTS,
  ...LOGIC_ELEMENTS
];

// Element registry for quick lookup
export const ELEMENT_REGISTRY = new Map<string, ElementDefinition>(
  ALL_ELEMENTS.map(element => [element.id, element])
);

// Get element by ID
export function getElement(id: string): ElementDefinition | undefined {
  return ELEMENT_REGISTRY.get(id);
}

// Get elements by category
export function getElementsByCategory(category: ElementCategory): ElementDefinition[] {
  return ALL_ELEMENTS.filter(element => element.category === category);
}

// Validate element configuration
export function validateElementConfig(
  elementId: string,
  config: any
): { valid: boolean; errors: string[] } {
  const element = getElement(elementId);
  if (!element) {
    return { valid: false, errors: ['Element not found'] };
  }
  
  const errors: string[] = [];
  
  // Check required properties
  for (const prop of element.properties) {
    if (prop.required && !config[prop.key]) {
      errors.push(`${prop.label} is required`);
    }
    
    // Validate property values
    if (config[prop.key] !== undefined && prop.validation) {
      const value = config[prop.key];
      
      if (prop.validation.min !== undefined && value < prop.validation.min) {
        errors.push(`${prop.label} must be at least ${prop.validation.min}`);
      }
      
      if (prop.validation.max !== undefined && value > prop.validation.max) {
        errors.push(`${prop.label} must be at most ${prop.validation.max}`);
      }
      
      if (prop.validation.pattern) {
        const regex = new RegExp(prop.validation.pattern);
        if (!regex.test(value)) {
          errors.push(`${prop.label} has invalid format`);
        }
      }
      
      if (prop.validation.custom && !prop.validation.custom(value)) {
        errors.push(`${prop.label} is invalid`);
      }
    }
  }
  
  // Run element's custom validator if present
  if (element.validator && !element.validator(config)) {
    errors.push('Configuration is invalid');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}