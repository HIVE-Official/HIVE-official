import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardFooter } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { User, Settings, Share2, Heart, MessageCircle } from 'lucide-react';

/**
 * # HiveCard - Foundational Campus Container
 * 
 * The HiveCard atom is the foundational container component in the HIVE Design System.
 * It provides a consistent, accessible container for all campus content with premium
 * glass morphism aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium glass morphism with backdrop blur
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants for different contexts
 * - Composable header, content, and footer sections
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized interaction patterns
 * 
 * ## Usage
 * Perfect for containing all campus content - from study group cards to tool interfaces,
 * profile sections, and academic dashboards.
 */

const meta: Meta<typeof HiveCard> = {
  title: '01-Atoms/HiveCard',
  component: HiveCard,
  parameters: {
    docs: {
      description: {
        component: `
# HiveCard Component

The foundational container component for all HIVE campus content, featuring premium glass morphism aesthetics.

## Design Philosophy
- **Glass Morphism**: Premium backdrop blur and transparency
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic content
- **Accessible**: WCAG 2.1 AA compliant
- **Composable**: Header, content, footer sections

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Framer Motion integration for animations
- Responsive design patterns
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'premium', 'glass', 'outlined', 'elevated'],
      description: 'Visual style variant'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px]">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus card
export const Default: Story = {
  render: () => (
    <HiveCard className="w-full max-w-md">
      <HiveCardHeader>
        <HiveCardTitle>CS 101 Study Group</HiveCardTitle>
        <HiveCardDescription>
          Join your classmates for collaborative learning and exam prep
        </HiveCardDescription>
      </HiveCardHeader>
      <HiveCardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
            <User className="h-4 w-4" />
            <span>12 members</span>
          </div>
          <p className="text-sm">
            Weekly study sessions covering algorithms, data structures, and programming fundamentals.
            All skill levels welcome!
          </p>
        </div>
      </HiveCardContent>
      <HiveCardFooter className="flex gap-2">
        <HiveButton size="sm">Join Group</HiveButton>
        <HiveButton variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </HiveButton>
      </HiveCardFooter>
    </HiveCard>
  )
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'default',
    className: 'w-full max-w-md'
  },
  render: (args) => (
    <HiveCard {...args}>
      <HiveCardHeader>
        <HiveCardTitle>Interactive Card</HiveCardTitle>
        <HiveCardDescription>
          Experiment with different card variants and properties
        </HiveCardDescription>
      </HiveCardHeader>
      <HiveCardContent>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Use the controls panel to explore different card variants and see how they affect the appearance.
        </p>
      </HiveCardContent>
    </HiveCard>
  )
};

// 3. ALL VARIANTS STORY - Complete variant showcase  
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Default</h3>
        <HiveCard variant="default" className="max-w-sm">
          <HiveCardHeader>
            <HiveCardTitle>Default Style</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-sm">Standard campus card appearance</p>
          </HiveCardContent>
        </HiveCard>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Premium</h3>
        <HiveCard variant="premium" className="max-w-sm">
          <HiveCardHeader>
            <HiveCardTitle>Premium Style</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-sm">Enhanced visual hierarchy</p>
          </HiveCardContent>
        </HiveCard>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Glass</h3>
        <HiveCard variant="glass" className="max-w-sm">
          <HiveCardHeader>
            <HiveCardTitle>Glass Style</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-sm">Glass morphism effect</p>
          </HiveCardContent>
        </HiveCard>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Outlined</h3>
        <HiveCard variant="outlined" className="max-w-sm">
          <HiveCardHeader>
            <HiveCardTitle>Outlined Style</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-sm">Clean border emphasis</p>
          </HiveCardContent>
        </HiveCard>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Elevated</h3>
        <HiveCard variant="elevated" className="max-w-sm">
          <HiveCardHeader>
            <HiveCardTitle>Elevated Style</HiveCardTitle>
          </HiveCardHeader>
          <HiveCardContent>
            <p className="text-sm">Enhanced depth and shadow</p>
          </HiveCardContent>
        </HiveCard>
      </div>
    </div>
  )
};

// 4. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus situations where cards are used
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Study Groups</h3>
          <HiveCard>
            <HiveCardHeader>
              <HiveCardTitle>Physics 201 Study Group</HiveCardTitle>
              <HiveCardDescription>Quantum mechanics and thermodynamics</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>8 members</span>
                </div>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Next session: Thursday 7PM, Library Room 204
                </p>
              </div>
            </HiveCardContent>
            <HiveCardFooter>
              <HiveButton size="sm">Join Group</HiveButton>
              <HiveButton variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Campus Tools</h3>  
          <HiveCard variant="premium">
            <HiveCardHeader>
              <HiveCardTitle>GPA Calculator</HiveCardTitle>
              <HiveCardDescription>Track your academic progress</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-[var(--hive-text-secondary)]">Current GPA:</span>
                  <span className="ml-2 font-semibold text-[var(--hive-brand-primary)]">3.7</span>
                </div>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Used by 1,247 students this semester
                </p>
              </div>
            </HiveCardContent>
            <HiveCardFooter>
              <HiveButton size="sm">Open Tool</HiveButton>
              <HiveButton variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social Feed</h3>
          <HiveCard variant="glass">
            <HiveCardHeader>
              <HiveCardTitle>Sarah Chen</HiveCardTitle>
              <HiveCardDescription>Just finished the CS project!</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <p className="text-sm">
                Finally got the neural network working for our machine learning assignment. 
                Happy to help anyone struggling with backpropagation! 🎉
              </p>
            </HiveCardContent>
            <HiveCardFooter className="flex gap-4">
              <HiveButton variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                12
              </HiveButton>
              <HiveButton variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                5
              </HiveButton>
              <HiveButton variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Announcements</h3>
          <HiveCard variant="outlined">
            <HiveCardHeader>
              <HiveCardTitle>Library Hours Update</HiveCardTitle>
              <HiveCardDescription>Extended hours during finals week</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <p className="text-sm">
                The main library will be open 24/7 from December 10-17 to support students 
                during finals week. Study rooms available for reservation.
              </p>
            </HiveCardContent>
            <HiveCardFooter>
              <HiveButton variant="secondary" size="sm">Reserve Room</HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
      </div>
    </div>
  )
};

// 5. COMPOSITION STORY - Component composition patterns
export const Composition: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Component Composition
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different ways to compose HiveCard with header, content, and footer
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Header + Content Only</h3>
          <HiveCard className="max-w-sm">
            <HiveCardHeader>
              <HiveCardTitle>Simple Card</HiveCardTitle>
              <HiveCardDescription>No footer, just information</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <p className="text-sm">Perfect for displaying information without actions.</p>
            </HiveCardContent>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Content + Footer Only</h3>
          <HiveCard className="max-w-sm">
            <HiveCardContent>
              <p className="text-sm font-medium mb-2">Quick Action Card</p>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Minimal design focused on actions
              </p>
            </HiveCardContent>
            <HiveCardFooter>
              <HiveButton size="sm">Take Action</HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Content Only</h3>
          <HiveCard className="max-w-sm">
            <HiveCardContent>
              <div className="text-center py-4">
                <User className="h-12 w-12 mx-auto mb-3 text-[var(--hive-text-secondary)]" />
                <p className="font-medium">Minimal Content Card</p>
                <p className="text-sm text-[var(--hive-text-secondary)]">Clean and simple</p>
              </div>
            </HiveCardContent>
          </HiveCard>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Full Composition</h3>
          <HiveCard className="max-w-sm">
            <HiveCardHeader>
              <HiveCardTitle>Complete Card</HiveCardTitle>
              <HiveCardDescription>All sections included</HiveCardDescription>
            </HiveCardHeader>
            <HiveCardContent>
              <p className="text-sm">Full header, content, and footer composition pattern.</p>
            </HiveCardContent>
            <HiveCardFooter className="flex gap-2">
              <HiveButton size="sm">Primary</HiveButton>
              <HiveButton variant="secondary" size="sm">Secondary</HiveButton>
            </HiveCardFooter>
          </HiveCard>
        </div>
      </div>
    </div>
  )
};