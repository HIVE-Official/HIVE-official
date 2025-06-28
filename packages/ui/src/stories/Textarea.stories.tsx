/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
 
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileText, Send, Users, Calendar } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { Textarea } from '@/components/textarea'


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
          Multi-line text input with HIVE motion and consistent styling across all variants.
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
              <Textarea id="default" placeholder="Enter your message..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filled">Filled</Label>
              <Textarea id="filled" variant="filled" placeholder="Subtle background style" />
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
            <p className="text-body-sm text-muted/80">Different heights for varied content needs</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="small">Small</Label>
              <Textarea id="small" size="sm" placeholder="Compact textarea" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-size">Default</Label>
              <Textarea id="default-size" placeholder="Standard height" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="large">Large</Label>
              <Textarea id="large" size="lg" placeholder="Spacious for longer content" />
            </div>
          </div>
        </div>
      </div>
      
      {/* States */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-caption text-muted font-medium uppercase tracking-wide">States</h4>
          <p className="text-body-sm text-muted/80">Feedback through typography and subtle styling</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="normal">Normal State</Label>
            <Textarea id="normal" placeholder="Ready for input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled State</Label>
            <Textarea id="disabled" placeholder="Cannot be edited" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="with-value">With Content</Label>
            <Textarea 
              id="with-value" 
              defaultValue="This textarea already has some content that demonstrates how text appears with proper line height and spacing."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeholder">With Placeholder</Label>
            <Textarea id="placeholder" placeholder="Enter a detailed description of your project, including goals, timeline, and any specific requirements or constraints..." />
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
            <Label htmlFor="post-content">Your Update</Label>
            <Textarea 
              id="post-content"
              size="lg"
              placeholder="Share your progress, ask questions, or help fellow students..."
              defaultValue=""
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            <div className="flex items-center justify-between text-caption text-muted">
              <span>{charCount}/{maxChars} characters</span>
              <span>Markdown supported</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-3 w-3" />
                Add Link
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar className="mr-2 h-3 w-3" />
                Schedule
              </Button>
            </div>
            <Button variant="primary-white">
              <Send className="mr-2 h-4 w-4" />
              Share Update
            </Button>
          </div>
        </div>
      </div>
    );
  },
}

export const MessageReply: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-background rounded-lg border border-border max-w-md">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">Reply to Sarah</h3>
        <p className="text-body-sm text-muted">Responding to: "Need help with dynamic programming..."</p>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="reply-message">Your Reply</Label>
          <Textarea 
            id="reply-message"
            placeholder="Share your thoughts, provide help, or ask follow-up questions..."
            defaultValue="I had the same issue! The key insight is to think about the optimal substructure. Try breaking down the problem into smaller subproblems and see if you can identify the recurrence relation."
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="primary-white" size="sm" fullWidth>
            Send Reply
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            Save Draft
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
        <p className="text-body-sm text-muted">Set up a study session for your space</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <input 
              id="event-title"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground transition-all duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="Algorithm Study Session"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-date">Date & Time</Label>
            <input 
              id="event-date"
              type="datetime-local"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground transition-all duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="event-description">Description</Label>
          <Textarea 
            id="event-description"
            size="lg"
            placeholder="Describe what you'll cover, what to bring, and any preparation needed..."
            defaultValue="We'll work through dynamic programming problems from the textbook and review key concepts for the upcoming exam. Bring your laptop with a code editor setup.

Topics covered:
• Memoization techniques
• Bottom-up vs top-down approaches
• Common DP patterns (knapsack, LCS, etc.)

This is a collaborative session - come with questions!"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="event-location">Location</Label>
          <div className="relative">
            <input 
              id="event-location"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-body text-foreground transition-all duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="Gates Building, Room 104"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button variant="primary-white" fullWidth>
            <Users className="mr-2 h-4 w-4" />
            Create Event
          </Button>
          <Button variant="outline" fullWidth>
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const FeedbackForm: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-background rounded-lg border border-border max-w-lg">
      <div className="space-y-2">
        <h3 className="font-display text-h4 text-foreground">Course Feedback</h3>
        <p className="text-body-sm text-muted">Help improve CS 161 for future students</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="positive-feedback">What worked well?</Label>
          <Textarea 
            id="positive-feedback"
            placeholder="Share what aspects of the course were most helpful..."
            defaultValue="The problem sets were challenging but fair, and the TAs provided excellent support during office hours."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="improvement-feedback">What could be improved?</Label>
          <Textarea 
            id="improvement-feedback"
            placeholder="Suggest improvements or highlight challenges..."
            defaultValue=""
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additional-comments">Additional Comments</Label>
          <Textarea 
            id="additional-comments"
            size="sm"
            placeholder="Any other thoughts or suggestions..."
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button variant="primary-white" fullWidth>
            Submit Feedback
          </Button>
          <Button variant="ghost" fullWidth>
            Save for Later
          </Button>
        </div>
      </div>
    </div>
  ),
}

// === BASIC VARIANTS ===
export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
}

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "Filled textarea style",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline", 
    placeholder: "Outline textarea style",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    placeholder: "Ghost textarea style",
  },
}

// === SIZE VARIANTS ===
export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small textarea",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large textarea for longer content",
  },
}

// === STATE VARIANTS ===
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "This textarea has pre-filled content that demonstrates the text styling and spacing used in the HIVE design system.",
  },
}

export const WithLongContent: Story = {
  args: {
    defaultValue: `This is a longer piece of content that demonstrates how the textarea handles multiple lines of text.

It includes line breaks and shows how the typography system works with larger amounts of content.

The textarea automatically expands to show all the content while maintaining the proper line height and spacing defined in the HIVE design system.`,
  },
}
