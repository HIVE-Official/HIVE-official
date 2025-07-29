import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Star, CheckCircle, Crown, Heart, Zap, Users } from 'lucide-react';
import { ProfileBadge } from '../../atomic/atoms/profile-badge';

/**
 * # Profile Badge Atom - Social Media + Utility
 * 
 * Profile badges are essential social proof elements in HIVE's social media platform.
 * They combine utility (academic achievements, skill levels) with social recognition
 * (community status, peer endorsements) to create engaging campus connections.
 * 
 * ## Social Media Features
 * - Visual status indicators for social proof
 * - Achievement showcases for peer recognition  
 * - Community role displays for group dynamics
 * - Interactive engagement elements
 * 
 * ## Utility Features
 * - Academic progress tracking
 * - Skill level indicators
 * - Course completion status
 * - Tool proficiency levels
 */

const meta: Meta<typeof ProfileBadge> = {
  title: '01-Atoms/Profile Badge',
  component: ProfileBadge,
  parameters: {
    docs: {
      description: {
        component: `
# Profile Badge - Social Media + Utility Component

Profile badges are the cornerstone of HIVE's social proof system, combining academic utility with social media engagement to create meaningful campus connections.

## Social Media Platform Features
- **Status Recognition**: Visual indicators of community standing
- **Achievement Showcasing**: Peer-visible accomplishments and milestones
- **Social Proof**: Community endorsements and skill validations
- **Interactive Engagement**: Clickable badges that reveal more information

## Utility Platform Features  
- **Academic Progress**: Course completion and grade achievements
- **Skill Tracking**: Proficiency levels in tools and subjects
- **Goal Monitoring**: Progress toward academic and personal objectives
- **Resource Access**: Badges that unlock premium features or content

## Campus Social Context
Profile badges bridge the gap between academic achievement and social recognition, making studying and campus involvement inherently social and shareable.
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['builder', 'verified', 'leader', 'ghost', 'achievement', 'streak', 'academic', 'social'],
      description: 'Predefined badge type with icon and styling'
    },
    variant: {
      control: { type: 'select' },
      options: ['builder', 'verified', 'leader', 'ghost', 'achievement', 'streak', 'academic', 'social', 'default'],
      description: 'Badge visual variant'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge size for different contexts'
    },
    label: {
      control: 'text',
      description: 'Badge text content'
    },
    value: {
      control: 'text',
      description: 'Optional value for counts or metrics'
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover interactions'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show badge icon'
    },
    showValue: {
      control: 'boolean',
      description: 'Show badge value'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Social media context
export const Default: Story = {
  args: {
    type: 'achievement',
    label: 'Top Contributor',
    interactive: true
  }
};

// 2. PLAYGROUND STORY - Interactive social/utility blend
export const Playground: Story = {
  args: {
    type: 'leader',
    size: 'md',
    label: 'Study Group Leader',
    value: 25,
    interactive: true,
    showValue: true
  }
};

// 3. ALL VARIANTS STORY - Social media + utility types
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Achievement Badges</h3>
        <div className="space-y-2">
          <ProfileBadge 
            type="achievement" 
            label="Dean's List" 
          />
          <ProfileBadge 
            type="academic" 
            label="Course Complete" 
            value={12}
            showValue
          />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Social Status</h3>
        <div className="space-y-2">
          <ProfileBadge 
            type="leader" 
            label="Campus Leader" 
          />
          <ProfileBadge 
            type="social" 
            label="Group Organizer"
            value={8}
            showValue
          />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Skills & Builder</h3>
        <div className="space-y-2">
          <ProfileBadge 
            type="streak" 
            label="Study Streak" 
            value={15}
            showValue
          />
          <ProfileBadge 
            type="builder"
            label="HIVE Builder"
          />
        </div>
      </div>
    </div>
  )
};

// 4. SOCIAL PROOF STORY - Community engagement focus
export const SocialProof: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Proof & Community Recognition
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How badges create social connections and peer validation
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Peer Recognition</h3>
          <div className="space-y-2">
            <ProfileBadge 
              type="social"
              label="Most Helpful"
              value={47}
              showValue
              interactive
            />
            <ProfileBadge 
              type="social"
              label="Group Favorite"
              value={23}
              showValue
              interactive
            />
            <ProfileBadge 
              type="achievement"
              label="Top Contributor"
              interactive
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Academic Excellence</h3>
          <div className="space-y-2">
            <ProfileBadge 
              type="academic"
              label="Honor Roll"
            />
            <ProfileBadge 
              type="verified"
              label="Perfect Attendance"
              value={30}
              showValue
            />
            <ProfileBadge 
              type="streak"
              label="Study Streak"
              value={15}
              showValue
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// 5. CAMPUS UTILITY STORY - Academic & tool usage
export const CampusUtility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic & Campus Utility
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Functional badges that provide utility and track progress
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Course Progress</h3>
          <div className="flex flex-wrap gap-2">
            <ProfileBadge 
              type="academic"
              label="CS 101 Complete"
            />
            <ProfileBadge 
              type="achievement"
              label="Math 201 - A+"
            />
            <ProfileBadge 
              type="verified"
              label="In Progress"
              value={3}
              showValue
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Tool Proficiency</h3>
          <div className="flex flex-wrap gap-2">
            <ProfileBadge 
              type="streak"
              label="Python Expert"
            />
            <ProfileBadge 
              type="academic"
              label="Design Pro"
            />
            <ProfileBadge 
              type="builder"
              label="HIVE Pro"
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Campus Engagement</h3>
          <div className="flex flex-wrap gap-2">
            <ProfileBadge 
              type="leader"
              label="Club President"
            />
            <ProfileBadge 
              type="achievement"
              label="Volunteer"
              value={50}
              showValue
            />
            <ProfileBadge 
              type="social"
              label="Event Host"
              value={12}
              showValue
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. INTERACTIVE SOCIAL STORY - Social media interactions
export const InteractiveSocial: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Interactive Social Elements
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Clickable badges that reveal stories and enable connections
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Student Profile Preview</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
            <div>
              <h4 className="font-medium">Sarah Chen</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">Computer Science • Junior</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <ProfileBadge 
              type="leader"
              label="Study Group Leader"
              value={5}
              showValue
              interactive
            />
            <ProfileBadge 
              type="social"
              label="Most Helpful"
              value={89}
              showValue
              interactive
            />
            <ProfileBadge 
              type="streak"
              label="React Expert"
              interactive
            />
            <ProfileBadge 
              type="builder"
              label="HIVE Pro"
              interactive
            />
          </div>
          
          <p className="text-xs text-[var(--hive-text-secondary)]">
            💡 Click badges to see achievements and connect with Sarah
          </p>
        </div>
      </div>
    </div>
  )
};

// 7. RESPONSIVE STORY - Mobile social media usage
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile-First Social Media Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Touch-optimized badges for 80% mobile campus usage
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (Touch-Optimized)</h3>
            <div className="space-y-3">
              <ProfileBadge 
                size="lg"
                type="leader"
                label="Campus Leader"
                interactive
              />
              <ProfileBadge 
                size="lg"
                type="achievement"
                label="Top Student"
                value={12}
                showValue
                interactive
              />
            </div>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Compact Layout)</h3>
            <div className="flex flex-wrap gap-2">
              <ProfileBadge 
                size="sm"
                type="leader"
                label="Campus Leader"
                interactive
              />
              <ProfileBadge 
                size="sm"
                type="achievement"
                label="Top Student"
                value={12}
                showValue
                interactive
              />
              <ProfileBadge 
                size="sm"
                type="streak"
                label="Expert"
                interactive
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 8. ACCESSIBILITY STORY - Screen reader social proof
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessible Social Recognition
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Screen reader friendly social proof and achievement communication
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium mb-3">Semantic Social Elements</h3>
        <div className="space-y-3">
          <div 
            role="button"
            tabIndex={0}
            aria-label="Study Group Leader badge - leads 5 active study groups with 89% success rate"
          >
            <ProfileBadge 
              type="leader"
              label="Study Group Leader"
              value={5}
              showValue
              interactive
            />
          </div>
          
          <div 
            role="button"
            tabIndex={0}
            aria-label="Most Helpful Student badge - received 47 peer endorsements this semester"
          >
            <ProfileBadge 
              type="social"
              label="Most Helpful"
              value={47}
              showValue
              interactive
            />
          </div>
          
          <p className="text-xs text-[var(--hive-text-secondary)]">
            Use Tab to navigate, Enter to activate badge details
          </p>
        </div>
      </div>
    </div>
  )
};