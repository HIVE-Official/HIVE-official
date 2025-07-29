import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveTextarea, 
  Textarea,
  HiveToolDescriptionTextarea,
  HiveSpaceDescriptionTextarea,
  HiveFeedbackTextarea,
  HiveCodeTextarea 
} from '../../../components/hive-textarea';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';
import { MessageSquare, Code, Search, Send } from 'lucide-react';

const meta: Meta<typeof HiveTextarea> = {
  title: '02-atoms/Form Controls/Textarea',
  component: HiveTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Textarea Component** - A rich text input with advanced features and liquid metal motion

Part of the HIVE Atomic Design System with PRD-aligned styling, enhanced accessibility, and premium interactions.

## Features
- **6 Variants**: Default, error, success, disabled, premium, minimal
- **4 Sizes**: sm (80px), default (120px), lg (160px), xl (50)
- **Floating Labels**: Smooth animated labels that float on focus/content
- **Character Counter**: Optional character count with overflow indicators
- **Icon Support**: Leading and trailing icon positions
- **Loading States**: Built-in spinner with accessible labels
- **Status Messages**: Error, success, and helper text with smooth animations
- **Liquid Motion**: Premium motion system with spring animations
- **Auto-resize**: Optional vertical resizing capability
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management

## Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-text-*\`, \`hive-status-*\` tokens exclusively.

## Pre-built Variants
- **HiveToolDescriptionTextarea**: For tool creation forms
- **HiveSpaceDescriptionTextarea**: For space setup
- **HiveFeedbackTextarea**: For feedback collection
- **HiveCodeTextarea**: For code input with monospace font
- **Textarea**: Simple version for basic use cases
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled', 'premium', 'minimal'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Textarea height variant'
    },
    radius: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Border radius variant'
    },
    label: {
      control: 'text',
      description: 'Label text (floating by default)'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the textarea'
    },
    errorText: {
      control: 'text',
      description: 'Error message (overrides variant)'
    },
    successText: {
      control: 'text',
      description: 'Success message (overrides variant)'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Show character count indicator'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character limit'
    },
    floatingLabel: {
      control: 'boolean',
      description: 'Enable floating label animation'
    },
    resize: {
      control: 'boolean',
      description: 'Allow vertical resizing'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Textarea
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...'
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="Default"
        placeholder="Default textarea style"
        variant="default"
      />
      
      <HiveTextarea
        label="Premium"
        placeholder="Premium textarea with enhanced styling"
        variant="premium"
      />
      
      <HiveTextarea
        label="Error State"
        placeholder="Something went wrong"
        variant="error"
        errorText="This field is required"
      />
      
      <HiveTextarea
        label="Success State"
        placeholder="Looking good!"
        variant="success"
        successText="Perfect! Your input looks great"
      />
      
      <HiveTextarea
        label="Minimal"
        placeholder="Clean and simple"
        variant="minimal"
      />
      
      <HiveTextarea
        label="Disabled"
        placeholder="Cannot edit this field"
        variant="disabled"
        disabled
      />
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="Small (80px)"
        placeholder="Compact textarea for brief inputs"
        size="sm"
      />
      
      <HiveTextarea
        label="Default (120px)"
        placeholder="Standard textarea for most use cases"
        size="default"
      />
      
      <HiveTextarea
        label="Large (160px)"
        placeholder="Spacious textarea for longer content"
        size="lg"
      />
      
      <HiveTextarea
        label="Extra Large (50)"
        placeholder="Maximum height for extensive writing"
        size="xl"
      />
    </div>
  )
};

// With Character Count
export const WithCharacterCount: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="With Counter"
        placeholder="Start typing to see character count..."
        showCharacterCount
        helperText="Character count appears when focused"
      />
      
      <HiveTextarea
        label="With Limit"
        placeholder="Limited to 100 characters"
        showCharacterCount
        maxLength={100}
        helperText="Count shows when approaching limit"
      />
      
      <HiveTextarea
        label="Strict Limit"
        placeholder="Cannot exceed 50 characters"
        showCharacterCount
        maxLength={50}
        defaultValue="This text will show over-limit styling when it exceeds the maximum length"
      />
    </div>
  )
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="Message"
        placeholder="Type your message..."
        leftIcon={<MessageSquare className="w-4 h-4" />}
      />
      
      <HiveTextarea
        label="Search Query"
        placeholder="Enter search terms..."
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={<Send className="w-4 h-4" />}
      />
      
      <HiveTextarea
        label="Code Block"
        placeholder="Enter your code..."
        leftIcon={<Code className="w-4 h-4" />}
        variant="minimal"
        className="font-mono"
      />
    </div>
  )
};

// Loading and Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="Loading"
        placeholder="Processing your input..."
        loading
        defaultValue="This textarea is currently processing"
      />
      
      <HiveTextarea
        label="With Clear Button"
        placeholder="Type something to see clear button"
        defaultValue="Clear me!"
        onClear={() => alert('Cleared!')}
      />
      
      <HiveTextarea
        label="No Resize"
        placeholder="Fixed height textarea"
        resize={false}
        helperText="This textarea cannot be resized"
      />
    </div>
  )
};

// Label Variations
export const LabelVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveTextarea
        label="Floating Label"
        placeholder="Label floats up on focus"
        floatingLabel={true}
        helperText="Default floating behavior"
      />
      
      <HiveTextarea
        label="Static Label"
        placeholder="Label stays above textarea"
        floatingLabel={false}
        helperText="Traditional label placement"
      />
      
      <div className="space-y-2">
        <Label htmlFor="external-label">External Label</Label>
        <HiveTextarea
          id="external-label"
          placeholder="Using external label component"
          helperText="No built-in label, using separate Label component"
        />
      </div>
    </div>
  )
};

// Pre-built Variants
export const PrebuiltVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <HiveToolDescriptionTextarea
        helperText="For tool creation forms - includes character limit and premium styling"
      />
      
      <HiveSpaceDescriptionTextarea
        helperText="For space setup - optimized length and standard styling"
      />
      
      <HiveFeedbackTextarea
        helperText="For feedback collection - longer limit for detailed responses"
      />
      
      <HiveCodeTextarea
        label="Code Input"
        placeholder="function example() { return 'hello'; }"
        helperText="Monospace font for code input"
      />
      
      <Textarea
        placeholder="Simple textarea for basic use cases"
      />
    </div>
  )
};

// Real-world Form Example
export const FormExample: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Create New Tool</h3>
      
      <HiveTextarea
        label="Tool Name"
        placeholder="Enter a descriptive name for your tool"
        size="sm"
        showCharacterCount
        maxLength={60}
      />
      
      <HiveToolDescriptionTextarea />
      
      <HiveTextarea
        label="Usage Instructions"
        placeholder="Explain how to use this tool..."
        size="lg"
        showCharacterCount
        maxLength={800}
        helperText="Provide clear instructions for other users"
      />
      
      <HiveCodeTextarea
        label="Configuration"
        placeholder='{ "setting": "value" }'
        size="lg"
        helperText="JSON configuration for your tool"
      />
      
      <div className="flex gap-3 pt-4">
        <button className="px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg">
          Publish Tool
        </button>
      </div>
    </HiveCard>
  )
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Accessibility Features</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Shift+Tab)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with ARIA labels</p>
        <p className="text-sm text-gray-300">✅ Focus indicators and management</p>
        <p className="text-sm text-gray-300">✅ Character count announcements</p>
        <p className="text-sm text-gray-300">✅ Error/success state announcements</p>
        <p className="text-sm text-gray-300">✅ Proper label associations</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Accessible Textarea</h4>
        
        <HiveTextarea
          label="Feedback"
          placeholder="Share your accessibility feedback"
          helperText="This textarea meets WCAG 2.1 AA guidelines"
          showCharacterCount
          maxLength={200}
          aria-describedby="feedback-help"
        />
        
        <p id="feedback-help" className="text-xs text-gray-400">
          Tab to focus, type your message, character count is announced to screen readers
        </p>
        
        <HiveTextarea
          label="Error Example"
          placeholder="This field has an error"
          errorText="Please provide valid feedback"
          aria-invalid="true"
          aria-describedby="error-help"
        />
        
        <p id="error-help" className="text-xs text-gray-400">
          Error states are properly announced with aria-invalid
        </p>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-md">
      <HiveTextarea {...args} />
    </div>
  ),
  args: {
    label: 'Interactive Demo',
    placeholder: 'Customize using controls below',
    variant: 'default',
    size: 'default',
    radius: 'default',
    showCharacterCount: false,
    maxLength: undefined,
    floatingLabel: true,
    resize: true,
    loading: false,
    disabled: false,
    helperText: 'Use the controls below to test different configurations'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different textarea configurations and see how they affect the behavior and appearance.'
      }
    }
  }
};