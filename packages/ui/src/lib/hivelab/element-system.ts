// HIVE Element System - Composable building blocks for tools
import { renderElement } from '../../components/hivelab/element-renderers';

export interface ElementProps {
  id: string;
  config: Record<string, any>;
  data?: any;
  onChange?: (data: any) => void;
  onAction?: (action: string, payload: any) => void;
}

export interface ElementDefinition {
  id: string;
  name: string;
  description: string;
  category: 'input' | 'display' | 'filter' | 'action' | 'layout';
  icon: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  render: (props: ElementProps) => JSX.Element;
}

export interface ToolComposition {
  id: string;
  name: string;
  description: string;
  elements: {
    elementId: string;
    instanceId: string;
    config: Record<string, any>;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }[];
  connections: {
    from: { instanceId: string; output: string };
    to: { instanceId: string; input: string };
  }[];
  layout: 'grid' | 'flow' | 'tabs' | 'sidebar';
}

// Core Element Registry
export class ElementRegistry {
  private static instance: ElementRegistry;
  private elements: Map<string, ElementDefinition> = new Map();

  static getInstance(): ElementRegistry {
    if (!ElementRegistry.instance) {
      ElementRegistry.instance = new ElementRegistry();
    }
    return ElementRegistry.instance;
  }

  registerElement(element: ElementDefinition) {
    this.elements.set(element.id, element);
  }

  getElement(id: string): ElementDefinition | undefined {
    return this.elements.get(id);
  }

  getElementsByCategory(category: string): ElementDefinition[] {
    return Array.from(this.elements.values()).filter(el => el.category === category);
  }

  getAllElements(): ElementDefinition[] {
    return Array.from(this.elements.values());
  }
}

// Element Execution Engine
export class ElementEngine {
  private compositions: Map<string, ToolComposition> = new Map();
  private elementStates: Map<string, any> = new Map();

  executeComposition(composition: ToolComposition) {
    // Initialize element states
    for (const element of composition.elements) {
      this.elementStates.set(element.instanceId, {});
    }

    // Process connections and data flow
    this.processDataFlow(composition);
  }

  private processDataFlow(composition: ToolComposition) {
    const processed = new Set<string>();
    const processing = new Set<string>();

    const processElement = (instanceId: string) => {
      if (processed.has(instanceId)) return;
      if (processing.has(instanceId)) {
        throw new Error(`Circular dependency detected involving ${instanceId}`);
      }

      processing.add(instanceId);

      // Find all inputs for this element
      const inputs = composition.connections.filter(conn => conn.to.instanceId === instanceId);
      
      // Process all input dependencies first
      for (const input of inputs) {
        processElement(input.from.instanceId);
      }

      // Now process this element
      const elementConfig = composition.elements.find(el => el.instanceId === instanceId);
      if (elementConfig) {
        const elementDef = ElementRegistry.getInstance().getElement(elementConfig.elementId);
        if (elementDef) {
          // Execute element logic here
        }
      }

      processing.delete(instanceId);
      processed.add(instanceId);
    };

    // Process all elements
    for (const element of composition.elements) {
      processElement(element.instanceId);
    }
  }
}

// Predefined Element Templates
export const CORE_ELEMENTS: ElementDefinition[] = [
  {
    id: 'search-input',
    name: 'Search Input',
    description: 'Text input for search queries with autocomplete',
    category: 'input',
    icon: 'Search',
    configSchema: {
      placeholder: { type: 'string', default: 'Search...' },
      showSuggestions: { type: 'boolean', default: true },
      debounceMs: { type: 'number', default: 300 }
    },
    defaultConfig: {
      placeholder: 'Search...',
      showSuggestions: true,
      debounceMs: 300
    },
    render: (props) => renderElement('search-input', props)
  },
  
  {
    id: 'filter-selector',
    name: 'Filter Selector',
    description: 'Multi-select filter with categories',
    category: 'filter',
    icon: 'Filter',
    configSchema: {
      options: { type: 'array', default: [] },
      allowMultiple: { type: 'boolean', default: true },
      showCounts: { type: 'boolean', default: false }
    },
    defaultConfig: {
      options: [],
      allowMultiple: true,
      showCounts: false
    },
    render: (props) => renderElement('filter-selector', props)
  },

  {
    id: 'result-list',
    name: 'Result List',
    description: 'Displays search results in a list format',
    category: 'display',
    icon: 'List',
    configSchema: {
      itemsPerPage: { type: 'number', default: 10 },
      showPagination: { type: 'boolean', default: true },
      cardStyle: { type: 'string', default: 'standard' }
    },
    defaultConfig: {
      itemsPerPage: 10,
      showPagination: true,
      cardStyle: 'standard'
    },
    render: (props) => renderElement('result-list', props)
  },

  {
    id: 'date-picker',
    name: 'Date Picker',
    description: 'Date and time selection component',
    category: 'input',
    icon: 'Calendar',
    configSchema: {
      includeTime: { type: 'boolean', default: false },
      allowRange: { type: 'boolean', default: false },
      minDate: { type: 'string', default: '' },
      maxDate: { type: 'string', default: '' }
    },
    defaultConfig: {
      includeTime: false,
      allowRange: false,
      minDate: '',
      maxDate: ''
    },
    render: (props) => renderElement('date-picker', props)
  },

  {
    id: 'user-selector',
    name: 'User Selector',
    description: 'Select users from the platform',
    category: 'input',
    icon: 'Users',
    configSchema: {
      allowMultiple: { type: 'boolean', default: false },
      filterBySpace: { type: 'boolean', default: false },
      showAvatars: { type: 'boolean', default: true }
    },
    defaultConfig: {
      allowMultiple: false,
      filterBySpace: false,
      showAvatars: true
    },
    render: (props) => renderElement('user-selector', props)
  },

  {
    id: 'tag-cloud',
    name: 'Tag Cloud',
    description: 'Visual display of tags with frequency weighting',
    category: 'display',
    icon: 'Tag',
    configSchema: {
      maxTags: { type: 'number', default: 50 },
      sortBy: { type: 'string', default: 'frequency' },
      showCounts: { type: 'boolean', default: true }
    },
    defaultConfig: {
      maxTags: 50,
      sortBy: 'frequency',
      showCounts: true
    },
    render: (props) => renderElement('chart-display', props)
  },

  {
    id: 'map-view',
    name: 'Map View',
    description: 'Geographic map for location-based features',
    category: 'display',
    icon: 'Map',
    configSchema: {
      defaultZoom: { type: 'number', default: 10 },
      allowMarkers: { type: 'boolean', default: true },
      showControls: { type: 'boolean', default: true }
    },
    defaultConfig: {
      defaultZoom: 10,
      allowMarkers: true,
      showControls: true
    },
    render: (props) => renderElement('chart-display', props)
  },

  {
    id: 'chart-display',
    name: 'Chart Display',
    description: 'Data visualization charts',
    category: 'display',
    icon: 'BarChart',
    configSchema: {
      chartType: { type: 'string', default: 'bar' },
      showLegend: { type: 'boolean', default: true },
      animate: { type: 'boolean', default: true }
    },
    defaultConfig: {
      chartType: 'bar',
      showLegend: true,
      animate: true
    },
    render: (props) => renderElement('chart-display', props)
  },

  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Dynamic form creation and validation',
    category: 'input',
    icon: 'FileText',
    configSchema: {
      fields: { type: 'array', default: [] },
      validateOnChange: { type: 'boolean', default: true },
      showProgress: { type: 'boolean', default: false }
    },
    defaultConfig: {
      fields: [],
      validateOnChange: true,
      showProgress: false
    },
    render: (props) => renderElement('form-builder', props)
  },

  {
    id: 'notification-center',
    name: 'Notification Center',
    description: 'Display and manage notifications',
    category: 'display',
    icon: 'Bell',
    configSchema: {
      maxNotifications: { type: 'number', default: 10 },
      groupByType: { type: 'boolean', default: true },
      autoMarkRead: { type: 'boolean', default: false }
    },
    defaultConfig: {
      maxNotifications: 10,
      groupByType: true,
      autoMarkRead: false
    },
    render: (props) => renderElement('result-list', props)
  }
];

// Tool Templates built from elements
export const TOOL_TEMPLATES: ToolComposition[] = [
  {
    id: 'basic-search-tool',
    name: 'Basic Search Tool',
    description: 'Simple search with filters and results',
    elements: [
      {
        elementId: 'search-input',
        instanceId: 'search-1',
        config: { placeholder: 'Search posts, people, and spaces...' },
        position: { x: 0, y: 0 },
        size: { width: 12, height: 1 }
      },
      {
        elementId: 'filter-selector',
        instanceId: 'filter-1',
        config: { 
          options: [
            { value: 'posts', label: 'Posts' },
            { value: 'users', label: 'Users' },
            { value: 'spaces', label: 'Spaces' }
          ]
        },
        position: { x: 0, y: 1 },
        size: { width: 4, height: 2 }
      },
      {
        elementId: 'result-list',
        instanceId: 'results-1',
        config: { itemsPerPage: 20 },
        position: { x: 4, y: 1 },
        size: { width: 8, height: 6 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'search-1', output: 'query' },
        to: { instanceId: 'results-1', input: 'searchQuery' }
      },
      {
        from: { instanceId: 'filter-1', output: 'selectedFilters' },
        to: { instanceId: 'results-1', input: 'filters' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'event-manager-tool',
    name: 'Event Manager Tool',
    description: 'Create and manage events with RSVP',
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'event-form',
        config: {
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: false },
            { name: 'location', type: 'text', required: false }
          ]
        },
        position: { x: 0, y: 0 },
        size: { width: 6, height: 4 }
      },
      {
        elementId: 'date-picker',
        instanceId: 'date-picker',
        config: { includeTime: true, allowRange: true },
        position: { x: 6, y: 0 },
        size: { width: 6, height: 2 }
      },
      {
        elementId: 'user-selector',
        instanceId: 'invitee-selector',
        config: { allowMultiple: true, showAvatars: true },
        position: { x: 6, y: 2 },
        size: { width: 6, height: 2 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'event-form', output: 'submittedData' },
        to: { instanceId: 'notification-center', input: 'pendingNotifications' }
      },
      {
        from: { instanceId: 'date-picker', output: 'selectedDate' },
        to: { instanceId: 'event-form', input: 'date' }
      },
      {
        from: { instanceId: 'invitee-selector', output: 'selectedUsers' },
        to: { instanceId: 'event-form', input: 'invitees' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Monitor performance metrics and trends',
    elements: [
      {
        elementId: 'chart-display',
        instanceId: 'chart-traffic',
        config: { chartType: 'line', showLegend: true },
        position: { x: 0, y: 0 },
        size: { width: 6, height: 3 }
      },
      {
        elementId: 'chart-display',
        instanceId: 'chart-engagement',
        config: { chartType: 'area', showLegend: false },
        position: { x: 6, y: 0 },
        size: { width: 6, height: 3 }
      },
      {
        elementId: 'result-list',
        instanceId: 'top-performers',
        config: { itemsPerPage: 10 },
        position: { x: 0, y: 3 },
        size: { width: 12, height: 3 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'chart-traffic', output: 'data' },
        to: { instanceId: 'chart-engagement', input: 'comparisonData' }
      },
      {
        from: { instanceId: 'top-performers', output: 'selection' },
        to: { instanceId: 'chart-traffic', input: 'filter' }
      }
    ],
    layout: 'grid'
  }
];

// Initialize the registry with core elements
export function initializeElementSystem() {
  const registry = ElementRegistry.getInstance();
  const existingElements = registry.getAllElements();
  
  if (existingElements.length === 0) {
    for (const element of CORE_ELEMENTS) {
      registry.registerElement(element);
    }
  }
  
  return registry;
}
