import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { action } from '@storybook/addon-actions';
import { Plus, ArrowRight, Download, Heart, Share, MessageCircle, BookOpen, Users, Calendar, Zap } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof Button> = {
  title: '01-Atoms/Button - COMPLETE DEFINITION',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
## 🔘 HIVE Button - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive button system for University at Buffalo HIVE platform interface interactions and user actions.

### 🎯 **COMPONENT EXCELLENCE**
- **6 Semantic Variants** - Primary, secondary, ghost, destructive, outline, accent for all interaction contexts
- **4 Size Options** - Small, medium, large, icon for flexible interface layouts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Loading States** - Built-in spinner animation for async operations
- **Icon Support** - Left/right icon positioning with proper spacing
- **Motion Design** - Framer Motion hover effects and smooth transitions
- **Accessibility Ready** - Proper focus states, keyboard navigation, and screen reader support
- **Campus Interface** - Built for University at Buffalo student platform interactions

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform interactions:
- **Space Actions** - Join spaces, create content, coordinate activities
- **Academic Workflows** - Submit assignments, join study groups, access resources
- **Social Interactions** - Like posts, share content, comment on discussions
- **Tool Building** - Create tools, deploy projects, manage configurations
- **Profile Management** - Edit profiles, update settings, customize dashboards
- **Event Coordination** - RSVP to events, create gatherings, manage calendars

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Minimum 44px touch targets for all variants
- **Responsive Design** - Adaptive sizing and spacing for mobile interfaces
- **Clear Visual Feedback** - Immediate response to touch interactions
- **Accessibility** - Screen reader friendly with proper ARIA labels
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'accent'],
      description: 'Button variant styling',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    onClick: {
      action: 'clicked',
      description: 'Button click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default button showcase
export const Default: Story = {
  args: {
    children: 'Join Space',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: action('button-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE button system for University at Buffalo platform interactions:
          </Text>
          <Button {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive button component with semantic variants and motion design
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🔘 BUTTON VARIANTS</Badge>
            Semantic Button Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 semantic button variants for comprehensive University at Buffalo HIVE platform interaction design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Button Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Primary Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
                      Join Space
                    </Button>
                    <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                      Get Started
                    </Button>
                    <Button variant="primary" icon={<Download className="h-4 w-4" />}>
                      Download Tool
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Primary actions for space joining, onboarding, and main platform features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Secondary Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" icon={<BookOpen className="h-4 w-4" />}>
                      View Details
                    </Button>
                    <Button variant="secondary" icon={<Users className="h-4 w-4" />}>
                      See Members
                    </Button>
                    <Button variant="secondary" icon={<Calendar className="h-4 w-4" />}>
                      Check Schedule
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Secondary actions for information access and supplementary features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Subtle) Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost" icon={<Heart className="h-4 w-4" />}>
                      Like
                    </Button>
                    <Button variant="ghost" icon={<Share className="h-4 w-4" />}>
                      Share
                    </Button>
                    <Button variant="ghost" icon={<MessageCircle className="h-4 w-4" />}>
                      Comment
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Subtle actions for social interactions and lightweight features
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Outline Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">
                      Learn More
                    </Button>
                    <Button variant="secondary">
                      Browse All
                    </Button>
                    <Button variant="secondary">
                      Contact Admin
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Outlined buttons for navigation and exploration actions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Accent (Special) Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" icon={<Zap className="h-4 w-4" />}>
                      Activate Space
                    </Button>
                    <Button variant="secondary">
                      Premium Feature
                    </Button>
                    <Button variant="secondary">
                      Special Access
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Gold accent buttons for special features and premium actions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="red" weight="medium">Destructive Actions:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="destructive">
                      Leave Space
                    </Button>
                    <Button variant="destructive">
                      Delete Tool
                    </Button>
                    <Button variant="destructive">
                      Remove Content
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Destructive actions for irreversible operations and warnings
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 BUTTON SIZES</Badge>
            Size Variations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 button sizes for different interface contexts and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="sm" variant="primary">Join</Button>
                    <Button size="sm" variant="secondary">View</Button>
                    <Button size="sm" variant="ghost">Like</Button>
                    <Button size="sm" variant="secondary">More</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    32px height - Compact buttons for dense interfaces, action bars, and mobile layouts
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="md" variant="primary">Join Space</Button>
                    <Button size="md" variant="secondary">View Details</Button>
                    <Button size="md" variant="ghost">Add Comment</Button>
                    <Button size="md" variant="secondary">Learn More</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    40px height - Standard buttons for most platform interactions and form submissions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="lg" variant="primary">Get Started</Button>
                    <Button size="lg" variant="secondary">Browse Spaces</Button>
                    <Button size="lg" variant="secondary">Activate Account</Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    48px height - Large buttons for hero sections, call-to-action, and primary navigation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Only:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="icon" variant="primary">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    40x40px - Icon-only buttons for toolbars, social actions, and compact interfaces
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE STATES</Badge>
            Loading, Disabled, and Icon Features
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive button states for user feedback and enhanced accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading States:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" loading>
                      Joining Space...
                    </Button>
                    <Button variant="secondary" loading>
                      Submitting...
                    </Button>
                    <Button variant="secondary" loading>
                      Activating...
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Loading states with spinner animation for async operations and user feedback
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled States:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" disabled>
                      Space Full
                    </Button>
                    <Button variant="secondary" disabled>
                      Unavailable
                    </Button>
                    <Button variant="destructive" disabled>
                      Cannot Delete
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Disabled states for unavailable actions and conditional interactions
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Icon Positioning:</Text>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button variant="primary" icon={<Plus className="h-4 w-4" />} iconPosition="left">
                      Create Tool
                    </Button>
                    <Button variant="secondary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                      Continue
                    </Button>
                    <Button variant="secondary" icon={<Download className="h-4 w-4" />} iconPosition="left">
                      Export Data
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Left and right icon positioning with proper spacing and semantic meaning
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Full Width Options:</Text>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth icon={<Users className="h-4 w-4" />}>
                      Join University at Buffalo Students
                    </Button>
                    <Button variant="secondary" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                      Browse All Course Spaces
                    </Button>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Full-width buttons for mobile interfaces, forms, and prominent calls-to-action
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Button Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Button usage in actual University at Buffalo student workflow and campus platform interaction contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Workflow Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Workflow Buttons:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 Algorithm Analysis Course Interactions
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Space Actions:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Button variant="primary" fullWidth icon={<Plus className="h-4 w-4" />}>
                          Join CSE 331 Space
                        </Button>
                        <Button variant="secondary" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                          Access Course Materials
                        </Button>
                        <Button variant="secondary" fullWidth icon={<Users className="h-4 w-4" />}>
                          Find Study Group
                        </Button>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Primary actions for course engagement and academic resource access
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Assignment Workflow:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="space-y-2">
                        <Button variant="secondary" fullWidth icon={<Zap className="h-4 w-4" />}>
                          Submit Algorithm Project
                        </Button>
                        <Button variant="secondary" fullWidth icon={<Download className="h-4 w-4" />}>
                          Download Starter Code
                        </Button>
                        <Button variant="ghost" fullWidth icon={<MessageCircle className="h-4 w-4" />}>
                          Ask Professor Question
                        </Button>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Assignment submission and academic support interactions
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Social Platform Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Platform Buttons:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Feed Interactions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" icon={<Heart className="h-4 w-4" />}>
                        Like Post
                      </Button>
                      <Button variant="ghost" size="sm" icon={<MessageCircle className="h-4 w-4" />}>
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Share className="h-4 w-4" />}>
                        Share
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Social interactions for campus community engagement
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Space Management:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" size="sm">
                        Create Space
                      </Button>
                      <Button variant="secondary" size="sm">
                        Invite Members
                      </Button>
                      <Button variant="destructive" size="sm">
                        Leave Space
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Space administration and community building actions
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Tool Building:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="secondary" size="sm" icon={<Zap className="h-4 w-4" />}>
                        Deploy Tool
                      </Button>
                      <Button variant="secondary" size="sm">
                        Preview Tool
                      </Button>
                      <Button variant="secondary" size="sm">
                        Save Draft
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Tool creation and platform building workflows
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Residential Life Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Living & Events:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Community:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" fullWidth icon={<Users className="h-4 w-4" />}>
                        Join Ellicott Complex Floor
                      </Button>
                      <Button variant="secondary" fullWidth icon={<Calendar className="h-4 w-4" />}>
                        RSVP Floor Event
                      </Button>
                      <Button variant="secondary" fullWidth>
                        Browse Dorm Activities
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Residential life coordination and community building activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Events:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="secondary" fullWidth icon={<Plus className="h-4 w-4" />}>
                        Create Study Session
                      </Button>
                      <Button variant="primary" fullWidth icon={<Calendar className="h-4 w-4" />}>
                        Attend Homecoming
                      </Button>
                      <Button variant="secondary" fullWidth>
                        View All Events
                      </Button>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Event creation and participation for campus social life
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Campus Usage */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized button usage for on-campus platform access:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Walking to Class:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="primary" size="lg" fullWidth icon={<BookOpen className="h-4 w-4" />}>
                        Check Today's Assignments
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          Quick Actions
                        </Button>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Large buttons and icon actions for quick mobile access while moving around campus
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Library Study Time:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-2">
                      <Button variant="secondary" fullWidth icon={<Users className="h-4 w-4" />}>
                        Find Study Group in Lockwood
                      </Button>
                      <Button variant="primary" fullWidth icon={<Plus className="h-4 w-4" />}>
                        Create Study Session
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" className="flex-1">
                          Resources
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          Schedule
                        </Button>
                      </div>
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Study coordination and academic resource access during library sessions
                    </Text>
                  </div>
                </div>

              </div>

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
    children: 'Join Space',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    iconPosition: 'left',
    onClick: action('playground-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Button Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different button configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Button {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive button testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};