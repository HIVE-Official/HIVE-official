import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { Element } from '@hive/core/src/domain/creation/element';
import { ElementPicker } from './element-picker';
import { ElementCard } from './element-card';

const meta = {
  title: 'Creator/ElementPicker',
  component: ElementPicker,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onElementSelect: { action: 'element-selected' },
    isLoading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ElementPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockElements: Element[] = [
  {
    id: 'textBlock', name: 'Text Block', description: 'Basic text block for copy, labels, and headers.', icon: 'Text', category: 'Display & Layout',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'imageBlock', name: 'Image', description: 'Display a single image from a URL.', icon: 'Image', category: 'Display & Layout',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'divider', name: 'Divider', description: 'A visual separator for content.', icon: 'Minus', category: 'Display & Layout',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'stack', name: 'Stack', description: 'Group elements together vertically or horizontally.', icon: 'Layers', category: 'Display & Layout',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'button', name: 'Button', description: 'A clickable button for actions or links.', icon: 'MousePointerSquare', category: 'Inputs & Choices',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'choiceSelect', name: 'Choice Select', description: 'A multiple-choice or single-choice poll.', icon: 'ListChecks', category: 'Inputs & Choices',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'textInput', name: 'Text Input', description: 'A field for freeform text answers.', icon: 'Type', category: 'Inputs & Choices',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'ratingStars', name: 'Rating (Stars)', description: 'A 1-5 star rating input.', icon: 'Star', category: 'Inputs & Choices',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'countdownTimer', name: 'Countdown Timer', description: 'A timer that counts down to a specific date and time.', icon: 'Timer', category: 'Logic & Dynamics',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'progressBar', name: 'Progress Bar', description: 'A bar that shows progress towards a goal.', icon: 'ArrowRightLeft', category: 'Logic & Dynamics',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'conditionGate', name: 'Condition Gate', description: 'Shows or hides other elements based on a rule.', icon: 'GitPullRequestDraft', category: 'Logic & Dynamics',
    defaultConfig: {}, validationSchema: '',
  },
  {
    id: 'pingTrigger', name: 'Ping Trigger', description: 'Sends a notification or feed item when an event occurs.', icon: 'BellRing', category: 'Logic & Dynamics',
    defaultConfig: {}, validationSchema: '',
  },
];

// Default state
export const Default: Story = {
  args: {
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
    onElementSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
  },
};

// Element Card stories
const elementCardMeta = {
  title: 'Creator/ElementCard',
  component: ElementCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'element-selected' },
    enableDrag: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ElementCard>;

// Text Block element
export const TextBlockCard: StoryObj<typeof ElementCard> = {
  ...elementCardMeta,
  args: {
    element: {
      id: 'text-block-1',
      name: 'Text Block',
      type: 'textBlock',
      description: 'Display formatted text content with rich styling options',
      icon: 'Type',
      category: 'Display & Layout',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true,
  },
};

// Button element
export const ButtonCard: StoryObj<typeof ElementCard> = {
  ...elementCardMeta,
  args: {
    element: {
      id: 'button-1',
      name: 'Button',
      type: 'button',
      description: 'Interactive button for user actions and form submissions',
      icon: 'MousePointer',
      category: 'Inputs & Choices',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true,
  },
};

// Countdown Timer element
export const CountdownTimerCard: StoryObj<typeof ElementCard> = {
  ...elementCardMeta,
  args: {
    element: {
      id: 'countdown-timer-1',
      name: 'Countdown Timer',
      type: 'countdownTimer',
      description: 'Display time remaining until an event with real-time updates',
      icon: 'Clock',
      category: 'Logic & Dynamics',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: true,
  },
};

// Disabled drag version
export const CardWithoutDrag: StoryObj<typeof ElementCard> = {
  ...elementCardMeta,
  args: {
    element: {
      id: 'text-input-1',
      name: 'Text Input',
      type: 'textInput',
      description: 'Single or multi-line text input with validation',
      icon: 'TextCursor',
      category: 'Inputs & Choices',
      defaultConfig: {},
      validationSchema: ''
    },
    onSelect: (elementId: string) => {
      console.log('Selected element:', elementId);
    },
    enableDrag: false,
  },
}; 