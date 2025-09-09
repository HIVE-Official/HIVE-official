/**
 * Element Registry - Central registry for all HIVE elements
 */

import { Element, ElementType, ElementCategory, DataType } from './tool';

/**
 * Built-in HIVE Elements Library
 */
export const HIVE_ELEMENTS: Element[] = [
  // ============================================
  // INPUT ELEMENTS
  // ============================================
  {
    id: 'text-input',
    type: 'text-input',
    category: 'input',
    name: 'Text Input',
    description: 'Single-line text input field',
    icon: 'Type',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        placeholder: { type: 'string', label: 'Placeholder' },
        required: { type: 'boolean', label: 'Required' },
        maxLength: { type: 'number', label: 'Max Length' },
        pattern: { type: 'string', label: 'Validation Pattern' }
      }
    },
    defaultConfig: {
      label: 'Text Input',
      placeholder: 'Enter text...',
      required: false
    },
    outputs: [
      { id: 'value', name: 'Value', type: 'string' }
    ],
    events: [
      { id: 'onChange', name: 'On Change', payload: 'string' },
      { id: 'onBlur', name: 'On Blur', payload: 'string' }
    ],
    rendering: {
      component: 'TextInput'
    }
  },
  {
    id: 'number-input',
    type: 'number-input',
    category: 'input',
    name: 'Number Input',
    description: 'Numeric input field',
    icon: 'Hash',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        placeholder: { type: 'string', label: 'Placeholder' },
        min: { type: 'number', label: 'Minimum' },
        max: { type: 'number', label: 'Maximum' },
        step: { type: 'number', label: 'Step' },
        required: { type: 'boolean', label: 'Required' }
      }
    },
    defaultConfig: {
      label: 'Number',
      placeholder: '0'
    },
    outputs: [
      { id: 'value', name: 'Value', type: 'number' }
    ],
    events: [
      { id: 'onChange', name: 'On Change', payload: 'number' }
    ],
    rendering: {
      component: 'NumberInput'
    }
  },
  {
    id: 'date-picker',
    type: 'date-picker',
    category: 'input',
    name: 'Date Picker',
    description: 'Calendar date selector',
    icon: 'Calendar',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        minDate: { type: 'date', label: 'Min Date' },
        maxDate: { type: 'date', label: 'Max Date' },
        required: { type: 'boolean', label: 'Required' }
      }
    },
    defaultConfig: {
      label: 'Select Date'
    },
    outputs: [
      { id: 'value', name: 'Value', type: 'date' }
    ],
    events: [
      { id: 'onChange', name: 'On Change', payload: 'date' }
    ],
    rendering: {
      component: 'DatePicker'
    }
  },
  {
    id: 'dropdown',
    type: 'dropdown',
    category: 'input',
    name: 'Dropdown',
    description: 'Select from list of options',
    icon: 'ChevronDown',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        options: { type: 'array', label: 'Options' },
        multiple: { type: 'boolean', label: 'Multiple Selection' },
        searchable: { type: 'boolean', label: 'Searchable' },
        required: { type: 'boolean', label: 'Required' }
      }
    },
    defaultConfig: {
      label: 'Select Option',
      options: ['Option 1', 'Option 2', 'Option 3'],
      multiple: false
    },
    outputs: [
      { id: 'value', name: 'Value', type: 'any' }
    ],
    events: [
      { id: 'onChange', name: 'On Change', payload: 'any' }
    ],
    rendering: {
      component: 'Dropdown'
    }
  },
  {
    id: 'checkbox',
    type: 'checkbox',
    category: 'input',
    name: 'Checkbox',
    description: 'Boolean checkbox input',
    icon: 'CheckSquare',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        defaultChecked: { type: 'boolean', label: 'Default Checked' }
      }
    },
    defaultConfig: {
      label: 'Check this',
      defaultChecked: false
    },
    outputs: [
      { id: 'value', name: 'Value', type: 'boolean' }
    ],
    events: [
      { id: 'onChange', name: 'On Change', payload: 'boolean' }
    ],
    rendering: {
      component: 'Checkbox'
    }
  },
  {
    id: 'file-upload',
    type: 'file-upload',
    category: 'input',
    name: 'File Upload',
    description: 'Upload files',
    icon: 'Upload',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        accept: { type: 'string', label: 'Accepted Types' },
        multiple: { type: 'boolean', label: 'Multiple Files' },
        maxSize: { type: 'number', label: 'Max Size (MB)' }
      }
    },
    defaultConfig: {
      label: 'Upload File',
      accept: '*',
      multiple: false,
      maxSize: 10
    },
    outputs: [
      { id: 'files', name: 'Files', type: 'array' }
    ],
    events: [
      { id: 'onUpload', name: 'On Upload', payload: 'array' }
    ],
    rendering: {
      component: 'FileUpload'
    }
  },

  // ============================================
  // DISPLAY ELEMENTS
  // ============================================
  {
    id: 'display-text',
    type: 'display-text',
    category: 'display',
    name: 'Text Display',
    description: 'Display text content',
    icon: 'Type',
    version: '1.0.0',
    configSchema: {
      properties: {
        text: { type: 'string', label: 'Text' },
        variant: { 
          type: 'string', 
          label: 'Variant',
          enum: ['h1', 'h2', 'h3', 'body', 'caption']
        },
        color: { type: 'string', label: 'Color' }
      }
    },
    defaultConfig: {
      text: 'Display Text',
      variant: 'body'
    },
    inputs: [
      { id: 'text', name: 'Text', type: 'string' }
    ],
    rendering: {
      component: 'TextDisplay'
    }
  },
  {
    id: 'display-image',
    type: 'display-image',
    category: 'display',
    name: 'Image Display',
    description: 'Display images',
    icon: 'Image',
    version: '1.0.0',
    configSchema: {
      properties: {
        src: { type: 'string', label: 'Image URL' },
        alt: { type: 'string', label: 'Alt Text' },
        width: { type: 'number', label: 'Width' },
        height: { type: 'number', label: 'Height' },
        objectFit: { 
          type: 'string', 
          label: 'Object Fit',
          enum: ['contain', 'cover', 'fill', 'none']
        }
      }
    },
    defaultConfig: {
      alt: 'Image',
      objectFit: 'cover'
    },
    inputs: [
      { id: 'src', name: 'Source', type: 'string' }
    ],
    rendering: {
      component: 'ImageDisplay'
    }
  },
  {
    id: 'display-chart',
    type: 'display-chart',
    category: 'display',
    name: 'Chart',
    description: 'Display data charts',
    icon: 'BarChart',
    version: '1.0.0',
    configSchema: {
      properties: {
        type: { 
          type: 'string', 
          label: 'Chart Type',
          enum: ['bar', 'line', 'pie', 'donut', 'area']
        },
        title: { type: 'string', label: 'Title' },
        xAxis: { type: 'string', label: 'X Axis Label' },
        yAxis: { type: 'string', label: 'Y Axis Label' }
      }
    },
    defaultConfig: {
      type: 'bar',
      title: 'Chart'
    },
    inputs: [
      { id: 'data', name: 'Data', type: 'array' }
    ],
    rendering: {
      component: 'ChartDisplay'
    }
  },
  {
    id: 'display-table',
    type: 'display-table',
    category: 'display',
    name: 'Table',
    description: 'Display tabular data',
    icon: 'Table',
    version: '1.0.0',
    configSchema: {
      properties: {
        columns: { type: 'array', label: 'Columns' },
        sortable: { type: 'boolean', label: 'Sortable' },
        searchable: { type: 'boolean', label: 'Searchable' },
        pagination: { type: 'boolean', label: 'Pagination' }
      }
    },
    defaultConfig: {
      columns: [],
      sortable: true,
      searchable: false,
      pagination: true
    },
    inputs: [
      { id: 'data', name: 'Data', type: 'array' }
    ],
    rendering: {
      component: 'TableDisplay'
    }
  },

  // ============================================
  // ACTION ELEMENTS
  // ============================================
  {
    id: 'button',
    type: 'button',
    category: 'action',
    name: 'Button',
    description: 'Clickable button',
    icon: 'MousePointer',
    version: '1.0.0',
    configSchema: {
      properties: {
        label: { type: 'string', label: 'Label' },
        variant: { 
          type: 'string', 
          label: 'Variant',
          enum: ['primary', 'secondary', 'outline', 'ghost', 'danger']
        },
        disabled: { type: 'boolean', label: 'Disabled' },
        loading: { type: 'boolean', label: 'Loading' }
      }
    },
    defaultConfig: {
      label: 'Click Me',
      variant: 'primary'
    },
    events: [
      { id: 'onClick', name: 'On Click' }
    ],
    rendering: {
      component: 'Button'
    }
  },
  {
    id: 'link',
    type: 'link',
    category: 'action',
    name: 'Link',
    description: 'Clickable link',
    icon: 'Link',
    version: '1.0.0',
    configSchema: {
      properties: {
        text: { type: 'string', label: 'Text' },
        href: { type: 'string', label: 'URL' },
        target: { 
          type: 'string', 
          label: 'Target',
          enum: ['_self', '_blank', '_parent', '_top']
        }
      }
    },
    defaultConfig: {
      text: 'Click here',
      href: '#',
      target: '_self'
    },
    rendering: {
      component: 'Link'
    }
  },
  {
    id: 'timer',
    type: 'timer',
    category: 'action',
    name: 'Timer',
    description: 'Countdown or stopwatch timer',
    icon: 'Clock',
    version: '1.0.0',
    configSchema: {
      properties: {
        type: { 
          type: 'string', 
          label: 'Type',
          enum: ['countdown', 'stopwatch']
        },
        duration: { type: 'number', label: 'Duration (seconds)' },
        autoStart: { type: 'boolean', label: 'Auto Start' }
      }
    },
    defaultConfig: {
      type: 'countdown',
      duration: 60,
      autoStart: false
    },
    outputs: [
      { id: 'remaining', name: 'Remaining', type: 'number' }
    ],
    events: [
      { id: 'onComplete', name: 'On Complete' },
      { id: 'onTick', name: 'On Tick', payload: 'number' }
    ],
    rendering: {
      component: 'Timer'
    }
  },

  // ============================================
  // LOGIC ELEMENTS
  // ============================================
  {
    id: 'condition',
    type: 'condition',
    category: 'logic',
    name: 'Condition',
    description: 'If-then-else logic',
    icon: 'GitBranch',
    version: '1.0.0',
    configSchema: {
      properties: {
        condition: { type: 'string', label: 'Condition' },
        operator: { 
          type: 'string', 
          label: 'Operator',
          enum: ['equals', 'not-equals', 'greater', 'less', 'contains']
        }
      }
    },
    defaultConfig: {
      operator: 'equals'
    },
    inputs: [
      { id: 'value', name: 'Value', type: 'any' },
      { id: 'compare', name: 'Compare To', type: 'any' }
    ],
    outputs: [
      { id: 'true', name: 'True', type: 'any' },
      { id: 'false', name: 'False', type: 'any' }
    ],
    rendering: {
      component: 'Condition'
    }
  },
  {
    id: 'calculation',
    type: 'calculation',
    category: 'logic',
    name: 'Calculator',
    description: 'Perform calculations',
    icon: 'Calculator',
    version: '1.0.0',
    configSchema: {
      properties: {
        operation: { 
          type: 'string', 
          label: 'Operation',
          enum: ['add', 'subtract', 'multiply', 'divide', 'modulo']
        }
      }
    },
    defaultConfig: {
      operation: 'add'
    },
    inputs: [
      { id: 'a', name: 'A', type: 'number' },
      { id: 'b', name: 'B', type: 'number' }
    ],
    outputs: [
      { id: 'result', name: 'Result', type: 'number' }
    ],
    rendering: {
      component: 'Calculator'
    }
  },

  // ============================================
  // LAYOUT ELEMENTS
  // ============================================
  {
    id: 'container',
    type: 'container',
    category: 'layout',
    name: 'Container',
    description: 'Group elements together',
    icon: 'Box',
    version: '1.0.0',
    configSchema: {
      properties: {
        padding: { type: 'number', label: 'Padding' },
        margin: { type: 'number', label: 'Margin' },
        border: { type: 'boolean', label: 'Show Border' },
        background: { type: 'string', label: 'Background Color' }
      }
    },
    defaultConfig: {
      padding: 16,
      margin: 0,
      border: false
    },
    rendering: {
      component: 'Container'
    }
  },
  {
    id: 'grid',
    type: 'grid',
    category: 'layout',
    name: 'Grid',
    description: 'Grid layout container',
    icon: 'Grid',
    version: '1.0.0',
    configSchema: {
      properties: {
        columns: { type: 'number', label: 'Columns' },
        gap: { type: 'number', label: 'Gap' },
        responsive: { type: 'boolean', label: 'Responsive' }
      }
    },
    defaultConfig: {
      columns: 2,
      gap: 16,
      responsive: true
    },
    rendering: {
      component: 'GridLayout'
    }
  },
  {
    id: 'tabs',
    type: 'tabs',
    category: 'layout',
    name: 'Tabs',
    description: 'Tabbed container',
    icon: 'Layers',
    version: '1.0.0',
    configSchema: {
      properties: {
        tabs: { type: 'array', label: 'Tab Names' },
        defaultTab: { type: 'number', label: 'Default Tab' }
      }
    },
    defaultConfig: {
      tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
      defaultTab: 0
    },
    rendering: {
      component: 'TabsLayout'
    }
  }
];

/**
 * Element Registry Class
 */
export class ElementRegistry {
  private static instance: ElementRegistry;
  private elements: Map<string, Element> = new Map();

  private constructor() {
    // Register all built-in elements
    this.registerBuiltInElements();
  }

  static getInstance(): ElementRegistry {
    if (!ElementRegistry.instance) {
      ElementRegistry.instance = new ElementRegistry();
    }
    return ElementRegistry.instance;
  }

  private registerBuiltInElements() {
    HIVE_ELEMENTS.forEach(element => {
      this.registerElement(element);
    });
  }

  registerElement(element: Element) {
    this.elements.set(element.id, element);
  }

  getElement(id: string): Element | undefined {
    return this.elements.get(id);
  }

  getElementsByCategory(category: ElementCategory): Element[] {
    return Array.from(this.elements.values()).filter(el => el.category === category);
  }

  getElementsByType(type: ElementType): Element[] {
    return Array.from(this.elements.values()).filter(el => el.type === type);
  }

  searchElements(query: string): Element[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.elements.values()).filter(el => 
      el.name.toLowerCase().includes(lowerQuery) ||
      el.description.toLowerCase().includes(lowerQuery) ||
      el.type.includes(lowerQuery)
    );
  }

  getAllElements(): Element[] {
    return Array.from(this.elements.values());
  }

  getCategories(): ElementCategory[] {
    const categories = new Set<ElementCategory>();
    this.elements.forEach(el => categories.add(el.category));
    return Array.from(categories);
  }

  // Validate if elements can be connected
  canConnect(fromElement: string, fromPort: string, toElement: string, toPort: string): boolean {
    const from = this.getElement(fromElement);
    const to = this.getElement(toElement);
    
    if (!from || !to) return false;
    
    const output = from.outputs?.find(o => o.id === fromPort);
    const input = to.inputs?.find(i => i.id === toPort);
    
    if (!output || !input) return false;
    
    // Check type compatibility
    return this.areTypesCompatible(output.type, input.type);
  }

  private areTypesCompatible(outputType: DataType, inputType: DataType): boolean {
    if (outputType === inputType) return true;
    if (outputType === 'any' || inputType === 'any') return true;
    
    // Add more sophisticated type checking here
    const compatibilityMap: Record<DataType, DataType[]> = {
      'string': ['string', 'any'],
      'number': ['number', 'string', 'any'],
      'boolean': ['boolean', 'string', 'any'],
      'date': ['date', 'string', 'any'],
      'array': ['array', 'any'],
      'object': ['object', 'any'],
      'file': ['file', 'any'],
      'any': ['string', 'number', 'boolean', 'date', 'array', 'object', 'file', 'any']
    };
    
    return compatibilityMap[outputType]?.includes(inputType) || false;
  }
}