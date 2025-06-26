// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { MessageSquare, FileText, Edit3, Send, Hash, Users, Calendar, Star } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { Textarea } from '@/components/textarea'
import { Badge } from '../components/badge'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: "dark",
          value: "#0A0A0A", // HIVE background
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

// === HIVE BRAND SHOWCASE ===
export const BrandShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-background rounded-lg border border-border max-w-2xl">
      <div className="space-y-3">
        <h3 className="font-display text-h3 text-foreground">HIVE Textarea System</h3>
        <p className="text-body text-muted max-w-xl">
          Multi-line text input with consistent styling. Gold focus states and subtle HIVE aesthetic.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Textarea Variants */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Textarea Variants</h4>
            <p className="text-body-sm text-muted/80">Different visual styles for varied contexts</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default">Default</Label>
              <Textarea id="default" placeholder="Share your thoughts..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filled">Filled</Label>
              <Textarea id="filled" variant="filled" placeholder="Subtle background styling" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outline">Outline</Label>
              <Textarea id="outline" variant="outline" placeholder="Emphasized border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ghost">Ghost</Label>
              <Textarea id="ghost" variant="ghost" placeholder="Minimal appearance" />
            </div>
          </div>
        </div>
        
        {/* Size Variants */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Size Variants</h4>
            <p className="text-body-sm text-muted/80">Different heights for different content types</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="small">Small</Label>
              <Textarea id="small" size="sm" placeholder="Compact textarea for brief content" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-size">Default</Label>
              <Textarea id="default-size" placeholder="Standard textarea height" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="large">Large</Label>
              <Textarea id="large" size="lg" placeholder="Spacious textarea for longer content" />
            </div>
          </div>
        </div>
      </div>
      
      {/* States */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-caption text-muted font-medium uppercase tracking-wide">Textarea States</h4>
          <p className="text-body-sm text-muted/80">Clean state management without color coding</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="normal">Normal State</Label>
            <Textarea id="normal" placeholder="Ready for your input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled State</Label>
            <Textarea id="disabled" placeholder="Cannot be edited" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">With Content</Label>
            <Textarea 
              id="value" 
              defaultValue="This textarea already has some content that demonstrates how text appears within the component."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeholder">With Placeholder</Label>
            <Textarea id="placeholder" placeholder="This placeholder text shows how empty states appear..." />
          </div>
        </div>
      </div>
    </div>
  ),
}

// === REAL-WORLD SCENARIOS ===
export const PostComposer: Story = {
  render: () => {
    const [charCount, setCharCount] = useState(0);
    const maxChars = 500;
    
    return (
      <div className="space-y-6 p-8 bg-background rounded-lg border border-border max-w-lg">
        <div className="space-y-2">
          <h3 className="font-display text-h4 text-foreground">Share an Update</h3>
          <p className="text-body-sm text-muted">What&apos;s happening in your academic journey?</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-content">Your thoughts</Label>
            <Textarea 
              id="post-content" 
              size="lg"
              placeholder="Share a breakthrough, ask for help, or discuss what you're learning..."
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Badge variant="ghost" size="sm">
                  <Hash className="mr-1 h-3 w-3" />
                  Add tags
                </Badge>
                <Badge variant="ghost" size="sm">
                  <Users className="mr-1 h-3 w-3" />
                  Mention
                </Badge>
              </div>
              <span className={`text-caption ${charCount > maxChars ? 'text-accent' : 'text-muted'}`}>
                {charCount}/{maxChars}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary-black" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Share Update
            </Button>
            <Button variant="ghost">
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
}

export const MessageReply: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-surface rounded-lg border border-border max-w-md">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-accent" />
          <h4 className="font-display text-body font-semibold text-foreground">Reply to Discussion</h4>
        </div>
        <p className="text-body-sm text-muted">Responding to &ldquo;Best practices for algorithm optimization&rdquo;</p>
      </div>
      
      <div className="space-y-3">
        <Textarea 
          variant="filled"
          placeholder="Share your insights, ask questions, or continue the conversation..."
          size="default"
        />
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <FileText className="mr-2 h-3 w-3" />
              Attach
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="mr-2 h-3 w-3" />
              Save Draft
            </Button>
          </div>
          <Button variant="outline">
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const EventDescription: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-background rounded-lg border border-border max-w-lg">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">Create Study Event</h3>
        <p className="text-body-sm text-muted">Organize a collaborative learning session</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <input 
              id="event-title" 
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="Algorithm Study Session"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-date">Date & Time</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <input 
                id="event-date" 
                className="flex h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2 text-body text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                placeholder="Dec 18, 7 PM"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="event-desc">Event Description</Label>
          <Textarea 
            id="event-desc" 
            size="lg"
            variant="outline"
            placeholder="Describe what you'll be studying, what materials to bring, the format (lecture review, problem solving, Q&A), and any other important details..."
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button variant="ritual" className="flex-1">
            Create Event
          </Button>
          <Button variant="ghost" className="flex-1">
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const FeedbackForm: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-background rounded-lg border border-border max-w-md">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">Share Feedback</h3>
        <p className="text-body-sm text-muted">Help us improve HIVE for your academic community</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedback-type">Feedback Category</Label>
          <select 
            id="feedback-type"
            className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <option>General Feedback</option>
            <option>Feature Request</option>
            <option>Bug Report</option>
            <option>User Experience</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="feedback-details">Details</Label>
          <Textarea 
            id="feedback-details" 
            size="lg"
            variant="filled"
            placeholder="Tell us about your experience using HIVE. What's working well? What could be improved? Any specific features you'd like to see?"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input type="checkbox" id="anonymous" className="rounded border-border" />
          <Label htmlFor="anonymous" className="text-body-sm">Submit anonymously</Label>
        </div>
        
        <Button variant="primary-black" fullWidth>
          Submit Feedback
        </Button>
      </div>
    </div>
  ),
}

// === INDIVIDUAL VARIANTS ===
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Type your content here...',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Share your thoughts...',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Minimal styling...',
  },
};

// === SIZES ===
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 bg-background p-6 rounded-lg border border-border max-w-md">
      <h4 className="text-h4 font-display text-foreground">Textarea Sizes</h4>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="small">Small</Label>
          <Textarea id="small" size="sm" placeholder="Compact height" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="default-size">Default</Label>
          <Textarea id="default-size" placeholder="Standard height" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="large">Large</Label>
          <Textarea id="large" size="lg" placeholder="Generous height for longer content" />
        </div>
      </div>
    </div>
  ),
};

// === STATES ===
export const States: Story = {
  render: () => (
    <div className="space-y-4 bg-background p-6 rounded-lg border border-border max-w-md">
      <h4 className="text-h4 font-display text-foreground">Textarea States</h4>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="normal">Normal</Label>
          <Textarea id="normal" placeholder="Ready for input" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="disabled">Disabled</Label>
          <Textarea id="disabled" placeholder="Cannot be edited" disabled />
        </div>
        <div className="space-y-1">
          <Label htmlFor="content">With Content</Label>
          <Textarea 
            id="content" 
            defaultValue="This textarea contains some sample content to show how text appears when the field is populated."
          />
        </div>
      </div>
    </div>
  ),
};

// === COMPLEX FORMS ===
export const ComplexForm: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-background rounded-lg border border-border max-w-lg">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">Course Review</h3>
        <p className="text-body-sm text-muted">Share your experience to help fellow students</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="course-code">Course Code</Label>
            <input 
              id="course-code" 
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="CS 61B"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="professor">Professor</Label>
            <input 
              id="professor" 
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="Dr. Smith"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="review-content">Your Review</Label>
          <Textarea 
            id="review-content" 
            size="lg"
            placeholder="Share your honest experience: course difficulty, workload, teaching quality, key takeaways, and tips for future students..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="advice">Advice for Future Students</Label>
          <Textarea 
            id="advice" 
            variant="filled"
            placeholder="Any specific study tips, preparation advice, or things you wish you knew before taking this course..."
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button variant="primary-black" className="flex-1">
            Submit Review
          </Button>
          <Button variant="outline" className="flex-1">
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  ),
};
