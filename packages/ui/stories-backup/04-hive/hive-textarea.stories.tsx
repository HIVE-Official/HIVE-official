import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HiveTextarea } from '../../components/hive-textarea';

const meta: Meta<typeof HiveTextarea> = {
  title: '04-Hive/Textarea System',
  component: HiveTextarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HIVE Textarea System - Campus Text Input**

Advanced text area components built with HIVE's foundation systems for accessibility, mobile optimization, and semantic design tokens.

## When to Use
- Long-form content creation (posts, assignments, notes)
- Tool descriptions and documentation
- Course feedback and reflection submissions
- Study session planning and coordination
- Academic project proposals and reports

## Foundation Features
- **Mobile-First Design**: Touch-optimized text input with comfortable interaction areas
- **Accessibility Built-In**: WCAG 2.1 AA compliance with screen reader support and keyboard navigation
- **HIVE Motion System**: Liquid metal focus animations and smooth transitions
- **Semantic Design Tokens**: Consistent with HIVE brand system and campus themes

## Textarea Types
- **Default**: Standard multi-line text input for general campus use
- **Premium**: Enhanced styling for tool creation and builder workflows
- **Minimal**: Clean interface for simple text entry
- **Error/Success**: Validation states with clear visual feedback

## Campus Context
All textarea components are optimized for university workflows, supporting academic writing, collaborative content creation, and student productivity patterns.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'premium', 'minimal'],
      description: 'Textarea variant with semantic design tokens'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Textarea size for different content lengths'
    },
    radius: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Border radius following HIVE design tokens'
    },
    label: {
      control: 'text',
      description: 'Accessible label for the textarea'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for empty state'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to guide user input'
    },
    errorText: {
      control: 'text',
      description: 'Error message for validation feedback'
    },
    successText: {
      control: 'text',
      description: 'Success message for positive feedback'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Display character count indicator'
    },
    maxLength: {
      control: { type: 'number', min: 10, max: 5000 },
      description: 'Maximum character limit'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    floatingLabel: {
      control: 'boolean',
      description: 'Enable floating label animation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Course Reflection',
    placeholder: 'Share your thoughts about today\'s lecture...',
    variant: 'default',
    size: 'default'
  }
};

export const Playground: Story = {
  args: {
    label: 'Interactive Textarea Playground',
    placeholder: 'Experiment with different textarea configurations...',
    variant: 'default',
    size: 'default',
    helperText: 'Try different settings to see how the textarea responds',
    showCharacterCount: true,
    maxLength: 500,
    floatingLabel: true
  }
};

export const CourseAssignment: Story = {
  render: () => {
    const [content, setContent] = useState('');
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            CS 301: Algorithm Analysis Assignment
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            Submit your analysis of the sorting algorithm implementations
          </p>
          <HiveTextarea
            label="Algorithm Analysis"
            placeholder="Compare the time complexity of quicksort vs mergesort in your implementation..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="default"
            size="lg"
            showCharacterCount
            maxLength={2000}
            helperText="Include code examples and performance measurements in your analysis"
            floatingLabel
          />
        </div>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Assignment Status
          </div>
          <div className="text-sm text-[var(--hive-text-secondary)]">
            Due: Friday at 11:59 PM • Words: {content.split(' ').filter(word => word.length > 0).length}
          </div>
        </div>
      </div>
    );
  }
};

export const ToolDocumentation: Story = {
  render: () => {
    const [description, setDescription] = useState('');
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            Tool Creation: Study Timer Pro
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            Describe your tool to help other students understand its purpose
          </p>
          <HiveTextarea
            label="Tool Description"
            placeholder="This tool helps students manage their study sessions with customizable timers, break reminders, and productivity tracking..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="premium"
            size="lg"
            showCharacterCount
            maxLength={800}
            helperText="Include key features, usage instructions, and benefits for other students"
            floatingLabel
          />
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] text-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg text-sm">
            Publish Tool
          </button>
        </div>
      </div>
    );
  }
};

export const StudyNotes: Story = {
  render: () => {
    const [notes, setNotes] = useState('# Lecture Notes - Data Structures\n\n## Binary Trees\n- Perfect binary tree: all internal nodes have two children\n- Complete binary tree: all levels filled except possibly the last\n- Balanced binary tree: height difference between subtrees ≤ 1\n\n## Key Operations\n- Insert: O(log n) average case\n- Search: O(log n) average case\n- Delete: O(log n) average case');
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              CS 201: Data Structures Notes
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Lecture 12 - Binary Trees and Operations
            </p>
          </div>
          <div className="text-xs text-[var(--hive-text-secondary)]">
            Auto-saved 2 minutes ago
          </div>
        </div>
        <HiveTextarea
          label="Lecture Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          variant="minimal"
          size="xl"
          showCharacterCount
          helperText="Supports Markdown formatting for better organization"
          floatingLabel={false}
        />
        <div className="flex gap-2 text-sm">
          <button className="px-3 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded text-[var(--hive-text-primary)]">
            **Bold**
          </button>
          <button className="px-3 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded text-[var(--hive-text-primary)]">
            *Italic*
          </button>
          <button className="px-3 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded text-[var(--hive-text-primary)]">
            `Code`
          </button>
          <button className="px-3 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded text-[var(--hive-text-primary)]">
            # Header
          </button>
        </div>
      </div>
    );
  }
};

export const PostComposer: Story = {
  render: () => {
    const [postContent, setPostContent] = useState('');
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
            Create Post in CS Study Group
          </h3>
          <HiveTextarea
            label="What's on your mind?"
            placeholder="Share study resources, ask questions, or start a discussion..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            variant="default"
            size="default"
            showCharacterCount
            maxLength={1000}
            helperText="Share helpful content with your study group members"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]">
              📎
            </button>
            <button className="p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]">
              📷
            </button>
            <button className="p-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]">
              📊
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] text-sm">
              Save Draft
            </button>
            <button 
              className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg text-sm disabled:opacity-50"
              disabled={postContent.length === 0}
            >
              Post to Group
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Error State
        </h3>
        <HiveTextarea
          label="Assignment Submission"
          placeholder="Enter your assignment response..."
          variant="error"
          size="default"
          errorText="Assignment submission is required and must be at least 100 words"
          showCharacterCount
          maxLength={500}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Success State
        </h3>
        <HiveTextarea
          label="Course Feedback"
          placeholder="Share your feedback about the course..."
          variant="success"
          size="default"
          successText="Thank you for your feedback! It has been submitted successfully."
          defaultValue="The course content was well-structured and the professor explained complex concepts clearly. The hands-on projects really helped solidify my understanding of data structures."
          showCharacterCount
          maxLength={500}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Loading State
        </h3>
        <HiveTextarea
          label="Submitting Assignment"
          placeholder="Please wait..."
          variant="default"
          size="default"
          loading
          disabled
          helperText="Uploading your assignment to the course portal..."
        />
      </div>
    </div>
  )
};

export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => {
    const [content, setContent] = useState('');
    
    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--hive-text-primary)] mb-4">
            Mobile Study Journal
          </h3>
          <HiveTextarea
            label="Today's Learning"
            placeholder="What did you learn in today's classes?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="default"
            size="lg"
            showCharacterCount
            maxLength={300}
            helperText="Quick reflection on your daily learning"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] text-sm">
            Save for Later
          </button>
          <button className="flex-1 py-3 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg text-sm">
            Add to Journal
          </button>
        </div>
      </div>
    );
  }
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [content, setContent] = useState('');
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
            Accessible Textarea Experience
          </h3>
          <HiveTextarea
            id="accessible-textarea"
            label="Assignment Response"
            placeholder="Enter your detailed response here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="default"
            size="lg"
            showCharacterCount
            maxLength={1000}
            helperText="Use Tab to navigate, Shift+Tab to go back. Screen readers will announce character count and validation messages."
            aria-label="Assignment response textarea with character counter"
            aria-describedby="textarea-help"
            required
          />
          <div id="textarea-help" className="text-xs text-[var(--hive-text-secondary)] mt-2">
            This textarea supports full keyboard navigation and screen reader functionality. Press Tab to move focus, use arrow keys within the text area.
          </div>
        </div>
        <div className="bg-[var(--hive-background-secondary)] rounded-lg p-4">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Accessibility Features Demonstrated:
          </h4>
          <ul className="text-sm text-[var(--hive-text-secondary)] space-y-1">
            <li>• Proper label association with htmlFor and id</li>
            <li>• ARIA labels and descriptions for screen readers</li>
            <li>• Keyboard navigation with Tab and Shift+Tab</li>
            <li>• Character count announcements</li>
            <li>• Validation message accessibility</li>
            <li>• High contrast focus indicators</li>
          </ul>
        </div>
      </div>
    );
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
          Textarea Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Default Variant
            </h4>
            <HiveTextarea
              label="Standard Input"
              placeholder="General purpose textarea..."
              variant="default"
              size="default"
              helperText="Standard campus text input"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Premium Variant
            </h4>
            <HiveTextarea
              label="Tool Description"
              placeholder="Describe your campus tool..."
              variant="premium"
              size="default"
              helperText="Enhanced styling for builder workflows"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Minimal Variant
            </h4>
            <HiveTextarea
              label="Quick Notes"
              placeholder="Simple note taking..."
              variant="minimal"
              size="default"
              helperText="Clean interface for simple text entry"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Size Comparison
            </h4>
            <div className="space-y-3">
              <HiveTextarea
                label="Small"
                placeholder="Small textarea..."
                variant="default"
                size="sm"
              />
              <HiveTextarea
                label="Large"
                placeholder="Large textarea for longer content..."
                variant="default"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};