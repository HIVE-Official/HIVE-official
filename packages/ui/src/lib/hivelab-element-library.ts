/**
 * HiveLab Element Library
 *
 * Complete library of 48 v1 elements organized by category.
 * These are the building blocks for creating custom tools.
 */

import type { ElementDefinition, ElementCategory } from '../types/hivelab.types';

// ============================================================================
// TRIGGER Elements (5 total)
// ============================================================================

export const TRIGGER_ELEMENTS: ElementDefinition[] = [
  {
    id: 'trigger-form-load',
    name: 'Form Load',
    icon: '▶️',
    category: 'trigger',
    description: 'Fires when the form/page loads',
    complexity: 'simple',
    defaultWidth: 140,
    defaultHeight: 80,
    defaultInputs: [],
    defaultOutputs: [
      {
        name: 'On Load',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Fires on page load'
      }
    ],
    defaultConfig: {},
    isNew: false
  },
  {
    id: 'trigger-button-click',
    name: 'Button Click',
    icon: '🔘',
    category: 'trigger',
    description: 'Fires when button is clicked',
    complexity: 'simple',
    defaultWidth: 140,
    defaultHeight: 100,
    defaultInputs: [],
    defaultOutputs: [
      {
        name: 'On Click',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Fires on button click'
      }
    ],
    defaultConfig: {
      buttonText: 'Submit',
      variant: 'primary'
    }
  },
  {
    id: 'trigger-schedule',
    name: 'Schedule',
    icon: '⏰',
    category: 'trigger',
    description: 'Fires at scheduled time',
    complexity: 'medium',
    defaultWidth: 140,
    defaultHeight: 120,
    defaultInputs: [],
    defaultOutputs: [
      {
        name: 'On Schedule',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Fires at scheduled time'
      }
    ],
    defaultConfig: {
      scheduleType: 'daily',
      time: '09:00'
    }
  },
  {
    id: 'trigger-webhook',
    name: 'Webhook',
    icon: '🌐',
    category: 'trigger',
    description: 'Receives webhook requests',
    complexity: 'advanced',
    defaultWidth: 140,
    defaultHeight: 120,
    defaultInputs: [],
    defaultOutputs: [
      {
        name: 'Request',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Webhook received'
      },
      {
        name: 'Data',
        type: 'object',
        side: 'output',
        required: false,
        description: 'Request data'
      }
    ],
    defaultConfig: {
      method: 'POST'
    }
  },
  {
    id: 'trigger-event',
    name: 'Custom Event',
    icon: '⚡',
    category: 'trigger',
    description: 'Listens for custom events',
    complexity: 'medium',
    defaultWidth: 140,
    defaultHeight: 100,
    defaultInputs: [],
    defaultOutputs: [
      {
        name: 'On Event',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Custom event fired'
      }
    ],
    defaultConfig: {
      eventName: ''
    }
  }
];

// ============================================================================
// COLLECTOR Elements (8 total)
// ============================================================================

export const COLLECTOR_ELEMENTS: ElementDefinition[] = [
  {
    id: 'collector-text',
    name: 'Text Input',
    icon: '📝',
    category: 'collector',
    description: 'Collect text from user',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Value',
        type: 'text',
        side: 'output',
        required: false,
        description: 'Input value'
      }
    ],
    defaultConfig: {
      label: 'Text Input',
      placeholder: '',
      required: false
    }
  },
  {
    id: 'collector-choice',
    name: 'Choice',
    icon: '☑️',
    category: 'collector',
    description: 'Radio or checkbox selection',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Selected',
        type: ['text', 'list'],
        side: 'output',
        required: false,
        description: 'Selected option(s)'
      }
    ],
    defaultConfig: {
      label: 'Choose one',
      options: ['Option 1', 'Option 2'],
      multiple: false
    }
  },
  {
    id: 'collector-date',
    name: 'Date Picker',
    icon: '📅',
    category: 'collector',
    description: 'Select date/time',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Date',
        type: 'date',
        side: 'output',
        required: false,
        description: 'Selected date'
      }
    ],
    defaultConfig: {
      label: 'Pick a date',
      includeTime: false
    }
  },
  {
    id: 'collector-member',
    name: 'Member Selector',
    icon: '👤',
    category: 'collector',
    description: 'Select space members',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Selected Members',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Selected member IDs'
      }
    ],
    defaultConfig: {
      label: 'Select members',
      multiple: false,
      filterBy: 'all'
    }
  },
  {
    id: 'collector-file',
    name: 'File Upload',
    icon: '📎',
    category: 'collector',
    description: 'Upload files',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'File URL',
        type: 'file',
        side: 'output',
        required: false,
        description: 'Uploaded file'
      }
    ],
    defaultConfig: {
      label: 'Upload file',
      acceptedTypes: ['image/*', 'application/pdf'],
      maxSize: 10
    }
  },
  {
    id: 'collector-api',
    name: 'API Request',
    icon: '🔌',
    category: 'collector',
    description: 'Fetch data from API',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to fetch'
      }
    ],
    defaultOutputs: [
      {
        name: 'Response',
        type: 'object',
        side: 'output',
        required: false,
        description: 'API response data'
      }
    ],
    defaultConfig: {
      method: 'GET',
      url: '',
      headers: {}
    }
  },
  {
    id: 'collector-number',
    name: 'Number Input',
    icon: '🔢',
    category: 'collector',
    description: 'Collect numeric input',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Value',
        type: 'number',
        side: 'output',
        required: false,
        description: 'Numeric value'
      }
    ],
    defaultConfig: {
      label: 'Enter number',
      min: 0,
      max: 100
    }
  },
  {
    id: 'collector-location',
    name: 'Location',
    icon: '📍',
    category: 'collector',
    description: 'Collect location data',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: false,
        description: 'When to show'
      }
    ],
    defaultOutputs: [
      {
        name: 'Location',
        type: 'text',
        side: 'output',
        required: false,
        description: 'Location text'
      }
    ],
    defaultConfig: {
      label: 'Location',
      allowGPS: true
    }
  }
];

// ============================================================================
// TRANSFORMER Elements (10 total)
// ============================================================================

export const TRANSFORMER_ELEMENTS: ElementDefinition[] = [
  {
    id: 'transformer-format',
    name: 'Format Text',
    icon: '✨',
    category: 'transformer',
    description: 'Format text output',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Input',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Text to format'
      }
    ],
    defaultOutputs: [
      {
        name: 'Output',
        type: 'text',
        side: 'output',
        required: false,
        description: 'Formatted text'
      }
    ],
    defaultConfig: {
      formatType: 'uppercase'
    }
  },
  {
    id: 'transformer-validate',
    name: 'Validate',
    icon: '✅',
    category: 'transformer',
    description: 'Validate input data',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Input',
        type: 'any',
        side: 'input',
        required: true,
        description: 'Data to validate'
      }
    ],
    defaultOutputs: [
      {
        name: 'Valid',
        type: 'boolean',
        side: 'output',
        required: false,
        description: 'Is valid'
      },
      {
        name: 'Errors',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Validation errors'
      }
    ],
    defaultConfig: {
      rules: []
    }
  },
  {
    id: 'transformer-calculate',
    name: 'Calculate',
    icon: '➕',
    category: 'transformer',
    description: 'Perform calculations',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'A',
        type: 'number',
        side: 'input',
        required: true,
        description: 'First number'
      },
      {
        name: 'B',
        type: 'number',
        side: 'input',
        required: true,
        description: 'Second number'
      }
    ],
    defaultOutputs: [
      {
        name: 'Result',
        type: 'number',
        side: 'output',
        required: false,
        description: 'Calculation result'
      }
    ],
    defaultConfig: {
      operation: 'add'
    }
  },
  {
    id: 'transformer-sentiment',
    name: 'Sentiment Analysis',
    icon: '😊',
    category: 'transformer',
    description: 'Analyze text sentiment',
    complexity: 'advanced',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Text',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Text to analyze'
      }
    ],
    defaultOutputs: [
      {
        name: 'Sentiment',
        type: 'text',
        side: 'output',
        required: false,
        description: 'positive/neutral/negative'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'transformer-filter',
    name: 'Filter',
    icon: '🔍',
    category: 'transformer',
    description: 'Filter list by criteria',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'List',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Input list'
      }
    ],
    defaultOutputs: [
      {
        name: 'Filtered',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Filtered results'
      }
    ],
    defaultConfig: {
      condition: ''
    }
  },
  {
    id: 'transformer-sort',
    name: 'Sort',
    icon: '🔀',
    category: 'transformer',
    description: 'Sort list items',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'List',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Input list'
      }
    ],
    defaultOutputs: [
      {
        name: 'Sorted',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Sorted list'
      }
    ],
    defaultConfig: {
      order: 'ascending',
      field: ''
    }
  },
  {
    id: 'transformer-map',
    name: 'Map',
    icon: '🗺️',
    category: 'transformer',
    description: 'Transform list items',
    complexity: 'advanced',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'List',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Input list'
      }
    ],
    defaultOutputs: [
      {
        name: 'Mapped',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Transformed list'
      }
    ],
    defaultConfig: {
      transform: ''
    }
  },
  {
    id: 'transformer-join',
    name: 'Join Text',
    icon: '🔗',
    category: 'transformer',
    description: 'Concatenate text',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Text 1',
        type: 'text',
        side: 'input',
        required: true,
        description: 'First text'
      },
      {
        name: 'Text 2',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Second text'
      }
    ],
    defaultOutputs: [
      {
        name: 'Result',
        type: 'text',
        side: 'output',
        required: false,
        description: 'Combined text'
      }
    ],
    defaultConfig: {
      separator: ' '
    }
  },
  {
    id: 'transformer-extract',
    name: 'Extract',
    icon: '✂️',
    category: 'transformer',
    description: 'Extract data from object',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Object',
        type: 'object',
        side: 'input',
        required: true,
        description: 'Input object'
      }
    ],
    defaultOutputs: [
      {
        name: 'Value',
        type: 'any',
        side: 'output',
        required: false,
        description: 'Extracted value'
      }
    ],
    defaultConfig: {
      path: ''
    }
  },
  {
    id: 'transformer-convert',
    name: 'Convert Type',
    icon: '🔄',
    category: 'transformer',
    description: 'Convert data types',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Input',
        type: 'any',
        side: 'input',
        required: true,
        description: 'Value to convert'
      }
    ],
    defaultOutputs: [
      {
        name: 'Output',
        type: 'any',
        side: 'output',
        required: false,
        description: 'Converted value'
      }
    ],
    defaultConfig: {
      toType: 'text'
    }
  }
];

// ============================================================================
// ROUTER Elements (5 total)
// ============================================================================

export const ROUTER_ELEMENTS: ElementDefinition[] = [
  {
    id: 'router-if-else',
    name: 'If/Else',
    icon: '🔀',
    category: 'router',
    description: 'Conditional branching',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to evaluate'
      },
      {
        name: 'Condition',
        type: 'boolean',
        side: 'input',
        required: true,
        description: 'True/false condition'
      }
    ],
    defaultOutputs: [
      {
        name: 'True',
        type: 'event',
        side: 'output',
        required: false,
        description: 'If condition is true'
      },
      {
        name: 'False',
        type: 'event',
        side: 'output',
        required: false,
        description: 'If condition is false'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'router-for-each',
    name: 'For Each',
    icon: '🔁',
    category: 'router',
    description: 'Loop through list',
    complexity: 'advanced',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'List',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Items to loop'
      }
    ],
    defaultOutputs: [
      {
        name: 'Item',
        type: 'any',
        side: 'output',
        required: false,
        description: 'Current item'
      },
      {
        name: 'Next',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Per iteration'
      },
      {
        name: 'Complete',
        type: 'event',
        side: 'output',
        required: false,
        description: 'Loop done'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'router-random',
    name: 'Random Branch',
    icon: '🎲',
    category: 'router',
    description: 'Random path selection',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to branch'
      }
    ],
    defaultOutputs: [
      {
        name: 'Path A',
        type: 'event',
        side: 'output',
        required: false,
        description: '50% chance'
      },
      {
        name: 'Path B',
        type: 'event',
        side: 'output',
        required: false,
        description: '50% chance'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'router-gate',
    name: 'Gate',
    icon: '🚪',
    category: 'router',
    description: 'Block until condition met',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'Incoming event'
      },
      {
        name: 'Open',
        type: 'boolean',
        side: 'input',
        required: true,
        description: 'Gate is open'
      }
    ],
    defaultOutputs: [
      {
        name: 'Pass',
        type: 'event',
        side: 'output',
        required: false,
        description: 'If gate open'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'router-page-nav',
    name: 'Navigate to Page',
    icon: '➡️',
    category: 'router',
    description: 'Navigate between pages',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to navigate'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      targetPage: '',
      transition: 'push'
    }
  }
];

// ============================================================================
// STORAGE Elements (3 total)
// ============================================================================

export const STORAGE_ELEMENTS: ElementDefinition[] = [
  {
    id: 'storage-variable',
    name: 'Variable',
    icon: '💾',
    category: 'storage',
    description: 'Store and retrieve data',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Set',
        type: 'any',
        side: 'input',
        required: false,
        description: 'Value to store'
      },
      {
        name: 'Get',
        type: 'event',
        side: 'input',
        required: false,
        description: 'Retrieve value'
      }
    ],
    defaultOutputs: [
      {
        name: 'Value',
        type: 'any',
        side: 'output',
        required: false,
        description: 'Stored value'
      }
    ],
    defaultConfig: {
      variableName: 'myVar',
      initialValue: ''
    }
  },
  {
    id: 'storage-database',
    name: 'Database',
    icon: '🗄️',
    category: 'storage',
    description: 'Store data in database',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Save',
        type: 'event',
        side: 'input',
        required: false,
        description: 'Trigger save'
      },
      {
        name: 'Data',
        type: 'object',
        side: 'input',
        required: true,
        description: 'Data to save'
      },
      {
        name: 'Query',
        type: 'event',
        side: 'input',
        required: false,
        description: 'Trigger query'
      }
    ],
    defaultOutputs: [
      {
        name: 'Results',
        type: 'list',
        side: 'output',
        required: false,
        description: 'Query results'
      }
    ],
    defaultConfig: {
      collection: ''
    }
  },
  {
    id: 'storage-file',
    name: 'File Storage',
    icon: '📁',
    category: 'storage',
    description: 'Store uploaded files',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'File',
        type: 'file',
        side: 'input',
        required: true,
        description: 'File to store'
      }
    ],
    defaultOutputs: [
      {
        name: 'URL',
        type: 'text',
        side: 'output',
        required: false,
        description: 'File URL'
      }
    ],
    defaultConfig: {}
  }
];

// ============================================================================
// DISPLAY Elements (5 total)
// ============================================================================

export const DISPLAY_ELEMENTS: ElementDefinition[] = [
  {
    id: 'display-chart',
    name: 'Chart',
    icon: '📊',
    category: 'display',
    description: 'Display data visualization',
    complexity: 'medium',
    defaultWidth: 200,
    defaultHeight: 180,
    defaultInputs: [
      {
        name: 'Data',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Data to visualize'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      chartType: 'bar',
      title: ''
    }
  },
  {
    id: 'display-list',
    name: 'List',
    icon: '📋',
    category: 'display',
    description: 'Display list of items',
    complexity: 'simple',
    defaultWidth: 200,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Items',
        type: 'list',
        side: 'input',
        required: true,
        description: 'List to display'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      title: ''
    }
  },
  {
    id: 'display-progress',
    name: 'Progress Bar',
    icon: '📈',
    category: 'display',
    description: 'Show progress indicator',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 100,
    defaultInputs: [
      {
        name: 'Value',
        type: 'number',
        side: 'input',
        required: true,
        description: 'Progress value (0-100)'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      label: ''
    }
  },
  {
    id: 'display-counter',
    name: 'Counter',
    icon: '🔢',
    category: 'display',
    description: 'Display numeric counter',
    complexity: 'simple',
    defaultWidth: 160,
    defaultHeight: 100,
    defaultInputs: [
      {
        name: 'Count',
        type: 'number',
        side: 'input',
        required: true,
        description: 'Number to display'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      label: '',
      prefix: '',
      suffix: ''
    }
  },
  {
    id: 'display-text',
    name: 'Text Display',
    icon: '📄',
    category: 'display',
    description: 'Show formatted text',
    complexity: 'simple',
    defaultWidth: 180,
    defaultHeight: 100,
    defaultInputs: [
      {
        name: 'Text',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Text to display'
      }
    ],
    defaultOutputs: [],
    defaultConfig: {
      format: 'paragraph'
    }
  }
];

// ============================================================================
// ACTION Elements (8 total)
// ============================================================================

export const ACTION_ELEMENTS: ElementDefinition[] = [
  {
    id: 'action-notify',
    name: 'Send Notification',
    icon: '🔔',
    category: 'action',
    description: 'Send push notification',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to send'
      },
      {
        name: 'Message',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Notification text'
      }
    ],
    defaultOutputs: [
      {
        name: 'Sent',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After sending'
      }
    ],
    defaultConfig: {
      recipients: 'all'
    }
  },
  {
    id: 'action-post',
    name: 'Create Post',
    icon: '✍️',
    category: 'action',
    description: 'Post to space feed',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to post'
      },
      {
        name: 'Content',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Post content'
      }
    ],
    defaultOutputs: [
      {
        name: 'Posted',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After posting'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'action-email',
    name: 'Send Email',
    icon: '📧',
    category: 'action',
    description: 'Send email message',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to send'
      },
      {
        name: 'To',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Recipient email'
      },
      {
        name: 'Subject',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Email subject'
      },
      {
        name: 'Body',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Email body'
      }
    ],
    defaultOutputs: [
      {
        name: 'Sent',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After sending'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'action-create-event',
    name: 'Create Event',
    icon: '📅',
    category: 'action',
    description: 'Create space event',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to create'
      },
      {
        name: 'Title',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Event title'
      },
      {
        name: 'Date',
        type: 'date',
        side: 'input',
        required: true,
        description: 'Event date/time'
      }
    ],
    defaultOutputs: [
      {
        name: 'Created',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After creation'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'action-create-task',
    name: 'Create Task',
    icon: '✅',
    category: 'action',
    description: 'Create space task',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 160,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to create'
      },
      {
        name: 'Title',
        type: 'text',
        side: 'input',
        required: true,
        description: 'Task title'
      },
      {
        name: 'Assignee',
        type: 'user',
        side: 'input',
        required: false,
        description: 'Assign to user'
      }
    ],
    defaultOutputs: [
      {
        name: 'Created',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After creation'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'action-update',
    name: 'Update Data',
    icon: '🔄',
    category: 'action',
    description: 'Update database record',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to update'
      },
      {
        name: 'Data',
        type: 'object',
        side: 'input',
        required: true,
        description: 'New data'
      }
    ],
    defaultOutputs: [
      {
        name: 'Updated',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After update'
      }
    ],
    defaultConfig: {
      collection: ''
    }
  },
  {
    id: 'action-export',
    name: 'Export CSV',
    icon: '📥',
    category: 'action',
    description: 'Export data to CSV',
    complexity: 'medium',
    defaultWidth: 180,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to export'
      },
      {
        name: 'Data',
        type: 'list',
        side: 'input',
        required: true,
        description: 'Data to export'
      }
    ],
    defaultOutputs: [
      {
        name: 'File',
        type: 'file',
        side: 'output',
        required: false,
        description: 'CSV file'
      }
    ],
    defaultConfig: {
      filename: 'export.csv'
    }
  },
  {
    id: 'action-webhook-send',
    name: 'Send Webhook',
    icon: '📤',
    category: 'action',
    description: 'Send webhook request',
    complexity: 'advanced',
    defaultWidth: 180,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'When to send'
      },
      {
        name: 'Data',
        type: 'object',
        side: 'input',
        required: true,
        description: 'Request data'
      }
    ],
    defaultOutputs: [
      {
        name: 'Response',
        type: 'object',
        side: 'output',
        required: false,
        description: 'API response'
      }
    ],
    defaultConfig: {
      url: '',
      method: 'POST'
    }
  }
];

// ============================================================================
// CONNECTOR Elements (4 total)
// ============================================================================

export const CONNECTOR_ELEMENTS: ElementDefinition[] = [
  {
    id: 'connector-convert',
    name: 'Convert',
    icon: '🔀',
    category: 'connector',
    description: 'Convert between types',
    complexity: 'simple',
    defaultWidth: 140,
    defaultHeight: 100,
    defaultInputs: [
      {
        name: 'Input',
        type: 'any',
        side: 'input',
        required: true,
        description: 'Value to convert'
      }
    ],
    defaultOutputs: [
      {
        name: 'Output',
        type: 'any',
        side: 'output',
        required: false,
        description: 'Converted value'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'connector-merge',
    name: 'Merge',
    icon: '🔗',
    category: 'connector',
    description: 'Combine multiple inputs',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 140,
    defaultInputs: [
      {
        name: 'Input 1',
        type: 'any',
        side: 'input',
        required: true,
        description: 'First input'
      },
      {
        name: 'Input 2',
        type: 'any',
        side: 'input',
        required: true,
        description: 'Second input'
      }
    ],
    defaultOutputs: [
      {
        name: 'Merged',
        type: 'object',
        side: 'output',
        required: false,
        description: 'Combined output'
      }
    ],
    defaultConfig: {}
  },
  {
    id: 'connector-delay',
    name: 'Delay',
    icon: '⏱️',
    category: 'connector',
    description: 'Add time delay',
    complexity: 'simple',
    defaultWidth: 140,
    defaultHeight: 100,
    defaultInputs: [
      {
        name: 'Trigger',
        type: 'event',
        side: 'input',
        required: true,
        description: 'Input event'
      }
    ],
    defaultOutputs: [
      {
        name: 'Delayed',
        type: 'event',
        side: 'output',
        required: false,
        description: 'After delay'
      }
    ],
    defaultConfig: {
      delayMs: 1000
    }
  },
  {
    id: 'connector-error',
    name: 'Error Handler',
    icon: '⚠️',
    category: 'connector',
    description: 'Handle errors',
    complexity: 'medium',
    defaultWidth: 160,
    defaultHeight: 120,
    defaultInputs: [
      {
        name: 'Try',
        type: 'event',
        side: 'input',
        required: true,
        description: 'Try this'
      }
    ],
    defaultOutputs: [
      {
        name: 'Success',
        type: 'event',
        side: 'output',
        required: false,
        description: 'If successful'
      },
      {
        name: 'Error',
        type: 'event',
        side: 'output',
        required: false,
        description: 'If error occurs'
      }
    ],
    defaultConfig: {}
  }
];

/**
 * Complete element library (48 total)
 */
export const ELEMENT_LIBRARY: ElementDefinition[] = [
  ...TRIGGER_ELEMENTS,       // 5
  ...COLLECTOR_ELEMENTS,     // 8
  ...TRANSFORMER_ELEMENTS,   // 10
  ...ROUTER_ELEMENTS,        // 5
  ...STORAGE_ELEMENTS,       // 3
  ...DISPLAY_ELEMENTS,       // 5
  ...ACTION_ELEMENTS,        // 8
  ...CONNECTOR_ELEMENTS,     // 4
]; // Total: 48 elements

/**
 * Get all elements (48 total)
 */
export function getAllElements(): ElementDefinition[] {
  return ELEMENT_LIBRARY;
}

/**
 * Get elements by category
 */
export function getElementsByCategory(category: ElementCategory): ElementDefinition[] {
  return getAllElements().filter(el => el.category === category);
}

/**
 * Get element by ID
 */
export function getElementDefinition(id: string): ElementDefinition | undefined {
  return getAllElements().find(el => el.id === id);
}
