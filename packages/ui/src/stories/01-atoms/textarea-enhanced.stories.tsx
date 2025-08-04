import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, CodeTextarea, TextareaGroup, TextareaPresets } from '../../atomic/atoms/textarea-enhanced';
import { useState } from 'react';
import { MessageCircle, FileText, Code, Star, AlertCircle, CheckCircle, Users, BookOpen } from 'lucide-react';

const meta: Meta<typeof Textarea> = {
  title: '01-Atoms/Textarea Enhanced',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced textarea component with auto-resize, character counting, validation states, and campus-specific presets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning', 'brand'],
      description: 'Visual variant and validation state',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Textarea size',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'Border radius',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-resize based on content',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Field label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'text',
      description: 'Success message',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Describe your project...',
    helperText: 'Provide a detailed description',
  },
};

export const Required: Story = {
  args: {
    label: 'Project Overview',
    placeholder: 'Required field...',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithCharCount: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Share your thoughts...',
    showCharCount: true,
    maxLength: 250,
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-Resizing Textarea',
    placeholder: 'Start typing and watch this textarea grow...',
    autoResize: true,
    helperText: 'This textarea automatically adjusts its height based on content',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <Textarea
        variant="default"
        label="Default Variant"
        placeholder="Default textarea"
        helperText="Standard appearance"
      />
      
      <Textarea
        variant="error"
        label="Error Variant"
        placeholder="Error state"
        error="This field has an error"
      />
      
      <Textarea
        variant="success"
        label="Success Variant"
        placeholder="Success state"
        success="Field completed successfully"
      />
      
      <Textarea
        variant="warning"
        label="Warning Variant"
        placeholder="Warning state"
        helperText="This field has a warning"
      />
      
      <Textarea
        variant="brand"
        label="Brand Variant"
        placeholder="Brand styled textarea"
        helperText="Styled with brand colors"
      />
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <Textarea
        size="sm"
        label="Small Size"
        placeholder="Small textarea"
        helperText="Compact size for tight spaces"
      />
      
      <Textarea
        size="default"
        label="Default Size"
        placeholder="Default textarea"
        helperText="Standard size for most use cases"
      />
      
      <Textarea
        size="lg"
        label="Large Size"
        placeholder="Large textarea"
        helperText="Larger size for more content"
      />
      
      <Textarea
        size="xl"
        label="Extra Large Size"
        placeholder="Extra large textarea"
        helperText="Maximum size for extensive content"
      />
    </div>
  ),
};

// Campus textarea scenarios
export const CampusTextareaScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Assignment Submission</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary mb-2">CS 101 - Essay Question</h4>
            <p className="text-sm text-hive-text-secondary">Explain the difference between stack and queue data structures</p>
          </div>
          
          <Textarea
            label="Your Answer"
            placeholder="Type your answer here..."
            size="lg"
            autoResize
            showCharCount
            maxLength={2000}
            required
            helperText="Minimum 500 characters required for full credit"
            className="mb-4"
          />
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-hive-text-secondary">Draft saved automatically</span>
            <div className="space-x-2">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Discussion</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-hive-emerald rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-hive-text-primary">CS 101 Study Group</h4>
              <p className="text-sm text-hive-text-secondary">15 members • Active discussion</p>
            </div>
          </div>
          
          <TextareaPresets.Comment
            label="Share with the group"
            placeholder="Ask a question, share notes, or discuss the material..."
            className="mb-4"
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-hive-text-secondary">
              <MessageCircle className="w-4 h-4" />
              <span>12 messages today</span>
            </div>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Post Message
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Interface</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-5 h-5 text-hive-sapphire" />
              <h4 className="font-semibold text-hive-text-primary">Code Editor</h4>
            </div>
            
            <CodeTextarea
              label="JavaScript Code"
              placeholder="// Enter your JavaScript code here..."
              language="javascript"
              size="lg"
              className="mb-4"
            />
            
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 text-sm bg-hive-sapphire text-white rounded hover:bg-hive-sapphire/90 transition-colors">
                Run Code
              </button>
              <button className="px-3 py-1.5 text-sm border border-hive-border-default text-hive-text-primary rounded hover:bg-hive-interactive-hover transition-colors">
                Format
              </button>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-hive-gold" />
              <h4 className="font-semibold text-hive-text-primary">Tool Description</h4>
            </div>
            
            <TextareaPresets.Description
              label="About This Tool"
              placeholder="Describe what your tool does and how students can use it..."
              className="mb-4"
            />
            
            <Textarea
              label="Usage Instructions"
              placeholder="Step-by-step instructions for using this tool..."
              size="default"
              showCharCount
              maxLength={500}
              helperText="Clear instructions help other students use your tool effectively"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Feedback System</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary mb-2">CS 101 - Instructor Feedback</h4>
            <p className="text-sm text-hive-text-secondary">Help improve the course by sharing your feedback</p>
          </div>
          
          <div className="space-y-4">
            <Textarea
              label="What did you like most about this course?"
              placeholder="Share what worked well for you..."
              variant="success"
              size="default"
              showCharCount
              maxLength={500}
              helperText="Your positive feedback helps us know what to keep doing"
            />
            
            <Textarea
              label="What could be improved?"
              placeholder="Suggest areas for improvement..."
              size="default"
              showCharCount
              maxLength={500}
              helperText="Constructive feedback helps us make the course better"
            />
            
            <TextareaPresets.Feedback
              label="Additional Comments"
              placeholder="Any other thoughts or suggestions..."
            />
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-hive-text-secondary">Your feedback is anonymous and helps improve the course</p>
            <button className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Peer Review System</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary mb-2">Review: "GPA Calculator Pro"</h4>
            <p className="text-sm text-hive-text-secondary">Rate and review tools built by your peers</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">Rating</label>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-hive-gold fill-current" />
                ))}
              </div>
            </div>
            
            <Textarea
              label="Review Details"
              placeholder="Share your experience using this tool..."
              size="lg"
              autoResize
              showCharCount
              maxLength={1000}
              helperText="Help other students by sharing detailed feedback"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="What worked well?"
                placeholder="Highlight the tool's strengths..."
                variant="success"
                size="sm"
                showCharCount
                maxLength={300}
              />
              
              <Textarea
                label="Suggestions for improvement"
                placeholder="How could this tool be better..."
                size="sm"
                showCharCount
                maxLength={300}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive textarea features
export const InteractiveTextareaFeatures: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Auto-Resize Demo</h3>
          <Textarea
            label="Auto-Resizing Textarea"
            placeholder="Type multiple lines to see auto-resize in action..."
            autoResize
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            helperText="This textarea grows automatically as you type"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Character Counting</h3>
          <Textarea
            label="Character Limited Input"
            placeholder="Try typing more than 100 characters..."
            showCharCount
            maxLength={100}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            helperText="Character limit enforced with live counter"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Validation States</h3>
          <div className="space-y-4">
            <Textarea
              label="Error State Example"
              placeholder="This field shows an error..."
              error="This field is required and cannot be empty"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
            />
            
            {value3.length > 10 && (
              <Textarea
                label="Success State Example"
                placeholder="This field shows success..."
                success="Great! Your input meets the requirements"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
              />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Code Textarea</h3>
          <CodeTextarea
            label="JavaScript Code Editor"
            placeholder="function hello() { return 'Hello, HIVE!'; }"
            language="javascript"
            size="lg"
            helperText="Monospace font optimized for code input"
          />
        </div>
      </div>
    );
  },
};

// Textarea groups and layouts
export const TextareaGroupsAndLayouts: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Vertical Group</h3>
        <TextareaGroup orientation="vertical" spacing="md">
          <Textarea
            label="Question 1"
            placeholder="Answer the first question..."
            size="sm"
          />
          <Textarea
            label="Question 2"
            placeholder="Answer the second question..."
            size="sm"
          />
          <Textarea
            label="Question 3"
            placeholder="Answer the third question..."
            size="sm"
          />
        </TextareaGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Side-by-Side Comparison</h3>
        <TextareaGroup orientation="horizontal" spacing="md">
          <div className="flex-1">
            <Textarea
              label="Before (Current Approach)"
              placeholder="Describe the current method..."
              size="lg"
              className="h-32"
            />
          </div>
          <div className="flex-1">
            <Textarea
              label="After (Proposed Approach)"
              placeholder="Describe the improved method..."
              size="lg"
              className="h-32"
            />
          </div>
        </TextareaGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Form Layout Example</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="font-semibold text-hive-text-primary mb-4">Project Proposal Form</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Project Title</label>
                <input 
                  type="text" 
                  placeholder="Enter project title..."
                  className="w-full px-3 py-2 border border-hive-border-default rounded-lg bg-hive-background-secondary text-hive-text-primary placeholder:text-hive-text-tertiary focus:outline-none focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-hive-border-default rounded-lg bg-hive-background-secondary text-hive-text-primary focus:outline-none focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold">
                  <option>Academic Tool</option>
                  <option>Study Aid</option>
                  <option>Campus Utility</option>
                  <option>Social Platform</option>
                </select>
              </div>
            </div>
            
            <TextareaPresets.Description
              label="Project Description"
              placeholder="Provide a detailed description of your project..."
              className="col-span-2"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Target Audience"
                placeholder="Who will use this tool..."
                size="sm"
                showCharCount
                maxLength={200}
              />
              
              <Textarea
                label="Success Metrics"
                placeholder="How will you measure success..."
                size="sm"
                showCharCount
                maxLength={200}
              />
            </div>
            
            <TextareaPresets.Notes
              label="Additional Notes"
              placeholder="Any additional information or requirements..."
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components showcase
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Comment Preset</h3>
        <TextareaPresets.Comment
          label="Leave a comment"
          helperText="Share your thoughts with the community"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Description Preset</h3>
        <TextareaPresets.Description
          label="Project Description"
          helperText="Provide a comprehensive description"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Notes Preset</h3>
        <TextareaPresets.Notes
          label="Meeting Notes"
          helperText="Auto-resizing notes field"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Code Preset</h3>
        <TextareaPresets.Code
          label="JavaScript Code"
          language="javascript"
          helperText="Monospace font for code input"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Feedback Preset</h3>
        <TextareaPresets.Feedback
          label="Course Feedback"
          helperText="Help us improve the course experience"
        />
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Textarea - Use controls to customize →',
    placeholder: 'Type here to test different configurations...',
    variant: 'default',
    size: 'default',
    radius: 'default',
    resize: 'vertical',
    autoResize: false,
    showCharCount: false,
    maxLength: 500,
    required: false,
    disabled: false,
    helperText: 'Use the controls panel to customize this textarea',
  },
};