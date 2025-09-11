import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaPresets, CodeTextarea, TextareaGroup } from './textarea-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Textarea> = {
  title: '01-Atoms/Textarea Enhanced - COMPLETE DEFINITION',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Textarea Enhanced - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated multi-line text input system for University at Buffalo campus content creation and communication.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Variants** - Default, error, success, warning, brand (gold outline)
- **4 Size Options** - Small, default, large, XL with optimal content creation experience
- **Advanced Features** - Auto-resize, character counting, code input, resize controls
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Gold Outline Brand** - Brand variant uses gold outline only (never fill)
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Content Ready** - Optimized for UB academic writing, collaboration, and communication

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo content creation and academic collaboration:
- **Academic Writing** - Assignment submissions, research notes, study guides
- **Group Collaboration** - Project descriptions, shared notes, meeting minutes
- **Campus Communication** - Event descriptions, space coordination, announcement drafts
- **Code Development** - Code sharing for CS students, algorithm explanations
- **Feedback & Reviews** - Peer reviews, instructor feedback, course evaluations

### 📱 **MOBILE OPTIMIZATION**
- **Touch Typing** - Optimized text input experience for mobile keyboards
- **Auto-resize** - Content expands naturally as users type longer content
- **Character Limits** - Visual feedback for content length management
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning', 'brand'],
      description: 'Textarea variant (brand uses gold outline only)',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Textarea size',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    autoResize: {
      control: 'boolean',
      description: 'Automatically resize to fit content',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// Default textarea showcase
export const Default: Story = {
  args: {
    placeholder: 'Describe your study group project...',
    label: 'Project Description',
    helperText: 'Provide details about goals, timeline, and meeting preferences',
    variant: 'default',
    size: 'default',
    showCharCount: true,
    maxLength: 500,
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ VARIANTS</Badge>
            Textarea Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 variants using 100% semantic tokens (brand uses gold outline only)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Default textarea for standard content"
                label="Default Variant"
                helperText="Standard textarea for general content input"
                variant="primary"
                size="sm"
              />
              <Textarea
                placeholder="Brand textarea with gold outline"
                label="Brand (Gold Outline)"
                helperText="Premium feature with distinctive gold outline styling"
                variant="brand"
                size="sm"
              />
              <Textarea
                placeholder="Success textarea for validated content"
                label="Success"
                success="Content validated successfully"
                variant="emerald"
                size="sm"
              />
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="Warning textarea requiring attention"
                label="Warning"
                helperText="Content needs review or attention"
                variant="gold"
                size="sm"
              />
              <Textarea
                placeholder="Error textarea with validation issues"
                label="Error"
                error="Content contains validation errors"
                variant="error"
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Textarea Sizes - Content Creation Optimization
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes optimized for different content creation contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Textarea
                  placeholder="Small textarea for brief content..."
                  label="Small (80px min-height)"
                  size="sm"
                  variant="brand"
                  showCharCount
                  maxLength={100}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Compact forms, quick notes</p>
              </div>
              <div className="space-y-3">
                <Textarea
                  placeholder="Default textarea for standard content..."
                  label="Default (96px min-height)"
                  size="default"
                  variant="brand"
                  showCharCount
                  maxLength={250}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Standard content input</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Textarea
                  placeholder="Large textarea for detailed content and longer writing..."
                  label="Large (128px min-height)"
                  size="lg"
                  variant="brand"
                  showCharCount
                  maxLength={500}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Detailed descriptions, long content</p>
              </div>
              <div className="space-y-3">
                <Textarea
                  placeholder="Extra large textarea for extensive writing, essays, and comprehensive content creation..."
                  label="Extra Large (160px min-height)"
                  size="xl"
                  variant="brand"
                  showCharCount
                  maxLength={1000}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Essays, comprehensive content</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ FEATURES</Badge>
            Advanced Features - Auto-resize, Character Counting, Code Input
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced textarea features for enhanced campus content creation experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Auto-resize */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Auto-resize Textarea:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <Textarea
                  placeholder="Start typing and watch this textarea grow automatically as you add more content. It will expand to fit your writing without requiring manual resizing..."
                  label="Auto-expanding Content"
                  helperText="Textarea grows automatically as you type"
                  autoResize
                  variant="brand"
                />
                <Textarea
                  placeholder="This textarea has manual resize enabled. You can drag the corner to resize it yourself..."
                  label="Manual Resize (Vertical)"
                  helperText="Drag the corner handle to resize"
                  resize="vertical"
                  variant="primary"
                />
              </div>
            </div>

            {/* Character Counting */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Character Counting & Limits:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <Textarea
                  placeholder="Type here to see character count in action..."
                  label="Character Counter"
                  helperText="Character count updates as you type"
                  showCharCount
                  maxLength={200}
                  variant="brand"
                />
                <Textarea
                  placeholder="This textarea has a strict character limit..."
                  label="Strict Character Limit"
                  helperText="Input blocked after reaching limit"
                  showCharCount
                  maxLength={100}
                  variant="gold"
                />
              </div>
            </div>

            {/* Code Input */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Code Input Textarea:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <CodeTextarea
                  placeholder="Enter your Python code here..."
                  label="Python Code"
                  language="python"
                  size="lg"
                  resize="both"
                />
                <CodeTextarea
                  placeholder="Enter your JavaScript code here..."
                  label="JavaScript Code"
                  language="javascript"
                  size="lg"
                  resize="both"
                />
              </div>
            </div>

            {/* Textarea Groups */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Textarea Groups:</h4>
              <TextareaGroup orientation="vertical" spacing="md">
                <Textarea
                  placeholder="Project title and overview..."
                  label="Project Overview"
                  size="sm"
                  variant="brand"
                  required
                />
                <Textarea
                  placeholder="Detailed project description..."
                  label="Detailed Description"
                  size="lg"
                  variant="primary"
                  autoResize
                  showCharCount
                  maxLength={1000}
                />
                <Textarea
                  placeholder="Additional notes and comments..."
                  label="Additional Notes"
                  size="default"
                  variant="primary"
                  helperText="Optional additional information"
                />
              </TextareaGroup>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Textarea Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎯 PRESETS</Badge>
            Textarea Presets - Common Campus Content Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built textarea components for common campus content creation scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Comment & Discussion:</h4>
              <TextareaPresets.Comment 
                label="Discussion Comment"
                variant="brand"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Project Description:</h4>
              <TextareaPresets.Description 
                label="Project Description"
                variant="brand"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Personal Notes:</h4>
              <TextareaPresets.Notes 
                label="Study Notes"
                variant="primary"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Code Snippet:</h4>
              <TextareaPresets.Code 
                label="Code Solution"
                language="python"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Feedback Form:</h4>
              <TextareaPresets.Feedback 
                label="Course Feedback"
                variant="brand"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Content Creation Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Textarea usage in actual University at Buffalo academic and social coordination contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Assignment Submission */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Assignment Submission:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <Textarea
                placeholder="Describe your algorithm approach, time complexity analysis, and implementation details..."
                label="Algorithm Analysis (Required)"
                helperText="Explain your approach to the dynamic programming problem"
                variant="brand"
                size="lg"
                required
                showCharCount
                maxLength={1500}
                autoResize
              />
              <TextareaGroup orientation="vertical" spacing="sm">
                <CodeTextarea
                  placeholder="def solve_problem(n):
    # Your implementation here
    pass"
                  label="Python Implementation"
                  language="python"
                  size="lg"
                  resize="both"
                />
                <Textarea
                  placeholder="Explain any challenges faced, debugging process, and lessons learned..."
                  label="Reflection Notes"
                  helperText="Optional reflection on the assignment"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={500}
                />
              </TextareaGroup>
            </div>
          </div>

          {/* Study Group Coordination */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Study Group Formation - Midterm Prep:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <Textarea
                placeholder="We're forming a study group for the CSE 331 midterm exam covering dynamic programming, graph algorithms, and complexity analysis..."
                label="Study Group Description"
                helperText="Describe the study group purpose and topics"
                variant="brand"
                size="lg"
                autoResize
                showCharCount
                maxLength={750}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Textarea
                  placeholder="Preferred meeting times: Weekday evenings after 6pm, Weekend afternoons, Library study rooms..."
                  label="Meeting Preferences"
                  helperText="When and where you'd like to meet"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={300}
                />
                <Textarea
                  placeholder="Topics I need help with: Graph traversal algorithms, Understanding DP recurrence relations..."
                  label="Topics for Help"
                  helperText="Areas where you need support"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={300}
                />
              </div>
            </div>
          </div>

          {/* Residence Hall Event Planning */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Hadley Village Floor Event Planning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <Textarea
                placeholder="Planning a movie night for 2nd Floor East! We'll have popcorn, snacks, and vote on the movie. Great way to take a break from midterm stress..."
                label="Event Description"
                helperText="Describe the event and what to expect"
                variant="brand"
                size="lg"
                autoResize
                showCharCount
                maxLength={800}
              />
              <div className="grid md:grid-cols-3 gap-4">
                <Textarea
                  placeholder="Friday, March 15th at 8pm in the 2nd floor lounge..."
                  label="Date & Time"
                  size="sm"
                  showCharCount
                  maxLength={150}
                />
                <Textarea
                  placeholder="Bring your own drinks, we'll provide popcorn and candy..."
                  label="What to Bring"
                  size="sm"
                  showCharCount
                  maxLength={150}
                />
                <Textarea
                  placeholder="RSVP by Thursday so we know how much food to get..."
                  label="RSVP Details"
                  size="sm"
                  showCharCount
                  maxLength={150}
                />
              </div>
            </div>
          </div>

          {/* Course Project Collaboration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Capstone Project Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <Textarea
                placeholder="Our team is developing a smart campus navigation app that helps UB students find optimal routes, available study spaces, and real-time bus tracking..."
                label="Project Overview"
                helperText="High-level description of the capstone project"
                variant="brand"
                size="xl"
                autoResize
                showCharCount
                maxLength={2000}
              />
              <TextareaGroup orientation="vertical" spacing="md">
                <Textarea
                  placeholder="Week 1: Complete user research and requirements gathering
Week 2: Design system architecture and database schema
Week 3: Begin frontend development..."
                  label="Project Timeline"
                  helperText="Week-by-week breakdown of deliverables"
                  size="lg"
                  autoResize
                  showCharCount
                  maxLength={1200}
                />
                <Textarea
                  placeholder="Frontend: React Native mobile app
Backend: Node.js API with PostgreSQL
Integration: UB bus API, campus maps API..."
                  label="Technical Stack"
                  helperText="Technologies and tools being used"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={600}
                />
              </TextareaGroup>
            </div>
          </div>

          {/* Campus Event Feedback */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Feedback Form:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <Textarea
                placeholder="Please share your thoughts about the Engineering Career Fair. What companies were you most interested in? Were there enough opportunities for your major?..."
                label="Overall Event Experience"
                helperText="Your general thoughts about the event"
                variant="brand"
                size="lg"
                autoResize
                showCharCount
                maxLength={1000}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Textarea
                  placeholder="More companies in software engineering, better signage for finding specific booths, longer time slots for conversations..."
                  label="Suggestions for Improvement"
                  helperText="How can we make it better next time?"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={500}
                />
                <Textarea
                  placeholder="The networking workshop before the fair was really helpful, lunch provided was great, good variety of companies..."
                  label="What Worked Well"
                  helperText="Positive aspects to keep for next time"
                  size="default"
                  autoResize
                  showCharCount
                  maxLength={500}
                />
              </div>
            </div>
          </div>

          {/* Code Review and Help */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CS Peer Code Review:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CodeTextarea
                placeholder="// CSE 250 Binary Search Tree Implementation
class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        # Need help implementing this method
        pass"
                label="Code for Review"
                language="python"
                size="lg"
                resize="both"
              />
              <Textarea
                placeholder="I'm struggling with the insert method for my BST implementation. The logic for finding the correct position seems off, and I'm getting stack overflow errors..."
                label="Specific Questions/Issues"
                helperText="What specific help do you need with this code?"
                variant="gold"
                size="lg"
                autoResize
                showCharCount
                maxLength={800}
              />
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    placeholder: 'Share your thoughts about life at UB...',
    label: 'UB Student Experience',
    helperText: 'Tell us about your favorite aspects of campus life',
    variant: 'brand',
    size: 'default',
    autoResize: true,
    showCharCount: true,
    maxLength: 1000,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Textarea Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different textarea configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Textarea {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};