import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, Label } from '../../components';

const meta: Meta<typeof Textarea> = {
  title: '03-UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Multi-line text input component**

Textarea component for longer text input with HIVE design system styling. Optimized for content creation and Builder workflows.

## When to Use
- Long form text input (descriptions, content, code)
- Tool configuration text fields
- Comment and post composition
- Builder notes and documentation

## Design Principles
- **Consistent with Input styling** following HIVE design tokens
- **Responsive sizing** that adapts to content
- **Clear focus states** with gold outline indicators
- **Accessibility first** with proper labeling and keyboard support

## Accessibility
- WCAG 2.1 AA compliant focus indicators
- Proper label association
- Screen reader friendly
- Keyboard navigation support
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
  args: {
    placeholder: 'Type your message here...',
  },
};

export const ToolDescription: Story = {
  render: (args) => (
    <div className="grid w-full max-w-md items-center gap-2">
      <Label htmlFor="tool-description">Tool Description</Label>
      <Textarea {...args} id="tool-description" />
      <p className="text-xs text-muted-foreground">
        Describe what your tool does and how students can use it.
      </p>
    </div>
  ),
  args: {
    placeholder: 'Enter a detailed description of your tool...',
    rows: 4,
  },
};

export const PostComposer: Story = {
  render: (args) => (
    <div className="grid w-full max-w-lg items-center gap-2">
      <Label htmlFor="post-content">Share with your Space</Label>
      <Textarea {...args} id="post-content" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>What's happening in Computer Science?</span>
        <span>0/500</span>
      </div>
    </div>
  ),
  args: {
    placeholder: "What's on your mind?",
    rows: 3,
    maxLength: 500,
  },
};

export const CodeInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-xl items-center gap-2">
      <Label htmlFor="code-snippet">Code Snippet</Label>
      <Textarea {...args} id="code-snippet" className="font-mono text-sm" />
      <p className="text-xs text-muted-foreground">
        Paste code to share with your Space or include in a tool.
      </p>
    </div>
  ),
  args: {
    placeholder: '// Paste your code here...',
    rows: 8,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="disabled-textarea">Disabled textarea</Label>
      <Textarea {...args} id="disabled-textarea" />
    </div>
  ),
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="error-textarea">Message *</Label>
      <Textarea {...args} id="error-textarea" className="border-destructive" />
      <p className="text-xs text-destructive">
        This field is required.
      </p>
    </div>
  ),
  args: {
    placeholder: 'Required field...',
  },
};

export const AutoResize: Story = {
  render: (args) => (
    <div className="grid w-full max-w-md items-center gap-2">
      <Label htmlFor="auto-resize">Auto-resizing textarea</Label>
      <Textarea 
        {...args} 
        id="auto-resize" 
        className="min-h-[80px] resize-none"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
      />
      <p className="text-xs text-muted-foreground">
        This textarea grows as you type.
      </p>
    </div>
  ),
  args: {
    placeholder: 'Start typing and watch me grow...',
    rows: 2,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-full max-w-lg gap-4">
      <div>
        <Label>Small (2 rows)</Label>
        <Textarea placeholder="Small textarea..." rows={2} />
      </div>
      <div>
        <Label>Medium (4 rows)</Label>
        <Textarea placeholder="Medium textarea..." rows={4} />
      </div>
      <div>
        <Label>Large (8 rows)</Label>
        <Textarea placeholder="Large textarea..." rows={8} />
      </div>
    </div>
  ),
};