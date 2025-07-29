import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileDashboard.stories } from '../../atomic/organisms/profile-dashboard.stories';

/**
 * # ProfileDashboard.stories - Social Media + Utility Platform
 * 
 * The ProfileDashboard.stories organism is a complex social-utility system that powers major campus interactions. It combines social media community features with robust academic and campus life utilities.
 * 
 * ## Social Media Features
 * - Social proof badges and achievements
- Peer recognition and endorsements
 * 
 * ## Utility Features  
 * - Academic progress tracking
- Skill development monitoring
 * 
 * ## Campus Integration
 * Designed for organism level interactions that blend social engagement
 * with academic utility, making campus life more connected and productive.
 */

// TODO: Replace with actual component implementation
const MockProfileDashboard.stories: React.FC<any> = (props) => (
  <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
    <h3 className="font-semibold text-[var(--hive-text-primary)]">ProfileDashboard.stories</h3>
    <p className="text-sm text-[var(--hive-text-secondary)]">
      Social media + utility organism component
    </p>
  </div>
);

const meta: Meta<typeof MockProfileDashboard.stories> = {
  title: '03-Organisms/ProfileDashboard.stories',
  component: MockProfileDashboard.stories,
  parameters: {
    docs: {
      description: {
        component: `
# ProfileDashboard.stories - Campus Social + Utility


This organism component exemplifies HIVE's social media + utility platform approach:

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

The ProfileDashboard.stories ensures every interaction serves both social connection and academic success.
        `
      }
    },
    layout: 'padded'
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] ">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Social media context
export const Default: Story = {
  args: {}
};

// 2. PLAYGROUND STORY - Interactive social/utility controls
export const Playground: Story = {
  args: {}
};

// 3. SOCIAL MEDIA STORY - Community engagement focus
export const SocialMedia: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Media Platform Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Community engagement and social proof elements
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Building study group credibility</h3>
          <MockBuildingComponent />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Showcasing academic achievements</h3>
          <MockShowcasingComponent />
        </div>
      </div>
    </div>
  )
};

// 4. UTILITY FEATURES STORY - Academic productivity focus  
export const UtilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic Utility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Productivity tools and campus life optimization
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <MockProfileDashboard.stories />
      </div>
    </div>
  )
};

// 5. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How students use this component in real campus situations
        </p>
      </div>
      
      <div className="space-y-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Building study group credibility</h3>
          <MockProfileDashboard.stories />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Showcasing academic achievements</h3>
          <MockProfileDashboard.stories />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Connecting with classmates</h3>
          <MockProfileDashboard.stories />
        </div>
      </div>
    </div>
  )
};

// 6. RESPONSIVE STORY - Mobile social engagement
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile-First Social Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Optimized for 80% mobile campus usage patterns
        </p>
      </div>
      
      <MockProfileDashboard.stories />
    </div>
  )
};

// 7. ACCESSIBILITY STORY - Inclusive campus community
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessible Campus Community
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant social and utility features
        </p>
      </div>
      
      <MockProfileDashboard.stories />
    </div>
  )
};

// 8. MOTION STORY - HIVE liquid metal social interactions
export const Motion: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Interaction Motion
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          HIVE liquid metal animations for social engagement
        </p>
      </div>
      
      <MockProfileDashboard.stories />
    </div>
  )
};