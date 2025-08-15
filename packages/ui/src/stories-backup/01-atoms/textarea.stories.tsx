import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../atomic/atoms/textarea';
import { useState } from 'react';
import { MessageCircle, FileText, Edit, Clock, Star } from 'lucide-react';

const meta: Meta<typeof Textarea> = {
  title: '01-Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base textarea component with semantic tokens, variants, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'ghost'],
      description: 'Textarea visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea size',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width textarea',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
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

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    error: 'Comments are required',
    value: '',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your feedback...',
    showCount: true,
    maxLength: 250,
    helperText: 'Help us improve our service',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <Textarea
        variant="default"
        label="Default Variant"
        placeholder="Default textarea style"
        helperText="Standard border with focus states"
      />
      
      <Textarea
        variant="outline"
        label="Outline Variant"
        placeholder="Outlined textarea style"
        helperText="Clear border definition"
      />
      
      <Textarea
        variant="ghost"
        label="Ghost Variant"
        placeholder="Minimal textarea style"
        helperText="Transparent until focused"
      />
      
      <Textarea
        variant="filled"
        label="Filled Variant"
        placeholder="Filled background style"
        helperText="Subtle background for forms"
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
        placeholder="Compact textarea for brief content"
        helperText="Minimum height: 96px"
      />
      
      <Textarea
        size="md"
        label="Medium Size (Default)"
        placeholder="Standard textarea for most use cases"
        helperText="Minimum height: 128px"
      />
      
      <Textarea
        size="lg"
        label="Large Size"
        placeholder="Larger textarea for extensive content"
        helperText="Minimum height: 160px"
      />
    </div>
  ),
};

// Resize options
export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <Textarea
        resize="none"
        label="No Resize"
        placeholder="Fixed size textarea"
        helperText="Cannot be resized by user"
      />
      
      <Textarea
        resize="vertical"
        label="Vertical Resize (Default)"
        placeholder="Can be resized vertically"
        helperText="Drag the bottom-right corner"
      />
      
      <Textarea
        resize="horizontal"
        label="Horizontal Resize"
        placeholder="Can be resized horizontally"
        helperText="Drag to change width"
      />
      
      <Textarea
        resize="both"
        label="Resize Both Directions"
        placeholder="Can be resized in both directions"
        helperText="Full resize control"
      />
    </div>
  ),
};

// Campus textarea scenarios
export const CampusTextareaScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Discussion Forum</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-hive-emerald rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-hive-text-primary">CS 101 - Data Structures Discussion</h4>
              <p className="text-sm text-hive-text-secondary">Join the conversation about this week's assignment</p>
            </div>
          </div>
          
          <Textarea
            label="Your Question or Comment"
            placeholder="Ask a question about data structures, share insights, or help a classmate..."
            variant="filled"
            size="lg"
            showCount
            maxLength={1000}
            helperText="Be respectful and constructive in your discussions"
          />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-hive-text-secondary">
              <span>42 students in discussion</span>
              <span>•</span>
              <span>18 new messages today</span>
            </div>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Post Message
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Assignment Submission</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Essay Assignment - CS Ethics</h4>
            <p className="text-hive-text-secondary">Discuss the ethical implications of AI in modern society</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span className="text-hive-text-mutedLight">Due: March 15, 2024</span>
              <span className="px-2 py-1 bg-hive-gold/20 text-hive-gold rounded-full text-xs">Draft</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Textarea
              label="Essay Content"
              placeholder="Begin writing your essay here..."
              size="lg"
              showCount
              maxLength={5000}
              helperText="Minimum 1500 words required. Current draft is automatically saved."
              value="Artificial Intelligence has become increasingly prevalent in our daily lives, raising important ethical considerations that society must address..."
            />
            
            <Textarea
              label="References and Citations"
              placeholder="List your sources and citations here..."
              variant="ghost"
              size="sm"
              showCount
              maxLength={1000}
              helperText="Use APA format for citations"
            />
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-hive-text-secondary">
              <Clock className="w-4 h-4" />
              <span>Auto-saved 2 minutes ago</span>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Planning</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Textarea
                label="Session Agenda"
                placeholder="What topics will you cover in this study session?"
                variant="default"
                size="md"
                showCount
                maxLength={500}
                helperText="Help members prepare for the session"
              />
            </div>
            
            <div>
              <Textarea
                label="Preparation Materials"
                placeholder="List textbook chapters, assignments, or resources to review..."
                variant="default"
                size="md"
                showCount
                maxLength={300}
                helperText="What should members bring or study beforehand?"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Textarea
              label="Additional Notes"
              placeholder="Any special instructions, location details, or announcements..."
              variant="filled"
              size="sm"
              resize="vertical"
              helperText="Optional: Extra information for group members"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save as Template
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Schedule Session
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Documentation</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">GPA Calculator Pro - Documentation</h4>
            <p className="text-hive-text-secondary">Help other students understand how to use your tool</p>
          </div>
          
          <div className="space-y-6">
            <Textarea
              label="Tool Description"
              placeholder="Describe what your tool does and why it's useful for students..."
              variant="default"
              size="md"
              showCount
              maxLength={800}
              helperText="Clear description helps students discover your tool"
            />
            
            <Textarea
              label="How to Use"
              placeholder="Step-by-step instructions for using your tool..."
              variant="filled"
              size="lg"
              showCount
              maxLength={1500}
              helperText="Include screenshots or examples if helpful"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Features"
                placeholder="List the key features and capabilities..."
                variant="ghost"
                size="sm"
                showCount
                maxLength={400}
                helperText="Highlight what makes your tool special"
              />
              
              <Textarea
                label="Known Issues"
                placeholder="Any limitations or known bugs..."
                variant="ghost"
                size="sm"
                showCount
                maxLength={300}
                helperText="Be transparent about current limitations"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Preview Documentation
            </button>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
                Publish Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Evaluation</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">CS 101 - Course Feedback</h4>
            <p className="text-hive-text-secondary">Your feedback helps improve the course for future students</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textarea
                label="What did you like most?"
                placeholder="Share what worked well in this course..."
                variant="default"
                size="md"
                showCount
                maxLength={600}
                helperText="Positive feedback helps us know what to keep"
              />
              
              <Textarea
                label="What could be improved?"
                placeholder="Suggest areas for improvement..."
                variant="default"
                size="md"
                showCount
                maxLength={600}
                helperText="Constructive criticism helps us grow"
              />
            </div>
            
            <Textarea
              label="Overall Experience"
              placeholder="Describe your overall experience with this course..."
              variant="filled"
              size="lg"
              showCount
              maxLength={1000}
              helperText="Your comprehensive feedback is valuable for course development"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textarea
                label="Instructor Feedback"
                placeholder="Comments about the instructor's teaching style..."
                variant="ghost"
                size="sm"
                showCount
                maxLength={400}
                helperText="Anonymous feedback for instructor development"
              />
              
              <Textarea
                label="Recommendations"
                placeholder="Would you recommend this course? Why?"
                variant="ghost"
                size="sm"
                showCount
                maxLength={400}
                helperText="Help future students make informed decisions"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-hive-text-secondary">Your responses are anonymous and confidential</p>
            <button className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive character counting
export const InteractiveCharacterCounting: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <div className="space-y-6 p-4 max-w-2xl">
        <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Character Counter</h3>
        
        <Textarea
          label="Campus Update"
          placeholder="Share what's happening on campus..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showCount
          maxLength={maxLength}
          helperText={`Share news, events, or thoughts with the campus community`}
          variant="filled"
          size="md"
        />
        
        <div className="text-sm text-hive-text-secondary">
          <p>Remaining characters: {maxLength - value.length}</p>
          <p>Progress: {Math.round((value.length / maxLength) * 100)}% used</p>
        </div>
        
        <button 
          className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={value.length === 0 || value.length > maxLength}
        >
          Post Update
        </button>
      </div>
    );
  },
};

// Form combinations
export const FormCombinations: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Project Proposal Form</h3>
        <div className="space-y-4 p-6 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">Project Title</label>
              <input 
                type="text" 
                placeholder="Enter project title..."
                className="w-full px-4 py-3 border border-hive-border-default rounded-2xl bg-transparent text-hive-text-primary placeholder:text-hive-text-tertiary focus:outline-none focus:ring-2 focus:ring-hive-gold/20 focus:border-hive-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">Category</label>
              <select className="w-full px-4 py-3 border border-hive-border-default rounded-2xl bg-transparent text-hive-text-primary focus:outline-none focus:ring-2 focus:ring-hive-gold/20 focus:border-hive-gold transition-all">
                <option>Academic Tool</option>
                <option>Study Aid</option>
                <option>Campus Utility</option>
                <option>Social Platform</option>
              </select>
            </div>
          </div>
          
          <Textarea
            label="Project Description"
            placeholder="Provide a detailed description of your project..."
            variant="default"
            size="lg"
            showCount
            maxLength={1500}
            helperText="Explain what your project does and how it helps students"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="Target Audience"
              placeholder="Who will use this project?"
              variant="ghost"
              size="sm"
              showCount
              maxLength={300}
              helperText="Describe your intended users"
            />
            
            <Textarea
              label="Success Metrics"
              placeholder="How will you measure success?"
              variant="ghost"
              size="sm"
              showCount
              maxLength={300}
              helperText="Define what success looks like"
            />
          </div>
          
          <Textarea
            label="Implementation Plan"
            placeholder="Outline how you'll build this project..."
            variant="filled"
            size="md"
            showCount
            maxLength={1000}
            helperText="Include timeline, resources, and key milestones"
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Submit Proposal
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Peer Review Form</h3>
        <div className="space-y-4 p-6 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="font-semibold text-hive-text-primary mb-2">Review: Study Planner Tool</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-hive-text-secondary">Rating:</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-hive-gold fill-current" />
                ))}
              </div>
            </div>
          </div>
          
          <Textarea
            label="Overall Review"
            placeholder="Share your overall experience with this tool..."
            variant="default"
            size="lg"
            showCount
            maxLength={800}
            helperText="Help other students by sharing detailed feedback"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              label="What worked well?"
              placeholder="Highlight the tool's strengths..."
              variant="filled"
              size="sm"
              showCount
              maxLength={400}
              helperText="Focus on positive aspects"
            />
            
            <Textarea
              label="Areas for improvement"
              placeholder="Suggest how the tool could be better..."
              variant="filled"
              size="sm"
              showCount
              maxLength={400}
              helperText="Constructive suggestions only"
            />
          </div>
          
          <Textarea
            label="Recommendation"
            placeholder="Would you recommend this tool to other students? Why?"
            variant="ghost"
            size="sm"
            showCount
            maxLength={200}
            helperText="Brief recommendation for peers"
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Review
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Submit Review
            </button>
          </div>
        </div>
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
    size: 'md',
    resize: 'vertical',
    disabled: false,
    fullWidth: true,
    showCount: false,
    maxLength: 500,
    helperText: 'Use the controls panel to customize this textarea',
  },
};