import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileStats } from '../../components/profile/profile-stats';
import { User } from '../../components/profile/types';

/**
 * # ProfileStats - Campus Social Media + Utility Stats
 * 
 * The ProfileStats molecule displays comprehensive campus activity statistics combining social engagement
 * with academic utility metrics. It showcases achievements, connections, and progress in a visually
 * appealing dashboard format with premium liquid metal aesthetics.
 * 
 * ## Social Media Features
 * - Campus connections and network growth
 * - Community engagement through spaces
 * - Achievement badges and social proof
 * - Activity streaks and consistency metrics
 * 
 * ## Utility Features  
 * - Academic tool creation tracking
 * - Productivity insights and analytics
 * - Progress monitoring and goal achievement
 * - Campus resource utilization metrics
 * 
 * ## Campus Integration
 * Designed for molecule-level interactions that bridge social platform engagement
 * with academic utility tracking, motivating students through gamified progress displays.
 */

// Sample stats data for demonstration
const sampleStats: User['stats'] = {
  totalSpaces: 8,
  activeSpaces: 5,
  toolsCreated: 3,
  connectionsCount: 47,
  streakDays: 12,
  totalActivity: 247
};

const meta: Meta<typeof ProfileStats> = {
  title: '02-Molecules/ProfileStats',
  component: ProfileStats,
  parameters: {
    docs: {
      description: {
        component: `
# ProfileStats - Campus Social + Utility


This molecule component exemplifies HIVE's social media + utility platform approach:

## Social Media Integration
- Social proof badges and achievements
- Peer recognition and endorsements
- Community status and role displays
- Friend connections and social graphs

## Campus Utility Features
- Academic progress tracking
- Skill development monitoring
- Course completion status
- GPA and grade analytics

## Student Engagement Patterns
- Profile views and social validation
- Achievement sharing and celebrations
- Peer comparison and motivation
- Academic milestone announcements

The ProfileStats ensures every interaction serves both social connection and academic success.
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Loading state'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[400px]">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Standard campus stats
export const Default: Story = {
  args: {
    stats: sampleStats,
    isLoading: false
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    stats: sampleStats,
    isLoading: false
  }
};

// 3. LOADING STATE STORY - Loading experience
export const LoadingState: Story = {
  args: {
    stats: sampleStats,
    isLoading: true
  }
};

// 4. DIFFERENT STAT LEVELS STORY - Various achievement levels
export const DifferentStatLevels: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Different Achievement Levels
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How stats appear for students with different activity levels
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3 text-[var(--hive-brand-primary)]">New Student</h3>
          <ProfileStats stats={{
            totalSpaces: 2,
            activeSpaces: 1,
            toolsCreated: 0,
            connectionsCount: 3,
            streakDays: 1,
            totalActivity: 5
          }} />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-[var(--hive-brand-primary)]">Active Student</h3>
          <ProfileStats stats={sampleStats} />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-[var(--hive-brand-primary)]">Power User</h3>
          <ProfileStats stats={{
            totalSpaces: 15,
            activeSpaces: 12,
            toolsCreated: 8,
            connectionsCount: 127,
            streakDays: 45,
            totalActivity: 892
          }} />
        </div>
      </div>
    </div>
  )
};

// 5. SOCIAL MEDIA FOCUS STORY - High social engagement
export const SocialMediaFocus: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Media Platform Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Students who focus on community engagement and connections
        </p>
      </div>
      
      <ProfileStats stats={{
        totalSpaces: 12,
        activeSpaces: 9,
        toolsCreated: 1,
        connectionsCount: 89,
        streakDays: 23,
        totalActivity: 345
      }} />
    </div>
  )
};

// 6. UTILITY FOCUS STORY - High tool creation
export const UtilityFocus: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic Utility Focus
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Students who focus on tool creation and academic productivity
        </p>
      </div>
      
      <ProfileStats stats={{
        totalSpaces: 6,
        activeSpaces: 4,
        toolsCreated: 12,
        connectionsCount: 34,
        streakDays: 18,
        totalActivity: 156
      }} />
    </div>
  )
};

// 7. CAMPUS SCENARIOS STORY - Real student usage patterns
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus situations showcasing different engagement patterns
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">First-Year Student</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Sarah just joined HIVE and is building her campus presence
          </p>
          <ProfileStats stats={{
            totalSpaces: 3,
            activeSpaces: 2,
            toolsCreated: 0,
            connectionsCount: 8,
            streakDays: 3,
            totalActivity: 12
          }} />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Junior CS Major</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Alex is deeply engaged in both social and utility features
          </p>
          <ProfileStats stats={sampleStats} />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Graduate Student</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Maya focuses on research tools and selective community engagement
          </p>
          <ProfileStats stats={{
            totalSpaces: 4,
            activeSpaces: 3,
            toolsCreated: 6,
            connectionsCount: 23,
            streakDays: 8,
            totalActivity: 87
          }} />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Senior Leader</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Jordan is a campus leader with high social engagement
          </p>
          <ProfileStats stats={{
            totalSpaces: 18,
            activeSpaces: 14,
            toolsCreated: 4,
            connectionsCount: 156,
            streakDays: 67,
            totalActivity: 523
          }} />
        </div>
      </div>
    </div>
  )
};

// 8. ACHIEVEMENTS SHOWCASE STORY - Different achievement combinations
export const AchievementsShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Achievement Combinations
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different combinations of achievements based on activity patterns
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">All Achievements Unlocked</h3>
          <ProfileStats stats={{
            totalSpaces: 8,
            activeSpaces: 6,
            toolsCreated: 3,
            connectionsCount: 67,
            streakDays: 15,
            totalActivity: 234
          }} />
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Social Focus (No Tool Creator)</h3>
          <ProfileStats stats={{
            totalSpaces: 12,
            activeSpaces: 8,
            toolsCreated: 0,
            connectionsCount: 78,
            streakDays: 21,
            totalActivity: 189
          }} />
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Builder Focus (Limited Social)</h3>
          <ProfileStats stats={{
            totalSpaces: 3,
            activeSpaces: 2,
            toolsCreated: 5,
            connectionsCount: 15,
            streakDays: 12,
            totalActivity: 98
          }} />
        </div>
      </div>
    </div>
  )
};

// 9. RESPONSIVE BEHAVIOR STORY - Mobile-first design
export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Adaptive layout for mobile, tablet, and desktop campus usage
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-[var(--hive-text-secondary)] mb-2">
          The component automatically adjusts its grid layout:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Mobile: Single column stack</li>
            <li>Tablet: 2-column grid</li>
            <li>Desktop: 3-column grid</li>
            <li>Large: 5-column grid for full stats display</li>
          </ul>
        </div>
        
        <ProfileStats stats={sampleStats} />
      </div>
    </div>
  )
};

// 10. ACCESSIBILITY STORY - WCAG compliance features
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant design with inclusive campus community focus
        </p>
      </div>
      
      <div className="mb-4 text-sm text-[var(--hive-text-secondary)]">
        <p className="mb-2">Accessibility features included:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>High contrast colors and clear visual hierarchy</li>
          <li>Meaningful icons with descriptive labels</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader compatible structure and content</li>
          <li>Color-blind friendly achievement indicators</li>
          <li>Appropriate focus states and interactive elements</li>
        </ul>
      </div>
      
      <ProfileStats stats={sampleStats} />
    </div>
  )
};