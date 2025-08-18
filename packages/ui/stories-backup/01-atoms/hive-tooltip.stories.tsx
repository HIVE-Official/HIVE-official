import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveTooltip, HiveTooltipContent, HiveTooltipProvider, HiveTooltipTrigger, HiveMotionTooltip, HiveHelpTooltip, HiveErrorTooltip, HiveSuccessTooltip, HiveGoldTooltip, HiveMinimalTooltip } from '../../components/hive-tooltip';
import { HiveButton } from '../../components/hive-button';
import { Info, HelpCircle, AlertTriangle, CheckCircle, Star, Settings, User, Book, Calendar, Zap } from 'lucide-react';

/**
 * # HiveTooltip - Campus Information System
 * 
 * The HiveTooltip atom is the foundational information overlay component in the HIVE Design System.
 * It provides consistent, accessible contextual information for all campus interfaces with
 * premium liquid metal aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium liquid metal appearance animations
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple specialized variants (help, error, success, gold, minimal)
 * - Smart positioning and collision detection
 * - Delay and timing controls
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized information patterns
 * 
 * ## Usage
 * Perfect for campus information overlays - from help text and error messages
 * to feature explanations, status indicators, and academic guidance systems.
 */

const meta: Meta<typeof HiveTooltip> = {
  title: '01-Atoms/HiveTooltip',
  component: HiveTooltip,
  parameters: {
    docs: {
      description: {
        component: `
# HiveTooltip Component

The foundational information overlay component for all HIVE campus interfaces, featuring premium liquid metal aesthetics.

## Design Philosophy
- **Information First**: Built for campus guidance and help systems
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic contexts
- **Accessible**: WCAG 2.1 AA compliant
- **Versatile**: Multiple specialized variants and positioning

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Smart collision detection and positioning
- Keyboard navigation support
- Motion-aware animations
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred side for tooltip placement'
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment relative to trigger'
    },
    delayDuration: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)'
    }
  },
  decorators: [
    (Story) => (
      <HiveTooltipProvider>
        <div className="p-6 bg-[var(--hive-background-primary)] min-h-[300px] flex items-center justify-center">
          <Story />
        </div>
      </HiveTooltipProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus tooltip
export const Default: Story = {
  render: () => (
    <HiveTooltip>
      <HiveTooltipTrigger asChild>
        <HiveButton variant="outline">Hover for help</HiveButton>
      </HiveTooltipTrigger>
      <HiveTooltipContent>
        <p>This is a helpful tooltip for campus interactions</p>
      </HiveTooltipContent>
    </HiveTooltip>
  )
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    side: 'top',
    align: 'center',
    delayDuration: 700
  },
  render: (args) => (
    <HiveTooltip delayDuration={args.delayDuration}>
      <HiveTooltipTrigger asChild>
        <HiveButton>Interactive tooltip</HiveButton>
      </HiveTooltipTrigger>
      <HiveTooltipContent side={args.side} align={args.align}>
        <p>Customizable tooltip positioning and timing</p>
      </HiveTooltipContent>
    </HiveTooltip>
  )
};

// 3. ALL VARIANTS STORY - Specialized tooltip types
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Tooltip Variants
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Specialized tooltip types for different campus contexts
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Default</h3>
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline" size="sm">
                <Info className="h-4 w-4" />
              </HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent>
              <p>Standard information tooltip</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Help</h3>
          <HiveHelpTooltip content="Get help with this campus feature">
            <HiveButton variant="ghost" size="sm">
              <HelpCircle className="h-4 w-4" />
            </HiveButton>
          </HiveHelpTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Error</h3>
          <HiveErrorTooltip content="Something went wrong with your request">
            <HiveButton variant="outline" size="sm">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </HiveButton>
          </HiveErrorTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Success</h3>
          <HiveSuccessTooltip content="Successfully completed the action">
            <HiveButton variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
            </HiveButton>
          </HiveSuccessTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Gold</h3>
          <HiveGoldTooltip content="Premium feature available">
            <HiveButton variant="premium" size="sm">
              <Star className="h-4 w-4" />
            </HiveButton>
          </HiveGoldTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Minimal</h3>
          <HiveMinimalTooltip content="Subtle information display">
            <HiveButton variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </HiveButton>
          </HiveMinimalTooltip>
        </div>
      </div>
    </div>
  )
};

// 4. POSITIONING STORY - Different positions and alignments
export const Positioning: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Tooltip Positioning
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Smart positioning and alignment options
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Top</h3>
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline">Top</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="top">
              <p>Tooltip appears above</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Bottom</h3>
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline">Bottom</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="bottom">
              <p>Tooltip appears below</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Left</h3>
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline">Left</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="left">
              <p>Tooltip appears to the left</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Right</h3>
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline">Right</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="right">
              <p>Tooltip appears to the right</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Alignment Options</h3>
        <div className="flex justify-center gap-4">
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="ghost">Start Align</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="top" align="start">
              <p>Aligned to start</p>
            </HiveTooltipContent>
          </HiveTooltip>
          
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="ghost">Center Align</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="top" align="center">
              <p>Centered alignment</p>
            </HiveTooltipContent>
          </HiveTooltip>
          
          <HiveTooltip>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="ghost">End Align</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent side="top" align="end">
              <p>Aligned to end</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
      </div>
    </div>
  )
};

// 5. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus situations where tooltips provide guidance
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Academic Tools Interface</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <HiveHelpTooltip content="Calculate your semester GPA based on current grades and credit hours">
                  <HiveButton>
                    GPA Calculator
                    <HelpCircle className="ml-2 h-4 w-4" />
                  </HiveButton>
                </HiveHelpTooltip>
                
                <HiveTooltip>
                  <HiveTooltipTrigger asChild>
                    <HiveButton variant="outline">
                      <Settings className="h-4 w-4" />
                    </HiveButton>
                  </HiveTooltipTrigger>
                  <HiveTooltipContent>
                    <p>Customize calculation settings</p>
                  </HiveTooltipContent>
                </HiveTooltip>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Current GPA: 3.7</span>
                  <HiveSuccessTooltip content="Great job! You're above the Dean's List requirement">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </HiveSuccessTooltip>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Credits Completed: 89/120</span>
                  <HiveTooltip>
                    <HiveTooltipTrigger asChild>
                      <Info className="h-4 w-4 text-blue-400" />
                    </HiveTooltipTrigger>
                    <HiveTooltipContent>
                      <p>31 credits remaining for graduation</p>
                    </HiveTooltipContent>
                  </HiveTooltip>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Course Selection</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span className="text-sm">CS 301 - Advanced Algorithms</span>
                  <HiveTooltip>
                    <HiveTooltipTrigger asChild>
                      <Star className="h-4 w-4 text-yellow-400" />
                    </HiveTooltipTrigger>
                    <HiveTooltipContent>
                      <p>Highly rated course (4.8/5 stars)</p>
                    </HiveTooltipContent>
                  </HiveTooltip>
                </div>
                
                <HiveHelpTooltip content="Prerequisites: CS 201, CS 250, and MATH 230. Recommended for junior/senior CS majors.">
                  <HiveButton variant="outline" size="sm">
                    Prerequisites
                  </HiveButton>
                </HiveHelpTooltip>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Prof. Johnson</span>
                  <HiveTooltip>
                    <HiveTooltipTrigger asChild>
                      <Info className="h-4 w-4" />
                    </HiveTooltipTrigger>
                    <HiveTooltipContent>
                      <p>Office hours: MWF 2-4pm, CSE Building Room 312</p>
                    </HiveTooltipContent>
                  </HiveTooltip>
                </div>
                
                <HiveErrorTooltip content="Class is currently full. Join the waitlist to be notified of openings.">
                  <HiveButton variant="outline" size="sm" disabled>
                    Full (0/30)
                  </HiveButton>
                </HiveErrorTooltip>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Study Group Dashboard</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Physics Study Group</span>
                <div className="flex items-center gap-2">
                  <HiveTooltip>
                    <HiveTooltipTrigger asChild>
                      <Calendar className="h-4 w-4" />
                    </HiveTooltipTrigger>
                    <HiveTooltipContent>
                      <p>Next session: Tomorrow 7PM, Library Room 204</p>
                    </HiveTooltipContent>
                  </HiveTooltip>
                  
                  <HiveGoldTooltip content="This is a premium study group with verified tutors">
                    <Star className="h-4 w-4 text-yellow-400" />
                  </HiveGoldTooltip>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <HiveTooltip>
                  <HiveTooltipTrigger asChild>
                    <span className="text-xs text-[var(--hive-text-secondary)]">12 members</span>
                  </HiveTooltipTrigger>
                  <HiveTooltipContent>
                    <div className="text-xs">
                      <p>Active members: 8</p>
                      <p>New this week: 2</p>
                      <p>Average attendance: 9/12</p>
                    </div>
                  </HiveTooltipContent>
                </HiveTooltip>
                
                <HiveSuccessTooltip content="High group activity - members are actively participating">
                  <Zap className="h-4 w-4 text-green-400" />
                </HiveSuccessTooltip>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Profile Settings</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Public Profile</span>
                <div className="flex items-center gap-2">
                  <HiveTooltip>
                    <HiveTooltipTrigger asChild>
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    </HiveTooltipTrigger>
                    <HiveTooltipContent>
                      <p>Your profile is visible to all students</p>
                    </HiveTooltipContent>
                  </HiveTooltip>
                  
                  <HiveHelpTooltip content="Making your profile public allows other students to find you for study groups and collaboration">
                    <HelpCircle className="h-4 w-4" />
                  </HiveHelpTooltip>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Study Schedule Sharing</span>
                <HiveMinimalTooltip content="Share your study schedule with classmates to coordinate group sessions">
                  <Info className="h-4 w-4" />
                </HiveMinimalTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. MOTION INTEGRATION STORY - Liquid metal animations
export const MotionIntegration: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Motion Integration
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          HIVE liquid metal tooltip animations
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center space-y-4">
          <h3 className="font-medium">Standard Motion</h3>
          <HiveTooltip delayDuration={100}>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="outline">Quick Appear</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent>
              <p>Fast liquid metal entrance</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="font-medium">Enhanced Motion</h3>
          <HiveMotionTooltip 
            content="Premium tooltip with enhanced liquid metal animations"
            delayDuration={200}
          >
            <HiveButton variant="premium">Premium Motion</HiveButton>
          </HiveMotionTooltip>
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="font-medium">Delayed Appearance</h3>
          <HiveTooltip delayDuration={1000}>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="ghost">Hover & Wait</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent>
              <p>Appears after 1 second delay</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="font-medium">Instant Display</h3>
          <HiveTooltip delayDuration={0}>
            <HiveTooltipTrigger asChild>
              <HiveButton variant="minimal">Instant</HiveButton>
            </HiveTooltipTrigger>
            <HiveTooltipContent>
              <p>No delay - appears immediately</p>
            </HiveTooltipContent>
          </HiveTooltip>
        </div>
      </div>
    </div>
  )
};