import type { Element } from '@hive/core';
import { 
  Type, 
  Button as ButtonIcon, 
  Input, 
  Image, 
  Container,
  Calendar,
  BarChart3,
  MessageSquare,
  Star as _Star,
  CheckSquare as _CheckSquare,
  Radio as _Radio,
  Slider as _Slider,
  Toggle as _Toggle,
  FileText as _FileText
} from 'lucide-react';

// Mock elements for the tool builder
export const mockElements: Element[] = [
  {
    id: 'text',
    name: 'Text',
    description: 'Display text content with formatting options',
    category: 'basic',
    icon: Type,
    color: '#3B82F6',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        content: { type: 'string', default: 'Sample text' },
        fontSize: { type: 'string', default: '16px' },
        color: { type: 'string', default: '#000000' },
        fontWeight: { type: 'string', default: 'normal' },
        textAlign: { type: 'string', default: 'left' },
      },
      events: ['onClick', 'onHover'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      content: 'Sample text',
      fontSize: '16px',
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left',
    },
    previewComponent: 'TextPreview',
    runtimeComponent: 'TextRuntime',
    configComponent: 'TextConfig',
    tags: ['text', 'content', 'basic'],
    documentation: {
      description: 'A basic text element for displaying formatted text content',
      examples: [
        {
          name: 'Basic Text',
          config: { content: 'Hello World' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  {
    id: 'button',
    name: 'Button',
    description: 'Interactive button with click actions',
    category: 'input',
    icon: ButtonIcon,
    color: '#10B981',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        label: { type: 'string', default: 'Button' },
        variant: { type: 'string', default: 'default' },
        size: { type: 'string', default: 'default' },
        disabled: { type: 'boolean', default: false },
        onClick: { type: 'function', default: null },
      },
      events: ['onClick', 'onHover', 'onFocus'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      label: 'Button',
      variant: 'default',
      size: 'default',
      disabled: false,
    },
    previewComponent: 'ButtonPreview',
    runtimeComponent: 'ButtonRuntime',
    configComponent: 'ButtonConfig',
    tags: ['button', 'action', 'interactive'],
    documentation: {
      description: 'An interactive button element that can trigger actions',
      examples: [
        {
          name: 'Primary Button',
          config: { label: 'Submit', variant: 'primary' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'input',
    name: 'Input Field',
    description: 'Text input field for user data',
    category: 'input',
    icon: Input,
    color: '#F59E0B',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        label: { type: 'string', default: '' },
        placeholder: { type: 'string', default: 'Enter text...' },
        type: { type: 'string', default: 'text' },
        required: { type: 'boolean', default: false },
        disabled: { type: 'boolean', default: false },
      },
      events: ['onChange', 'onFocus', 'onBlur'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      label: '',
      placeholder: 'Enter text...',
      type: 'text',
      required: false,
      disabled: false,
    },
    previewComponent: 'InputPreview',
    runtimeComponent: 'InputRuntime',
    configComponent: 'InputConfig',
    tags: ['input', 'form', 'text'],
    documentation: {
      description: 'A form input field for collecting user text input',
      examples: [
        {
          name: 'Email Input',
          config: { label: 'Email', type: 'email', placeholder: 'your@email.com' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'image',
    name: 'Image',
    description: 'Display images with styling options',
    category: 'media',
    icon: Image,
    color: '#8B5CF6',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        src: { type: 'string', default: '' },
        alt: { type: 'string', default: '' },
        width: { type: 'string', default: 'auto' },
        height: { type: 'string', default: 'auto' },
        borderRadius: { type: 'string', default: '0px' },
      },
      events: ['onClick', 'onLoad', 'onError'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      src: '',
      alt: '',
      width: 'auto',
      height: 'auto',
      borderRadius: '0px',
    },
    previewComponent: 'ImagePreview',
    runtimeComponent: 'ImageRuntime',
    configComponent: 'ImageConfig',
    tags: ['image', 'media', 'visual'],
    documentation: {
      description: 'An image element for displaying pictures and graphics',
      examples: [
        {
          name: 'Profile Picture',
          config: { alt: 'Profile', borderRadius: '50%' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'container',
    name: 'Container',
    description: 'Layout container for grouping elements',
    category: 'layout',
    icon: Container,
    color: '#EF4444',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        title: { type: 'string', default: '' },
        padding: { type: 'string', default: '16px' },
        backgroundColor: { type: 'string', default: 'transparent' },
        borderRadius: { type: 'string', default: '0px' },
        border: { type: 'string', default: 'none' },
      },
      events: ['onClick'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      title: '',
      padding: '16px',
      backgroundColor: 'transparent',
      borderRadius: '0px',
      border: 'none',
    },
    previewComponent: 'ContainerPreview',
    runtimeComponent: 'ContainerRuntime',
    configComponent: 'ContainerConfig',
    tags: ['container', 'layout', 'group'],
    documentation: {
      description: 'A layout container for organizing and grouping other elements',
      examples: [
        {
          name: 'Card Container',
          config: { backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '24px' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Interactive calendar for date selection',
    category: 'advanced',
    icon: Calendar,
    color: '#06B6D4',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        defaultDate: { type: 'string', default: '' },
        minDate: { type: 'string', default: '' },
        maxDate: { type: 'string', default: '' },
        allowMultiple: { type: 'boolean', default: false },
        showWeekNumbers: { type: 'boolean', default: false },
      },
      events: ['onDateSelect', 'onMonthChange'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      defaultDate: '',
      minDate: '',
      maxDate: '',
      allowMultiple: false,
      showWeekNumbers: false,
    },
    previewComponent: 'CalendarPreview',
    runtimeComponent: 'CalendarRuntime',
    configComponent: 'CalendarConfig',
    tags: ['calendar', 'date', 'picker', 'advanced'],
    documentation: {
      description: 'An interactive calendar component for date selection',
      examples: [
        {
          name: 'Event Scheduler',
          config: { allowMultiple: true, showWeekNumbers: true }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'chart',
    name: 'Chart',
    description: 'Data visualization charts',
    category: 'advanced',
    icon: BarChart3,
    color: '#84CC16',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        type: { type: 'string', default: 'bar' },
        data: { type: 'array', default: [] },
        title: { type: 'string', default: 'Chart' },
        xAxisLabel: { type: 'string', default: '' },
        yAxisLabel: { type: 'string', default: '' },
      },
      events: ['onDataPointClick'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      type: 'bar',
      data: [],
      title: 'Chart',
      xAxisLabel: '',
      yAxisLabel: '',
    },
    previewComponent: 'ChartPreview',
    runtimeComponent: 'ChartRuntime',
    configComponent: 'ChartConfig',
    tags: ['chart', 'data', 'visualization', 'advanced'],
    documentation: {
      description: 'A chart component for data visualization',
      examples: [
        {
          name: 'Sales Chart',
          config: { type: 'line', title: 'Monthly Sales', xAxisLabel: 'Month', yAxisLabel: 'Sales ($)' }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'poll',
    name: 'Poll',
    description: 'Interactive poll for collecting votes',
    category: 'social',
    icon: MessageSquare,
    color: '#F97316',
    version: '1.0.0',
    isDeprecated: false,
    schema: {
      config: {
        question: { type: 'string', default: 'What do you think?' },
        options: { type: 'array', default: ['Option 1', 'Option 2'] },
        allowMultiple: { type: 'boolean', default: false },
        showResults: { type: 'boolean', default: true },
        anonymous: { type: 'boolean', default: false },
      },
      events: ['onVote', 'onResultsView'],
      props: [],
      validation: {}
    },
    defaultConfig: {
      question: 'What do you think?',
      options: ['Option 1', 'Option 2'],
      allowMultiple: false,
      showResults: true,
      anonymous: false,
    },
    previewComponent: 'PollPreview',
    runtimeComponent: 'PollRuntime',
    configComponent: 'PollConfig',
    tags: ['poll', 'voting', 'social', 'interactive'],
    documentation: {
      description: 'An interactive poll component for collecting user votes',
      examples: [
        {
          name: 'Multiple Choice Poll',
          config: { question: 'What\'s your favorite color?', options: ['Red', 'Blue', 'Green', 'Yellow'] }
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Element categories for organization
export const elementCategories = [
  { id: 'all', name: 'All Elements', icon: Container },
  { id: 'basic', name: 'Basic', icon: Type },
  { id: 'input', name: 'Input', icon: Input },
  { id: 'layout', name: 'Layout', icon: Container },
  { id: 'media', name: 'Media', icon: Image },
  { id: 'social', name: 'Social', icon: MessageSquare },
  { id: 'advanced', name: 'Advanced', icon: BarChart3 },
] as const;

// Mock templates for template mode
export const mockTemplates = [
  {
    id: 'poll-template',
    name: 'Poll Creator',
    description: 'Quick poll creation template',
    category: 'social',
    elements: ['poll', 'text', 'button'],
    config: {},
  },
  {
    id: 'form-template',
    name: 'Contact Form',
    description: 'Simple contact form template',
    category: 'input',
    elements: ['text', 'input', 'button'],
    config: {},
  },
  {
    id: 'dashboard-template',
    name: 'Analytics Dashboard',
    description: 'Data visualization dashboard',
    category: 'advanced',
    elements: ['chart', 'text', 'container'],
    config: {},
  },
];