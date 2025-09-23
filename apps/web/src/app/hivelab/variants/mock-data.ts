import type { Element } from '@hive/core';
import { 
  Type, 
  KeyRound as InputIcon, 
  Container,
  BarChart3
} from 'lucide-react';

// Mock elements for the tool builder  
export const mockElements: Element[] = [
  {
    id: 'textBlock-v1',
    name: 'Text Block',
    type: 'textBlock',
    category: 'Display & Layout',
    description: 'Display text content with formatting options',
    icon: 'Type',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        content: { type: 'string', default: 'Sample text' },
        fontSize: { type: 'string', default: '16px' },
        color: { type: 'string', default: '#000000' },
        fontWeight: { type: 'string', default: 'normal' },
        textAlign: { type: 'string', default: 'left' },
      }
    }),
    defaultConfig: {
      content: 'Sample text',
      fontSize: '16px',
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'left',
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  {
    id: 'button-v1',
    name: 'Button',
    type: 'button',
    category: 'Inputs & Choices',
    description: 'Interactive button with click actions',
    icon: 'Square',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', default: 'Button' },
        variant: { type: 'string', default: 'primary' },
        size: { type: 'string', default: 'medium' },
        disabled: { type: 'boolean', default: false },
      }
    }),
    defaultConfig: {
      label: 'Button',
      variant: 'primary',
      size: 'medium',
      disabled: false,
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'textInput-v1',
    name: 'Text Input',
    type: 'textInput',
    category: 'Inputs & Choices',
    description: 'Text input field for user data',
    icon: 'KeyRound',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', default: '' },
        placeholder: { type: 'string', default: 'Enter text...' },
        type: { type: 'string', default: 'text' },
        required: { type: 'boolean', default: false },
        disabled: { type: 'boolean', default: false },
      }
    }),
    defaultConfig: {
      label: '',
      placeholder: 'Enter text...',
      type: 'text',
      required: false,
      disabled: false,
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Element categories for organization
export const elementCategories = [
  { id: 'all', name: 'All Elements', icon: Container },
  { id: 'Display & Layout', name: 'Display & Layout', icon: Type },
  { id: 'Inputs & Choices', name: 'Inputs & Choices', icon: InputIcon },
  { id: 'Logic & Dynamics', name: 'Logic & Dynamics', icon: BarChart3 },
] as const;

// Mock templates for template mode
export const mockTemplates = [
  {
    id: 'text-template',
    name: 'Simple Text',
    description: 'Basic text display template',
    category: 'Display & Layout',
    elements: ['textBlock-v1'],
    config: {},
  },
  {
    id: 'form-template',
    name: 'Contact Form',
    description: 'Simple contact form template',
    category: 'Inputs & Choices',
    elements: ['textBlock-v1', 'textInput-v1', 'button-v1'],
    config: {},
  },
];